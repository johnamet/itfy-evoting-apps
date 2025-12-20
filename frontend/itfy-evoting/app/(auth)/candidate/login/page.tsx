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
import { Eye, EyeOff, Loader2, LogIn, User, Lock, Hash, ArrowLeft, Info } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { api } from '@/lib/api/client';
import { tokenManager } from '@/lib/api/client';
import { toast } from 'sonner';
import type { ApiResponse, Candidate } from '@/types';

// ==================== Types ====================

interface CandidateLoginResponse {
  candidate: Candidate;
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
}

// ==================== Validation Schemas ====================

const codeLoginSchema = z.object({
  candidateCode: z
    .string()
    .min(1, 'Candidate code is required')
    .regex(/^CAN-[A-Z0-9]{3}-[A-Z0-9]{4}$/i, 'Invalid candidate code format (e.g., CAN-ABC-1234)'),
  password: z
    .string()
    .min(1, 'Password is required'),
});

const emailLoginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required'),
  eventId: z
    .string()
    .min(1, 'Event ID is required'),
});

type CodeLoginFormData = z.infer<typeof codeLoginSchema>;
type EmailLoginFormData = z.infer<typeof emailLoginSchema>;

// ==================== Component ====================

function CandidateLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'code' | 'email'>('code');

  // Get eventId from URL if present
  const eventIdFromUrl = searchParams.get('eventId');

  // Code login form
  const codeForm = useForm<CodeLoginFormData>({
    resolver: zodResolver(codeLoginSchema),
    defaultValues: {
      candidateCode: '',
      password: '',
    },
  });

  // Email login form
  const emailForm = useForm<EmailLoginFormData>({
    resolver: zodResolver(emailLoginSchema),
    defaultValues: {
      email: '',
      password: '',
      eventId: eventIdFromUrl || '',
    },
  });

  // Update eventId when URL changes
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
        {
          identifier,
          password,
          ...(eventId && { eventId }),
        },
        { skipAuth: true }
      );

      if (response.success && response.data) {
        // Store tokens
        tokenManager.setCandidateToken(response.data.accessToken);

        const candidateName = response.data.candidate.first_name || 'Candidate';
        toast.success('Login successful', {
          description: `Welcome back, ${candidateName}!`,
        });

        // Redirect to candidate portal
        router.push('/candidate-portal');
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed. Please try again.';
      toast.error('Login failed', {
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onCodeSubmit = async (data: CodeLoginFormData) => {
    await handleLogin(data.candidateCode.toUpperCase(), data.password);
  };

  const onEmailSubmit = async (data: EmailLoginFormData) => {
    await handleLogin(data.email, data.password, data.eventId);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Candidate Login</CardTitle>
          <CardDescription>
            Access your candidate portal to manage your profile
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'code' | 'email')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="code">
                <Hash className="mr-2 h-4 w-4" />
                Code
              </TabsTrigger>
              <TabsTrigger value="email">
                <User className="mr-2 h-4 w-4" />
                Email
              </TabsTrigger>
            </TabsList>

            {/* Code Login Tab */}
            <TabsContent value="code" className="space-y-4 mt-4">
              <form onSubmit={codeForm.handleSubmit(onCodeSubmit)} className="space-y-4">
                {/* Info Box */}
                <div className="rounded-md bg-blue-50 dark:bg-blue-950/30 p-3 flex gap-2">
                  <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    Your candidate code was sent to you via email when you were registered (e.g., CAN-ABC-1234)
                  </p>
                </div>

                {/* Candidate Code Field */}
                <div className="space-y-2">
                  <Label htmlFor="candidateCode">Candidate Code</Label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="candidateCode"
                      type="text"
                      placeholder="CAN-ABC-1234"
                      className="pl-10 uppercase"
                      disabled={isLoading}
                      {...codeForm.register('candidateCode')}
                    />
                  </div>
                  {codeForm.formState.errors.candidateCode && (
                    <p className="text-sm text-destructive">
                      {codeForm.formState.errors.candidateCode.message}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="codePassword">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="codePassword"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      className="pl-10 pr-10"
                      disabled={isLoading}
                      {...codeForm.register('password')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {codeForm.formState.errors.password && (
                    <p className="text-sm text-destructive">
                      {codeForm.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <LogIn className="mr-2 h-4 w-4" />
                      Sign in
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>

            {/* Email Login Tab */}
            <TabsContent value="email" className="space-y-4 mt-4">
              <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-4">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="candidate@example.com"
                      className="pl-10"
                      disabled={isLoading}
                      {...emailForm.register('email')}
                    />
                  </div>
                  {emailForm.formState.errors.email && (
                    <p className="text-sm text-destructive">
                      {emailForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                {/* Event ID Field */}
                <div className="space-y-2">
                  <Label htmlFor="eventId">Event ID</Label>
                  <Input
                    id="eventId"
                    type="text"
                    placeholder="Event ID"
                    disabled={isLoading || !!eventIdFromUrl}
                    {...emailForm.register('eventId')}
                  />
                  {emailForm.formState.errors.eventId && (
                    <p className="text-sm text-destructive">
                      {emailForm.formState.errors.eventId.message}
                    </p>
                  )}
                  {eventIdFromUrl && (
                    <p className="text-xs text-muted-foreground">
                      Event ID pre-filled from URL
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="emailPassword">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="emailPassword"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      className="pl-10 pr-10"
                      disabled={isLoading}
                      {...emailForm.register('password')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {emailForm.formState.errors.password && (
                    <p className="text-sm text-destructive">
                      {emailForm.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <LogIn className="mr-2 h-4 w-4" />
                      Sign in
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <Link href="/candidate/forgot-password" className="text-sm text-primary hover:underline">
            Forgot your password?
          </Link>

          <div className="w-full border-t pt-4">
            <div className="text-center text-sm text-muted-foreground">
              Are you an admin?{' '}
              <Link href="/login" className="text-primary hover:underline">
                Login here
              </Link>
            </div>
          </div>

          <Link href="/" className="w-full">
            <Button variant="ghost" className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default function CandidateLoginPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center p-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <CandidateLoginContent />
    </Suspense>
  );
}
