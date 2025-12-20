'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Trophy, LogIn, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import Image from 'next/image';
import { mockSlides } from '@/lib/mocks/slides';
import { Slide } from '@/types';
import { ArrowRight } from 'lucide-react';

const heroSlides = mockSlides.filter(s => s.slide_type === 'hero' && s.status === 'active');

export default function HeroWithIntegratedHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/about', label: 'About' },
    { href: '/events', label: 'Events' },
    { href: '/categories', label: 'Categories' },
    { href: '/nominees', label: 'Nominees' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Full-screen Hero Carousel - Acts as Background */}
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        speed={1500}
        pagination={{ clickable: true }}
        navigation={{ nextEl: '.hero-next', prevEl: '.hero-prev' }}
        loop
        className="absolute inset-0 h-full w-full"
      >
        {heroSlides.map((slide: Slide, index: number) => (
          <SwiperSlide key={slide._id}>
            <div className="relative h-full w-full">
              <Image
                src={slide.image.url}
                alt={slide.image.alt || slide.title}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="100vw"
              />
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Header - Overlays the Hero Background */}
      <header
        className={cn(
          'absolute top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-black/80 backdrop-blur-xl border-b border-white/10'
            : 'bg-transparent'
        )}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0152be] via-sky-500 to-cyan-400 p-0.5">
                  <div className="w-full h-full rounded-xl bg-black flex items-center justify-center">
                    <Trophy className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#0152be] to-sky-500 blur-lg opacity-60 group-hover:opacity-80 transition-opacity" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">ITFY Ghana</h1>
                <p className="text-xs text-gray-300 -mt-1">Youth Tech Awards</p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/90 hover:text-white transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ))}

              <div className="flex items-center gap-4 ml-8">
                <Link href="/nominate">
                  <Button className="bg-gradient-to-r from-[#0152be] via-blue-500 to-sky-500 hover:scale-105 transition-transform shadow-lg">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Nominate
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                </Link>
              </div>
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-white"
            >
              {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Content (Title, Subtitle, CTA) */}
      <div className="relative z-20 h-full flex items-end pb-32">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            {/* You can loop through slides or use first one */}
            {heroSlides[0] && (
              <>
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-6">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm font-medium">ITFY GHANA 2025</span>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
                  <span className="block">{heroSlides[0].title.split(' ').slice(0, -2).join(' ')}</span>
                  <span className="bg-gradient-to-r from-[#0152be] via-sky-400 to-cyan-400 bg-clip-text text-transparent">
                    {heroSlides[0].title.split(' ').slice(-2).join(' ')}
                  </span>
                </h1>

                {heroSlides[0].subtitle && (
                  <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl">
                    {heroSlides[0].subtitle}
                  </p>
                )}

                <div className="flex flex-col sm:flex-row gap-4">
                  {heroSlides[0].button && (
                    <Button size="lg" className="px-8 py-6 text-lg bg-gradient-to-r from-[#0152be] to-sky-500 hover:scale-105 transition-transform">
                      {heroSlides[0].button.text}
                      <ArrowRight className="ml-3 w-5 h-5" />
                    </Button>
                  )}
                  <Button size="lg" variant="outline" className="px-8 py-6 text-lg border-white/40 text-white hover:bg-white/10">
                    Learn More
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Arrows & Pagination */}
      <button className="hero-prev absolute left-8 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button className="hero-next absolute right-8 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center pt-2">
          <div className="w-1 h-3 bg-white rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}