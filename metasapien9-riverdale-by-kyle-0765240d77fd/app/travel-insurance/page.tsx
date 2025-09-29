import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, CheckCircle, AlertTriangle, Phone, ExternalLink } from "lucide-react"
import Footer from "@/components/layout/footer"

export default function TravelInsurancePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Travel Insurance</h1>
          <p className="text-lg text-muted-foreground">
            Protect your East Africa adventure with comprehensive travel insurance coverage.
          </p>
        </div>

        {/* Why Insurance is Important */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              Why Travel Insurance is Essential for East Africa
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              East Africa offers incredible wildlife experiences, but like any international travel, unexpected situations can
              arise. Travel insurance provides peace of mind and financial protection for:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Medical emergencies and evacuation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Trip cancellation or interruption</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Lost or delayed baggage</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Flight delays and missed connections</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Adventure activity coverage</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Personal liability protection</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Coverage Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Essential Coverage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Medical Coverage</p>
                  <p className="text-sm text-muted-foreground">Up to $100,000 for medical expenses</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Emergency Evacuation</p>
                  <p className="text-sm text-muted-foreground">Up to $1,000,000 for medical evacuation</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Trip Cancellation</p>
                  <p className="text-sm text-muted-foreground">100% of non-refundable trip costs</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Baggage Protection</p>
                  <p className="text-sm text-muted-foreground">Up to $2,500 for lost/stolen items</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Safari-Specific Coverage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Adventure Activities</p>
                  <p className="text-sm text-muted-foreground">Game drives, walking safaris, cultural visits</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Equipment Coverage</p>
                  <p className="text-sm text-muted-foreground">Camera and photography equipment</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Safari Interruption</p>
                  <p className="text-sm text-muted-foreground">Weather or wildlife-related delays</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Remote Area Coverage</p>
                  <p className="text-sm text-muted-foreground">Protection in national parks and reserves</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommended Providers */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Recommended Insurance Providers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">World Nomads</h4>
                <p className="text-sm text-muted-foreground mb-3">Comprehensive coverage for adventure travelers</p>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  Get Quote <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Allianz Travel</h4>
                <p className="text-sm text-muted-foreground mb-3">Reliable coverage with 24/7 assistance</p>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  Get Quote <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">IMG Global</h4>
                <p className="text-sm text-muted-foreground mb-3">Specialized international travel insurance</p>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  Get Quote <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Notes */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Important Considerations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h4 className="font-semibold text-amber-800 mb-2">Pre-existing Medical Conditions</h4>
              <p className="text-amber-700 text-sm">
                Declare all pre-existing medical conditions when purchasing insurance. Coverage may be excluded if not
                properly disclosed.
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Purchase Timing</h4>
              <p className="text-blue-700 text-sm">
                Buy insurance within 14-21 days of your initial trip deposit to ensure maximum coverage benefits.
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">Documentation</h4>
              <p className="text-green-700 text-sm">
                Keep all receipts and documentation. Take photos of your policy and emergency contact numbers.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact for Help */}
        <Card>
          <CardHeader>
            <CardTitle>Need Help Choosing Insurance?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Our travel specialists can help you select the right insurance coverage for your Kenya safari.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Call +254 700 123 456
              </Button>
              <Button variant="outline">Email bknglabs.dev@gmails.com</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
