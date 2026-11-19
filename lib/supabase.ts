import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null = null;

/**
 * Lazily create the Supabase client. `NEXT_PUBLIC_*` env vars are only
 * inlined by Next.js at runtime in the browser bundle and during SSR in
 * App Router. Guard so a missing var never throws at module-eval time
 * (which would crash the whole page render).
 */
export function getSupabase(): SupabaseClient {
  if (client) return client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    // Return a stub that throws on use instead of crashing import.
    throw new Error(
      'Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your environment.'
    );
  }
  client = createClient(url, anonKey);
  return client;
}
