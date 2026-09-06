import PageHero from './PageHero';
import CTABanner from './CTABanner';

/** Gabarit des pages légales : typographie lisible, mêmes codes visuels. */
export default function LegalPage({
  eyebrow,
  title,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
}) {
  return (
    <>
      <PageHero breadcrumb={title} eyebrow={eyebrow} title={title} intro={intro} effect="editorial" />

      <section className="py-section">
        <div className="shell grid gap-12 lg:grid-cols-12">
          {/* Sommaire */}
          <nav aria-label="Sommaire" className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <p className="eyebrow eyebrow-dot">Sommaire</p>
              <ol className="mt-6 space-y-3">
                {sections.map((s, i) => (
                  <li key={s.heading}>
                    <a
                      href={`#s${i + 1}`}
                      className="flex gap-3 text-sm text-ink-600 transition-colors hover:text-accent"
                    >
                      <span className="font-mono text-[10px] text-ink-400">{String(i + 1).padStart(2, '0')}</span>
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <div className="lg:col-span-8">
            {sections.map((s, i) => (
              <article key={s.heading} id={`s${i + 1}`} className="scroll-mt-32 border-t border-paper-200 py-10 first:border-t-0 first:pt-0">
                <h2 className="text-display-sm">{s.heading}</h2>
                <div className="mt-6 space-y-4">
                  {s.body.map((p, j) => (
                    <p key={j} className="max-w-prose leading-relaxed text-ink-600">
                      {p}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
