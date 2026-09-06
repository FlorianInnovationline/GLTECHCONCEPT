import Link from 'next/link';

import ServiceIcon from '@/components/visuals/ServiceIcon';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import { otherServices } from '@/lib/services';

/** Grille des autres métiers — maillage interne + découverte. */
export default function CrossSell({ currentSlug }: { currentSlug: string }) {
  const list = otherServices(currentSlug);

  return (
    <section className="relative py-section">
      <div className="shell">
        <SectionHeading
          eyebrow="Nos autres métiers"
          title="Une seule entreprise pour toute la technique du bâtiment"
          intro="Nos clients nous confient rarement un seul poste. Voilà tout ce que nous prenons en charge."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 0.06} className="h-full">
              <Link
                href={`/${s.slug}`}
                data-accent={s.accent}
                className="group relative flex h-full flex-col justify-between gap-10 border border-paper-200 p-8 transition-colors duration-500 hover:bg-paper-50"
              >
                <div className="flex items-start justify-between">
                  <span className="text-accent">
                    <ServiceIcon name={s.icon} className="h-10 w-10" />
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.24em] text-ink-400">{s.index}</span>
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold leading-tight text-ink-900">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-500">{s.teaser}</p>
                </div>
                <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-700 ease-power group-hover:scale-x-100" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
