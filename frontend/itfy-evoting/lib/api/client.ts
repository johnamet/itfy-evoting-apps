/**
 * Base API Client
 * Centralized HTTP client with authentication, error handling, and request/response interceptors
 */

import type { ApiResponse, PaginationParams, PaginationMeta } from '@/types';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

// Token storage keys
const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const CANDIDATE_TOKEN_KEY = 'candidate_token';
const CANDIDATE_REFRESH_TOKEN_KEY = 'candidate_refresh_token';

// Token types for different authentication contexts
export type AuthType = 'user' | 'candidate';

/**
 * Token management utilities
 */
export const tokenManager = {
  // User tokens
  getAccessToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  setAccessToken: (token: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  },

  getRefreshToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  setRefreshToken: (token: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  },

  clearUserTokens: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  // Candidate tokens
  getCandidateToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(CANDIDATE_TOKEN_KEY);
  },

  setCandidateToken: (token: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(CANDIDATE_TOKEN_KEY, token);
  },

  getCandidateRefreshToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(CANDIDATE_REFRESH_TOKEN_KEY);
  },

  setCandidateRefreshToken: (token: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(CANDIDATE_REFRESH_TOKEN_KEY, token);
  },

  clearCandidateToken: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(CANDIDATE_TOKEN_KEY);
    localStorage.removeItem(CANDIDATE_REFRESH_TOKEN_KEY);
  },

  // Clear all tokens
  clearAll: (): void => {
    tokenManager.clearUserTokens();
    tokenManager.clearCandidateToken();
  },
};

/**
 * Error class for API errors
 */
export class ApiError extends Error {
  status: number;
  code?: string;
  details?: Record<string, unknown>;

  constructor(
    message: string,
    status: number,
    code?: string,
    details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

/**
 * Request options interface
 */
export interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
  params?: Record<string, string | number | boolean | undefined>;
  authType?: AuthType;
  skipAuth?: boolean;
}

/**
 * Build URL with query parameters
 */
function buildUrl(
  endpoint: string,
  params?: Record<string, string | number | boolean | undefined>
): string {
  const url = new URL(`${API_BASE_URL}${endpoint}`);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.append(key, String(value));
      }
    });
  }
  
  return url.toString();
}

/**
 * Get authorization header based on auth type
 */
function getAuthHeader(authType: AuthType = 'user'): Record<string, string> {
  const token = authType === 'candidate'
    ? tokenManager.getCandidateToken()
    : tokenManager.getAccessToken();

  if (token) {
    return { Authorization: `Bearer ${token}` };
  }

  return {};
}

/**
 * Handle API response
 */
async function handleResponse<T>(response: Response): Promise<T> {
  // Handle no content responses
  if (response.status === 204) {
    return {} as T;
  }

  const contentType = response.headers.get('content-type');
  const isJson = contentType?.includes('application/json');

  if (!response.ok) {
    let errorData: { message?: string; error?: string; code?: string; details?: Record<string, unknown> } = {};
    
    if (isJson) {
      try {
        errorData = await response.json();
      } catch {
        // Failed to parse error response
      }
    }

    const message = errorData.message || errorData.error || `HTTP ${response.status}: ${response.statusText}`;
    throw new ApiError(message, response.status, errorData.code, errorData.details);
  }

  if (isJson) {
    return response.json();
  }

  // Handle non-JSON responses (e.g., file downloads)
  return response.blob() as unknown as T;
}

/**
 * Refresh access token
 */
let refreshPromise: Promise<boolean> | null = null;
let isLoggingOut = false; // Flag to prevent recursive logout

async function refreshAccessToken(): Promise<boolean> {
  // Prevent multiple simultaneous refresh requests
  if (refreshPromise) {
    return refreshPromise;
  }

  const refreshToken = tokenManager.getRefreshToken();
  if (!refreshToken) {
    return false;
  }

  refreshPromise = (async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      if (!response.ok) {
        tokenManager.clearUserTokens();
        return false;
      }

      const data = await response.json();
      
      if (data.data?.access_token) {
        tokenManager.setAccessToken(data.data.access_token);
        if (data.data.refresh_token) {
          tokenManager.setRefreshToken(data.data.refresh_token);
        }
        return true;
      }

      return false;
    } catch {
      tokenManager.clearUserTokens();
      return false;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

/**
 * Main API request function
 */
export async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const {
    body,
    params,
    authType = 'user',
    skipAuth = false,
    headers: customHeaders = {},
    ...fetchOptions
  } = options;

  const url = buildUrl(endpoint, params);

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(!skipAuth ? getAuthHeader(authType) : {}),
    ...(customHeaders as Record<string, string>),
  };

  // Handle FormData - remove Content-Type to let browser set it with boundary
  if (body instanceof FormData) {
    delete headers['Content-Type'];
  }

  const config: RequestInit = {
    ...fetchOptions,
    headers,
    body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
  };

  let response = await fetch(url, config);

  // Handle 401 - attempt token refresh for user auth only
  if (response.status === 401 && !skipAuth) {
    // Prevent recursive logout attempts
    const isLogoutRequest = endpoint.includes('/logout');
    
    if (authType === 'user') {
      const refreshed = await refreshAccessToken();
      
      if (refreshed) {
        // Retry request with new token
        const newHeaders = {
          ...headers,
          ...getAuthHeader(authType),
        };
        
        response = await fetch(url, {
          ...config,
          headers: newHeaders,
        });
      } else if (!isLoggingOut && !isLogoutRequest) {
        // Trigger logout event for UI to handle (only once and not for logout requests)
        isLoggingOut = true;
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('auth:logout'));
        }
        // Reset flag after a delay to allow for future logout attempts
        setTimeout(() => { isLoggingOut = false; }, 1000);
      }
    } else if (authType === 'candidate' && !isLogoutRequest) {
      // For candidates, clear token and trigger candidate logout event
      // Don't attempt refresh or recursive logout
      tokenManager.clearCandidateToken();
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('candidate:unauthorized'));
      }
    }
  }

  return handleResponse<T>(response);
}

/**
 * HTTP method helpers
 */
export const api = {
  get: <T>(endpoint: string, options?: Omit<RequestOptions, 'method' | 'body'>) =>
    apiRequest<T>(endpoint, { ...options, method: 'GET' }),

  post: <T>(endpoint: string, body?: unknown, options?: Omit<RequestOptions, 'method'>) =>
    apiRequest<T>(endpoint, { ...options, method: 'POST', body }),

  put: <T>(endpoint: string, body?: unknown, options?: Omit<RequestOptions, 'method'>) =>
    apiRequest<T>(endpoint, { ...options, method: 'PUT', body }),

  patch: <T>(endpoint: string, body?: unknown, options?: Omit<RequestOptions, 'method'>) =>
    apiRequest<T>(endpoint, { ...options, method: 'PATCH', body }),

  delete: <T>(endpoint: string, options?: Omit<RequestOptions, 'method' | 'body'>) =>
    apiRequest<T>(endpoint, { ...options, method: 'DELETE' }),
};

/**
 * Pagination helper type
 */
export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: PaginationMeta;
}

/**
 * Build pagination params
 */
export function buildPaginationParams(
  params?: PaginationParams
): Record<string, string | number | undefined> {
  if (!params) return {};
  
  return {
    page: params.page,
    limit: params.limit,
  };
}

/**
 * File upload helper
 */
export async function uploadFile<T>(
  endpoint: string,
  file: File,
  fieldName: string = 'file',
  additionalData?: Record<string, string>,
  options?: Omit<RequestOptions, 'method' | 'body'>
): Promise<T> {
  const formData = new FormData();
  formData.append(fieldName, file);

  if (additionalData) {
    Object.entries(additionalData).forEach(([key, value]) => {
      formData.append(key, value);
    });
  }

  return api.post<T>(endpoint, formData, options);
}

/**
 * Multi-file upload helper
 */
export async function uploadFiles<T>(
  endpoint: string,
  files: File[],
  fieldName: string = 'files',
  additionalData?: Record<string, string>,
  options?: Omit<RequestOptions, 'method' | 'body'>
): Promise<T> {
  const formData = new FormData();
  
  files.forEach((file) => {
    formData.append(fieldName, file);
  });

  if (additionalData) {
    Object.entries(additionalData).forEach(([key, value]) => {
      formData.append(key, value);
    });
  }

  return api.post<T>(endpoint, formData, options);
}

export default api;
