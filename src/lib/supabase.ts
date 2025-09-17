import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface UserProfile {
  id: string;
  email: string;
  name: string;
  class: string;
  interests: string[];
  completed_quiz: boolean;
  created_at: string;
  updated_at: string;
}

export interface College {
  id: string;
  name: string;
  location: string;
  type: 'Government' | 'Private' | 'Deemed';
  website: string;
  fees: number;
  rating: number;
  has_hostel: boolean;
  medium: string[];
  coordinates: { lat: number; lng: number };
  image: string;
  description: string;
  established_year: number;
  accreditation: string[];
}

export interface Course {
  id: string;
  name: string;
  duration: string;
  eligibility: string;
  career_paths: string[];
  average_salary: number;
  stream: string;
  website: string;
  description: string;
  subjects: string[];
  colleges: string[];
}

export interface UserRecommendation {
  id: string;
  user_id: string;
  type: 'course' | 'college';
  title: string;
  description: string;
  relevance_score: number;
  reasons: string[];
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'recommendation' | 'deadline' | 'update' | 'general';
  read: boolean;
  created_at: string;
}
