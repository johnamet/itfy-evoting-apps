/**
 * Public Data Hooks
 * React Query hooks for fetching public data (slides, events, categories, candidates, bundles)
 */

import { useQuery } from '@tanstack/react-query';
import { slidesApi } from '@/lib/api/slides';
import { eventsApi } from '@/lib/api/events';
import { categoriesApi } from '@/lib/api/categories';
import { candidatesApi } from '@/lib/api/candidates';
import { bundlesApi } from '@/lib/api/bundles';
import type { PaginationParams } from '@/types';
import type { PublicEventFilters } from '@/lib/api/events';

// ==================== Query Keys ====================

export const queryKeys = {
  slides: {
    all: ['slides'] as const,
    active: () => [...queryKeys.slides.all, 'active'] as const,
    byType: (type: string) => [...queryKeys.slides.all, 'type', type] as const,
    byEvent: (eventId: string) => [...queryKeys.slides.all, 'event', eventId] as const,
  },
  events: {
    all: ['events'] as const,
    public: (params?: PaginationParams) => [...queryKeys.events.all, 'public', params] as const,
    featured: (params?: PaginationParams) => [...queryKeys.events.all, 'featured', params] as const,
    upcoming: (params?: PaginationParams) => [...queryKeys.events.all, 'upcoming', params] as const,
    bySlug: (slug: string) => [...queryKeys.events.all, 'slug', slug] as const,
    byId: (id: string) => [...queryKeys.events.all, id] as const,
  },
  categories: {
    all: ['categories'] as const,
    byEvent: (eventId: string, params?: PaginationParams) => 
      [...queryKeys.categories.all, 'event', eventId, params] as const,
    byId: (id: string) => [...queryKeys.categories.all, id] as const,
    featured: () => [...queryKeys.categories.all, 'featured'] as const,
  },
  candidates: {
    all: ['candidates'] as const,
    byEvent: (eventId: string, params?: PaginationParams & { category?: string }) => 
      [...queryKeys.candidates.all, 'event', eventId, params] as const,
    byCategory: (categoryId: string, params?: PaginationParams) => 
      [...queryKeys.candidates.all, 'category', categoryId, params] as const,
    byId: (id: string) => [...queryKeys.candidates.all, id] as const,
    top: () => [...queryKeys.candidates.all, 'top'] as const,
  },
  bundles: {
    all: ['bundles'] as const,
    byEvent: (eventId: string, params?: PaginationParams) => 
      [...queryKeys.bundles.all, 'event', eventId, params] as const,
    byId: (id: string) => [...queryKeys.bundles.all, id] as const,
    featured: (eventId: string) => [...queryKeys.bundles.all, 'featured', eventId] as const,
    popular: (eventId: string) => [...queryKeys.bundles.all, 'popular', eventId] as const,
  },
};

// ==================== Slides Hooks ====================

/**
 * Hook to fetch active slides for the homepage hero carousel
 */
export function useActiveSlides() {
  return useQuery({
    queryKey: queryKeys.slides.active(),
    queryFn: async () => {
      const response = await slidesApi.getActive();
      return response.data;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

/**
 * Hook to fetch slides by type (hero, banner, promotional)
 */
export function useSlidesByType(type: 'hero' | 'banner' | 'promotional') {
  return useQuery({
    queryKey: queryKeys.slides.byType(type),
    queryFn: async () => {
      const response = await slidesApi.getByType(type);
      return response.data;
    },
    staleTime: 10 * 60 * 1000,
  });
}

/**
 * Hook to fetch slides for a specific event
 */
export function useEventSlides(eventId: string, enabled = true) {
  return useQuery({
    queryKey: queryKeys.slides.byEvent(eventId),
    queryFn: async () => {
      const response = await slidesApi.getByEvent(eventId);
      return response.data;
    },
    enabled: !!eventId && enabled,
    staleTime: 10 * 60 * 1000,
  });
}

// ==================== Events Hooks ====================

/**
 * Hook to fetch public events with filters
 */
export function usePublicEvents(filters?: PublicEventFilters) {
  return useQuery({
    queryKey: queryKeys.events.public(filters),
    queryFn: async () => {
      const response = await eventsApi.getPublicEvents(filters);
      return response;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to fetch featured events
 */
export function useFeaturedEvents(params?: PaginationParams) {
  return useQuery({
    queryKey: queryKeys.events.featured(params),
    queryFn: async () => {
      const response = await eventsApi.getFeaturedEvents(params);
      return response;
    },
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to fetch upcoming events
 */
export function useUpcomingEvents(params?: PaginationParams) {
  return useQuery({
    queryKey: queryKeys.events.upcoming(params),
    queryFn: async () => {
      const response = await eventsApi.getUpcomingEvents(params);
      return response;
    },
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to fetch event by slug
 */
export function useEventBySlug(slug: string, enabled = true) {
  return useQuery({
    queryKey: queryKeys.events.bySlug(slug),
    queryFn: async () => {
      const response = await eventsApi.getBySlug(slug);
      return response.data;
    },
    enabled: !!slug && enabled,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to fetch event by ID
 */
export function useEventById(id: string, enabled = true) {
  return useQuery({
    queryKey: queryKeys.events.byId(id),
    queryFn: async () => {
      const response = await eventsApi.getByIdOrSlug(id);
      return response.data;
    },
    enabled: !!id && enabled,
    staleTime: 5 * 60 * 1000,
  });
}

// ==================== Categories Hooks ====================

/**
 * Hook to fetch featured categories
 */
export function useFeaturedCategories(params?: PaginationParams) {
  return useQuery({
    queryKey: queryKeys.categories.featured(),
    queryFn: async () => {
      const response = await categoriesApi.getFeatured(params);
      return response;
    },
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to fetch categories for an event
 */
export function useCategoriesByEvent(eventId: string, params?: PaginationParams, enabled = true) {
  return useQuery({
    queryKey: queryKeys.categories.byEvent(eventId, params),
    queryFn: async () => {
      const response = await categoriesApi.getByEvent(eventId, params);
      return response;
    },
    enabled: !!eventId && enabled,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to fetch a single category
 */
export function useCategoryById(categoryId: string, enabled = true) {
  return useQuery({
    queryKey: queryKeys.categories.byId(categoryId),
    queryFn: async () => {
      const response = await categoriesApi.getById(categoryId);
      return response.data;
    },
    enabled: !!categoryId && enabled,
    staleTime: 5 * 60 * 1000,
  });
}

// ==================== Candidates Hooks ====================

/**
 * Hook to fetch candidates for an event
 */
export function useCandidatesByEvent(
  eventId: string, 
  params?: PaginationParams & { category?: string },
  enabled = true
) {
  return useQuery({
    queryKey: queryKeys.candidates.byEvent(eventId, params),
    queryFn: async () => {
      const response = await candidatesApi.getByEvent(eventId, params);
      return response;
    },
    enabled: !!eventId && enabled,
    staleTime: 2 * 60 * 1000, // 2 minutes - votes change frequently
  });
}

/**
 * Hook to fetch candidates for a category
 */
export function useCandidatesByCategory(categoryId: string, params?: PaginationParams, enabled = true) {
  return useQuery({
    queryKey: queryKeys.candidates.byCategory(categoryId, params),
    queryFn: async () => {
      const response = await candidatesApi.getByCategory(categoryId, params);
      return response;
    },
    enabled: !!categoryId && enabled,
    staleTime: 2 * 60 * 1000,
  });
}

/**
 * Hook to fetch a single candidate
 */
export function useCandidateById(candidateId: string, enabled = true) {
  return useQuery({
    queryKey: queryKeys.candidates.byId(candidateId),
    queryFn: async () => {
      const response = await candidatesApi.getById(candidateId);
      return response.data;
    },
    enabled: !!candidateId && enabled,
    staleTime: 2 * 60 * 1000,
  });
}

/**
 * Hook to fetch top candidates across featured categories
 * Combines data from featured categories to get top performing candidates
 */
export function useTopCandidates(limit = 8) {
  // First fetch featured categories
  const { data: categoriesData, isLoading: categoriesLoading, error: categoriesError } = useFeaturedCategories({ limit: 3 });
  
  // Get the first featured category ID to fetch candidates from
  const featuredCategoryId = categoriesData?.data?.[0]?._id;
  
  // Fetch candidates from the first featured category
  const { 
    data: candidatesData, 
    isLoading: candidatesLoading, 
    error: candidatesError 
  } = useCandidatesByCategory(
    featuredCategoryId || '', 
    { limit },
    !!featuredCategoryId
  );
  
  // Return combined loading/error states
  return {
    data: candidatesData?.data || [],
    categoryName: categoriesData?.data?.[0]?.name,
    isLoading: categoriesLoading || candidatesLoading,
    error: categoriesError || candidatesError,
  };
}

// ==================== Bundles Hooks ====================

/**
 * Hook to fetch bundles for an event
 */
export function useBundlesByEvent(eventId: string, params?: PaginationParams, enabled = true) {
  return useQuery({
    queryKey: queryKeys.bundles.byEvent(eventId, params),
    queryFn: async () => {
      const response = await bundlesApi.getByEvent(eventId, params);
      return response;
    },
    enabled: !!eventId && enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to fetch featured bundles for an event
 */
export function useFeaturedBundles(eventId: string, enabled = true) {
  return useQuery({
    queryKey: queryKeys.bundles.featured(eventId),
    queryFn: async () => {
      const response = await bundlesApi.getFeatured(eventId);
      return response;
    },
    enabled: !!eventId && enabled,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to fetch popular bundles for an event
 */
export function usePopularBundles(eventId: string, limit?: number, enabled = true) {
  return useQuery({
    queryKey: queryKeys.bundles.popular(eventId),
    queryFn: async () => {
      const response = await bundlesApi.getPopular(eventId, limit);
      return response;
    },
    enabled: !!eventId && enabled,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to fetch a single bundle by ID
 */
export function useBundleById(bundleId: string, enabled = true) {
  return useQuery({
    queryKey: queryKeys.bundles.byId(bundleId),
    queryFn: async () => {
      const response = await bundlesApi.getById(bundleId);
      return response.data;
    },
    enabled: !!bundleId && enabled,
    staleTime: 5 * 60 * 1000,
  });
}
