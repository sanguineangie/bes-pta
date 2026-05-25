import { defineAction } from "astro:actions";
import { z } from "astro/zod";
import { createClient } from "../lib/supabase";

export const server = {
  /**
   * Sign up with email and password.
   * Sends a confirmation email with a link back to /auth/callback.
   */
  signUp: defineAction({
    accept: "form",
    input: z.object({
      email: z.email(),
      password: z.string().min(6),
    }),
    handler: async (input, context) => {
      try {
        const supabase = createClient({
          request: context.request,
          cookies: context.cookies,
        });

        // Build redirect URL dynamically from the request origin
        const origin = new URL(context.request.url).origin;

        const { error } = await supabase.auth.signUp({
          email: input.email,
          password: input.password,
          options: {
            emailRedirectTo: `${origin}/auth/callback`,
          },
        });

        if (error) {
          return {
            success: false,
            message: error.message,
          };
        }

        return {
          success: true,
          message: "Check your email to confirm your account",
        };
      } catch (err) {
        console.error("signUp error:", err);
        return {
          success: false,
          message: "Unexpected error",
        };
      }
    },
  }),

  /**
   * Sign in with email and password.
   */
  signIn: defineAction({
    accept: "form",
    input: z.object({
      email: z.email(),
      password: z.string(),
    }),
    handler: async (input, context) => {
      try {
        const supabase = createClient({
          request: context.request,
          cookies: context.cookies,
        });

        const { error } = await supabase.auth.signInWithPassword({
          email: input.email,
          password: input.password,
        });

        if (error) {
          return {
            success: false,
            message: error.message,
          };
        }

        return {
          success: true,
          message: "Signed in successfully",
        };
      } catch (err) {
        console.error("signIn error:", err);
        return {
          success: false,
          message: "Unexpected error",
        };
      }
    },
  }),

  /**
   * Sign in with Google OAuth.
   * Returns a redirect URL — the client must navigate to it.
   */
  signInWithGoogle: defineAction({
    handler: async (_, context) => {
      try {
        const supabase = createClient({
          request: context.request,
          cookies: context.cookies,
        });

        const origin = new URL(context.request.url).origin;

        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: `${origin}/auth/callback`,
          },
        });

        if (error) {
          return {
            success: false,
            message: error.message,
            url: null,
          };
        }

        return {
          success: true,
          message: "Redirecting to Google",
          url: data.url,
        };
      } catch (err) {
        console.error("signInWithGoogle error:", err);
        return {
          success: false,
          message: "Unexpected error",
          url: null,
        };
      }
    },
  }),

  /**
   * Sign out — clears the session and cookies.
   */
  signOut: defineAction({
    handler: async (_, context) => {
      try {
        const supabase = createClient({
          request: context.request,
          cookies: context.cookies,
        });

        await supabase.auth.signOut();

        return {
          success: true,
        };
      } catch (err) {
        console.error("signOut error:", err);
        return {
          success: false,
          message: "Failed to sign out",
        };
      }
    },
  }),
};