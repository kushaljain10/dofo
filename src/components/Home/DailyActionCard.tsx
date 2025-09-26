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
      <div className="card-modern p-4 opacity-75">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 gradient-lime rounded-xl flex items-center justify-center">
            <CheckCircleIconSolid className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3
              className="font-semibold line-through"
              style={{ color: "var(--text-secondary)" }}
            >
              {action.title}
            </h3>
            <p className="text-sm font-medium text-green-600">Completed ✨</p>
          </div>
        </div>
      </div>
    );
  }

  const priorityStyle = getPriorityStyle();

  return (
    <div className={`card-colorful ${priorityStyle.gradient} p-5`}>
      <div className="flex items-start space-x-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {action.personAvatar ? (
            <img
              src={action.personAvatar}
              alt={action.personName}
              className="w-12 h-12 rounded-xl border-2 border-white shadow-lg"
            />
          ) : (
            <div className="w-12 h-12 bg-white/30 rounded-xl flex items-center justify-center border-2 border-white/50">
              <span className="text-lg font-bold text-white">
                {action.personName.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3
                className={`font-bold text-lg leading-tight ${priorityStyle.textColor} mb-1`}
              >
                {action.title}
              </h3>
              <p
                className={`text-sm ${priorityStyle.textColor}/80 leading-relaxed mb-3`}
              >
                {action.description}
              </p>

              {/* Meta info */}
              <div className="flex items-center space-x-4 mb-3">
                <div
                  className={`flex items-center space-x-2 px-3 py-1 ${priorityStyle.bgOpacity} rounded-xl`}
                >
                  <div className="text-white">{getActionIcon()}</div>
                  <span className="text-xs font-medium text-white capitalize">
                    {action.type}
                  </span>
                </div>
                {action.dueDate && (
                  <div
                    className={`flex items-center space-x-2 px-3 py-1 ${priorityStyle.bgOpacity} rounded-xl`}
                  >
                    <ClockIcon className="w-4 h-4 text-white" />
                    <span className="text-xs font-medium text-white">
                      {formatDueDate()}
                    </span>
                  </div>
                )}
              </div>

              {/* Tags */}
              {action.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {action.tags.map((tag, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 text-xs font-medium ${priorityStyle.bgOpacity} text-white rounded-xl`}
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
              className={`p-3 ${priorityStyle.bgOpacity} rounded-xl text-white hover:bg-white/30 transition-all duration-200 transform hover:scale-105 active:scale-95`}
              title="Mark as complete"
            >
              <CheckCircleIcon className="w-6 h-6" />
            </button>
          </div>

          {/* AI Draft Section */}
          {action.aiDraft && (
            <div className="mt-4 pt-4 border-t border-white/20">
              {!showDraft ? (
                <button
                  onClick={() => setShowDraft(true)}
                  className={`text-sm font-medium text-white hover:text-white/80 transition-colors px-4 py-2 ${priorityStyle.bgOpacity} rounded-xl`}
                >
                  View AI-suggested message ✨
                </button>
              ) : (
                <div className="space-y-3">
                  <div
                    className={`${priorityStyle.bgOpacity} rounded-xl p-4 border border-white/20`}
                  >
                    <p className="text-sm text-white/90 italic leading-relaxed">
                      "{action.aiDraft}"
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={handleSendMessage}
                      className="btn-modern bg-white text-gray-800 hover:bg-gray-50 flex-1 text-sm font-semibold"
                    >
                      Send Message
                    </button>
                    <button
                      onClick={() => setShowDraft(false)}
                      className={`px-4 py-2 text-sm text-white/80 hover:text-white transition-colors rounded-xl ${priorityStyle.bgOpacity}`}
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
