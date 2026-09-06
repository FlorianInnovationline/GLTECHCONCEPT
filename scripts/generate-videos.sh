#!/usr/bin/env bash
# Convertit les PNG générés en JPEG optimisés et fabrique les boucles vidéo
# d'ambiance (mouvement lent, sans coupure, sans son) utilisées en arrière-plan.
#
#   bash scripts/generate-videos.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TMP="$ROOT/.media-tmp"
OUT="$ROOT/public/media"

[ -d "$TMP" ] || { echo "Lancer d'abord: node scripts/generate-placeholders.mjs"; exit 1; }

jpg () { # src dst width height
  mkdir -p "$(dirname "$2")"
  ffmpeg -y -loglevel error -i "$1" \
    -vf "scale=$3:$4:flags=lanczos,unsharp=5:5:0.35,noise=alls=4:allf=a" \
    -q:v 4 "$2"
}

echo "→ Conversion des visuels…"
for f in "$TMP"/posters/*.png; do jpg "$f" "$OUT/posters/$(basename "${f%.png}").jpg" 1920 1080; done
for f in "$TMP"/sections/*.png; do jpg "$f" "$OUT/sections/$(basename "${f%.png}").jpg" 1600 1100; done
for d in "$TMP"/gallery/*/; do
  cat="$(basename "$d")"
  for f in "$d"*.png; do jpg "$f" "$OUT/gallery/$cat/$(basename "${f%.png}").jpg" 1280 900; done
done
jpg "$TMP/og/og-default.png" "$OUT/og/og-default.jpg" 1200 630

# Boucle parfaite : les expressions de zoom/pan sont périodiques sur la durée
# totale du clip, donc la dernière image raccorde exactement la première.
loop_video () { # src_png dst_mp4 seconds
  local frames=$(( $3 * 25 ))
  mkdir -p "$(dirname "$2")"
  ffmpeg -y -loglevel error -loop 1 -i "$1" -t "$3" -filter_complex "\
[0:v]scale=2560:-1:flags=lanczos,setsar=1,split=2[a][b];\
[a]zoompan=z='1.08+0.05*sin(2*PI*on/${frames})':x='iw/2-(iw/zoom/2)+70*sin(2*PI*on/${frames})':y='ih/2-(ih/zoom/2)+45*cos(2*PI*on/${frames})':d=1:s=1920x1080:fps=25,setsar=1[za];\
[b]zoompan=z='1.17-0.05*sin(2*PI*on/${frames})':x='iw/2-(iw/zoom/2)-90*cos(2*PI*on/${frames})':y='ih/2-(ih/zoom/2)+60*sin(2*PI*on/${frames})':d=1:s=1920x1080:fps=25,setsar=1,hue=h=7[zb];\
[za][zb]blend=all_mode=softlight:all_opacity=0.6[m];\
[m]gblur=sigma=0.4,noise=alls=4:allf=t,eq=contrast=1.02:saturation=1.02,format=yuv420p[out]" \
    -map "[out]" -c:v libx264 -preset medium -crf 32 -g 50 -an -movflags +faststart "$2"
  echo "   ✔ $(basename "$2") ($(du -h "$2" | cut -f1))"
}

echo "→ Boucles vidéo d'ambiance…"
for name in hero-home hero-chauffage hero-climatisation hero-ventilation \
            hero-electricite hero-securite hero-plomberie hero-sanitaires \
            hero-realisations hero-contact; do
  loop_video "$TMP/posters/$name.png" "$OUT/$name.mp4" 10
done
for name in about-atelier process cta-banner; do
  loop_video "$TMP/sections/$name.png" "$OUT/section-$name.mp4" 8
done

echo "✔ Médias prêts dans public/media"
