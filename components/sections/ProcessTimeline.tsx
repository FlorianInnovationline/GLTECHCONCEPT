'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import SectionHeading from '@/components/ui/SectionHeading';

const steps = [
  {
    n: '01',
    title: 'Contact',
    text: 'Un appel ou un message suffit. Nous prenons le temps de comprendre la situation, l’urgence et le contexte du bâtiment.',
    detail: 'Par téléphone au 071 14 34 47 ou via le formulaire.',
  },
  {
    n: '02',
    title: 'Diagnostic',
    text: 'Visite sur place : relevé des installations existantes, évaluation des besoins réels en confort thermique, contraintes techniques.',
    detail: 'Sans engagement.',
  },
  {
    n: '03',
    title: 'Devis',
    text: 'Une proposition claire et détaillée : matériel, main-d’œuvre, délais. Pas de ligne floue, pas de surprise en fin de chantier.',
    detail: 'Devis personnalisé et gratuit.',
  },
  {
    n: '04',
    title: 'Intervention',
    text: 'Installation réalisée par nos techniciens agréés, dans le respect des normes de sécurité et d’efficacité énergétique en vigueur.',
    detail: 'Chantier propre, planning tenu.',
  },
  {
    n: '05',
    title: 'Entretien',
    text: 'Nous restons votre interlocuteur : entretien annuel, ramonage, contrôles périodiques et dépannage en cas de panne.',
    detail: 'Contrats d’entretien sur mesure.',
  },
];

/**
 * Étapes du parcours client, en défilement horizontal épinglé (GSAP ScrollTrigger).
 * Le site actuel ne rend cette démarche visible nulle part : c'est pourtant
 * l'argument qui rassure le plus un particulier avant de faire entrer un artisan chez lui.
 */
export default function ProcessTimeline() {
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.innerWidth < 1024) return; // sur mobile : simple défilement horizontal natif

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const el = track.current!;
      const distance = () => el.scrollWidth - window.innerWidth + 120;

      gsap.to(el, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => setProgress(self.progress),
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={section} className="relative overflow-hidden py-section lg:py-0">
      <div className="shell lg:flex lg:h-[100svh] lg:flex-col lg:justify-center">
        <SectionHeading
          eyebrow="Comment ça se passe"
          title="Cinq étapes, un seul interlocuteur"
          intro="Du premier appel à l’entretien annuel, vous gardez le même interlocuteur — celui qui a vu votre installation."
        />

        <div className="mt-14 lg:mt-16">
          <div
            ref={track}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 lg:overflow-visible lg:pb-0"
            style={{ scrollbarWidth: 'none' }}
          >
            {steps.map((s, i) => (
              <article
                key={s.n}
                className="group relative flex min-h-[22rem] w-[80vw] shrink-0 snap-start flex-col justify-between overflow-hidden border border-paper-200 bg-paper-50 p-8 transition-colors duration-500 hover:border-accent/50 sm:w-[24rem] lg:w-[26rem]"
              >
                {i === 0 && (
                  <div className="photo-wrap absolute inset-0 opacity-25">
                    <Image src="/media/sections/process.jpg" alt="" fill sizes="30vw" className="photo object-cover" />
                  </div>
                )}
                <div className="relative flex items-baseline justify-between">
                  <span className="font-display text-[clamp(3rem,5vw,4.6rem)] leading-none text-paper-300 transition-colors duration-500 group-hover:text-accent/35">
                    {s.n}
                  </span>
                  <span className="h-px w-14 bg-accent" />
                </div>
                <div className="relative">
                  <h3 className="text-display-sm text-ink-900">{s.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-ink-600">{s.text}</p>
                  <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">{s.detail}</p>
                </div>
              </article>
            ))}
          </div>

          {/* Barre de progression du parcours (bureau uniquement) */}
          <div className="mt-10 hidden h-px w-full bg-paper-200 lg:block">
            <div
              className="h-px bg-accent transition-[width] duration-100"
              style={{ width: `${Math.max(6, progress * 100)}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
