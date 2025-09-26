import React, { useState } from "react";
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
    // In a real app, this would navigate to person detail page
    console.log("Opening profile for:", person.name);
    alert(`Opening ${person.name}'s profile (not implemented in demo)`);
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
    <div className="min-h-screen" style={{ background: "var(--bg-secondary)" }}>
      {/* Header */}
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-32 gradient-rainbow opacity-10 rounded-b-[2rem]"></div>
        <div className="relative px-6 pt-12 pb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gradient mb-1">
                Your People
              </h1>
              <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
                {stats.total} meaningful connections
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowCircles(!showCircles)}
                className={`p-3 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                  showCircles
                    ? "gradient-blue shadow-lg"
                    : "bg-white shadow-md hover:shadow-lg"
                }`}
              >
                <UsersIcon
                  className={`w-5 h-5 ${
                    showCircles ? "text-white" : "text-gray-600"
                  }`}
                />
              </button>
              <button className="btn-modern gradient-lime text-white">
                <PlusIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="card-colorful gradient-lime p-4 text-center">
              <div className="text-2xl font-bold text-white mb-1">
                {stats.total}
              </div>
              <div className="text-sm font-medium text-white/80">
                Total People
              </div>
            </div>
            <div className="card-colorful gradient-orange p-4 text-center">
              <div className="text-2xl font-bold text-white mb-1">
                {overdueCount}
              </div>
              <div className="text-sm font-medium text-white/80">
                Need Attention
              </div>
            </div>
            <div className="card-colorful gradient-purple p-4 text-center">
              <div className="text-2xl font-bold text-white mb-1">
                {upcomingMilestones}
              </div>
              <div className="text-sm font-medium text-white/80">This Week</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Controls */}
      <div className="px-6 pb-4">
        <div className="card-modern p-4 space-y-4">
          {/* Filters */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 gradient-blue rounded-xl flex items-center justify-center">
              <FunnelIcon className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-wrap gap-2 flex-1">
              {(["all", "family", "close", "friends", "work"] as const).map(
                (filterType) => (
                  <button
                    key={filterType}
                    onClick={() => setFilter(filterType)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                      filter === filterType
                        ? "gradient-pink text-white shadow-md"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {getFilterIcon(filterType)}
                    <span className="capitalize">{filterType}</span>
                    {filterType !== "all" && (
                      <span
                        className={`px-2 py-1 text-xs rounded-lg ${
                          filter === filterType
                            ? "bg-white/20 text-white"
                            : "bg-white text-gray-600"
                        }`}
                      >
                        {people.filter((p) => p.relation === filterType).length}
                      </span>
                    )}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Sort */}
          <div className="flex items-center space-x-3">
            <span
              className="text-sm font-medium"
              style={{ color: "var(--text-secondary)" }}
            >
              Sort by:
            </span>
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(
                  e.target.value as "name" | "lastContact" | "healthScore"
                )
              }
              className="text-sm border-0 bg-gray-100 rounded-xl px-4 py-2 focus:outline-none focus:bg-white focus:shadow-md transition-all"
              style={{ color: "var(--text-primary)" }}
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
        <div className="px-6 pb-4">
          <div className="card-modern p-6">
            <h3
              className="text-xl font-bold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Your Circles
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {mockCircles.map((circle, index) => {
                const gradients = [
                  "gradient-lime",
                  "gradient-purple",
                  "gradient-cyan",
                  "gradient-orange",
                ];
                const gradient = gradients[index % gradients.length];
                return (
                  <div
                    key={circle.id}
                    className={`card-colorful ${gradient} p-4`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-white">{circle.name}</h4>
                      <span className="text-sm font-medium text-white/80 bg-white/20 px-2 py-1 rounded-lg">
                        {circle.members.length}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 bg-white/20 rounded-full h-2">
                        <div
                          className="bg-white h-2 rounded-full transition-all duration-500"
                          style={{ width: `${circle.healthScore}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-white">
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
      <div className="px-6 space-y-4">
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
          <div className="card-colorful gradient-purple p-8 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-soft">
              <UserGroupIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              {filter === "all"
                ? "No people added yet"
                : `No ${filter} contacts`}
            </h3>
            <p className="text-white/80 mb-6">
              {filter === "all"
                ? "Add your first person to start building meaningful relationships"
                : `Add people to your ${filter} circle`}
            </p>
            <button className="btn-modern bg-white text-purple-600 hover:bg-gray-50">
              Add Person
            </button>
          </div>
        )}

        {/* Quick stats at bottom */}
        {filteredPeople.length > 0 && (
          <div className="card-modern p-4 mb-20">
            <div
              className="flex justify-between text-sm font-medium"
              style={{ color: "var(--text-secondary)" }}
            >
              <span>
                Showing {filteredPeople.length} of {people.length} people
              </span>
              <span>Avg health: {Math.round(stats.avgHealth)}%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default People;
