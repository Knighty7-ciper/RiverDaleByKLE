import { Resend } from "resend"

const RESEND_API_KEY = process.env.RESEND_API_KEY
const resend = new Resend(RESEND_API_KEY || "")

export interface EmailTemplate {
  subject: string
  body: string
  type: "booking_confirmation" | "admin_alert" | "contact_inquiry"
}

export interface EmailLog {
  id: string
  to: string
  from: string
  subject: string
  body: string
  type: string
  status: "sent" | "pending" | "failed"
  timestamp: string
}

class EmailService {
  private static instance: EmailService

  static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService()
    }
    return EmailService.instance
  }

  async sendBookingConfirmation(booking: any): Promise<boolean> {
    const template = this.getBookingConfirmationTemplate(booking)
    return this.sendEmail(booking.email, template)
  }

  async sendAdminAlert(booking: any): Promise<boolean> {
    const template = this.getAdminAlertTemplate(booking)
    return this.sendEmail("bknglabs.dev@gmails.com", template)
  }

  async sendContactInquiry(contact: any): Promise<boolean> {
    const template = this.getContactInquiryTemplate(contact)
    return this.sendEmail("bknglabs.dev@gmails.com", template)
  }

  private async sendEmail(to: string, template: EmailTemplate): Promise<boolean> {
    try {
      if (!RESEND_API_KEY) {
        console.error("RESEND_API_KEY is not configured")
        return false
      }

      const { data, error } = await resend.emails.send({
        from: "Riverdale Safaris <onboarding@resend.dev>",
        to: [to],
        subject: template.subject,
        html: template.body,
      })

      if (error) {
        console.error("Resend error:", error)
        return false
      }

      // Log successful email
      const emailLog: EmailLog = {
        id: data?.id || Date.now().toString(),
        to,
        from: "onboarding@resend.dev",
        subject: template.subject,
        body: template.body,
        type: template.type,
        status: "sent",
        timestamp: new Date().toISOString(),
      }

      console.log("Email sent successfully:", emailLog)
      return true
    } catch (error) {
      console.error("Failed to send email:", error)
      return false
    }
  }

  private getBookingConfirmationTemplate(booking: any): EmailTemplate {
    return {
      subject: `Booking Confirmation - ${booking.destination || booking.hotel || "Custom Request"}`,
      body: `
Dear ${booking.firstName} ${booking.lastName},

Thank you for choosing Riverdale Travel! We're excited to confirm your booking details:

${booking.destination ? `🌍 Destination: ${booking.destination}` : ""}
${booking.hotel ? `🏨 Hotel: ${booking.hotel}` : ""}
${booking.checkIn ? `📅 Check-in: ${booking.checkIn}` : ""}
${booking.checkOut ? `📅 Check-out: ${booking.checkOut}` : ""}
${booking.travelers ? `👥 Travelers: ${booking.travelers}` : ""}
${booking.totalPrice ? `💰 Total: KSH ${booking.totalPrice?.toLocaleString()}` : ""}

Our team will contact you within 24 hours to finalize the details and arrange payment.

For any questions, please contact us:
📞 Phone: +254 700 123 456
📧 Email: bknglabs.dev@gmails.com

Best regards,
The Riverdale Travel Team

---
This is an automated confirmation. Please do not reply to this email.
      `,
      type: "booking_confirmation",
    }
  }

  private getAdminAlertTemplate(booking: any): EmailTemplate {
    return {
      subject: `New Booking Alert - ${booking.destination || booking.hotel || "Custom Request"}`,
      body: `
New booking received on Riverdale Travel website:

Customer Details:
- Name: ${booking.firstName} ${booking.lastName}
- Email: ${booking.email}
- Phone: ${booking.phone}

Booking Details:
${booking.destination ? `- Destination: ${booking.destination}` : ""}
${booking.hotel ? `- Hotel: ${booking.hotel}` : ""}
${booking.checkIn ? `- Check-in: ${booking.checkIn}` : ""}
${booking.checkOut ? `- Check-out: ${booking.checkOut}` : ""}
${booking.travelers ? `- Travelers: ${booking.travelers}` : ""}
${booking.totalPrice ? `- Total: KSH ${booking.totalPrice?.toLocaleString()}` : ""}

${booking.specialRequests ? `Special Requests: ${booking.specialRequests}` : ""}

Please follow up with the customer within 24 hours.

View in admin panel: /secure-admin-panel-rdt2024/bookings
      `,
      type: "admin_alert",
    }
  }

  private getContactInquiryTemplate(contact: any): EmailTemplate {
    return {
      subject: `New Contact Inquiry - ${contact.subject}`,
      body: `
New contact inquiry received:

From: ${contact.name}
Email: ${contact.email}
Phone: ${contact.phone || "Not provided"}
Subject: ${contact.subject}

Message:
${contact.message}

Please respond to the customer promptly.
      `,
      type: "contact_inquiry",
    }
  }

  getEmailLogs(): EmailLog[] {
    return JSON.parse(localStorage.getItem("emailLogs") || "[]")
  }
}

export default EmailService
