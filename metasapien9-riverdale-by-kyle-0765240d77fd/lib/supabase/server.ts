// Centralized server-side Supabase client using provided project URL and SUPABASE_KEY
import { createClient as createSupabaseClient } from "@supabase/supabase-js"

export const SUPABASE_URL = "https://zsriignoworghdbkukzi.supabase.co"
export const isSupabaseConfigured = typeof process.env.SUPABASE_KEY === "string" && process.env.SUPABASE_KEY.length > 0

export const serverSupabase = isSupabaseConfigured
  ? createSupabaseClient(SUPABASE_URL, process.env.SUPABASE_KEY!)
  : null

export function getServerSupabase() {
  if (!serverSupabase) {
    throw new Error("Supabase is not configured on the server. Set SUPABASE_KEY.")
  }
  return serverSupabase
}
