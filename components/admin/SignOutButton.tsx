'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { createClient } from '@/lib/supabase/client';
import { isSupabaseConfigured } from '@/lib/supabase/env';

export default function SignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const signOut = async () => {
    if (!isSupabaseConfigured) return;
    setLoading(true);
    await createClient().auth.signOut();
    router.replace('/admin/login');
    router.refresh();
  };

  return (
    <button
      onClick={signOut}
      disabled={loading || !isSupabaseConfigured}
      className="border border-paper-300 px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:border-accent hover:text-accent disabled:opacity-50"
    >
      {loading ? '…' : 'Déconnexion'}
    </button>
  );
}
