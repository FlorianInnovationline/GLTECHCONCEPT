import ServiceHero from './ServiceHero';
import ContentBlock from './ContentBlock';
import MiniGallery from './MiniGallery';
import FaqSection from './FaqSection';
import TechDiagram from './TechDiagram';
import BeforeAfter from './BeforeAfter';
import CrossSell from '@/components/sections/CrossSell';
import CTABanner from '@/components/sections/CTABanner';
import Marquee from '@/components/ui/Marquee';

import type { Service } from '@/lib/services';
import { marqueeItems } from '@/lib/site';

/**
 * Ossature commune aux 7 pages métier :
 * Hero → installation → (schéma) → entretien/dépannage → (avant/après)
 * → réalisations → autres métiers → FAQ → appel à l'action.
 */
export default function ServicePageLayout({
  service,
  diagram,
  beforeAfter = false,
  images,
}: {
  service: Service;
  diagram?: 'pac' | 'vmc' | 'elec';
  beforeAfter?: boolean;
  images: { intro: string; introAlt: string; second: string; secondAlt: string };
}) {
  return (
    <div data-accent={service.accent}>
      <ServiceHero service={service} />

      <Marquee items={marqueeItems} className="border-y border-paper-200 bg-paper-50" duration={54} />

      <ContentBlock
        block={service.intro}
        image={images.intro}
        imageAlt={images.introAlt}
        accent={service.accent}
      />

      {diagram && <TechDiagram variant={diagram} />}

      <ContentBlock
        block={service.second}
        image={images.second}
        imageAlt={images.secondAlt}
        reverse
        accent={service.accent}
      />

      {beforeAfter && <BeforeAfter />}

      <MiniGallery
        categories={service.galleryCategories}
        intro="Quelques chantiers récents dans ce métier. Toutes nos réalisations sont regroupées dans le portfolio."
      />

      <CrossSell currentSlug={service.slug} />

      <FaqSection items={service.faq} />

      <CTABanner />
    </div>
  );
}
