/**
 * Génère tous les visuels de remplacement (duotone, abstraits, dans la charte).
 * Ces images ne prétendent PAS être des photos de chantier : elles tiennent la
 * mise en page et l'art direction jusqu'à la fourniture des vraies photos.
 *
 *   node scripts/generate-placeholders.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { writePNG } from './png.mjs';

const OUT = path.join(process.cwd(), 'public', 'media');
const TMP = path.join(process.cwd(), '.media-tmp');

// ---------- bruit ----------
// Table pseudo-aléatoire pré-calculée : le bruit doit rester rapide, on génère
// une centaine de visuels d'un coup.
const RAND = new Float32Array(8192);
(() => {
  let s = 1337;
  for (let i = 0; i < RAND.length; i++) {
    s = (s * 1664525 + 1013904223) >>> 0;
    RAND[i] = s / 4294967296;
  }
})();
const hash = (x, y, s) =>
  RAND[((x * 374761393 + y * 668265263 + s * 1442695041) >>> 3) & 8191];
const smooth = (t) => t * t * (3 - 2 * t);
const vnoise = (x, y, s) => {
  const xi = Math.floor(x), yi = Math.floor(y);
  const xf = smooth(x - xi), yf = smooth(y - yi);
  const a = hash(xi, yi, s), b = hash(xi + 1, yi, s), c = hash(xi, yi + 1, s), d = hash(xi + 1, yi + 1, s);
  return a + (b - a) * xf + (c - a) * yf + (a - b - c + d) * xf * yf;
};
const fbm = (x, y, s, oct = 4) => {
  let v = 0, amp = 0.5, f = 1;
  for (let i = 0; i < oct; i++) { v += amp * vnoise(x * f, y * f, s + i * 13); f *= 2.03; amp *= 0.5; }
  return v;
};

// ---------- palettes ----------
// Direction claire : les visuels doivent rester en hautes lumières, avec une
// simple teinte d'accent dans les tons moyens. Aucun aplat saturé.
const PAL = {
  green: { shadow: [148, 161, 156], light: [253, 254, 253], accent: [92, 132, 117] },
  blue: { shadow: [146, 158, 173], light: [252, 253, 255], accent: [96, 122, 156] },
};

const mix = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];

const ramp = (p, v) => {
  v = Math.max(0, Math.min(1, v));
  // Ombres douces vers blanc, plus une teinte d'accent discrète dans les
  // tons moyens : on reste dans un registre clair, matiéré, jamais coloré.
  const shade = mix(p.shadow, p.light, v * v * (3 - 2 * v));
  const tint = Math.max(0, 1 - Math.abs(v - 0.5) * 2.6) * 0.5;
  return mix(shade, p.accent, tint);
};

/** Bruit "ridged" : produit des filaments nets plutôt que des taches molles. */
const ridge = (x, y, s) => {
  let v = 0, amp = 0.5, f = 1;
  for (let i = 0; i < 4; i++) {
    v += amp * (1 - Math.abs(vnoise(x * f, y * f, s + i * 17) * 2 - 1));
    f *= 2.11; amp *= 0.52;
  }
  return v;
};

// ---------- scènes ----------
function field(kind, u, v, seed) {
  const n = fbm(u * 3.4 + seed * 0.7, v * 3.4, seed);
  const det = fbm(u * 11, v * 11, seed + 41) * 0.16; // micro-détail
  switch (kind) {
    case 'thermal': {
      // Panaches de chaleur étirés verticalement, découpés en filaments,
      // répartis sur toute la hauteur pour que le cadrage tienne debout.
      const warp = fbm(u * 2.2, v * 1.4 - 0.5, seed + 9);
      const plume = Math.exp(-Math.pow((u - 0.46 + (warp - 0.5) * 0.7) * 2.2, 2)) * (1.05 - v * 0.35);
      const fil = Math.pow(ridge(u * 4.2 + warp * 2, v * 2.6 - 0.4, seed + 5), 2.1);
      return plume * (0.5 + fil * 0.8) + n * 0.14 + det * 0.8;
    }
    case 'cool': {
      // Nappes froides horizontales, lumière rasante.
      const bands = Math.pow(0.5 + 0.5 * Math.sin(v * 13 + fbm(u * 1.8, v * 1.8, seed) * 5.2), 3);
      const beam = Math.exp(-Math.pow((v - 0.38) * 2.6, 2));
      return bands * 0.5 * beam + beam * 0.32 + n * 0.16 + det;
    }
    case 'flow': {
      // Flux d'air : longues stries horizontales.
      const streak = Math.pow(ridge(u * 1.4, v * 17 + seed, seed + 3), 2.2);
      const beam = Math.exp(-Math.pow((v - 0.5) * 2.1, 2));
      return streak * 0.85 * beam + beam * 0.22 + n * 0.12 + det;
    }
    case 'circuit': {
      // Pistes orthogonales façon carte électronique / tableau divisionnaire.
      const jx = fbm(0, Math.floor(v * 11) * 3.1, seed) * 0.6;
      const jy = fbm(Math.floor(u * 16) * 2.7, 0, seed + 4) * 0.6;
      const gx = Math.abs(((u * 16 + jx) % 1) - 0.5);
      const gy = Math.abs(((v * 11 + jy) % 1) - 0.5);
      const trace = Math.max(0, 0.5 - Math.min(gx, gy) * 9) * 2;
      const node = Math.max(0, 0.5 - Math.max(gx, gy) * 11) * 1.6;
      const light = Math.exp(-Math.pow((u - 0.66) * 1.7, 2)) * Math.exp(-Math.pow((v - 0.42) * 2.0, 2));
      return (trace * 0.55 + node * 0.5) * (0.35 + light) + n * 0.1 + det * 0.7;
    }
    case 'scan': {
      // Balayage radar : anneaux + secteur de détection.
      const dx = u - 0.5, dy = v - 0.54;
      const r = Math.sqrt(dx * dx + dy * dy);
      const rings = Math.pow(0.5 + 0.5 * Math.sin(r * 54 - seed), 6);
      const ang = Math.atan2(dy, dx);
      const sweep = Math.exp(-Math.pow((((ang + Math.PI * 3) % (Math.PI * 2)) - 2.4) * 1.5, 2));
      return (rings * 0.75 + sweep * 0.55) * Math.exp(-r * 2.1) + n * 0.1 + det * 0.6;
    }
    case 'water': {
      // Ondes concentriques + caustiques.
      const dx = u - 0.4 + fbm(u * 1.5, v * 1.5, seed) * 0.14, dy = v - 0.56;
      const r = Math.sqrt(dx * dx + dy * dy);
      const w = Math.pow(0.5 + 0.5 * Math.sin(r * 58 - seed * 2), 5);
      const caust = Math.pow(ridge(u * 6, v * 6, seed + 21), 3) * 0.5;
      return (w * 0.9 + caust) * Math.exp(-r * 1.9) + n * 0.12 + det;
    }
    case 'tile': {
      // Volume architectural : plan de faïence, lumière rasante, joints.
      const cols = Math.floor(u * 7), rows = Math.floor(v * 5);
      const cell = hash(cols, rows, seed) * 0.22;
      const seam = Math.min(Math.abs(((u * 7) % 1) - 0.5), Math.abs(((v * 5) % 1) - 0.5));
      const light = Math.exp(-Math.pow((u - 0.76) * 1.5, 2)) * Math.exp(-Math.pow((v - 0.26) * 1.7, 2));
      const floorLine = Math.exp(-Math.pow((v - 0.74) * 26, 2)) * 0.5;
      return 0.07 + cell * (0.25 + light * 0.5) + light * 0.42 + (seam < 0.012 ? 0.1 : 0) + floorLine * 0.35 + n * 0.06 + det * 0.4;
    }
    default:
      return n;
  }
}

function render(file, w, h, kind, accent, seed, opts = {}) {
  const p = PAL[accent];
  const buf = Buffer.alloc(w * h * 3);
  const grain = opts.grain ?? 0.02;
  const vig = opts.vignette ?? 0.9;
  for (let y = 0; y < h; y++) {
    const v = y / h;
    for (let x = 0; x < w; x++) {
      const u = x / w;
      // Couche de composition commune : évite les aplats plats en donnant à
      // chaque image une structure nuageuse à grande échelle et une lumière
      // directionnelle douce.
      let f = field(kind, u, v, seed) * 0.78;
      f += fbm(u * 1.5 + 3, v * 1.5, seed + 61) * 0.42;
      f += Math.exp(-(Math.pow(u - 0.68, 2) + Math.pow(v - 0.22, 2)) / 0.34) * 0.16;
      // vignettage
      const dx = (u - 0.5) * 2, dy = (v - 0.5) * 2;
      f *= 1 - vig * 0.24 * Math.min(1, (dx * dx + dy * dy) * 0.62);
      // grain fin
      f += (hash(x, y, seed + 99) - 0.5) * grain;
      // Courbe d'exposition : on écrase les tons moyens pour garder du noir profond.
      f = Math.pow(Math.max(0, f), opts.gamma ?? 0.85) * (opts.gain ?? 1);
      const c = ramp(p, f);
      const i = (y * w + x) * 3;
      buf[i] = Math.max(0, Math.min(255, c[0] | 0));
      buf[i + 1] = Math.max(0, Math.min(255, c[1] | 0));
      buf[i + 2] = Math.max(0, Math.min(255, c[2] | 0));
    }
  }
  fs.mkdirSync(path.dirname(file), { recursive: true });
  writePNG(file, w, h, buf);
}

// ---------- plan de génération ----------
const KIND_BY_CAT = {
  'realisations-salle-de-bain': ['tile', 'blue'],
  'salle-de-bain': ['tile', 'blue'],
  'coffret-electrique': ['circuit', 'green'],
  'chauffage-sol': ['thermal', 'green'],
  'climatisation': ['cool', 'blue'],
  'pac-air-eau-mitsubishi': ['thermal', 'green'],
  'realisation-personnalisee': ['circuit', 'green'],
  'adoucisseur-eau': ['water', 'blue'],
};
const COUNTS = {
  'realisations-salle-de-bain': 22, 'coffret-electrique': 15, 'chauffage-sol': 14,
  'climatisation': 10, 'pac-air-eau-mitsubishi': 10, 'salle-de-bain': 9,
  'realisation-personnalisee': 6, 'adoucisseur-eau': 2,
};

const HEROES = [
  ['hero-home', 'thermal', 'green'],
  ['hero-chauffage', 'thermal', 'green'],
  ['hero-climatisation', 'cool', 'blue'],
  ['hero-ventilation', 'flow', 'blue'],
  ['hero-electricite', 'circuit', 'green'],
  ['hero-securite', 'scan', 'green'],
  ['hero-plomberie', 'water', 'blue'],
  ['hero-sanitaires', 'tile', 'blue'],
  ['hero-realisations', 'circuit', 'green'],
  ['hero-contact', 'scan', 'blue'],
];

const SECTIONS = [
  ['about-atelier', 'thermal', 'green'],
  ['process', 'circuit', 'green'],
  ['cta-banner', 'thermal', 'green'],
  ['map-zone', 'scan', 'blue'],
  ['expertise-chauffage', 'thermal', 'green'],
  ['expertise-climatisation', 'cool', 'blue'],
  ['expertise-ventilation', 'flow', 'blue'],
  ['expertise-electricite', 'circuit', 'green'],
  ['expertise-securite', 'scan', 'green'],
  ['expertise-plomberie', 'water', 'blue'],
  ['expertise-sanitaires', 'tile', 'blue'],
  ['avant-travaux', 'tile', 'blue'],
  ['apres-travaux', 'tile', 'blue'],
];

fs.rmSync(TMP, { recursive: true, force: true });
let n = 0;

for (const [name, kind, accent] of HEROES) {
  render(path.join(TMP, 'posters', `${name}.png`), 960, 540, kind, accent, name.length * 7 + 3);
  n++;
}
for (const [name, kind, accent] of SECTIONS) {
  const dark = name === 'avant-travaux' ? { gain: 0.72 } : {}; // « avant » volontairement plus terne
  render(path.join(TMP, 'sections', `${name}.png`), 800, 550, kind, accent, name.length * 11 + 5, dark);
  n++;
}
for (const [cat, count] of Object.entries(COUNTS)) {
  const [kind, accent] = KIND_BY_CAT[cat];
  for (let i = 1; i <= count; i++) {
    render(path.join(TMP, 'gallery', cat, `${String(i).padStart(2, '0')}.png`), 640, 450, kind, accent, cat.length * 13 + i * 29);
    n++;
  }
}
render(path.join(TMP, 'og', 'og-default.png'), 600, 315, 'thermal', 'green', 77);
n++;

console.log(`✔ ${n} visuels générés dans ${TMP} (conversion JPEG par generate-videos.sh)`);
