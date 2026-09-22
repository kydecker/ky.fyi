export type SocialLink = {
  name: string;
  href: string;
};

export const siteInfo = {
  name: "Ky Decker",
  description: "Ky is a designer and web developer based in New York City.",
  rssTitle: "Dispatches from Ky Decker",
  fathomId: "WKFTECUZ",
  email: "hi@ky.fyi",
  socials: {
    arena: { name: "Are.na", href: "https://www.are.na/ky-decker/" },
    github: { name: "GitHub", href: "https://github.com/kydecker" },
    linkedin: { name: "LinkedIn", href: "https://linkedin.com/in/kyfyi" },
    rss: { name: "RSS", href: "/rss.xml" },
  } satisfies Record<string, SocialLink>,
} as const;
