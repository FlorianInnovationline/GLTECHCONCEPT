import Link from 'next/link';

import AmbientVideo from '@/components/visuals/AmbientVideo';
import AmbientLines from '@/components/visuals/AmbientLines';
import ButtonLink from '@/components/ui/ButtonLink';
import { services } from '@/lib/services';
import { site } from '@/lib/site';

/**
 * Hero d'accueil. Composant serveur : le texte est présent dans le HTML et
 * son animation d'entrée est purement CSS — rien d'essentiel n'attend le JS.
 */
export default function HomeHero() {
  return (
    <section className="relative overflow-hidden pt-[calc(var(--header-h)+2.5rem)]">
      <AmbientLines effect="shimmer" opacity={0.1} />
      <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 opacity-60" />

      <div className="shell relative grid items-center gap-12 pb-14 lg:grid-cols-12 lg:gap-14 lg:pb-section">
        {/* Colonne texte */}
        <div className="lg:col-span-6">
          <p className="enter eyebrow eyebrow-dot" style={{ ['--d' as any]: '0.05s' }}>
            {site.experienceYears} ans d’expérience · Hainaut
          </p>

          <h1 className="mt-6 text-display-xl">
            <span className="sr-only">
              Entreprise de chauffage, climatisation et électricité à Montigny-le-Tilleul, Beaumont et Charleroi
            </span>
            <span aria-hidden>
              <span className="enter block" style={{ ['--d' as any]: '0.12s' }}>
                Chauffage, climatisation
              </span>
              <span className="enter block" style={{ ['--d' as any]: '0.2s' }}>
                &amp; électricité, <span className="text-accent">bien faits</span>.
              </span>
            </span>
          </h1>

          <p className="enter mt-7 max-w-prose text-lead text-ink-500" style={{ ['--d' as any]: '0.3s' }}>
            Des solutions complètes et sur mesure en chauffage, climatisation, ventilation, électricité,
            plomberie et sanitaires — à Montigny-le-Tilleul, Beaumont, Charleroi et dans tout le Hainaut.
          </p>

          <div className="enter mt-9 flex flex-wrap items-center gap-3" style={{ ['--d' as any]: '0.38s' }}>
            <ButtonLink href="/contact">Demandez un devis gratuit</ButtonLink>
            <ButtonLink href="#expertises" variant="ghost">
              Découvrir nos services
            </ButtonLink>
          </div>

          {/* Agréments : la preuve, sans emphase */}
          <ul
            className="enter mt-11 grid grid-cols-1 gap-x-7 gap-y-3 border-t border-paper-200 pt-7 sm:grid-cols-2 lg:flex lg:flex-wrap lg:items-center"
            style={{ ['--d' as any]: '0.46s' }}
          >
            {site.certifications.map((c) => (
              <li key={c.label} className="flex items-center gap-2">
                <svg viewBox="0 0 12 12" className="h-3 w-3 shrink-0 stroke-accent-var" fill="none" strokeWidth="1.8" aria-hidden>
                  <path d="M1 6l3.2 3.2L11 2.5" />
                </svg>
                <span className="text-[13px] text-ink-600">{c.label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Colonne média */}
        <div className="enter lg:col-span-6" style={{ ['--d' as any]: '0.2s' }}>
          <div className="relative">
            <figure className="relative aspect-[5/4] overflow-hidden lg:aspect-[4/3]">
              <AmbientVideo
                src="/media/hero-home.mp4"
                poster="/media/posters/hero-home.jpg"
                alt="Intervention GL TECH CONCEPT sur une installation de chauffage"
                overlay="none"
                priority
              />
            </figure>

            <div className="mt-4 border border-paper-200 bg-white p-5 sm:absolute sm:-bottom-7 sm:left-5 sm:mt-0 sm:shadow-lift lg:-left-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-400">Un dépannage ?</p>
              <a href={site.phone.href} className="mt-2 block font-display text-xl font-semibold text-ink-900 transition-colors hover:text-accent">
                {site.phone.display}
              </a>
              <p className="mt-1 text-xs text-ink-500">Devis gratuit · Hainaut &amp; Brabant wallon</p>
            </div>
          </div>
        </div>
      </div>

      {/* Accès direct aux métiers */}
      <div className="relative border-t border-paper-200">
        <div className="shell flex flex-wrap items-center gap-x-6 gap-y-2 py-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-400">Nos métiers</span>
          {services.map((s) => (
            <Link key={s.slug} href={`/${s.slug}`} className="text-[13px] text-ink-500 transition-colors hover:text-accent">
              {s.navLabel.replace('Chauffage et Pompe à chaleur', 'Chauffage & PAC').replace('Travaux de plomberie', 'Plomberie').replace('Systèmes de sécurité', 'Sécurité').replace('Électricité générale', 'Électricité')}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
