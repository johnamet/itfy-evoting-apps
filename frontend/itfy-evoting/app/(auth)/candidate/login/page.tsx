'use client';

/**
 * Candidate Login Page
 * Candidates can login using their candidate code or email + password
 */

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Loader2, LogIn, User, Lock, Hash, ArrowLeft, Info, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { api } from '@/lib/api/client';
import { tokenManager } from '@/lib/api/client';
import { toast } from 'sonner';
import type { ApiResponse, Candidate } from '@/types';

interface CandidateLoginResponse {
  candidate: Candidate;
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
}

const codeLoginSchema = z.object({
  candidateCode: z
    .string()
    .min(1, 'Candidate code is required')
    .regex(/^CAN-[A-Z0-9]{3}-[A-Z0-9]{4}$/i, 'Invalid format (e.g., CAN-ABC-1234)'),
  password: z.string().min(1, 'Password is required'),
});

const emailLoginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  eventId: z.string().min(1, 'Event ID is required'),
});

type CodeLoginFormData = z.infer<typeof codeLoginSchema>;
type EmailLoginFormData = z.infer<typeof emailLoginSchema>;

function CandidateLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'code' | 'email'>('code');

  const eventIdFromUrl = searchParams.get('eventId');

  const codeForm = useForm<CodeLoginFormData>({
    resolver: zodResolver(codeLoginSchema),
    defaultValues: { candidateCode: '', password: '' },
  });

  const emailForm = useForm<EmailLoginFormData>({
    resolver: zodResolver(emailLoginSchema),
    defaultValues: { email: '', password: '', eventId: eventIdFromUrl || '' },
  });

  useEffect(() => {
    if (eventIdFromUrl) {
      emailForm.setValue('eventId', eventIdFromUrl);
    }
  }, [eventIdFromUrl, emailForm]);

  const handleLogin = async (identifier: string, password: string, eventId?: string) => {
    setIsLoading(true);

    try {
      const response = await api.post<ApiResponse<CandidateLoginResponse>>(
        '/auth/candidate/login',
        { identifier, password, ...(eventId && { eventId }) },
        { skipAuth: true }
      );

      if (response.success && response.data) {
        tokenManager.setCandidateToken(response.data.accessToken);

        const candidateName = response.data.candidate.first_name || 'Candidate';
        toast.success('Welcome back!', {
          description: `Hello, ${candidateName}! Redirecting to your portal...`,
          icon: <Sparkles className="h-5 w-5" />,
        });

        router.push('/candidate-portal');
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Login failed. Please try again.';
      toast.error('Login failed', { description: msg });
    } finally {
      setIsLoading(false);
    }
  };

  const onCodeSubmit = (data: CodeLoginFormData) => handleLogin(data.candidateCode.toUpperCase(), data.password);
  const onEmailSubmit = (data: EmailLoginFormData) => handleLogin(data.email, data.password, data.eventId);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden p-4">
      {/* Stunning Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-700 to-cyan-800" />
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-4.0.3&auto=format&fit=crop&w=2129&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Floating Glow Orbs */}
      <div className="absolute inset-0 -z-5">
        <div className="absolute top-10 left-20 w-80 h-80 bg-emerald-400/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-cyan-400/30 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-500/25 rounded-full blur-3xl animate-pulse delay-300" />
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-2xl shadow-2xl backdrop-blur-xl bg-white/95 border-white/20">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto mb-6 h-20 w-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-xl">
            <User className="h-10 w-10 text-white" />
          </div>
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Candidate Portal
          </CardTitle>
          <CardDescription className="text-lg mt-3">
            Access your profile, update details, and track your journey
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'code' | 'email')} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 h-14 rounded-xl bg-muted/50 p-1">
              <TabsTrigger value="code" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md text-base">
                <Hash className="mr-2 h-5 w-5" />
                Login with Code
              </TabsTrigger>
              <TabsTrigger value="email" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md text-base">
                <User className="mr-2 h-5 w-5" />
                Login with Email
              </TabsTrigger>
            </TabsList>

            {/* Code Login */}
            <TabsContent value="code" className="space-y-5">
              <div className="rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 p-5 border border-blue-200 dark:border-blue-800">
                <div className="flex gap-3">
                  <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900 dark:text-blue-200">How to find your code</p>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                      Your unique candidate code was sent to your email upon registration.<br />
                      Format: <code className="font-mono bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">CAN-ABC-1234</code>
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={codeForm.handleSubmit(onCodeSubmit)} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="candidateCode" className="text-base font-medium">Candidate Code</Label>
                  <div className="relative">
                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="candidateCode"
                      type="text"
                      placeholder="CAN-ABC-1234"
                      className="pl-12 h-12 text-base uppercase tracking-wider font-mono"
                      disabled={isLoading}
                      {...codeForm.register('candidateCode')}
                    />
                  </div>
                  {codeForm.formState.errors.candidateCode && (
                    <p className="text-sm text-red-600">{codeForm.formState.errors.candidateCode.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="codePassword" className="text-base font-medium">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="codePassword"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="pl-12 pr-12 h-12 text-base"
                      disabled={isLoading}
                      {...codeForm.register('password')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {codeForm.formState.errors.password && (
                    <p className="text-sm text-red-600">{codeForm.formState.errors.password.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-12 text-base font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <LogIn className="mr-3 h-5 w-5" />
                      Access My Portal
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>

            {/* Email Login */}
            <TabsContent value="email" className="space-y-5">
              <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base font-medium">Email Address</Label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-12 h-12 text-base"
                      disabled={isLoading}
                      {...emailForm.register('email')}
                    />
                  </div>
                  {emailForm.formState.errors.email && (
                    <p className="text-sm text-red-600">{emailForm.formState.errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="eventId" className="text-base font-medium">Event ID</Label>
                  <Input
                    id="eventId"
                    type="text"
                    placeholder="e.g., 2025-awards"
                    className="h-12 text-base"
                    disabled={isLoading || !!eventIdFromUrl}
                    {...emailForm.register('eventId')}
                  />
                  {emailForm.formState.errors.eventId && (
                    <p className="text-sm text-red-600">{emailForm.formState.errors.eventId.message}</p>
                  )}
                  {eventIdFromUrl && (
                    <p className="text-xs text-emerald-600 font-medium">
                      ✓ Event ID auto-filled from link
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emailPassword" className="text-base font-medium">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="emailPassword"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="pl-12 pr-12 h-12 text-base"
                      disabled={isLoading}
                      {...emailForm.register('password')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {emailForm.formState.errors.password && (
                    <p className="text-sm text-red-600">{emailForm.formState.errors.password.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-12 text-base font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <LogIn className="mr-3 h-5 w-5" />
                      Access My Portal
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>

        <CardFooter className="flex flex-col gap-6 pt-6 bg-gradient-to-t from-gray-50/50 to-transparent -m-6 -mb-6 pb-10 px-8">
          <div className="w-full text-center space-y-3">
            <Link href="/candidate/forgot-password" className="text-emerald-600 hover:text-emerald-500 font-medium">
              Forgot your password?
            </Link>
            <p className="text-sm text-muted-foreground">
              Are you an organizer?{' '}
              <Link href="/login" className="text-emerald-600 hover:text-emerald-500 font-medium">
                Admin login
              </Link>
            </p>
          </div>

          <Link href="/" className="w-full">
            <Button variant="outline" size="lg" className="w-full h-12 text-base border-muted-foreground/30">
              <ArrowLeft className="mr-3 h-5 w-5" />
              Back to Home
            </Button>
          </Link>
        </CardFooter>
      </Card>

      {/* Subtle branding */}
      <div className="absolute bottom-8 left-8 text-white/60 text-sm">
        © 2025 IT For Youth Ghana
      </div>
    </div>
  );
}

export default function CandidateLoginPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-600 to-teal-800">
        <div className="text-white text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4" />
          <p className="text-xl">Loading portal...</p>
        </div>
      </div>
    }>
      <CandidateLoginContent />
    </Suspense>
  );
}