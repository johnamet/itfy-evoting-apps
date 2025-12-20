'use client';

import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui/GlassCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnnouncementBar from '@/components/AnnouncementBar';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Award, Users, Rocket, Target, ArrowRight, Sparkles, 
  Heart, Globe, BookOpen, Lightbulb, CheckCircle2, 
  GraduationCap, Code, Monitor, Trophy
} from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { number: "1000+", label: "Youth Empowered", icon: Users, color: "from-[#0152be] to-sky-500" },
    { number: "20+", label: "Programs & Events", icon: Rocket, color: "from-blue-500 to-cyan-500" },
    { number: "15+", label: "Award Categories", icon: Award, color: "from-yellow-500 to-orange-500" },
    { number: "50+", label: "Partner Organizations", icon: Globe, color: "from-green-500 to-emerald-500" },
  ];

  const coreValues = [
    {
      icon: Heart,
      title: "Empowerment",
      description: "We believe in equipping young people with the skills and confidence to shape their own futures in the digital age."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We encourage creative thinking and innovative solutions to real-world challenges facing our communities."
    },
    {
      icon: Users,
      title: "Inclusivity",
      description: "We are committed to reaching underserved youth, ensuring equal access to technology education for all."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We celebrate and recognize outstanding achievement, inspiring others to reach their full potential."
    }
  ];

  const programs = [
    {
      icon: Code,
      title: "Coding Bootcamps",
      description: "Intensive training programs teaching web development, mobile apps, and software engineering fundamentals.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Monitor,
      title: "Digital Skills Training",
      description: "Comprehensive courses covering essential digital literacy, productivity tools, and online safety.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: GraduationCap,
      title: "Mentorship Programs",
      description: "Connecting aspiring tech talents with experienced professionals for guidance and career development.",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: Trophy,
      title: "Youth Tech Awards",
      description: "Annual recognition of exceptional young innovators making impact in Ghana's tech ecosystem.",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  const milestones = [
    { year: "2018", title: "Foundation", description: "IT for Youth Ghana was established with a mission to empower underserved youth." },
    { year: "2019", title: "First Bootcamp", description: "Launched our first coding bootcamp with 50 students in Accra." },
    { year: "2020", title: "Digital Expansion", description: "Moved programs online, reaching youth across all regions of Ghana." },
    { year: "2021", title: "1000 Graduates", description: "Celebrated our 1000th graduate from digital skills programs." },
    { year: "2022", title: "Youth Tech Awards", description: "Inaugurated the annual Youth Tech Awards ceremony." },
    { year: "2023", title: "Global Recognition", description: "Received recognition from GlobalGiving and international partners." },
    { year: "2024", title: "E-Voting Platform", description: "Launched our digital voting platform for transparent award selections." },
  ];

  const team = [
    {
      name: "Executive Director",
      role: "Leadership",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop",
    },
    {
      name: "Program Manager",
      role: "Operations",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&auto=format&fit=crop",
    },
    {
      name: "Tech Lead",
      role: "Technology",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop",
    },
    {
      name: "Community Manager",
      role: "Engagement",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <AnnouncementBar />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c2d5a]/50 via-gray-900 to-gray-900" />
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#0152be]/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10 mb-6">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-medium">About IT for Youth Ghana</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Empowering Ghana&apos;s
              <span className="block mt-2 bg-gradient-to-r from-[#0152be] via-sky-400 to-cyan-400 bg-clip-text text-transparent">
                Digital Future
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-10">
              We empower underserved youth with essential technology skills, building the next generation of tech leaders across Ghana.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://www.globalgiving.org/projects/coding-and-digital-skills-for-1000-girls-in-ghana/" target="_blank">
                <Button 
                  size="lg" 
                  className="group px-8 py-6 text-lg bg-gradient-to-r from-[#0152be] to-sky-500 hover:from-blue-700 hover:to-sky-600 shadow-lg hover:shadow-[#0152be]/50 transition-all duration-300"
                >
                  Support Our Mission
                  <Heart className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                </Button>
              </Link>
              <Link href="/events">
                <Button 
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 text-lg border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
                >
                  View Our Events
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <GlassCard 
                key={i} 
                className="group p-6 text-center hover:scale-105 transition-all duration-300"
              >
                <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:rotate-12 transition-transform`}>
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-gray-400 mt-2">{stat.label}</div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-[#0c2d5a]/10 to-gray-900" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#0152be]/10 px-4 py-2 rounded-full border border-[#0152be]/20 mb-4">
                  <Target className="w-4 h-4 text-[#0152be]" />
                  <span className="text-[#0152be] font-medium text-sm">Our Mission</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Bridging the Digital Divide
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  IT for Youth Ghana is dedicated to empowering underserved youth with essential technology skills. 
                  We believe every young person deserves access to digital education and the opportunity to become 
                  a tech leader, regardless of their background or circumstances.
                </p>
              </div>

              <div>
                <div className="inline-flex items-center gap-2 bg-sky-500/10 px-4 py-2 rounded-full border border-sky-500/20 mb-4">
                  <Rocket className="w-4 h-4 text-sky-400" />
                  <span className="text-sky-400 font-medium text-sm">Our Vision</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  A Digitally Empowered Ghana
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  We envision a Ghana where every young person has the skills and confidence to thrive in 
                  the digital economy. Through education, mentorship, and recognition, we&apos;re building a 
                  generation of innovators who will lead Africa&apos;s tech revolution.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative h-48 rounded-2xl overflow-hidden group">
                    <Image 
                      src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop" 
                      alt="Students learning" 
                      width={400} height={192}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0152be]/60 to-transparent" />
                  </div>
                  <div className="relative h-64 rounded-2xl overflow-hidden group">
                    <Image 
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop" 
                      alt="Tech collaboration" 
                      width={400} height={256}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-sky-900/60 to-transparent" />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="relative h-64 rounded-2xl overflow-hidden group">
                    <Image 
                      src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&auto=format&fit=crop" 
                      alt="Young developer" 
                      width={400} height={256}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent" />
                  </div>
                  <div className="relative h-48 rounded-2xl overflow-hidden group">
                    <Image 
                      src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop" 
                      alt="Award ceremony" 
                      width={400} height={192}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/60 to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10 mb-6">
              <Heart className="w-5 h-5 text-pink-400" />
              <span className="text-white font-medium">Our Core Values</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              What Drives Us
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Our values guide everything we do, from program design to community engagement.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, i) => (
              <GlassCard 
                key={i}
                className="group p-8 hover:scale-105 transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#0152be]/20 to-sky-500/20 flex items-center justify-center group-hover:rotate-6 transition-transform">
                  <value.icon className="w-8 h-8 text-[#0152be]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-gray-400 leading-relaxed">{value.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Our Programs */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-[#0c2d5a]/10 to-gray-900" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10 mb-6">
              <BookOpen className="w-5 h-5 text-green-400" />
              <span className="text-white font-medium">What We Do</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Programs
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Comprehensive initiatives designed to equip youth with skills for the digital economy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {programs.map((program, i) => (
              <GlassCard 
                key={i}
                className="group p-8 hover:scale-[1.02] transition-all duration-300"
              >
                <div className="flex items-start gap-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${program.color} flex items-center justify-center flex-shrink-0 group-hover:rotate-6 transition-transform`}>
                    <program.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">{program.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{program.description}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline / Milestones */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10 mb-6">
              <Rocket className="w-5 h-5 text-orange-400" />
              <span className="text-white font-medium">Our Journey</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Milestones & Achievements
            </h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-[#0152be] via-sky-500 to-transparent hidden md:block" />
            
            <div className="space-y-12">
              {milestones.map((milestone, i) => (
                <div 
                  key={i} 
                  className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <GlassCard className="p-6 inline-block">
                      <div className="text-[#0152be] font-bold text-lg mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-white mb-2">{milestone.title}</h3>
                      <p className="text-gray-400">{milestone.description}</p>
                    </GlassCard>
                  </div>
                  
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0152be] to-sky-500 flex items-center justify-center z-10 flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-[#0c2d5a]/10 to-gray-900" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10 mb-6">
              <Users className="w-5 h-5 text-cyan-400" />
              <span className="text-white font-medium">Our Team</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              The People Behind Our Mission
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              A dedicated team committed to empowering Ghana&apos;s youth through technology.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <GlassCard 
                key={i}
                className="group overflow-hidden hover:scale-105 transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image 
                    src={member.image} 
                    alt={member.name}
                    width={400} height={256}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-[#0152be]">{member.role}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <GlassCard className="p-12 md:p-16 text-center bg-gradient-to-br from-[#0152be]/20 to-sky-500/10 border-[#0152be]/30">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Join Our Mission
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
              Whether you want to volunteer, partner, or support our programs, there are many ways to make a difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://www.globalgiving.org/projects/coding-and-digital-skills-for-1000-girls-in-ghana/" target="_blank">
                <Button 
                  size="lg" 
                  className="group px-8 py-6 text-lg bg-gradient-to-r from-[#0152be] to-sky-500 hover:from-blue-700 hover:to-sky-600 shadow-lg hover:shadow-[#0152be]/50 transition-all duration-300"
                >
                  Donate Now
                  <Heart className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button 
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 text-lg border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
                >
                  Get in Touch
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </GlassCard>
        </div>
      </section>

      <Footer />
    </div>
  );
}
