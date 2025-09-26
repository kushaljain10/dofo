import React, { useState, useEffect } from "react";
import { DailyAction } from "../types";
import { mockDailyActions } from "../data/mockData";
import DailyActionCard from "../components/Home/DailyActionCard";
import DailyQuestions from "../components/Home/DailyQuestions";
import {
  SparklesIcon,
  HeartIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const Home: React.FC = () => {
  const [actions, setActions] = useState<DailyAction[]>(mockDailyActions);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const completedCount = actions.filter((action) => action.completed).length;
  const totalCount = actions.length;
  const progressPercentage =
    totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const getDateString = () => {
    return currentTime.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  const handleCompleteAction = (actionId: string) => {
    setActions((prevActions) =>
      prevActions.map((action) =>
        action.id === actionId ? { ...action, completed: true } : action
      )
    );
  };

  const handleSendMessage = (actionId: string, message: string) => {
    // In a real app, this would send the message via the appropriate channel
    console.log(`Sending message for action ${actionId}:`, message);

    // Show success toast (in a real app, you'd use a toast library)
    alert("Message sent successfully! 📱");
  };

  const pendingActions = actions.filter((action) => !action.completed);
  const completedActions = actions.filter((action) => action.completed);

  return (
    <div className="min-h-screen gradient-minimal">
      {/* Minimal Header */}
      <div className="relative px-6 pt-16 pb-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-minimal mb-3">
            {getGreeting()}
          </h1>
          <p className="text-lg font-medium" style={{ color: "var(--text-secondary)" }}>
            {getDateString()}
          </p>
        </div>

        {/* Progress Circle - Minimal */}
        {totalCount > 0 && (
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-white/50 backdrop-blur-md border border-white/30 flex items-center justify-center">
                <div className="relative w-24 h-24">
                  <svg className="w-24 h-24 -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                      fill="none"
                      stroke="rgba(139, 92, 246, 0.2)"
                      strokeWidth="2"
                    />
                    <path
                      d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="2"
                      strokeDasharray={`${progressPercentage}, 100`}
                      className="transition-all duration-1000 ease-out"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-bold text-purple-600">
                      {Math.round(progressPercentage)}%
                    </span>
                    <span className="text-xs text-gray-500">progress</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-6 space-y-6">
        {/* Daily Questions - Modern Card */}
        <div className="card-modern p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 gradient-blue rounded-xl flex items-center justify-center">
              <SparklesIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2
                className="text-xl font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                Quick Check-in
              </h2>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                Help DoFo understand your mood
              </p>
            </div>
          </div>
          <DailyQuestions
            onComplete={(answers) => {
              console.log("Daily questions completed:", answers);
              // In a real app, this would save the answers and improve AI suggestions
            }}
          />
        </div>

        {/* Today's Relationships */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 gradient-pink rounded-xl flex items-center justify-center">
                <HeartIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2
                  className="text-xl font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Today's Focus
                </h2>
                <p
                  className="text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {pendingActions.length} people need your attention
                </p>
              </div>
            </div>
          </div>

          {pendingActions.length > 0 ? (
            <div className="space-y-4">
              {pendingActions.map((action) => (
                <DailyActionCard
                  key={action.id}
                  action={action}
                  onComplete={handleCompleteAction}
                  onSendMessage={handleSendMessage}
                />
              ))}
            </div>
          ) : (
            <div className="card-colorful gradient-cyan p-8 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-soft">
                <CheckCircleIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                All caught up!
              </h3>
              <p className="text-white/80">
                No relationship actions for today. Perfect time to explore.
              </p>
            </div>
          )}
        </div>

        {/* Completed Actions */}
        {completedActions.length > 0 && (
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 gradient-lime rounded-xl flex items-center justify-center">
                <CheckCircleIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2
                  className="text-xl font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Completed Today
                </h2>
                <p
                  className="text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {completedActions.length} connections strengthened
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {completedActions.map((action) => (
                <DailyActionCard
                  key={action.id}
                  action={action}
                  onComplete={handleCompleteAction}
                  onSendMessage={handleSendMessage}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty state for no actions */}
        {totalCount === 0 && (
          <div className="card-colorful gradient-purple p-8 text-center">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-float">
              <SparklesIcon className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Welcome to DoFo!
            </h3>
            <p className="text-white/80 text-lg mb-6 max-w-sm mx-auto">
              Your AI relationship co-pilot. Let's start building meaningful
              connections.
            </p>
            <button className="btn-modern bg-white text-purple-600 hover:bg-gray-50">
              Add Your First Person
            </button>
          </div>
        )}

        {/* Bottom spacing for navigation */}
        <div className="h-20"></div>
      </div>
    </div>
  );
};

export default Home;
