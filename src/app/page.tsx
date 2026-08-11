'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/src/providers/app-provider';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useApp();

  useEffect(() => {
    router.replace(isAuthenticated ? '/dashboard' : '/login');
  }, [isAuthenticated, router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  );
}
