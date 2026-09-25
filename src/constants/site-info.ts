import type { SocialIconName } from "../components/Footer/SocialIcon.astro";

export type SocialLink = {
  name: string;
  href: string;
  icon: SocialIconName;
};

export const siteInfo = {
  name: "Ky Decker",
  description: "Ky is a designer and web developer based in New York City.",
  rssTitle: "Dispatches from Ky Decker",
  email: "hi@ky.fyi",
  socials: {
    email: { name: "Email", href: "mailto:hi@ky.fyi", icon: "mail" },
    github: {
      name: "GitHub",
      href: "https://github.com/kydecker",
      icon: "github",
    },
    linkedin: {
      name: "LinkedIn",
      href: "https://linkedin.com/in/kyfyi",
      icon: "linkedin",
    },
    bluesky: {
      name: "Bluesky",
      href: "https://bsky.app/profile/ky.fyi",
      icon: "bluesky",
    },
    glass: {
      name: "Glass",
      href: "https://glass.photo/kydecker",
      icon: "glass",
    },
    arena: {
      name: "Are.na",
      href: "https://www.are.na/ky-decker/",
      icon: "arena",
    },
    rss: { name: "RSS", href: "/rss.xml", icon: "rss" },
  } satisfies Record<string, SocialLink>,
} as const;
