import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeftIcon,
  HeartIcon,
  ClockIcon,
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  PlusIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  SparklesIcon,
  PhoneIcon,
  EnvelopeIcon,
  GiftIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { Person, Promise as PromiseType } from "../types";
import { mockPeople } from "../data/mockData";

const PersonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [person, setPerson] = useState<Person | null>(null);
  const [activeTab, setActiveTab] = useState<
    "overview" | "history" | "promises"
  >("overview");

  useEffect(() => {
    if (id) {
      const foundPerson = mockPeople.find((p) => p.id === id);
      setPerson(foundPerson || null);
    }
  }, [id]);

  if (!person) {
    return (
      <div className="min-h-screen gradient-minimal flex items-center justify-center">
        <div className="text-center">
          <UserIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Person not found
          </h2>
          <button
            onClick={() => navigate("/people")}
            className="btn-minimal bg-purple-600 text-white"
          >
            Back to People
          </button>
        </div>
      </div>
    );
  }

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getHealthScoreGradient = (score: number) => {
    if (score >= 80) return "from-green-400 to-emerald-500";
    if (score >= 60) return "from-yellow-400 to-orange-500";
    return "from-red-400 to-pink-500";
  };

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
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Overdue";
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays < 7) return `In ${diffDays} days`;
    return `In ${Math.floor(diffDays / 7)} weeks`;
  };

  const isOverdue = person.lastContact
    ? new Date().getTime() - new Date(person.lastContact).getTime() >
      person.contactFrequency * 24 * 60 * 60 * 1000
    : false;

  const hasUpcomingMilestone = person.nextMilestone
    ? new Date(person.nextMilestone.date).getTime() - new Date().getTime() <
      7 * 24 * 60 * 60 * 1000
    : false;

  const relationStyle = getRelationStyle(person.relation);

  const openPromises = person.promises.filter((p) => !p.completed);
  const completedPromises = person.promises.filter((p) => p.completed);

  const mockAISuggestions = [
    {
      id: "1",
      type: "message",
      title: "Send a check-in message",
      description: `"Hey ${person.name}, how was your presentation last week? Hope it went well!"`,
      priority: "high" as const,
    },
    {
      id: "2",
      type: "gift",
      title: "Birthday gift idea",
      description:
        "Based on their interests in photography, consider a vintage camera book or workshop voucher.",
      priority: "medium" as const,
    },
    {
      id: "3",
      type: "meetup",
      title: "Suggest coffee meetup",
      description:
        "It's been 3 weeks since you last met. Suggest meeting at their favorite café downtown.",
      priority: "medium" as const,
    },
  ];

  return (
    <div className="min-h-screen gradient-minimal">
      {/* Header */}
      <div className="relative px-6 pt-16 pb-6">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate("/people")}
            className="p-2 bg-white/50 backdrop-blur-sm rounded-full mr-4 hover:bg-white/70 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Person Profile</h1>
        </div>

        {/* Person Summary Card */}
        <div className="card-floating p-6">
          <div className="flex items-start space-x-4">
            {/* Avatar with Health Score */}
            <div className="relative flex-shrink-0">
              {person.avatar ? (
                <img
                  src={person.avatar}
                  alt={person.name}
                  className="w-20 h-20 rounded-3xl shadow-lg"
                />
              ) : (
                <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-600">
                    {person.name.charAt(0)}
                  </span>
                </div>
              )}

              {/* Health Score Ring */}
              <div className="absolute -bottom-3 -right-3">
                <div className="relative w-12 h-12">
                  <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                      fill="none"
                      stroke="#f3f4f6"
                      strokeWidth="3"
                    />
                    <path
                      d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                      fill="none"
                      stroke="url(#healthGradient)"
                      strokeWidth="3"
                      strokeDasharray={`${person.healthScore}, 100`}
                      className="transition-all duration-500"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient
                        id="healthGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop
                          offset="0%"
                          stopColor={
                            person.healthScore >= 80
                              ? "#4ade80"
                              : person.healthScore >= 60
                              ? "#facc15"
                              : "#f87171"
                          }
                        />
                        <stop
                          offset="100%"
                          stopColor={
                            person.healthScore >= 80
                              ? "#10b981"
                              : person.healthScore >= 60
                              ? "#f97316"
                              : "#ec4899"
                          }
                        />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-gray-700">
                      {person.healthScore}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Person Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {person.name}
                  </h2>
                  {isOverdue && (
                    <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                  )}
                </div>
                {person.healthScore >= 80 ? (
                  <HeartIconSolid className="w-8 h-8 text-red-400" />
                ) : (
                  <HeartIcon className="w-8 h-8 text-gray-300" />
                )}
              </div>

              {/* Status Tags */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
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

                {isOverdue && (
                  <div className="flex items-center space-x-2 px-3 py-2 bg-red-50 rounded-full">
                    <ExclamationTriangleIcon className="w-4 h-4 text-red-500" />
                    <span className="text-sm font-semibold text-red-600">
                      overdue contact
                    </span>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="flex space-x-3">
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-full text-white transition-colors">
                  <PhoneIcon className="w-4 h-4" />
                  <span className="text-sm font-semibold">Call</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-full text-white transition-colors">
                  <EnvelopeIcon className="w-4 h-4" />
                  <span className="text-sm font-semibold">Message</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-full text-white transition-colors">
                  <PlusIcon className="w-4 h-4" />
                  <span className="text-sm font-semibold">Add Note</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-32">
        {/* Tab Navigation */}
        <div className="card-floating p-2 mb-6">
          <div className="flex space-x-2">
            {[
              { id: "overview", label: "Overview" },
              { id: "history", label: "History" },
              { id: "promises", label: "Promises" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-3 px-4 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-purple-600 text-white shadow-md"
                    : "hover:bg-gray-100 text-gray-700 hover:text-gray-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Key Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="card-glass p-6 text-center">
                <ClockIcon className="w-8 h-8 text-gray-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {formatLastContact()}
                </div>
                <div className="text-sm text-gray-600">Last Contact</div>
              </div>

              <div className="card-glass p-6 text-center">
                <div
                  className={`text-2xl font-bold mb-1 ${getHealthScoreColor(
                    person.healthScore
                  )}`}
                >
                  {person.healthScore}%
                </div>
                <div className="text-sm text-gray-600">Health Score</div>
              </div>
            </div>

            {/* Next Milestone */}
            {person.nextMilestone && (
              <div className="card-floating p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center">
                    <CalendarDaysIcon className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">
                      Upcoming Milestone
                    </h3>
                    <p className="text-gray-700 mb-2">
                      {person.nextMilestone.description}
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-semibold text-yellow-600">
                        {formatNextMilestone()}
                      </span>
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* AI Suggestions */}
            <div className="card-floating p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-purple-100 rounded-2xl flex items-center justify-center">
                  <SparklesIcon className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  AI Suggestions
                </h3>
              </div>

              <div className="space-y-4">
                {mockAISuggestions.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    className="p-4 bg-gray-50 rounded-2xl"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">
                        {suggestion.title}
                      </h4>
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          suggestion.priority === "high"
                            ? "bg-red-100 text-red-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {suggestion.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {suggestion.description}
                    </p>
                    <button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white text-sm font-semibold rounded-full transition-colors">
                      Take Action
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            {person.tags.length > 0 && (
              <div className="card-floating p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Tags & Interests
                </h3>
                <div className="flex flex-wrap gap-2">
                  {person.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-2 text-sm font-medium bg-white rounded-full border border-gray-200 text-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "history" && (
          <div className="space-y-4">
            <div className="card-floating p-6 text-center">
              <ChatBubbleLeftRightIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Interaction History
              </h3>
              <p className="text-gray-600 mb-4">
                This feature will show your complete conversation and
                interaction timeline with {person.name}.
              </p>
              <button className="btn-minimal bg-purple-600 text-white">
                Coming Soon
              </button>
            </div>
          </div>
        )}

        {activeTab === "promises" && (
          <div className="space-y-6">
            {/* Open Promises */}
            {openPromises.length > 0 && (
              <div className="card-floating p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Open Promises
                </h3>
                <div className="space-y-3">
                  {openPromises.map((promise) => (
                    <div
                      key={promise.id}
                      className="p-4 bg-orange-50 rounded-2xl border-l-4 border-orange-400"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 mb-1">
                            {promise.description}
                          </p>
                          <p className="text-sm text-orange-600">
                            Due:{" "}
                            {new Date(promise.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                        <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold rounded-full transition-colors">
                          Mark Complete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Completed Promises */}
            {completedPromises.length > 0 && (
              <div className="card-floating p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Completed Promises
                </h3>
                <div className="space-y-3">
                  {completedPromises.map((promise) => (
                    <div
                      key={promise.id}
                      className="p-4 bg-green-50 rounded-2xl border-l-4 border-green-400"
                    >
                      <div className="flex items-center space-x-3">
                        <CheckCircleIcon className="w-5 h-5 text-green-600" />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">
                            {promise.description}
                          </p>
                          <p className="text-sm text-green-600">
                            Completed:{" "}
                            {promise.completedDate &&
                              new Date(
                                promise.completedDate
                              ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No Promises */}
            {person.promises.length === 0 && (
              <div className="card-floating p-6 text-center">
                <GiftIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  No Promises Yet
                </h3>
                <p className="text-gray-600 mb-4">
                  Start building trust by making and keeping promises with{" "}
                  {person.name}.
                </p>
                <button className="btn-minimal bg-purple-600 text-white">
                  Add Promise
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonDetail;
