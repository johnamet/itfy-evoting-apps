"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '../../../lib/api';
import { useAuth } from '../../../hooks/useAuth';

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const resp = await authApi.login({ email, password });
      if (resp?.data?.user) {
        setUser(resp.data.user);
        router.replace('/');
      }
    } catch (err: any) {
      setError(err?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="container mx-auto p-6 max-w-md">
      <h1 className="text-2xl font-bold">Sign in</h1>
      <p className="mt-2 text-sm text-gray-600">Login with your event account.</p>
      <form onSubmit={onSubmit} className="mt-4 space-y-3">
        {error && <div className="text-sm text-red-600">{error}</div>}
        <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded" placeholder="Email" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded" placeholder="Password" type="password" />
        <button disabled={loading} className="w-full bg-blue-600 text-white p-2 rounded">{loading ? 'Signing in...' : 'Sign in'}</button>
      </form>
    </section>
  );
}
