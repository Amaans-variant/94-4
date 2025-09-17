import { supabase } from './supabase';
import { UserProfile } from './supabase';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

export const authService = {
  // Sign up with email and password
  async signUp(email: string, password: string, name: string) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name
          }
        }
      });

      if (error) throw error;

      return {
        success: true,
        user: data.user,
        message: 'Account created successfully! Please check your email to verify your account.'
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to create account. Please try again.'
      };
    }
  },

  // Sign in with email and password
  async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      // Get user profile
      const profile = await this.getUserProfile(data.user?.id || '');
      
      return {
        success: true,
        user: {
          id: data.user?.id || '',
          email: data.user?.email || '',
          name: profile?.name || 'User'
        },
        message: 'Signed in successfully!'
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
        message: 'Invalid email or password. Please try again.'
      };
    }
  },

  // Sign out
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  // Get current user
  async getCurrentUser() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return null;

      const profile = await this.getUserProfile(user.id);
      
      return {
        id: user.id,
        email: user.email || '',
        name: profile?.name || 'User'
      };
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  // Get user profile
  async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error getting user profile:', error);
      return null;
    }
  },

  // Update user profile
  async updateUserProfile(userId: string, updates: Partial<UserProfile>) {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  // Listen to auth state changes
  onAuthStateChange(callback: (user: AuthUser | null) => void) {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const profile = await this.getUserProfile(session.user.id);
        callback({
          id: session.user.id,
          email: session.user.email || '',
          name: profile?.name || 'User'
        });
      } else {
        callback(null);
      }
    });
  }
};
