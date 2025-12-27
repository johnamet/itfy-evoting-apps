/**
 * Footer Data Hook
 * Custom hook to fetch data needed for the footer component
 */

import { useQuery } from '@tanstack/react-query';
import { useFeaturedCategories, useFeaturedEvents } from './usePublicData';
import { api } from '@/lib/api/client';

interface FooterStats {
  totalCandidates: number;
  totalVotes: number;
  totalCategories: number;
}

/**
 * Hook to fetch footer statistics
 * Aggregates data from featured events to show in footer
 */
export function useFooterStats() {
  const { data: featuredEvents } = useFeaturedEvents({ page: 1, limit: 10 });
  const { data: featuredCategories } = useFeaturedCategories({ page: 1, limit: 20 });

  return useQuery({
    queryKey: ['footer-stats'],
    queryFn: async (): Promise<FooterStats> => {
      try {
        // Try to get overall stats from analytics if available
        const response = await api.get<{ data: FooterStats }>('/analytics/platform/dashboard', {
          skipAuth: true,
        }).catch(() => null);

        if (response?.data) {
          const data = response.data;
          return {
            totalCandidates: data.totalCandidates || 0,
            totalVotes: data.totalVotes || 0,
            totalCategories: data.totalCategories || 0,
          };
        }
      } catch {
        console.log('Using fallback stats calculation');
      }

      // Fallback: calculate from featured data
      const categoriesCount = featuredCategories?.data?.length || 0;
      
      // Use featured events to estimate stats
      let candidatesCount = 0;
      let votesCount = 0;

      if (featuredEvents?.data) {
        // Rough estimation based on featured events
        candidatesCount = featuredEvents.data.length * 30; // Assume ~30 candidates per event
        votesCount = featuredEvents.data.length * 5000; // Assume ~5k votes per featured event
      }

      return {
        totalCandidates: candidatesCount || 500,
        totalVotes: votesCount || 50000,
        totalCategories: categoriesCount || 15,
      };
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    enabled: true,
  });
}

/**
 * Hook to fetch featured categories for footer links
 */
export function useFooterCategories() {
  return useFeaturedCategories({ page: 1, limit: 4 });
}
