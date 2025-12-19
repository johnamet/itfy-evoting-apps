"use client";
import { useEffect, useState } from 'react';
import { eventsApi } from '../../lib/api';
import type { Event } from '../../types';

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const resp = await eventsApi.getPublicEvents({ page: 1, limit: 12 });
      if (Array.isArray((resp as any).data)) {
        // eventsApi.getPublicEvents returns EventsListResponse directly
        // but some layers use ApiResponse wrapper; handle both
        const maybe = resp as any;
        if (maybe.data && Array.isArray(maybe.data)) {
          setEvents(maybe.data as Event[]);
        } else if (maybe instanceof Array) {
          setEvents(maybe as Event[]);
        }
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to load events');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return { events, loading, error, reload: load };
}
