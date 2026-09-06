import { cn } from '@/lib/utils';
import Reveal from './Reveal';

/** En-tête de section : sur-titre, titre, chapô. Sobre par principe. */
export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  className,
  as: Tag = 'h2',
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: 'left' | 'center';
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}) {
  return (
    <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      <Reveal>
        <p className="eyebrow eyebrow-dot">{eyebrow}</p>
      </Reveal>
      <Reveal delay={0.06}>
        <Tag className="mt-5 text-display-md">{title}</Tag>
      </Reveal>
      {intro && (
        <Reveal delay={0.12}>
          <p className={cn('mt-5 max-w-prose text-lead text-ink-500', align === 'center' && 'mx-auto')}>{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
