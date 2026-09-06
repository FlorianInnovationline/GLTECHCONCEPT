import type { Metadata } from 'next';
import { Suspense } from 'react';

import PageHero from '@/components/sections/PageHero';
import GalleryExplorer from '@/components/gallery/GalleryExplorer';
import CTABanner from '@/components/sections/CTABanner';
import Marquee from '@/components/ui/Marquee';

import { pageMeta, breadcrumbJsonLd } from '@/lib/seo';
import { galleryCategories, totalPhotos } from '@/lib/gallery';
import { marqueeItems } from '@/lib/site';

export const metadata: Metadata = pageMeta({
  title: 'Réalisations — chauffage, salles de bain, tableaux électriques',
  description: `${totalPhotos} photos de chantiers réalisés par GL TECH CONCEPT : pompes à chaleur air/eau, chauffage au sol, climatisation, coffrets électriques, adoucisseurs d’eau et rénovations complètes de salles de bain.`,
  path: '/realisations',
  keywords: ['réalisations', 'photos chantier', 'rénovation salle de bain', 'pompe à chaleur', 'chauffage au sol'],
});

export default function RealisationsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Accueil', path: '/' },
              { name: 'Réalisations', path: '/realisations' },
            ])
          ),
        }}
      />

      <PageHero
        breadcrumb="Réalisations"
        eyebrow={`${totalPhotos} photos · ${galleryCategories.length} catégories`}
        title="Nos réalisations"
        intro="Pompes à chaleur, planchers chauffants, climatisation, tableaux électriques, adoucisseurs et salles de bain complètes. Filtrez par type de chantier."
        media="/media/hero-realisations.mp4"
        poster="/media/posters/hero-realisations.jpg"
        effect="circuit"
      />

      <Marquee items={marqueeItems} className="border-y border-paper-200 bg-paper-50" duration={54} />

      <Suspense fallback={<div className="shell py-section text-ink-400">Chargement de la galerie…</div>}>
        <GalleryExplorer />
      </Suspense>

      <CTABanner
        title="Votre chantier, le prochain ?"
        text="Envoyez-nous quelques photos et une description : nous revenons vers vous avec une première estimation."
      />
    </>
  );
}
