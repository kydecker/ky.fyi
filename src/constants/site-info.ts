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
  fathomId: "WKFTECUZ",
  email: "hi@ky.fyi",
  socials: {
    email: { name: "Email", href: "mailto:hi@ky.fyi", icon: "mail" },
    arena: {
      name: "Are.na",
      href: "https://www.are.na/ky-decker/",
      icon: "arena",
    },
    glass: {
      name: "Glass",
      href: "https://glass.photo/kydecker",
      icon: "glass",
    },
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
    rss: { name: "RSS", href: "/rss.xml", icon: "rss" },
  } satisfies Record<string, SocialLink>,
} as const;
