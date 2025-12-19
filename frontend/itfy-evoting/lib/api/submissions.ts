/**
 * Submissions API Service
 * Form submission management endpoints
 */

import { api, buildPaginationParams, uploadFile, uploadFiles } from './client';
import type {
  Submission,
  ApiResponse,
  PaginationParams,
  PaginationMeta,
  SubmissionStatus,
} from '@/types';

// Submission list response with pagination
export interface SubmissionsListResponse {
  success: boolean;
  data: Submission[];
  pagination: PaginationMeta;
}

// Submission filters
export interface SubmissionFilters extends PaginationParams {
  form?: string;
  event?: string;
  status?: SubmissionStatus;
  search?: string;
  date_from?: string;
  date_to?: string;
  category?: string;
}

// Submit form data request
export interface SubmitFormRequest {
  form_id: string;
  data: Record<string, unknown>;
  files?: Record<string, File>;
}

// Submission review request
export interface ReviewSubmissionRequest {
  status: 'approved' | 'rejected';
  reviewer_notes?: string;
  rejection_reason?: string;
}

// Duplicate check response
export interface DuplicateCheckResponse {
  is_duplicate: boolean;
  existing_submissions: Array<{
    submission_id: string;
    submitted_at: string;
    status: SubmissionStatus;
    matching_fields: string[];
  }>;
}

/**
 * Submissions API endpoints
 */
export const submissionsApi = {
  // ==================== Public Endpoints ====================

  /**
   * Submit a form (public)
   */
  submit: async (
    formId: string,
    data: Record<string, unknown>
  ): Promise<ApiResponse<Submission>> => {
    return api.post<ApiResponse<Submission>>(
      `/forms/${formId}/submit`,
      { data },
      { skipAuth: true }
    );
  },

  /**
   * Submit form with file uploads
   */
  submitWithFiles: async (
    formId: string,
    data: Record<string, unknown>,
    files: Record<string, File>
  ): Promise<ApiResponse<Submission>> => {
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    
    Object.entries(files).forEach(([fieldName, file]) => {
      formData.append(fieldName, file);
    });

    return api.post<ApiResponse<Submission>>(
      `/forms/${formId}/submit`,
      formData,
      { skipAuth: true }
    );
  },

  /**
   * Check submission status (public - with reference)
   */
  checkStatus: async (
    reference: string
  ): Promise<ApiResponse<{
    reference: string;
    status: SubmissionStatus;
    submitted_at: string;
    reviewed_at?: string;
    message?: string;
  }>> => {
    return api.get<ApiResponse<{
      reference: string;
      status: SubmissionStatus;
      submitted_at: string;
      reviewed_at?: string;
      message?: string;
    }>>(`/submissions/status/${reference}`, { skipAuth: true });
  },

  /**
   * Check for duplicate submission (public)
   */
  checkDuplicate: async (
    formId: string,
    data: Record<string, unknown>
  ): Promise<ApiResponse<DuplicateCheckResponse>> => {
    return api.post<ApiResponse<DuplicateCheckResponse>>(
      `/forms/${formId}/check-duplicate`,
      { data },
      { skipAuth: true }
    );
  },

  // ==================== Admin/Organiser Endpoints ====================

  /**
   * List all submissions
   */
  list: async (filters?: SubmissionFilters): Promise<SubmissionsListResponse> => {
    return api.get<SubmissionsListResponse>('/submissions', {
      params: {
        ...buildPaginationParams(filters),
        form: filters?.form,
        event: filters?.event,
        status: filters?.status,
        search: filters?.search,
        date_from: filters?.date_from,
        date_to: filters?.date_to,
        category: filters?.category,
      },
    });
  },

  /**
   * Get submission by ID
   */
  getById: async (submissionId: string): Promise<ApiResponse<Submission>> => {
    return api.get<ApiResponse<Submission>>(`/submissions/${submissionId}`);
  },

  /**
   * Get submissions for a form
   */
  getByForm: async (
    formId: string,
    params?: SubmissionFilters
  ): Promise<SubmissionsListResponse> => {
    return api.get<SubmissionsListResponse>(`/forms/${formId}/submissions`, {
      params: {
        ...buildPaginationParams(params),
        status: params?.status,
        search: params?.search,
        date_from: params?.date_from,
        date_to: params?.date_to,
      },
    });
  },

  /**
   * Get submissions for an event
   */
  getByEvent: async (
    eventId: string,
    params?: SubmissionFilters
  ): Promise<SubmissionsListResponse> => {
    return api.get<SubmissionsListResponse>(`/events/${eventId}/submissions`, {
      params: {
        ...buildPaginationParams(params),
        form: params?.form,
        status: params?.status,
        search: params?.search,
        category: params?.category,
      },
    });
  },

  /**
   * Review (approve/reject) submission
   */
  review: async (
    submissionId: string,
    review: ReviewSubmissionRequest
  ): Promise<ApiResponse<Submission>> => {
    return api.post<ApiResponse<Submission>>(
      `/submissions/${submissionId}/review`,
      review
    );
  },

  /**
   * Approve submission
   */
  approve: async (
    submissionId: string,
    notes?: string
  ): Promise<ApiResponse<Submission>> => {
    return api.post<ApiResponse<Submission>>(`/submissions/${submissionId}/approve`, {
      reviewer_notes: notes,
    });
  },

  /**
   * Reject submission
   */
  reject: async (
    submissionId: string,
    reason: string,
    notes?: string
  ): Promise<ApiResponse<Submission>> => {
    return api.post<ApiResponse<Submission>>(`/submissions/${submissionId}/reject`, {
      rejection_reason: reason,
      reviewer_notes: notes,
    });
  },

  /**
   * Request update from submitter
   */
  requestUpdate: async (
    submissionId: string,
    message: string,
    fields?: string[]
  ): Promise<ApiResponse<Submission>> => {
    return api.post<ApiResponse<Submission>>(
      `/submissions/${submissionId}/request-update`,
      { message, fields }
    );
  },

  /**
   * Delete submission
   */
  delete: async (submissionId: string): Promise<ApiResponse<{ message: string }>> => {
    return api.delete<ApiResponse<{ message: string }>>(`/submissions/${submissionId}`);
  },

  /**
   * Bulk approve submissions
   */
  bulkApprove: async (
    submissionIds: string[]
  ): Promise<ApiResponse<{ approved: number }>> => {
    return api.post<ApiResponse<{ approved: number }>>('/submissions/bulk-approve', {
      submission_ids: submissionIds,
    });
  },

  /**
   * Bulk reject submissions
   */
  bulkReject: async (
    submissionIds: string[],
    reason: string
  ): Promise<ApiResponse<{ rejected: number }>> => {
    return api.post<ApiResponse<{ rejected: number }>>('/submissions/bulk-reject', {
      submission_ids: submissionIds,
      rejection_reason: reason,
    });
  },

  /**
   * Bulk delete submissions
   */
  bulkDelete: async (
    submissionIds: string[]
  ): Promise<ApiResponse<{ deleted: number }>> => {
    return api.post<ApiResponse<{ deleted: number }>>('/submissions/bulk-delete', {
      submission_ids: submissionIds,
    });
  },

  /**
   * Convert submission to candidate
   */
  convertToCandidate: async (
    submissionId: string,
    categoryId: string,
    additionalData?: {
      code?: string;
      name_override?: string;
    }
  ): Promise<ApiResponse<{ submission: Submission; candidate: unknown }>> => {
    return api.post<ApiResponse<{ submission: Submission; candidate: unknown }>>(
      `/submissions/${submissionId}/convert-to-candidate`,
      { category_id: categoryId, ...additionalData }
    );
  },

  /**
   * Get submission files
   */
  getFiles: async (
    submissionId: string
  ): Promise<ApiResponse<Array<{
    field_name: string;
    file_name: string;
    file_url: string;
    file_type: string;
    file_size: number;
  }>>> => {
    return api.get<ApiResponse<Array<{
      field_name: string;
      file_name: string;
      file_url: string;
      file_type: string;
      file_size: number;
    }>>>(`/submissions/${submissionId}/files`);
  },

  /**
   * Download submission file
   */
  downloadFile: async (
    submissionId: string,
    fieldName: string
  ): Promise<Blob> => {
    return api.get<Blob>(`/submissions/${submissionId}/files/${fieldName}`, {
      headers: { Accept: 'application/octet-stream' },
    });
  },

  /**
   * Export submissions
   */
  export: async (params: {
    form_id?: string;
    event_id?: string;
    status?: SubmissionStatus;
    format?: 'csv' | 'xlsx';
    date_from?: string;
    date_to?: string;
  }): Promise<Blob> => {
    return api.get<Blob>('/submissions/export', {
      params,
      headers: { Accept: 'application/octet-stream' },
    });
  },
};

export default submissionsApi;
