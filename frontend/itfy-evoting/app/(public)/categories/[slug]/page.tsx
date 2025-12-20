'use client';

import { useParams } from 'next/navigation';
import { format, differenceInSeconds, differenceInDays, differenceInHours, differenceInMinutes } from 'date-fns';
import { 
  Award, ArrowRight, Users, Vote, Star, Trophy,
  Globe, Lock, Calendar, Info, Timer,
  ChevronRight, Share2, Heart, ArrowLeft, EyeOff, ShieldCheck
} from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { mockCategories } from '@/lib/mocks/categories';
import { mockEvents } from '@/lib/mocks/events';
import { mockCandidates } from '@/lib/mocks/candidates';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function CategoryDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Find the category by slug
  const category = mockCategories.find(c => c.slug === slug);
  
  // Find the event this category belongs to
  const event = category ? mockEvents.find(e => e._id === category.event) : null;
  
  // Get candidates for this category
  const categoryCandidates = category 
    ? mockCandidates.filter(c => c.categories.includes(category._id) && c.status === 'approved' && c.is_published)
        .sort((a, b) => b.vote_count - a.vote_count)
    : [];

  // Calculate voting status
  const getVotingInfo = () => {
    if (!category) return { status: 'inactive', targetDate: null, label: '', isEnded: true };
    
    const now = new Date();
    const startDate = category.voting_start_date ? new Date(category.voting_start_date) : null;
    const endDate = category.voting_deadline ? new Date(category.voting_deadline) : null;
    
    if (endDate && now >= endDate) {
      return { status: 'ended', targetDate: null, label: 'Voting Ended', isEnded: true };
    }
    if (startDate && now < startDate) {
      return { status: 'upcoming', targetDate: startDate, label: 'Voting Opens In', isEnded: false };
    }
    if (category.is_voting_open && endDate) {
      return { status: 'active', targetDate: endDate, label: 'Voting Ends In', isEnded: false };
    }
    return { status: 'inactive', targetDate: null, label: 'Voting Inactive', isEnded: true };
  };
  const votingInfo = getVotingInfo();

  // Countdown timer effect
  useEffect(() => {
    if (!votingInfo.targetDate) return;

    const updateCountdown = () => {
      const now = new Date();
      const target = votingInfo.targetDate!;
      const totalSeconds = differenceInSeconds(target, now);
      
      if (totalSeconds <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      const days = differenceInDays(target, now);
      const hours = differenceInHours(target, now) % 24;
      const minutes = differenceInMinutes(target, now) % 60;
      const seconds = totalSeconds % 60;
      
      setCountdown({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [votingInfo.targetDate]);

  // Check if results should be visible
  const getCanShowResults = () => {
    if (!category) return { canShow: false, reason: 'Category not found' };
    
    const votingEnded = category.voting_deadline ? new Date(category.voting_deadline) <= new Date() : false;
    
    // If voting hasn't ended yet, check show_results_before_deadline
    if (!votingEnded && !category.show_results_before_deadline) {
      return { canShow: false, reason: 'Results will be available after voting ends' };
    }
    
    // TODO: Replace with actual auth state
    const isAuthenticated = false;
    const isAdmin = false;
    
    switch (category.results_visibility) {
      case 'public':
        return { canShow: true, reason: null };
      case 'authenticated':
        if (!isAuthenticated) {
          return { canShow: false, reason: 'Sign in to view results' };
        }
        return { canShow: true, reason: null };
      case 'admin_only':
        if (!isAdmin) {
          return { canShow: false, reason: 'Results are restricted to administrators' };
        }
        return { canShow: true, reason: null };
      default:
        return { canShow: true, reason: null };
    }
  };
  const canShowResults = getCanShowResults();

  const getVisibilityInfo = (visibility: string) => {
    switch (visibility) {
      case 'public':
        return { label: 'Public Results', color: 'bg-green-500/20 text-green-400', icon: Globe };
      case 'authenticated':
        return { label: 'Members Only', color: 'bg-blue-500/20 text-blue-400', icon: Lock };
      case 'admin_only':
        return { label: 'Admin Only', color: 'bg-red-500/20 text-red-400', icon: ShieldCheck };
      default:
        return { label: 'Public', color: 'bg-green-500/20 text-green-400', icon: Globe };
    }
  };

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Header />
        <div className="container mx-auto px-6 py-32 text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
            <Info className="w-12 h-12 text-gray-500" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
          <p className="text-gray-400 mb-8">The category you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link href="/categories">
            <Button className="bg-gradient-to-r from-[#0152be] to-sky-500">
              Browse Categories
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const visibilityInfo = getVisibilityInfo(category.results_visibility);
  const VisibilityIcon = visibilityInfo.icon;
  const totalVotes = categoryCandidates.reduce((sum, c) => sum + c.vote_count, 0);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      
      {/* Hero Banner */}
      <section className="relative pt-20">
        <div className="relative h-[400px] overflow-hidden">
          <Image
            src={category.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop'}
            alt={category.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-gray-900/30" />
          
          {/* Back Button */}
          <div className="absolute top-8 left-8">
            <Link href="/categories">
              <Button variant="ghost" className="bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                All Categories
              </Button>
            </Link>
          </div>

          {/* Badges */}
          <div className="absolute top-8 right-8 flex items-center gap-3">
            {category.is_featured && (
              <span className="bg-yellow-500/20 backdrop-blur-sm text-yellow-400 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                <Star className="w-4 h-4" />
                Featured
              </span>
            )}
            <span className={`${visibilityInfo.color} backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2`}>
              <VisibilityIcon className="w-4 h-4" />
              {visibilityInfo.label}
            </span>
          </div>

          {/* Hero Content */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto">
              <div className="flex items-end gap-6">
                <div 
                  className={`w-24 h-24 rounded-2xl flex items-center justify-center shadow-2xl flex-shrink-0 ${
                    category.color_theme ? '' : 'bg-gradient-to-br from-[#0152be] to-sky-500'
                  }`}
                  {...(category.color_theme ? { 
                    style: { background: `linear-gradient(135deg, ${category.color_theme}, ${category.color_theme}99)` } as React.CSSProperties 
                  } : {})}
                >
                  <Award className="w-12 h-12 text-white" />
                </div>
                <div className="flex-1">
                  {event && (
                    <Link href={`/events/${event.slug}`} className="inline-flex items-center gap-2 text-[#0152be] hover:text-sky-400 transition mb-2">
                      <Trophy className="w-4 h-4" />
                      <span className="text-sm font-medium">{event.name}</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  )}
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    {category.name}
                  </h1>
                  <p className="text-gray-300 text-lg max-w-3xl">
                    {category.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-6 bg-white/5 border-y border-white/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{categoryCandidates.length}</div>
              <div className="text-gray-400 text-sm">Candidates</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#0152be]">{category.total_votes.toLocaleString()}</div>
              <div className="text-gray-400 text-sm">Total Votes</div>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold ${votingInfo.status === 'active' ? 'text-green-400' : votingInfo.status === 'upcoming' ? 'text-blue-400' : 'text-gray-400'}`}>
                {votingInfo.status === 'active' ? 'Open' : votingInfo.status === 'upcoming' ? 'Soon' : 'Closed'}
              </div>
              <div className="text-gray-400 text-sm">Voting Status</div>
            </div>
            {category.voting_deadline && (
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{format(new Date(category.voting_deadline), 'MMM d')}</div>
                <div className="text-gray-400 text-sm">Deadline</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      {votingInfo.targetDate && !votingInfo.isEnded && (
        <section className="py-8">
          <div className="container mx-auto px-6">
            <GlassCard className="p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#0152be]/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-2 mb-4">
                  {votingInfo.status === 'active' ? (
                    <>
                      <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-green-400 font-medium">Voting is Live</span>
                    </>
                  ) : (
                    <>
                      <Timer className="w-5 h-5 text-blue-400" />
                      <span className="text-blue-400 font-medium">Voting Opens Soon</span>
                    </>
                  )}
                </div>
                
                <p className="text-gray-400 mb-6">{votingInfo.label}</p>
                
                <div className="flex justify-center gap-4">
                  {[
                    { value: countdown.days, label: 'Days' },
                    { value: countdown.hours, label: 'Hours' },
                    { value: countdown.minutes, label: 'Minutes' },
                    { value: countdown.seconds, label: 'Seconds' },
                  ].map((item) => (
                    <div key={item.label} className="bg-white/5 rounded-xl p-4 min-w-[80px]">
                      <div className="text-3xl font-bold text-white">{String(item.value).padStart(2, '0')}</div>
                      <div className="text-xs text-gray-500">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Candidates List */}
            <div className="lg:col-span-2 space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Candidates</h2>
                <span className="text-gray-400">{categoryCandidates.length} nominees</span>
              </div>

              {categoryCandidates.length === 0 ? (
                <GlassCard className="p-12 text-center">
                  <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-400">No candidates yet</h3>
                  <p className="text-gray-500 mt-2">Candidates will appear here once nominations are approved.</p>
                </GlassCard>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {categoryCandidates.map((candidate, index) => {
                    const percentage = totalVotes > 0 ? (candidate.vote_count / totalVotes) * 100 : 0;
                    
                    return (
                      <GlassCard key={candidate._id} className="group overflow-hidden hover:scale-[1.02] transition-all duration-300">
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={candidate.profile_image || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop'}
                            alt={`${candidate.first_name} ${candidate.last_name}`}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                          
                          {/* Rank Badge */}
                          {canShowResults.canShow && index < 3 && (
                            <div className={`absolute top-3 left-3 w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                              index === 0 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                              index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-500' :
                              'bg-gradient-to-r from-amber-600 to-amber-700'
                            }`}>
                              #{index + 1}
                            </div>
                          )}

                          {candidate.is_featured && (
                            <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-500 to-orange-500 px-3 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1">
                              <Star className="w-3 h-3" />
                              Featured
                            </div>
                          )}

                          <div className="absolute bottom-3 left-3 right-3">
                            <div className="bg-black/50 backdrop-blur-sm px-3 py-2 rounded-lg flex items-center justify-between">
                              <span className="text-sm text-gray-300">Code: {candidate.candidate_code}</span>
                              {canShowResults.canShow && (
                                <span className="text-sm font-semibold text-white">{candidate.vote_count.toLocaleString()} votes</span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-5">
                          <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#0152be] transition">
                            {candidate.first_name} {candidate.last_name}
                          </h3>
                          <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                            {candidate.bio}
                          </p>
                          
                          {/* Progress Bar (if results visible) */}
                          {canShowResults.canShow && (
                            <div className="mb-4">
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-400">Vote Share</span>
                                <span className="text-white font-medium">{percentage.toFixed(1)}%</span>
                              </div>
                              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <div 
                                  className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-[#0152be] to-sky-500"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                            </div>
                          )}
                          
                          {votingInfo.status === 'active' && (
                            <Button 
                              className="w-full bg-gradient-to-r from-[#0152be] to-sky-500 hover:from-blue-700 hover:to-sky-600" 
                              size="sm"
                            >
                              <Vote className="w-4 h-4 mr-2" />
                              Vote Now
                            </Button>
                          )}
                        </div>
                      </GlassCard>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Results Restriction Notice */}
              {!canShowResults.canShow && (
                <GlassCard className="p-6">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                      {category.results_visibility === 'authenticated' ? (
                        <Lock className="w-8 h-8 text-gray-500" />
                      ) : category.results_visibility === 'admin_only' ? (
                        <ShieldCheck className="w-8 h-8 text-gray-500" />
                      ) : (
                        <EyeOff className="w-8 h-8 text-gray-500" />
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Results Hidden</h3>
                    <p className="text-gray-400 text-sm mb-4">{canShowResults.reason}</p>
                    
                    {category.results_visibility === 'authenticated' && (
                      <Link href="/login">
                        <Button className="w-full bg-gradient-to-r from-[#0152be] to-sky-500">
                          <Lock className="w-4 h-4 mr-2" />
                          Sign In to View
                        </Button>
                      </Link>
                    )}
                    
                    {!category.show_results_before_deadline && category.voting_deadline && votingInfo.status !== 'ended' && (
                      <div className="mt-4 p-4 rounded-lg bg-white/5">
                        <p className="text-xs text-gray-500 mb-1">Results available after</p>
                        <p className="text-white font-medium">
                          {format(new Date(category.voting_deadline), 'MMMM d, yyyy h:mm a')}
                        </p>
                      </div>
                    )}
                  </div>
                </GlassCard>
              )}

              {/* Category Info */}
              <GlassCard className="p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5 text-[#0152be]" />
                  Category Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Voting Rules</p>
                    <p className="text-white">{category.voting_rules || 'One vote per category'}</p>
                  </div>
                  
                  {category.voting_start_date && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Voting Started</p>
                      <p className="text-white">{format(new Date(category.voting_start_date), 'MMMM d, yyyy h:mm a')}</p>
                    </div>
                  )}
                  
                  {category.voting_deadline && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Voting Deadline</p>
                      <p className="text-white">{format(new Date(category.voting_deadline), 'MMMM d, yyyy h:mm a')}</p>
                    </div>
                  )}
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Results Visibility</p>
                    <div className={`inline-flex items-center gap-2 ${visibilityInfo.color} px-3 py-1 rounded-full text-sm`}>
                      <VisibilityIcon className="w-4 h-4" />
                      {visibilityInfo.label}
                    </div>
                  </div>
                  
                  {category.require_authentication && (
                    <div className="flex items-center gap-2 text-amber-400 text-sm">
                      <Lock className="w-4 h-4" />
                      <span>Authentication required to vote</span>
                    </div>
                  )}
                </div>
              </GlassCard>

              {/* Event Info */}
              {event && (
                <GlassCard className="p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-[#0152be]" />
                    Event Info
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                        <Image
                          src={event.logo_url || event.banner_url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=200'}
                          alt={event.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{event.name}</h4>
                        <p className="text-sm text-gray-400">{event.location?.city}, {event.location?.country}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{format(new Date(event.start_date), 'MMMM d, yyyy')}</span>
                    </div>
                    
                    <Link href={`/events/${event.slug}`}>
                      <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                        View Event
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </GlassCard>
              )}

              {/* Share */}
              <GlassCard className="p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-[#0152be]" />
                  Share Category
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  Help spread the word and encourage others to vote!
                </p>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="flex-1 border-white/20 text-white hover:bg-white/10">
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 border-white/20 text-white hover:bg-white/10">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* Other Categories */}
      {event && (
        <section className="py-16 bg-white/5">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">Other Categories in {event.name}</h2>
              <Link href={`/events/${event.slug}`} className="text-[#0152be] hover:text-sky-400 text-sm font-medium flex items-center gap-1">
                View Event
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockCategories
                .filter(c => c.event === event._id && c._id !== category._id)
                .slice(0, 3)
                .map((cat) => {
                  const catVotingStatus = cat.is_voting_open ? 'Voting Open' : 'Closed';
                  
                  return (
                    <Link key={cat._id} href={`/categories/${cat.slug}`}>
                      <GlassCard className="group p-6 hover:scale-[1.02] transition-all duration-300 cursor-pointer h-full">
                        <div className="flex items-start justify-between mb-4">
                          <div 
                            className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                              cat.color_theme ? '' : 'bg-gradient-to-br from-[#0152be] to-sky-500'
                            }`}
                            {...(cat.color_theme ? { 
                              style: { background: `linear-gradient(135deg, ${cat.color_theme}, ${cat.color_theme}99)` } as React.CSSProperties 
                            } : {})}
                          >
                            <Award className="w-6 h-6 text-white" />
                          </div>
                          {cat.is_featured && (
                            <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-xs font-semibold">
                              Featured
                            </span>
                          )}
                        </div>
                        
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#0152be] transition">
                          {cat.name}
                        </h3>
                        
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                          {cat.description}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Vote className="w-4 h-4" />
                            <span>{cat.total_votes.toLocaleString()}</span>
                          </div>
                          <span className={`text-xs font-medium ${cat.is_voting_open ? 'text-green-400' : 'text-gray-500'}`}>
                            {catVotingStatus}
                          </span>
                        </div>
                      </GlassCard>
                    </Link>
                  );
                })}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
