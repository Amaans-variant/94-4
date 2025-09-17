import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Layout/Header';
import { MobileNav } from './components/Layout/MobileNav';
import { Footer } from './components/Layout/Footer';
import { Chatbot } from './components/Chatbot/Chatbot';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { Quiz } from './pages/Quiz';
import { Colleges } from './pages/Colleges';
import { Courses } from './pages/Courses';
import { Timeline } from './pages/Timeline';
import { Login } from './pages/Auth/Login';
import { Signup } from './pages/Auth/Signup';

function App() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  const handleMobileNavToggle = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const handleLogin = (userData: { name: string; email: string }) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header 
          isAuthenticated={isAuthenticated} 
          onMenuToggle={handleMobileNavToggle}
          onLogout={handleLogout}
        />
        
        <MobileNav 
          isOpen={isMobileNavOpen}
          onClose={() => setIsMobileNavOpen(false)}
          isAuthenticated={isAuthenticated}
        />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={
              isAuthenticated ? <Dashboard /> : <Login onLogin={handleLogin} />
            } />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/colleges" element={<Colleges />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup onSignup={handleLogin} />} />
          </Routes>
        </main>

        <Footer />
        <Chatbot 
          isAuthenticated={isAuthenticated} 
          userName={user?.name || 'Student'} 
        />
      </div>
    </Router>
  );
}

export default App;