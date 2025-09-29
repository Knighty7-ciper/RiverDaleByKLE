"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Phone, Mail, MapPin, Clock, Send, MessageCircle, Shield } from "lucide-react"
import Link from "next/link"
import EmailService from "@/lib/email-service"
import Footer from "@/components/layout/footer"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Store inquiry in localStorage for admin to see
    const inquiries = JSON.parse(localStorage.getItem("contactInquiries") || "[]")
    const newInquiry = {
      id: Date.now().toString(),
      ...formData,
      date: new Date().toISOString(),
      status: "new",
    }
    inquiries.push(newInquiry)
    localStorage.setItem("contactInquiries", JSON.stringify(inquiries))

    const emailService = EmailService.getInstance()
    try {
      await emailService.sendContactInquiry(newInquiry)
    } catch (error) {
      console.error("Failed to send contact inquiry email:", error)
    }

    setIsSubmitting(false)
    alert("Thank you for your message! We'll get back to you within 24 hours.")

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      inquiryType: "",
    })
  }

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/mount-kenya-landscape-acacia-trees-african-sunset-.jpg')`,
          }}
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <Link
              href="/"
              className="inline-flex items-center text-amber-300 hover:text-white mb-8 transition-colors font-medium"
            >
              <ArrowLeft className="w-5 h-5 mr-3" />
              Back to Home
            </Link>
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-8 text-balance drop-shadow-2xl">
              Get in <span className="text-amber-300">Touch</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/95 max-w-4xl mx-auto leading-relaxed drop-shadow-lg mb-12">
              Ready to plan your dream East Africa safari adventure? Our expert team is here to help make your travel dreams
              come true with personalized service and local expertise.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                <Shield className="w-6 h-6 text-amber-300" />
                <span className="text-white font-semibold">Licensed Tour Operator</span>
              </div>
              <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                <MessageCircle className="w-6 h-6 text-amber-300" />
                <span className="text-white font-semibold">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <div className="luxury-card rounded-3xl p-10 shadow-2xl">
                <div className="mb-8">
                  <Badge className="bg-primary/10 text-primary px-4 py-2 text-sm font-medium mb-6 rounded-full">
                    Send us a Message
                  </Badge>
                  <h2 className="font-serif text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
                    <MessageCircle className="w-8 h-8 text-primary" />
                    Plan Your Safari Adventure
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Fill out the form below and our safari experts will get back to you within 24 hours with a
                    personalized quote and recommendations.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-foreground font-semibold mb-3 block">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => updateFormData("name", e.target.value)}
                        placeholder="Your full name"
                        className="h-12 rounded-xl border-border bg-background"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-foreground font-semibold mb-3 block">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateFormData("email", e.target.value)}
                        placeholder="your.email@example.com"
                        className="h-12 rounded-xl border-border bg-background"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone" className="text-foreground font-semibold mb-3 block">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => updateFormData("phone", e.target.value)}
                        placeholder="+254 700 000 000"
                        className="h-12 rounded-xl border-border bg-background"
                      />
                    </div>
                    <div>
                      <Label htmlFor="inquiryType" className="text-foreground font-semibold mb-3 block">
                        Safari Type
                      </Label>
                      <Select onValueChange={(value) => updateFormData("inquiryType", value)}>
                        <SelectTrigger className="h-12 rounded-xl border-border">
                          <SelectValue placeholder="Select safari type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="safari">Wildlife Safari</SelectItem>
                          <SelectItem value="beach">Beach Holiday</SelectItem>
                          <SelectItem value="mountain">Mountain Adventure</SelectItem>
                          <SelectItem value="cultural">Cultural Tour</SelectItem>
                          <SelectItem value="custom">Custom Package</SelectItem>
                          <SelectItem value="general">General Inquiry</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-foreground font-semibold mb-3 block">
                      Subject *
                    </Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => updateFormData("subject", e.target.value)}
                      placeholder="Brief subject of your safari inquiry"
                      className="h-12 rounded-xl border-border bg-background"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-foreground font-semibold mb-3 block">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => updateFormData("message", e.target.value)}
                      placeholder="Tell us about your safari plans, preferred dates, group size, budget range, and any special requirements..."
                      rows={6}
                      className="rounded-xl border-border bg-background resize-none"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full luxury-button text-white py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending Message..."
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-3" />
                        Send Safari Inquiry
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-10">
              <div>
                <Badge className="bg-primary/10 text-primary px-4 py-2 text-sm font-medium mb-6 rounded-full">
                  Contact Information
                </Badge>
                <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                  Get in Touch with Our Safari Experts
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Connect with our friendly team of Kenya safari specialists. We're here to help you plan the perfect
                  East African adventure with expert local knowledge and personalized service.
                </p>
              </div>

              <div className="space-y-8">
                <div className="luxury-card rounded-3xl p-8 transition-all duration-300 hover:scale-105">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl font-semibold mb-4 text-foreground">Phone & WhatsApp</h3>
                      <p className="text-muted-foreground mb-2 text-lg">Main Office: +254 700 123 456</p>
                      <p className="text-muted-foreground mb-2 text-lg">WhatsApp: +254 700 123 456</p>
                      <p className="text-sm text-muted-foreground mb-4">Available 24/7 for safari emergencies</p>
                      <a
                        href="https://wa.me/254700123456?text=Hello! I'd like to inquire about your Kenya safari services."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 text-green-600 hover:text-green-700 font-semibold text-lg transition-colors"
                      >
                        <MessageCircle className="w-5 h-5" />
                        Chat on WhatsApp
                      </a>
                    </div>
                  </div>
                </div>

                <div className="luxury-card rounded-3xl p-8 transition-all duration-300 hover:scale-105">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-8 h-8 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl font-semibold mb-4 text-foreground">Email</h3>
                      <p className="text-muted-foreground mb-2 text-lg">bknglabs.dev@gmails.com</p>
                      <p className="text-muted-foreground mb-2 text-lg">bknglabs.dev@gmails.com</p>
                      <p className="text-sm text-muted-foreground">We respond within 24 hours</p>
                    </div>
                  </div>
                </div>

                <div className="luxury-card rounded-3xl p-8 transition-all duration-300 hover:scale-105">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-8 h-8 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl font-semibold mb-4 text-foreground">Office Location</h3>
                      <p className="text-muted-foreground mb-2 text-lg">Riverdale Safaris Ltd</p>
                      <p className="text-muted-foreground mb-2 text-lg">Westlands, Nairobi</p>
                      <p className="text-muted-foreground mb-2 text-lg">Kenya, East Africa</p>
                      <p className="text-sm text-muted-foreground">Visit by appointment only</p>
                    </div>
                  </div>
                </div>

                <div className="luxury-card rounded-3xl p-8 transition-all duration-300 hover:scale-105">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl font-semibold mb-4 text-foreground">Business Hours</h3>
                      <p className="text-muted-foreground mb-2 text-lg">Monday - Friday: 8:00 AM - 6:00 PM</p>
                      <p className="text-muted-foreground mb-2 text-lg">Saturday: 9:00 AM - 4:00 PM</p>
                      <p className="text-muted-foreground mb-2 text-lg">Sunday: Closed</p>
                      <p className="text-sm text-muted-foreground">East Africa Time (EAT)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 section-luxury">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="bg-primary text-primary-foreground px-6 py-3 text-sm font-medium mb-8 rounded-full">
              Frequently Asked Questions
            </Badge>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-8 text-balance">
              Safari Planning Made Simple
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Quick answers to common questions about planning your Kenya safari adventure with Riverdale Safaris.
            </p>
          </div>

          <div className="space-y-8">
            <div className="luxury-card rounded-3xl p-8 transition-all duration-300 hover:scale-105">
              <h3 className="font-serif text-2xl font-semibold mb-4 text-foreground">
                What's included in your safari packages?
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Our comprehensive safari packages include luxury accommodation, all meals, professional game drives,
                park fees, expert guide services, and transportation in premium 4WD safari vehicles. International
                flights and personal expenses are not included, but we can arrange everything for you.
              </p>
            </div>

            <div className="luxury-card rounded-3xl p-8 transition-all duration-300 hover:scale-105">
              <h3 className="font-serif text-2xl font-semibold mb-4 text-foreground">
                What's the best time to visit Kenya?
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Kenya is a spectacular year-round destination! The Great Migration in Maasai Mara is best from
                July-October. For beach holidays, visit during dry seasons (December-March, June-October). Our safari
                experts will help you choose the perfect time based on your interests and wildlife preferences.
              </p>
            </div>

            <div className="luxury-card rounded-3xl p-8 transition-all duration-300 hover:scale-105">
              <h3 className="font-serif text-2xl font-semibold mb-4 text-foreground">
                Do I need a visa to visit Kenya?
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Most visitors need a visa to enter Kenya. You can apply for an eVisa online before travel for
                convenience. Some nationalities can get a visa on arrival. We provide detailed visa information and
                assistance based on your nationality when you book with us.
              </p>
            </div>

            <div className="luxury-card rounded-3xl p-8 transition-all duration-300 hover:scale-105">
              <h3 className="font-serif text-2xl font-semibold mb-4 text-foreground">
                What payment methods do you accept?
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We accept M-Pesa, bank transfers, credit/debit cards, and PayPal for your convenience. For international
                clients, we recommend bank transfers or PayPal. A deposit is required to confirm your safari booking,
                with the balance due before travel.
              </p>
            </div>

            <div className="luxury-card rounded-3xl p-8 transition-all duration-300 hover:scale-105">
              <h3 className="font-serif text-2xl font-semibold mb-4 text-foreground">
                Can you customize safari packages?
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We specialize in creating custom safari itineraries tailored to your interests, budget, and travel
                dates. Whether you want to combine safari with beach time, add cultural experiences, or focus on
                specific wildlife, we'll design the perfect Kenya adventure for you.
              </p>
            </div>

            <div className="luxury-card rounded-3xl p-8 transition-all duration-300 hover:scale-105">
              <h3 className="font-serif text-2xl font-semibold mb-4 text-foreground">
                What safety measures do you have in place?
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Your safety is our absolute top priority. All our guides are licensed professionals with extensive
                experience, our vehicles are regularly maintained and equipped with safety equipment, and we maintain
                24/7 communication during your safari. We also provide comprehensive travel insurance recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 luxury-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-8 text-balance">
            Ready to Start Planning Your Safari?
          </h2>
          <p className="text-xl text-white/95 mb-12 leading-relaxed">
            Our safari experts are standing by to help you create the perfect Kenya adventure. Get in touch today for a
            personalized quote and expert recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="https://wa.me/254700123456?text=Hello! I'd like to plan a Kenya safari adventure."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 px-10 py-4 text-lg font-semibold rounded-xl shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <MessageCircle className="w-5 h-5 mr-3" />
                WhatsApp Us Now
              </Button>
            </a>
            <Link href="tel:+254700123456">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-primary px-10 py-4 text-lg font-semibold bg-white/10 rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-105"
              >
                <Phone className="w-5 h-5 mr-3" />
                Call Safari Expert
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
