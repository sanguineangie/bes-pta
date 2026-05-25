import { createServerClient, parseCookieHeader } from "@supabase/ssr";
import type { AstroCookies } from "astro";

/**
 * Creates a Supabase server client wired to Astro's request/cookie API.
 *
 * Usage in .astro pages or actions:
 *   const supabase = createClient({ request: Astro.request, cookies: Astro.cookies });
 *
 * The client reads/writes Supabase auth cookies so sessions persist across requests.
 */
export function createClient({
  request,
  cookies,
}: {
  request: Request;
  cookies: AstroCookies;
}) {
  const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
  const supabaseKey = import.meta.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "Missing PUBLIC_SUPABASE_URL or PUBLIC_SUPABASE_PUBLISHABLE_KEY env vars. " +
        "Add them to your .env file."
    );
  }

  return createServerClient(supabaseUrl, supabaseKey, {
    auth: {
      flowType: "pkce",
    },
    cookies: {
      getAll() {
        return parseCookieHeader(request.headers.get("Cookie") ?? "").map(
          ({ name, value }) => ({ name, value: value ?? "" })
        );
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookies.set(name, value, options);
        });
      },
    },
  });
}