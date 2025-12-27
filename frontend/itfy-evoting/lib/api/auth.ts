/**
 * Auth API Service
 * Authentication endpoints for users and candidates
 */

import { api, tokenManager } from './client';
import type {
  User,
  Candidate,
  ApiResponse,
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  CandidateLoginRequest,
} from '@/types';

// Auth response types
export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface RefreshTokenResponse {
  access_token: string;
  refresh_token?: string;
}

interface CandidateLoginResponse {
  candidate: Candidate;
  access_token: string;
  refresh_token: string;
  expires_in: string;
}


/**
 * User Authentication
 */
export const authApi = {
  /**
   * Login user with email and password
   */
  login: async (credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    const response = await api.post<ApiResponse<LoginResponse>>(
      '/auth/login',
      credentials,
      { skipAuth: true }
    );

    // Store tokens on successful login
    if (response.data?.access_token) {
      tokenManager.setAccessToken(response.data.access_token);
      if (response.data.refresh_token) {
        tokenManager.setRefreshToken(response.data.refresh_token);
      }
    }

    return response;
  },

  /**
   * Register new user
   */
  register: async (userData: RegisterRequest): Promise<ApiResponse<RegisterResponse>> => {
    return api.post<ApiResponse<RegisterResponse>>(
      '/auth/register',
      userData,
      { skipAuth: true }
    );
  },

  /**
   * Logout user
   */
  logout: async (): Promise<ApiResponse<{ message: string }>> => {
    try {
      const refreshToken = tokenManager.getRefreshToken();
      const response = await api.post<ApiResponse<{ message: string }>>(
        '/auth/logout',
        { refresh_token: refreshToken },
        { skipAuth: false }
      );
      return response;
    } finally {
      // Always clear tokens, even if request fails
      tokenManager.clearUserTokens();
    }
  },

  /**
   * Refresh access token
   */
  refreshToken: async (refreshToken: string): Promise<ApiResponse<RefreshTokenResponse>> => {
    const response = await api.post<ApiResponse<RefreshTokenResponse>>(
      '/auth/refresh-token',
      { refresh_token: refreshToken },
      { skipAuth: true }
    );

    // Update stored tokens
    if (response.data?.access_token) {
      tokenManager.setAccessToken(response.data.access_token);
      if (response.data.refresh_token) {
        tokenManager.setRefreshToken(response.data.refresh_token);
      }
    }

    return response;
  },

  /**
   * Get current authenticated user
   */
  getCurrentUser: async (): Promise<ApiResponse<User>> => {
    return api.get<ApiResponse<User>>('/auth/me');
  },

  /**
   * Request password reset email
   */
  forgotPassword: async (data: ForgotPasswordRequest): Promise<ApiResponse<{ message: string }>> => {
    return api.post<ApiResponse<{ message: string }>>(
      '/auth/forgot-password',
      data,
      { skipAuth: true }
    );
  },

  /**
   * Reset password with token
   */
  resetPassword: async (data: ResetPasswordRequest): Promise<ApiResponse<{ message: string }>> => {
    return api.post<ApiResponse<{ message: string }>>(
      '/auth/reset-password',
      data,
      { skipAuth: true }
    );
  },

  /**
   * Verify email address
   */
  verifyEmail: async (token: string): Promise<ApiResponse<{ message: string }>> => {
    return api.get<ApiResponse<{ message: string }>>(
      `/auth/verify-email/${token}`,
      { skipAuth: true }
    );
  },

  /**
   * Resend verification email
   */
  resendVerification: async (email: string): Promise<ApiResponse<{ message: string }>> => {
    return api.post<ApiResponse<{ message: string }>>(
      '/auth/resend-verification',
      { email },
      { skipAuth: true }
    );
  },

  /**
   * Change user password
   */
  changePassword: async (data: {
    current_password: string;
    new_password: string;
    userType: 'user' | 'candidate';
  }): Promise<ApiResponse<{ message: string }>> => {
    return api.post<ApiResponse<{ message: string }>>('/auth/change-password', data);
  },

  /**
   * Check if user is authenticated (has valid token)
   */
  isAuthenticated: (): boolean => {
    return !!tokenManager.getAccessToken();
  },
};

/**
 * Candidate Authentication
 */
export const candidateAuthApi = {
  /**
   * Login candidate with identifier (code or email) and password
   */
  login: async (data: CandidateLoginRequest): Promise<ApiResponse<CandidateLoginResponse>> => {
    const response = await api.post<ApiResponse<CandidateLoginResponse>>(
      '/auth/candidate/login',
      data,
      { skipAuth: true }
    );

    // Store candidate tokens on successful login
    if (response.data?.access_token) {
      tokenManager.setCandidateToken(response.data.access_token);
    }
    if (response.data?.refresh_token) {
      tokenManager.setCandidateRefreshToken(response.data.refresh_token);
    }

    return response;
  },

  /**
   * Get current authenticated candidate
   */
  getCurrentCandidate: async (): Promise<ApiResponse<Candidate>> => {
    return api.get<ApiResponse<Candidate>>(
      '/auth/candidate/me',
      { authType: 'candidate' }
    );
  },

  /**
   * Request password reset for candidate
   */
  forgotPassword: async (data: { email: string; eventId?: string }): Promise<ApiResponse<{ message: string }>> => {
    return api.post<ApiResponse<{ message: string }>>(
      '/auth/candidate/forgot-password',
      data,
      { skipAuth: true }
    );
  },

  /**
   * Reset candidate password with token
   */
  resetPassword: async (data: { token: string; password: string }): Promise<ApiResponse<{ message: string }>> => {
    return api.post<ApiResponse<{ message: string }>>(
      '/auth/candidate/reset-password',
      data,
      { skipAuth: true }
    );
  },

  /**
   * Logout candidate
   */
  logout: async (): Promise<void> => {
    try {
      const refreshToken = tokenManager.getCandidateRefreshToken();
      await api.post<ApiResponse<{ message: string }>>(
        '/auth/candidate/logout',
        { refresh_token: refreshToken },
        { authType: 'candidate' }
      );
    } finally {
      tokenManager.clearCandidateToken();
    }
  },

  /**
   * Check if candidate is authenticated
   */
  isAuthenticated: (): boolean => {
    return !!tokenManager.getCandidateToken();
  },
};

export default authApi;
