export type Accent = 'green' | 'blue';

export type HeroEffect =
  | 'shimmer'   // chaleur qui monte
  | 'mist'      // air froid / brume
  | 'airflow'   // flux d'air (VMC)
  | 'circuit'   // traces électriques
  | 'radar'     // balayage / détection
  | 'ripple'    // eau
  | 'editorial'; // photo, peu d'effet (sanitaires)

export type Service = {
  slug: string;
  title: string;
  navLabel: string;
  group: 'chauffage' | 'electricite' | 'securite' | 'plomberie';
  accent: Accent;
  index: string;
  icon: 'flame' | 'snowflake' | 'wind' | 'bolt' | 'shield' | 'droplet' | 'bath';
  teaser: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  hero: { eyebrow: string; h1: string; sub: string; effect: HeroEffect; media: string; poster: string };
  intro: { eyebrow: string; title: string; paragraphs: string[]; bullets: string[] };
  second: { eyebrow: string; title: string; paragraphs: string[]; bullets: string[] };
  stats: { value: string; label: string }[];
  galleryCategories: string[];
  faq: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: 'chauffage-pompe-a-chaleur',
    title: 'Chauffage et Pompe à chaleur',
    navLabel: 'Chauffage et Pompe à chaleur',
    group: 'chauffage',
    accent: 'green',
    index: '01',
    icon: 'flame',
    teaser:
      'Chaudières à condensation, pompes à chaleur air/eau et chauffage au sol : le bon système, dimensionné pour votre habitation.',
    metaTitle: 'Chauffage et pompe à chaleur à Montigny-le-Tilleul, Beaumont & Charleroi',
    metaDescription:
      'Installation, entretien et dépannage de chauffage et de pompes à chaleur à Montigny-le-Tilleul, Beaumont et Charleroi. Chaudière à condensation, chauffage au sol, ramonage et tubage. Techniciens agréés gaz G1/G2 et mazout.',
    keywords: [
      'chauffage', 'pompe à chaleur', 'chaudière', 'chaudière à condensation', 'chauffage au gaz',
      'chauffage au mazout', 'chauffage central', 'chauffage électrique', 'chauffage infrarouge',
      'chauffage sol', 'ramonage', 'tubage de cheminée',
    ],
    hero: {
      eyebrow: 'Expertise 01 — Chaleur',
      h1: 'Chauffage et Pompe à chaleur',
      sub: 'Systèmes de chauffage et pompes à chaleur à Montigny-le-Tilleul, Beaumont et Charleroi.',
      effect: 'shimmer',
      media: '/media/hero-chauffage.mp4',
      poster: '/media/posters/hero-chauffage.jpg',
    },
    intro: {
      eyebrow: 'Installation',
      title: 'Le bon système, calculé pour votre habitation',
      paragraphs: [
        "GL TECH CONCEPT installe vos systèmes de chauffage et vos pompes à chaleur à Montigny-le-Tilleul, en Wallonie et en Brabant wallon. Avant tout devis, notre équipe évalue vos besoins réels en confort thermique — volume, isolation, usage, budget — pour vous orienter vers la solution la plus juste : chauffage central ou pompe à chaleur.",
        "Les chaudières à condensation que nous posons offrent un rendement élevé, réduisent votre facture énergétique et répondent aux normes environnementales actuelles. Les pompes à chaleur, elles, puisent l'énergie dans l'air ou dans le sol pour chauffer efficacement votre logement tout en réduisant son empreinte carbone.",
        "Nous réalisons également le chauffage au sol, pour une diffusion homogène de la chaleur, particulièrement adapté aux habitations modernes et aux basses températures de départ. Chaque installation respecte scrupuleusement les normes de sécurité et d'efficacité énergétique en vigueur.",
      ],
      bullets: [
        'Chaudières à condensation gaz & mazout',
        'Pompes à chaleur air/eau et géothermiques',
        'Chauffage au sol basse température',
        'Chauffage central, électrique et infrarouge',
      ],
    },
    second: {
      eyebrow: 'Entretien & dépannage',
      title: 'Entretien et dépannage de chauffage à Montigny-le-Tilleul',
      paragraphs: [
        "Un entretien régulier reste la condition première de la longévité et de la sécurité de votre installation. Nous assurons le nettoyage complet, le ramonage et la vérification de l'ensemble des équipements afin de prévenir les pannes et d'optimiser les performances de votre système.",
        "Nos techniciens, agréés pour les installations au gaz et au mazout, interviennent rapidement en cas de panne de chaudière, d'engorgement d'un circuit de chauffage au sol ou de fuite sur une pompe à chaleur. Nous réalisons aussi le tubage de cheminée, garantissant un tirage correct et écartant tout risque d'incendie.",
      ],
      bullets: [
        'Entretien annuel & attestation',
        'Ramonage et tubage de cheminée',
        'Dépannage chaudière, PAC, plancher chauffant',
        'Contrats d’entretien sur mesure',
      ],
    },
    stats: [
      { value: '25', label: 'ans d’expérience' },
      { value: 'G1·G2', label: 'agréments gaz' },
      { value: '48h', label: 'délai d’intervention visé' },
    ],
    galleryCategories: ['chauffage-pompe-a-chaleur', 'chauffage-sol'],
    faq: [
      {
        q: 'Chaudière à condensation ou pompe à chaleur ?',
        a: "Cela dépend de l'isolation du bâtiment, des émetteurs existants (radiateurs haute température ou plancher chauffant) et de votre raccordement au gaz. Nous réalisons une évaluation sur place avant toute recommandation, sans engagement.",
      },
      {
        q: 'À quelle fréquence entretenir mon installation ?',
        a: "En Wallonie, l'entretien d'une chaudière au gaz est requis tous les deux ans et celui d'une chaudière au mazout chaque année. Pour une pompe à chaleur, un contrôle annuel préserve le rendement et la garantie constructeur.",
      },
      {
        q: 'Existe-t-il des primes pour une pompe à chaleur ?',
        a: "Des primes régionales existent en Wallonie pour les systèmes de chauffage performants. Les montants et conditions évoluent régulièrement : nous faisons le point avec vous sur les dispositifs en vigueur au moment de votre projet.",
      },
      {
        q: 'Intervenez-vous en dehors de Montigny-le-Tilleul ?',
        a: 'Oui — Beaumont, Charleroi, Binche, Farciennes et plus largement tout le Hainaut, la Wallonie et le Brabant wallon.',
      },
    ],
  },
  {
    slug: 'climatisation',
    title: 'Climatisation',
    navLabel: 'Climatisation',
    group: 'chauffage',
    accent: 'blue',
    index: '02',
    icon: 'snowflake',
    teaser:
      'Climatisation réversible murale ou gainable : rafraîchir l’été, chauffer l’hiver, avec une consommation maîtrisée.',
    metaTitle: 'Climatisation réversible à Montigny-le-Tilleul, Beaumont & Charleroi',
    metaDescription:
      'Installation et entretien de systèmes de climatisation réversible — climatiseur mural, gainable, pompe à chaleur air/air — à Montigny-le-Tilleul, Beaumont et Charleroi. Frigoriste catégorie 1.',
    keywords: ['climatisation réversible', 'climatiseur mural', 'climatiseur gainable', 'pompe à chaleur réversible', 'climatisation Charleroi'],
    hero: {
      eyebrow: 'Expertise 02 — Air',
      h1: 'Systèmes de climatisation',
      sub: 'Climatisation réversible à Montigny-le-Tilleul, Beaumont et Charleroi.',
      effect: 'mist',
      media: '/media/hero-climatisation.mp4',
      poster: '/media/posters/hero-climatisation.jpg',
    },
    intro: {
      eyebrow: 'Installation',
      title: 'Un seul système, deux saisons',
      paragraphs: [
        "Nous installons des systèmes de climatisation performants et adaptés à chaque espace : unités murales pour une pièce de vie, systèmes gainables intégrés au plafond pour une diffusion invisible dans toute l'habitation.",
        "Nos solutions réversibles rafraîchissent en été et chauffent en hiver — un seul équipement pour un confort constant toute l'année, avec une consommation énergétique optimisée et une fiabilité durable. Notre qualification de frigoriste catégorie 1 nous autorise à manipuler l'ensemble des fluides frigorigènes concernés.",
      ],
      bullets: [
        'Climatiseurs muraux mono et multi-split',
        'Systèmes gainables discrets',
        'Réversible : froid en été, chaud en hiver',
        'Dimensionnement pièce par pièce',
      ],
    },
    second: {
      eyebrow: 'Entretien & dépannage',
      title: 'Entretien de climatisation et intervention rapide',
      paragraphs: [
        "L'entretien de votre climatisation conditionne directement sa performance et la qualité de l'air que vous respirez. Nous assurons le nettoyage des filtres, la vérification des unités intérieures et extérieures ainsi que le contrôle des performances énergétiques du système.",
        "En cas de panne, nous intervenons rapidement pour rétablir votre confort. Des contrats d'entretien personnalisés vous permettent d'anticiper plutôt que de subir.",
      ],
      bullets: [
        'Nettoyage et remplacement des filtres',
        'Contrôle d’étanchéité et de charge',
        'Vérification des performances énergétiques',
        'Contrats d’entretien personnalisés',
      ],
    },
    stats: [
      { value: 'Cat. 1', label: 'frigoriste agréé' },
      { value: 'A+++', label: 'équipements haut rendement' },
      { value: '2en1', label: 'chaud & froid' },
    ],
    galleryCategories: ['climatisation'],
    faq: [
      {
        q: 'Une climatisation réversible peut-elle chauffer toute la maison ?',
        a: "Elle constitue un excellent appoint et peut suffire dans un logement bien isolé. Pour une habitation plus ancienne, nous l'associons généralement à un système de chauffage central existant.",
      },
      {
        q: 'Mural ou gainable ?',
        a: "Le mural est plus rapide et plus économique à installer ; le gainable disparaît dans les faux plafonds et traite plusieurs pièces avec une seule machine. Le choix se fait sur place selon la configuration.",
      },
      {
        q: 'Un entretien est-il obligatoire ?',
        a: "Un contrôle d'étanchéité périodique est imposé selon la charge en fluide frigorigène de l'installation. Nous vous indiquons la fréquence exacte applicable à votre équipement.",
      },
    ],
  },
  {
    slug: 'ventilation',
    title: 'Ventilation',
    navLabel: 'Ventilation',
    group: 'chauffage',
    accent: 'blue',
    index: '03',
    icon: 'wind',
    teaser:
      'VMC simple et double flux : renouveler l’air en continu, chasser l’humidité, sans jeter la chaleur par la fenêtre.',
    metaTitle: 'Ventilation & VMC double flux à Montigny-le-Tilleul, Beaumont & Charleroi',
    metaDescription:
      'Installation et entretien de systèmes de ventilation mécanique contrôlée (VMC) et de VMC double flux à Montigny-le-Tilleul, Beaumont et Charleroi. Qualité de l’air, humidité, récupération de chaleur.',
    keywords: ['VMC', 'ventilation double flux', 'qualité de l’air', 'ventilation mécanique contrôlée', 'humidité'],
    hero: {
      eyebrow: 'Expertise 03 — Flux',
      h1: 'Ventilation',
      sub: 'VMC et ventilation double flux à Montigny-le-Tilleul, Beaumont et Charleroi.',
      effect: 'airflow',
      media: '/media/hero-ventilation.mp4',
      poster: '/media/posters/hero-ventilation.jpg',
    },
    intro: {
      eyebrow: 'Installation',
      title: 'Un air renouvelé en permanence',
      paragraphs: [
        "Nous installons des systèmes de ventilation mécanique contrôlée complets, garantissant un renouvellement constant de l'air intérieur. Résultat : une meilleure qualité d'air, moins de polluants, et des problèmes d'humidité — condensation, moisissures, odeurs persistantes — qui disparaissent durablement.",
        "Pour les habitations basse énergie et passives, nous proposons la ventilation double flux : l'air extrait cède sa chaleur à l'air neuf entrant, ce qui préserve votre confort thermique tout en réduisant nettement vos pertes énergétiques.",
      ],
      bullets: [
        'VMC simple flux pour rénovation',
        'VMC double flux à récupération de chaleur',
        'Réseaux de gaines dimensionnés et équilibrés',
        'Adapté aux logements basse énergie et passifs',
      ],
    },
    second: {
      eyebrow: 'Entretien & dépannage',
      title: 'Un système mal entretenu perd son intérêt',
      paragraphs: [
        "Une ventilation négligée voit son efficacité chuter et peut, à terme, dégrader la qualité de l'air qu'elle est censée assainir. Nous prenons en charge le nettoyage des filtres, la vérification des bouches d'extraction et l'évaluation des performances de l'installation.",
        "En cas de dysfonctionnement — bruit anormal, débit insuffisant, condensation persistante — nous intervenons rapidement, et proposons des contrats d'entretien adaptés à votre équipement.",
      ],
      bullets: [
        'Nettoyage et remplacement des filtres',
        'Vérification des bouches et des débits',
        'Mesure des performances',
        'Contrats d’entretien adaptés',
      ],
    },
    stats: [
      { value: '90%', label: 'chaleur récupérable en double flux' },
      { value: '24/7', label: 'renouvellement continu' },
      { value: '0', label: 'condensation persistante' },
    ],
    galleryCategories: ['ventilation'],
    faq: [
      {
        q: 'Simple flux ou double flux ?',
        a: "La double flux récupère la chaleur de l'air extrait : c'est le choix logique en construction neuve ou en rénovation lourde bien isolée. En rénovation légère, une simple flux bien dimensionnée reste souvent la solution la plus pertinente.",
      },
      {
        q: 'Une VMC est-elle bruyante ?',
        a: "Une installation correctement dimensionnée, avec des gaines isolées et un caisson désolidarisé, reste très discrète. Le bruit provient presque toujours d'un défaut de pose ou d'un encrassement.",
      },
      {
        q: 'À quelle fréquence changer les filtres ?',
        a: 'En général tous les six à douze mois selon l’environnement. Nous intégrons ce remplacement dans nos contrats d’entretien.',
      },
    ],
  },
  {
    slug: 'electricite-generale',
    title: 'Électricité générale',
    navLabel: 'Électricité générale',
    group: 'electricite',
    accent: 'green',
    index: '04',
    icon: 'bolt',
    teaser:
      'Installation, mise en conformité, éclairage et domotique — du tableau électrique au pilotage de toute la maison.',
    metaTitle: 'Électricité générale & mise en conformité — Montigny-le-Tilleul, Charleroi',
    metaDescription:
      'Installation électrique, mise en conformité, éclairage intérieur et extérieur, domotique et dépannage électrique à Montigny-le-Tilleul, Beaumont, Charleroi et en Brabant wallon.',
    keywords: ['électricité générale', 'mise en conformité', 'domotique', 'éclairage intérieur', 'éclairage extérieur', 'dépannage électrique', 'tableau électrique', 'borne de recharge'],
    hero: {
      eyebrow: 'Expertise 04 — Énergie',
      h1: 'Électricité générale',
      sub: 'Installation, mise en conformité et domotique en Wallonie et en Brabant wallon.',
      effect: 'circuit',
      media: '/media/hero-electricite.mp4',
      poster: '/media/posters/hero-electricite.jpg',
    },
    intro: {
      eyebrow: 'Installation',
      title: 'Une installation saine, conforme, évolutive',
      paragraphs: [
        "Nous réalisons vos installations électriques complètes et vos mises en conformité, en construction neuve comme en rénovation, à Montigny-le-Tilleul, en Wallonie et en Brabant wallon. Tableau électrique, circuits, protections différentielles : chaque intervention respecte la réglementation en vigueur.",
        "Nous concevons également votre éclairage intérieur et extérieur — un travail de mise en lumière autant que d'électricité — et installons des solutions de domotique permettant de piloter à distance l'éclairage, le chauffage et la sécurité de votre habitation. Bornes de recharge pour véhicules électriques sur demande.",
      ],
      bullets: [
        'Installation neuve et rénovation complète',
        'Mise en conformité et remplacement de coffret',
        'Éclairage intérieur & extérieur',
        'Domotique et bornes de recharge',
      ],
    },
    second: {
      eyebrow: 'Sécurité & dépannage',
      title: 'Systèmes de sécurité et dépannage électrique',
      paragraphs: [
        "Nous installons également les systèmes qui protègent votre bien : alarmes incendie, caméras de vidéosurveillance, détection d'intrusion et contrôle d'accès, configurés pour votre habitation ou vos locaux professionnels.",
        "En cas de panne, de court-circuit ou de disjonction répétée, nos électriciens identifient rapidement l'origine du défaut et rétablissent votre installation en toute sécurité.",
      ],
      bullets: [
        'Alarme incendie & détection d’intrusion',
        'Vidéosurveillance et contrôle d’accès',
        'Recherche de panne et dépannage',
        'Interventions résidentielles & professionnelles',
      ],
    },
    stats: [
      { value: '100%', label: 'conforme RGIE' },
      { value: 'RGIE', label: 'contrôles accompagnés' },
      { value: '25', label: 'ans de métier' },
    ],
    galleryCategories: ['coffret-electrique'],
    faq: [
      {
        q: "Qu'implique une mise en conformité ?",
        a: "Après le contrôle d'un organisme agréé, nous corrigeons les points signalés — mise à la terre, différentiels, sections de câbles, repérage du tableau — jusqu'à l'obtention d'un rapport conforme.",
      },
      {
        q: 'Installez-vous des bornes de recharge ?',
        a: "Oui, avec l'étude de puissance disponible et la protection adaptée. La borne est intégrée proprement à votre tableau existant ou à un tableau divisionnaire dédié.",
      },
      {
        q: 'Quel délai pour un dépannage électrique ?',
        a: 'Nous priorisons les situations à risque et intervenons dans les meilleurs délais sur notre zone : Montigny-le-Tilleul, Beaumont, Charleroi et environs.',
      },
    ],
  },
  {
    slug: 'systemes-securite',
    title: 'Systèmes de sécurité',
    navLabel: 'Systèmes de sécurité',
    group: 'securite',
    accent: 'green',
    index: '05',
    icon: 'shield',
    teaser:
      'Alarme incendie, détection d’intrusion, vidéosurveillance et contrôle d’accès pour particuliers et professionnels.',
    metaTitle: 'Systèmes de sécurité — alarme, vidéosurveillance | Montigny-le-Tilleul',
    metaDescription:
      'Installation d’alarmes incendie, d’alarmes intrusion, de vidéosurveillance et de contrôle d’accès à Montigny-le-Tilleul, Beaumont et Charleroi. Solutions résidentielles et professionnelles.',
    keywords: ['alarme incendie', 'alarme intrusion', 'vidéosurveillance', 'contrôle d’accès', 'sécurité maison', 'caméra de surveillance'],
    hero: {
      eyebrow: 'Expertise 05 — Protection',
      h1: 'Systèmes de sécurité',
      sub: 'Alarme, vidéosurveillance et contrôle d’accès à Montigny-le-Tilleul, Beaumont, Charleroi.',
      effect: 'radar',
      media: '/media/hero-securite.mp4',
      poster: '/media/posters/hero-securite.jpg',
    },
    intro: {
      eyebrow: 'Installation',
      title: 'Détecter tôt, alerter vite',
      paragraphs: [
        "Nous proposons des solutions de sécurité complètes pour les habitations comme pour les bâtiments professionnels. Nos systèmes d'alarme incendie détectent la fumée dès les premiers instants et déclenchent une alerte immédiate, laissant le temps d'agir.",
        "Les alarmes anti-intrusion dissuadent les tentatives d'effraction et vous préviennent en temps réel. Nos installations de vidéosurveillance permettent la visualisation en direct et l'enregistrement des images, pour garder un œil sur votre bien où que vous soyez. Chaque système est configuré sur mesure et répond aux normes de sécurité en vigueur.",
      ],
      bullets: [
        'Alarme incendie et détection de fumée',
        'Alarme anti-intrusion',
        'Vidéosurveillance en direct et enregistrement',
        'Contrôle d’accès résidentiel & professionnel',
      ],
    },
    second: {
      eyebrow: 'Entretien & dépannage',
      title: 'Un système de sécurité se vérifie',
      paragraphs: [
        "Un équipement de sécurité n'a de valeur que s'il fonctionne le jour où il doit fonctionner. Nous assurons des contrôles périodiques de l'ensemble de vos dispositifs : détecteurs, centrale, caméras, alimentations de secours.",
        "En cas de défaillance ou de fausse alerte répétée, nous intervenons en urgence pour rétablir la protection de vos locaux.",
      ],
      bullets: [
        'Contrôles périodiques programmés',
        'Test des détecteurs et des alimentations',
        'Dépannage en urgence',
        'Mise à jour et extension d’installation',
      ],
    },
    stats: [
      { value: '24/7', label: 'surveillance possible' },
      { value: 'Pro', label: 'résidentiel & tertiaire' },
      { value: 'Sur mesure', label: 'configuration' },
    ],
    galleryCategories: ['systemes-securite', 'coffret-electrique'],
    faq: [
      {
        q: 'Peut-on consulter les caméras à distance ?',
        a: 'Oui. Les systèmes que nous installons permettent la visualisation en direct depuis un smartphone ou un ordinateur, ainsi que la relecture des enregistrements.',
      },
      {
        q: 'Alarme filaire ou sans fil ?',
        a: "Le filaire s'impose en construction et rénovation lourde ; le sans-fil permet d'équiper un logement occupé sans travaux. Nous combinons souvent les deux.",
      },
      {
        q: 'Installez-vous aussi pour les commerces et bureaux ?',
        a: 'Oui, avec des configurations adaptées aux locaux professionnels, y compris le contrôle d’accès du personnel.',
      },
    ],
  },
  {
    slug: 'travaux-plomberie',
    title: 'Travaux de plomberie',
    navLabel: 'Travaux de plomberie',
    group: 'plomberie',
    accent: 'blue',
    index: '06',
    icon: 'droplet',
    teaser:
      'Sanitaire neuf, adoucisseurs d’eau, boilers thermodynamiques et dépannage fuite ou engorgement avec inspection caméra.',
    metaTitle: 'Plomberie, adoucisseur d’eau & dépannage — Montigny-le-Tilleul, Charleroi',
    metaDescription:
      'Travaux de plomberie, installation de tuyauteries, boilers thermodynamiques et adoucisseurs d’eau, dépannage fuite et débouchage avec inspection caméra à Montigny-le-Tilleul, Beaumont et Charleroi.',
    keywords: ['plomberie', 'adoucisseur d’eau', 'traitement des eaux', 'boiler thermodynamique', 'dépannage fuite', 'débouchage', 'plombier Charleroi'],
    hero: {
      eyebrow: 'Expertise 06 — Eau',
      h1: 'Travaux de plomberie',
      sub: 'Installation, traitement de l’eau et dépannage à Montigny-le-Tilleul, Beaumont et Charleroi.',
      effect: 'ripple',
      media: '/media/hero-plomberie.mp4',
      poster: '/media/posters/hero-plomberie.jpg',
    },
    intro: {
      eyebrow: 'Installation',
      title: 'Des réseaux propres, pensés pour durer',
      paragraphs: [
        "Nous réalisons vos installations de plomberie complètes, en construction neuve comme en rénovation : tuyauteries, boilers thermodynamiques, chauffe-eau et adoucisseurs d'eau. Nous travaillons avec des matériaux de qualité et respectons l'ensemble des normes en vigueur.",
        "Le traitement de l'eau mérite une attention particulière dans nos régions : un adoucisseur correctement dimensionné protège votre chaudière, vos robinetteries et votre électroménager du calcaire, et allonge sensiblement leur durée de vie.",
      ],
      bullets: [
        'Tuyauteries neuves et rénovation de réseau',
        'Adoucisseurs d’eau & traitement des eaux',
        'Boilers thermodynamiques et chauffe-eau',
        'Solutions sanitaires sur mesure',
      ],
    },
    second: {
      eyebrow: 'Dépannage',
      title: 'Réparation et dépannage en plomberie',
      paragraphs: [
        "Fuite, canalisation bouchée, chauffe-eau hors service : nous intervenons rapidement pour limiter les dégâts et rétablir le fonctionnement de votre installation.",
        "Nous disposons d'un matériel d'inspection par caméra qui permet de localiser précisément un engorgement ou une fuite sans casser inutilement. Le débouchage et la réparation sont ensuite réalisés au bon endroit, du premier coup.",
      ],
      bullets: [
        'Recherche de fuite',
        'Débouchage de canalisations',
        'Inspection par caméra',
        'Remplacement de chauffe-eau',
      ],
    },
    stats: [
      { value: 'Caméra', label: 'inspection sans casse' },
      { value: 'Anti-calcaire', label: 'adoucisseurs dimensionnés' },
      { value: 'Rapide', label: 'intervention fuite' },
    ],
    galleryCategories: ['plomberie-traitement-eau'],
    faq: [
      {
        q: 'Un adoucisseur est-il vraiment utile ici ?',
        a: "L'eau distribuée dans le Hainaut est généralement calcaire. Un adoucisseur protège les échangeurs de chaudière, les robinetteries et l'électroménager, et réduit nettement l'entretien.",
      },
      {
        q: 'Comment localisez-vous une fuite invisible ?',
        a: "Nous utilisons une caméra d'inspection dans les canalisations, ce qui permet d'identifier le point exact avant toute ouverture — un gain de temps et de budget considérable.",
      },
      {
        q: 'Intervenez-vous en urgence ?',
        a: 'Nous traitons en priorité les fuites actives et les engorgements qui menacent le bâti. Contactez-nous par téléphone pour les situations urgentes.',
      },
    ],
  },
  {
    slug: 'sanitaires',
    title: 'Sanitaires',
    navLabel: 'Sanitaires',
    group: 'plomberie',
    accent: 'blue',
    index: '07',
    icon: 'bath',
    teaser:
      'Salles de bain complètes, douches et baignoires, mobilier sur mesure et adaptation PMR pour une pièce sûre et accessible.',
    metaTitle: 'Sanitaires & rénovation de salle de bain — Montigny-le-Tilleul, Charleroi',
    metaDescription:
      'Installation sanitaire et rénovation complète de salle de bain à Montigny-le-Tilleul, Beaumont et Charleroi : douches, baignoires, adaptation PMR et mobilier sur mesure.',
    keywords: ['sanitaires', 'rénovation salle de bain', 'douche', 'baignoire', 'PMR', 'salle de bain sur mesure', 'mobilier de salle de bain'],
    hero: {
      eyebrow: 'Expertise 07 — Confort',
      h1: 'Sanitaires',
      sub: 'Installation sanitaire et rénovation de salle de bain sur mesure.',
      effect: 'editorial',
      media: '/media/hero-sanitaires.mp4',
      poster: '/media/posters/hero-sanitaires.jpg',
    },
    intro: {
      eyebrow: 'Installation',
      title: 'La pièce qu’on utilise deux fois par jour mérite mieux',
      paragraphs: [
        "Nous réalisons l'installation complète de vos équipements sanitaires : douches à l'italienne, baignoires modernes, meubles et robinetterie. Chaque projet est pensé pour votre espace réel, pas pour un catalogue.",
        "Nous concevons du mobilier de salle de bain sur mesure afin d'optimiser chaque centimètre — un point décisif dans les petites surfaces — et proposons l'adaptation PMR pour des salles de bain sûres et accessibles aux personnes à mobilité réduite.",
      ],
      bullets: [
        'Douches, baignoires et robinetterie',
        'Mobilier sur mesure',
        'Adaptation PMR & accessibilité',
        'Coordination des corps de métier',
      ],
    },
    second: {
      eyebrow: 'Rénovation',
      title: 'Rénovation sur mesure de salles de bain',
      paragraphs: [
        "De la modernisation d'une salle de bain existante à la création complète d'une nouvelle pièce, nous prenons en charge l'ensemble du chantier : dépose, plomberie, électricité, ventilation, pose et finitions.",
        "Nous travaillons en collaboration étroite avec vous, du choix des matériaux à l'implantation, pour que le résultat corresponde exactement à vos habitudes et à vos envies.",
      ],
      bullets: [
        'Rénovation complète clé en main',
        'Un seul interlocuteur pour tout le chantier',
        'Choix des matériaux accompagné',
        'Finitions soignées',
      ],
    },
    stats: [
      { value: 'Sur mesure', label: 'mobilier dessiné pour la pièce' },
      { value: 'PMR', label: 'adaptation accessibilité' },
      { value: 'Clé en main', label: 'chantier coordonné' },
    ],
    galleryCategories: ['salles-de-bain'],
    faq: [
      {
        q: 'Combien de temps dure une rénovation de salle de bain ?',
        a: "Une rénovation complète s'étale généralement sur deux à quatre semaines selon l'ampleur des travaux et les délais de livraison des matériaux. Le planning vous est communiqué avec le devis.",
      },
      {
        q: 'Gérez-vous aussi le carrelage et l’électricité ?',
        a: "Oui. Nous coordonnons l'ensemble du chantier — plomberie, électricité, ventilation, pose — pour que vous n'ayez qu'un seul interlocuteur.",
      },
      {
        q: 'Qu’est-ce qu’une adaptation PMR ?',
        a: "Il s'agit d'aménager la salle de bain pour une personne à mobilité réduite : douche de plain-pied, barres d'appui, siège, espaces de circulation adaptés et robinetterie accessible.",
      },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

export const otherServices = (slug: string) => services.filter((s) => s.slug !== slug);

/** Regroupement utilisé par le méga-menu (identique au groupement du site actuel). */
export const navGroups = [
  {
    label: 'Travaux de chauffage',
    slugs: ['chauffage-pompe-a-chaleur', 'climatisation', 'ventilation'],
    blurb: 'Chaleur, froid et air neuf : les trois piliers du confort thermique.',
  },
  {
    label: 'Électricité & sécurité',
    slugs: ['electricite-generale', 'systemes-securite'],
    blurb: 'Du tableau électrique à la vidéosurveillance, une installation sûre.',
  },
  {
    label: 'Plomberie',
    slugs: ['travaux-plomberie', 'sanitaires'],
    blurb: 'Réseaux, traitement de l’eau et salles de bain sur mesure.',
  },
] as const;
