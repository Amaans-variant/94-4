import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  AlertCircle,
  CheckCircle2,
  Filter,
  Bell,
  ExternalLink,
  Plus
} from 'lucide-react';
import { timelineEvents } from '../data/mockData';
import { TimelineEvent } from '../types';

export const Timeline: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [events, setEvents] = useState(timelineEvents);
  const [showAddEvent, setShowAddEvent] = useState(false);

  const filters = [
    { key: 'all', label: 'All Events', count: events.length },
    { key: 'exam', label: 'Exams', count: events.filter(e => e.type === 'exam').length },
    { key: 'admission', label: 'Admissions', count: events.filter(e => e.type === 'admission').length },
    { key: 'scholarship', label: 'Scholarships', count: events.filter(e => e.type === 'scholarship').length }
  ];

  const priorities = [
    { key: 'all', label: 'All Priority' },
    { key: 'high', label: 'High Priority' },
    { key: 'medium', label: 'Medium Priority' },
    { key: 'low', label: 'Low Priority' }
  ];

  const filteredEvents = events.filter(event => {
    const matchesType = selectedFilter === 'all' || event.type === selectedFilter;
    const matchesPriority = selectedPriority === 'all' || event.priority === selectedPriority;
    return matchesType && matchesPriority;
  });

  const toggleEventStatus = (eventId: string) => {
    setEvents(prev => 
      prev.map(event => 
        event.id === eventId 
          ? { ...event, completed: !event.completed }
          : event
      )
    );
  };

  const getEventIcon = (type: string, completed: boolean) => {
    if (completed) return CheckCircle2;
    
    switch (type) {
      case 'exam':
        return Clock;
      case 'admission':
        return Calendar;
      case 'scholarship':
        return AlertCircle;
      default:
        return Calendar;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'exam':
        return 'bg-blue-500';
      case 'admission':
        return 'bg-purple-500';
      case 'scholarship':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      year: date.getFullYear()
    };
  };

  const daysUntil = (dateString: string) => {
    const today = new Date();
    const eventDate = new Date(dateString);
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Important Dates & Deadlines</h1>
          <p className="text-lg text-gray-600">
            Stay on top of admissions, exams, and scholarship deadlines
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Filters */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6 sticky top-8"
            >
              {/* Add Event Button */}
              <button
                onClick={() => setShowAddEvent(true)}
                className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-shadow mb-6"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Event
              </button>

              {/* Event Type Filters */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Event Type</h3>
                <div className="space-y-2">
                  {filters.map(filter => (
                    <button
                      key={filter.key}
                      onClick={() => setSelectedFilter(filter.key)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedFilter === filter.key
                          ? 'bg-blue-100 text-blue-800'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <span>{filter.label}</span>
                      <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
                        {filter.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Priority Filters */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Priority</h3>
                <div className="space-y-2">
                  {priorities.map(priority => (
                    <button
                      key={priority.key}
                      onClick={() => setSelectedPriority(priority.key)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedPriority === priority.key
                          ? 'bg-blue-100 text-blue-800'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {priority.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 gap-3">
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <div className="text-lg font-bold text-red-600">
                      {events.filter(e => e.priority === 'high' && !e.completed).length}
                    </div>
                    <div className="text-xs text-red-700">High Priority</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">
                      {events.filter(e => e.completed).length}
                    </div>
                    <div className="text-xs text-green-700">Completed</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Main Content - Timeline */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {filteredEvents.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                  <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
                  <p className="text-gray-600">Try adjusting your filters or add a new event.</p>
                </div>
              ) : (
                filteredEvents.map((event, index) => {
                  const EventIcon = getEventIcon(event.type, event.completed);
                  const dateInfo = formatDate(event.date);
                  const daysDiff = daysUntil(event.date);
                  
                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden ${
                        event.completed ? 'opacity-75' : ''
                      }`}
                    >
                      <div className="p-6">
                        <div className="flex items-start space-x-4">
                          {/* Date Display */}
                          <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex flex-col items-center justify-center text-white">
                              <div className="text-xs font-medium">{dateInfo.month}</div>
                              <div className="text-lg font-bold">{dateInfo.day}</div>
                            </div>
                          </div>

                          {/* Event Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <h3 className={`text-lg font-semibold ${
                                  event.completed ? 'line-through text-gray-500' : 'text-gray-900'
                                }`}>
                                  {event.title}
                                </h3>
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${
                                  getPriorityColor(event.priority)
                                }`}>
                                  {event.priority}
                                </span>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => toggleEventStatus(event.id)}
                                  className={`p-1.5 rounded-full transition-colors ${
                                    event.completed
                                      ? 'text-green-600 bg-green-100'
                                      : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
                                  }`}
                                >
                                  <CheckCircle2 className="h-4 w-4" />
                                </button>
                                <button className="p-1.5 rounded-full text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                                  <Bell className="h-4 w-4" />
                                </button>
                                <button className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors">
                                  <ExternalLink className="h-4 w-4" />
                                </button>
                              </div>
                            </div>

                            <p className={`text-gray-600 mb-3 ${
                              event.completed ? 'line-through' : ''
                            }`}>
                              {event.description}
                            </p>

                            <div className="flex items-center space-x-4 text-sm">
                              <div className="flex items-center">
                                <div className={`w-2 h-2 rounded-full mr-2 ${getTypeColor(event.type)}`}></div>
                                <span className="text-gray-600 capitalize">{event.type}</span>
                              </div>
                              
                              {!event.completed && (
                                <div className="flex items-center">
                                  <Clock className="h-3 w-3 text-gray-400 mr-1" />
                                  <span className={`${
                                    daysDiff < 0 ? 'text-red-600 font-medium' :
                                    daysDiff < 7 ? 'text-orange-600 font-medium' :
                                    'text-gray-600'
                                  }`}>
                                    {daysDiff < 0 
                                      ? `${Math.abs(daysDiff)} days overdue`
                                      : daysDiff === 0
                                      ? 'Today'
                                      : daysDiff === 1
                                      ? 'Tomorrow'
                                      : `${daysDiff} days left`
                                    }
                                  </span>
                                </div>
                              )}

                              {event.completed && (
                                <div className="flex items-center text-green-600">
                                  <CheckCircle2 className="h-3 w-3 mr-1" />
                                  <span>Completed</span>
                                </div>
                              )}
                            </div>

                            {/* Progress Bar for upcoming events */}
                            {!event.completed && daysDiff > 0 && daysDiff <= 30 && (
                              <div className="mt-3">
                                <div className="w-full bg-gray-200 rounded-full h-1">
                                  <div
                                    className={`h-1 rounded-full transition-all duration-300 ${
                                      daysDiff <= 7 ? 'bg-red-500' :
                                      daysDiff <= 14 ? 'bg-yellow-500' :
                                      'bg-green-500'
                                    }`}
                                    style={{ width: `${Math.max(10, 100 - (daysDiff / 30) * 100)}%` }}
                                  ></div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};