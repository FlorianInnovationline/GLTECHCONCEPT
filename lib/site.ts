/**
 * Source unique de vérité pour les données de l'entreprise (NAP, agréments, zones).
 * Toute information factuelle affichée sur le site DOIT venir d'ici.
 */

export const site = {
  name: 'GL TECH CONCEPT',
  legalName: 'GL TECH CONCEPT SRL',
  url: 'https://www.gltechconcept.be',
  tagline: 'Chauffage · Climatisation · Électricité · Plomberie',
  positioning:
    'Votre spécialiste en chauffage à Montigny-le-Tilleul, Beaumont, Charleroi et environs',
  experienceYears: 25,
  foundedHint: '25 ans de métier',

  address: {
    street: 'Rue du Grand Chemin 28',
    postalCode: '6110',
    city: 'Montigny-le-Tilleul',
    region: 'Hainaut',
    country: 'BE',
    countryName: 'Belgique',
    lat: 50.3799,
    lng: 4.3697,
  },

  phone: {
    display: '071 14 34 47',
    href: 'tel:+3271143447',
    international: '+32 71 14 34 47',
  },

  /**
   * ⚠️ À CONFIRMER AVANT MISE EN LIGNE — adresse e-mail masquée lors de l'extraction
   * du site actuel. Récupérer la valeur exacte sur la page Contact de gltechconcept.be
   * puis passer `emailConfirmed` à true.
   */
  email: 'info@gltechconcept.be',
  emailConfirmed: false,

  vat: 'BE 0829.021.287',

  /** ⚠️ À CONFIRMER — horaires absents du site actuel. Valeurs provisoires. */
  hours: [
    { days: 'Lundi – Vendredi', time: '08:00 – 18:00' },
    { days: 'Samedi', time: 'Sur rendez-vous' },
    { days: 'Dimanche', time: 'Fermé' },
  ],
  hoursConfirmed: false,

  social: {
    facebook: 'https://www.facebook.com/',
    trustup: 'https://www.trustup.be/',
  },

  /** Agréments réellement mentionnés par l'entreprise. Ne rien inventer ici. */
  certifications: [
    { label: 'Agréé gaz G1 & G2', short: 'Gaz G1/G2' },
    { label: 'Agréé installations mazout', short: 'Mazout' },
    { label: 'Frigoriste catégorie 1', short: 'Frigoriste cat. 1' },
    { label: '25 ans d’expérience', short: '25 ans' },
  ],

  serviceAreas: [
    'Montigny-le-Tilleul',
    'Beaumont',
    'Charleroi',
    'Binche',
    'Farciennes',
    'Hainaut',
    'Wallonie',
    'Brabant wallon',
  ],

  primaryAreas: ['Montigny-le-Tilleul', 'Beaumont', 'Charleroi'],
} as const;

export const fullAddress = `${site.address.street}, ${site.address.postalCode} ${site.address.city}, ${site.address.countryName}`;

export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${site.address.street} ${site.address.postalCode} ${site.address.city}`
)}`;

/** Bandeau défilant : agréments + zones. */
export const marqueeItems = [
  'Agréé gaz G1 & G2',
  'Installations mazout',
  'Frigoriste catégorie 1',
  '25 ans d’expérience',
  'Devis gratuit',
  'Montigny-le-Tilleul',
  'Beaumont',
  'Charleroi',
  'Binche',
  'Farciennes',
  'Hainaut',
  'Brabant wallon',
];
