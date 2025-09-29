"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Star, Users, Search, Filter, Camera } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Footer from "@/components/layout/footer"

interface Destination {
  id: string
  name: string
  description: string
  location: string
  price_from: number
  duration: string
  max_group_size: number
  rating: number
  reviews_count: number
  image_url: string
  category: string
  featured: boolean
}

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [priceFilter, setPriceFilter] = useState("all")
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true)
        const params = new URLSearchParams()
        if (categoryFilter && categoryFilter !== "all") params.set("category", categoryFilter)
        const res = await fetch(`/api/destinations?${params.toString()}`)
        if (!res.ok) throw new Error("Failed to load destinations")
        const json = await res.json()
        const rows: Destination[] = (json.destinations || []).map((d: any) => ({
          id: d.id,
          name: d.name,
          description: d.description,
          location: d.location,
          price_from: d.price_from ?? 0,
          duration: d.duration || "",
          max_group_size: d.max_group_size ?? 0,
          rating: d.rating ?? 0,
          reviews_count: d.reviews_count ?? 0,
          image_url: d.image_url,
          category: d.category || "Safari",
          featured: !!d.featured,
        }))
        setDestinations(rows)
        setFilteredDestinations(rows)
      } catch (e) {
        console.error(e)
        setDestinations([])
        setFilteredDestinations([])
      } finally {
        setLoading(false)
      }
    }

    fetchDestinations()
  }, [])

  useEffect(() => {
    let filtered = destinations

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (dest) =>
          dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dest.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dest.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter((dest) => dest.category.toLowerCase() === categoryFilter.toLowerCase())
    }

    // Price filter
    if (priceFilter !== "all") {
      switch (priceFilter) {
        case "budget":
          filtered = filtered.filter((dest) => dest.price_from < 30000)
          break
        case "mid":
          filtered = filtered.filter((dest) => dest.price_from >= 30000 && dest.price_from < 45000)
          break
        case "luxury":
          filtered = filtered.filter((dest) => dest.price_from >= 45000)
          break
      }
    }

    setFilteredDestinations(filtered)
  }, [searchTerm, categoryFilter, priceFilter, destinations])

  const categories = ["all", "safari", "beach", "adventure", "cultural"]
  const priceRanges = [
    { value: "all", label: "All Prices" },
    { value: "budget", label: "Under KSh 30,000" },
    { value: "mid", label: "KSh 30,000 - 45,000" },
    { value: "luxury", label: "Above KSh 45,000" },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary/20 border-t-primary mx-auto"></div>
            <p className="mt-6 text-muted-foreground text-lg">Loading safari destinations...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/maasai-mara-safari.png')`,
          }}
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 px-6 py-3 text-sm font-medium mb-8 rounded-full">
              East Africa Safari Destinations
            </Badge>
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-8 text-balance drop-shadow-2xl">
              Discover East Africa's <span className="text-amber-300">Premier Destinations</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/95 max-w-4xl mx-auto leading-relaxed drop-shadow-lg mb-12">
              From thrilling safaris in the Maasai Mara and Serengeti to pristine beaches along the Indian Ocean coast, explore
              East Africa's diverse beauty with our carefully curated luxury travel experiences.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                <Star className="w-6 h-6 text-amber-300 fill-amber-300" />
                <span className="text-white font-semibold">50+ Destinations</span>
              </div>
              <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                <Users className="w-6 h-6 text-amber-300" />
                <span className="text-white font-semibold">Expert Guides</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Filters */}
        <div className="luxury-card rounded-3xl p-8 mb-12 shadow-2xl">
          <div className="mb-6">
            <h3 className="font-serif text-2xl font-bold text-foreground mb-2">Find Your Perfect Safari</h3>
            <p className="text-muted-foreground">Filter destinations by your preferences and interests</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 rounded-xl border-border bg-background"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="h-12 rounded-xl border-border">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger className="h-12 rounded-xl border-border">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                {priceRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              className="h-12 flex items-center gap-3 rounded-xl border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
            >
              <Filter className="h-5 w-5" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-muted-foreground text-lg">
            Showing <span className="font-semibold text-foreground">{filteredDestinations.length}</span> of{" "}
            <span className="font-semibold text-foreground">{destinations.length}</span> premium destinations
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredDestinations.map((destination) => (
            <Card
              key={destination.id}
              className="luxury-card rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 border-0 shadow-xl h-[320px]"
            >
              <div className="relative h-[180px] overflow-hidden">
                <Image
                  src={destination.image_url || "/placeholder.svg"}
                  alt={destination.name}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-110"
                />
                {destination.featured && (
                  <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded-full font-semibold text-xs">
                    Featured Safari
                  </Badge>
                )}
                <Badge className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm text-foreground px-2 py-1 rounded-full font-semibold text-xs">
                  {destination.category}
                </Badge>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <CardContent className="p-4 h-[140px] flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-base font-bold text-foreground mb-1 line-clamp-1">
                    {destination.name}
                  </h3>
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <MapPin className="h-3 w-3 text-primary" />
                    <span className="font-medium text-xs line-clamp-1">{destination.location}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                    <span className="font-bold text-foreground text-sm">{destination.rating}</span>
                    <span className="text-muted-foreground text-xs">({destination.reviews_count})</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-muted-foreground">From</div>
                    <div className="font-serif text-lg font-bold text-primary">
                      KSh {destination.price_from.toLocaleString()}
                    </div>
                  </div>
                  <Link href={`/package/${destination.id}`}>
                    <Button className="luxury-button text-white px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-300 hover:scale-105">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDestinations.length === 0 && (
          <div className="text-center py-20">
            <div className="luxury-card rounded-3xl p-12 max-w-md mx-auto">
              <Camera className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
              <h3 className="font-serif text-2xl font-bold text-foreground mb-4">No Destinations Found</h3>
              <p className="text-muted-foreground text-lg mb-8">
                No safari destinations match your current search criteria.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setCategoryFilter("all")
                  setPriceFilter("all")
                }}
                className="luxury-button text-white px-8 py-3 rounded-xl"
              >
                Clear All Filters
              </Button>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <section className="luxury-gradient rounded-3xl p-12 md:p-16 text-center text-white shadow-2xl">
          <h3 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-balance">
            Can't Find Your Perfect Safari?
          </h3>
          <p className="text-xl mb-10 text-white/95 max-w-4xl mx-auto leading-relaxed">
            Our safari experts specialize in creating customized Kenya adventures that match your dreams and budget. Let
            us craft your perfect East African experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 px-10 py-4 text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
              >
                Get Custom Safari Quote
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-primary px-10 py-4 text-lg font-semibold bg-white/10 rounded-xl backdrop-blur-sm transition-all duration-300"
              >
                Speak to Safari Expert
              </Button>
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
