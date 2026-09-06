import type { Metadata } from 'next';

import PageHero from '@/components/sections/PageHero';
import ContactInfo from '@/components/contact/ContactInfo';
import ContactForm from '@/components/contact/ContactForm';
import ServiceAreaMap from '@/components/sections/ServiceAreaMap';
import Marquee from '@/components/ui/Marquee';

import { pageMeta, breadcrumbJsonLd } from '@/lib/seo';
import { marqueeItems, site } from '@/lib/site';

export const metadata: Metadata = pageMeta({
  title: 'Contact & devis — GL TECH CONCEPT à Montigny-le-Tilleul',
  description: `Contactez GL TECH CONCEPT pour un devis personnalisé et gratuit : ${site.phone.display}, ${site.address.street}, ${site.address.postalCode} ${site.address.city}. Chauffage, climatisation, électricité, plomberie et sanitaires.`,
  path: '/contact',
  keywords: ['contact', 'devis gratuit', 'chauffagiste Montigny-le-Tilleul', 'électricien Charleroi'],
});

export default function ContactPage() {
  return (
    <div data-accent="green">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Accueil', path: '/' },
              { name: 'Contact & devis', path: '/contact' },
            ])
          ),
        }}
      />

      <PageHero
        breadcrumb="Contact & devis"
        eyebrow="Contact et devis"
        title="Parlons de votre projet"
        intro="Vous avez un projet ? Contactez-nous dès aujourd’hui pour un devis personnalisé. Nous répondons rapidement, et nous nous déplaçons."
        media="/media/hero-contact.mp4"
        poster="/media/posters/hero-contact.jpg"
        effect="radar"
      />

      <Marquee items={marqueeItems} className="border-y border-paper-200 bg-paper-50" duration={54} />

      <section className="py-section">
        <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <ContactInfo />
          </div>
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>

      <ServiceAreaMap />
    </div>
  );
}
