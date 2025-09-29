import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, ExternalLink } from "lucide-react"
import Link from "next/link"
import Footer from "@/components/layout/footer"

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Sitemap</h1>
          <p className="text-lg text-muted-foreground">Navigate through all pages and sections of our website</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Main Pages */}
          <Card>
            <CardHeader>
              <CardTitle>Main Pages</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link
                href="/"
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-colors"
              >
                <span>Home</span>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </Link>
              <Link
                href="/about"
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-colors"
              >
                <span>About Us</span>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-colors"
              >
                <span>Contact Us</span>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </Link>
              <Link
                href="/gallery"
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-colors"
              >
                <span>Photo Gallery</span>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </Link>
              <Link
                href="/blog"
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-colors"
              >
                <span>Travel Blog</span>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </Link>
            </CardContent>
          </Card>

          {/* Destinations */}
          <Card>
            <CardHeader>
              <CardTitle>Safari Destinations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link
                href="/destinations"
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-colors"
              >
                <span>All Destinations</span>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </Link>
              <Link
                href="/destinations/maasai-mara"
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-colors"
              >
                <span>Maasai Mara Safari</span>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </Link>
              <Link
                href="/destinations/amboseli"
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-colors"
              >
                <span>Amboseli National Park</span>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </Link>
              <Link
                href="/destinations/tsavo"
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-colors"
              >
                <span>Tsavo National Parks</span>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </Link>
              <Link
                href="/destinations/samburu"
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-colors"
              >
                <span>Samburu National Reserve</span>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </Link>
            </CardContent>
          </Card>

          {/* Accommodations */}
          <Card>
            <CardHeader>
              <CardTitle>Hotels & Accommodations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link
                href="/hotels"
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-colors"
              >
                <span>All Hotels</span>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </Link>
              <Link
                href="/hotels/luxury-lodges"
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-colors"
              >
                <span>Luxury Safari Lodges</span>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </Link>
              <Link
                href="/hotels/beach-resorts"
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-colors"
              >
                <span>Beach Resorts</span>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </Link>
              <Link
                href="/hotels/budget-options"
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-colors"
              >
                <span>Budget Accommodations</span>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </Link>
            </CardContent>
          </Card>

          {/* Support & Services */}
          <Card>
            <CardHeader>
              <CardTitle>Support & Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link
                href="/booking-help"
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-colors"
              >
                <span>Booking Assistance</span>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </Link>
              <Link
                href="/travel-insurance"
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-colors"
              >
                <span>Travel Insurance</span>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </Link>
              <Link
                href="/visa-info"
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-colors"
              >
                <span>Visa Information</span>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </Link>
              <Link
                href="/reviews"
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-colors"
              >
                <span>Customer Reviews</span>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </Link>
              <Link
                href="/emergency-contacts"
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-colors"
              >
                <span>Emergency Contacts</span>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </Link>
            </CardContent>
          </Card>

          {/* Legal Pages */}
          <Card>
            <CardHeader>
              <CardTitle>Legal & Policies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link
                href="/terms"
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-colors"
              >
                <span>Terms & Conditions</span>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </Link>
              <Link
                href="/privacy"
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-colors"
              >
                <span>Privacy Policy</span>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </Link>
              <Link
                href="/cancellation-policy"
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-colors"
              >
                <span>Cancellation Policy</span>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </Link>
              <Link
                href="/cookies"
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-colors"
              >
                <span>Cookie Policy</span>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </Link>
              <Link
                href="/accessibility"
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-colors"
              >
                <span>Accessibility Statement</span>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </Link>
            </CardContent>
          </Card>

          {/* Booking & Account */}
          <Card>
            <CardHeader>
              <CardTitle>Booking & Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link
                href="/booking"
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-colors"
              >
                <span>Book Your Safari</span>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </Link>
              <Link
                href="/booking/inquiry"
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-colors"
              >
                <span>Custom Safari Inquiry</span>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </Link>
              <Link
                href="/profile"
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-colors"
              >
                <span>My Profile</span>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Additional Information */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Website Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">Last Updated</h4>
                <p className="text-muted-foreground">December 2024</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Total Pages</h4>
                <p className="text-muted-foreground">25+ pages</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Languages</h4>
                <p className="text-muted-foreground">English</p>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> This sitemap includes all major pages and sections. Some dynamic content and
                user-specific pages may not be listed here.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
