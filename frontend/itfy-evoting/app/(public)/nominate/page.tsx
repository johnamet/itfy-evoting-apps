'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  Award,
  Users,
  Calendar,
  Clock,
  FileText,
  Loader2,
  Search,
  Filter,
  Sparkles,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formsApi } from '@/lib/api/forms';
import type { Form, Event, Category } from '@/types';
import NominationFormModal from '@/components/NominationFormModal';
import Image from 'next/image';
import { format, isValid } from 'date-fns';

export default function NominatePage() {
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<string>('all');
  const [selectedForm, setSelectedForm] = useState<Form | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await formsApi.getPublicNominationForms();
        if (response.success && response.data) {
          setForms(response.data);
        } else {
          setError('No nomination forms available at this time.');
        }
      } catch (err) {
        console.error('Error fetching nomination forms:', err);
        setError('Failed to load nomination forms. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, []);

  // Extract unique events safely
  const events = useMemo(() => {
    const eventMap = new Map<string, Event>();
    forms.forEach((form) => {
      const event = typeof form.event === 'object' ? (form.event as Event) : null;
      if (event && !eventMap.has(event._id)) {
        eventMap.set(event._id, event);
      }
    });
    return Array.from(eventMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }, [forms]);

  // Filtered forms
  const filteredForms = useMemo(() => {
    let filtered = forms;

    if (selectedEvent !== 'all') {
      filtered = filtered.filter((form) => {
        const event = typeof form.event === 'object' ? (form.event as Event) : null;
        return event?._id === selectedEvent;
      });
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((form) => {
        const eventName =
          typeof form.event === 'object' ? (form.event as Event).name?.toLowerCase() : '';
        const formName = form.name?.toLowerCase() || '';
        const description = form.description?.toLowerCase() || '';
        const categoryNames = (form.categories as Category[] | undefined)
          ?.map((cat) => cat.name?.toLowerCase())
          .join(' ') || '';

        return (
          eventName.includes(query) ||
          formName.includes(query) ||
          description.includes(query) ||
          categoryNames.includes(query)
        );
      });
    }

    return filtered;
  }, [forms, searchQuery, selectedEvent]);

  // Group forms by event
  const formsByEvent = useMemo(() => {
    const grouped = new Map<string, { event: Event; forms: Form[] }>();

    filteredForms.forEach((form) => {
      const event = typeof form.event === 'object' ? (form.event as Event) : null;
      if (event) {
        if (!grouped.has(event._id)) {
          grouped.set(event._id, { event, forms: [] });
        }
        grouped.get(event._id)!.forms.push(form);
      }
    });

    return Array.from(grouped.values());
  }, [filteredForms]);

  const handleFormClick = (form: Form) => {
    setSelectedForm(form);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedForm(null);
  };

  const formatDate = (date: string | Date | null | undefined) => {
    if (!date) return 'Date TBD';
    const parsed = typeof date === 'string' ? new Date(date) : date;
    return isValid(parsed) ? format(parsed, 'MMMM d, yyyy') : 'Invalid Date';
  };

  const formatDeadline = (date: string | null | undefined) => {
    if (!date) return 'No deadline';
    const parsed = new Date(date);
    return isValid(parsed) ? format(parsed, 'MMM d, yyyy') : 'Invalid Date';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950">
      <Header />

      <main className="container mx-auto px-4 pt-28 pb-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-500/30 rounded-full mb-6">
            <Sparkles className="w-5 h-5 text-purple-300" />
            <span className="text-sm font-medium text-purple-200">Nominations Now Open</span>
            <Sparkles className="w-5 h-5 text-pink-300" />
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300">
            Nominate Excellence
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Recognize outstanding individuals and contributions by submitting a nomination.
            Your voice helps celebrate achievement and inspire others.
          </p>
        </div>

        {/* Search & Filter */}
        <GlassCard className="mb-10 p-8 backdrop-blur-md border-purple-500/20">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-300" />
              <Input
                type="text"
                placeholder="Search by event, form, category, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-6 py-6 text-lg bg-white/5 border-white/10 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
              />
            </div>

            <div className="relative min-w-[240px]">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-300 pointer-events-none" />
              <select
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
                aria-label="Filter by event"
                className="w-full pl-12 pr-10 py-6 bg-white/5 border border-white/10 rounded-xl text-white text-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500/50 backdrop-blur-sm bg-[right_1rem_center] bg-no-repeat bg-[length:1.2em]"
              >
                <option value="all">All Events</option>
                {events.map((event) => (
                  <option key={event._id} value={event._id}>
                    {event.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                  className="w-5 h-5"
                >
                  <path
                    stroke="#6b7280"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="m6 8 4 4 4-4"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="mt-6 text-sm text-purple-200">
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading nomination forms...
              </span>
            ) : (
              <span>
                Showing{' '}
                <span className="font-semibold text-purple-300">
                  {filteredForms.length}
                </span>{' '}
                nomination {filteredForms.length === 1 ? 'form' : 'forms'}
              </span>
            )}
          </div>
        </GlassCard>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <GlassCard
                key={i}
                className="p-8 animate-pulse bg-white/5 border-white/10"
              >
                <div className="h-6 bg-white/10 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-white/5 rounded w-full mb-2"></div>
                <div className="h-4 bg-white/5 rounded w-5/6"></div>
              </GlassCard>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <GlassCard className="p-12 text-center max-w-2xl mx-auto">
            <div className="text-6xl mb-6">⚠️</div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Something went wrong
            </h3>
            <p className="text-slate-300 mb-8">{error}</p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-6 text-lg"
            >
              Retry
            </Button>
          </GlassCard>
        )}

        {/* No Results */}
        {!loading && !error && formsByEvent.length === 0 && (
          <GlassCard className="p-16 text-center max-w-2xl mx-auto">
            <FileText className="w-20 h-20 text-purple-400/30 mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-white mb-4">
              No Nomination Forms Found
            </h3>
            <p className="text-lg text-slate-300">
              {searchQuery || selectedEvent !== 'all'
                ? 'Try adjusting your search or filters to find available forms.'
                : 'There are currently no open nomination forms. Please check back soon!'}
            </p>
          </GlassCard>
        )}

        {/* Forms by Event */}
        {!loading && !error && formsByEvent.map(({ event, forms: eventForms }) => (
          <section key={event._id} className="mb-16">
            {/* Event Banner/Header */}
            <div className="relative overflow-hidden rounded-3xl mb-10">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm z-10" />
              {event.banner_url || event.cover_image ? (
                <Image
                  src={event.banner_url || event.cover_image || ''}
                  alt={event.name}
                  fill
                  className="object-cover brightness-50"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-800 to-pink-800" />
              )}
              <div className="relative z-20 p-10 md:p-16">
                <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
                  {event.name}
                </h2>
                {event.description && (
                  <p className="text-xl text-slate-200 max-w-3xl drop-shadow-md">
                    {event.description}
                  </p>
                )}
                {event.start_date && (
                  <div className="flex items-center gap-3 text-lg text-purple-200 mt-6">
                    <Calendar className="w-6 h-6" />
                    <span>
                      {formatDate(event.start_date)}
                      {event.end_date && ` – ${formatDate(event.end_date)}`}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Forms Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {eventForms.map((form) => (
                <GlassCard
                  key={form._id}
                  className="group relative overflow-hidden p-8 hover:scale-105 hover:border-purple-400/60 transition-all duration-500 cursor-pointer border-2 border-transparent backdrop-blur-xl"
                  onClick={() => handleFormClick(form)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all">
                          {form.name}
                        </h3>
                        {form.description && (
                          <p className="text-slate-300 line-clamp-3">
                            {form.description}
                          </p>
                        )}
                      </div>
                      <Award className="w-10 h-10 text-purple-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    </div>

                    {/* Categories */}
                    {Array.isArray(form.categories) && form.categories.length > 0 && typeof form.categories[0] === 'object' && (
                      <div className="mb-6">
                        <div className="flex items-center gap-2 text-sm text-purple-300 mb-3">
                          <Users className="w-4 h-4" />
                          <span>Award Categories</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {((form.categories as unknown as Category[]) || []).slice(0, 4).map((cat) => (
                            <span
                              key={cat._id || cat.name}
                              className="px-3 py-1.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 text-purple-200 text-xs rounded-full backdrop-blur-sm"
                            >
                              {cat.name}
                            </span>
                          ))}
                          {((form.categories as unknown as Category[]) || []).length > 4 && (
                            <span className="px-3 py-1.5 bg-slate-700/50 text-slate-300 text-xs rounded-full">
                              +{((form.categories as unknown as Category[]) || []).length - 4}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Meta */}
                    <div className="flex flex-wrap gap-6 text-sm text-slate-400 pt-6 border-t border-white/10">
                      {form.fields?.length > 0 && (
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          <span>{form.fields.length} fields</span>
                        </div>
                      )}
                      {form.settings?.closes_at && (
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>Due {formatDeadline(form.settings.closes_at)}</span>
                        </div>
                      )}
                    </div>

                    <Button
                      className="w-full mt-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-6 text-lg shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFormClick(form);
                      }}
                    >
                      Nominate Now
                    </Button>
                  </div>
                </GlassCard>
              ))}
            </div>
          </section>
        ))}
      </main>

      <Footer />

      {/* Modal */}
      {selectedForm && (
        <NominationFormModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          form={selectedForm}
        />
      )}
    </div>
  );
}