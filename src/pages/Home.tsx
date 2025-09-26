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

  // Mock user name - in real app, get from context/storage
  const userName = "Alex";

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
      <div className="relative px-6 pt-16 pb-4">
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold text-minimal mb-2">
            {getGreeting()}, {userName}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 space-y-6 pb-32">
        {/* Daily Questions - Compact */}
        <div className="card-floating p-6">
          <div className="text-center mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <SparklesIcon className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              Quick Check-in
            </h2>
            <p className="text-sm text-gray-600">
              Help DoFo understand your mood today
            </p>
          </div>
          <DailyQuestions
            onComplete={(answers) => {
              console.log("Daily questions completed:", answers);
            }}
          />
        </div>

        {/* Today's Focus Section */}
        {pendingActions.length > 0 && (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Today's Focus
              </h2>
              <p className="text-gray-600">
                {pendingActions.length} connections waiting for you
              </p>
            </div>

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
          </div>
        )}

        {/* All Caught Up State */}
        {pendingActions.length === 0 && (
          <div className="card-floating p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-breathe">
              <CheckCircleIcon className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              All caught up!
            </h3>
            <p className="text-gray-600 text-lg">
              No relationship actions for today. Perfect time to explore.
            </p>
          </div>
        )}

        {/* Completed Actions */}
        {completedActions.length > 0 && (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Completed Today
              </h2>
              <p className="text-gray-600">
                {completedActions.length} connections strengthened
              </p>
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

        {/* Welcome State */}
        {totalCount === 0 && (
          <div className="card-floating p-12 text-center">
            <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-breathe">
              <SparklesIcon className="w-12 h-12 text-purple-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to DoFo!
            </h3>
            <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
              Your AI relationship co-pilot. Let's start building meaningful
              connections.
            </p>
            <button className="btn-minimal text-purple-600 hover:bg-purple-50">
              Add Your First Person
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
