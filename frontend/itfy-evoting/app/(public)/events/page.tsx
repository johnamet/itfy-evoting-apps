'use client';

import { format } from 'date-fns';
import { Calendar, MapPin, Trophy, ArrowRight, Clock, Users, Search, Grid, List } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnnouncementBar from '@/components/AnnouncementBar';
import PromoBanner from '@/components/PromoBanner';
import { mockEvents } from '@/lib/mocks/events';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useMemo } from 'react';

type ViewMode = 'grid' | 'list';
type FilterStatus = 'all' | 'active' | 'upcoming' | 'archived';

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const filteredEvents = useMemo(() => {
    return mockEvents
      .filter(event => event.is_published)
      .filter(event => {
        if (statusFilter === 'all') return true;
        return event.status === statusFilter;
      })
      .filter(event => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return (
          event.name.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query) ||
          event.location?.city?.toLowerCase().includes(query)
        );
      })
      .sort((a, b) => {
        // Featured first, then by date
        if (a.is_featured && !b.is_featured) return -1;
        if (!a.is_featured && b.is_featured) return 1;
        return new Date(b.start_date).getTime() - new Date(a.start_date).getTime();
      });
  }, [searchQuery, statusFilter]);

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'upcoming': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'archived': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Voting Open';
      case 'upcoming': return 'Coming Soon';
      case 'archived': return 'Ended';
      default: return status;
    }
  };

  const statusOptions: { value: FilterStatus; label: string }[] = [
    { value: 'all', label: 'All Events' },
    { value: 'active', label: 'Active' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'archived', label: 'Past Events' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <AnnouncementBar />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c2d5a]/50 via-gray-900 to-gray-900" />
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#0152be]/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10 mb-6">
              <Calendar className="w-5 h-5 text-[#0152be]" />
              <span className="text-white font-medium">Events & Awards</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Discover Tech
              <span className="block mt-2 bg-gradient-to-r from-[#0152be] via-sky-400 to-cyan-400 bg-clip-text text-transparent">
                Events & Awards
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 leading-relaxed">
              Browse our collection of tech events, award ceremonies, and innovation showcases 
              celebrating Ghana&apos;s brightest young minds.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="container mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
          {/* Search */}
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#0152be] transition"
            />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Status Filter */}
            <div className="flex items-center gap-2 bg-white/5 rounded-xl p-1">
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setStatusFilter(option.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    statusFilter === option.value
                      ? 'bg-gradient-to-r from-[#0152be] to-sky-500 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-1 bg-white/5 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
                className={`p-2 rounded-lg transition ${
                  viewMode === 'grid' ? 'bg-white/20 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                aria-label="List view"
                className={`p-2 rounded-lg transition ${
                  viewMode === 'list' ? 'bg-white/20 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mt-6 text-gray-400">
          Showing <span className="text-white font-semibold">{filteredEvents.length}</span> events
        </div>
      </section>

      {/* Events Grid/List */}
      <section className="container mx-auto px-6 py-8">
        {filteredEvents.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
              <Clock className="w-12 h-12 text-gray-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No events found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <Link href={`/events/${event.slug}`} key={event._id}>
                <GlassCard className="group h-full flex flex-col hover:shadow-2xl hover:shadow-[#0152be]/20 transition-all duration-500">
                  {/* Event Banner */}
                  <div className="relative h-56 overflow-hidden rounded-t-2xl">
                    <Image
                      src={event.banner_url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2940&auto=format&fit=crop'}
                      alt={event.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    
                    {/* Featured Badge */}
                    {event.is_featured && (
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-xl">
                        <Trophy className="w-4 h-4" />
                        Featured
                      </div>
                    )}

                    {/* Status Badge */}
                    <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusColor(event.status)}`}>
                      {getStatusLabel(event.status)}
                    </div>

                    {/* Vote Count */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                      <div className="bg-gradient-to-r from-[#0152be] to-sky-500 backdrop-blur-xl px-6 py-3 rounded-xl border border-white/30 shadow-xl">
                        <div className="flex items-center gap-2">
                          <Users className="w-5 h-5 text-white" />
                          <div className="text-lg font-bold text-white">
                            {(event.total_votes / 1000).toFixed(1)}K Votes
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-[#0152be] transition-colors">
                      {event.name}
                    </h3>
                    
                    <p className="text-gray-400 mb-6 line-clamp-2 flex-1 text-sm">
                      {event.description}
                    </p>

                    {/* Meta Info */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-gray-300 text-sm">
                        <Calendar className="w-4 h-4 text-[#0152be]" />
                        <span>{formatDate(event.start_date)}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-3 text-gray-300 text-sm">
                          <MapPin className="w-4 h-4 text-[#0152be]" />
                          <span>{event.location.city}, {event.location.country}</span>
                        </div>
                      )}
                    </div>

                    {/* CTA */}
                    <Button className="w-full bg-gradient-to-r from-[#0152be] to-sky-500 hover:from-blue-700 hover:to-sky-600 group/btn">
                      View Event
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEvents.map((event) => (
              <Link href={`/events/${event.slug}`} key={event._id}>
                <GlassCard className="group hover:shadow-xl hover:shadow-[#0152be]/10 transition-all duration-300">
                  <div className="flex flex-col md:flex-row gap-6 p-4">
                    {/* Event Image */}
                    <div className="relative w-full md:w-64 h-48 md:h-40 overflow-hidden rounded-xl flex-shrink-0">
                      <Image
                        src={event.banner_url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2940&auto=format&fit=crop'}
                        alt={event.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {event.is_featured && (
                        <div className="absolute top-2 left-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                          <Trophy className="w-3 h-3" />
                          Featured
                        </div>
                      )}
                    </div>

                    {/* Event Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-white group-hover:text-[#0152be] transition-colors">
                            {event.name}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(event.status)}`}>
                            {getStatusLabel(event.status)}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                          {event.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-6">
                        <div className="flex items-center gap-2 text-gray-300 text-sm">
                          <Calendar className="w-4 h-4 text-[#0152be]" />
                          <span>{formatDate(event.start_date)}</span>
                        </div>
                        {event.location && (
                          <div className="flex items-center gap-2 text-gray-300 text-sm">
                            <MapPin className="w-4 h-4 text-[#0152be]" />
                            <span>{event.location.city}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-[#0152be] text-sm font-semibold">
                          <Users className="w-4 h-4" />
                          <span>{event.total_votes.toLocaleString()} votes</span>
                        </div>
                      </div>
                    </div>

                    {/* Action */}
                    <div className="flex items-center">
                      <Button className="bg-gradient-to-r from-[#0152be] to-sky-500 hover:from-blue-700 hover:to-sky-600 whitespace-nowrap">
                        View Event
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Promotional Banner */}
      <section className="container mx-auto px-6 pb-16">
        <PromoBanner variant="compact" className="rounded-2xl overflow-hidden" />
      </section>

      <Footer />
    </div>
  );
}
