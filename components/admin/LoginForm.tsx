'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { createClient } from '@/lib/supabase/client';
import { isSupabaseConfigured } from '@/lib/supabase/env';
import { site } from '@/lib/site';

/**
 * Connexion à l'espace d'administration (Supabase Auth, e-mail + mot de passe).
 * Les comptes sont créés depuis le tableau de bord Supabase : aucune inscription
 * n'est ouverte depuis le site.
 */
export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get('suivant') || '/admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isSupabaseConfigured) {
      setError('Supabase n’est pas encore configuré sur cet environnement.');
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) {
        setError(
          authError.message === 'Invalid login credentials'
            ? 'Identifiants incorrects.'
            : authError.message
        );
        return;
      }
      router.replace(next);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Connexion impossible.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <Link href="/" className="mb-8 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center bg-accent">
          <svg viewBox="0 0 32 32" className="h-5 w-5" fill="none" aria-hidden>
            <path
              d="M16 4c1 5-4.5 6.5-4.5 11.5A4.5 4.5 0 0 0 16 20a4.5 4.5 0 0 0 4.5-4.5c0-2-.8-3.4-1.6-4.8C22.8 13 25 16.6 25 20.5A9 9 0 0 1 7 20.5C7 12 16 10.5 16 4Z"
              fill="#fff"
            />
          </svg>
        </span>
        <span className="font-display text-[15px] font-semibold text-ink-900">GL Tech Concept</span>
      </Link>

      <div className="border border-paper-200 bg-white p-8 shadow-card">
        <h1 className="font-display text-xl font-semibold">Espace d’administration</h1>
        <p className="mt-2 text-sm text-ink-500">Connectez-vous pour accéder au tableau de bord.</p>

        {!isSupabaseConfigured && (
          <p className="mt-6 border-l-2 border-danger-500 bg-danger-50 px-4 py-3 text-sm text-ink-700">
            Supabase n’est pas configuré sur cet environnement. Renseignez{' '}
            <code className="font-mono text-xs">NEXT_PUBLIC_SUPABASE_URL</code> et{' '}
            <code className="font-mono text-xs">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> (voir le README).
          </p>
        )}

        <form onSubmit={onSubmit} className="mt-7 space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.16em] text-ink-400">
              Adresse e-mail
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-paper-300 bg-white px-4 py-3 text-ink-900 outline-none transition-colors focus:border-accent"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.16em] text-ink-400">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-paper-300 bg-white px-4 py-3 text-ink-900 outline-none transition-colors focus:border-accent"
            />
          </div>

          {error && (
            <p role="alert" className="border-l-2 border-danger-500 bg-danger-50 px-4 py-3 text-sm text-ink-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-accent-deep disabled:opacity-60"
          >
            {loading ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>

        <p className="mt-6 text-xs leading-relaxed text-ink-400">
          Mot de passe oublié ? Contactez l’administrateur du site. Les comptes sont gérés depuis
          Supabase — aucune inscription n’est ouverte ici.
        </p>
      </div>

      <p className="mt-6 text-center text-xs text-ink-400">
        <Link href="/" className="transition-colors hover:text-accent">
          ← Retour au site
        </Link>
        <span className="mx-2">·</span>
        {site.legalName}
      </p>
    </div>
  );
}
