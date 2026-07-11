import cloudflare from "@astrojs/cloudflare";
import { rehypeHeadingIds, unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { defineConfig, fontProviders } from "astro/config";
import expressiveCode from "astro-expressive-code";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import imgAttr from "remark-imgattr";
import { autolinkConfig } from "./plugins/rehype-autolink-config";
import { remarkModifiedTime } from "./plugins/remark-modified-time.mjs";

export default defineConfig({
  site: "https://ky.fyi",
  prefetch: true,
  integrations: [
    react(),
    expressiveCode({
      styleOverrides: {
        borderRadius: "0",
        codeFontFamily:
          "'MonoLisa', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
        codeFontSize: "0.85em",
        uiFontSize: "0.9em",
      },
    }),
    mdx(),
    sitemap(),
  ],
  trailingSlash: "never",
  build: {
    format: "file",
  },
  adapter: cloudflare({
    prerenderEnvironment: "node",
    imageService: "passthrough",
  }),
  markdown: {
    processor: unified({
      rehypePlugins: [
        rehypeHeadingIds,
        [rehypeAutolinkHeadings, autolinkConfig],
      ],
      remarkPlugins: [imgAttr, remarkModifiedTime],
    }),
  },
  devToolbar: {
    enabled: false,
  },
  fonts: [
    {
      provider: fontProviders.local(),
      name: "HEX Franklin",
      cssVariable: "--font-sans",
      fallbacks: ["sans-serif"],
      options: {
        variants: [
          {
            src: ["./src/fonts/HEX_Franklin_v0.3_Variable.woff2"],
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "MonoLisa",
      cssVariable: "--font-mono",
      fallbacks: ["monospace"],
      options: {
        variants: [
          {
            src: ["./src/fonts/MonoLisaVariableNormal.woff2"],
          },
        ],
      },
    },
  ],
  redirects: {
    "/garden": "/",
    "/projects": "/",
    "/projects/genderswap": "/posts/genderswap",
    "/projects/boundaries-map": "/posts/boundaries-map",
    "/projects/commonplace": "/posts/commonplace",
    "/friends": "/webrings",
    "/resume": "/downloads/ky-decker-resume.pdf",
    "/downloads/eva-decker-resume.pdf": "/downloads/ky-decker-resume.pdf",
    "/subscribe": "/",
  },
});
