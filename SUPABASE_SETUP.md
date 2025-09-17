# Supabase Setup Guide

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Choose your organization
5. Enter project details:
   - Name: `edupath-advisor`
   - Database Password: (generate a strong password)
   - Region: Choose closest to your users
6. Click "Create new project"
7. Wait for project to be ready (2-3 minutes)

## 2. Get API Keys

1. Go to Settings → API
2. Copy the following:
   - Project URL
   - Anon public key

## 3. Create Environment File

Create `.env.local` in your project root:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

## 4. Database Schema

Run this SQL in the Supabase SQL Editor:

```sql
-- Enable Row Level Security
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create user_profiles table
CREATE TABLE user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  class TEXT,
  interests TEXT[],
  completed_quiz BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create colleges table
CREATE TABLE colleges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('Government', 'Private', 'Deemed')),
  website TEXT,
  fees INTEGER,
  rating DECIMAL(2,1),
  has_hostel BOOLEAN DEFAULT FALSE,
  medium TEXT[],
  coordinates JSONB,
  image TEXT,
  description TEXT,
  established_year INTEGER,
  accreditation TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create courses table
CREATE TABLE courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  duration TEXT NOT NULL,
  eligibility TEXT NOT NULL,
  career_paths TEXT[],
  average_salary INTEGER,
  stream TEXT NOT NULL,
  website TEXT,
  description TEXT,
  subjects TEXT[],
  colleges UUID[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_recommendations table
CREATE TABLE user_recommendations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('course', 'college')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  relevance_score INTEGER NOT NULL,
  reasons TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create notifications table
CREATE TABLE notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('recommendation', 'deadline', 'update', 'general')),
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create saved_colleges table
CREATE TABLE saved_colleges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  college_id UUID REFERENCES colleges(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, college_id)
);

-- Create saved_courses table
CREATE TABLE saved_courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

-- Row Level Security Policies
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Anyone can view colleges" ON colleges
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view courses" ON courses
  FOR SELECT USING (true);

CREATE POLICY "Users can view own recommendations" ON user_recommendations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own notifications" ON notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications" ON notifications
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own saved items" ON saved_colleges
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own saved colleges" ON saved_colleges
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own saved courses" ON saved_courses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own saved courses" ON saved_courses
  FOR ALL USING (auth.uid() = user_id);

-- Insert sample data
INSERT INTO colleges (name, location, type, website, fees, rating, has_hostel, medium, coordinates, image, description, established_year, accreditation) VALUES
('Indian Institute of Technology Delhi', 'New Delhi, Delhi', 'Government', 'https://www.iitd.ac.in', 200000, 4.8, true, '["English"]', '{"lat": 28.5449, "lng": 77.1928}', 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg', 'Premier engineering institute offering world-class education in technology and research.', 1961, '["NAAC A++", "NIRF Rank 1"]'),
('Delhi University', 'New Delhi, Delhi', 'Government', 'https://www.du.ac.in', 50000, 4.5, true, '["English", "Hindi"]', '{"lat": 28.6857, "lng": 77.2167}', 'https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg', 'One of India''s largest and most prestigious universities with diverse academic programs.', 1922, '["NAAC A++", "NIRF Rank 11"]'),
('Symbiosis International University', 'Pune, Maharashtra', 'Private', 'https://www.siu.edu.in', 300000, 4.3, true, '["English"]', '{"lat": 18.5596, "lng": 73.8131}', 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg', 'Leading private university known for its innovative programs and industry partnerships.', 1971, '["NAAC A++", "NIRF Rank 45"]');

INSERT INTO courses (name, duration, eligibility, career_paths, average_salary, stream, website, description, subjects, colleges) VALUES
('B.Tech Computer Science', '4 years', '12th with PCM (75%+)', '["Software Engineer", "Data Scientist", "AI Specialist", "Product Manager"]', 800000, 'Science', 'https://www.iitd.ac.in/academics/departments/computer-science', 'Comprehensive computer science program covering programming, algorithms, and software engineering.', '["Programming", "Data Structures", "Algorithms", "Database Systems", "Machine Learning"]', '[]'),
('BBA (Bachelor of Business Administration)', '3 years', '12th (50%+)', '["Business Analyst", "Marketing Manager", "Operations Manager", "Entrepreneur"]', 500000, 'Commerce', 'https://www.du.ac.in/academics/bba', 'Business administration program focusing on management and entrepreneurship.', '["Management", "Marketing", "Finance", "Operations", "Human Resources"]', '[]'),
('B.A. Psychology', '3 years', '12th (45%+)', '["Clinical Psychologist", "Counselor", "HR Specialist", "Researcher"]', 400000, 'Arts', 'https://www.du.ac.in/academics/psychology', 'Psychology program covering human behavior and mental processes.', '["General Psychology", "Abnormal Psychology", "Social Psychology", "Research Methods"]', '[]');

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'name', 'User'));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## 5. Authentication Setup

1. Go to Authentication → Settings
2. Configure the following:
   - Site URL: `http://localhost:5173` (for development)
   - Redirect URLs: Add your production domain
   - Enable email confirmations (optional)
   - Enable phone confirmations (optional)

## 6. Storage Setup (Optional)

If you want to store user profile images:

1. Go to Storage
2. Create a new bucket called `avatars`
3. Set it to public
4. Add RLS policies for user access

## 7. Deploy to Production

1. Update your environment variables in Vercel
2. Add your production domain to Supabase Auth settings
3. Update the Site URL in Supabase to your production domain

## 8. OpenAI API Setup

1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up/Login
3. Go to API Keys
4. Create a new API key
5. Add it to your environment variables

## 9. Testing

1. Start your development server: `npm run dev`
2. Try signing up with a new account
3. Check if the user profile is created in Supabase
4. Test the AI chatbot functionality
5. Verify dark mode persistence

## 10. Production Considerations

- Set up proper error monitoring (Sentry)
- Configure rate limiting for API calls
- Set up backup strategies for your database
- Monitor API usage and costs
- Implement proper logging
