import type { Metadata } from 'next';

import ServicePageLayout from '@/components/services/ServicePageLayout';
import { getService } from '@/lib/services';
import { pageMeta, serviceJsonLd, faqJsonLd, breadcrumbJsonLd } from '@/lib/seo';

const SLUG = 'sanitaires';
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
        diagram={undefined}
        beforeAfter={{}}
        images={{
          intro: '/media/gallery/salles-de-bain/01.jpg',
          introAlt: 'Salle de bain rénovée avec douche à l’italienne et meuble suspendu',
          second: '/media/gallery/salles-de-bain/02.jpg',
          secondAlt: 'Pose d’un meuble de salle de bain sur mesure',
        }}
      />
    </>
  );
}
