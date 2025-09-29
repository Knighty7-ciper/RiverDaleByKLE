import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const RESEND_API_KEY = process.env.RESEND_API_KEY
const resend = new Resend(RESEND_API_KEY || "")

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      verificationId,
      customerName,
      customerEmail,
      customerPhone,
      packageName,
      packagePrice,
      travelDate,
      groupSize,
      specialRequests,
      adminEmail,
    } = body

    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured")
      return NextResponse.json({ success: false, error: "Email service not configured" }, { status: 500 })
    }

    const { data, error } = await resend.emails.send({
      from: "Riverdale Safaris <onboarding@resend.dev>",
      to: [adminEmail],
      subject: `New Safari Inquiry - ${packageName} (${verificationId})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #d97706, #ea580c); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">New Safari Inquiry</h1>
            <p style="color: white; margin: 5px 0;">Riverdale Safaris</p>
          </div>
          
          <div style="padding: 20px; background: #f9f9f9;">
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #d97706; margin-top: 0;">Inquiry Details</h2>
              <p><strong>Verification ID:</strong> ${verificationId}</p>
              <p><strong>Package:</strong> ${packageName}</p>
              <p><strong>Price:</strong> KSh ${packagePrice?.toLocaleString()}</p>
              ${travelDate ? `<p><strong>Preferred Date:</strong> ${travelDate}</p>` : ""}
              ${groupSize ? `<p><strong>Group Size:</strong> ${groupSize} people</p>` : ""}
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #d97706; margin-top: 0;">Customer Information</h2>
              <p><strong>Name:</strong> ${customerName}</p>
              <p><strong>Email:</strong> ${customerEmail}</p>
              <p><strong>Phone:</strong> ${customerPhone}</p>
            </div>
            
            ${
              specialRequests
                ? `
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #d97706; margin-top: 0;">Special Requests</h2>
              <p>${specialRequests}</p>
            </div>
            `
                : ""
            }
            
            <div style="background: #d97706; color: white; padding: 15px; border-radius: 8px; text-align: center;">
              <h3 style="margin: 0;">Next Steps</h3>
              <p style="margin: 10px 0;">1. Call customer to verify inquiry authenticity</p>
              <p style="margin: 10px 0;">2. Generate custom quotation in admin panel</p>
              <p style="margin: 10px 0;">3. Send quotation email with verification ID</p>
            </div>
          </div>
          
          <div style="background: #1f2937; color: white; padding: 15px; text-align: center;">
            <p style="margin: 0;">Riverdale Safaris Admin Panel</p>
            <p style="margin: 5px 0; font-size: 12px;">This is an automated notification</p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json({ success: false, error: "Failed to send notification" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry notification sent successfully",
      emailId: data?.id,
    })
  } catch (error) {
    console.error("Error sending inquiry notification:", error)
    return NextResponse.json({ success: false, error: "Failed to send notification" }, { status: 500 })
  }
}
