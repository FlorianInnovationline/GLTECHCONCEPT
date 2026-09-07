/**
 * Réalisations présentées sur /realisations et en extrait sur les pages métier.
 *
 * Chaque photo est décrite explicitement : le texte alternatif décrit ce que
 * l'image montre réellement (accessibilité et référencement), il n'est pas
 * généré à partir du nom de la catégorie.
 *
 * ⚠️ Les catégories reprennent ici le contenu réel des photos fournies. Quand le
 * client transmettra ses propres chantiers, renommez les catégories d'après ses
 * réalisations (le site actuel parlait par exemple de « PAC air/eau MITSUBISHI
 * ELECTRIC ») : c'est le seul fichier à modifier, les composants suivent.
 */

export type Accent = 'green' | 'blue';

export type GalleryCategory = {
  slug: string;
  label: string;
  /** Accent visuel de la catégorie : vert pour l'énergie, bleu pour l'air et l'eau. */
  accent: Accent;
  blurb: string;
};

export type GalleryImage = {
  src: string;
  alt: string;
  category: string;
  /** Format de la vignette dans la mosaïque. */
  span: 'tall' | 'wide' | 'square';
};

export const galleryCategories: GalleryCategory[] = [
  {
    slug: 'salles-de-bain',
    label: 'Salles de bain',
    accent: 'blue',
    blurb: 'Rénovations complètes, de la dépose aux finitions.',
  },
  {
    slug: 'chauffage-pompe-a-chaleur',
    label: 'Chauffage & pompes à chaleur',
    accent: 'green',
    blurb: 'Chaudières, pompes à chaleur air/eau et locaux techniques.',
  },
  {
    slug: 'coffret-electrique',
    label: 'Électricité & domotique',
    accent: 'green',
    blurb: 'Tableaux remplacés, mis en conformité et pilotage de l’habitation.',
  },
  {
    slug: 'climatisation',
    label: 'Climatisation',
    accent: 'blue',
    blurb: 'Unités murales et gainables, intérieur et extérieur.',
  },
  {
    slug: 'ventilation',
    label: 'Ventilation',
    accent: 'blue',
    blurb: 'VMC double flux, réseaux de gaines et entretien.',
  },
  {
    slug: 'plomberie-traitement-eau',
    label: 'Plomberie & traitement de l’eau',
    accent: 'blue',
    blurb: 'Tuyauteries, collecteurs et adoucisseurs d’eau.',
  },
  {
    slug: 'systemes-securite',
    label: 'Systèmes de sécurité',
    accent: 'green',
    blurb: 'Vidéosurveillance, alarme intrusion et contrôle d’accès.',
  },
  {
    slug: 'chauffage-sol',
    label: 'Chauffage au sol',
    accent: 'green',
    blurb: 'Boucles posées, collecteurs et mise en pression.',
  },
];

/** Ordre d'affichage : les catégories les mieux fournies en premier. */
export const galleryImages: GalleryImage[] = [
  // --- Salles de bain ---
  {
    src: '/media/gallery/salles-de-bain/01.jpg',
    alt: 'Salle de bain rénovée avec douche à l’italienne, meuble suspendu en bois et vasque à poser',
    category: 'salles-de-bain',
    span: 'wide',
  },
  {
    src: '/media/gallery/salles-de-bain/02.jpg',
    alt: 'Technicien GL TECH CONCEPT fixant un meuble de salle de bain sur mesure',
    category: 'salles-de-bain',
    span: 'square',
  },
  {
    src: '/media/gallery/salles-de-bain/03.jpg',
    alt: 'Salle de bain complète avec WC suspendu, douche vitrée et plan vasque',
    category: 'salles-de-bain',
    span: 'tall',
  },
  {
    src: '/media/gallery/salles-de-bain/04.jpg',
    alt: 'Salle de bain avant rénovation : baignoire, lavabo sur colonne et carrelage d’origine',
    category: 'salles-de-bain',
    span: 'square',
  },
  {
    src: '/media/gallery/salles-de-bain/05.jpg',
    alt: 'La même salle de bain après rénovation : douche de plain-pied et meuble suspendu',
    category: 'salles-de-bain',
    span: 'square',
  },

  // --- Chauffage & pompes à chaleur ---
  {
    src: '/media/gallery/chauffage-pompe-a-chaleur/01.jpg',
    alt: 'Technicien raccordant une chaudière murale à condensation et son ballon d’eau chaude',
    category: 'chauffage-pompe-a-chaleur',
    span: 'tall',
  },
  {
    src: '/media/gallery/chauffage-pompe-a-chaleur/02.jpg',
    alt: 'Unité extérieure de pompe à chaleur air/eau installée le long d’une façade en brique',
    category: 'chauffage-pompe-a-chaleur',
    span: 'wide',
  },
  {
    src: '/media/gallery/chauffage-pompe-a-chaleur/03.jpg',
    alt: 'Raccordement frigorifique et hydraulique d’une pompe à chaleur air/eau',
    category: 'chauffage-pompe-a-chaleur',
    span: 'square',
  },
  {
    src: '/media/gallery/chauffage-pompe-a-chaleur/04.jpg',
    alt: 'Local technique achevé : chaudière murale, ballon, vase d’expansion et coffret électrique',
    category: 'chauffage-pompe-a-chaleur',
    span: 'wide',
  },

  // --- Électricité & domotique ---
  {
    src: '/media/gallery/coffret-electrique/01.jpg',
    alt: 'Coffret électrique neuf, circuits repérés et protections différentielles',
    category: 'coffret-electrique',
    span: 'wide',
  },
  {
    src: '/media/gallery/coffret-electrique/02.jpg',
    alt: 'Électricien câblant un tableau divisionnaire lors d’une mise en conformité',
    category: 'coffret-electrique',
    span: 'tall',
  },
  {
    src: '/media/gallery/coffret-electrique/03.jpg',
    alt: 'Écran de domotique mural pilotant l’éclairage et le chauffage du séjour',
    category: 'coffret-electrique',
    span: 'square',
  },

  // --- Climatisation ---
  {
    src: '/media/gallery/climatisation/01.jpg',
    alt: 'Séjour équipé d’une climatisation réversible murale discrète',
    category: 'climatisation',
    span: 'wide',
  },
  {
    src: '/media/gallery/climatisation/02.jpg',
    alt: 'Pose et mise à niveau d’une unité intérieure de climatisation murale',
    category: 'climatisation',
    span: 'square',
  },

  // --- Ventilation ---
  {
    src: '/media/gallery/ventilation/01.jpg',
    alt: 'Caisson de ventilation double flux et réseau de gaines isolées installés sous toiture',
    category: 'ventilation',
    span: 'wide',
  },
  {
    src: '/media/gallery/ventilation/02.jpg',
    alt: 'Technicien intervenant sur le réseau de gaines d’une ventilation double flux',
    category: 'ventilation',
    span: 'square',
  },

  // --- Plomberie & traitement de l’eau ---
  {
    src: '/media/gallery/plomberie-traitement-eau/01.jpg',
    alt: 'Tuyauterie cuivre, vannes et manomètre sur le départ d’une installation de chauffage',
    category: 'plomberie-traitement-eau',
    span: 'square',
  },
  {
    src: '/media/gallery/plomberie-traitement-eau/02.jpg',
    alt: 'Adoucisseur d’eau et bac à sel raccordés sur l’arrivée générale',
    category: 'plomberie-traitement-eau',
    span: 'tall',
  },

  // --- Systèmes de sécurité ---
  {
    src: '/media/gallery/systemes-securite/01.jpg',
    alt: 'Caméra de vidéosurveillance installée sous la corniche d’une habitation',
    category: 'systemes-securite',
    span: 'wide',
  },
  {
    src: '/media/gallery/systemes-securite/02.jpg',
    alt: 'Installation d’un clavier d’alarme anti-intrusion près de la porte d’entrée',
    category: 'systemes-securite',
    span: 'square',
  },

  // --- Chauffage au sol ---
  {
    src: '/media/gallery/chauffage-sol/01.jpg',
    alt: 'Boucles de chauffage au sol posées et raccordées au collecteur, avant chape',
    category: 'chauffage-sol',
    span: 'wide',
  },
];

/** Nombre de photos par catégorie — déduit des images, jamais saisi à la main. */
export const countFor = (slug: string) => galleryImages.filter((i) => i.category === slug).length;

export const categoryBySlug = (slug: string) => galleryCategories.find((c) => c.slug === slug);

export const imagesFor = (categories: string[]) =>
  galleryImages.filter((img) => categories.includes(img.category));

export const totalPhotos = galleryImages.length;

/** Libellé de la catégorie d'une image (utilisé dans la galerie et la visionneuse). */
export const labelFor = (categorySlug: string) => categoryBySlug(categorySlug)?.label ?? '';

/** Accent visuel de la catégorie d'une image. */
export const accentFor = (categorySlug: string): Accent => categoryBySlug(categorySlug)?.accent ?? 'green';
