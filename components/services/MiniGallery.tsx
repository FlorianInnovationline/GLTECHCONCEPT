import Link from 'next/link';
import Image from 'next/image';

import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { accentFor, categoryBySlug, countFor, imagesFor, labelFor } from '@/lib/gallery';

/** Extrait de portfolio filtré sur les catégories du métier courant. */
export default function MiniGallery({
  categories,
  title = 'Nos réalisations',
  intro,
}: {
  categories: string[];
  title?: string;
  intro?: string;
}) {
  const images = imagesFor(categories).slice(0, 8);
  if (!images.length) return null;

  return (
    <section className="relative overflow-hidden py-section">
      <div className="shell">
        <SectionHeading eyebrow="Portfolio" title={title} intro={intro} />

        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4">
          {images.map((img, i) => (
            <Reveal key={img.src} delay={(i % 4) * 0.06}>
              <Link
                href={`/realisations?categorie=${img.category}`}
                data-accent={accentFor(img.category)}
                className="group block"
              >
                <div
                  className={`photo-wrap relative overflow-hidden ${
                    i % 5 === 0 ? 'aspect-[3/4]' : 'aspect-square'
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="photo object-cover transition-transform duration-[1.4s] ease-power group-hover:scale-110"
                  />
                  <span className="absolute inset-0 bg-ink-900/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-400 transition-colors group-hover:text-accent">
                  {labelFor(img.category)}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          {categories.map((c) => {
            const cat = categoryBySlug(c);
            if (!cat) return null;
            return (
              <Link
                key={c}
                href={`/realisations?categorie=${c}`}
                className="border border-paper-200 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-600 transition-colors hover:border-accent hover:text-accent"
              >
                {cat.label} · {countFor(cat.slug)}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
