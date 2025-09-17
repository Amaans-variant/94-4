import React from 'react';
import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">EduPath Advisor</span>
            </div>
            <p className="text-gray-400 text-sm leading-6">
              Empowering students to make informed decisions about their educational journey and career paths.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/courses" className="hover:text-white transition-colors">Courses</a></li>
              <li><a href="/colleges" className="hover:text-white transition-colors">Colleges</a></li>
              <li><a href="/quiz" className="hover:text-white transition-colors">Career Quiz</a></li>
              <li><a href="/timeline" className="hover:text-white transition-colors">Important Dates</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Resources</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Study Materials</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Scholarships</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Exam Preparation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Career Guidance</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4" />
                <span className="text-sm">support@edupathadvisor.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">New Delhi, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2024 EduPath Advisor. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
};