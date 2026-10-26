#!/usr/bin/env bash
# Run from any directory. Requires ffmpeg (libx264 + libwebp) on PATH.
set -euo pipefail
cd "$(dirname "$0")/.."
FFMPEG="${FFMPEG:-ffmpeg}"
FFPROBE="${FFPROBE:-ffprobe}"
ONLY="${1:-}"
mkdir -p media/{hero,v,img}
shopt -s nullglob
# Supplied renders are 1280x720, not the 1080p specified by the generation brief.
# Normalize to 1280w before applying the inspected lower-right cleanup box.
# The wider box also covers a sparkle inherited from a marked start image.
# Set DELOGO=0 for replacement renders that are already clean.
DELOGO="${DELOGO:-1}"
filter='scale=1280:-2'
if [[ "$DELOGO" == 1 ]]; then
  filter+=',delogo=x=1140:y=626:w=128:h=86'
fi
source_file() {
  local matches=(assets/"$1"*)
  [[ ${#matches[@]} == 1 ]] || { echo "Expected one asset matching $1, found ${#matches[@]}" >&2; exit 1; }
  printf '%s' "${matches[0]}"
}
film() {
  [[ -z "$ONLY" || "$ONLY" == "$1" ]] || return 0
  local name="$1" source duration timed_filter
  source="$(source_file "$2")"
  duration="$("$FFPROBE" -v error -show_entries format=duration -of default=nw=1:nk=1 "$source")"
  # Retain the entire action, normalized to the brief's six seconds at 24 fps.
  # This changes playback speed, never the two-frame hero keyframe spacing.
  timed_filter="setpts=(PTS-STARTPTS)*6/$duration,fps=24,$filter"
  # A clean replacement needs no corner reconstruction.
  if [[ "${4:-}" == clean ]]; then
    timed_filter="setpts=(PTS-STARTPTS)*6/$duration,fps=24,scale=1280:-2"
  fi
  echo "Film: $name"
  "$FFMPEG" -hide_banner -loglevel error -y -i "$source" -vf "$timed_filter" -c:v libx264 -preset veryslow -crf 26 -pix_fmt yuv420p -an -movflags +faststart "media/v/$name.mp4"
  "$FFMPEG" -hide_banner -loglevel error -y -i "media/v/$name.mp4" -vf scale=720:-2 -frames:v 1 -q:v 5 "media/v/$name.jpg"
  if [[ "${3:-}" == hero ]]; then
    for spec in '1280 26 ' '720 27 -m'; do
      read -r width quality suffix <<< "$spec"
      # Dense keyframes do not need x264's default 1.4x I-frame quality boost.
      # Equal I/P quantization saves space at the same CRF and two-frame GOP.
      "$FFMPEG" -hide_banner -loglevel error -y -i "$source" -vf "$timed_filter,scale=$width:-2" -c:v libx264 -preset veryslow -crf "$quality" -pix_fmt yuv420p -x264-params keyint=2:min-keyint=1:scenecut=0:bframes=0:ipratio=1.0 -an -movflags +faststart "media/hero/$name$suffix.mp4"
    done
  fi
}
film biryani-rise 'biryan video' hero clean
film butter-chicken Gravy_splash hero
film tandoori Chilli_powder hero
film seekh Ghee_falls hero
film paneer Paneer_tikka_ingredients hero
film dal Cream_and_ingredients hero
film naan Melted_butter hero
film lassi Mango_lassi_splashing hero
film spices Spices_floating
film ingredients Ingredients_falling
film gravy-pour Ghee_and_gravy
film steam Steam_rising
film storefront People_chatting
if [[ -n "$ONLY" ]]; then
  echo "Selected film complete: $ONLY"
  exit 0
fi
while read -r name prefix; do
  "$FFMPEG" -hide_banner -loglevel error -y -i "$(source_file "$prefix")" -vf scale=1600:-2 -c:v libwebp -quality 82 "media/img/$name.webp"
done <<'STILLS'
handi-dum Copper_biryani
butter-chicken Butter_chicken
tandoori Tandoori_chicken
seekh Lamb_seekh
paneer Paneer_tikka_on
dal Dal_makhani
naan Garlic_butter
lassi Mango_lassi_with
feast Indian_food
embers Glowing_charcoal
STILLS
echo "Media complete (target: approximately 50 MB)."
du -sh media
