#!/usr/bin/env bash
# Fabrique les boucles vidéo d'ambiance à partir des photos déjà en place
# (public/media/posters et public/media/sections).
#
# Principe : un lent mouvement d'appareil (zoom + panoramique) dont les
# expressions sont périodiques sur la durée totale du clip — la dernière image
# raccorde donc exactement la première, sans coupure visible. Aucun grain,
# aucun filtre : sur de vraies photos, la sobriété passe mieux.
#
#   bash scripts/generate-videos.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/public/media"
SECONDS_PER_LOOP=12
FPS=25

loop () { # source_jpg destination_mp4 largeur hauteur
  local frames=$(( SECONDS_PER_LOOP * FPS ))
  local src="$1" dst="$2" w="$3" h="$4"
  [ -f "$src" ] || { echo "   ⚠ absent : $src"; return; }

  ffmpeg -y -loglevel error -loop 1 -i "$src" -t "$SECONDS_PER_LOOP" -filter_complex "\
[0:v]scale=$(( w * 5 / 4 )):-2:flags=lanczos,setsar=1,\
zoompan=z='1.06+0.045*sin(2*PI*on/${frames})':\
x='iw/2-(iw/zoom/2)+(iw*0.02)*sin(2*PI*on/${frames})':\
y='ih/2-(ih/zoom/2)+(ih*0.015)*cos(2*PI*on/${frames})':\
d=1:s=${w}x${h}:fps=${FPS},setsar=1,format=yuv420p[out]" \
    -map "[out]" -c:v libx264 -preset slow -crf 30 -g 50 -an -movflags +faststart "$dst"

  echo "   ✔ $(basename "$dst") ($(du -h "$dst" | cut -f1))"
}

echo "→ Boucles d'ouverture (16:9)…"
for name in hero-home hero-chauffage hero-climatisation hero-ventilation \
            hero-electricite hero-securite hero-plomberie hero-sanitaires \
            hero-realisations hero-contact; do
  loop "$OUT/posters/$name.jpg" "$OUT/$name.mp4" 1920 1080
done

echo "→ Boucles de section (4:3)…"
loop "$OUT/sections/about-atelier.jpg" "$OUT/section-about-atelier.mp4" 1440 1080

echo "✔ Boucles prêtes dans public/media"
