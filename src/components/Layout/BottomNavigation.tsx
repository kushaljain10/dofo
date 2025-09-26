import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  UserGroupIcon,
  InboxIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeIconSolid,
  MagnifyingGlassIcon as MagnifyingGlassIconSolid,
  UserGroupIcon as UserGroupIconSolid,
  InboxIcon as InboxIconSolid,
  UserIcon as UserIconSolid,
} from "@heroicons/react/24/solid";

const BottomNavigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    {
      id: "home",
      label: "Home",
      path: "/",
      icon: HomeIcon,
      iconSolid: HomeIconSolid,
    },
    {
      id: "people",
      label: "People",
      path: "/people",
      icon: UserGroupIcon,
      iconSolid: UserGroupIconSolid,
    },
    {
      id: "search",
      label: "Search",
      path: "/search",
      icon: MagnifyingGlassIcon,
      iconSolid: MagnifyingGlassIconSolid,
      isCenter: true,
    },
    {
      id: "inbox",
      label: "Inbox",
      path: "/inbox",
      icon: InboxIcon,
      iconSolid: InboxIconSolid,
    },
    {
      id: "profile",
      label: "Me",
      path: "/profile",
      icon: UserIcon,
      iconSolid: UserIconSolid,
    },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const getIconGradient = (itemId: string) => {
    switch (itemId) {
      case "home":
        return "gradient-lime";
      case "search":
        return "gradient-rainbow";
      case "people":
        return "gradient-pink";
      case "inbox":
        return "gradient-orange";
      case "profile":
        return "gradient-blue";
      default:
        return "gradient-purple";
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 nav-glass safe-area-bottom">
      <div className="flex items-center justify-around px-4 py-4">
        {navItems.map((item) => {
          const active = isActive(item.path);
          const Icon = active ? item.iconSolid : item.icon;
          const gradient = getIconGradient(item.id);

          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center min-w-0 flex-1 relative transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                item.isCenter ? "mx-2" : "py-2"
              }`}
            >
              {item.isCenter ? (
                <div className="relative">
                  <div
                    className={`p-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg hover:scale-110 transition-all duration-300 ${
                      active ? "animate-glow" : ""
                    }`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  {active && (
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-2">
                  <div
                    className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                      active
                        ? "bg-white/20 backdrop-blur-sm"
                        : "hover:bg-white/10"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 transition-colors ${
                        active ? "text-purple-600" : "text-gray-600"
                      }`}
                    />
                  </div>
                  <span
                    className={`text-xs font-medium transition-colors ${
                      active ? "text-purple-600" : "text-gray-500"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
