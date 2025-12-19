"use client";
import React from 'react';
import { useEvents } from '../../hooks/useEvents';
import EventCard from '../../components/EventCard';

export default function EventsPage() {
  const { events, loading, error, reload } = useEvents();

  return (
    <section className="container mx-auto p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Events</h1>
        <div>
          <button onClick={() => reload()} className="text-sm text-blue-600">Refresh</button>
        </div>
      </div>

      {loading && <div className="mt-6">Loading events...</div>}
      {error && <div className="mt-6 text-red-600">{error}</div>}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {events.length === 0 ? (
            <div className="text-gray-600">No events found.</div>
          ) : (
            events.map((ev) => <EventCard key={ev._id || ev.slug} event={ev} />)
          )}
        </div>
      )}
    </section>
  );
}
