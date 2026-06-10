import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

export const collections = {
  posts: defineCollection({
    loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/posts" }),
    schema: ({ image }) =>
      z.object({
        title: z.string(),
        description: z.string(),
        datePublished: z.date(),
        dateModified: z.date().optional(),
        previewImage: z
          .object({
            image: image(),
            alt: z.string(),
          })
          .optional(),
        type: z.enum(["post", "case-study"]).default("post"),
      }),
  }),

  pages: defineCollection({
    loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/pages" }),
    schema: ({ image }) =>
      z.object({
        title: z.string(),
        description: z.string(),
        datePublished: z.date(),
        dateModified: z.date().optional(),
        headerImage: z
          .object({
            image: image().array(),
            alt: z.string(),
          })
          .optional(),
        previewImage: z
          .object({
            image: image(),
            alt: z.string(),
          })
          .optional(),
      }),
  }),

  work: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.yml",
      base: "./src/content/work",
    }),
    schema: ({ image }) =>
      z.object({
        title: z.string(),
        description: z.string().optional(),
        year: z.number(),
        url: z.url(),
        urlText: z.string().optional(),
        category: z.string(),
        previewImage: z
          .object({
            image: image(),
            alt: z.string(),
          })
          .optional(),
      }),
  }),

  webrings: defineCollection({
    loader: glob({ pattern: "**/[^_]*.yml", base: "./src/content/webrings" }),
    schema: () =>
      z.object({
        title: z.string(),
        description: z.string(),
        url: z.url(),
        prev: z.url(),
        next: z.url(),
        color: z.string(), // Radix color
      }),
  }),

  badges: defineCollection({
    loader: glob({ pattern: "**/[^_]*.yml", base: "./src/content/badges" }),
    schema: ({ image }) =>
      z
        .object({
          img: image(),
          alt: z.string(),
          url: z.string().optional(),
        })
        .array(),
  }),

  now: defineCollection({
    loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/now" }),
    schema: () =>
      z.object({
        date: z.date(),
      }),
  }),
};
