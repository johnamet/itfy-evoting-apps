'use client';

import React from 'react';
import { AuthProvider } from '@/hooks/useAuth';
import { ReactQueryProvider } from '@/lib/query';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ReactQueryProvider>
        {children}
      </ReactQueryProvider>
    </AuthProvider>
  );
}

export default Providers;
