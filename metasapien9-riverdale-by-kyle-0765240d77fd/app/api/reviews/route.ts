import { type NextRequest, NextResponse } from "next/server"
import { serverSupabase as supabase } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    if (!supabase) {
      return NextResponse.json({ reviews: [] })
    }
    const { searchParams } = new URL(request.url)
    const packageId = searchParams.get("package_id")
    const limit = searchParams.get("limit")
    const featured = searchParams.get("featured")

    let query = supabase
      .from("customer_reviews")
      .select(`
        *,
        packages (
          name,
          slug,
          destinations (
            name
          )
        )
      `)
      .eq("admin_approved", true)
      .order("created_at", { ascending: false })

    if (packageId) {
      query = query.eq("package_id", packageId)
    }

    if (featured === "true") {
      query = query.eq("featured", true)
    }

    if (limit) {
      query = query.limit(Number.parseInt(limit))
    }

    const { data: reviews, error } = await query

    if (error) {
      // If table doesn't exist yet, return empty to avoid homepage 500
      if ((error as any).code === "42P01") {
        return NextResponse.json({ reviews: [] })
      }
      console.error("Error fetching reviews:", error)
      return NextResponse.json({ reviews: [] })
    }

    return NextResponse.json({ reviews: reviews || [] })
  } catch (error) {
    console.error("Error in reviews API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!supabase) {
      return NextResponse.json({ error: "Email/DB not configured" }, { status: 500 })
    }
    const body = await request.json()
    const { package_id, customer_name, customer_email, customer_location, title, content, rating, travel_date } = body

    // Validate required fields
    if (!customer_name || !customer_email || !title || !content || !rating) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate rating
    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 })
    }

    // Insert review (will need admin approval)
    const { data: review, error } = await supabase
      .from("customer_reviews")
      .insert({
        package_id,
        customer_name,
        customer_email,
        customer_location,
        title,
        content,
        rating,
        travel_date,
        admin_approved: false, // Requires admin approval
        verified: false,
      })
      .select()
      .single()

    if (error) {
      console.error("Error creating review:", error)
      return NextResponse.json({ error: "Failed to create review" }, { status: 500 })
    }

    // Create admin notification
    await supabase.from("notification_queue").insert({
      notification_type: "new_review",
      recipient_email: "bknglabs.dev@gmails.com",
      title: "New Customer Review Submitted",
      message: `A new review has been submitted by ${customer_name} for approval.`,
      review_id: review.id,
    })

    return NextResponse.json({
      message: "Review submitted successfully and is pending approval",
      review,
    })
  } catch (error) {
    console.error("Error in reviews POST API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
