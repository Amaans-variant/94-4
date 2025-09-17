import { QuizQuestion, College, Course, TimelineEvent, User } from '../types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: '1',
    question: 'What type of problems do you enjoy solving the most?',
    options: [
      'Mathematical equations and formulas',
      'Creative design challenges', 
      'Understanding human behavior',
      'Building or fixing things'
    ],
    category: 'analytical'
  },
  {
    id: '2', 
    question: 'Which activity sounds most interesting to you?',
    options: [
      'Conducting scientific experiments',
      'Managing a business project',
      'Writing stories or articles',
      'Learning a new skill or trade'
    ],
    category: 'practical'
  },
  {
    id: '3',
    question: 'In group projects, you usually:',
    options: [
      'Handle the research and data analysis',
      'Take charge and organize the team',
      'Come up with creative ideas',
      'Focus on practical implementation'
    ],
    category: 'interpersonal'
  },
  {
    id: '4',
    question: 'What type of work environment appeals to you?',
    options: [
      'Laboratory or research facility',
      'Corporate office or business setting',
      'Art studio or creative space',
      'Workshop or technical facility'
    ],
    category: 'practical'
  },
  {
    id: '5',
    question: 'Which subject combination interests you most?',
    options: [
      'Physics, Chemistry, Mathematics',
      'Economics, Business Studies, Accountancy',
      'History, Literature, Psychology',
      'Computer Applications, Engineering Drawing'
    ],
    category: 'analytical'
  }
];

export const courses: Course[] = [
  {
    id: '1',
    name: 'B.Tech Computer Science',
    duration: '4 years',
    eligibility: '12th with PCM (75%+)',
    careerPaths: ['Software Engineer', 'Data Scientist', 'AI Specialist', 'Product Manager'],
    averageSalary: 800000,
    stream: 'Science'
  },
  {
    id: '2',
    name: 'BBA',
    duration: '3 years', 
    eligibility: '12th (50%+)',
    careerPaths: ['Business Analyst', 'Marketing Manager', 'Operations Manager', 'Entrepreneur'],
    averageSalary: 500000,
    stream: 'Commerce'
  },
  {
    id: '3',
    name: 'B.A. Psychology',
    duration: '3 years',
    eligibility: '12th (45%+)',
    careerPaths: ['Clinical Psychologist', 'Counselor', 'HR Specialist', 'Researcher'],
    averageSalary: 400000,
    stream: 'Arts'
  },
  {
    id: '4',
    name: 'Diploma in Digital Marketing',
    duration: '1 year',
    eligibility: '12th (40%+)',
    careerPaths: ['Digital Marketer', 'Social Media Manager', 'Content Creator', 'SEO Specialist'],
    averageSalary: 350000,
    stream: 'Vocational'
  }
];

export const colleges: College[] = [
  {
    id: '1',
    name: 'Indian Institute of Technology Delhi',
    location: 'New Delhi, Delhi',
    type: 'Government',
    courses: [courses[0]],
    fees: 200000,
    rating: 4.8,
    hasHostel: true,
    medium: ['English'],
    coordinates: { lat: 28.5449, lng: 77.1928 },
    image: 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg'
  },
  {
    id: '2',
    name: 'Delhi University',
    location: 'New Delhi, Delhi', 
    type: 'Government',
    courses: [courses[1], courses[2]],
    fees: 50000,
    rating: 4.5,
    hasHostel: true,
    medium: ['English', 'Hindi'],
    coordinates: { lat: 28.6857, lng: 77.2167 },
    image: 'https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg'
  },
  {
    id: '3',
    name: 'Symbiosis International University',
    location: 'Pune, Maharashtra',
    type: 'Private',
    courses: [courses[1], courses[3]],
    fees: 300000,
    rating: 4.3,
    hasHostel: true,
    medium: ['English'],
    coordinates: { lat: 18.5596, lng: 73.8131 },
    image: 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg'
  }
];

export const timelineEvents: TimelineEvent[] = [
  {
    id: '1',
    title: 'JEE Main Registration',
    description: 'Registration opens for JEE Main 2024',
    date: '2024-02-01',
    type: 'exam',
    priority: 'high',
    completed: false
  },
  {
    id: '2',
    title: 'NEET Application',
    description: 'Last date to apply for NEET 2024',
    date: '2024-02-15',
    type: 'exam',
    priority: 'high', 
    completed: false
  },
  {
    id: '3',
    title: 'DU Admission Process',
    description: 'Delhi University admission process begins',
    date: '2024-03-01',
    type: 'admission',
    priority: 'medium',
    completed: false
  },
  {
    id: '4',
    title: 'Merit Scholarship',
    description: 'Application deadline for merit-based scholarships',
    date: '2024-03-15',
    type: 'scholarship',
    priority: 'medium',
    completed: false
  }
];

export const mockUser: User = {
  id: '1',
  name: 'Arjun Sharma',
  email: 'arjun@example.com',
  class: '12',
  interests: ['Technology', 'Mathematics', 'Innovation'],
  completedQuiz: true,
  savedColleges: ['1', '2'],
  recommendations: [
    {
      type: 'course',
      title: 'B.Tech Computer Science',
      description: 'Perfect match for your analytical and technical interests',
      relevanceScore: 95,
      reasons: ['Strong in Mathematics', 'Interest in Technology', 'Logical thinking skills']
    },
    {
      type: 'college',
      title: 'IIT Delhi',
      description: 'Top engineering college matching your academic profile',
      relevanceScore: 90,
      reasons: ['Excellent CS program', 'Research opportunities', 'Industry connections']
    }
  ]
};