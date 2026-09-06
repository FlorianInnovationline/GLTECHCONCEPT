import Counter from '@/components/ui/Counter';
import Reveal from '@/components/ui/Reveal';
import Marquee from '@/components/ui/Marquee';
import { site, marqueeItems } from '@/lib/site';

const stats = [
  { value: '25', suffix: '', label: 'ans d’expérience', sub: 'Un métier appris sur le terrain' },
  { value: '7', suffix: '', label: 'métiers maîtrisés', sub: 'Du chauffage aux sanitaires' },
  { value: '8', suffix: '+', label: 'communes desservies', sub: 'Hainaut & Brabant wallon' },
  { value: '3', suffix: '', label: 'agréments officiels', sub: 'Gaz G1/G2 · mazout · frigoriste cat. 1' },
];

/** Bande de confiance : chiffres clés puis rappel discret des agréments. */
export default function TrustStrip() {
  return (
    <section aria-label="Chiffres clés et agréments" className="border-y border-paper-200 bg-paper-50">
      <div className="shell grid grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06}>
            <div
              className={`py-8 lg:px-8 lg:py-10 ${i % 2 === 1 ? 'border-l border-paper-200 pl-5 lg:pl-8' : ''} ${
                i > 1 ? 'border-t border-paper-200 lg:border-t-0' : ''
              } ${i > 0 ? 'lg:border-l lg:border-paper-200' : ''}`}
            >
              <p className="font-display text-[2rem] font-semibold leading-none text-ink-900 lg:text-[2.6rem]">
                <Counter value={s.value} />
                <span className="text-accent">{s.suffix}</span>
              </p>
              <p className="mt-3 text-sm font-medium text-ink-900">{s.label}</p>
              <p className="mt-1 text-sm text-ink-400">{s.sub}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Marquee items={marqueeItems} className="border-t border-paper-200" duration={64} />

      <p className="sr-only">
        {site.legalName} est agréée pour les installations au gaz G1 et G2, les installations au mazout et
        dispose de la certification frigoriste de catégorie 1.
      </p>
    </section>
  );
}
