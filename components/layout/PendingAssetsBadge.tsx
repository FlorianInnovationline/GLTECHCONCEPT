'use client';

import { useState } from 'react';
import { site } from '@/lib/site';

/**
 * Pastille visible UNIQUEMENT en développement : rappelle ce qui doit encore
 * être fourni par le client avant la mise en ligne. Elle n'est jamais rendue
 * dans le build de production.
 */
export default function PendingAssetsBadge() {
  const [open, setOpen] = useState(false);
  if (process.env.NODE_ENV === 'production') return null;

  const items = [
    !site.emailConfirmed && 'Adresse e-mail exacte (placeholder actuel)',
    !site.hoursConfirmed && 'Horaires d’ouverture',
    'Photos et vidéos réelles de chantier (visuels actuels générés)',
    'Logo vectoriel',
    'Témoignages / avis Google',
    'Montants des primes régionales à citer',
    'Liens Facebook & TrustUp exacts',
  ].filter(Boolean) as string[];

  return (
    <div className="fixed bottom-4 right-4 z-[95] hidden lg:block">
      {open && (
        <div className="mb-3 w-80 border border-accent/40 bg-white/95 p-4 text-xs leading-relaxed text-ink-700 shadow-2xl backdrop-blur">
          <p className="mb-2 font-display text-[11px] uppercase tracking-widest text-accent">
            À fournir par le client
          </p>
          <ul className="space-y-1.5">
            {items.map((i) => (
              <li key={i} className="flex gap-2">
                <span className="text-accent">—</span>
                <span>{i}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 items-center gap-2 border border-accent/40 bg-white/92 px-3 font-mono text-[10px] uppercase tracking-widest text-accent backdrop-blur"
      >
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
        DEV · {items.length} à fournir
      </button>
    </div>
  );
}
