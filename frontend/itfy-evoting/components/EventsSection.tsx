'use client';

import { useMemo } from 'react';
import { format } from 'date-fns';
import { Calendar, MapPin, Trophy, ArrowRight, Clock, Users, Loader2, AlertCircle } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { usePublicEvents, useSlidesByType } from '@/hooks/usePublicData';
import Link from 'next/link';
import Image from 'next/image';
import type { Event } from '@/types';

// Skeleton loader for event cards
function EventCardSkeleton() {
  return (
    <GlassCard className="h-full flex flex-col animate-pulse">
      <div className="relative h-64 overflow-hidden rounded-t-2xl bg-gray-800" />
      <div className="p-8 flex-1 flex flex-col">
        <div className="h-8 bg-gray-700 rounded-lg mb-4 w-3/4" />
        <div className="space-y-2 mb-8 flex-1">
          <div className="h-4 bg-gray-700 rounded w-full" />
          <div className="h-4 bg-gray-700 rounded w-5/6" />
          <div className="h-4 bg-gray-700 rounded w-4/6" />
        </div>
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gray-700" />
            <div className="h-4 bg-gray-700 rounded w-32" />
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gray-700" />
            <div className="h-4 bg-gray-700 rounded w-28" />
          </div>
        </div>
        <div className="h-14 bg-gray-700 rounded-xl" />
      </div>
    </GlassCard>
  );
}

export default function EventsSection() {
  // Fetch public events from API
  const { data: eventsData, isLoading: isLoadingEvents, error: eventsError } = usePublicEvents({ limit: 6 });
  
  // Fetch banner slides
  const { data: bannerSlides, isLoading: isLoadingBanner } = useSlidesByType('banner');

  // Get the first active banner slide
  const bannerSlide = useMemo(() => {
    return bannerSlides?.find(s => s.status === 'active');
  }, [bannerSlides]);

  // Process and sort events
  const activeEvents = useMemo(() => {
    if (!eventsData?.data) return [];
    
    return eventsData.data
      .filter((event: Event) => (event.status === 'active' || event.status === 'upcoming') && event.is_published)
      .sort((a: Event, b: Event) => {
        if (a.is_featured && !b.is_featured) return -1;
        if (!a.is_featured && b.is_featured) return 1;
        return (b.total_votes || 0) - (a.total_votes || 0);
      });
  }, [eventsData]);

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy');
  };

  const formatVotes = (votes: number | undefined) => {
    if (!votes) return '0';
    if (votes >= 1000) return `${(votes / 1000).toFixed(1)}K`;
    return votes.toString();
  };

  const getEventTypeLabel = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ');
  };

  return (
    <section id="events" className="py-32 relative overflow-hidden bg-gradient-to-b from-gray-900 via-itfy-navy/20 to-gray-900">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-itfy-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-itfy-300/10 rounded-full blur-3xl" />

      {/* Optional Banner */}
      {bannerSlide && !isLoadingBanner && (
        <div className="relative h-80 mb-20 container mx-auto px-6">
          <div className="relative h-full rounded-3xl overflow-hidden">
            <img
              src={bannerSlide.image.url}
              alt={bannerSlide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-12">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 bg-yellow-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-yellow-500/30 mb-4">
                    <Trophy className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-300 text-sm font-semibold">SPECIAL EVENT</span>
                  </div>
                  <h2 className="text-5xl font-bold text-white mb-4">{bannerSlide.title}</h2>
                  <p className="text-xl text-gray-200 mb-6">{bannerSlide.subtitle}</p>
                  {bannerSlide.button && (
                    <Link href={bannerSlide.button.url || '/events'}>
                      <Button size="lg" className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                        {bannerSlide.button.text}
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-itfy-primary/10 backdrop-blur-sm px-6 py-3 rounded-full border border-itfy-primary/20 mb-6">
            <Calendar className="w-5 h-5 text-itfy-300" />
            <span className="text-itfy-300 font-medium">Featured Events</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Upcoming Tech
            <span className="block mt-2 bg-gradient-to-r from-itfy-light-blue via-itfy-300 to-itfy-primary bg-clip-text text-transparent">
              Awards & Summits
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join the movement celebrating Ghana's brightest young tech minds through awards, summits, and innovation showcases
          </p>
        </div>

        {/* Loading State */}
        {isLoadingEvents && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <EventCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Error State */}
        {eventsError && !isLoadingEvents && (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center">
              <AlertCircle className="w-12 h-12 text-red-400" />
            </div>
            <p className="text-gray-400 text-xl mb-4">Unable to load events</p>
            <p className="text-gray-500 text-sm">Please try again later</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoadingEvents && !eventsError && activeEvents.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
              <Clock className="w-12 h-12 text-gray-500" />
            </div>
            <p className="text-gray-400 text-xl">No active events at the moment. Stay tuned!</p>
          </div>
        )}

        {/* Events Grid */}
        {!isLoadingEvents && !eventsError && activeEvents.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeEvents.map((event: Event) => (
              <GlassCard key={event._id} className="group h-full flex flex-col hover:shadow-2xl hover:shadow-itfy-primary/20 transition-all duration-500">
                {/* Event Banner - Taller for impact */}
                <div className="relative h-64 overflow-hidden rounded-t-2xl">
                  <img
                    src={event.banner_url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2940&auto=format&fit=crop'}
                    alt={event.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  
                  {/* Featured Badge */}
                  {event.is_featured && (
                    <div className="absolute top-6 left-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-5 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-xl">
                      <Trophy className="w-5 h-5" />
                      Featured
                    </div>
                  )}

                  {/* Event Type Badge */}
                  {event.event_type && (
                    <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                      <span className="text-white text-sm font-medium">{getEventTypeLabel(event.event_type)}</span>
                    </div>
                  )}

                  {/* Prominent Vote Badge - Centered at bottom */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                    <div className="bg-gradient-to-r from-itfy-primary to-itfy-600 backdrop-blur-xl px-8 py-5 rounded-2xl border border-white/30 shadow-2xl">
                      <div className="flex items-center gap-3">
                        <Users className="w-8 h-8 text-white" />
                        <div className="text-left">
                          <div className="text-3xl font-bold text-white">
                            {formatVotes(event.total_votes)}
                          </div>
                          <div className="text-sm text-gray-200">Votes Cast</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold text-white mb-4 line-clamp-2 group-hover:text-itfy-300 transition-colors">
                    {event.name}
                  </h3>
                  
                  <p className="text-gray-300 mb-8 line-clamp-3 flex-1">
                    {event.description}
                  </p>

                  {/* Meta Info - More spacious */}
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-4 text-gray-300">
                      <div className="w-10 h-10 rounded-xl bg-itfy-primary/20 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-itfy-300" />
                      </div>
                      <span className="text-base">{formatDate(event.start_date)} - {formatDate(event.end_date)}</span>
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-4 text-gray-300">
                        <div className="w-10 h-10 rounded-xl bg-itfy-400/20 flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-itfy-400" />
                        </div>
                        <span className="text-base">{event.location.city}, {event.location.country}</span>
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <Link href={`/events/${event.slug}`} className="mt-auto">
                    <Button className="w-full py-7 text-lg bg-gradient-to-r from-itfy-primary to-itfy-600 hover:from-itfy-600 hover:to-itfy-700 group/btn shadow-lg">
                      View Event & Vote
                      <ArrowRight className="ml-3 w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </GlassCard>
            ))}
          </div>
        )}

        {/* View All Button */}
        {!isLoadingEvents && activeEvents.length > 0 && eventsData?.pagination?.hasNextPage && (
          <div className="text-center mt-16">
            <Link href="/events">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-10 py-7 text-lg">
                View All Events
                <ArrowRight className="ml-3 w-5 h-5" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}