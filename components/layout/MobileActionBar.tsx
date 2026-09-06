'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { site } from '@/lib/site';

/**
 * Barre d'action collée en bas sur mobile : appel direct + devis.
 * Une part majeure du trafic d'une entreprise de dépannage appelle depuis un
 * téléphone — ce raccourci est le premier levier de conversion du site.
 */
export default function MobileActionBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[80] grid grid-cols-2 border-t border-paper-200 bg-white/95 backdrop-blur-xl transition-transform duration-500 ease-power lg:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <a
        href={site.phone.href}
        className="flex items-center justify-center gap-2 py-4 font-display text-sm uppercase tracking-wide text-ink-900"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-accent" fill="none" strokeWidth="1.8" aria-hidden>
          <path d="M4 5c0 8 7 15 15 15l2-3-4-2-2 2c-2-1-5-4-6-6l2-2-2-4-3 0Z" />
        </svg>
        Appeler
      </a>
      <Link
        href="/contact"
        className="flex items-center justify-center gap-2 bg-accent py-4 font-display text-sm uppercase tracking-wide text-white"
      >
        Devis gratuit
      </Link>
    </div>
  );
}
