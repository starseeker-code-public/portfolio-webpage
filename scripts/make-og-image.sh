#!/usr/bin/env bash
# Regenerates public/apple-touch-icon.png (180x180, the iOS home-screen icon) from
# public/favicon.png. Committed as a build artifact because ImageMagick is not a
# project dependency; rerun this by hand if the favicon changes.
#
# public/og-image.jpg (the 1200x630 link-preview picture) is NOT generated here: it
# is a tight head-and-shoulders crop of the original portrait photo, made by hand with
#   magick <photo> -auto-orient -crop 1500x787+485+1050 +repage -resize 1200x630 \
#     -strip -sampling-factor 4:2:0 -interlace None -quality 88 public/og-image.jpg
# Kept baseline (not progressive), under ~300 KB, 1.91:1 and with the face centred and
# large: WhatsApp builds its own small, heavily compressed thumbnail from it, and
# only a big, central, high-contrast subject survives that.
# When it changes, bump the `?v=` on OG_IMAGE in src/data/seo.ts so LinkedIn,
# WhatsApp etc. fetch the new file instead of their cached copy.
set -euo pipefail
cd "$(dirname "$0")/.."

BG='#060516'

# Apple ignores transparency and composites onto white, which would frame a dark
# logo in glare, so the favicon is padded onto the site background.
magick public/favicon.png -resize 156x156 -background "${BG}" -gravity center -extent 180x180 -strip public/apple-touch-icon.png

echo "wrote public/apple-touch-icon.png ($(stat -c%s public/apple-touch-icon.png) bytes)"
