import { NextResponse } from "next/server"
import { createClient as createSupabaseClient } from "@supabase/supabase-js"

const isConfigured =
  typeof process.env.NEXT_PUBLIC_SUPABASE_URL === "string" &&
  process.env.NEXT_PUBLIC_SUPABASE_URL.length > 0 &&
  typeof process.env.SUPABASE_SERVICE_ROLE_KEY === "string" &&
  process.env.SUPABASE_SERVICE_ROLE_KEY.length > 0

const supabase = isConfigured
  ? createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    )
  : null

export async function GET() {
  if (!supabase) {
    return NextResponse.json({ error: "Supabase is not configured" }, { status: 500 })
  }

  try {
    const [{ count: totalInquiries }, { count: pendingInquiries }] = await Promise.all([
      supabase.from("inquiries").select("id", { count: "exact", head: true }),
      supabase.from("inquiries").select("id", { count: "exact", head: true }).eq("inquiry_status", "pending"),
    ])

    const { data: confirmedRows } = await supabase
      .from("inquiries")
      .select("quoted_amount")
      .eq("inquiry_status", "confirmed")

    const confirmedBookings = confirmedRows?.length || 0
    const totalRevenue = (confirmedRows || []).reduce((sum, r) => sum + (r.quoted_amount || 0), 0)

    // Simple monthly growth: last 30 days vs previous 30
    const now = new Date()
    const last30 = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString()
    const prev60 = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000).toISOString()

    const [{ count: last30Count }, { count: prev30Count }] = await Promise.all([
      supabase.from("inquiries").select("id", { count: "exact", head: true }).gte("created_at", last30),
      supabase
        .from("inquiries")
        .select("id", { count: "exact", head: true })
        .gte("created_at", prev60)
        .lt("created_at", last30),
    ])

    const monthlyGrowth = prev30Count && prev30Count > 0 ? (((last30Count || 0) - prev30Count) / prev30Count) * 100 : 0

    const { data: recentInquiries } = await supabase
      .from("inquiries")
      .select(
        "id, verification_id, customer_name, customer_email, customer_phone, package_name, adults, children, quoted_amount, inquiry_status, created_at",
      )
      .order("created_at", { ascending: false })
      .limit(5)

    return NextResponse.json({
      totalInquiries: totalInquiries || 0,
      pendingInquiries: pendingInquiries || 0,
      confirmedBookings,
      totalRevenue,
      monthlyGrowth: Math.round((monthlyGrowth + Number.EPSILON) * 10) / 10,
      recentInquiries: recentInquiries || [],
    })
  } catch (e) {
    console.error("Error loading admin stats:", e)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
