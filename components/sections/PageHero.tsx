import Link from 'next/link';

import AmbientVideo from '@/components/visuals/AmbientVideo';
import AmbientLines from '@/components/visuals/AmbientLines';
import type { HeroEffect } from '@/lib/services';

/** Hero secondaire (réalisations, contact, pages légales). */
export default function PageHero({
  eyebrow,
  title,
  intro,
  media,
  poster,
  effect = 'editorial',
  breadcrumb,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  media?: string;
  poster?: string;
  effect?: HeroEffect;
  breadcrumb: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-paper-200 pt-[calc(var(--header-h)+2.5rem)]">
      <AmbientLines effect={effect} opacity={0.09} />
      <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 opacity-60" />

      <div className="shell relative grid items-end gap-10 pb-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <nav aria-label="Fil d’Ariane" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-400">
              <li>
                <Link href="/" className="transition-colors hover:text-accent">
                  Accueil
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-accent">{breadcrumb}</li>
            </ol>
          </nav>

          <p className="enter eyebrow eyebrow-dot" style={{ ['--d' as any]: '0.04s' }}>
            {eyebrow}
          </p>

          <h1 className="enter mt-5 max-w-3xl text-display-lg" style={{ ['--d' as any]: '0.1s' }}>
            {title}
          </h1>

          {intro && (
            <p className="enter mt-6 max-w-prose text-lead text-ink-500" style={{ ['--d' as any]: '0.18s' }}>
              {intro}
            </p>
          )}
        </div>

        {media && poster && (
          <div className="enter lg:col-span-5" style={{ ['--d' as any]: '0.2s' }}>
            <figure className="relative aspect-[16/10] overflow-hidden">
              <AmbientVideo src={media} poster={poster} alt="" overlay="none" priority />
            </figure>
          </div>
        )}
      </div>
    </section>
  );
}
