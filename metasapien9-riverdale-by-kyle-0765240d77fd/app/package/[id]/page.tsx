"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LazyImage } from "@/components/ui/lazy-image"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { InquiryForm } from "@/components/inquiry-form"
import {
  MapPin,
  Star,
  Users,
  Clock,
  Calendar,
  Camera,
  CheckCircle,
  XCircle,
  Phone,
  Mail,
  ArrowLeft,
  Heart,
  Share2,
} from "lucide-react"
import Link from "next/link"
import Footer from "@/components/layout/footer"

interface PackageData {
  id: string
  name: string
  description: string
  location: string
  price: number
  duration: string
  rating: number
  images: string[]
  highlights: string[]
  itinerary: Array<{
    day: number
    title: string
    description: string
    activities: string[]
    image?: string
  }>
  inclusions: string[]
  exclusions: string[]
  requirements: string[]
  bestTime: string
  difficulty: string
  maxGroupSize: number
}

export default function PackageDetailsPage() {
  const params = useParams()
  const [packageData, setPackageData] = useState<PackageData | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        setLoading(true)
        const id = params.id as string
        const res = await fetch(`/api/packages/${id}`)
        if (!res.ok) throw new Error("Failed to load package")
        const json = await res.json()
        const p = json.package
        const details: PackageData = {
          id: p.id,
          name: p.name,
          description: p.description || "",
          location: p.destinations?.location || p.destinations?.country || "",
          price: p.base_price ?? 0,
          duration: p.duration || "",
          rating: p.rating ?? 0,
          images: Array.isArray(p.images) ? p.images : [],
          highlights: Array.isArray(p.highlights) ? p.highlights : [],
          itinerary: Array.isArray(p.itinerary) ? p.itinerary : [],
          inclusions: Array.isArray(p.inclusions) ? p.inclusions : [],
          exclusions: Array.isArray(p.exclusions) ? p.exclusions : [],
          requirements: [],
          bestTime: p.best_time || "",
          difficulty: p.difficulty || "",
          maxGroupSize: p.max_group_size ?? 0,
        }
        setPackageData(details)
      } catch (e) {
        console.error(e)
        setPackageData(null)
      } finally {
        setLoading(false)
      }
    }

    fetchPackageData()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-amber-600/20 border-t-amber-600 mx-auto"></div>
          <p className="mt-6 text-amber-800 text-lg">Loading safari details...</p>
        </div>
      </div>
    )
  }

  if (!packageData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-amber-900 mb-4">Package Not Found</h1>
          <Link href="/destinations">
            <Button className="bg-amber-600 hover:bg-amber-700 text-white">Back to Destinations</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Image Gallery */}
      <section className="relative">
        <div className="relative h-[60vh] overflow-hidden">
          <div
            className="flex transition-transform duration-1000 ease-in-out h-full"
            style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
          >
            {packageData.images.map((image, index) => (
              <div key={index} className="min-w-full h-full relative">
                <LazyImage src={image} alt={`${packageData.name} - Image ${index + 1}`} className="w-full h-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/60 to-transparent"></div>
              </div>
            ))}
          </div>

          {/* Image Navigation */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
            {packageData.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentImageIndex ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>

          {/* Back Button */}
          <div className="absolute top-6 left-6">
            <Link href="/destinations">
              <Button
                variant="outline"
                className="bg-white/90 backdrop-blur-sm border-white/50 text-amber-900 hover:bg-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Destinations
              </Button>
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="absolute top-6 right-6 flex gap-3">
            <Button
              variant="outline"
              size="icon"
              className="bg-white/90 backdrop-blur-sm border-white/50 text-amber-900 hover:bg-white"
            >
              <Heart className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="bg-white/90 backdrop-blur-sm border-white/50 text-amber-900 hover:bg-white"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>

          {/* Package Info Overlay */}
          <div className="absolute bottom-8 left-8 text-white">
            <Badge className="bg-amber-600 text-white mb-3 px-3 py-1 rounded-full">{packageData.duration}</Badge>
            <h1 className="font-serif text-3xl lg:text-5xl font-bold mb-2 drop-shadow-lg">{packageData.name}</h1>
            <div className="flex items-center gap-4 mb-2">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span className="text-lg">{packageData.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
                <span className="text-lg font-semibold">{packageData.rating}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Package Overview */}
            <section>
              <h2 className="font-serif text-3xl font-bold text-amber-900 mb-6">Safari Overview</h2>
              <p className="text-amber-800 text-lg leading-relaxed mb-8">{packageData.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center p-4 bg-amber-50 rounded-xl">
                  <Clock className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                  <div className="font-semibold text-amber-900">{packageData.duration}</div>
                  <div className="text-xs text-amber-700">Duration</div>
                </div>
                <div className="text-center p-4 bg-amber-50 rounded-xl">
                  <Users className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                  <div className="font-semibold text-amber-900">Max {packageData.maxGroupSize}</div>
                  <div className="text-xs text-amber-700">Group Size</div>
                </div>
                <div className="text-center p-4 bg-amber-50 rounded-xl">
                  <Calendar className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                  <div className="font-semibold text-amber-900">{packageData.bestTime}</div>
                  <div className="text-xs text-amber-700">Best Time</div>
                </div>
                <div className="text-center p-4 bg-amber-50 rounded-xl">
                  <Camera className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                  <div className="font-semibold text-amber-900">{packageData.difficulty}</div>
                  <div className="text-xs text-amber-700">Difficulty</div>
                </div>
              </div>

              {/* Highlights */}
              <div className="mb-8">
                <h3 className="font-serif text-2xl font-bold text-amber-900 mb-4">Safari Highlights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {packageData.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                      <span className="text-amber-800">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Detailed Itinerary */}
            <section>
              <h2 className="font-serif text-3xl font-bold text-amber-900 mb-6">Detailed Itinerary</h2>
              <div className="space-y-8">
                {packageData.itinerary.map((day, index) => (
                  <Card key={index} className="luxury-card border-0 shadow-lg overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                      <div className="md:col-span-1">
                        <LazyImage
                          src={day.image || packageData.images[0]}
                          alt={`Day ${day.day}`}
                          className="w-full h-48 md:h-full"
                        />
                      </div>
                      <div className="md:col-span-2 p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <Badge className="bg-amber-600 text-white px-3 py-1 rounded-full">Day {day.day}</Badge>
                          <h3 className="font-serif text-xl font-bold text-amber-900">{day.title}</h3>
                        </div>
                        <p className="text-amber-800 mb-4 leading-relaxed">{day.description}</p>
                        <div className="space-y-2">
                          {day.activities.map((activity, actIndex) => (
                            <div key={actIndex} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                              <span className="text-amber-700 text-sm">{activity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* What's Included/Excluded */}
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-amber-900 mb-4">What's Included</h3>
                  <div className="space-y-3">
                    {packageData.inclusions.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-amber-800">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-amber-900 mb-4">What's Excluded</h3>
                  <div className="space-y-3">
                    {packageData.exclusions.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <span className="text-amber-800">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Requirements */}
            <section>
              <h3 className="font-serif text-2xl font-bold text-amber-900 mb-4">What to Bring</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {packageData.requirements.map((requirement, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                    <span className="text-amber-800">{requirement}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Pricing Card */}
              <Card className="luxury-card border-0 shadow-xl">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-amber-600 font-serif mb-2">
                      KSh {packageData.price.toLocaleString()}
                    </div>
                    <div className="text-amber-700">per person</div>
                  </div>

                  <InquiryForm
                    packageId={packageData.id}
                    packageName={packageData.name}
                    packagePrice={packageData.price}
                  />

                  <div className="mt-6 pt-6 border-t border-amber-200">
                    <div className="flex items-center justify-center gap-4 text-amber-700">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span className="text-sm">+254 700 123 456</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm">bknglabs.dev@gmails.com</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Card */}
              <Card className="luxury-card border-0 shadow-xl">
                <CardContent className="p-6 text-center">
                  <h3 className="font-serif text-xl font-bold text-amber-900 mb-3">Need Help Planning?</h3>
                  <p className="text-amber-800 mb-4 text-sm">
                    Our safari experts are here to help you create the perfect Kenya adventure.
                  </p>
                  <Link href="/contact">
                    <Button
                      variant="outline"
                      className="w-full border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white bg-transparent"
                    >
                      Contact Safari Expert
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
