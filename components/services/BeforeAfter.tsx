'use client';

import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';

import SectionHeading from '@/components/ui/SectionHeading';

/**
 * Comparateur avant/après. Utilisable à la souris, au doigt et au clavier
 * (flèches gauche/droite sur la poignée).
 */
export default function BeforeAfter({
  before = '/media/sections/avant-travaux.jpg',
  after = '/media/sections/apres-travaux.jpg',
  beforeAlt = 'Salle de bain avant rénovation',
  afterAlt = 'Salle de bain après rénovation par GL TECH CONCEPT',
}: {
  before?: string;
  after?: string;
  beforeAlt?: string;
  afterAlt?: string;
}) {
  const [pos, setPos] = useState(50);
  const wrap = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = wrap.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  return (
    <section className="relative py-section">
      <div className="shell">
        <SectionHeading
          eyebrow="Avant / après"
          title="La même pièce, deux semaines plus tard"
          intro="Déplacez la poignée pour comparer. ⚠️ Visuels de démonstration — à remplacer par un vrai chantier photographié avant et après."
        />

        <div
          ref={wrap}
          className="relative mt-14 aspect-[16/10] w-full select-none overflow-hidden border border-paper-200"
          onMouseDown={(e) => {
            dragging.current = true;
            setFromClientX(e.clientX);
          }}
          onMouseMove={(e) => dragging.current && setFromClientX(e.clientX)}
          onMouseUp={() => (dragging.current = false)}
          onMouseLeave={() => (dragging.current = false)}
          onTouchStart={(e) => setFromClientX(e.touches[0].clientX)}
          onTouchMove={(e) => setFromClientX(e.touches[0].clientX)}
        >
          <div className="photo-wrap absolute inset-0" data-accent="blue">
            <Image src={after} alt={afterAlt} fill sizes="100vw" className="photo object-cover" />
          </div>

          {/* Le calque « avant » couvre tout le cadre et n'est que rogné :
              les deux images restent ainsi parfaitement superposées, quelle que
              soit la largeur du conteneur. */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          >
            <div className="photo-wrap absolute inset-0" data-accent="green">
              <Image src={before} alt={beforeAlt} fill sizes="100vw" className="photo object-cover" />
            </div>
            <span className="absolute left-5 top-5 border border-paper-300 bg-white/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-900 backdrop-blur">
              Avant
            </span>
          </div>

          <span className="absolute right-5 top-5 border border-paper-300 bg-white/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-900 backdrop-blur">
            Après
          </span>

          {/* Poignée */}
          <div className="absolute inset-y-0 w-px bg-accent" style={{ left: `${pos}%` }}>
            <input
              type="range"
              min={0}
              max={100}
              value={pos}
              onChange={(e) => setPos(Number(e.target.value))}
              aria-label="Comparer avant et après"
              className="absolute left-1/2 top-1/2 h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize opacity-0"
            />
            <span className="pointer-events-none absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-accent bg-white/85 backdrop-blur">
              <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-accent-var" fill="none" strokeWidth="1.6" aria-hidden>
                <path d="M9 6 4 12l5 6M15 6l5 6-5 6" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
