'use client';

/**
 * Candidate Forgot Password Page
 */

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Mail, ArrowLeft, KeyRound, CheckCircle, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/lib/api/client';
import { toast } from 'sonner';
import type { ApiResponse } from '@/types';

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function CandidateForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);

    try {
      const response = await api.post<ApiResponse<{ message: string }>>(
        '/auth/candidate/forgot-password',
        data,
        { skipAuth: true }
      );

      setSubmittedEmail(data.email);
      setIsSubmitted(true);
      toast.success('Email sent!', {
        description: response.message || 'Password reset link sent successfully.',
        icon: <Sparkles className="h-5 w-5" />,
      });
    } catch (error) {
      // Security best practice: always show success to prevent email enumeration
      setSubmittedEmail(data.email);
      setIsSubmitted(true);
      toast.success('Request received', {
        description: 'If an account exists, a reset link has been sent.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Success State
  if (isSubmitted) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden p-4">
        {/* Soft Blue Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800" />
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1557682250-33bd709cbe1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2129&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Subtle Glow Orbs */}
        <div className="absolute inset-0 -z-5">
          <div className="absolute top-20 left-20 w-80 h-80 bg-blue-400/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-400/30 rounded-full blur-3xl animate-pulse delay-700" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/25 rounded-full blur-3xl animate-pulse delay-300" />
        </div>

        <Card className="w-full max-w-md shadow-2xl backdrop-blur-xl bg-white/95 border-white/20">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto mb-6 h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-xl">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Check Your Inbox
            </CardTitle>
            <CardDescription className="text-lg mt-4">
              We&apos;ve sent a password reset link to:
            </CardDescription>
            <p className="text-xl font-semibold mt-2">{submittedEmail}</p>
          </CardHeader>

          <CardContent className="space-y-5 text-center">
            <p className="text-muted-foreground">
              Click the link in the email to create a new password.<br />
              If you don&apos;t see it, please check your spam folder.
            </p>
          </CardContent>

          <CardFooter className="flex flex-col gap-5 pt-6">
            <Button
              variant="outline"
              size="lg"
              className="w-full h-12 text-base border-blue-300 hover:bg-blue-50"
              onClick={() => {
                setIsSubmitted(false);
                setSubmittedEmail('');
              }}
            >
              Try another email
            </Button>

            <Link href="/candidate/login" className="w-full">
              <Button variant="ghost" size="lg" className="w-full h-12 text-base">
                <ArrowLeft className="mr-3 h-5 w-5" />
                Back to Login
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <div className="absolute bottom-8 left-8 text-white/60 text-sm">
          © 2025 IT For Youth Ghana
        </div>
      </div>
    );
  }

  // Initial Form State
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden p-4">
      {/* Elegant Blue Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800" />
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1557682250-33bd709cbe1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2129&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Soft Glow Orbs */}
      <div className="absolute inset-0 -z-5">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-400/30 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/25 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Form Card */}
      <Card className="w-full max-w-md shadow-2xl backdrop-blur-xl bg-white/95 border-white/20">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto mb-6 h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-xl">
            <KeyRound className="h-10 w-10 text-white" />
          </div>
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Forgot Password?
          </CardTitle>
          <CardDescription className="text-lg mt-4">
            No worries — we&apos;ll send you a link to reset it
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-medium">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-12 h-12 text-base border-muted focus:border-blue-500 transition-colors"
                  disabled={isLoading}
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-6 pt-6">
            <Button
              type="submit"
              size="lg"
              className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                  Sending Link...
                </>
              ) : (
                <>
                  <Mail className="mr-3 h-5 w-5" />
                  Send Reset Link
                </>
              )}
            </Button>

            <Link href="/candidate/login" className="w-full">
              <Button variant="ghost" size="lg" className="w-full h-12 text-base">
                <ArrowLeft className="mr-3 h-5 w-5" />
                Back to Login
              </Button>
            </Link>
          </CardFooter>
        </form>
      </Card>

      <div className="absolute bottom-8 left-8 text-white/60 text-sm">
        © 2025 IT For Youth Ghana
      </div>
    </div>
  );
}