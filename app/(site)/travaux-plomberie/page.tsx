import type { Metadata } from 'next';

import ServicePageLayout from '@/components/services/ServicePageLayout';
import { getService } from '@/lib/services';
import { pageMeta, serviceJsonLd, faqJsonLd, breadcrumbJsonLd } from '@/lib/seo';

const SLUG = 'travaux-plomberie';
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
        beforeAfter={false}
        images={{
          intro: '/media/gallery/plomberie-traitement-eau/02.jpg',
          introAlt: 'Adoucisseur d’eau raccordé sur l’arrivée générale',
          second: '/media/gallery/plomberie-traitement-eau/01.jpg',
          secondAlt: 'Tuyauterie cuivre, vannes et manomètre sur une installation de chauffage',
        }}
      />
    </>
  );
}
