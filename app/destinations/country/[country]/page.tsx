"use client"

import { useEffect, useMemo, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, ArrowLeft, MapPin, Star } from "lucide-react"

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
  country?: string | null
  featured?: boolean
}

export default function CountryDestinationsPage() {
  const params = useParams<{ country: string }>()
  const country = String(params.country || "").toLowerCase()
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/destinations?limit=60`)
        const json = await res.json()
        const rows: Destination[] = (json.destinations || []).map((d: any) => ({
          id: d.id,
          name: d.name,
          description: d.description,
          location: d.location,
          price_from: d.price_from,
          duration: d.duration,
          max_group_size: d.max_group_size,
          rating: d.rating,
          reviews_count: d.reviews_count,
          image_url: d.image_url,
          country: d.country || (d.location?.split(",").pop()?.trim() ?? null),
          featured: d.featured,
        }))
        setDestinations(rows)
      } catch (_) {
        setDestinations([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const filtered = useMemo(() => {
    let rows = destinations
    if (country) {
      rows = rows.filter((d) => (d.country || "").toLowerCase().includes(country))
    }
    if (searchTerm) {
      const q = searchTerm.toLowerCase()
      rows = rows.filter((d) => d.name.toLowerCase().includes(q) || d.description.toLowerCase().includes(q))
    }
    return rows
  }, [destinations, country, searchTerm])

  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-24">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link href="/destinations" className="inline-flex items-center text-amber-700 hover:text-amber-900 mb-6">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to All Destinations
          </Link>
          <Badge className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full mb-4">{country.toUpperCase()}</Badge>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-amber-900 mb-4 text-balance">
            {country.charAt(0).toUpperCase() + country.slice(1)} Safari Destinations
          </h1>
          <p className="text-amber-800 max-w-3xl mx-auto">
            Explore curated destinations across {country.charAt(0).toUpperCase() + country.slice(1)} with authentic
            experiences and expert local guides.
          </p>
          <div className="max-w-xl mx-auto mt-8 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-700" />
            <Input
              placeholder="Search destinations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 rounded-xl border-amber-200"
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {loading ? (
          <div className="text-center text-muted-foreground">Loading destinations…</div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-muted-foreground">No destinations found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((d) => (
              <Card key={d.id} className="rounded-2xl overflow-hidden shadow-xl">
                <div className="relative h-48">
                  <Image src={d.image_url || "/placeholder.svg"} alt={d.name} fill className="object-cover" />
                </div>
                <CardContent className="p-5 space-y-2">
                  <div className="flex items-center gap-2 text-amber-700 text-sm">
                    <MapPin className="w-4 h-4" /> {d.location}
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-amber-900">{d.name}</h3>
                  <p className="text-sm text-amber-800 line-clamp-2">{d.description}</p>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-1 text-amber-700 text-sm">
                      <Star className="w-4 h-4 fill-amber-500 text-amber-500" /> {d.rating.toFixed(1)}
                    </div>
                    <Link href={`/package/${d.id}`} className="text-amber-700 font-medium hover:underline">
                      View Details
                    </Link>
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
