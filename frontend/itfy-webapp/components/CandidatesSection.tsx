'use client';

import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { mockCandidates } from '@/lib/mocks/candidates';
import Link from 'next/link';
import Image from 'next/image';
import { Crown, TrendingUp, ArrowRight, Star, Award, Trophy } from 'lucide-react';

export default function CandidatesSection() {
  const topCandidates = mockCandidates
    .filter(c => c.status === 'approved' && c.is_published)
    .sort((a, b) => b.vote_count - a.vote_count)
    .slice(0, 8);

  const formatVotes = (votes: number) => {
    if (votes >= 1000) return `${(votes / 1000).toFixed(1)}K`;
    return `${votes}`;
  };

  const getRankBadge = (index: number) => {
    const badges = [
      { color: 'from-yellow-400 to-orange-400', icon: Crown },
      { color: 'from-gray-300 to-gray-400', icon: Award },
      { color: 'from-amber-600 to-amber-700', icon: Award },
    ];
    return badges[index] || { color: 'from-purple-400 to-pink-400', icon: Star };
  };

  return (
    <section className="py-32 relative overflow-hidden bg-gradient-to-b from-gray-900 via-purple-900/30 to-gray-900">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-green-500/10 backdrop-blur-sm px-6 py-3 rounded-full border border-green-500/20 mb-6">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <span className="text-green-300 font-medium">Top Performers</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Leading Nominees
            <span className="block mt-2 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              in the Spotlight
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Meet the young innovators currently leading in their categories and driving Ghana&apos;s tech revolution
          </p>
        </div>

        {/* Candidates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {topCandidates.map((candidate, index) => {
            const badge = getRankBadge(index);
            const RankIcon = badge.icon;
            
            return (
              <GlassCard 
                key={candidate._id} 
                className="group text-center hover:scale-105 transition-all duration-300 hover:shadow-2xl"
              >
                <div className="p-8">
                  {/* Profile Image with Rank Badge */}
                  <div className="relative mb-6">
                      <Image
                        src={candidate.profile_image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop'}
                        alt={`${candidate.first_name} ${candidate.last_name}`}
                        width={128}
                        height={128}
                        className="w-32 h-32 rounded-2xl mx-auto object-cover border-4 border-white/20 group-hover:border-white/40 transition-all shadow-xl"
                        priority
                        unoptimized={!!candidate.profile_image}
                      />
                    <div className="absolute inset-0 rounded-2xl overflow-visible flex items-center justify-center">
                      
                      {/* Rank Badge */}
                      <div className={`absolute -top-3 -right-3 w-12 h-12 rounded-xl bg-gradient-to-br ${badge.color} flex items-center justify-center shadow-lg border-2 border-white`}>
                        {index < 3 ? (
                          <RankIcon className="w-6 h-6 text-white" />
                        ) : (
                          <span className="text-white font-bold text-sm">#{index + 1}</span>
                        )}
                      </div>
                    </div>

                    {/* Animated Ring */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl group-hover:blur-2xl transition-all" />
                  </div>

                  {/* Candidate Info */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all">
                    {candidate.first_name} {candidate.last_name}
                  </h3>
                  
                  <div className="inline-flex items-center gap-2 bg-purple-500/20 px-3 py-1 rounded-full mb-4 border border-purple-500/30">
                    <Trophy className="w-3 h-3 text-purple-400" />
                    <p className="text-purple-300 text-xs font-medium">Best Young Developer</p>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-6 line-clamp-3 leading-relaxed">
                    {candidate.bio}
                  </p>

                  {/* Vote Count */}
                  <div className="mb-6 py-4 px-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl border border-green-500/20">
                    <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                      {formatVotes(candidate.vote_count)}
                    </div>
                    <div className="text-gray-400 text-sm mt-1">votes</div>
                  </div>

                  {/* CTA */}
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 group/btn"
                    variant="outline"
                  >
                    View Profile
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Link href="/nominees">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 px-10 py-6 text-lg shadow-2xl group"
            >
              View All Nominees
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          
          <p className="text-gray-400 mt-6 text-sm">
            Over 500+ talented nominees across 15+ categories
          </p>
        </div>
      </div>
    </section>
  );
}