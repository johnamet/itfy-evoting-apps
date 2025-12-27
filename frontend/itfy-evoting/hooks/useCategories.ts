/**
 * Categories Hooks
 * React Query hooks for category operations (public and admin)
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { categoriesApi, type CategoryFilters } from '@/lib/api/categories';
import type {
  PaginationParams,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from '@/types';

// ==================== Query Keys ====================

export const categoryQueryKeys = {
  all: ['categories'] as const,
  lists: () => [...categoryQueryKeys.all, 'list'] as const,
  list: (filters?: CategoryFilters) => [...categoryQueryKeys.lists(), filters] as const,
  details: () => [...categoryQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...categoryQueryKeys.details(), id] as const,
  bySlug: (slug: string) => [...categoryQueryKeys.all, 'slug', slug] as const,
  byEvent: (eventId: string, params?: PaginationParams) => 
    [...categoryQueryKeys.all, 'event', eventId, params] as const,
  featured: (params?: PaginationParams) => [...categoryQueryKeys.all, 'featured', params] as const,
  stats: (id: string) => [...categoryQueryKeys.detail(id), 'stats'] as const,
  results: (id: string) => [...categoryQueryKeys.detail(id), 'results'] as const,
  publicResults: (id: string) => [...categoryQueryKeys.detail(id), 'results', 'public'] as const,
  candidates: (id: string, params?: PaginationParams) => 
    [...categoryQueryKeys.detail(id), 'candidates', params] as const,
  voteCounts: (id: string) => [...categoryQueryKeys.detail(id), 'vote-counts'] as const,
};

// ==================== Public Query Hooks ====================

/**
 * Hook to fetch featured categories
 */
export function useFeaturedCategories(params?: PaginationParams, enabled = true) {
  return useQuery({
    queryKey: categoryQueryKeys.featured(params),
    queryFn: () => categoriesApi.getFeatured(params),
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to fetch categories for an event (public)
 */
export function useCategoriesByEvent(eventId: string, params?: PaginationParams, enabled = true) {
  return useQuery({
    queryKey: categoryQueryKeys.byEvent(eventId, params),
    queryFn: () => categoriesApi.getByEvent(eventId, params),
    enabled: !!eventId && enabled,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to fetch a single category by ID (public)
 */
export function useCategoryById(categoryId: string, enabled = true) {
  return useQuery({
    queryKey: categoryQueryKeys.detail(categoryId),
    queryFn: async () => {
      const response = await categoriesApi.getById(categoryId);
      return response.data;
    },
    enabled: !!categoryId && enabled,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to fetch a single category by slug (public)
 */
export function useCategoryBySlug(slug: string, enabled = true) {
  return useQuery({
    queryKey: categoryQueryKeys.bySlug(slug),
    queryFn: async () => {
      const response = await categoriesApi.getBySlug(slug);
      return response.data;
    },
    enabled: !!slug && enabled,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to fetch public category results
 */
export function useCategoryPublicResults(categoryId: string, enabled = true) {
  return useQuery({
    queryKey: categoryQueryKeys.publicResults(categoryId),
    queryFn: async () => {
      const response = await categoriesApi.getPublicResults(categoryId);
      return response.data;
    },
    enabled: !!categoryId && enabled,
    staleTime: 2 * 60 * 1000, // 2 minutes - results change frequently
  });
}

// ==================== Admin Query Hooks ====================

/**
 * Hook to list all categories with filters (admin)
 */
export function useCategories(filters?: CategoryFilters, enabled = true) {
  return useQuery({
    queryKey: categoryQueryKeys.list(filters),
    queryFn: () => categoriesApi.list(filters),
    enabled,
    staleTime: 2 * 60 * 1000,
  });
}

/**
 * Hook to fetch category statistics (admin)
 */
export function useCategoryStats(categoryId: string, enabled = true) {
  return useQuery({
    queryKey: categoryQueryKeys.stats(categoryId),
    queryFn: async () => {
      const response = await categoriesApi.getStats(categoryId);
      return response.data;
    },
    enabled: !!categoryId && enabled,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
}

/**
 * Hook to fetch category results (admin)
 */
export function useCategoryResults(categoryId: string, enabled = true) {
  return useQuery({
    queryKey: categoryQueryKeys.results(categoryId),
    queryFn: async () => {
      const response = await categoriesApi.getResults(categoryId);
      return response.data;
    },
    enabled: !!categoryId && enabled,
    staleTime: 1 * 60 * 1000,
  });
}

/**
 * Hook to fetch candidates in a category
 */
export function useCategoryCandidates(categoryId: string, params?: PaginationParams, enabled = true) {
  return useQuery({
    queryKey: categoryQueryKeys.candidates(categoryId, params),
    queryFn: () => categoriesApi.getCandidates(categoryId, params),
    enabled: !!categoryId && enabled,
    staleTime: 2 * 60 * 1000,
  });
}

/**
 * Hook to fetch vote counts by candidate for a category
 */
export function useCategoryVoteCounts(categoryId: string, enabled = true) {
  return useQuery({
    queryKey: categoryQueryKeys.voteCounts(categoryId),
    queryFn: async () => {
      const response = await categoriesApi.getVoteCounts(categoryId);
      return response.data;
    },
    enabled: !!categoryId && enabled,
    staleTime: 1 * 60 * 1000, // 1 minute - vote counts change frequently
  });
}

// ==================== Mutation Hooks ====================

/**
 * Hook to create a new category
 */
export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCategoryRequest) => categoriesApi.create(data),
    onSuccess: (response) => {
      // Invalidate category lists
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.lists() });
      // Invalidate event-specific category lists
      if (response.data?.event) {
        queryClient.invalidateQueries({ 
          queryKey: categoryQueryKeys.byEvent(response.data.event as string) 
        });
      }
    },
  });
}

/**
 * Hook to update a category
 */
export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ categoryId, data }: { categoryId: string; data: UpdateCategoryRequest }) =>
      categoriesApi.update(categoryId, data),
    onSuccess: (response, variables) => {
      // Invalidate specific category
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.detail(variables.categoryId) });
      // Invalidate category lists
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.lists() });
      // Update cache directly
      if (response.data) {
        queryClient.setQueryData(categoryQueryKeys.detail(variables.categoryId), response.data);
      }
    },
  });
}

/**
 * Hook to delete a category
 */
export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (categoryId: string) => categoriesApi.delete(categoryId),
    onSuccess: (_, categoryId) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: categoryQueryKeys.detail(categoryId) });
      // Invalidate category lists
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.lists() });
    },
  });
}

/**
 * Hook to upload category image
 */
export function useUploadCategoryImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ categoryId, file }: { categoryId: string; file: File }) =>
      categoriesApi.uploadImage(categoryId, file),
    onSuccess: (_, variables) => {
      // Invalidate specific category
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.detail(variables.categoryId) });
    },
  });
}

/**
 * Hook to delete category image
 */
export function useDeleteCategoryImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (categoryId: string) => categoriesApi.deleteImage(categoryId),
    onSuccess: (_, categoryId) => {
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.detail(categoryId) });
    },
  });
}

// ==================== Voting Lifecycle Mutations ====================

/**
 * Hook to activate a category
 */
export function useActivateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (categoryId: string) => categoriesApi.activate(categoryId),
    onSuccess: (response, categoryId) => {
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.detail(categoryId) });
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.lists() });
      if (response.data) {
        queryClient.setQueryData(categoryQueryKeys.detail(categoryId), response.data);
      }
    },
  });
}

/**
 * Hook to deactivate a category
 */
export function useDeactivateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (categoryId: string) => categoriesApi.deactivate(categoryId),
    onSuccess: (response, categoryId) => {
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.detail(categoryId) });
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.lists() });
      if (response.data) {
        queryClient.setQueryData(categoryQueryKeys.detail(categoryId), response.data);
      }
    },
  });
}

/**
 * Hook to open voting for a category
 */
export function useOpenCategoryVoting() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (categoryId: string) => categoriesApi.openVoting(categoryId),
    onSuccess: (response, categoryId) => {
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.detail(categoryId) });
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.lists() });
      if (response.data) {
        queryClient.setQueryData(categoryQueryKeys.detail(categoryId), response.data);
      }
    },
  });
}

/**
 * Hook to close voting for a category
 */
export function useCloseCategoryVoting() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (categoryId: string) => categoriesApi.closeVoting(categoryId),
    onSuccess: (response, categoryId) => {
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.detail(categoryId) });
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.lists() });
      if (response.data) {
        queryClient.setQueryData(categoryQueryKeys.detail(categoryId), response.data);
      }
    },
  });
}

/**
 * Hook to update voting deadline for a category
 */
export function useUpdateCategoryDeadline() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ categoryId, deadline }: { categoryId: string; deadline: string }) =>
      categoriesApi.updateDeadline(categoryId, deadline),
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.detail(variables.categoryId) });
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.lists() });
      if (response.data) {
        queryClient.setQueryData(categoryQueryKeys.detail(variables.categoryId), response.data);
      }
    },
  });
}

/**
 * Hook to extend voting deadline for a category
 */
export function useExtendCategoryDeadline() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ categoryId, hours }: { categoryId: string; hours: number }) =>
      categoriesApi.extendDeadline(categoryId, hours),
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.detail(variables.categoryId) });
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.lists() });
      if (response.data) {
        queryClient.setQueryData(categoryQueryKeys.detail(variables.categoryId), response.data);
      }
    },
  });
}

// ==================== Candidate Management Mutations ====================

/**
 * Hook to add candidates to a category
 */
export function useAddCandidatesToCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ categoryId, candidateIds }: { categoryId: string; candidateIds: string[] }) =>
      categoriesApi.addCandidates(categoryId, candidateIds),
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.detail(variables.categoryId) });
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.candidates(variables.categoryId) });
      if (response.data) {
        queryClient.setQueryData(categoryQueryKeys.detail(variables.categoryId), response.data);
      }
    },
  });
}

/**
 * Hook to remove candidates from a category
 */
export function useRemoveCandidatesFromCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ categoryId, candidateIds }: { categoryId: string; candidateIds: string[] }) =>
      categoriesApi.removeCandidates(categoryId, candidateIds),
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.detail(variables.categoryId) });
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.candidates(variables.categoryId) });
      if (response.data) {
        queryClient.setQueryData(categoryQueryKeys.detail(variables.categoryId), response.data);
      }
    },
  });
}

// ==================== Featured & Order Mutations ====================

/**
 * Hook to toggle featured status for a category
 */
export function useToggleCategoryFeatured() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (categoryId: string) => categoriesApi.toggleFeatured(categoryId),
    onSuccess: (response, categoryId) => {
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.detail(categoryId) });
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.featured() });
      if (response.data) {
        queryClient.setQueryData(categoryQueryKeys.detail(categoryId), response.data);
      }
    },
  });
}

/**
 * Hook to update display order for a category
 */
export function useUpdateCategoryOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ categoryId, displayOrder }: { categoryId: string; displayOrder: number }) =>
      categoriesApi.updateOrder(categoryId, displayOrder),
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.detail(variables.categoryId) });
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.lists() });
      if (response.data) {
        queryClient.setQueryData(categoryQueryKeys.detail(variables.categoryId), response.data);
      }
    },
  });
}

// ==================== Results Mutations ====================

/**
 * Hook to publish category results
 */
export function usePublishCategoryResults() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (categoryId: string) => categoriesApi.publishResults(categoryId),
    onSuccess: (response, categoryId) => {
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.detail(categoryId) });
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.results(categoryId) });
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.publicResults(categoryId) });
      if (response.data) {
        queryClient.setQueryData(categoryQueryKeys.detail(categoryId), response.data);
      }
    },
  });
}

// ==================== Bulk Operations ====================

/**
 * Hook to reorder categories within an event
 */
export function useReorderCategories() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ eventId, categoryIds }: { eventId: string; categoryIds: string[] }) =>
      categoriesApi.reorder(eventId, categoryIds),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.byEvent(variables.eventId) });
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.lists() });
    },
  });
}

/**
 * Hook to bulk update categories
 */
export function useBulkUpdateCategories() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updates: Array<{ id: string; data: Partial<UpdateCategoryRequest> }>) =>
      categoriesApi.bulkUpdate(updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.all });
    },
  });
}

/**
 * Hook to bulk delete categories
 */
export function useBulkDeleteCategories() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (categoryIds: string[]) => categoriesApi.bulkDelete(categoryIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.all });
    },
  });
}

// ==================== Utility Hooks ====================

/**
 * Hook to prefetch category data
 */
export function usePrefetchCategory() {
  const queryClient = useQueryClient();

  return (categoryId: string) => {
    queryClient.prefetchQuery({
      queryKey: categoryQueryKeys.detail(categoryId),
      queryFn: async () => {
        const response = await categoriesApi.getById(categoryId);
        return response.data;
      },
      staleTime: 5 * 60 * 1000,
    });
  };
}

/**
 * Hook to invalidate all category queries
 */
export function useInvalidateCategories() {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: categoryQueryKeys.all });
  };
}
