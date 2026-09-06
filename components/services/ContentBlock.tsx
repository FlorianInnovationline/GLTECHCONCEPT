import Image from 'next/image';

import Reveal from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';

type Block = { eyebrow: string; title: string; paragraphs: string[]; bullets: string[] };

/**
 * Bloc de contenu métier : texte long + liste de prestations + visuel.
 * L'alternance gauche/droite évite l'effet « page empilée » du site actuel.
 */
export default function ContentBlock({
  block,
  image,
  imageAlt,
  reverse = false,
  accent,
  children,
}: {
  block: Block;
  image: string;
  imageAlt: string;
  reverse?: boolean;
  accent?: 'green' | 'blue';
  children?: React.ReactNode;
}) {
  return (
    <section className="relative py-section">
      <div className={cn('shell grid gap-14 lg:grid-cols-12 lg:gap-16')}>
        <div className={cn('lg:col-span-6', reverse && 'lg:order-2')}>
          <Reveal>
            <p className="eyebrow eyebrow-dot">{block.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-6 text-display-md">{block.title}</h2>
          </Reveal>

          <div className="mt-8 space-y-6">
            {block.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.06 * i}>
                <p className="max-w-prose leading-relaxed text-ink-600">{p}</p>
              </Reveal>
            ))}
          </div>

          <ul className="mt-10 grid gap-px border-t border-paper-200 sm:grid-cols-2">
            {block.bullets.map((b, i) => (
              <Reveal as="li" key={b} delay={0.05 * i}>
                <div className="group flex items-start gap-4 border-b border-paper-200 py-5">
                  <span className="mt-1.5 flex h-4 w-4 shrink-0 items-center justify-center border border-accent/50 transition-colors duration-500 group-hover:bg-accent/20">
                    <svg viewBox="0 0 10 10" className="h-2 w-2 stroke-accent-var" fill="none" strokeWidth="1.8" aria-hidden>
                      <path d="M1 5l2.6 2.6L9 2" />
                    </svg>
                  </span>
                  <span className="text-sm leading-relaxed text-ink-700">{b}</span>
                </div>
              </Reveal>
            ))}
          </ul>

          {children}
        </div>

        <div className={cn('lg:col-span-6', reverse && 'lg:order-1')}>
          <Reveal delay={0.12}>
            <figure className="group relative">
              <div className="photo-wrap relative aspect-[4/5] overflow-hidden" data-accent={accent}>
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="photo object-cover transition-transform duration-[1.6s] ease-power group-hover:scale-105"
                />
              </div>
              <figcaption className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-400">
                {imageAlt}
              </figcaption>
              {/* Cadre décalé */}
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-4 -right-4 h-full w-full border border-accent/25 transition-transform duration-700 ease-power group-hover:translate-x-2 group-hover:translate-y-2"
              />
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
