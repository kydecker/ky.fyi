import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { lilypondLoader } from "astro-lilypond/loader";

export const collections = {
  posts: defineCollection({
    loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/posts" }),
    schema: ({ image }) =>
      z.object({
        title: z.string(),
        description: z.string(),
        datePublished: z.date(),
        previewImage: z
          .object({
            image: image(),
            alt: z.string(),
          })
          .optional(),
        projectInfo: z
          .object({
            timeline: z
              .object({
                start: z.string(),
                end: z.string(),
              })
              .optional(),
            roles: z.array(z.string()).optional(),
            tech: z.array(z.string()).optional(),
            website: z.url().optional(),
            repo: z.string().optional(),
            collaborators: z
              .array(
                z.object({
                  name: z.string(),
                  img: image(),
                  url: z.url(),
                }),
              )
              .optional(),
          })
          .optional(),
      }),
  }),

  pages: defineCollection({
    loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/pages" }),
    schema: ({ image }) =>
      z.object({
        title: z.string(),
        description: z.string(),
        datePublished: z.date(),
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

  scores: defineCollection({
    loader: lilypondLoader({ base: "./src/content/scores" }),
  }),

  jobs: defineCollection({
    loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/jobs" }),
    schema: () =>
      z.object({
        company: z.string(),
        url: z.url(),
        role: z.string(),
        dates: z.object({
          from: z.date(),
          to: z.date().optional(), // Omit date for "now"
        }),
      }),
  }),

  skills: defineCollection({
    loader: glob({ pattern: "**/[^_]*.yml", base: "./src/content/skills" }),
    schema: () =>
      z.object({
        title: z.string(),
        skills: z.array(z.string()),
      }),
  }),
};
