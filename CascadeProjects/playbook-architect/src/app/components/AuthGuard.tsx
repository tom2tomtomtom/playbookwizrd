'use client';

import { useRouter, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import supabase from '../../lib/supabaseClient';

interface Props {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: Props) {
  // Skip auth entirely in prototype mode
  const bypass = process.env.NEXT_PUBLIC_BYPASS_AUTH?.trim().toLowerCase() === 'true';
  if (bypass) {
    return <>{children}</>;
  }

  const router = useRouter();
  const pathname = usePathname();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess);
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Allow the /auth route itself without session
  if (pathname?.startsWith('/auth')) return <>{children}</>;

  useEffect(() => {
    if (!loading && !session && !pathname?.startsWith('/auth')) {
      router.replace('/auth');
    }
  }, [loading, session, pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <span>Loading session…</span>
      </div>
    );
  }

  if (!session) {
    // While redirecting, render nothing to prevent visual flash
    return null;
  }

  return <>{children}</>;
}
