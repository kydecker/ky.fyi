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
  socials: [
    { name: "Are.na", href: "https://www.are.na/ky-decker/" },
    { name: "Bluesky", href: "https://bsky.app/profile/ky.fyi" },
    { name: "GitHub", href: "https://github.com/kydecker" },
    { name: "LinkedIn", href: "https://linkedin.com/in/kyfyi" },
  ] satisfies SocialLink[],
} as const;
