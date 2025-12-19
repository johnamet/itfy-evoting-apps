'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { Button } from '@/components/ui/button';
import { mockSlides } from '@/lib/mocks/slides';
import { Slide } from '@/types';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';

const heroSlides = mockSlides.filter(s => s.slide_type === 'hero' && s.status === 'active');

export default function HeroCarousel() {
  const getPositionClasses = (position: string = 'bottom-left') => {
    const positions: { [key: string]: string } = {
      'top': 'top-32 left-0 right-0 text-center',
      'center': 'top-1/2 left-0 right-0 -translate-y-1/2 text-center px-6',
      'bottom-left': 'bottom-32 md:bottom-40 left-0',
      'center-left': 'top-1/2 left-0 -translate-y-1/2',
      'bottom-center': 'bottom-32 md:bottom-40 left-1/2 -translate-x-1/2 text-center',
    };
    return positions[position] || positions['bottom-left'];
  };

  return (
    <section className="relative h-screen overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        autoplay={{ 
          delay: 6000,
          disableOnInteraction: false,
        }}
        speed={1500}
        pagination={{ 
          clickable: true,
          bulletClass: 'swiper-pagination-bullet !bg-white/60 !w-3 !h-3',
          bulletActiveClass: 'swiper-pagination-bullet-active !bg-white !w-8',
        }}
        navigation={{
          nextEl: '.hero-next',
          prevEl: '.hero-prev',
        }}
        loop
        className="h-full hero-swiper"
      >
        {heroSlides.map((slide: Slide, index: number) => (
          <SwiperSlide key={slide._id}>
            <div className="relative w-full h-full group">
              {/* Background Image with Ken Burns Effect */}
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={slide.image.url}
                  alt={slide.image.alt || ''}
                  fill
                  className="object-cover scale-105 group-hover:scale-110 transition-transform duration-[8000ms] ease-out"
                  priority={index === 0}
                  sizes="100vw"
                  quality={90}
                />
              </div>

              {/* Multi-layer Gradient Overlay */}
              <div 
                className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"
                style={{ opacity: slide.overlay_opacity || 0.5 }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
              
              {/* Animated Accent Elements */}
              <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

              {/* Content Container */}
              <div className="container mx-auto px-6 h-full relative z-10">
                <div 
                  className={`absolute ${getPositionClasses(slide.position)} max-w-4xl animate-fadeInUp`}
                  style={{ color: slide.text_color || '#ffffff' }}
                >
                  {/* Category Badge */}
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-6 animate-slideInDown">
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm font-medium tracking-wide">ITFY GHANA 2025</span>
                  </div>

                  {/* Main Title */}
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-slideInLeft">
                    <span className="block mb-2">{slide.title.split(' ').slice(0, -2).join(' ')}</span>
                    <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent">
                      {slide.title.split(' ').slice(-2).join(' ')}
                    </span>
                  </h1>

                  {/* Subtitle */}
                  {slide.subtitle && (
                    <p className="text-lg md:text-2xl font-light mb-4 text-gray-200 animate-slideInLeft delay-200">
                      {slide.subtitle}
                    </p>
                  )}

                  {/* Description */}
                  {slide.description && (
                    <p className="text-base md:text-lg text-gray-300 mb-6 max-w-2xl animate-slideInLeft delay-300">
                      {slide.description}
                    </p>
                  )}

                  {/* CTA Buttons */}
                  {slide.button && (
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center animate-slideInUp delay-500">
                      <Button 
                        size="lg" 
                        className="group px-8 py-6 text-lg bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-500 hover:from-purple-700 hover:via-pink-700 hover:to-yellow-600 shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
                        {slide.button.text}
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                      
                      <Button 
                        size="lg" 
                        variant="outline"
                        className="px-8 py-6 text-lg border-2 border-white/40 text-white hover:bg-white/10 backdrop-blur-sm hover:border-white/60 transition-all duration-300"
                      >
                        Learn More
                      </Button>
                    </div>
                  )}

                  {/* Stats Bar */}
                  <div className="hidden md:grid grid-cols-3 gap-4 mt-8 max-w-2xl animate-fadeIn delay-700">
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
                      <div className="text-2xl font-bold text-purple-400">500+</div>
                      <div className="text-xs text-gray-300">Nominees</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
                      <div className="text-2xl font-bold text-pink-400">15+</div>
                      <div className="text-xs text-gray-300">Categories</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
                      <div className="text-2xl font-bold text-yellow-400">50K+</div>
                      <div className="text-xs text-gray-300">Votes</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button className="hero-prev absolute left-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110 group">
        <svg className="w-6 h-6 text-white group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button className="hero-next absolute right-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110 group">
        <svg className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white rounded-full animate-scroll" />
        </div>
      </div>

      <style jsx global>{`
        .hero-swiper .swiper-pagination {
          bottom: 2rem !important;
        }
        
        .hero-swiper .swiper-pagination-bullet {
          transition: all 0.3s ease;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scroll {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(8px);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out;
        }

        .animate-slideInDown {
          animation: slideInDown 0.6s ease-out;
        }

        .animate-slideInUp {
          animation: slideInUp 0.8s ease-out;
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }

        .animate-scroll {
          animation: scroll 2s ease-in-out infinite;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-300 {
          animation-delay: 0.3s;
        }

        .delay-500 {
          animation-delay: 0.5s;
        }

        .delay-700 {
          animation-delay: 0.7s;
        }

        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
}