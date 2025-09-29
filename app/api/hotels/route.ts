import { type NextRequest, NextResponse } from "next/server"
import { serverSupabase as supabase } from "@/lib/supabase/server"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get("search")?.trim()
    const limit = Number.parseInt(searchParams.get("limit") || "60")

    if (!supabase) {
      return NextResponse.json({ hotels: [] })
    }

    // Supabase-backed flow using same search/limit
    let query = supabase.from("hotels").select("*").order("created_at", { ascending: false })

    if (search) {
      const like = `%${search}%`
      query = query.or(
        `name.ilike.${like},description.ilike.${like},location.ilike.${like},country.ilike.${like}`,
      )
    }
    if (Number.isFinite(limit)) query = query.limit(limit)

    const { data, error } = await query
    if (error) {
      console.error("Error fetching hotels:", error)
      return NextResponse.json({ hotels: [] })
    }

    const rows = (data || []).map((h: any) => ({
      id: h.id,
      name: h.name,
      description: h.description || "",
      location: h.location || h.country || "",
      price_per_night: h.price_per_night ?? 0,
      rating: h.rating ?? 0,
      reviews_count: h.reviews_count ?? 0,
      image_url: h.image_url || "/placeholder.svg",
      category: h.category || "",
      amenities: h.amenities || [],
      featured: Boolean(h.featured),
      created_at: h.created_at,
    }))

    return NextResponse.json({ hotels: rows })
  } catch (e) {
    console.error("Unhandled hotels GET:", e)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
