import React, { useState } from "react";
import {
  UserCircleIcon,
  CogIcon,
  BellIcon,
  ShieldCheckIcon,
  HeartIcon,
  ChartBarIcon,
  QuestionMarkCircleIcon,
  ArrowRightOnRectangleIcon,
  MoonIcon,
  SunIcon,
  LanguageIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";
import { UserPreferences } from "../types";

const Profile: React.FC = () => {
  const [preferences, setPreferences] = useState<UserPreferences>({
    nudgeIntensity: "medium",
    quietHours: {
      start: "22:00",
      end: "08:00",
    },
    language: "en",
    defaultTone: "casual",
    enableNotifications: true,
    dailyQuestionLimit: 3,
  });

  const [isDarkMode, setIsDarkMode] = useState(false);

  const handlePreferenceChange = <K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K]
  ) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const userStats = {
    totalPeople: 5,
    actionsCompleted: 23,
    healthScore: 82,
    streakDays: 7,
    relationshipsImproved: 3,
  };

  const menuSections = [
    {
      title: "Preferences",
      items: [
        {
          icon: BellIcon,
          label: "Notifications",
          description: "Manage alerts and reminders",
          action: () => console.log("Notifications settings"),
        },
        {
          icon: isDarkMode ? SunIcon : MoonIcon,
          label: "Appearance",
          description: isDarkMode ? "Light mode" : "Dark mode",
          action: () => setIsDarkMode(!isDarkMode),
        },
        {
          icon: LanguageIcon,
          label: "Language",
          description: "English, हिंदी",
          action: () => console.log("Language settings"),
        },
      ],
    },
    {
      title: "Relationship Settings",
      items: [
        {
          icon: HeartIcon,
          label: "Nudge Intensity",
          description: `Currently: ${preferences.nudgeIntensity}`,
          action: () => console.log("Nudge settings"),
        },
        {
          icon: ChartBarIcon,
          label: "Daily Questions",
          description: `${preferences.dailyQuestionLimit} questions per day`,
          action: () => console.log("Questions settings"),
        },
      ],
    },
    {
      title: "Privacy & Security",
      items: [
        {
          icon: ShieldCheckIcon,
          label: "Privacy Controls",
          description: "Data and sharing settings",
          action: () => console.log("Privacy settings"),
        },
        {
          icon: DevicePhoneMobileIcon,
          label: "Connected Sources",
          description: "Contacts, Calendar, Photos",
          action: () => console.log("Connected sources"),
        },
      ],
    },
    {
      title: "Support",
      items: [
        {
          icon: QuestionMarkCircleIcon,
          label: "Help & FAQ",
          description: "Get help using DoFo",
          action: () => console.log("Help"),
        },
        {
          icon: ArrowRightOnRectangleIcon,
          label: "Sign Out",
          description: "Sign out of your account",
          action: () => console.log("Sign out"),
          isDestructive: true,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen gradient-minimal">
      {/* Minimal Header */}
      <div className="relative px-6 pt-16 pb-8">
        <div className="text-center">
          <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-breathe">
            <UserCircleIcon className="w-12 h-12 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-minimal mb-3">Your Profile</h1>
          <p className="text-lg font-medium text-gray-600">
            Manage your DoFo experience
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-6 space-y-8 pb-24">
        <div>
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
            Your Relationship Journey
          </h2>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="card-glass p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {userStats.totalPeople}
              </div>
              <div className="text-sm font-medium text-gray-600">
                People Added
              </div>
            </div>
            <div className="card-glass p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {userStats.actionsCompleted}
              </div>
              <div className="text-sm font-medium text-gray-600">
                Actions Completed
              </div>
            </div>
            <div className="card-glass p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {userStats.healthScore}%
              </div>
              <div className="text-sm font-medium text-gray-600">
                Avg Health Score
              </div>
            </div>
            <div className="card-glass p-6 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {userStats.streakDays}
              </div>
              <div className="text-sm font-medium text-gray-600">
                Day Streak
              </div>
            </div>
          </div>
        </div>

        {/* Achievement */}
        <div className="card-floating p-8 text-center">
          <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <HeartIcon className="w-8 h-8 text-pink-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Relationship Builder
          </h3>
          <p className="text-gray-600">
            You've improved {userStats.relationshipsImproved} relationships this
            week!
          </p>
        </div>

        {/* Quick Settings */}
        <div className="card-floating p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Settings
          </h3>

          {/* Nudge Intensity */}
          <div className="mb-8">
            <div className="text-center mb-4">
              <span className="text-sm font-semibold text-gray-900">
                Nudge Intensity
              </span>
              <p className="text-xs text-gray-500 mt-1">
                How often DoFo reminds you
              </p>
            </div>
            <div className="flex space-x-3">
              {(["low", "medium", "high"] as const).map((intensity) => (
                <button
                  key={intensity}
                  onClick={() =>
                    handlePreferenceChange("nudgeIntensity", intensity)
                  }
                  className={`flex-1 py-3 px-4 rounded-full text-sm font-semibold transition-all duration-200 ${
                    preferences.nudgeIntensity === intensity
                      ? "bg-purple-600 text-white shadow-md"
                      : "btn-glass hover:bg-purple-50"
                  }`}
                >
                  {intensity.charAt(0).toUpperCase() + intensity.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Notifications Toggle */}
          <div className="bg-gray-50 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-semibold text-gray-900">
                  Daily Notifications
                </span>
                <p className="text-xs text-gray-500">
                  Gentle nudges and reminders
                </p>
              </div>
              <button
                onClick={() =>
                  handlePreferenceChange(
                    "enableNotifications",
                    !preferences.enableNotifications
                  )
                }
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                  preferences.enableNotifications
                    ? "bg-purple-600"
                    : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    preferences.enableNotifications
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Development Options */}
        <div className="card-floating p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
            Developer Options
          </h3>
          <button
            onClick={() => {
              localStorage.removeItem("dofo_onboarding_complete");
              window.location.reload();
            }}
            className="w-full btn-glass hover:bg-red-50 text-red-600 py-3"
          >
            Reset Onboarding
          </button>
        </div>

        {/* App Info */}
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-2">DoFo v1.0.0</p>
          <p className="text-xs text-gray-400">
            Made with ❤️ for meaningful relationships
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
