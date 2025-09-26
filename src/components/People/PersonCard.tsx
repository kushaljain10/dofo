import React from "react";
import { Person } from "../../types";
import {
  HeartIcon,
  ClockIcon,
  CalendarDaysIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

interface PersonCardProps {
  person: Person;
  onClick: () => void;
}

const PersonCard: React.FC<PersonCardProps> = ({ person, onClick }) => {
  const getRelationStyle = (relation: string) => {
    switch (relation) {
      case "family":
        return {
          bg: "bg-purple-50",
          text: "text-purple-600",
          dot: "bg-purple-400",
        };
      case "close":
        return { bg: "bg-pink-50", text: "text-pink-600", dot: "bg-pink-400" };
      case "friends":
        return { bg: "bg-blue-50", text: "text-blue-600", dot: "bg-blue-400" };
      case "work":
        return {
          bg: "bg-green-50",
          text: "text-green-600",
          dot: "bg-green-400",
        };
      default:
        return { bg: "bg-gray-50", text: "text-gray-600", dot: "bg-gray-400" };
    }
  };

  const formatLastContact = () => {
    if (!person.lastContact) return "Never";
    const now = new Date();
    const lastContact = new Date(person.lastContact);
    const diffTime = now.getTime() - lastContact.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const formatNextMilestone = () => {
    if (!person.nextMilestone) return null;
    const now = new Date();
    const milestone = new Date(person.nextMilestone.date);
    const diffTime = milestone.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays > 0) return `in ${diffDays} days`;
    return `${Math.abs(diffDays)} days ago`;
  };

  const isOverdue = person.cadence?.overdue;
  const hasUpcomingMilestone =
    person.nextMilestone &&
    new Date(person.nextMilestone.date).getTime() - new Date().getTime() <=
      7 * 24 * 60 * 60 * 1000;

  const relationStyle = getRelationStyle(person.relation);

  return (
    <div
      onClick={onClick}
      className="card-floating p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group"
    >
      <div className="flex items-start space-x-4">
        {/* Avatar with Health Score */}
        <div className="relative flex-shrink-0">
          {person.avatar ? (
            <img
              src={person.avatar}
              alt={person.name}
              className="w-16 h-16 rounded-2xl shadow-md"
            />
          ) : (
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center">
              <span className="text-lg font-bold text-gray-600">
                {person.name.charAt(0)}
              </span>
            </div>
          )}

          {/* Health Score Badge - Modern Design */}
          <div className="absolute -top-2 -right-2 z-10">
            <div
              className={`relative px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-lg backdrop-blur-sm border border-white/20 ${
                person.healthScore >= 80
                  ? "bg-gradient-to-br from-green-400 via-emerald-500 to-green-600"
                  : person.healthScore >= 60
                  ? "bg-gradient-to-br from-yellow-400 via-orange-500 to-yellow-600"
                  : "bg-gradient-to-br from-red-400 via-pink-500 to-red-600"
              }`}
            >
              <div className="flex items-center space-x-1">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    person.healthScore >= 80
                      ? "bg-green-200"
                      : person.healthScore >= 60
                      ? "bg-yellow-200"
                      : "bg-red-200"
                  } animate-pulse`}
                ></div>
                <span>{person.healthScore}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                {person.name}
              </h3>
              {isOverdue && (
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              )}
            </div>
            {person.healthScore >= 80 ? (
              <HeartIconSolid className="w-6 h-6 text-red-400" />
            ) : (
              <HeartIcon className="w-6 h-6 text-gray-300" />
            )}
          </div>

          {/* Relation & Status */}
          <div className="flex items-center space-x-3 mb-4">
            <div
              className={`flex items-center space-x-2 px-3 py-2 ${relationStyle.bg} rounded-full`}
            >
              <div
                className={`w-2 h-2 ${relationStyle.dot} rounded-full`}
              ></div>
              <span
                className={`text-sm font-semibold ${relationStyle.text} capitalize`}
              >
                {person.relation}
              </span>
            </div>
            {hasUpcomingMilestone && (
              <div className="flex items-center space-x-2 px-3 py-2 bg-yellow-50 rounded-full">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-yellow-600">
                  milestone soon
                </span>
              </div>
            )}
          </div>

          {/* Meta Info Cards */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
              <ClockIcon className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700">
                <span className="font-medium">Last contact:</span>{" "}
                {formatLastContact()}
              </span>
            </div>

            {person.nextMilestone && (
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-xl">
                <CalendarDaysIcon className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-blue-700">
                  <span className="font-medium">
                    {person.nextMilestone.description}
                  </span>{" "}
                  {formatNextMilestone()}
                </span>
              </div>
            )}
          </div>

          {/* Tags */}
          {person.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {person.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs font-medium bg-white rounded-full border border-gray-200 text-gray-600"
                >
                  {tag}
                </span>
              ))}
              {person.tags.length > 3 && (
                <span className="px-3 py-1 text-xs font-medium bg-white rounded-full border border-gray-200 text-gray-600">
                  +{person.tags.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Status Bar */}
      {(person.promises.length > 0 || isOverdue) && (
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            {person.promises.length > 0 && (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">
                  {person.promises.filter((p) => !p.completed).length} open
                  promises
                </span>
              </div>
            )}
            {isOverdue && (
              <div className="flex items-center space-x-2">
                <ExclamationTriangleIcon className="w-4 h-4 text-red-400" />
                <span className="text-sm font-medium text-red-600">
                  Overdue contact
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonCard;
