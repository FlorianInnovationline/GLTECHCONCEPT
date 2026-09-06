import { cn } from '@/lib/utils';

/**
 * Bandeau défilant (agréments, zones desservies) — discret, un seul filet de
 * texte. Le contenu est dupliqué pour la boucle ; la copie est masquée aux
 * lecteurs d'écran.
 */
export default function Marquee({
  items,
  className,
  duration = 60,
}: {
  items: string[];
  className?: string;
  duration?: number;
}) {
  const row = (hidden: boolean) => (
    <div className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <span key={`${item}-${i}`} className="flex items-center gap-10 whitespace-nowrap">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-500">{item}</span>
          <span className="h-1 w-1 rounded-full bg-accent" />
        </span>
      ))}
    </div>
  );

  return (
    <div className={cn('mask-fade-x relative flex overflow-hidden py-4', className)}>
      <div className="flex animate-marquee" style={{ ['--marquee-duration' as any]: `${duration}s` }}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
