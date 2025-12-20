'use client';

import { useState } from 'react';
import Image from 'next/image';
import { 
  Vote, 
  Check, 
  AlertCircle, 
  Loader2, 
  Minus, 
  Plus,
  X
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import  GlassCard from '@/components/ui/GlassCard';
import PurchaseVotesDialog from '@/components/PurchaseVotesDialog';
import { Candidate, Category } from '@/types';

interface VoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  candidate: Candidate;
  category?: Category;
  eventId?: string;
  eventName?: string;
}

type VoteStep = 'code' | 'quantity' | 'confirm' | 'success' | 'error';

export default function VoteDialog({ 
  open, 
  onOpenChange, 
  candidate,
  category,
  eventId,
  eventName
}: VoteDialogProps) {
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

  const resetDialog = () => {
    setStep('code');
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
      // Simulate API call - in production, use votesApi.validateCode
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock response - replace with actual API call
      const mockResponse = {
        valid: true,
        remainingVotes: 10,
        eventName: eventName || 'Tech Awards 2025'
      };

      if (mockResponse.valid) {
        setCodeInfo(mockResponse);
        setStep('quantity');
      } else {
        setError('Invalid vote code. Please check and try again.');
      }
    } catch {
      setError('Failed to validate code. Please try again.');
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
    setIsSubmitting(true);
    setError(null);

    try {
      // Simulate API call - in production, use votesApi.cast
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock success - replace with actual API call
      setStep('success');
    } catch {
      setError('Failed to submit vote. Please try again.');
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

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
            <Vote className="w-5 h-5 text-[#0152be]" />
            {step === 'success' ? 'Vote Submitted!' : 'Cast Your Vote'}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {step === 'code' && 'Enter your vote code to continue'}
            {step === 'quantity' && 'Select the number of votes to cast'}
            {step === 'confirm' && 'Review and confirm your vote'}
            {step === 'success' && 'Your vote has been recorded successfully'}
            {step === 'error' && 'Something went wrong'}
          </DialogDescription>
        </DialogHeader>

        {/* Candidate Info */}
        <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
          <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gray-800 flex-shrink-0">
            {candidate.profile_image ? (
              <Image
                src={candidate.profile_image}
                alt={`${candidate.first_name} ${candidate.last_name}`}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-[#0152be]/20 text-[#0152be] font-bold">
                {candidate.first_name[0]}{candidate.last_name[0]}
              </div>
            )}
          </div>
          <div>
            <p className="font-semibold text-white">
              {candidate.first_name} {candidate.last_name}
            </p>
            <p className="text-sm text-gray-400">{candidate.candidate_code}</p>
            {category && (
              <p className="text-xs text-[#0152be]">{category.name}</p>
            )}
          </div>
        </div>

        {/* Step Content */}
        <div className="space-y-4">
          {step === 'code' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="voteCode" className="text-gray-300">Vote Code</Label>
                <Input
                  id="voteCode"
                  type="text"
                  placeholder="Enter your vote code"
                  value={voteCode}
                  onChange={(e) => setVoteCode(e.target.value.toUpperCase())}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#0152be] focus:ring-[#0152be]/50"
                />
              </div>
              
              {error && (
                <div className="flex items-center gap-2 text-red-400 text-sm p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              <Button
                onClick={handleValidateCode}
                disabled={isValidating || !voteCode.trim()}
                className="w-full bg-[#0152be] hover:bg-[#0152be]/90 text-white"
              >
                {isValidating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Validating...
                  </>
                ) : (
                  'Continue'
                )}
              </Button>

              <p className="text-center text-xs text-gray-500">
                Don&apos;t have a vote code?{' '}
                <button
                  type="button"
                  onClick={() => setIsPurchaseDialogOpen(true)}
                  className="text-[#0152be] hover:underline font-medium"
                >
                  Purchase votes
                </button>
              </p>

              {/* Purchase Votes Dialog */}
              <PurchaseVotesDialog
                open={isPurchaseDialogOpen}
                onOpenChange={setIsPurchaseDialogOpen}
                eventId={eventId || 'event1'}
                eventName={eventName}
                candidateId={candidate._id as string}
                candidateName={`${candidate.first_name} ${candidate.last_name}`}
                onPurchaseComplete={(code) => {
                  setVoteCode(code);
                  setIsPurchaseDialogOpen(false);
                }}
              />
            </>
          )}

          {step === 'quantity' && codeInfo && (
            <>
              <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                <div className="flex items-center gap-2 text-green-400 mb-2">
                  <Check className="w-4 h-4" />
                  <span className="font-medium">Code Valid</span>
                </div>
                <p className="text-sm text-gray-400">
                  You have <span className="text-white font-medium">{codeInfo.remainingVotes}</span> votes remaining
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Number of Votes</Label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={decrementQuantity}
                    disabled={voteQuantity <= 1}
                    aria-label="Decrease vote quantity"
                    className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="text-3xl font-bold text-white min-w-[60px] text-center">
                    {voteQuantity}
                  </span>
                  <button
                    onClick={incrementQuantity}
                    disabled={voteQuantity >= codeInfo.remainingVotes}
                    aria-label="Increase vote quantity"
                    className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-400 text-sm p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setStep('code')}
                  className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  Back
                </Button>
                <Button
                  onClick={handleConfirmVote}
                  className="flex-1 bg-[#0152be] hover:bg-[#0152be]/90 text-white"
                >
                  Continue
                </Button>
              </div>
            </>
          )}

          {step === 'confirm' && (
            <>
              <GlassCard className="p-4">
                <h4 className="font-medium text-white mb-3">Vote Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Candidate</span>
                    <span className="text-white">{candidate.first_name} {candidate.last_name}</span>
                  </div>
                  {category && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Category</span>
                      <span className="text-white">{category.name}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-400">Votes</span>
                    <span className="text-white font-bold">{voteQuantity}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-700">
                    <span className="text-gray-400">Vote Code</span>
                    <span className="text-[#0152be] font-mono">{voteCode}</span>
                  </div>
                </div>
              </GlassCard>

              {error && (
                <div className="flex items-center gap-2 text-red-400 text-sm p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setStep('quantity')}
                  disabled={isSubmitting}
                  className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  Back
                </Button>
                <Button
                  onClick={handleSubmitVote}
                  disabled={isSubmitting}
                  className="flex-1 bg-[#0152be] hover:bg-[#0152be]/90 text-white"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Vote className="w-4 h-4 mr-2" />
                      Confirm Vote
                    </>
                  )}
                </Button>
              </div>
            </>
          )}

          {step === 'success' && (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Thank You!</h3>
              <p className="text-gray-400 mb-4">
                Your {voteQuantity} vote{voteQuantity > 1 ? 's' : ''} for{' '}
                <span className="text-white font-medium">{candidate.first_name} {candidate.last_name}</span>{' '}
                {voteQuantity > 1 ? 'have' : 'has'} been recorded.
              </p>
              <Button
                onClick={handleClose}
                className="bg-[#0152be] hover:bg-[#0152be]/90 text-white"
              >
                Done
              </Button>
            </div>
          )}

          {step === 'error' && (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Vote Failed</h3>
              <p className="text-gray-400 mb-4">
                {error || 'An unexpected error occurred. Please try again.'}
              </p>
              <div className="flex gap-3 justify-center">
                <Button
                  variant="outline"
                  onClick={resetDialog}
                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  Try Again
                </Button>
                <Button
                  onClick={handleClose}
                  className="bg-gray-800 hover:bg-gray-700 text-white"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
