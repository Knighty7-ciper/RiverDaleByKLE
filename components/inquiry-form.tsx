"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Phone, Mail, AlertCircle } from "lucide-react"
import { createBrowserClient } from "@supabase/ssr"

interface InquiryFormProps {
  packageId: string
  packageName: string
  packagePrice: number
}

export function InquiryForm({ packageId, packageName, packagePrice }: InquiryFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    travelDate: "",
    groupSize: "",
    specialRequests: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [verificationId, setVerificationId] = useState("")
  const [error, setError] = useState("")


  const generateVerificationId = () => {
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, "")
    const random = Math.floor(1000 + Math.random() * 9000)
    return `RVD-${date}-${random}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageId,
          packageName,
          packagePrice,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          travelDate: formData.travelDate || null,
          groupSize: formData.groupSize || null,
          specialRequests: formData.specialRequests || null,
        }),
      })

      const json = await res.json()
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to submit inquiry")
      }

      setVerificationId(json.verificationId)
      setSubmitted(true)

      setFormData({
        name: "",
        email: "",
        phone: "",
        travelDate: "",
        groupSize: "",
        specialRequests: "",
      })
    } catch (error: any) {
      console.error("Error submitting inquiry:", error)
      setError(error.message || "There was an error submitting your inquiry. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <Card className="luxury-card border-0 shadow-xl">
        <CardContent className="p-6 text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h3 className="font-serif text-xl font-bold text-amber-900 mb-3">Inquiry Submitted Successfully!</h3>
          <Badge className="bg-amber-600 text-white px-4 py-2 rounded-full mb-4">
            Verification ID: {verificationId}
          </Badge>
          <p className="text-amber-800 mb-4 text-sm leading-relaxed">
            Thank you for your inquiry! We have received your request and will contact you within 24 hours. Please save
            your verification ID for reference.
          </p>
          <div className="bg-amber-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-amber-900 mb-2">What happens next?</h4>
            <div className="text-left space-y-2 text-sm text-amber-800">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-amber-600 rounded-full mt-2"></div>
                <span>Our safari expert will call you to verify your inquiry</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-amber-600 rounded-full mt-2"></div>
                <span>You'll receive a customized quotation via email</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-amber-600 rounded-full mt-2"></div>
                <span>Reference your verification ID during payment</span>
              </div>
            </div>
          </div>
          <Button
            onClick={() => setSubmitted(false)}
            variant="outline"
            className="border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white"
          >
            Submit Another Inquiry
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="luxury-card border-0 shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="font-serif text-xl text-amber-900">Book Your Safari</CardTitle>
        <div className="text-center">
          <div className="text-3xl font-bold text-amber-600 font-serif">KSh {packagePrice.toLocaleString()}</div>
          <div className="text-amber-700 text-sm">per person</div>
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <span className="text-red-800 text-sm">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-amber-900 font-semibold">
              Full Name *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="border-amber-200 focus:border-amber-600"
              disabled={isSubmitting}
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-amber-900 font-semibold">
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="border-amber-200 focus:border-amber-600"
              disabled={isSubmitting}
            />
          </div>
          <div>
            <Label htmlFor="phone" className="text-amber-900 font-semibold">
              Phone Number *
            </Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              className="border-amber-200 focus:border-amber-600"
              disabled={isSubmitting}
            />
          </div>
          <div>
            <Label htmlFor="travelDate" className="text-amber-900 font-semibold">
              Preferred Travel Date
            </Label>
            <Input
              id="travelDate"
              type="date"
              value={formData.travelDate}
              onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
              className="border-amber-200 focus:border-amber-600"
              disabled={isSubmitting}
            />
          </div>
          <div>
            <Label htmlFor="groupSize" className="text-amber-900 font-semibold">
              Group Size
            </Label>
            <Input
              id="groupSize"
              type="number"
              min="1"
              value={formData.groupSize}
              onChange={(e) => setFormData({ ...formData, groupSize: e.target.value })}
              className="border-amber-200 focus:border-amber-600"
              disabled={isSubmitting}
            />
          </div>
          <div>
            <Label htmlFor="specialRequests" className="text-amber-900 font-semibold">
              Special Requests
            </Label>
            <Textarea
              id="specialRequests"
              value={formData.specialRequests}
              onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
              className="border-amber-200 focus:border-amber-600"
              rows={3}
              disabled={isSubmitting}
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Send Inquiry"}
          </Button>
        </form>

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
  )
}
