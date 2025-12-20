'use client';

import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui/GlassCard';
import Link from 'next/link';
import { Users, Sparkles, ArrowRight, Trophy, Clock, Target } from 'lucide-react';

export default function NominationSection() {
  const features = [
    {
      icon: Users,
      title: "Open to All",
      description: "Anyone can nominate — friends, mentors, colleagues, family members",
      color: "from-[#0152be] to-sky-500"
    },
    {
      icon: Clock,
      title: "Quick & Simple",
      description: "Takes just 5 minutes to complete the nomination form",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Trophy,
      title: "Big Impact",
      description: "Help shape the future of Ghana's tech ecosystem",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0c2d5a] via-blue-900 to-indigo-900" />
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
      
      {/* Animated Blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#0152be]/20 rounded-full blur-3xl animate-pulse delay-500" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-8 py-4 rounded-full border border-white/20 shadow-2xl">
              <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
              <span className="text-white font-semibold text-lg">Nominations Now Open</span>
              <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
            </div>
          </div>

          {/* Main Heading */}
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Nominate Ghana's Next
              <span className="block mt-4 bg-gradient-to-r from-yellow-400 via-sky-400 to-[#0152be] bg-clip-text text-transparent">
                Tech Superstar
              </span>
            </h2>

            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Know a brilliant young developer, innovator, or tech leader under 30 making waves in Ghana?
              <span className="block mt-3 text-yellow-300 font-semibold">
                Submit their name and help them get the recognition they deserve.
              </span>
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
            <Link href="/nominate">
              <Button 
                size="lg" 
                className="px-12 py-8 text-xl bg-gradient-to-r from-yellow-500 via-sky-500 to-[#0152be] hover:from-yellow-600 hover:via-sky-600 hover:to-blue-700 shadow-2xl hover:shadow-[#0152be]/50 transition-all hover:scale-105 group"
              >
                <Target className="mr-3 w-6 h-6 group-hover:rotate-12 transition-transform" />
                Nominate Someone Now
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>

            <Link href="/guidelines">
              <Button 
                size="lg" 
                variant="outline" 
                className="px-10 py-8 text-xl border-2 border-white/40 text-white hover:bg-white/10 backdrop-blur-sm hover:border-white/60"
              >
                View Guidelines
              </Button>
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <GlassCard 
                  key={index} 
                  className="group p-8 text-center hover:scale-105 transition-all duration-300 hover:shadow-2xl"
                >
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-3">{feature.title}</h4>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </GlassCard>
              );
            })}
          </div>

          {/* Bottom Info Card */}
          <GlassCard className="p-10 bg-gradient-to-r from-white/5 to-white/10 border-white/20">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#0152be] to-sky-500 flex items-center justify-center shadow-2xl">
                  <Trophy className="w-12 h-12 text-white" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-white mb-3">
                  Why Nominate?
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Your nomination could be the catalyst that propels a talented individual into the spotlight. 
                  Winners gain industry recognition, networking opportunities, and become role models for the next generation. 
                  <span className="block mt-2 text-yellow-300 font-semibold">
                    Together, we build a stronger tech community.
                  </span>
                </p>
              </div>
              <div className="flex-shrink-0">
                <Link href="/past-winners">
                  <Button 
                    variant="outline" 
                    className="border-white/40 text-white hover:bg-white/10"
                  >
                    View Past Winners
                  </Button>
                </Link>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.05);
          }
        }

        .delay-500 {
          animation-delay: 0.5s;
        }

        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
}