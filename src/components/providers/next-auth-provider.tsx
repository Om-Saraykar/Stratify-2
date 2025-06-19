// src/components/providers/next-auth-provider.tsx
'use client'; // This directive is CRUCIAL

import { SessionProvider } from 'next-auth/react';
import React from 'react';

interface NextAuthProviderProps {
  children: React.ReactNode;
}

export default function NextAuthProvider({ children }: NextAuthProviderProps) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}