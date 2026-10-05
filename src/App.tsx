import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store/useStore';
import MainLayout from './components/MainLayout';
import Onboarding from './screens/Onboarding';
import Home from './screens/Home';
import DailyCheckIn from './screens/DailyCheckIn';
import Workout from './screens/Workout';
import Nutrition from './screens/Nutrition';
import Progress from './screens/Progress';
import AICoach from './screens/AICoach';
import Profile from './screens/Profile';
import WorkoutSession from './screens/WorkoutSession';
import WorkoutSummary from './screens/WorkoutSummary';
import DemoMode from './components/DemoMode';
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const hasOnboarded = useStore(state => state.hasOnboarded);
  if (!hasOnboarded) return <Navigate to="/onboarding" replace />;
  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <div className="mx-auto max-w-[430px] min-h-screen bg-surface relative shadow-2xl overflow-hidden font-sans">
        <Routes>
          <Route path="/onboarding" element={<Onboarding />} />
          
          {/* Protected routes with bottom nav */}
          <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            <Route index element={<Home />} />
            <Route path="daily-checkin" element={<DailyCheckIn />} />
            <Route path="workout" element={<Workout />} />
            <Route path="nutrition" element={<Nutrition />} />
            <Route path="progress" element={<Progress />} />
            <Route path="ai-coach" element={<AICoach />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          
          {/* Fullscreen protected routes (no bottom nav) */}
          <Route path="/workout-session" element={<ProtectedRoute><WorkoutSession /></ProtectedRoute>} />
          <Route path="/workout-summary" element={<ProtectedRoute><WorkoutSummary /></ProtectedRoute>} />
        </Routes>
        
        {/* Hidden Developer Tool for Demo Scenarios */}
        <DemoMode />
      </div>
    </BrowserRouter>
  );
}

export default App;
