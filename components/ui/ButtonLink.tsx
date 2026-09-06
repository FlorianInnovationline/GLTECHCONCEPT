import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'ghost' | 'dark';
  className?: string;
};

/**
 * Bouton principal — volontairement sobre : un aplat, un filet, une flèche qui
 * avance. L'effet se limite à ce qui aide à comprendre qu'on peut cliquer.
 */
export default function ButtonLink({ href, children, variant = 'primary', className }: Props) {
  const variants = {
    primary: 'bg-accent text-white hover:bg-accent-deep',
    ghost: 'border border-paper-300 text-ink-900 hover:border-accent hover:text-accent',
    dark: 'bg-ink-900 text-white hover:bg-ink-800',
  } as const;

  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex items-center gap-3 px-6 py-3.5 font-display text-[13px] font-medium tracking-[0.02em] transition-colors duration-300 ease-power',
        variants[variant],
        className
      )}
    >
      {children}
      <svg
        viewBox="0 0 16 16"
        className="h-3.5 w-3.5 transition-transform duration-400 ease-power group-hover:translate-x-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden
      >
        <path d="M1 8h13M9 3l5 5-5 5" />
      </svg>
    </Link>
  );
}
