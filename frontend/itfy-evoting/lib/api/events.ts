/**
 * Events API Service
 * Event management endpoints
 */

import { api, buildPaginationParams, uploadFile } from './client';
import type {
  Event,
  ApiResponse,
  PaginationParams,
  PaginationMeta,
  CreateEventRequest,
  UpdateEventRequest,
  EventStatus,
} from '@/types';

// Event list response with pagination
export interface EventsListResponse {
  success: boolean;
  data: Event[];
  pagination: PaginationMeta;
}

// Public event filters (for public endpoints)
export interface PublicEventFilters extends PaginationParams {
  status?: EventStatus;
  search?: string;
  is_featured?: boolean;
  event_type?: string;
}

// Event filters (for admin endpoints)
export interface EventFilters extends PaginationParams {
  status?: EventStatus;
  organiser?: string;
  search?: string;
  start_date_from?: string;
  start_date_to?: string;
  is_featured?: boolean;
  is_published?: boolean;
}

// Event stats response
export interface EventStatsResponse {
  total_votes: number;
  total_candidates: number;
  total_categories: number;
  total_revenue: number;
  total_payments: number;
  votes_by_category: Array<{
    category_id: string;
    category_name: string;
    vote_count: number;
  }>;
  revenue_by_day: Array<{
    date: string;
    amount: number;
  }>;
}

// Event results response
export interface EventResultsResponse {
  event: Event;
  categories: Array<{
    category: {
      _id: string;
      name: string;
    };
    candidates: Array<{
      candidate: {
        _id: string;
        name: string;
        code: string;
        image_url?: string;
      };
      vote_count: number;
      percentage: number;
      rank: number;
    }>;
    total_votes: number;
  }>;
}

/**
 * Events API endpoints
 */
export const eventsApi = {
  // ==================== Public Endpoints ====================

  /**
   * Get public/featured events (no auth required)
   */
  getPublicEvents: async (filters?: PublicEventFilters): Promise<EventsListResponse> => {
    return api.get<EventsListResponse>('/events/public', {
      params: {
        ...buildPaginationParams(filters),
        status: filters?.status,
        search: filters?.search,
        is_featured: filters?.is_featured,
        event_type: filters?.event_type,
      },
      skipAuth: true,
    });
  },

  /**
   * Get featured events (no auth required)
   */
  getFeaturedEvents: async (params?: PaginationParams): Promise<EventsListResponse> => {
    return api.get<EventsListResponse>('/events/featured', {
      params: buildPaginationParams(params),
      skipAuth: true,
    });
  },

  /**
   * Get upcoming events (no auth required)
   */
  getUpcomingEvents: async (params?: PaginationParams): Promise<EventsListResponse> => {
    return api.get<EventsListResponse>('/events/upcoming', {
      params: buildPaginationParams(params),
      skipAuth: true,
    });
  },

  /**
   * Get event by slug (public)
   */
  getBySlug: async (slug: string): Promise<ApiResponse<Event>> => {
    return api.get<ApiResponse<Event>>(`/events/slug/${slug}`, {
      skipAuth: true,
    });
  },

  /**
   * Get event by ID or slug (public)
   */
  getByIdOrSlug: async (idOrSlug: string): Promise<ApiResponse<Event>> => {
    return api.get<ApiResponse<Event>>(`/events/${idOrSlug}`, {
      skipAuth: true,
    });
  },

  /**
   * Get public event results
   */
  getPublicResults: async (eventId: string): Promise<ApiResponse<EventResultsResponse>> => {
    return api.get<ApiResponse<EventResultsResponse>>(
      `/events/${eventId}/results/public`,
      { skipAuth: true }
    );
  },

  // ==================== Admin/Organiser Endpoints ====================

  /**
   * List all events (admin/organiser)
   */
  list: async (filters?: EventFilters): Promise<EventsListResponse> => {
    return api.get<EventsListResponse>('/events', {
      params: {
        ...buildPaginationParams(filters),
        status: filters?.status,
        organiser: filters?.organiser,
        search: filters?.search,
        start_date_from: filters?.start_date_from,
        start_date_to: filters?.start_date_to,
        is_featured: filters?.is_featured,
        is_published: filters?.is_published,
      },
    });
  },

  /**
   * Get event by ID (with full details)
   */
  getById: async (eventId: string): Promise<ApiResponse<Event>> => {
    return api.get<ApiResponse<Event>>(`/events/${eventId}`);
  },

  /**
   * Create new event
   */
  create: async (eventData: CreateEventRequest): Promise<ApiResponse<Event>> => {
    return api.post<ApiResponse<Event>>('/events', eventData);
  },

  /**
   * Update event
   */
  update: async (eventId: string, data: UpdateEventRequest): Promise<ApiResponse<Event>> => {
    return api.put<ApiResponse<Event>>(`/events/${eventId}`, data);
  },

  /**
   * Delete event
   */
  delete: async (eventId: string): Promise<ApiResponse<{ message: string }>> => {
    return api.delete<ApiResponse<{ message: string }>>(`/events/${eventId}`);
  },

  /**
   * Upload event logo
   */
  uploadLogo: async (eventId: string, file: File): Promise<ApiResponse<{ logo_url: string }>> => {
    return uploadFile<ApiResponse<{ logo_url: string }>>(
      `/events/${eventId}/logo`,
      file,
      'logo'
    );
  },

  /**
   * Delete event logo
   */
  deleteLogo: async (eventId: string): Promise<ApiResponse<{ message: string }>> => {
    return api.delete<ApiResponse<{ message: string }>>(`/events/${eventId}/logo`);
  },

  /**
   * Upload event cover image
   */
  uploadCover: async (eventId: string, file: File): Promise<ApiResponse<{ cover_url: string }>> => {
    return uploadFile<ApiResponse<{ cover_url: string }>>(
      `/events/${eventId}/cover`,
      file,
      'cover'
    );
  },

  /**
   * Publish event
   */
  publish: async (eventId: string): Promise<ApiResponse<Event>> => {
    return api.put<ApiResponse<Event>>(`/events/${eventId}/publish`);
  },

  /**
   * Unpublish event
   */
  unpublish: async (eventId: string): Promise<ApiResponse<Event>> => {
    return api.put<ApiResponse<Event>>(`/events/${eventId}/unpublish`);
  },

  /**
   * Toggle featured status
   */
  toggleFeatured: async (eventId: string): Promise<ApiResponse<Event>> => {
    return api.put<ApiResponse<Event>>(`/events/${eventId}/featured`);
  },

  /**
   * Update event status
   */
  updateStatus: async (eventId: string, status: string): Promise<ApiResponse<Event>> => {
    return api.put<ApiResponse<Event>>(`/events/${eventId}/status`, { status });
  },

  /**
   * Cancel event
   */
  cancel: async (eventId: string, reason?: string): Promise<ApiResponse<Event>> => {
    return api.put<ApiResponse<Event>>(`/events/${eventId}/cancel`, { reason });
  },

  /**
   * Complete event
   */
  complete: async (eventId: string): Promise<ApiResponse<Event>> => {
    return api.put<ApiResponse<Event>>(`/events/${eventId}/complete`);
  },

  /**
   * Get event statistics
   */
  getStats: async (eventId: string): Promise<ApiResponse<EventStatsResponse>> => {
    return api.get<ApiResponse<EventStatsResponse>>(`/events/${eventId}/stats`);
  },

  /**
   * Get event vote summary
   */
  getVoteSummary: async (eventId: string): Promise<ApiResponse<{
    total_votes: number;
    votes_by_category: Array<{ category_id: string; category_name: string; vote_count: number }>;
    votes_by_day: Array<{ date: string; count: number }>;
  }>> => {
    return api.get(`/events/${eventId}/votes/summary`);
  },

  /**
   * Get event results (admin)
   */
  getResults: async (eventId: string): Promise<ApiResponse<EventResultsResponse>> => {
    return api.get<ApiResponse<EventResultsResponse>>(`/events/${eventId}/results`);
  },

  /**
   * Publish event results
   */
  publishResults: async (eventId: string): Promise<ApiResponse<Event>> => {
    return api.put<ApiResponse<Event>>(`/events/${eventId}/results/publish`);
  },

  /**
   * Hide event results
   */
  hideResults: async (eventId: string): Promise<ApiResponse<Event>> => {
    return api.put<ApiResponse<Event>>(`/events/${eventId}/results/hide`);
  },

  /**
   * Duplicate event
   */
  duplicate: async (
    eventId: string,
    options?: { include_categories?: boolean; include_forms?: boolean }
  ): Promise<ApiResponse<Event>> => {
    return api.post<ApiResponse<Event>>(`/events/${eventId}/duplicate`, options);
  },

  /**
   * Get events by organiser
   */
  getByOrganiser: async (
    organiserId: string,
    params?: PaginationParams
  ): Promise<EventsListResponse> => {
    return api.get<EventsListResponse>(`/events/organiser/${organiserId}`, {
      params: buildPaginationParams(params),
    });
  },

  /**
   * Get my events (for current user)
   */
  getMyEvents: async (params?: PaginationParams): Promise<EventsListResponse> => {
    return api.get<EventsListResponse>('/events/my-events', {
      params: buildPaginationParams(params),
    });
  },
};

export default eventsApi;
