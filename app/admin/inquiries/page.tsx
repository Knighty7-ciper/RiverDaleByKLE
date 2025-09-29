"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Phone, Mail, Users, Calendar, Eye, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Inquiry {
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
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [filteredInquiries, setFilteredInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const router = useRouter()

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
      loadInquiries()
    }
    checkAuth()
  }, [router])

  useEffect(() => {
    // Filter inquiries based on search and status
    let filtered = inquiries

    if (searchTerm) {
      filtered = filtered.filter(
        (inquiry) =>
          inquiry.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          inquiry.customer_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          inquiry.verification_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          inquiry.package_name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((inquiry) => inquiry.inquiry_status === statusFilter)
    }

    setFilteredInquiries(filtered)
  }, [inquiries, searchTerm, statusFilter])

  useEffect(() => {
    loadInquiries()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter])

  const loadInquiries = async () => {
    try {
      const params = new URLSearchParams()
      if (statusFilter && statusFilter !== "all") params.set("status", statusFilter)
      if (searchTerm) params.set("search", searchTerm)

      const res = await fetch(`/api/inquiries?${params.toString()}`)
      if (!res.ok) throw new Error("Failed to load inquiries")
      const json = await res.json()

      const rows: Inquiry[] = (json.inquiries || []).map((x: any) => ({
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
      }))

      setInquiries(rows)
      setFilteredInquiries(rows)
    } catch (error) {
      console.error("Error loading inquiries:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "contacted":
        return "bg-blue-100 text-blue-800"
      case "quoted":
        return "bg-purple-100 text-purple-800"
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusCount = (status: string) => {
    if (status === "all") return inquiries.length
    return inquiries.filter((inquiry) => inquiry.inquiry_status === status).length
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading inquiries...</div>
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
              <Link href="/admin/dashboard">
                <Button variant="ghost" className="text-gray-300 hover:text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-white">Customer Inquiries</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search by name, email, verification ID, or package..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
            <div className="flex space-x-2">
              {["all", "pending", "contacted", "quoted", "confirmed"].map((status) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? "default" : "outline"}
                  onClick={() => setStatusFilter(status)}
                  className={
                    statusFilter === status
                      ? "bg-cyan-600 hover:bg-cyan-700"
                      : "border-gray-600 text-gray-300 hover:bg-gray-700"
                  }
                >
                  {status === "all" ? "All" : status.charAt(0).toUpperCase() + status.slice(1)} (
                  {getStatusCount(status)})
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Inquiries List */}
        <div className="space-y-4">
          {filteredInquiries.map((inquiry) => (
            <Card key={inquiry.id} className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Badge className={getStatusColor(inquiry.inquiry_status)}>
                      {inquiry.inquiry_status.charAt(0).toUpperCase() + inquiry.inquiry_status.slice(1)}
                    </Badge>
                    <span className="text-gray-400 font-mono text-sm">{inquiry.verification_id}</span>
                    <span className="text-gray-500 text-sm">{new Date(inquiry.created_at).toLocaleDateString()}</span>
                  </div>
                  <Link href={`/admin/inquiries/${inquiry.id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Customer Info */}
                  <div>
                    <h3 className="text-white font-semibold mb-2">{inquiry.customer_name}</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center text-gray-400">
                        <Mail className="w-4 h-4 mr-2" />
                        {inquiry.customer_email}
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Phone className="w-4 h-4 mr-2" />
                        {inquiry.customer_phone}
                      </div>
                    </div>
                  </div>

                  {/* Package Info */}
                  <div>
                    <h4 className="text-white font-medium mb-2">{inquiry.package_name}</h4>
                    <div className="space-y-1 text-sm text-gray-400">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        {inquiry.adults} adults{inquiry.children > 0 && `, ${inquiry.children} children`}
                      </div>
                      {inquiry.preferred_start_date && (
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          {new Date(inquiry.preferred_start_date).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="text-right">
                    {inquiry.quoted_amount ? (
                      <div>
                        <div className="text-2xl font-bold text-cyan-400">
                          KES {inquiry.quoted_amount.toLocaleString()}
                        </div>
                        <div className="text-gray-400 text-sm">Quoted Amount</div>
                      </div>
                    ) : (
                      <div>
                        <div className="text-gray-500 text-lg">No Quote Yet</div>
                        <div className="text-gray-400 text-sm">Awaiting quotation</div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredInquiries.length === 0 && (
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <Search className="w-12 h-12 mx-auto mb-4" />
                  <p className="text-lg">No inquiries found</p>
                  <p className="text-sm">Try adjusting your search or filter criteria</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
