import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Person } from "../types";
import { mockPeople, mockCircles } from "../data/mockData";
import PersonCard from "../components/People/PersonCard";
import {
  UserGroupIcon,
  FunnelIcon,
  PlusIcon,
  HeartIcon,
  UsersIcon,
  BuildingOfficeIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";

const People: React.FC = () => {
  const navigate = useNavigate();
  const [people] = useState<Person[]>(mockPeople);
  const [filter, setFilter] = useState<
    "all" | "family" | "close" | "friends" | "work"
  >("all");
  const [sortBy, setSortBy] = useState<"name" | "lastContact" | "healthScore">(
    "healthScore"
  );
  const [showCircles, setShowCircles] = useState(false);

  const getFilteredPeople = () => {
    let filtered = people;

    if (filter !== "all") {
      filtered = filtered.filter((person) => person.relation === filter);
    }

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "lastContact":
          if (!a.lastContact && !b.lastContact) return 0;
          if (!a.lastContact) return 1;
          if (!b.lastContact) return -1;
          return (
            new Date(b.lastContact).getTime() -
            new Date(a.lastContact).getTime()
          );
        case "healthScore":
        default:
          return b.healthScore - a.healthScore;
      }
    });
  };

  const getFilterIcon = (filterType: string) => {
    switch (filterType) {
      case "family":
        return <HomeIcon className="w-4 h-4" />;
      case "close":
        return <HeartIcon className="w-4 h-4" />;
      case "friends":
        return <UsersIcon className="w-4 h-4" />;
      case "work":
        return <BuildingOfficeIcon className="w-4 h-4" />;
      default:
        return <UserGroupIcon className="w-4 h-4" />;
    }
  };

  const getCircleStats = () => {
    const total = people.length;
    const family = people.filter((p) => p.relation === "family").length;
    const close = people.filter((p) => p.relation === "close").length;
    const friends = people.filter((p) => p.relation === "friends").length;
    const work = people.filter((p) => p.relation === "work").length;
    const avgHealth = people.reduce((sum, p) => sum + p.healthScore, 0) / total;

    return { total, family, close, friends, work, avgHealth };
  };

  const handlePersonClick = (person: Person) => {
    navigate(`/people/${person.id}`);
  };

  const filteredPeople = getFilteredPeople();
  const stats = getCircleStats();
  const overdueCount = people.filter((p) => p.cadence?.overdue).length;
  const upcomingMilestones = people.filter(
    (p) =>
      p.nextMilestone &&
      new Date(p.nextMilestone.date).getTime() - new Date().getTime() <=
        7 * 24 * 60 * 60 * 1000
  ).length;

  return (
    <div className="min-h-screen gradient-minimal">
      {/* Minimal Header */}
      <div className="relative px-6 pt-16 pb-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-minimal mb-3">Your People</h1>
          <p className="text-lg font-medium text-gray-600">
            {stats.total} meaningful connections
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setShowCircles(!showCircles)}
            className={`btn-glass px-6 py-3 flex items-center ${
              showCircles ? "bg-purple-100" : ""
            }`}
          >
            <UsersIcon className="w-5 h-5 text-purple-600 mr-2" />
            <span className="font-medium text-purple-600">Circles</span>
          </button>
          <button className="btn-minimal bg-purple-600 text-white hover:bg-purple-700 flex items-center">
            <PlusIcon className="w-5 h-5 mr-2" />
            <span className="font-medium">Add Person</span>
          </button>
        </div>

        {/* Stats Grid - Minimal */}
        <div className="grid grid-cols-3 gap-4">
          <div className="card-glass p-6 text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {stats.total}
            </div>
            <div className="text-sm font-medium text-gray-600">Total</div>
          </div>
          <div className="card-glass p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {overdueCount}
            </div>
            <div className="text-sm font-medium text-gray-600">
              Need Attention
            </div>
          </div>
          <div className="card-glass p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {upcomingMilestones}
            </div>
            <div className="text-sm font-medium text-gray-600">This Week</div>
          </div>
        </div>
      </div>

      {/* Filters & Controls */}
      <div className="px-6 pb-6">
        <div className="card-floating p-6">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {(["all", "family", "close", "friends", "work"] as const).map(
              (filterType) => (
                <button
                  key={filterType}
                  onClick={() => setFilter(filterType)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    filter === filterType
                      ? "bg-purple-600 text-white shadow-md"
                      : "btn-glass hover:bg-purple-100 hover:text-purple-800"
                  }`}
                >
                  {getFilterIcon(filterType)}
                  <span className="capitalize">{filterType}</span>
                  {filterType !== "all" && (
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        filter === filterType
                          ? "bg-white/20 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {people.filter((p) => p.relation === filterType).length}
                    </span>
                  )}
                </button>
              )
            )}
          </div>

          {/* Sort */}
          <div className="flex items-center justify-center space-x-3">
            <span className="text-sm font-medium text-gray-600">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(
                  e.target.value as "name" | "lastContact" | "healthScore"
                )
              }
              className="text-sm border-0 bg-gray-100 rounded-full px-4 py-2 focus:outline-none focus:bg-white focus:shadow-md transition-all text-gray-700"
            >
              <option value="healthScore">Health Score</option>
              <option value="lastContact">Last Contact</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>
      </div>

      {/* Circles View */}
      {showCircles && (
        <div className="px-6 pb-6">
          <div className="card-floating p-8">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-6">
              Your Circles
            </h3>
            <div className="grid grid-cols-2 gap-6">
              {mockCircles.map((circle, index) => {
                const colors = [
                  {
                    bg: "bg-purple-50",
                    text: "text-purple-600",
                    progress: "bg-purple-500",
                  },
                  {
                    bg: "bg-blue-50",
                    text: "text-blue-600",
                    progress: "bg-blue-500",
                  },
                  {
                    bg: "bg-green-50",
                    text: "text-green-600",
                    progress: "bg-green-500",
                  },
                  {
                    bg: "bg-orange-50",
                    text: "text-orange-600",
                    progress: "bg-orange-500",
                  },
                ];
                const color = colors[index % colors.length];
                return (
                  <div
                    key={circle.id}
                    className={`${color.bg} p-6 rounded-2xl border border-gray-100`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className={`font-bold ${color.text}`}>
                        {circle.name}
                      </h4>
                      <span
                        className={`text-sm font-semibold ${color.text} bg-white px-3 py-1 rounded-full`}
                      >
                        {circle.members.length}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 bg-white rounded-full h-3">
                        <div
                          className={`${color.progress} h-3 rounded-full transition-all duration-500`}
                          style={{ width: `${circle.healthScore}%` }}
                        />
                      </div>
                      <span className={`text-sm font-bold ${color.text}`}>
                        {circle.healthScore}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* People List */}
      <div className="px-6 space-y-6 pb-24">
        {filteredPeople.length > 0 ? (
          <>
            {filteredPeople.map((person) => (
              <PersonCard
                key={person.id}
                person={person}
                onClick={() => handlePersonClick(person)}
              />
            ))}
          </>
        ) : (
          <div className="card-floating p-12 text-center">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-breathe">
              <UserGroupIcon className="w-10 h-10 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {filter === "all"
                ? "No people added yet"
                : `No ${filter} contacts`}
            </h3>
            <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
              {filter === "all"
                ? "Add your first person to start building meaningful relationships"
                : `Add people to your ${filter} circle`}
            </p>
            <button className="btn-minimal bg-purple-600 text-white hover:bg-purple-700 flex items-center">
              <PlusIcon className="w-5 h-5 mr-2" />
              Add Person
            </button>
          </div>
        )}

        {/* Quick stats at bottom */}
        {filteredPeople.length > 0 && (
          <div className="card-glass p-6 text-center">
            <div className="flex justify-center space-x-8 text-sm">
              <span className="font-medium text-gray-700">
                Showing {filteredPeople.length} of {people.length} people
              </span>
              <span className="font-medium text-gray-700">
                Avg health: {Math.round(stats.avgHealth)}%
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default People;
