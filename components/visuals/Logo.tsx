import Link from 'next/link';
import { cn } from '@/lib/utils';

/**
 * Marque provisoire : monogramme (flamme + goutte, énergie et fluide) + logotype.
 * ⚠️ À remplacer par le logo vectoriel du client dès réception.
 */
export default function Logo({ className, onDark = false }: { className?: string; onDark?: boolean }) {
  return (
    <Link href="/" aria-label="GL TECH CONCEPT — accueil" className={cn('group flex items-center gap-3', className)}>
      <span className="flex h-9 w-9 items-center justify-center bg-accent">
        <svg viewBox="0 0 32 32" className="h-5 w-5" fill="none" aria-hidden>
          <path
            d="M16 4c1 5-4.5 6.5-4.5 11.5A4.5 4.5 0 0 0 16 20a4.5 4.5 0 0 0 4.5-4.5c0-2-.8-3.4-1.6-4.8C22.8 13 25 16.6 25 20.5A9 9 0 0 1 7 20.5C7 12 16 10.5 16 4Z"
            fill="#fff"
          />
        </svg>
      </span>
      <span className="leading-none">
        <span
          className={cn(
            'block font-display text-[15px] font-semibold tracking-[-0.01em]',
            onDark ? 'text-white' : 'text-ink-900'
          )}
        >
          GL Tech Concept
        </span>
        <span
          className={cn(
            'mt-1 block font-mono text-[9px] uppercase tracking-[0.22em]',
            onDark ? 'text-paper-300' : 'text-ink-400'
          )}
        >
          Chauffage · Clim · Élec
        </span>
      </span>
    </Link>
  );
}
