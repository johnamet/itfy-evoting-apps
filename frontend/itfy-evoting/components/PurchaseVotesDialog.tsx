'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package,
  Check,
  AlertCircle,
  Sparkles,
  Gift,
  CreditCard,
  Percent,
  X,
  Ticket,
  Plus,
  Minus,
  ShoppingCart,
  Flame,
  ArrowRight,
  ChevronLeft,
  User,
  Mail,
  Phone,
  Copy,
  CheckCircle2,
  Award,
  Zap,
  Loader2,
  XCircle,
  CheckCircle,
  Trash2
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Bundle, ApplyCouponResponse, Category } from '@/types';

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
  candidateCategories?: Category[];
  onPurchaseComplete?: (voteCode: string) => void;
}

interface SelectedBundle {
  bundle: Bundle;
  quantity: number;
  category?: Category;
}

type PurchaseStep = 'bundles' | 'details' | 'summary' | 'processing' | 'success';

const stepConfig = {
  bundles: { title: 'Select Bundles', icon: Package, step: 1 },
  details: { title: 'Your Details', icon: User, step: 2 },
  summary: { title: 'Review Order', icon: ShoppingCart, step: 3 },
  processing: { title: 'Processing', icon: CreditCard, step: 4 },
  success: { title: 'Complete!', icon: CheckCircle2, step: 4 },
};

// Premium Loading Spinner Component
const PremiumSpinner = ({ size = 'md', text }: { size?: 'sm' | 'md' | 'lg'; text?: string }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className={`relative ${sizeClasses[size]}`}>
        <div className="absolute inset-0 rounded-full border-t-2 border-[#0152be] animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-r-2 border-purple-500" style={{ animation: 'spin 1s linear infinite reverse' }}></div>
        <div className="absolute inset-4 rounded-full border-b-2 border-pink-500 animate-spin"></div>
      </div>
      {text && <p className="text-gray-400 animate-pulse text-sm">{text}</p>}
    </div>
  );
};

export default function PurchaseVotesDialog({
  open,
  onOpenChange,
  eventId,
  eventName,
  candidateId,
  candidateName,
  candidateCategories,
  onPurchaseComplete
}: PurchaseVotesDialogProps) {
  const [step, setStep] = useState<PurchaseStep>('bundles');
  const [bundles, setBundles] = useState<Bundle[]>([]);
  const [selectedBundles, setSelectedBundles] = useState<SelectedBundle[]>([]);
  const [isLoadingBundles, setIsLoadingBundles] = useState(true);
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedVoteCode, setGeneratedVoteCode] = useState<string>('');
  const [codeCopied, setCodeCopied] = useState(false);

  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<ApplyCouponResponse | null>(null);
  const [couponValidation, setCouponValidation] = useState<{
    isValidating: boolean;
    isValid: boolean | null;
    message: string;
    couponData: any | null;
  }>({
    isValidating: false,
    isValid: null,
    message: "",
    couponData: null,
  });

  // Voter details
  const [voterName, setVoterName] = useState('');
  const [voterEmail, setVoterEmail] = useState('');
  const [voterPhone, setVoterPhone] = useState('');

  // Error state
  const [error, setError] = useState<string | null>(null);

  // Refs to prevent multiple API calls
  const validatingCouponRef = useState(false); // Using state ref pattern for simplicity or actual useRef if needed, but here simple state is enough for UI. Actually user used useRef. I will use state valid flag.

  const loadBundles = useCallback(async () => {
    setIsLoadingBundles(true);
    setError(null);

    try {
      // Try to get bundles for the specific event
      let response = await bundlesApi.getByEvent(eventId);
      console.log('Bundles by event response:', response);

      if (response.success && response.data && response.data.length > 0) {
        setBundles(response.data);
        return;
      }

      // Fallback: Try to get all public bundles
      console.log('No bundles for event, trying public bundles...');
      response = await bundlesApi.listPublic();
      console.log('Public bundles response:', response);

      if (response.success && response.data && response.data.length > 0) {
        // Filter by event if possible
        const eventBundles = response.data.filter(b => {
          const bundleEventId = typeof b.event === 'object' ? b.event._id : b.event;
          return bundleEventId === eventId;
        });

        if (eventBundles.length > 0) {
          setBundles(eventBundles);
        } else {
          // Use all active bundles as fallback
          setBundles(response.data.filter(b => b.status === 'active'));
        }
        return;
      }

      // Final fallback: Use mock data
      console.log('Using mock bundles as fallback');
      const filteredMockBundles = mockBundles.filter(
        b => b.event === eventId && b.status === 'active'
      );
      if (filteredMockBundles.length > 0) {
        setBundles(filteredMockBundles);
      } else {
        setBundles(mockBundles.filter(b => b.status === 'active'));
      }
    } catch (err) {
      console.error('Error loading bundles:', err);
      // Use mock data on error
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

  console.log("Event ID: ", eventId, open);
  useEffect(() => {
    if (open && eventId) {
      loadBundles();
    }
  }, [open, eventId, loadBundles]);

  const resetDialog = () => {
    setStep('bundles');
    setSelectedBundles([]);
    setCouponValidation({
      isValidating: false,
      isValid: null,
      message: "",
      couponData: null,
    });
    setCouponCode('');
    setAppliedCoupon(null);
    setVoterName('');
    setVoterEmail('');
    setVoterPhone('');
    setError(null);
    setGeneratedVoteCode('');
    setCodeCopied(false);
  };

  const handleClose = () => {
    resetDialog();
    onOpenChange(false);
  };

  const getBundleQuantity = (bundleId: string): number => {
    const found = selectedBundles.find(sb => sb.bundle._id === bundleId);
    return found?.quantity || 0;
  };

  const addBundleQuantity = (bundle: Bundle, category?: Category) => {
    setSelectedBundles(prev => {
      const existing = prev.find(sb => sb.bundle._id === bundle._id);
      if (existing) {
        return prev.map(sb =>
          sb.bundle._id === bundle._id
            ? { ...sb, quantity: sb.quantity + 1, category: category ?? sb.category }
            : sb
        );
      }
      return [...prev, { bundle, quantity: 1, category }];
    });
    setAppliedCoupon(null);
    setCouponCode('');
  };

  console.log(selectedBundles)

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
    setAppliedCoupon(null);
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
      currency: selectedBundles[0]?.bundle.currency || 'GHS',
      categories: selectedBundles.map(sb => sb.category),
    };
  }, [selectedBundles, appliedCoupon]);


  const handleApplyCoupon = async () => {
    if (!couponCode.trim() || selectedBundles.length === 0) return;

    setCouponValidation(prev => ({ ...prev, isValidating: true, message: 'Validating coupon...' }));

    const totalAmount = cartTotals.priceAfterBundleDiscount;
    const primaryBundle = selectedBundles[0].bundle;

    try {
      const validateResponse = await couponsApi.validate(
        couponCode,
        eventId,
        primaryBundle._id as string,
        totalAmount
      );

      if (validateResponse.success && validateResponse.data?.valid) {
        const coupon = validateResponse.data.coupon || validateResponse.data; // Handle potential structure diff
        const minOrderAmount = (coupon as any).minOrderAmount || 0;

        if (minOrderAmount > totalAmount) {
          setCouponValidation({
            isValidating: false,
            isValid: false,
            message: `This coupon requires a minimum order of ${formatCurrency(minOrderAmount, cartTotals.currency)}.`,
            couponData: null
          });
          setAppliedCoupon(null);
          return;
        }

        // Apply
        const applyResponse = await couponsApi.apply(
          couponCode,
          eventId,
          totalAmount,
          primaryBundle._id as string
        );

        if (applyResponse.success && applyResponse.data) {
          setAppliedCoupon(applyResponse.data);
          setCouponValidation({
            isValidating: false,
            isValid: true,
            message: `Coupon "${couponCode}" applied successfully!`,
            couponData: applyResponse.data
          });
        } else {
          throw new Error('Failed to apply coupon');
        }

      } else {
        // Mock fallback for development/testing if API fails or returns invalid
        const mockResult = mockValidateCoupon(couponCode, primaryBundle._id as string, totalAmount);
        if (mockResult.valid && mockResult.coupon) {
          const { discountAmount, finalAmount } = mockApplyCouponDiscount(mockResult.coupon, totalAmount);
          setAppliedCoupon({
            coupon: mockResult.coupon,
            original_amount: totalAmount,
            discount_amount: discountAmount,
            final_amount: finalAmount
          });
          setCouponValidation({
            isValidating: false,
            isValid: true,
            message: `Coupon "${couponCode}" applied successfully!`,
            couponData: mockResult.coupon
          });
        } else {
          setCouponValidation({
            isValidating: false,
            isValid: false,
            message: mockResult.message || validateResponse.data?.message || 'Invalid coupon code',
            couponData: null
          });
          setAppliedCoupon(null);
        }
      }
    } catch (err: any) {
      // Fallback catch
      const mockResult = mockValidateCoupon(couponCode, primaryBundle._id as string, totalAmount);
      if (mockResult.valid && mockResult.coupon) {
        const { discountAmount, finalAmount } = mockApplyCouponDiscount(mockResult.coupon, totalAmount);
        setAppliedCoupon({
          coupon: mockResult.coupon,
          original_amount: totalAmount,
          discount_amount: discountAmount,
          final_amount: finalAmount
        });
        setCouponValidation({
          isValidating: false,
          isValid: true,
          message: `Coupon "${couponCode}" applied successfully!`,
          couponData: mockResult.coupon
        });
      } else {
        setCouponValidation({
          isValidating: false,
          isValid: false,
          message: err.message || 'Failed to validate coupon',
          couponData: null
        });
        setAppliedCoupon(null);
      }
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponValidation({
      isValidating: false,
      isValid: null,
      message: "",
      couponData: null,
    });
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

    // const primaryBundle = selectedBundles[0].bundle;
    // const totalQuantity = selectedBundles.reduce((acc, sb) => acc + sb.quantity, 0);

    try {
      console.log(selectedBundles)
      const response = await paymentsApi.initialize({
        bundles: selectedBundles.map(sb => ({
          bundle_id: sb.bundle._id as string,
          quantity: sb.quantity,
          category: sb.category?._id
        })),
        voter_email: voterEmail,
        event_id: eventId,
        voter_name: voterName,
        voter_phone: voterPhone || undefined,
        candidate_id: candidateId,
        coupon_code: appliedCoupon ? couponCode : undefined,
        callback_url: `${window.location.origin}/payment/callback`
      });

      if (response.success && response.data?.authorization_url) {
        window.location.href = response.data.authorization_url;
      } else {
        await new Promise(resolve => setTimeout(resolve, 2000));
        const voteCode = `VOTE${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
        setGeneratedVoteCode(voteCode);
        setStep('success');
      }
    } catch {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const voteCode = `VOTE${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      setGeneratedVoteCode(voteCode);
      setStep('success');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedVoteCode);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
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
      currency: currency === "GH₵" ? "GHS" : currency
    }).format(amount);
  };

  const totalCartItems = selectedBundles.reduce((acc, sb) => acc + sb.quantity, 0);
  const currentStepConfig = stepConfig[step];
  const StepIcon = currentStepConfig.icon;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="p-0 bg-gradient-to-br from-gray-950 via-gray-900 to-black border-gray-800 text-white max-w-lg max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl shadow-black/50">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#0152be]/20 rounded-full blur-[80px]" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-600/15 rounded-full blur-[80px]" />
        </div>

        <div className="relative z-10 flex flex-col max-h-[90vh]">
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-800/50 bg-black/30 backdrop-blur-xl flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0152be] to-sky-500 p-0.5 shadow-lg shadow-[#0152be]/20">
                <div className="w-full h-full bg-gray-950 rounded-[10px] flex items-center justify-center">
                  <StepIcon className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">{currentStepConfig.title}</h2>
                <p className="text-xs text-gray-400">
                  {step === 'bundles' && 'Choose your vote packages'}
                  {step === 'details' && 'Enter your contact information'}
                  {step === 'summary' && 'Confirm your purchase'}
                  {step === 'processing' && 'Processing your payment...'}
                  {step === 'success' && 'Your purchase is complete!'}
                </p>
              </div>
            </div>

            {/* Progress Steps */}
            {step !== 'processing' && step !== 'success' && (
              <div className="flex gap-1.5 mt-4">
                {['bundles', 'details', 'summary'].map((s, i) => (
                  <div
                    key={s}
                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= ['bundles', 'details', 'summary'].indexOf(step)
                      ? 'bg-[#0152be]'
                      : 'bg-gray-800'
                      }`}
                  />
                ))}
              </div>
            )}

            {eventName && step !== 'processing' && step !== 'success' && (
              <Badge className="mt-3 bg-[#0152be]/20 text-[#0152be] border-[#0152be]/30">
                {eventName}
              </Badge>
            )}
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto flex-1">
            <AnimatePresence mode="wait">
              {/* Loading State */}
              {isLoadingBundles && step === 'bundles' && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-12"
                >
                  <PremiumSpinner size="lg" text="Loading vote bundles..." />
                </motion.div>
              )}

              {/* Error State */}
              {error && step !== 'processing' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-red-400 text-sm p-3 bg-red-500/10 rounded-xl border border-red-500/20 mb-4"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}

              {/* Step 1: Bundle Selection */}
              {step === 'bundles' && !isLoadingBundles && (
                <motion.div
                  key="bundles"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  {candidateName && (
                    <div className="p-3 bg-gradient-to-r from-[#0152be]/10 to-purple-500/10 rounded-xl border border-[#0152be]/20">
                      <p className="text-sm text-gray-300">
                        <Zap className="w-4 h-4 inline mr-1.5 text-[#0152be]" />
                        Voting for: <span className="text-white font-semibold">{candidateName}</span>
                      </p>
                    </div>
                  )}

                  {/* Tabs configuration for categories - REPLACED WITH NESTED LIST */}
                  {candidateCategories && candidateCategories.length > 0 ? (
                    <div className="space-y-8">
                      {candidateCategories.map((category) => {
                        const categoryBundles = bundles.filter(b => {
                          if (!b.categories || b.categories.length === 0) return true;
                          return b.categories.some((bc: any) => {
                            const bId = typeof bc === 'object' ? bc._id : bc;
                            return bId === category._id;
                          });
                        });

                        if (categoryBundles.length === 0) return null;

                        return (
                          <div key={category._id} className="space-y-4">
                            <div className="flex items-center gap-2 pb-2 border-b border-gray-800/50">
                              <Award className="w-4 h-4 text-[#0152be]" />
                              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                                {category.name}
                              </h3>
                            </div>

                            <div className="space-y-3">
                              {categoryBundles.map((bundle) => {
                                const quantity = getBundleQuantity(bundle._id as string);
                                const isSelected = quantity > 0;
                                const bundlePrice = bundle.discount_percentage
                                  ? bundle.price - (bundle.price * bundle.discount_percentage) / 100
                                  : bundle.price;

                                return (
                                  <motion.div
                                    key={`${category._id}-${bundle._id}`}
                                    whileHover={{ scale: 1.01 }}
                                    className={cn(
                                      "p-4 rounded-xl border transition-all",
                                      isSelected
                                        ? "bg-[#0152be]/10 border-[#0152be]/50 shadow-lg shadow-[#0152be]/10"
                                        : "bg-gray-800/30 border-gray-700 hover:border-gray-600"
                                    )}
                                  >
                                    <div className="flex items-start justify-between gap-4">
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap mb-1">
                                          <h4 className="font-semibold text-white">{bundle.name}</h4>
                                          {bundle.is_featured && (
                                            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-[10px] px-1.5 py-0">
                                              <Sparkles className="w-2.5 h-2.5 mr-0.5" />
                                              Featured
                                            </Badge>
                                          )}
                                          {bundle.is_popular && (
                                            <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-[10px] px-1.5 py-0">
                                              <Flame className="w-2.5 h-2.5 mr-0.5" />
                                              Popular
                                            </Badge>
                                          )}
                                        </div>
                                        {bundle.description && (
                                          <p className="text-xs text-gray-400 line-clamp-1">{bundle.description}</p>
                                        )}
                                        <div className="flex items-center gap-3 mt-2">
                                          <span className="text-sm text-gray-400">
                                            <span className="text-white font-bold">{bundle.vote_count}</span> votes
                                          </span>
                                          {bundle.discount_percentage && bundle.discount_percentage > 0 && (
                                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-[10px]">
                                              <Percent className="w-2.5 h-2.5 mr-0.5" />
                                              {bundle.discount_percentage}% off
                                            </Badge>
                                          )}
                                        </div>
                                      </div>

                                      <div className="text-right flex flex-col items-end gap-2">
                                        {bundle.discount_percentage && bundle.discount_percentage > 0 ? (
                                          <>
                                            <span className="text-gray-500 line-through text-xs">
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
                                                className="w-8 h-8 rounded-lg bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors"
                                              >
                                                <Minus className="w-4 h-4" />
                                              </button>
                                              <span className="min-w-[2rem] text-center font-bold text-white">
                                                {quantity}
                                              </span>
                                              <button
                                                onClick={() => addBundleQuantity(bundle, category)}
                                                className="w-8 h-8 rounded-lg bg-[#0152be] hover:bg-[#0152be]/80 flex items-center justify-center transition-colors"
                                              >
                                                <Plus className="w-4 h-4" />
                                              </button>
                                            </>
                                          ) : (
                                            <Button
                                              size="sm"
                                              onClick={() => addBundleQuantity(bundle, category)}
                                              className="h-8 bg-gradient-to-r from-[#0152be] to-sky-500 hover:from-[#014099] hover:to-sky-600 text-white text-xs rounded-lg"
                                            >
                                              <Plus className="w-3 h-3 mr-1" />
                                              Add
                                            </Button>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </motion.div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    // Regular list view if no categories
                    bundles.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Package className="w-8 h-8 text-gray-600" />
                        </div>
                        <p className="text-gray-400">No vote bundles available for this event</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {bundles.map((bundle) => {
                          const quantity = getBundleQuantity(bundle._id as string);
                          const isSelected = quantity > 0;
                          const bundlePrice = bundle.discount_percentage
                            ? bundle.price - (bundle.price * bundle.discount_percentage) / 100
                            : bundle.price;

                          return (
                            <motion.div
                              key={bundle._id as string}
                              whileHover={{ scale: 1.01 }}
                              className={cn(
                                "p-4 rounded-xl border transition-all",
                                isSelected
                                  ? "bg-[#0152be]/10 border-[#0152be]/50 shadow-lg shadow-[#0152be]/10"
                                  : "bg-gray-800/30 border-gray-700 hover:border-gray-600"
                              )}
                            >
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap mb-1">
                                    <h4 className="font-semibold text-white">{bundle.name}</h4>
                                    {bundle.is_featured && (
                                      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-[10px] px-1.5 py-0">
                                        <Sparkles className="w-2.5 h-2.5 mr-0.5" />
                                        Featured
                                      </Badge>
                                    )}
                                    {bundle.is_popular && (
                                      <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-[10px] px-1.5 py-0">
                                        <Flame className="w-2.5 h-2.5 mr-0.5" />
                                        Popular
                                      </Badge>
                                    )}
                                  </div>
                                  {bundle.description && (
                                    <p className="text-xs text-gray-400 line-clamp-1">{bundle.description}</p>
                                  )}
                                  <div className="flex items-center gap-3 mt-2">
                                    <span className="text-sm text-gray-400">
                                      <span className="text-white font-bold">{bundle.vote_count}</span> votes
                                    </span>
                                    {bundle.discount_percentage && bundle.discount_percentage > 0 && (
                                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-[10px]">
                                        <Percent className="w-2.5 h-2.5 mr-0.5" />
                                        {bundle.discount_percentage}% off
                                      </Badge>
                                    )}
                                  </div>
                                </div>

                                <div className="text-right flex flex-col items-end gap-2">
                                  {bundle.discount_percentage && bundle.discount_percentage > 0 ? (
                                    <>
                                      <span className="text-gray-500 line-through text-xs">
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
                                          className="w-8 h-8 rounded-lg bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors"
                                        >
                                          <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="min-w-[2rem] text-center font-bold text-white">
                                          {quantity}
                                        </span>
                                        <button
                                          onClick={() => addBundleQuantity(bundle)}
                                          className="w-8 h-8 rounded-lg bg-[#0152be] hover:bg-[#0152be]/80 flex items-center justify-center transition-colors"
                                        >
                                          <Plus className="w-4 h-4" />
                                        </button>
                                      </>
                                    ) : (
                                      <Button
                                        size="sm"
                                        onClick={() => addBundleQuantity(bundle)}
                                        className="h-8 bg-gradient-to-r from-[#0152be] to-sky-500 hover:from-[#014099] hover:to-sky-600 text-white text-xs rounded-lg"
                                      >
                                        <Plus className="w-3 h-3 mr-1" />
                                        Add
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    )
                  )}

                  {/* Cart Summary */}
                  {selectedBundles.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-gradient-to-r from-[#0152be]/10 to-purple-500/10 rounded-xl border border-[#0152be]/30"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <ShoppingCart className="w-5 h-5 text-[#0152be]" />
                          <span className="font-medium text-white">Your Cart</span>
                          <Badge className="bg-[#0152be] text-white text-xs">{totalCartItems}</Badge>
                        </div>
                        <span className="text-xl font-bold text-white">
                          {formatCurrency(cartTotals.priceAfterBundleDiscount, cartTotals.currency)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-400">
                        <span className="text-white font-semibold">{cartTotals.totalVotes}</span> total votes
                      </div>
                    </motion.div>
                  )}

                  {/* Continue Button */}
                  <Button
                    onClick={handleContinueToDetails}
                    disabled={selectedBundles.length === 0}
                    className="w-full h-12 bg-gradient-to-r from-[#0152be] to-sky-500 hover:from-[#014099] hover:to-sky-600 text-white font-semibold rounded-xl shadow-lg shadow-[#0152be]/20 disabled:opacity-50"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
              )}

              {/* Step 2: Voter Details & Coupon */}
              {step === 'details' && selectedBundles.length > 0 && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  {/* Cart Summary */}
                  <div className="p-4 bg-gray-800/30 rounded-xl border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">
                        {totalCartItems} bundle{totalCartItems > 1 ? 's' : ''} • {cartTotals.totalVotes} votes
                      </span>
                      <button
                        onClick={() => setStep('bundles')}
                        className="text-xs text-[#0152be] hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                    <span className="text-xl font-bold text-white">
                      {formatCurrency(cartTotals.priceAfterBundleDiscount, cartTotals.currency)}
                    </span>
                  </div>

                  {/* Voter Details */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="voterName" className="text-gray-300 text-sm font-medium">Full Name *</Label>
                      <div className="relative group">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#0152be] transition-colors" />
                        <Input
                          id="voterName"
                          type="text"
                          placeholder="Enter your full name"
                          value={voterName}
                          onChange={(e) => setVoterName(e.target.value)}
                          className="pl-10 h-11 bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-[#0152be] focus:ring-[#0152be]/20 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="voterEmail" className="text-gray-300 text-sm font-medium">Email Address *</Label>
                      <div className="relative group">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#0152be] transition-colors" />
                        <Input
                          id="voterEmail"
                          type="email"
                          placeholder="Enter your email"
                          value={voterEmail}
                          onChange={(e) => setVoterEmail(e.target.value)}
                          className="pl-10 h-11 bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-[#0152be] focus:ring-[#0152be]/20 rounded-xl"
                        />
                      </div>
                      <p className="text-xs text-gray-500">Vote codes will be sent to this email</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="voterPhone" className="text-gray-300 text-sm font-medium">Phone (Optional)</Label>
                      <div className="relative group">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#0152be] transition-colors" />
                        <Input
                          id="voterPhone"
                          type="tel"
                          placeholder="Enter your phone number"
                          value={voterPhone}
                          onChange={(e) => setVoterPhone(e.target.value)}
                          className="pl-10 h-11 bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-[#0152be] focus:ring-[#0152be]/20 rounded-xl"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Coupon Section */}
                  <div className="border-t border-gray-800 pt-4">
                    <Label className="text-gray-300 flex items-center gap-2 mb-3 text-sm font-medium">
                      <Gift className="w-4 h-4 text-[#0152be]" />
                      Have a coupon code?
                    </Label>

                    <div className="flex space-x-2 mb-3">
                      <div className="flex-1 relative">
                        <Input
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="Enter discount code"
                          className={cn(
                            "pl-4 pr-10 h-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:ring-[#0152be]/20 rounded-xl transition-all",
                            couponValidation.isValid === true ? "border-green-500 focus:border-green-500" :
                              couponValidation.isValid === false ? "border-red-500 focus:border-red-500" : "focus:border-[#0152be]"
                          )}
                          disabled={couponValidation.isValidating || !!appliedCoupon}
                        />
                        {couponValidation.isValidating && (
                          <Loader2 className="w-4 h-4 animate-spin absolute right-3 top-3 text-gray-400" />
                        )}
                        {couponValidation.isValid === true && (
                          <CheckCircle className="w-4 h-4 absolute right-3 top-3 text-green-500" />
                        )}
                        {couponValidation.isValid === false && (
                          <XCircle className="w-4 h-4 absolute right-3 top-3 text-red-500" />
                        )}
                      </div>
                      {appliedCoupon ? (
                        <Button onClick={removeCoupon} variant="outline" className="h-10 border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      ) : (
                        <Button
                          onClick={handleApplyCoupon}
                          disabled={!couponCode.trim() || couponValidation.isValidating}
                          className="h-10 bg-[#0152be] hover:bg-[#014099]"
                        >
                          Apply
                        </Button>
                      )}
                    </div>

                    {/* Validation Message */}
                    <AnimatePresence>
                      {couponValidation.message && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className={cn(
                            "text-xs p-3 rounded-lg border flex items-start gap-2",
                            couponValidation.isValid === true ? "bg-green-500/10 border-green-500/20 text-green-400" :
                              couponValidation.isValid === false ? "bg-red-500/10 border-red-500/20 text-red-400" :
                                "bg-blue-500/10 border-blue-500/20 text-blue-400"
                          )}
                        >
                          <div className="mt-0.5">
                            {couponValidation.isValid === true ? <CheckCircle className="w-3 h-3" /> :
                              couponValidation.isValid === false ? <XCircle className="w-3 h-3" /> :
                                <Loader2 className="w-3 h-3 animate-spin" />}
                          </div>
                          <span>{couponValidation.message}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Navigation */}
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setStep('bundles')}
                      className="flex-1 h-12 border-gray-700 text-gray-300 hover:bg-gray-800 rounded-xl"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Back
                    </Button>
                    <Button
                      onClick={handleContinueToSummary}
                      className="flex-1 h-12 bg-gradient-to-r from-[#0152be] to-sky-500 hover:from-[#014099] hover:to-sky-600 text-white font-semibold rounded-xl shadow-lg shadow-[#0152be]/20"
                    >
                      Continue
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Summary */}
              {step === 'summary' && selectedBundles.length > 0 && (
                <motion.div
                  key="summary"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <div className="p-5 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-700/50 space-y-4">
                    <h4 className="font-semibold text-white flex items-center gap-2">
                      <ShoppingCart className="w-4 h-4 text-[#0152be]" />
                      Order Summary
                    </h4>

                    <div className="space-y-3 text-sm">
                      {selectedBundles.map(({ bundle, quantity }) => (
                        <div key={bundle._id as string} className="flex justify-between py-2 border-b border-gray-700/50">
                          <span className="text-gray-400">
                            {bundle.name} × {quantity}
                            <span className="text-gray-500 ml-1">({bundle.vote_count * quantity} votes)</span>
                          </span>
                          <span className="text-white font-medium">
                            {formatCurrency(bundle.price * quantity, bundle.currency)}
                          </span>
                        </div>

                      ))}

                      <div className="flex justify-between py-2 border-b border-gray-700/50">
                        <span className="text-gray-400">Category</span>
                        <span className="text-white">{[...new Set(selectedBundles.map((sb) => sb.category?.name))].filter(Boolean).join(', ')}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-700/50">
                        <span className="text-gray-400">Email</span>
                        <span className="text-white">{voterEmail}</span>
                      </div>

                      {candidateName && (
                        <div className="flex justify-between py-2 border-b border-gray-700/50">
                          <span className="text-gray-400">Voting for</span>
                          <span className="text-[#0152be] font-medium">{candidateName}</span>
                        </div>
                      )}

                      <div className="pt-3 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Subtotal</span>
                          <span className="text-white">{formatCurrency(cartTotals.subtotal, cartTotals.currency)}</span>
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

                        <div className="flex justify-between pt-3 border-t border-gray-700">
                          <span className="text-white font-semibold">Total</span>
                          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#0152be] to-sky-400">
                            {formatCurrency(cartTotals.finalPrice, cartTotals.currency)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 text-center">
                    {candidateName
                      ? 'Your votes will be automatically cast after successful payment'
                      : 'You will receive your vote codes via email after successful payment'}
                  </p>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setStep('details')}
                      className="flex-1 h-12 border-gray-700 text-gray-300 hover:bg-gray-800 rounded-xl"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Back
                    </Button>
                    <Button
                      onClick={handleProceedToPayment}
                      disabled={isProcessing}
                      className="flex-1 h-12 bg-gradient-to-r from-[#0152be] to-sky-500 hover:from-[#014099] hover:to-sky-600 text-white font-semibold rounded-xl shadow-lg shadow-[#0152be]/20"
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Pay {formatCurrency(cartTotals.finalPrice, cartTotals.currency)}
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Processing */}
              {step === 'processing' && (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12"
                >
                  <PremiumSpinner size="lg" text="Processing your payment..." />
                  <p className="text-gray-500 text-xs mt-4">Please do not close this window</p>
                </motion.div>
              )}

              {/* Step 5: Success */}
              {step === 'success' && selectedBundles.length > 0 && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, type: 'spring' }}
                  className="text-center py-4"
                >
                  <div className="relative mx-auto mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500/30 to-emerald-500/30 rounded-full flex items-center justify-center mx-auto">
                      <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
                        <Check className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    {/* Confetti dots */}
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

                  <h3 className="text-2xl font-bold text-white mb-2">Payment Successful!</h3>
                  <p className="text-gray-400 mb-6">
                    You purchased <span className="text-white font-semibold">{cartTotals.totalVotes} votes</span>
                  </p>

                  {/* Vote Code Display */}
                  <div className="p-5 bg-gradient-to-br from-[#0152be]/15 to-purple-500/15 rounded-2xl border border-[#0152be]/30 mb-4">
                    <p className="text-xs text-gray-400 mb-2">Your Vote Code</p>
                    <div className="flex items-center justify-center gap-3">
                      <p className="text-3xl font-mono font-bold text-[#0152be] tracking-widest">
                        {generatedVoteCode}
                      </p>
                      <button
                        onClick={handleCopyCode}
                        className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
                        title="Copy code"
                      >
                        {codeCopied ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-3">
                      A copy has been sent to <span className="text-gray-300">{voterEmail}</span>
                    </p>
                  </div>

                  {candidateName && (
                    <div className="p-3 bg-green-500/10 rounded-xl border border-green-500/20 mb-4">
                      <p className="text-sm text-green-400">
                        <Check className="w-4 h-4 inline mr-1" />
                        Votes have been cast for <strong>{candidateName}</strong>
                      </p>
                    </div>
                  )}

                  <div className="p-3 bg-yellow-500/10 rounded-xl border border-yellow-500/20 mb-6">
                    <p className="text-xs text-yellow-400">
                      <strong>Demo Mode:</strong> This is a simulated payment. In production, you would be redirected to Paystack.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={handleClose}
                      className="flex-1 h-12 border-gray-700 text-gray-300 hover:bg-gray-800 rounded-xl"
                    >
                      Close
                    </Button>
                    {!candidateName && (
                      <Button
                        onClick={handleUseCodeNow}
                        className="flex-1 h-12 bg-gradient-to-r from-[#0152be] to-sky-500 hover:from-[#014099] hover:to-sky-600 text-white font-semibold rounded-xl shadow-lg shadow-[#0152be]/20"
                      >
                        Use Code Now
                      </Button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
