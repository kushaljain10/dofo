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
  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  const getHealthScoreBg = (score: number) => {
    if (score >= 80) return "bg-green-50 border-green-200";
    if (score >= 60) return "bg-yellow-50 border-yellow-200";
    return "bg-red-50 border-red-200";
  };

  const getRelationColor = (relation: string) => {
    switch (relation) {
      case "family":
        return "bg-purple-100 text-purple-800";
      case "close":
        return "bg-pink-100 text-pink-800";
      case "friends":
        return "bg-blue-100 text-blue-800";
      case "work":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
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

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border p-4 mb-3 cursor-pointer transition-all hover:shadow-md hover:border-primary-300 ${
        isOverdue ? "border-l-4 border-l-red-400" : "border-gray-200"
      }`}
    >
      <div className="flex items-center space-x-3">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          {person.avatar ? (
            <img
              src={person.avatar}
              alt={person.name}
              className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
            />
          ) : (
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-600">
                {person.name.charAt(0)}
              </span>
            </div>
          )}

          {/* Health score indicator */}
          <div
            className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center ${getHealthScoreBg(
              person.healthScore
            )}`}
          >
            <span
              className={`text-xs font-bold ${getHealthScoreColor(
                person.healthScore
              )}`}
            >
              {person.healthScore}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-semibold text-gray-900 truncate">
              {person.name}
            </h3>
            {isOverdue && (
              <ExclamationTriangleIcon className="w-4 h-4 text-red-500 flex-shrink-0" />
            )}
          </div>

          {/* Relation tag */}
          <div className="flex items-center space-x-2 mb-2">
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${getRelationColor(
                person.relation
              )}`}
            >
              {person.relation}
            </span>
            {hasUpcomingMilestone && (
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary-800">
                milestone soon
              </span>
            )}
          </div>

          {/* Meta info */}
          <div className="space-y-1">
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <ClockIcon className="w-3 h-3" />
              <span>Last contact: {formatLastContact()}</span>
            </div>

            {person.nextMilestone && (
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <CalendarDaysIcon className="w-3 h-3" />
                <span>
                  {person.nextMilestone.description} {formatNextMilestone()}
                </span>
              </div>
            )}
          </div>

          {/* Tags */}
          {person.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {person.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                >
                  {tag}
                </span>
              ))}
              {person.tags.length > 3 && (
                <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                  +{person.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Health indicator */}
        <div className="flex-shrink-0">
          {person.healthScore >= 80 ? (
            <HeartIconSolid className="w-5 h-5 text-green-500" />
          ) : (
            <HeartIcon
              className={`w-5 h-5 ${getHealthScoreColor(person.healthScore)}`}
            />
          )}
        </div>
      </div>

      {/* Progress indicators */}
      {(person.promises.length > 0 || isOverdue) && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs">
            {person.promises.length > 0 && (
              <span className="text-gray-600">
                {person.promises.filter((p) => !p.completed).length} open
                promises
              </span>
            )}
            {isOverdue && (
              <span className="text-red-600 font-medium">Overdue contact</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonCard;
