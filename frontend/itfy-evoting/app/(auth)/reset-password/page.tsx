'use client';

/**
 * Reset Password Page
 * Set a new secure password
 */

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Loader2, Lock, ArrowLeft, KeyRound, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useUserAuth } from '@/components/providers/AuthProvider';
import { toast } from 'sonner';

const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Must include uppercase, lowercase, number, and special character'
    ),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { resetPassword, isLoading } = useUserAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const tokenParam = searchParams.get('token');
    setToken(tokenParam);
  }, [searchParams]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      toast.error('Invalid link', { description: 'Please request a new reset link.' });
      return;
    }

    const result = await resetPassword({ token, password: data.password });

    if (result.success) {
      setIsSuccess(true);
      toast.success('Password updated!', {
        description: result.message || 'You can now log in with your new password.',
        icon: <Sparkles className="h-5 w-5" />,
      });
    } else {
      toast.error('Reset failed', {
        description: result.error || 'Something went wrong. Please try again.',
      });
    }
  };

  // Invalid Token State
  if (!token) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden p-4">
        {/* Premium Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900" />
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1557682250-33bd709cbe1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2129&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Glow Orbs */}
        <div className="absolute inset-0 -z-5">
          <div className="absolute top-20 left-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-700" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-300" />
        </div>

        <Card className="w-full max-w-md shadow-2xl backdrop-blur-xl bg-white/95 border-white/20">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto mb-6 h-20 w-20 rounded-2xl bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center shadow-xl">
              <AlertCircle className="h-10 w-10 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
              Invalid Link
            </CardTitle>
            <CardDescription className="text-lg mt-4">
              This password reset link is invalid or has expired.
            </CardDescription>
          </CardHeader>

          <CardFooter className="flex flex-col gap-5 pt-6">
            <Link href="/forgot-password" className="w-full">
              <Button size="lg" className="w-full h-12 text-base bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                Request New Link
              </Button>
            </Link>

            <Link href="/login" className="w-full">
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

  // Success State
  if (isSuccess) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden p-4">
        {/* Success Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 via-teal-900 to-cyan-900" />
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-4.0.3&auto=format&fit=crop&w=2129&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Celebration Glow */}
        <div className="absolute inset-0 -z-5">
          <div className="absolute top-20 left-20 w-80 h-80 bg-emerald-400/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-400/30 rounded-full blur-3xl animate-pulse delay-700" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-500/25 rounded-full blur-3xl animate-pulse delay-300" />
        </div>

        <Card className="w-full max-w-md shadow-2xl backdrop-blur-xl bg-white/95 border-white/20">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto mb-6 h-20 w-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-xl">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Password Updated!
            </CardTitle>
            <CardDescription className="text-lg mt-4">
              Your account is now secured with a new password.
            </CardDescription>
          </CardHeader>

          <CardContent className="text-center">
            <p className="text-muted-foreground">
              You can now sign in with your new credentials.
            </p>
          </CardContent>

          <CardFooter className="pt-6">
            <Button
              size="lg"
              className="w-full h-12 text-base font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg"
              onClick={() => router.push('/login')}
            >
              Go to Login
            </Button>
          </CardFooter>
        </Card>

        <div className="absolute bottom-8 left-8 text-white/60 text-sm">
          © 2025 IT For Youth Ghana
        </div>
      </div>
    );
  }

  // Main Form State
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden p-4">
      {/* Premium Indigo Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900" />
        <div 
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1557682257-2f4c2e0a3c2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2134&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Elegant Glow Orbs */}
      <div className="absolute inset-0 -z-5">
        <div className="absolute top-10 left-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <Card className="w-full max-w-md shadow-2xl backdrop-blur-xl bg-white/95 border-white/20">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto mb-6 h-20 w-20 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-xl">
            <KeyRound className="h-10 w-10 text-white" />
          </div>
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Set New Password
          </CardTitle>
          <CardDescription className="text-lg mt-4">
            Create a strong password to secure your account
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            {/* New Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-base font-medium">New Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="pl-12 pr-12 h-12 text-base border-muted focus:border-indigo-500 transition-colors"
                  disabled={isLoading || isSubmitting}
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-base font-medium">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="pl-12 pr-12 h-12 text-base border-muted focus:border-indigo-500 transition-colors"
                  disabled={isLoading || isSubmitting}
                  {...register('confirmPassword')}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Password Requirements */}
            <div className="rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 p-5 border border-indigo-200 dark:border-indigo-800">
              <p className="text-sm font-medium text-indigo-900 dark:text-indigo-200 mb-3">Password must include:</p>
              <ul className="text-sm text-indigo-800 dark:text-indigo-300 space-y-1.5">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  At least 8 characters
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  One uppercase & one lowercase letter
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  One number
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  One special character (@$!%*?&)
                </li>
              </ul>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-6 pt-6">
            <Button
              type="submit"
              size="lg"
              className="w-full h-12 text-base font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg"
              disabled={isLoading || isSubmitting}
            >
              {(isLoading || isSubmitting) ? (
                <>
                  <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                  Updating Password...
                </>
              ) : (
                <>
                  <KeyRound className="mr-3 h-5 w-5" />
                  Set New Password
                </>
              )}
            </Button>

            <Link href="/login" className="w-full">
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

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-900">
        <div className="text-white text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4" />
          <p className="text-xl">Preparing secure reset...</p>
        </div>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}