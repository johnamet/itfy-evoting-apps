'use client';

/**
 * Auth Guard Components
 * Protect routes based on authentication status
 */

import { useEffect, type ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useUserAuth, useCandidateAuth } from '@/components/providers/AuthProvider';

// ==================== Types ====================

interface AuthGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
  redirectTo?: string;
}

interface RoleGuardProps extends AuthGuardProps {
  allowedRoles: string[];
}

// ==================== Loading Component ====================

function AuthLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

// ==================== User Auth Guard ====================

/**
 * Protects routes that require user (admin/organizer) authentication
 */
export function UserAuthGuard({ 
  children, 
  fallback = <AuthLoading />,
  redirectTo = '/login',
}: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading, isInitialized } = useUserAuth();

  useEffect(() => {
    if (isInitialized && !isLoading && !isAuthenticated) {
      // Store the current path for redirect after login
      const returnUrl = encodeURIComponent(pathname);
      router.push(`${redirectTo}?returnUrl=${returnUrl}`);
    }
  }, [isAuthenticated, isLoading, isInitialized, router, pathname, redirectTo]);

  // Show loading while checking auth
  if (!isInitialized || isLoading) {
    return <>{fallback}</>;
  }

  // Show children only if authenticated
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // Return fallback while redirecting
  return <>{fallback}</>;
}

// ==================== Role Guard ====================

/**
 * Protects routes based on user role
 */
export function RoleGuard({ 
  children, 
  allowedRoles,
  fallback = <AuthLoading />,
  redirectTo = '/login',
}: RoleGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, isLoading, isInitialized } = useUserAuth();

  useEffect(() => {
    if (isInitialized && !isLoading) {
      if (!isAuthenticated) {
        const returnUrl = encodeURIComponent(pathname);
        router.push(`${redirectTo}?returnUrl=${returnUrl}`);
      } else if (user && !allowedRoles.includes(user.role)) {
        // User is authenticated but doesn't have the required role
        router.push('/unauthorized');
      }
    }
  }, [isAuthenticated, isLoading, isInitialized, user, allowedRoles, router, pathname, redirectTo]);

  // Show loading while checking auth
  if (!isInitialized || isLoading) {
    return <>{fallback}</>;
  }

  // Show children only if authenticated with correct role
  if (isAuthenticated && user && allowedRoles.includes(user.role)) {
    return <>{children}</>;
  }

  // Return fallback while redirecting
  return <>{fallback}</>;
}

// ==================== Candidate Auth Guard ====================

/**
 * Protects routes that require candidate authentication
 */
export function CandidateAuthGuard({ 
  children, 
  fallback = <AuthLoading />,
  redirectTo = '/candidate/login',
}: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading, isInitialized } = useCandidateAuth();

  useEffect(() => {
    if (isInitialized && !isLoading && !isAuthenticated) {
      const returnUrl = encodeURIComponent(pathname);
      router.push(`${redirectTo}?returnUrl=${returnUrl}`);
    }
  }, [isAuthenticated, isLoading, isInitialized, router, pathname, redirectTo]);

  // Show loading while checking auth
  if (!isInitialized || isLoading) {
    return <>{fallback}</>;
  }

  // Show children only if authenticated
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // Return fallback while redirecting
  return <>{fallback}</>;
}

// ==================== Guest Guard ====================

/**
 * Protects routes that should only be accessible to non-authenticated users (e.g., login page)
 */
export function GuestGuard({ 
  children, 
  fallback = <AuthLoading />,
  redirectTo = '/admin',
}: AuthGuardProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading, isInitialized } = useUserAuth();

  useEffect(() => {
    if (isInitialized && !isLoading && isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, isInitialized, router, redirectTo]);

  // Show loading while checking auth
  if (!isInitialized || isLoading) {
    return <>{fallback}</>;
  }

  // Show children only if NOT authenticated
  if (!isAuthenticated) {
    return <>{children}</>;
  }

  // Return fallback while redirecting
  return <>{fallback}</>;
}

// ==================== Candidate Guest Guard ====================

/**
 * Protects routes that should only be accessible to non-authenticated candidates
 */
export function CandidateGuestGuard({ 
  children, 
  fallback = <AuthLoading />,
  redirectTo = '/candidate-portal',
}: AuthGuardProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading, isInitialized } = useCandidateAuth();

  useEffect(() => {
    if (isInitialized && !isLoading && isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, isInitialized, router, redirectTo]);

  // Show loading while checking auth
  if (!isInitialized || isLoading) {
    return <>{fallback}</>;
  }

  // Show children only if NOT authenticated
  if (!isAuthenticated) {
    return <>{children}</>;
  }

  // Return fallback while redirecting
  return <>{fallback}</>;
}

export default UserAuthGuard;
