'use client';

import HeroCarousel from '@/components/HeroCarousel';
import AboutSection from '@/components/AboutSection';
import EventsSection from '@/components/EventsSection';
import CategoriesSection from '@/components/CategoriesSection';
import CandidatesSection from '@/components/CandidatesSection';
import NominationSection from '@/components/NominationSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function HomePage() {
  // Keep your backend health check here if needed

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <HeroCarousel />
      <AboutSection />
      <EventsSection />
      <CategoriesSection />
      <CandidatesSection />
      <NominationSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
