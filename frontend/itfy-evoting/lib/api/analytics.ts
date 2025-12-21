/**
 * Analytics API Service
 * Dashboard analytics and reporting endpoints
 */

import { api, buildPaginationParams } from './client';
import type { ApiResponse, PaginationParams } from '@/types';

// ==================== Response Types ====================

export interface DashboardOverview {
  totalUsers: number;
  totalEvents: number;
  totalVotes: number;
  totalRevenue: number;
  activeEvents: number;
  completedEvents: number;
  totalCandidates: number;
  totalCategories: number;
  overallParticipationRate: number;
  systemHealthScore: number;
  growthRate: {
    users: number;
    events: number;
    votes: number;
    revenue: number;
  };
  timestamp: string;
}

export interface VotingAnalytics {
  totalVotes: number;
  votesByDay: Array<{
    date: string;
    count: number;
    amount: number;
  }>;
  votesByCategory: Array<{
    category: string;
    count: number;
    percentage: number;
  }>;
  votesByEvent: Array<{
    event: string;
    count: number;
    revenue: number;
  }>;
  topCandidates: Array<{
    name: string;
    code: string;
    votes: number;
    event: string;
  }>;
  peakHours: Array<{
    hour: number;
    count: number;
  }>;
}

export interface PaymentAnalytics {
  totalRevenue: number;
  totalTransactions: number;
  averageTransactionValue: number;
  revenueByDay: Array<{
    date: string;
    amount: number;
    count: number;
  }>;
  revenueByEvent: Array<{
    event: string;
    amount: number;
    percentage: number;
  }>;
  paymentMethods: Array<{
    method: string;
    count: number;
    amount: number;
  }>;
  conversionRate: number;
  refundRate: number;
}

export interface EventAnalytics {
  event: {
    id: string;
    name: string;
    status: string;
  };
  summary: {
    totalVotes: number;
    totalRevenue: number;
    totalCandidates: number;
    totalCategories: number;
    participationRate: number;
  };
  votingTrends: Array<{
    date: string;
    votes: number;
    revenue: number;
  }>;
  categoryPerformance: Array<{
    category: string;
    votes: number;
    revenue: number;
    topCandidate: string;
  }>;
  candidateRanking: Array<{
    rank: number;
    name: string;
    code: string;
    category: string;
    votes: number;
    percentage: number;
  }>;
}

export interface ActivityHeatmap {
  data: Array<{
    day: number; // 0-6 (Sunday-Saturday)
    hour: number; // 0-23
    count: number;
  }>;
  maxCount: number;
}

export interface ConversionFunnel {
  steps: Array<{
    name: string;
    count: number;
    percentage: number;
    dropOff: number;
  }>;
}

export interface RealTimeMetrics {
  votesLastMinute: number;
  votesLastHour: number;
  activeUsers: number;
  pendingPayments: number;
  revenueLastHour: number;
  trending: Array<{
    candidateId: string;
    candidateName: string;
    votes: number;
    change: number;
  }>;
}

// Query params types
export interface AnalyticsQueryParams {
  period?: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'all-time' | 'custom';
  startDate?: string;
  endDate?: string;
  eventId?: string;
}

export interface ExportParams extends AnalyticsQueryParams {
  type: 'csv' | 'excel' | 'pdf';
  analytics: 'voting' | 'payments' | 'overview' | 'comprehensive';
}

// ==================== Analytics API ====================

export const analyticsApi = {
  // ==================== Dashboard ====================

  /**
   * Get platform-wide dashboard overview
   */
  getDashboardOverview: async (
    params?: AnalyticsQueryParams
  ): Promise<ApiResponse<DashboardOverview>> => {
    return api.get<ApiResponse<DashboardOverview>>('/analytics/platform/dashboard', {
      params,
    });
  },

  /**
   * Get event-specific dashboard
   */
  getEventDashboard: async (
    eventId: string,
    params?: AnalyticsQueryParams
  ): Promise<ApiResponse<EventAnalytics>> => {
    return api.get<ApiResponse<EventAnalytics>>(`/analytics/event/${eventId}/dashboard`, {
      params,
    });
  },

  // ==================== Voting Analytics ====================

  /**
   * Get comprehensive voting analytics
   */
  getVotingAnalytics: async (
    params?: AnalyticsQueryParams
  ): Promise<ApiResponse<VotingAnalytics>> => {
    return api.get<ApiResponse<VotingAnalytics>>('/analytics/voting', {
      params,
    });
  },

  /**
   * Get voting trends for an event
   */
  getVotingTrends: async (
    eventId: string,
    params?: { interval?: string; startDate?: string; endDate?: string }
  ): Promise<ApiResponse<Array<{ date: string; votes: number; revenue: number }>>> => {
    return api.get<ApiResponse<Array<{ date: string; votes: number; revenue: number }>>>(
      `/analytics/event/${eventId}/voting-trends`,
      { params }
    );
  },

  // ==================== Payment Analytics ====================

  /**
   * Get payment/revenue analytics
   */
  getPaymentAnalytics: async (
    params?: AnalyticsQueryParams
  ): Promise<ApiResponse<PaymentAnalytics>> => {
    return api.get<ApiResponse<PaymentAnalytics>>('/analytics/payments', {
      params,
    });
  },

  /**
   * Get revenue trends for an event
   */
  getRevenueTrends: async (
    eventId: string,
    params?: { interval?: string; startDate?: string; endDate?: string }
  ): Promise<ApiResponse<Array<{ date: string; amount: number; count: number }>>> => {
    return api.get<ApiResponse<Array<{ date: string; amount: number; count: number }>>>(
      `/analytics/event/${eventId}/revenue-trends`,
      { params }
    );
  },

  // ==================== Engagement & Insights ====================

  /**
   * Get user engagement metrics
   */
  getUserEngagement: async (
    eventId: string,
    params?: { startDate?: string; endDate?: string }
  ): Promise<ApiResponse<{
    uniqueVoters: number;
    repeatVoters: number;
    averageVotesPerUser: number;
    engagementRate: number;
  }>> => {
    return api.get(`/analytics/event/${eventId}/engagement`, { params });
  },

  /**
   * Get activity heatmap
   */
  getActivityHeatmap: async (
    eventId: string,
    params?: { startDate?: string; endDate?: string }
  ): Promise<ApiResponse<ActivityHeatmap>> => {
    return api.get<ApiResponse<ActivityHeatmap>>(
      `/analytics/event/${eventId}/heatmap`,
      { params }
    );
  },

  /**
   * Get conversion funnel analysis
   */
  getConversionFunnel: async (
    eventId: string
  ): Promise<ApiResponse<ConversionFunnel>> => {
    return api.get<ApiResponse<ConversionFunnel>>(
      `/analytics/event/${eventId}/funnel`
    );
  },

  // ==================== Rankings ====================

  /**
   * Get candidate ranking for an event
   */
  getCandidateRanking: async (
    eventId: string,
    params?: { categoryId?: string; limit?: number }
  ): Promise<ApiResponse<Array<{
    rank: number;
    candidateId: string;
    candidateName: string;
    candidateCode: string;
    votes: number;
    percentage: number;
  }>>> => {
    return api.get(`/analytics/event/${eventId}/candidate-ranking`, { params });
  },

  // ==================== Comparisons ====================

  /**
   * Compare multiple events
   */
  compareEvents: async (
    eventIds: string[]
  ): Promise<ApiResponse<Array<{
    eventId: string;
    eventName: string;
    totalVotes: number;
    totalRevenue: number;
    participationRate: number;
  }>>> => {
    return api.post('/analytics/compare-events', { event_ids: eventIds });
  },

  // ==================== Real-time ====================

  /**
   * Get real-time metrics for an event
   */
  getRealTimeMetrics: async (
    eventId: string,
    minutes?: number
  ): Promise<ApiResponse<RealTimeMetrics>> => {
    return api.get<ApiResponse<RealTimeMetrics>>(
      `/analytics/event/${eventId}/realtime`,
      { params: { minutes } }
    );
  },

  // ==================== Export ====================

  /**
   * Export analytics data
   */
  exportAnalytics: async (params: ExportParams): Promise<Blob> => {
    const response = await api.get<Blob>('/analytics/export', {
      params,
      responseType: 'blob',
    });
    return response as unknown as Blob;
  },
};

export default analyticsApi;
