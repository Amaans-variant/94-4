import axios from 'axios';

// Mock data for demonstration - in production, this would connect to real APIs
const MOCK_COLLEGES = [
  {
    id: '1',
    name: 'Indian Institute of Technology Delhi',
    location: 'New Delhi, Delhi',
    type: 'Government',
    website: 'https://www.iitd.ac.in',
    fees: 200000,
    rating: 4.8,
    has_hostel: true,
    medium: ['English'],
    coordinates: { lat: 28.5449, lng: 77.1928 },
    image: 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg',
    description: 'Premier engineering institute offering world-class education in technology and research.',
    established_year: 1961,
    accreditation: ['NAAC A++', 'NIRF Rank 1']
  },
  {
    id: '2',
    name: 'Delhi University',
    location: 'New Delhi, Delhi',
    type: 'Government',
    website: 'https://www.du.ac.in',
    fees: 50000,
    rating: 4.5,
    has_hostel: true,
    medium: ['English', 'Hindi'],
    coordinates: { lat: 28.6857, lng: 77.2167 },
    image: 'https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg',
    description: 'One of India\'s largest and most prestigious universities with diverse academic programs.',
    established_year: 1922,
    accreditation: ['NAAC A++', 'NIRF Rank 11']
  },
  {
    id: '3',
    name: 'Symbiosis International University',
    location: 'Pune, Maharashtra',
    type: 'Private',
    website: 'https://www.siu.edu.in',
    fees: 300000,
    rating: 4.3,
    has_hostel: true,
    medium: ['English'],
    coordinates: { lat: 18.5596, lng: 73.8131 },
    image: 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg',
    description: 'Leading private university known for its innovative programs and industry partnerships.',
    established_year: 1971,
    accreditation: ['NAAC A++', 'NIRF Rank 45']
  },
  {
    id: '4',
    name: 'Indian Institute of Science Bangalore',
    location: 'Bangalore, Karnataka',
    type: 'Government',
    website: 'https://www.iisc.ac.in',
    fees: 150000,
    rating: 4.9,
    has_hostel: true,
    medium: ['English'],
    coordinates: { lat: 12.9716, lng: 77.5946 },
    image: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg',
    description: 'Premier research institute for science and technology education.',
    established_year: 1909,
    accreditation: ['NAAC A++', 'NIRF Rank 2']
  }
];

const MOCK_COURSES = [
  {
    id: '1',
    name: 'B.Tech Computer Science',
    duration: '4 years',
    eligibility: '12th with PCM (75%+)',
    career_paths: ['Software Engineer', 'Data Scientist', 'AI Specialist', 'Product Manager'],
    average_salary: 800000,
    stream: 'Science',
    website: 'https://www.iitd.ac.in/academics/departments/computer-science',
    description: 'Comprehensive computer science program covering programming, algorithms, and software engineering.',
    subjects: ['Programming', 'Data Structures', 'Algorithms', 'Database Systems', 'Machine Learning'],
    colleges: ['1', '2', '4']
  },
  {
    id: '2',
    name: 'BBA (Bachelor of Business Administration)',
    duration: '3 years',
    eligibility: '12th (50%+)',
    career_paths: ['Business Analyst', 'Marketing Manager', 'Operations Manager', 'Entrepreneur'],
    average_salary: 500000,
    stream: 'Commerce',
    website: 'https://www.du.ac.in/academics/bba',
    description: 'Business administration program focusing on management and entrepreneurship.',
    subjects: ['Management', 'Marketing', 'Finance', 'Operations', 'Human Resources'],
    colleges: ['2', '3']
  },
  {
    id: '3',
    name: 'B.A. Psychology',
    duration: '3 years',
    eligibility: '12th (45%+)',
    career_paths: ['Clinical Psychologist', 'Counselor', 'HR Specialist', 'Researcher'],
    average_salary: 400000,
    stream: 'Arts',
    website: 'https://www.du.ac.in/academics/psychology',
    description: 'Psychology program covering human behavior and mental processes.',
    subjects: ['General Psychology', 'Abnormal Psychology', 'Social Psychology', 'Research Methods'],
    colleges: ['2', '3']
  },
  {
    id: '4',
    name: 'M.Tech Artificial Intelligence',
    duration: '2 years',
    eligibility: 'B.Tech/B.E. (60%+)',
    career_paths: ['AI Engineer', 'Machine Learning Engineer', 'Research Scientist', 'AI Consultant'],
    average_salary: 1200000,
    stream: 'Science',
    website: 'https://www.iisc.ac.in/academics/ai',
    description: 'Advanced program in artificial intelligence and machine learning.',
    subjects: ['Machine Learning', 'Deep Learning', 'Neural Networks', 'Natural Language Processing'],
    colleges: ['1', '4']
  }
];

export const searchColleges = async (query: string, filters: any = {}) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let results = MOCK_COLLEGES;
  
  if (query) {
    results = results.filter(college => 
      college.name.toLowerCase().includes(query.toLowerCase()) ||
      college.location.toLowerCase().includes(query.toLowerCase()) ||
      college.description.toLowerCase().includes(query.toLowerCase())
    );
  }
  
  if (filters.type) {
    results = results.filter(college => college.type === filters.type);
  }
  
  if (filters.minRating) {
    results = results.filter(college => college.rating >= filters.minRating);
  }
  
  if (filters.maxFees) {
    results = results.filter(college => college.fees <= filters.maxFees);
  }
  
  return {
    data: results,
    total: results.length,
    page: 1,
    limit: 20
  };
};

export const searchCourses = async (query: string, filters: any = {}) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let results = MOCK_COURSES;
  
  if (query) {
    results = results.filter(course => 
      course.name.toLowerCase().includes(query.toLowerCase()) ||
      course.description.toLowerCase().includes(query.toLowerCase()) ||
      course.subjects.some(subject => subject.toLowerCase().includes(query.toLowerCase()))
    );
  }
  
  if (filters.stream) {
    results = results.filter(course => course.stream === filters.stream);
  }
  
  if (filters.minSalary) {
    results = results.filter(course => course.average_salary >= filters.minSalary);
  }
  
  return {
    data: results,
    total: results.length,
    page: 1,
    limit: 20
  };
};

export const getCollegeById = async (id: string) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return MOCK_COLLEGES.find(college => college.id === id) || null;
};

export const getCourseById = async (id: string) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return MOCK_COURSES.find(course => course.id === id) || null;
};

export const getCollegesByCourse = async (courseId: string) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const course = MOCK_COURSES.find(c => c.id === courseId);
  if (!course) return [];
  
  return MOCK_COLLEGES.filter(college => course.colleges.includes(college.id));
};
