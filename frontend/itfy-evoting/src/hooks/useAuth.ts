import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../../types';
import { authApi, tokenManager } from '../lib/api';

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  setUser: (u: User | null) => void;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Hydrate user on mount if token exists
  useEffect(() => {
    let mounted = true;

    async function hydrate() {
      try {
        const access = tokenManager.getAccessToken();
        if (!access) {
          if (mounted) setLoading(false);
          return;
        }

        const resp = await authApi.getCurrentUser();
        if (resp?.data && mounted) {
          setUser(resp.data);
        }
      } catch (err) {
        // If token invalid, clear tokens
        tokenManager.clearUserTokens();
        setUser(null);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    hydrate();

    // Listen for global logout events (from api client)
    function onLogout() {
      setUser(null);
      tokenManager.clearUserTokens();
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('auth:logout', onLogout as EventListener);
    }

    return () => {
      mounted = false;
      if (typeof window !== 'undefined') {
        window.removeEventListener('auth:logout', onLogout as EventListener);
      }
    };
  }, []);

  async function logout() {
    try {
      await authApi.logout();
    } catch (err) {
      // ignore network errors, but clear tokens locally
    } finally {
      tokenManager.clearUserTokens();
      setUser(null);
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
  }

  async function refreshUser() {
    try {
      const resp = await authApi.getCurrentUser();
      if (resp?.data) setUser(resp.data);
    } catch (err) {
      setUser(null);
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, setUser, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}
