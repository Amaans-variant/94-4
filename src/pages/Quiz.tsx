import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  TrendingUp, 
  Award,
  BookOpen,
  Target,
  Lightbulb
} from 'lucide-react';
import { quizQuestions } from '../data/mockData';
import { QuizResult } from '../types';

export const Quiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [results, setResults] = useState<QuizResult | null>(null);

  const progress = ((currentQuestion + (selectedOption !== null ? 1 : 0)) / quizQuestions.length) * 100;

  const handleNext = () => {
    if (selectedOption === null) return;
    
    const newAnswers = [...answers, selectedOption];
    setAnswers(newAnswers);
    
    if (currentQuestion === quizQuestions.length - 1) {
      // Quiz completed
      const result = calculateResults(newAnswers);
      setResults(result);
      setIsCompleted(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(answers[currentQuestion - 1]);
      setAnswers(answers.slice(0, -1));
    }
  };

  const calculateResults = (userAnswers: number[]): QuizResult => {
    // Simplified scoring logic
    const scores = {
      Science: 0,
      Commerce: 0,
      Arts: 0,
      Vocational: 0
    };

    userAnswers.forEach((answer, index) => {
      const question = quizQuestions[index];
      
      // Award points based on answer selection and question category
      switch (answer) {
        case 0: // First option - typically Science/Technical
          scores.Science += question.category === 'analytical' ? 3 : 2;
          break;
        case 1: // Second option - typically Commerce/Business
          scores.Commerce += question.category === 'interpersonal' ? 3 : 2;
          break;
        case 2: // Third option - typically Arts/Creative
          scores.Arts += question.category === 'creative' ? 3 : 2;
          break;
        case 3: // Fourth option - typically Vocational/Practical
          scores.Vocational += question.category === 'practical' ? 3 : 2;
          break;
      }
    });

    // Determine top stream
    const topStream = Object.keys(scores).reduce((a, b) => 
      scores[a as keyof typeof scores] > scores[b as keyof typeof scores] ? a : b
    ) as keyof typeof scores;

    const streamData = {
      Science: {
        strengths: ['Analytical Thinking', 'Problem Solving', 'Mathematical Skills'],
        careers: ['Engineer', 'Doctor', 'Scientist', 'Data Analyst', 'Researcher']
      },
      Commerce: {
        strengths: ['Business Acumen', 'Financial Planning', 'Leadership'],
        careers: ['CA/CPA', 'Business Analyst', 'Marketing Manager', 'Entrepreneur', 'Banker']
      },
      Arts: {
        strengths: ['Creative Thinking', 'Communication', 'Cultural Awareness'],
        careers: ['Writer', 'Teacher', 'Psychologist', 'Journalist', 'Designer']
      },
      Vocational: {
        strengths: ['Practical Skills', 'Hands-on Learning', 'Technical Expertise'],
        careers: ['Digital Marketer', 'Web Developer', 'Chef', 'Photographer', 'Technician']
      }
    };

    return {
      stream: topStream,
      score: Math.round((scores[topStream] / (userAnswers.length * 3)) * 100),
      strengths: streamData[topStream].strengths,
      recommendedCareers: streamData[topStream].careers
    };
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedOption(null);
    setIsCompleted(false);
    setResults(null);
  };

  if (isCompleted && results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            {/* Results Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Award className="h-10 w-10 text-white" />
              </motion.div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Completed!</h1>
              <p className="text-lg text-gray-600">Here are your personalized results</p>
            </div>

            {/* Main Result */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 text-white text-center mb-8"
            >
              <h2 className="text-2xl font-bold mb-2">Your Recommended Stream</h2>
              <div className="text-4xl font-bold mb-2">{results.stream}</div>
              <div className="text-xl opacity-90">{results.score}% Match</div>
              <div className="w-full bg-white/20 rounded-full h-2 mt-4">
                <div 
                  className="bg-white rounded-full h-2 transition-all duration-1000"
                  style={{ width: `${results.score}%` }}
                ></div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Strengths */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="bg-gray-50 rounded-xl p-6"
              >
                <div className="flex items-center mb-4">
                  <Target className="h-6 w-6 text-blue-600 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-900">Your Strengths</h3>
                </div>
                <ul className="space-y-2">
                  {results.strengths.map((strength, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-gray-700">{strength}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Career Recommendations */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="bg-gray-50 rounded-xl p-6"
              >
                <div className="flex items-center mb-4">
                  <TrendingUp className="h-6 w-6 text-purple-600 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-900">Career Options</h3>
                </div>
                <ul className="space-y-2">
                  {results.recommendedCareers.map((career, index) => (
                    <li key={index} className="flex items-center">
                      <Lightbulb className="h-4 w-4 text-yellow-500 mr-2" />
                      <span className="text-gray-700">{career}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200"
            >
              <button
                onClick={restartQuiz}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Retake Quiz
              </button>
              <button className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-shadow">
                Explore Courses
              </button>
              <button className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-shadow">
                Find Colleges
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Career Assessment Quiz</h1>
          <p className="text-lg text-gray-600">
            Discover your ideal educational path through our comprehensive assessment
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div 
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          >
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                  {currentQuestion + 1}
                </div>
                <span className="text-sm text-gray-500 uppercase tracking-wide font-medium">
                  {quizQuestions[currentQuestion].category}
                </span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 leading-tight">
                {quizQuestions[currentQuestion].question}
              </h2>
            </div>

            <div className="space-y-3">
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => setSelectedOption(index)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                    selectedOption === index
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex-shrink-0 ${
                      selectedOption === index
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedOption === index && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-full h-full rounded-full bg-white scale-50"
                        />
                      )}
                    </div>
                    <span className="text-gray-700">{option}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-between items-center"
        >
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Previous
          </button>

          <div className="text-center">
            <BookOpen className="h-8 w-8 text-gray-400 mx-auto" />
          </div>

          <button
            onClick={handleNext}
            disabled={selectedOption === null}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {currentQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next'}
            <ChevronRight className="h-5 w-5 ml-1" />
          </button>
        </motion.div>

        {/* Help Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-8 text-gray-500 text-sm"
        >
          💡 Choose the option that best describes you. There are no right or wrong answers.
        </motion.div>
      </div>
    </div>
  );
};