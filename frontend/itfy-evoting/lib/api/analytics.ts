/**
 * Analytics API Service
 * Dashboard analytics and reporting endpoints
 */

import { api, buildPaginationParams } from './client';
import type { ApiResponse, PaginationParams } from '@/types';

// ==================== Response Types ====================

export interface SystemHealthServices {
  database: {
    status: string;
    state?: string;
    responseTime?: number;
    collections?: number;
    objects?: number;
    dataSize?: string;
    indexSize?: string;
  };
  cache: {
    status: string;
    store?: string;
    keys?: number;
  };
  agenda: {
    status: string;
    uptime?: number;
    jobs?: {
      total?: number;
      pending?: number;
      running?: number;
      failed?: number;
    };
  };
}

export interface SystemHealth {
  status: 'healthy' | 'degraded' | 'unhealthy';
  score: number;
  services: SystemHealthServices;
  uptime: number;
}

export interface DashboardOverview {
  totalUsers: number;
  totalEvents: number;
  totalVotes: number;
  totalRevenue: number;
  activeEvents: number;
  completedEvents: number;
  upcomingEvents?: number;
  totalCandidates: number;
  totalCategories: number;
  overallParticipationRate: number;
  systemHealthScore: number;
  systemHealth?: SystemHealth;
  growthRate: {
    users: number;
    events: number;
    votes: number;
    revenue: number;
  };
  voteStats?: {
    totalVotes: number;
    totalAmount: number;
    averagePerEvent: number;
  };
  paymentStats?: {
    totalRevenue: number;
    totalTransactions: number;
    averageTransaction: number;
    successRate: number;
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
  [key: string]: string | undefined;
}

export interface ExportParams extends AnalyticsQueryParams {
  type: 'csv' | 'excel' | 'pdf';
  analytics: 'voting' | 'payments' | 'overview' | 'comprehensive';
}

// ==================== Analytics API ====================

export const analyticsApi = {
  // ==================== Dashboard ====================

  /**
   * Get platform-wide dashboard overview with system health
   */
  getDashboardOverview: async (
    params?: AnalyticsQueryParams
  ): Promise<ApiResponse<DashboardOverview>> => {
    return api.get<ApiResponse<DashboardOverview>>('/analytics/platform/overview', {
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

  // ==================== Device & Region Analytics ====================

  /**
   * Get device analytics (device types, browsers, OS)
   */
  getDeviceAnalytics: async (params?: {
    period?: string;
    start_date?: string;
    end_date?: string;
    event_id?: string;
  }): Promise<ApiResponse<{
    totalActivities: number;
    deviceTypes: Array<{
      type: string;
      count: number;
      percentage: string;
    }>;
    browsers: Array<{
      name: string;
      count: number;
      percentage: string;
    }>;
    operatingSystems: Array<{
      name: string;
      count: number;
      percentage: string;
    }>;
    period: {
      startDate: string;
      endDate: string;
    };
  }>> => {
    return api.get('/analytics/devices', { params });
  },

  /**
   * Get region analytics (countries, cities)
   */
  getRegionAnalytics: async (params?: {
    period?: string;
    start_date?: string;
    end_date?: string;
    event_id?: string;
  }): Promise<ApiResponse<{
    totalActivities: number;
    countries: Array<{
      country: string;
      count: number;
      percentage: string;
    }>;
    regions: Array<{
      country: string;
      region: string;
      count: number;
      percentage: string;
    }>;
    cities: Array<{
      country: string;
      city: string;
      count: number;
      percentage: string;
    }>;
    period: {
      startDate: string;
      endDate: string;
    };
  }>> => {
    return api.get('/analytics/regions', { params });
  },

  // ==================== System Health ====================

  /**
   * Get quick system health status
   */
  getHealthStatus: async (): Promise<ApiResponse<{
    status: string;
    timestamp: string;
    uptime: number;
    environment: string;
    services: {
      database: string;
      cache: string;
      agenda: string;
    };
  }>> => {
    return api.get('/health');
  },

  /**
   * Get detailed system health information
   */
  getDetailedHealth: async (): Promise<ApiResponse<SystemHealth & {
    system: {
      status: string;
      memory: {
        total: string;
        free: string;
        used: string;
        usagePercent: number;
      };
      cpu: {
        cores: number;
        loadAvg: {
          '1min': string;
          '5min': string;
          '15min': string;
        };
      };
      process: {
        memory: {
          heapUsed: string;
          heapTotal: string;
          rss: string;
          external: string;
        };
        pid: number;
        uptime: number;
      };
      platform: string;
      nodeVersion: string;
    };
  }>> => {
    return api.get('/health/detailed');
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
