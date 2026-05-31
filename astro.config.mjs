import { defineConfig, envField, fontProviders } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";
import alpinejs from "@astrojs/alpinejs";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  // Keep `site` driven by validated env so sitemap and canonical URLs stay correct.
  site: process.env.PUBLIC_SITE_URL || "http://localhost:4321",
  output: 'server',
  adapter: vercel(),
  trailingSlash: "never",
  env: {
    schema: {
      PUBLIC_SITE_URL: envField.string({
        context: "client",
        access: "public",
        default: "https://example.com",
        url: true,
      }),
      PUBLIC_TWITTER_HANDLE: envField.string({
        context: "client",
        access: "public",
        default: "@yourhandle",
      }),
      PUBLIC_SUPABASE_URL: envField.string({
        context: "client",
        access: "public",
      }),
      PUBLIC_SUPABASE_PUBLISHABLE_KEY: envField.string({
        context: "client",
        access: "public",
      }),
    },
  },
  fonts: [
    {
      name: "Inter",
      cssVariable: "--font-inter",
      provider: fontProviders.local(),
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/InterVariableLatin.woff2"],
            weight: "100 900",
            style: "normal",
          },
        ],
      },
      fallbacks: ["sans-serif"],
    },
  ],
  integrations: [mdx(), sitemap(), icon(), alpinejs()],
  vite: {
    plugins: [tailwindcss()],
  },
});
