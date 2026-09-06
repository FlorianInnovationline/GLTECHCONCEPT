import type { Metadata, Viewport } from 'next';
import { Archivo, Manrope } from 'next/font/google';
import './globals.css';

import { site } from '@/lib/site';
import { localBusinessJsonLd, OG_IMAGE } from '@/lib/seo';

// Display : grotesque neutre et large, pour des titres nets sans emphase.
const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-display',
  display: 'swap',
});

// Texte courant : lisible, légèrement humaniste.
const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.legalName} — Chauffage, climatisation & électricité à ${site.address.city}`,
    template: `%s | ${site.name}`,
  },
  description: `Entreprise de chauffage, climatisation, ventilation, électricité, sécurité, plomberie et sanitaires à ${site.address.city}, Beaumont et Charleroi. ${site.experienceYears} ans d'expérience, agréments gaz G1/G2, mazout et frigoriste catégorie 1.`,
  applicationName: site.legalName,
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  publisher: site.legalName,
  formatDetection: { telephone: true, address: true, email: true },
  icons: { icon: '/favicon.svg', apple: '/favicon.svg' },
  openGraph: {
    type: 'website',
    locale: 'fr_BE',
    url: site.url,
    siteName: site.legalName,
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
};

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-BE" data-accent="green" className={`${archivo.variable} ${manrope.variable}`}>
      <head>
        {/* Posée avant le premier rendu : elle autorise le masquage des blocs à
            révéler. Sans JavaScript, rien n'est masqué et la page reste lisible. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        {/* Données structurées entreprise locale — clé du référencement local. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
        />
      </head>
      <body className="relative min-h-screen">{children}</body>
    </html>
  );
}
