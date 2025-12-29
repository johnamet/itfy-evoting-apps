/**
 * Enhanced Users API Service
 * Added: Deleted users management, hard delete, bulk operations, activity logs
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
  include_deleted?: boolean; // New: include soft-deleted users
}

// Admin create user request
export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
  permissions?: UserPermission[];
  bio?: string;
}

// Admin update user request
export interface AdminUpdateUserRequest {
  name?: string;
  email?: string;
  role?: UserRole;
  permissions?: UserPermission[];
  status?: 'active' | 'inactive' | 'suspended';
  bio?: string;
}

// Bulk operations request
export interface BulkUserActionRequest {
  userIds: string[];
  action: 'activate' | 'deactivate' | 'suspend' | 'delete' | 'verify_email';
  reason?: string; // For suspend action
}

// Activity log entry
export interface ActivityLog {
  _id: string;
  action: string;
  description: string;
  ip_address?: string;
  user_agent?: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

/**
 * Enhanced Users API endpoints
 */
export const usersApi = {
  // ==================== Profile Operations ====================

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
   * Get user statistics (admin)
   */
  getStats: async (): Promise<ApiResponse<{
    total: number;
    byStatus: {
      active: number;
      inactive: number;
      suspended: number;
    };
    byRole: Record<string, number>;
    verification: {
      verified: number;
      unverified: number;
    };
    activity: {
      recentRegistrations: number;
      recentLogins: number;
    };
  }>> => {
    return api.get('/users/stats');
  },

  /**
   * List all users (admin)
   * @param filters - Optional filters including include_deleted for soft-deleted users
   */
  list: async (filters?: UserFilters): Promise<UsersListResponse> => {
    return api.get<UsersListResponse>('/users', {
      params: {
        ...buildPaginationParams(filters),
        role: filters?.role,
        status: filters?.status,
        search: filters?.search,
        email_verified: filters?.email_verified,
        include_deleted: filters?.include_deleted,
      },
    });
  },

  /**
   * List deleted users (super admin only)
   */
  listDeleted: async (params?: PaginationParams): Promise<UsersListResponse> => {
    return api.get<UsersListResponse>('/users/deleted', {
      params: buildPaginationParams(params),
    });
  },

  /**
   * Get user by ID (admin)
   * @param userId - User ID
   * @param includeDeleted - Whether to include soft-deleted users in search
   */
  getById: async (userId: string, includeDeleted = false): Promise<ApiResponse<User>> => {
    return api.get<ApiResponse<User>>(`/users/${userId}`, {
      params: { include_deleted: includeDeleted },
    });
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
   * Soft delete user (admin)
   * This marks the user as deleted but keeps the data
   */
  delete: async (userId: string): Promise<ApiResponse<{ message: string }>> => {
    return api.delete<ApiResponse<{ message: string }>>(`/users/${userId}`);
  },

  /**
   * Hard delete user - PERMANENT (super admin only)
   * This permanently deletes all user data
   */
  hardDelete: async (userId: string): Promise<ApiResponse<{ message: string }>> => {
    return api.delete<ApiResponse<{ message: string }>>(`/users/${userId}/hard`);
  },

  /**
   * Restore soft-deleted user (super admin only)
   */
  restore: async (userId: string): Promise<ApiResponse<User>> => {
    return api.post<ApiResponse<User>>(`/users/${userId}/restore`);
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
    return api.put<ApiResponse<User>>(`/users/${userId}/suspend`, { reason });
  },

  /**
   * Reactivate user (admin)
   */
  reactivate: async (userId: string): Promise<ApiResponse<User>> => {
    return api.put<ApiResponse<User>>(`/users/${userId}/reactivate`);
  },

  /**
   * Activate user (admin)
   */
  activate: async (userId: string): Promise<ApiResponse<User>> => {
    return api.put<ApiResponse<User>>(`/users/${userId}/activate`);
  },

  /**
   * Deactivate user (admin)
   */
  deactivate: async (userId: string, reason?: string): Promise<ApiResponse<User>> => {
    return api.put<ApiResponse<User>>(`/users/${userId}/deactivate`, { reason });
  },

  /**
   * Force verify user email (admin)
   */
  forceVerifyEmail: async (userId: string): Promise<ApiResponse<User>> => {
    return api.put<ApiResponse<User>>(`/users/${userId}/verify-email`);
  },

  /**
   * Reset user password (admin) - sends reset email
   */
  sendPasswordReset: async (userId: string): Promise<ApiResponse<{ message: string }>> => {
    return api.post<ApiResponse<{ message: string }>>(`/users/${userId}/send-password-reset`);
  },

  // ==================== Bulk Operations ====================

  /**
   * Bulk update user status (admin)
   */
  bulkUpdateStatus: async (
    userIds: string[],
    status: 'active' | 'inactive' | 'suspended'
  ): Promise<ApiResponse<{ modifiedCount: number }>> => {
    return api.post<ApiResponse<{ modifiedCount: number }>>('/users/bulk/status', {
      userIds,
      status,
    });
  },

  /**
   * Bulk perform action on users (admin)
   */
  bulkAction: async (
    action: BulkUserActionRequest
  ): Promise<ApiResponse<{ 
    success: number; 
    failed: number; 
    errors?: Array<{ userId: string; error: string }> 
  }>> => {
    return api.post<ApiResponse<{ 
      success: number; 
      failed: number; 
      errors?: Array<{ userId: string; error: string }> 
    }>>('/users/bulk/action', action);
  },

  /**
   * Bulk delete users (admin)
   */
  bulkDelete: async (
    userIds: string[]
  ): Promise<ApiResponse<{ deletedCount: number }>> => {
    return api.post<ApiResponse<{ deletedCount: number }>>('/users/bulk/delete', {
      userIds,
    });
  },

  /**
   * Bulk restore users (super admin only)
   */
  bulkRestore: async (
    userIds: string[]
  ): Promise<ApiResponse<{ restoredCount: number }>> => {
    return api.post<ApiResponse<{ restoredCount: number }>>('/users/bulk/restore', {
      userIds,
    });
  },

  // ==================== Activity & Logs ====================

  /**
   * Get user activity log (admin)
   */
  getActivityLog: async (
    userId: string,
    params?: PaginationParams
  ): Promise<ApiResponse<{ 
    activities: ActivityLog[]; 
    pagination: PaginationMeta 
  }>> => {
    return api.get<ApiResponse<{ 
      activities: ActivityLog[]; 
      pagination: PaginationMeta 
    }>>(
      `/users/${userId}/activity`,
      { params: buildPaginationParams(params) }
    );
  },

  /**
   * Get user statistics (admin)
   */
  getUserStatistics: async (
    userId: string
  ): Promise<ApiResponse<{
    userId: string;
    name: string;
    email: string;
    role: UserRole;
    status: string;
    emailVerified: boolean;
    lastLogin: string | null;
    loginAttempts: number;
    activityCount: number;
    createdAt: string;
  }>> => {
    return api.get<ApiResponse<{
      userId: string;
      name: string;
      email: string;
      role: UserRole;
      status: string;
      emailVerified: boolean;
      lastLogin: string | null;
      loginAttempts: number;
      activityCount: number;
      createdAt: string;
    }>>(`/users/${userId}/statistics`);
  },

  // ==================== Search & Export ====================

  /**
   * Search users with advanced filters
   */
  search: async (
    searchTerm: string,
    filters?: {
      roles?: UserRole[];
      statuses?: string[];
      emailVerified?: boolean;
      includeDeleted?: boolean;
    }
  ): Promise<ApiResponse<User[]>> => {
    return api.post<ApiResponse<User[]>>('/users/search', {
      searchTerm,
      ...filters,
    });
  },

  /**
   * Export users to CSV/Excel (admin)
   */
  exportUsers: async (
    format: 'csv' | 'excel' = 'csv',
    filters?: UserFilters
  ): Promise<Blob> => {
    return api.get<Blob>('/users/export', {
      params: {
        format,
        ...buildPaginationParams(filters),
        role: filters?.role,
        status: filters?.status,
        search: filters?.search,
        email_verified: filters?.email_verified,
        include_deleted: filters?.include_deleted,
      },
    });
  },
};

export default usersApi;