/// <reference types="astro/client" />
//
// This file gives TypeScript editors (VS Code, WebStorm, etc.) awareness of
// Astro's client-side globals: import.meta.env, Astro, and framework types.
//
// The generated content-collection types live in .astro/types.d.ts and are
// picked up automatically via the "include" entry in tsconfig.json — no manual
// reference needed here.
//
// Public env vars such as `PUBLIC_SITE_URL` and `PUBLIC_TWITTER_HANDLE` are
// validated in astro.config.mjs via `env.schema`, then exposed through
// `import.meta.env` with types inferred by Astro.
//
// Do not delete this file.

import type { User } from "@supabase/supabase-js";

declare global {
  namespace App {
    interface Locals {
      /** The authenticated Supabase user, set by middleware. Null if not signed in. */
      user: User | null;
    }
  }
}

interface ImportMetaEnv {
  readonly PUBLIC_SUPABASE_URL: string;
  readonly PUBLIC_SUPABASE_PUBLISHABLE_KEY: string;
  readonly PUBLIC_SITE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}