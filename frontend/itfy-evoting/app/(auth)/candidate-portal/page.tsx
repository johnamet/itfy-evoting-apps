'use client';

/**
 * Candidate Portal Dashboard - Redesigned
 * Vibrant, modern interface with full feature integration
 */

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Mail,
  Phone,
  Award,
  Vote,
  TrendingUp,
  Edit,
  LogOut,
  Share2,
  BarChart3,
  Eye,
  Camera,
  Shield,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Loader2,
  ArrowLeft,
  Copy,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Globe,
  FileText,
  GraduationCap,
  Briefcase,
  Star,
  Upload,
  Sparkles,
  TrendingDown,
  Users,
  Heart,
  Calendar,
  ExternalLink,
  RefreshCw,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

import { CandidateAuthGuard } from '@/components/providers/AuthGuard';
import { useCandidateAuth } from '@/components/providers/AuthProvider';
import { candidatesApi, type CandidateStatsResponse } from '@/lib/api/candidates';
import { EditProfileModal } from '@/components/EditProfileModal';
import { ImageUploadCard } from '@/components/candidate-portal/ImageUploadCard';
import { GalleryManager } from '@/components/candidate-portal/GalleryManager';
import { ProfileHistoryViewer } from '@/components/candidate-portal/ProfileHistoryViewer';
import { CategoryRequestDialog } from '@/components/candidate-portal/CategoryRequestDialog';
import ChangePasswordDialog from '@/components/candidate-portal/ChangePasswordDialog';
import type { Candidate, Category } from '@/types';

// Status Badge Component
function StatusBadge({ status }: { status: Candidate['status'] }) {
  const statusConfig = {
    pending: {
      label: 'Pending Review',
      icon: Clock,
      className: 'bg-yellow-500/10 text-yellow-700 border-yellow-500/30 shadow-yellow-500/20',
    },
    approved: {
      label: 'Approved',
      icon: CheckCircle2,
      className: 'bg-green-500/10 text-green-700 border-green-500/30 shadow-green-500/20',
    },
    rejected: {
      label: 'Rejected',
      icon: XCircle,
      className: 'bg-red-500/10 text-red-700 border-red-500/30 shadow-red-500/20',
    },
    profile_update_pending: {
      label: 'Update Pending',
      icon: AlertCircle,
      className: 'bg-blue-500/10 text-blue-700 border-blue-500/30 shadow-blue-500/20',
    },
    pending_profile_completion: {
      label: 'Complete Profile',
      icon: Edit,
      className: 'bg-orange-500/10 text-orange-700 border-orange-500/30 shadow-orange-500/20',
    },
  };

  const config = statusConfig[status] || statusConfig.pending;
  const Icon = config.icon;

  return (
    <Badge variant="outline" className={`${config.className} shadow-sm`}>
      <Icon className="mr-1.5 h-3.5 w-3.5" />
      {config.label}
    </Badge>
  );
}

// Animated Stat Card
function StatCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  color = 'primary',
}: {
  title: string;
  value: string | number;
  icon: React.ElementType;
  description?: string;
  trend?: { value: number; isPositive: boolean };
  color?: 'primary' | 'green' | 'blue' | 'purple' | 'orange';
}) {
  const colorClasses = {
    primary: 'from-primary/10 to-primary/5 text-primary border-primary/20',
    green: 'from-green-500/10 to-green-500/5 text-green-600 border-green-500/20',
    blue: 'from-blue-500/10 to-blue-500/5 text-blue-600 border-blue-500/20',
    purple: 'from-purple-500/10 to-purple-500/5 text-purple-600 border-purple-500/20',
    orange: 'from-orange-500/10 to-orange-500/5 text-orange-600 border-orange-500/20',
  };

  return (
    <Card className="border-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div
            className={`h-12 w-12 rounded-xl bg-gradient-to-br ${colorClasses[color]} border flex items-center justify-center shadow-sm`}
          >
            <Icon className="h-6 w-6" />
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
            {trend && (
              <Badge
                variant="secondary"
                className={`${
                  trend.isPositive
                    ? 'bg-green-500/10 text-green-700 border-green-500/20'
                    : 'bg-red-500/10 text-red-700 border-red-500/20'
                }`}
              >
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </Badge>
            )}
          </div>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Share Profile Dialog
function ShareProfileDialog({ candidate }: { candidate: Candidate }) {
  const profileUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/nominees/${candidate.slug}`
      : '';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast.success('Link copied to clipboard!');
  };

  const shareOnSocial = (platform: string) => {
    const encodedUrl = encodeURIComponent(profileUrl);
    const text = encodeURIComponent(
      `Vote for ${candidate.first_name} ${candidate.last_name}!`
    );

    const urls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${text}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      whatsapp: `https://wa.me/?text=${text}%20${encodedUrl}`,
    };

    window.open(urls[platform], '_blank', 'width=600,height=400');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-2 hover:border-primary hover:bg-primary/5"
        >
          <Share2 className="mr-2 h-4 w-4" />
          Share Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5 text-primary" />
            Share Your Profile
          </DialogTitle>
          <DialogDescription>
            Share your candidate profile to get more votes
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={profileUrl}
              readOnly
              aria-label="Profile URL"
              className="flex-1 px-3 py-2 border-2 rounded-lg bg-muted text-sm"
            />
            <Button size="sm" onClick={copyToClipboard} title="Copy link">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <Separator />
          <div className="grid grid-cols-4 gap-3">
            <Button
              variant="outline"
              size="icon"
              className="h-14 w-full"
              onClick={() => shareOnSocial('facebook')}
              title="Share on Facebook"
            >
              <Facebook className="h-6 w-6 text-blue-600" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-14 w-full"
              onClick={() => shareOnSocial('twitter')}
              title="Share on Twitter"
            >
              <Twitter className="h-6 w-6 text-sky-500" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-14 w-full"
              onClick={() => shareOnSocial('linkedin')}
              title="Share on LinkedIn"
            >
              <Linkedin className="h-6 w-6 text-blue-700" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-14 w-full"
              onClick={() => shareOnSocial('whatsapp')}
              title="Share on WhatsApp"
            >
              <svg className="h-6 w-6 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Main Portal Content
function CandidatePortalContent() {
  const router = useRouter();
  const { logout, isLoading: authLoading } = useCandidateAuth();

  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [stats, setStats] = useState<CandidateStatsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = useCallback(async (showToast = false) => {
    try {
      setIsLoading(true);
      if (showToast) setIsRefreshing(true);

      const profileResponse = await candidatesApi.getMyProfile();

      if (profileResponse.success && profileResponse.data) {
        setCandidate(profileResponse.data);

        try {
          const statsResponse = await candidatesApi.getMyStats();
          if (statsResponse.success && statsResponse.data) {
            setStats(statsResponse.data);
          }
        } catch (statsError) {
          console.log('Stats not available:', statsError);
        }

        if (showToast) {
          toast.success('Profile refreshed!');
        }
      } else {
        throw new Error('Failed to load profile');
      }
    } catch (error) {
      console.error('Error fetching candidate data:', error);
      toast.error('Failed to load profile data');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle unauthorized events (401 errors)
  useEffect(() => {
    const handleUnauthorized = () => {
      toast.error('Your session has expired. Please login again.');
      logout();
      router.push('/candidate/login');
    };

    window.addEventListener('candidate:unauthorized', handleUnauthorized);
    
    return () => {
      window.removeEventListener('candidate:unauthorized', handleUnauthorized);
    };
  }, [logout, router]);

  const handleProfileUpdate = (updatedCandidate: Candidate) => {
    setCandidate(updatedCandidate);
    toast.success('Profile updated! Changes are pending admin approval.');
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    router.push('/candidate/login');
  };

  // Image upload handlers
  const handleProfileImageUpload = async (file: File) => {
    const response = await candidatesApi.uploadMyProfileImage(file);
    if (response.success && response.data) {
      setCandidate((prev) =>
        prev ? { ...prev, profile_image: response.data.image_url } : null
      );
    }
  };

  const handleProfileImageDelete = async () => {
    await candidatesApi.deleteMyProfileImage();
    setCandidate((prev) => (prev ? { ...prev, profile_image: '' } : null));
  };

  const handleCoverImageUpload = async (file: File) => {
    const response = await candidatesApi.uploadMyCoverImage(file);
    if (response.success && response.data) {
      setCandidate((prev) =>
        prev ? { ...prev, cover_image: response.data.image_url } : null
      );
    }
  };

  const handleGalleryUpload = async (files: File[]) => {
    const response = await candidatesApi.uploadMyGalleryImages(files);
    if (response.success && response.data) {
      setCandidate((prev) =>
        prev ? { ...prev, gallery: response.data.gallery } : null
      );
    }
  };

  const handleGalleryDelete = async (imageUrl: string) => {
    await candidatesApi.deleteMyGalleryImage(imageUrl);
    setCandidate((prev) =>
      prev
        ? { ...prev, gallery: prev.gallery?.filter((img) => img !== imageUrl) || [] }
        : null
    );
  };

  if (isLoading || authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground animate-pulse">Loading your portal...</p>
        </div>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5">
        <Card className="w-full max-w-md border-2">
          <CardContent className="text-center py-12">
            <XCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Profile Not Found</h2>
            <p className="text-muted-foreground mb-6">
              Unable to load your profile. Please try logging in again.
            </p>
            <Button size="lg" onClick={() => router.push('/candidate/login')}>
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const fullName = `${candidate.first_name} ${candidate.last_name}`;
  const initials = `${candidate.first_name.charAt(0)}${candidate.last_name.charAt(0)}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-blue-950/30 dark:to-purple-950/30">
      {/* Animated Header */}
      <header className="sticky top-0 z-50 w-full border-b-2 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 shadow-sm">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="hover:bg-primary/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Candidate Portal
              </h1>
              <p className="text-xs text-muted-foreground">Manage your campaign</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => fetchData(true)}
              disabled={isRefreshing}
              className="hover:bg-primary/10"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>
            <ShareProfileDialog candidate={candidate} />
            <Button
              variant="destructive"
              size="sm"
              onClick={handleLogout}
              className="shadow-sm"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section with Cover & Profile */}
      <div className="relative">
        {/* Cover Image */}
        <div className="h-56 bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 relative overflow-hidden">
          {candidate.cover_image ? (
            <Image src={candidate.cover_image} alt="Cover" fill className="object-cover" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-20" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        {/* Profile Info */}
        <div className="container px-4">
          <div className="relative -mt-20 flex flex-col md:flex-row md:items-end gap-6 pb-6">
            {/* Avatar with glow effect */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
              <Avatar className="relative h-40 w-40 border-4 border-background shadow-2xl ring-4 ring-primary/20">
                <AvatarImage src={candidate.profile_image || undefined} alt={fullName} />
                <AvatarFallback className="text-4xl font-bold bg-gradient-to-br from-primary to-purple-600 text-white">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Name & Status */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                  {fullName}
                </h2>
                <StatusBadge status={candidate.status} />
                {candidate.is_featured && (
                  <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-lg shadow-amber-500/50">
                    <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                    Featured
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 mb-3">
                <code className="px-3 py-1.5 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-lg text-sm font-mono font-semibold border-2">
                  {candidate.candidate_code}
                </code>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-primary/10"
                        onClick={() => {
                          navigator.clipboard.writeText(candidate.candidate_code);
                          toast.success('Code copied!');
                        }}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Copy candidate code</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  {candidate.email}
                </span>
                {candidate.phone_number && (
                  <span className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-green-600" />
                    {candidate.phone_number}
                  </span>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2">
              <Button
                onClick={() => setIsEditModalOpen(true)}
                className="shadow-lg bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="container px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Votes"
            value={stats?.total_votes ?? candidate.vote_count ?? 0}
            icon={Vote}
            description="Votes received"
            color="green"
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Current Rank"
            value={stats?.rank ? `#${stats.rank}` : '--'}
            icon={Award}
            description="In your categories"
            color="blue"
          />
          <StatCard
            title="Vote Share"
            value={stats?.percentage ? `${stats.percentage.toFixed(1)}%` : '--'}
            icon={TrendingUp}
            description="Of category votes"
            color="purple"
          />
          <StatCard
            title="Profile Views"
            value={stats?.view_count ?? candidate.view_count ?? 0}
            icon={Eye}
            description="Visitors"
            color="orange"
            trend={{ value: 8, isPositive: true }}
          />
        </div>
      </div>

      {/* Main Tabs */}
      <div className="container px-4 pb-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 h-auto p-1 bg-muted/50 border-2">
            <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-purple-600 data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="media" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-purple-600 data-[state=active]:text-white">
              Media
            </TabsTrigger>
            <TabsTrigger value="votes" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-purple-600 data-[state=active]:text-white">
              Votes
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-purple-600 data-[state=active]:text-white">
              Profile
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-purple-600 data-[state=active]:text-white">
              History
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab - Will continue in next part */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Categories Card */}
              <Card className="border-2 hover:shadow-xl transition-shadow">
                <CardHeader className="bg-gradient-to-r from-blue-500/5 via-blue-500/10 to-blue-500/5">
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-blue-600" />
                    Nominated Categories
                  </CardTitle>
                  <CardDescription>Categories you&apos;re competing in</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {candidate.categories && candidate.categories.length > 0 ? (
                    <div className="space-y-3 mb-4">
                      {candidate.categories.map((category) => {
                        const categoryData = category as unknown as Category;
                        const categoryName =
                          typeof category === 'string' ? `Category` : categoryData.name;
                        const categoryId =
                          typeof category === 'string' ? category : categoryData._id;

                        return (
                          <div
                            key={categoryId}
                            className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 border-2 border-blue-500/10 hover:border-blue-500/30 transition-colors"
                          >
                            <span className="font-semibold text-slate-900 dark:text-white">
                              {categoryName}
                            </span>
                            <Badge className="bg-green-500/10 text-green-700 border-green-500/20">
                              Active
                            </Badge>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-8">
                      No categories assigned yet
                    </p>
                  )}
                  
                  {/* Category Request Button - Will add logic later */}
                  <CategoryRequestDialog
                    currentCategories={candidate.categories?.map(c => typeof c === 'string' ? c : (c as unknown as Category)._id) || []}
                    availableCategories={[]}
                    onSuccess={() => fetchData(true)}
                  />
                </CardContent>
              </Card>

              {/* Bio Card */}
              <Card className="border-2 hover:shadow-xl transition-shadow">
                <CardHeader className="bg-gradient-to-r from-purple-500/5 via-purple-500/10 to-purple-500/5">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-purple-600" />
                    About Me
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {candidate.bio ? (
                    <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                      {candidate.bio}
                    </p>
                  ) : (
                    <Alert className="border-2 border-purple-500/20 bg-purple-500/5">
                      <AlertCircle className="h-4 w-4 text-purple-600" />
                      <AlertDescription className="text-purple-700">
                        Add a bio to help voters know more about you.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>

              {/* Why Vote Card */}
              <Card className="border-2 hover:shadow-xl transition-shadow">
                <CardHeader className="bg-gradient-to-r from-green-500/5 via-green-500/10 to-green-500/5">
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-green-600" />
                    Why Vote for Me?
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {candidate.why_nominate_me ? (
                    <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                      {candidate.why_nominate_me}
                    </p>
                  ) : (
                    <Alert className="border-2 border-green-500/20 bg-green-500/5">
                      <AlertCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-700">
                        Tell voters why they should vote for you.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>

              {/* Social Links Card */}
              <Card className="border-2 hover:shadow-xl transition-shadow">
                <CardHeader className="bg-gradient-to-r from-pink-500/5 via-pink-500/10 to-pink-500/5">
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-pink-600" />
                    Social Links
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {candidate.social_links &&
                  Object.values(candidate.social_links).some((v) => v) ? (
                    <div className="flex flex-wrap gap-2">
                      {candidate.social_links.facebook && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="border-2 hover:border-blue-600 hover:bg-blue-50"
                        >
                          <a
                            href={candidate.social_links.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Facebook className="h-4 w-4 mr-2 text-blue-600" />
                            Facebook
                          </a>
                        </Button>
                      )}
                      {candidate.social_links.twitter && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="border-2 hover:border-sky-500 hover:bg-sky-50"
                        >
                          <a
                            href={candidate.social_links.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Twitter className="h-4 w-4 mr-2 text-sky-500" />
                            Twitter
                          </a>
                        </Button>
                      )}
                      {candidate.social_links.instagram && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="border-2 hover:border-pink-600 hover:bg-pink-50"
                        >
                          <a
                            href={candidate.social_links.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Instagram className="h-4 w-4 mr-2 text-pink-600" />
                            Instagram
                          </a>
                        </Button>
                      )}
                      {candidate.social_links.linkedin && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="border-2 hover:border-blue-700 hover:bg-blue-50"
                        >
                          <a
                            href={candidate.social_links.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Linkedin className="h-4 w-4 mr-2 text-blue-700" />
                            LinkedIn
                          </a>
                        </Button>
                      )}
                      {candidate.social_links.website && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="border-2 hover:border-purple-600 hover:bg-purple-50"
                        >
                          <a
                            href={candidate.social_links.website}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Globe className="h-4 w-4 mr-2 text-purple-600" />
                            Website
                          </a>
                        </Button>
                      )}
                    </div>
                  ) : (
                    <Alert className="border-2 border-pink-500/20 bg-pink-500/5">
                      <AlertCircle className="h-4 w-4 text-pink-600" />
                      <AlertDescription className="text-pink-700">
                        Add social links to increase your visibility.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Media Tab - Image Uploads */}
          <TabsContent value="media" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <ImageUploadCard
                title="Profile Image"
                description="Your main profile photo (square recommended)"
                currentImage={candidate.profile_image}
                onUpload={handleProfileImageUpload}
                onDelete={handleProfileImageDelete}
                aspectRatio="square"
                icon={Camera}
              />
              <ImageUploadCard
                title="Cover Image"
                description="Banner image for your profile (wide recommended)"
                currentImage={candidate.cover_image}
                onUpload={handleCoverImageUpload}
                aspectRatio="video"
                icon={Camera}
              />
            </div>
            <GalleryManager
              images={candidate.gallery || []}
              onUpload={handleGalleryUpload}
              onDelete={handleGalleryDelete}
            />
          </TabsContent>

          {/* Votes Tab */}
          <TabsContent value="votes" className="space-y-6">
            <Card className="border-2">
              <CardHeader className="bg-gradient-to-r from-green-500/5 via-green-500/10 to-green-500/5">
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                  Vote Statistics
                </CardTitle>
                <CardDescription>Track your voting performance over time</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Vote Summary */}
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-500/20">
                      <p className="text-4xl font-bold text-green-600 mb-1">
                        {stats?.total_votes ?? candidate.vote_count ?? 0}
                      </p>
                      <p className="text-sm text-muted-foreground font-medium">Total Votes</p>
                    </div>
                    <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-2 border-blue-500/20">
                      <p className="text-4xl font-bold text-blue-600 mb-1">
                        {stats?.rank ? `#${stats.rank}` : '--'}
                      </p>
                      <p className="text-sm text-muted-foreground font-medium">Current Rank</p>
                    </div>
                    <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-500/20">
                      <p className="text-4xl font-bold text-purple-600 mb-1">
                        {stats?.percentage ? `${stats.percentage.toFixed(1)}%` : '--'}
                      </p>
                      <p className="text-sm text-muted-foreground font-medium">Vote Share</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {stats?.percentage && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-medium">
                        <span>Vote Progress</span>
                        <span className="text-primary">{stats.percentage.toFixed(1)}%</span>
                      </div>
                      <Progress value={stats.percentage} className="h-3" />
                    </div>
                  )}

                  {/* Vote Trend */}
                  {stats?.votes_over_time && stats.votes_over_time.length > 0 ? (
                    <div className="space-y-4">
                      <h4 className="font-semibold">Recent Voting Activity</h4>
                      <div className="space-y-2">
                        {stats.votes_over_time.slice(-7).reverse().map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between py-3 px-4 border-2 rounded-lg hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm font-medium">
                                {new Date(item.date).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                })}
                              </span>
                            </div>
                            <Badge className="bg-green-500/10 text-green-700 border-green-500/20">
                              +{item.count} votes
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Alert className="border-2 border-green-500/20 bg-green-500/5">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-700">
                        No voting activity yet. Share your profile to get more votes!
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Education */}
              <Card className="border-2 hover:shadow-xl transition-shadow">
                <CardHeader className="bg-gradient-to-r from-blue-500/5 via-blue-500/10 to-blue-500/5">
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-blue-600" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {candidate.education && candidate.education.length > 0 ? (
                    <div className="space-y-4">
                      {candidate.education.map((edu, index) => (
                        <div
                          key={index}
                          className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-500/5 rounded-r-lg"
                        >
                          <h4 className="font-semibold text-slate-900 dark:text-white">
                            {edu.qualification}
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {edu.institution}
                          </p>
                          {edu.field && (
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              {edu.field}
                            </p>
                          )}
                          {(edu.start_date || edu.end_date) && (
                            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {edu.start_date} - {edu.end_date || 'Present'}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Alert className="border-2 border-blue-500/20 bg-blue-500/5">
                      <AlertCircle className="h-4 w-4 text-blue-600" />
                      <AlertDescription className="text-blue-700">
                        Add your educational background.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>

              {/* Experience */}
              <Card className="border-2 hover:shadow-xl transition-shadow">
                <CardHeader className="bg-gradient-to-r from-green-500/5 via-green-500/10 to-green-500/5">
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-green-600" />
                    Experience
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {candidate.experience && candidate.experience.length > 0 ? (
                    <div className="space-y-4">
                      {candidate.experience.map((exp, index) => (
                        <div
                          key={index}
                          className="border-l-4 border-green-500 pl-4 py-2 bg-green-500/5 rounded-r-lg"
                        >
                          <h4 className="font-semibold text-slate-900 dark:text-white">
                            {exp.position}
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {exp.company}
                          </p>
                          {exp.description && (
                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                              {exp.description}
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {exp.start_date} - {exp.current ? 'Present' : exp.end_date}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Alert className="border-2 border-green-500/20 bg-green-500/5">
                      <AlertCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-700">
                        Add your work experience.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>

              {/* Skills */}
              <Card className="border-2 hover:shadow-xl transition-shadow">
                <CardHeader className="bg-gradient-to-r from-purple-500/5 via-purple-500/10 to-purple-500/5">
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-purple-600" />
                    Skills
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {candidate.skills && candidate.skills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {candidate.skills.map((skill, index) => (
                        <Badge
                          key={index}
                          className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-700 border-2 border-purple-500/20 hover:border-purple-500/40 transition-colors"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <Alert className="border-2 border-purple-500/20 bg-purple-500/5">
                      <AlertCircle className="h-4 w-4 text-purple-600" />
                      <AlertDescription className="text-purple-700">
                        Add your skills to stand out.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card className="border-2 hover:shadow-xl transition-shadow">
                <CardHeader className="bg-gradient-to-r from-orange-500/5 via-orange-500/10 to-orange-500/5">
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-orange-600" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {candidate.achievements && candidate.achievements.length > 0 ? (
                    <div className="space-y-3">
                      {candidate.achievements.map((achievement, index) => (
                        <div
                          key={index}
                          className="p-4 rounded-xl bg-gradient-to-r from-orange-500/5 to-yellow-500/5 border-2 border-orange-500/20"
                        >
                          <h4 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                            <Star className="h-4 w-4 text-orange-600" />
                            {achievement.title}
                          </h4>
                          {achievement.description && (
                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                              {achievement.description}
                            </p>
                          )}
                          {(achievement.organization || achievement.date) && (
                            <p className="text-xs text-muted-foreground mt-2">
                              {achievement.organization}{' '}
                              {achievement.date && `• ${achievement.date}`}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Alert className="border-2 border-orange-500/20 bg-orange-500/5">
                      <AlertCircle className="h-4 w-4 text-orange-600" />
                      <AlertDescription className="text-orange-700">
                        Showcase your achievements.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <ProfileHistoryViewer />

            {/* Account Settings */}
            <Card className="border-2">
              <CardHeader className="bg-gradient-to-r from-slate-500/5 via-slate-500/10 to-slate-500/5">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-slate-600" />
                  Account Settings
                </CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Account Info */}
                  <div className="space-y-4">
                    <h4 className="font-semibold">Account Information</h4>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-1 p-4 rounded-lg bg-muted/50 border">
                        <p className="text-xs font-medium text-muted-foreground">Email</p>
                        <p className="font-medium">{candidate.email}</p>
                      </div>
                      <div className="space-y-1 p-4 rounded-lg bg-muted/50 border">
                        <p className="text-xs font-medium text-muted-foreground">
                          Candidate Code
                        </p>
                        <p className="font-mono font-semibold">{candidate.candidate_code}</p>
                      </div>
                      <div className="space-y-1 p-4 rounded-lg bg-muted/50 border">
                        <p className="text-xs font-medium text-muted-foreground">
                          Member Since
                        </p>
                        <p className="font-medium">
                          {new Date(candidate.created_at).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                      <div className="space-y-1 p-4 rounded-lg bg-muted/50 border">
                        <p className="text-xs font-medium text-muted-foreground">Status</p>
                        <StatusBadge status={candidate.status} />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Actions */}
                  <div className="space-y-4">
                    <h4 className="font-semibold">Actions</h4>
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        variant="outline" 
                        className="border-2 hover:border-blue-500/50 hover:bg-blue-500/5"
                        onClick={() => setIsChangePasswordOpen(true)}
                      >
                        <Shield className="h-4 w-4 mr-2" />
                        Change Password
                      </Button>
                      <Button
                        variant="outline"
                        className="border-2 border-destructive/50 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                      >
                        Delete Account
                      </Button>
                    </div>
                  </div>

                  {candidate.status === 'rejected' && candidate.rejection_reason && (
                    <>
                      <Separator />
                      <Alert
                        variant="destructive"
                        className="border-2 border-red-500/50 bg-red-500/5"
                      >
                        <XCircle className="h-4 w-4" />
                        <AlertDescription>
                          <strong>Rejection Reason:</strong> {candidate.rejection_reason}
                        </AlertDescription>
                      </Alert>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Profile Modal */}
      {candidate && (
        <EditProfileModal
          candidate={candidate}
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          onSuccess={handleProfileUpdate}
        />
      )}

      {/* Change Password Dialog */}
      <ChangePasswordDialog
        open={isChangePasswordOpen}
        onOpenChange={setIsChangePasswordOpen}
      />
    </div>
  );
}

// Wrapped Export
export default function CandidatePortalPage() {
  return (
    <CandidateAuthGuard>
      <CandidatePortalContent />
    </CandidateAuthGuard>
  );
}
