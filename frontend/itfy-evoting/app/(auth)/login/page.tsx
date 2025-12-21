'use client';

/**
 * Admin/Organizer Login Page
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Loader2, LogIn, Mail, Lock } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useUserAuth } from '@/components/providers/AuthProvider';
import { toast } from 'sonner';

// ==================== Validation Schema ====================

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

// ==================== Component ====================

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, error, clearError } = useUserAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    clearError();

    const result = await login(data);

    if (result.success) {
      toast.success('Login successful', {
        description: 'Welcome back! Redirecting to dashboard...',
      });
      router.push('/admin');
    } else {
      toast.error('Login failed', {
        description: result.error || 'Invalid email or password. Please try again.',
      });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Stunning Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900" />
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1516201580490-33550d32de5c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Floating Particles Effect (optional subtle animation) */}
      <div className="absolute inset-0 -z-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-md shadow-2xl backdrop-blur-xl bg-white/95 border-white/20">
        <CardHeader className="space-y-1 text-center pb-8">
          <div className="mx-auto mb-6 h-20 w-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
            <LogIn className="h-10 w-10 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Admin Portal
          </CardTitle>
          <CardDescription className="text-base">
            Enter your credentials to access the admin dashboard
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-5">
            {/* Global Error */}
            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700">
                <p className="font-medium">Login Error</p>
                <p>{error}</p>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-medium">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@itforyouthghana.org"
                  className="pl-12 h-12 text-base border-muted focus:border-indigo-500 transition-colors"
                  disabled={isLoading || isSubmitting}
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-base font-medium">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
                >
                  Forgot password?
                </Link>
              </div>
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
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-6 pt-4">
            <Button
              type="submit"
              size="lg"
              className="w-full h-12 text-base font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg"
              disabled={isLoading || isSubmitting}
            >
              {(isLoading || isSubmitting) ? (
                <>
                  <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="mr-3 h-5 w-5" />
                  Sign In to Dashboard
                </>
              )}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Not an admin?{' '}
              <Link href="/candidate/login" className="text-indigo-600 hover:text-indigo-500 font-medium">
                Candidate login
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>

      {/* Subtle branding in corner */}
      <div className="absolute bottom-6 left-6 text-white/60 text-sm">
        © 2025 IT For Youth Ghana
      </div>
    </div>
  );
}