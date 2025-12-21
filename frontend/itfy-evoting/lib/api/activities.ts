/**
 * Activities API Service
 * Activity logging and audit trail endpoints
 */

import { api, buildPaginationParams } from './client';
import type { ApiResponse, PaginationParams, PaginationMeta } from '@/types';

// ==================== Types ====================

export type ActivityType = 
  | 'user'
  | 'event'
  | 'vote'
  | 'payment'
  | 'candidate'
  | 'login'
  | 'system'
  | 'admin';

export type ActivityAction = 
  | 'create'
  | 'update'
  | 'delete'
  | 'login'
  | 'logout'
  | 'vote'
  | 'payment'
  | 'approve'
  | 'reject'
  | 'export'
  | 'import'
  | 'bulk_action';

export interface Activity {
  _id: string;
  action: ActivityAction;
  type: ActivityType;
  description: string;
  user?: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
  target?: {
    type: string;
    id: string;
    name?: string;
  };
  metadata?: Record<string, unknown>;
  ip_address?: string;
  user_agent?: string;
  status: 'success' | 'failed' | 'pending';
  created_at: string;
}

export interface ActivityFilters extends PaginationParams {
  type?: ActivityType;
  action?: ActivityAction;
  userId?: string;
  targetType?: string;
  targetId?: string;
  startDate?: string;
  endDate?: string;
  status?: 'success' | 'failed' | 'pending';
}

export interface ActivityStats {
  totalActivities: number;
  todayActivities: number;
  weekActivities: number;
  monthActivities: number;
  byType: Record<ActivityType, number>;
  byAction: Record<ActivityAction, number>;
  topUsers: Array<{
    user: {
      _id: string;
      name: string;
      email: string;
    };
    count: number;
  }>;
  hourlyDistribution: Array<{
    hour: number;
    count: number;
  }>;
}

export interface ActivitiesListResponse {
  success: boolean;
  data: Activity[];
  pagination: PaginationMeta;
}

// ==================== Activities API ====================

export const activitiesApi = {
  /**
   * Get all activities with filters
   */
  getActivities: async (
    filters?: ActivityFilters
  ): Promise<ActivitiesListResponse> => {
    return api.get<ActivitiesListResponse>('/activities', {
      params: {
        ...buildPaginationParams(filters),
        type: filters?.type,
        action: filters?.action,
        userId: filters?.userId,
        targetType: filters?.targetType,
        targetId: filters?.targetId,
        startDate: filters?.startDate,
        endDate: filters?.endDate,
        status: filters?.status,
      },
    });
  },

  /**
   * Get recent activities (shorthand)
   */
  getRecentActivities: async (
    limit: number = 10,
    params?: { period?: string }
  ): Promise<ApiResponse<Activity[]>> => {
    return api.get<ApiResponse<Activity[]>>('/activities/recent', {
      params: { limit, ...params },
    });
  },

  /**
   * Get activity by ID
   */
  getActivityById: async (id: string): Promise<ApiResponse<Activity>> => {
    return api.get<ApiResponse<Activity>>(`/activities/${id}`);
  },

  /**
   * Get activity statistics
   */
  getActivityStats: async (
    params?: { period?: string }
  ): Promise<ApiResponse<ActivityStats>> => {
    return api.get<ApiResponse<ActivityStats>>('/activities/stats', {
      params,
    });
  },

  /**
   * Get activities for a specific user
   */
  getUserActivities: async (
    userId: string,
    filters?: Omit<ActivityFilters, 'userId'>
  ): Promise<ActivitiesListResponse> => {
    return api.get<ActivitiesListResponse>(`/activities/user/${userId}`, {
      params: {
        ...buildPaginationParams(filters),
        type: filters?.type,
        action: filters?.action,
        startDate: filters?.startDate,
        endDate: filters?.endDate,
      },
    });
  },

  /**
   * Get activities for a specific target (event, candidate, etc.)
   */
  getTargetActivities: async (
    targetType: string,
    targetId: string,
    filters?: Omit<ActivityFilters, 'targetType' | 'targetId'>
  ): Promise<ActivitiesListResponse> => {
    return api.get<ActivitiesListResponse>(
      `/activities/target/${targetType}/${targetId}`,
      {
        params: {
          ...buildPaginationParams(filters),
          type: filters?.type,
          action: filters?.action,
          startDate: filters?.startDate,
          endDate: filters?.endDate,
        },
      }
    );
  },

  /**
   * Export activities
   */
  exportActivities: async (
    format: 'csv' | 'excel' | 'pdf',
    filters?: ActivityFilters
  ): Promise<Blob> => {
    const response = await api.get<Blob>('/activities/export', {
      params: {
        format,
        type: filters?.type,
        action: filters?.action,
        startDate: filters?.startDate,
        endDate: filters?.endDate,
      },
      responseType: 'blob',
    });
    return response as unknown as Blob;
  },

  /**
   * Get login history for a user
   */
  getLoginHistory: async (
    userId?: string,
    limit: number = 20
  ): Promise<ApiResponse<Array<{
    ip_address: string;
    user_agent: string;
    location?: string;
    timestamp: string;
    status: 'success' | 'failed';
  }>>> => {
    return api.get('/activities/login-history', {
      params: { userId, limit },
    });
  },
};

export default activitiesApi;
