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

# MonoLisa
monolisa_source=source/MonoLisaVariableNormal.woff2
monolisa_axes=(
  wght=300:700
)
monolisa_features=(
  ss01 ss02 ss03 ss04 ss05 ss06 zero onum # Matches font-feature-settings on `code, pre` in base.css
)
monolisa_exclude=(
  U+0300-0303 U+0305-0307 U+0309-0328 U+032A-036F # Combining marks; keeps macron, diaeresis, vertical line below
  U+0370-052F             # Greek, Cyrillic
  U+0530-1CFF             # Non-Latin currency (֏ ৳ ฿ ៛)
  U+2070-209F             # Super/subscripts (⁴ ₂)
  U+2100-2112 U+2114-2121 U+2123-218F # Letterlike, fractions (№ ℮ ⅓)
  U+3000-303F             # CJK brackets (〈 〉)
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
build "$monolisa_source" monolisa "${monolisa_axes[*]}" \
  "$(join "${base_features[@]}" "${monolisa_features[@]}")" "${monolisa_exclude[@]}"

ls -l ./*.woff2
