import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import Search from "./pages/Search";
import People from "./pages/People";
import Inbox from "./pages/Inbox";
import Profile from "./pages/Profile";
import Onboarding from "./pages/Onboarding";

// Component to handle routing logic inside Router
const AppRoutes: React.FC = () => {
  const location = useLocation();
  const [isOnboardingComplete, setIsOnboardingComplete] = useState<
    boolean | null
  >(null);

  useEffect(() => {
    // Check if onboarding is complete
    const onboardingComplete = localStorage.getItem("dofo_onboarding_complete");
    setIsOnboardingComplete(onboardingComplete === "true");
  }, []);

  // Force onboarding for special routes
  const isOnboardingRoute =
    location.pathname === "/onboarding" || location.pathname === "/welcome";

  // Show loading while checking onboarding status
  if (isOnboardingComplete === null && !isOnboardingRoute) {
    return (
      <div className="min-h-screen gradient-minimal flex items-center justify-center">
        <div className="text-center">
          <div className="orb-holographic animate-breathe mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-minimal">DoFo</h1>
        </div>
      </div>
    );
  }

  // Show onboarding if not complete OR if on onboarding route
  if (!isOnboardingComplete || isOnboardingRoute) {
    return (
      <Routes>
        <Route path="*" element={<Onboarding />} />
      </Routes>
    );
  }

  // Show main app if onboarding is complete
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/people" element={<People />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Layout>
  );
};

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
