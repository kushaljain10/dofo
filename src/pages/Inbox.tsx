import React, { useState } from "react";
import { InboxItem } from "../types";
import { mockInboxItems, getPersonById } from "../data/mockData";
import {
  InboxIcon,
  GiftIcon,
  ExclamationTriangleIcon,
  CameraIcon,
  ArrowTrendingUpIcon,
  HeartIcon,
  XMarkIcon,
  CheckIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

const Inbox: React.FC = () => {
  const [items, setItems] = useState<InboxItem[]>(mockInboxItems);

  const getItemIcon = (type: InboxItem["type"]) => {
    switch (type) {
      case "birthday_detected":
        return <GiftIcon className="w-5 h-5 text-purple-500" />;
      case "job_change":
        return <ArrowTrendingUpIcon className="w-5 h-5 text-green-500" />;
      case "photo_memory":
        return <CameraIcon className="w-5 h-5 text-blue-500" />;
      case "overdue_promise":
        return <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />;
      case "relationship_insight":
        return <HeartIcon className="w-5 h-5 text-pink-500" />;
      default:
        return <InboxIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const getItemColor = (type: InboxItem["type"]) => {
    switch (type) {
      case "birthday_detected":
        return "border-l-purple-400 bg-purple-50";
      case "job_change":
        return "border-l-green-400 bg-green-50";
      case "photo_memory":
        return "border-l-blue-400 bg-blue-50";
      case "overdue_promise":
        return "border-l-red-400 bg-red-50";
      case "relationship_insight":
        return "border-l-pink-400 bg-pink-50";
      default:
        return "border-l-gray-400 bg-gray-50";
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const handleDismiss = (itemId: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, dismissed: true } : item
      )
    );
  };

  const handleAction = (itemId: string, actionIndex?: number) => {
    const item = items.find((i) => i.id === itemId);
    if (!item) return;

    if (actionIndex !== undefined && item.suggestedActions) {
      const action = item.suggestedActions[actionIndex];
      console.log(`Performing action: ${action} for item: ${item.title}`);
      alert(
        `Action: ${action}\n(This is a demo - action not actually performed)`
      );
    }

    // Mark as handled
    setItems((prevItems) =>
      prevItems.map((i) => (i.id === itemId ? { ...i, actionable: false } : i))
    );
  };

  const activeItems = items.filter((item) => !item.dismissed);
  const dismissedItems = items.filter((item) => item.dismissed);

  return (
    <div className="min-h-screen gradient-minimal">
      {/* Minimal Header */}
      <div className="relative px-6 pt-16 pb-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-minimal mb-3">Inbox</h1>
          <p className="text-lg font-medium text-gray-600 mb-6">
            AI-discovered moments and insights
          </p>

          {/* Notification Badge */}
          {activeItems.length > 0 && (
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-orange-100 rounded-full">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-orange-700">
                {activeItems.length} new notifications
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 space-y-6 pb-24">
        {/* Active Items */}
        {activeItems.length > 0 ? (
          <div className="space-y-4">
            {activeItems.map((item) => {
              const person = item.personId
                ? getPersonById(item.personId)
                : null;

              const getItemStyle = (type: string) => {
                switch (type) {
                  case "birthday_detected":
                    return {
                      bg: "bg-purple-50",
                      border: "border-purple-200",
                      icon: "text-purple-600",
                      dot: "bg-purple-400",
                    };
                  case "job_change":
                    return {
                      bg: "bg-green-50",
                      border: "border-green-200",
                      icon: "text-green-600",
                      dot: "bg-green-400",
                    };
                  case "photo_memory":
                    return {
                      bg: "bg-blue-50",
                      border: "border-blue-200",
                      icon: "text-blue-600",
                      dot: "bg-blue-400",
                    };
                  case "overdue_promise":
                    return {
                      bg: "bg-orange-50",
                      border: "border-orange-200",
                      icon: "text-orange-600",
                      dot: "bg-orange-400",
                    };
                  case "relationship_insight":
                    return {
                      bg: "bg-pink-50",
                      border: "border-pink-200",
                      icon: "text-pink-600",
                      dot: "bg-pink-400",
                    };
                  default:
                    return {
                      bg: "bg-gray-50",
                      border: "border-gray-200",
                      icon: "text-gray-600",
                      dot: "bg-gray-400",
                    };
                }
              };

              const itemStyle = getItemStyle(item.type);

              return (
                <div
                  key={item.id}
                  className={`card-floating p-6 ${itemStyle.bg} ${itemStyle.border} border-l-4`}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm`}
                    >
                      <div className={itemStyle.icon}>
                        {getItemIcon(item.type)}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <div
                              className={`w-2 h-2 ${itemStyle.dot} rounded-full animate-pulse`}
                            ></div>
                            <h3 className="font-bold text-gray-900 text-lg">
                              {item.title}
                            </h3>
                          </div>
                          <p className="text-gray-700 mb-4 leading-relaxed">
                            {item.description}
                          </p>

                          {/* Person info */}
                          {person && (
                            <div className="flex items-center space-x-3 bg-white/70 rounded-xl p-3 backdrop-blur-sm">
                              {person.avatar ? (
                                <img
                                  src={person.avatar}
                                  alt={person.name}
                                  className="w-10 h-10 rounded-xl border-2 border-white shadow-sm"
                                />
                              ) : (
                                <div className="w-10 h-10 bg-gray-200 rounded-xl flex items-center justify-center">
                                  <span className="text-sm font-bold text-gray-600">
                                    {person.name.charAt(0)}
                                  </span>
                                </div>
                              )}
                              <div className="flex-1">
                                <span className="text-sm font-semibold text-gray-900 block">
                                  {person.name}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {formatDate(item.date)}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Dismiss button */}
                        <button
                          onClick={() => handleDismiss(item.id)}
                          className="p-2 bg-white/70 hover:bg-white rounded-xl text-gray-600 hover:text-gray-800 transition-all"
                          title="Dismiss"
                        >
                          <XMarkIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Suggested Actions */}
                  {item.actionable &&
                    item.suggestedActions &&
                    item.suggestedActions.length > 0 && (
                      <div className="border-t border-gray-100 bg-white bg-opacity-50">
                        <div className="p-4">
                          <h4 className="text-sm font-medium text-gray-900 mb-3">
                            Suggested Actions:
                          </h4>
                          <div className="space-y-2">
                            {item.suggestedActions.map((action, index) => (
                              <button
                                key={index}
                                onClick={() => handleAction(item.id, index)}
                                className="w-full flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors text-left"
                              >
                                <span className="text-sm text-gray-900">
                                  {action}
                                </span>
                                <ChevronRightIcon className="w-4 h-4 text-gray-400" />
                              </button>
                            ))}
                          </div>

                          {/* Quick actions */}
                          <div className="flex space-x-2 mt-3">
                            <button
                              onClick={() => handleAction(item.id)}
                              className="flex-1 bg-primary-500 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-primary-600 transition-colors flex items-center justify-center space-x-2"
                            >
                              <CheckIcon className="w-4 h-4" />
                              <span>Mark as Done</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="card-floating p-12 text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-breathe">
              <InboxIcon className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              All caught up! 🎉
            </h3>
            <p className="text-gray-600 text-lg max-w-md mx-auto">
              No new relationship insights or moments detected. DoFo is quietly
              monitoring and will surface important updates here.
            </p>
          </div>
        )}

        {/* Dismissed Items */}
        {dismissedItems.length > 0 && (
          <div>
            <details className="card-floating overflow-hidden">
              <summary className="p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900">
                    Dismissed Items ({dismissedItems.length})
                  </span>
                  <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                </div>
              </summary>

              <div className="border-t border-gray-200 p-6 space-y-4">
                {dismissedItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl opacity-60"
                  >
                    <div className="w-10 h-10 bg-gray-200 rounded-xl flex items-center justify-center">
                      <div className="text-gray-500">
                        {getItemIcon(item.type)}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-600 truncate">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-500 truncate">
                        {item.description}
                      </p>
                    </div>
                    <span className="text-xs text-gray-400">
                      {formatDate(item.date)}
                    </span>
                  </div>
                ))}
              </div>
            </details>
          </div>
        )}

        {/* Help Section */}
        <div className="card-floating p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💡</span>
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">
              How Inbox Works
            </h4>
          </div>
          <div className="space-y-4 max-w-md mx-auto">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-700">
                DoFo analyzes your contacts and calendar for meaningful moments
              </span>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-700">
                Important dates, job changes, and relationship gaps are surfaced
                here
              </span>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-700">
                Tap dismiss on items you don't want to act on
              </span>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-700">
                AI suggests the most helpful actions for each situation
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
