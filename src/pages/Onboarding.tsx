import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Welcome from "../components/Onboarding/Welcome";
import LoginStep from "../components/Onboarding/LoginStep";
import ConnectorsStep from "../components/Onboarding/ConnectorsStep";
import PersonalInfoStep from "../components/Onboarding/PersonalInfoStep";
import CompleteStep from "../components/Onboarding/CompleteStep";

const Onboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const steps = [
    { component: Welcome, title: "Welcome" },
    { component: LoginStep, title: "Sign In" },
    { component: ConnectorsStep, title: "Connect Sources" },
    { component: PersonalInfoStep, title: "Personal Info" },
    { component: CompleteStep, title: "Complete" },
  ];

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    // Mark onboarding as complete and navigate to home
    localStorage.setItem("dofo_onboarding_complete", "true");
    navigate("/");
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="relative">
      {/* Progress Indicator */}
      {currentStep > 0 && currentStep < steps.length - 1 && (
        <div className="fixed top-0 left-0 right-0 z-50">
          <div className="h-1 bg-gray-200">
            <div
              className="h-full bg-purple-600 transition-all duration-300"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Step Content */}
      <CurrentStepComponent
        onNext={handleNext}
        onBack={handleBack}
        onComplete={handleComplete}
      />
    </div>
  );
};

export default Onboarding;
