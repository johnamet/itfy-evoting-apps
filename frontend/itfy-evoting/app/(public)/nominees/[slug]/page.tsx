'use client';

import { useState, use, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { 
  ArrowLeft,
  Vote,
  Eye,
  Star,
  Award,
  Briefcase,
  Calendar,
  Trophy,
  Share2,
  ExternalLink,
  Play,
  ChevronRight,
  Quote,
  Lightbulb,
  Target,
  Users,
  Building,
  BookOpen,
  Code,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Github,
  Globe,
  Youtube,
  X,
  GraduationCap,
  Loader2
} from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import { candidatesApi } from '@/lib/api/candidates';
import { Candidate, Event, Category } from '@/types';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VoteDialog from '@/components/VoteDialog';
import { format } from 'date-fns';

type TabType = 'overview' | 'experience' | 'projects' | 'endorsements';

// Social icon mapping
const socialIcons: Record<string, React.ElementType> = {
  linkedin: Linkedin,
  twitter: Twitter,
  facebook: Facebook,
  instagram: Instagram,
  github: Github,
  website: Globe,
  portfolio: Globe,
  youtube: Youtube,
  tiktok: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
  ),
};

export default function NomineeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<string | null>(null);
  const [isVoteDialogOpen, setIsVoteDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [nominee, setNominee] = useState<Candidate | null>(null);
  const [event, setEvent] = useState<Event | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [rank, setRank] = useState<number>(0);
  const [relatedNominees, setRelatedNominees] = useState<Candidate[]>([]);
  
  // Fetch nominee data
  useEffect(() => {
    const fetchNomineeData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch the nominee by slug
        const response = await candidatesApi.getBySlug(resolvedParams.slug);
        const nomineeData = response.data;
        
        if (!nomineeData) {
          notFound();
        }
        
        setNominee(nomineeData);
        
        // Extract event and categories from populated data
        if (nomineeData.event && typeof nomineeData.event === 'object') {
          setEvent(nomineeData.event as unknown as Event);
        }
        
        if (nomineeData.categories && Array.isArray(nomineeData.categories)) {
          setCategories(nomineeData.categories as unknown as Category[]);
        }
        
        // Fetch candidates from same event to calculate rank
        if (nomineeData.event) {
          const eventId = typeof nomineeData.event === 'object' ? (nomineeData.event as any)._id : nomineeData.event;
          const eventCandidatesResponse = await candidatesApi.getByEvent(eventId, { page: 1, limit: 1000 });
          const eventCandidates = (eventCandidatesResponse.data || [])
            .sort((a, b) => b.vote_count - a.vote_count);
          const calculatedRank = eventCandidates.findIndex(c => c._id === nomineeData._id) + 1;
          setRank(calculatedRank);
          
          // Set related nominees (same event, excluding current nominee)
          const related = eventCandidates
            .filter(c => c._id !== nomineeData._id)
            .slice(0, 3);
          setRelatedNominees(related);
        }
      } catch (error) {
        console.error('Failed to fetch nominee data:', error);
        notFound();
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchNomineeData();
  }, [resolvedParams.slug]);
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Header />
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-[#0152be] animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Loading nominee...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  // Nominee not found
  if (!nominee) {
    notFound();
  }
  
  // Handle share
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${nominee.first_name} ${nominee.last_name} - Nominee`,
          text: nominee.bio || `Check out ${nominee.first_name} ${nominee.last_name}'s profile`,
          url: window.location.href,
        });
      } catch {
        // User cancelled or share failed
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };
  
  const tabs: { id: TabType; label: string; icon: React.ElementType }[] = [
    { id: 'overview', label: 'Overview', icon: Users },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'endorsements', label: 'Endorsements', icon: Quote },
  ];
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      
      {/* Hero Section with Cover Image */}
      <section className="relative pt-20">
        {/* Cover Image */}
        <div className="relative h-64 md:h-80 lg:h-96 bg-gradient-to-r from-[#0152be]/30 to-sky-500/30">
          {nominee.cover_image ? (
            <Image
              src={nominee.cover_image}
              alt=""
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0152be]/40 via-[#0152be]/20 to-transparent" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/50 to-transparent" />
          
          {/* Back Button */}
          <div className="absolute top-6 left-4 md:left-8 z-10">
            <Link
              href="/nominees"
              className="inline-flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-sm text-white rounded-lg hover:bg-black/70 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Nominees
            </Link>
          </div>
          
          {/* Share Button */}
          <div className="absolute top-6 right-4 md:right-8 z-10">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-sm text-white rounded-lg hover:bg-black/70 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>
        
        {/* Profile Section */}
        <div className="container mx-auto px-4 relative -mt-32 md:-mt-40 z-10">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Profile Image */}
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl border-4 border-gray-900 overflow-hidden bg-gray-800 flex-shrink-0 shadow-2xl">
              {nominee.profile_image ? (
                <Image
                  src={nominee.profile_image}
                  alt={`${nominee.first_name} ${nominee.last_name}`}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-[#0152be]/20 text-[#0152be] text-4xl font-bold">
                  {nominee.first_name[0]}{nominee.last_name[0]}
                </div>
              )}
              
              {/* Featured Badge */}
              {nominee.is_featured && (
                <div className="absolute -top-1 -right-1 p-1.5 bg-yellow-500 rounded-full">
                  <Star className="w-4 h-4 text-yellow-950 fill-current" />
                </div>
              )}
            </div>
            
            {/* Info */}
            <div className="flex-1 pt-2 md:pt-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {nominee.first_name} {nominee.last_name}
                  </h1>
                  
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 mb-4">
                    <span className="px-2 py-1 bg-gray-800 rounded text-gray-300">{nominee.candidate_code}</span>
                    {event && (
                      <Link href={`/events/${event.slug}`} className="flex items-center gap-1 text-sky-400 hover:text-sky-300">
                        <Calendar className="w-4 h-4" />
                        {event.name}
                      </Link>
                    )}
                    {rank > 0 && (
                      <span className="flex items-center gap-1">
                        <Trophy className="w-4 h-4 text-yellow-500" />
                        Rank #{rank}
                      </span>
                    )}
                  </div>
                  
                  {/* Categories */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {categories.map(cat => (
                      <Link
                        key={cat._id}
                        href={`/categories/${cat.slug}`}
                        className="px-3 py-1 bg-[#0152be]/20 text-[#0152be] rounded-full text-sm hover:bg-[#0152be]/30 transition-colors"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
                
                {/* Stats Cards */}
                <div className="flex gap-3">
                  <GlassCard className="px-4 py-3 text-center min-w-[100px]">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Vote className="w-5 h-5 text-[#0152be]" />
                      <span className="text-2xl font-bold text-white">{nominee.vote_count.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-gray-400">Total Votes</p>
                  </GlassCard>
                  
                  {nominee.view_count && (
                    <GlassCard className="px-4 py-3 text-center min-w-[100px]">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <Eye className="w-5 h-5 text-sky-500" />
                        <span className="text-2xl font-bold text-white">{nominee.view_count.toLocaleString()}</span>
                      </div>
                      <p className="text-xs text-gray-400">Views</p>
                    </GlassCard>
                  )}
                </div>
              </div>
              
              {/* Social Links */}
              {nominee.social_links && Object.keys(nominee.social_links).length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {Object.entries(nominee.social_links).map(([platform, url]) => {
                    if (!url) return null;
                    const Icon = socialIcons[platform] || Globe;
                    return (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors text-gray-400 hover:text-white"
                        title={platform.charAt(0).toUpperCase() + platform.slice(1)}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Tabs Navigation */}
      <section className="sticky top-16 z-30 bg-gray-900/80 backdrop-blur-sm border-y border-gray-800 mt-8">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-2 scrollbar-hide">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#0152be] text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Tab Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {activeTab === 'overview' && (
                <>
                  {/* Bio */}
                  <GlassCard className="p-6">
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5 text-[#0152be]" />
                      About
                    </h2>
                    <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                      {nominee.bio || 'No bio available.'}
                    </p>
                  </GlassCard>
                  
                  {/* Why Nominate Me */}
                  {nominee.why_nominate_me && (
                    <GlassCard className="p-6">
                      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-yellow-500" />
                        Why Nominate Me
                      </h2>
                      <p className="text-gray-300 leading-relaxed">
                        {nominee.why_nominate_me}
                      </p>
                    </GlassCard>
                  )}
                  
                  {/* Impact Statement */}
                  {nominee.impact_statement && (
                    <GlassCard className="p-6 bg-gradient-to-br from-[#0152be]/10 to-sky-500/10 border-[#0152be]/30">
                      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Target className="w-5 h-5 text-[#0152be]" />
                        Impact Statement
                      </h2>
                      <blockquote className="text-lg text-gray-200 italic border-l-4 border-[#0152be] pl-4">
                        &quot;{nominee.impact_statement}&quot;
                      </blockquote>
                    </GlassCard>
                  )}
                  
                  {/* Skills */}
                  {nominee.skills && nominee.skills.length > 0 && (
                    <GlassCard className="p-6">
                      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Award className="w-5 h-5 text-purple-500" />
                        Skills & Expertise
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {nominee.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 bg-purple-500/20 text-purple-300 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </GlassCard>
                  )}
                  
                  {/* Education */}
                  {nominee.education && nominee.education.length > 0 && (
                    <GlassCard className="p-6">
                      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-green-500" />
                        Education
                      </h2>
                      <div className="space-y-4">
                        {nominee.education.map((edu, index) => (
                          <div key={index} className="flex gap-4 p-4 bg-gray-800/50 rounded-lg">
                            <div className="p-2 bg-green-500/20 rounded-lg h-fit">
                              <BookOpen className="w-5 h-5 text-green-500" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-white">{edu.qualification} in {edu.field}</h3>
                              <p className="text-gray-400">{edu.institution}</p>
                              {edu.start_date && (
                                <p className="text-sm text-gray-500 mt-1">
                                  {format(new Date(edu.start_date), 'MMM yyyy')}
                                  {edu.end_date && ` - ${format(new Date(edu.end_date), 'MMM yyyy')}`}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </GlassCard>
                  )}
                  
                  {/* Achievements */}
                  {nominee.achievements && nominee.achievements.length > 0 && (
                    <GlassCard className="p-6">
                      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-yellow-500" />
                        Achievements
                      </h2>
                      <div className="space-y-4">
                        {nominee.achievements.map((achievement, index) => (
                          <div key={index} className="flex gap-4 p-4 bg-gray-800/50 rounded-lg">
                            <div className="p-2 bg-yellow-500/20 rounded-lg h-fit">
                              <Award className="w-5 h-5 text-yellow-500" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-white">{achievement.title}</h3>
                              {achievement.organization && (
                                <p className="text-gray-400">{achievement.organization}</p>
                              )}
                              {achievement.description && (
                                <p className="text-sm text-gray-300 mt-1">{achievement.description}</p>
                              )}
                              {achievement.date && (
                                <p className="text-sm text-gray-500 mt-1">
                                  {format(new Date(achievement.date), 'MMMM yyyy')}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </GlassCard>
                  )}
                </>
              )}
              
              {activeTab === 'experience' && (
                <>
                  {nominee.experience && nominee.experience.length > 0 ? (
                    <GlassCard className="p-6">
                      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-[#0152be]" />
                        Work Experience
                      </h2>
                      <div className="space-y-6">
                        {nominee.experience.map((exp, index) => (
                          <div key={index} className="relative pl-8 pb-6 border-l-2 border-gray-700 last:pb-0">
                            <div className="absolute left-0 top-0 -translate-x-1/2 p-2 bg-[#0152be]/20 rounded-full">
                              <Building className="w-4 h-4 text-[#0152be]" />
                            </div>
                            <div className="bg-gray-800/50 rounded-lg p-4 ml-4">
                              <div className="flex items-start justify-between gap-4">
                                <div>
                                  <h3 className="font-semibold text-white text-lg">{exp.position}</h3>
                                  <p className="text-[#0152be]">{exp.company}</p>
                                </div>
                                {exp.current && (
                                  <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                                    Current
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-400 mt-2">
                                {exp.start_date && format(new Date(exp.start_date), 'MMM yyyy')}
                                {' - '}
                                {exp.current ? 'Present' : (exp.end_date && format(new Date(exp.end_date), 'MMM yyyy'))}
                              </p>
                              {exp.description && (
                                <p className="text-gray-300 mt-3">{exp.description}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </GlassCard>
                  ) : (
                    <GlassCard className="p-12 text-center">
                      <Briefcase className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-white mb-2">No Experience Listed</h3>
                      <p className="text-gray-400">
                        This nominee hasn&apos;t added their work experience yet.
                      </p>
                    </GlassCard>
                  )}
                </>
              )}
              
              {activeTab === 'projects' && (
                <>
                  {nominee.projects && nominee.projects.length > 0 ? (
                    <div className="space-y-6">
                      <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Code className="w-5 h-5 text-[#0152be]" />
                        Projects & Initiatives
                      </h2>
                      <div className="grid gap-6">
                        {nominee.projects.map((project, index) => (
                          <GlassCard key={index} className="overflow-hidden">
                            <div className="flex flex-col md:flex-row">
                              {project.image && (
                                <div className="relative w-full md:w-64 h-48 flex-shrink-0">
                                  <Image
                                    src={project.image}
                                    alt={project.title || 'Project'}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              )}
                              <div className="p-6 flex-1">
                                <h3 className="font-bold text-white text-lg mb-2">{project.title}</h3>
                                {project.date && (
                                  <p className="text-sm text-gray-400 mb-3">
                                    {format(new Date(project.date), 'MMMM yyyy')}
                                  </p>
                                )}
                                <p className="text-gray-300 mb-4">{project.description}</p>
                                {project.url && (
                                  <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-[#0152be] hover:text-sky-400 transition-colors"
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                    View Project
                                  </a>
                                )}
                              </div>
                            </div>
                          </GlassCard>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <GlassCard className="p-12 text-center">
                      <Code className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-white mb-2">No Projects Listed</h3>
                      <p className="text-gray-400">
                        This nominee hasn&apos;t added any projects yet.
                      </p>
                    </GlassCard>
                  )}
                  
                  {/* Gallery */}
                  {nominee.gallery && nominee.gallery.length > 0 && (
                    <div className="mt-8">
                      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Eye className="w-5 h-5 text-sky-500" />
                        Gallery
                      </h2>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {nominee.gallery.map((image, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedGalleryImage(image)}
                            className="relative aspect-video rounded-lg overflow-hidden bg-gray-800 hover:ring-2 hover:ring-[#0152be] transition-all"
                            aria-label={`View gallery image ${index + 1}`}
                          >
                            <Image
                              src={image}
                              alt={`Gallery image ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Video */}
                  {nominee.video_url && (
                    <div className="mt-8">
                      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Play className="w-5 h-5 text-red-500" />
                        Introduction Video
                      </h2>
                      <GlassCard className="p-6">
                        <a
                          href={nominee.video_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors"
                        >
                          <div className="p-4 bg-red-500/20 rounded-lg">
                            <Play className="w-8 h-8 text-red-500" />
                          </div>
                          <div>
                            <p className="font-medium">Watch Introduction Video</p>
                            <p className="text-sm text-gray-500">{nominee.video_url}</p>
                          </div>
                          <ExternalLink className="w-5 h-5 ml-auto" />
                        </a>
                      </GlassCard>
                    </div>
                  )}
                </>
              )}
              
              {activeTab === 'endorsements' && (
                <>
                  {nominee.endorsements && nominee.endorsements.length > 0 ? (
                    <div className="space-y-6">
                      <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Quote className="w-5 h-5 text-[#0152be]" />
                        Endorsements
                      </h2>
                      {nominee.endorsements.map((endorsement, index) => (
                        <GlassCard key={index} className="p-6">
                          <div className="flex gap-4">
                            <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gray-800 flex-shrink-0">
                              {endorsement.image ? (
                                <Image
                                  src={endorsement.image}
                                  alt={endorsement.name}
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <div className="flex items-center justify-center h-full bg-[#0152be]/20 text-[#0152be] font-bold">
                                  {endorsement.name.split(' ').map(n => n[0]).join('')}
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-white">{endorsement.name}</h3>
                              {endorsement.position && (
                                <p className="text-sm text-gray-400 mb-3">{endorsement.position}</p>
                              )}
                              {endorsement.message && (
                                <blockquote className="text-gray-300 italic border-l-2 border-[#0152be] pl-4">
                                  &quot;{endorsement.message}&quot;
                                </blockquote>
                              )}
                            </div>
                          </div>
                        </GlassCard>
                      ))}
                    </div>
                  ) : (
                    <GlassCard className="p-12 text-center">
                      <Quote className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-white mb-2">No Endorsements Yet</h3>
                      <p className="text-gray-400">
                        This nominee hasn&apos;t received any endorsements yet.
                      </p>
                    </GlassCard>
                  )}
                </>
              )}
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Vote CTA */}
              <GlassCard className="p-6 bg-gradient-to-br from-[#0152be]/20 to-sky-500/20 border-[#0152be]/30">
                <h3 className="text-lg font-bold text-white mb-4 text-center">
                  Support {nominee.first_name}
                </h3>
                <button 
                  onClick={() => setIsVoteDialogOpen(true)}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#0152be] text-white font-semibold rounded-lg hover:bg-[#0152be]/90 transition-colors"
                >
                  <Vote className="w-5 h-5" />
                  Vote Now
                </button>
                <p className="text-center text-sm text-gray-400 mt-3">
                  {nominee.vote_count.toLocaleString()} votes received
                </p>
              </GlassCard>
              
              {/* Tags */}
              {nominee.tags && nominee.tags.length > 0 && (
                <GlassCard className="p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {nominee.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              )}
              
              {/* Quick Stats */}
              <GlassCard className="p-6">
                <h3 className="text-lg font-bold text-white mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Event</span>
                    <span className="text-white">{event?.name || 'N/A'}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Categories</span>
                    <span className="text-white">{categories.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Rank</span>
                    <span className="text-white">#{rank}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Nominated</span>
                    <span className="text-white">
                      {nominee.nomination_date 
                        ? format(new Date(nominee.nomination_date), 'MMM dd, yyyy')
                        : 'N/A'}
                    </span>
                  </div>
                </div>
              </GlassCard>
              
              {/* Related Nominees */}
              <GlassCard className="p-6">
                <h3 className="text-lg font-bold text-white mb-4">Related Nominees</h3>
                <div className="space-y-3">
                  {relatedNominees.map(related => (
                    <Link
                      key={related._id}
                      href={`/nominees/${related.slug}`}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
                    >
                      <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-800 flex-shrink-0">
                        {related.profile_image ? (
                          <Image
                            src={related.profile_image}
                            alt={`${related.first_name} ${related.last_name}`}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full bg-[#0152be]/20 text-[#0152be] text-sm font-bold">
                            {related.first_name[0]}{related.last_name[0]}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium truncate">
                          {related.first_name} {related.last_name}
                        </p>
                        <p className="text-sm text-gray-400">{related.vote_count.toLocaleString()} votes</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-600" />
                    </Link>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>
      
      {/* Gallery Modal */}
      {selectedGalleryImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedGalleryImage(null)}
        >
          <button
            className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-full"
            onClick={() => setSelectedGalleryImage(null)}
          >
            <X className="w-6 h-6" />
            <span className="sr-only">Close</span>
          </button>
          <div className="relative max-w-4xl max-h-[80vh] w-full h-full">
            <Image
              src={selectedGalleryImage}
              alt="Gallery image"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
      
      {/* Vote Dialog */}
      <VoteDialog
        open={isVoteDialogOpen}
        onOpenChange={setIsVoteDialogOpen}
        candidate={nominee}
        category={categories[0]}
        eventName={event?.name}
      />
      
      <Footer />
    </div>
  );
}
