# Complete Deployment Guide for EduPath Advisor

## 🚀 Quick Start (5 minutes)

### 1. Set up Supabase (2 minutes)
1. Go to [supabase.com](https://supabase.com) and create account
2. Create new project: `edupath-advisor`
3. Go to Settings → API and copy:
   - Project URL
   - Anon public key
4. Go to SQL Editor and run the schema from `SUPABASE_SETUP.md`

### 2. Set up OpenAI (1 minute)
1. Go to [platform.openai.com](https://platform.openai.com)
2. Create API key
3. Add $5-10 credit (enough for testing)

### 3. Configure Environment (1 minute)
Create `.env.local` file:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_OPENAI_API_KEY=your_openai_api_key
```

### 4. Deploy to Vercel (1 minute)
1. Push code to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## 🛠️ Detailed Setup

### Prerequisites
- Node.js 18+
- Git
- GitHub account
- Vercel account
- Supabase account
- OpenAI account

### Step 1: Database Setup

1. **Create Supabase Project**
   ```bash
   # Go to supabase.com
   # Click "New Project"
   # Choose organization
   # Enter project name: edupath-advisor
   # Set strong database password
   # Choose region closest to users
   ```

2. **Run Database Schema**
   - Go to SQL Editor in Supabase
   - Copy and paste the entire SQL from `SUPABASE_SETUP.md`
   - Click "Run" to create tables and sample data

3. **Configure Authentication**
   - Go to Authentication → Settings
   - Set Site URL: `http://localhost:5173` (development)
   - Add Redirect URLs: `https://your-domain.vercel.app` (production)
   - Enable email confirmations (optional)

### Step 2: API Keys Setup

1. **Supabase Keys**
   - Go to Settings → API
   - Copy Project URL and anon public key

2. **OpenAI API Key**
   - Go to platform.openai.com
   - Navigate to API Keys
   - Create new secret key
   - Add billing information ($5-10 for testing)

### Step 3: Local Development

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Configuration**
   Create `.env.local`:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   VITE_OPENAI_API_KEY=sk-your-openai-key
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Test Features**
   - Sign up with new account
   - Test dark mode toggle
   - Try AI chatbot
   - Browse colleges and courses

### Step 4: Production Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel auto-detects Vite configuration
   - Add environment variables:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`
     - `VITE_OPENAI_API_KEY`

3. **Update Supabase Settings**
   - Go to Authentication → Settings
   - Update Site URL to your Vercel domain
   - Add your domain to Redirect URLs

### Step 5: Post-Deployment

1. **Test Production Features**
   - User registration/login
   - AI chatbot responses
   - Dark mode persistence
   - College/course search
   - Mobile responsiveness

2. **Monitor Usage**
   - Check Supabase dashboard for user activity
   - Monitor OpenAI API usage and costs
   - Set up Vercel analytics

## 🔧 Advanced Configuration

### Custom Domain (Optional)
1. Buy domain from any registrar
2. Add domain to Vercel project
3. Update DNS records as instructed
4. Update Supabase redirect URLs

### Email Configuration (Optional)
1. Set up custom SMTP in Supabase
2. Configure email templates
3. Enable email verification

### Analytics (Optional)
1. Add Google Analytics
2. Set up Vercel Analytics
3. Configure error tracking (Sentry)

## 🐛 Troubleshooting

### Common Issues

1. **"Invalid API key" error**
   - Check environment variables are set correctly
   - Ensure no extra spaces in keys
   - Verify keys are active

2. **Database connection failed**
   - Check Supabase URL and anon key
   - Verify RLS policies are set up
   - Check if tables exist

3. **AI responses not working**
   - Verify OpenAI API key
   - Check billing/credits
   - Test with simple prompt

4. **Dark mode not persisting**
   - Check localStorage is enabled
   - Verify theme state management
   - Clear browser cache

5. **Build fails on Vercel**
   - Check environment variables
   - Verify all dependencies are in package.json
   - Check build logs for specific errors

### Performance Optimization

1. **Image Optimization**
   - Use WebP format
   - Implement lazy loading
   - Add proper alt tags

2. **Bundle Size**
   - Current build is optimized for <100 files
   - Consider code splitting for larger features
   - Monitor bundle analyzer

3. **API Rate Limiting**
   - Implement request caching
   - Add loading states
   - Handle rate limit errors gracefully

## 📊 Monitoring & Maintenance

### Regular Tasks
- Monitor API usage and costs
- Check error logs
- Update dependencies
- Backup database
- Review user feedback

### Scaling Considerations
- Implement Redis for caching
- Add CDN for static assets
- Set up database read replicas
- Implement proper error monitoring

## 🔒 Security Best Practices

1. **Environment Variables**
   - Never commit API keys to git
   - Use different keys for dev/prod
   - Rotate keys regularly

2. **Database Security**
   - Enable RLS on all tables
   - Use least privilege principle
   - Regular security audits

3. **API Security**
   - Implement rate limiting
   - Validate all inputs
   - Use HTTPS everywhere

## 📈 Future Enhancements

### Phase 2 Features
- Real-time notifications
- Advanced search filters
- User profiles and avatars
- Social features (reviews, ratings)
- Mobile app (React Native)

### Phase 3 Features
- AI-powered course recommendations
- Integration with more APIs
- Advanced analytics dashboard
- Multi-language support
- Payment integration

## 🆘 Support

If you encounter issues:
1. Check this guide first
2. Review error logs
3. Check Supabase/OpenAI status pages
4. Search GitHub issues
5. Contact support with specific error messages

## 📝 License

This project is licensed under the MIT License. See LICENSE file for details.

---

**Ready to deploy?** Follow the Quick Start guide above and you'll have a fully functional educational platform running in under 5 minutes! 🚀
