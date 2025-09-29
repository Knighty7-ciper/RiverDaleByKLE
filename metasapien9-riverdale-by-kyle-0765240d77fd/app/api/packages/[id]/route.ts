import { NextResponse, type NextRequest } from "next/server"
import { serverSupabase as supabase } from "@/lib/supabase/server"

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  if (!supabase) return NextResponse.json({ error: "Supabase is not configured" }, { status: 500 })

  try {
    const id = params.id

    const { data, error } = await supabase
      .from("packages")
      .select(
        `id, name, slug, description, duration, base_price, rating, best_time, difficulty, max_group_size, images, highlights, itinerary, inclusions, exclusions, destination_id, destinations ( id, name, country, location )`
      )
      .eq("id", id)
      .single()

    if (error) {
      console.error("Error fetching package:", error)
      return NextResponse.json({ error: "Failed to fetch package" }, { status: 500 })
    }

    if (!data) return NextResponse.json({ error: "Not found" }, { status: 404 })

    return NextResponse.json({ package: data })
  } catch (e) {
    console.error("Unhandled package GET:", e)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
