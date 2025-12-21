/**
 * Auth Store
 * Manages authentication state for users (admins/organizers) and candidates
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { authApi, candidateAuthApi } from '@/lib/api/auth';
import { tokenManager } from '@/lib/api/client';
import type { User, Candidate, LoginRequest, ForgotPasswordRequest, ResetPasswordRequest, CandidateLoginRequest } from '@/types';

// ==================== Types ====================

interface AuthState {
  // User (Admin/Organizer) auth state
  user: User | null;
  isUserAuthenticated: boolean;
  isUserLoading: boolean;
  userError: string | null;

  // Candidate auth state
  candidate: Candidate | null;
  isCandidateAuthenticated: boolean;
  isCandidateLoading: boolean;
  candidateError: string | null;

  // General state
  isInitialized: boolean;
}

interface AuthActions {
  // User auth actions
  loginUser: (credentials: LoginRequest) => Promise<{ success: boolean; error?: string }>;
  logoutUser: () => Promise<void>;
  fetchCurrentUser: () => Promise<void>;
  forgotPassword: (data: ForgotPasswordRequest) => Promise<{ success: boolean; message?: string; error?: string }>;
  resetPassword: (data: ResetPasswordRequest) => Promise<{ success: boolean; message?: string; error?: string }>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  clearUserError: () => void;

  // Candidate auth actions
  loginCandidate: (credentials: CandidateLoginRequest) => Promise<{ success: boolean; error?: string }>;
  logoutCandidate: () => void;
  fetchCurrentCandidate: () => Promise<void>;
  clearCandidateError: () => void;

  // General actions
  initialize: () => Promise<void>;
  reset: () => void;
}

type AuthStore = AuthState & AuthActions;

// ==================== Initial State ====================

const initialState: AuthState = {
  user: null,
  isUserAuthenticated: false,
  isUserLoading: false,
  userError: null,

  candidate: null,
  isCandidateAuthenticated: false,
  isCandidateLoading: false,
  candidateError: null,

  isInitialized: false,
};

// ==================== Store ====================

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      // ==================== User Auth Actions ====================

      loginUser: async (credentials) => {
        set({ isUserLoading: true, userError: null });

        try {
          const response = await authApi.login(credentials);

          if (response.success && response.data) {
            const { user } = response.data;
            set({
              user,
              isUserAuthenticated: true,
              isUserLoading: false,
              userError: null,
            });
            return { success: true };
          }

          throw new Error(response.message || 'Login failed');
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Login failed. Please try again.';
          set({
            user: null,
            isUserAuthenticated: false,
            isUserLoading: false,
            userError: errorMessage,
          });
          return { success: false, error: errorMessage };
        }
      },

      logoutUser: async () => {
        set({ isUserLoading: true });
        
        try {
          await authApi.logout();
        } catch (error) {
          // Logout even if API call fails
          console.error('Logout API error:', error);
        } finally {
          tokenManager.clearUserTokens();
          set({
            user: null,
            isUserAuthenticated: false,
            isUserLoading: false,
            userError: null,
          });
        }
      },

      fetchCurrentUser: async () => {
        if (!tokenManager.getAccessToken()) {
          set({ isUserAuthenticated: false, user: null });
          return;
        }

        set({ isUserLoading: true });

        try {
          const response = await authApi.getCurrentUser();

          if (response.success && response.data) {
            set({
              user: response.data,
              isUserAuthenticated: true,
              isUserLoading: false,
            });
          } else {
            throw new Error('Failed to fetch user');
          }
        } catch (error) {
          console.error('Fetch current user error:', error);
          tokenManager.clearUserTokens();
          set({
            user: null,
            isUserAuthenticated: false,
            isUserLoading: false,
          });
        }
      },

      forgotPassword: async (data) => {
        set({ isUserLoading: true, userError: null });

        try {
          const response = await authApi.forgotPassword(data);
          set({ isUserLoading: false });
          return {
            success: true,
            message: response.message || 'Password reset email sent. Please check your inbox.',
          };
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to send reset email';
          set({ isUserLoading: false, userError: errorMessage });
          return { success: false, error: errorMessage };
        }
      },

      resetPassword: async (data) => {
        set({ isUserLoading: true, userError: null });

        try {
          const response = await authApi.resetPassword(data);
          set({ isUserLoading: false });
          return {
            success: true,
            message: response.message || 'Password reset successfully. You can now login.',
          };
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to reset password';
          set({ isUserLoading: false, userError: errorMessage });
          return { success: false, error: errorMessage };
        }
      },

      changePassword: async (currentPassword, newPassword) => {
        set({ isUserLoading: true, userError: null });

        try {
          const response = await authApi.changePassword({
            current_password: currentPassword,
            new_password: newPassword,
          });
          set({ isUserLoading: false });
          return {
            success: true,
            message: response.message || 'Password changed successfully.',
          };
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to change password';
          set({ isUserLoading: false, userError: errorMessage });
          return { success: false, error: errorMessage };
        }
      },

      clearUserError: () => set({ userError: null }),

      // ==================== Candidate Auth Actions ====================

      loginCandidate: async (credentials) => {
        set({ isCandidateLoading: true, candidateError: null });

        try {
          const response = await candidateAuthApi.login(credentials);

          if (response.success && response.data) {
            set({
              candidate: response.data.candidate,
              isCandidateAuthenticated: true,
              isCandidateLoading: false,
              candidateError: null,
            });
            return { success: true };
          }

          throw new Error(response.message || 'Login failed');
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Login failed. Please try again.';
          set({
            candidate: null,
            isCandidateAuthenticated: false,
            isCandidateLoading: false,
            candidateError: errorMessage,
          });
          return { success: false, error: errorMessage };
        }
      },

      logoutCandidate: async () => {
        try {
          await candidateAuthApi.logout();
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          set({
            candidate: null,
            isCandidateAuthenticated: false,
            candidateError: null,
          });
        }
      },

      fetchCurrentCandidate: async () => {
        if (!tokenManager.getCandidateToken()) {
          set({ isCandidateAuthenticated: false, candidate: null });
          return;
        }

        set({ isCandidateLoading: true });

        try {
          const response = await candidateAuthApi.getCurrentCandidate();

          if (response.success && response.data) {
            set({
              candidate: response.data,
              isCandidateAuthenticated: true,
              isCandidateLoading: false,
            });
          } else {
            throw new Error('Failed to fetch candidate');
          }
        } catch (error) {
          console.error('Fetch current candidate error:', error);
          tokenManager.clearCandidateToken();
          set({
            candidate: null,
            isCandidateAuthenticated: false,
            isCandidateLoading: false,
          });
        }
      },

      clearCandidateError: () => set({ candidateError: null }),

      // ==================== General Actions ====================

      initialize: async () => {
        const { fetchCurrentUser, fetchCurrentCandidate } = get();

        // Check for existing tokens and fetch user data
        await Promise.all([
          fetchCurrentUser(),
          fetchCurrentCandidate(),
        ]);

        set({ isInitialized: true });
      },

      reset: () => {
        tokenManager.clearAll();
        set(initialState);
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // Only persist minimal auth state, tokens are stored separately
        user: state.user,
        candidate: state.candidate,
        isUserAuthenticated: state.isUserAuthenticated,
        isCandidateAuthenticated: state.isCandidateAuthenticated,
      }),
    }
  )
);

// ==================== Selectors ====================

export const selectUser = (state: AuthStore) => state.user;
export const selectCandidate = (state: AuthStore) => state.candidate;
export const selectIsUserAuthenticated = (state: AuthStore) => state.isUserAuthenticated;
export const selectIsCandidateAuthenticated = (state: AuthStore) => state.isCandidateAuthenticated;
export const selectIsUserLoading = (state: AuthStore) => state.isUserLoading;
export const selectIsCandidateLoading = (state: AuthStore) => state.isCandidateLoading;
export const selectUserError = (state: AuthStore) => state.userError;
export const selectCandidateError = (state: AuthStore) => state.candidateError;
export const selectIsInitialized = (state: AuthStore) => state.isInitialized;

// ==================== Hooks ====================

export const useUser = () => useAuthStore(selectUser);
export const useCandidate = () => useAuthStore(selectCandidate);
export const useIsUserAuthenticated = () => useAuthStore(selectIsUserAuthenticated);
export const useIsCandidateAuthenticated = () => useAuthStore(selectIsCandidateAuthenticated);
export const useIsUserLoading = () => useAuthStore(selectIsUserLoading);
export const useIsCandidateLoading = () => useAuthStore(selectIsCandidateLoading);
export const useUserError = () => useAuthStore(selectUserError);
export const useCandidateError = () => useAuthStore(selectCandidateError);

export default useAuthStore;
