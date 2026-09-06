/**
 * Catégories de réalisations reprises 1:1 du site actuel (avec le nombre de photos).
 * ⚠️ Les visuels référencés ici sont des PLACEHOLDERS générés (voir /scripts).
 * Remplacer fichier par fichier dans /public/media/gallery/<categorie>/ par les
 * vraies photos de chantier fournies par le client — les noms de fichiers ne changent pas.
 */

export type GalleryCategory = {
  slug: string;
  label: string;
  count: number;
  /** Accent visuel appliqué au photo de la vignette. */
  accent: 'green' | 'blue';
  blurb: string;
};

export const galleryCategories: GalleryCategory[] = [
  {
    slug: 'realisations-salle-de-bain',
    label: 'Réalisations de salle de bain',
    count: 22,
    accent: 'blue',
    blurb: 'Rénovations complètes, de la dépose aux finitions.',
  },
  {
    slug: 'coffret-electrique',
    label: 'Remplacement de coffret électrique',
    count: 15,
    accent: 'green',
    blurb: 'Tableaux remplacés et mis en conformité.',
  },
  {
    slug: 'chauffage-sol',
    label: 'Chauffage au sol',
    count: 14,
    accent: 'green',
    blurb: 'Boucles posées, collecteurs et mise en pression.',
  },
  {
    slug: 'climatisation',
    label: 'Climatisation',
    count: 10,
    accent: 'blue',
    blurb: 'Unités murales et gainables, intérieur et extérieur.',
  },
  {
    slug: 'pac-air-eau-mitsubishi',
    label: 'PAC air/eau MITSUBISHI ELECTRIC',
    count: 10,
    accent: 'green',
    blurb: 'Pompes à chaleur air/eau installées et mises en service.',
  },
  {
    slug: 'salle-de-bain',
    label: 'Salle de bain',
    count: 9,
    accent: 'blue',
    blurb: 'Douches, baignoires et mobilier sur mesure.',
  },
  {
    slug: 'realisation-personnalisee',
    label: 'Réalisation personnalisée sur demande',
    count: 6,
    accent: 'green',
    blurb: 'Demandes spécifiques, solutions dessinées pour le lieu.',
  },
  {
    slug: 'adoucisseur-eau',
    label: 'Adoucisseur d’eau',
    count: 2,
    accent: 'blue',
    blurb: 'Traitement de l’eau et protection des installations.',
  },
];

export type GalleryImage = {
  src: string;
  alt: string;
  category: string;
  categoryLabel: string;
  accent: 'green' | 'blue';
  /** Format de la vignette dans la grille en mosaïque. */
  span: 'tall' | 'wide' | 'square';
};

const spanPattern: GalleryImage['span'][] = ['tall', 'square', 'wide', 'square', 'square', 'tall', 'wide', 'square'];

export const galleryImages: GalleryImage[] = galleryCategories.flatMap((cat) =>
  Array.from({ length: cat.count }, (_, i) => ({
    src: `/media/gallery/${cat.slug}/${String(i + 1).padStart(2, '0')}.jpg`,
    alt: `${cat.label} — réalisation GL TECH CONCEPT ${i + 1}`,
    category: cat.slug,
    categoryLabel: cat.label,
    accent: cat.accent,
    span: spanPattern[(i + cat.slug.length) % spanPattern.length],
  }))
);

export const imagesFor = (categories: string[]) =>
  galleryImages.filter((img) => categories.includes(img.category));

export const totalPhotos = galleryCategories.reduce((n, c) => n + c.count, 0);

export const categoryBySlug = (slug: string) => galleryCategories.find((c) => c.slug === slug);
