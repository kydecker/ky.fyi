# Ky Decker

This is the source code for [ky.fyi](https://ky.fyi), designed, coded, and written by Ky—that's me! It's a place for me to share notes and learn in public. I try to update things regularly.

For information about the technology and tools behind the site, visit [ky.fyi/colophon](https://ky.fyi/colophon).

> [!NOTE]
> You're welcome to fork this site, use it as inspiration, and modify things for your own projects—just don't steal it or try to claim it as your own. When in doubt, message me and we can chat about what you want to do.

## Getting Started

To get started, run:

```bash
pnpm dev
```

If it's the first time running the repo you may need to run `pnpm i` to install packages.

Other scripts in `package.json` can also be run with `pnpm`.

## Link Checking

[![Check Links](https://github.com/kydecker/ky.fyi/actions/workflows/links.yml/badge.svg)](https://github.com/kydecker/ky.fyi/actions/workflows/links.yml)

A weekly [GitHub workflow](https://github.com/kydecker/ky.fyi/actions/workflows/links.yml) scans the site for broken links and will open an issue if one is found.

## Accessibility

[![CI](https://github.com/kydecker/ky.fyi/actions/workflows/ci.yml/badge.svg)](https://github.com/kydecker/ky.fyi/actions/workflows/ci.yml)

Every pull request is tested for automatically-detectable accessibility issues and HTML5 compliance.

This site aims to conform to the Level AA accessibility standards outlined in the [WCAG 2.2 specification](https://www.w3.org/TR/WCAG22/). If you experience an issue with accessing any part of this site, please [file an issue](https://github.com/kydecker/ky.fyi/issues) and I’ll do my best to correct it.

[![RSS](https://img.shields.io/badge/RSS-gray?logo=rss&logoColor=white&labelColor=eb7817)](https://ky.fyi/rss.xml)
