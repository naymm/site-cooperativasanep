import { createClient } from "@supabase/supabase-js";

function requireEnv(name: string): string {
  const value = import.meta.env[name] as string | undefined;
  if (!value) {
    throw new Error(
      `Missing environment variable ${name}. Add it to your .env file (ex: ${name}=...).`,
    );
  }
  return value;
}

export const supabase = createClient(
  requireEnv("VITE_SUPABASE_URL"),
  requireEnv("VITE_SUPABASE_ANON_KEY"),
);

