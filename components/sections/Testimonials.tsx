'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import SectionHeading from '@/components/ui/SectionHeading';

/**
 * ⚠️ CONTENU À REMPLACER — le site actuel ne comporte aucun avis client.
 * Récupérer les avis Google Business / Facebook et remplacer ce tableau ;
 * la structure des champs ne change pas.
 */
const testimonials = [
  {
    quote:
      '[TEMOIGNAGE À REMPLACER] Remplacement complet de notre chaudière par une pompe à chaleur air/eau. Devis clair, chantier propre, délai tenu.',
    author: '[Prénom N.]',
    city: '[Commune]',
    service: 'Pompe à chaleur',
  },
  {
    quote:
      '[TEMOIGNAGE À REMPLACER] Salle de bain entièrement rénovée, adaptée pour ma maman à mobilité réduite. Un seul interlocuteur du début à la fin.',
    author: '[Prénom N.]',
    city: '[Commune]',
    service: 'Rénovation de salle de bain',
  },
  {
    quote:
      '[TEMOIGNAGE À REMPLACER] Panne de chaudière un vendredi soir en plein hiver. Intervention rapide et explication claire du problème.',
    author: '[Prénom N.]',
    city: '[Commune]',
    service: 'Dépannage chauffage',
  },
];

export default function Testimonials() {
  const [i, setI] = useState(0);
  const t = testimonials[i];

  return (
    <section className="py-section">
      <div className="shell">
        <SectionHeading eyebrow="Ils nous ont fait confiance" title="Ce que disent nos clients" align="center" />

        <div className="mx-auto mt-12 max-w-3xl text-center">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-balance font-display text-[clamp(1.15rem,2vw,1.6rem)] font-medium leading-snug text-ink-900">
                « {t.quote} »
              </p>
              <footer className="mt-6 text-sm text-ink-400">
                {t.author} — {t.city} · <span className="text-accent">{t.service}</span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>

          <div className="mt-9 flex items-center justify-center gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Témoignage ${idx + 1}`}
                aria-current={idx === i}
                className={`h-px transition-all duration-500 ease-power ${
                  idx === i ? 'w-12 bg-accent' : 'w-6 bg-paper-300 hover:bg-ink-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
