"use client"

import { useEffect, useMemo, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, ArrowLeft, MapPin, Star, Bed } from "lucide-react"

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
  featured?: boolean
}

export default function CountryHotelsPage() {
  const params = useParams<{ country: string }>()
  const country = String(params.country || "").toLowerCase()
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/hotels?limit=60`)
        const json = await res.json()
        const rows: Hotel[] = (json.hotels || []).map((h: any) => ({
          id: h.id,
          name: h.name,
          description: h.description,
          location: h.location,
          price_per_night: h.price_per_night,
          rating: h.rating,
          reviews_count: h.reviews_count,
          image_url: h.image_url,
          category: h.category,
          amenities: Array.isArray(h.amenities) ? h.amenities : [],
          featured: h.featured,
        }))
        setHotels(rows)
      } catch (_) {
        setHotels([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const filtered = useMemo(() => {
    let rows = hotels
    if (country) {
      rows = rows.filter((h) => h.location.toLowerCase().includes(country))
    }
    if (searchTerm) {
      const q = searchTerm.toLowerCase()
      rows = rows.filter((h) => h.name.toLowerCase().includes(q) || h.description.toLowerCase().includes(q))
    }
    return rows
  }, [hotels, country, searchTerm])

  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-24">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link href="/hotels" className="inline-flex items-center text-amber-700 hover:text-amber-900 mb-6">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to All Hotels
          </Link>
          <Badge className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full mb-4">{country.toUpperCase()}</Badge>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-amber-900 mb-4 text-balance">
            {country.charAt(0).toUpperCase() + country.slice(1)} Hotels & Lodges
          </h1>
          <p className="text-amber-800 max-w-3xl mx-auto">
            Explore premium stays across {country.charAt(0).toUpperCase() + country.slice(1)} to elevate your safari
            experience.
          </p>
          <div className="max-w-xl mx-auto mt-8 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-700" />
            <Input
              placeholder="Search hotels..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 rounded-xl border-amber-200"
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {loading ? (
          <div className="text-center text-muted-foreground">Loading hotels…</div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-muted-foreground">No hotels found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((h) => (
              <Card key={h.id} className="rounded-2xl overflow-hidden shadow-xl">
                <div className="relative h-48">
                  <Image src={h.image_url || "/placeholder.svg"} alt={h.name} fill className="object-cover" />
                </div>
                <CardContent className="p-5 space-y-2">
                  <div className="flex items-center gap-2 text-amber-700 text-sm">
                    <MapPin className="w-4 h-4" /> {h.location}
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-amber-900">{h.name}</h3>
                  <p className="text-sm text-amber-800 line-clamp-2">{h.description}</p>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-1 text-amber-700 text-sm">
                      <Star className="w-4 h-4 fill-amber-500 text-amber-500" /> {h.rating.toFixed(1)}
                    </div>
                    <div className="text-amber-700 font-semibold flex items-center gap-1">
                      <Bed className="w-4 h-4" /> KSh {h.price_per_night.toLocaleString()}/night
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
