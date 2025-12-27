'use client';

/**
 * Candidate Portal Dashboard
 * Main dashboard for authenticated candidates to manage their profile
 * Redesigned with vibrant UI and full feature integration
 */

import { useEffect, useState, useCallback, useRef } from 'react';
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
  Trash2,
  Plus,
  ImagePlus,
  History,
  Sparkles,
  TrendingDown,
  Users,
  Heart,
  Calendar,
  ExternalLink,
  Download,
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
import type { Candidate, Category } from '@/types';

// ==================== Status Badge Component ====================

function StatusBadge({ status }: { status: Candidate['status'] }) {
  const statusConfig = {
    pending: {
      label: 'Pending Review',
      icon: Clock,
      variant: 'secondary' as const,
      className: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
    },
    approved: {
      label: 'Approved',
      icon: CheckCircle2,
      variant: 'default' as const,
      className: 'bg-green-500/10 text-green-600 border-green-500/20',
    },
    rejected: {
      label: 'Rejected',
      icon: XCircle,
      variant: 'destructive' as const,
      className: 'bg-red-500/10 text-red-600 border-red-500/20',
    },
    profile_update_pending: {
      label: 'Update Pending',
      icon: AlertCircle,
      variant: 'outline' as const,
      className: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    },
    pending_profile_completion: {
      label: 'Complete Profile',
      icon: Edit,
      variant: 'outline' as const,
      className: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
    },
  };

  const config = statusConfig[status] || statusConfig.pending;
  const Icon = config.icon;

  return (
    <Badge variant={config.variant} className={config.className}>
      <Icon className="mr-1 h-3 w-3" />
      {config.label}
    </Badge>
  );
}

// ==================== Stat Card Component ====================

function StatCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
}: {
  title: string;
  value: string | number;
  icon: React.ElementType;
  description?: string;
  trend?: { value: number; isPositive: boolean };
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-bold">{value}</h3>
              {trend && (
                <span
                  className={`text-xs font-medium ${
                    trend.isPositive ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {trend.isPositive ? '+' : ''}{trend.value}%
                </span>
              )}
            </div>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ==================== Share Profile Dialog ====================

function ShareProfileDialog({ candidate }: { candidate: Candidate }) {
  const profileUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/nominees/${candidate.slug}`
    : '';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast.success('Link copied to clipboard!');
  };

  const shareOnSocial = (platform: string) => {
    const encodedUrl = encodeURIComponent(profileUrl);
    const text = encodeURIComponent(`Vote for ${candidate.first_name} ${candidate.last_name}!`);

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
        <Button variant="outline" size="sm">
          <Share2 className="mr-2 h-4 w-4" />
          Share Profile
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Your Profile</DialogTitle>
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
              className="flex-1 px-3 py-2 border rounded-md bg-muted text-sm"
            />
            <Button size="sm" onClick={copyToClipboard} title="Copy link">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <Separator />
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => shareOnSocial('facebook')}
              title="Share on Facebook"
            >
              <Facebook className="h-5 w-5 text-blue-600" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => shareOnSocial('twitter')}
              title="Share on Twitter"
            >
              <Twitter className="h-5 w-5 text-sky-500" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => shareOnSocial('linkedin')}
              title="Share on LinkedIn"
            >
              <Linkedin className="h-5 w-5 text-blue-700" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => shareOnSocial('whatsapp')}
              title="Share on WhatsApp"
            >
              <svg className="h-5 w-5 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ==================== Main Component ====================

function CandidatePortalContent() {
  const router = useRouter();
  const { logout, isLoading: authLoading } = useCandidateAuth();
  
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [stats, setStats] = useState<CandidateStatsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleProfileUpdate = (updatedCandidate: Candidate) => {
    setCandidate(updatedCandidate);
    toast.success('Profile updated! Changes are pending admin approval.');
  };

  // Fetch candidate profile and stats
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // Fetch profile first (required)
      const profileResponse = await candidatesApi.getMyProfile();
      
      if (profileResponse.success && profileResponse.data) {
        setCandidate(profileResponse.data);
        
        // Try to fetch stats (optional - may not be available)
        try {
          const statsResponse = await candidatesApi.getMyStats();
          if (statsResponse.success && statsResponse.data) {
            setStats(statsResponse.data);
          }
        } catch (statsError) {
          // Stats endpoint may not be available - that's okay
          console.log('Stats not available:', statsError);
        }
      } else {
        throw new Error('Failed to load profile');
      }
    } catch (error) {
      console.error('Error fetching candidate data:', error);
      toast.error('Failed to load profile data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    router.push('/candidate/login');
  };

  if (isLoading || authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-8">
            <XCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Profile Not Found</h2>
            <p className="text-muted-foreground mb-4">
              Unable to load your profile. Please try logging in again.
            </p>
            <Button onClick={() => router.push('/candidate/login')}>
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
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold">Candidate Portal</h1>
              <p className="text-xs text-muted-foreground">Manage your profile</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ShareProfileDialog candidate={candidate} />
            <Button variant="destructive" size="sm" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Profile Hero */}
      <div className="relative">
        {/* Cover Image */}
        <div className="h-48 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 relative overflow-hidden">
          {candidate.cover_image && (
            <Image
              src={candidate.cover_image}
              alt="Cover"
              fill
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>

        {/* Profile Info Overlay */}
        <div className="container px-4">
          <div className="relative -mt-20 flex flex-col md:flex-row md:items-end gap-4 pb-6">
            {/* Avatar */}
            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
                <AvatarImage src={candidate.profile_image || undefined} alt={fullName} />
                <AvatarFallback className="text-3xl font-bold bg-primary text-primary-foreground">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="secondary"
                className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>

            {/* Name & Status */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h2 className="text-2xl font-bold">{fullName}</h2>
                <StatusBadge status={candidate.status} />
                {candidate.is_featured && (
                  <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/20">
                    <Star className="mr-1 h-3 w-3" />
                    Featured
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground flex items-center gap-2">
                <span className="font-mono text-sm bg-muted px-2 py-0.5 rounded">
                  {candidate.candidate_code}
                </span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => {
                          navigator.clipboard.writeText(candidate.candidate_code);
                          toast.success('Code copied!');
                        }}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Copy candidate code</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  {candidate.email}
                </span>
                {candidate.phone_number && (
                  <span className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    {candidate.phone_number}
                  </span>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEditModalOpen(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="container px-4 py-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Votes"
            value={stats?.total_votes ?? candidate.vote_count ?? 0}
            icon={Vote}
            description="Votes received so far"
          />
          <StatCard
            title="Current Rank"
            value={stats?.rank ? `#${stats.rank}` : '--'}
            icon={Award}
            description="In your categories"
          />
          <StatCard
            title="Vote Percentage"
            value={stats?.percentage ? `${stats.percentage.toFixed(1)}%` : '--'}
            icon={TrendingUp}
            description="Of total category votes"
          />
          <StatCard
            title="Profile Views"
            value={stats?.view_count ?? candidate.view_count ?? 0}
            icon={Eye}
            description="People viewed your profile"
          />
        </div>
      </div>

      {/* Main Content Tabs */}
      <div className="container px-4 pb-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="votes">Votes</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Categories */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Nominated Categories
                  </CardTitle>
                  <CardDescription>
                    Categories you are nominated in
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {candidate.categories && candidate.categories.length > 0 ? (
                    <div className="space-y-3">
                      {candidate.categories.map((category) => {
                        // Backend populates categories as Category objects
                        const categoryData = category as unknown as Category;
                        const categoryName = typeof category === 'string' ? `Category` : categoryData.name;
                        const categoryId = typeof category === 'string' ? category : categoryData._id;
                        
                        return (
                          <div
                            key={categoryId}
                            className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                          >
                            <span className="font-medium">{categoryName}</span>
                            <Badge variant="outline">Active</Badge>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No categories assigned yet
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Bio */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    About Me
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {candidate.bio ? (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {candidate.bio}
                    </p>
                  ) : (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Add a bio to help voters know more about you.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>

              {/* Why Vote for Me */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Why Vote for Me?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {candidate.why_nominate_me ? (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {candidate.why_nominate_me}
                    </p>
                  ) : (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Tell voters why they should vote for you.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Social Links
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {candidate.social_links && Object.values(candidate.social_links).some(v => v) ? (
                    <div className="flex flex-wrap gap-2">
                      {candidate.social_links.facebook && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={candidate.social_links.facebook} target="_blank" rel="noopener noreferrer">
                            <Facebook className="h-4 w-4 mr-2" />
                            Facebook
                          </a>
                        </Button>
                      )}
                      {candidate.social_links.twitter && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={candidate.social_links.twitter} target="_blank" rel="noopener noreferrer">
                            <Twitter className="h-4 w-4 mr-2" />
                            Twitter
                          </a>
                        </Button>
                      )}
                      {candidate.social_links.instagram && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={candidate.social_links.instagram} target="_blank" rel="noopener noreferrer">
                            <Instagram className="h-4 w-4 mr-2" />
                            Instagram
                          </a>
                        </Button>
                      )}
                      {candidate.social_links.linkedin && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={candidate.social_links.linkedin} target="_blank" rel="noopener noreferrer">
                            <Linkedin className="h-4 w-4 mr-2" />
                            LinkedIn
                          </a>
                        </Button>
                      )}
                      {candidate.social_links.website && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={candidate.social_links.website} target="_blank" rel="noopener noreferrer">
                            <Globe className="h-4 w-4 mr-2" />
                            Website
                          </a>
                        </Button>
                      )}
                    </div>
                  ) : (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Add social links to increase your visibility.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Votes Tab */}
          <TabsContent value="votes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Vote Statistics
                </CardTitle>
                <CardDescription>
                  Track your voting performance over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Vote Summary */}
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="text-center p-4 rounded-lg bg-muted/50">
                      <p className="text-3xl font-bold text-primary">
                        {stats?.total_votes ?? candidate.vote_count ?? 0}
                      </p>
                      <p className="text-sm text-muted-foreground">Total Votes</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-muted/50">
                      <p className="text-3xl font-bold">
                        {stats?.rank ? `#${stats.rank}` : '--'}
                      </p>
                      <p className="text-sm text-muted-foreground">Current Rank</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-muted/50">
                      <p className="text-3xl font-bold">
                        {stats?.percentage ? `${stats.percentage.toFixed(1)}%` : '--'}
                      </p>
                      <p className="text-sm text-muted-foreground">Vote Share</p>
                    </div>
                  </div>

                  {/* Vote Progress */}
                  {stats?.percentage && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Vote Progress</span>
                        <span>{stats.percentage.toFixed(1)}%</span>
                      </div>
                      <Progress value={stats.percentage} className="h-2" />
                    </div>
                  )}

                  {/* Vote Trend */}
                  {stats?.votes_over_time && stats.votes_over_time.length > 0 ? (
                    <div className="space-y-4">
                      <h4 className="font-medium">Recent Voting Activity</h4>
                      <div className="space-y-2">
                        {stats.votes_over_time.slice(-7).map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between py-2 border-b last:border-0"
                          >
                            <span className="text-sm text-muted-foreground">
                              {new Date(item.date).toLocaleDateString()}
                            </span>
                            <Badge variant="secondary">
                              +{item.count} votes
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Alert>
                      <TrendingUp className="h-4 w-4" />
                      <AlertDescription>
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
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {candidate.education && candidate.education.length > 0 ? (
                    <div className="space-y-4">
                      {candidate.education.map((edu, index) => (
                        <div key={index} className="border-l-2 border-primary pl-4">
                          <h4 className="font-medium">{edu.qualification}</h4>
                          <p className="text-sm text-muted-foreground">{edu.institution}</p>
                          {edu.field && (
                            <p className="text-sm text-muted-foreground">{edu.field}</p>
                          )}
                          {(edu.start_date || edu.end_date) && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {edu.start_date} - {edu.end_date || 'Present'}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Add your educational background.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>

              {/* Experience */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Experience
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {candidate.experience && candidate.experience.length > 0 ? (
                    <div className="space-y-4">
                      {candidate.experience.map((exp, index) => (
                        <div key={index} className="border-l-2 border-primary pl-4">
                          <h4 className="font-medium">{exp.position}</h4>
                          <p className="text-sm text-muted-foreground">{exp.company}</p>
                          {exp.description && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {exp.description}
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground mt-1">
                            {exp.start_date} - {exp.current ? 'Present' : exp.end_date}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Add your work experience.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>

              {/* Skills */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Skills
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {candidate.skills && candidate.skills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {candidate.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Add your skills to stand out.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {candidate.achievements && candidate.achievements.length > 0 ? (
                    <div className="space-y-3">
                      {candidate.achievements.map((achievement, index) => (
                        <div key={index} className="p-3 rounded-lg bg-muted/50">
                          <h4 className="font-medium">{achievement.title}</h4>
                          {achievement.description && (
                            <p className="text-sm text-muted-foreground">
                              {achievement.description}
                            </p>
                          )}
                          {(achievement.organization || achievement.date) && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {achievement.organization} {achievement.date && `• ${achievement.date}`}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Showcase your achievements.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Account Settings
                </CardTitle>
                <CardDescription>
                  Manage your account preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Account Info */}
                <div className="space-y-4">
                  <h4 className="font-medium">Account Information</h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Email</p>
                      <p>{candidate.email}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Candidate Code</p>
                      <p className="font-mono">{candidate.candidate_code}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Member Since</p>
                      <p>{new Date(candidate.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Status</p>
                      <StatusBadge status={candidate.status} />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Actions */}
                <div className="space-y-4">
                  <h4 className="font-medium">Actions</h4>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline">
                      Change Password
                    </Button>
                    <Button variant="outline" className="text-destructive">
                      Delete Account
                    </Button>
                  </div>
                </div>

                {candidate.status === 'rejected' && candidate.rejection_reason && (
                  <>
                    <Separator />
                    <Alert variant="destructive">
                      <XCircle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Rejection Reason:</strong> {candidate.rejection_reason}
                      </AlertDescription>
                    </Alert>
                  </>
                )}
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
    </div>
  );
}

// ==================== Wrapped Export ====================

export default function CandidatePortalPage() {
  return (
    <CandidateAuthGuard>
      <CandidatePortalContent />
    </CandidateAuthGuard>
  );
}
