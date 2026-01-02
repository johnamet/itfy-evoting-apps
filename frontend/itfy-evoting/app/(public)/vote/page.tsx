'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import {
    Search,
    Filter,
    ChevronRight,
    Star,
    Users,
    Vote,
    Award,
    Globe,
    Calendar,
    Ticket,
    Package,
    ArrowRight,
    Flame,
    LayoutGrid,
    List,
    Sparkles,
    Zap,
    Tag
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/Spinner';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import GlassCard from '@/components/ui/GlassCard';
import VoteBundleModal from '@/components/VoteBundleModal';
import VoteDialog from '@/components/VoteDialog';
import { eventsApi } from '@/lib/api/events';
import { categoriesApi } from '@/lib/api/categories';
import { candidatesApi } from '@/lib/api/candidates';
import { bundlesApi } from '@/lib/api/bundles';
import styles from './styles.module.css';
import { Bundle, Candidate, Category, Event } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import Header from '@/components/ui/Header';

export default function VotePage() {
    // Data State
    const [events, setEvents] = useState<Event[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [bundles, setBundles] = useState<Bundle[]>([]);

    // Loading & Error State
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Filters & UI State
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedEventFilter, setSelectedEventFilter] = useState('all');
    const [activeTab, setActiveTab] = useState('bundles');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    // Modals state
    const [selectedBundle, setSelectedBundle] = useState<Bundle | null>(null);
    const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [isVoteDialogOpen, setIsVoteDialogOpen] = useState(false);

    // Fetch Data
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const [
                    eventsRes,
                    categoriesRes,
                    candidatesRes,
                    bundlesRes
                ] = await Promise.all([
                    eventsApi.getPublicEvents(),
                    categoriesApi.listPublic(),
                    candidatesApi.listPublic(),
                    bundlesApi.listPublic()
                ]);

                if (eventsRes.success) setEvents(eventsRes.data);
                if (categoriesRes.success) setCategories(categoriesRes.data);
                if (candidatesRes.success) setCandidates(candidatesRes.data);
                if (bundlesRes.success) setBundles(bundlesRes.data);
            } catch (err) {
                console.error('Failed to fetch voting data:', err);
                setError('Failed to load voting data. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);


    // Filter Logic
    const filteredData = useMemo(() => {
        const query = searchQuery.toLowerCase();

        // Filter Bundles
        const filteredBundles = bundles.filter(bundle => {
            const matchesSearch = bundle.name.toLowerCase().includes(query) ||
                bundle.description?.toLowerCase().includes(query);
            console.log(bundle.event.name, selectedEventFilter);
            const matchesEvent = selectedEventFilter === 'all' || bundle.event._id === selectedEventFilter;
            return matchesSearch && matchesEvent && bundle.status === 'active';
        });

        // Filter Candidates
        const filteredCandidates = candidates.filter(candidate => {
            const matchesSearch =
                `${candidate.first_name} ${candidate.last_name}`.toLowerCase().includes(query) ||
                candidate.candidate_code.toLowerCase().includes(query);

            let matchesEvent = true;
            if (selectedEventFilter !== 'all') {
                // Find categories for this candidate that belong to the selected event
                const candidateCategories = candidate.categories
                matchesEvent = candidate.event._id === selectedEventFilter;
            }

            return matchesSearch && matchesEvent && candidate.status === 'approved' && candidate.is_published;
        });

        // Filter Categories
        const filteredCategories = categories.filter(category => {
            const matchesSearch = category.name.toLowerCase().includes(query) ||
                category.description?.toLowerCase().includes(query);
            const matchesEvent = selectedEventFilter === 'all' || (typeof category.event !== 'string' && category.event._id === selectedEventFilter);
            return matchesSearch && matchesEvent && category.is_voting_open;
        });

        return {
            bundles: filteredBundles,
            candidates: filteredCandidates,
            categories: filteredCategories
        };
    }, [bundles, candidates, categories, searchQuery, selectedEventFilter]);

    // Derived Statistics
    const stats = useMemo(() => {
        return {
            activeEvents: events.filter(e => e.is_published).length,
            totalVotes: bundles.reduce((acc, b) => acc + b.vote_count, 0), // This might be temporary logic
            activeCandidates: candidates.filter(c => c.status === 'approved').length
        };
    }, [events, bundles, candidates]);

    const handleVoteClick = (candidate: Candidate, category?: Category) => {
        setSelectedCandidate(candidate);
        setSelectedCategory(category || null);
        setIsVoteDialogOpen(true);
    };


    if (isLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Spinner size="lg" text="Loading voting platform..." />
            </div>
        );
    }

    return (
        <>
            <Header />
            <div className="min-h-screen bg-black text-white selection:bg-[#0152be]/30">
                {/* Background Effects */}
                <div className="fixed inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#0152be]/20 rounded-full blur-[120px] mix-blend-screen" />
                    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[100px] mix-blend-screen" />
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
                </div>

                <div className="relative z-10 pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="space-y-4">
                            <Badge variant="outline" className="border-[#0152be] text-[#0152be] bg-[#0152be]/10 px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm">
                                <Sparkles className="w-3.5 h-3.5 mr-2" />
                                Official Voting Portal
                            </Badge>
                            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400 leading-tight">
                                Cast Your Vote,<br />
                                <span className="text-[#0152be]">Make It Count.</span>
                            </h1>
                            <p className="text-gray-400 max-w-xl text-lg leading-relaxed">
                                Support your favorite candidates across multiple categories. Secure, transparent, and instant voting powered by blockchain technology.
                            </p>
                        </div>

                        {/* Quick Stats */}
                        <GlassCard className="p-4 md:p-6 flex items-center gap-8 bg-white/5 border-gray-800">
                            <div className="text-center">
                                <p className="text-gray-400 text-xs uppercase tracking-wider font-medium mb-1">Active Events</p>
                                <p className="text-2xl font-bold text-white">{stats.activeEvents}</p>
                            </div>
                            <div className="w-px h-10 bg-gray-800" />
                            <div className="text-center">
                                <p className="text-gray-400 text-xs uppercase tracking-wider font-medium mb-1">Total Candidates</p>
                                <p className="text-2xl font-bold text-white">{stats.activeCandidates}</p>
                            </div>
                        </GlassCard>
                    </div>

                    {/* Filters & Controls */}
                    <div className="sticky top-20 z-30 -mx-4 px-4 py-4 backdrop-blur-xl border-y border-white/5 bg-black/50 md:rounded-2xl md:mx-0 md:border md:top-24">
                        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                            <div className="relative w-full md:w-96 group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#0152be] transition-colors" />
                                <Input
                                    placeholder="Search candidates, events, or bundles..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 bg-white/5 border-white/10 focus:border-[#0152be] focus:ring-[#0152be]/20 transition-all h-11"
                                />
                            </div>

                            <div className="flex w-full md:w-auto gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                                <Select value={selectedEventFilter} onValueChange={setSelectedEventFilter}>
                                    <SelectTrigger className="w-[180px] bg-white/5 border-white/10 h-11">
                                        <div className="flex items-center gap-2 truncate">
                                            <Filter className="w-4 h-4 text-gray-400" />
                                            <SelectValue placeholder="All Events" />
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Events</SelectItem>
                                        {events.map((event) => (
                                            <SelectItem key={event._id} value={event._id}>{event.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <div className="flex bg-white/5 rounded-lg p-1 border border-white/10 h-11">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-2 rounded-md transition-all ${viewMode === 'grid'
                                            ? 'bg-[#0152be] text-white shadow-lg'
                                            : 'text-gray-400 hover:text-white'
                                            }`}
                                    >
                                        <LayoutGrid className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-2 rounded-md transition-all ${viewMode === 'list'
                                            ? 'bg-[#0152be] text-white shadow-lg'
                                            : 'text-gray-400 hover:text-white'
                                            }`}
                                    >
                                        <List className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Tabs */}
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
                        <TabsList className="bg-transparent border-b border-gray-800 w-full justify-start h-auto p-0 rounded-none gap-6">
                            <TabsTrigger
                                value="bundles"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#0152be] data-[state=active]:bg-transparent data-[state=active]:text-[#0152be] px-0 py-3 text-base text-gray-400 hover:text-gray-200 transition-all"
                            >
                                <Package className="w-4 h-4 mr-2" />
                                Vote Bundles
                            </TabsTrigger>
                            <TabsTrigger
                                value="candidates"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#0152be] data-[state=active]:bg-transparent data-[state=active]:text-[#0152be] px-0 py-3 text-base text-gray-400 hover:text-gray-200 transition-all"
                            >
                                <Users className="w-4 h-4 mr-2" />
                                All Candidates
                            </TabsTrigger>
                            <TabsTrigger
                                value="categories"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#0152be] data-[state=active]:bg-transparent data-[state=active]:text-[#0152be] px-0 py-3 text-base text-gray-400 hover:text-gray-200 transition-all"
                            >
                                <Tag className="w-4 h-4 mr-2" />
                                Categories
                            </TabsTrigger>
                        </TabsList>

                        {/* Vote Bundles Tab */}
                        {/* Vote Bundles Tab */}
                        <TabsContent value="bundles" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {filteredData.bundles.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-20 text-center">
                                    <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mb-6 border border-gray-800">
                                        <Package className="w-8 h-8 text-gray-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-2">No Bundles Found</h3>
                                    <p className="text-gray-400 max-w-sm mx-auto">
                                        Try adjusting your search or filters to find available voting bundles.
                                    </p>
                                    <Button
                                        variant="outline"
                                        className="mt-6 border-gray-700 hover:bg-gray-800"
                                        onClick={() => {
                                            setSearchQuery('');
                                            setSelectedEventFilter('all');
                                        }}
                                    >
                                        Clear Filters
                                    </Button>
                                </div>
                            ) : (
                                <div className={`grid gap-6 ${viewMode === 'grid'
                                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                                    : 'grid-cols-1'
                                    }`}>
                                    {filteredData.bundles.map((bundle) => {
                                        const hasDiscount = bundle.discount_percentage && bundle.discount_percentage > 0;

                                        return (
                                            <motion.div
                                                key={bundle._id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                whileHover={{ y: -5 }}
                                                transition={{ duration: 0.2 }}
                                                onClick={() => setSelectedBundle(bundle)}
                                                className="group cursor-pointer"
                                            >
                                                <GlassCard className="h-full overflow-hidden border-gray-800 bg-gray-900/40 hover:bg-gray-900/60 hover:border-[#0152be]/50 hover:shadow-2xl hover:shadow-[#0152be]/10 transition-all duration-300 flex flex-col">
                                                    {/* Bundle Header */}
                                                    <div className="relative p-6 bg-gradient-to-br from-gray-800/50 to-transparent flex-1">
                                                        {/* Badges */}
                                                        <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                                                            {bundle.is_popular && (
                                                                <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/50 hover:bg-orange-500/30">
                                                                    <Flame className="w-3 h-3 mr-1" /> Popular
                                                                </Badge>
                                                            )}
                                                            {bundle.is_featured && !bundle.is_popular && (
                                                                <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50 hover:bg-yellow-500/30">
                                                                    <Star className="w-3 h-3 mr-1" /> Featured
                                                                </Badge>
                                                            )}
                                                            {bundle.daysUntilExpiry && bundle.daysUntilExpiry <= 7 && (
                                                                <Badge className="bg-red-500/20 text-red-400 border-red-500/50 animate-pulse">
                                                                    Ends in {bundle.daysUntilExpiry} days
                                                                </Badge>
                                                            )}
                                                        </div>

                                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0152be] to-sky-500 p-0.5 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#0152be]/20">
                                                            <div className="w-full h-full bg-gray-950 rounded-[14px] flex items-center justify-center">
                                                                <Package className="w-7 h-7 text-white" />
                                                            </div>
                                                        </div>

                                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#0152be] transition-colors">
                                                            {bundle.name}
                                                        </h3>
                                                        <p className="text-gray-400 text-sm line-clamp-2 min-h-[40px] mb-2">
                                                            {bundle.description || `Get ${bundle.vote_count} votes for ${bundle.event.name}`}
                                                        </p>

                                                        {/* Rich Stats */}
                                                        <div className="flex flex-wrap gap-2 mt-3">
                                                            {bundle.pricePerVote && (
                                                                <Badge variant="outline" className="border-gray-700 text-gray-400 text-xs">
                                                                    {bundle.currency} {bundle.pricePerVote.toFixed(2)}/vote
                                                                </Badge>
                                                            )}
                                                            {bundle.savingsAmount && bundle.savingsAmount > 0 && (
                                                                <Badge variant="outline" className="border-green-800 text-green-400 bg-green-500/5 text-xs">
                                                                    Save {bundle.currency}{bundle.savingsAmount.toFixed(0)}
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Bundle Details */}
                                                    <div className="p-6 border-t border-gray-800/50 space-y-4">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-baseline gap-1.5">
                                                                <span className="text-3xl font-bold text-white tracking-tight">
                                                                    {bundle.currency} {bundle.price.toFixed(2)}
                                                                </span>
                                                                {hasDiscount && (
                                                                    <span className="text-sm text-gray-500 line-through">
                                                                        {bundle.original_price?.toFixed(2)}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            {hasDiscount && (
                                                                <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                                                                    Save {bundle.discount_percentage}%
                                                                </Badge>
                                                            )}
                                                        </div>

                                                        <div className="space-y-3">
                                                            <div className="flex items-center justify-between text-sm py-2 border-b border-gray-800/50">
                                                                <span className="text-gray-400 flex items-center gap-2">
                                                                    <Ticket className="w-4 h-4 text-[#0152be]" />
                                                                    Vote Count
                                                                </span>
                                                                <span className="font-semibold text-white">{bundle.vote_count.toLocaleString()}</span>
                                                            </div>
                                                            <div className="flex items-center justify-between text-sm py-2">
                                                                <span className="text-gray-400 flex items-center gap-2">
                                                                    <Calendar className="w-4 h-4 text-purple-400" />
                                                                    Event
                                                                </span>
                                                                <span className="font-semibold text-white truncate max-w-[150px]">
                                                                    {bundle.event.name}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <Button className="w-full bg-white text-black hover:bg-gray-200 group-hover:bg-[#0152be] group-hover:text-white transition-all duration-300 font-semibold shadow-xl shadow-black/20">
                                                            Select Bundle
                                                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                                        </Button>
                                                    </div>
                                                </GlassCard>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            )}
                        </TabsContent>

                        {/* Candidates Tab */}
                        < TabsContent value="candidates" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500" >
                            {
                                filteredData.candidates.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-20 text-center">
                                        <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mb-6 border border-gray-800">
                                            <Users className="w-8 h-8 text-gray-600" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-white mb-2">No Candidates Found</h3>
                                        <p className="text-gray-400 max-w-sm mx-auto">
                                            We couldn't find any candidates matching your current filters.
                                        </p>
                                        <Button
                                            variant="outline"
                                            className="mt-6 border-gray-700 hover:bg-gray-800"
                                            onClick={() => {
                                                setSearchQuery('');
                                                setSelectedEventFilter('all');
                                            }}
                                        >
                                            Clear Filters
                                        </Button>
                                    </div>
                                ) : (
                                    <div className={`grid gap-6 ${viewMode === 'grid'
                                        ? 'grid-cols-1 md:grid-cols-3 lg:grid-cols-4'
                                        : 'grid-cols-1'
                                        }`}>
                                        {filteredData.candidates.map((candidate) => {
                                            if (viewMode === 'list') {
                                                return (
                                                    <motion.div
                                                        key={candidate._id}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        <GlassCard className="p-4 flex items-center gap-6 hover:bg-gray-900/60 transition-colors group cursor-pointer" onClick={() => handleVoteClick(candidate)}>
                                                            <div className="relative w-16 h-16 flex-shrink-0">
                                                                <div className="w-full h-full rounded-full overflow-hidden ring-2 ring-gray-800 group-hover:ring-[#0152be] transition-all">
                                                                    {candidate.profile_image ? (
                                                                        <Image
                                                                            src={candidate.profile_image}
                                                                            alt={`${candidate.first_name} ${candidate.last_name}`}
                                                                            fill
                                                                            className="object-cover"
                                                                        />
                                                                    ) : (
                                                                        <div className="w-full h-full bg-gradient-to-br from-[#0152be] to-sky-500 flex items-center justify-center">
                                                                            <span className="font-bold text-white text-xl">
                                                                                {candidate.first_name[0]}{candidate.last_name[0]}
                                                                            </span>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                {candidate.is_featured && (
                                                                    <div className="absolute -top-1 -right-1 bg-yellow-500 rounded-full p-1 shadow-lg ring-2 ring-black">
                                                                        <Star className="w-3 h-3 text-white fill-current" />
                                                                    </div>
                                                                )}
                                                            </div>

                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex items-center gap-2 mb-1">
                                                                    <h3 className="text-lg font-bold text-white truncate group-hover:text-[#0152be] transition-colors">
                                                                        {candidate.first_name} {candidate.last_name}
                                                                    </h3>
                                                                    <Badge variant="outline" className="border-gray-700 text-gray-400 text-xs">
                                                                        {candidate.candidate_code}
                                                                    </Badge>
                                                                </div>
                                                                <div className="flex items-center gap-4 text-sm text-gray-400">
                                                                    <span className="flex items-center gap-1.5 truncate">
                                                                        <Award className="w-3.5 h-3.5 text-purple-400" />
                                                                        {candidate.categories?.map(cat => cat.name).join(', ') || 'Uncategorized'}
                                                                    </span>
                                                                    <span className="flex items-center gap-1.5 truncate">
                                                                        <Calendar className="w-3.5 h-3.5 text-blue-400" />
                                                                        {candidate.event.name}
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            <div className="text-right flex-shrink-0">
                                                                <div className="text-2xl font-bold text-white mb-1">
                                                                    {candidate.vote_count.toLocaleString()}
                                                                </div>
                                                                <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Votes</div>
                                                            </div>

                                                            <Button
                                                                className="bg-[#0152be] hover:bg-[#014099] ml-4"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleVoteClick(candidate);
                                                                }}
                                                            >
                                                                <Vote className="w-4 h-4 mr-2" />
                                                                Vote
                                                            </Button>
                                                        </GlassCard>
                                                    </motion.div>
                                                );
                                            }

                                            // Grid View
                                            return (
                                                <motion.div
                                                    key={candidate._id}
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    whileHover={{ y: -5 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="group cursor-pointer"
                                                    onClick={() => handleVoteClick(candidate)}
                                                >
                                                    <GlassCard className="overflow-hidden bg-gray-900/40 hover:bg-gray-900/60 transition-all duration-300 border-gray-800 hover:border-[#0152be]/50 hover:shadow-xl hover:shadow-[#0152be]/10">
                                                        <div className="relative aspect-auto h-48 overflow-hidden bg-gray-800">
                                                            {candidate.profile_image ? (
                                                                <Image
                                                                    src={candidate.profile_image}
                                                                    alt={`${candidate.first_name} ${candidate.last_name}`}
                                                                    fill
                                                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                                />
                                                            ) : (
                                                                <div className="w-full h-full bg-gradient-to-br from-[#0152be] to-sky-500 flex items-center justify-center">
                                                                    <span className="text-6xl font-bold text-white/20">
                                                                        {candidate.first_name[0]}{candidate.last_name[0]}
                                                                    </span>
                                                                </div>
                                                            )}
                                                            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent" />

                                                            {/* Floating Badges */}
                                                            <div className="absolute top-3 right-3 flex flex-col gap-2">
                                                                {candidate.is_featured && (
                                                                    <Badge className="bg-yellow-500 text-black border-none shadow-lg font-bold">
                                                                        <Star className="w-3 h-3 mr-1 fill-current" /> Featured
                                                                    </Badge>
                                                                )}
                                                            </div>

                                                            <div className="absolute bottom-4 left-4 right-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                                                <h3 className="text-xl font-bold text-white truncate mb-1">
                                                                    {candidate.first_name} {candidate.last_name}
                                                                </h3>
                                                                <div className="flex items-center gap-2 text-sm text-gray-300">
                                                                    <Badge variant="outline" className="bg-black/50 backdrop-blur border-white/10 text-white">
                                                                        Code: {candidate.candidate_code}
                                                                    </Badge>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="p-4 space-y-4">
                                                            <div className="space-y-2">
                                                                <div className="flex items-center justify-between text-sm text-gray-400">
                                                                    <span className="flex items-center gap-1.5">
                                                                        <Award className="w-3.5 h-3.5 text-purple-400" />
                                                                        Category
                                                                    </span>
                                                                    <span className="text-white truncate max-w-[120px]" title={candidate.categories[0].name}>
                                                                        {candidate.categories.map(cat => cat.name).join(", ") || 'N/A'}
                                                                    </span>
                                                                </div>
                                                                <div className="flex items-center justify-between text-sm text-gray-400">
                                                                    <span className="flex items-center gap-1.5">
                                                                        <Globe className="w-3.5 h-3.5 text-blue-400" />
                                                                        Event
                                                                    </span>
                                                                    <span className="text-white truncate max-w-[120px]" title={candidate.event.name}>
                                                                        {candidate.event.name}
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            <div className="pt-4 border-t border-gray-800 flex items-center justify-between">
                                                                <div>
                                                                    <p className="text-2xl font-bold text-white leading-none">
                                                                        {candidate.vote_count.toLocaleString()}
                                                                    </p>
                                                                    <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mt-1">
                                                                        Total Votes
                                                                    </p>
                                                                </div>
                                                                <Button size="sm" className="bg-[#0152be] hover:bg-[#014099] rounded-full px-4 shadow-lg shadow-[#0152be]/20">
                                                                    Vote Now
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </GlassCard>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                )
                            }
                        </TabsContent>

                        {/* Categories Tab */}
                        <TabsContent value="categories" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {filteredData.categories.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-20 text-center">
                                    <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mb-6 border border-gray-800">
                                        <Tag className="w-8 h-8 text-gray-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-2">No Active Categories</h3>
                                    <p className="text-gray-400 max-w-sm mx-auto">
                                        There are no categories with open voting at the moment.
                                    </p>
                                    <Button
                                        variant="outline"
                                        className="mt-6 border-gray-700 hover:bg-gray-800"
                                        onClick={() => {
                                            setSearchQuery('');
                                            setSelectedEventFilter('all');
                                        }}
                                    >
                                        Clear Filters
                                    </Button>
                                </div>
                            ) : (
                                <div className={`grid gap-6 ${viewMode === 'grid'
                                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                                    : 'grid-cols-1'
                                    }`}>
                                    {filteredData.categories.map((category) => {
                                        const daysUntilDeadline = category.voting_deadline
                                            ? Math.ceil((new Date(category.voting_deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
                                            : null;

                                        return (
                                            <motion.div
                                                key={category._id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                whileHover={{ y: -5 }}
                                                transition={{ duration: 0.2 }}
                                                className="group cursor-pointer"
                                            >
                                                <GlassCard className="h-full overflow-hidden border-gray-800 bg-gray-900/40 hover:bg-gray-900/60 hover:border-[#0152be]/50 hover:shadow-2xl hover:shadow-[#0152be]/10 transition-all duration-300 flex flex-col">
                                                    {/* Category Header */}
                                                    <div className="relative p-6 bg-gradient-to-br from-gray-800/50 to-transparent flex-1">
                                                        {/* Badges */}
                                                        <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                                                            {category.is_featured && (
                                                                <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50 hover:bg-yellow-500/30">
                                                                    <Star className="w-3 h-3 mr-1" /> Featured
                                                                </Badge>
                                                            )}
                                                            {daysUntilDeadline !== null && daysUntilDeadline <= 3 && daysUntilDeadline > 0 && (
                                                                <Badge className="bg-red-500/20 text-red-400 border-red-500/50 animate-pulse">
                                                                    Ends in {daysUntilDeadline} day{daysUntilDeadline > 1 ? 's' : ''}
                                                                </Badge>
                                                            )}
                                                        </div>

                                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 p-0.5 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-500/20">
                                                            <div className="w-full h-full bg-gray-950 rounded-[14px] flex items-center justify-center">
                                                                <Tag className="w-7 h-7 text-white" />
                                                            </div>
                                                        </div>

                                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#0152be] transition-colors">
                                                            {category.name}
                                                        </h3>
                                                        <p className="text-gray-400 text-sm line-clamp-2 min-h-[40px] mb-2">
                                                            {category.description || `Vote for your favorite in ${category.name}`}
                                                        </p>
                                                    </div>

                                                    {/* Category Details */}
                                                    <div className="p-6 border-t border-gray-800/50 space-y-4">
                                                        <div className="space-y-3">
                                                            <div className="flex items-center justify-between text-sm py-2 border-b border-gray-800/50">
                                                                <span className="text-gray-400 flex items-center gap-2">
                                                                    <Users className="w-4 h-4 text-[#0152be]" />
                                                                    Candidates
                                                                </span>
                                                                <span className="font-semibold text-white">{category.candidates?.length || 0}</span>
                                                            </div>
                                                            <div className="flex items-center justify-between text-sm py-2 border-b border-gray-800/50">
                                                                <span className="text-gray-400 flex items-center gap-2">
                                                                    <Vote className="w-4 h-4 text-green-400" />
                                                                    Total Votes
                                                                </span>
                                                                <span className="font-semibold text-white">{category.total_votes?.toLocaleString() || 0}</span>
                                                            </div>
                                                            <div className="flex items-center justify-between text-sm py-2">
                                                                <span className="text-gray-400 flex items-center gap-2">
                                                                    <Calendar className="w-4 h-4 text-purple-400" />
                                                                    Event
                                                                </span>
                                                                <span className="font-semibold text-white truncate max-w-[150px]">
                                                                    {typeof category.event === 'string' ? category.event : (category.event?.name || 'N/A')}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        {category.voting_deadline && (
                                                            <div className="pt-2 text-center">
                                                                <Badge variant="outline" className="border-gray-700 text-gray-400 text-xs">
                                                                    <Calendar className="w-3 h-3 mr-1.5" />
                                                                    Deadline: {formatDistanceToNow(new Date(category.voting_deadline), { addSuffix: true })}
                                                                </Badge>
                                                            </div>
                                                        )}

                                                        <Button
                                                            className="w-full bg-white text-black hover:bg-gray-200 group-hover:bg-[#0152be] group-hover:text-white transition-all duration-300 font-semibold shadow-xl shadow-black/20"
                                                            onClick={() => {
                                                                setActiveTab('candidates');
                                                                filteredData.candidates = category.candidates.map((c) => {
                                                                    return {
                                                                        ...c,
                                                                        categories: [category]
                                                                    }
                                                                })

                                                                console.log(filteredData.candidates)

                                                            }}
                                                        >
                                                            View Candidates
                                                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                                        </Button>
                                                    </div>
                                                </GlassCard>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </div >

                {/* Modals */}
                {
                    selectedBundle && (
                        <VoteBundleModal
                            open={!!selectedBundle}
                            onOpenChange={(open) => !open && setSelectedBundle(null)}
                            bundle={selectedBundle}
                            events={events}
                            categories={categories}
                            candidates={candidates}
                            onVoteClick={(candidate, category) => {
                                setSelectedBundle(null);
                                handleVoteClick(candidate, category);
                            }}
                        />
                    )
                }
                {
                    selectedCandidate && (
                        <VoteDialog
                            open={isVoteDialogOpen}
                            onOpenChange={(open) => {
                                setIsVoteDialogOpen(open);
                                if (!open) {
                                    setSelectedCandidate(null);
                                    setSelectedCategory(null);
                                }
                            }}
                            candidate={selectedCandidate}
                            category={undefined}
                            categories={selectedCandidate.categories as unknown as Category[]}
                            eventId={selectedCandidate?.event._id as unknown as string}
                            eventName={selectedCategory?.event.name}
                        />
                    )
                }
            </div >
        </>
    );
}
