"use client"

import Link from "next/link"
import { HelpCircle, Phone, Mail, Calendar, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Footer from "@/components/layout/footer"
import { useState } from "react"

export const metadata = {
  title: "Booking Assistance | Riverdale Safaris",
  description:
    "Get help with bookings, speak to a safari expert, or request a callback. Fast, friendly assistance for planning your East Africa safari.",
}

export default function BookingHelpPage() {
  const [callback, setCallback] = useState({ name: "", phone: "", email: "", message: "" })

  const submitCallback = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Callback request submitted", callback)
    alert("Thanks! A safari expert will call you within 24 hours.")
    setCallback({ name: "", phone: "", email: "", message: "" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-amber-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-14">
          <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg border-4 border-amber-200">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-serif text-5xl font-bold bg-gradient-to-r from-amber-800 via-orange-700 to-amber-800 bg-clip-text text-transparent mb-4">
            Booking Assistance
          </h1>
          <p className="text-amber-700 text-lg max-w-3xl mx-auto leading-relaxed">
            Need help making a booking? Our safari specialists are here to assist with quotes, availability, custom
            itineraries, and payment options.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-gradient-to-br from-white to-amber-50/40 border-2 border-amber-200 shadow-xl">
              <CardHeader className="pb-3">
                <CardTitle className="font-serif text-amber-900 text-2xl flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center border-2 border-amber-200">
                    <Calendar className="h-5 w-5 text-amber-600" />
                  </div>
                  How booking works
                </CardTitle>
              </CardHeader>
              <CardContent className="text-amber-800 leading-relaxed">
                <ol className="list-decimal pl-6 space-y-3">
                  <li>Tell us your preferred dates, travelers, and interests</li>
                  <li>Get a tailored itinerary with transparent pricing</li>
                  <li>Confirm with a deposit; balance due before travel</li>
                  <li>Receive vouchers, packing list, and 24/7 support contacts</li>
                </ol>
                <div className="mt-6 flex items-center gap-2 text-green-700">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Flexible changes available on most trips</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white to-orange-50/40 border-2 border-orange-200 shadow-xl">
              <CardHeader className="pb-3">
                <CardTitle className="font-serif text-amber-900 text-2xl">Request a quick callback</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={submitCallback} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Your name"
                    value={callback.name}
                    onChange={(e) => setCallback({ ...callback, name: e.target.value })}
                    required
                    className="h-12 border-2 border-amber-200 focus:border-amber-500 focus:ring-amber-500/20"
                  />
                  <Input
                    placeholder="Phone number"
                    value={callback.phone}
                    onChange={(e) => setCallback({ ...callback, phone: e.target.value })}
                    required
                    className="h-12 border-2 border-amber-200 focus:border-amber-500 focus:ring-amber-500/20"
                  />
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={callback.email}
                    onChange={(e) => setCallback({ ...callback, email: e.target.value })}
                    required
                    className="h-12 border-2 border-amber-200 focus:border-amber-500 focus:ring-amber-500/20 md:col-span-2"
                  />
                  <Textarea
                    placeholder="Tell us about your trip (destination, dates, group size, special requests)"
                    value={callback.message}
                    onChange={(e) => setCallback({ ...callback, message: e.target.value })}
                    rows={4}
                    className="border-2 border-amber-200 focus:border-amber-500 focus:ring-amber-500/20 resize-none md:col-span-2"
                  />
                  <div className="md:col-span-2">
                    <Button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold h-12 shadow-lg">
                      Request callback
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-white to-amber-50/50 border-2 border-amber-200 shadow-xl">
              <CardHeader className="pb-3">
                <CardTitle className="font-serif text-xl text-amber-900">Talk to an expert</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl border-2 border-amber-200">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-amber-900">Call us</p>
                    <p className="text-amber-700 font-medium">+254 700 123 456</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-100 to-amber-100 rounded-xl border-2 border-orange-200">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center shadow">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-amber-900">Email</p>
                    <p className="text-amber-700 font-medium break-words">bknglabs.dev@gmails.com</p>
                  </div>
                </div>
                <div className="text-sm text-amber-700 leading-relaxed">
                  Prefer live chat or WhatsApp? Visit our <Link href="/contact" className="text-amber-700 underline font-medium hover:text-amber-800">contact page</Link>.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
