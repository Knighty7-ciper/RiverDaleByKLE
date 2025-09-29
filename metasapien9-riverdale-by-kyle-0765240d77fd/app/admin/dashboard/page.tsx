"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  MessageSquare,
  DollarSign,
  TrendingUp,
  Phone,
  MapPin,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
} from "lucide-react"
import Link from "next/link"

interface DashboardStats {
  totalInquiries: number
  pendingInquiries: number
  confirmedBookings: number
  totalRevenue: number
  monthlyGrowth: number
  recentInquiries: any[]
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalInquiries: 0,
    pendingInquiries: 0,
    confirmedBookings: 0,
    totalRevenue: 0,
    monthlyGrowth: 0,
    recentInquiries: [],
  })
  const [loading, setLoading] = useState(true)
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
      loadDashboardData()
    }
    checkAuth()
  }, [router])

  const loadDashboardData = async () => {
    try {
      const res = await fetch("/api/admin/stats")
      if (!res.ok) throw new Error("Failed to load stats")
      const json = await res.json()

      const apiStats: DashboardStats = {
        totalInquiries: json.totalInquiries || 0,
        pendingInquiries: json.pendingInquiries || 0,
        confirmedBookings: json.confirmedBookings || 0,
        totalRevenue: json.totalRevenue || 0,
        monthlyGrowth: json.monthlyGrowth || 0,
        recentInquiries: json.recentInquiries || [],
      }

      setStats(apiStats)
    } catch (error) {
      console.error("Error loading dashboard data:", error)
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
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />
      case "contacted":
        return <Phone className="w-4 h-4" />
      case "quoted":
        return <DollarSign className="w-4 h-4" />
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">Riverdale Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={async () => {
                  const { createClientComponentClient } = await import("@supabase/auth-helpers-nextjs")
                  const supabase = createClientComponentClient()
                  await supabase.auth.signOut()
                  router.push("/admin")
                }}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Dashboard</h2>
          <p className="text-gray-400">Welcome back! Here's what's happening with your travel business.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Inquiries</p>
                  <p className="text-3xl font-bold text-white">{stats.totalInquiries}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Pending Inquiries</p>
                  <p className="text-3xl font-bold text-yellow-400">{stats.pendingInquiries}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Confirmed Bookings</p>
                  <p className="text-3xl font-bold text-green-400">{stats.confirmedBookings}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Revenue</p>
                  <p className="text-3xl font-bold text-cyan-400">KES {stats.totalRevenue.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-cyan-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Inquiries */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                Recent Inquiries
                <Link href="/admin/inquiries">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                  >
                    View All
                  </Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.recentInquiries.map((inquiry) => (
                  <div key={inquiry.id} className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(inquiry.inquiry_status)}>
                          {getStatusIcon(inquiry.inquiry_status)}
                          <span className="ml-1 capitalize">{inquiry.inquiry_status}</span>
                        </Badge>
                        <span className="text-gray-400 text-sm">{inquiry.verification_id}</span>
                      </div>
                      <Link href={`/admin/inquiries/${inquiry.id}`}>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>

                    <div className="space-y-1">
                      <p className="text-white font-medium">{inquiry.customer_name}</p>
                      <p className="text-gray-400 text-sm">{inquiry.package_name}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {inquiry.adults + inquiry.children} travelers
                        </span>
                        <span className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-1" />
                          KES {inquiry.quoted_amount?.toLocaleString() || "TBD"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Link href="/admin/inquiries">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Manage Inquiries
                  </Button>
                </Link>

                <Link href="/admin/destinations">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    <MapPin className="w-4 h-4 mr-2" />
                    Manage Destinations
                  </Button>
                </Link>

                <Link href="/admin/packages">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    <Calendar className="w-4 h-4 mr-2" />
                    Manage Packages
                  </Button>
                </Link>

                <Link href="/admin/settings">
                  <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                    <Users className="w-4 h-4 mr-2" />
                    Site Settings
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Business Metrics */}
        <div className="mt-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Business Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400 mb-2">{stats.monthlyGrowth}%</div>
                  <p className="text-gray-400">Monthly Growth</p>
                  <div className="flex items-center justify-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-green-400 text-sm">+{stats.monthlyGrowth}% from last month</span>
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    {stats.totalInquiries > 0 ? Math.round((stats.confirmedBookings / stats.totalInquiries) * 100) : 0}%
                  </div>
                  <p className="text-gray-400">Conversion Rate</p>
                  <p className="text-gray-500 text-sm mt-2">Inquiries to bookings</p>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">
                    KES {stats.confirmedBookings > 0 ? Math.round(stats.totalRevenue / stats.confirmedBookings).toLocaleString() : 0}
                  </div>
                  <p className="text-gray-400">Average Booking Value</p>
                  <p className="text-gray-500 text-sm mt-2">Per confirmed booking</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
