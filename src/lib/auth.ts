import { useState } from 'react';
import { supabase } from './supabase';
import { useSupabase } from './supabase-provider';
import toast from 'react-hot-toast';

// Custom hook for authentication functions
export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { session, signOut } = useSupabase();
  
  // Sign in with email and password
  const signIn = async (email: string, password: string, rememberMe: boolean = false) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
        options: {
          // Set session expiry based on "Remember Me" option
          // Default to 1 hour, or 30 days if "Remember Me" is checked
          expiresIn: rememberMe ? 60 * 60 * 24 * 30 : 60 * 60,
        },
      });

      if (error) throw error;
      toast.success('Signed in successfully!');
      return { success: true };
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign in');
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  // Admin sign in with password only
  const adminSignIn = async (password: string) => {
    try {
      setIsLoading(true);
      // Check if password matches the hardcoded admin password
      if (password === 'Dammy@$$2002$$') {
        // Store admin status in localStorage
        localStorage.setItem('adminAuthenticated', 'true');
        toast.success('Admin signed in successfully!');
        return { success: true };
      } else {
        throw new Error('Incorrect admin password');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign in as admin');
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name },
        },
      });

      if (error) throw error;
      toast.success('Account created successfully! Please check your email to verify your account.');
      return { success: true };
    } catch (error: any) {
      toast.error(error.message || 'Failed to create account');
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  // Reset password
  const resetPassword = async (email: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;
      toast.success('Password reset link sent to your email');
      return { success: true };
    } catch (error: any) {
      toast.error(error.message || 'Failed to send reset password email');
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  // Update user profile
  const updateProfile = async (data: { full_name?: string }) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.updateUser({
        data,
      });

      if (error) throw error;
      toast.success('Profile updated successfully');
      return { success: true };
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile');
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  // Update password
  const updatePassword = async (password: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) throw error;
      toast.success('Password updated successfully');
      return { success: true };
    } catch (error: any) {
      toast.error(error.message || 'Failed to update password');
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  // Check if user is admin
  const isAdmin = () => {
    return localStorage.getItem('adminAuthenticated') === 'true';
  };

  // Admin sign out
  const adminSignOut = () => {
    localStorage.removeItem('adminAuthenticated');
    toast.success('Admin signed out successfully');
  };

  return {
    session,
    isLoading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateProfile,
    updatePassword,
    adminSignIn,
    adminSignOut,
    isAdmin,
  };
};