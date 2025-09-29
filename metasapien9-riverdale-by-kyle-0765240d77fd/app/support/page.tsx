"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Phone, Mail, MessageCircle, Search, Send, HelpCircle, Clock } from "lucide-react"
import Footer from "@/components/layout/footer"

export default function SupportPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [callbackForm, setCallbackForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    preferredTime: "",
  })

  // FAQ data
  const faqs = [
    {
      id: "1",
      question: "How do I book a luxury safari tour?",
      answer:
        "You can book a luxury safari tour through our website by selecting your preferred destination, dates, and package. You can also call us directly or request a callback for personalized assistance from our safari experts.",
    },
    {
      id: "2",
      question: "What is included in the luxury safari packages?",
      answer:
        "Our luxury safari packages include premium accommodation, gourmet meals, private game drives, park fees, luxury transportation, professional guide, and exclusive experiences. Specific inclusions vary by package - check the detailed itinerary for each tour.",
    },
    {
      id: "3",
      question: "Can I cancel or modify my safari booking?",
      answer:
        "Yes, you can cancel or modify your booking according to our cancellation policy. Cancellations made 30+ days in advance receive full refund, while later cancellations may incur fees. We offer flexible rebooking options.",
    },
    {
      id: "4",
      question: "What should I pack for a luxury safari?",
      answer:
        "Essential items include comfortable clothing in neutral colors, sun hat, sunscreen, binoculars, camera, insect repellent, and sturdy walking shoes. We provide a detailed luxury packing list upon booking with premium recommendations.",
    },
    {
      id: "5",
      question: "Do you offer group discounts for safari tours?",
      answer:
        "Yes, we offer attractive group discounts for parties of 6 or more people. Contact us for customized group pricing, special arrangements, and exclusive group experiences.",
    },
    {
      id: "6",
      question: "What payment methods do you accept?",
      answer:
        "We accept major credit cards, bank transfers, and mobile money payments (M-Pesa, Airtel Money). A deposit is required to confirm your booking, with flexible payment plans available.",
    },
  ]

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle callback request
    console.log("Callback request:", callbackForm)
    alert("Callback request submitted! Our safari expert will contact you within 24 hours.")
    setCallbackForm({ name: "", phone: "", email: "", message: "", preferredTime: "" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-amber-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg border-4 border-amber-200">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="font-serif text-5xl font-bold bg-gradient-to-r from-amber-800 via-orange-700 to-amber-800 bg-clip-text text-transparent mb-6">
            Safari Support & FAQ
          </h1>
          <p className="text-xl text-amber-700 max-w-3xl mx-auto leading-relaxed">
            Get expert help with your luxury safari bookings, find answers to common questions, or request a callback
            from our East Africa travel specialists
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-8">
            <Card className="bg-gradient-to-br from-white to-amber-50/50 border-2 border-amber-200 shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 font-serif text-xl text-amber-900">
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center border-2 border-amber-200">
                    <Phone className="h-4 w-4 text-amber-600" />
                  </div>
                  Contact Our Safari Experts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl border-2 border-amber-200 shadow-md">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-amber-900 text-lg">Call Us</p>
                    <p className="text-amber-700 font-medium">+254 700 123 456</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-100 to-amber-100 rounded-xl border-2 border-orange-200 shadow-md">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-amber-900 text-lg">Email Us</p>
                    <p className="text-amber-700 font-medium">support@riverdale.co.ke</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl border-2 border-green-200 shadow-md">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-amber-900 text-lg">WhatsApp</p>
                    <p className="text-amber-700 font-medium">+254 700 123 456</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white to-orange-50/50 border-2 border-orange-200 shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="font-serif text-xl text-amber-900 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center border-2 border-orange-200">
                    <Clock className="h-4 w-4 text-orange-600" />
                  </div>
                  Request Safari Consultation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCallbackSubmit} className="space-y-6">
                  <Input
                    placeholder="Your Name"
                    value={callbackForm.name}
                    onChange={(e) => setCallbackForm({ ...callbackForm, name: e.target.value })}
                    required
                    className="h-12 border-2 border-amber-200 focus:border-amber-500 focus:ring-amber-500/20"
                  />
                  <Input
                    placeholder="Phone Number"
                    value={callbackForm.phone}
                    onChange={(e) => setCallbackForm({ ...callbackForm, phone: e.target.value })}
                    required
                    className="h-12 border-2 border-amber-200 focus:border-amber-500 focus:ring-amber-500/20"
                  />
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={callbackForm.email}
                    onChange={(e) => setCallbackForm({ ...callbackForm, email: e.target.value })}
                    required
                    className="h-12 border-2 border-amber-200 focus:border-amber-500 focus:ring-amber-500/20"
                  />
                  <Input
                    placeholder="Preferred Time (e.g., Morning, Afternoon)"
                    value={callbackForm.preferredTime}
                    onChange={(e) => setCallbackForm({ ...callbackForm, preferredTime: e.target.value })}
                    className="h-12 border-2 border-amber-200 focus:border-amber-500 focus:ring-amber-500/20"
                  />
                  <Textarea
                    placeholder="How can we help you plan your perfect safari?"
                    value={callbackForm.message}
                    onChange={(e) => setCallbackForm({ ...callbackForm, message: e.target.value })}
                    rows={4}
                    className="border-2 border-amber-200 focus:border-amber-500 focus:ring-amber-500/20 resize-none"
                  />
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold h-12 shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <Send className="h-5 w-5 mr-3" />
                    Request Safari Consultation
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="bg-gradient-to-br from-white to-amber-50/30 border-2 border-amber-200 shadow-2xl">
              <CardHeader className="pb-6">
                <CardTitle className="font-serif text-2xl text-amber-900 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center border-2 border-amber-200">
                    <HelpCircle className="h-5 w-5 text-amber-600" />
                  </div>
                  Frequently Asked Questions
                </CardTitle>
                <div className="relative mt-4">
                  <Search className="absolute left-4 top-4 h-5 w-5 text-amber-600" />
                  <Input
                    placeholder="Search safari FAQs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 h-12 border-2 border-amber-200 focus:border-amber-500 focus:ring-amber-500/20"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {filteredFaqs.map((faq) => (
                    <AccordionItem
                      key={faq.id}
                      value={faq.id}
                      className="border-2 border-amber-200 rounded-lg px-6 py-2 bg-gradient-to-r from-white to-amber-50/50"
                    >
                      <AccordionTrigger className="text-left font-semibold text-amber-900 hover:text-orange-700 text-base">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-amber-800 leading-relaxed pt-2 pb-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                {filteredFaqs.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-amber-200">
                      <Search className="h-8 w-8 text-amber-600" />
                    </div>
                    <p className="text-amber-700 text-lg font-medium">No FAQs found matching your search.</p>
                    <p className="text-amber-600 mt-2">Try different keywords or contact us directly for assistance.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
