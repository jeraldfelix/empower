
import React, { useState, createContext, useContext, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/Landing';
import DashboardLayout from './components/Layout';
import DashboardHome from './pages/Dashboard';
import AICoach from './pages/Coach';
import CareerPlan from './pages/CareerPlan';
import ArtifactBuilder from './pages/ArtifactBuilder';
import InterviewLab from './pages/InterviewLab';
import Community from './pages/Community';
import Settings from './pages/Settings';
import { UserProfile } from './types';

// Context for global state
interface AppContextType {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (val: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>({
    name: 'Sarah Chen',
    careerStage: 'returner',
    industry: 'Technology',
    goals: ['Transition to Product Management', 'Negotiate a flexible work schedule'],
    bio: 'Returning to the workforce after a 3-year career break for caregiving.'
  });
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <AppContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route 
            path="/dashboard" 
            element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/" />}
          >
            <Route index element={<DashboardHome />} />
            <Route path="coach" element={<AICoach />} />
            <Route path="plan" element={<CareerPlan />} />
            <Route path="artifacts" element={<ArtifactBuilder />} />
            <Route path="interview" element={<InterviewLab />} />
            <Route path="community" element={<Community />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </AppContext.Provider>
  );
};

export default App;
