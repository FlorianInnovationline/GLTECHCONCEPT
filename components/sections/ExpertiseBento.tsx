import Link from 'next/link';
import Image from 'next/image';

import ServiceIcon from '@/components/visuals/ServiceIcon';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import { services } from '@/lib/services';

/** Visuel de fond par métier (les noms de fichiers ne suivent pas les slugs). */
const image: Record<string, string> = {
  'chauffage-pompe-a-chaleur': '/media/sections/expertise-chauffage.jpg',
  climatisation: '/media/sections/expertise-climatisation.jpg',
  ventilation: '/media/sections/expertise-ventilation.jpg',
  'electricite-generale': '/media/sections/expertise-electricite.jpg',
  'systemes-securite': '/media/sections/expertise-securite.jpg',
  'travaux-plomberie': '/media/sections/expertise-plomberie.jpg',
  sanitaires: '/media/sections/expertise-sanitaires.jpg',
};

/**
 * Les 7 métiers. La première carte est mise en avant (2 colonnes + visuel) ;
 * les autres restent des fiches sobres, lisibles d'un coup d'œil.
 */
export default function ExpertiseBento() {
  const [lead, ...rest] = services;

  return (
    <section id="expertises" className="scroll-mt-24 py-section">
      <div className="shell">
        <SectionHeading
          eyebrow="Nos expertises"
          title="Des services connectés pour votre confort et votre sécurité"
          intro="Des systèmes durables et performants — chaudières à condensation, pompes à chaleur, adoucisseurs d’eau, ventilation — installés, entretenus et dépannés par la même équipe."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Carte principale */}
          <Reveal className="md:col-span-2">
            <Link
              href={`/${lead.slug}`}
              data-accent={lead.accent}
              className="group grid h-full overflow-hidden border border-paper-200 transition-all duration-500 hover:border-accent/50 hover:shadow-card sm:grid-cols-2"
            >
              <div className="flex flex-col justify-between gap-10 p-8">
                <div className="flex items-start justify-between">
                  <span className="text-accent">
                    <ServiceIcon name={lead.icon} className="h-10 w-10" />
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-ink-400">{lead.index}</span>
                </div>
                <div>
                  <h3 className="font-display text-2xl font-semibold leading-tight">{lead.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-500">{lead.teaser}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[13px] font-medium text-accent">
                    En savoir plus
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform duration-400 ease-power group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                      <path d="M1 8h13M9 3l5 5-5 5" />
                    </svg>
                  </span>
                </div>
              </div>
              <div className="photo-wrap relative min-h-[15rem] overflow-hidden">
                <Image
                  src={image[lead.slug]}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="photo object-cover transition-transform duration-[1.4s] ease-power group-hover:scale-105"
                />
              </div>
            </Link>
          </Reveal>

          {/* Fiches secondaires */}
          {rest.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 0.06} className="h-full">
              <Link
                href={`/${s.slug}`}
                data-accent={s.accent}
                className="group flex h-full flex-col justify-between gap-10 border border-paper-200 p-7 transition-all duration-500 hover:border-accent/50 hover:shadow-card"
              >
                <div className="flex items-start justify-between">
                  <span className="text-accent">
                    <ServiceIcon name={s.icon} className="h-9 w-9" />
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-ink-400">{s.index}</span>
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold leading-tight">{s.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-500">{s.teaser}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[13px] font-medium text-accent">
                    En savoir plus
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform duration-400 ease-power group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                      <path d="M1 8h13M9 3l5 5-5 5" />
                    </svg>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
