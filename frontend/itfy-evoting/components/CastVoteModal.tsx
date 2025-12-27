'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { 
  Vote, 
  Search,
  ChevronDown,
  ChevronUp,
  Users,
  Award,
  Trophy
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import GlassCard from '@/components/ui/GlassCard';
import VoteDialog from '@/components/VoteDialog';
import { Candidate, Category, Event } from '@/types';
import { cn } from '@/lib/utils';

interface CastVoteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: Event;
  categories: Category[];
  candidates: Candidate[];
}

export default function CastVoteModal({ 
  open, 
  onOpenChange, 
  event,
  categories,
  candidates
}: CastVoteModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isVoteDialogOpen, setIsVoteDialogOpen] = useState(false);

  const candidatesByCategory = useMemo(() => {
    const grouped = new Map<string, Candidate[]>();
    candidates.forEach(candidate => {
      candidate.categories.forEach(catId => {
        const categoryId = String(catId);
        if (!grouped.has(categoryId)) grouped.set(categoryId, []);
        grouped.get(categoryId)!.push(candidate);
      });
    });
    return grouped;
  }, [candidates]);

  const filteredCategories = useMemo(() => {
    if (!searchQuery) return categories;
    const query = searchQuery.toLowerCase();
    return categories.filter(category => {
      if (category.name.toLowerCase().includes(query)) return true;
      const categoryCandidates = candidatesByCategory.get(String(category._id)) || [];
      return categoryCandidates.some(c => 
        `${c.first_name} ${c.last_name}`.toLowerCase().includes(query) ||
        c.candidate_code.toLowerCase().includes(query)
      );
    });
  }, [categories, searchQuery, candidatesByCategory]);

  const getFilteredCandidates = (categoryId: string) => {
    const categoryCandidates = candidatesByCategory.get(categoryId) || [];
    if (!searchQuery) return categoryCandidates;
    const query = searchQuery.toLowerCase();
    return categoryCandidates.filter(c => 
      `${c.first_name} ${c.last_name}`.toLowerCase().includes(query) ||
      c.candidate_code.toLowerCase().includes(query)
    );
  };

  const toggleCategory = (categoryId: string) => {
    const newSet = new Set(expandedCategories);
    newSet.has(categoryId) ? newSet.delete(categoryId) : newSet.add(categoryId);
    setExpandedCategories(newSet);
  };

  const expandAll = () => setExpandedCategories(new Set(categories.map(c => String(c._id))));
  const collapseAll = () => setExpandedCategories(new Set());

  const handleCandidateClick = (candidate: Candidate, category: Category) => {
    setSelectedCandidate(candidate);
    setSelectedCategory(category);
    setIsVoteDialogOpen(true);
  };

  const handleVoteDialogClose = (open: boolean) => {
    setIsVoteDialogOpen(open);
    if (!open) {
      setSelectedCandidate(null);
      setSelectedCategory(null);
    }
  };

  const totalCandidates = candidates.length;
  const totalCategories = categories.length;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="p-0 bg-gradient-to-br from-gray-950 via-gray-900 to-black border-gray-800 text-white max-w-4xl max-h-[85vh] overflow-scroll flex flex-col rounded-xl shadow-2xl">
          {/* Header */}
          <DialogHeader className="p-5 bg-black/40 backdrop-blur-xl border-b border-gray-800 flex-shrink-0">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0152be] via-blue-600 to-sky-500 p-0.5 shadow-lg shadow-[#0152be]/30">
                <div className="w-full h-full rounded-xl bg-gray-950 flex items-center justify-center">
                  <Vote className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Cast Your Vote
                </DialogTitle>
                <p className="text-sm text-gray-400 mt-0.5">
                  Choose a candidate in <span className="text-[#0152be] font-semibold">{event.name}</span>
                </p>
              </div>
            </div>
          </DialogHeader>

          {/* Stats Bar */}
          <div className="px-5 py-3 bg-black/30 backdrop-blur border-b border-gray-800 flex-shrink-0">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-400" />
                <div className="flex items-baseline gap-1.5">
                  <p className="text-xl font-bold text-white">{totalCategories}</p>
                  <p className="text-xs text-gray-400">Categories</p>
                </div>
              </div>
              <div className="w-px h-6 bg-gray-700" />
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-pink-400" />
                <div className="flex items-baseline gap-1.5">
                  <p className="text-xl font-bold text-white">{totalCandidates}</p>
                  <p className="text-xs text-gray-400">Candidates</p>
                </div>
              </div>
              <div className="w-px h-6 bg-gray-700" />
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <div className="flex items-baseline gap-1.5">
                  <p className="text-xl font-bold text-white">{(event.total_votes || 0).toLocaleString()}</p>
                  <p className="text-xs text-gray-400">Votes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search + Controls */}
          <div className="px-5 py-3 flex items-center gap-4 flex-shrink-0 bg-black/20 backdrop-blur">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                placeholder="Search categories or candidates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-8 py-2 text-sm bg-white/5 border-gray-700 focus:border-[#0152be] focus:ring-2 focus:ring-[#0152be]/20 rounded-lg"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={expandAll} className="border-gray-700 hover:bg-white/10 text-xs">
                Expand All
              </Button>
              <Button variant="outline" size="sm" onClick={collapseAll} className="border-gray-700 hover:bg-white/10 text-xs">
                Collapse All
              </Button>
            </div>
          </div>

          {/* Scrollable Categories */}
          <div className="flex-1 overflow-y-auto px-5 py-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
            {filteredCategories.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <Search className="w-10 h-10 text-gray-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-400 mb-1">No results found</h3>
                <p className="text-gray-500 text-sm">Try searching with different keywords</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredCategories.map((category) => {
                  const isExpanded = expandedCategories.has(String(category._id));
                  const categoryCandidates = getFilteredCandidates(String(category._id));

                  return (
                    <GlassCard 
                      key={category._id} 
                      className="overflow-hidden border border-gray-800 shadow-lg hover:shadow-[#0152be]/10 transition-all duration-300"
                    >
                      <button
                        onClick={() => toggleCategory(String(category._id))}
                        className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-all"
                      >
                        <div className="flex items-center gap-4">
                          <div 
                            className="w-10 h-10 rounded-xl flex items-center justify-center shadow"
                            style={{ backgroundColor: category.color_theme || '#0152be' }}
                          >
                            <Trophy className="w-5 h-5 text-white" />
                          </div>
                          <div className="text-left">
                            <h3 className="text-base font-semibold text-white flex items-center gap-2">
                              {category.name}
                              {category.is_featured && (
                                <span className="text-yellow-500 text-sm">⭐</span>
                              )}
                            </h3>
                            <div className="flex items-center gap-4 text-gray-400 text-xs mt-0.5">
                              <span className="flex items-center gap-1">
                                <Users className="w-3.5 h-3.5" />
                                {categoryCandidates.length} candidates
                              </span>
                              <span className="flex items-center gap-1">
                                <Vote className="w-3.5 h-3.5" />
                                {(category.total_votes || 0).toLocaleString()} votes
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className={cn(
                            "px-2.5 py-1 rounded-full text-xs font-medium",
                            category.is_voting_open 
                              ? "bg-green-500/20 text-green-400 border border-green-500/40" 
                              : "bg-red-500/20 text-red-400 border border-red-500/40"
                          )}>
                            {category.is_voting_open ? 'Open' : 'Closed'}
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </button>

                      {/* Candidates Grid */}
                      {isExpanded && (
                        <div className="p-4 pt-3 bg-black/40 border-t border-gray-800">
                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                            {categoryCandidates.map((candidate) => (
                              <button
                                key={candidate._id}
                                onClick={() => handleCandidateClick(candidate, category)}
                                className={cn(
                                  "group relative bg-gradient-to-b from-gray-800/70 to-gray-900/70 rounded-xl p-3",
                                  "border border-gray-700 hover:border-[#0152be] hover:shadow-lg hover:shadow-[#0152be]/30",
                                  "transform hover:-translate-y-1 transition-all duration-200",
                                  "focus:outline-none focus:ring-2 focus:ring-[#0152be]/50"
                                )}
                              >
                                <div className="flex flex-col items-center text-center">
                                  <div className="relative mb-2">
                                    <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-gray-700 group-hover:ring-[#0152be] transition-all">
                                      {candidate.profile_image ? (
                                        <Image
                                          src={candidate.profile_image}
                                          alt={`${candidate.first_name} ${candidate.last_name}`}
                                          width={56}
                                          height={56}
                                          className="w-full h-full object-cover"
                                        />
                                      ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-[#0152be] to-sky-500 flex items-center justify-center text-lg font-bold text-white">
                                          {candidate.first_name[0]}{candidate.last_name[0]}
                                        </div>
                                      )}
                                    </div>
                                    {candidate.is_featured && (
                                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center shadow">
                                        <span className="text-xs">⭐</span>
                                      </div>
                                    )}
                                  </div>

                                  <h4 className="font-semibold text-white text-sm truncate w-full">
                                    {candidate.first_name} {candidate.last_name}
                                  </h4>

                                  <p className="text-xs text-[#0152be] font-mono mt-1 bg-[#0152be]/10 px-2 py-0.5 rounded-full">
                                    {candidate.candidate_code}
                                  </p>

                                  <div className="mt-2 flex items-center gap-1 text-gray-300">
                                    <Vote className="w-3.5 h-3.5 text-[#0152be]" />
                                    <span className="font-bold text-sm">
                                      {(candidate.vote_count || 0).toLocaleString()}
                                    </span>
                                  </div>

                                  <div className="mt-2 w-full">
                                    <div className="bg-gray-700 rounded-full h-1 overflow-hidden">
                                      <div 
                                        className="h-full bg-gradient-to-r from-[#0152be] to-sky-500 transition-all duration-500"
                                        style={{ width: `${Math.min(100, (candidate.vote_count || 0) / 1000 * 100)}%` }}
                                      />
                                    </div>
                                  </div>

                                  <span className="mt-2 text-xs text-gray-500 group-hover:text-gray-300 transition-colors">
                                    Vote →
                                  </span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </GlassCard>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-5 py-3 border-t border-gray-800 bg-black/50 backdrop-blur-xl flex-shrink-0">
            <div className="flex items-center justify-between">
              <p className="text-gray-400 text-sm">
                Select a candidate to cast your vote
              </p>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                className="px-4 border-gray-600 hover:bg-gray-800"
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {selectedCandidate && (
        <VoteDialog
          open={isVoteDialogOpen}
          onOpenChange={handleVoteDialogClose}
          candidate={selectedCandidate}
          category={selectedCategory || undefined}
          eventId={String(event._id)}
          eventName={event.name}
        />
      )}
    </>
  );
}