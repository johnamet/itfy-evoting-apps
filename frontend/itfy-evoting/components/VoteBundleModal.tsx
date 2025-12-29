'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import {
  Package,
  Vote,
  Search,
  X,
  ChevronDown,
  ChevronUp,
  Users,
  Award,
  Trophy,
  Ticket,
  Star,
  Flame,
  Timer,
  Sparkles
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import PurchaseVotesDialog from '@/components/PurchaseVotesDialog';
import { Bundle, Candidate, Category, Event } from '@/types';
import { cn } from '@/lib/utils';

interface VoteBundleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bundle: Bundle;
  events: Event[];
  categories: Category[];
  candidates: Candidate[];
  onVoteClick?: (candidate: Candidate, category: Category) => void;
}

export default function VoteBundleModal({
  open,
  onOpenChange,
  bundle,
  events,
  categories,
  candidates,
  onVoteClick
}: VoteBundleModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [isPurchaseDialogOpen, setIsPurchaseDialogOpen] = useState(false);
  const [selectedCandidateForPurchase, setSelectedCandidateForPurchase] = useState<Candidate | null>(null);

  // Helper to safely get event name
  const getEventName = (eventIdOrObj: string | any) => {
    if (!eventIdOrObj) return 'Unknown Event';
    if (typeof eventIdOrObj === 'object' && eventIdOrObj.name) return eventIdOrObj.name;
    const eventId = typeof eventIdOrObj === 'object' ? eventIdOrObj._id : eventIdOrObj;
    return events.find(e => e._id === String(eventId))?.name || 'Unknown Event';
  };

  const event = useMemo(() => events.find(e => e._id === bundle.event), [bundle.event, events]);

  const getCandidatesByCategory = (categoryId: string): Candidate[] => {
    return candidates.filter(candidate =>
      candidate.categories.includes(categoryId) &&
      candidate.status === 'approved' &&
      candidate.is_published
    );
  };

  const bundleCategories = useMemo(() => {
    if (bundle.categories && bundle.categories.length > 0) {
      return categories.filter(cat =>
        bundle.categories?.includes(cat._id) && cat.is_voting_open
      );
    }
    return categories.filter(cat =>
      cat.event === bundle.event && cat.is_voting_open
    );
  }, [bundle.categories, bundle.event, categories]);

  const filteredCategories = useMemo(() => {
    if (!searchQuery) return bundleCategories;

    const query = searchQuery.toLowerCase();
    return bundleCategories.filter(category => {
      if (category.name.toLowerCase().includes(query)) return true;

      const catCandidates = candidates.filter(c =>
        c.categories.includes(category._id) &&
        c.status === 'approved' &&
        c.is_published
      );
      return catCandidates.some(c =>
        `${c.first_name} ${c.last_name}`.toLowerCase().includes(query) ||
        c.candidate_code.toLowerCase().includes(query)
      );
    });
  }, [bundleCategories, searchQuery, candidates]);

  const getFilteredCandidates = (categoryId: string) => {
    const catCandidates = getCandidatesByCategory(categoryId);
    if (!searchQuery) return catCandidates;

    const query = searchQuery.toLowerCase();
    return catCandidates.filter(c =>
      `${c.first_name} ${c.last_name}`.toLowerCase().includes(query) ||
      c.candidate_code.toLowerCase().includes(query)
    );
  };

  const toggleCategory = (categoryId: string) => {
    const newSet = new Set(expandedCategories);
    newSet.has(categoryId) ? newSet.delete(categoryId) : newSet.add(categoryId);
    setExpandedCategories(newSet);
  };

  const expandAll = () => setExpandedCategories(new Set(bundleCategories.map(c => c._id)));
  const collapseAll = () => setExpandedCategories(new Set());

  const handleCandidateClick = (candidate: Candidate, category: Category) => {
    onVoteClick?.(candidate, category);
  };

  const handlePurchaseBundle = (candidate?: Candidate) => {
    setSelectedCandidateForPurchase(candidate || null);
    setIsPurchaseDialogOpen(true);
  };

  const getTimeRemaining = (deadline: string | null) => {
    if (!deadline) return 'Ongoing';
    const end = new Date(deadline);
    if (end <= new Date()) return 'Voting Ended';
    return formatDistanceToNow(end, { addSuffix: true });
  };

  const hasDiscount = bundle.discount_percentage && bundle.discount_percentage > 0;
  const totalCandidates = bundleCategories.reduce((sum, cat) => sum + getCandidatesByCategory(cat._id).length, 0);
  const totalCategories = bundleCategories.length;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="p-0 bg-gradient-to-br from-gray-950 via-gray-900 to-black border-gray-800 text-white w-[95vw] max-w-[1400px] max-h-[85vh] overflow-hidden flex flex-col rounded-xl shadow-2xl">
          {/* Header - Fixed */}
          <DialogHeader className="p-5 flex-shrink-0 bg-black/30 backdrop-blur-xl border-b border-gray-800">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0152be] via-blue-600 to-sky-500 p-0.5">
                  <div className="w-full h-full rounded-xl bg-gray-950 flex items-center justify-center">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <DialogTitle className="text-xl font-bold flex items-center gap-2">
                    {bundle.name}
                    {bundle.is_popular && (
                      <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/50 text-xs px-1.5 py-0.5">
                        <Flame className="w-3 h-3 mr-0.5" />
                        Hot
                      </Badge>
                    )}
                    {bundle.is_featured && !bundle.is_popular && (
                      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50 text-xs px-1.5 py-0.5">
                        <Star className="w-3 h-3 mr-0.5" />
                        Featured
                      </Badge>
                    )}
                  </DialogTitle>
                  <p className="text-gray-400 text-sm">
                    {event?.name} • {bundle.vote_count.toLocaleString()} votes
                  </p>
                </div>
              </div>

              {/* Price & Purchase - Inline */}
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-white">
                      {bundle.currency} {bundle.price.toFixed(2)}
                    </span>
                    {hasDiscount && bundle.original_price && (
                      <span className="text-sm text-gray-500 line-through">
                        {bundle.currency} {bundle.original_price.toFixed(2)}
                      </span>
                    )}
                  </div>
                  {hasDiscount && (
                    <Badge className="bg-green-500/30 text-green-400 border-green-500/50 text-xs mt-0.5">
                      -{bundle.discount_percentage}% OFF
                    </Badge>
                  )}
                </div>
                <Button
                  size="sm"
                  onClick={() => handlePurchaseBundle()}
                  className="bg-gradient-to-r from-[#0152be] to-sky-500 hover:from-[#014099] hover:to-sky-600 shadow-lg"
                >
                  <Sparkles className="w-4 h-4 mr-1.5" />
                  Purchase
                </Button>
              </div>
            </div>

            {bundle.description && (
              <p className="text-gray-400 text-sm mt-3 italic">
                &quot;{bundle.description}&quot;
              </p>
            )}
          </DialogHeader>

          {/* Controls Bar */}
          <div className="px-5 py-3 border-b border-gray-800 flex items-center justify-between flex-shrink-0 bg-black/20 backdrop-blur">
            <div className="flex items-center gap-4 text-sm text-gray-300">
              <span className="flex items-center gap-1.5">
                <Ticket className="w-4 h-4 text-[#0152be]" />
                <span className="font-semibold">{bundle.vote_count}</span> votes
              </span>
              <div className="w-px h-4 bg-gray-700" />
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-purple-400" />
                <span className="font-semibold">{totalCategories}</span> categories
              </span>
              <div className="w-px h-4 bg-gray-700" />
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-pink-400" />
                <span className="font-semibold">{totalCandidates}</span> candidates
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <button onClick={expandAll} className="text-[#0152be] hover:text-sky-400 transition">Expand All</button>
              <span className="text-gray-600">•</span>
              <button onClick={collapseAll} className="text-[#0152be] hover:text-sky-400 transition">Collapse All</button>
            </div>
          </div>

          {/* Search */}
          <div className="px-5 py-3 flex-shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                placeholder="Search categories or candidates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-9 py-2 text-sm bg-white/5 border-gray-700 focus:border-[#0152be] focus:ring-2 focus:ring-[#0152be]/20 rounded-lg"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Scrollable Categories */}
          <div className="flex-1 overflow-y-auto px-5 py-3 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
            {filteredCategories.length === 0 ? (
              <div className="text-center py-12">
                <Award className="w-14 h-14 mx-auto text-gray-700 mb-4" />
                <h3 className="text-lg font-medium text-gray-400">No results found</h3>
                <p className="text-gray-500 text-sm mt-1">Try a different search term</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredCategories.map((category) => {
                  const candidates = getFilteredCandidates(category._id);
                  const isExpanded = expandedCategories.has(category._id);
                  const timeRemaining = getTimeRemaining(category.voting_deadline || null);

                  return (
                    <div
                      key={category._id}
                      className="rounded-xl overflow-hidden bg-gradient-to-r from-gray-900/50 to-gray-800/30 border border-gray-800 shadow-lg transition-all duration-200 hover:shadow-xl hover:shadow-[#0152be]/10"
                    >
                      <button
                        onClick={() => toggleCategory(category._id)}
                        className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-all"
                      >
                        <div className="flex items-center gap-4">
                          {category.image ? (
                            <div className="w-10 h-10 rounded-lg overflow-hidden ring-2 ring-gray-800">
                              <Image src={category.image} alt={category.name} width={40} height={40} className="object-cover" />
                            </div>
                          ) : (
                            <div
                              className="w-10 h-10 rounded-lg flex items-center justify-center"
                              style={{ backgroundColor: category.color_theme || '#0152be' }}
                            >
                              <Trophy className="w-5 h-5 text-white" />
                            </div>
                          )}
                          <div className="text-left">
                            <h3 className="text-base font-semibold flex items-center gap-2">
                              {category.name}
                              {category.is_featured && <Star className="w-4 h-4 text-yellow-500" />}
                            </h3>
                            <div className="flex items-center gap-4 text-gray-400 text-xs mt-0.5">
                              <span className="flex items-center gap-1">
                                <Users className="w-3.5 h-3.5" /> {candidates.length} candidates
                              </span>
                              <span className="flex items-center gap-1">
                                <Vote className="w-3.5 h-3.5" /> {category.total_votes.toLocaleString()} votes
                              </span>
                              {timeRemaining && (
                                <span className="flex items-center gap-1 text-orange-400">
                                  <Timer className="w-3.5 h-3.5" /> {timeRemaining}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Badge variant={category.is_voting_open ? "default" : "secondary"}
                            className={cn(
                              "text-xs px-2 py-0.5",
                              category.is_voting_open
                                ? "bg-green-500/20 text-green-400 border-green-500/40"
                                : "bg-gray-600/30 text-gray-400"
                            )}
                          >
                            {category.is_voting_open ? 'Open' : 'Closed'}
                          </Badge>
                          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="p-4 pt-2 bg-black/30">
                          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                            {candidates.map((candidate) => (
                              <div
                                key={candidate._id}
                                onClick={() => handleCandidateClick(candidate, category)}
                                className="group relative bg-gradient-to-b from-gray-800/50 to-gray-900/50 rounded-lg p-3 border border-gray-700 hover:border-[#0152be] hover:shadow-lg hover:shadow-[#0152be]/20 transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5 min-h-[140px] flex flex-col justify-between"
                              >
                                <div className="flex flex-col items-center text-center">
                                  <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-gray-700 group-hover:ring-[#0152be] transition-all mb-2">
                                    {candidate.profile_image ? (
                                      <Image
                                        src={candidate.profile_image}
                                        alt={`${candidate.first_name} ${candidate.last_name}`}
                                        width={48}
                                        height={48}
                                        className="w-full h-full object-cover"
                                      />
                                    ) : (
                                      <div className="w-full h-full bg-gradient-to-br from-[#0152be] to-sky-500 flex items-center justify-center text-sm font-bold">
                                        {candidate.first_name[0]}{candidate.last_name[0]}
                                      </div>
                                    )}
                                  </div>

                                  <h4 className="font-medium text-white text-xs truncate w-full">
                                    {candidate.first_name} {candidate.last_name}
                                  </h4>
                                  <p className="text-[10px] text-gray-500">{candidate.candidate_code}</p>
                                  <p className="text-xs font-semibold text-[#0152be] mt-1">
                                    {candidate.vote_count.toLocaleString()} votes
                                  </p>

                                  {candidate.is_featured && (
                                    <Star className="absolute top-1.5 right-1.5 w-3.5 h-3.5 text-yellow-500" />
                                  )}
                                </div>

                                <Button
                                  size="sm"
                                  className="w-full mt-2 h-7 text-xs bg-[#0152be] hover:bg-[#014099]"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCandidateClick(candidate, category);
                                  }}
                                  disabled={!category.is_voting_open} // Disable button if voting is closed
                                >
                                  <Vote className="w-3 h-3 mr-1" />
                                  Vote
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-5 py-3 border-t border-gray-800 bg-black/40 backdrop-blur-xl flex-shrink-0">
            <div className="flex items-center justify-between">
              <p className="text-gray-400 text-sm">Click on a candidate to cast your vote</p>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>
                  Close
                </Button>
                <Button
                  size="sm"
                  onClick={() => handlePurchaseBundle()}
                  className="bg-gradient-to-r from-[#0152be] to-sky-500 hover:from-[#014099] hover:to-sky-600"
                >
                  <Ticket className="w-4 h-4 mr-1.5" />
                  Buy {bundle.vote_count} Votes
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {selectedCandidate && (
        <VoteDialog
          open={!!selectedCandidate}
          onOpenChange={(open) => !open && setSelectedCandidate(null)}
          candidate={selectedCandidate}
          category={selectedCategory || undefined}
          eventId={typeof selectedCategory?.event === 'object' ? (selectedCategory.event as any)._id : selectedCategory?.event}
          eventName={getEventName(selectedCategory?.event)}
        />
      )}
      <PurchaseVotesDialog
        open={isPurchaseDialogOpen}
        onOpenChange={setIsPurchaseDialogOpen}
        eventId={bundle.event}
        eventName={event?.name}
        candidateId={selectedCandidateForPurchase?._id}
        candidateName={selectedCandidateForPurchase ? `${selectedCandidateForPurchase.first_name} ${selectedCandidateForPurchase.last_name}` : undefined}
      />
    </>
  );
}