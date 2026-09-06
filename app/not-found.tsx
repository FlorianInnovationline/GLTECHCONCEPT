import Link from 'next/link';

import ButtonLink from '@/components/ui/ButtonLink';
import { services } from '@/lib/services';
import { site } from '@/lib/site';

export default function NotFound() {
  return (
    <section className="relative flex min-h-[86svh] items-center overflow-hidden pt-[var(--header-h)]">
      <div aria-hidden className="grid-bg absolute inset-0 opacity-40" />
      <div className="shell relative">
        <p className="eyebrow eyebrow-dot">Erreur 404</p>
        <h1 className="mt-6 text-display-xl">
          Page <span className="text-accent">introuvable</span>
        </h1>
        <p className="mt-8 max-w-prose text-lead text-ink-600">
          Cette page n’existe pas ou a été déplacée. Voici par où reprendre.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <ButtonLink href="/">Retour à l’accueil</ButtonLink>
          <ButtonLink href="/contact" variant="ghost">
            Nous contacter
          </ButtonLink>
        </div>

        <ul className="mt-16 flex flex-wrap gap-2">
          {services.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/${s.slug}`}
                className="block border border-paper-200 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-600 transition-colors hover:border-accent hover:text-accent"
              >
                {s.title}
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-12 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-400">
          Une urgence ?{' '}
          <a href={site.phone.href} className="text-accent">
            {site.phone.display}
          </a>
        </p>
      </div>
    </section>
  );
}
