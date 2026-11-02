---
title: My Interop 2027 Ranking
description: Nine web features I'd love to see achieve baseline support in 2027.
datePublished: 2026-11-02 08:00:00-04:00
category: Development
---

Since 2021, all of the major browser vendors (including Google, Apple, Microsoft, Firefox, and others) have collaborated together on [Interop](https://github.com/web-platform-tests/interop), a coordinated effort to improve global support for new web technologies.

This year, the Firefox team have launched a website to allow developers to [rank Interop 2027 proposals](https://interop-rank.fxdx.dev/). These rankings will get used to inform Interop planning with the other browser vendors.

Here are my top nine!

1. **[JavaScript `Temporal`](https://github.com/web-platform-tests/interop/issues/1381)**. I'm dreaming of the day I no longer have to deal with JavaScript's `Date`. It is the source of so many headaches, and so many bugs.
2. **[CSS `line-clamp` property](https://github.com/web-platform-tests/interop/issues/1379)**. I have wanted multi-line truncation in CSS for ages. This would get a _lot_ of use.
3. **[Customizable/stylable `<select>`](https://github.com/web-platform-tests/interop/issues/1393)**. There are endless hand-rolled implementations of `<select>` because the design of the default element cannot be customized. Custom implementations are tough to get right. If there was an easy way to style `<select>`, it would solve a lot of problems.
4. **[Allow CSS transitioning/animating `display` and `content-visibility`](https://github.com/web-platform-tests/interop/issues/1384)**. CSS can animate elements _into_ the view just fine; it should be able to animate them _out_ of the view, too.
5. **[CSS `random()` function](https://github.com/web-platform-tests/interop/issues/1354)**. Lotta fun opportunities here for creative chaos.
6. **[CSS `var()` in size container queries](https://github.com/web-platform-tests/interop/issues/1344)**. Being able to use tokens within media queries would be a welcome addition for many design systems.
7. **[HTML `headingoffset` and `headingreset` attributes](https://github.com/web-platform-tests/interop/issues/1412)**. Headings which can automatically nest within surrounding heading levels would remove a lot of fiddly logic around `h2`, `h3`, `h4`, et al.
8. **[CSS gap decorations](https://github.com/web-platform-tests/interop/issues/1374)**. Grid layouts are great until you want to throw on some borders.
9. **[CSS container scroll-state queries](https://github.com/web-platform-tests/interop/issues/1364)**. CSS can tell an element to _stick_—it should also be able to tell me when an element is _stuck_.

Other honorable mentions include: [HTML `focusgroup` attribute](https://github.com/web-platform-tests/interop/issues/1348), [responsive iframes](https://github.com/web-platform-tests/interop/issues/1443), [interest invokers](https://github.com/web-platform-tests/interop/issues/1358), and [CSS `@function`](https://github.com/web-platform-tests/interop/issues/1357), but there are a _ton_ of interesting proposals in the mix. [Submit your Interop 2027 rankings.](https://interop-rank.fxdx.dev)

---

Thanks to [Ana Rodrigues](https://ohhelloana.blog/my-interop-2027/), [Josh Comeau](https://www.joshwcomeau.com/css/interop-2027/), and [Vale](https://vale.rocks/micros/20261011-0700), whose rankings inspired me to share my own.
