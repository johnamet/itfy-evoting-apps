'use client';

/**
 * Auth Provider (Optimized)
 * Provides authentication context and handles auth initialization
 */

import { useEffect, useMemo, createContext, useContext, useRef, type ReactNode } from 'react';
import { useAuthStore } from '@/store/auth';
import type { User, Candidate } from '@/types';

// ==================== Context Types ====================

interface AuthContextValue {
  // User auth
  user: User | null;
  isUserAuthenticated: boolean;
  isUserLoading: boolean;
  userError: string | null;
  loginUser: (credentials: { email: string; password: string }) => Promise<{ success: boolean; error?: string }>;
  logoutUser: () => Promise<void>;
  forgotPassword: (data: { email: string }) => Promise<{ success: boolean; message?: string; error?: string }>;
  resetPassword: (data: { token: string; password: string }) => Promise<{ success: boolean; message?: string; error?: string }>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  clearUserError: () => void;

  // Candidate auth
  candidate: Candidate | null;
  isCandidateAuthenticated: boolean;
  isCandidateLoading: boolean;
  candidateError: string | null;
  loginCandidate: (credentials: { identifier: string; password: string }) => Promise<{ success: boolean; error?: string }>;
  logoutCandidate: () => void;
  clearCandidateError: () => void;

  // General
  isInitialized: boolean;
}

// ==================== Context ====================

const AuthContext = createContext<AuthContextValue | null>(null);

// ==================== Provider ====================

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  // Use individual selectors to prevent unnecessary re-renders
  const user = useAuthStore((state) => state.user);
  const isUserAuthenticated = useAuthStore((state) => state.isUserAuthenticated);
  const isUserLoading = useAuthStore((state) => state.isUserLoading);
  const userError = useAuthStore((state) => state.userError);
  
  const candidate = useAuthStore((state) => state.candidate);
  const isCandidateAuthenticated = useAuthStore((state) => state.isCandidateAuthenticated);
  const isCandidateLoading = useAuthStore((state) => state.isCandidateLoading);
  const candidateError = useAuthStore((state) => state.candidateError);
  
  const isInitialized = useAuthStore((state) => state.isInitialized);

  // Get stable action references (these don't change)
  const loginUser = useAuthStore((state) => state.loginUser);
  const logoutUser = useAuthStore((state) => state.logoutUser);
  const forgotPassword = useAuthStore((state) => state.forgotPassword);
  const resetPassword = useAuthStore((state) => state.resetPassword);
  const changePassword = useAuthStore((state) => state.changePassword);
  const clearUserError = useAuthStore((state) => state.clearUserError);
  const loginCandidate = useAuthStore((state) => state.loginCandidate);
  const logoutCandidate = useAuthStore((state) => state.logoutCandidate);
  const clearCandidateError = useAuthStore((state) => state.clearCandidateError);
  const initialize = useAuthStore((state) => state.initialize);

  // Track initialization
  const initRef = useRef(false);

  // Initialize auth on mount (only once)
  useEffect(() => {
    if (!initRef.current && !isInitialized) {
      initRef.current = true;
      initialize();
    }
  }, [isInitialized, initialize]);

  // Listen for auth:logout events (from API client on 401)
  useEffect(() => {
    const handleLogout = () => {
      logoutUser();
    };

    window.addEventListener('auth:logout', handleLogout);
    return () => window.removeEventListener('auth:logout', handleLogout);
  }, [logoutUser]);

  // Memoize the context value
  const value = useMemo<AuthContextValue>(() => ({
    // User auth
    user,
    isUserAuthenticated,
    isUserLoading,
    userError,
    loginUser,
    logoutUser,
    forgotPassword,
    resetPassword,
    changePassword,
    clearUserError,

    // Candidate auth
    candidate,
    isCandidateAuthenticated,
    isCandidateLoading,
    candidateError,
    loginCandidate,
    logoutCandidate,
    clearCandidateError,

    // General
    isInitialized,
  }), [
    user,
    isUserAuthenticated,
    isUserLoading,
    userError,
    loginUser,
    logoutUser,
    forgotPassword,
    resetPassword,
    changePassword,
    clearUserError,
    candidate,
    isCandidateAuthenticated,
    isCandidateLoading,
    candidateError,
    loginCandidate,
    logoutCandidate,
    clearCandidateError,
    isInitialized,
  ]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// ==================== Hooks ====================

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function useUserAuth() {
  const { 
    user, 
    isUserAuthenticated, 
    isUserLoading, 
    userError, 
    loginUser, 
    logoutUser, 
    forgotPassword,
    resetPassword,
    changePassword,
    clearUserError,
    isInitialized,
  } = useAuth();

  return useMemo(() => ({
    user,
    isAuthenticated: isUserAuthenticated,
    isLoading: isUserLoading,
    error: userError,
    login: loginUser,
    logout: logoutUser,
    forgotPassword,
    resetPassword,
    changePassword,
    clearError: clearUserError,
    isInitialized,
  }), [
    user,
    isUserAuthenticated,
    isUserLoading,
    userError,
    loginUser,
    logoutUser,
    forgotPassword,
    resetPassword,
    changePassword,
    clearUserError,
    isInitialized,
  ]);
}

export function useCandidateAuth() {
  const {
    candidate,
    isCandidateAuthenticated,
    isCandidateLoading,
    candidateError,
    loginCandidate,
    logoutCandidate,
    clearCandidateError,
    isInitialized,
  } = useAuth();

  return useMemo(() => ({
    candidate,
    isAuthenticated: isCandidateAuthenticated,
    isLoading: isCandidateLoading,
    error: candidateError,
    login: loginCandidate,
    logout: logoutCandidate,
    clearError: clearCandidateError,
    isInitialized,
  }), [
    candidate,
    isCandidateAuthenticated,
    isCandidateLoading,
    candidateError,
    loginCandidate,
    logoutCandidate,
    clearCandidateError,
    isInitialized,
  ]);
}

export default AuthProvider;
