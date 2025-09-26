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
    <div className="min-h-screen" style={{ background: "var(--bg-secondary)" }}>
      {/* Header */}
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-32 gradient-rainbow opacity-10 rounded-b-[2rem]"></div>
        <div className="relative px-6 pt-12 pb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gradient mb-1">Inbox</h1>
              <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
                AI-discovered moments and insights
              </p>
            </div>
            <div className="w-12 h-12 gradient-orange rounded-2xl flex items-center justify-center animate-float">
              <div className="relative">
                <InboxIcon className="w-6 h-6 text-white" />
                {activeItems.length > 0 && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-lime-400 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-800">
                      {activeItems.length}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 space-y-6">
        {/* Active Items */}
        {activeItems.length > 0 ? (
          <div className="space-y-4">
            {activeItems.map((item) => {
              const person = item.personId
                ? getPersonById(item.personId)
                : null;

              const gradients = {
                birthday_detected: "gradient-purple",
                job_change: "gradient-lime",
                photo_memory: "gradient-blue",
                overdue_promise: "gradient-orange",
                relationship_insight: "gradient-pink",
              };

              const gradient =
                gradients[item.type as keyof typeof gradients] ||
                "gradient-cyan";

              return (
                <div
                  key={item.id}
                  className={`card-colorful ${gradient} p-5 overflow-hidden`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <div className="text-white">{getItemIcon(item.type)}</div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-bold text-white text-lg leading-tight mb-1">
                            {item.title}
                          </h3>
                          <p className="text-sm text-white/80 leading-relaxed mb-3">
                            {item.description}
                          </p>

                          {/* Person info */}
                          {person && (
                            <div className="flex items-center space-x-3 bg-white/20 rounded-xl p-3">
                              {person.avatar ? (
                                <img
                                  src={person.avatar}
                                  alt={person.name}
                                  className="w-8 h-8 rounded-lg border-2 border-white shadow-sm"
                                />
                              ) : (
                                <div className="w-8 h-8 bg-white/30 rounded-lg flex items-center justify-center">
                                  <span className="text-sm font-bold text-white">
                                    {person.name.charAt(0)}
                                  </span>
                                </div>
                              )}
                              <div className="flex-1">
                                <span className="text-sm font-semibold text-white block">
                                  {person.name}
                                </span>
                                <span className="text-xs text-white/70">
                                  {formatDate(item.date)}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Dismiss button */}
                        <button
                          onClick={() => handleDismiss(item.id)}
                          className="p-2 bg-white/20 rounded-xl text-white hover:bg-white/30 transition-colors"
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
          <div className="card-colorful gradient-cyan p-8 text-center">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-float">
              <InboxIcon className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              All caught up! 🎉
            </h3>
            <p className="text-white/80 text-lg max-w-sm mx-auto">
              No new relationship insights or moments detected. DoFo is quietly
              monitoring and will surface important updates here.
            </p>
          </div>
        )}

        {/* Dismissed Items */}
        {dismissedItems.length > 0 && (
          <div>
            <details className="card-modern overflow-hidden">
              <summary className="p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <span
                    className="font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Dismissed Items ({dismissedItems.length})
                  </span>
                  <ChevronRightIcon
                    className="w-5 h-5"
                    style={{ color: "var(--text-tertiary)" }}
                  />
                </div>
              </summary>

              <div className="border-t border-gray-200 p-4 space-y-3">
                {dismissedItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl opacity-75"
                  >
                    <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                      {getItemIcon(item.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4
                        className="font-medium truncate"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {item.title}
                      </h4>
                      <p
                        className="text-sm truncate"
                        style={{ color: "var(--text-tertiary)" }}
                      >
                        {item.description}
                      </p>
                    </div>
                    <span
                      className="text-xs"
                      style={{ color: "var(--text-tertiary)" }}
                    >
                      {formatDate(item.date)}
                    </span>
                  </div>
                ))}
              </div>
            </details>
          </div>
        )}

        {/* Help text */}
        <div className="card-colorful gradient-purple p-6 mb-20">
          <h4 className="font-bold text-white text-lg mb-3">
            💡 How Inbox Works
          </h4>
          <ul className="text-sm text-white/90 space-y-2">
            <li className="flex items-start space-x-2">
              <span className="w-1 h-1 bg-white/60 rounded-full mt-2 flex-shrink-0"></span>
              <span>
                DoFo analyzes your contacts and calendar for meaningful moments
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="w-1 h-1 bg-white/60 rounded-full mt-2 flex-shrink-0"></span>
              <span>
                Important dates, job changes, and relationship gaps are surfaced
                here
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="w-1 h-1 bg-white/60 rounded-full mt-2 flex-shrink-0"></span>
              <span>Tap dismiss on items you don't want to act on</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="w-1 h-1 bg-white/60 rounded-full mt-2 flex-shrink-0"></span>
              <span>
                AI suggests the most helpful actions for each situation
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
