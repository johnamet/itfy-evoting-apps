import React from 'react';
import type { Event } from '../../types';
import Link from 'next/link';

export default function EventCard({ event }: { event?: Event }) {
  if (!event) {
    return (
      <article className="border rounded p-4 shadow-sm">
        <div className="h-40 bg-gray-100 rounded mb-3" />
        <h3 className="text-lg font-semibold">Event Title</h3>
        <p className="text-sm text-gray-600">Short description of the event.</p>
      </article>
    );
  }

  return (
    <article className="border rounded p-4 shadow-sm">
      {event.cover_url ? (
        <div className="h-40 bg-cover bg-center rounded mb-3" style={{ backgroundImage: `url(${event.cover_url})` }} />
      ) : (
        <div className="h-40 bg-gray-100 rounded mb-3" />
      )}
      <h3 className="text-lg font-semibold">
        <Link href={`/events/${event.slug || event._id}`}>
          <span>{event.name}</span>
        </Link>
      </h3>
      {event.start_date && (
        <div className="text-sm text-gray-500">{new Date(event.start_date).toLocaleString()}</div>
      )}
      {event.short_description && (
        <p className="text-sm text-gray-600 mt-2">{event.short_description}</p>
      )}
    </article>
  );
}
