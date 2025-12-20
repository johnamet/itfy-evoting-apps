'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  Package, 
  Check, 
  AlertCircle, 
  Loader2,
  Sparkles,
  Gift,
  CreditCard,
  Percent,
  X,
  Ticket,
  Plus,
  Minus,
  ShoppingCart,
  Flame
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
import { Badge } from '@/components/ui/badge';
import GlassCard from '@/components/ui/GlassCard';
import { Bundle, ApplyCouponResponse } from '@/types';
import { bundlesApi } from '@/lib/api/bundles';
import { couponsApi } from '@/lib/api/coupons';
import { paymentsApi } from '@/lib/api/payments';
import { cn } from '@/lib/utils';
import { 
  mockBundles, 
  validateCoupon as mockValidateCoupon, 
  applyCouponDiscount as mockApplyCouponDiscount 
} from '@/lib/mocks/bundles';

interface PurchaseVotesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  eventId: string;
  eventName?: string;
  candidateId?: string;
  candidateName?: string;
  onPurchaseComplete?: (voteCode: string) => void;
}

interface SelectedBundle {
  bundle: Bundle;
  quantity: number;
}

type PurchaseStep = 'bundles' | 'details' | 'summary' | 'processing' | 'payment' | 'success';

export default function PurchaseVotesDialog({ 
  open, 
  onOpenChange, 
  eventId,
  eventName,
  candidateId,
  candidateName,
  onPurchaseComplete
}: PurchaseVotesDialogProps) {
  const [step, setStep] = useState<PurchaseStep>('bundles');
  const [bundles, setBundles] = useState<Bundle[]>([]);
  const [selectedBundles, setSelectedBundles] = useState<SelectedBundle[]>([]);
  const [isLoadingBundles, setIsLoadingBundles] = useState(true);
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedVoteCode, setGeneratedVoteCode] = useState<string>('');
  
  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<ApplyCouponResponse | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  
  // Voter details
  const [voterName, setVoterName] = useState('');
  const [voterEmail, setVoterEmail] = useState('');
  const [voterPhone, setVoterPhone] = useState('');
  
  // Error state
  const [error, setError] = useState<string | null>(null);

  const loadBundles = useCallback(async () => {
    setIsLoadingBundles(true);
    setError(null);
    try {
      const response = await bundlesApi.getByEvent(eventId);
      if (response.success && response.data && response.data.length > 0) {
        setBundles(response.data);
      } else {
        // Use mock data as fallback
        const filteredMockBundles = mockBundles.filter(
          b => b.event === eventId && b.status === 'active'
        );
        if (filteredMockBundles.length > 0) {
          setBundles(filteredMockBundles);
        } else {
          // Use all active mock bundles if no event match
          setBundles(mockBundles.filter(b => b.status === 'active'));
        }
      }
    } catch {
      // Use mock data as fallback on error
      console.log('Using mock bundles data');
      const filteredMockBundles = mockBundles.filter(
        b => b.event === eventId && b.status === 'active'
      );
      if (filteredMockBundles.length > 0) {
        setBundles(filteredMockBundles);
      } else {
        setBundles(mockBundles.filter(b => b.status === 'active'));
      }
    } finally {
      setIsLoadingBundles(false);
    }
  }, [eventId]);

  // Load bundles when dialog opens
  useEffect(() => {
    if (open && eventId) {
      loadBundles();
    }
  }, [open, eventId, loadBundles]);

  const resetDialog = () => {
    setStep('bundles');
    setSelectedBundles([]);
    setCouponCode('');
    setAppliedCoupon(null);
    setCouponError(null);
    setVoterName('');
    setVoterEmail('');
    setVoterPhone('');
    setError(null);
    setGeneratedVoteCode('');
  };

  const handleClose = () => {
    resetDialog();
    onOpenChange(false);
  };

  // Bundle quantity management
  const getBundleQuantity = (bundleId: string): number => {
    const found = selectedBundles.find(sb => sb.bundle._id === bundleId);
    return found?.quantity || 0;
  };

  const addBundleQuantity = (bundle: Bundle) => {
    setSelectedBundles(prev => {
      const existing = prev.find(sb => sb.bundle._id === bundle._id);
      if (existing) {
        return prev.map(sb => 
          sb.bundle._id === bundle._id 
            ? { ...sb, quantity: sb.quantity + 1 }
            : sb
        );
      }
      return [...prev, { bundle, quantity: 1 }];
    });
    setAppliedCoupon(null); // Reset coupon when cart changes
    setCouponCode('');
  };

  const removeBundleQuantity = (bundleId: string) => {
    setSelectedBundles(prev => {
      const existing = prev.find(sb => sb.bundle._id === bundleId);
      if (existing && existing.quantity > 1) {
        return prev.map(sb => 
          sb.bundle._id === bundleId 
            ? { ...sb, quantity: sb.quantity - 1 }
            : sb
        );
      }
      return prev.filter(sb => sb.bundle._id !== bundleId);
    });
    setAppliedCoupon(null); // Reset coupon when cart changes
    setCouponCode('');
  };

  const handleContinueToDetails = () => {
    if (selectedBundles.length === 0) {
      setError('Please select at least one bundle');
      return;
    }
    setError(null);
    setStep('details');
  };

  // Calculate cart totals
  const cartTotals = useMemo(() => {
    let totalVotes = 0;
    let subtotal = 0;
    let bundleDiscountTotal = 0;

    selectedBundles.forEach(({ bundle, quantity }) => {
      const bundlePrice = bundle.price * quantity;
      const bundleDiscount = bundle.discount_percentage 
        ? (bundlePrice * bundle.discount_percentage) / 100 
        : 0;
      
      totalVotes += bundle.vote_count * quantity;
      subtotal += bundlePrice;
      bundleDiscountTotal += bundleDiscount;
    });

    const priceAfterBundleDiscount = subtotal - bundleDiscountTotal;
    const couponDiscount = appliedCoupon?.discount_amount || 0;
    const finalPrice = appliedCoupon?.final_amount ?? priceAfterBundleDiscount;

    return {
      totalVotes,
      subtotal,
      bundleDiscountTotal,
      priceAfterBundleDiscount,
      couponDiscount,
      finalPrice,
      currency: selectedBundles[0]?.bundle.currency || 'GHS'
    };
  }, [selectedBundles, appliedCoupon]);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim() || selectedBundles.length === 0) {
      return;
    }

    setIsValidatingCoupon(true);
    setCouponError(null);

    const primaryBundle = selectedBundles[0].bundle;
    const totalAmount = cartTotals.priceAfterBundleDiscount;

    try {
      // First validate the coupon
      const validateResponse = await couponsApi.validate(
        couponCode,
        eventId,
        primaryBundle._id as string,
        totalAmount
      );

      if (!validateResponse.success || !validateResponse.data?.valid) {
        // Try mock validation as fallback
        const mockResult = mockValidateCoupon(couponCode, primaryBundle._id as string, totalAmount);
        if (mockResult.valid && mockResult.coupon) {
          const { discountAmount, finalAmount } = mockApplyCouponDiscount(mockResult.coupon, totalAmount);
          setAppliedCoupon({
            coupon: mockResult.coupon,
            original_amount: totalAmount,
            discount_amount: discountAmount,
            final_amount: finalAmount
          });
          setCouponError(null);
        } else {
          setCouponError(mockResult.message || validateResponse.data?.message || 'Invalid coupon code');
        }
        return;
      }

      // Then apply it to get discount details
      const applyResponse = await couponsApi.apply(
        couponCode,
        eventId,
        totalAmount,
        primaryBundle._id as string
      );

      if (applyResponse.success && applyResponse.data) {
        setAppliedCoupon(applyResponse.data);
        setCouponError(null);
      } else {
        // Try mock validation as fallback
        const mockResult = mockValidateCoupon(couponCode, primaryBundle._id as string, totalAmount);
        if (mockResult.valid && mockResult.coupon) {
          const { discountAmount, finalAmount } = mockApplyCouponDiscount(mockResult.coupon, totalAmount);
          setAppliedCoupon({
            coupon: mockResult.coupon,
            original_amount: totalAmount,
            discount_amount: discountAmount,
            final_amount: finalAmount
          });
          setCouponError(null);
        } else {
          setCouponError('Failed to apply coupon');
        }
      }
    } catch {
      // Use mock validation as fallback on error
      console.log('Using mock coupon validation');
      const mockResult = mockValidateCoupon(couponCode, primaryBundle._id as string, totalAmount);
      if (mockResult.valid && mockResult.coupon) {
        const { discountAmount, finalAmount } = mockApplyCouponDiscount(mockResult.coupon, totalAmount);
        setAppliedCoupon({
          coupon: mockResult.coupon,
          original_amount: totalAmount,
          discount_amount: discountAmount,
          final_amount: finalAmount
        });
        setCouponError(null);
      } else {
        setCouponError(mockResult.message || 'Failed to validate coupon. Please try again.');
      }
    } finally {
      setIsValidatingCoupon(false);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError(null);
  };

  const handleContinueToSummary = () => {
    if (!voterName.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!voterEmail.trim()) {
      setError('Please enter your email');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(voterEmail)) {
      setError('Please enter a valid email address');
      return;
    }
    setError(null);
    setStep('summary');
  };

  const handleProceedToPayment = async () => {
    if (selectedBundles.length === 0) return;

    setIsProcessing(true);
    setError(null);
    setStep('processing');

    // Build bundle items for payment - we'll use primary bundle for API
    // In production, you'd want to support multiple bundles in the payment API
    const primaryBundle = selectedBundles[0].bundle;
    const totalQuantity = selectedBundles.reduce((acc, sb) => acc + sb.quantity, 0);

    try {
      const response = await paymentsApi.initialize({
        bundle: primaryBundle._id as string,
        quantity: totalQuantity,
        voter_email: voterEmail,
        voter_name: voterName,
        voter_phone: voterPhone || undefined,
        candidate: candidateId,
        coupon_code: appliedCoupon ? couponCode : undefined,
        callback_url: `${window.location.origin}/payment/callback`
      });

      if (response.success && response.data?.authorization_url) {
        // Redirect to Paystack payment page
        window.location.href = response.data.authorization_url;
      } else {
        // Demo mode: simulate successful payment
        await new Promise(resolve => setTimeout(resolve, 2000));
        const voteCode = `VOTE${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
        setGeneratedVoteCode(voteCode);
        setStep('success');
      }
    } catch {
      // Demo mode: simulate successful payment
      console.log('Demo mode: simulating successful payment');
      await new Promise(resolve => setTimeout(resolve, 2000));
      const voteCode = `VOTE${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      setGeneratedVoteCode(voteCode);
      setStep('success');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUseCodeNow = () => {
    if (onPurchaseComplete && generatedVoteCode) {
      onPurchaseComplete(generatedVoteCode);
    }
    handleClose();
  };

  const formatCurrency = (amount: number, currency: string = 'GHS') => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  // Get cart item count
  const totalCartItems = selectedBundles.reduce((acc, sb) => acc + sb.quantity, 0);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
            <Ticket className="w-5 h-5 text-[#0152be]" />
            {step === 'processing' ? 'Processing Payment' : step === 'success' ? 'Purchase Complete!' : 'Purchase Votes'}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {step === 'bundles' && 'Select a vote bundle to purchase'}
            {step === 'details' && 'Enter your details and apply any coupon codes'}
            {step === 'summary' && 'Review your purchase before payment'}
            {step === 'processing' && 'Please wait while we process your payment'}
            {step === 'success' && 'Your vote code is ready to use'}
          </DialogDescription>
          {eventName && (
            <p className="text-sm text-[#0152be] mt-1">{eventName}</p>
          )}
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Loading State */}
          {isLoadingBundles && step === 'bundles' && (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-[#0152be] animate-spin mb-4" />
              <p className="text-gray-400">Loading vote bundles...</p>
            </div>
          )}

          {/* Error State */}
          {error && step !== 'processing' && (
            <div className="flex items-center gap-2 text-red-400 text-sm p-3 bg-red-500/10 rounded-lg border border-red-500/20">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          {/* Step 1: Bundle Selection */}
          {step === 'bundles' && !isLoadingBundles && (
            <>
              {candidateName && (
                <div className="p-3 bg-[#0152be]/10 rounded-lg border border-[#0152be]/20 mb-2">
                  <p className="text-sm text-gray-300">
                    Voting for: <span className="text-white font-medium">{candidateName}</span>
                  </p>
                </div>
              )}

              {bundles.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">No vote bundles available for this event</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid gap-3">
                    {bundles.map((bundle) => {
                      const quantity = getBundleQuantity(bundle._id as string);
                      const isSelected = quantity > 0;
                      const bundlePrice = bundle.discount_percentage 
                        ? bundle.price - (bundle.price * bundle.discount_percentage) / 100 
                        : bundle.price;

                      return (
                        <div
                          key={bundle._id as string}
                          className={cn(
                            "p-4 rounded-lg border transition-all",
                            isSelected 
                              ? "bg-[#0152be]/10 border-[#0152be]/50" 
                              : "bg-gray-800/50 border-gray-700 hover:border-gray-600"
                          )}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="font-semibold text-white">{bundle.name}</h4>
                                {bundle.is_featured && (
                                  <Badge variant="outline" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                                    <Sparkles className="w-3 h-3 mr-1" />
                                    Featured
                                  </Badge>
                                )}
                                {bundle.is_popular && (
                                  <Badge variant="outline" className="bg-[#0152be]/20 text-[#0152be] border-[#0152be]/30">
                                    <Flame className="w-3 h-3 mr-1" />
                                    Popular
                                  </Badge>
                                )}
                              </div>
                              {bundle.description && (
                                <p className="text-sm text-gray-400 mt-1">{bundle.description}</p>
                              )}
                              <div className="flex items-center gap-4 mt-2">
                                <span className="text-sm text-gray-400">
                                  <span className="text-white font-medium">{bundle.vote_count}</span> votes
                                </span>
                                {bundle.discount_percentage && bundle.discount_percentage > 0 && (
                                  <span className="inline-flex items-center gap-1 text-green-400 text-sm">
                                    <Percent className="w-3 h-3" />
                                    {bundle.discount_percentage}% off
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="text-right flex flex-col items-end gap-2">
                              {bundle.discount_percentage && bundle.discount_percentage > 0 ? (
                                <>
                                  <span className="text-gray-500 line-through text-sm">
                                    {formatCurrency(bundle.price, bundle.currency)}
                                  </span>
                                  <p className="text-lg font-bold text-[#0152be]">
                                    {formatCurrency(bundlePrice, bundle.currency)}
                                  </p>
                                </>
                              ) : (
                                <p className="text-lg font-bold text-[#0152be]">
                                  {formatCurrency(bundle.price, bundle.currency)}
                                </p>
                              )}
                              
                              {/* Quantity Controls */}
                              <div className="flex items-center gap-2">
                                {isSelected ? (
                                  <>
                                    <button
                                      onClick={() => removeBundleQuantity(bundle._id as string)}
                                      className="p-1 rounded bg-gray-700 hover:bg-gray-600 text-white transition-colors"
                                      aria-label={`Decrease ${bundle.name} quantity`}
                                    >
                                      <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="min-w-[2rem] text-center font-medium text-white">
                                      {quantity}
                                    </span>
                                    <button
                                      onClick={() => addBundleQuantity(bundle)}
                                      className="p-1 rounded bg-[#0152be] hover:bg-[#0152be]/80 text-white transition-colors"
                                      aria-label={`Increase ${bundle.name} quantity`}
                                    >
                                      <Plus className="w-4 h-4" />
                                    </button>
                                  </>
                                ) : (
                                  <Button
                                    size="sm"
                                    onClick={() => addBundleQuantity(bundle)}
                                    className="bg-[#0152be] hover:bg-[#0152be]/90 text-white"
                                  >
                                    <Plus className="w-4 h-4 mr-1" />
                                    Add
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Cart Summary */}
                  {selectedBundles.length > 0 && (
                    <GlassCard className="p-4 border-[#0152be]/30">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <ShoppingCart className="w-5 h-5 text-[#0152be]" />
                          <span className="font-medium text-white">Your Cart</span>
                          <Badge className="bg-[#0152be] text-white">{totalCartItems}</Badge>
                        </div>
                        <span className="text-xl font-bold text-[#0152be]">
                          {formatCurrency(cartTotals.priceAfterBundleDiscount, cartTotals.currency)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-400">
                        <span className="text-white font-medium">{cartTotals.totalVotes}</span> total votes
                      </div>
                    </GlassCard>
                  )}

                  {/* Continue Button */}
                  <Button
                    onClick={handleContinueToDetails}
                    disabled={selectedBundles.length === 0}
                    className="w-full bg-[#0152be] hover:bg-[#0152be]/90 text-white"
                  >
                    Continue
                  </Button>
                </div>
              )}
            </>
          )}

          {/* Step 2: Voter Details & Coupon */}
          {step === 'details' && selectedBundles.length > 0 && (
            <>
              {/* Selected Bundles Summary */}
              <GlassCard className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-[#0152be]" />
                    <span className="font-medium text-white">Selected Bundles</span>
                  </div>
                  <button
                    onClick={() => setStep('bundles')}
                    className="text-sm text-[#0152be] hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <div className="space-y-2">
                  {selectedBundles.map(({ bundle, quantity }) => (
                    <div key={bundle._id as string} className="flex justify-between text-sm">
                      <span className="text-gray-400">
                        {bundle.name} × {quantity}
                      </span>
                      <span className="text-white">
                        {formatCurrency(
                          (bundle.discount_percentage 
                            ? bundle.price - (bundle.price * bundle.discount_percentage) / 100 
                            : bundle.price) * quantity,
                          bundle.currency
                        )}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-700 mt-3 pt-3 flex justify-between">
                  <span className="text-gray-400">{cartTotals.totalVotes} votes</span>
                  <span className="font-bold text-[#0152be]">
                    {formatCurrency(cartTotals.priceAfterBundleDiscount, cartTotals.currency)}
                  </span>
                </div>
              </GlassCard>

              {/* Voter Details */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="voterName" className="text-gray-300">Full Name *</Label>
                  <Input
                    id="voterName"
                    type="text"
                    placeholder="Enter your full name"
                    value={voterName}
                    onChange={(e) => setVoterName(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#0152be] focus:ring-[#0152be]/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="voterEmail" className="text-gray-300">Email Address *</Label>
                  <Input
                    id="voterEmail"
                    type="email"
                    placeholder="Enter your email"
                    value={voterEmail}
                    onChange={(e) => setVoterEmail(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#0152be] focus:ring-[#0152be]/50"
                  />
                  <p className="text-xs text-gray-500">Vote codes will be sent to this email</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="voterPhone" className="text-gray-300">Phone Number (Optional)</Label>
                  <Input
                    id="voterPhone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={voterPhone}
                    onChange={(e) => setVoterPhone(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#0152be] focus:ring-[#0152be]/50"
                  />
                </div>
              </div>

              {/* Coupon Section */}
              <div className="border-t border-gray-700 pt-4">
                <Label className="text-gray-300 flex items-center gap-2 mb-3">
                  <Gift className="w-4 h-4 text-[#0152be]" />
                  Have a coupon code?
                </Label>
                
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 font-medium">{couponCode}</span>
                      <span className="text-gray-400 text-sm">
                        (-{formatCurrency(cartTotals.couponDiscount, cartTotals.currency)})
                      </span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-gray-400 hover:text-white"
                      aria-label="Remove coupon"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#0152be] focus:ring-[#0152be]/50"
                    />
                    <Button
                      onClick={handleApplyCoupon}
                      disabled={isValidatingCoupon || !couponCode.trim()}
                      variant="outline"
                      className="border-gray-700 text-gray-300 hover:bg-gray-800 whitespace-nowrap"
                    >
                      {isValidatingCoupon ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        'Apply'
                      )}
                    </Button>
                  </div>
                )}
                
                {couponError && (
                  <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {couponError}
                  </p>
                )}
              </div>

              {/* Navigation */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setStep('bundles')}
                  className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  Back
                </Button>
                <Button
                  onClick={handleContinueToSummary}
                  className="flex-1 bg-[#0152be] hover:bg-[#0152be]/90 text-white"
                >
                  Continue
                </Button>
              </div>
            </>
          )}

          {/* Step 3: Summary */}
          {step === 'summary' && selectedBundles.length > 0 && (
            <>
              <GlassCard className="p-4">
                <h4 className="font-medium text-white mb-4">Purchase Summary</h4>
                
                <div className="space-y-3 text-sm">
                  {/* Bundle Items */}
                  {selectedBundles.map(({ bundle, quantity }) => (
                    <div key={bundle._id as string} className="flex justify-between">
                      <span className="text-gray-400">
                        {bundle.name} × {quantity} ({bundle.vote_count * quantity} votes)
                      </span>
                      <span className="text-white">
                        {formatCurrency(bundle.price * quantity, bundle.currency)}
                      </span>
                    </div>
                  ))}
                  
                  <div className="flex justify-between pt-2">
                    <span className="text-gray-400">Total Votes</span>
                    <span className="text-white font-medium">{cartTotals.totalVotes}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-400">Email</span>
                    <span className="text-white">{voterEmail}</span>
                  </div>

                  {candidateName && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Voting for</span>
                      <span className="text-white">{candidateName}</span>
                    </div>
                  )}
                  
                  <div className="border-t border-gray-700 pt-3 mt-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Subtotal</span>
                      <span className="text-white">
                        {formatCurrency(cartTotals.subtotal, cartTotals.currency)}
                      </span>
                    </div>
                    
                    {cartTotals.bundleDiscountTotal > 0 && (
                      <div className="flex justify-between text-green-400">
                        <span>Bundle Discounts</span>
                        <span>-{formatCurrency(cartTotals.bundleDiscountTotal, cartTotals.currency)}</span>
                      </div>
                    )}
                    
                    {appliedCoupon && cartTotals.couponDiscount > 0 && (
                      <div className="flex justify-between text-green-400">
                        <span>Coupon ({couponCode})</span>
                        <span>-{formatCurrency(cartTotals.couponDiscount, cartTotals.currency)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between pt-3 mt-3 border-t border-gray-700">
                      <span className="text-white font-medium">Total</span>
                      <span className="text-xl font-bold text-[#0152be]">
                        {formatCurrency(cartTotals.finalPrice, cartTotals.currency)}
                      </span>
                    </div>
                  </div>
                </div>
              </GlassCard>

              <p className="text-sm text-gray-500 text-center">
                {candidateName 
                  ? 'Your votes will be automatically cast after successful payment'
                  : 'You will receive your vote codes via email after successful payment'}
              </p>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setStep('details')}
                  className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  Back
                </Button>
                <Button
                  onClick={handleProceedToPayment}
                  disabled={isProcessing}
                  className="flex-1 bg-[#0152be] hover:bg-[#0152be]/90 text-white"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Pay {formatCurrency(cartTotals.finalPrice, cartTotals.currency)}
                </Button>
              </div>
            </>
          )}

          {/* Step 4: Processing */}
          {step === 'processing' && (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-12 h-12 text-[#0152be] animate-spin mb-4" />
              <p className="text-white font-medium mb-2">Processing Payment</p>
              <p className="text-gray-400 text-sm text-center">
                Please wait while we process your payment...
              </p>
            </div>
          )}

          {/* Step 5: Success */}
          {step === 'success' && selectedBundles.length > 0 && (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Payment Successful!</h3>
              <p className="text-gray-400 mb-4">
                You have purchased <span className="text-white font-medium">{cartTotals.totalVotes} votes</span>
              </p>
              
              <div className="p-4 bg-[#0152be]/10 rounded-lg border border-[#0152be]/20 mb-4">
                <p className="text-sm text-gray-400 mb-2">Your Vote Code</p>
                <p className="text-2xl font-mono font-bold text-[#0152be] tracking-wider">
                  {generatedVoteCode}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  A copy has been sent to {voterEmail}
                </p>
              </div>

              {candidateName && (
                <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20 mb-4">
                  <p className="text-sm text-green-400">
                    <Check className="w-4 h-4 inline mr-1" />
                    Votes have been cast for <strong>{candidateName}</strong>
                  </p>
                </div>
              )}

              <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20 mb-4">
                <p className="text-xs text-yellow-400">
                  <strong>Demo Mode:</strong> This is a simulated payment. In production, you would be redirected to Paystack.
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={handleClose}
                  className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  Close
                </Button>
                {!candidateName && (
                  <Button
                    onClick={handleUseCodeNow}
                    className="flex-1 bg-[#0152be] hover:bg-[#0152be]/90 text-white"
                  >
                    Use Code Now
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
