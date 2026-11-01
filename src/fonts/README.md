# Fonts

`franklin.woff2`, `franklin-italic.woff2`, and `monolisa.woff2` are subsets of the originals in `source/`, limited to Latin + Latin Extended and the weights the site uses.

Regenerate with [fonttools](https://github.com/fonttools/fonttools) (`brew install fonttools`) from the repo root:

```sh
UNICODES="U+0000-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1EFF,U+2000-206F,U+20A0-20C0,U+2113,U+2122,U+2190-2193,U+2212,U+2215,U+25C6,U+2C60-2C7F,U+A720-A7FF,U+FEFF,U+FFFD"
# Franklin adds combining marks, super/subscript numerals, fractions, arrows, ≈≤≥, №℗,
# and drops phonetic superscript letters (ʰ ᵃ ⱼ …)
FRANKLIN_UNICODES="U+0000-02AF,U+02B9-02DF,U+02E5-036F,U+1E00-1EFF,U+2000-20C0,U+2113,U+2116-2117,U+2122,U+2150-21FF,U+2212,U+2215,U+2248,U+2264-2265,U+25C6,U+2B00-2BFF,U+2C60-2C7B,U+2C7E-2C7F,U+A720-A7FF,U+FEFF,U+FFFD"
BASE="kern,calt,liga,ccmp,locl,mark,mkmk"

for style in uprights italics; do
  out=$([ $style = uprights ] && echo franklin || echo franklin-italic)
  fonttools varLib.instancer src/fonts/source/HEX_Franklin_v0.4_Variable-$style.woff2 wdth=100 wght=320:700 -o /tmp/$out.ttf
  pyftsubset /tmp/$out.ttf --flavor=woff2 --output-file=src/fonts/$out.woff2 \
    --unicodes="$FRANKLIN_UNICODES" --layout-features="$BASE,pnum,tnum"
done

fonttools varLib.instancer src/fonts/source/MonoLisaVariableNormal.woff2 wght=300:700 -o /tmp/monolisa.ttf
pyftsubset /tmp/monolisa.ttf --flavor=woff2 --output-file=src/fonts/monolisa.woff2 \
  --unicodes="$UNICODES" --layout-features="$BASE,ss01,ss02,ss03,ss04,ss05,ss06,zero,onum"
```

- Franklin uses the separate upright/italic sources rather than the combined `ital`-axis file, so only the upright is preloaded and the italic downloads only on pages that render italic text.
- Franklin's `wght` range covers `--font-weight-*` in theme.css (320 dark-mode normal through 700 extrabold).
- `U+25C6` (◆) is used by prose.css bullets.
- Franklin's symbols are folded into the main files rather than a separate `unicode-range` file, since Astro's preload filter can't exclude it. `case`, `frac`, `sups`, and `subs` are dropped since nothing enables them; precomposed characters (½, ²) still render.
- MonoLisa's features match `font-feature-settings` on `code, pre` in base.css.
- `wdth` is pinned since nothing uses `font-stretch`.
