/**
 * Slides API Service
 * Slide/banner management endpoints
 */

import { api, buildPaginationParams, uploadFile } from './client';
import type {
  Slide,
  ApiResponse,
  PaginationParams,
  PaginationMeta,
  CreateSlideRequest,
  UpdateSlideRequest,
  SlideStatus,
} from '@/types';

// Slide list response with pagination
export interface SlidesListResponse {
  success: boolean;
  data: Slide[];
  pagination: PaginationMeta;
}

// Slide filters
export interface SlideFilters extends PaginationParams {
  event?: string;
  status?: SlideStatus;
  search?: string;
  location?: 'homepage' | 'event' | 'category' | 'results';
  is_active?: boolean;
}

// Slide stats response
export interface SlideStatsResponse {
  total_views: number;
  total_clicks: number;
  click_rate: number;
  views_by_day: Array<{
    date: string;
    views: number;
    clicks: number;
  }>;
}

/**
 * Slides API endpoints
 */
export const slidesApi = {
  // ==================== Public Endpoints ====================

  /**
   * Get active slides (public)
   */
  getActive: async (): Promise<SlidesListResponse> => {
    return api.get<SlidesListResponse>('/slides/active', {
      skipAuth: true,
    });
  },

  /**
   * Get slides by type (hero, banner, promotional)
   */
  getByType: async (type: 'hero' | 'banner' | 'promotional'): Promise<SlidesListResponse> => {
    return api.get<SlidesListResponse>(`/slides/type/${type}`, {
      skipAuth: true,
    });
  },

  /**
   * Get slides by position
   */
  getByPosition: async (position: string): Promise<SlidesListResponse> => {
    return api.get<SlidesListResponse>(`/slides/position/${position}`, {
      skipAuth: true,
    });
  },

  /**
   * Get active slides for homepage (public)
   */
  getHomepageSlides: async (): Promise<SlidesListResponse> => {
    return api.get<SlidesListResponse>('/slides/homepage', {
      skipAuth: true,
    });
  },

  /**
   * Get slides for an event (public)
   */
  getByEvent: async (eventId: string): Promise<SlidesListResponse> => {
    return api.get<SlidesListResponse>(`/slides/event/${eventId}`, {
      skipAuth: true,
    });
  },

  /**
   * Get active slides for an event (public) - alias
   */
  getEventSlides: async (eventId: string): Promise<SlidesListResponse> => {
    return slidesApi.getByEvent(eventId);
  },

  /**
   * Get slides by location (public)
   */
  getByLocation: async (
    location: 'homepage' | 'event' | 'category' | 'results',
    eventId?: string
  ): Promise<SlidesListResponse> => {
    return api.get<SlidesListResponse>('/slides/location', {
      params: { location, event_id: eventId },
      skipAuth: true,
    });
  },

  /**
   * Track slide view (public)
   */
  trackView: async (slideId: string): Promise<void> => {
    await api.post(`/slides/${slideId}/view`, undefined, { skipAuth: true });
  },

  /**
   * Track slide click (public)
   */
  trackClick: async (slideId: string): Promise<void> => {
    await api.post(`/slides/${slideId}/click`, undefined, { skipAuth: true });
  },

  // ==================== Admin/Organiser Endpoints ====================

  /**
   * List all slides
   */
  list: async (filters?: SlideFilters): Promise<SlidesListResponse> => {
    return api.get<SlidesListResponse>('/slides', {
      params: {
        ...buildPaginationParams(filters),
        event: filters?.event,
        status: filters?.status,
        search: filters?.search,
        location: filters?.location,
        is_active: filters?.is_active,
      },
    });
  },

  /**
   * Get slide by ID
   */
  getById: async (slideId: string): Promise<ApiResponse<Slide>> => {
    return api.get<ApiResponse<Slide>>(`/slides/${slideId}`);
  },

  /**
   * Create new slide
   */
  create: async (slideData: CreateSlideRequest): Promise<ApiResponse<Slide>> => {
    return api.post<ApiResponse<Slide>>('/slides', slideData);
  },

  /**
   * Update slide
   */
  update: async (slideId: string, data: UpdateSlideRequest): Promise<ApiResponse<Slide>> => {
    return api.put<ApiResponse<Slide>>(`/slides/${slideId}`, data);
  },

  /**
   * Delete slide
   */
  delete: async (slideId: string): Promise<ApiResponse<{ message: string }>> => {
    return api.delete<ApiResponse<{ message: string }>>(`/slides/${slideId}`);
  },

  /**
   * Upload slide image
   */
  uploadImage: async (
    slideId: string,
    file: File
  ): Promise<ApiResponse<{ image_url: string }>> => {
    return uploadFile<ApiResponse<{ image_url: string }>>(
      `/slides/${slideId}/image`,
      file,
      'image'
    );
  },

  /**
   * Delete slide image
   */
  deleteImage: async (slideId: string): Promise<ApiResponse<{ message: string }>> => {
    return api.delete<ApiResponse<{ message: string }>>(`/slides/${slideId}/image`);
  },

  /**
   * Get slide statistics
   */
  getStats: async (slideId: string): Promise<ApiResponse<SlideStatsResponse>> => {
    return api.get<ApiResponse<SlideStatsResponse>>(`/slides/${slideId}/stats`);
  },

  /**
   * Activate slide
   */
  activate: async (slideId: string): Promise<ApiResponse<Slide>> => {
    return api.post<ApiResponse<Slide>>(`/slides/${slideId}/activate`);
  },

  /**
   * Deactivate slide
   */
  deactivate: async (slideId: string): Promise<ApiResponse<Slide>> => {
    return api.post<ApiResponse<Slide>>(`/slides/${slideId}/deactivate`);
  },

  /**
   * Schedule slide
   */
  schedule: async (
    slideId: string,
    schedule: {
      start_date: string;
      end_date?: string;
    }
  ): Promise<ApiResponse<Slide>> => {
    return api.post<ApiResponse<Slide>>(`/slides/${slideId}/schedule`, schedule);
  },

  /**
   * Reorder slides
   */
  reorder: async (
    slideIds: string[],
    eventId?: string,
    location?: string
  ): Promise<ApiResponse<{ message: string }>> => {
    return api.post<ApiResponse<{ message: string }>>('/slides/reorder', {
      slide_ids: slideIds,
      event_id: eventId,
      location,
    });
  },

  /**
   * Bulk update slides
   */
  bulkUpdate: async (
    updates: Array<{ id: string; data: Partial<UpdateSlideRequest> }>
  ): Promise<ApiResponse<{ updated: number }>> => {
    return api.post<ApiResponse<{ updated: number }>>('/slides/bulk-update', { updates });
  },

  /**
   * Bulk delete slides
   */
  bulkDelete: async (slideIds: string[]): Promise<ApiResponse<{ deleted: number }>> => {
    return api.post<ApiResponse<{ deleted: number }>>('/slides/bulk-delete', {
      slide_ids: slideIds,
    });
  },

  /**
   * Duplicate slide
   */
  duplicate: async (slideId: string): Promise<ApiResponse<Slide>> => {
    return api.post<ApiResponse<Slide>>(`/slides/${slideId}/duplicate`);
  },

  /**
   * Get slides analytics summary
   */
  getAnalytics: async (params?: {
    event_id?: string;
    date_from?: string;
    date_to?: string;
  }): Promise<ApiResponse<{
    total_slides: number;
    active_slides: number;
    total_views: number;
    total_clicks: number;
    average_click_rate: number;
    top_performing: Array<{
      slide_id: string;
      title: string;
      views: number;
      clicks: number;
      click_rate: number;
    }>;
  }>> => {
    return api.get<ApiResponse<{
      total_slides: number;
      active_slides: number;
      total_views: number;
      total_clicks: number;
      average_click_rate: number;
      top_performing: Array<{
        slide_id: string;
        title: string;
        views: number;
        clicks: number;
        click_rate: number;
      }>;
    }>>('/slides/analytics', { params });
  },
};

export default slidesApi;
