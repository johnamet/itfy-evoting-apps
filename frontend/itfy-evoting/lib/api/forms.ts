/**
 * Forms API Service
 * Registration/nomination form management endpoints
 */

import { api, buildPaginationParams } from './client';
import type {
  Form,
  ApiResponse,
  PaginationParams,
  PaginationMeta,
  CreateFormRequest,
  UpdateFormRequest,
  FormStatus,
} from '@/types';

// Form list response with pagination
export interface FormsListResponse {
  success: boolean;
  data: Form[];
  pagination: PaginationMeta;
}

// Form filters
export interface FormFilters extends PaginationParams {
  event?: string;
  status?: FormStatus;
  form_type?: 'registration' | 'nomination' | 'survey';
  search?: string;
}

// Form stats response
export interface FormStatsResponse {
  total_submissions: number;
  pending_submissions: number;
  approved_submissions: number;
  rejected_submissions: number;
  submissions_by_day: Array<{
    date: string;
    count: number;
  }>;
  completion_rate: number;
  average_completion_time: number;
}

/**
 * Forms API endpoints
 */
export const formsApi = {
  // ==================== Public Endpoints ====================

  /**
   * Get public form by ID or slug (for submission)
   */
  getPublic: async (formIdOrSlug: string): Promise<ApiResponse<Form>> => {
    return api.get<ApiResponse<Form>>(`/forms/public/${formIdOrSlug}`, {
      skipAuth: true,
    });
  },

  /**
   * Get forms for an event (public)
   */
  getByEvent: async (
    eventId: string,
    params?: PaginationParams
  ): Promise<FormsListResponse> => {
    return api.get<FormsListResponse>(`/events/${eventId}/forms`, {
      params: buildPaginationParams(params),
      skipAuth: true,
    });
  },

  /**
   * Get registration form for event (public)
   */
  getRegistrationForm: async (eventId: string): Promise<ApiResponse<Form>> => {
    return api.get<ApiResponse<Form>>(`/events/${eventId}/forms/registration`, {
      skipAuth: true,
    });
  },

  /**
   * Get nomination form for event (public)
   */
  getNominationForm: async (eventId: string): Promise<ApiResponse<Form>> => {
    return api.get<ApiResponse<Form>>(`/events/${eventId}/forms/nomination`, {
      skipAuth: true,
    });
  },

  // ==================== Admin/Organiser Endpoints ====================

  /**
   * List all forms
   */
  list: async (filters?: FormFilters): Promise<FormsListResponse> => {
    return api.get<FormsListResponse>('/forms', {
      params: {
        ...buildPaginationParams(filters),
        event: filters?.event,
        status: filters?.status,
        form_type: filters?.form_type,
        search: filters?.search,
      },
    });
  },

  /**
   * Get form by ID
   */
  getById: async (formId: string): Promise<ApiResponse<Form>> => {
    return api.get<ApiResponse<Form>>(`/forms/${formId}`);
  },

  /**
   * Create new form
   */
  create: async (formData: CreateFormRequest): Promise<ApiResponse<Form>> => {
    return api.post<ApiResponse<Form>>('/forms', formData);
  },

  /**
   * Update form
   */
  update: async (formId: string, data: UpdateFormRequest): Promise<ApiResponse<Form>> => {
    return api.put<ApiResponse<Form>>(`/forms/${formId}`, data);
  },

  /**
   * Delete form
   */
  delete: async (formId: string): Promise<ApiResponse<{ message: string }>> => {
    return api.delete<ApiResponse<{ message: string }>>(`/forms/${formId}`);
  },

  /**
   * Get form statistics
   */
  getStats: async (formId: string): Promise<ApiResponse<FormStatsResponse>> => {
    return api.get<ApiResponse<FormStatsResponse>>(`/forms/${formId}/stats`);
  },

  /**
   * Publish form
   */
  publish: async (formId: string): Promise<ApiResponse<Form>> => {
    return api.post<ApiResponse<Form>>(`/forms/${formId}/publish`);
  },

  /**
   * Unpublish form
   */
  unpublish: async (formId: string): Promise<ApiResponse<Form>> => {
    return api.post<ApiResponse<Form>>(`/forms/${formId}/unpublish`);
  },

  /**
   * Close form (stop accepting submissions)
   */
  close: async (formId: string): Promise<ApiResponse<Form>> => {
    return api.post<ApiResponse<Form>>(`/forms/${formId}/close`);
  },

  /**
   * Reopen form
   */
  reopen: async (formId: string): Promise<ApiResponse<Form>> => {
    return api.post<ApiResponse<Form>>(`/forms/${formId}/reopen`);
  },

  /**
   * Duplicate form
   */
  duplicate: async (formId: string): Promise<ApiResponse<Form>> => {
    return api.post<ApiResponse<Form>>(`/forms/${formId}/duplicate`);
  },

  /**
   * Add field to form
   */
  addField: async (
    formId: string,
    field: {
      name: string;
      label: string;
      type: string;
      required?: boolean;
      options?: string[];
      validation?: Record<string, unknown>;
      placeholder?: string;
      help_text?: string;
    }
  ): Promise<ApiResponse<Form>> => {
    return api.post<ApiResponse<Form>>(`/forms/${formId}/fields`, field);
  },

  /**
   * Update field in form
   */
  updateField: async (
    formId: string,
    fieldId: string,
    updates: Partial<{
      label: string;
      required: boolean;
      options: string[];
      validation: Record<string, unknown>;
      placeholder: string;
      help_text: string;
    }>
  ): Promise<ApiResponse<Form>> => {
    return api.put<ApiResponse<Form>>(`/forms/${formId}/fields/${fieldId}`, updates);
  },

  /**
   * Delete field from form
   */
  deleteField: async (formId: string, fieldId: string): Promise<ApiResponse<Form>> => {
    return api.delete<ApiResponse<Form>>(`/forms/${formId}/fields/${fieldId}`);
  },

  /**
   * Reorder form fields
   */
  reorderFields: async (
    formId: string,
    fieldIds: string[]
  ): Promise<ApiResponse<Form>> => {
    return api.post<ApiResponse<Form>>(`/forms/${formId}/fields/reorder`, {
      field_ids: fieldIds,
    });
  },

  /**
   * Set field mapping (for candidate creation)
   */
  setFieldMapping: async (
    formId: string,
    mapping: {
      name_field: string;
      email_field?: string;
      phone_field?: string;
      image_field?: string;
      category_field?: string;
      bio_field?: string;
      custom_mappings?: Record<string, string>;
    }
  ): Promise<ApiResponse<Form>> => {
    return api.put<ApiResponse<Form>>(`/forms/${formId}/field-mapping`, mapping);
  },

  /**
   * Get form field mapping
   */
  getFieldMapping: async (
    formId: string
  ): Promise<ApiResponse<{
    name_field: string;
    email_field?: string;
    phone_field?: string;
    image_field?: string;
    category_field?: string;
    bio_field?: string;
    custom_mappings?: Record<string, string>;
  }>> => {
    return api.get<ApiResponse<{
      name_field: string;
      email_field?: string;
      phone_field?: string;
      image_field?: string;
      category_field?: string;
      bio_field?: string;
      custom_mappings?: Record<string, string>;
    }>>(`/forms/${formId}/field-mapping`);
  },

  /**
   * Export form submissions
   */
  exportSubmissions: async (
    formId: string,
    format?: 'csv' | 'xlsx'
  ): Promise<Blob> => {
    return api.get<Blob>(`/forms/${formId}/export`, {
      params: { format },
      headers: { Accept: 'application/octet-stream' },
    });
  },
};

export default formsApi;
