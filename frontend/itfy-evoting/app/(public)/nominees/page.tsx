'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Search, 
  LayoutGrid, 
  List, 
  Users, 
  Vote, 
  Eye, 
  Star,
  Award,
  ChevronRight,
  Trophy,
  X,
  ChevronLeft
} from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import { candidatesApi } from '@/lib/api/candidates';
import { eventsApi } from '@/lib/api/events';
import { categoriesApi } from '@/lib/api/categories';
import { Candidate, Event, Category } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnnouncementBar from '@/components/AnnouncementBar';
import PromoBanner from '@/components/PromoBanner';

const ITEMS_PER_PAGE = 12;

// Stats calculation interface
interface Stats {
  totalNominees: number;
  totalVotes: number;
  featuredNominees: number;
  totalViews: number;
}

// Calculate stats from candidates
function calculateStats(candidates: Candidate[]): Stats {
  return {
    totalNominees: candidates.length,
    totalVotes: candidates.reduce((sum, c) => sum + c.vote_count, 0),
    featuredNominees: candidates.filter(c => c.is_featured).length,
    totalViews: candidates.reduce((sum, c) => sum + (c.view_count || 0), 0),
  };
}

// Status badge component
function StatusBadge({ status }: { status: Candidate['status'] }) {
  const statusConfig = {
    approved: { label: 'Approved', className: 'bg-green-500/20 text-green-400 border-green-500/30' },
    pending: { label: 'Pending', className: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
    rejected: { label: 'Rejected', className: 'bg-red-500/20 text-red-400 border-red-500/30' },
    profile_update_pending: { label: 'Update Pending', className: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
    pending_profile_completion: { label: 'Profile Incomplete', className: 'bg-gray-500/20 text-gray-400 border-gray-500/30' },
  };
  
  const config = statusConfig[status] || statusConfig.pending;
  
  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${config.className}`}>
      {config.label}
    </span>
  );
}

// Skeleton card for loading state (grid view)
function NomineeCardSkeleton() {
  return (
    <GlassCard className="overflow-hidden h-full flex flex-col">
      {/* Cover skeleton */}
      <Skeleton className="h-32 w-full rounded-none" />
      
      {/* Content skeleton */}
      <div className="pt-12 px-4 pb-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <Skeleton className="h-6 w-32 mb-1" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
        
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-10 w-full mb-3" />
        
        <div className="flex gap-1 mb-3">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        
        <div className="flex gap-4 pt-3 border-t border-gray-800">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-12" />
        </div>
      </div>
    </GlassCard>
  );
}

// Skeleton row for loading state (list view)
function NomineeRowSkeleton() {
  return (
    <GlassCard>
      <div className="flex items-center gap-4 p-4">
        <Skeleton className="w-16 h-16 rounded-full" />
        <div className="flex-1 min-w-0">
          <Skeleton className="h-6 w-40 mb-2" />
          <Skeleton className="h-4 w-32 mb-2" />
          <Skeleton className="h-4 w-full max-w-md" />
        </div>
        <div className="flex items-center gap-6">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-16" />
        </div>
      </div>
    </GlassCard>
  );
}

// Pagination component
function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange 
}: { 
  currentPage: number; 
  totalPages: number; 
  onPageChange: (page: number) => void;
}) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showEllipsis = totalPages > 7;
    
    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push('...');
      }
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      
      pages.push(totalPages);
    }
    
    return pages;
  };
  
  if (totalPages <= 1) return null;
  
  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg bg-gray-800/50 border border-gray-700 text-gray-400 hover:text-white hover:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      {getPageNumbers().map((page, index) => (
        typeof page === 'number' ? (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`min-w-[40px] h-10 px-3 rounded-lg font-medium transition-all ${
              currentPage === page
                ? 'bg-[#0152be] text-white'
                : 'bg-gray-800/50 border border-gray-700 text-gray-400 hover:text-white hover:border-gray-600'
            }`}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="px-2 text-gray-500">...</span>
        )
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg bg-gray-800/50 border border-gray-700 text-gray-400 hover:text-white hover:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        aria-label="Next page"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}

// Nominee card component for grid view
function NomineeCard({ nominee, events, categories }: { nominee: Candidate; events: Event[]; categories: Category[] }) {
  const event = events.find(e => e._id === nominee.event);
  const nomineeCategories = categories.filter(c => nominee.categories.includes(c._id));
  
  return (
    <Link href={`/nominees/${nominee.slug}`}>
      <GlassCard className="group overflow-hidden hover:ring-2 hover:ring-[#0152be]/50 transition-all duration-300 h-full flex flex-col">
        {/* Cover Image */}
        <div className="relative h-32 bg-gradient-to-r from-[#0152be]/20 to-sky-500/20 overflow-hidden">
          {nominee.cover_image ? (
            <Image
              src={nominee.cover_image}
              alt=""
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#0152be]/30 via-[#0152be]/20 to-sky-500/30" />
          )}
          
          {/* Featured Badge */}
          {nominee.is_featured && (
            <div className="absolute top-3 right-3">
              <span className="flex items-center gap-1 px-2 py-1 text-xs font-semibold bg-yellow-500 text-yellow-950 rounded-full">
                <Star className="w-3 h-3 fill-current" />
                Featured
              </span>
            </div>
          )}
          
          {/* Profile Image - Positioned at bottom of cover */}
          <div className="absolute -bottom-10 left-4">
            <div className="relative w-20 h-20 rounded-full border-4 border-gray-900 overflow-hidden bg-gray-800">
              {nominee.profile_image ? (
                <Image
                  src={nominee.profile_image}
                  alt={`${nominee.first_name} ${nominee.last_name}`}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-[#0152be]/20 text-[#0152be] text-2xl font-bold">
                  {nominee.first_name[0]}{nominee.last_name[0]}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="pt-12 px-4 pb-4 flex-1 flex flex-col">
          {/* Name and Code */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-[#0152be] transition-colors">
                {nominee.first_name} {nominee.last_name}
              </h3>
              <p className="text-xs text-gray-400">{nominee.candidate_code}</p>
            </div>
            <StatusBadge status={nominee.status} />
          </div>
          
          {/* Event */}
          {event && (
            <p className="text-sm text-sky-400 mb-2">{event.name}</p>
          )}
          
          {/* Bio */}
          <p className="text-sm text-gray-300 line-clamp-2 mb-3 flex-1">
            {nominee.bio || 'No bio available'}
          </p>
          
          {/* Categories */}
          <div className="flex flex-wrap gap-1 mb-3">
            {nomineeCategories.slice(0, 2).map(cat => (
              <span 
                key={cat._id}
                className="px-2 py-0.5 text-xs bg-[#0152be]/20 text-[#0152be] rounded-full"
              >
                {cat.name}
              </span>
            ))}
            {nomineeCategories.length > 2 && (
              <span className="px-2 py-0.5 text-xs bg-gray-800 text-gray-400 rounded-full">
                +{nomineeCategories.length - 2} more
              </span>
            )}
          </div>
          
          {/* Skills */}
          {nominee.skills && nominee.skills.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {nominee.skills.slice(0, 3).map((skill, index) => (
                <span 
                  key={index}
                  className="px-2 py-0.5 text-xs bg-gray-800 text-gray-300 rounded-full"
                >
                  {skill}
                </span>
              ))}
              {nominee.skills.length > 3 && (
                <span className="px-2 py-0.5 text-xs bg-gray-800 text-gray-400 rounded-full">
                  +{nominee.skills.length - 3}
                </span>
              )}
            </div>
          )}
          
          {/* Stats */}
          <div className="flex items-center gap-4 pt-3 border-t border-gray-800 text-sm">
            <div className="flex items-center gap-1 text-gray-400">
              <Vote className="w-4 h-4 text-[#0152be]" />
              <span className="font-medium text-white">{nominee.vote_count.toLocaleString()}</span>
              <span className="text-xs">votes</span>
            </div>
            {nominee.view_count && (
              <div className="flex items-center gap-1 text-gray-400">
                <Eye className="w-4 h-4" />
                <span>{nominee.view_count.toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}

// Nominee row component for list view
function NomineeRow({ nominee, events, categories }: { nominee: Candidate; events: Event[]; categories: Category[] }) {
  const event = events.find(e => e._id === nominee.event);
  const nomineeCategories = categories.filter(c => nominee.categories.includes(c._id));
  
  return (
    <Link href={`/nominees/${nominee.slug}`}>
      <GlassCard className="group hover:ring-2 hover:ring-[#0152be]/50 transition-all duration-300">
        <div className="flex items-center gap-4 p-4">
          {/* Profile Image */}
          <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-800 flex-shrink-0">
            {nominee.profile_image ? (
              <Image
                src={nominee.profile_image}
                alt={`${nominee.first_name} ${nominee.last_name}`}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-[#0152be]/20 text-[#0152be] text-xl font-bold">
                {nominee.first_name[0]}{nominee.last_name[0]}
              </div>
            )}
          </div>
          
          {/* Main Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-bold text-white group-hover:text-[#0152be] transition-colors truncate">
                {nominee.first_name} {nominee.last_name}
              </h3>
              {nominee.is_featured && (
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 flex-shrink-0" />
              )}
              <StatusBadge status={nominee.status} />
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
              <span className="text-gray-500">{nominee.candidate_code}</span>
              {event && (
                <>
                  <span>•</span>
                  <span className="text-sky-400">{event.name}</span>
                </>
              )}
            </div>
            
            <p className="text-sm text-gray-300 line-clamp-1 mb-2">
              {nominee.bio || 'No bio available'}
            </p>
            
            {/* Categories and Skills */}
            <div className="flex flex-wrap gap-1">
              {nomineeCategories.slice(0, 2).map(cat => (
                <span 
                  key={cat._id}
                  className="px-2 py-0.5 text-xs bg-[#0152be]/20 text-[#0152be] rounded-full"
                >
                  {cat.name}
                </span>
              ))}
              {nominee.skills?.slice(0, 2).map((skill, index) => (
                <span 
                  key={index}
                  className="px-2 py-0.5 text-xs bg-gray-800 text-gray-300 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          {/* Stats */}
          <div className="flex items-center gap-6 flex-shrink-0">
            <div className="text-center">
              <div className="flex items-center gap-1 text-[#0152be]">
                <Vote className="w-4 h-4" />
                <span className="font-bold text-white">{nominee.vote_count.toLocaleString()}</span>
              </div>
              <p className="text-xs text-gray-400">votes</p>
            </div>
            
            {nominee.view_count && (
              <div className="text-center">
                <div className="flex items-center gap-1 text-gray-400">
                  <Eye className="w-4 h-4" />
                  <span className="font-medium text-gray-300">{nominee.view_count.toLocaleString()}</span>
                </div>
                <p className="text-xs text-gray-400">views</p>
              </div>
            )}
            
            <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-[#0152be] transition-colors" />
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}

export default function NomineesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('votes');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  
  // State for data from backend
  const [allCandidates, setAllCandidates] = useState<Candidate[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [stats, setStats] = useState<Stats>({ totalNominees: 0, totalVotes: 0, featuredNominees: 0, totalViews: 0 });
  
  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch all data in parallel
        const [candidatesResponse, eventsResponse, categoriesResponse] = await Promise.all([
          candidatesApi.listPublic({ page: 1, limit: 1000 }), // Get all candidates
          eventsApi.getPublicEvents({ page: 1, limit: 100 }),
          categoriesApi.list({ page: 1, limit: 100 }),
        ]);
        
        const candidates = candidatesResponse.data || [];
        setAllCandidates(candidates);
        setEvents(eventsResponse.data || []);
        setCategories(categoriesResponse.data || []);
        setStats(calculateStats(candidates));
      } catch (error) {
        console.error('Failed to fetch nominees data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Filter and sort nominees using useMemo for performance
  const filteredNominees = useMemo(() => {
    let nominees = [...allCandidates];
    
    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      nominees = nominees.filter(n => 
        n.first_name.toLowerCase().includes(query) ||
        n.last_name.toLowerCase().includes(query) ||
        n.candidate_code.toLowerCase().includes(query) ||
        n.bio?.toLowerCase().includes(query) ||
        n.skills?.some(s => s.toLowerCase().includes(query)) ||
        n.tags?.some(t => t.toLowerCase().includes(query))
      );
    }
    
    // Filter by event
    if (selectedEvent !== 'all') {
      nominees = nominees.filter(n => n.event === selectedEvent);
    }
    
    // Filter by category
    if (selectedCategory !== 'all') {
      nominees = nominees.filter(n => n.categories.includes(selectedCategory));
    }
    
    // Filter by status (not used for public view, but kept for compatibility)
    if (selectedStatus !== 'all') {
      nominees = nominees.filter(n => n.status === selectedStatus);
    }
    
    // Filter by featured
    if (showFeaturedOnly) {
      nominees = nominees.filter(n => n.is_featured);
    }
    
    // Sort
    switch (sortBy) {
      case 'votes':
        nominees.sort((a, b) => b.vote_count - a.vote_count);
        break;
      case 'views':
        nominees.sort((a, b) => (b.view_count || 0) - (a.view_count || 0));
        break;
      case 'name':
        nominees.sort((a, b) => `${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`));
        break;
      case 'newest':
        nominees.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
    }
    
    return nominees;
  }, [allCandidates, searchQuery, selectedEvent, selectedCategory, selectedStatus, showFeaturedOnly, sortBy]);
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredNominees.length / ITEMS_PER_PAGE);
  const paginatedNominees = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredNominees.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredNominees, currentPage]);
  
  // Reset to page 1 when filters change
  const handleFilterChange = (setter: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    setter(value);
    setCurrentPage(1);
  };
  
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };
  
  const handleFeaturedToggle = () => {
    setShowFeaturedOnly(!showFeaturedOnly);
    setCurrentPage(1);
  };
  
  // Get unique events and categories from candidates
  const availableEvents = events.filter(e => 
    allCandidates.some(c => c.event === e._id)
  );
  
  const availableCategories = categories.filter(c => 
    allCandidates.some(cand => cand.categories.includes(c._id))
  );
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <AnnouncementBar />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0152be]/20 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0152be]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-[#0152be]/20 text-[#0152be] border-[#0152be]/30">
              <Users className="w-3 h-3 mr-1" />
              Meet Our Nominees
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Discover{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0152be] to-sky-400">
                Outstanding Nominees
              </span>
            </h1>
            
            <p className="text-lg text-gray-300 mb-8">
              Browse through our talented nominees competing across various categories. 
              Each nominee brings unique skills, experience, and vision to their respective fields.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <GlassCard className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Users className="w-5 h-5 text-[#0152be]" />
                  <span className="text-2xl font-bold text-white">{stats.totalNominees}</span>
                </div>
                <p className="text-sm text-gray-400">Total Nominees</p>
              </GlassCard>
              
              <GlassCard className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Vote className="w-5 h-5 text-green-500" />
                  <span className="text-2xl font-bold text-white">{stats.totalVotes.toLocaleString()}</span>
                </div>
                <p className="text-sm text-gray-400">Total Votes</p>
              </GlassCard>
              
              <GlassCard className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="text-2xl font-bold text-white">{stats.featuredNominees}</span>
                </div>
                <p className="text-sm text-gray-400">Featured</p>
              </GlassCard>
              
              <GlassCard className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Eye className="w-5 h-5 text-sky-500" />
                  <span className="text-2xl font-bold text-white">{stats.totalViews.toLocaleString()}</span>
                </div>
                <p className="text-sm text-gray-400">Total Views</p>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>
      
      {/* Search and Filters */}
      <section className="py-8 border-y border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-20 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search nominees by name, skills, or tags..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0152be]/50 focus:border-[#0152be]"
              />
              {searchQuery && (
                <button
                  onClick={() => handleSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-700 rounded"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-3 items-center flex-1">
              {/* Event Filter */}
              <select
                value={selectedEvent}
                onChange={(e) => handleFilterChange(setSelectedEvent, e.target.value)}
                className="px-3 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#0152be]/50"
                aria-label="Filter by event"
              >
                <option value="all">All Events</option>
                {availableEvents.map(event => (
                  <option key={event._id} value={event._id}>{event.name}</option>
                ))}
              </select>
              
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => handleFilterChange(setSelectedCategory, e.target.value)}
                className="px-3 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#0152be]/50"
                aria-label="Filter by category"
              >
                <option value="all">All Categories</option>
                {availableCategories.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
              
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => handleFilterChange(setSortBy, e.target.value)}
                className="px-3 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#0152be]/50"
                aria-label="Sort nominees"
              >
                <option value="votes">Most Votes</option>
                <option value="views">Most Viewed</option>
                <option value="name">Name (A-Z)</option>
                <option value="newest">Newest First</option>
              </select>
              
              {/* Featured Toggle */}
              <button
                onClick={handleFeaturedToggle}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border transition-all ${
                  showFeaturedOnly 
                    ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400' 
                    : 'bg-gray-800/50 border-gray-700 text-gray-400 hover:border-gray-600'
                }`}
              >
                <Star className={`w-4 h-4 ${showFeaturedOnly ? 'fill-current' : ''}`} />
                Featured
              </button>
            </div>
            
            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-gray-800/50 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-[#0152be] text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
                aria-label="Grid view"
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-[#0152be] text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
                aria-label="List view"
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Nominees Grid/List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-400">
              Showing{' '}
              <span className="text-white font-medium">
                {((currentPage - 1) * ITEMS_PER_PAGE) + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, filteredNominees.length)}
              </span>{' '}
              of <span className="text-white font-medium">{filteredNominees.length}</span> nominees
              {searchQuery && (
                <span> for &quot;<span className="text-[#0152be]">{searchQuery}</span>&quot;</span>
              )}
            </p>
            {totalPages > 1 && (
              <p className="text-gray-500 text-sm">
                Page {currentPage} of {totalPages}
              </p>
            )}
          </div>
          
          {isLoading ? (
            // Loading skeletons
            viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                  <NomineeCardSkeleton key={index} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                  <NomineeRowSkeleton key={index} />
                ))}
              </div>
            )
          ) : filteredNominees.length === 0 ? (
            <GlassCard className="p-12 text-center">
              <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No Nominees Found</h3>
              <p className="text-gray-400 mb-6">
                {searchQuery 
                  ? `No nominees match your search for "${searchQuery}"`
                  : 'No nominees match your current filters'}
              </p>
              <button
                onClick={() => {
                  handleSearchChange('');
                  handleFilterChange(setSelectedEvent, 'all');
                  handleFilterChange(setSelectedCategory, 'all');
                  handleFilterChange(setSelectedStatus, 'all');
                  setShowFeaturedOnly(false);
                }}
                className="px-4 py-2 bg-[#0152be] text-white rounded-lg hover:bg-[#0152be]/90 transition-colors"
              >
                Clear Filters
              </button>
            </GlassCard>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedNominees.map(nominee => (
                <NomineeCard key={nominee._id} nominee={nominee} events={events} categories={categories} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {paginatedNominees.map(nominee => (
                <NomineeRow key={nominee._id} nominee={nominee} events={events} categories={categories} />
              ))}
            </div>
          )}
          
          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#0152be]/20 to-sky-500/20 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Want to Become a Nominee?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            If you believe you have what it takes to make a difference, submit your nomination today.
            Join our community of outstanding nominees and let your voice be heard.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0152be] text-white font-semibold rounded-lg hover:bg-[#0152be]/90 transition-colors"
            >
              <Award className="w-5 h-5" />
              Browse Events
            </Link>
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors border border-white/20"
            >
              <Trophy className="w-5 h-5" />
              View Categories
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Banners */}
      <section className="container mx-auto px-6 pb-16">
        <PromoBanner variant="card" />
      </section>
      
      <Footer />
    </div>
  );
}
