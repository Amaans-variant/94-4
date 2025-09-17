import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Users, 
  TrendingUp, 
  Award, 
  ArrowRight, 
  CheckCircle,
  Star,
  Target,
  Lightbulb,
  MapPin
} from 'lucide-react';

const features = [
  {
    icon: Target,
    title: 'Personalized Career Quiz',
    description: 'Discover your strengths and get customized career recommendations based on your interests and aptitude.'
  },
  {
    icon: BookOpen,
    title: 'Course Explorer',
    description: 'Explore thousands of courses with detailed information about career paths, salaries, and requirements.'
  },
  {
    icon: MapPin,
    title: 'College Directory',
    description: 'Find the perfect college near you with our comprehensive database and interactive map feature.'
  },
  {
    icon: TrendingUp,
    title: 'Career Path Mapping',
    description: 'Visualize your future with interactive career flowcharts showing where different paths can lead you.'
  },
  {
    icon: Lightbulb,
    title: 'AI-Powered Guidance',
    description: 'Get instant answers and personalized advice from our AI assistant available 24/7.'
  },
  {
    icon: Award,
    title: 'Timeline Tracker',
    description: 'Never miss important deadlines with our comprehensive calendar of admissions and exams.'
  }
];

const stats = [
  { number: '50K+', label: 'Students Guided' },
  { number: '500+', label: 'Colleges Listed' },
  { number: '200+', label: 'Career Paths' },
  { number: '95%', label: 'Success Rate' }
];

const testimonials = [
  {
    name: 'Priya Sharma',
    class: 'Class 12 Science',
    quote: 'EduPath helped me choose the perfect engineering course. The career quiz was spot-on!',
    rating: 5,
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    name: 'Arjun Patel',
    class: 'Class 10',
    quote: 'The college directory made it so easy to find the best schools in my area. Highly recommend!',
    rating: 5,
    image: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    name: 'Sneha Reddy',
    class: 'Class 12 Commerce',
    quote: 'Thanks to EduPath, I found my passion for digital marketing and got into a great program.',
    rating: 5,
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100'
  }
];

export const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/4050290/pexels-photo-4050290.jpeg')] bg-cover bg-center opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Find Your Perfect 
                  <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Educational Path
                  </span>
                </h1>
                <p className="mt-6 text-lg lg:text-xl text-gray-600 leading-relaxed">
                  Discover courses, colleges, and career opportunities tailored just for you. 
                  Make informed decisions about your future with our AI-powered guidance platform.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/quiz"
                    className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  >
                    Take Career Quiz
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                  <Link
                    to="/colleges"
                    className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-lg font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 hover:border-blue-300 transition-all duration-200"
                  >
                    Explore Colleges
                  </Link>
                </div>
              </motion.div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md"
              >
                <img 
                  src="https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg" 
                  alt="Students studying" 
                  className="w-full rounded-xl shadow-2xl"
                />
                <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm font-medium">95% Success Rate</span>
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-blue-500" />
                    <span className="text-sm font-medium">50K+ Students</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl lg:text-4xl font-bold text-blue-600">{stat.number}</div>
                <div className="mt-2 text-sm lg:text-base text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Plan Your Future
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From personalized assessments to college recommendations, we provide all the tools 
              you need to make informed educational decisions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-200"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What Students Say About Us
            </h2>
            <p className="text-lg text-gray-600">
              Join thousands of students who have found their perfect educational path
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <div className="font-medium text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.class}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Find Your Perfect Path?
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Join thousands of students who have discovered their ideal educational journey. 
              Start with our free career assessment today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-xl text-blue-600 bg-white hover:bg-gray-50 transform hover:scale-105 transition-all duration-200"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/quiz"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-xl text-white border-2 border-white hover:bg-white hover:text-blue-600 transition-all duration-200"
              >
                Take Career Quiz
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};