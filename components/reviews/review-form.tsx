"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Star, Send, CheckCircle } from "lucide-react"
import { toast } from "sonner"

interface ReviewFormProps {
  packageId?: string
  packageName?: string
  onSuccess?: () => void
}

export function ReviewForm({ packageId, packageName, onSuccess }: ReviewFormProps) {
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    customer_location: "",
    title: "",
    content: "",
    rating: 0,
    travel_date: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleRatingClick = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.rating === 0) {
      toast.error("Please select a rating")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          package_id: packageId,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setIsSubmitted(true)
        toast.success("Review submitted successfully! It will be published after approval.")
        onSuccess?.()
      } else {
        toast.error(result.error || "Failed to submit review")
      }
    } catch (error) {
      console.error("Error submitting review:", error)
      toast.error("Failed to submit review. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
          <p className="text-muted-foreground">
            Your review has been submitted and will be published after our team reviews it.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="w-5 h-5 text-amber-500" />
          Write a Review
        </CardTitle>
        {packageName && <p className="text-sm text-muted-foreground">Reviewing: {packageName}</p>}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="customer_name">Your Name *</Label>
              <Input
                id="customer_name"
                value={formData.customer_name}
                onChange={(e) => setFormData((prev) => ({ ...prev, customer_name: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="customer_email">Email Address *</Label>
              <Input
                id="customer_email"
                type="email"
                value={formData.customer_email}
                onChange={(e) => setFormData((prev) => ({ ...prev, customer_email: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="customer_location">Your Location</Label>
              <Input
                id="customer_location"
                placeholder="e.g., London, UK"
                value={formData.customer_location}
                onChange={(e) => setFormData((prev) => ({ ...prev, customer_location: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="travel_date">Travel Date</Label>
              <Input
                id="travel_date"
                type="date"
                value={formData.travel_date}
                onChange={(e) => setFormData((prev) => ({ ...prev, travel_date: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <Label>Rating *</Label>
            <div className="flex items-center gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingClick(star)}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= formData.rating ? "fill-amber-400 text-amber-400" : "text-gray-300 hover:text-amber-300"
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-muted-foreground">
                {formData.rating > 0 && `${formData.rating}/5`}
              </span>
            </div>
          </div>

          <div>
            <Label htmlFor="title">Review Title *</Label>
            <Input
              id="title"
              placeholder="e.g., Amazing safari experience!"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="content">Your Review *</Label>
            <Textarea
              id="content"
              placeholder="Tell us about your experience..."
              rows={6}
              value={formData.content}
              onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
              required
            />
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full bg-amber-600 hover:bg-amber-700">
            {isSubmitting ? (
              <>Submitting...</>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Submit Review
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
