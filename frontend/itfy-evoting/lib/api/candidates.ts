/**
 * Candidates API Service
 * Candidate management endpoints
 */

import { api, buildPaginationParams, uploadFile, uploadFiles } from './client';
import type {
  Candidate,
  ApiResponse,
  PaginationParams,
  PaginationMeta,
  CreateCandidateRequest,
  UpdateCandidateRequest,
  CandidateStatus,
} from '@/types';

// Candidate list response with pagination
export interface CandidatesListResponse {
  success: boolean;
  data: Candidate[];
  pagination: PaginationMeta;
}

// Candidate filters
export interface CandidateFilters extends PaginationParams {
  event?: string;
  category?: string;
  status?: CandidateStatus;
  search?: string;
  code?: string;
}

// Candidate stats response
export interface CandidateStatsResponse {
  total_votes: number;
  rank: number;
  percentage: number;
  votes_over_time: Array<{
    date: string;
    count: number;
  }>;
}

// Candidate with vote count
export interface CandidateWithVotes extends Candidate {
  vote_count: number;
  rank?: number;
  percentage?: number;
}

/**
 * Candidates API endpoints
 */
export const candidatesApi = {
  // ==================== Public Endpoints ====================

  /**
   * Get candidates for an event (public)
   */
  getByEvent: async (
    eventId: string,
    params?: PaginationParams & { category?: string }
  ): Promise<CandidatesListResponse> => {
    return api.get<CandidatesListResponse>(`/events/${eventId}/candidates`, {
      params: {
        ...buildPaginationParams(params),
        category: params?.category,
      },
      skipAuth: true,
    });
  },

  /**
   * Get candidates for a category (public)
   */
  getByCategory: async (
    categoryId: string,
    params?: PaginationParams
  ): Promise<CandidatesListResponse> => {
    return api.get<CandidatesListResponse>(`/categories/${categoryId}/candidates`, {
      params: buildPaginationParams(params),
      skipAuth: true,
    });
  },

  /**
   * Get candidate by ID (public)
   */
  getById: async (candidateId: string): Promise<ApiResponse<Candidate>> => {
    return api.get<ApiResponse<Candidate>>(`/candidates/${candidateId}`, {
      skipAuth: true,
    });
  },

  /**
   * Get candidate by code (public)
   */
  getByCode: async (eventId: string, code: string): Promise<ApiResponse<Candidate>> => {
    return api.get<ApiResponse<Candidate>>(`/events/${eventId}/candidates/code/${code}`, {
      skipAuth: true,
    });
  },

  // ==================== Admin/Organiser Endpoints ====================

  /**
   * List all candidates
   */
  list: async (filters?: CandidateFilters): Promise<CandidatesListResponse> => {
    return api.get<CandidatesListResponse>('/candidates', {
      params: {
        ...buildPaginationParams(filters),
        event: filters?.event,
        category: filters?.category,
        status: filters?.status,
        search: filters?.search,
        code: filters?.code,
      },
    });
  },

  /**
   * Create new candidate
   */
  create: async (candidateData: CreateCandidateRequest): Promise<ApiResponse<Candidate>> => {
    return api.post<ApiResponse<Candidate>>('/candidates', candidateData);
  },

  /**
   * Update candidate
   */
  update: async (
    candidateId: string,
    data: UpdateCandidateRequest
  ): Promise<ApiResponse<Candidate>> => {
    return api.put<ApiResponse<Candidate>>(`/candidates/${candidateId}`, data);
  },

  /**
   * Delete candidate
   */
  delete: async (candidateId: string): Promise<ApiResponse<{ message: string }>> => {
    return api.delete<ApiResponse<{ message: string }>>(`/candidates/${candidateId}`);
  },

  /**
   * Upload candidate image
   */
  uploadImage: async (
    candidateId: string,
    file: File
  ): Promise<ApiResponse<{ image_url: string }>> => {
    return uploadFile<ApiResponse<{ image_url: string }>>(
      `/candidates/${candidateId}/image`,
      file,
      'image'
    );
  },

  /**
   * Delete candidate image
   */
  deleteImage: async (candidateId: string): Promise<ApiResponse<{ message: string }>> => {
    return api.delete<ApiResponse<{ message: string }>>(`/candidates/${candidateId}/image`);
  },

  /**
   * Upload candidate gallery images
   */
  uploadGallery: async (
    candidateId: string,
    files: File[]
  ): Promise<ApiResponse<{ gallery: string[] }>> => {
    return uploadFiles<ApiResponse<{ gallery: string[] }>>(
      `/candidates/${candidateId}/gallery`,
      files,
      'images'
    );
  },

  /**
   * Delete gallery image
   */
  deleteGalleryImage: async (
    candidateId: string,
    imageUrl: string
  ): Promise<ApiResponse<{ message: string }>> => {
    return api.delete<ApiResponse<{ message: string }>>(
      `/candidates/${candidateId}/gallery`,
      { params: { image_url: imageUrl } }
    );
  },

  /**
   * Get candidate statistics
   */
  getStats: async (candidateId: string): Promise<ApiResponse<CandidateStatsResponse>> => {
    return api.get<ApiResponse<CandidateStatsResponse>>(`/candidates/${candidateId}/stats`);
  },

  /**
   * Approve candidate
   */
  approve: async (candidateId: string): Promise<ApiResponse<Candidate>> => {
    return api.post<ApiResponse<Candidate>>(`/candidates/${candidateId}/approve`);
  },

  /**
   * Reject candidate
   */
  reject: async (
    candidateId: string,
    reason?: string
  ): Promise<ApiResponse<Candidate>> => {
    return api.post<ApiResponse<Candidate>>(`/candidates/${candidateId}/reject`, { reason });
  },

  /**
   * Bulk approve candidates
   */
  bulkApprove: async (candidateIds: string[]): Promise<ApiResponse<{ approved: number }>> => {
    return api.post<ApiResponse<{ approved: number }>>('/candidates/bulk-approve', {
      candidate_ids: candidateIds,
    });
  },

  /**
   * Bulk reject candidates
   */
  bulkReject: async (
    candidateIds: string[],
    reason?: string
  ): Promise<ApiResponse<{ rejected: number }>> => {
    return api.post<ApiResponse<{ rejected: number }>>('/candidates/bulk-reject', {
      candidate_ids: candidateIds,
      reason,
    });
  },

  /**
   * Bulk delete candidates
   */
  bulkDelete: async (candidateIds: string[]): Promise<ApiResponse<{ deleted: number }>> => {
    return api.post<ApiResponse<{ deleted: number }>>('/candidates/bulk-delete', {
      candidate_ids: candidateIds,
    });
  },

  /**
   * Assign candidate to category
   */
  assignToCategory: async (
    candidateId: string,
    categoryId: string
  ): Promise<ApiResponse<Candidate>> => {
    return api.post<ApiResponse<Candidate>>(`/candidates/${candidateId}/assign-category`, {
      category_id: categoryId,
    });
  },

  /**
   * Remove candidate from category
   */
  removeFromCategory: async (
    candidateId: string,
    categoryId: string
  ): Promise<ApiResponse<Candidate>> => {
    return api.post<ApiResponse<Candidate>>(`/candidates/${candidateId}/remove-category`, {
      category_id: categoryId,
    });
  },

  /**
   * Generate unique candidate code
   */
  generateCode: async (eventId: string): Promise<ApiResponse<{ code: string }>> => {
    return api.get<ApiResponse<{ code: string }>>(`/events/${eventId}/candidates/generate-code`);
  },

  /**
   * Check if code is available
   */
  checkCodeAvailability: async (
    eventId: string,
    code: string
  ): Promise<ApiResponse<{ available: boolean }>> => {
    return api.get<ApiResponse<{ available: boolean }>>(
      `/events/${eventId}/candidates/check-code/${code}`
    );
  },

  // ==================== Candidate Portal (Candidate Auth) ====================

  /**
   * Get candidate profile (for authenticated candidate)
   */
  getMyProfile: async (): Promise<ApiResponse<Candidate>> => {
    return api.get<ApiResponse<Candidate>>('/candidates/profile', {
      authType: 'candidate',
    });
  },

  /**
   * Update candidate profile (for authenticated candidate)
   */
  updateMyProfile: async (data: UpdateCandidateRequest): Promise<ApiResponse<Candidate>> => {
    return api.put<ApiResponse<Candidate>>('/candidates/profile', data, {
      authType: 'candidate',
    });
  },

  /**
   * Upload candidate's own image
   */
  uploadMyImage: async (file: File): Promise<ApiResponse<{ image_url: string }>> => {
    return uploadFile<ApiResponse<{ image_url: string }>>(
      '/candidates/profile/image',
      file,
      'image',
      undefined,
      { authType: 'candidate' }
    );
  },

  /**
   * Get candidate's own statistics
   * Note: Falls back to vote count if detailed stats aren't available
   */
  getMyStats: async (): Promise<ApiResponse<CandidateStatsResponse>> => {
    return api.get<ApiResponse<CandidateStatsResponse>>('/candidates/profile/stats', {
      authType: 'candidate',
    });
  },
};

export default candidatesApi;
