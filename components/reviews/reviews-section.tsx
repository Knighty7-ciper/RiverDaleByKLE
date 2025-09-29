"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ReviewCard } from "./review-card"
import { Star, MessageSquare } from "lucide-react"

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
  }
}

interface ReviewsSectionProps {
  destination?: string
  limit?: number
}

export function ReviewsSection({ destination, limit }: ReviewsSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [showAll, setShowAll] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadReviews()
  }, [])

  const loadReviews = async () => {
    try {
      const response = await fetch("/api/reviews?featured=true&limit=6")
      const data = await response.json()

      if (response.ok) {
        setReviews(data.reviews || [])
      } else {
        console.error("Failed to load reviews:", data.error)
        // Fallback to mock data
        setReviews(defaultReviews)
      }
    } catch (error) {
      console.error("Error loading reviews:", error)
      // Fallback to mock data
      setReviews(defaultReviews)
    } finally {
      setLoading(false)
    }
  }

  const defaultReviews: Review[] = [
    {
      id: "rev-1",
      customer_name: "Sarah Johnson",
      customer_location: "London, UK",
      title: "Absolutely Incredible Experience!",
      content:
        "Absolutely incredible experience! Our guide was knowledgeable and we saw the Big Five. The accommodation was comfortable and the food was excellent. Riverdale Travel made everything seamless.",
      rating: 5,
      travel_date: "2024-01-15",
      verified: true,
      featured: true,
      packages: { name: "Maasai Mara Safari" },
    },
    {
      id: "rev-2",
      customer_name: "Michael Chen",
      customer_location: "Singapore",
      title: "Perfect Beach Holiday",
      content:
        "Perfect beach holiday! The resort was beautiful, staff were friendly, and the beach was pristine. Great value for money and excellent service from booking to checkout.",
      rating: 5,
      travel_date: "2024-01-10",
      verified: true,
      featured: true,
      packages: { name: "Diani Beach Getaway" },
    },
    {
      id: "rev-3",
      customer_name: "Emma Thompson",
      customer_location: "Toronto, Canada",
      title: "Challenging but Rewarding",
      content:
        "Challenging but rewarding hike! The guides were experienced and safety-conscious. Beautiful scenery and well-organized logistics. Would recommend for adventure seekers.",
      rating: 4,
      travel_date: "2024-01-08",
      verified: true,
      featured: true,
      packages: { name: "Mount Kenya Adventure" },
    },
  ]

  const filteredReviews = destination
    ? reviews.filter((review) => review.packages?.name?.toLowerCase().includes(destination.toLowerCase()))
    : reviews

  const displayedReviews = limit && !showAll ? filteredReviews.slice(0, limit) : filteredReviews

  const averageRating =
    filteredReviews.length > 0
      ? filteredReviews.reduce((sum, review) => sum + review.rating, 0) / filteredReviews.length
      : 0

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < Math.floor(rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
      />
    ))
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading reviews...</p>
        </CardContent>
      </Card>
    )
  }

  if (filteredReviews.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="font-medium text-lg mb-2">No Reviews Yet</h3>
          <p className="text-muted-foreground">Be the first to share your experience!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-xl flex items-center gap-2">
            <Star className="w-6 h-6 text-amber-500" />
            Customer Reviews
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="flex">{renderStars(averageRating)}</div>
              <span className="text-2xl font-bold">{averageRating.toFixed(1)}</span>
              <span className="text-muted-foreground">({filteredReviews.length} reviews)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayedReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {limit && filteredReviews.length > limit && (
        <div className="text-center">
          <Button variant="outline" onClick={() => setShowAll(!showAll)} className="bg-transparent">
            {showAll ? "Show Less" : `Show All ${filteredReviews.length} Reviews`}
          </Button>
        </div>
      )}
    </div>
  )
}
