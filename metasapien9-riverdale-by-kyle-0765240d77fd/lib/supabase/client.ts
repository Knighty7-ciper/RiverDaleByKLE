import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

// Check if Supabase environment variables are available
export const isSupabaseConfigured =
  typeof process.env.NEXT_PUBLIC_SUPABASE_URL === "string" &&
  process.env.NEXT_PUBLIC_SUPABASE_URL.length > 0 &&
  typeof process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === "string" &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length > 0

export const supabase = isSupabaseConfigured ? createClientComponentClient() : null

export const getSupabaseClient = () => {
  if (!isSupabaseConfigured) {
    console.error("[v0] Supabase environment variables are not configured")
    throw new Error("Supabase is not configured. Please check your environment variables.")
  }
  return supabase
}
