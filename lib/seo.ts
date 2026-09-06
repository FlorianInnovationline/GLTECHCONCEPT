import type { Metadata } from 'next';
import { site, fullAddress } from './site';
import { services } from './services';

export const OG_IMAGE = '/media/og/og-default.jpg';

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
};

export function pageMeta({ title, description, path, keywords = [], image = OG_IMAGE }: PageMetaInput): Metadata {
  const url = `${site.url}${path}`;
  return {
    title,
    description,
    keywords: [...keywords, 'Montigny-le-Tilleul', 'Beaumont', 'Charleroi', 'Hainaut', site.legalName],
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      locale: 'fr_BE',
      url,
      siteName: site.legalName,
      title,
      description,
      images: [{ url: `${site.url}${image}`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${site.url}${image}`],
    },
  };
}

/** JSON-LD entreprise locale — absent du site actuel, essentiel pour le SEO local. */
export function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': `${site.url}/#business`,
    name: site.legalName,
    alternateName: site.name,
    description: `Entreprise de chauffage, climatisation, ventilation, électricité, sécurité, plomberie et sanitaires à ${site.address.city}. ${site.experienceYears} ans d'expérience.`,
    url: site.url,
    telephone: site.phone.international,
    email: site.email,
    vatID: site.vat,
    image: `${site.url}${OG_IMAGE}`,
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.address.lat, longitude: site.address.lng },
    areaServed: site.serviceAreas.map((a) => ({ '@type': 'Place', name: a })),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
    sameAs: [site.social.facebook, site.social.trustup],
    knowsAbout: services.map((s) => s.title),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services GL TECH CONCEPT',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.title, url: `${site.url}/${s.slug}`, description: s.teaser },
      })),
    },
  };
}

export function serviceJsonLd(slug: string) {
  const s = services.find((x) => x.slug === slug);
  if (!s) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.title,
    serviceType: s.title,
    description: s.metaDescription,
    url: `${site.url}/${s.slug}`,
    provider: { '@type': 'HomeAndConstructionBusiness', name: site.legalName, telephone: site.phone.international, address: fullAddress },
    areaServed: site.serviceAreas.map((a) => ({ '@type': 'Place', name: a })),
  };
}

export function faqJsonLd(faq: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.path}`,
    })),
  };
}
