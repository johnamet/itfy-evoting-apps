/**
 * Notifications API Service
 * Notification management endpoints
 */

import { api, buildPaginationParams } from './client';
import type {
  Notification,
  ApiResponse,
  PaginationParams,
  PaginationMeta,
  CreateNotificationRequest,
} from '@/types';

// Notification list response with pagination
export interface NotificationsListResponse {
  success: boolean;
  data: Notification[];
  pagination: PaginationMeta;
  unread_count?: number;
}

// Notification filters
export interface NotificationFilters extends PaginationParams {
  type?: string;
  is_read?: boolean;
  date_from?: string;
  date_to?: string;
}

// Notification preferences
export interface NotificationPreferences {
  email_notifications: boolean;
  push_notifications: boolean;
  sms_notifications: boolean;
  notification_types: {
    votes: boolean;
    payments: boolean;
    submissions: boolean;
    events: boolean;
    system: boolean;
  };
}

/**
 * Notifications API endpoints
 */
export const notificationsApi = {
  // ==================== User Notification Endpoints ====================

  /**
   * Get current user's notifications
   */
  getMyNotifications: async (
    params?: NotificationFilters
  ): Promise<NotificationsListResponse> => {
    return api.get<NotificationsListResponse>('/notifications/me', {
      params: {
        ...buildPaginationParams(params),
        type: params?.type,
        is_read: params?.is_read,
        date_from: params?.date_from,
        date_to: params?.date_to,
      },
    });
  },

  /**
   * Get unread notification count
   */
  getUnreadCount: async (): Promise<ApiResponse<{ count: number }>> => {
    return api.get<ApiResponse<{ count: number }>>('/notifications/me/unread/count');
  },

  /**
   * Mark notification as read
   */
  markAsRead: async (notificationId: string): Promise<ApiResponse<Notification>> => {
    return api.put<ApiResponse<Notification>>(
      `/notifications/${notificationId}/read`
    );
  },

  /**
   * Mark all notifications as read
   */
  markAllAsRead: async (): Promise<ApiResponse<{ updated: number }>> => {
    return api.put<ApiResponse<{ updated: number }>>('/notifications/me/read-all');
  },

  /**
   * Delete notification
   */
  delete: async (notificationId: string): Promise<ApiResponse<{ message: string }>> => {
    return api.delete<ApiResponse<{ message: string }>>(`/notifications/${notificationId}`);
  },

  /**
   * Delete all read notifications
   */
  deleteAllRead: async (): Promise<ApiResponse<{ deleted: number }>> => {
    return api.delete<ApiResponse<{ deleted: number }>>('/notifications/me/read');
  },

  /**
   * Get notification preferences
   */
  getPreferences: async (): Promise<ApiResponse<NotificationPreferences>> => {
    return api.get<ApiResponse<NotificationPreferences>>('/notifications/preferences');
  },

  /**
   * Update notification preferences
   */
  updatePreferences: async (
    preferences: Partial<NotificationPreferences>
  ): Promise<ApiResponse<NotificationPreferences>> => {
    return api.put<ApiResponse<NotificationPreferences>>(
      '/notifications/preferences',
      preferences
    );
  },

  // ==================== Admin Notification Endpoints ====================

  /**
   * List all notifications (admin)
   */
  list: async (
    params?: NotificationFilters & { user?: string }
  ): Promise<NotificationsListResponse> => {
    return api.get<NotificationsListResponse>('/notifications', {
      params: {
        ...buildPaginationParams(params),
        user: params?.user,
        type: params?.type,
        is_read: params?.is_read,
        date_from: params?.date_from,
        date_to: params?.date_to,
      },
    });
  },

  /**
   * Get notification by ID (admin)
   */
  getById: async (notificationId: string): Promise<ApiResponse<Notification>> => {
    return api.get<ApiResponse<Notification>>(`/notifications/${notificationId}`);
  },

  /**
   * Create notification (admin - send to users)
   */
  create: async (
    notificationData: CreateNotificationRequest
  ): Promise<ApiResponse<Notification>> => {
    return api.post<ApiResponse<Notification>>('/notifications', notificationData);
  },

  /**
   * Send notification to user
   */
  sendToUser: async (
    userId: string,
    notification: {
      title: string;
      message: string;
      type?: string;
      data?: Record<string, unknown>;
    }
  ): Promise<ApiResponse<Notification>> => {
    return api.post<ApiResponse<Notification>>(`/notifications/user/${userId}`, notification);
  },

  /**
   * Send notification to multiple users
   */
  sendToUsers: async (data: {
    user_ids: string[];
    title: string;
    message: string;
    type?: string;
    data?: Record<string, unknown>;
  }): Promise<ApiResponse<{ sent: number }>> => {
    return api.post<ApiResponse<{ sent: number }>>('/notifications/bulk-send', data);
  },

  /**
   * Send notification to all users
   */
  broadcast: async (notification: {
    title: string;
    message: string;
    type?: string;
    data?: Record<string, unknown>;
    filters?: {
      role?: string;
      event_id?: string;
    };
  }): Promise<ApiResponse<{ sent: number }>> => {
    return api.post<ApiResponse<{ sent: number }>>('/notifications/broadcast', notification);
  },

  /**
   * Send notification to event participants
   */
  sendToEventParticipants: async (
    eventId: string,
    notification: {
      title: string;
      message: string;
      type?: string;
      data?: Record<string, unknown>;
      target?: 'all' | 'candidates' | 'voters' | 'organisers';
    }
  ): Promise<ApiResponse<{ sent: number }>> => {
    return api.post<ApiResponse<{ sent: number }>>(
      `/events/${eventId}/notifications`,
      notification
    );
  },

  /**
   * Get notification statistics (admin)
   */
  getStats: async (params?: {
    date_from?: string;
    date_to?: string;
  }): Promise<ApiResponse<{
    total_sent: number;
    total_read: number;
    read_rate: number;
    by_type: Array<{
      type: string;
      count: number;
      read_count: number;
    }>;
    by_day: Array<{
      date: string;
      sent: number;
      read: number;
    }>;
  }>> => {
    return api.get<ApiResponse<{
      total_sent: number;
      total_read: number;
      read_rate: number;
      by_type: Array<{
        type: string;
        count: number;
        read_count: number;
      }>;
      by_day: Array<{
        date: string;
        sent: number;
        read: number;
      }>;
    }>>('/notifications/stats', { params });
  },

  /**
   * Bulk delete notifications (admin)
   */
  bulkDelete: async (
    notificationIds: string[]
  ): Promise<ApiResponse<{ deleted: number }>> => {
    return api.post<ApiResponse<{ deleted: number }>>('/notifications/bulk-delete', {
      notification_ids: notificationIds,
    });
  },

  // ==================== Push Notification Endpoints ====================

  /**
   * Register push notification token
   */
  registerPushToken: async (data: {
    token: string;
    platform: 'web' | 'ios' | 'android';
    device_id?: string;
  }): Promise<ApiResponse<{ message: string }>> => {
    return api.post<ApiResponse<{ message: string }>>('/notifications/push/register', data);
  },

  /**
   * Unregister push notification token
   */
  unregisterPushToken: async (token: string): Promise<ApiResponse<{ message: string }>> => {
    return api.post<ApiResponse<{ message: string }>>('/notifications/push/unregister', {
      token,
    });
  },

  /**
   * Test push notification
   */
  testPush: async (): Promise<ApiResponse<{ message: string }>> => {
    return api.post<ApiResponse<{ message: string }>>('/notifications/push/test');
  },
};

export default notificationsApi;
