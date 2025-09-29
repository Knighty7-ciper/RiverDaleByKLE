"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Phone, Mail, Users, Calendar, MapPin, MessageSquare, CheckCircle, Clock } from "lucide-react"
import Link from "next/link"

interface InquiryDetail {
  id: string
  verification_id: string
  customer_name: string
  customer_email: string
  customer_phone: string
  package_name: string
  adults: number
  children: number
  quoted_amount: number | null
  inquiry_status: string
  created_at: string
  preferred_start_date: string | null
  special_requests: string | null
  admin_notes: string | null
}

export default function InquiryDetailPage() {
  const [inquiry, setInquiry] = useState<InquiryDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [adminNotes, setAdminNotes] = useState("")
  const [quotedAmount, setQuotedAmount] = useState("")
  const [status, setStatus] = useState("")
  const router = useRouter()
  const params = useParams()

  useEffect(() => {
    const checkAuth = async () => {
      const { createClientComponentClient } = await import("@supabase/auth-helpers-nextjs")
      const supabase = createClientComponentClient()
      const { data: sessionData } = await supabase.auth.getSession()
      if (!sessionData.session) {
        router.push("/admin")
        return
      }
      const user = sessionData.session.user
      const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()
      if (!profile || profile.role !== "admin") {
        await supabase.auth.signOut()
        router.push("/admin")
        return
      }
      loadInquiryDetail()
    }
    checkAuth()
  }, [router, params])

  const loadInquiryDetail = async () => {
    try {
      const id = params["inquiry-id"] as string
      const res = await fetch(`/api/inquiries/${id}`)
      if (!res.ok) throw new Error("Failed to load inquiry detail")
      const json = await res.json()
      const x = json.inquiry

      const detail: InquiryDetail = {
        id: x.id,
        verification_id: x.verification_id,
        customer_name: x.customer_name,
        customer_email: x.customer_email,
        customer_phone: x.customer_phone,
        package_name: x.package_name,
        adults: x.adults ?? 0,
        children: x.children ?? 0,
        quoted_amount: x.quoted_amount ?? null,
        inquiry_status: x.inquiry_status,
        created_at: x.created_at,
        preferred_start_date: x.preferred_start_date ?? null,
        special_requests: x.special_requests ?? null,
        admin_notes: x.admin_notes ?? null,
      }

      setInquiry(detail)
      setAdminNotes(detail.admin_notes || "")
      setQuotedAmount(detail.quoted_amount?.toString() || "")
      setStatus(detail.inquiry_status)
    } catch (error) {
      console.error("Error loading inquiry detail:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateInquiry = async () => {
    if (!inquiry) return

    try {
      const res = await fetch(`/api/inquiries/${inquiry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          admin_notes: adminNotes,
          quoted_amount: quotedAmount ? Number.parseInt(quotedAmount) : null,
          inquiry_status: status,
        }),
      })

      if (!res.ok) throw new Error("Failed to update inquiry")

      alert("Inquiry updated successfully!")
    } catch (error) {
      console.error("Error updating inquiry:", error)
      alert("Error updating inquiry")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading inquiry details...</div>
      </div>
    )
  }

  if (!inquiry) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Inquiry not found</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/admin/inquiries">
                <Button variant="ghost" className="text-gray-300 hover:text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Inquiries
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-white">Inquiry Details</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Customer & Package Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Information */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  Customer Information
                  <Badge className="bg-yellow-100 text-yellow-800">
                    <Clock className="w-4 h-4 mr-1" />
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300">Full Name</Label>
                    <p className="text-white text-lg font-medium">{inquiry.customer_name}</p>
                  </div>
                  <div>
                    <Label className="text-gray-300">Verification ID</Label>
                    <p className="text-cyan-400 font-mono">{inquiry.verification_id}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">{inquiry.customer_email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">{inquiry.customer_phone}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">{inquiry.adults} Adults</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">{inquiry.children} Children</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">
                      {inquiry.preferred_start_date
                        ? new Date(inquiry.preferred_start_date).toLocaleDateString()
                        : "Flexible"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Package Information */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Package Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-4">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-xl font-semibold text-white">{inquiry.package_name}</h3>
                </div>

                {inquiry.special_requests && (
                  <div>
                    <Label className="text-gray-300">Special Requests</Label>
                    <p className="text-gray-300 bg-gray-700 p-3 rounded-lg mt-1">{inquiry.special_requests}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Admin Actions */}
          <div className="space-y-6">
            {/* Status & Pricing */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Admin Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="status" className="text-gray-300">
                    Status
                  </Label>
                  <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full mt-1 bg-gray-700 border-gray-600 text-white rounded-md p-2"
                  >
                    <option value="pending">Pending</option>
                    <option value="contacted">Contacted</option>
                    <option value="quoted">Quoted</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="quote" className="text-gray-300">
                    Quoted Amount (KES)
                  </Label>
                  <Input
                    id="quote"
                    type="number"
                    value={quotedAmount}
                    onChange={(e) => setQuotedAmount(e.target.value)}
                    placeholder="Enter quote amount"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="notes" className="text-gray-300">
                    Admin Notes
                  </Label>
                  <Textarea
                    id="notes"
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Add notes about this inquiry..."
                    rows={4}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>

                <Button onClick={updateInquiry} className="w-full bg-cyan-600 hover:bg-cyan-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Update Inquiry
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Customer
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send Quote
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
