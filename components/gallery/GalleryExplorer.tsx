'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { accentFor, countFor, galleryCategories, galleryImages, labelFor, totalPhotos } from '@/lib/gallery';
import { cn } from '@/lib/utils';

/**
 * Galerie filtrable + visionneuse.
 * - filtre synchronisé avec l'URL (?categorie=) : un lien de page métier ouvre
 *   directement la bonne sélection, et le filtre reste partageable ;
 * - transitions de mise en page animées (pas de re-layout brutal) ;
 * - visionneuse pilotable au clavier (←, →, Échap) et au doigt.
 */
export default function GalleryExplorer() {
  const router = useRouter();
  const params = useSearchParams();
  const active = params.get('categorie') ?? 'tout';
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = useMemo(
    () => (active === 'tout' ? galleryImages : galleryImages.filter((i) => i.category === active)),
    [active]
  );

  const setFilter = (slug: string) => {
    setLightbox(null);
    const url = slug === 'tout' ? '/realisations' : `/realisations?categorie=${slug}`;
    router.replace(url, { scroll: false });
  };

  const move = useCallback(
    (dir: number) => setLightbox((i) => (i === null ? null : (i + dir + filtered.length) % filtered.length)),
    [filtered.length]
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') move(1);
      if (e.key === 'ArrowLeft') move(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox, move]);

  const spanClass = { tall: 'row-span-2 aspect-[3/4]', wide: 'sm:col-span-2 aspect-[16/10]', square: 'aspect-square' };

  return (
    <>
      {/* Filtres */}
      <div className="sticky top-[var(--header-h)] z-40 border-b border-paper-200 bg-white/92 backdrop-blur-md">
        <div className="shell py-4">
          <div className="flex flex-wrap items-center gap-2">
          <FilterPill label="Tout" count={totalPhotos} active={active === 'tout'} onClick={() => setFilter('tout')} />
          {galleryCategories.map((c) => (
            <FilterPill
              key={c.slug}
              label={c.label}
              count={countFor(c.slug)}
              active={active === c.slug}
              onClick={() => setFilter(c.slug)}
            />
          ))}
          </div>
        </div>
      </div>

      {/* Grille */}
      <div className="shell pb-section pt-10">
        <motion.div layout className="grid auto-rows-[minmax(0,auto)] grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((img, i) => (
              <motion.button
                key={img.src}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.45, delay: Math.min(i * 0.015, 0.3), ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setLightbox(i)}
                data-accent={accentFor(img.category)}
                data-cursor="grow"
                className={cn('group relative overflow-hidden', spanClass[img.span])}
                aria-label={`Agrandir : ${img.alt}`}
              >
                <span className="photo-wrap absolute inset-0">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="photo object-cover transition-transform duration-[1.4s] ease-power group-hover:scale-110"
                  />
                </span>
                <span className="absolute inset-0 bg-gradient-to-t from-white/85 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute inset-x-0 bottom-0 translate-y-3 p-4 text-left opacity-0 transition-all duration-500 ease-power group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="block font-mono text-[9px] uppercase tracking-[0.18em] text-accent">
                    {labelFor(img.category)}
                  </span>
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Visionneuse */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[120] flex flex-col bg-white/95 backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-label="Visionneuse de photos"
          >
            <div className="flex items-center justify-between border-b border-paper-200 px-gutter py-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-600">
                {labelFor(filtered[lightbox].category)} — {lightbox + 1} / {filtered.length}
              </p>
              <button
                onClick={() => setLightbox(null)}
                aria-label="Fermer"
                className="flex h-10 w-10 items-center justify-center border border-paper-300 transition-colors hover:border-accent hover:text-accent"
              >
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                  <path d="M2 2l12 12M14 2L2 14" />
                </svg>
              </button>
            </div>

            <motion.div
              key={filtered[lightbox].src}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) move(1);
                if (info.offset.x > 80) move(-1);
              }}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex-1"
            >
              <Image
                src={filtered[lightbox].src}
                alt={filtered[lightbox].alt}
                fill
                sizes="100vw"
                className="object-contain p-4 lg:p-10"
                priority
              />
            </motion.div>

            <div className="flex items-center justify-between border-t border-paper-200 px-gutter py-5">
              <button
                onClick={() => move(-1)}
                className="flex items-center gap-3 font-display text-xs uppercase tracking-[0.16em] text-ink-700 transition-colors hover:text-accent"
              >
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                  <path d="M15 8H2M7 3L2 8l5 5" />
                </svg>
                Précédente
              </button>
              <p className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-ink-400 sm:block">
                ← → pour naviguer · Échap pour fermer
              </p>
              <button
                onClick={() => move(1)}
                className="flex items-center gap-3 font-display text-xs uppercase tracking-[0.16em] text-ink-700 transition-colors hover:text-accent"
              >
                Suivante
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                  <path d="M1 8h13M9 3l5 5-5 5" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function FilterPill({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'group relative overflow-hidden border px-4 py-2.5 font-display text-[11px] uppercase tracking-[0.14em] transition-colors duration-400',
        active ? 'border-accent bg-accent text-white' : 'border-paper-200 text-ink-600 hover:border-accent/60 hover:text-accent'
      )}
    >
      {label}
      <span className={cn('ml-2 font-mono text-[9px]', active ? 'text-white/70' : 'text-ink-400')}>{count}</span>
    </button>
  );
}
