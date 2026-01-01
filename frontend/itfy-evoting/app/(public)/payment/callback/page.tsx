'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';
import Confetti from 'react-confetti';
import {
  Check,
  X,
  Loader2,
  Vote,
  Download,
  Copy,
  Share2,
  Music,
  Calendar,
  Layers,
  Receipt,
  ArrowRight,
  User,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui/GlassCard';
import { paymentsApi } from '@/lib/api/payments';
import { candidatesApi } from '@/lib/api/candidates';
import { categoriesApi } from '@/lib/api/categories';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { jsPDF } from 'jspdf';


// --- Types ---

interface CategoryVoteStats {
  category: {
    _id: string;
    name?: string;
    voting_deadline?: string;
  } | string;
  votes_available: number;
  votes_used: number;
}

interface BundleItem {
  quantity: number;
  votes_allocated: number;
  price_per_unit: number;
  total_price: number;
  bundle?: {
    name?: string;
  }
}

interface CandidateDetails {
  _id: string;
  name: string;
  stage_name: string;
  image_url?: string;
  code: string;
}

interface RichPaymentDetails {
  _id: string;
  transaction_reference: string;
  amount_paid: number;
  currency: string;
  payment_status: 'completed' | 'failed' | 'pending' | 'refunded';
  votes_purchased: number;
  votes_cast: number;
  votes_remaining: number;
  vote_code: string;
  voter_email: string;
  voter_name?: string;
  created_at: string;
  paid_at?: string;

  votes_by_category?: CategoryVoteStats[];
  bundles?: BundleItem[];

  paystack_metadata?: {
    candidate_id?: string;
    auto_vote_cast?: boolean; // Sometimes this might be in metadata root or paystack_metadata
    [key: string]: any;
  };
  metadata?: {
    auto_vote_results?: any;
    [key: string]: any;
  };
}

interface PaymentPageState {
  status: 'loading' | 'success' | 'failed' | 'error';
  data: RichPaymentDetails | null;
  candidate: CandidateDetails | null; // Store candidate details here
  message: string;
}

function PaymentCallbackContent() {
  const searchParams = useSearchParams();
  const paymentRef = searchParams.get('reference') || searchParams.get('trxref');

  const [state, setState] = useState<PaymentPageState>({
    status: 'loading',
    data: null,
    candidate: null,
    message: ''
  });

  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const verifyPayment = async () => {
      if (!paymentRef) {
        if (isMounted) setState(prev => ({ ...prev, status: 'error', message: 'No payment reference found.' }));
        return;
      }

      try {
        const response = await paymentsApi.verify(paymentRef);
        if (response.success && response.data) {
          const rawData = response.data as any;
          const payment = rawData.payment || rawData;

          let candidateData: CandidateDetails | null = null;

          // Check for candidate_id in multiple possible locations
          const candidateId = payment.paystack_metadata?.candidate_id
            || payment.metadata?.candidate_id
            || payment.metadata?.auto_vote_results?.candidate_id;

          // Also check if auto_vote_cast flag is set
          const autoVoteCast = payment.paystack_metadata?.auto_vote_cast
            || payment.metadata?.auto_vote_cast
            || payment.votes_cast > 0;

          if (candidateId && autoVoteCast) {
            try {
              const candResponse = await candidatesApi.getById(candidateId);
              if (candResponse.success && candResponse.data) {
                candidateData = candResponse.data as any;
              }
            } catch (err) {
              console.warn("Failed to fetch candidate", err);
            }
          }

          const votesByCat = payment.votes_by_category || [];
          const populatedCategories = await Promise.all(
            votesByCat.map(async (vc: any) => {
              if (typeof vc.category === 'string') {
                try {
                  const catResponse = await categoriesApi.getById(vc.category);
                  if (catResponse.success && catResponse.data) {
                    return { ...vc, category: catResponse.data };
                  }
                } catch (err) {
                  console.warn(`Failed to fetch category ${vc.category}`, err);
                }
              }
              return vc;
            })
          );

          if (isMounted) {
            setState({
              status: 'success',
              data: {
                ...payment,
                votes_by_category: populatedCategories,
                bundles: payment.bundles || [],
                votes_purchased: payment.votes_purchased || rawData.votes_purchased || 0
              },
              candidate: candidateData,
              message: response.message || 'Payment Verified'
            });
          }
        } else {
          if (isMounted) {
            setState({
              status: 'failed',
              data: null,
              candidate: null,
              message: response.message || response.error || 'Verification failed'
            });
          }
        }
      } catch (error: any) {
        if (isMounted) {
          setState({
            status: 'failed',
            data: null,
            candidate: null,
            message: error.message || 'An unexpected error occurred'
          });
        }
      }
    };

    verifyPayment();
    return () => { isMounted = false; };
  }, [paymentRef]);

  const formatCurrency = (amount: number, currency: string = 'GHS') => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: currency === "GH₵" ? "GHS" : currency
    }).format(amount);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-GH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const copyVoteCode = () => {
    if (!state.data) return;
    navigator.clipboard.writeText(state.data.vote_code);
    toast.success("Copied!", {
      description: `Vote code: ${state.data.vote_code}`,
    });
  };

  const handleDownloadReceipt = () => {
    const { data, candidate } = state;
    if (!data) return;

    // Extract metadata details
    const eventName = data.paystack_metadata?.custom_fields?.find(
      (f: any) => f.variable_name === 'event_name'
    )?.value || 'ITFY Voting Event';
    const voterPhone = data.paystack_metadata?.voter_phone || 'N/A';

    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 20;
    let yPos = 20;

    // Header Background (gradient effect simulation with rectangles)
    pdf.setFillColor(30, 58, 138); // Dark blue
    pdf.rect(0, 0, pageWidth, 50, 'F');
    pdf.setFillColor(88, 28, 135); // Purple tint
    pdf.rect(pageWidth / 2, 0, pageWidth / 2, 50, 'F');

    // Logo/Title
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(28);
    pdf.setFont('helvetica', 'bold');
    pdf.text('ITFY', margin, 25);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Official Payment Receipt', margin, 35);

    // Status Badge
    pdf.setFillColor(34, 197, 94); // Green
    pdf.roundedRect(pageWidth - margin - 35, 18, 35, 12, 3, 3, 'F');
    pdf.setFontSize(10);
    pdf.setTextColor(255, 255, 255);
    pdf.text('COMPLETED', pageWidth - margin - 32, 26);

    yPos = 65;

    // Reset text color
    pdf.setTextColor(30, 41, 59); // Dark slate

    // Event Name
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text(eventName, margin, yPos);
    yPos += 10;

    // Divider
    pdf.setDrawColor(226, 232, 240);
    pdf.setLineWidth(0.5);
    pdf.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 15;

    // Transaction Details Section
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(100, 116, 139);
    pdf.text('TRANSACTION DETAILS', margin, yPos);
    yPos += 8;

    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(30, 41, 59);
    const transDetails = [
      ['Reference:', data.transaction_reference],
      ['Date:', formatDate(data.created_at)],
      ['Amount Paid:', formatCurrency(data.amount_paid, data.currency)],
      ['Vote Code:', data.vote_code]
    ];

    transDetails.forEach(([label, value]) => {
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(100, 116, 139);
      pdf.text(label, margin, yPos);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(30, 41, 59);
      pdf.text(String(value), margin + 45, yPos);
      yPos += 7;
    });

    yPos += 10;

    // Voter Details Section
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(100, 116, 139);
    pdf.text('VOTER INFORMATION', margin, yPos);
    yPos += 8;

    const voterDetails = [
      ['Name:', data.voter_name || 'N/A'],
      ['Email:', data.voter_email],
      ['Phone:', voterPhone]
    ];

    voterDetails.forEach(([label, value]) => {
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(100, 116, 139);
      pdf.text(label, margin, yPos);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(30, 41, 59);
      pdf.text(String(value), margin + 45, yPos);
      yPos += 7;
    });

    yPos += 10;

    // Vote Summary Section
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(100, 116, 139);
    pdf.text('VOTE SUMMARY', margin, yPos);
    yPos += 8;

    // Votes box
    pdf.setFillColor(241, 245, 249); // Light gray
    pdf.roundedRect(margin, yPos, pageWidth - margin * 2, 25, 3, 3, 'F');

    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(59, 130, 246); // Blue
    pdf.text(String(data.votes_purchased), margin + 10, yPos + 17);

    pdf.setFontSize(10);
    pdf.setTextColor(100, 116, 139);
    pdf.text('Total Votes Purchased', margin + 35, yPos + 15);

    pdf.setFontSize(14);
    pdf.setTextColor(34, 197, 94); // Green
    pdf.text(`${data.votes_cast} Cast`, pageWidth - margin - 40, yPos + 12);
    pdf.setTextColor(100, 116, 139);
    pdf.setFontSize(10);
    pdf.text(`${data.votes_remaining} Remaining`, pageWidth - margin - 40, yPos + 20);

    yPos += 35;

    // Candidate Section (if auto-vote was cast)
    if (candidate) {
      pdf.setFillColor(88, 28, 135, 15); // Light purple
      pdf.roundedRect(margin, yPos, pageWidth - margin * 2, 40, 3, 3, 'F');

      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(88, 28, 135);
      pdf.text('VOTE CAST FOR', margin + 10, yPos + 10);

      pdf.setFontSize(16);
      pdf.setTextColor(30, 41, 59);
      pdf.text(candidate.stage_name, margin + 10, yPos + 22);

      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(100, 116, 139);
      pdf.text(`${candidate.name} • Code: ${candidate.code}`, margin + 10, yPos + 32);

      pdf.setFontSize(20);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(34, 197, 94);
      pdf.text(`+${data.votes_cast}`, pageWidth - margin - 25, yPos + 25);

      yPos += 50;
    }

    // Category List - Only show categories where votes were used
    const usedCategories = data.votes_by_category?.filter((c: any) => c.votes_used > 0) || [];
    if (usedCategories.length > 0) {
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(100, 116, 139);
      pdf.text('VOTES CAST IN', margin, yPos);
      yPos += 10;

      usedCategories.forEach((cat: any) => {
        const catName = typeof cat.category === 'object' ? cat.category.name || 'Category' : 'Category';

        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(30, 41, 59);
        pdf.text('✓ ' + catName, margin, yPos);
        pdf.setTextColor(34, 197, 94);
        pdf.text(`+${cat.votes_used} votes`, pageWidth - margin - 35, yPos);
        yPos += 7;
      });
    }

    // Footer
    yPos = pdf.internal.pageSize.getHeight() - 30;
    pdf.setDrawColor(226, 232, 240);
    pdf.line(margin, yPos - 10, pageWidth - margin, yPos - 10);

    pdf.setFontSize(8);
    pdf.setTextColor(148, 163, 184);
    pdf.text('This is an official receipt from ITFY Voting Platform.', margin, yPos);
    pdf.text('For support, contact: support@itfy.io', margin, yPos + 5);
    pdf.text(`Generated: ${new Date().toLocaleString()}`, pageWidth - margin - 45, yPos);

    // Save PDF
    pdf.save(`ITFY-Receipt-${data.transaction_reference}.pdf`);
    toast.success("Receipt Downloaded!", { description: "Your PDF receipt has been saved." });
  };

  if (state.status === 'loading') {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-pink-900/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/30 rounded-full blur-[140px] animate-pulse" />
        <GlassCard className="p-10 flex flex-col items-center gap-8 max-w-md w-full border-white/10 bg-white/5 backdrop-blur-3xl z-10">
          <Loader2 className="w-16 h-16 text-blue-400 animate-spin" />
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-white mb-2">Verifying Your Payment</h2>
            <p className="text-gray-400">This won't take long...</p>
          </div>
        </GlassCard>
      </div>
    );
  }

  if (state.status === 'failed' || state.status === 'error') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <GlassCard className="p-10 max-w-md w-full text-center border-red-500/30 bg-red-950/20">
          <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-8 ring-8 ring-red-500/10">
            <X className="w-12 h-12 text-red-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Payment Verification Failed</h1>
          <p className="text-gray-300 mb-10 leading-relaxed">{state.message}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={() => window.location.reload()} variant="outline" className="border-white/20">
              Try Again
            </Button>
            <Link href="/" className="flex-1">
              <Button className="w-full bg-white text-black hover:bg-gray-200">Back to Home</Button>
            </Link>
          </div>
        </GlassCard>
      </div>
    );
  }

  const { data, candidate } = state;
  if (!data) return null;

  const autoVoteResults = data.metadata?.auto_vote_results || data.metadata?.auto_vote_cast;
  let votedCategoryName = "Unknown Category";
  let voteTime = data.paid_at || data.created_at;

  const votedCategoryId = autoVoteResults?.categories_affected?.[0]?.category_id;
  if (votedCategoryId && data.votes_by_category) {
    const found = data.votes_by_category.find((c: any) =>
      (typeof c.category === 'string' ? c.category : c.category._id) === votedCategoryId
    );
    if (found) {
      votedCategoryName = typeof found.category === 'object' ? found.category.name || 'Category' : 'Category';
    }
  }

  if (autoVoteResults?.cast_at) voteTime = autoVoteResults.cast_at;

  return (
    <>
      {/* Confetti Celebration */}
      {state.status === 'success' && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.1}
          colors={['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b']}
        />
      )}

      <div className="min-h-screen bg-[#05070f] text-white overflow-x-hidden font-sans relative">
        {/* Enhanced Background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[140px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[140px] translate-x-1/2 translate-y-1/2" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-600/5 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", damping: 15 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center p-4 rounded-full bg-green-500/20 border border-green-500/30 mb-6 shadow-2xl shadow-green-500/20">
              <Check className="w-10 h-10 text-green-400" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              Payment Successful!
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              You’ve successfully purchased <span className="font-bold text-white">{data.votes_purchased} votes</span>. Thank you for your amazing support!
            </p>
          </motion.div>

          {/* Mobile-First Grid: Sidebar first on small screens */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* RIGHT COLUMN - Sidebar (moves to top on mobile) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="order-1 lg:order-2 lg:col-span-1"
            >
              <div className="sticky top-8 space-y-6">
                <GlassCard className="p-8 border-white/10 bg-white/5 backdrop-blur-xl">
                  <h3 className="text-lg font-bold text-gray-300 uppercase tracking-wider mb-8 flex items-center gap-3">
                    <Receipt className="w-6 h-6 text-blue-400" />
                    Transaction Summary
                  </h3>

                  <div className="mb-8">
                    <p className="text-sm text-gray-500 mb-2">Amount Paid</p>
                    <p className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      {formatCurrency(data.amount_paid, data.currency)}
                    </p>
                  </div>

                  <Separator className="bg-white/10 my-8" />

                  <div className="space-y-5 text-sm">
                    <div className="flex justify-between"><span className="text-gray-400">Status</span><span className="text-green-400 font-bold">Completed</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Reference</span><span className="text-gray-300 font-mono text-xs">{data.transaction_reference}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Date</span><span className="text-gray-300">{new Date(data.created_at).toLocaleDateString('en-GH', { month: 'short', day: 'numeric', year: 'numeric' })}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Total Votes</span><span className="text-white font-bold text-xl">{data.votes_purchased}</span></div>
                  </div>

                  <Separator className="bg-white/10 my-8" />

                  <div className="space-y-4">
                    <Button onClick={handleDownloadReceipt} variant="outline" className="w-full justify-between border-white/20 hover:bg-white/10">
                      Download Receipt <Download className="w-5 h-5" />
                    </Button>
                    <Link href="/" className="block">
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500">
                        Back to Event <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </GlassCard>

                <p className="text-center text-xs text-gray-500">Securely processed by Paystack</p>
              </div>
            </motion.div>

            {/* LEFT COLUMN - Main Content */}
            <div className="lg:col-span-2 space-y-10 order-2 lg:order-1">
              {/* Vote Code Card */}
              <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
                <GlassCard className="p-8 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-pink-900/10 border-blue-500/20">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-blue-300 mb-1">Your Official Vote Code</h3>
                      <p className="text-sm text-gray-400">Keep this safe • Use to track or cast manually</p>
                    </div>
                    <div className="flex items-center gap-4 px-8 py-4 bg-black/50 rounded-2xl border border-white/20 backdrop-blur-md">
                      <code className="text-3xl font-mono font-bold tracking-widest text-white">
                        {data.vote_code}
                      </code>
                      <Button size="icon" variant="ghost" onClick={copyVoteCode} className="text-gray-400 hover:text-white">
                        <Copy className="w-6 h-6" />
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              {/* Auto-Vote or Manual CTA */}
              {candidate ? (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", damping: 18, stiffness: 80 }}
                >
                  <GlassCard className="p-10 bg-gradient-to-br from-purple-900/30 via-indigo-900/20 to-pink-900/20 border-purple-500/40 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-green-500/5 to-transparent" />
                    <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-xl opacity-40 scale-110" />
                        <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-purple-400/60 shadow-2xl">
                          {candidate.image_url ? (
                            <Image src={candidate.image_url} alt={candidate.stage_name} fill className="object-cover" />
                          ) : (
                            <div className="w-full h-full bg-purple-800 flex items-center justify-center">
                              <User className="w-20 h-20 text-purple-300" />
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex-1 text-center md:text-left">
                        <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
                          <div className="p-3 bg-green-500/20 rounded-full">
                            <Check className="w-8 h-8 text-green-400" />
                          </div>
                          <h2 className="text-3xl font-bold">Vote Successfully Cast!</h2>
                        </div>
                        <h3 className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 mb-2">
                          {candidate.stage_name}
                        </h3>
                        <p className="text-lg text-gray-300 mb-4">{candidate.name}</p>

                        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                          <span className="px-4 py-2 bg-purple-900/40 rounded-full text-sm border border-purple-500/30">
                            {votedCategoryName}
                          </span>
                          <span className="px-4 py-2 bg-green-900/40 rounded-full text-sm flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(voteTime).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      <div className="text-center bg-gradient-to-br from-green-600/30 to-emerald-600/30 p-8 rounded-3xl border border-green-500/40 min-w-[140px]">
                        <p className="text-5xl font-black text-green-400">+{data.votes_cast}</p>
                        <p className="text-sm uppercase tracking-wider text-green-300 mt-2">Votes Added</p>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ) : data.votes_remaining > 0 ? (
                <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                  <GlassCard className="p-10 bg-gradient-to-br from-blue-900/30 to-cyan-900/20 border-blue-500/40 group hover:border-blue-400/60 transition-all">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      <div className="p-6 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-3xl border border-blue-400/40">
                        <Vote className="w-12 h-12 text-blue-300" />
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <h3 className="text-3xl font-bold mb-3">Your Votes Are Ready!</h3>
                        <p className="text-lg text-gray-300">
                          You have <span className="text-blue-400 font-bold text-2xl">{data.votes_remaining}</span> votes waiting to make an impact.
                        </p>
                      </div>
                      <Link href="/vote">
                        <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-10 py-8 text-xl font-bold shadow-2xl shadow-blue-500/30">
                          Cast Your Votes Now
                          <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </GlassCard>
                </motion.div>
              ) : (
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring" }}>
                  <GlassCard className="p-12 text-center bg-gradient-to-br from-green-900/30 to-teal-900/20 border-green-500/40">
                    <div className="inline-flex p-6 bg-green-500/20 rounded-full mb-6">
                      <Check className="w-12 h-12 text-green-400" />
                    </div>
                    <h3 className="text-4xl font-bold mb-4">All Votes Cast Successfully!</h3>
                    <p className="text-xl text-gray-300 mb-8 max-w-lg mx-auto">
                      Every one of your {data.votes_purchased} votes has been recorded. Thank you for being an incredible supporter!
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                      <Link href="/"><Button variant="outline" size="lg">Back Home</Button></Link>
                      <Link href="/events"><Button size="lg" className="bg-green-600 hover:bg-green-500">Explore Events</Button></Link>
                    </div>
                  </GlassCard>
                </motion.div>
              )}

              {/* Vote Balance Summary - Using Global Counts */}
              <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
                <div className="flex items-center gap-3 mb-6">
                  <Layers className="w-6 h-6 text-purple-400" />
                  <h2 className="text-2xl font-bold">Vote Balance</h2>
                </div>

                {/* Global Vote Summary Card */}
                <GlassCard className="p-8 border-white/10">
                  <div className="grid grid-cols-3 gap-6 text-center mb-6">
                    <div>
                      <p className="text-4xl font-bold text-white">{data.votes_purchased}</p>
                      <p className="text-sm text-gray-400 mt-1">Purchased</p>
                    </div>
                    <div>
                      <p className="text-4xl font-bold text-green-400">{data.votes_cast}</p>
                      <p className="text-sm text-gray-400 mt-1">Cast</p>
                    </div>
                    <div>
                      <p className={cn("text-4xl font-bold", data.votes_remaining > 0 ? "text-blue-400" : "text-gray-500")}>{data.votes_remaining}</p>
                      <p className="text-sm text-gray-400 mt-1">Remaining</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${data.votes_purchased > 0 ? (data.votes_cast / data.votes_purchased) * 100 : 0}%` }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-500"
                    />
                  </div>

                  <Separator className="bg-white/10 my-6" />

                  {/* Show ONLY categories where votes were used */}
                  {data.votes_cast > 0 && data.votes_by_category && data.votes_by_category.filter((c: any) => c.votes_used > 0).length > 0 && (
                    <div>
                      <p className="text-sm text-gray-400 mb-3 flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-400" /> Votes cast in:
                      </p>
                      <div className="space-y-2">
                        {data.votes_by_category.filter((c: any) => c.votes_used > 0).map((cat: any, idx: number) => {
                          const catName = typeof cat.category === 'object' ? cat.category.name || 'Category' : 'Category';
                          return (
                            <div key={idx} className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/20 rounded-xl">
                              <span className="text-green-300 font-medium">{catName}</span>
                              <span className="text-green-400 font-bold">+{cat.votes_used}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Show eligible categories ONLY if votes remaining > 0 */}
                  {data.votes_remaining > 0 && data.votes_by_category && data.votes_by_category.length > 0 && (
                    <div className="mt-6">
                      <p className="text-sm text-gray-400 mb-3 flex items-center gap-2">
                        <Vote className="w-4 h-4 text-blue-400" /> Available to vote in:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {data.votes_by_category.map((cat: any, idx: number) => {
                          const catName = typeof cat.category === 'object' ? cat.category.name || 'Category' : 'Category';
                          return (
                            <span key={idx} className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-sm text-blue-300">
                              {catName}
                            </span>
                          );
                        })}
                      </div>
                      <Link href="/vote" className="block mt-4">
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500">
                          Cast Remaining Votes <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  )}

                  {/* All votes used message */}
                  {data.votes_remaining === 0 && data.votes_cast > 0 && (
                    <div className="mt-4 text-center">
                      <p className="text-green-400 font-medium flex items-center justify-center gap-2">
                        <Check className="w-5 h-5" /> All votes successfully recorded!
                      </p>
                    </div>
                  )}
                </GlassCard>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <Toaster />
    </>
  );
}

export default function PaymentCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
      </div>
    }>
      <PaymentCallbackContent />
    </Suspense>
  );
}
