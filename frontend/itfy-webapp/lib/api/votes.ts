/**
 * Votes API Service
 * Voting and vote results endpoints
 */

import { api, buildPaginationParams } from './client';
import type {
  Vote,
  ApiResponse,
  PaginationParams,
  PaginationMeta,
  CastVoteRequest,
} from '@/types';

// Vote list response with pagination
export interface VotesListResponse {
  success: boolean;
  data: Vote[];
  pagination: PaginationMeta;
}

// Vote filters
export interface VoteFilters extends PaginationParams {
  event?: string;
  category?: string;
  candidate?: string;
  vote_code?: string;
  date_from?: string;
  date_to?: string;
}

// Vote eligibility response
export interface VoteEligibilityResponse {
  eligible: boolean;
  remaining_votes: number;
  vote_code_valid: boolean;
  message?: string;
}

// Vote count response
export interface VoteCountResponse {
  candidate_id: string;
  candidate_name: string;
  candidate_code: string;
  vote_count: number;
}

// Category vote results
export interface CategoryVoteResults {
  category_id: string;
  category_name: string;
  total_votes: number;
  candidates: Array<{
    candidate_id: string;
    candidate_name: string;
    candidate_code: string;
    image_url?: string;
    vote_count: number;
    percentage: number;
    rank: number;
  }>;
}

// Event vote results
export interface EventVoteResults {
  event_id: string;
  event_name: string;
  total_votes: number;
  total_categories: number;
  categories: CategoryVoteResults[];
  last_updated: string;
}

// Vote trends response
export interface VoteTrendsResponse {
  period: string;
  data: Array<{
    date: string;
    total_votes: number;
    by_candidate?: Record<string, number>;
  }>;
}

// Vote statistics response
export interface VoteStatisticsResponse {
  total_votes: number;
  total_events: number;
  total_categories: number;
  votes_today: number;
  votes_this_week: number;
  votes_this_month: number;
  average_votes_per_event: number;
  top_events: Array<{
    event_id: string;
    event_name: string;
    vote_count: number;
  }>;
}

/**
 * Votes API endpoints
 */
export const votesApi = {
  // ==================== Public Voting Endpoints ====================

  /**
   * Cast a vote
   */
  cast: async (voteData: CastVoteRequest): Promise<ApiResponse<Vote>> => {
    return api.post<ApiResponse<Vote>>('/votes', voteData, {
      skipAuth: true,
    });
  },

  /**
   * Cast multiple votes with a vote code
   */
  castBulk: async (data: {
    vote_code: string;
    votes: Array<{
      category_id: string;
      candidate_id: string;
      quantity?: number;
    }>;
  }): Promise<ApiResponse<{ votes: Vote[]; remaining: number }>> => {
    return api.post<ApiResponse<{ votes: Vote[]; remaining: number }>>(
      '/votes/bulk',
      data,
      { skipAuth: true }
    );
  },

  /**
   * Check vote eligibility
   */
  checkEligibility: async (data: {
    vote_code: string;
    category_id: string;
  }): Promise<ApiResponse<VoteEligibilityResponse>> => {
    return api.post<ApiResponse<VoteEligibilityResponse>>(
      '/votes/check-eligibility',
      data,
      { skipAuth: true }
    );
  },

  /**
   * Validate vote code
   */
  validateCode: async (
    voteCode: string,
    eventId?: string
  ): Promise<ApiResponse<{
    valid: boolean;
    remaining_votes: number;
    event_id: string;
    bundle_name?: string;
  }>> => {
    return api.post<ApiResponse<{
      valid: boolean;
      remaining_votes: number;
      event_id: string;
      bundle_name?: string;
    }>>(
      '/votes/validate-code',
      { vote_code: voteCode, event_id: eventId },
      { skipAuth: true }
    );
  },

  /**
   * Get vote code balance/status
   */
  getCodeStatus: async (
    voteCode: string
  ): Promise<ApiResponse<{
    vote_code: string;
    total_votes: number;
    used_votes: number;
    remaining_votes: number;
    event_id: string;
    event_name: string;
    expires_at?: string;
  }>> => {
    return api.get<ApiResponse<{
      vote_code: string;
      total_votes: number;
      used_votes: number;
      remaining_votes: number;
      event_id: string;
      event_name: string;
      expires_at?: string;
    }>>(`/votes/code-status/${voteCode}`, { skipAuth: true });
  },

  // ==================== Public Results Endpoints ====================

  /**
   * Get public vote counts for a category
   */
  getCategoryResults: async (
    categoryId: string
  ): Promise<ApiResponse<CategoryVoteResults>> => {
    return api.get<ApiResponse<CategoryVoteResults>>(
      `/votes/results/category/${categoryId}`,
      { skipAuth: true }
    );
  },

  /**
   * Get public vote results for an event
   */
  getEventResults: async (eventId: string): Promise<ApiResponse<EventVoteResults>> => {
    return api.get<ApiResponse<EventVoteResults>>(
      `/votes/results/event/${eventId}`,
      { skipAuth: true }
    );
  },

  /**
   * Get live vote counts (for display screens)
   */
  getLiveResults: async (
    eventId: string,
    categoryId?: string
  ): Promise<ApiResponse<CategoryVoteResults | EventVoteResults>> => {
    return api.get<ApiResponse<CategoryVoteResults | EventVoteResults>>(
      `/votes/live/${eventId}`,
      {
        params: { category_id: categoryId },
        skipAuth: true,
      }
    );
  },

  // ==================== Admin Endpoints ====================

  /**
   * List all votes (admin)
   */
  list: async (filters?: VoteFilters): Promise<VotesListResponse> => {
    return api.get<VotesListResponse>('/votes', {
      params: {
        ...buildPaginationParams(filters),
        event: filters?.event,
        category: filters?.category,
        candidate: filters?.candidate,
        vote_code: filters?.vote_code,
        date_from: filters?.date_from,
        date_to: filters?.date_to,
      },
    });
  },

  /**
   * Get vote by ID (admin)
   */
  getById: async (voteId: string): Promise<ApiResponse<Vote>> => {
    return api.get<ApiResponse<Vote>>(`/votes/${voteId}`);
  },

  /**
   * Get vote statistics (admin)
   */
  getStatistics: async (filters?: {
    event_id?: string;
    date_from?: string;
    date_to?: string;
  }): Promise<ApiResponse<VoteStatisticsResponse>> => {
    return api.get<ApiResponse<VoteStatisticsResponse>>('/votes/statistics', {
      params: filters,
    });
  },

  /**
   * Get vote trends (admin)
   */
  getTrends: async (params: {
    event_id: string;
    category_id?: string;
    period?: 'hourly' | 'daily' | 'weekly';
    date_from?: string;
    date_to?: string;
  }): Promise<ApiResponse<VoteTrendsResponse>> => {
    return api.get<ApiResponse<VoteTrendsResponse>>('/votes/trends', {
      params,
    });
  },

  /**
   * Get votes by event (admin)
   */
  getByEvent: async (
    eventId: string,
    params?: PaginationParams
  ): Promise<VotesListResponse> => {
    return api.get<VotesListResponse>(`/votes/event/${eventId}`, {
      params: buildPaginationParams(params),
    });
  },

  /**
   * Get votes by category (admin)
   */
  getByCategory: async (
    categoryId: string,
    params?: PaginationParams
  ): Promise<VotesListResponse> => {
    return api.get<VotesListResponse>(`/votes/category/${categoryId}`, {
      params: buildPaginationParams(params),
    });
  },

  /**
   * Get votes by candidate (admin)
   */
  getByCandidate: async (
    candidateId: string,
    params?: PaginationParams
  ): Promise<VotesListResponse> => {
    return api.get<VotesListResponse>(`/votes/candidate/${candidateId}`, {
      params: buildPaginationParams(params),
    });
  },

  /**
   * Export votes data (admin)
   */
  export: async (params: {
    event_id: string;
    format?: 'csv' | 'xlsx';
    date_from?: string;
    date_to?: string;
  }): Promise<Blob> => {
    return api.get<Blob>('/votes/export', {
      params,
      headers: { Accept: 'application/octet-stream' },
    });
  },

  /**
   * Invalidate a vote (admin - special permission required)
   */
  invalidate: async (
    voteId: string,
    reason: string
  ): Promise<ApiResponse<Vote>> => {
    return api.post<ApiResponse<Vote>>(`/votes/${voteId}/invalidate`, { reason });
  },

  /**
   * Get vote counts summary for an event (admin)
   */
  getEventSummary: async (
    eventId: string
  ): Promise<ApiResponse<{
    total_votes: number;
    by_category: Array<{
      category_id: string;
      category_name: string;
      total_votes: number;
      candidate_count: number;
    }>;
    recent_votes: Vote[];
  }>> => {
    return api.get<ApiResponse<{
      total_votes: number;
      by_category: Array<{
        category_id: string;
        category_name: string;
        total_votes: number;
        candidate_count: number;
      }>;
      recent_votes: Vote[];
    }>>(`/votes/event/${eventId}/summary`);
  },
};

export default votesApi;
