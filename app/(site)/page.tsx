import type { Metadata } from 'next';

import HomeHero from '@/components/sections/HomeHero';
import TrustStrip from '@/components/sections/TrustStrip';
import ExpertiseBento from '@/components/sections/ExpertiseBento';
import ProcessTimeline from '@/components/sections/ProcessTimeline';
import FeaturedWork from '@/components/sections/FeaturedWork';
import WhyUs from '@/components/sections/WhyUs';
import Testimonials from '@/components/sections/Testimonials';
import ServiceAreaMap from '@/components/sections/ServiceAreaMap';
import CTABanner from '@/components/sections/CTABanner';

import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  title: 'Entreprise de chauffage, climatisation et électricité à Montigny-le-Tilleul, Beaumont et Charleroi',
  description:
    'GL TECH CONCEPT SRL — chauffage, pompes à chaleur, climatisation, ventilation, électricité, systèmes de sécurité, plomberie et sanitaires à Montigny-le-Tilleul, Beaumont et Charleroi. 25 ans d’expérience, agréé gaz G1/G2, mazout et frigoriste catégorie 1. Devis gratuit.',
  path: '/',
  keywords: [
    'chauffagiste',
    'pompe à chaleur',
    'climatisation',
    'électricien',
    'plombier',
    'ventilation',
    'entreprise chauffage Charleroi',
  ],
});

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <TrustStrip />
      <ExpertiseBento />
      <ProcessTimeline />
      <FeaturedWork />
      <WhyUs />
      <Testimonials />
      <ServiceAreaMap />
      <CTABanner />
    </>
  );
}
