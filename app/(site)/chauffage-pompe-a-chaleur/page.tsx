import type { Metadata } from 'next';

import ServicePageLayout from '@/components/services/ServicePageLayout';
import { getService } from '@/lib/services';
import { pageMeta, serviceJsonLd, faqJsonLd, breadcrumbJsonLd } from '@/lib/seo';

const SLUG = 'chauffage-pompe-a-chaleur';
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
        diagram={'pac'}
        beforeAfter={false}
        images={{
          intro: '/media/gallery/chauffage-pompe-a-chaleur/02.jpg',
          introAlt: 'Unité extérieure de pompe à chaleur air/eau installée par GL TECH CONCEPT',
          second: '/media/gallery/chauffage-sol/01.jpg',
          secondAlt: 'Boucles de chauffage au sol posées et raccordées au collecteur',
        }}
      />
    </>
  );
}
