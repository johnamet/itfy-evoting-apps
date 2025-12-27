'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSlidesByType } from '@/hooks/usePublicData';
import type { Slide } from '@/types';
import { cn } from '@/lib/utils';

interface PromoBannerProps {
  /** Filter to specific banner IDs */
  slideIds?: string[];
  /** Layout variant */
  variant?: 'full' | 'compact' | 'card';
  /** Show navigation arrows */
  showNavigation?: boolean;
  /** Auto-rotate banners */
  autoRotate?: boolean;
  /** Rotation interval in ms */
  rotateInterval?: number;
  /** Additional class names */
  className?: string;
}

export default function PromoBanner({
  slideIds,
  variant = 'full',
  showNavigation = true,
  autoRotate = true,
  rotateInterval = 6000,
  className,
}: PromoBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Fetch banner slides from API
  const { data: slides, isLoading } = useSlidesByType('banner');

  // Filter banner slides
  const banners = useMemo(() => {
    const slidesList = slides || [];
    return slidesList.filter(
      (s: Slide) =>
        s.status === 'active' &&
        (slideIds ? slideIds.includes(s._id) : true)
    );
  }, [slides, slideIds]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  }, [banners.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  }, [banners.length]);

  // Auto-rotate banners
  useEffect(() => {
    if (!autoRotate || banners.length <= 1 || isHovered) return;

    const interval = setInterval(goToNext, rotateInterval);
    return () => clearInterval(interval);
  }, [autoRotate, banners.length, rotateInterval, isHovered, goToNext]);

  // Show loading state
  if (isLoading) {
    return (
      <div className={cn("flex items-center justify-center h-[250px] bg-gray-800/50 rounded-2xl", className)}>
        <Loader2 className="w-8 h-8 text-[#0152be] animate-spin" />
      </div>
    );
  }

  if (banners.length === 0) return null;

  const currentBanner = banners[currentIndex];

  // Full-width banner variant
  if (variant === 'full') {
    return (
      <section 
        className={cn("relative overflow-hidden", className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-[400px] md:h-[500px]">
          {/* Background Image */}
          {currentBanner.image?.url && (
            <Image
              src={currentBanner.image.url}
              alt={currentBanner.image.alt || currentBanner.title}
              fill
              className="object-cover transition-transform duration-700"
              priority
            />
          )}
          
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"
            style={{ opacity: currentBanner.overlay_opacity || 0.6 }}
          />

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-6">
              <div className="max-w-2xl">
                <h2 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-in slide-in-from-left duration-500"
                  style={{ color: currentBanner.text_color || '#ffffff' }}
                >
                  {currentBanner.title}
                </h2>
                {currentBanner.subtitle && (
                  <p 
                    className="text-xl md:text-2xl mb-4 opacity-90 animate-in slide-in-from-left duration-500 delay-100"
                    style={{ color: currentBanner.text_color || '#ffffff' }}
                  >
                    {currentBanner.subtitle}
                  </p>
                )}
                {currentBanner.description && (
                  <p 
                    className="text-lg opacity-80 mb-8 animate-in slide-in-from-left duration-500 delay-200"
                    style={{ color: currentBanner.text_color || '#ffffff' }}
                  >
                    {currentBanner.description}
                  </p>
                )}
                {currentBanner.button && currentBanner.button.url && (
                  <Button
                    asChild
                    size="lg"
                    className="bg-[#0152be] hover:bg-[#0152be]/90 text-white px-8 py-6 text-lg group animate-in slide-in-from-left duration-500 delay-300"
                  >
                    <Link href={currentBanner.button.url}>
                      {currentBanner.button.text}
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          {showNavigation && banners.length > 1 && (
            <>
              <button
                onClick={goToPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-all opacity-0 hover:opacity-100 group-hover:opacity-100"
                style={{ opacity: isHovered ? 1 : 0 }}
                aria-label="Previous banner"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-all"
                style={{ opacity: isHovered ? 1 : 0 }}
                aria-label="Next banner"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {banners.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {banners.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all",
                    idx === currentIndex 
                      ? "bg-white w-8" 
                      : "bg-white/40 hover:bg-white/60"
                  )}
                  aria-label={`Go to banner ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }

  // Compact banner variant
  if (variant === 'compact') {
    return (
      <section 
        className={cn("relative overflow-hidden rounded-2xl", className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-[250px] md:h-[300px]">
          {/* Background Image */}
          {currentBanner.image?.url && (
            <Image
              src={currentBanner.image.url}
              alt={currentBanner.image.alt || currentBanner.title}
              fill
              className="object-cover"
            />
          )}
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center p-8">
            <div className="max-w-lg">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {currentBanner.title}
              </h3>
              {currentBanner.subtitle && (
                <p className="text-lg text-white/90 mb-4">
                  {currentBanner.subtitle}
                </p>
              )}
              {currentBanner.button && currentBanner.button.url && (
                <Button
                  asChild
                  className="bg-[#0152be] hover:bg-[#0152be]/90 text-white group"
                >
                  <Link href={currentBanner.button.url}>
                    {currentBanner.button.text}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              )}
            </div>
          </div>

          {/* Navigation for multiple banners */}
          {banners.length > 1 && (
            <div className="absolute bottom-4 right-4 flex gap-1">
              {banners.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    idx === currentIndex 
                      ? "bg-white w-6" 
                      : "bg-white/40 hover:bg-white/60"
                  )}
                  aria-label={`Go to banner ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }

  // Card variant - shows all banners as cards
  if (variant === 'card') {
    return (
      <div className={cn("grid md:grid-cols-2 gap-6", className)}>
        {banners.map((banner) => (
          <div
            key={banner._id}
            className="relative overflow-hidden rounded-2xl group"
          >
            <div className="relative h-[250px]">
              {/* Background Image */}
              {banner.image?.url && (
                <Image
                  src={banner.image.url}
                  alt={banner.image.alt || banner.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              )}
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  {banner.title}
                </h3>
                {banner.subtitle && (
                  <p className="text-sm text-white/80 mb-4 line-clamp-2">
                    {banner.subtitle}
                  </p>
                )}
                {banner.button && banner.button.url && (
                  <Link
                    href={banner.button.url}
                    className="inline-flex items-center gap-2 text-[#0152be] bg-white px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors w-fit group/btn"
                  >
                    {banner.button.text}
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null;
}
