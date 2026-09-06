import type { Config } from 'tailwindcss';

/**
 * Thème 100 % sur-mesure — direction artistique claire, minimale, professionnelle.
 * Aucune couleur Tailwind par défaut n'est conservée.
 *
 * Logique de couleur : le vert porte l'énergie et l'efficacité (chauffage,
 * électricité, sécurité), le bleu porte l'air et l'eau (climatisation,
 * ventilation, plomberie, sanitaires). Le blanc structure tout le reste.
 * L'accent actif est piloté par la variable CSS --accent (voir globals.css).
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#FFFFFF',

      // Surfaces claires
      paper: {
        0: '#FFFFFF',
        50: '#F8FAF9',
        100: '#F1F5F4',
        200: '#E4EBE9', // filets / séparateurs
        300: '#CFDAD7',
      },

      // Textes et surfaces sombres (footer, bandeaux de contraste)
      ink: {
        900: '#0A1412',
        800: '#101C19',
        700: '#22322E',
        600: '#3A4C47',
        500: '#5A6C67',
        400: '#849490', // gris de légende
      },

      // Vert : énergie, rendement, chaleur maîtrisée
      green: {
        50: '#E9F7F1',
        100: '#D3EFE3',
        300: '#5DC69E',
        500: '#0E9E6E',
        600: '#0B7C57',
        800: '#064A34',
      },

      // Bleu : air, eau, fraîcheur
      blue: {
        50: '#EAF2FC',
        100: '#D6E5F8',
        300: '#6FA6E9',
        500: '#1C6DD0',
        600: '#14539F',
        800: '#0B315E',
      },

      // Erreurs de formulaire (seule teinte chaude du système)
      danger: { 50: '#FBEDEA', 500: '#C4432E' },

      // Accent dynamique piloté par [data-accent]
      accent: {
        DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
        deep: 'rgb(var(--accent-deep) / <alpha-value>)',
        soft: 'rgb(var(--accent-soft) / <alpha-value>)',
      },
    },
    fontFamily: {
      display: ['var(--font-display)', 'Helvetica Neue', 'Arial', 'sans-serif'],
      sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
    },
    extend: {
      fontSize: {
        // Échelle fluide, plus sobre : les titres restent grands sans crier.
        'display-xl': ['clamp(2.15rem, 4.6vw, 4.1rem)', { lineHeight: '1.02', letterSpacing: '-0.035em' }],
        'display-lg': ['clamp(1.9rem, 3.6vw, 3.1rem)', { lineHeight: '1.04', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(1.6rem, 2.5vw, 2.35rem)', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        'display-sm': ['clamp(1.3rem, 1.9vw, 1.7rem)', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
        eyebrow: ['0.7rem', { lineHeight: '1', letterSpacing: '0.2em' }],
        lead: ['clamp(1rem, 1.15vw, 1.15rem)', { lineHeight: '1.7' }],
      },
      spacing: {
        section: 'clamp(4.5rem, 9vh, 8rem)',
        gutter: 'clamp(1.25rem, 4vw, 4rem)',
      },
      maxWidth: { shell: '90rem', prose: '64ch' },
      borderRadius: { xs: '2px', sm: '4px', md: '8px', lg: '12px', xl: '20px' },
      boxShadow: {
        card: '0 1px 2px rgba(10, 20, 18, 0.04), 0 8px 24px -12px rgba(10, 20, 18, 0.10)',
        lift: '0 2px 4px rgba(10, 20, 18, 0.05), 0 24px 48px -24px rgba(10, 20, 18, 0.18)',
      },
      transitionTimingFunction: {
        power: 'cubic-bezier(0.16, 1, 0.3, 1)',
        swift: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      },
      keyframes: {
        marquee: { from: { transform: 'translate3d(0,0,0)' }, to: { transform: 'translate3d(-50%,0,0)' } },
        pulseRing: { '0%': { transform: 'scale(.7)', opacity: '.5' }, '100%': { transform: 'scale(2)', opacity: '0' } },
        floaty: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-6px)' } },
      },
      animation: {
        marquee: 'marquee var(--marquee-duration, 46s) linear infinite',
        pulseRing: 'pulseRing 3.2s ease-out infinite',
        floaty: 'floaty 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
