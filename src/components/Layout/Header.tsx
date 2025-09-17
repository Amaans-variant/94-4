import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, User, Bell, Menu, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  isAuthenticated: boolean;
  onMenuToggle: () => void;
  onLogout?: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isAuthenticated, onMenuToggle, onLogout, isDarkMode, onToggleDarkMode }) => {
  const location = useLocation();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Array<{ id: string; title: string; time: string; read: boolean }>>([
    { id: 'n1', title: 'New recommendation: B.Tech Computer Science', time: '2m ago', read: false },
    { id: 'n2', title: 'Upcoming: NEET Application deadline', time: '1h ago', read: false },
    { id: 'n3', title: 'Timeline updated: DU admission process', time: 'Yesterday', read: true },
  ]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleToggleNotification = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: !n.read } : n)));
  };
  
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/courses', label: 'Courses' },
    { path: '/colleges', label: 'Colleges' },
    { path: '/quiz', label: 'Quiz' },
    { path: '/timeline', label: 'Timeline' }
  ];

  return (
    <header className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-100 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl group-hover:shadow-lg transition-shadow">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              EduPath Advisor
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsNotificationsOpen(o => !o)}
                    className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative"
                    aria-label="Notifications"
                    aria-haspopup="menu"
                    aria-expanded={isNotificationsOpen}
                  >
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 min-h-4 min-w-4 px-1 bg-red-500 rounded-full text-[10px] leading-4 text-white flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {isNotificationsOpen && (
                    <div
                      role="menu"
                      className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50"
                    >
                      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">Notifications</span>
                        <button
                          onClick={handleMarkAllRead}
                          className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          Mark all as read
                        </button>
                      </div>
                      <ul className="max-h-80 overflow-auto">
                        {notifications.length === 0 && (
                          <li className="px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400">No notifications</li>
                        )}
                        {notifications.map(n => (
                          <li
                            key={n.id}
                            className={`px-4 py-3 flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${n.read ? 'opacity-75' : ''}`}
                            onClick={() => handleToggleNotification(n.id)}
                          >
                            <span className={`mt-1 h-2 w-2 rounded-full ${n.read ? 'bg-gray-300 dark:bg-gray-600' : 'bg-blue-600'}`} />
                            <div className="flex-1">
                              <div className="text-sm text-gray-800 dark:text-gray-200">{n.title}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{n.time}</div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                {/* Dark Mode Toggle */}
                <button
                  onClick={onToggleDarkMode}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  aria-label="Toggle dark mode"
                >
                  {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
                
                <div className="flex items-center space-x-2">
                  <Link 
                    to="/dashboard" 
                    className="flex items-center space-x-2 p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <User className="h-5 w-5" />
                    <span className="hidden md:inline">Dashboard</span>
                  </Link>
                  {onLogout && (
                    <button
                      onClick={onLogout}
                      className="px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-red-600 transition-colors"
                    >
                      Logout
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                {/* Dark Mode Toggle for non-authenticated users */}
                <button
                  onClick={onToggleDarkMode}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  aria-label="Toggle dark mode"
                >
                  {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
                
                <Link
                  to="/login"
                  className="px-4 py-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-shadow"
                >
                  Sign Up
                </Link>
              </div>
            )}
            
            {/* Mobile menu button */}
            <button 
              onClick={onMenuToggle}
              className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};