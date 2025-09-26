import React, { useState } from "react";
import { DailyAction } from "../../types";
import {
  CheckCircleIcon,
  ClockIcon,
  HeartIcon,
  GiftIcon,
  ChatBubbleLeftIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleIconSolid } from "@heroicons/react/24/solid";

interface DailyActionCardProps {
  action: DailyAction;
  onComplete: (actionId: string) => void;
  onSendMessage?: (actionId: string, message: string) => void;
}

const DailyActionCard: React.FC<DailyActionCardProps> = ({
  action,
  onComplete,
  onSendMessage,
}) => {
  const [showDraft, setShowDraft] = useState(false);

  const getActionIcon = () => {
    switch (action.type) {
      case "birthday":
        return <GiftIcon className="w-5 h-5" />;
      case "followup":
        return <ChatBubbleLeftIcon className="w-5 h-5" />;
      case "promise":
        return <ClockIcon className="w-5 h-5" />;
      case "checkin":
        return <HeartIcon className="w-5 h-5" />;
      case "milestone":
        return <CalendarDaysIcon className="w-5 h-5" />;
      default:
        return <ChatBubbleLeftIcon className="w-5 h-5" />;
    }
  };

  const getPriorityStyle = () => {
    switch (action.priority) {
      case "high":
        return {
          gradient: "gradient-pink",
          textColor: "text-white",
          bgOpacity: "bg-white/20",
        };
      case "medium":
        return {
          gradient: "gradient-orange",
          textColor: "text-white",
          bgOpacity: "bg-white/20",
        };
      case "low":
        return {
          gradient: "gradient-lime",
          textColor: "text-white",
          bgOpacity: "bg-white/20",
        };
      default:
        return {
          gradient: "gradient-blue",
          textColor: "text-white",
          bgOpacity: "bg-white/20",
        };
    }
  };

  const formatDueDate = () => {
    if (!action.dueDate) return "";
    const now = new Date();
    const due = new Date(action.dueDate);
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays > 0) return `${diffDays} days`;
    return `${Math.abs(diffDays)} days overdue`;
  };

  const handleSendMessage = () => {
    if (action.aiDraft && onSendMessage) {
      onSendMessage(action.id, action.aiDraft);
      onComplete(action.id);
    }
  };

  if (action.completed) {
    return (
      <div className="card-glass p-6 opacity-80">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircleIconSolid className="w-6 h-6 text-green-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold line-through text-gray-500">
              {action.title}
            </h3>
            <p className="text-sm font-medium text-green-600">Completed ✨</p>
          </div>
        </div>
      </div>
    );
  }

  const getIconColor = () => {
    switch (action.priority) {
      case "high":
        return "bg-pink-100 text-pink-600";
      case "medium":
        return "bg-orange-100 text-orange-600";
      case "low":
        return "bg-green-100 text-green-600";
      default:
        return "bg-blue-100 text-blue-600";
    }
  };

  return (
    <div className="card-floating p-6 hover:scale-[1.02] transition-transform duration-300">
      <div className="flex items-start space-x-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {action.personAvatar ? (
            <img
              src={action.personAvatar}
              alt={action.personName}
              className="w-14 h-14 rounded-2xl border-2 border-gray-100 shadow-sm"
            />
          ) : (
            <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center">
              <span className="text-lg font-bold text-gray-600">
                {action.personName.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                {action.title}
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {action.description}
              </p>

              {/* Meta info */}
              <div className="flex items-center space-x-3 mb-4">
                <div
                  className={`flex items-center space-x-2 px-3 py-2 ${getIconColor()} rounded-full`}
                >
                  <div>{getActionIcon()}</div>
                  <span className="text-xs font-semibold capitalize">
                    {action.type}
                  </span>
                </div>
                {action.dueDate && (
                  <div className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-full">
                    <ClockIcon className="w-4 h-4 text-gray-600" />
                    <span className="text-xs font-semibold text-gray-600">
                      {formatDueDate()}
                    </span>
                  </div>
                )}
              </div>

              {/* Tags */}
              {action.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {action.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Action button */}
            <button
              onClick={() => onComplete(action.id)}
              className="p-3 bg-gray-100 hover:bg-green-100 rounded-full transition-all duration-200 transform hover:scale-105 active:scale-95 group"
              title="Mark as complete"
            >
              <CheckCircleIcon className="w-6 h-6 text-gray-600 group-hover:text-green-600 transition-colors" />
            </button>
          </div>

          {/* AI Draft Section */}
          {action.aiDraft && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              {!showDraft ? (
                <button
                  onClick={() => setShowDraft(true)}
                  className="text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors px-4 py-2 bg-purple-50 rounded-full"
                >
                  View AI-suggested message ✨
                </button>
              ) : (
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                    <p className="text-sm text-gray-700 italic leading-relaxed">
                      "{action.aiDraft}"
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={handleSendMessage}
                      className="btn-minimal bg-purple-600 text-white hover:bg-purple-700 flex-1 text-sm font-semibold"
                    >
                      Send Message
                    </button>
                    <button
                      onClick={() => setShowDraft(false)}
                      className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors rounded-full bg-gray-100"
                    >
                      Hide
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyActionCard;
