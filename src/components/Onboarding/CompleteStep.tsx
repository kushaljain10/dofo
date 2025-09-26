import React from "react";
import {
  CheckCircleIcon,
  SparklesIcon,
  HeartIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

interface CompleteStepProps {
  onComplete: () => void;
}

const CompleteStep: React.FC<CompleteStepProps> = ({ onComplete }) => {
  return (
    <div className="min-h-screen gradient-minimal flex flex-col">
      {/* Success Animation */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 text-center">
        {/* Success Icon */}
        <div className="mb-8">
          <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-breathe">
            <CheckCircleIcon className="w-16 h-16 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            You're All Set!
          </h1>
          <p className="text-xl text-gray-600 max-w-md mx-auto">
            DoFo is ready to help you build stronger, more meaningful
            relationships
          </p>
        </div>

        {/* What's Next */}
        <div className="space-y-4 mb-12 max-w-sm w-full">
          <div className="card-glass p-6 text-left">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-purple-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <SparklesIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">
                  Get Your First Nudge
                </h3>
                <p className="text-sm text-gray-600">
                  We'll analyze your connections and suggest meaningful actions
                </p>
              </div>
            </div>
          </div>

          <div className="card-glass p-6 text-left">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <HeartIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">
                  Build Your Circles
                </h3>
                <p className="text-sm text-gray-600">
                  Add your closest people and watch your relationship health
                  improve
                </p>
              </div>
            </div>
          </div>

          <div className="card-glass p-6 text-left">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-green-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Ask for Advice</h3>
                <p className="text-sm text-gray-600">
                  Use the Search bar to get AI guidance for any relationship
                  situation
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={onComplete}
          className="py-4 px-8 bg-purple-600 text-white rounded-full font-bold hover:bg-purple-700 flex items-center space-x-3 text-lg mb-8 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
        >
          <span>Start Using DoFo</span>
          <ArrowRightIcon className="w-5 h-5" />
        </button>

        {/* Encouragement */}
        <div className="text-center">
          <p className="text-gray-600 mb-2">
            💜 <span className="font-medium">Remember:</span> Small, consistent
            actions build the strongest relationships
          </p>
          <p className="text-sm text-gray-500">
            DoFo will gently guide you every step of the way
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompleteStep;
