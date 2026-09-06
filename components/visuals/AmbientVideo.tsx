'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * Média d'arrière-plan (photo + boucle vidéo silencieuse).
 * - l'image est toujours rendue : aperçu immédiat et repli complet
 *   (mouvement réduit, mode économie de données) ;
 * - la vidéo n'est chargée qu'à l'approche du viewport ;
 * - un voile clair garantit la lisibilité du texte par-dessus.
 */
export default function AmbientVideo({
  src,
  poster,
  alt,
  className,
  priority = false,
  overlay = 'light',
}: {
  src: string;
  poster: string;
  alt: string;
  className?: string;
  priority?: boolean;
  overlay?: 'light' | 'dark' | 'none';
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = (navigator as any)?.connection?.saveData === true;
    if (reduce || saveData) return;

    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: '400px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className={cn('photo-wrap absolute inset-0 overflow-hidden', className)}>
      <Image
        src={poster}
        alt={alt}
        fill
        priority={priority}
        sizes="100vw"
        className={cn('photo object-cover transition-opacity duration-1000', ready && 'opacity-0')}
      />
      {load && (
        <video
          data-ambient
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={poster}
          onCanPlay={() => setReady(true)}
          className={cn(
            'photo absolute inset-0 h-full w-full object-cover transition-opacity duration-1000',
            ready ? 'opacity-100' : 'opacity-0'
          )}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}

      {overlay === 'light' && (
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/86 to-white/50" />
      )}
      {overlay === 'dark' && <div className="absolute inset-0 bg-ink-900/78" />}
    </div>
  );
}
