'use client';

import { useState, useMemo, useCallback } from 'react';
import {
    Vote,
    Search,
    Package,
    Users,
    Award,
    ChevronRight,
    Star,
    Trophy,
    Ticket,
    ArrowRight,
    Flame,
    Timer
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnnouncementBar from '@/components/AnnouncementBar';
import PromoBanner from '@/components/PromoBanner';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import VoteBundleModal from '@/components/VoteBundleModal';
import VoteDialog from '@/components/VoteDialog';
import { cn } from '@/lib/utils';
import { mockEvents } from '@/lib/mocks/events';
import { mockCategories } from '@/lib/mocks/categories';
import { mockCandidates } from '@/lib/mocks/candidates';
import { mockBundles } from '@/lib/mocks/bundles';
import type { Bundle, Category, Candidate } from '@/types';

type EventFilter = 'all' | string;
type SortOption = 'popular' | 'price-low' | 'price-high' | 'votes';

export default function VotePage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedEventFilter, setSelectedEventFilter] = useState<EventFilter>('all');
    const [sortBy, setSortBy] = useState<SortOption>('popular');
    const [selectedBundle, setSelectedBundle] = useState<Bundle | null>(null);
    const [isBundleModalOpen, setIsBundleModalOpen] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [isVoteDialogOpen, setIsVoteDialogOpen] = useState(false);

    // Get events with active voting
    const activeEvents = useMemo(() => {
        return mockEvents.filter(event =>
            event.status === 'active' && event.is_published
        );
    }, []);

    // Get categories open for voting
    const votingCategories = useMemo(() => {
        return mockCategories.filter(category => {
            const now = new Date();
            const votingEnd = category.voting_deadline ? new Date(category.voting_deadline) : null;

            // Filter by event if selected
            if (selectedEventFilter !== 'all' && category.event !== selectedEventFilter) {
                return false;
            }

            // Only show categories with open voting
            if (!category.is_voting_open) return false;
            if (votingEnd && votingEnd <= now) return false;

            // Search filter
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const event = mockEvents.find(e => e._id === category.event);
                if (
                    !category.name.toLowerCase().includes(query) &&
                    !category.description?.toLowerCase().includes(query) &&
                    !event?.name.toLowerCase().includes(query)
                ) {
                    return false;
                }
            }

            return true;
        });
    }, [selectedEventFilter, searchQuery]);

    // Get bundles for active events
    const availableBundles = useMemo(() => {
        let filtered = mockBundles.filter(bundle => {
            if (bundle.status !== 'active') return false;

            // Filter by event
            if (selectedEventFilter !== 'all' && bundle.event !== selectedEventFilter) {
                return false;
            }

            // Check validity period
            const now = new Date();
            if (bundle.valid_from && new Date(bundle.valid_from) > now) return false;
            if (bundle.valid_until && new Date(bundle.valid_until) < now) return false;

            // Search filter
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                if (
                    !bundle.name.toLowerCase().includes(query) &&
                    !bundle.description?.toLowerCase().includes(query)
                ) {
                    return false;
                }
            }

            return true;
        });

        // Sort bundles
        switch (sortBy) {
            case 'popular':
                filtered = filtered.sort((a, b) => (b.is_popular ? 1 : 0) - (a.is_popular ? 1 : 0) || b.vote_count - a.vote_count);
                break;
            case 'price-low':
                filtered = filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered = filtered.sort((a, b) => b.price - a.price);
                break;
            case 'votes':
                filtered = filtered.sort((a, b) => b.vote_count - a.vote_count);
                break;
        }

        return filtered;
    }, [selectedEventFilter, searchQuery, sortBy]);

    // Get candidates for a specific category
    const getCandidatesByCategory = useCallback((categoryId: string) => {
        return mockCandidates.filter(candidate =>
            candidate.categories.includes(categoryId) &&
            candidate.status === 'approved' &&
            candidate.is_published
        );
    }, []);

    // Get event by ID
    const getEventById = useCallback((eventId: string) => {
        return mockEvents.find(e => e._id === eventId);
    }, []);

    // Handle bundle click
    const handleBundleClick = (bundle: Bundle) => {
        setSelectedBundle(bundle);
        setIsBundleModalOpen(true);
    };

    // Handle candidate vote click
    const handleVoteClick = (candidate: Candidate, category: Category) => {
        setSelectedCandidate(candidate);
        setSelectedCategory(category);
        setIsVoteDialogOpen(true);
    };

    // Get voting time remaining
    const getTimeRemaining = (deadline: string) => {
        const now = new Date();
        const end = new Date(deadline);
        if (end <= now) return 'Ended';
        return formatDistanceToNow(end, { addSuffix: true });
    };

    // Statistics
    const stats = {
        totalCategories: votingCategories.length,
        totalBundles: availableBundles.length,
        totalVotes: votingCategories.reduce((sum, cat) => sum + cat.total_votes, 0),
        totalCandidates: votingCategories.reduce((sum, cat) => sum + cat.candidates.length, 0),
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Announcement Bar */}
            <AnnouncementBar />

            <Header />

            {/* Hero Section */}
            <section className="relative pt-24 pb-16 overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-[#0152be]/20 to-transparent rounded-full blur-3xl" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0152be]/20 rounded-full text-[#0152be] text-sm font-medium mb-6">
                            <Vote className="w-4 h-4" />
                            <span>Cast Your Vote Now</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                            Vote for Your <span className="text-[#0152be]">Favorites</span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                            Support your favorite nominees by purchasing vote bundles. Every vote counts in helping them win!
                        </p>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
                            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                                <div className="text-3xl font-bold text-[#0152be]">{stats.totalCategories}</div>
                                <div className="text-sm text-gray-400">Open Categories</div>
                            </div>
                            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                                <div className="text-3xl font-bold text-green-400">{stats.totalBundles}</div>
                                <div className="text-sm text-gray-400">Vote Bundles</div>
                            </div>
                            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                                <div className="text-3xl font-bold text-purple-400">{stats.totalCandidates}</div>
                                <div className="text-sm text-gray-400">Candidates</div>
                            </div>
                            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                                <div className="text-3xl font-bold text-orange-400">{stats.totalVotes.toLocaleString()}</div>
                                <div className="text-sm text-gray-400">Total Votes</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Promo Banner */}
            <PromoBanner variant="compact" className="my-8" />

            {/* Main Content */}
            <section className="py-12">
                <div className="container mx-auto px-6">
                    {/* Filters Section */}
                    <div className="flex flex-col lg:flex-row gap-4 mb-8">
                        {/* Search */}
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                                placeholder="Search categories, bundles, or events..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-12 bg-white/5 border-white/10 focus:border-[#0152be] h-12"
                            />
                        </div>

                        {/* Event Filter */}
                        <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
                            <Button
                                variant={selectedEventFilter === 'all' ? 'default' : 'outline'}
                                onClick={() => setSelectedEventFilter('all')}
                                className={cn(
                                    "whitespace-nowrap",
                                    selectedEventFilter === 'all'
                                        ? "bg-[#0152be] hover:bg-[#0152be]/90"
                                        : "border-white/20 hover:bg-white/10"
                                )}
                            >
                                All Events
                            </Button>
                            {activeEvents.map(event => (
                                <Button
                                    key={event._id}
                                    variant={selectedEventFilter === event._id ? 'default' : 'outline'}
                                    onClick={() => setSelectedEventFilter(event._id)}
                                    className={cn(
                                        "whitespace-nowrap",
                                        selectedEventFilter === event._id
                                            ? "bg-[#0152be] hover:bg-[#0152be]/90"
                                            : "border-white/20 hover:bg-white/10"
                                    )}
                                >
                                    {event.name}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Sort Options */}
                    <div className="flex items-center gap-4 mb-8">
                        <span className="text-gray-400 text-sm">Sort by:</span>
                        <div className="flex gap-2">
                            {[
                                { value: 'popular', label: 'Popular' },
                                { value: 'price-low', label: 'Price: Low to High' },
                                { value: 'price-high', label: 'Price: High to Low' },
                                { value: 'votes', label: 'Most Votes' },
                            ].map(option => (
                                <button
                                    key={option.value}
                                    onClick={() => setSortBy(option.value as SortOption)}
                                    className={cn(
                                        "px-3 py-1.5 rounded-lg text-sm transition-colors",
                                        sortBy === option.value
                                            ? "bg-[#0152be] text-white"
                                            : "text-gray-400 hover:text-white hover:bg-white/10"
                                    )}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Vote Bundles Section */}
                    <div className="mb-16">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0152be] to-sky-500 flex items-center justify-center">
                                    <Package className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white">Vote Bundles</h2>
                                    <p className="text-gray-400 text-sm">Choose a bundle to support your favorites</p>
                                </div>
                            </div>
                        </div>

                        {availableBundles.length === 0 ? (
                            <div className="text-center py-16 bg-white/5 rounded-2xl border border-white/10">
                                <Package className="w-16 h-16 mx-auto text-gray-500 mb-4" />
                                <h3 className="text-xl font-semibold text-gray-300 mb-2">No Bundles Available</h3>
                                <p className="text-gray-500">Check back later for available vote bundles.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {availableBundles.map((bundle) => {
                                    const event = getEventById(bundle.event);
                                    const hasDiscount = bundle.discount_percentage && bundle.discount_percentage > 0;

                                    return (
                                        <GlassCard
                                            key={bundle._id}
                                            onClick={() => handleBundleClick(bundle)}
                                            className={cn(
                                                "relative group cursor-pointer overflow-hidden",
                                                "border border-gray-800/50 bg-gradient-to-br from-gray-900/80 via-black/90 to-gray-950/80",
                                                "backdrop-blur-xl shadow-lg",
                                                "hover:border-[#0152be]/50 hover:shadow-xl hover:shadow-[#0152be]/20",
                                                "transition-all duration-300",
                                                "hover:-translate-y-1"
                                            )}
                                        >

                                            {/* Popular/Featured Badge - Top Right */}
                                            {(bundle.is_popular || bundle.is_featured) && (
                                                <div className="absolute top-3 right-3 z-20">
                                                    <Badge
                                                        className={cn(
                                                            "shadow-lg border-0 px-2 py-1 text-xs font-semibold",
                                                            bundle.is_popular
                                                                ? "bg-gradient-to-r from-orange-500 to-red-600 text-white"
                                                                : "bg-gradient-to-r from-[#0152be] to-sky-500 text-white"
                                                        )}
                                                    >
                                                        {bundle.is_popular ? (
                                                            <>
                                                                <Flame className="w-3 h-3 mr-1" />
                                                                HOT
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Star className="w-3 h-3 mr-1" />
                                                                FEATURED
                                                            </>
                                                        )}
                                                    </Badge>
                                                </div>
                                            )}

                                            {/* Discount Badge - Top Left */}
                                            {hasDiscount && (
                                                <div className="absolute top-3 left-3 z-20">
                                                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 px-2 py-1 shadow-lg font-semibold text-xs">
                                                        -{bundle.discount_percentage}%
                                                    </Badge>
                                                </div>
                                            )}

                                            <div className="relative z-10 p-5 pt-10">
                                                {/* Bundle Icon with Glow */}
                                                <div className="w-14 h-14 rounded-2xl mx-auto mb-4 relative group-hover:scale-110 transition-transform duration-300">
                                                    <div className="absolute inset-0 bg-gradient-to-br from-[#0152be]/40 to-sky-500/40 rounded-2xl blur-lg" />
                                                    <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-[#0152be]/30 to-sky-500/20 backdrop-blur-sm border border-[#0152be]/30 flex items-center justify-center">
                                                        <Ticket className="w-7 h-7 text-[#0152be]" />
                                                    </div>
                                                </div>

                                                {/* Bundle Name */}
                                                <h3 className="text-lg font-bold text-white text-center mb-1 group-hover:text-[#0152be] transition-colors">
                                                    {bundle.name}
                                                </h3>

                                                {/* Event Name */}
                                                {event && (
                                                    <p className="text-center text-gray-400 mb-4 text-xs uppercase tracking-wider">
                                                        {event.name}
                                                    </p>
                                                )}

                                                {/* Vote Count with Bar */}
                                                <div className="mb-4">
                                                    <div className="flex items-center justify-between mb-1.5">
                                                        <span className="text-xs text-gray-400">Votes</span>
                                                        <span className="text-xl font-bold text-[#0152be]">
                                                            {bundle.vote_count.toLocaleString()}
                                                        </span>
                                                    </div>
                                                    <div className="w-full bg-gray-800/50 rounded-full h-1.5 overflow-hidden">
                                                        <div
                                                            className="h-full bg-gradient-to-r from-[#0152be] to-sky-500 rounded-full"
                                                            style={{ width: `${Math.min(100, bundle.vote_count / 1000 * 100)}%` }}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Price Section */}
                                                <div className="mb-4 text-center">
                                                    <div className="flex items-baseline justify-center gap-2">
                                                        <span className="text-2xl font-bold text-white">
                                                            {bundle.currency} {bundle.price.toFixed(2)}
                                                        </span>
                                                        {hasDiscount && bundle.original_price && (
                                                            <span className="text-sm text-gray-500 line-through">
                                                                {bundle.currency} {bundle.original_price.toFixed(2)}
                                                            </span>
                                                        )}
                                                    </div>
                                                    {hasDiscount && bundle.original_price && (
                                                        <p className="text-green-400 font-medium mt-1 text-xs">
                                                            Save {bundle.currency} {(bundle.original_price - bundle.price).toFixed(2)}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Description */}
                                                {bundle.description && (
                                                    <p className="text-gray-400 text-center text-xs leading-relaxed mb-4 line-clamp-2">
                                                        {bundle.description}
                                                    </p>
                                                )}

                                                {/* CTA Button */}
                                                <Button
                                                    size="sm"
                                                    className={cn(
                                                        "w-full relative overflow-hidden font-semibold",
                                                        "bg-gradient-to-r from-[#0152be] to-sky-500",
                                                        "hover:from-[#014099] hover:to-sky-600",
                                                        "shadow-lg shadow-[#0152be]/30",
                                                        "group/btn"
                                                    )}
                                                >
                                                    <span className="relative z-10 flex items-center justify-center">
                                                        Select Bundle
                                                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                                    </span>
                                                </Button>
                                            </div>
                                        </GlassCard>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Categories Section */}
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                    <Award className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white">Open for Voting</h2>
                                    <p className="text-gray-400 text-sm">Categories currently accepting votes</p>
                                </div>
                            </div>
                            <Link href="/categories">
                                <Button variant="outline" className="border-white/20 hover:bg-white/10">
                                    View All Categories
                                    <ChevronRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </div>

                        {votingCategories.length === 0 ? (
                            <div className="text-center py-16 bg-white/5 rounded-2xl border border-white/10">
                                <Award className="w-16 h-16 mx-auto text-gray-500 mb-4" />
                                <h3 className="text-xl font-semibold text-gray-300 mb-2">No Active Voting</h3>
                                <p className="text-gray-500">There are no categories open for voting at the moment.</p>
                            </div>
                        ) : (
                            <div className="space-y-8">
                                {votingCategories.map((category) => {
                                    const event = getEventById(category.event);
                                    const candidates = getCandidatesByCategory(category._id);
                                    const timeRemaining = category.voting_deadline ? getTimeRemaining(category.voting_deadline) : null;

                                    return (
                                        <div key={category._id} className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                                            {/* Category Header */}
                                            <div className="p-6 border-b border-white/10">
                                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                    <div className="flex items-center gap-4">
                                                        {category.image ? (
                                                            <div className="w-16 h-16 rounded-xl overflow-hidden">
                                                                <Image
                                                                    src={category.image}
                                                                    alt={category.name}
                                                                    width={64}
                                                                    height={64}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>
                                                        ) : (
                                                            <div
                                                                className="w-16 h-16 rounded-xl flex items-center justify-center"
                                                                style={{ backgroundColor: category.color_theme || '#0152be' }}
                                                            >
                                                                <Trophy className="w-8 h-8 text-white" />
                                                            </div>
                                                        )}
                                                        <div>
                                                            <h3 className="text-xl font-bold text-white">{category.name}</h3>
                                                            {event && (
                                                                <p className="text-sm text-gray-400">{event.name}</p>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-4">
                                                        {/* Time Remaining */}
                                                        {timeRemaining && (
                                                            <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-500/20 rounded-lg text-orange-400 text-sm">
                                                                <Timer className="w-4 h-4" />
                                                                <span>Ends {timeRemaining}</span>
                                                            </div>
                                                        )}

                                                        {/* Total Votes */}
                                                        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0152be]/20 rounded-lg text-[#0152be] text-sm">
                                                            <Vote className="w-4 h-4" />
                                                            <span>{category.total_votes.toLocaleString()} votes</span>
                                                        </div>

                                                        {/* Candidates Count */}
                                                        <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/20 rounded-lg text-purple-400 text-sm">
                                                            <Users className="w-4 h-4" />
                                                            <span>{candidates.length} candidates</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {category.description && (
                                                    <p className="text-gray-400 text-sm mt-4">{category.description}</p>
                                                )}
                                            </div>

                                            {/* Candidates Grid */}
                                            <div className="p-6">
                                                {candidates.length === 0 ? (
                                                    <div className="text-center py-8 text-gray-500">
                                                        No candidates in this category yet.
                                                    </div>
                                                ) : (
                                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                                        {candidates.slice(0, 5).map((candidate) => (
                                                            <div
                                                                key={candidate._id}
                                                                className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-[#0152be]/50 transition-all group cursor-pointer"
                                                                onClick={() => handleVoteClick(candidate, category)}
                                                            >
                                                                {/* Candidate Image */}
                                                                <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-3">
                                                                    {candidate.profile_image ? (
                                                                        <Image
                                                                            src={candidate.profile_image}
                                                                            alt={`${candidate.first_name} ${candidate.last_name}`}
                                                                            fill
                                                                            className="object-cover group-hover:scale-110 transition-transform"
                                                                        />
                                                                    ) : (
                                                                        <div className="w-full h-full bg-gradient-to-br from-[#0152be] to-sky-500 flex items-center justify-center">
                                                                            <span className="text-3xl font-bold text-white">
                                                                                {candidate.first_name[0]}{candidate.last_name[0]}
                                                                            </span>
                                                                        </div>
                                                                    )}

                                                                    {/* Featured Badge */}
                                                                    {candidate.is_featured && (
                                                                        <div className="absolute top-2 right-2">
                                                                            <Badge className="bg-yellow-500 text-black border-0 text-xs">
                                                                                <Star className="w-3 h-3 mr-1" />
                                                                                Featured
                                                                            </Badge>
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                {/* Candidate Info */}
                                                                <h4 className="font-semibold text-white text-sm truncate">
                                                                    {candidate.first_name} {candidate.last_name}
                                                                </h4>
                                                                <p className="text-xs text-gray-400 mb-2">{candidate.candidate_code}</p>

                                                                {/* Vote Count */}
                                                                <div className="flex items-center justify-between text-xs">
                                                                    <span className="text-gray-400">{candidate.vote_count.toLocaleString()} votes</span>
                                                                    <Button size="sm" className="h-7 text-xs bg-[#0152be] hover:bg-[#0152be]/90">
                                                                        <Vote className="w-3 h-3 mr-1" />
                                                                        Vote
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        ))}

                                                        {/* View All Link if more candidates */}
                                                        {candidates.length > 5 && (
                                                            <Link
                                                                href={`/categories/${category.slug}`}
                                                                className="bg-white/5 rounded-xl p-4 border border-white/10 border-dashed hover:border-[#0152be]/50 transition-all flex flex-col items-center justify-center text-center"
                                                            >
                                                                <div className="w-12 h-12 rounded-full bg-[#0152be]/20 flex items-center justify-center mb-2">
                                                                    <Users className="w-6 h-6 text-[#0152be]" />
                                                                </div>
                                                                <span className="text-sm font-medium text-white">View All</span>
                                                                <span className="text-xs text-gray-400">+{candidates.length - 5} more</span>
                                                            </Link>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Bottom Promo Banner */}
            <PromoBanner variant="compact" className="my-8" />

            <Footer />

            {/* Vote Bundle Modal */}
            {selectedBundle && (
                <VoteBundleModal
                    open={isBundleModalOpen}
                    onOpenChange={setIsBundleModalOpen}
                    bundle={selectedBundle}
                    onVoteClick={(candidate: Candidate, category: Category) => {
                        setIsBundleModalOpen(false);
                        handleVoteClick(candidate, category);
                    }}
                />
            )}

            {/* Vote Dialog */}
            {selectedCandidate && selectedCategory && (
                <VoteDialog
                    open={isVoteDialogOpen}
                    onOpenChange={setIsVoteDialogOpen}
                    candidate={selectedCandidate}
                    category={selectedCategory}
                    eventId={selectedCategory.event}
                    eventName={getEventById(selectedCategory.event)?.name}
                />
            )}
        </div>
    );
}
