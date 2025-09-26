import React, { useState } from "react";
import {
  UserIcon,
  MapPinIcon,
  CalendarDaysIcon,
  HeartIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

interface PersonalInfoStepProps {
  onNext: () => void;
  onBack: () => void;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
  onNext,
  onBack,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    birthday: "",
    relationshipGoals: [] as string[],
  });

  const relationshipGoals = [
    "Stay in touch with family",
    "Maintain friendships",
    "Network professionally",
    "Remember important dates",
    "Be more thoughtful",
    "Improve communication",
  ];

  const handleGoalToggle = (goal: string) => {
    setFormData((prev) => ({
      ...prev,
      relationshipGoals: prev.relationshipGoals.includes(goal)
        ? prev.relationshipGoals.filter((g) => g !== goal)
        : [...prev.relationshipGoals, goal],
    }));
  };

  const handleSubmit = () => {
    // Save user data and proceed
    console.log("User data:", formData);
    onNext();
  };

  const canProceed = formData.name.trim().length > 0;

  return (
    <div className="min-h-screen gradient-minimal flex flex-col">
      {/* Header */}
      <div className="relative px-6 pt-16 pb-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-minimal mb-3">About You</h1>
          <p className="text-lg font-medium text-gray-600">
            Help DoFo personalize your experience
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 space-y-6 pb-24">
        {/* Basic Info */}
        <div className="card-floating p-6 space-y-4">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Basic Information
          </h3>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Your Name *
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Enter your full name"
                className="w-full px-4 py-3 pl-12 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:bg-white transition-all"
              />
              <UserIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Location
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.location}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, location: e.target.value }))
                }
                placeholder="City, Country"
                className="w-full px-4 py-3 pl-12 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:bg-white transition-all"
              />
              <MapPinIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Birthday
            </label>
            <div className="relative">
              <input
                type="date"
                value={formData.birthday}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, birthday: e.target.value }))
                }
                className="w-full px-4 py-3 pl-12 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:bg-white transition-all"
              />
              <CalendarDaysIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Relationship Goals */}
        <div className="card-floating p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-pink-100 rounded-2xl flex items-center justify-center">
              <HeartIcon className="w-6 h-6 text-pink-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Relationship Goals
              </h3>
              <p className="text-sm text-gray-600">What matters most to you?</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {relationshipGoals.map((goal) => {
              const isSelected = formData.relationshipGoals.includes(goal);
              return (
                <button
                  key={goal}
                  onClick={() => handleGoalToggle(goal)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 ${
                    isSelected
                      ? "border-purple-300 bg-purple-50 text-purple-900"
                      : "border-gray-200 bg-white hover:border-purple-200 hover:bg-purple-50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isSelected
                          ? "border-purple-500 bg-purple-500"
                          : "border-gray-300"
                      }`}
                    >
                      {isSelected && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className="font-medium">{goal}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Privacy Note */}
        <div className="card-glass p-6 bg-green-50 border border-green-200">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <div>
              <h4 className="font-semibold text-green-900 mb-1">
                Your Data, Your Control
              </h4>
              <p className="text-sm text-green-700">
                This information helps personalize your experience. You can
                update or delete it anytime in settings.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="px-6 pb-8 space-y-4">
        <button
          onClick={handleSubmit}
          disabled={!canProceed}
          className="w-full py-4 px-6 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transition-all duration-200"
        >
          <span>Complete Setup</span>
          <ArrowRightIcon className="w-5 h-5" />
        </button>

        <div className="flex justify-between items-center">
          <button
            onClick={onBack}
            className="text-sm text-gray-500 hover:text-gray-700 font-medium"
          >
            ← Back
          </button>

          <button
            onClick={onNext}
            className="text-sm text-gray-500 hover:text-gray-700 font-medium"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoStep;
