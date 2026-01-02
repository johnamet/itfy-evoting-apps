'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { Button } from '@/components/ui/button';
import { useSlidesByType, useFeaturedCategories } from '@/hooks/usePublicData';
import { Slide, Category } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight, Play, Award, Users, Vote, Loader2 } from 'lucide-react';

// Fallback slides when API fails or is loading
const fallbackSlides: Slide[] = [
  {
    _id: 'fallback-1',
    title: "Celebrating Ghana's Tech Innovators",
    subtitle: 'Empowering the next generation of digital leaders',
    description: "Join us in recognizing outstanding young talent shaping Ghana's tech future",
    slide_type: 'hero',
    status: 'active',
    image: {
      url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      alt: 'Young African tech professionals collaborating',
    },
    button: { text: 'Explore Nominees', url: '/nominees' },
    text_color: '#ffffff',
    overlay_opacity: 0.5,
    order: 1,
    position: 'top',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [featuredCategoryIndex, setFeaturedCategoryIndex] = useState(0);

  // Fetch hero slides from API
  const { data: apiSlides, isLoading, error } = useSlidesByType('hero');
  
  // Fetch featured categories (limit 3)
  const { data: featuredCategoriesData } = useFeaturedCategories({ limit: 3 });
  
  // Get featured categories array
  const featuredCategories = useMemo(() => {
    return featuredCategoriesData?.data || [];
  }, [featuredCategoriesData]);
  
  // Current featured category to display
  const currentFeaturedCategory: Category | null = featuredCategories[featuredCategoryIndex] || null;
  
  // Rotate through featured categories every 5 seconds
  useEffect(() => {
    if (featuredCategories.length <= 1) return;
    
    const interval = setInterval(() => {
      setFeaturedCategoryIndex((prev) => (prev + 1) % featuredCategories.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [featuredCategories.length]);

  // Use API slides if available, otherwise fallback
  const heroSlides = useMemo(() => {
    if (apiSlides && apiSlides.length > 0) {
      return apiSlides.filter(s => s.status === 'active');
    }
    return fallbackSlides;
  }, [apiSlides]);

  const handleSlideChange = useCallback((swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight - 80,
      behavior: 'smooth'
    });
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <section className="relative h-screen min-h-[700px] overflow-hidden bg-gray-900">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-itfy-primary animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Loading...</p>
          </div>
        </div>
        {/* Background placeholder */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800 via-gray-900 to-gray-900" />
        <div className="absolute top-1/4 right-[15%] w-[500px] h-[500px] bg-itfy-primary/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 left-[10%] w-[400px] h-[400px] bg-itfy-300/5 rounded-full blur-[100px] animate-pulse" />
      </section>
    );
  }

  return (
    <section 
      className="relative h-screen min-h-[700px] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Carousel */}
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ 
          delay: 7000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={1200}
        onSwiper={setSwiperRef}
        onSlideChange={handleSlideChange}
        loop={heroSlides.length > 1}
        className="h-full w-full"
      >
        {heroSlides.map((slide: Slide, index: number) => (
          <SwiperSlide key={slide._id}>
            <div className="relative w-full h-full">
              {/* Background Image with Parallax Effect */}
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={slide.image.url}
                  alt={slide.image.alt || slide.title}
                  fill
                  className="object-cover scale-110 transition-transform duration-[10000ms] ease-out"
                  style={{ 
                    transform: activeIndex === index ? 'scale(1)' : 'scale(1.1)',
                  }}
                  priority={index === 0}
                  sizes="100vw"
                  quality={90}
                />
              </div>

              {/* Sophisticated Multi-layer Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-900/40 to-gray-900/90" />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-transparent to-gray-900/30" />
              
              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                {/* Floating Orbs */}
                <div className="absolute top-1/4 right-[15%] w-[500px] h-[500px] bg-itfy-primary/10 rounded-full blur-[120px] animate-float-slow" />
                <div className="absolute bottom-1/4 left-[10%] w-[400px] h-[400px] bg-itfy-300/10 rounded-full blur-[100px] animate-float-slow-reverse" />
                <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-itfy-light-blue/10 rounded-full blur-[80px] animate-pulse-slow" />
                
                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 opacity-[0.02] hero-grid-pattern" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Hero Content - Dynamic Content Based on Active Slide */}
      <div className="absolute inset-0 z-10 flex items-center pt-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 xl:col-span-6 mt-8 lg:mt-0">
              {/* Animated Badge */}
              <div key={`badge-${activeIndex}`} className="inline-flex items-center gap-3 mb-8 animate-fade-in-up-delay-1">
                <div className="relative">
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl px-5 py-2.5 rounded-full border border-white/20 shadow-lg">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400"></span>
                    </span>
                    <span className="text-sm font-semibold tracking-wide text-white/90">VOTING IS LIVE</span>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-itfy-primary/20 to-itfy-300/20 backdrop-blur-xl px-4 py-2 rounded-full border border-itfy-400/30">
                  <Award className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm font-medium text-white/80">ITFY Ghana 2025</span>
                </div>
              </div>

              {/* Dynamic Main Heading from Slide Data */}
              <div key={`title-${activeIndex}`} className="space-y-2 mb-8">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight animate-fade-in-up-delay-2">
                  {(() => {
                    const currentSlide = heroSlides[activeIndex];
                    const words = currentSlide?.title?.split(' ') || [];
                    const midPoint = Math.ceil(words.length / 2);
                    const firstPart = words.slice(0, midPoint).join(' ');
                    const secondPart = words.slice(midPoint).join(' ');
                    
                    return (
                      <>
                        <span className="block">{firstPart}</span>
                        <span className="block mt-2">
                          <span className="relative inline-block">
                            <span className="bg-gradient-to-r from-itfy-300 via-itfy-primary to-itfy-light-blue bg-clip-text text-transparent">
                              {secondPart}
                            </span>
                            {/* Underline decoration */}
                            <svg className="absolute -bottom-1 md:-bottom-2 left-0 w-full" height="12" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
                              <path d="M2 8C50 3 150 3 198 8" stroke={`url(#gradient-${activeIndex})`} strokeWidth="4" strokeLinecap="round"/>
                              <defs>
                                <linearGradient id={`gradient-${activeIndex}`} x1="0%" y1="0%" x2="100%" y2="0%">
                                  <stop offset="0%" stopColor="#0152be"/>
                                  <stop offset="50%" stopColor="#3a7fd4"/>
                                  <stop offset="100%" stopColor="#d4e1f9"/>
                                </linearGradient>
                              </defs>
                            </svg>
                          </span>
                        </span>
                      </>
                    );
                  })()}
                </h1>
              </div>

              {/* Dynamic Subtitle from Slide Data */}
              <div key={`subtitle-${activeIndex}`} className="animate-fade-in-up-delay-3">
                {heroSlides[activeIndex]?.subtitle && (
                  <p className="text-xl sm:text-2xl text-white/90 mb-4 max-w-xl leading-relaxed font-medium">
                    {heroSlides[activeIndex].subtitle}
                  </p>
                )}
                {heroSlides[activeIndex]?.description && (
                    <p className="text-base sm:text-lg text-gray-300 mb-10 max-w-xl leading-relaxed line-clamp-3">
                    {heroSlides[activeIndex].description}
                    </p>
                )}
              </div>

              {/* Dynamic CTA Buttons from Slide Data */}
              <div key={`cta-${activeIndex}`} className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in-up-delay-4">
                {heroSlides[activeIndex]?.button && (
                  <Link href={heroSlides[activeIndex].button?.url || '/events'}>
                    <Button 
                      size="lg" 
                      className="group relative px-8 py-6 text-base font-semibold bg-gradient-to-r from-itfy-primary via-itfy-600 to-itfy-primary bg-[length:200%_100%] hover:bg-[position:100%_0] shadow-2xl shadow-itfy-primary/25 transition-all duration-500 hover:shadow-itfy-primary/40 hover:scale-[1.02] rounded-xl"
                    >
                      <Play className="w-5 h-5 mr-2 fill-current" />
                      {heroSlides[activeIndex].button?.text || 'Vote Now'}
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                )}
                
                <Link href="/about">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="px-8 py-6 text-base font-semibold border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm hover:border-white/50 transition-all duration-300 rounded-xl group"
                  >
                    <Award className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                    Learn More
                  </Button>
                </Link>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-3 gap-6 max-w-lg animate-fade-in-up-delay-5">
                <div className="group cursor-default">
                  <div className="relative p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <Users className="w-5 h-5 text-itfy-300 mb-2 group-hover:scale-110 transition-transform" />
                    <div className="text-2xl sm:text-3xl font-bold text-white mb-0.5">500<span className="text-itfy-300">+</span></div>
                    <div className="text-xs sm:text-sm text-gray-400 font-medium">Nominees</div>
                  </div>
                </div>
                <div className="group cursor-default">
                  <div className="relative p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <Award className="w-5 h-5 text-itfy-400 mb-2 group-hover:scale-110 transition-transform" />
                    <div className="text-2xl sm:text-3xl font-bold text-white mb-0.5">15<span className="text-itfy-400">+</span></div>
                    <div className="text-xs sm:text-sm text-gray-400 font-medium">Categories</div>
                  </div>
                </div>
                <div className="group cursor-default">
                  <div className="relative p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <Vote className="w-5 h-5 text-yellow-400 mb-2 group-hover:scale-110 transition-transform" />
                    <div className="text-2xl sm:text-3xl font-bold text-white mb-0.5">50K<span className="text-yellow-400">+</span></div>
                    <div className="text-xs sm:text-sm text-gray-400 font-medium">Votes Cast</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Featured Card (Hidden on smaller screens, only show if featured categories exist) */}
            {currentFeaturedCategory && (
            <div className="hidden lg:block lg:col-span-5 xl:col-span-6 animate-fade-in-up-delay-6">
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-itfy-primary/20 via-itfy-400/20 to-itfy-light-blue/20 rounded-3xl blur-2xl opacity-60" />
                
                {/* Card */}
                <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6 shadow-2xl">
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-3 py-1 bg-itfy-primary/20 text-itfy-300 rounded-full text-sm font-medium border border-itfy-400/30">
                      Featured Category
                    </span>
                    <div className="flex items-center gap-2">
                      {featuredCategories.length > 1 && (
                        <div className="flex gap-1">
                          {featuredCategories.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => setFeaturedCategoryIndex(idx)}
                              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                idx === featuredCategoryIndex ? 'bg-itfy-primary w-4' : 'bg-white/30 hover:bg-white/50'
                              }`}
                              aria-label={`View category ${idx + 1}`}
                            />
                          ))}
                        </div>
                      )}
                      <span className="text-gray-400 text-sm">2025 Edition</span>
                    </div>
                  </div>
                  
                  {/* Category Preview */}
                  <h3 className="text-2xl font-bold text-white mb-3 transition-all duration-300">
                    {currentFeaturedCategory.name}
                  </h3>
                  <p className="text-gray-400 mb-6 text-sm leading-relaxed line-clamp-2">
                    {currentFeaturedCategory.description || 'Vote for your favorite nominees in this category.'}
                  </p>
                  
                  {/* Mini Nominees Preview */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex -space-x-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-itfy-400 to-itfy-primary border-2 border-gray-900 flex items-center justify-center text-xs font-bold text-white">
                          {String.fromCharCode(64 + i)}
                        </div>
                      ))}
                    </div>
                    <span className="text-gray-400 text-sm">
                      {currentFeaturedCategory.candidates?.length 
                        ? `${currentFeaturedCategory.candidates.length} nominees` 
                        : 'Nominees pending'}
                    </span>
                  </div>
                  
                  {/* Voting Status & Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">
                        {currentFeaturedCategory.is_voting_open ? 'Voting Progress' : 'Voting Status'}
                      </span>
                      <span className={`font-medium ${currentFeaturedCategory.is_voting_open ? 'text-green-400' : 'text-yellow-400'}`}>
                        {currentFeaturedCategory.is_voting_open ? 'Live' : 'Coming Soon'}
                      </span>
                    </div>
                    {currentFeaturedCategory.is_voting_open && (
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-itfy-primary via-itfy-400 to-itfy-light-blue rounded-full transition-all duration-1000 animate-pulse" 
                          style={{ width: '68%' }}
                        />
                      </div>
                    )}
                    {currentFeaturedCategory.total_votes > 0 && (
                      <p className="text-xs text-gray-500 mt-1">
                        {currentFeaturedCategory.total_votes.toLocaleString()} votes cast
                      </p>
                    )}
                  </div>
                  
                  {/* View Category Link */}
                  <Link 
                    href={`/categories/${currentFeaturedCategory.slug || currentFeaturedCategory._id}`}
                    className="mt-4 inline-flex items-center gap-2 text-itfy-300 hover:text-itfy-200 text-sm font-medium transition-colors group"
                  >
                    View Category
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
            )}
          </div>
        </div>
      </div>

      {/* Slide Navigation Controls */}
      <div className={`absolute left-6 lg:left-12 top-1/2 -translate-y-1/2 z-20 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0 lg:opacity-60'}`}>
        <button 
          onClick={() => swiperRef?.slidePrev()}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-300 group"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-white group-hover:-translate-x-0.5 transition-transform" />
        </button>
      </div>
      
      <div className={`absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 z-20 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0 lg:opacity-60'}`}>
        <button 
          onClick={() => swiperRef?.slideNext()}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-300 group"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-white group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Slide Progress Indicators */}
      <div className="absolute bottom-24 left-6 lg:left-12 z-20">
        <div className="flex items-center gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => swiperRef?.slideToLoop(index)}
              className={`relative h-1 rounded-full transition-all duration-500 ${
                index === activeIndex ? 'w-12 bg-white' : 'w-6 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            >
              {index === activeIndex && (
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-itfy-300 via-itfy-primary to-itfy-light-blue" />
              )}
            </button>
          ))}
          <span className="ml-4 text-sm text-gray-400 font-medium">
            <span className="text-white">{String(activeIndex + 1).padStart(2, '0')}</span>
            <span className="mx-1">/</span>
            <span>{String(heroSlides.length).padStart(2, '0')}</span>
          </span>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button 
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 group cursor-pointer"
        aria-label="Scroll down"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-gray-400 font-medium tracking-wider uppercase group-hover:text-white transition-colors">
            Scroll
          </span>
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5 group-hover:border-white/50 transition-colors">
            <div className="w-1 h-2 bg-white rounded-full animate-scroll-indicator" />
          </div>
        </div>
      </button>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent z-[5] pointer-events-none" />

      {/* Styles */}
      <style jsx global>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(20px, -20px) scale(1.05);
          }
        }

        @keyframes float-slow-reverse {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-20px, 20px) scale(1.05);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes scroll-indicator {
          0%, 100% {
            transform: translateY(0);
            opacity: 1;
          }
          50% {
            transform: translateY(12px);
            opacity: 0.3;
          }
        }

        .hero-grid-pattern {
          background-image: linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in-up-delay-1 {
          animation: fade-in-up 0.8s ease-out 0.1s forwards;
          opacity: 0;
        }

        .animate-fade-in-up-delay-2 {
          animation: fade-in-up 0.8s ease-out 0.2s forwards;
          opacity: 0;
        }

        .animate-fade-in-up-delay-3 {
          animation: fade-in-up 0.8s ease-out 0.3s forwards;
          opacity: 0;
        }

        .animate-fade-in-up-delay-4 {
          animation: fade-in-up 0.8s ease-out 0.4s forwards;
          opacity: 0;
        }

        .animate-fade-in-up-delay-5 {
          animation: fade-in-up 0.8s ease-out 0.5s forwards;
          opacity: 0;
        }

        .animate-fade-in-up-delay-6 {
          animation: fade-in-up 0.8s ease-out 0.6s forwards;
          opacity: 0;
        }

        .animate-slide-content {
          animation: slide-content-in 0.6s ease-out forwards;
        }

        @keyframes slide-content-in {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }

        .animate-float-slow-reverse {
          animation: float-slow-reverse 10s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-scroll-indicator {
          animation: scroll-indicator 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}