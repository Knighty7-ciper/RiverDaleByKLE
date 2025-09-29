"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, Plus, Edit, Trash2, MapPin, ImageIcon } from "lucide-react"
import Link from "next/link"

interface Destination {
  id: string
  name: string
  country: string
  description: string
  featured_image: string
  packages_count: number
  status: "active" | "inactive"
  created_at: string
}

export default function AdminDestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
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
      loadDestinations()
    }
    checkAuth()
  }, [router])

  useEffect(() => {
    // Filter destinations based on search
    let filtered = destinations
    if (searchTerm) {
      filtered = filtered.filter(
        (dest) =>
          dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dest.country.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }
    setFilteredDestinations(filtered)
  }, [destinations, searchTerm])

  const loadDestinations = async () => {
    try {
      const res = await fetch("/api/destinations")
      if (!res.ok) throw new Error("Failed to load destinations")
      const json = await res.json()
      const rows: Destination[] = (json.destinations || []).map((d: any) => ({
        id: d.id,
        name: d.name,
        country: d.country || "Kenya",
        description: d.description || "",
        featured_image: d.featured_image || d.image_url || "/placeholder.svg",
        packages_count: d.packages_count ?? 0,
        status: d.status || "active",
        created_at: d.created_at,
      }))

      setDestinations(rows)
      setFilteredDestinations(rows)
    } catch (error) {
      console.error("Error loading destinations:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading destinations...</div>
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
              <h1 className="text-2xl font-bold text-white">Manage Destinations</h1>
            </div>
            <Link href="/admin/destinations/add">
              <Button className="bg-cyan-600 hover:bg-cyan-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Destination
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search destinations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
            />
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map((destination) => (
            <Card key={destination.id} className="bg-gray-800 border-gray-700">
              <div className="relative h-48 bg-gray-700 rounded-t-lg overflow-hidden">
                <ImageIcon
                  src={destination.featured_image || "/placeholder.svg"}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      destination.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {destination.status}
                  </span>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-white font-semibold text-lg">{destination.name}</h3>
                    <div className="flex items-center text-gray-400 text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      {destination.country}
                    </div>
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-4 line-clamp-2">{destination.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                  <span>{destination.packages_count} packages</span>
                  <span>{new Date(destination.created_at).toLocaleDateString()}</span>
                </div>

                <div className="flex space-x-2">
                  <Link href={`/admin/destinations/${destination.id}/edit`} className="flex-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-600 text-red-400 hover:bg-red-900/20 bg-transparent"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDestinations.length === 0 && (
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <MapPin className="w-12 h-12 mx-auto mb-4" />
                <p className="text-lg">No destinations found</p>
                <p className="text-sm">Try adjusting your search or add a new destination</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
