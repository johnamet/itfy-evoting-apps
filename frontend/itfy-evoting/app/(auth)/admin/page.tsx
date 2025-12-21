"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { motion } from "framer-motion";
import { Loader2, ShieldAlert } from "lucide-react";
import AdminDashboard from "@/components/admin/AdminDashboard";

/**
 * Admin Page
 * Protected route for admin users only
 */
export default function AdminPage() {
  const router = useRouter();
  const { user, isUserLoading, isUserAuthenticated } = useAuthStore();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);

  // Allowed roles for admin access
  const adminRoles = useMemo(() => ['super_admin', 'admin', 'organiser'], []);

  useEffect(() => {
    const checkAuth = async () => {
      // Wait for auth state to be determined
      if (isUserLoading) return;

      // Not authenticated - redirect to login
      if (!isUserAuthenticated || !user) {
        router.push('/login?redirect=/admin');
        return;
      }

      // Check if user has admin role
      const hasAdminAccess = adminRoles.includes(user.role);
      
      if (!hasAdminAccess) {
        // User is authenticated but not authorized
        setIsAuthorized(false);
        setChecking(false);
        return;
      }

      // User is authorized
      setIsAuthorized(true);
      setChecking(false);
    };

    checkAuth();
  }, [user, isUserLoading, isUserAuthenticated, router, adminRoles]);

  // Loading state
  if (isUserLoading || checking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-xl opacity-50 animate-pulse" />
            <Loader2 className="relative w-12 h-12 text-blue-400 animate-spin" />
          </div>
          <p className="text-slate-400 text-sm font-medium">
            Verifying access...
          </p>
        </motion.div>
      </div>
    );
  }

  // Unauthorized state
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <div className="relative">
            {/* Glassmorphism card */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-3xl blur-xl" />
            <div className="relative bg-slate-900/80 backdrop-blur-xl border border-red-500/30 rounded-3xl p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center">
                <ShieldAlert className="w-8 h-8 text-red-400" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">
                Access Denied
              </h1>
              <p className="text-slate-400 mb-6">
                You don&apos;t have permission to access the admin dashboard.
                Please contact an administrator if you believe this is an error.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push('/')}
                  className="px-6 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
                >
                  Go Home
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push('/login')}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium"
                >
                  Sign In
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Authorized - render admin dashboard
  return <AdminDashboard user={user!} />;
}
