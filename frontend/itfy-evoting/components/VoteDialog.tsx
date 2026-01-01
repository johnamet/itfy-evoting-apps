'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Vote,
  Check,
  AlertCircle,
  Loader2,
  Minus,
  Plus,
  X,
  Sparkles,
  Award,
  Ticket,
  ArrowRight,
  Heart,
  ChevronLeft,
  ShieldCheck,
  Zap,
  LayoutGrid,
  Hourglass
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import PurchaseVotesDialog from '@/components/PurchaseVotesDialog';
import { Candidate, Category } from '@/types';
import { votesApi } from '@/lib/api/votes';

interface VoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  candidate: Candidate;
  category?: Category;
  categories?: Category[];
  eventId?: string;
  eventName?: string;
}

type VoteStep = 'category' | 'code' | 'quantity' | 'confirm' | 'success' | 'error' | 'voting_closed';

const stepConfig = {
  category: { title: 'Select Category', icon: LayoutGrid, step: 0 },
  code: { title: 'Enter Vote Code', icon: Ticket, step: 1 },
  quantity: { title: 'Select Quantity', icon: Zap, step: 2 },
  confirm: { title: 'Confirm Vote', icon: ShieldCheck, step: 3 },
  success: { title: 'Vote Successful!', icon: Heart, step: 4 },
  error: { title: 'Something Went Wrong', icon: AlertCircle, step: 4 },
  voting_closed: { title: 'Voting Closed', icon: Hourglass, step: 4 },
};

export default function VoteDialog({
  open,
  onOpenChange,
  candidate,
  category,
  categories,
  eventId,
  eventName
}: VoteDialogProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(category);
  const [step, setStep] = useState<VoteStep>('code');
  const [voteCode, setVoteCode] = useState('');
  const [voteQuantity, setVoteQuantity] = useState(1);
  const [isValidating, setIsValidating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPurchaseDialogOpen, setIsPurchaseDialogOpen] = useState(false);
  const [codeInfo, setCodeInfo] = useState<{
    valid: boolean;
    remainingVotes: number;
    eventName?: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Filter valid categories
  const validCategories = categories?.filter(c => c.is_voting_open) || [];

  // Initialize
  useEffect(() => {
    if (open) {
      if (category && category.is_voting_open) {
        setSelectedCategory(category);
        setStep('code');
      } else if (validCategories.length > 1) {
        setStep('category');
      } else if (validCategories.length === 1) {
        setSelectedCategory(validCategories[0]);
        setStep('code');
      } else {
        // No valid categories available
        setStep('voting_closed');
      }
    }
  }, [open, category, categories]);

  const resetDialog = () => {
    if (category && category.is_voting_open) {
      setStep('code');
      setSelectedCategory(category);
    } else if (validCategories.length > 1) {
      setStep('category');
      setSelectedCategory(undefined);
    } else {
      if (validCategories.length === 1) {
        setSelectedCategory(validCategories[0]);
        setStep('code');
      } else {
        setStep('voting_closed');
      }
    }
    setVoteCode('');
    setVoteQuantity(1);
    setCodeInfo(null);
    setError(null);
    setIsValidating(false);
    setIsSubmitting(false);
  };

  const handleClose = () => {
    resetDialog();
    onOpenChange(false);
  };

  const handleValidateCode = async () => {
    if (!voteCode.trim()) {
      setError('Please enter a vote code');
      return;
    }

    setIsValidating(true);
    setError(null);

    try {
      const response = await votesApi.validateCode(voteCode, eventId);

      if (response.success && response.data.valid) {
        setCodeInfo({
          valid: true,
          remainingVotes: response.data.remaining_votes,
          eventName: response.data.bundle_name
        });
        setStep('quantity');
      } else {
        setError(response.error || 'Invalid vote code. Please check and try again.');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to validate code. Please try again.');
    } finally {
      setIsValidating(false);
    }
  };

  const handleConfirmVote = () => {
    if (codeInfo && voteQuantity > codeInfo.remainingVotes) {
      setError(`You can only cast up to ${codeInfo.remainingVotes} votes`);
      return;
    }
    setStep('confirm');
  };

  const handleSubmitVote = async () => {
    if (!selectedCategory && !category) {
      setError('Category is required to vote');
      return;
    }
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await votesApi.castBulk({
        vote_code: voteCode,
        votes: [{
          candidate_id: candidate._id,
          category_id: selectedCategory?._id as string,
          quantity: voteQuantity
        }]
      });

      if (response.success) {
        setStep('success');
      } else {
        setError(response.error || 'Failed to submit vote');
        setStep('error');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to submit vote. Please try again.');
      setStep('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const decrementQuantity = () => {
    if (voteQuantity > 1) {
      setVoteQuantity(voteQuantity - 1);
    }
  };

  const incrementQuantity = () => {
    if (codeInfo && voteQuantity < codeInfo.remainingVotes) {
      setVoteQuantity(voteQuantity + 1);
    }
  };

  const currentStepConfig = stepConfig[step];
  const StepIcon = currentStepConfig.icon;

  return (
    <>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="p-0 bg-gradient-to-br from-gray-950 via-gray-900 to-black border-gray-800 text-white max-w-lg overflow-auto rounded-2xl shadow-2xl shadow-black/50">
          {/* Background Effects */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#0152be]/20 rounded-full blur-[80px]" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-600/15 rounded-full blur-[80px]" />
          </div>

          <div className="relative z-10">
            {/* Header */}
            <div className="px-6 py-5 border-b border-gray-800/50 bg-black/30 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0152be] to-sky-500 p-0.5 shadow-lg shadow-[#0152be]/20">
                  <div className="w-full h-full bg-gray-950 rounded-[10px] flex items-center justify-center">
                    <StepIcon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">{currentStepConfig.title}</h2>
                  <p className="text-xs text-gray-400">
                    {step === 'code' && 'Enter your vote code to proceed'}
                    {step === 'quantity' && 'Choose how many votes to cast'}
                    {step === 'confirm' && 'Review your vote before submitting'}
                    {step === 'success' && 'Your vote has been recorded'}
                    {step === 'error' && 'We encountered an issue'}
                  </p>
                </div>
              </div>

              {/* Progress Steps */}
              <div className="flex gap-1.5 mt-4">
                {['category', 'code', 'quantity', 'confirm'].filter(s => {
                  if (s === 'category' && validCategories.length <= 1) return false;
                  return true;
                }).map((s, i) => (
                  <div
                    key={s}
                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${step === 'success' || step === 'error'
                      ? step === 'success' ? 'bg-green-500' : 'bg-red-500'
                      : i <= ['category', 'code', 'quantity', 'confirm'].filter(st => {
                        if (st === 'category' && validCategories.length <= 1) return false;
                        return true;
                      }).indexOf(step)
                        ? 'bg-[#0152be]'
                        : 'bg-gray-800'
                      }`}
                  />
                ))}
              </div>
            </div>

            {/* Candidate Card */}
            <div className="px-6 py-4 bg-gradient-to-r from-gray-800/30 to-gray-900/30 border-b border-gray-800/30">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-xl overflow-hidden ring-2 ring-[#0152be]/30 shadow-lg">
                    {candidate.profile_image ? (
                      <Image
                        src={candidate.profile_image}
                        alt={`${candidate.first_name} ${candidate.last_name}`}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#0152be] to-sky-500 flex items-center justify-center">
                        <span className="text-xl font-bold text-white">
                          {candidate.first_name[0]}{candidate.last_name[0]}
                        </span>
                      </div>
                    )}
                  </div>
                  {candidate.is_featured && (
                    <div className="absolute -top-1 -right-1 bg-yellow-500 rounded-full p-1 shadow-lg ring-2 ring-black">
                      <Award className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-white truncate">
                    {candidate.first_name} {candidate.last_name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="border-gray-700 text-gray-400 text-xs px-2 py-0.5">
                      {candidate.candidate_code}
                    </Badge>
                    {(selectedCategory || category) && (
                      <Badge className="bg-[#0152be]/20 text-[#0152be] border-[#0152be]/30 text-xs px-2 py-0.5">
                        {selectedCategory?.name || category?.name}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="text-right hidden sm:block">
                  <p className="text-2xl font-bold text-white">{candidate.vote_count.toLocaleString()}</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">Current Votes</p>
                </div>
              </div>
            </div>

            {/* Step Content */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {step === 'category' && (
                  <motion.div
                    key="category"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <Label className="text-gray-300 text-sm font-medium">Select a Category</Label>
                    <div className="grid gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                      {validCategories.map((cat) => (
                        <button
                          key={cat._id}
                          onClick={() => {
                            setSelectedCategory(cat);
                            setStep('code');
                          }}
                          className="flex items-center gap-4 p-4 rounded-xl border border-gray-800 bg-gray-900/40 hover:bg-[#0152be]/10 hover:border-[#0152be]/50 hover:shadow-lg hover:shadow-[#0152be]/5 transition-all group text-left"
                        >
                          <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center group-hover:bg-[#0152be] transition-colors">
                            <Award className="w-5 h-5 text-gray-400 group-hover:text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium text-white group-hover:text-[#0152be] transition-colors">{cat.name}</h4>
                            <p className="text-xs text-gray-500">Click to select</p>
                          </div>
                          <ChevronLeft className="w-4 h-4 ml-auto rotate-180 text-gray-600 group-hover:text-[#0152be] transition-colors" />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
                {step === 'code' && (
                  <motion.div
                    key="code"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-5"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="voteCode" className="text-gray-300 text-sm font-medium">Vote Code</Label>
                      <div className="relative group">
                        <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#0152be] transition-colors" />
                        <Input
                          id="voteCode"
                          type="text"
                          placeholder="Enter your vote code (e.g., VOTE-XXXX)"
                          value={voteCode}
                          onChange={(e) => setVoteCode(e.target.value.toUpperCase())}
                          onKeyDown={(e) => e.key === 'Enter' && handleValidateCode()}
                          className="pl-10 h-12 bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-[#0152be] focus:ring-[#0152be]/20 transition-all rounded-xl text-base tracking-wider font-mono"
                        />
                      </div>
                    </div>

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-red-400 text-sm p-3 bg-red-500/10 rounded-xl border border-red-500/20"
                      >
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{error}</span>
                      </motion.div>
                    )}

                    <Button
                      onClick={handleValidateCode}
                      disabled={isValidating || !voteCode.trim()}
                      className="w-full h-12 bg-gradient-to-r from-[#0152be] to-sky-500 hover:from-[#014099] hover:to-sky-600 text-white font-semibold rounded-xl shadow-lg shadow-[#0152be]/20 transition-all disabled:opacity-50"
                    >
                      {isValidating ? (
                        <div className="flex items-center gap-3">
                          <div className="relative w-5 h-5">
                            <div className="absolute inset-0 rounded-full border-t-2 border-white animate-spin"></div>
                            <div className="absolute inset-[3px] rounded-full border-r-2 border-sky-300 animate-spin" style={{ animationDirection: 'reverse' }}></div>
                          </div>
                          Validating...
                        </div>
                      ) : (
                        <>
                          Validate Code
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-800"></div>
                      </div>
                      <div className="relative flex justify-center text-xs">
                        <span className="px-3 bg-gray-900 text-gray-500">or</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsPurchaseDialogOpen(true)}
                      className="w-full flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-gray-700 text-gray-400 hover:text-[#0152be] hover:border-[#0152be]/50 hover:bg-[#0152be]/5 transition-all group"
                    >
                      <Sparkles className="w-4 h-4 group-hover:text-[#0152be]" />
                      <span className="text-sm font-medium">Purchase Vote Bundle</span>
                    </button>
                  </motion.div>
                )}

                {step === 'quantity' && codeInfo && (
                  <motion.div
                    key="quantity"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-5"
                  >
                    {/* Valid Code Banner */}
                    <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                          <Check className="w-5 h-5 text-green-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-green-400">Code Validated!</p>
                          <p className="text-sm text-gray-400">
                            <span className="text-white font-bold">{codeInfo.remainingVotes}</span> votes available
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="space-y-3">
                      <Label className="text-gray-300 text-sm font-medium">Select Number of Votes</Label>
                      <div className="flex items-center justify-center gap-6 p-6 bg-gray-800/30 rounded-2xl border border-gray-700/50">
                        <button
                          onClick={decrementQuantity}
                          disabled={voteQuantity <= 1}
                          className="w-14 h-14 rounded-xl bg-gray-800 hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center shadow-lg"
                        >
                          <Minus className="w-6 h-6" />
                        </button>
                        <div className="text-center min-w-[100px]">
                          <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                            {voteQuantity}
                          </span>
                          <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Votes</p>
                        </div>
                        <button
                          onClick={incrementQuantity}
                          disabled={voteQuantity >= codeInfo.remainingVotes}
                          className="w-14 h-14 rounded-xl bg-gray-800 hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center shadow-lg"
                        >
                          <Plus className="w-6 h-6" />
                        </button>
                      </div>
                      <p className="text-center text-xs text-gray-500">
                        Max: {codeInfo.remainingVotes} votes
                      </p>
                    </div>

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-red-400 text-sm p-3 bg-red-500/10 rounded-xl border border-red-500/20"
                      >
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{error}</span>
                      </motion.div>
                    )}

                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={() => setStep('code')}
                        className="flex-1 h-12 border-gray-700 text-gray-300 hover:bg-gray-800 rounded-xl"
                      >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Back
                      </Button>
                      <Button
                        onClick={handleConfirmVote}
                        className="flex-1 h-12 bg-gradient-to-r from-[#0152be] to-sky-500 hover:from-[#014099] hover:to-sky-600 text-white font-semibold rounded-xl shadow-lg shadow-[#0152be]/20"
                      >
                        Continue
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>

                    {validCategories.length > 1 && !category && (
                      <Button
                        variant="ghost"
                        onClick={() => setStep('category')}
                        className="w-full mt-2 text-xs text-gray-500 hover:text-white"
                      >
                        Change Category
                      </Button>
                    )}
                  </motion.div>
                )}

                {step === 'confirm' && (
                  <motion.div
                    key="confirm"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-5"
                  >
                    {/* Summary Card */}
                    <div className="p-5 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-700/50 space-y-4">
                      <h4 className="font-semibold text-white flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#0152be]" />
                        Vote Summary
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                          <span className="text-gray-400 text-sm">Candidate</span>
                          <span className="text-white font-medium">{candidate.first_name} {candidate.last_name}</span>
                        </div>
                        {(selectedCategory || category) && (
                          <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                            <span className="text-gray-400 text-sm">Category</span>
                            <span className="text-white font-medium">{selectedCategory?.name || category?.name}</span>
                          </div>
                        )}
                        <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                          <span className="text-gray-400 text-sm">Vote Code</span>
                          <span className="text-[#0152be] font-mono text-sm bg-[#0152be]/10 px-2 py-1 rounded">{voteCode}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                          <span className="text-gray-400 text-sm">Votes to Cast</span>
                          <span className="text-2xl font-bold text-white">{voteQuantity}</span>
                        </div>
                      </div>
                    </div>

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-red-400 text-sm p-3 bg-red-500/10 rounded-xl border border-red-500/20"
                      >
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{error}</span>
                      </motion.div>
                    )}

                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={() => setStep('quantity')}
                        disabled={isSubmitting}
                        className="flex-1 h-12 border-gray-700 text-gray-300 hover:bg-gray-800 rounded-xl"
                      >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Back
                      </Button>
                      <Button
                        onClick={handleSubmitVote}
                        disabled={isSubmitting}
                        className="flex-1 h-12 bg-gradient-to-r from-[#0152be] to-sky-500 hover:from-[#014099] hover:to-sky-600 text-white font-semibold rounded-xl shadow-lg shadow-[#0152be]/20"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-3">
                            <div className="relative w-5 h-5">
                              <div className="absolute inset-0 rounded-full border-t-2 border-white animate-spin"></div>
                              <div className="absolute inset-[3px] rounded-full border-r-2 border-sky-300 animate-spin" style={{ animationDirection: 'reverse' }}></div>
                            </div>
                            Submitting...
                          </div>
                        ) : (
                          <>
                            <Vote className="w-4 h-4 mr-2" />
                            Confirm Vote
                          </>
                        )}
                      </Button>
                    </div>
                  </motion.div>
                )}

                {step === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, type: 'spring' }}
                    className="text-center py-6"
                  >
                    <div className="relative mx-auto mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-green-500/30 to-emerald-500/30 rounded-full flex items-center justify-center mx-auto">
                        <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
                          <Check className="w-7 h-7 text-white" />
                        </div>
                      </div>
                      {/* Confetti-like dots */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24">
                        {[...Array(6)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: [0, 1, 0], scale: [0, 1, 0.5] }}
                            transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                            className="absolute w-2 h-2 rounded-full bg-green-400"
                            style={{
                              left: `${50 + 40 * Math.cos((i * 60 * Math.PI) / 180)}%`,
                              top: `${50 + 40 * Math.sin((i * 60 * Math.PI) / 180)}%`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
                    <p className="text-gray-400 mb-6 max-w-xs mx-auto">
                      Your <span className="text-white font-semibold">{voteQuantity}</span> vote{voteQuantity > 1 ? 's' : ''} for{' '}
                      <span className="text-[#0152be] font-semibold">{candidate.first_name} {candidate.last_name}</span>{' '}
                      {voteQuantity > 1 ? 'have' : 'has'} been recorded successfully.
                    </p>
                    <Button
                      onClick={handleClose}
                      className="px-8 h-12 bg-gradient-to-r from-[#0152be] to-sky-500 hover:from-[#014099] hover:to-sky-600 text-white font-semibold rounded-xl shadow-lg shadow-[#0152be]/20"
                    >
                      Done
                    </Button>
                  </motion.div>
                )}

                {step === 'error' && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-center py-6"
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-red-500/30 to-rose-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-rose-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/30">
                        <X className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Vote Failed</h3>
                    <p className="text-gray-400 mb-6 max-w-xs mx-auto">
                      {error || 'An unexpected error occurred. Please try again.'}
                    </p>
                    <div className="flex gap-3 justify-center">
                      <Button
                        variant="outline"
                        onClick={resetDialog}
                        className="h-12 px-6 border-gray-700 text-gray-300 hover:bg-gray-800 rounded-xl"
                      >
                        Try Again
                      </Button>
                      <Button
                        onClick={handleClose}
                        className="h-12 px-6 bg-gray-800 hover:bg-gray-700 text-white rounded-xl"
                      >
                        Close
                      </Button>
                    </div>
                  </motion.div>
                )}

                {step === 'voting_closed' && (
                  <motion.div
                    key="voting_closed"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-center py-6"
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-yellow-500/30 to-orange-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/30">
                        <Hourglass className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Voting is Closed</h3>
                    <p className="text-gray-400 mb-6 max-w-xs mx-auto">
                      Voting is currently not open for this candidate's categories.
                      <br /><br />
                      <span className="text-white font-medium">Get ready!</span> Purchase vote bundles now to be prepared when voting opens.
                    </p>
                    <div className="flex flex-col gap-3 justify-center">
                      <button
                        onClick={() => setIsPurchaseDialogOpen(true)}
                        className="w-full flex items-center justify-center gap-2 p-4 rounded-xl bg-gradient-to-r from-[#0152be] to-sky-500 text-white font-semibold shadow-lg shadow-[#0152be]/20 hover:from-[#014099] hover:to-sky-600 transition-all"
                      >
                        <Sparkles className="w-5 h-5" />
                        Purchase Vote Bundle
                      </button>
                      <Button
                        variant="ghost"
                        onClick={handleClose}
                        className="h-12 px-6 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl"
                      >
                        Close
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Purchase Votes Dialog */}
      <PurchaseVotesDialog
        open={isPurchaseDialogOpen}
        onOpenChange={setIsPurchaseDialogOpen}
        eventId={eventId || candidate.event._id || categories[0].event._id}
        eventName={eventName}
        candidateId={candidate._id as string}
        candidateName={`${candidate.first_name} ${candidate.last_name}`}
        candidateCategories={categories}
        onPurchaseComplete={(code) => {
          setVoteCode(code);
          setIsPurchaseDialogOpen(false);
        }}
      />
    </>
  );
}
