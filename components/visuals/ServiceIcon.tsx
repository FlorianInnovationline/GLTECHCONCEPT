import { cn } from '@/lib/utils';
import type { Service } from '@/lib/services';

/**
 * Jeu d'icônes dessiné sur mesure pour les 7 métiers (aucune bibliothèque
 * d'icônes générique). Les tracés s'animent au survol via `group-hover`.
 */
const paths: Record<Service['icon'], JSX.Element> = {
  flame: (
    <>
      <path d="M24 6c1 7-6 9-6 16a6 6 0 0 0 12 0c0-3-1-5-2-7 5 3 8 8 8 13a12 12 0 1 1-24 0C12 18 24 16 24 6Z" />
      <path d="M24 42a6 6 0 0 0 6-6c0-3-3-5-6-9-3 4-6 6-6 9a6 6 0 0 0 6 6Z" className="opacity-60" />
    </>
  ),
  snowflake: (
    <>
      <path d="M24 4v40M6.6 14l34.8 20M6.6 34l34.8-20" />
      <path d="M24 10l-4 4m4-4l4 4M24 38l-4-4m4 4l4-4" className="opacity-70" />
      <path d="M12 17.5l.4-5.6m-.4 5.6l-5.5 1.2M36 30.5l-.4 5.6m.4-5.6l5.5-1.2" className="opacity-70" />
      <path d="M12 30.5l-5.5-1.2m5.5 1.2l.4 5.6M36 17.5l5.5 1.2M36 17.5l-.4-5.6" className="opacity-70" />
    </>
  ),
  wind: (
    <>
      <path d="M4 16h22a6 6 0 1 0-6-6" />
      <path d="M4 24h30a6 6 0 1 1-6 6" />
      <path d="M4 32h16a5 5 0 1 1-5 5" className="opacity-70" />
    </>
  ),
  bolt: (
    <>
      <path d="M27 4 10 27h11l-3 17 19-24H26l1-16Z" />
      <path d="M38 8h6M38 14h9M38 20h5" className="opacity-60" />
    </>
  ),
  shield: (
    <>
      <path d="M24 4 7 11v13c0 11 7 18 17 21 10-3 17-10 17-21V11L24 4Z" />
      <path d="M16.5 24.5 22 30l10-11" />
    </>
  ),
  droplet: (
    <>
      <path d="M24 4S10 20 10 30a14 14 0 0 0 28 0C38 20 24 4 24 4Z" />
      <path d="M17 31a7 7 0 0 0 7 7" className="opacity-70" />
    </>
  ),
  bath: (
    <>
      <path d="M4 26h40v4a10 10 0 0 1-10 10H14A10 10 0 0 1 4 30v-4Z" />
      <path d="M10 26V10a5 5 0 0 1 10 0" />
      <path d="M15 10h10" className="opacity-70" />
      <path d="M13 40l-3 4M35 40l3 4" className="opacity-70" />
    </>
  ),
};

export default function ServiceIcon({
  name,
  className,
}: {
  name: Service['icon'];
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn(
        'h-12 w-12 transition-transform duration-700 ease-power group-hover:scale-110 group-hover:-rotate-3',
        className
      )}
    >
      {paths[name]}
    </svg>
  );
}
