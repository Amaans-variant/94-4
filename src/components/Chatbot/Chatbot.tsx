import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, X, Bot, User, Minimize2, Maximize2, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatMessage } from '../../types';

interface ChatbotProps {
  isAuthenticated?: boolean;
  userName?: string;
}

export const Chatbot: React.FC<ChatbotProps> = ({ isAuthenticated = false, userName = 'Student' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize welcome message based on authentication status
  useEffect(() => {
    const welcomeMessage: ChatMessage = {
      id: '1',
      message: isAuthenticated 
        ? `Hi ${userName}! 👋 I'm your EduPath AI assistant. I can help you with course recommendations, college information, career guidance, and answer any questions about your educational journey. How can I assist you today?`
        : 'Hi there! 👋 I\'m your EduPath AI assistant. I can help you explore courses, colleges, and career paths. For personalized recommendations, please log in to your account. How can I help you today?',
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, [isAuthenticated, userName]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: inputMessage.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
      
      const botResponse = await generateBotResponse(inputMessage.trim(), isAuthenticated, userName);
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: 'I apologize, but I\'m having trouble processing your request right now. Please try again in a moment.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      setIsLoading(false);
    }
  };

  const generateBotResponse = async (userInput: string, authenticated: boolean, name: string): Promise<string> => {
    const input = userInput.toLowerCase();
    
    // Greeting responses
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return authenticated 
        ? `Hello ${name}! Great to see you again. What would you like to explore today?`
        : 'Hello! Welcome to EduPath Advisor. I\'m here to help you navigate your educational journey. What can I assist you with?';
    }

    // Course-related queries
    if (input.includes('course') || input.includes('subject') || input.includes('stream')) {
      if (input.includes('science')) {
        return 'Science stream offers exciting opportunities! 🔬 Popular courses include:\n\n• B.Tech (Engineering) - Computer Science, Mechanical, Electrical\n• MBBS (Medicine) - High competition, rewarding career\n• B.Sc - Physics, Chemistry, Mathematics, Biology\n• Pharmacy, Biotechnology, Environmental Science\n\nWould you like detailed information about any specific course or career prospects?';
      }
      if (input.includes('commerce')) {
        return 'Commerce stream opens doors to business and finance! 💼 Top courses include:\n\n• B.Com - Accounting, Finance, Economics\n• BBA - Business Administration and Management\n• CA/CPA - Chartered Accountancy (high earning potential)\n• Economics, Statistics, Banking & Insurance\n\nI can help you understand admission requirements and career paths. What interests you most?';
      }
      if (input.includes('arts') || input.includes('humanities')) {
        return 'Arts/Humanities offers diverse creative and analytical paths! 🎨 Popular options:\n\n• BA - Literature, History, Psychology, Sociology\n• Mass Communication & Journalism\n• Law (5-year integrated programs)\n• Fine Arts, Design, Fashion Technology\n• Social Work, Political Science\n\nThese fields offer great opportunities in media, government, NGOs, and creative industries. Need specific guidance?';
      }
      return authenticated
        ? `Based on your profile, I can suggest personalized courses! The main streams after 12th are:\n\n🔬 **Science** - Engineering, Medicine, Research\n💼 **Commerce** - Business, Finance, Accounting\n🎨 **Arts** - Literature, Social Sciences, Creative fields\n⚡ **Vocational** - Skill-based, industry-ready programs\n\nTake our aptitude quiz for personalized recommendations, or tell me about your interests!`
        : 'I can help you explore various courses! The main streams are Science, Commerce, Arts, and Vocational. For personalized recommendations based on your interests and aptitude, I suggest taking our quiz or logging in for a customized experience. What field interests you most?';
    }
    
    // College-related queries
    if (input.includes('college') || input.includes('university') || input.includes('admission')) {
      if (input.includes('engineering') || input.includes('iit') || input.includes('nit')) {
        return 'Engineering colleges in India! 🏛️ Top options include:\n\n**Government (Lower Fees):**\n• IITs - Premium institutes, JEE Advanced required\n• NITs - Excellent reputation, JEE Main cutoffs\n• State Engineering Colleges\n\n**Private (Higher Fees):**\n• BITS Pilani, VIT, SRM, Manipal\n• Good placement records\n\nAdmission through JEE Main/Advanced. Want help finding colleges in your area or budget range?';
      }
      if (input.includes('medical') || input.includes('mbbs') || input.includes('neet')) {
        return 'Medical colleges require NEET qualification! 🏥\n\n**Government Medical Colleges:**\n• AIIMS - Top-tier, highly competitive\n• State Medical Colleges - Lower fees\n• JIPMER, PGIMER\n\n**Private Medical Colleges:**\n• Higher fees (₹50L+ for MBBS)\n• Deemed universities\n\nNEET score determines admission. Current cutoffs are very high. Would you like preparation tips or college-specific information?';
      }
      return authenticated
        ? `I can help you find colleges based on your preferences! Our database includes:\n\n• 500+ colleges across India\n• Filter by location, fees, courses\n• Government vs Private options\n• Hostel facilities and medium of instruction\n\nVisit our Colleges page or tell me your specific requirements (location, budget, course) for personalized suggestions!`
        : 'Our college directory has 500+ institutions! You can search by location, course, fees, and facilities. For personalized college recommendations based on your profile and preferences, please log in. What type of college are you looking for?';
    }
    
    // Career guidance
    if (input.includes('career') || input.includes('job') || input.includes('salary') || input.includes('future')) {
      return authenticated
        ? `Career planning is crucial, ${name}! 🚀 Based on your interests, here are some high-growth fields:\n\n**Technology:** Software Development, Data Science, AI/ML, Cybersecurity\n**Healthcare:** Medicine, Nursing, Physiotherapy, Medical Technology\n**Business:** Digital Marketing, Finance, Consulting, Entrepreneurship\n**Creative:** Design, Content Creation, Media, Entertainment\n\nTake our career assessment quiz for detailed recommendations with salary insights and growth prospects!`
        : 'Career planning is essential! 🎯 Popular high-growth careers include:\n\n• Technology (Software, Data Science, AI)\n• Healthcare (Medicine, Allied Health)\n• Business & Finance\n• Creative & Media fields\n\nFor personalized career recommendations based on your interests and aptitude, take our quiz or log in for detailed guidance!';
    }
    
    // Quiz-related queries
    if (input.includes('quiz') || input.includes('test') || input.includes('assessment') || input.includes('aptitude')) {
      return 'Our aptitude quiz is designed to discover your strengths! 📊\n\n**What it includes:**\n• 15-20 questions covering different aptitudes\n• Logical, creative, analytical, and practical scenarios\n• Takes about 10-15 minutes\n• Instant results with detailed analysis\n\n**You\'ll get:**\n• Recommended stream (Science/Commerce/Arts/Vocational)\n• Matching percentage for each field\n• Suggested career paths\n• College recommendations\n\nReady to discover your ideal path? Click the "Take Career Quiz" button!';
    }
    
    // Exam-related queries
    if (input.includes('exam') || input.includes('jee') || input.includes('neet') || input.includes('entrance')) {
      return 'Important entrance exams in India! 📚\n\n**Engineering:**\n• JEE Main (April & May) - For NITs, IIITs\n• JEE Advanced (June) - For IITs\n• State CETs - For state colleges\n\n**Medical:**\n• NEET UG (May) - For MBBS, BDS\n• AIIMS, JIPMER (now through NEET)\n\n**Other Fields:**\n• CLAT (Law), CAT (MBA), GATE (M.Tech)\n\nCheck our Timeline page for exact dates and deadlines. Need preparation tips for any specific exam?';
    }

    // Scholarship queries
    if (input.includes('scholarship') || input.includes('financial aid') || input.includes('fee') || input.includes('money')) {
      return 'Scholarships can significantly reduce education costs! 💰\n\n**Government Scholarships:**\n• National Scholarship Portal (NSP)\n• Merit-based and need-based options\n• SC/ST/OBC specific schemes\n• State government scholarships\n\n**Private Scholarships:**\n• Corporate CSR programs\n• Educational foundations\n• Merit-based awards\n\n**Tips:**\n• Apply early, maintain good grades\n• Keep all documents ready\n• Check eligibility criteria carefully\n\nVisit our Timeline page for application deadlines!';
    }

    // Location-based queries
    if (input.includes('near me') || input.includes('location') || input.includes('city')) {
      return 'Finding colleges near you! 📍\n\nOur college directory includes:\n• Interactive map view\n• Distance-based search\n• Local transportation info\n• Hostel availability\n\nUse our Colleges page with location filters, or tell me your city/state for specific recommendations. You can also filter by:\n• Course availability\n• Fee range\n• Government vs Private\n• Medium of instruction';
    }

    // Help with navigation
    if (input.includes('how to') || input.includes('navigate') || input.includes('use') || input.includes('help')) {
      return 'I\'m here to help you navigate EduPath Advisor! 🧭\n\n**Main Features:**\n• **Quiz** - Discover your ideal stream\n• **Courses** - Explore career paths with salary data\n• **Colleges** - Find institutions with filters & map\n• **Timeline** - Track important deadlines\n• **Dashboard** - Your personalized recommendations\n\n**Tips:**\n• Start with the aptitude quiz\n• Save colleges you\'re interested in\n• Set deadline reminders\n• Explore career growth charts\n\nWhat would you like to explore first?';
    }

    // Motivational/encouragement
    if (input.includes('confused') || input.includes('don\'t know') || input.includes('help me choose') || input.includes('lost')) {
      return authenticated
        ? `It\'s completely normal to feel confused about your future, ${name}! 🤗 Many students go through this.\n\n**Here\'s what I suggest:**\n1. Take our aptitude quiz - it reveals hidden strengths\n2. Explore different career paths and their day-to-day reality\n3. Talk to professionals in fields that interest you\n4. Consider your natural talents and what energizes you\n\n**Remember:**\n• There\'s no single "right" path\n• You can always pivot and grow\n• Your interests may evolve - that\'s okay!\n\nLet\'s start with the quiz to give you some direction. You\'ve got this! 💪`
        : 'Feeling confused about your future is completely normal! 🤗 Every successful person has been where you are.\n\n**Let\'s break it down:**\n1. Start with our aptitude quiz to identify your strengths\n2. Explore different career paths and their realities\n3. Consider what activities make you lose track of time\n4. Think about problems you\'d love to solve\n\nRemember, there\'s no single "perfect" path. The key is to start exploring and stay curious. Ready to take the first step with our quiz?';
    }

    // Default responses with context awareness
    const defaultResponses = [
      `That's an interesting question! I specialize in educational guidance and can help you with:\n\n• Course selection and career paths\n• College recommendations and admissions\n• Entrance exam information\n• Scholarship opportunities\n• Timeline planning\n\nCould you tell me more about what specific aspect of your education you'd like to explore?`,
      
      `I'd love to help you with that! As your educational advisor, I can assist with:\n\n🎓 **Academic Planning** - Courses, streams, career mapping\n🏛️ **College Selection** - Find the perfect fit for you\n📊 **Assessments** - Discover your strengths and interests\n📅 **Timeline Management** - Never miss important deadlines\n\nWhat would you like to know more about?`,
      
      `Great question! I'm here to guide you through your educational journey. Whether you're curious about:\n\n• Different career options and their prospects\n• Admission requirements and processes\n• Scholarship and financial aid options\n• Study tips and exam preparation\n\nI'm here to help! What's on your mind?`
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    const welcomeMessage: ChatMessage = {
      id: Date.now().toString(),
      message: isAuthenticated 
        ? `Hi ${userName}! How can I help you today?`
        : 'Hi there! How can I assist you with your educational journey?',
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-50 p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={isOpen ? { rotate: 0 } : { rotate: 0 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <MessageCircle className="h-6 w-6" />
              {/* Notification dot */}
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.3, x: -20 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1, 
              x: 0,
              height: isMinimized ? 60 : 500
            }}
            exit={{ opacity: 0, y: 100, scale: 0.3, x: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-24 left-6 z-50 w-80 sm:w-96 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
            style={{ maxHeight: '70vh' }}
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="p-2 bg-white/20 rounded-full">
                      <Bot className="h-5 w-5" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">EduPath AI</h3>
                    <p className="text-xs opacity-90">
                      {isAuthenticated ? `Helping ${userName}` : 'Your Education Guide'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={clearChat}
                    className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
                    title="Clear chat"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
                  >
                    {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start space-x-2 max-w-[85%] ${
                        message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                      }`}>
                        <div className={`p-2 rounded-full flex-shrink-0 ${
                          message.sender === 'user' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-white text-gray-700 shadow-sm border'
                        }`}>
                          {message.sender === 'user' ? (
                            <User className="h-4 w-4" />
                          ) : (
                            <Bot className="h-4 w-4" />
                          )}
                        </div>
                        <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                          message.sender === 'user'
                            ? 'bg-blue-600 text-white rounded-br-md'
                            : 'bg-white text-gray-800 shadow-sm border rounded-bl-md'
                        }`}>
                          <div className="whitespace-pre-wrap">{message.message}</div>
                          <div className={`text-xs mt-2 opacity-70 ${
                            message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-start space-x-2 max-w-[85%]">
                        <div className="p-2 rounded-full bg-white text-gray-700 shadow-sm border">
                          <Bot className="h-4 w-4" />
                        </div>
                        <div className="p-3 rounded-2xl bg-white shadow-sm border rounded-bl-md">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 bg-white border-t border-gray-200">
                  <div className="flex space-x-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything about courses, colleges, careers..."
                      disabled={isLoading}
                      className="flex-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <motion.button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || isLoading}
                      className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isLoading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <RefreshCw className="h-4 w-4" />
                        </motion.div>
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </motion.button>
                  </div>
                  <div className="mt-2 text-xs text-gray-500 text-center">
                    Press Enter to send • {isAuthenticated ? 'Personalized responses active' : 'Login for personalized help'}
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};