import Link from 'next/link';

import AmbientVideo from '@/components/visuals/AmbientVideo';
import AmbientLines from '@/components/visuals/AmbientLines';
import ButtonLink from '@/components/ui/ButtonLink';
import ServiceIcon from '@/components/visuals/ServiceIcon';
import type { Service } from '@/lib/services';
import { site } from '@/lib/site';

/** Hero commun aux 7 pages métier — l'accent suit le métier (vert ou bleu). */
export default function ServiceHero({ service }: { service: Service }) {
  return (
    <section className="relative overflow-hidden pt-[calc(var(--header-h)+2.5rem)]">
      <AmbientLines effect={service.hero.effect} opacity={0.1} />
      <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 opacity-60" />

      <div className="shell relative grid items-center gap-12 pb-14 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-6">
          <nav aria-label="Fil d’Ariane" className="mb-7">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-400">
              <li>
                <Link href="/" className="transition-colors hover:text-accent">
                  Accueil
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-accent">{service.title}</li>
            </ol>
          </nav>

          <div className="enter flex items-center gap-4" style={{ ['--d' as any]: '0.04s' }}>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-paper-200 text-accent">
              <ServiceIcon name={service.icon} className="h-6 w-6" />
            </span>
            <p className="eyebrow">{service.hero.eyebrow}</p>
          </div>

          <h1 className="enter mt-6 text-display-lg" style={{ ['--d' as any]: '0.12s' }}>
            {service.hero.h1}
          </h1>

          <p className="enter mt-6 max-w-prose text-lead text-ink-500" style={{ ['--d' as any]: '0.2s' }}>
            {service.hero.sub}
          </p>

          <div className="enter mt-9 flex flex-wrap items-center gap-4" style={{ ['--d' as any]: '0.28s' }}>
            <ButtonLink href="/contact">Demandez un devis</ButtonLink>
            <a href={site.phone.href} className="text-sm font-medium text-ink-700 transition-colors hover:text-accent">
              ou appelez le {site.phone.display}
            </a>
          </div>

          <dl className="enter mt-11 grid max-w-xl grid-cols-3 gap-5 border-t border-paper-200 pt-7" style={{ ['--d' as any]: '0.36s' }}>
            {service.stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-display text-lg font-semibold text-ink-900 sm:text-xl">{s.value}</span>
                  <span className="mt-1 block text-xs leading-snug text-ink-400">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="enter lg:col-span-6" style={{ ['--d' as any]: '0.2s' }}>
          <figure className="relative aspect-[5/4] overflow-hidden lg:aspect-[4/3]">
            <AmbientVideo src={service.hero.media} poster={service.hero.poster} alt={service.title} overlay="none" priority />
          </figure>
        </div>
      </div>
    </section>
  );
}
