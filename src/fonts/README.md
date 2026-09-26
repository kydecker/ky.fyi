# Fonts

`franklin.woff2` and `monolisa.woff2` are subsets of the originals in `source/`, limited to Latin + Latin Extended and weights 300–700.

Regenerate with [fonttools](https://github.com/fonttools/fonttools) (`brew install fonttools`) from the repo root:

```sh
UNICODES="U+0000-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1EFF,U+2000-206F,U+20A0-20C0,U+2113,U+2122,U+2190-2193,U+2212,U+2215,U+25C6,U+2C60-2C7F,U+A720-A7FF,U+FEFF,U+FFFD"
BASE="kern,calt,liga,ccmp,locl,mark,mkmk"

fonttools varLib.instancer src/fonts/source/HEX_Franklin_v0.3_Variable.woff2 wdth=100 wght=300:700 -o /tmp/franklin.ttf
pyftsubset /tmp/franklin.ttf --flavor=woff2 --output-file=src/fonts/franklin.woff2 \
  --unicodes="$UNICODES" --layout-features="$BASE,case,pnum,tnum"

fonttools varLib.instancer src/fonts/source/MonoLisaVariableNormal.woff2 wght=300:700 -o /tmp/monolisa.ttf
pyftsubset /tmp/monolisa.ttf --flavor=woff2 --output-file=src/fonts/monolisa.woff2 \
  --unicodes="$UNICODES" --layout-features="$BASE,ss01,ss02,ss03,ss04,ss05,ss06,zero,onum"
```

- `U+25C6` (◆) is used by prose.css bullets.
- MonoLisa's features match `font-feature-settings` on `code, pre` in base.css.
- `wdth` is pinned since nothing uses `font-stretch`.
