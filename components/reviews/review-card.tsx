"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, User, Calendar } from "lucide-react"

interface Review {
  id: string
  customerName: string
  destination: string
  rating: number
  comment: string
  date: string
  verified: boolean
}

interface ReviewCardProps {
  review: Review
}

export function ReviewCard({ review }: ReviewCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`} />
    ))
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-cyan-600" />
            </div>
            <div>
              <h4 className="font-medium">{review.customerName}</h4>
              <p className="text-sm text-muted-foreground">{review.destination}</p>
            </div>
          </div>
          {review.verified && <Badge className="bg-green-100 text-green-800 text-xs">Verified</Badge>}
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex">{renderStars(review.rating)}</div>
          <span className="text-sm font-medium">{review.rating}/5</span>
        </div>

        <p className="text-muted-foreground mb-4 leading-relaxed">{review.comment}</p>

        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar className="w-3 h-3" />
          <span>{new Date(review.date).toLocaleDateString()}</span>
        </div>
      </CardContent>
    </Card>
  )
}
