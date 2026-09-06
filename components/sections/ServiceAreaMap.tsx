'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

import SectionHeading from '@/components/ui/SectionHeading';
import ButtonLink from '@/components/ui/ButtonLink';
import { site, mapsLink, fullAddress } from '@/lib/site';

/**
 * Carte de la zone d'intervention, dessinée sur mesure à partir des
 * coordonnées réelles des communes — plutôt qu'un iframe Google Maps clair,
 * hors charte et déposant des cookies tiers avant tout consentement.
 * (Pour passer à une vraie carte : Mapbox GL avec un style sombre — voir README.)
 */
const places = [
  { name: 'Montigny-le-Tilleul', lat: 50.3799, lng: 4.3697, base: true },
  { name: 'Charleroi', lat: 50.4114, lng: 4.4446 },
  { name: 'Farciennes', lat: 50.4297, lng: 4.5464 },
  { name: 'Châtelet', lat: 50.4033, lng: 4.5225 },
  { name: 'Thuin', lat: 50.3397, lng: 4.2872 },
  { name: 'Beaumont', lat: 50.2373, lng: 4.2394 },
  { name: 'Binche', lat: 50.4111, lng: 4.1653 },
  { name: 'Fontaine-l’Évêque', lat: 50.4103, lng: 4.3236 },
];

const SPAN_LNG = 0.52;
const SPAN_LAT = 0.34;
const center = places[0];

const project = (lat: number, lng: number) => ({
  x: 50 + ((lng - center.lng) / SPAN_LNG) * 100,
  y: 50 - ((lat - center.lat) / SPAN_LAT) * 100,
});

export default function ServiceAreaMap() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20%' });

  return (
    <section className="relative overflow-hidden py-section">
      <div className="shell grid gap-14 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Zone d’intervention"
            title="Basés à Montigny-le-Tilleul, présents dans tout le Hainaut"
            intro="Beaumont, Charleroi, Binche, Farciennes et plus largement la Wallonie et le Brabant wallon. Une zone volontairement resserrée : c’est ce qui nous permet d’intervenir vite."
          />

          <div className="mt-10 border-l border-accent/60 pl-6">
            <p className="font-display text-sm uppercase tracking-[0.14em] text-ink-900">Notre adresse</p>
            <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="mt-3 block text-ink-600 hover:text-accent">
              {fullAddress}
            </a>
            <a href={site.phone.href} className="mt-4 block font-display text-2xl text-ink-900 hover:text-accent">
              {site.phone.display}
            </a>
          </div>

          <div className="mt-10">
            <ButtonLink href="/contact">Vérifier si nous couvrons votre commune</ButtonLink>
          </div>
        </div>

        <div ref={ref} className="lg:col-span-7">
          <div className="relative aspect-[4/3] overflow-hidden border border-paper-200 bg-paper-50">
            <div className="photo-wrap absolute inset-0 opacity-30" data-accent="blue">
              <Image src="/media/sections/map-zone.jpg" alt="" fill sizes="60vw" className="photo object-cover" />
            </div>
            <div aria-hidden className="grid-bg absolute inset-0 opacity-60" />

            {/* Cercles de rayon d'intervention */}
            {[26, 44, 62].map((r, i) => (
              <motion.span
                key={r}
                aria-hidden
                initial={{ scale: 0.4, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 1.4, delay: 0.15 * i, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-1/2 top-1/2 rounded-full border border-accent/25"
                style={{ width: `${r}%`, height: `${r * 1.33}%`, transform: 'translate(-50%, -50%)' }}
              />
            ))}

            {places.map((p, i) => {
              const { x, y } = project(p.lat, p.lng);
              return (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.7, delay: 0.3 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <span className="relative flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      {p.base && (
                        <span className="absolute inline-flex h-full w-full animate-pulseRing rounded-full bg-accent/60" />
                      )}
                      <span
                        className={`relative inline-flex rounded-full ${
                          p.base ? 'h-2.5 w-2.5 bg-accent' : 'h-1.5 w-1.5 translate-x-0.5 translate-y-0.5 bg-bone-200'
                        }`}
                      />
                    </span>
                    <span
                      className={`whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.16em] ${
                        p.base ? 'text-accent' : 'text-ink-600'
                      }`}
                    >
                      {p.name}
                    </span>
                  </span>
                </motion.div>
              );
            })}

            <p className="absolute bottom-4 left-4 font-mono text-[9px] uppercase tracking-[0.2em] text-ink-400">
              Hainaut · Wallonie · Brabant wallon
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
