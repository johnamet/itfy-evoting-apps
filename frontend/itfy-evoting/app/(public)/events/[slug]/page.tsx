'use client';

import { useParams } from 'next/navigation';
import { format, formatDistanceToNow, differenceInSeconds, differenceInDays, differenceInHours, differenceInMinutes } from 'date-fns';
import { 
  Calendar, MapPin, Trophy, ArrowRight, Clock, Users, 
  Share2, Heart, Vote, ChevronRight, Award, Star,
  Globe, Info, CheckCircle2, Timer, Play,
  Tag, Mail, Phone, ExternalLink, AlertCircle, Lock,
  EyeOff, ShieldCheck, Mic, Crown, ImageIcon, X,
  Navigation, Building2, Wifi, Car, Ticket, DollarSign,
  UserPlus, CalendarClock, AlertTriangle
} from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { RegistrationFormDialog } from '@/components/RegistrationFormDialog';
import { mockEvents } from '@/lib/mocks/events';
import { mockCategories } from '@/lib/mocks/categories';
import { mockCandidates } from '@/lib/mocks/candidates';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useMemo, useCallback } from 'react';

export default function EventDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [activeTab, setActiveTab] = useState<'overview' | 'categories' | 'candidates' | 'results' | 'timeline' | 'gallery'>('overview');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<string | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isHeroHovered, setIsHeroHovered] = useState(false);
  const [isRegistrationDialogOpen, setIsRegistrationDialogOpen] = useState(false);

  // Find the event by slug
  const event = mockEvents.find(e => e.slug === slug);

  // Get categories for this event
  const eventCategories = mockCategories.filter(cat => cat.event === event?._id);

  // Get candidates for this event
  const eventCandidates = mockCandidates.filter(cand => cand.event === event?._id);

  // Get candidates for selected category
  const categoryCandidates = selectedCategory 
    ? eventCandidates.filter(cand => cand.categories.includes(selectedCategory))
    : eventCandidates;

  // Calculate countdown target date and label
  const countdownInfo = useMemo(() => {
    if (!event) return { targetDate: null, label: '', isEnded: true };
    
    const now = new Date();
    const startDate = new Date(event.start_date);
    const endDate = new Date(event.end_date);
    
    if (now < startDate) {
      return { targetDate: startDate, label: 'Voting Opens In', isEnded: false, isUpcoming: true };
    } else if (now >= startDate && now < endDate) {
      return { targetDate: endDate, label: 'Voting Ends In', isEnded: false, isUpcoming: false };
    } else {
      return { targetDate: null, label: 'Event Ended', isEnded: true, isUpcoming: false };
    }
  }, [event]);

  // Hero slideshow images - use gallery if available, otherwise fall back to banner
  const heroSlideImages = useMemo(() => {
    if (event?.gallery && event.gallery.length > 0) {
      return event.gallery;
    }
    return [event?.banner_url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2940&auto=format&fit=crop'];
  }, [event]);

  // Auto-advance slideshow
  useEffect(() => {
    if (heroSlideImages.length <= 1 || isHeroHovered) return;

    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % heroSlideImages.length);
    }, 6000); // Change slide every 6 seconds

    return () => clearInterval(interval);
  }, [heroSlideImages.length, isHeroHovered]);

  // Go to specific slide
  const goToSlide = useCallback((index: number) => {
    setCurrentSlideIndex(index);
  }, []);

  // Countdown timer effect
  useEffect(() => {
    if (!countdownInfo.targetDate) return;

    const updateCountdown = () => {
      const now = new Date();
      const target = countdownInfo.targetDate!;
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
  }, [countdownInfo.targetDate]);

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Header />
        <div className="container mx-auto px-6 py-32 text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
            <Info className="w-12 h-12 text-gray-500" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Event Not Found</h1>
          <p className="text-gray-400 mb-8">The event you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link href="/events">
            <Button className="bg-gradient-to-r from-[#0152be] to-sky-500">
              Browse Events
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMMM d, yyyy');
  };

  const formatTime = (dateString: string) => {
    return format(new Date(dateString), 'h:mm a');
  };

  const formatTimelineDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, h:mm a');
  };

  const getRelativeTime = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'from-green-500 to-emerald-500';
      case 'upcoming': return 'from-blue-500 to-cyan-500';
      case 'archived': return 'from-gray-500 to-gray-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Voting Open';
      case 'upcoming': return 'Coming Soon';
      case 'archived': return 'Ended';
      default: return status;
    }
  };

  // Check if results should be visible for a category
  // Takes into account: results_visibility, show_results_before_deadline, and voting_deadline
  const canShowResults = (category: typeof eventCategories[0], isAuthenticated: boolean = false, isAdmin: boolean = false) => {
    const now = new Date();
    const votingEnded = category.voting_deadline ? new Date(category.voting_deadline) <= now : false;
    
    // If voting hasn't ended yet, check show_results_before_deadline
    if (!votingEnded && !category.show_results_before_deadline) {
      return { canShow: false, reason: 'Results will be available after voting ends' };
    }
    
    // Check visibility based on results_visibility setting
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

  // Get visibility badge info for category
  const getVisibilityInfo = (visibility: string) => {
    switch (visibility) {
      case 'public':
        return { label: 'Public Results', color: 'bg-green-500/20 text-green-400', icon: Globe };
      case 'authenticated':
        return { label: 'Members Only', color: 'bg-blue-500/20 text-blue-400', icon: Users };
      case 'admin_only':
        return { label: 'Admin Only', color: 'bg-red-500/20 text-red-400', icon: AlertCircle };
      default:
        return { label: 'Public', color: 'bg-green-500/20 text-green-400', icon: Globe };
    }
  };

  // TODO: Replace with actual auth state
  const isAuthenticated = false;
  const isAdmin = false;

  const stats = [
    { label: 'Total Votes', value: event.total_votes.toLocaleString(), icon: Vote, color: 'from-[#0152be] to-sky-500' },
    { label: 'Categories', value: eventCategories.length.toString(), icon: Award, color: 'from-purple-500 to-pink-500' },
    { label: 'Candidates', value: eventCandidates.length.toString(), icon: Users, color: 'from-green-500 to-emerald-500' },
    { label: 'Attendees', value: event.current_attendees?.toLocaleString() || '0', icon: Users, color: 'from-yellow-500 to-orange-500' },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Info },
    { id: 'timeline', label: 'Timeline', icon: Timer },
    { id: 'categories', label: 'Categories', icon: Award },
    { id: 'candidates', label: 'Candidates', icon: Users },
    { id: 'results', label: 'Results', icon: Trophy },
    ...(event.gallery && event.gallery.length > 0 ? [{ id: 'gallery', label: 'Gallery', icon: ImageIcon }] : []),
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      
      {/* Hero Banner with Animated Slideshow */}
      <section 
        className="relative pt-20"
        onMouseEnter={() => setIsHeroHovered(true)}
        onMouseLeave={() => setIsHeroHovered(false)}
      >
        <div className="relative h-[500px] overflow-hidden">
          {/* Slideshow Images */}
          {heroSlideImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentSlideIndex 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-105'
              }`}
            >
              <Image
                src={image}
                alt={`${event.name} - Slide ${index + 1}`}
                fill
                className={`object-cover transition-transform duration-[8000ms] ease-linear ${
                  index === currentSlideIndex ? 'scale-110' : 'scale-100'
                }`}
                priority={index === 0}
              />
            </div>
          ))}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-gray-900/30 z-10" />
          
          {/* Status Badge */}
          <div className="absolute top-8 left-8 z-20">
            <div className={`bg-gradient-to-r ${getStatusColor(event.status)} px-6 py-3 rounded-full text-white font-bold flex items-center gap-2 shadow-xl`}>
              {event.status === 'active' && <span className="w-2 h-2 bg-white rounded-full animate-pulse" />}
              {getStatusLabel(event.status)}
            </div>
          </div>

          {/* Featured Badge */}
          {event.is_featured && (
            <div className="absolute top-8 right-8 z-20">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 px-6 py-3 rounded-full text-white font-bold flex items-center gap-2 shadow-xl">
                <Trophy className="w-5 h-5" />
                Featured Event
              </div>
            </div>
          )}

          {/* Slideshow Indicators */}
          {heroSlideImages.length > 1 && (
            <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
              {heroSlideImages.map((_, index) => (
                <button
                  key={index}
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentSlideIndex 
                      ? 'w-8 h-2 bg-white' 
                      : 'w-2 h-2 bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Event Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-20">
            <div className="container mx-auto">
              <div className="max-w-4xl">
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm border border-white/20">
                    {event.event_type.charAt(0).toUpperCase() + event.event_type.slice(1)}
                  </span>
                  <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm border border-white/20 flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    {event.visibility}
                  </span>
                  {heroSlideImages.length > 1 && (
                    <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm border border-white/20 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" />
                      {heroSlideImages.length} Photos
                    </span>
                  )}
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                  {event.name}
                </h1>
                
                <p className="text-xl text-gray-200 mb-6 max-w-2xl">
                  {event.description}
                </p>

                <div className="flex flex-wrap gap-6 text-gray-200">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#0152be]" />
                    <span>{formatDate(event.start_date)} - {formatDate(event.end_date)}</span>
                  </div>
                  {event.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-[#0152be]" />
                      <span>{event.location.name || event.location.city}, {event.location.country}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#0152be]" />
                    <span>{formatTime(event.start_date)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-gray-900/50 backdrop-blur-xl border-y border-white/10">
        <div className="container mx-auto px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center flex-shrink-0`}>
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Countdown Timer */}
      {!countdownInfo.isEnded && (
        <section className="bg-gradient-to-r from-[#0152be]/20 to-sky-500/10 border-y border-[#0152be]/30">
          <div className="container mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                  countdownInfo.isUpcoming 
                    ? 'bg-gradient-to-br from-blue-500 to-cyan-500' 
                    : 'bg-gradient-to-br from-green-500 to-emerald-500'
                }`}>
                  {countdownInfo.isUpcoming ? (
                    <Clock className="w-8 h-8 text-white" />
                  ) : (
                    <Play className="w-8 h-8 text-white" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{countdownInfo.label}</h3>
                  <p className="text-gray-400">
                    {countdownInfo.isUpcoming 
                      ? `Event starts ${getRelativeTime(event.start_date)}`
                      : `Event ends ${getRelativeTime(event.end_date)}`
                    }
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20">
                    <span className="text-3xl font-bold text-white">{countdown.days}</span>
                  </div>
                  <span className="text-sm text-gray-400 mt-2 block">Days</span>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20">
                    <span className="text-3xl font-bold text-white">{countdown.hours}</span>
                  </div>
                  <span className="text-sm text-gray-400 mt-2 block">Hours</span>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20">
                    <span className="text-3xl font-bold text-white">{countdown.minutes}</span>
                  </div>
                  <span className="text-sm text-gray-400 mt-2 block">Minutes</span>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20">
                    <span className="text-3xl font-bold text-[#0152be]">{countdown.seconds}</span>
                  </div>
                  <span className="text-sm text-gray-400 mt-2 block">Seconds</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Event Ended Banner */}
      {countdownInfo.isEnded && (
        <section className="bg-gradient-to-r from-gray-800/50 to-gray-700/30 border-y border-gray-700/50">
          <div className="container mx-auto px-6 py-6">
            <div className="flex items-center justify-center gap-4">
              <AlertCircle className="w-6 h-6 text-gray-400" />
              <p className="text-gray-300 font-medium">This event has ended. You can still view results and candidate information.</p>
            </div>
          </div>
        </section>
      )}

      {/* Action Buttons */}
      <section className="container mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-4">
          {event.status === 'active' && (
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-[#0152be] to-sky-500 hover:from-blue-700 hover:to-sky-600 shadow-lg hover:shadow-[#0152be]/50 transition-all"
            >
              <Vote className="w-5 h-5 mr-2" />
              Vote Now
            </Button>
          )}
          <Button 
            size="lg" 
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Share Event
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            <Heart className="w-5 h-5 mr-2" />
            Save
          </Button>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="container mx-auto px-6">
        <div className="flex gap-2 overflow-x-auto pb-4 border-b border-white/10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'bg-gradient-to-r from-[#0152be] to-sky-500 text-white' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Tab Content */}
      <section className="container mx-auto px-6 py-12">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* About Event */}
              <GlassCard className="p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Info className="w-6 h-6 text-[#0152be]" />
                  About This Event
                </h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {event.description}
                  </p>
                  <p className="text-gray-300 leading-relaxed mt-4">
                    Join us for an exciting celebration of Ghana&apos;s brightest young tech talents. 
                    This event brings together innovators, developers, and tech enthusiasts from 
                    across the nation to recognize outstanding achievements in the technology sector.
                  </p>
                </div>
              </GlassCard>

              {/* Event Schedule */}
              <GlassCard className="p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Timer className="w-6 h-6 text-[#0152be]" />
                  Event Schedule
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0152be] to-sky-500 flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">Event Start</div>
                      <div className="text-gray-400">{formatDate(event.start_date)} at {formatTime(event.start_date)}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                      <Vote className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">Voting Period</div>
                      <div className="text-gray-400">Open throughout the event duration</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">Awards Ceremony</div>
                      <div className="text-gray-400">{formatDate(event.end_date)} at {formatTime(event.end_date)}</div>
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Featured Categories Preview */}
              <GlassCard className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <Award className="w-6 h-6 text-[#0152be]" />
                    Award Categories
                  </h2>
                  <button 
                    onClick={() => setActiveTab('categories')}
                    className="text-[#0152be] hover:text-sky-400 flex items-center gap-1 font-medium"
                  >
                    View All <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {eventCategories.slice(0, 4).map((category) => (
                    <div 
                      key={category._id}
                      className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition cursor-pointer group"
                      onClick={() => {
                        setSelectedCategory(category._id);
                        setActiveTab('candidates');
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-white group-hover:text-[#0152be] transition">{category.name}</h3>
                          <p className="text-sm text-gray-400">{category.total_votes.toLocaleString()} votes</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-[#0152be] group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* Guests of Honor */}
              {event.guestOfHonor && event.guestOfHonor.length > 0 && (
                <GlassCard className="p-8">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Crown className="w-6 h-6 text-yellow-500" />
                    Guests of Honor
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {event.guestOfHonor.map((guest, index) => (
                      <div 
                        key={index}
                        className="group relative bg-gradient-to-br from-yellow-500/10 to-orange-500/5 rounded-2xl p-6 border border-yellow-500/20 hover:border-yellow-500/40 transition-all"
                      >
                        <div className="flex items-start gap-4">
                          <div className="relative flex-shrink-0">
                            <div className="w-20 h-20 rounded-xl overflow-hidden ring-2 ring-yellow-500/30">
                              <Image
                                src={guest.photo_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop'}
                                alt={guest.name}
                                width={80}
                                height={80}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                              <Crown className="w-3 h-3 text-white" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-white text-lg group-hover:text-yellow-400 transition">{guest.name}</h3>
                            {guest.title && (
                              <p className="text-yellow-400/80 text-sm font-medium mt-1">{guest.title}</p>
                            )}
                            {guest.bio && (
                              <p className="text-gray-400 text-sm mt-2 line-clamp-3">{guest.bio}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              )}

              {/* Speakers */}
              {event.speakers && event.speakers.length > 0 && (
                <GlassCard className="p-8">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Mic className="w-6 h-6 text-[#0152be]" />
                    Speakers
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {event.speakers.map((speaker, index) => (
                      <div 
                        key={index}
                        className="group relative bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-all border border-white/10 hover:border-[#0152be]/30"
                      >
                        <div className="flex items-start gap-4">
                          <div className="relative flex-shrink-0">
                            <div className="w-20 h-20 rounded-xl overflow-hidden ring-2 ring-white/10">
                              <Image
                                src={speaker.photo_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop'}
                                alt={speaker.name}
                                width={80}
                                height={80}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-[#0152be] to-sky-500 rounded-full flex items-center justify-center">
                              <Mic className="w-3 h-3 text-white" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-white text-lg group-hover:text-[#0152be] transition">{speaker.name}</h3>
                            {speaker.title && (
                              <p className="text-[#0152be]/80 text-sm font-medium mt-1">{speaker.title}</p>
                            )}
                            {speaker.bio && (
                              <p className="text-gray-400 text-sm mt-2 line-clamp-3">{speaker.bio}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              )}

              {/* Gallery Preview */}
              {event.gallery && event.gallery.length > 0 && (
                <GlassCard className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                      <ImageIcon className="w-6 h-6 text-[#0152be]" />
                      Event Gallery
                    </h2>
                    <button 
                      onClick={() => setActiveTab('gallery')}
                      className="text-[#0152be] hover:text-sky-400 flex items-center gap-1 font-medium"
                    >
                      View All <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {event.gallery.slice(0, 6).map((image, index) => (
                      <div
                        key={index}
                        className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
                        onClick={() => setSelectedGalleryImage(image)}
                      >
                        <Image
                          src={image}
                          alt={`Gallery image ${index + 1}`}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                          <ImageIcon className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        {index === 5 && event.gallery!.length > 6 && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">+{event.gallery!.length - 6}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </GlassCard>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Voting Card */}
              <GlassCard className="p-6 bg-gradient-to-br from-[#0152be]/20 to-sky-500/10 border-[#0152be]/30">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Vote className="w-5 h-5 text-[#0152be]" />
                  Cast Your Vote
                </h3>
                <p className="text-gray-300 mb-6">
                  Support your favorite nominees by voting. Each vote counts towards determining the winners!
                </p>
                <Button className="w-full bg-gradient-to-r from-[#0152be] to-sky-500 hover:from-blue-700 hover:to-sky-600">
                  Start Voting
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </GlassCard>

              {/* Registration Card */}
              {(event.max_attendees || event.registration_fee || event.registration_deadline) && (() => {
                const now = new Date();
                const registrationDeadline = event.registration_deadline ? new Date(event.registration_deadline) : null;
                const eventStart = new Date(event.start_date);
                const isRegistrationOpen = registrationDeadline ? now < registrationDeadline && now < eventStart : now < eventStart;
                const isFull = event.max_attendees ? (event.current_attendees || 0) >= event.max_attendees : false;
                const spotsRemaining = event.max_attendees ? Math.max(0, event.max_attendees - (event.current_attendees || 0)) : null;
                const isFree = event.registration_fee?.is_free !== false && (!event.registration_fee?.amount || event.registration_fee.amount === 0);
                
                return (
                  <GlassCard className="p-6 space-y-5">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${event.color_theme || '#0152be'}20` }}
                      >
                        <Ticket className="w-5 h-5" style={{ color: event.color_theme || '#0152be' }} />
                      </div>
                      Registration
                    </h3>

                    {/* Registration Status Badge */}
                    <div className="flex items-center gap-2">
                      {isFull ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/20 text-red-400 text-sm font-medium">
                          <AlertTriangle className="w-4 h-4" />
                          Event Full
                        </span>
                      ) : !isRegistrationOpen ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-500/20 text-gray-400 text-sm font-medium">
                          <Lock className="w-4 h-4" />
                          Registration Closed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/20 text-green-400 text-sm font-medium">
                          <CheckCircle2 className="w-4 h-4" />
                          Registration Open
                        </span>
                      )}
                    </div>

                    {/* Fee Info */}
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: isFree ? '#22c55e20' : `${event.color_theme || '#0152be'}20` }}
                      >
                        <DollarSign className="w-5 h-5" style={{ color: isFree ? '#22c55e' : event.color_theme || '#0152be' }} />
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Registration Fee</div>
                        {isFree ? (
                          <div className="text-green-400 font-semibold">Free Entry</div>
                        ) : (
                          <div className="text-white font-semibold">
                            {event.registration_fee?.currency || event.currency} {event.registration_fee?.amount?.toLocaleString()}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Capacity Info */}
                    {event.max_attendees && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400 flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            Capacity
                          </span>
                          <span className="text-white">
                            {event.current_attendees || 0} / {event.max_attendees}
                          </span>
                        </div>
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all duration-500"
                            style={{ 
                              width: `${Math.min(100, ((event.current_attendees || 0) / event.max_attendees) * 100)}%`,
                              backgroundColor: isFull ? '#ef4444' : spotsRemaining && spotsRemaining < 50 ? '#f59e0b' : event.color_theme || '#0152be'
                            }}
                          />
                        </div>
                        {spotsRemaining !== null && spotsRemaining > 0 && (
                          <p className={`text-sm ${spotsRemaining < 50 ? 'text-amber-400' : 'text-gray-400'}`}>
                            {spotsRemaining < 50 ? (
                              <span className="flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" />
                                Only {spotsRemaining} spots left!
                              </span>
                            ) : (
                              `${spotsRemaining} spots remaining`
                            )}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Registration Deadline */}
                    {event.registration_deadline && (
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                          <CalendarClock className="w-5 h-5 text-gray-400" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-400">Registration Deadline</div>
                          <div className={`font-medium ${registrationDeadline && registrationDeadline < now ? 'text-red-400' : 'text-white'}`}>
                            {format(new Date(event.registration_deadline), 'MMM d, yyyy • h:mm a')}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Register Button */}
                    <Button 
                      className="w-full py-6 text-lg font-semibold transition-all duration-300"
                      style={{ 
                        backgroundColor: isFull || !isRegistrationOpen ? '#4b5563' : event.color_theme || '#0152be',
                        cursor: isFull || !isRegistrationOpen ? 'not-allowed' : 'pointer'
                      }}
                      disabled={isFull || !isRegistrationOpen}
                      onClick={() => isRegistrationOpen && !isFull && setIsRegistrationDialogOpen(true)}
                    >
                      {isFull ? (
                        <>
                          <AlertTriangle className="mr-2 w-5 h-5" />
                          Event Full
                        </>
                      ) : !isRegistrationOpen ? (
                        <>
                          <Lock className="mr-2 w-5 h-5" />
                          Registration Closed
                        </>
                      ) : (
                        <>
                          <UserPlus className="mr-2 w-5 h-5" />
                          Register Now
                        </>
                      )}
                    </Button>
                  </GlassCard>
                );
              })()}

              {/* Share Card */}
              <GlassCard className="p-6">
                <h3 className="text-xl font-bold text-white mb-4">Share This Event</h3>
                <div className="flex gap-3">
                  <button aria-label="Share on Facebook" className="w-12 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </button>
                  <button aria-label="Share on Twitter" className="w-12 h-12 rounded-xl bg-sky-500 hover:bg-sky-600 flex items-center justify-center transition">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                  </button>
                  <button aria-label="Share on WhatsApp" className="w-12 h-12 rounded-xl bg-green-500 hover:bg-green-600 flex items-center justify-center transition">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </button>
                  <button aria-label="Copy link" className="w-12 h-12 rounded-xl bg-gray-600 hover:bg-gray-700 flex items-center justify-center transition">
                    <Share2 className="w-5 h-5 text-white" />
                  </button>
                </div>
              </GlassCard>

              {/* Organizer & Contact Info */}
              {(event.organizer || event.contact_email) && (
                <GlassCard className="p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Organizer</h3>
                  <div className="space-y-4">
                    {event.organizer?.name && (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                          <Users className="w-5 h-5 text-[#0152be]" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-400">Organization</div>
                          <div className="text-white">{event.organizer.name}</div>
                        </div>
                      </div>
                    )}
                    {(event.organizer?.email || event.contact_email) && (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                          <Mail className="w-5 h-5 text-[#0152be]" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-400">Email</div>
                          <a href={`mailto:${event.organizer?.email || event.contact_email}`} className="text-[#0152be] hover:underline">
                            {event.organizer?.email || event.contact_email}
                          </a>
                        </div>
                      </div>
                    )}
                    {event.organizer?.phone && (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                          <Phone className="w-5 h-5 text-[#0152be]" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-400">Phone</div>
                          <a href={`tel:${event.organizer.phone}`} className="text-white hover:text-[#0152be]">
                            {event.organizer.phone}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </GlassCard>
              )}

              {/* Tags */}
              {event.tags && event.tags.length > 0 && (
                <GlassCard className="p-6">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Tag className="w-5 h-5 text-[#0152be]" />
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="bg-white/10 text-gray-300 px-3 py-1 rounded-full text-sm border border-white/10 hover:bg-white/20 transition cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              )}

              {/* Social Links */}
              {event.social_links && (
                <GlassCard className="p-6">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <ExternalLink className="w-5 h-5 text-[#0152be]" />
                    Follow Event
                  </h3>
                  <div className="flex gap-3">
                    {event.social_links.facebook && (
                      <a href={event.social_links.facebook} target="_blank" rel="noopener noreferrer" title="Follow on Facebook" aria-label="Follow on Facebook" className="w-10 h-10 rounded-lg bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                      </a>
                    )}
                    {event.social_links.twitter && (
                      <a href={event.social_links.twitter} target="_blank" rel="noopener noreferrer" title="Follow on Twitter/X" aria-label="Follow on Twitter/X" className="w-10 h-10 rounded-lg bg-sky-500 hover:bg-sky-600 flex items-center justify-center transition">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                      </a>
                    )}
                    {event.social_links.instagram && (
                      <a href={event.social_links.instagram} target="_blank" rel="noopener noreferrer" title="Follow on Instagram" aria-label="Follow on Instagram" className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 flex items-center justify-center transition">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                      </a>
                    )}
                    {event.social_links.linkedin && (
                      <a href={event.social_links.linkedin} target="_blank" rel="noopener noreferrer" title="Follow on LinkedIn" aria-label="Follow on LinkedIn" className="w-10 h-10 rounded-lg bg-blue-700 hover:bg-blue-800 flex items-center justify-center transition">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      </a>
                    )}
                  </div>
                </GlassCard>
              )}

              {/* Location & Directions */}
              {event.location && (event.location.directions?.length || event.location.venueInfo?.length || event.location.coordinates) && (
                <GlassCard className="p-6 space-y-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${event.color_theme || '#0152be'}20` }}
                    >
                      <Navigation className="w-5 h-5" style={{ color: event.color_theme || '#0152be' }} />
                    </div>
                    Getting There
                  </h3>

                  {/* Venue Info */}
                  {event.location.venueInfo && event.location.venueInfo.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        Venue Information
                      </h4>
                      <ul className="space-y-2">
                        {event.location.venueInfo.map((info, index) => (
                          <li key={index} className="flex items-start gap-3 text-gray-300">
                            <div 
                              className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                              style={{ backgroundColor: `${event.color_theme || '#0152be'}20` }}
                            >
                              {info.toLowerCase().includes('parking') ? (
                                <Car className="w-3 h-3" style={{ color: event.color_theme || '#0152be' }} />
                              ) : info.toLowerCase().includes('wifi') ? (
                                <Wifi className="w-3 h-3" style={{ color: event.color_theme || '#0152be' }} />
                              ) : (
                                <CheckCircle2 className="w-3 h-3" style={{ color: event.color_theme || '#0152be' }} />
                              )}
                            </div>
                            <span className="text-sm">{info}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Directions */}
                  {event.location.directions && event.location.directions.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Directions
                      </h4>
                      <ol className="space-y-3">
                        {event.location.directions.map((direction, index) => (
                          <li key={index} className="flex items-start gap-3 text-gray-300">
                            <div 
                              className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold"
                              style={{ 
                                backgroundColor: `${event.color_theme || '#0152be'}20`,
                                color: event.color_theme || '#0152be'
                              }}
                            >
                              {index + 1}
                            </div>
                            <span className="text-sm">{direction}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {/* Google Maps Embed */}
                  {event.location.coordinates && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        Map Location
                      </h4>
                      <div className="rounded-xl overflow-hidden border border-white/10">
                        <iframe
                          src={`https://maps.google.com/maps?q=${event.location.coordinates.lat},${event.location.coordinates.lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                          width="100%"
                          height="250"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title={`Map showing ${event.location.name || 'event location'}`}
                          className="grayscale hover:grayscale-0 transition-all duration-500"
                        />
                      </div>
                      
                      {/* Open in Google Maps Button */}
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${event.location.coordinates.lat},${event.location.coordinates.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3 rounded-lg text-white font-medium transition-all duration-300 hover:scale-[1.02]"
                        style={{ backgroundColor: event.color_theme || '#0152be' }}
                      >
                        <ExternalLink className="w-4 h-4" />
                        Open in Google Maps
                      </a>
                    </div>
                  )}
                </GlassCard>
              )}
            </div>
          </div>
        )}

        {/* Timeline Tab */}
        {activeTab === 'timeline' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Event Timeline</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Follow the complete schedule of activities and milestones for this event.
              </p>
            </div>

            {event.timeline && event.timeline.length > 0 ? (
              <div className="max-w-3xl mx-auto">
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#0152be] via-sky-500 to-purple-500" />
                  
                  {/* Timeline Items */}
                  <div className="space-y-8">
                    {event.timeline.map((item, index) => {
                      const itemDate = new Date(item.time);
                      const now = new Date();
                      const isPast = itemDate < now;
                      const isCurrent = index < event.timeline!.length - 1 
                        ? itemDate <= now && new Date(event.timeline![index + 1].time) > now
                        : itemDate <= now;
                      
                      return (
                        <div key={index} className="relative flex gap-6">
                          {/* Timeline Node */}
                          <div className={`relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                            isCurrent 
                              ? 'bg-gradient-to-br from-green-500 to-emerald-500 ring-4 ring-green-500/30 animate-pulse' 
                              : isPast 
                                ? 'bg-gradient-to-br from-[#0152be] to-sky-500' 
                                : 'bg-white/10 border border-white/20'
                          }`}>
                            {isCurrent ? (
                              <Play className="w-7 h-7 text-white" />
                            ) : isPast ? (
                              <CheckCircle2 className="w-7 h-7 text-white" />
                            ) : (
                              <Clock className="w-7 h-7 text-gray-400" />
                            )}
                          </div>
                          
                          {/* Timeline Content */}
                          <GlassCard className={`flex-1 p-6 ${isCurrent ? 'border-green-500/50 bg-green-500/5' : ''}`}>
                            <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                              <div>
                                <h3 className={`text-xl font-bold ${isCurrent ? 'text-green-400' : 'text-white'}`}>
                                  {item.title}
                                </h3>
                                {isCurrent && (
                                  <span className="inline-flex items-center gap-1 text-green-400 text-sm mt-1">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                    Happening Now
                                  </span>
                                )}
                              </div>
                              <div className="text-right">
                                <div className={`text-sm font-medium ${isPast ? 'text-gray-500' : 'text-[#0152be]'}`}>
                                  {formatTimelineDate(item.time)}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {getRelativeTime(item.time)}
                                </div>
                              </div>
                            </div>
                            {item.description && (
                              <p className="text-gray-400">{item.description}</p>
                            )}
                          </GlassCard>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <Timer className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400">No timeline available</h3>
                <p className="text-gray-500 mt-2">The event schedule will be updated soon</p>
              </div>
            )}
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Award Categories</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Explore all the categories and vote for your favorites in each one.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventCategories.map((category) => {
                const visibilityInfo = getVisibilityInfo(category.results_visibility);
                const VisibilityIcon = visibilityInfo.icon;
                const resultsCheck = canShowResults(category, isAuthenticated, isAdmin);
                const votingEnded = category.voting_deadline ? new Date(category.voting_deadline) <= new Date() : false;
                
                return (
                  <GlassCard 
                    key={category._id}
                    className="group p-6 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                    onClick={() => {
                      setSelectedCategory(category._id);
                      setActiveTab('candidates');
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div 
                        className="w-14 h-14 rounded-xl flex items-center justify-center"
                        style={{ 
                          background: category.color_theme 
                            ? `linear-gradient(135deg, ${category.color_theme}, ${category.color_theme}aa)` 
                            : 'linear-gradient(135deg, #0152be, #0ea5e9)' 
                        }}
                      >
                        <Award className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {category.is_featured && (
                          <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-semibold">
                            Featured
                          </span>
                        )}
                        <span className={`${visibilityInfo.color} px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1`}>
                          <VisibilityIcon className="w-3 h-3" />
                          {visibilityInfo.label}
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#0152be] transition">
                      {category.name}
                    </h3>
                    
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {category.description || 'Vote for the best in this category'}
                    </p>

                    {/* Results availability info */}
                    {!resultsCheck.canShow && (
                      <div className="mb-4 p-3 rounded-lg bg-white/5 border border-white/10">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <EyeOff className="w-4 h-4" />
                          <span>{resultsCheck.reason}</span>
                        </div>
                      </div>
                    )}

                    {/* Voting deadline info */}
                    {category.voting_deadline && (
                      <div className="mb-4 flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>
                          {votingEnded 
                            ? `Voting ended ${format(new Date(category.voting_deadline), 'MMM d, yyyy')}`
                            : `Voting ends ${format(new Date(category.voting_deadline), 'MMM d, yyyy h:mm a')}`
                          }
                        </span>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Users className="w-4 h-4" />
                        <span>{category.candidates.length} Candidates</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#0152be]">
                        <Vote className="w-4 h-4" />
                        <span>{category.total_votes.toLocaleString()} Votes</span>
                      </div>
                    </div>

                    {category.is_voting_open && !votingEnded ? (
                      <div className="mt-4 flex items-center gap-2 text-green-400 text-sm">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Voting Open</span>
                      </div>
                    ) : votingEnded ? (
                      <div className="mt-4 flex items-center gap-2 text-gray-500 text-sm">
                        <Lock className="w-4 h-4" />
                        <span>Voting Closed</span>
                      </div>
                    ) : null}
                  </GlassCard>
                );
              })}
            </div>
          </div>
        )}

        {/* Candidates Tab */}
        {activeTab === 'candidates' && (
          <div className="space-y-8">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  !selectedCategory 
                    ? 'bg-gradient-to-r from-[#0152be] to-sky-500 text-white' 
                    : 'bg-white/10 text-gray-400 hover:bg-white/20'
                }`}
              >
                All Candidates
              </button>
              {eventCategories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => setSelectedCategory(cat._id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    selectedCategory === cat._id 
                      ? 'bg-gradient-to-r from-[#0152be] to-sky-500 text-white' 
                      : 'bg-white/10 text-gray-400 hover:bg-white/20'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Candidates Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categoryCandidates.filter(c => c.status === 'approved' && c.is_published).map((candidate) => (
                <GlassCard 
                  key={candidate._id}
                  className="group overflow-hidden hover:scale-[1.02] transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={candidate.profile_image || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop'}
                      alt={`${candidate.first_name} ${candidate.last_name}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                    
                    {candidate.is_featured && (
                      <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-500 to-orange-500 px-3 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Featured
                      </div>
                    )}

                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="bg-black/50 backdrop-blur-sm px-3 py-2 rounded-lg flex items-center justify-between">
                        <span className="text-sm text-gray-300">Code: {candidate.candidate_code}</span>
                        <span className="text-sm font-semibold text-white">{candidate.vote_count.toLocaleString()} votes</span>
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
                    
                    <Button className="w-full bg-gradient-to-r from-[#0152be] to-sky-500 hover:from-blue-700 hover:to-sky-600" size="sm">
                      <Vote className="w-4 h-4 mr-2" />
                      Vote
                    </Button>
                  </div>
                </GlassCard>
              ))}
            </div>

            {categoryCandidates.filter(c => c.status === 'approved' && c.is_published).length === 0 && (
              <div className="text-center py-16">
                <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400">No candidates found</h3>
                <p className="text-gray-500 mt-2">Try selecting a different category</p>
              </div>
            )}
          </div>
        )}

        {/* Results Tab */}
        {activeTab === 'results' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Live Results</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                See real-time voting results for each category. Results are updated automatically.
              </p>
            </div>

            {eventCategories.map((category) => {
              const catCandidates = eventCandidates
                .filter(c => c.categories.includes(category._id) && c.status === 'approved')
                .sort((a, b) => b.vote_count - a.vote_count);
              
              const totalVotes = catCandidates.reduce((sum, c) => sum + c.vote_count, 0);
              const resultsCheck = canShowResults(category, isAuthenticated, isAdmin);
              const visibilityInfo = getVisibilityInfo(category.results_visibility);
              const VisibilityIcon = visibilityInfo.icon;
              const votingEnded = category.voting_deadline ? new Date(category.voting_deadline) <= new Date() : false;

              return (
                <GlassCard key={category._id} className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ 
                          background: category.color_theme 
                            ? `linear-gradient(135deg, ${category.color_theme}, ${category.color_theme}aa)` 
                            : 'linear-gradient(135deg, #0152be, #0ea5e9)' 
                        }}
                      >
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{category.name}</h3>
                        <p className="text-sm text-gray-400">{totalVotes.toLocaleString()} total votes</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`${visibilityInfo.color} px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1`}>
                        <VisibilityIcon className="w-3 h-3" />
                        {visibilityInfo.label}
                      </span>
                      {!votingEnded && (
                        <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                          <Play className="w-3 h-3" />
                          Live
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Show results or restriction message */}
                  {resultsCheck.canShow ? (
                    <div className="space-y-4">
                      {catCandidates.slice(0, 5).map((candidate, index) => {
                        const percentage = totalVotes > 0 ? (candidate.vote_count / totalVotes) * 100 : 0;
                        
                        return (
                          <div key={candidate._id} className="flex items-center gap-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                              index === 0 ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white' :
                              index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-500 text-white' :
                              index === 2 ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white' :
                              'bg-white/10 text-gray-400'
                            }`}>
                              {index + 1}
                            </div>
                            
                            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                              <Image
                                src={candidate.profile_image || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'}
                                alt={candidate.first_name}
                                width={48}
                                height={48}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-medium text-white">
                                  {candidate.first_name} {candidate.last_name}
                                </span>
                                <span className="text-sm text-gray-400">
                                  {candidate.vote_count.toLocaleString()} ({percentage.toFixed(1)}%)
                                </span>
                              </div>
                              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full transition-all duration-500 progress-bar ${
                                    index === 0 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                                    'bg-gradient-to-r from-[#0152be] to-sky-500'
                                  }`}
                                  style={{ '--progress': `${percentage}%` } as React.CSSProperties}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      
                      {catCandidates.length > 5 && (
                        <div className="pt-4 border-t border-white/10 text-center">
                          <button className="text-[#0152be] hover:text-sky-400 text-sm font-medium transition">
                            View all {catCandidates.length} candidates →
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Results restricted */
                    <div className="py-12 text-center">
                      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
                        {category.results_visibility === 'authenticated' ? (
                          <Lock className="w-10 h-10 text-gray-500" />
                        ) : category.results_visibility === 'admin_only' ? (
                          <ShieldCheck className="w-10 h-10 text-gray-500" />
                        ) : (
                          <EyeOff className="w-10 h-10 text-gray-500" />
                        )}
                      </div>
                      <h4 className="text-lg font-semibold text-gray-300 mb-2">Results Not Available</h4>
                      <p className="text-gray-500 mb-6 max-w-sm mx-auto">{resultsCheck.reason}</p>
                      
                      {category.results_visibility === 'authenticated' && !isAuthenticated && (
                        <Link href="/login">
                          <Button className="bg-gradient-to-r from-[#0152be] to-sky-500 hover:from-blue-700 hover:to-sky-600">
                            <Lock className="w-4 h-4 mr-2" />
                            Sign In to View Results
                          </Button>
                        </Link>
                      )}
                      
                      {!category.show_results_before_deadline && !votingEnded && category.voting_deadline && (
                        <div className="mt-4 p-4 rounded-lg bg-white/5 inline-flex items-center gap-3">
                          <Clock className="w-5 h-5 text-[#0152be]" />
                          <div className="text-left">
                            <p className="text-sm text-gray-400">Results available after</p>
                            <p className="text-white font-medium">
                              {format(new Date(category.voting_deadline), 'MMMM d, yyyy h:mm a')}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </GlassCard>
              );
            })}
          </div>
        )}

        {/* Gallery Tab */}
        {activeTab === 'gallery' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Event Gallery</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Browse through the moments captured during this event.
              </p>
            </div>

            {event.gallery && event.gallery.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {event.gallery.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group"
                    onClick={() => setSelectedGalleryImage(image)}
                  >
                    <Image
                      src={image}
                      alt={`Gallery image ${index + 1}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <ImageIcon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <ImageIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400">No gallery images available</h3>
                <p className="text-gray-500 mt-2">Event photos will be added soon</p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Gallery Lightbox Modal */}
      {selectedGalleryImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedGalleryImage(null)}
        >
          <button
            aria-label="Close gallery"
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition z-10"
            onClick={() => setSelectedGalleryImage(null)}
          >
            <X className="w-6 h-6 text-white" />
          </button>
          
          <div 
            className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedGalleryImage}
              alt="Gallery image"
              fill
              className="object-contain"
            />
          </div>

          {/* Navigation buttons for gallery */}
          {event.gallery && event.gallery.length > 1 && (
            <>
              <button
                aria-label="Previous image"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = event.gallery!.indexOf(selectedGalleryImage);
                  const prevIndex = currentIndex === 0 ? event.gallery!.length - 1 : currentIndex - 1;
                  setSelectedGalleryImage(event.gallery![prevIndex]);
                }}
              >
                <ChevronRight className="w-6 h-6 text-white rotate-180" />
              </button>
              <button
                aria-label="Next image"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = event.gallery!.indexOf(selectedGalleryImage);
                  const nextIndex = currentIndex === event.gallery!.length - 1 ? 0 : currentIndex + 1;
                  setSelectedGalleryImage(event.gallery![nextIndex]);
                }}
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </>
          )}

          {/* Image counter */}
          {event.gallery && event.gallery.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
              {event.gallery.indexOf(selectedGalleryImage) + 1} / {event.gallery.length}
            </div>
          )}
        </div>
      )}

      {/* Registration Form Dialog */}
      <RegistrationFormDialog 
        event={event}
        open={isRegistrationDialogOpen}
        onOpenChange={setIsRegistrationDialogOpen}
      />

      <Footer />
    </div>
  );
}
