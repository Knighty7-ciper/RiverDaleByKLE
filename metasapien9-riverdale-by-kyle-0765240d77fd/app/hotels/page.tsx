"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Star, Wifi, Car, Coffee, Users, Search, Filter, ArrowLeft, Bed, Shield } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Footer from "@/components/layout/footer"

interface Hotel {
  id: string
  name: string
  description: string
  location: string
  price_per_night: number
  rating: number
  reviews_count: number
  image_url: string
  category: string
  amenities: string[]
  featured: boolean
}

export default function HotelsPage() {
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [priceFilter, setPriceFilter] = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true)
        const params = new URLSearchParams()
        const res = await fetch(`/api/hotels?${params.toString()}`)
        if (!res.ok) throw new Error("Failed to load hotels")
        const json = await res.json()
        const rows: Hotel[] = (json.hotels || []).map((h: any) => ({
          id: h.id,
          name: h.name,
          description: h.description,
          location: h.location,
          price_per_night: h.price_per_night ?? 0,
          rating: h.rating ?? 0,
          reviews_count: h.reviews_count ?? 0,
          image_url: h.image_url,
          category: h.category || "",
          amenities: Array.isArray(h.amenities) ? h.amenities : [],
          featured: !!h.featured,
        }))
        setHotels(rows)
        setFilteredHotels(rows)
      } catch (e) {
        console.error(e)
        setHotels([])
        setFilteredHotels([])
      } finally {
        setLoading(false)
      }
    }

    fetchHotels()
  }, [])

  useEffect(() => {
    let filtered = hotels

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (hotel) =>
          hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          hotel.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          hotel.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter((hotel) => hotel.category.toLowerCase().replace(" ", "-") === categoryFilter)
    }

    // Price filter
    if (priceFilter !== "all") {
      switch (priceFilter) {
        case "budget":
          filtered = filtered.filter((hotel) => hotel.price_per_night < 10000)
          break
        case "mid":
          filtered = filtered.filter((hotel) => hotel.price_per_night >= 10000 && hotel.price_per_night < 15000)
          break
        case "luxury":
          filtered = filtered.filter((hotel) => hotel.price_per_night >= 15000)
          break
      }
    }

    setFilteredHotels(filtered)
  }, [searchTerm, categoryFilter, priceFilter, hotels])

  const categories = ["all", "safari-lodge", "beach-resort", "city-hotel", "mountain-lodge"]
  const priceRanges = [
    { value: "all", label: "All Prices" },
    { value: "budget", label: "Under KSh 10,000" },
    { value: "mid", label: "KSh 10,000 - 15,000" },
    { value: "luxury", label: "Above KSh 15,000" },
  ]

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "free wifi":
        return <Wifi className="h-4 w-4" />
      case "restaurant":
        return <Coffee className="h-4 w-4" />
      case "game drives":
      case "beach access":
        return <Car className="h-4 w-4" />
      default:
        return <Users className="h-4 w-4" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary/20 border-t-primary mx-auto"></div>
            <p className="mt-6 text-muted-foreground text-lg">Loading luxury accommodations...</p>
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
            backgroundImage: `url('/luxury-safari-camp-maasai-mara.jpg')`,
          }}
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <Link
              href="/"
              className="inline-flex items-center text-amber-300 hover:text-white mb-8 transition-colors font-medium"
            >
              <ArrowLeft className="w-5 h-5 mr-3" />
              Back to Home
            </Link>
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-8 text-balance drop-shadow-2xl">
              Luxury <span className="text-amber-300">Hotels & Lodges</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/95 max-w-4xl mx-auto leading-relaxed drop-shadow-lg mb-12">
              Stay in exceptional comfort and style at East Africa's finest accommodations, from luxury safari lodges in the
              heart of the wilderness to pristine beachfront resorts along the Indian Ocean coast.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                <Bed className="w-6 h-6 text-amber-300" />
                <span className="text-white font-semibold">Premium Accommodations</span>
              </div>
              <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                <Shield className="w-6 h-6 text-amber-300" />
                <span className="text-white font-semibold">Verified Quality</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Filters */}
        <div className="luxury-card rounded-3xl p-8 mb-12 shadow-2xl">
          <div className="mb-6">
            <h3 className="font-serif text-2xl font-bold text-foreground mb-2">Find Your Perfect Stay</h3>
            <p className="text-muted-foreground">Filter accommodations by location, category, and price range</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search hotels..."
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
                    {category === "all"
                      ? "All Categories"
                      : category
                          .split("-")
                          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(" ")}
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
            Showing <span className="font-semibold text-foreground">{filteredHotels.length}</span> of{" "}
            <span className="font-semibold text-foreground">{hotels.length}</span> luxury accommodations
          </p>
        </div>

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
          {filteredHotels.map((hotel) => (
            <Card
              key={hotel.id}
              className="luxury-card rounded-3xl overflow-hidden transition-all duration-500 hover:scale-105 border-0 shadow-xl"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={hotel.image_url || "/placeholder.svg"}
                  alt={hotel.name}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-110"
                />
                {hotel.featured && (
                  <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground px-4 py-2 rounded-full font-semibold">
                    Featured Lodge
                  </Badge>
                )}
                <Badge className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-foreground px-4 py-2 rounded-full font-semibold">
                  {hotel.category}
                </Badge>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <CardHeader className="p-8">
                <CardTitle className="font-serif text-2xl font-bold text-foreground mb-3">{hotel.name}</CardTitle>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="font-medium">{hotel.location}</span>
                </div>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-2">{hotel.description}</p>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                    <span className="font-bold text-foreground text-lg">{hotel.rating}</span>
                    <span className="text-muted-foreground">({hotel.reviews_count} reviews)</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Per night</div>
                    <div className="font-serif text-2xl font-bold text-primary">
                      KSh {hotel.price_per_night.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-3 text-sm">Premium Amenities:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {hotel.amenities.slice(0, 4).map((amenity, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                        {getAmenityIcon(amenity)}
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                  {hotel.amenities.length > 4 && (
                    <div className="text-xs text-muted-foreground mt-2">
                      +{hotel.amenities.length - 4} more amenities
                    </div>
                  )}
                </div>

                <Link href={`/hotels/${hotel.id}`}>
                  <Button className="w-full luxury-button text-white py-3 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105">
                    View Hotel Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredHotels.length === 0 && (
          <div className="text-center py-20">
            <div className="luxury-card rounded-3xl p-12 max-w-md mx-auto">
              <Bed className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
              <h3 className="font-serif text-2xl font-bold text-foreground mb-4">No Hotels Found</h3>
              <p className="text-muted-foreground text-lg mb-8">
                No accommodations match your current search criteria.
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
            Need Help Choosing Your Perfect Stay?
          </h3>
          <p className="text-xl mb-10 text-white/95 max-w-4xl mx-auto leading-relaxed">
            Our accommodation experts know every lodge and resort personally. Let us recommend the perfect place to stay
            based on your safari itinerary and preferences.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 px-10 py-4 text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
              >
                Get Accommodation Advice
              </Button>
            </Link>
            <Link href="/destinations">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-primary px-10 py-4 text-lg font-semibold bg-white/10 rounded-xl backdrop-blur-sm transition-all duration-300"
              >
                View Safari Packages
              </Button>
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
