import { createContext, useContext, useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from './supabase';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

type SupabaseContextType = {
  session: Session | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
};

const SupabaseContext = createContext<SupabaseContextType>({
  session: null,
  isLoading: true,
  signOut: async () => {},
});

export const SupabaseProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsLoading(false);
    });

    // Set up global 401 handler
    const previousFetch = window.fetch;
    window.fetch = async (...args) => {
      const response = await previousFetch(...args);
      if (response.status === 401) {
        // If unauthorized, clear the session and redirect to login
        await supabase.auth.signOut();
        setSession(null);
        toast.error('Your session has expired. Please log in again.');
        navigate('/login');
      }
      return response;
    };

    return () => {
      subscription.unsubscribe();
      // Restore original fetch
      window.fetch = previousFetch;
    };
  }, [navigate]);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const value = {
    session,
    isLoading,
    signOut,
  };

  return <SupabaseContext.Provider value={value}>{children}</SupabaseContext.Provider>;
};

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
};