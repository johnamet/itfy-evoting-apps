'use client';

import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Users, Trophy, ArrowRight, TrendingUp, Vote, Award, Star, Clock, Globe, Lock, ShieldCheck } from 'lucide-react';
import { mockCategories } from '@/lib/mocks/categories';
import { mockEvents } from '@/lib/mocks/events';
import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { ResultsVisibility } from '@/types';

export default function CategoriesSection() {
  const featuredCategories = mockCategories
    .filter(cat => cat.is_featured && cat.is_voting_open)
    .sort((a, b) => b.total_votes - a.total_votes)
    .slice(0, 4);

  const getVotingStatus = (category: typeof mockCategories[0]) => {
    const now = new Date();
    const startDate = category.voting_start_date ? new Date(category.voting_start_date) : null;
    const endDate = category.voting_deadline ? new Date(category.voting_deadline) : null;
    
    if (endDate && now > endDate) {
      return { status: 'closed', label: 'Voting Closed', color: 'bg-gray-500/20 text-gray-400 border-gray-500/30' };
    }
    if (startDate && now < startDate) {
      return { status: 'upcoming', label: 'Coming Soon', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' };
    }
    if (category.is_voting_open) {
      return { status: 'voting', label: 'Voting Open', color: 'bg-green-500/20 text-green-400 border-green-500/30' };
    }
    return { status: 'closed', label: 'Closed', color: 'bg-gray-500/20 text-gray-400 border-gray-500/30' };
  };

  const getVisibilityInfo = (visibility: ResultsVisibility) => {
    switch (visibility) {
      case 'public':
        return { label: 'Public', color: 'bg-green-500/20 text-green-400', icon: Globe };
      case 'authenticated':
        return { label: 'Members Only', color: 'bg-blue-500/20 text-blue-400', icon: Lock };
      case 'admin_only':
        return { label: 'Admin Only', color: 'bg-red-500/20 text-red-400', icon: ShieldCheck };
      default:
        return { label: 'Public', color: 'bg-green-500/20 text-green-400', icon: Globe };
    }
  };

  return (
    <section className="py-32 relative overflow-hidden bg-gradient-to-b from-gray-900 via-itfy-navy/20 to-gray-900">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-itfy-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-itfy-300/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-yellow-500/10 backdrop-blur-sm px-6 py-3 rounded-full border border-yellow-500/20 mb-6">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-300 font-medium">Award Categories</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Celebrating Excellence
            <span className="block mt-2 bg-gradient-to-r from-itfy-light-blue via-itfy-300 to-itfy-primary bg-clip-text text-transparent">
              Across Tech
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explore the categories celebrating excellence in Ghana&apos;s youth tech ecosystem and cast your vote
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {featuredCategories.map((category) => {
            const event = mockEvents.find(e => e._id === category.event);
            const votingStatus = getVotingStatus(category);
            const visibilityInfo = getVisibilityInfo(category.results_visibility);
            const VisibilityIcon = visibilityInfo.icon;

            return (
              <Link key={category._id} href={`/categories/${category.slug}`}>
                <GlassCard className="group h-full overflow-hidden hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                  {/* Image Header */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={category.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop'}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                      <span className={`${votingStatus.color} px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm`}>
                        {votingStatus.label}
                      </span>
                      {category.is_featured && (
                        <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 backdrop-blur-sm">
                          <Star className="w-3 h-3" />
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Category Icon */}
                    <div className="absolute bottom-4 left-4">
                      <div 
                        className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-xl ${
                          category.color_theme ? '' : 'bg-gradient-to-br from-[#0152be] to-sky-500'
                        }`}
                        {...(category.color_theme ? { 
                          style: { background: `linear-gradient(135deg, ${category.color_theme}, ${category.color_theme}99)` } as React.CSSProperties 
                        } : {})}
                      >
                        <Award className="w-7 h-7 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#0152be] transition">
                      {category.name}
                    </h3>
                    
                    {event && (
                      <p className="text-sm text-[#0152be] mb-3 flex items-center gap-1">
                        <Trophy className="w-4 h-4" />
                        {event.name}
                      </p>
                    )}
                    
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {category.description || 'Vote for the best in this category'}
                    </p>

                    {/* Stats Row */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-sm text-gray-400">
                          <Users className="w-4 h-4" />
                          <span>{category.candidates.length}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-[#0152be]">
                          <Vote className="w-4 h-4" />
                          <span>{category.total_votes.toLocaleString()}</span>
                        </div>
                      </div>
                      <span className={`${visibilityInfo.color} px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1`}>
                        <VisibilityIcon className="w-3 h-3" />
                      </span>
                    </div>

                    {/* Deadline */}
                    {category.voting_deadline && votingStatus.status === 'voting' && (
                      <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>Ends {formatDistanceToNow(new Date(category.voting_deadline), { addSuffix: true })}</span>
                      </div>
                    )}
                  </div>
                </GlassCard>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="max-w-4xl mx-auto">
          <GlassCard className="p-12 text-center bg-gradient-to-br from-itfy-primary/10 to-itfy-300/10 border-itfy-primary/20">
            <TrendingUp className="w-16 h-16 mx-auto mb-6 text-itfy-300" />
            <h3 className="text-3xl font-bold text-white mb-4">
              Don&apos;t see your category?
            </h3>
            <p className="text-gray-300 mb-8 text-lg">
              We&apos;re constantly expanding! Check back soon for more categories or suggest one to us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/categories">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg"
                >
                  See All Categories
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-itfy-primary to-itfy-600 hover:from-itfy-600 hover:to-itfy-700 px-8 py-6 text-lg"
              >
                Suggest a Category
              </Button>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}