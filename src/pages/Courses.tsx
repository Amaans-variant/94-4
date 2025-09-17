import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Clock, 
  TrendingUp, 
  DollarSign,
  Users,
  Filter,
  Search,
  ArrowRight,
  Star,
  Target
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { courses } from '../data/mockData';

const COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B'];

const careerGrowthData = [
  { year: 'Year 1', salary: 300000 },
  { year: 'Year 3', salary: 500000 },
  { year: 'Year 5', salary: 800000 },
  { year: 'Year 7', salary: 1200000 },
  { year: 'Year 10', salary: 1800000 }
];

const streamDistribution = [
  { name: 'Science', value: 40, color: '#3B82F6' },
  { name: 'Commerce', value: 30, color: '#8B5CF6' },
  { name: 'Arts', value: 20, color: '#10B981' },
  { name: 'Vocational', value: 10, color: '#F59E0B' }
];

export const Courses: React.FC = () => {
  const [selectedStream, setSelectedStream] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(courses[0]);

  const filteredCourses = courses.filter(course => {
    const matchesStream = selectedStream === 'All' || course.stream === selectedStream;
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStream && matchesSearch;
  });

  const streams = ['All', 'Science', 'Commerce', 'Arts', 'Vocational'];

  const formatSalary = (salary: number) => {
    if (salary >= 100000) return `₹${(salary / 100000).toFixed(1)}L`;
    return `₹${(salary / 1000)}K`;
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore Career Paths</h1>
          <p className="text-lg text-gray-600">
            Discover courses and visualize your future career trajectory
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Course List */}
          <div className="lg:col-span-1">
            {/* Search and Filters */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6 mb-6"
            >
              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Stream Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Stream</label>
                <div className="flex flex-wrap gap-2">
                  {streams.map(stream => (
                    <button
                      key={stream}
                      onClick={() => setSelectedStream(stream)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        selectedStream === stream
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {stream}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Course List */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Courses ({filteredCourses.length})
                </h2>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {filteredCourses.map((course, index) => (
                  <motion.button
                    key={course.id}
                    onClick={() => setSelectedCourse(course)}
                    whileHover={{ backgroundColor: '#F9FAFB' }}
                    className={`w-full text-left p-4 border-b border-gray-100 last:border-b-0 transition-colors ${
                      selectedCourse.id === course.id ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">{course.name}</h3>
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{course.duration}</span>
                          <span className="mx-2">•</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs ${
                            course.stream === 'Science' ? 'bg-blue-100 text-blue-800' :
                            course.stream === 'Commerce' ? 'bg-purple-100 text-purple-800' :
                            course.stream === 'Arts' ? 'bg-green-100 text-green-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {course.stream}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <DollarSign className="h-3 w-3 mr-1" />
                          <span>Avg. {formatSalary(course.averageSalary)}/year</span>
                        </div>
                      </div>
                      {selectedCourse.id === course.id && (
                        <ArrowRight className="h-4 w-4 text-blue-600 mt-2" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Course Details & Visualization */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedCourse.name}</h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{selectedCourse.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Target className="h-4 w-4 mr-1" />
                      <span>{selectedCourse.eligibility}</span>
                    </div>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedCourse.stream === 'Science' ? 'bg-blue-100 text-blue-800' :
                  selectedCourse.stream === 'Commerce' ? 'bg-purple-100 text-purple-800' :
                  selectedCourse.stream === 'Arts' ? 'bg-green-100 text-green-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {selectedCourse.stream}
                </span>
              </div>

              {/* Career Paths */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Career Opportunities</h3>
                <div className="grid grid-cols-2 gap-3">
                  {selectedCourse.careerPaths.map((career, index) => (
                    <div
                      key={index}
                      className="flex items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-gray-700">{career}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Average Salary */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Average Starting Salary</h4>
                    <p className="text-sm text-gray-600">Entry-level position</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      {formatSalary(selectedCourse.averageSalary)}
                    </div>
                    <div className="text-sm text-gray-600">per annum</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Career Growth Chart */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Career Growth Trajectory
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={careerGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis tickFormatter={(value) => formatSalary(value)} />
                    <Tooltip formatter={(value) => [formatSalary(Number(value)), 'Salary']} />
                    <Bar 
                      dataKey="salary" 
                      fill="url(#colorGradient)"
                      radius={[4, 4, 0, 0]}
                    />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                * Salary growth varies based on performance, location, and market conditions
              </p>
            </motion.div>

            {/* Stream Distribution */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Popular Stream Distribution
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={streamDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {streamDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-3">
                  {streamDistribution.map((stream, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div 
                          className="w-4 h-4 rounded-full mr-3"
                          style={{ backgroundColor: stream.color }}
                        ></div>
                        <span className="text-gray-700">{stream.name}</span>
                      </div>
                      <span className="font-medium">{stream.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};