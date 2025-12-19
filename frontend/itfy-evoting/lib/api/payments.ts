/**
 * Payments API Service
 * Payment processing and vote code management endpoints
 */

import { api, buildPaginationParams } from './client';
import type {
  Payment,
  ApiResponse,
  PaginationParams,
  PaginationMeta,
  InitializePaymentRequest,
  PaymentStatus,
  VoteCode,
} from '@/types';

// Payment list response with pagination
export interface PaymentsListResponse {
  success: boolean;
  data: Payment[];
  pagination: PaginationMeta;
}

// Vote code list response with pagination
export interface VoteCodesListResponse {
  success: boolean;
  data: VoteCode[];
  pagination: PaginationMeta;
}

// Payment filters
export interface PaymentFilters extends PaginationParams {
  event?: string;
  status?: PaymentStatus;
  payment_method?: string;
  date_from?: string;
  date_to?: string;
  search?: string;
}

// Vote code filters
export interface VoteCodeFilters extends PaginationParams {
  event?: string;
  payment?: string;
  is_used?: boolean;
  has_balance?: boolean;
  search?: string;
}

// Initialize payment response
export interface InitializePaymentResponse {
  payment_id: string;
  reference: string;
  authorization_url: string;
  access_code?: string;
}

// Verify payment response
export interface VerifyPaymentResponse {
  payment: Payment;
  vote_codes: VoteCode[];
  message: string;
}

// Payment stats response
export interface PaymentStatsResponse {
  total_payments: number;
  total_revenue: number;
  successful_payments: number;
  failed_payments: number;
  pending_payments: number;
  revenue_by_day: Array<{
    date: string;
    amount: number;
    count: number;
  }>;
  revenue_by_method: Array<{
    method: string;
    amount: number;
    count: number;
  }>;
  average_order_value: number;
}

/**
 * Payments API endpoints
 */
export const paymentsApi = {
  // ==================== Public Payment Endpoints ====================

  /**
   * Initialize a new payment
   */
  initialize: async (
    paymentData: InitializePaymentRequest
  ): Promise<ApiResponse<InitializePaymentResponse>> => {
    return api.post<ApiResponse<InitializePaymentResponse>>(
      '/payments/initialize',
      paymentData,
      { skipAuth: true }
    );
  },

  /**
   * Verify payment status
   */
  verify: async (reference: string): Promise<ApiResponse<VerifyPaymentResponse>> => {
    return api.get<ApiResponse<VerifyPaymentResponse>>(
      `/payments/verify/${reference}`,
      { skipAuth: true }
    );
  },

  /**
   * Get payment by reference (public - for receipt)
   */
  getByReference: async (reference: string): Promise<ApiResponse<Payment>> => {
    return api.get<ApiResponse<Payment>>(`/payments/reference/${reference}`, {
      skipAuth: true,
    });
  },

  /**
   * Resend vote codes via email
   */
  resendVoteCodes: async (
    reference: string,
    email?: string
  ): Promise<ApiResponse<{ message: string }>> => {
    return api.post<ApiResponse<{ message: string }>>(
      `/payments/${reference}/resend-codes`,
      { email },
      { skipAuth: true }
    );
  },

  // ==================== Admin/Organiser Endpoints ====================

  /**
   * List all payments
   */
  list: async (filters?: PaymentFilters): Promise<PaymentsListResponse> => {
    return api.get<PaymentsListResponse>('/payments', {
      params: {
        ...buildPaginationParams(filters),
        event: filters?.event,
        status: filters?.status,
        payment_method: filters?.payment_method,
        date_from: filters?.date_from,
        date_to: filters?.date_to,
        search: filters?.search,
      },
    });
  },

  /**
   * Get payment by ID
   */
  getById: async (paymentId: string): Promise<ApiResponse<Payment>> => {
    return api.get<ApiResponse<Payment>>(`/payments/${paymentId}`);
  },

  /**
   * Get payments by event
   */
  getByEvent: async (
    eventId: string,
    params?: PaginationParams
  ): Promise<PaymentsListResponse> => {
    return api.get<PaymentsListResponse>(`/payments/event/${eventId}`, {
      params: buildPaginationParams(params),
    });
  },

  /**
   * Get payment statistics
   */
  getStats: async (params?: {
    event_id?: string;
    date_from?: string;
    date_to?: string;
  }): Promise<ApiResponse<PaymentStatsResponse>> => {
    return api.get<ApiResponse<PaymentStatsResponse>>('/payments/stats', {
      params,
    });
  },

  /**
   * Get event revenue summary
   */
  getRevenue: async (eventId: string): Promise<ApiResponse<{
    total_revenue: number;
    total_payments: number;
    by_bundle: Array<{
      bundle_id: string;
      bundle_name: string;
      quantity: number;
      revenue: number;
    }>;
    by_day: Array<{
      date: string;
      revenue: number;
    }>;
  }>> => {
    return api.get<ApiResponse<{
      total_revenue: number;
      total_payments: number;
      by_bundle: Array<{
        bundle_id: string;
        bundle_name: string;
        quantity: number;
        revenue: number;
      }>;
      by_day: Array<{
        date: string;
        revenue: number;
      }>;
    }>>(`/payments/event/${eventId}/revenue`);
  },

  /**
   * Refund payment
   */
  refund: async (
    paymentId: string,
    reason?: string
  ): Promise<ApiResponse<Payment>> => {
    return api.post<ApiResponse<Payment>>(`/payments/${paymentId}/refund`, { reason });
  },

  /**
   * Mark payment as failed (admin)
   */
  markFailed: async (
    paymentId: string,
    reason?: string
  ): Promise<ApiResponse<Payment>> => {
    return api.post<ApiResponse<Payment>>(`/payments/${paymentId}/mark-failed`, { reason });
  },

  /**
   * Export payments data
   */
  export: async (params: {
    event_id?: string;
    format?: 'csv' | 'xlsx';
    date_from?: string;
    date_to?: string;
  }): Promise<Blob> => {
    return api.get<Blob>('/payments/export', {
      params,
      headers: { Accept: 'application/octet-stream' },
    });
  },

  // ==================== Vote Codes Endpoints ====================

  /**
   * List vote codes
   */
  listVoteCodes: async (filters?: VoteCodeFilters): Promise<VoteCodesListResponse> => {
    return api.get<VoteCodesListResponse>('/vote-codes', {
      params: {
        ...buildPaginationParams(filters),
        event: filters?.event,
        payment: filters?.payment,
        is_used: filters?.is_used,
        has_balance: filters?.has_balance,
        search: filters?.search,
      },
    });
  },

  /**
   * Get vote code by code
   */
  getVoteCode: async (code: string): Promise<ApiResponse<VoteCode>> => {
    return api.get<ApiResponse<VoteCode>>(`/vote-codes/${code}`);
  },

  /**
   * Get vote codes for a payment
   */
  getVoteCodesByPayment: async (
    paymentId: string
  ): Promise<ApiResponse<VoteCode[]>> => {
    return api.get<ApiResponse<VoteCode[]>>(`/vote-codes/payment/${paymentId}`);
  },

  /**
   * Get vote codes for an event
   */
  getVoteCodesByEvent: async (
    eventId: string,
    params?: VoteCodeFilters
  ): Promise<VoteCodesListResponse> => {
    return api.get<VoteCodesListResponse>(`/vote-codes/event/${eventId}`, {
      params: {
        ...buildPaginationParams(params),
        is_used: params?.is_used,
        has_balance: params?.has_balance,
      },
    });
  },

  /**
   * Generate free vote codes (admin)
   */
  generateFreeCodes: async (data: {
    event_id: string;
    quantity: number;
    votes_per_code: number;
    expires_at?: string;
    note?: string;
  }): Promise<ApiResponse<VoteCode[]>> => {
    return api.post<ApiResponse<VoteCode[]>>('/vote-codes/generate', data);
  },

  /**
   * Deactivate vote code
   */
  deactivateVoteCode: async (
    code: string,
    reason?: string
  ): Promise<ApiResponse<VoteCode>> => {
    return api.post<ApiResponse<VoteCode>>(`/vote-codes/${code}/deactivate`, { reason });
  },

  /**
   * Reactivate vote code
   */
  reactivateVoteCode: async (code: string): Promise<ApiResponse<VoteCode>> => {
    return api.post<ApiResponse<VoteCode>>(`/vote-codes/${code}/reactivate`);
  },

  /**
   * Transfer vote code balance
   */
  transferBalance: async (data: {
    from_code: string;
    to_code: string;
    amount: number;
  }): Promise<ApiResponse<{ from: VoteCode; to: VoteCode }>> => {
    return api.post<ApiResponse<{ from: VoteCode; to: VoteCode }>>(
      '/vote-codes/transfer',
      data
    );
  },

  /**
   * Get vote code usage history
   */
  getVoteCodeHistory: async (
    code: string,
    params?: PaginationParams
  ): Promise<ApiResponse<{
    code: VoteCode;
    votes: Array<{
      vote_id: string;
      category_name: string;
      candidate_name: string;
      quantity: number;
      created_at: string;
    }>;
    pagination: PaginationMeta;
  }>> => {
    return api.get<ApiResponse<{
      code: VoteCode;
      votes: Array<{
        vote_id: string;
        category_name: string;
        candidate_name: string;
        quantity: number;
        created_at: string;
      }>;
      pagination: PaginationMeta;
    }>>(`/vote-codes/${code}/history`, {
      params: buildPaginationParams(params),
    });
  },
};

export default paymentsApi;
