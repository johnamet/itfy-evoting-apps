'use client';

import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui/GlassCard';
import Image from 'next/image';
import Link from 'next/link';
import { Award, Users, Rocket, Target, ArrowRight, Sparkles } from 'lucide-react';

export default function AboutSection() {

  const stats = [
    { number: "1000+", label: "Youth Empowered", icon: Users, color: "from-[#0152be] to-sky-500" },
    { number: "20+", label: "Programs & Events", icon: Rocket, color: "from-blue-500 to-cyan-500" },
    { number: "15+", label: "Award Categories", icon: Award, color: "from-yellow-500 to-orange-500" },
  ];

  const features = [
    {
      icon: Target,
      title: "Skills Development",
      description: "Empower underserved youth with essential coding and digital skills for the future"
    },
    {
      icon: Rocket,
      title: "Career Acceleration",
      description: "Connect young talents with opportunities, mentorship, and industry leaders"
    },
    {
      icon: Award,
      title: "Recognition & Awards",
      description: "Celebrate and spotlight exceptional young tech talent across Ghana"
    }
  ];

  return (
    <section className="relative py-32 overflow-hidden bg-gradient-to-b from-gray-900 via-[#0c2d5a]/20 to-gray-900">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02]" />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#0152be]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fadeIn">
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10 mb-6">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span className="text-white font-medium">About Us</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Empowering Ghana&apos;s
            <span className="block mt-2 bg-gradient-to-r from-[#0152be] via-sky-400 to-cyan-400 bg-clip-text text-transparent">
              Digital Future
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            IT for Youth Ghana empowers underserved youth with essential technology skills, building the next generation of tech leaders across our nation
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <p className="text-xl text-gray-300 leading-relaxed">
                IT for Youth Ghana empowers underserved youth with essential technology skills. We believe every young person deserves access to digital education and the opportunity to become a tech leader.
              </p>
              <p className="text-xl text-gray-300 leading-relaxed">
                Through our programs, awards, and community initiatives, we&apos;re building the next generation of tech professionals and innovators—transforming lives one skill at a time.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <GlassCard 
                  key={i} 
                  className="group p-6 text-center hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:rotate-12 transition-transform`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 mt-2 text-sm">{stat.label}</div>
                </GlassCard>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/about">
                <Button 
                  size="lg" 
                  className="group px-8 py-6 text-lg bg-gradient-to-r from-[#0152be] to-sky-500 hover:from-blue-700 hover:to-sky-600 shadow-lg hover:shadow-[#0152be]/50 transition-all duration-300"
                >
                  Our Story
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Link href="/about#programs">
                <Button 
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 text-lg border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
                >
                  View Our Programs
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Image Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative h-64 rounded-2xl overflow-hidden group">
                  <Image 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop" 
                    alt="Tech collaboration" 
                    width={800} height={256}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c2d5a]/80 to-transparent opacity-60" />
                </div>
                <div className="relative h-48 rounded-2xl overflow-hidden group">
                  <Image 
                    src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&auto=format&fit=crop" 
                    alt="Young innovator" 
                    width={800} height={192}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent opacity-60" />
                </div>
              </div>
              <div className="space-y-4 pt-12">
                <div className="relative h-48 rounded-2xl overflow-hidden group">
                  <Image 
                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop" 
                    alt="Diverse team" 
                    width={800} height={192}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sky-900/80 to-transparent opacity-60" />
                </div>
                <div className="relative h-64 rounded-2xl overflow-hidden group">
                  <Image 
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop" 
                    alt="Tech event" 
                    width={800} height={256}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/80 to-transparent opacity-60" />
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl p-6 shadow-2xl">
              <div className="text-4xl font-bold text-white">2025</div>
              <div className="text-white/90 font-medium">Award Season</div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <GlassCard 
              key={i}
              className="group p-8 hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-[#0152be]/20 to-sky-500/20 flex items-center justify-center group-hover:rotate-6 transition-transform">
                <feature.icon className="w-8 h-8 text-[#0152be]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}