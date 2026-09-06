'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import SectionHeading from '@/components/ui/SectionHeading';
import ButtonLink from '@/components/ui/ButtonLink';
import { galleryCategories, galleryImages } from '@/lib/gallery';

/** Une image représentative par catégorie, présentée en bande déplaçable. */
const featured = galleryCategories.map((cat) => ({
  ...cat,
  image: galleryImages.find((img) => img.category === cat.slug)!,
}));

export default function FeaturedWork() {
  const wrap = useRef<HTMLDivElement>(null);
  const [drag, setDrag] = useState(0);

  useEffect(() => {
    const measure = () => {
      const el = wrap.current;
      if (!el) return;
      setDrag(Math.max(0, el.scrollWidth - el.offsetWidth));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  return (
    <section className="relative overflow-hidden py-section">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow="Réalisations"
            title="Des chantiers, pas des images de catalogue"
            intro="Pompes à chaleur, planchers chauffants, tableaux électriques remplacés, salles de bain refaites : voici ce que nous laissons derrière nous."
            className="flex-1"
          />
          <ButtonLink href="/realisations" variant="ghost" className="shrink-0">
            Voir toutes les réalisations
          </ButtonLink>
        </div>
      </div>

      <div ref={wrap} className="shell mt-14 cursor-grab active:cursor-grabbing" data-cursor="grow">
        <motion.div
          drag="x"
          dragConstraints={{ left: -drag, right: 0 }}
          dragElastic={0.08}
          dragMomentum
          className="flex gap-4"
        >
          {featured.map((cat, i) => (
            <Link
              key={cat.slug}
              href={`/realisations?categorie=${cat.slug}`}
              data-accent={cat.accent}
              className="group relative block w-[74vw] shrink-0 sm:w-[26rem]"
              draggable={false}
            >
              <div className="photo-wrap relative aspect-[4/5] overflow-hidden">
                <Image
                  src={cat.image.src}
                  alt={cat.label}
                  fill
                  sizes="(max-width: 640px) 74vw, 26rem"
                  className="photo object-cover transition-transform duration-[1.4s] ease-power group-hover:scale-[1.07]"
                  draggable={false}
                />
                <span className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-white to-transparent" />
                <span className="absolute left-5 top-5 border border-paper-300 bg-white/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-900 backdrop-blur">
                  {String(i + 1).padStart(2, '0')} / {featured.length}
                </span>
              </div>
              <div className="relative -mt-16 px-5 pb-5">
                <h3 className="font-display text-lg leading-tight tracking-tight text-ink-900">
                  {cat.label}
                </h3>
                <p className="mt-2 text-sm text-ink-400">{cat.blurb}</p>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                  {cat.count} photos
                </p>
              </div>
            </Link>
          ))}
        </motion.div>

        <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.24em] text-ink-400">
          ← Faites glisser pour parcourir →
        </p>
      </div>
    </section>
  );
}
