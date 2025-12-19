/**
 * Users API Service
 * User management endpoints for admin and profile operations
 */

import { api, buildPaginationParams, uploadFile } from './client';
import type {
  User,
  ApiResponse,
  PaginationParams,
  PaginationMeta,
  UpdateProfileRequest,
  UserRole,
  UserPermission,
} from '@/types';

// User list response with pagination
export interface UsersListResponse {
  success: boolean;
  data: User[];
  pagination: PaginationMeta;
}

// User filters
export interface UserFilters extends PaginationParams {
  role?: UserRole;
  status?: 'active' | 'inactive' | 'suspended';
  search?: string;
  email_verified?: boolean;
}

// Admin create user request
export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
  permissions?: UserPermission[];
}

// Admin update user request
export interface AdminUpdateUserRequest {
  name?: string;
  email?: string;
  role?: UserRole;
  permissions?: UserPermission[];
  status?: 'active' | 'inactive' | 'suspended';
}

/**
 * Users API endpoints
 */
export const usersApi = {
  /**
   * Get current user profile
   */
  getProfile: async (): Promise<ApiResponse<User>> => {
    return api.get<ApiResponse<User>>('/users/profile');
  },

  /**
   * Update current user profile
   */
  updateProfile: async (data: UpdateProfileRequest): Promise<ApiResponse<User>> => {
    return api.put<ApiResponse<User>>('/users/profile', data);
  },

  /**
   * Upload profile avatar
   */
  uploadAvatar: async (file: File): Promise<ApiResponse<{ avatar_url: string }>> => {
    return uploadFile<ApiResponse<{ avatar_url: string }>>(
      '/users/profile/avatar',
      file,
      'avatar'
    );
  },

  /**
   * Delete profile avatar
   */
  deleteAvatar: async (): Promise<ApiResponse<{ message: string }>> => {
    return api.delete<ApiResponse<{ message: string }>>('/users/profile/avatar');
  },

  // ==================== Admin Operations ====================

  /**
   * List all users (admin)
   */
  list: async (filters?: UserFilters): Promise<UsersListResponse> => {
    return api.get<UsersListResponse>('/users', {
      params: {
        ...buildPaginationParams(filters),
        role: filters?.role,
        status: filters?.status,
        search: filters?.search,
        email_verified: filters?.email_verified,
      },
    });
  },

  /**
   * Get user by ID (admin)
   */
  getById: async (userId: string): Promise<ApiResponse<User>> => {
    return api.get<ApiResponse<User>>(`/users/${userId}`);
  },

  /**
   * Create new user (admin)
   */
  create: async (userData: CreateUserRequest): Promise<ApiResponse<User>> => {
    return api.post<ApiResponse<User>>('/users', userData);
  },

  /**
   * Update user (admin)
   */
  update: async (userId: string, data: AdminUpdateUserRequest): Promise<ApiResponse<User>> => {
    return api.put<ApiResponse<User>>(`/users/${userId}`, data);
  },

  /**
   * Delete user (admin)
   */
  delete: async (userId: string): Promise<ApiResponse<{ message: string }>> => {
    return api.delete<ApiResponse<{ message: string }>>(`/users/${userId}`);
  },

  /**
   * Update user role (admin)
   */
  updateRole: async (
    userId: string,
    role: UserRole
  ): Promise<ApiResponse<User>> => {
    return api.patch<ApiResponse<User>>(`/users/${userId}/role`, { role });
  },

  /**
   * Update user permissions (admin)
   */
  updatePermissions: async (
    userId: string,
    permissions: UserPermission[]
  ): Promise<ApiResponse<User>> => {
    return api.patch<ApiResponse<User>>(`/users/${userId}/permissions`, { permissions });
  },

  /**
   * Suspend user (admin)
   */
  suspend: async (userId: string, reason?: string): Promise<ApiResponse<User>> => {
    return api.post<ApiResponse<User>>(`/users/${userId}/suspend`, { reason });
  },

  /**
   * Reactivate user (admin)
   */
  reactivate: async (userId: string): Promise<ApiResponse<User>> => {
    return api.post<ApiResponse<User>>(`/users/${userId}/reactivate`);
  },

  /**
   * Force verify user email (admin)
   */
  forceVerifyEmail: async (userId: string): Promise<ApiResponse<User>> => {
    return api.post<ApiResponse<User>>(`/users/${userId}/verify-email`);
  },

  /**
   * Reset user password (admin) - sends reset email
   */
  sendPasswordReset: async (userId: string): Promise<ApiResponse<{ message: string }>> => {
    return api.post<ApiResponse<{ message: string }>>(`/users/${userId}/send-password-reset`);
  },

  /**
   * Get user activity log (admin)
   */
  getActivityLog: async (
    userId: string,
    params?: PaginationParams
  ): Promise<ApiResponse<{ activities: unknown[]; pagination: PaginationMeta }>> => {
    return api.get<ApiResponse<{ activities: unknown[]; pagination: PaginationMeta }>>(
      `/users/${userId}/activity`,
      { params: buildPaginationParams(params) }
    );
  },
};

export default usersApi;
