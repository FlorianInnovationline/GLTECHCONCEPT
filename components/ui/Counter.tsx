'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Compteur animé au moment où il entre dans le champ de vision.
 * Accepte des valeurs non numériques (ex. « G1·G2 ») qu'il affiche telles quelles.
 */
export default function Counter({
  value,
  className,
  duration = 1500,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const numeric = /^\d+$/.test(value) ? parseInt(value, 10) : null;
  const [display, setDisplay] = useState(numeric === null ? value : '0');

  useEffect(() => {
    if (numeric === null) return;
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(String(numeric));
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(String(Math.round(numeric * eased)));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [numeric, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
