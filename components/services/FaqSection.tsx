import Accordion from '@/components/ui/Accordion';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import { site } from '@/lib/site';

/** FAQ métier — alimente aussi le balisage FAQPage (voir la page appelante). */
export default function FaqSection({ items, title = 'Questions fréquentes' }: { items: { q: string; a: string }[]; title?: string }) {
  return (
    <section className="relative py-section">
      <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeading eyebrow="FAQ" title={title} />
          <Reveal delay={0.1}>
            <p className="mt-8 text-sm leading-relaxed text-ink-600">
              Une question qui n’est pas ici ? Appelez-nous, on répond directement — pas de centre d’appel.
            </p>
            <a
              href={site.phone.href}
              className="mt-5 inline-block font-display text-xl text-accent transition-opacity hover:opacity-80"
            >
              {site.phone.display}
            </a>
          </Reveal>
        </div>
        <div className="lg:col-span-8">
          <Accordion items={items} />
        </div>
      </div>
    </section>
  );
}
