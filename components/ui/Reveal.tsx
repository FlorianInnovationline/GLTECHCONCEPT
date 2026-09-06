'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'li' | 'span' | 'section';
};

/**
 * Révélation au défilement, en amélioration progressive :
 * le contenu est visible par défaut et n'est masqué que si le JavaScript a
 * confirmé qu'il peut l'animer (classe `js` posée sur <html> avant le premier
 * rendu). Si le script échoue, la page reste entièrement lisible.
 * L'animation elle-même est une transition CSS déclenchée par IntersectionObserver.
 */
export default function Reveal({ children, delay = 0, className, as: Tag = 'div' }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-in');
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.classList.add('is-in');
        io.disconnect();
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref as any} className={cn('reveal', className)} style={{ ['--d' as any]: `${delay}s` }}>
      {children}
    </Tag>
  );
}
