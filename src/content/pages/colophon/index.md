---
title: Colophon
description: Colophon is a designer-y word for “how it’s made”—here’s what powers ky.fyi.
datePublished: 2023-09-26 03:47:00-04:00
dateModified: 2026-03-25 18:49:04-04:00
img: ["./img600.webp", "./img900.webp", "./img1200.webp"]
imgAlt: The spines of 12 books, including Visual Explanations, The Display of Quantitative Information, The Geometry of Type, Understanding Comics, Nicely Said, Don't Make Me Think!, Queer by Design, The 99% Invisible City, Interaction of Color, The Elements of Style, Thinking Fast and Slow, and The Death and Life of Great American Cities.
ogImage: ./img1200.webp
---

## About this site

I designed and built this site myself. It's a home to share things I'm exploring and things I've built. It's a place for me to learn in public.

All code is open source and available on [GitHub](https://github.com/kydecker/ky.fyi). The first commit was December 5, 2018, but the earliest version of this site dates back to 2015, an era when I eschewed versioning and uploaded files manually via <abbr title="File Transfer Protocol">FTP</abbr>. I've grown a lot since then—and the technology around me has grown, too.

## Technology

This site is built using [Astro](https://astro.build). Astro handles the content-heavy views (written in [MDX](https://mdxjs.com)), but for more interactive components I use [React](https://react.dev) and [TypeScript](https://www.typescriptlang.org). [Guestbook](/guestbook) entries are stored on [Turso](https://turso.tech/).

Code is edited using [Cursor](https://cursor.com/) on a [MacBook Pro](https://www.apple.com/macbook-pro/). My terminal of choice is [Warp](https://www.warp.dev).

End-to-end tests are written using [Playwright](https://playwright.dev), and I use [Polypane](https://polypane.app) to preview devices, test accessibility, and toggle user preferences like `prefers-reduced-motion`.

Domain registration, hosting, and deployment are via [Netlify](https://netlify.com/). Email forwarding is through [ImprovMX](https://improvmx.com). I send occasional [newsletters](https://buttondown.com/notesfromeva) using [Buttondown](https://buttondown.com/).

I shared more about the hardware I use on [Uses This](https://usesthis.com/interviews/eva.decker/).

## Typography

Text is set in [HEX Franklin Variable](https://hex.xyz/HEX_Franklin/) with code in [`MonoLisa`](https://www.monolisa.dev/). Typography is scaled using a lot of math and a [fluid type scale](https://utopia.fyi/blog/designing-with-fluid-type-scales) by [Utopia](https://utopia.fyi/type/calculator/), meaning that font sizes will interpolate between mobile and desktop to optimize for the current browser width.

Type inspiration can be found anywhere, from comic art and video games to [bodega window displays](https://www.are.na/ky-decker/nyc-bodega-art), but I often return to a handful of resources:

- [_The Elements of Typographic Style_](https://bookshop.org/a/97627/9780881792126) by Robert Bringhurst
- [Butterick’s Practical Typography](https://practicaltypography.com)
- Bethany Heck’s [Font Review Journal](https://fontreviewjournal.com)
- [Fonts In Use](https://fontsinuse.com)

## Styling

I use [Radix Colors](https://www.radix-ui.com/colors) to apply palettes consistently, ensure accessibility, and seamlessly switch between light and dark mode. Icons are from [Remix Icon](https://remixicon.com). Styles are written using plain 'ol CSS. Pixel portraits of me were created by [@NullTheFool](https://mastodon.gamedev.place/@NullTheFool) on the [Pixel Art Discord](https://discord.com/invite/pixelart). Pixelated header images are created using the Atkinson dithering algorithm via [Dithermark](https://app.dithermark.com).

## Sounds

The toy synth uses samples from [Mixkit](https://mixkit.co/), [Bolder Sounds](https://www.boldersounds.com/index.php?main_page=product_music_info&products_id=71), [Freesound](https://freesound.org/people/sgossner/packs/21029/), [Soundpacks](https://soundpacks.com/free-sound-packs/xylophone-samples-pack/), [Philharmonia Orchestra Sound Samples](https://www.philharmonia.co.uk/explore/sound_samples), [Precisionsound](https://store.precisionsound.net/shop/peruvian-ocarina/), [HearthSounds](https://github.com/mtimkovich/hearthsounds), and [The Mushroom Kingdom](https://themushroomkingdom.net/media/smw/wav).

## Energy

I minimize energy usage on this site by avoiding unnecessary scripts (such as trackers, analytics, or resource-intensive animations) and compressing images and video.

> The internet consumes a lot of electricity. 416.2TWh per year to be precise. To give you some perspective, that's more than the entire United Kingdom.
> <cite>[Website Carbon Calculator](https://www.websitecarbon.com)</cite>

As of March 25, 2026, [carbon results for ky.fyi](https://www.websitecarbon.com/website/ky-fyi/) indicate that the home page is cleaner than 89% of web pages tested, producing **0.06g of CO<sub>2</sub>** per page view.

## Accessibility

This site aims to conform to the Level AA accessibility standards outlined in the [WCAG 2.2 specification](https://www.w3.org/TR/WCAG22/). If you experience an issue with accessing any part of this site, please [file an issue](https://github.com/kydecker/ky.fyi/issues) and I’ll do my best to correct it.

## Privacy

I collect basic, fully-anonymized page view analytics using [Fathom](https://usefathom.com/ref/VMZJZD). I don't want your data! If you don't believe me, take a look at the [public analytics for ky.fyi](https://app.usefathom.com/share/wkftecuz/ky.fyi). On the flip side, if you'd like to share who you are and where you're visiting from—just for kicks—you can sign the [guestbook](/guestbook).

## Notice an issue?

If you spot a typo, encounter a broken feature, or have a recommendation for an improvement, [file an issue on GitHub](https://github.com/kydecker/ky.fyi/issues).
