export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Gallery Application",
  description:
    "Beautifully designed gallery with view image in modal using the NextJs intercepting routes",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
}
