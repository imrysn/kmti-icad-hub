import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { authService, LoginCredentials, User } from '../services/authService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean; // Keep for backward compatibility or rename
  isInitialLoading: boolean; 
  isLoggingIn: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null); const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      console.log('AuthProvider: checking authentication...');
      try {
        if (authService.isAuthenticated()) {
          const userData = await authService.getCurrentUser();
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (err) {
        // Silently handle session check failures on mount (e.g. expired token)
        // The browser will still log the 401 GET request, but we won't add a loud stack trace
        console.info('AuthProvider: No active session found or session expired');
        authService.logout();
        setUser(null);
      } finally {
        setIsInitialLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Handle session expiration events from axios interceptors without full page reloads
  useEffect(() => {
    const handleAuthExpired = () => {
      console.warn('AuthProvider: session expired event received, logging out');
      logout();
    };
    window.addEventListener('kmti-auth-expired', handleAuthExpired);
    return () => {
      window.removeEventListener('kmti-auth-expired', handleAuthExpired);
    };
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    setIsLoggingIn(true);
    setError(null);

    try {
      const loginResponse = await authService.login(credentials);
      setUser(loginResponse.user);
    } catch (err: any) {
      let errorMessage = 'Login failed. Please try again.';

      if (err.response) {
        const detail = err.response.data?.detail || err.response.statusText || 'Login failed. Please try again.';
        errorMessage = typeof detail === 'string' ? detail : JSON.stringify(detail);
      } else if (err.message) {
        errorMessage = 'Unable to connect to the server. Please make sure the backend server is running.';
      }

      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const logout = () => {
    console.log('AuthProvider: logging out');
    // Remove the old shared chat history key (pre-namespacing) if it exists
    localStorage.removeItem('icad_chatbot_history');
    authService.logout();
    setUser(null);
    window.location.hash = '#/login';
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading: isInitialLoading || isLoggingIn, // Combined for those who still use it
      isInitialLoading,
      isLoggingIn,
      error,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
