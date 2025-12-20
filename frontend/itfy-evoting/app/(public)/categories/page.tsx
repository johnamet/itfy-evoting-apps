'use client';

import { format, formatDistanceToNow } from 'date-fns';
import { 
  Award, Search, Grid, List, Clock, Users, Vote, 
  ChevronRight, Star, Trophy, Globe, Lock,
  ArrowRight, ShieldCheck
} from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnnouncementBar from '@/components/AnnouncementBar';
import { mockCategories } from '@/lib/mocks/categories';
import { mockEvents } from '@/lib/mocks/events';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useMemo } from 'react';

type ViewMode = 'grid' | 'list';
type FilterStatus = 'all' | 'voting' | 'upcoming' | 'closed';
type SortOption = 'popular' | 'newest' | 'alphabetical' | 'deadline';

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');
  const [eventFilter, setEventFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('popular');

  // Get unique events that have categories
  const eventsWithCategories = useMemo(() => {
    const eventIds = [...new Set(mockCategories.map(cat => cat.event))];
    return mockEvents.filter(e => eventIds.includes(e._id));
  }, []);

  const filteredCategories = useMemo(() => {
    return mockCategories
      .filter(category => {
        // Status filter
        if (statusFilter !== 'all') {
          const now = new Date();
          const votingStart = category.voting_start_date ? new Date(category.voting_start_date) : null;
          const votingEnd = category.voting_deadline ? new Date(category.voting_deadline) : null;
          
          switch (statusFilter) {
            case 'voting':
              if (!category.is_voting_open) return false;
              if (votingEnd && votingEnd <= now) return false;
              break;
            case 'upcoming':
              if (votingStart && votingStart > now) return true;
              return false;
            case 'closed':
              if (votingEnd && votingEnd <= now) return true;
              if (category.status === 'archived' || category.status === 'closed') return true;
              return false;
          }
        }
        return true;
      })
      .filter(category => {
        // Event filter
        if (eventFilter !== 'all') {
          return category.event === eventFilter;
        }
        return true;
      })
      .filter(category => {
        // Search filter
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        const event = mockEvents.find(e => e._id === category.event);
        return (
          category.name.toLowerCase().includes(query) ||
          category.description?.toLowerCase().includes(query) ||
          event?.name.toLowerCase().includes(query)
        );
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'popular':
            return b.total_votes - a.total_votes;
          case 'newest':
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
          case 'alphabetical':
            return a.name.localeCompare(b.name);
          case 'deadline':
            if (!a.voting_deadline) return 1;
            if (!b.voting_deadline) return -1;
            return new Date(a.voting_deadline).getTime() - new Date(b.voting_deadline).getTime();
          default:
            return 0;
        }
      });
  }, [searchQuery, statusFilter, eventFilter, sortBy]);

  const getVotingStatus = (category: typeof mockCategories[0]) => {
    const now = new Date();
    const votingStart = category.voting_start_date ? new Date(category.voting_start_date) : null;
    const votingEnd = category.voting_deadline ? new Date(category.voting_deadline) : null;

    if (votingEnd && votingEnd <= now) {
      return { status: 'closed', label: 'Voting Closed', color: 'bg-gray-500/20 text-gray-400 border-gray-500/30' };
    }
    if (votingStart && votingStart > now) {
      return { status: 'upcoming', label: 'Coming Soon', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' };
    }
    if (category.is_voting_open) {
      return { status: 'voting', label: 'Voting Open', color: 'bg-green-500/20 text-green-400 border-green-500/30' };
    }
    return { status: 'inactive', label: 'Inactive', color: 'bg-gray-500/20 text-gray-400 border-gray-500/30' };
  };

  const getVisibilityInfo = (visibility: string) => {
    switch (visibility) {
      case 'public':
        return { label: 'Public Results', color: 'bg-green-500/20 text-green-400', icon: Globe };
      case 'authenticated':
        return { label: 'Members Only', color: 'bg-blue-500/20 text-blue-400', icon: Lock };
      case 'admin_only':
        return { label: 'Admin Only', color: 'bg-red-500/20 text-red-400', icon: ShieldCheck };
      default:
        return { label: 'Public', color: 'bg-green-500/20 text-green-400', icon: Globe };
    }
  };

  const statusOptions: { value: FilterStatus; label: string }[] = [
    { value: 'all', label: 'All Categories' },
    { value: 'voting', label: 'Voting Open' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'closed', label: 'Closed' },
  ];

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'deadline', label: 'Ending Soon' },
    { value: 'newest', label: 'Newest' },
    { value: 'alphabetical', label: 'A-Z' },
  ];

  // Statistics
  const stats = {
    total: mockCategories.length,
    voting: mockCategories.filter(c => c.is_voting_open).length,
    totalVotes: mockCategories.reduce((sum, c) => sum + c.total_votes, 0),
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <AnnouncementBar />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c2d5a]/50 via-gray-900 to-gray-900" />
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#0152be]/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10 mb-6">
              <Award className="w-5 h-5 text-[#0152be]" />
              <span className="text-white font-medium">Award Categories</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Browse Award
              <span className="block mt-2 bg-gradient-to-r from-[#0152be] via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Categories
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Discover all award categories across our events and vote for your favorites. 
              From tech innovation to community impact, find the perfect category to support.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-white">{stats.total}</div>
                <div className="text-gray-400 text-sm">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400">{stats.voting}</div>
                <div className="text-gray-400 text-sm">Active Voting</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#0152be]">{stats.totalVotes.toLocaleString()}</div>
                <div className="text-gray-400 text-sm">Total Votes</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 border-b border-white/10">
        <div className="container mx-auto px-6">
          {/* Search */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search categories or events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0152be] focus:border-transparent transition"
            />
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              {/* Status Filter */}
              <div className="flex bg-white/5 rounded-lg p-1">
                {statusOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setStatusFilter(option.value)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      statusFilter === option.value
                        ? 'bg-gradient-to-r from-[#0152be] to-sky-500 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              {/* Event Filter */}
              <select
                value={eventFilter}
                onChange={(e) => setEventFilter(e.target.value)}
                title="Filter by Event"
                aria-label="Filter by Event"
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0152be]"
              >
                <option value="all">All Events</option>
                {eventsWithCategories.map((event) => (
                  <option key={event._id} value={event._id}>
                    {event.name}
                  </option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                title="Sort by"
                aria-label="Sort by"
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0152be]"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* View Toggle */}
            <div className="flex bg-white/5 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition ${
                  viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'
                }`}
                aria-label="Grid view"
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition ${
                  viewMode === 'list' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'
                }`}
                aria-label="List view"
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid/List */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-16">
              <Award className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400">No categories found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your filters or search query</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map((category) => {
                const event = mockEvents.find(e => e._id === category.event);
                const votingStatus = getVotingStatus(category);
                const visibilityInfo = getVisibilityInfo(category.results_visibility);
                const VisibilityIcon = visibilityInfo.icon;

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
                              <span>{category.candidates.length}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-[#0152be]">
                              <Vote className="w-4 h-4" />
                              <span>{category.total_votes.toLocaleString()}</span>
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
              })}
            </div>
          ) : (
            /* List View */
            <div className="space-y-4">
              {filteredCategories.map((category) => {
                const event = mockEvents.find(e => e._id === category.event);
                const votingStatus = getVotingStatus(category);
                const visibilityInfo = getVisibilityInfo(category.results_visibility);
                const VisibilityIcon = visibilityInfo.icon;

                return (
                  <Link key={category._id} href={`/categories/${category.slug}`}>
                    <GlassCard className="group hover:scale-[1.01] transition-all duration-300 cursor-pointer">
                      <div className="flex flex-col md:flex-row gap-6 p-6">
                        {/* Image */}
                        <div className="relative w-full md:w-48 h-32 rounded-xl overflow-hidden flex-shrink-0">
                          <Image
                            src={category.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop'}
                            alt={category.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 to-transparent" />
                          <div 
                            className={`absolute bottom-3 left-3 w-10 h-10 rounded-lg flex items-center justify-center ${
                              category.color_theme ? '' : 'bg-gradient-to-br from-[#0152be] to-sky-500'
                            }`}
                            {...(category.color_theme ? { 
                              style: { background: `linear-gradient(135deg, ${category.color_theme}, ${category.color_theme}99)` } as React.CSSProperties 
                            } : {})}
                          >
                            <Award className="w-5 h-5 text-white" />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className={`${votingStatus.color} px-3 py-1 rounded-full text-xs font-semibold border`}>
                              {votingStatus.label}
                            </span>
                            {category.is_featured && (
                              <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                                <Star className="w-3 h-3" />
                                Featured
                              </span>
                            )}
                            <span className={`${visibilityInfo.color} px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1`}>
                              <VisibilityIcon className="w-3 h-3" />
                              {visibilityInfo.label}
                            </span>
                          </div>

                          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#0152be] transition">
                            {category.name}
                          </h3>
                          
                          {event && (
                            <p className="text-sm text-[#0152be] mb-2 flex items-center gap-1">
                              <Trophy className="w-4 h-4" />
                              {event.name}
                            </p>
                          )}
                          
                          <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                            {category.description || 'Vote for the best in this category'}
                          </p>

                          <div className="flex flex-wrap items-center gap-6 text-sm">
                            <div className="flex items-center gap-2 text-gray-400">
                              <Users className="w-4 h-4" />
                              <span>{category.candidates.length} Candidates</span>
                            </div>
                            <div className="flex items-center gap-2 text-[#0152be]">
                              <Vote className="w-4 h-4" />
                              <span>{category.total_votes.toLocaleString()} Votes</span>
                            </div>
                            {category.voting_deadline && (
                              <div className="flex items-center gap-2 text-gray-500">
                                <Clock className="w-4 h-4" />
                                <span>
                                  {votingStatus.status === 'voting' 
                                    ? `Ends ${formatDistanceToNow(new Date(category.voting_deadline), { addSuffix: true })}`
                                    : format(new Date(category.voting_deadline), 'MMM d, yyyy')
                                  }
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Arrow */}
                        <div className="hidden md:flex items-center">
                          <ChevronRight className="w-6 h-6 text-gray-500 group-hover:text-[#0152be] group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </GlassCard>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-transparent to-gray-900/50">
        <div className="container mx-auto px-6">
          <GlassCard className="p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#0152be]/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <Trophy className="w-16 h-16 text-[#0152be] mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">
                Want to Nominate Someone?
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                Know someone who deserves recognition? Browse our events and submit a nomination 
                for any of our award categories.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/events">
                  <Button className="bg-gradient-to-r from-[#0152be] to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white px-8 py-3">
                    Browse Events
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-3">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      <Footer />
    </div>
  );
}
