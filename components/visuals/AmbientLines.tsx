'use client';

import { useEffect, useRef } from 'react';
import type { HeroEffect } from '@/lib/services';
import { cn } from '@/lib/utils';

/**
 * Motif d'ambiance : quelques courbes fines qui ondulent lentement, dans la
 * couleur d'accent, à très faible opacité. L'intention est celle d'un schéma
 * technique vivant — flux de chaleur, d'air ou d'eau — et non d'un effet
 * spectaculaire : 1 px de trait, aucune lueur, aucune particule.
 *
 * Le canvas 2D est préféré au WebGL : quelques courbes suffisent, le coût est
 * négligeable et le repli sans mouvement est immédiat.
 */
export default function AmbientLines({
  effect = 'shimmer',
  className,
  opacity = 0.14,
}: {
  effect?: HeroEffect;
  className?: string;
  opacity?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const accent =
      getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '14 158 110';
    const [r, g, b] = accent.split(/[\s,]+/).map(Number);

    let w = 0;
    let h = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Orientation et amplitude propres à chaque métier.
    const config = {
      shimmer: { lines: 5, vertical: true, amp: 0.11, freq: 1.5, speed: 0.16 },
      mist: { lines: 4, vertical: false, amp: 0.05, freq: 0.9, speed: 0.1 },
      airflow: { lines: 6, vertical: false, amp: 0.08, freq: 1.7, speed: 0.28 },
      circuit: { lines: 5, vertical: false, amp: 0.03, freq: 2.6, speed: 0.14 },
      radar: { lines: 4, vertical: false, amp: 0.09, freq: 1.2, speed: 0.12 },
      ripple: { lines: 5, vertical: false, amp: 0.07, freq: 2.1, speed: 0.2 },
      editorial: { lines: 3, vertical: false, amp: 0.04, freq: 0.8, speed: 0.08 },
    }[effect];

    let t = 0;
    let raf = 0;

    const draw = () => {
      t += 0.006 * config.speed * 10;
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;

      for (let i = 0; i < config.lines; i++) {
        const p = i / (config.lines - 1 || 1);
        const fade = 0.45 + 0.55 * Math.sin(t * 0.5 + i);
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity * fade})`;
        ctx.beginPath();

        if (config.vertical) {
          const x0 = w * (0.16 + p * 0.68);
          for (let y = 0; y <= h; y += 8) {
            const k = y / h;
            const x =
              x0 +
              Math.sin(k * Math.PI * config.freq + t + i * 0.8) * w * config.amp * (1 - k * 0.35);
            y === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          }
        } else {
          const y0 = h * (0.14 + p * 0.72);
          for (let x = 0; x <= w; x += 8) {
            const k = x / w;
            const y =
              y0 + Math.sin(k * Math.PI * config.freq + t + i * 0.7) * h * config.amp;
            x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    // On suspend l'animation quand l'onglet est masqué.
    const onVis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(draw);
    };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [effect, opacity]);

  return <canvas ref={ref} aria-hidden className={cn('pointer-events-none absolute inset-0 h-full w-full', className)} />;
}
