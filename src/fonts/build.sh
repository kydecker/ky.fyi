#!/usr/bin/env bash
# Subsets the fonts in source/ into the woff2 files loaded by astro.config.ts.
# Exclude unicode ranges below to trim font weight.
# Requires fonttools: brew install fonttools
set -euo pipefail

# OpenType features kept in every font
base_features=(kern calt liga ccmp locl mark mkmk)

# HEX Franklin
# Upright and italic are separate files so the italic only downloads on pages that use it.
franklin_upright=source/HEX_Franklin_v0.4_Variable-uprights.woff2
franklin_italic=source/HEX_Franklin_v0.4_Variable-italics.woff2
franklin_axes=(
  wdth=100     # Pinned; nothing uses font-stretch
  wght=320:700 # Covers --font-weight-* in theme.css (dark-mode normal through extrabold)
)
franklin_features=(
  pnum tnum    # font-variant-numeric; case, frac, sups, subs are dropped as unused
)
franklin_exclude=(
  U+02B0-02B8 U+02E0-02E4 # Superscript letters (ʰ ʲ ʳ ʷ ʸ ˡ ˢ ˣ)
  U+1D00-1DBF             # Phonetic superscript letters (ᵃ ᵇ ᶜ … ᶻ)
  U+2C7C-2C7D             # Subscript ⱼ
  U+A4D0-A4FF             # Lisu (ꓘ)
)

# Commit Mono
# Variable export from commitmono.com; settings in source/custom-settings.json.
# Upright and italic are separate files so the italic only downloads on pages that use it.
commit_source="source/CommitMono VariableFont.woff2"
commit_axes=(
  wght=320:700 # Matches Franklin's range so code follows the body weight
)
commit_features=(
  ss03 ss04 ss05 cv06 cv07 cv11 # Matches font-feature-settings on `code, pre` in base.css
)
commit_exclude=(
  U+0300-0303 U+0305-0307 U+0309-0328 U+032A-036F # Combining marks; keeps macron, diaeresis, vertical line below
  U+0370-052F             # Greek, Cyrillic
  U+2070-209F             # Super/subscripts (⁴ ₂)
  U+2100-2112 U+2114-2121 U+2123-218F # Letterlike, fractions (№ ℮ ⅓)
  U+2800-28FF             # Braille patterns
  U+E000-F8FF             # Private use (Powerline glyphs)
)

cd "$(dirname "$0")"
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT

join() { local IFS=,; echo "$*"; }

unicodes_except() {
  local font=$1; shift
  local lo=() hi=() r a b
  for r in "$@"; do
    r=${r#U+}; a=${r%-*}; b=${r#*-}
    lo+=($((16#$a))); hi+=($((16#$b)))
  done
  fonttools ttx -q -t cmap -o - "$font" \
    | grep -o 'code="0x[0-9a-fA-F]*"' | cut -d'"' -f2 | sort -u \
    | while read -r hex; do
        cp=$((hex))
        for i in "${!lo[@]}"; do
          (( cp >= lo[i] && cp <= hi[i] )) && continue 2
        done
        printf 'U+%04X\n' "$cp"
      done | paste -sd, -
}

# build <source> <output name> <axes> <features> <excluded ranges…>
build() {
  local src=$1 out=$2 axes=$3 features=$4; shift 4
  # shellcheck disable=SC2086 # axes are intentionally word-split
  fonttools varLib.instancer -q "$src" $axes -o "$tmp/$out.ttf"
  pyftsubset "$tmp/$out.ttf" --flavor=woff2 --output-file="$out.woff2" \
    --unicodes="$(unicodes_except "$src" "$@")" \
    --layout-features="$features"
}

build "$franklin_upright" franklin "${franklin_axes[*]}" \
  "$(join "${base_features[@]}" "${franklin_features[@]}")" "${franklin_exclude[@]}"
build "$franklin_italic" franklin-italic "${franklin_axes[*]}" \
  "$(join "${base_features[@]}" "${franklin_features[@]}")" "${franklin_exclude[@]}"
commit_features_csv=$(join "${base_features[@]}" "${commit_features[@]}")
build "$commit_source" commit-mono "${commit_axes[*]} ital=0" \
  "$commit_features_csv" "${commit_exclude[@]}"
build "$commit_source" commit-mono-italic "${commit_axes[*]} ital=1" \
  "$commit_features_csv" "${commit_exclude[@]}"

ls -l ./*.woff2
