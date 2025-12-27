/**
 * Hooks Index
 * Export all custom hooks
 */

// Public data hooks (from usePublicData.ts)
export {
  // Query keys
  queryKeys,
  // Slides hooks
  useActiveSlides,
  useSlidesByType,
  useEventSlides,
  // Events hooks
  usePublicEvents,
  useFeaturedEvents,
  useUpcomingEvents,
  useEventBySlug,
  useEventById,
  // Categories hooks (public)
  useFeaturedCategories as useFeaturedCategoriesPublic,
  useCategoriesByEvent as useCategoriesByEventPublic,
  useCategoryById as useCategoryByIdPublic,
  // Candidates hooks
  useCandidatesByEvent,
  useCandidatesByCategory,
  useCandidateById,
  useTopCandidates,
  // Bundles hooks
  useBundlesByEvent,
  useFeaturedBundles,
  usePopularBundles,
  useBundleById,
} from './usePublicData';

// Categories hooks (full API with mutations)
export {
  // Query keys
  categoryQueryKeys,
  // Public query hooks
  useFeaturedCategories,
  useCategoriesByEvent,
  useCategoryById,
  useCategoryBySlug,
  useCategoryPublicResults,
  // Admin query hooks
  useCategories,
  useCategoryStats,
  useCategoryResults,
  useCategoryCandidates,
  useCategoryVoteCounts,
  // CRUD mutations
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
  useUploadCategoryImage,
  useDeleteCategoryImage,
  // Voting lifecycle mutations
  useActivateCategory,
  useDeactivateCategory,
  useOpenCategoryVoting,
  useCloseCategoryVoting,
  useUpdateCategoryDeadline,
  useExtendCategoryDeadline,
  // Candidate management mutations
  useAddCandidatesToCategory,
  useRemoveCandidatesFromCategory,
  // Featured & order mutations
  useToggleCategoryFeatured,
  useUpdateCategoryOrder,
  // Results mutations
  usePublishCategoryResults,
  // Bulk operations
  useReorderCategories,
  useBulkUpdateCategories,
  useBulkDeleteCategories,
  // Utility hooks
  usePrefetchCategory,
  useInvalidateCategories,
} from './useCategories';

// Footer data hooks
export {
  useFooterStats,
  useFooterCategories,
} from './useFooterData';
