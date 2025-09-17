import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  Users, 
  GraduationCap,
  DollarSign,
  Heart,
  ExternalLink,
  Home,
  Globe
} from 'lucide-react';
import { colleges } from '../data/mockData';
import { College } from '../types';

export const Colleges: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    hasHostel: false,
    medium: '',
    maxFees: 1000000
  });
  const [savedColleges, setSavedColleges] = useState<string[]>(['1', '2']);
  const [showFilters, setShowFilters] = useState(false);

  const filteredColleges = colleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         college.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !filters.type || college.type === filters.type;
    const matchesHostel = !filters.hasHostel || college.hasHostel;
    const matchesMedium = !filters.medium || college.medium.includes(filters.medium as any);
    const matchesFees = college.fees <= filters.maxFees;

    return matchesSearch && matchesType && matchesHostel && matchesMedium && matchesFees;
  });

  const toggleSaved = (collegeId: string) => {
    setSavedColleges(prev => 
      prev.includes(collegeId) 
        ? prev.filter(id => id !== collegeId)
        : [...prev, collegeId]
    );
  };

  const formatFees = (fees: number) => {
    if (fees >= 100000) return `₹${(fees / 100000).toFixed(1)}L`;
    return `₹${(fees / 1000)}K`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Perfect College</h1>
          <p className="text-lg text-gray-600">
            Explore thousands of colleges and universities across India
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search colleges by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </button>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters({...filters, type: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Types</option>
                  <option value="Government">Government</option>
                  <option value="Private">Private</option>
                  <option value="Deemed">Deemed</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Medium</label>
                <select
                  value={filters.medium}
                  onChange={(e) => setFilters({...filters, medium: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Medium</option>
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Regional">Regional</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Fees</label>
                <select
                  value={filters.maxFees}
                  onChange={(e) => setFilters({...filters, maxFees: Number(e.target.value)})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value={1000000}>Any</option>
                  <option value={100000}>Under ₹1L</option>
                  <option value={300000}>Under ₹3L</option>
                  <option value={500000}>Under ₹5L</option>
                </select>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="hostel"
                  checked={filters.hasHostel}
                  onChange={(e) => setFilters({...filters, hasHostel: e.target.checked})}
                  className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="hostel" className="text-sm font-medium text-gray-700">
                  Hostel Available
                </label>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Results */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {filteredColleges.length} college{filteredColleges.length !== 1 ? 's' : ''}
          </p>
          <div className="text-sm text-gray-500">
            {savedColleges.length} saved
          </div>
        </div>

        {/* College Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredColleges.map((college, index) => (
            <motion.div
              key={college.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-200 overflow-hidden"
            >
              {/* College Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={college.image}
                  alt={college.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    college.type === 'Government' 
                      ? 'bg-green-100 text-green-800'
                      : college.type === 'Private'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    {college.type}
                  </span>
                </div>
                <button
                  onClick={() => toggleSaved(college.id)}
                  className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                >
                  <Heart
                    className={`h-5 w-5 ${
                      savedColleges.includes(college.id)
                        ? 'text-red-500 fill-current'
                        : 'text-gray-600'
                    }`}
                  />
                </button>
              </div>

              {/* College Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900 line-clamp-2 flex-1 mr-2">
                    {college.name}
                  </h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700 ml-1">
                      {college.rating}
                    </span>
                  </div>
                </div>

                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{college.location}</span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-gray-600">Fees: </span>
                    <span className="font-medium ml-1">{formatFees(college.fees)}</span>
                  </div>
                  <div className="flex items-center">
                    <GraduationCap className="h-4 w-4 text-blue-500 mr-1" />
                    <span className="text-gray-600">{college.courses.length} Courses</span>
                  </div>
                  {college.hasHostel && (
                    <div className="flex items-center">
                      <Home className="h-4 w-4 text-purple-500 mr-1" />
                      <span className="text-gray-600">Hostel</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 text-indigo-500 mr-1" />
                    <span className="text-gray-600">{college.medium.join(', ')}</span>
                  </div>
                </div>

                {/* Courses */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Popular Courses:</h4>
                  <div className="flex flex-wrap gap-1">
                    {college.courses.slice(0, 2).map((course, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                      >
                        {course.name}
                      </span>
                    ))}
                    {college.courses.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                        +{college.courses.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-shadow text-sm font-medium">
                    View Details
                  </button>
                  <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredColleges.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <GraduationCap className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No colleges found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};