import Reveal from '@/components/ui/Reveal';
import AmbientVideo from '@/components/visuals/AmbientVideo';
import ButtonLink from '@/components/ui/ButtonLink';
import { site } from '@/lib/site';

const reasons = [
  {
    title: 'Une équipe agréée',
    text: 'Installations gaz G1 et G2, installations au mazout, manipulation des fluides frigorigènes en catégorie 1 : les agréments qui comptent, nous les avons.',
  },
  {
    title: 'Sept métiers, un seul interlocuteur',
    text: 'Chauffage, climatisation, ventilation, électricité, sécurité, plomberie et sanitaires. Pas de renvoi d’un corps de métier à l’autre au milieu du chantier.',
  },
  {
    title: 'Du matériel choisi, pas subi',
    text: 'Chaudières à condensation, pompes à chaleur, adoucisseurs : nous sélectionnons l’équipement en fonction de votre bâtiment, pas d’un catalogue.',
  },
  {
    title: 'Une entreprise locale',
    text: `Basés à ${site.address.city}, nous intervenons rapidement à Beaumont, Charleroi, Binche, Farciennes et dans tout le Hainaut.`,
  },
];

export default function WhyUs() {
  return (
    <section className="border-y border-paper-200 bg-paper-50 py-section">
      <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <figure className="relative aspect-[4/3] overflow-hidden">
              <AmbientVideo
                src="/media/section-about-atelier.mp4"
                poster="/media/sections/about-atelier.jpg"
                alt="Atelier et matériel GL TECH CONCEPT"
                overlay="none"
              />
            </figure>
            <div className="mt-6 flex items-baseline gap-4 border-t border-paper-200 pt-6">
              <span className="font-display text-[2.6rem] font-semibold leading-none text-ink-900">25</span>
              <span className="text-sm leading-snug text-ink-500">
                années sur le terrain,
                <br />
                en Hainaut et en Brabant wallon
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow eyebrow-dot">Pourquoi GL TECH CONCEPT</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-5 max-w-2xl text-display-md">
              Le travail bien fait ne se voit pas. Il s’entend, l’hiver, quand tout fonctionne.
            </h2>
          </Reveal>

          <div className="mt-10 divide-y divide-paper-200 border-y border-paper-200">
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.06}>
                <div className="grid gap-3 py-7 md:grid-cols-12 md:gap-8">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-accent md:col-span-1">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-base font-semibold md:col-span-4">{r.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-500 md:col-span-7">{r.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <ButtonLink href="/contact">Demandez un devis</ButtonLink>
              <a href={site.phone.href} className="text-sm font-medium text-ink-700 transition-colors hover:text-accent">
                ou appelez le {site.phone.display}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
