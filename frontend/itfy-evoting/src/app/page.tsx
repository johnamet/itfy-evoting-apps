import React from 'react';
import HeroSlider from '../../components/HeroSlider';
import EventCard from '../../components/EventCard';

export default function HomePage() {
  return (
    <section className="container mx-auto p-6">
      <HeroSlider />
      <section className="mt-8">
        <h2 className="text-2xl font-semibold">Featured Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <EventCard />
          <EventCard />
          <EventCard />
        </div>
      </section>
    </section>
  );
}
