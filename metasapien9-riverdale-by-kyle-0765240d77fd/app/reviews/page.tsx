"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Search, MapPin, Calendar, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ReviewForm } from "@/components/reviews/review-form"
import Footer from "@/components/layout/footer"

interface Review {
  id: string
  customer_name: string
  customer_location: string
  title: string
  content: string
  rating: number
  travel_date: string
  verified: boolean
  featured: boolean
  packages?: {
    name: string
    destinations?: {
      name: string
      countries?: {
        name: string
      }
    }
  }
}

export default function ReviewsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRating, setFilterRating] = useState("all")
  const [filterDestination, setFilterDestination] = useState("all")
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [showReviewForm, setShowReviewForm] = useState(false)

  useEffect(() => {
    loadReviews()
  }, [])

  const loadReviews = async () => {
    try {
      const response = await fetch("/api/reviews?featured=false")
      const data = await response.json()

      if (response.ok) {
        setReviews(data.reviews || [])
      } else {
        console.error("Failed to load reviews:", data.error)
        setReviews([])
      }
    } catch (error) {
      console.error("Error loading reviews:", error)
      setReviews([])
    } finally {
      setLoading(false)
    }
  }


  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRating = filterRating === "all" || review.rating.toString() === filterRating
    const matchesDestination =
      filterDestination === "all" ||
      (review.packages?.name && review.packages.name.toLowerCase().includes(filterDestination.toLowerCase()))

    return matchesSearch && matchesRating && matchesDestination
  })

  const averageRating =
    reviews.length > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0
  const totalReviews = reviews.length

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading reviews...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Customer Reviews</h1>
          <p className="text-lg text-muted-foreground mb-6">See what our travelers say about their Kenya adventures</p>

          {/* Rating Summary */}
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600">{averageRating.toFixed(1)}</div>
              <div className="flex items-center justify-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(averageRating) ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{totalReviews}+</div>
              <div className="text-sm text-muted-foreground">Happy Travelers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">98%</div>
              <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search reviews..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterRating} onValueChange={setFilterRating}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterDestination} onValueChange={setFilterDestination}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by destination" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Destinations</SelectItem>
                <SelectItem value="safari">Safari Tours</SelectItem>
                <SelectItem value="beach">Beach Holidays</SelectItem>
                <SelectItem value="mountain">Mountain Adventures</SelectItem>
                <SelectItem value="cultural">Cultural Tours</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {filteredReviews.map((review) => (
            <Card key={review.id} className="h-full">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{review.customer_name}</h3>
                      {review.verified && (
                        <Badge variant="secondary" className="text-xs">
                          Verified
                        </Badge>
                      )}
                      {review.featured && <Badge className="text-xs bg-amber-600 text-white">Featured</Badge>}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {review.customer_location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(review.travel_date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    {review.packages?.name && (
                      <Badge variant="outline" className="mb-3">
                        {review.packages.name}
                      </Badge>
                    )}
                  </div>
                </div>
                <CardTitle className="text-xl">{review.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{review.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mb-12">
          {!showReviewForm ? (
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">Share Your Experience</h2>
                <p className="text-muted-foreground mb-6">
                  Have you traveled with us? We'd love to hear about your Kenya adventure!
                </p>
                <Button size="lg" className="bg-amber-600 hover:bg-amber-700" onClick={() => setShowReviewForm(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Write a Review
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="max-w-2xl mx-auto">
              <ReviewForm
                onSuccess={() => {
                  setShowReviewForm(false)
                  loadReviews() // Reload reviews after submission
                }}
              />
              <Button variant="outline" className="mt-4 bg-transparent" onClick={() => setShowReviewForm(false)}>
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
