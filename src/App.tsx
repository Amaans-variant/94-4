import React, { useState, useEffect } from 'react';
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
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage first, then system preference
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      return JSON.parse(saved);
    }
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Apply dark mode class immediately
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Save to localStorage
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors duration-300">
        <Header 
          isAuthenticated={isAuthenticated} 
          onMenuToggle={handleMobileNavToggle}
          onLogout={handleLogout}
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        />
        
        <MobileNav 
          isOpen={isMobileNavOpen}
          onClose={() => setIsMobileNavOpen(false)}
          isAuthenticated={isAuthenticated}
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Landing isDarkMode={isDarkMode} />} />
            <Route path="/dashboard" element={
              isAuthenticated ? <Dashboard user={user} isDarkMode={isDarkMode} /> : <Login onLogin={handleLogin} isDarkMode={isDarkMode} />
            } />
            <Route path="/quiz" element={<Quiz isDarkMode={isDarkMode} />} />
            <Route path="/colleges" element={<Colleges isDarkMode={isDarkMode} />} />
            <Route path="/courses" element={<Courses isDarkMode={isDarkMode} />} />
            <Route path="/timeline" element={<Timeline isDarkMode={isDarkMode} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} isDarkMode={isDarkMode} />} />
            <Route path="/signup" element={<Signup onSignup={handleLogin} isDarkMode={isDarkMode} />} />
          </Routes>
        </main>

        <Footer isDarkMode={isDarkMode} />
        <Chatbot 
          isAuthenticated={isAuthenticated} 
          userName={user?.name || 'Student'} 
          isDarkMode={isDarkMode}
        />
      </div>
    </Router>
  );
}

export default App;