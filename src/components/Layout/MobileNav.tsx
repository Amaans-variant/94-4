import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose, isAuthenticated }) => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/courses', label: 'Courses' },
    { path: '/colleges', label: 'Colleges' },
    { path: '/quiz', label: 'Quiz' },
    { path: '/timeline', label: 'Timeline' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="fixed inset-0 bg-black bg-opacity-25" onClick={onClose} />
      <div className="relative flex flex-col w-full max-w-xs h-full bg-white shadow-xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`block px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                location.pathname === item.path
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              {item.label}
            </Link>
          ))}
          
          {isAuthenticated && (
            <Link
              to="/dashboard"
              onClick={onClose}
              className={`block px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                location.pathname === '/dashboard'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Dashboard
            </Link>
          )}
        </nav>
        
        {!isAuthenticated && (
          <div className="p-4 border-t space-y-2">
            <Link
              to="/login"
              onClick={onClose}
              className="block w-full px-4 py-3 text-center text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              onClick={onClose}
              className="block w-full px-4 py-3 text-center text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:shadow-lg transition-shadow"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};