import React, { ReactNode } from "react";
import BottomNavigation from "./BottomNavigation";

interface LayoutProps {
  children: ReactNode;
  showBottomNav?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showBottomNav = true }) => {
  return (
    <div className="min-h-screen bg-gray-50 pb-safe">
      <main className={`flex-1 ${showBottomNav ? "pb-20" : ""}`}>
        {children}
      </main>
      {showBottomNav && <BottomNavigation />}
    </div>
  );
};

export default Layout;
