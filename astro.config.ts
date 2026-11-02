import cloudflare from "@astrojs/cloudflare";
import { rehypeHeadingIds, unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { defineConfig, fontProviders } from "astro/config";
import expressiveCode from "astro-expressive-code";
import lilypond from "astro-lilypond";
import imgAttr from "remark-imgattr";

export default defineConfig({
  site: "https://ky.fyi",
  prefetch: true,
  integrations: [
    lilypond(),
    react(),
    expressiveCode({
      styleOverrides: {
        borderRadius: "0",
        borderWidth: "1px",
        codeFontFamily: "var(--font-mono)",
        codeFontSize: "0.85em",
        uiFontSize: "0.9em",
      },
      themes: ["github-light", "github-dark"],
      themeCssSelector: (theme) =>
        theme.name.includes("dark") ? '[data-theme="dark"]' : false,
      useDarkModeMediaQuery: false,
    }),
    mdx(),
    sitemap(),
  ],
  trailingSlash: "never",
  build: {
    format: "file",
    inlineStylesheets: "always",
  },
  adapter: cloudflare({
    prerenderEnvironment: "node",
    imageService: "compile",
  }),
  markdown: {
    processor: unified({
      rehypePlugins: [rehypeHeadingIds],
      remarkPlugins: [imgAttr],
    }),
  },
  devToolbar: {
    enabled: false,
  },
  session: false,
  fonts: [
    {
      provider: fontProviders.local(),
      name: "HEX Franklin",
      cssVariable: "--font-sans",
      fallbacks: ["sans-serif"],
      options: {
        variants: [
          {
            src: ["./src/fonts/franklin.woff2"],
            weight: "320 700",
            style: "normal",
          },
          {
            src: ["./src/fonts/franklin-italic.woff2"],
            weight: "320 700",
            style: "italic",
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "Commit Mono",
      cssVariable: "--font-mono",
      fallbacks: ["monospace"],
      options: {
        variants: [
          {
            src: ["./src/fonts/commit-mono.woff2"],
            weight: "320 700",
            style: "normal",
          },
          {
            src: ["./src/fonts/commit-mono-italic.woff2"],
            weight: "320 700",
            style: "italic",
          },
        ],
      },
    },
  ],
  redirects: {
    "/garden": "/",
    "/projects/genderswap": "/posts/genderswap",
    "/projects/boundaries-map": "/posts/boundaries-map",
    "/projects/commonplace": "/posts/commonplace",
    "/friends": "/webrings",
    "/cv": "/resume",
    "/downloads/eva-decker-resume.pdf": "/downloads/ky-decker-resume.pdf",
    "/subscribe": "/",
    "/writing": "/posts",
  },
});
