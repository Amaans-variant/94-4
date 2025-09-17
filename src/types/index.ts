export interface User {
  id: string;
  name: string;
  email: string;
  class: '10' | '12';
  interests: string[];
  completedQuiz: boolean;
  savedColleges: string[];
  recommendations: Recommendation[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  category: 'logical' | 'creative' | 'analytical' | 'interpersonal' | 'practical';
}

export interface QuizResult {
  stream: 'Science' | 'Commerce' | 'Arts' | 'Vocational';
  score: number;
  strengths: string[];
  recommendedCareers: string[];
}

export interface College {
  id: string;
  name: string;
  location: string;
  type: 'Government' | 'Private' | 'Deemed';
  courses: Course[];
  fees: number;
  rating: number;
  hasHostel: boolean;
  medium: ('English' | 'Hindi' | 'Regional')[];
  coordinates: { lat: number; lng: number };
  image: string;
}

export interface Course {
  id: string;
  name: string;
  duration: string;
  eligibility: string;
  careerPaths: string[];
  averageSalary: number;
  stream: 'Science' | 'Commerce' | 'Arts' | 'Vocational';
}

export interface Recommendation {
  type: 'college' | 'course' | 'career';
  title: string;
  description: string;
  relevanceScore: number;
  reasons: string[];
}

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'admission' | 'exam' | 'scholarship';
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
}

export interface ChatMessage {
  id: string;
  message: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}