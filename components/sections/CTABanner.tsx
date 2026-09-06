import Reveal from '@/components/ui/Reveal';
import ButtonLink from '@/components/ui/ButtonLink';
import { site } from '@/lib/site';

/**
 * Bandeau de conversion final. C'est le seul aplat sombre du site : il crée le
 * contraste de fin de page sans que la direction générale cesse d'être claire.
 */
export default function CTABanner({
  title = 'Vous avez un projet ? Parlons-en.',
  text = 'Contactez-nous dès aujourd’hui pour un devis personnalisé. Nous nous déplaçons, nous mesurons, nous chiffrons — sans engagement.',
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="on-dark relative overflow-hidden bg-ink-900">
      <div className="shell relative grid gap-10 py-section lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="font-mono text-eyebrow uppercase tracking-[0.2em] text-paper-300">Contact &amp; devis</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-6 max-w-2xl text-display-lg text-white">{title}</h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-prose text-lead text-paper-300">{text}</p>
          </Reveal>
        </div>

        <Reveal delay={0.18} className="lg:col-span-5">
          <div className="flex flex-wrap items-center gap-4 lg:justify-end">
            <ButtonLink href="/contact">Demandez un devis gratuit</ButtonLink>
            <a
              href={site.phone.href}
              className="group flex items-center gap-3 text-sm font-medium text-white transition-colors hover:text-accent"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 transition-colors duration-300 group-hover:border-accent">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                  <path d="M4 5c0 8 7 15 15 15l2-3-4-2-2 2c-2-1-5-4-6-6l2-2-2-4-3 0Z" />
                </svg>
              </span>
              {site.phone.display}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
