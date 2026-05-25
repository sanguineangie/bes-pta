import { defineMiddleware } from "astro:middleware";
import { createClient } from "./lib/supabase";

/**
 * Auth middleware — runs on every server-rendered request.
 *
 * 1. Refreshes the Supabase session (keeps cookies valid).
 * 2. Redirects unauthenticated users away from protected routes.
 *
 * Protected routes: /dashboard, /api/* (except /api/auth/*)
 * Public routes: /, /auth/*, /api/auth/*, static assets
 */
export const onRequest = defineMiddleware(async (context, next) => {
  // Skip for prerendered/static pages
  if (context.isPrerendered) {
    return next();
  }

  const { request, cookies, redirect, url } = context;

  // Create supabase client to refresh the session on every request
  const supabase = createClient({ request, cookies });

  // Always call getUser() — this refreshes the session token if needed.
  // We intentionally ignore the error here; if the session is invalid,
  // the user simply won't be authenticated.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Store user on locals so pages/actions can access it without re-fetching
  context.locals.user = user;

  // Public routes that don't require authentication
  const publicPaths = ["/", "/auth/signin", "/auth/signup", "/auth/callback", "/auth/google"];
  const isPublic =
    publicPaths.includes(url.pathname) ||
    url.pathname.startsWith("/api/auth") ||
    url.pathname.startsWith("/_");

  // Redirect unauthenticated users away from any non-public page
  if (!isPublic && !user) {
    return redirect("/auth/signin");
  }

  // Redirect authenticated users away from auth pages (optional UX improvement)
  const authPaths = ["/auth/signin", "/auth/signup"];
  if (authPaths.includes(url.pathname) && user) {
    return redirect("/dashboard");
  }

  return next();
});
