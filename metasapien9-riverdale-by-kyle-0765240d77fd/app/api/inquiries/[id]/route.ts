import { NextResponse, type NextRequest } from "next/server"
import { z } from "zod"
import { serverSupabase as supabase } from "@/lib/supabase/server"

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  if (!supabase) {
    return NextResponse.json({ error: "Supabase is not configured" }, { status: 500 })
  }

  try {
    const { id } = params
    const { data, error } = await supabase
      .from("inquiries")
      .select(
        "id, verification_id, customer_name, customer_email, customer_phone, package_name, adults, children, quoted_amount, inquiry_status, created_at, preferred_start_date, special_requests, admin_notes",
      )
      .eq("id", id)
      .single()

    if (error) {
      console.error("Error fetching inquiry detail:", error)
      return NextResponse.json({ error: "Failed to fetch inquiry" }, { status: 500 })
    }

    if (!data) return NextResponse.json({ error: "Not found" }, { status: 404 })

    return NextResponse.json({ inquiry: data })
  } catch (e) {
    console.error("Unhandled error in inquiry detail GET:", e)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

const PatchSchema = z.object({
  admin_notes: z.string().optional().nullable(),
  quoted_amount: z.number().int().nonnegative().optional().nullable(),
  inquiry_status: z.enum(["pending", "contacted", "quoted", "confirmed", "cancelled"]).optional(),
})

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!supabase) {
    return NextResponse.json({ error: "Supabase is not configured" }, { status: 500 })
  }

  try {
    const body = await req.json()
    const parsed = PatchSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload", details: parsed.error.flatten() }, { status: 400 })
    }

    const updates: Record<string, any> = {}
    if ("admin_notes" in parsed.data) updates.admin_notes = parsed.data.admin_notes
    if ("quoted_amount" in parsed.data) updates.quoted_amount = parsed.data.quoted_amount
    if ("inquiry_status" in parsed.data) updates.inquiry_status = parsed.data.inquiry_status

    const { id } = params
    const { error } = await supabase.from("inquiries").update(updates).eq("id", id)

    if (error) {
      console.error("Error updating inquiry:", error)
      return NextResponse.json({ error: "Failed to update inquiry" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error("Unhandled error in inquiry detail PATCH:", e)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
