/**
 * Bundles API Service
 * Vote bundle management endpoints
 */

import { get } from 'http';
import { api, buildPaginationParams, uploadFile } from './client';
import type {
  Bundle,
  ApiResponse,
  PaginationParams,
  PaginationMeta,
  CreateBundleRequest,
  UpdateBundleRequest,
  BundleStatus,
} from '@/types';

// Bundle list response with pagination
export interface BundlesListResponse {
  success: boolean;
  data: Bundle[];
  pagination: PaginationMeta;
}

// Bundle filters
export interface BundleFilters extends PaginationParams {
  event?: string;
  status?: BundleStatus;
  search?: string;
  is_featured?: boolean;
  min_price?: number;
  max_price?: number;
}

// Bundle stats response
export interface BundleStatsResponse {
  total_sold: number;
  total_revenue: number;
  active_codes: number;
  used_votes: number;
  sales_by_day: Array<{
    date: string;
    count: number;
    revenue: number;
  }>;
}

/**
 * Bundles API endpoints
 */
export const bundlesApi = {
  // ==================== Public Endpoints ====================

   /**
   * 
   * Get available bundles (public)
   * 
   */
  listPublic: async (
    params?: PaginationParams
  ): Promise<BundlesListResponse> => {
    return api.get<BundlesListResponse>(`/bundles/public`, {
      params: buildPaginationParams(params),
      skipAuth: true,
    })},

  /**
   * Get bundles for an event (public)
   */
  getByEvent: async (
    eventId: string,
    params?: PaginationParams
  ): Promise<BundlesListResponse> => {
    return api.get<BundlesListResponse>(`/bundles/event/${eventId}`, {
      params: buildPaginationParams(params),
      skipAuth: true,
    });
  },

 

  /**
   * Get featured bundles for an event (public)
   */
  getFeatured: async (eventId?: string): Promise<BundlesListResponse> => {
    return api.get<BundlesListResponse>(`/bundles/featured`, {
      params: eventId ? { event: eventId } : undefined,
      skipAuth: true,
    });
  },

  /**
   * Get popular bundles for an event (public)
   */
  getPopular: async (
    eventId?: string,
    limit?: number
  ): Promise<BundlesListResponse> => {
    return api.get<BundlesListResponse>(`/bundles/popular`, {
      params: { event: eventId, limit },
      skipAuth: true,
    });
  },

  /**
   * Get bundle by ID (public)
   */
  getById: async (bundleId: string): Promise<ApiResponse<Bundle>> => {
    return api.get<ApiResponse<Bundle>>(`/bundles/${bundleId}`, {
      skipAuth: true,
    });
  },

  /**
   * Get bundles by price range (public)
   */
  getByPriceRange: async (
    minPrice: number,
    maxPrice: number,
    eventId?: string
  ): Promise<BundlesListResponse> => {
    return api.get<BundlesListResponse>(`/bundles/price-range`, {
      params: { min_price: minPrice, max_price: maxPrice, event: eventId },
      skipAuth: true,
    });
  },

  // ==================== Admin/Organiser Endpoints ====================

  /**
   * List all bundles
   */
  list: async (filters?: BundleFilters): Promise<BundlesListResponse> => {
    return api.get<BundlesListResponse>('/bundles', {
      params: {
        ...buildPaginationParams(filters),
        event: filters?.event,
        status: filters?.status,
        search: filters?.search,
        is_featured: filters?.is_featured,
        min_price: filters?.min_price,
        max_price: filters?.max_price,
      },
    });
  },

  /**
   * Create new bundle
   */
  create: async (bundleData: CreateBundleRequest): Promise<ApiResponse<Bundle>> => {
    return api.post<ApiResponse<Bundle>>('/bundles', bundleData);
  },

  /**
   * Update bundle
   */
  update: async (bundleId: string, data: UpdateBundleRequest): Promise<ApiResponse<Bundle>> => {
    return api.put<ApiResponse<Bundle>>(`/bundles/${bundleId}`, data);
  },

  /**
   * Delete bundle
   */
  delete: async (bundleId: string): Promise<ApiResponse<{ message: string }>> => {
    return api.delete<ApiResponse<{ message: string }>>(`/bundles/${bundleId}`);
  },

  /**
   * Upload bundle image
   */
  uploadImage: async (
    bundleId: string,
    file: File
  ): Promise<ApiResponse<{ image_url: string }>> => {
    return uploadFile<ApiResponse<{ image_url: string }>>(
      `/bundles/${bundleId}/image`,
      file,
      'image'
    );
  },

  /**
   * Delete bundle image
   */
  deleteImage: async (bundleId: string): Promise<ApiResponse<{ message: string }>> => {
    return api.delete<ApiResponse<{ message: string }>>(`/bundles/${bundleId}/image`);
  },

  /**
   * Get bundle statistics
   */
  getStats: async (bundleId: string): Promise<ApiResponse<BundleStatsResponse>> => {
    return api.get<ApiResponse<BundleStatsResponse>>(`/bundles/${bundleId}/stats`);
  },

  /**
   * Activate bundle
   */
  activate: async (bundleId: string): Promise<ApiResponse<Bundle>> => {
    return api.post<ApiResponse<Bundle>>(`/bundles/${bundleId}/activate`);
  },

  /**
   * Deactivate bundle
   */
  deactivate: async (bundleId: string): Promise<ApiResponse<Bundle>> => {
    return api.post<ApiResponse<Bundle>>(`/bundles/${bundleId}/deactivate`);
  },

  /**
   * Feature bundle
   */
  feature: async (bundleId: string): Promise<ApiResponse<Bundle>> => {
    return api.post<ApiResponse<Bundle>>(`/bundles/${bundleId}/feature`);
  },

  /**
   * Unfeature bundle
   */
  unfeature: async (bundleId: string): Promise<ApiResponse<Bundle>> => {
    return api.post<ApiResponse<Bundle>>(`/bundles/${bundleId}/unfeature`);
  },

  /**
   * Reorder bundles within an event
   */
  reorder: async (
    eventId: string,
    bundleIds: string[]
  ): Promise<ApiResponse<{ message: string }>> => {
    return api.post<ApiResponse<{ message: string }>>(
      `/events/${eventId}/bundles/reorder`,
      { bundle_ids: bundleIds }
    );
  },

  /**
   * Bulk update bundles
   */
  bulkUpdate: async (
    updates: Array<{ id: string; data: Partial<UpdateBundleRequest> }>
  ): Promise<ApiResponse<{ updated: number }>> => {
    return api.post<ApiResponse<{ updated: number }>>('/bundles/bulk-update', { updates });
  },

  /**
   * Bulk delete bundles
   */
  bulkDelete: async (bundleIds: string[]): Promise<ApiResponse<{ deleted: number }>> => {
    return api.post<ApiResponse<{ deleted: number }>>('/bundles/bulk-delete', {
      bundle_ids: bundleIds,
    });
  },

  /**
   * Duplicate bundle
   */
  duplicate: async (bundleId: string): Promise<ApiResponse<Bundle>> => {
    return api.post<ApiResponse<Bundle>>(`/bundles/${bundleId}/duplicate`);
  },

  /**
   * Update bundle stock
   */
  updateStock: async (
    bundleId: string,
    stock: number
  ): Promise<ApiResponse<Bundle>> => {
    return api.patch<ApiResponse<Bundle>>(`/bundles/${bundleId}/stock`, { stock });
  },

  /**
   * Apply discount to bundle
   */
  applyDiscount: async (
    bundleId: string,
    discount: {
      type: 'percentage' | 'fixed';
      value: number;
      expires_at?: string;
    }
  ): Promise<ApiResponse<Bundle>> => {
    return api.post<ApiResponse<Bundle>>(`/bundles/${bundleId}/discount`, discount);
  },

  /**
   * Remove discount from bundle
   */
  removeDiscount: async (bundleId: string): Promise<ApiResponse<Bundle>> => {
    return api.delete<ApiResponse<Bundle>>(`/bundles/${bundleId}/discount`);
  },
};

export default bundlesApi;
