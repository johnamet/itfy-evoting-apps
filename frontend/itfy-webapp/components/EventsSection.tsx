'use client';

import { format } from 'date-fns';
import { Calendar, MapPin, Trophy, ArrowRight, Clock, Users } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { mockEvents } from '@/lib/mocks/events';
import { mockSlides } from '@/lib/mocks/slides';
import Link from 'next/link';
import Image from 'next/image';

export default function EventsSection() {
  const bannerSlide = mockSlides.find(
    s => s.slide_type === 'banner' && s.status === 'active'
  );

  const activeEvents = mockEvents
    .filter(event => event.status === 'active' && event.is_published)
    .sort((a, b) => {
      if (a.is_featured && !b.is_featured) return -1;
      if (!a.is_featured && b.is_featured) return 1;
      return b.total_votes - a.total_votes;
    });

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy');
  };

  const getEventTypeLabel = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ');
  };

  return (
    <section className="py-32 relative overflow-hidden bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

      {/* Optional Banner */}
      {bannerSlide && (
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
                    <Button size="lg" className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                      {bannerSlide.button.text}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
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
          <div className="inline-flex items-center gap-2 bg-blue-500/10 backdrop-blur-sm px-6 py-3 rounded-full border border-blue-500/20 mb-6">
            <Calendar className="w-5 h-5 text-blue-400" />
            <span className="text-blue-300 font-medium">Featured Events</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Upcoming Tech
            <span className="block mt-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Awards & Summits
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join the movement celebrating Ghana's brightest young tech minds through awards, summits, and innovation showcases
          </p>
        </div>

        {/* Events Grid */}
        {activeEvents.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
              <Clock className="w-12 h-12 text-gray-500" />
            </div>
            <p className="text-gray-400 text-xl">No active events at the moment. Stay tuned!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeEvents.map((event) => (
              <GlassCard key={event._id} className="group h-full flex flex-col hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500">
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
                  <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                      {/* Add badge or label here if needed, but remove stray <Image> tag */}
                  </div>

                  {/* Prominent Vote Badge - Centered at bottom */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 backdrop-blur-xl px-8 py-5 rounded-2xl border border-white/30 shadow-2xl">
                      <div className="flex items-center gap-3">
                        <Users className="w-8 h-8 text-white" />
                        <div className="text-left">
                          <div className="text-3xl font-bold text-white">
                            {(event.total_votes / 1000).toFixed(1)}K
                          </div>
                          <div className="text-sm text-gray-200">Votes Cast</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold text-white mb-4 line-clamp-2 group-hover:text-purple-300 transition-colors">
                    {event.name}
                  </h3>
                  
                  <p className="text-gray-300 mb-8 line-clamp-3 flex-1">
                    {event.description}
                  </p>

                  {/* Meta Info - More spacious */}
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-4 text-gray-300">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-purple-400" />
                      </div>
                      <span className="text-base">{formatDate(event.start_date)} - {formatDate(event.end_date)}</span>
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-4 text-gray-300">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-blue-400" />
                        </div>
                        <span className="text-base">{event.location.city}, {event.location.country}</span>
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <Link href={`/events/${event.slug}`} className="mt-auto">
                    <Button className="w-full py-7 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 group/btn shadow-lg">
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
        {activeEvents.length > 6 && (
          <div className="text-center mt-16">
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-10 py-7 text-lg">
              View All Events
              <ArrowRight className="ml-3 w-5 h-5" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}