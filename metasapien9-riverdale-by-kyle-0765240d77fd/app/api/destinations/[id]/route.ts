import { NextResponse, type NextRequest } from "next/server"
import { serverSupabase as supabase } from "@/lib/supabase/server"

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!supabase) return NextResponse.json({ error: "Supabase not configured" }, { status: 500 })

    const id = params.id
    const { data: destination, error } = await supabase
      .from("destinations")
      .select("*, packages:packages(id, name, base_price, duration, rating, images)")
      .eq("id", id)
      .single()

    if (error) {
      if ((error as any).code === "42P01") return NextResponse.json({ destination: null })
      console.error("Error fetching destination:", error)
      return NextResponse.json({ error: "Failed to fetch destination" }, { status: 500 })
    }

    return NextResponse.json({ destination })
  } catch (e) {
    console.error("Unhandled destination GET:", e)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
