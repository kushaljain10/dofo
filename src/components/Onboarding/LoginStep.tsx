import React, { useState } from "react";
import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

interface LoginStepProps {
  onNext: () => void;
  onBack: () => void;
}

const LoginStep: React.FC<LoginStepProps> = ({ onNext, onBack }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onNext();
    }, 2000);
  };

  const handleOutlookLogin = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onNext();
    }, 2000);
  };

  const handleEmailLogin = async () => {
    if (!email || !password) return;
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onNext();
    }, 2000);
  };

  return (
    <div className="min-h-screen gradient-minimal flex flex-col">
      {/* Header */}
      <div className="relative px-6 pt-16 pb-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-minimal mb-3">Sign In</h1>
          <p className="text-lg font-medium text-gray-600">
            Connect your account to get started
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 space-y-6">
        {/* Social Login Options */}
        <div className="space-y-4">
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full card-floating p-6 flex items-center justify-center space-x-4 hover:scale-[1.02] transition-all duration-200 disabled:opacity-50"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="font-semibold text-gray-900">
              Continue with Google
            </span>
          </button>

          <button
            onClick={handleOutlookLogin}
            disabled={isLoading}
            className="w-full card-floating p-6 flex items-center justify-center space-x-4 hover:scale-[1.02] transition-all duration-200 disabled:opacity-50"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path
                fill="#0078D4"
                d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12z"
              />
              <path
                fill="#FFF"
                d="M6.857 9.429h4.286v1.143H6.857zm0 1.714h4.286v1.143H6.857zm0 1.714h4.286V14H6.857zm0-6h4.286v1.143H6.857zm5.714 0h4.286v1.143h-4.286zm0 1.714h4.286v1.143h-4.286zm0 1.714h4.286V10h-4.286zm0 1.714h4.286v1.143h-4.286z"
              />
            </svg>
            <span className="font-semibold text-gray-900">
              Continue with Outlook
            </span>
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center space-x-4">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-sm text-gray-500 font-medium">or</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Email Form */}
        <div className="card-floating p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 pl-12 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:bg-white transition-all"
              />
              <EnvelopeIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 pr-12 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:bg-white transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <button
            onClick={handleEmailLogin}
            disabled={!email || !password || isLoading}
            className="w-full py-4 px-6 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transition-all duration-200"
          >
            <span>Sign In</span>
            <ArrowRightIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Footer Links */}
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <button className="text-purple-600 font-semibold hover:text-purple-700">
              Sign up
            </button>
          </p>
          <button className="text-sm text-gray-500 hover:text-gray-700">
            Forgot password?
          </button>
        </div>
      </div>

      {/* Back Button */}
      <div className="px-6 pb-8">
        <button
          onClick={onBack}
          className="text-sm text-gray-500 hover:text-gray-700 font-medium"
        >
          ← Back
        </button>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="card-floating p-8 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <div className="w-6 h-6 bg-purple-600 rounded-full"></div>
            </div>
            <p className="text-gray-900 font-medium">Signing you in...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginStep;
