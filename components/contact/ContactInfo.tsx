import Reveal from '@/components/ui/Reveal';
import { site, fullAddress, mapsLink } from '@/lib/site';

/** Bloc coordonnées : NAP complet, horaires, zone, TVA. */
export default function ContactInfo() {
  return (
    <div className="space-y-10">
      <Reveal>
        <div>
          <p className="eyebrow eyebrow-dot">Nos coordonnées</p>
          <h2 className="mt-6 text-display-sm">Contactez-nous pour vos projets de chauffage et d’électricité</h2>
          <p className="mt-6 max-w-prose text-lead text-ink-600">
            Vous avez un projet ? Contactez-nous dès aujourd’hui pour un devis personnalisé.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <dl className="divide-y divide-paper-200 border-y border-paper-200">
          <Row label="Téléphone">
            <a href={site.phone.href} className="font-display text-2xl text-ink-900 transition-colors hover:text-accent">
              {site.phone.display}
            </a>
          </Row>
          <Row label="E-mail">
            <a href={`mailto:${site.email}`} className="text-ink-700 transition-colors hover:text-accent">
              {site.email}
            </a>
            {!site.emailConfirmed && (
              <span className="mt-1 block font-mono text-[10px] uppercase tracking-wide text-ink-400">
                {/* Visible uniquement tant que l'adresse n'est pas confirmée. */}
                Adresse à confirmer avant mise en ligne
              </span>
            )}
          </Row>
          <Row label="Adresse">
            <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="text-ink-700 transition-colors hover:text-accent">
              {fullAddress}
            </a>
          </Row>
          <Row label="Horaires">
            <ul className="space-y-1 text-ink-700">
              {site.hours.map((h) => (
                <li key={h.days} className="flex justify-between gap-6">
                  <span>{h.days}</span>
                  <span className="text-ink-400">{h.time}</span>
                </li>
              ))}
            </ul>
          </Row>
          <Row label="TVA">
            <span className="font-mono text-sm tracking-wide text-ink-600">{site.vat}</span>
          </Row>
        </dl>
      </Reveal>

      <Reveal delay={0.14}>
        <div>
          <p className="eyebrow eyebrow-dot">Zone desservie</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {site.serviceAreas.map((a) => (
              <li
                key={a}
                className="border border-paper-200 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-600"
              >
                {a}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="grid gap-3 sm:grid-cols-2">
          {site.certifications.map((c) => (
            <div key={c.label} className="flex items-center gap-3 border border-paper-200 p-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-accent/40 text-accent">
                <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                  <path d="M1 6l3.2 3.2L11 2.5" />
                </svg>
              </span>
              <span className="font-display text-[11px] uppercase tracking-[0.14em] text-ink-700">{c.label}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2 py-6 sm:grid-cols-12 sm:gap-6">
      <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-400 sm:col-span-4">{label}</dt>
      <dd className="sm:col-span-8">{children}</dd>
    </div>
  );
}
