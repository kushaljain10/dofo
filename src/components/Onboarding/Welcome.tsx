import React from "react";
import { SparklesIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

interface WelcomeProps {
  onNext: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onNext }) => {
  return (
    <div className="min-h-screen gradient-minimal flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 text-center">
        {/* Holographic Logo */}
        <div className="mb-12">
          <div className="orb-holographic animate-breathe mx-auto mb-8"></div>
          <h1 className="text-5xl font-bold text-minimal mb-4">DoFo</h1>
          <p className="text-xl text-gray-600 font-medium">
            Don't Forget • Your AI relationship co-pilot
          </p>
        </div>

        {/* Value Props */}
        <div className="space-y-6 mb-12 max-w-md">
          <div className="card-glass p-6 text-left">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-purple-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <SparklesIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Remember</h3>
                <p className="text-sm text-gray-600">
                  Never forget important details, promises, or moments with
                  people you care about
                </p>
              </div>
            </div>
          </div>

          <div className="card-glass p-6 text-left">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Nudge</h3>
                <p className="text-sm text-gray-600">
                  Get gentle reminders at the right time to strengthen your
                  relationships
                </p>
              </div>
            </div>
          </div>

          <div className="card-glass p-6 text-left">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-green-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 font-bold text-lg">💡</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Advise</h3>
                <p className="text-sm text-gray-600">
                  Get AI-powered suggestions on what to say and do in any
                  situation
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={onNext}
          className="py-4 px-8 bg-purple-600 text-white rounded-full font-bold hover:bg-purple-700 flex items-center space-x-3 text-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
        >
          <span>Get Started</span>
          <ArrowRightIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Footer */}
      <div className="text-center pb-8">
        <p className="text-xs text-gray-400">
          Private by design • Local processing • Your data stays yours
        </p>
      </div>
    </div>
  );
};

export default Welcome;
