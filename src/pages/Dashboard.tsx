import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  GraduationCap, 
  TrendingUp, 
  Calendar,
  Star,
  Clock,
  ArrowRight,
  Target,
  Award,
  Bell
} from 'lucide-react';
import { mockUser } from '../data/mockData';

export const Dashboard: React.FC = () => {
  const user = mockUser;

  const quickActions = [
    {
      icon: BookOpen,
      title: 'Retake Quiz',
      description: 'Update your preferences',
      color: 'bg-blue-500',
      link: '/quiz'
    },
    {
      icon: GraduationCap,
      title: 'Explore Colleges',
      description: 'Find your perfect match',
      color: 'bg-purple-500',
      link: '/colleges'
    },
    {
      icon: TrendingUp,
      title: 'Career Paths',
      description: 'Visualize your future',
      color: 'bg-green-500',
      link: '/courses'
    },
    {
      icon: Calendar,
      title: 'Important Dates',
      description: 'Stay on track',
      color: 'bg-orange-500',
      link: '/timeline'
    }
  ];

  const recentActivity = [
    { action: 'Saved IIT Delhi to favorites', time: '2 hours ago', icon: Star },
    { action: 'Completed Career Assessment', time: '1 day ago', icon: Target },
    { action: 'Viewed B.Tech Computer Science', time: '2 days ago', icon: BookOpen },
    { action: 'Updated profile information', time: '3 days ago', icon: Award }
  ];

  const upcomingDeadlines = [
    { title: 'JEE Main Registration', date: 'Feb 1, 2024', priority: 'high' },
    { title: 'NEET Application', date: 'Feb 15, 2024', priority: 'high' },
    { title: 'DU Admission Process', date: 'Mar 1, 2024', priority: 'medium' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}! 👋</h1>
              <p className="text-blue-100 text-lg">
                Ready to continue your educational journey? Here's what's happening today.
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold">Class {user.class}</div>
                <div className="text-sm text-blue-100">Current Level</div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <motion.a
                    key={index}
                    href={action.link}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${action.color} text-white group-hover:shadow-lg transition-shadow`}>
                        <action.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                          {action.title}
                        </h3>
                        <p className="text-sm text-gray-600">{action.description}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Personalized Recommendations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Recommendations</h2>
              <div className="space-y-4">
                {user.recommendations.map((rec, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            rec.type === 'course' 
                              ? 'bg-blue-100 text-blue-800'
                              : rec.type === 'college'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {rec.type.toUpperCase()}
                          </span>
                          <span className="text-sm font-medium text-green-600">
                            {rec.relevanceScore}% Match
                          </span>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-1">{rec.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{rec.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {rec.reasons.map((reason, i) => (
                            <span key={i} className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-700">
                              {reason}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button className="ml-4 text-blue-600 hover:text-blue-700 transition-colors">
                        <ArrowRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <activity.icon className="h-4 w-4 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-500 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Summary</h2>
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-3">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="font-medium text-gray-900">{user.name}</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Class:</span>
                  <span className="text-sm font-medium">{user.class}th</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Quiz Status:</span>
                  <span className="text-sm font-medium text-green-600">
                    {user.completedQuiz ? 'Completed' : 'Pending'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Saved Colleges:</span>
                  <span className="text-sm font-medium">{user.savedColleges.length}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Interests</h4>
                <div className="flex flex-wrap gap-2">
                  {user.interests.map((interest, i) => (
                    <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Upcoming Deadlines */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Upcoming Deadlines</h2>
                <Bell className="h-5 w-5 text-gray-400" />
              </div>
              <div className="space-y-3">
                {upcomingDeadlines.map((deadline, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-3 h-3 rounded-full ${
                      deadline.priority === 'high' ? 'bg-red-500' :
                      deadline.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{deadline.title}</p>
                      <p className="text-xs text-gray-600">{deadline.date}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
                View All Deadlines →
              </button>
            </motion.div>

            {/* Achievement Badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white text-center"
            >
              <Award className="h-12 w-12 mx-auto mb-3 text-white" />
              <h3 className="font-semibold mb-1">Career Explorer</h3>
              <p className="text-sm text-green-100">
                You've completed your career assessment! Keep exploring to unlock more insights.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};