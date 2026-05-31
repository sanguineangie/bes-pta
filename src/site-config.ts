export const siteConfig = {
  title: "UMASD Accountability Project",
  description: "An independent, data-driven analysis of Upper Merion Area School District administrative decisions and their impact on students.",
  githubRepo: "aholbreich/astro-tailwind-daisyui-starter",
  // Astro validates these public env vars in astro.config.mjs.
  site: import.meta.env.PUBLIC_SITE_URL,
  footerText: "UMASD Accountability Project.",

  // Used in SEOmeta for Twitter card and Open Graph
  seo: {
    twitterHandle: import.meta.env.PUBLIC_TWITTER_HANDLE,
    twitterSite: import.meta.env.PUBLIC_SITE_URL,
  },
};

// Feature flags examples
export const featureFlags = {
  enableImprint: false,
  enableDataprotection: false,
  showAttribution: false, // Show starter attribution in the footer if you want it
};

// Navigation menu items
export const nav = [
  {
    text: "Home",
    url: "/",
  },
  {
    text: "Events",
    url: "/events",
  },
  {
    text: "Sources",
    url: "/sources",
  },
  {
    text: "Data & Analysis",
    url: "/analysis",
  },
  {
    text: "About",
    url: "/about",
  }
];
