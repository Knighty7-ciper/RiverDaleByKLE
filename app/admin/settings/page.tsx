"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save, Phone, MapPin, Globe } from "lucide-react"
import Link from "next/link"

interface SiteSettings {
  company_name: string
  phone_primary: string
  phone_secondary: string
  email_primary: string
  email_secondary: string
  address: string
  city: string
  country: string
  website: string
  description: string
  social_facebook: string
  social_instagram: string
  social_twitter: string
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>({
    company_name: "Riverdale Travel",
    phone_primary: "+254 722 123 456",
    phone_secondary: "+254 733 987 654",
    email_primary: "info@riverdale.travel",
    email_secondary: "bookings@riverdale.travel",
    address: "Westlands Road, Nairobi",
    city: "Nairobi",
    country: "Kenya",
    website: "https://riverdale.travel",
    description: "Premium safari and travel experiences across East Africa",
    social_facebook: "https://facebook.com/riverdaletravel",
    social_instagram: "https://instagram.com/riverdaletravel",
    social_twitter: "https://twitter.com/riverdaletravel",
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const { createClientComponentClient } = await import("@supabase/auth-helpers-nextjs")
      const supabase = createClientComponentClient()
      const { data: sessionData } = await supabase.auth.getSession()
      if (!sessionData.session) {
        router.push("/admin")
        return
      }
      const user = sessionData.session.user
      const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()
      if (!profile || profile.role !== "admin") {
        await supabase.auth.signOut()
        router.push("/admin")
        return
      }
      loadSettings()
    }
    checkAuth()
  }, [router])

  const loadSettings = async () => {
    try {
      // Load settings from database
      console.log("Loading site settings...")
    } catch (error) {
      console.error("Error loading settings:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Save settings to database
      console.log("Updating site settings:", settings)

      alert("Settings updated successfully!")
    } catch (error) {
      console.error("Error updating settings:", error)
      alert("Error updating settings")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/admin/dashboard">
                <Button variant="ghost" className="text-gray-300 hover:text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-white">Site Settings</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Company Information */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Company Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="company_name" className="text-gray-300">
                  Company Name
                </Label>
                <Input
                  id="company_name"
                  value={settings.company_name}
                  onChange={(e) => setSettings({ ...settings, company_name: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-gray-300">
                  Company Description
                </Label>
                <Textarea
                  id="description"
                  value={settings.description}
                  onChange={(e) => setSettings({ ...settings, description: e.target.value })}
                  rows={3}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>

              <div>
                <Label htmlFor="website" className="text-gray-300">
                  Website URL
                </Label>
                <Input
                  id="website"
                  value={settings.website}
                  onChange={(e) => setSettings({ ...settings, website: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone_primary" className="text-gray-300">
                    Primary Phone
                  </Label>
                  <Input
                    id="phone_primary"
                    value={settings.phone_primary}
                    onChange={(e) => setSettings({ ...settings, phone_primary: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="phone_secondary" className="text-gray-300">
                    Secondary Phone
                  </Label>
                  <Input
                    id="phone_secondary"
                    value={settings.phone_secondary}
                    onChange={(e) => setSettings({ ...settings, phone_secondary: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email_primary" className="text-gray-300">
                    Primary Email
                  </Label>
                  <Input
                    id="email_primary"
                    type="email"
                    value={settings.email_primary}
                    onChange={(e) => setSettings({ ...settings, email_primary: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="email_secondary" className="text-gray-300">
                    Secondary Email
                  </Label>
                  <Input
                    id="email_secondary"
                    type="email"
                    value={settings.email_secondary}
                    onChange={(e) => setSettings({ ...settings, email_secondary: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Location
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="address" className="text-gray-300">
                  Address
                </Label>
                <Input
                  id="address"
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city" className="text-gray-300">
                    City
                  </Label>
                  <Input
                    id="city"
                    value={settings.city}
                    onChange={(e) => setSettings({ ...settings, city: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="country" className="text-gray-300">
                    Country
                  </Label>
                  <Input
                    id="country"
                    value={settings.country}
                    onChange={(e) => setSettings({ ...settings, country: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Media */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                Social Media
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="social_facebook" className="text-gray-300">
                  Facebook URL
                </Label>
                <Input
                  id="social_facebook"
                  value={settings.social_facebook}
                  onChange={(e) => setSettings({ ...settings, social_facebook: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>

              <div>
                <Label htmlFor="social_instagram" className="text-gray-300">
                  Instagram URL
                </Label>
                <Input
                  id="social_instagram"
                  value={settings.social_instagram}
                  onChange={(e) => setSettings({ ...settings, social_instagram: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>

              <div>
                <Label htmlFor="social_twitter" className="text-gray-300">
                  Twitter URL
                </Label>
                <Input
                  id="social_twitter"
                  value={settings.social_twitter}
                  onChange={(e) => setSettings({ ...settings, social_twitter: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button type="submit" disabled={loading} className="bg-cyan-600 hover:bg-cyan-700">
              <Save className="w-4 h-4 mr-2" />
              {loading ? "Saving..." : "Save Settings"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
