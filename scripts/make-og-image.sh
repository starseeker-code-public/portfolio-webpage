#!/usr/bin/env bash
# Regenerates public/og-image.png — the 1200x630 card social platforms show for
# every link to the site. Committed as a build artifact because ImageMagick is
# not a project dependency; rerun this by hand whenever the name or role changes.
set -euo pipefail
cd "$(dirname "$0")/.."

BG='#060516'
INDIGO='#818cf8'
VIOLET='#a78bfa'
SLATE='#94a3b8'

magick -size 1200x630 "xc:${BG}" \
  \( -size 700x700 radial-gradient:"#4338ca80-${BG}00" -resize 700x700 \) \
  -geometry +130-190 -composite \
  \( -size 520x520 radial-gradient:"#6d28d966-${BG}00" \) \
  -geometry +760+330 -composite \
  -fill "${INDIGO}" -font Segoe-UI-Semibold -pointsize 26 \
  -annotate +90+150 "SENIOR BACKEND ENGINEER" \
  -fill white -font Segoe-UI-Bold -pointsize 96 \
  -annotate +90+275 "Joaquín Hernández" \
  -fill "${VIOLET}" -font Segoe-UI-Bold -pointsize 96 \
  -annotate +90+385 "Martínez" \
  -fill "${SLATE}" -font Segoe-UI -pointsize 32 \
  -annotate +90+465 "Python · Distributed Systems · Cloud · AI Integration" \
  -fill "#475569" -font Consolas -pointsize 28 \
  -annotate +90+545 "joaquin-hm.com" \
  -stroke "${INDIGO}" -strokewidth 5 -draw "line 90,585 250,585" \
  -strip -quality 90 public/og-image.jpg

# iOS home-screen icon: the favicon padded onto the site background. Apple ignores
# transparency and composites onto white, which would frame a dark logo in glare.
magick public/favicon.png -resize 156x156   -background "${BG}" -gravity center -extent 180x180   -strip public/apple-touch-icon.png

echo "wrote public/og-image.jpg ($(stat -c%s public/og-image.jpg) bytes)"
echo "wrote public/apple-touch-icon.png ($(stat -c%s public/apple-touch-icon.png) bytes)"
