'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Bell, ArrowRight, Clock } from 'lucide-react';
import { mockSlides } from '@/lib/mocks/slides';
import type { Slide } from '@/types';

interface AnnouncementBarProps {
  /** Filter to specific announcement IDs */
  slideIds?: string[];
  /** Whether the bar can be dismissed */
  dismissible?: boolean;
  /** Position: top or bottom */
  position?: 'top' | 'bottom';
  /** Auto-rotate through multiple announcements */
  autoRotate?: boolean;
  /** Rotation interval in ms */
  rotateInterval?: number;
}

export default function AnnouncementBar({
  slideIds,
  dismissible = true,
  position = 'top',
  autoRotate = true,
  rotateInterval = 5000,
}: AnnouncementBarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter announcement slides
  const announcements = mockSlides.filter(
    (s): s is Slide =>
      s.slide_type === 'announcement' &&
      s.status === 'active' &&
      (slideIds ? slideIds.includes(s._id) : true)
  );

  // Auto-rotate announcements
  useEffect(() => {
    if (!autoRotate || announcements.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, rotateInterval);

    return () => clearInterval(interval);
  }, [autoRotate, announcements.length, rotateInterval]);

  // Check localStorage for dismissed state
  useEffect(() => {
    const dismissed = localStorage.getItem('announcement-dismissed');
    if (dismissed) {
      const dismissedTime = new Date(dismissed);
      const now = new Date();
      // Re-show after 24 hours
      if (now.getTime() - dismissedTime.getTime() < 24 * 60 * 60 * 1000) {
        setIsVisible(false);
      }
    }
  }, []);

  if (!isVisible || announcements.length === 0) return null;

  const currentAnnouncement = announcements[currentIndex];

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('announcement-dismissed', new Date().toISOString());
  };

  const positionClasses = position === 'top' 
    ? 'top-0' 
    : 'bottom-0';

  return (
    <div
      className={`fixed left-0 right-0 z-[60] ${positionClasses} animate-in slide-in-from-top duration-500`}
    >
      <div 
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(90deg, #0152be 0%, #0ea5e9 50%, #0152be 100%)`,
        }}
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBjeD0iMjAiIGN5PSIyMCIgcj0iMiIvPjwvZz48L3N2Zz4=')] opacity-30" />
        
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4 py-3 relative">
            {/* Icon */}
            <div className="flex items-center gap-2 text-white/90">
              <Bell className="w-4 h-4 animate-pulse" />
            </div>

            {/* Content */}
            <div className="flex items-center gap-3 text-white">
              <span className="font-semibold text-sm md:text-base">
                {currentAnnouncement.title}
              </span>
              
              {currentAnnouncement.button && (
                <Link
                  href={currentAnnouncement.button.url}
                  className="inline-flex items-center gap-1 bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-sm font-medium transition-all hover:gap-2"
                >
                  {currentAnnouncement.button.text}
                  <ArrowRight className="w-3 h-3" />
                </Link>
              )}
            </div>

            {/* Multiple announcements indicator */}
            {announcements.length > 1 && (
              <div className="hidden md:flex items-center gap-1 ml-4">
                {announcements.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentIndex ? 'bg-white w-4' : 'bg-white/40 hover:bg-white/60'
                    }`}
                    aria-label={`Go to announcement ${idx + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Dismiss button */}
            {dismissible && (
              <button
                onClick={handleDismiss}
                className="absolute right-4 p-1 text-white/70 hover:text-white hover:bg-white/20 rounded transition-all"
                aria-label="Dismiss announcement"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Progress bar for auto-rotate */}
        {autoRotate && announcements.length > 1 && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20">
            <div 
              className="h-full bg-white/60 transition-all"
              style={{
                width: `${((currentIndex + 1) / announcements.length) * 100}%`,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
