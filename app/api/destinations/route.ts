import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { serverSupabase as supabase } from "@/lib/supabase/server"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get("search")?.trim()
    const limit = Number.parseInt(searchParams.get("limit") || "60")

    if (!supabase) {
      return NextResponse.json({ destinations: [] })
    }

    // Supabase-backed flow using same search/limit
    let query = supabase.from("destinations").select("*").order("created_at", { ascending: false })

    if (search) {
      const like = `%${search}%`
      query = query.or(`name.ilike.${like},description.ilike.${like},location.ilike.${like},country.ilike.${like}`)
    }

    if (Number.isFinite(limit)) query = query.limit(limit)

    const { data, error } = await query
    if (error) {
      console.error("Error fetching destinations:", error)
      return NextResponse.json({ destinations: [] })
    }

    const rows = (data || []).map((d: any) => ({
      id: d.id,
      name: d.name,
      description: d.description || "",
      location: d.location || d.country || "Kenya",
      price_from: d.price_from ?? 0,
      duration: d.duration || "",
      max_group_size: d.max_group_size ?? 0,
      rating: d.rating ?? 0,
      reviews_count: d.reviews_count ?? 0,
      image_url: d.image_url || d.featured_image || "/placeholder.svg",
      category: d.category || "Safari",
      featured: Boolean(d.featured),
      country: d.country || null,
      featured_image: d.featured_image || d.image_url || "/placeholder.svg",
      packages_count: d.packages_count ?? 0,
      status: d.status || "active",
      created_at: d.created_at,
    }))

    return NextResponse.json({ destinations: rows })
  } catch (e) {
    console.error("Unhandled destinations GET:", e)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

const CreateSchema = z.object({
  name: z.string().min(2),
  country: z.string().min(2),
  description: z.string().min(10),
  featured_image: z.string().url().optional().nullable(),
  status: z.enum(["active", "inactive"]).default("active"),
})

export async function POST(req: NextRequest) {
  if (!supabase) return NextResponse.json({ error: "Supabase is not configured" }, { status: 500 })

  try {
    const body = await req.json()
    const parsed = CreateSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload", details: parsed.error.flatten() }, { status: 400 })
    }

    const payload = {
      name: parsed.data.name,
      country: parsed.data.country,
      description: parsed.data.description,
      featured_image: parsed.data.featured_image || null,
      status: parsed.data.status,
    }

    const { data, error } = await supabase.from("destinations").insert([payload]).select().single()
    if (error) {
      console.error("Error creating destination:", error)
      return NextResponse.json({ error: "Failed to create destination" }, { status: 500 })
    }

    return NextResponse.json({ destination: data })
  } catch (e) {
    console.error("Unhandled destinations POST:", e)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
