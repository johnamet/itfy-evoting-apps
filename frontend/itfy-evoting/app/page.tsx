'use client';

import HeroCarousel from '@/components/HeroCarousel';
import AboutSection from '@/components/AboutSection';
import EventsSection from '@/components/EventsSection';
import CategoriesSection from '@/components/CategoriesSection';
import CandidatesSection from '@/components/CandidatesSection';
import NominationSection from '@/components/NominationSection';
import ContactSection from '@/components/ContactSection';
import Header from '@/components/Header';
import AnnouncementBar from '@/components/AnnouncementBar';
import PromoBanner from '@/components/PromoBanner';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Announcement Bar - sticky at top for urgent messages */}
      <AnnouncementBar />
      
      <Header />
      <HeroCarousel />
      <AboutSection />
      <EventsSection />
      
      {/* Promotional Banner - between sections for featured events/campaigns */}
      <PromoBanner variant="full" />
      
      <CategoriesSection />
      <CandidatesSection />
      <NominationSection />
      <ContactSection />
    </div>
  );
}