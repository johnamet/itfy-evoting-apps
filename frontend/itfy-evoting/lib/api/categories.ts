/**
 * Categories API Service
 * Category management endpoints
 */

import { api, apiRequest, buildPaginationParams, uploadFile } from './client';
import type {
  Category,
  ApiResponse,
  PaginationParams,
  PaginationMeta,
  CreateCategoryRequest,
  UpdateCategoryRequest,
  CategoryStatus,
} from '@/types';

// Category list response with pagination
export interface CategoriesListResponse {
  success: boolean;
  data: Category[];
  pagination: PaginationMeta;
}

// Category filters
export interface CategoryFilters extends PaginationParams {
  event?: string;
  status?: CategoryStatus;
  search?: string;
  is_featured?: boolean;
}

// Category stats response
export interface CategoryStatsResponse {
  total_votes: number;
  total_candidates: number;
  top_candidates: Array<{
    candidate_id: string;
    candidate_name: string;
    vote_count: number;
    percentage: number;
  }>;
  votes_over_time: Array<{
    date: string;
    count: number;
  }>;
}

// Category results response
export interface CategoryResultsResponse {
  category: Category;
  results: Array<{
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
  last_updated: string;
}

/**
 * Categories API endpoints
 */
export const categoriesApi = {
  // ==================== Public Endpoints ====================

   /**
   * List all categories (public access)
   */
  listPublic: async (filters?: CategoryFilters): Promise<CategoriesListResponse> => {
    return api.get<CategoriesListResponse>('/categories/public', {
      params: {
        ...buildPaginationParams(filters),
        event: filters?.event,
        status: filters?.status,
        search: filters?.search,
        is_featured: filters?.is_featured,
      },
      skipAuth: true,
    });
  },

  /**
   * Get featured categories (public)
   */
  getFeatured: async (params?: PaginationParams): Promise<CategoriesListResponse> => {
    return api.get<CategoriesListResponse>('/categories/featured', {
      params: buildPaginationParams(params),
      skipAuth: true,
    });
  },

  /**
   * Get categories for an event (public)
   */
  getByEvent: async (
    eventId: string,
    params?: PaginationParams
  ): Promise<CategoriesListResponse> => {
    return api.get<CategoriesListResponse>(`/events/${eventId}/categories`, {
      params: buildPaginationParams(params),
      skipAuth: true,
    });
  },

  /**
   * Get category by ID (public)
   */
  getById: async (categoryId: string): Promise<ApiResponse<Category>> => {
    return api.get<ApiResponse<Category>>(`/categories/${categoryId}`, {
      skipAuth: true,
    });
  },

  /**
   * Get category by slug (public)
   */
  getBySlug: async (slug: string): Promise<ApiResponse<Category>> => {
    return api.get<ApiResponse<Category>>(`/categories/slug/${slug}`, {
      skipAuth: true,
    });
  },

  /**
   * Get public category results
   */
  getPublicResults: async (categoryId: string): Promise<ApiResponse<CategoryResultsResponse>> => {
    return api.get<ApiResponse<CategoryResultsResponse>>(
      `/categories/${categoryId}/results/public`,
      { skipAuth: true }
    );
  },

  // ==================== Admin/Organiser Endpoints ====================

  /**
   * List all categories (public access)
   */
  list: async (filters?: CategoryFilters): Promise<CategoriesListResponse> => {
    return api.get<CategoriesListResponse>('/categories', {
      params: {
        ...buildPaginationParams(filters),
        event: filters?.event,
        status: filters?.status,
        search: filters?.search,
        is_featured: filters?.is_featured,
      },
      skipAuth: true,
    });
  },

  /**
   * Create new category
   */
  create: async (categoryData: CreateCategoryRequest): Promise<ApiResponse<Category>> => {
    return api.post<ApiResponse<Category>>('/categories', categoryData);
  },

  /**
   * Update category
   */
  update: async (categoryId: string, data: UpdateCategoryRequest): Promise<ApiResponse<Category>> => {
    return api.put<ApiResponse<Category>>(`/categories/${categoryId}`, data);
  },

  /**
   * Delete category
   */
  delete: async (categoryId: string): Promise<ApiResponse<{ message: string }>> => {
    return api.delete<ApiResponse<{ message: string }>>(`/categories/${categoryId}`);
  },

  /**
   * Upload category image
   */
  uploadImage: async (
    categoryId: string,
    file: File
  ): Promise<ApiResponse<{ image_url: string }>> => {
    return uploadFile<ApiResponse<{ image_url: string }>>(
      `/categories/${categoryId}/image`,
      file,
      'image'
    );
  },

  /**
   * Delete category image
   */
  deleteImage: async (categoryId: string): Promise<ApiResponse<{ message: string }>> => {
    return api.delete<ApiResponse<{ message: string }>>(`/categories/${categoryId}/image`);
  },

  /**
   * Get category statistics
   */
  getStats: async (categoryId: string): Promise<ApiResponse<CategoryStatsResponse>> => {
    return api.get<ApiResponse<CategoryStatsResponse>>(`/categories/${categoryId}/stats`);
  },

  /**
   * Get category results (admin)
   */
  getResults: async (categoryId: string): Promise<ApiResponse<CategoryResultsResponse>> => {
    return api.get<ApiResponse<CategoryResultsResponse>>(`/categories/${categoryId}/results`);
  },

  /**
   * Reorder categories within an event
   */
  reorder: async (
    eventId: string,
    categoryIds: string[]
  ): Promise<ApiResponse<{ message: string }>> => {
    return api.post<ApiResponse<{ message: string }>>(
      `/events/${eventId}/categories/reorder`,
      { category_ids: categoryIds }
    );
  },

  /**
   * Bulk update categories
   */
  bulkUpdate: async (
    updates: Array<{ id: string; data: Partial<UpdateCategoryRequest> }>
  ): Promise<ApiResponse<{ updated: number }>> => {
    return api.post<ApiResponse<{ updated: number }>>('/categories/bulk-update', { updates });
  },

  /**
   * Bulk delete categories
   */
  bulkDelete: async (categoryIds: string[]): Promise<ApiResponse<{ deleted: number }>> => {
    return api.post<ApiResponse<{ deleted: number }>>('/categories/bulk-delete', {
      category_ids: categoryIds,
    });
  },

  /**
   * Get candidates for a category
   */
  getCandidates: async (
    categoryId: string,
    params?: PaginationParams
  ): Promise<ApiResponse<{ candidates: unknown[]; pagination: PaginationMeta }>> => {
    return api.get<ApiResponse<{ candidates: unknown[]; pagination: PaginationMeta }>>(
      `/categories/${categoryId}/candidates`,
      { params: buildPaginationParams(params) }
    );
  },

  /**
   * Activate category
   */
  activate: async (categoryId: string): Promise<ApiResponse<Category>> => {
    return api.post<ApiResponse<Category>>(`/categories/${categoryId}/activate`);
  },

  /**
   * Deactivate category
   */
  deactivate: async (categoryId: string): Promise<ApiResponse<Category>> => {
    return api.post<ApiResponse<Category>>(`/categories/${categoryId}/deactivate`);
  },

  // ==================== Voting Lifecycle Endpoints ====================

  /**
   * Open voting for a category
   */
  openVoting: async (categoryId: string): Promise<ApiResponse<Category>> => {
    return api.put<ApiResponse<Category>>(`/categories/${categoryId}/voting/open`);
  },

  /**
   * Close voting for a category
   */
  closeVoting: async (categoryId: string): Promise<ApiResponse<Category>> => {
    return api.put<ApiResponse<Category>>(`/categories/${categoryId}/voting/close`);
  },

  /**
   * Update voting deadline
   */
  updateDeadline: async (
    categoryId: string,
    deadline: string
  ): Promise<ApiResponse<Category>> => {
    return api.put<ApiResponse<Category>>(`/categories/${categoryId}/voting/deadline`, {
      voting_deadline: deadline,
    });
  },

  /**
   * Extend voting deadline
   */
  extendDeadline: async (
    categoryId: string,
    hours: number
  ): Promise<ApiResponse<Category>> => {
    return api.put<ApiResponse<Category>>(`/categories/${categoryId}/voting/extend`, {
      hours,
    });
  },

  // ==================== Candidate Management Endpoints ====================

  /**
   * Add candidates to category
   */
  addCandidates: async (
    categoryId: string,
    candidateIds: string[]
  ): Promise<ApiResponse<Category>> => {
    return api.post<ApiResponse<Category>>(`/categories/${categoryId}/candidates`, {
      candidateIds,
    });
  },

  /**
   * Remove candidates from category
   */
  removeCandidates: async (
    categoryId: string,
    candidateIds: string[]
  ): Promise<ApiResponse<Category>> => {
    return apiRequest<ApiResponse<Category>>(`/categories/${categoryId}/candidates`, {
      method: 'DELETE',
      body: { candidateIds },
    });
  },

  // ==================== Featured & Order Endpoints ====================

  /**
   * Toggle featured status
   */
  toggleFeatured: async (categoryId: string): Promise<ApiResponse<Category>> => {
    return api.put<ApiResponse<Category>>(`/categories/${categoryId}/featured`);
  },

  /**
   * Update display order
   */
  updateOrder: async (
    categoryId: string,
    displayOrder: number
  ): Promise<ApiResponse<Category>> => {
    return api.put<ApiResponse<Category>>(`/categories/${categoryId}/order`, {
      display_order: displayOrder,
    });
  },

  // ==================== Results Endpoints ====================

  /**
   * Publish category results
   */
  publishResults: async (categoryId: string): Promise<ApiResponse<Category>> => {
    return api.put<ApiResponse<Category>>(`/categories/${categoryId}/results/publish`);
  },

  /**
   * Get vote counts by candidate
   */
  getVoteCounts: async (
    categoryId: string
  ): Promise<ApiResponse<{ voteCounts: Array<{ candidate: string; candidateName: string; voteCount: number }> }>> => {
    return api.get<ApiResponse<{ voteCounts: Array<{ candidate: string; candidateName: string; voteCount: number }> }>>(
      `/categories/${categoryId}/vote-counts`
    );
  },
};

export default categoriesApi;
