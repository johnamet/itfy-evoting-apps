/**
 * Coupons API Service
 * Discount coupon management endpoints
 */

import { api, buildPaginationParams } from './client';
import type {
  Coupon,
  ApiResponse,
  PaginationParams,
  PaginationMeta,
  CreateCouponRequest,
  UpdateCouponRequest,
  CouponStatus,
} from '@/types';

// Coupon list response with pagination
export interface CouponsListResponse {
  success: boolean;
  data: Coupon[];
  pagination: PaginationMeta;
}

// Coupon filters
export interface CouponFilters extends PaginationParams {
  event?: string;
  status?: CouponStatus;
  search?: string;
  discount_type?: 'percentage' | 'fixed';
  is_expired?: boolean;
}

// Validate coupon response
export interface ValidateCouponResponse {
  valid: boolean;
  coupon?: Coupon;
  discount_amount?: number;
  message?: string;
}

// Apply coupon response
export interface ApplyCouponResponse {
  original_amount: number;
  discount_amount: number;
  final_amount: number;
  coupon: Coupon;
}

// Coupon stats response
export interface CouponStatsResponse {
  total_uses: number;
  total_discount_given: number;
  unique_users: number;
  usage_by_day: Array<{
    date: string;
    count: number;
    discount: number;
  }>;
  top_bundles: Array<{
    bundle_id: string;
    bundle_name: string;
    use_count: number;
  }>;
}

/**
 * Coupons API endpoints
 */
export const couponsApi = {
  // ==================== Public Endpoints ====================

  /**
   * Validate a coupon code
   */
  validate: async (
    code: string,
    eventId: string,
    bundleId?: string,
    amount?: number
  ): Promise<ApiResponse<ValidateCouponResponse>> => {
    return api.post<ApiResponse<ValidateCouponResponse>>(
      '/coupons/validate',
      {
        code,
        event_id: eventId,
        bundle_id: bundleId,
        amount,
      },
      { skipAuth: true }
    );
  },

  /**
   * Apply coupon to calculate discount
   */
  apply: async (
    code: string,
    eventId: string,
    amount: number,
    bundleId?: string
  ): Promise<ApiResponse<ApplyCouponResponse>> => {
    return api.post<ApiResponse<ApplyCouponResponse>>(
      '/coupons/apply',
      {
        code,
        event_id: eventId,
        amount,
        bundle_id: bundleId,
      },
      { skipAuth: true }
    );
  },

  // ==================== Admin/Organiser Endpoints ====================

  /**
   * List all coupons
   */
  list: async (filters?: CouponFilters): Promise<CouponsListResponse> => {
    return api.get<CouponsListResponse>('/coupons', {
      params: {
        ...buildPaginationParams(filters),
        event: filters?.event,
        status: filters?.status,
        search: filters?.search,
        discount_type: filters?.discount_type,
        is_expired: filters?.is_expired,
      },
    });
  },

  /**
   * Get coupon by ID
   */
  getById: async (couponId: string): Promise<ApiResponse<Coupon>> => {
    return api.get<ApiResponse<Coupon>>(`/coupons/${couponId}`);
  },

  /**
   * Get coupon by code (admin)
   */
  getByCode: async (code: string): Promise<ApiResponse<Coupon>> => {
    return api.get<ApiResponse<Coupon>>(`/coupons/code/${code}`);
  },

  /**
   * Get coupons for an event
   */
  getByEvent: async (
    eventId: string,
    params?: CouponFilters
  ): Promise<CouponsListResponse> => {
    return api.get<CouponsListResponse>(`/events/${eventId}/coupons`, {
      params: {
        ...buildPaginationParams(params),
        status: params?.status,
        discount_type: params?.discount_type,
        is_expired: params?.is_expired,
      },
    });
  },

  /**
   * Create new coupon
   */
  create: async (couponData: CreateCouponRequest): Promise<ApiResponse<Coupon>> => {
    return api.post<ApiResponse<Coupon>>('/coupons', couponData);
  },

  /**
   * Update coupon
   */
  update: async (
    couponId: string,
    data: UpdateCouponRequest
  ): Promise<ApiResponse<Coupon>> => {
    return api.put<ApiResponse<Coupon>>(`/coupons/${couponId}`, data);
  },

  /**
   * Delete coupon
   */
  delete: async (couponId: string): Promise<ApiResponse<{ message: string }>> => {
    return api.delete<ApiResponse<{ message: string }>>(`/coupons/${couponId}`);
  },

  /**
   * Get coupon statistics
   */
  getStats: async (couponId: string): Promise<ApiResponse<CouponStatsResponse>> => {
    return api.get<ApiResponse<CouponStatsResponse>>(`/coupons/${couponId}/stats`);
  },

  /**
   * Activate coupon
   */
  activate: async (couponId: string): Promise<ApiResponse<Coupon>> => {
    return api.post<ApiResponse<Coupon>>(`/coupons/${couponId}/activate`);
  },

  /**
   * Deactivate coupon
   */
  deactivate: async (couponId: string): Promise<ApiResponse<Coupon>> => {
    return api.post<ApiResponse<Coupon>>(`/coupons/${couponId}/deactivate`);
  },

  /**
   * Bulk create coupons
   */
  bulkCreate: async (data: {
    event_id: string;
    prefix?: string;
    quantity: number;
    discount_type: 'percentage' | 'fixed';
    discount_value: number;
    max_uses?: number;
    expires_at?: string;
    applicable_bundles?: string[];
    min_purchase_amount?: number;
  }): Promise<ApiResponse<Coupon[]>> => {
    return api.post<ApiResponse<Coupon[]>>('/coupons/bulk-create', data);
  },

  /**
   * Bulk delete coupons
   */
  bulkDelete: async (couponIds: string[]): Promise<ApiResponse<{ deleted: number }>> => {
    return api.post<ApiResponse<{ deleted: number }>>('/coupons/bulk-delete', {
      coupon_ids: couponIds,
    });
  },

  /**
   * Generate unique coupon code
   */
  generateCode: async (prefix?: string): Promise<ApiResponse<{ code: string }>> => {
    return api.get<ApiResponse<{ code: string }>>('/coupons/generate-code', {
      params: { prefix },
    });
  },

  /**
   * Check if code is available
   */
  checkCodeAvailability: async (
    code: string
  ): Promise<ApiResponse<{ available: boolean }>> => {
    return api.get<ApiResponse<{ available: boolean }>>(`/coupons/check-code/${code}`);
  },

  /**
   * Get coupon usage history
   */
  getUsageHistory: async (
    couponId: string,
    params?: PaginationParams
  ): Promise<ApiResponse<{
    coupon: Coupon;
    usages: Array<{
      payment_id: string;
      payment_reference: string;
      amount: number;
      discount_applied: number;
      used_at: string;
    }>;
    pagination: PaginationMeta;
  }>> => {
    return api.get<ApiResponse<{
      coupon: Coupon;
      usages: Array<{
        payment_id: string;
        payment_reference: string;
        amount: number;
        discount_applied: number;
        used_at: string;
      }>;
      pagination: PaginationMeta;
    }>>(`/coupons/${couponId}/usage-history`, {
      params: buildPaginationParams(params),
    });
  },

  /**
   * Export coupons
   */
  export: async (params: {
    event_id?: string;
    status?: CouponStatus;
    format?: 'csv' | 'xlsx';
  }): Promise<Blob> => {
    return api.get<Blob>('/coupons/export', {
      params,
      headers: { Accept: 'application/octet-stream' },
    });
  },
};

export default couponsApi;
