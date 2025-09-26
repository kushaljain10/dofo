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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 py-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
              <UserCircleIcon className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Your Profile</h1>
              <p className="text-gray-600 text-sm">
                Manage your DoFo experience
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-4 py-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Your Relationship Journey
        </h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="text-2xl font-bold text-primary-500">
              {userStats.totalPeople}
            </div>
            <div className="text-sm text-gray-600">People Added</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="text-2xl font-bold text-green-500">
              {userStats.actionsCompleted}
            </div>
            <div className="text-sm text-gray-600">Actions Completed</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="text-2xl font-bold text-purple-500">
              {userStats.healthScore}%
            </div>
            <div className="text-sm text-gray-600">Avg Health Score</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="text-2xl font-bold text-orange-500">
              {userStats.streakDays}
            </div>
            <div className="text-sm text-gray-600">Day Streak</div>
          </div>
        </div>

        {/* Achievement */}
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl p-4 mb-6 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <HeartIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold">Relationship Builder</h3>
              <p className="text-sm opacity-90">
                You've improved {userStats.relationshipsImproved} relationships
                this week!
              </p>
            </div>
          </div>
        </div>

        {/* Quick Settings */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Quick Settings</h3>

          {/* Nudge Intensity */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Nudge Intensity
              </span>
              <span className="text-sm text-gray-500 capitalize">
                {preferences.nudgeIntensity}
              </span>
            </div>
            <div className="flex space-x-2">
              {(["low", "medium", "high"] as const).map((intensity) => (
                <button
                  key={intensity}
                  onClick={() =>
                    handlePreferenceChange("nudgeIntensity", intensity)
                  }
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                    preferences.nudgeIntensity === intensity
                      ? "bg-primary-500 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {intensity.charAt(0).toUpperCase() + intensity.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Notifications Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-gray-700">
                Notifications
              </span>
              <p className="text-xs text-gray-500">
                Daily nudges and reminders
              </p>
            </div>
            <button
              onClick={() =>
                handlePreferenceChange(
                  "enableNotifications",
                  !preferences.enableNotifications
                )
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                preferences.enableNotifications
                  ? "bg-primary-500"
                  : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  preferences.enableNotifications
                    ? "translate-x-6"
                    : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Menu Sections */}
        {menuSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3 px-1">
              {section.title}
            </h3>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {section.items.map((item, itemIndex) => (
                <button
                  key={itemIndex}
                  onClick={item.action}
                  className={`w-full flex items-center space-x-3 p-4 text-left hover:bg-gray-50 transition-colors ${
                    itemIndex !== section.items.length - 1
                      ? "border-b border-gray-100"
                      : ""
                  } ${item.isDestructive ? "hover:bg-red-50" : ""}`}
                >
                  <div
                    className={`flex-shrink-0 ${
                      item.isDestructive ? "text-red-500" : "text-gray-400"
                    }`}
                  >
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4
                      className={`font-medium ${
                        item.isDestructive ? "text-red-600" : "text-gray-900"
                      }`}
                    >
                      {item.label}
                    </h4>
                    <p
                      className={`text-sm ${
                        item.isDestructive ? "text-red-500" : "text-gray-600"
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <CogIcon className="w-5 h-5 text-gray-400" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* App Version */}
        <div className="text-center py-4">
          <p className="text-xs text-gray-500">
            DoFo v1.0.0 • Made with ❤️ for meaningful relationships
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
