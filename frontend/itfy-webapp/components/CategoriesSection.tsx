'use client';

import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Users, Trophy, ArrowRight, TrendingUp, Vote } from 'lucide-react';
import { mockCategories } from '@/lib/mocks/categories';
import Link from 'next/link';
import Image from 'next/image';

export default function CategoriesSection() {
  const featuredCategories = mockCategories
    .filter(cat => cat.is_featured && cat.is_voting_open)
    .sort((a, b) => b.total_votes - a.total_votes);

  const getGradient = (index: number) => {
    const gradients = [
      'from-purple-500 to-pink-500',
      'from-blue-500 to-cyan-500',
      'from-yellow-500 to-orange-500',
      'from-green-500 to-teal-500',
      'from-red-500 to-pink-500',
      'from-indigo-500 to-purple-500',
      'from-pink-500 to-rose-500',
      'from-cyan-500 to-blue-500',
    ];
    return gradients[index % gradients.length];
  };

  return (
    <section className="py-32 relative overflow-hidden bg-gradient-to-b from-gray-900 via-blue-900/20 to-gray-900">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-yellow-500/10 backdrop-blur-sm px-6 py-3 rounded-full border border-yellow-500/20 mb-6">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-300 font-medium">Award Categories</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Celebrating Excellence
            <span className="block mt-2 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Across Tech
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explore the categories celebrating excellence in Ghana&apos;s youth tech ecosystem and cast your vote
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {featuredCategories.map((category, index) => (
            <GlassCard 
              key={category._id} 
              className="group text-center hover:scale-105 transition-all duration-300 hover:shadow-2xl"
            >
              <div className="p-8">
                {/* Icon */}
                <div className="relative mb-6">
                  <div className={`w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br ${getGradient(index)} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                    {category.icon ? (
                      <Image src={category.icon} alt={category.name} width={48} height={48} className="w-12 h-12" />
                    ) : (
                      <Trophy className="w-12 h-12 text-white" />
                    )}
                  </div>
                  
                  {/* Floating Badge */}
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    HOT
                  </div>
                </div>

                {/* Category Info */}
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all">
                  {category.name}
                </h3>
                <p className="text-gray-300 mb-6 line-clamp-3 text-sm leading-relaxed">
                  {category.description}
                </p>

                {/* Stats */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-center gap-3 text-gray-200 bg-white/5 rounded-lg py-3 border border-white/10">
                    <Users className="w-5 h-5 text-purple-400" />
                    <span className="font-semibold">{category.candidates.length} Nominees</span>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {(category.total_votes / 1000).toFixed(1)}K
                    </div>
                    <div className="text-gray-400 text-sm flex items-center justify-center gap-1 mt-1">
                      <Vote className="w-4 h-4" />
                      Total Votes
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <Link href={`/events/event1/categories/${category.slug}`}>
                  <Button className={`w-full bg-gradient-to-r ${getGradient(index)} hover:opacity-90 group/btn shadow-lg`}>
                    View & Vote
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="max-w-4xl mx-auto">
          <GlassCard className="p-12 text-center bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
            <TrendingUp className="w-16 h-16 mx-auto mb-6 text-purple-400" />
            <h3 className="text-3xl font-bold text-white mb-4">
              Don&apos;t see your category?
            </h3>
            <p className="text-gray-300 mb-8 text-lg">
              We&apos;re constantly expanding! Check back soon for more categories or suggest one to us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg"
              >
                See All Categories
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-6 text-lg"
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