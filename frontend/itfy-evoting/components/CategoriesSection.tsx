'use client';

import { useMemo } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Users, Trophy, ArrowRight, TrendingUp, Vote, Award, Star, Clock, Globe, Lock, ShieldCheck, Loader2 } from 'lucide-react';
import { useFeaturedCategories } from '@/hooks';
import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { ResultsVisibility } from '@/types';

// Skeleton loader for category cards
function CategoryCardSkeleton() {
  return (
    <GlassCard className="h-full overflow-hidden">
      <div className="relative h-48 bg-gray-800 animate-pulse" />
      <div className="p-6">
        <div className="h-6 bg-gray-700 rounded animate-pulse mb-2 w-3/4" />
        <div className="h-4 bg-gray-700 rounded animate-pulse mb-3 w-1/2" />
        <div className="h-4 bg-gray-700 rounded animate-pulse mb-4 w-full" />
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center gap-4">
            <div className="h-4 w-12 bg-gray-700 rounded animate-pulse" />
            <div className="h-4 w-16 bg-gray-700 rounded animate-pulse" />
          </div>
          <div className="h-6 w-6 bg-gray-700 rounded-full animate-pulse" />
        </div>
      </div>
    </GlassCard>
  );
}

export default function CategoriesSection() {
  const { data: categoriesData, isLoading, error } = useFeaturedCategories({ limit: 4 });
  
  // Process categories from API response
  const featuredCategories = useMemo(() => {
    if (!categoriesData?.data) return [];
    return categoriesData.data
      .filter((cat: { is_voting_open?: boolean }) => cat.is_voting_open)
      .sort((a: { total_votes?: number }, b: { total_votes?: number }) => 
        (b.total_votes || 0) - (a.total_votes || 0)
      )
      .slice(0, 4);
  }, [categoriesData]);

  // Define category type for reuse
  type CategoryType = {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    image?: string;
    is_featured?: boolean;
    is_voting_open?: boolean;
    voting_start_date?: string;
    voting_deadline?: string;
    total_votes?: number;
    candidates?: { length: number } | string[];
    event?: { _id: string; name: string } | string;
    color_theme?: string;
    results_visibility?: ResultsVisibility;
  };

  const getVotingStatus = (category: CategoryType) => {
    const now = new Date();
    const startDate = category.voting_start_date ? new Date(category.voting_start_date) : null;
    const endDate = category.voting_deadline ? new Date(category.voting_deadline) : null;
    
    if (endDate && now > endDate) {
      return { status: 'closed', label: 'Voting Closed', color: 'bg-gray-500/20 text-gray-400 border-gray-500/30' };
    }
    if (startDate && now < startDate) {
      return { status: 'upcoming', label: 'Coming Soon', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' };
    }
    if (category.is_voting_open) {
      return { status: 'voting', label: 'Voting Open', color: 'bg-green-500/20 text-green-400 border-green-500/30' };
    }
    return { status: 'closed', label: 'Closed', color: 'bg-gray-500/20 text-gray-400 border-gray-500/30' };
  };

  const getVisibilityInfo = (visibility?: ResultsVisibility) => {
    switch (visibility) {
      case 'public':
        return { label: 'Public', color: 'bg-green-500/20 text-green-400', icon: Globe };
      case 'authenticated':
        return { label: 'Members Only', color: 'bg-blue-500/20 text-blue-400', icon: Lock };
      case 'admin_only':
        return { label: 'Admin Only', color: 'bg-red-500/20 text-red-400', icon: ShieldCheck };
      default:
        return { label: 'Public', color: 'bg-green-500/20 text-green-400', icon: Globe };
    }
  };

  return (
    <section className="py-32 relative overflow-hidden bg-gradient-to-b from-gray-900 via-itfy-navy/20 to-gray-900">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-itfy-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-itfy-300/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-yellow-500/10 backdrop-blur-sm px-6 py-3 rounded-full border border-yellow-500/20 mb-6">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-300 font-medium">Award Categories</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Celebrating Excellence
            <span className="block mt-2 bg-gradient-to-r from-itfy-light-blue via-itfy-300 to-itfy-primary bg-clip-text text-transparent">
              Across Tech
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explore the categories celebrating excellence in Ghana&apos;s youth tech ecosystem and cast your vote
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 4 }).map((_, i) => (
              <CategoryCardSkeleton key={i} />
            ))
          ) : error ? (
            // Error state
            <div className="col-span-full text-center py-12">
              <div className="text-red-400 mb-4">Failed to load categories</div>
              <Button 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10"
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
            </div>
          ) : featuredCategories.length === 0 ? (
            // Empty state
            <div className="col-span-full text-center py-12">
              <Trophy className="w-16 h-16 mx-auto mb-4 text-gray-600" />
              <p className="text-gray-400 text-lg">No featured categories available at the moment</p>
              <p className="text-gray-500 text-sm mt-2">Check back soon for exciting voting categories!</p>
            </div>
          ) : (
            // Categories list
            featuredCategories.map((category: CategoryType) => {
              // Handle event as object or string
              const event = typeof category.event === 'object' ? category.event : null;
              const votingStatus = getVotingStatus(category);
              const visibilityInfo = getVisibilityInfo(category.results_visibility);
              const VisibilityIcon = visibilityInfo.icon;
              // Handle candidates as array or object with length
              const candidatesCount = Array.isArray(category.candidates) 
                ? category.candidates.length 
                : (category.candidates?.length || 0);

            return (
              <Link key={category._id} href={`/categories/${category.slug}`}>
                <GlassCard className="group h-full overflow-hidden hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                  {/* Image Header */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={category.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop'}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                      <span className={`${votingStatus.color} px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm`}>
                        {votingStatus.label}
                      </span>
                      {category.is_featured && (
                        <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 backdrop-blur-sm">
                          <Star className="w-3 h-3" />
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Category Icon */}
                    <div className="absolute bottom-4 left-4">
                      <div 
                        className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-xl ${
                          category.color_theme ? '' : 'bg-gradient-to-br from-[#0152be] to-sky-500'
                        }`}
                        {...(category.color_theme ? { 
                          style: { background: `linear-gradient(135deg, ${category.color_theme}, ${category.color_theme}99)` } as React.CSSProperties 
                        } : {})}
                      >
                        <Award className="w-7 h-7 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#0152be] transition">
                      {category.name}
                    </h3>
                    
                    {event && (
                      <p className="text-sm text-[#0152be] mb-3 flex items-center gap-1">
                        <Trophy className="w-4 h-4" />
                        {event.name}
                      </p>
                    )}
                    
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {category.description || 'Vote for the best in this category'}
                    </p>

                    {/* Stats Row */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-sm text-gray-400">
                          <Users className="w-4 h-4" />
                          <span>{candidatesCount}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-[#0152be]">
                          <Vote className="w-4 h-4" />
                          <span>{(category.total_votes || 0).toLocaleString()}</span>
                        </div>
                      </div>
                      <span className={`${visibilityInfo.color} px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1`}>
                        <VisibilityIcon className="w-3 h-3" />
                      </span>
                    </div>

                    {/* Deadline */}
                    {category.voting_deadline && votingStatus.status === 'voting' && (
                      <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>Ends {formatDistanceToNow(new Date(category.voting_deadline), { addSuffix: true })}</span>
                      </div>
                    )}
                  </div>
                </GlassCard>
              </Link>
            );
          })
          )}
        </div>

        {/* Bottom CTA Section */}
        <div className="max-w-4xl mx-auto">
          <GlassCard className="p-12 text-center bg-gradient-to-br from-itfy-primary/10 to-itfy-300/10 border-itfy-primary/20">
            <TrendingUp className="w-16 h-16 mx-auto mb-6 text-itfy-300" />
            <h3 className="text-3xl font-bold text-white mb-4">
              Don&apos;t see your category?
            </h3>
            <p className="text-gray-300 mb-8 text-lg">
              We&apos;re constantly expanding! Check back soon for more categories or suggest one to us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/categories">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg"
                >
                  See All Categories
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-itfy-primary to-itfy-600 hover:from-itfy-600 hover:to-itfy-700 px-8 py-6 text-lg"
              >
                Suggest a Category
              </Button>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}