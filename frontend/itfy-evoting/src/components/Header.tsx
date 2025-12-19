import Link from 'next/link';
import React from 'react';
import { useAuth } from '../hooks/useAuth';

export default function Header() {
  const { user, logout, loading } = (() => {
    try {
      return useAuth();
    } catch {
      return { user: null, logout: async () => {}, loading: false } as any;
    }
  })();

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto p-4 flex items-center justify-between">
        <Link href="/"> 
          <span className="text-xl font-bold">ITFY E-Voting</span>
        </Link>
        <nav className="space-x-4 flex items-center">
          <Link href="/events"><span>Events</span></Link>
          {!loading && user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm">{user.name || user.email}</span>
              <button onClick={() => logout()} className="text-sm text-red-600">Sign out</button>
            </div>
          ) : (
            <Link href="/login"><span>Sign in</span></Link>
          )}
        </nav>
      </div>
    </header>
  );
}
