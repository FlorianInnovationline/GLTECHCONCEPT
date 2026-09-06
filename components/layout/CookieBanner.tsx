'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const KEY = 'gltc-consent';

/**
 * Bandeau de consentement (RGPD — entreprise belge).
 * Aucun script tiers n'est chargé tant que le consentement n'est pas donné :
 * l'état est simplement stocké et lisible via `window.__gltcConsent`.
 */
export default function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(KEY);
    if (!stored) {
      const t = setTimeout(() => setOpen(true), 1400);
      return () => clearTimeout(t);
    }
    (window as any).__gltcConsent = stored;
  }, []);

  const decide = (value: 'all' | 'essential') => {
    localStorage.setItem(KEY, value);
    (window as any).__gltcConsent = value;
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-label="Gestion des cookies"
      className="fixed inset-x-3 bottom-3 z-[90] mx-auto max-w-3xl animate-[floaty_0.001s] lg:inset-x-6 lg:bottom-6"
    >
      <div className="card relative rounded-lg p-5 shadow-2xl lg:flex lg:items-center lg:gap-6 lg:p-6">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
        <div className="flex-1">
          <p className="font-display text-sm uppercase tracking-wide text-ink-900">Cookies</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-600">
            Nous utilisons des cookies pour assurer le bon fonctionnement du site et, avec votre accord,
            mesurer son audience et personnaliser les contenus publicitaires. Vous restez libre de
            refuser les cookies non essentiels.{' '}
            <Link href="/politique-cookies" className="link-underline text-accent">
              En savoir plus
            </Link>
          </p>
        </div>
        <div className="mt-4 flex shrink-0 gap-3 lg:mt-0">
          <button
            onClick={() => decide('essential')}
            className="border border-paper-300 px-4 py-2.5 font-display text-xs uppercase tracking-wide text-ink-700 transition hover:border-ink-400"
          >
            Refuser
          </button>
          <button
            onClick={() => decide('all')}
            className="bg-accent px-5 py-2.5 font-display text-xs uppercase tracking-wide text-white transition hover:bg-accent-deep"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
