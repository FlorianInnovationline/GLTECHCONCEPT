import Link from 'next/link';

import Logo from '@/components/visuals/Logo';
import { services } from '@/lib/services';
import { site, mapsLink } from '@/lib/site';

const legalLinks = [
  { href: '/mentions-legales', label: 'Mentions légales' },
  { href: '/politique-cookies', label: 'Politique de cookies' },
  { href: '/sitemap.xml', label: 'Plan du site' },
];

/** Pied de page sombre : il referme la page et ancre les informations légales. */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark relative z-10 bg-ink-900 text-paper-300">
      <div className="shell grid gap-12 py-section lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo onDark />
          <p className="mt-7 max-w-sm text-sm leading-relaxed text-paper-300">
            Basée à {site.address.city}, l’entreprise intervient également à Beaumont, Charleroi, en Wallonie
            et en Brabant wallon pour tous vos projets de chauffage, de climatisation, d’électricité et de
            plomberie. Une équipe qualifiée, un travail soigné et durable.
          </p>
          <Link href="/contact" className="link-underline mt-6 inline-block text-sm font-medium text-accent">
            Contactez-nous pour un devis personnalisé
          </Link>
        </div>

        <nav aria-label="Nos services" className="lg:col-span-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-300/60">Nos services</p>
          <ul className="mt-6 space-y-2.5">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/${s.slug}`} className="text-sm text-white/85 transition-colors hover:text-accent">
                  {s.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/realisations" className="text-sm text-white/85 transition-colors hover:text-accent">
                Réalisations
              </Link>
            </li>
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-300/60">Nos coordonnées</p>
          <address className="mt-6 space-y-4 text-sm not-italic">
            <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="block text-white/85 transition-colors hover:text-accent">
              {site.address.street}
              <br />
              {site.address.postalCode} {site.address.city}
              <br />
              {site.address.countryName}
            </a>
            <a href={site.phone.href} className="block font-display text-lg font-semibold text-white transition-colors hover:text-accent">
              {site.phone.display}
            </a>
            <a href={`mailto:${site.email}`} className="block text-white/85 transition-colors hover:text-accent">
              {site.email}
            </a>
            <p className="pt-1 font-mono text-xs text-paper-300/60">TVA {site.vat}</p>
          </address>
        </div>

        <div className="lg:col-span-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-300/60">Zone desservie</p>
          <ul className="mt-6 space-y-2">
            {site.serviceAreas.map((a) => (
              <li key={a} className="text-sm text-white/70">
                {a}
              </li>
            ))}
          </ul>

          <p className="mt-9 font-mono text-[10px] uppercase tracking-[0.2em] text-paper-300/60">Suivez-nous</p>
          <div className="mt-4 flex gap-3">
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook GL TECH CONCEPT"
              className="flex h-9 w-9 items-center justify-center border border-white/15 text-white/80 transition-colors hover:border-accent hover:text-accent"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5H16.7V3.6c-.3 0-1.3-.13-2.47-.13-2.45 0-4.13 1.5-4.13 4.24v2.19H7.4V13h2.7v8h3.4Z" />
              </svg>
            </a>
            <a
              href={site.social.trustup}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Profil TrustUp GL TECH CONCEPT"
              className="flex h-9 w-9 items-center justify-center border border-white/15 font-mono text-[10px] uppercase tracking-widest text-white/80 transition-colors hover:border-accent hover:text-accent"
            >
              TU
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="shell flex flex-col items-center justify-between gap-3 py-6 text-center md:flex-row md:text-left">
          <p className="font-mono text-[11px] text-paper-300/60">
            © {year} {site.legalName} — Tous droits réservés
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="font-mono text-[11px] text-paper-300/60 transition-colors hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
