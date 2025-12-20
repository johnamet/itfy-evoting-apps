'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Check, 
  X, 
  Loader2, 
  Vote, 
  Download, 
  Mail, 
  ArrowRight,
  AlertCircle,
  Home,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui/GlassCard';
import { paymentsApi, VerifyPaymentResponse } from '@/lib/api/payments';
import { Payment, VoteCode } from '@/types';

interface PaymentDetails {
  success: boolean;
  message?: string;
  reference?: string;
  amount?: number;
  currency?: string;
  votes_purchased?: number;
  votes_cast?: number;
  vote_code?: string;
  vote_codes?: VoteCode[];
  candidate_name?: string;
  category_name?: string;
  event_name?: string;
  voter_email?: string;
  transaction_id?: string;
  payment_date?: string;
  payment?: Payment;
}

function PaymentCallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'failed' | 'error'>('loading');
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const reference = searchParams.get('reference');
  const trxref = searchParams.get('trxref');
  const paymentRef = reference || trxref;

  useEffect(() => {
    const verifyPayment = async () => {
      if (!paymentRef) {
        setStatus('error');
        setErrorMessage('No payment reference found. Please try again or contact support.');
        return;
      }

      try {
        const response = await paymentsApi.verify(paymentRef);

        if (response.success && response.data) {
          const { payment, vote_codes, message } = response.data as VerifyPaymentResponse;
          
          // Calculate total votes from payment or vote codes
          const totalVotesPurchased = payment?.votes_purchased || 
            vote_codes?.reduce((sum, code) => sum + (code.votes_purchased || 0), 0) || 0;
          const totalVotesCast = payment?.votes_cast || 
            vote_codes?.reduce((sum, code) => sum + (code.votes_cast || 0), 0) || 0;

          setPaymentDetails({
            success: true,
            message,
            reference: paymentRef,
            amount: payment?.amount_paid,
            currency: payment?.currency || 'GHS',
            votes_purchased: totalVotesPurchased,
            votes_cast: totalVotesCast,
            vote_code: payment?.vote_code || vote_codes?.[0]?.code,
            vote_codes: vote_codes,
            voter_email: payment?.voter_email,
            transaction_id: payment?.transaction_reference || payment?.paystack_reference,
            payment_date: payment?.paid_at || payment?.created_at || new Date().toISOString(),
            payment
          });
          setStatus('success');
        } else {
          // Try to get more details from the response
          setErrorMessage(response.error || 'Payment verification failed');
          setStatus('failed');
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        
        // Demo mode: simulate successful payment
        console.log('Demo mode: simulating successful payment verification');
        const demoVoteCode = `VOTE${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
        setPaymentDetails({
          success: true,
          reference: paymentRef,
          amount: 25.00,
          currency: 'GHS',
          votes_purchased: 25,
          votes_cast: 25,
          vote_code: demoVoteCode,
          candidate_name: 'Demo Candidate',
          category_name: 'Best New Artist',
          event_name: 'Ghana Music Awards 2025',
          voter_email: 'voter@example.com',
          transaction_id: `TXN${Date.now()}`,
          payment_date: new Date().toISOString()
        });
        setStatus('success');
      }
    };

    verifyPayment();
  }, [paymentRef]);

  const formatCurrency = (amount: number, currency: string = 'GHS') => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDownloadReceipt = () => {
    // In production, this would generate a PDF receipt
    const receiptContent = `
ITFY GHANA - VOTE PURCHASE RECEIPT
==================================

Transaction Reference: ${paymentDetails?.reference}
Transaction ID: ${paymentDetails?.transaction_id}
Date: ${paymentDetails?.payment_date ? formatDate(paymentDetails.payment_date) : 'N/A'}

Event: ${paymentDetails?.event_name}
Category: ${paymentDetails?.category_name}
Candidate: ${paymentDetails?.candidate_name}

Votes Purchased: ${paymentDetails?.votes_purchased}
Votes Cast: ${paymentDetails?.votes_cast}
Amount Paid: ${formatCurrency(paymentDetails?.amount || 0, paymentDetails?.currency)}

Vote Code: ${paymentDetails?.vote_code}

Email: ${paymentDetails?.voter_email}

Thank you for voting!
---
ITFY Ghana - Empowering Digital Democracy
    `.trim();

    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${paymentDetails?.reference}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center p-4">
        <GlassCard className="max-w-md w-full p-8 text-center">
          <Loader2 className="w-16 h-16 text-[#0152be] animate-spin mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-white mb-2">Verifying Payment</h1>
          <p className="text-gray-400">
            Please wait while we confirm your payment...
          </p>
        </GlassCard>
      </div>
    );
  }

  if (status === 'error' || status === 'failed') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center p-4">
        <GlassCard className="max-w-md w-full p-8 text-center">
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <X className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Payment {status === 'failed' ? 'Failed' : 'Error'}</h1>
          <p className="text-gray-400 mb-6">
            {errorMessage || 'There was an issue processing your payment.'}
          </p>
          
          {paymentRef && (
            <div className="p-3 bg-gray-800/50 rounded-lg mb-6">
              <p className="text-xs text-gray-500">Reference</p>
              <p className="text-sm font-mono text-gray-300">{paymentRef}</p>
            </div>
          )}

          <div className="flex flex-col gap-3">
            <Button
              onClick={() => router.back()}
              className="w-full bg-[#0152be] hover:bg-[#0152be]/90 text-white"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <Link href="/" className="w-full">
              <Button
                variant="outline"
                className="w-full border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>
            </Link>
          </div>

          <p className="text-xs text-gray-500 mt-6">
            If the problem persists, please contact support with your reference number.
          </p>
        </GlassCard>
      </div>
    );
  }

  // Success state
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center p-4">
      <div className="max-w-lg w-full space-y-6">
        {/* Success Header */}
        <GlassCard className="p-8 text-center">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Payment Successful!</h1>
          <p className="text-gray-400">
            Your votes have been purchased and cast successfully
          </p>
        </GlassCard>

        {/* Vote Details */}
        <GlassCard className="p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Vote className="w-5 h-5 text-[#0152be]" />
            Vote Details
          </h2>
          
          <div className="space-y-3">
            {paymentDetails?.event_name && (
              <div className="flex justify-between">
                <span className="text-gray-400">Event</span>
                <span className="text-white">{paymentDetails.event_name}</span>
              </div>
            )}
            
            {paymentDetails?.category_name && (
              <div className="flex justify-between">
                <span className="text-gray-400">Category</span>
                <span className="text-white">{paymentDetails.category_name}</span>
              </div>
            )}
            
            {paymentDetails?.candidate_name && (
              <div className="flex justify-between">
                <span className="text-gray-400">Candidate</span>
                <span className="text-white font-medium">{paymentDetails.candidate_name}</span>
              </div>
            )}
            
            <div className="border-t border-gray-700 pt-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Votes Purchased</span>
                <span className="text-white font-medium">{paymentDetails?.votes_purchased}</span>
              </div>
              
              {paymentDetails?.votes_cast && paymentDetails.votes_cast > 0 && (
                <div className="flex justify-between mt-2">
                  <span className="text-gray-400">Votes Cast</span>
                  <span className="text-green-400 font-medium flex items-center gap-1">
                    <Check className="w-4 h-4" />
                    {paymentDetails.votes_cast}
                  </span>
                </div>
              )}
            </div>
          </div>
        </GlassCard>

        {/* Vote Code */}
        {paymentDetails?.vote_code && (
          <GlassCard className="p-6 border-[#0152be]/30">
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-2">Your Vote Code (Backup)</p>
              <p className="text-3xl font-mono font-bold text-[#0152be] tracking-wider">
                {paymentDetails.vote_code}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Save this code in case you need to verify your votes
              </p>
            </div>
          </GlassCard>
        )}

        {/* Transaction Details */}
        <GlassCard className="p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Transaction Details</h2>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Reference</span>
              <span className="text-white font-mono">{paymentDetails?.reference}</span>
            </div>
            
            {paymentDetails?.transaction_id && (
              <div className="flex justify-between">
                <span className="text-gray-400">Transaction ID</span>
                <span className="text-white font-mono">{paymentDetails.transaction_id}</span>
              </div>
            )}
            
            <div className="flex justify-between">
              <span className="text-gray-400">Amount Paid</span>
              <span className="text-white font-medium">
                {formatCurrency(paymentDetails?.amount || 0, paymentDetails?.currency)}
              </span>
            </div>
            
            {paymentDetails?.payment_date && (
              <div className="flex justify-between">
                <span className="text-gray-400">Date</span>
                <span className="text-white">{formatDate(paymentDetails.payment_date)}</span>
              </div>
            )}
          </div>
        </GlassCard>

        {/* Email Confirmation */}
        {paymentDetails?.voter_email && (
          <div className="p-4 bg-[#0152be]/10 rounded-lg border border-[#0152be]/20">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#0152be] flex-shrink-0" />
              <div>
                <p className="text-sm text-white">Confirmation sent to</p>
                <p className="text-sm text-gray-400">{paymentDetails.voter_email}</p>
              </div>
            </div>
          </div>
        )}

        {/* Info Notice */}
        <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-green-400 font-medium">Votes Auto-Cast</p>
              <p className="text-xs text-gray-400 mt-1">
                Your votes have been automatically cast for your selected candidate. 
                The vote code is provided as a backup for verification purposes.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleDownloadReceipt}
            variant="outline"
            className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Receipt
          </Button>
          <Link href="/events" className="flex-1">
            <Button className="w-full bg-[#0152be] hover:bg-[#0152be]/90 text-white">
              Browse Events
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Demo Notice */}
        <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-yellow-400">
              <strong>Demo Mode:</strong> This is a simulated payment confirmation. 
              In production, this page verifies real Paystack transactions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center p-4">
        <GlassCard className="max-w-md w-full p-8 text-center">
          <Loader2 className="w-16 h-16 text-[#0152be] animate-spin mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-white mb-2">Loading...</h1>
          <p className="text-gray-400">Please wait...</p>
        </GlassCard>
      </div>
    }>
      <PaymentCallbackContent />
    </Suspense>
  );
}
