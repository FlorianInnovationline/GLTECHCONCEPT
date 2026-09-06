import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * Photo traitée en photo (charbon + accent) pour homogénéiser des visuels
 * d'origines différentes — indispensable tant que les photos du client ne sont
 * pas toutes prises dans les mêmes conditions.
 */
export default function DuotoneImage({
  src,
  alt,
  className,
  imgClassName,
  sizes = '(max-width: 768px) 100vw, 50vw',
  priority = false,
  accent,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  accent?: 'green' | 'blue';
}) {
  return (
    <div className={cn('photo-wrap relative overflow-hidden', className)} data-accent={accent}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn('photo object-cover transition-transform duration-[1.4s] ease-power', imgClassName)}
      />
    </div>
  );
}
