# GL TECH CONCEPT SRL — site web

Site vitrine de **GL TECH CONCEPT SRL** (Montigny-le-Tilleul, Belgique) :
chauffage et pompes à chaleur, climatisation, ventilation, électricité générale,
systèmes de sécurité, plomberie et sanitaires.

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · GSAP · Lenis · Supabase.

---

## ⚠️ À faire avant la mise en ligne

Ces points sont bloquants ou visibles publiquement. En développement, une
pastille en bas à droite de l'écran les rappelle (`components/layout/PendingAssetsBadge.tsx`).

| Élément | Où | État |
|---|---|---|
| Adresse e-mail exacte | `lib/site.ts` → `email`, puis `emailConfirmed: true` | **Placeholder** |
| Horaires d'ouverture | `lib/site.ts` → `hours`, puis `hoursConfirmed: true` | **Provisoires** |
| Photos réelles des chantiers du client | `public/media/**` | **Photos génériques en place** |
| Logo vectoriel | `components/visuals/Logo.tsx`, `public/favicon.svg` | **Provisoire** |
| Témoignages clients | `components/sections/Testimonials.tsx` | **`[TEMOIGNAGE À REMPLACER]`** |
| Liens Facebook / TrustUp | `lib/site.ts` → `social` | **Génériques** |
| Envoi des e-mails du formulaire | variables `RESEND_*` (voir `.env.example`) | **Non configuré** |
| Montants des primes régionales | textes FAQ | **Volontairement non chiffrés** |
| Outils déposant des cookies | `app/(site)/politique-cookies/page.tsx` | **À lister** |

Toutes les informations factuelles (adresse, TVA, agréments, zones desservies)
proviennent d'une source unique : **`lib/site.ts`**. Ne les dupliquez jamais dans
les composants.

---

## Démarrer

```bash
npm install
cp .env.example .env.local   # puis renseigner les variables
npm run dev                  # http://localhost:3000
```

Autres commandes :

```bash
npm run build       # build de production
npm run typecheck   # vérification TypeScript
npm run lint
npm run gen:media   # régénère les boucles vidéo à partir des photos en place (nécessite ffmpeg)
```

> ⚠️ Ne lancez pas `npm run build` pendant que `npm run dev` tourne : les deux
> écrivent dans `.next` et le serveur de développement se retrouve cassé.

---

## Structure

```
app/
  layout.tsx            Racine : <html>, polices, JSON-LD entreprise locale
  (site)/               Site public — en-tête, pied de page, bandeau cookies
    page.tsx            Accueil
    <7 pages métier>/   Slugs identiques au site actuel (référencement préservé)
    realisations/       Galerie filtrable + visionneuse
    contact/            Coordonnées + formulaire
    mentions-legales/ politique-cookies/
  (admin)/admin/        Espace d'administration (hors site public)
  api/contact/          Réception du formulaire
components/
  layout/   en-tête, pied de page, bandeau cookies, barre mobile, défilement
  sections/ sections de la page d'accueil et blocs transverses
  services/ ossature des pages métier (hero, blocs, schémas, FAQ, avant/après)
  gallery/  galerie filtrable et visionneuse
  contact/  formulaire et coordonnées
  visuals/  logo, icônes métier, média d'ambiance, motif animé
  ui/       primitives (bouton, révélation, compteur, accordéon, bandeau)
  admin/    connexion et déconnexion
lib/
  site.ts       NAP, agréments, zones — source unique de vérité
  services.ts   les 7 métiers : contenus, SEO, FAQ, visuels
  gallery.ts    catégories et photos de réalisations (texte alternatif compris)
  seo.ts        métadonnées et JSON-LD
  supabase/     clients navigateur et serveur
scripts/        génération des visuels de remplacement (PNG puis JPEG/MP4)
```

---

## Direction artistique

Claire, minimale, professionnelle. Blanc dominant, un seul aplat sombre
(bandeau d'appel à l'action et pied de page).

Deux accents porteurs de sens, pilotés par la variable CSS `--accent` :

- **vert** (`[data-accent="green"]`) — énergie et rendement : chauffage, électricité, sécurité ;
- **bleu** (`[data-accent="blue"]`) — air et eau : climatisation, ventilation, plomberie, sanitaires.

L'accent bascule au niveau de la page métier (`ServicePageLayout`) ou de la
carte (`data-accent` sur un lien), sans dupliquer une seule règle CSS.

Typographie : **Archivo** (titres, variable, axe de chasse) et **Manrope** (texte).
Le thème Tailwind est entièrement redéfini : aucune couleur par défaut ne subsiste.

### Animations

Toutes respectent `prefers-reduced-motion` (repli complet dans `globals.css`).

- **Entrées de page** : animations CSS (`.enter`) — le contenu au-dessus de la
  ligne de flottaison ne dépend jamais de l'hydratation.
- **Révélation au défilement** : `components/ui/Reveal.tsx`, en amélioration
  progressive — le contenu n'est masqué que si le script a confirmé qu'il pourra
  le révéler (classe `js` posée sur `<html>`). Sans JavaScript, tout reste lisible.
- **Motif d'ambiance** : `AmbientLines` (canvas 2D), quelques courbes fines à
  faible opacité, orientées selon le métier.
- **Parcours client** : défilement horizontal épinglé (GSAP ScrollTrigger),
  désactivé sous 1024 px au profit d'un défilement natif.
- **Schémas techniques** : tracés SVG dessinés au défilement (`TechDiagram`).
- **Défilement inertiel** : Lenis, désactivé si le mouvement est réduit.

---

## Médias

`public/media/` contient les photos en place et les boucles vidéo qui en sont
dérivées.

Les **boucles d'ambiance sont générées à partir des images d'ouverture** par
`scripts/generate-videos.sh` : un lent mouvement d'appareil dont les expressions
sont périodiques sur la durée du clip, si bien que la dernière image raccorde
exactement la première. Ni grain ni filtre — sur de vraies photos, la sobriété
passe mieux.

Pour changer une photo : remplacez le fichier **en conservant son nom**, puis
relancez `npm run gen:media` si c'est une image d'ouverture (pour que sa vidéo
suive). Aucun code n'a besoin d'être modifié.

⚠️ Les photos actuelles illustrent correctement chaque métier mais ne sont pas
les chantiers du client. Les remplacer par ses propres réalisations reste le
premier levier de crédibilité du site.

```
public/media/
  posters/hero-*.jpg      images d'ouverture (1920×1080)
  hero-*.mp4              boucles d'ambiance des heros
  sections/*.jpg          visuels de section
  section-*.mp4           boucles d'ambiance de section
  gallery/<catégorie>/NN.jpg   réalisations (décrites une à une dans lib/gallery.ts)
  og/og-default.jpg       image de partage social
```

Les vidéos sont muettes, en lecture automatique, chargées seulement à
l'approche du viewport, et remplacées par leur image fixe si l'utilisateur
demande moins d'animations ou active l'économie de données.

---

### Catégories de réalisations

Les catégories de `/realisations` décrivent le contenu réel des photos en place
(salles de bain, chauffage & pompes à chaleur, électricité & domotique…). Le site
d'origine utilisait les intitulés des chantiers du client — par exemple
« PAC air/eau MITSUBISHI ELECTRIC » ou « Réalisation personnalisée sur demande ».
Quand ses photos arriveront, rétablissez ses intitulés : **`lib/gallery.ts` est
le seul fichier à modifier**, les compteurs et les filtres se recalculent seuls.

## Formulaire de contact

`app/api/contact/route.ts` valide côté serveur (la validation client est dans
`ContactForm`), filtre les robots par champ piège, puis envoie via **Resend**.

**Sans `RESEND_API_KEY` et `CONTACT_FROM_EMAIL`, le message n'est pas envoyé** :
il est journalisé côté serveur et l'utilisateur reçoit une confirmation. À
configurer impérativement avant la mise en ligne.

---

## Espace d'administration

- `/admin/login` — connexion Supabase (e-mail + mot de passe) ;
- `/admin` — tableau de bord.

Le `middleware.ts` rafraîchit la session et protège `/admin/*`. Les comptes se
créent **depuis le tableau de bord Supabase** (Authentication → Users) : aucune
inscription n'est ouverte depuis le site. `/admin` est exclu de l'indexation
(`robots.ts` et métadonnées du groupe `(admin)`).

Prochaines briques prévues : enregistrement des demandes de devis en base,
gestion des réalisations et des témoignages.

### Mise en place Supabase

1. Créer un projet sur [supabase.com](https://supabase.com).
2. Copier `Project URL` et `anon public key` (Settings → API) dans `.env.local`.
3. Créer l'utilisateur administrateur (Authentication → Users → *Add user*).
4. Désactiver les inscriptions publiques (Authentication → Providers → *Allow new users to sign up*).

---

## SEO

- Les 10 URL publiques reprennent **exactement** les slugs du site actuel.
- Métadonnées, Open Graph et Twitter Card par page (`lib/seo.ts`).
- JSON-LD : `HomeAndConstructionBusiness` (global), `Service`, `FAQPage` et
  `BreadcrumbList` sur les pages métier.
- `sitemap.xml` et `robots.txt` générés (`app/sitemap.ts`, `app/robots.ts`).
- Langue : français de Belgique (`fr-BE`).

---

## Déploiement (Vercel)

1. Importer le dépôt Git dans Vercel — le framework est détecté automatiquement.
2. Ajouter les variables de `.env.example` (Production **et** Preview).
3. Brancher le domaine `gltechconcept.be`.
4. Vérifier après mise en ligne : envoi réel du formulaire, `/sitemap.xml`,
   connexion à `/admin`.

---

## Accessibilité

Structure sémantique et hiérarchie de titres respectées, texte alternatif sur
toutes les images, focus visible, contrastes conformes sur fond clair,
navigation au clavier dans le menu, l'accordéon et la visionneuse, et repli
complet sans mouvement.
