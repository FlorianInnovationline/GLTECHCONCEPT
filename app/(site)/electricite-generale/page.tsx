import type { Metadata } from 'next';

import ServicePageLayout from '@/components/services/ServicePageLayout';
import { getService } from '@/lib/services';
import { pageMeta, serviceJsonLd, faqJsonLd, breadcrumbJsonLd } from '@/lib/seo';

const SLUG = 'electricite-generale';
const service = getService(SLUG)!;

export const metadata: Metadata = pageMeta({
  title: service.metaTitle,
  description: service.metaDescription,
  path: `/${SLUG}`,
  keywords: service.keywords,
  image: service.hero.poster,
});

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            serviceJsonLd(SLUG),
            faqJsonLd(service.faq),
            breadcrumbJsonLd([
              { name: 'Accueil', path: '/' },
              { name: service.title, path: `/${SLUG}` },
            ]),
          ]),
        }}
      />
      <ServicePageLayout
        service={service}
        diagram={'elec'}
        beforeAfter={false}
        images={{
          intro: '/media/gallery/coffret-electrique/04.jpg',
          introAlt: 'Coffret électrique remplacé et mis en conformité',
          second: '/media/gallery/coffret-electrique/11.jpg',
          secondAlt: 'Repérage des circuits sur un tableau électrique',
        }}
      />
    </>
  );
}
