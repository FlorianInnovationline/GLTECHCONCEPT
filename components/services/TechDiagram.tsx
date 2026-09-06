'use client';

import { useEffect, useRef } from 'react';
import Reveal from '@/components/ui/Reveal';

type Variant = 'pac' | 'vmc' | 'elec';

/**
 * Schéma technique animé : les tracés se dessinent au défilement.
 * C'est le « moment de surprise » du site — expliquer visuellement comment
 * fonctionne une PAC ou une VMC, ce qu'aucun concurrent local ne fait.
 */
const content: Record<Variant, { title: string; legend: { n: string; label: string; text: string }[] }> = {
  pac: {
    title: 'Comment fonctionne une pompe à chaleur air/eau',
    legend: [
      { n: '01', label: 'Captage', text: 'L’unité extérieure prélève les calories présentes dans l’air, même par temps froid.' },
      { n: '02', label: 'Compression', text: 'Le fluide frigorigène est comprimé : sa température monte fortement.' },
      { n: '03', label: 'Échange', text: 'La chaleur est transférée au circuit d’eau du chauffage et du sanitaire.' },
      { n: '04', label: 'Diffusion', text: 'Radiateurs basse température ou plancher chauffant diffusent la chaleur.' },
    ],
  },
  vmc: {
    title: 'Ventilation double flux : l’air se renouvelle, la chaleur reste',
    legend: [
      { n: '01', label: 'Extraction', text: 'L’air vicié est extrait des pièces humides : cuisine, salle de bain, WC.' },
      { n: '02', label: 'Récupération', text: 'Dans l’échangeur, il cède sa chaleur à l’air neuf sans se mélanger à lui.' },
      { n: '03', label: 'Filtration', text: 'L’air entrant est filtré avant d’être distribué.' },
      { n: '04', label: 'Insufflation', text: 'L’air neuf tempéré est soufflé dans les chambres et le séjour.' },
    ],
  },
  elec: {
    title: 'Du compteur à la prise : une installation lisible',
    legend: [
      { n: '01', label: 'Compteur', text: 'Point de livraison et protection générale de l’installation.' },
      { n: '02', label: 'Tableau', text: 'Différentiels et disjoncteurs, repérés et documentés circuit par circuit.' },
      { n: '03', label: 'Circuits', text: 'Éclairage, prises, cuisson, borne de recharge : chaque usage sur son départ.' },
      { n: '04', label: 'Pilotage', text: 'La domotique se greffe sur cette base pour commander éclairage et chauffage.' },
    ],
  },
};

const paths: Record<Variant, { d: string; len: number; dash?: boolean }[]> = {
  pac: [
    { d: 'M60 200 h90 v-90 h90', len: 300 },
    { d: 'M240 110 h120 a40 40 0 0 1 0 80 h-120', len: 340 },
    { d: 'M240 190 h-40 v90 h300', len: 440 },
    { d: 'M500 280 v-60 h120', len: 200 },
    { d: 'M620 220 v120 h-560', len: 700, dash: true },
  ],
  vmc: [
    { d: 'M60 120 h180 l40 40 h120', len: 400 },
    { d: 'M400 160 h60 a30 30 0 0 1 0 60 h-60', len: 240 },
    { d: 'M400 220 l-40 40 h-180 v-60', len: 340 },
    { d: 'M460 190 h160 v130 h-560 v-70', len: 800, dash: true },
  ],
  elec: [
    { d: 'M60 90 v70 h120', len: 200 },
    { d: 'M180 90 h100 v210 h-100 z', len: 620 },
    { d: 'M280 130 h160 M280 190 h220 M280 250 h120', len: 500 },
    { d: 'M440 130 v190 h180 v-60', len: 440, dash: true },
  ],
};

export default function TechDiagram({ variant }: { variant: Variant }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        el.querySelectorAll<SVGPathElement>('.draw-path').forEach((p, i) => {
          p.style.animationDelay = `${i * 0.28}s`;
          p.classList.add('is-drawn');
        });
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const data = content[variant];

  return (
    <section className="relative border-y border-paper-200 bg-paper-50 py-section">
      <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow eyebrow-dot">Schéma de principe</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-6 max-w-xl text-display-sm">{data.title}</h2>
          </Reveal>

          <div className="mt-10 overflow-hidden border border-paper-200 bg-paper-50 p-4">
            <svg
              ref={svgRef}
              viewBox="0 0 680 380"
              className="h-auto w-full"
              fill="none"
              stroke="currentColor"
              role="img"
              aria-label={data.title}
            >
              <g className="text-ink-900/10">
                {/* trame de fond */}
                {Array.from({ length: 14 }, (_, i) => (
                  <line key={`v${i}`} x1={i * 52} y1="0" x2={i * 52} y2="380" strokeWidth="0.5" />
                ))}
                {Array.from({ length: 8 }, (_, i) => (
                  <line key={`h${i}`} x1="0" y1={i * 52} x2="680" y2={i * 52} strokeWidth="0.5" />
                ))}
              </g>

              <g strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stroke-accent-var">
                {paths[variant].map((p, i) => (
                  <path
                    key={i}
                    d={p.d}
                    className="draw-path"
                    style={{ ['--len' as any]: p.len, opacity: p.dash ? 0.45 : 1 }}
                    strokeDasharray={p.len}
                    strokeDashoffset={p.len}
                    {...(p.dash ? { strokeWidth: 1.4 } : {})}
                  />
                ))}
              </g>

              {/* points de repère numérotés */}
              {[
                [60, 200],
                [400, 150],
                [300, 280],
                [620, 250],
              ].map(([x, y], i) => (
                <g key={i}>
                  <circle cx={x} cy={y} r="16" className="fill-ink-900 stroke-accent-var" strokeWidth="1.2" />
                  <text
                    x={x}
                    y={y + 4}
                    textAnchor="middle"
                    className="fill-accent-var font-mono"
                    style={{ fontSize: 11, stroke: 'none' }}
                  >
                    {i + 1}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        <ol className="lg:col-span-5 lg:pt-24">
          {data.legend.map((l, i) => (
            <Reveal as="li" key={l.n} delay={i * 0.08}>
              <div className="group flex gap-6 border-b border-paper-200 py-6">
                <span className="font-mono text-[10px] tracking-[0.2em] text-accent">{l.n}</span>
                <div>
                  <h3 className="font-display text-base tracking-tight text-ink-900">{l.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">{l.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
