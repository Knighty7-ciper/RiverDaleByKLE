import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, MapPin, Clock, AlertTriangle, Heart, Shield } from "lucide-react"

export default function EmergencyContactsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="font-heading text-4xl font-bold text-foreground mb-4">Emergency Contacts</h1>
          <p className="text-lg text-muted-foreground">
            Important contact information for emergencies during your travels in East Africa
          </p>
          <p className="text-sm text-muted-foreground mt-2">Keep this information accessible at all times</p>
        </div>

        <div className="space-y-8">
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700">
                <AlertTriangle className="w-5 h-5" />
                EMERGENCY - Call Immediately
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-700 mb-2">Police Emergency</h4>
                  <p className="text-2xl font-bold text-red-600">999</p>
                  <p className="text-sm text-red-600">24/7 Emergency Response</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-700 mb-2">Medical Emergency</h4>
                  <p className="text-2xl font-bold text-red-600">999</p>
                  <p className="text-sm text-red-600">Ambulance Services</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-700 mb-2">Fire Emergency</h4>
                  <p className="text-2xl font-bold text-red-600">999</p>
                  <p className="text-sm text-red-600">Fire & Rescue Services</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-cyan-200 bg-cyan-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-cyan-700">
                <Phone className="w-5 h-5" />
                Riverdale Travel 24/7 Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg border border-cyan-200">
                  <h4 className="font-semibold text-cyan-700 mb-3">Primary Emergency Line</h4>
                  <p className="text-xl font-bold text-cyan-600 mb-2">+254 700 123 456</p>
                  <p className="text-sm text-cyan-600 mb-2">Available 24/7 for emergencies</p>
                  <p className="text-xs text-muted-foreground">WhatsApp available</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-cyan-200">
                  <h4 className="font-semibold text-cyan-700 mb-3">Backup Emergency Line</h4>
                  <p className="text-xl font-bold text-cyan-600 mb-2">+254 711 456 789</p>
                  <p className="text-sm text-cyan-600 mb-2">If primary line unavailable</p>
                  <p className="text-xs text-muted-foreground">SMS and calls</p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-cyan-100 rounded-lg">
                <p className="text-sm text-cyan-800">
                  <strong>What to provide:</strong> Your name, booking reference, location, nature of emergency, and
                  contact number
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-600" />
                Medical Emergency Contacts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <h4 className="font-semibold">Major Hospitals in Nairobi</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h5 className="font-medium">Nairobi Hospital</h5>
                  <p className="text-sm text-muted-foreground">Argwings Kodhek Road</p>
                  <p className="font-medium text-blue-600">+254 20 2845000</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h5 className="font-medium">Aga Khan Hospital</h5>
                  <p className="text-sm text-muted-foreground">3rd Parklands Avenue</p>
                  <p className="font-medium text-blue-600">+254 20 3740000</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h5 className="font-medium">MP Shah Hospital</h5>
                  <p className="text-sm text-muted-foreground">Shivachi Road, Parklands</p>
                  <p className="font-medium text-blue-600">+254 20 4285000</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h5 className="font-medium">Karen Hospital</h5>
                  <p className="text-sm text-muted-foreground">Karen Road</p>
                  <p className="font-medium text-blue-600">+254 20 6610000</p>
                </div>
              </div>

              <h4 className="font-semibold">Coast Region Hospitals</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h5 className="font-medium">Aga Khan Hospital Mombasa</h5>
                  <p className="text-sm text-muted-foreground">Vanga Road</p>
                  <p className="font-medium text-blue-600">+254 41 2222000</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h5 className="font-medium">Coast General Hospital</h5>
                  <p className="text-sm text-muted-foreground">Mombasa</p>
                  <p className="font-medium text-blue-600">+254 41 2314200</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                Embassy and Consulate Contacts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <h4 className="font-semibold">Major Embassies in Nairobi</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h5 className="font-medium">US Embassy</h5>
                  <p className="text-sm text-muted-foreground">United Nations Avenue</p>
                  <p className="font-medium text-blue-600">+254 20 3636000</p>
                  <p className="text-xs text-muted-foreground">Emergency: +254 20 3636170</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h5 className="font-medium">British High Commission</h5>
                  <p className="text-sm text-muted-foreground">Upper Hill Road</p>
                  <p className="font-medium text-blue-600">+254 20 2844000</p>
                  <p className="text-xs text-muted-foreground">Emergency: +254 20 2844000</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h5 className="font-medium">German Embassy</h5>
                  <p className="text-sm text-muted-foreground">Riverside Drive</p>
                  <p className="font-medium text-blue-600">+254 20 4262100</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h5 className="font-medium">French Embassy</h5>
                  <p className="text-sm text-muted-foreground">Peponi Road, Westlands</p>
                  <p className="font-medium text-blue-600">+254 20 2779000</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-green-600" />
                Tourist Police and Assistance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h5 className="font-medium">Tourist Police Nairobi</h5>
                  <p className="text-sm text-muted-foreground">Central Police Station</p>
                  <p className="font-medium text-blue-600">+254 20 2240000</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h5 className="font-medium">Tourist Police Mombasa</h5>
                  <p className="text-sm text-muted-foreground">Mombasa Central</p>
                  <p className="font-medium text-blue-600">+254 41 2312121</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h5 className="font-medium">Kenya Tourism Board</h5>
                  <p className="text-sm text-muted-foreground">Tourist Assistance</p>
                  <p className="font-medium text-blue-600">+254 20 2711262</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h5 className="font-medium">Kenya Wildlife Service</h5>
                  <p className="text-sm text-muted-foreground">Park Emergencies</p>
                  <p className="font-medium text-blue-600">+254 20 6000800</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-600" />
                Important Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <h4 className="font-semibold">Before You Travel</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Save all emergency numbers in your phone</li>
                <li>Share your itinerary with family/friends</li>
                <li>Register with your embassy if staying long-term</li>
                <li>Keep copies of important documents</li>
                <li>Know your travel insurance details</li>
              </ul>

              <h4 className="font-semibold">During Emergencies</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Stay calm and assess the situation</li>
                <li>Call emergency services first if life-threatening</li>
                <li>Contact Riverdale Travel immediately after</li>
                <li>Keep your phone charged and accessible</li>
                <li>Follow local authority instructions</li>
              </ul>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">Travel Insurance Reminder</h4>
                <p className="text-sm text-yellow-700">
                  Ensure your travel insurance covers medical emergencies, evacuation, and repatriation. Keep your
                  policy number and emergency contact readily available.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <p className="text-blue-800 font-medium mb-2">
              Save this page offline or take a screenshot for easy access
            </p>
            <p className="text-sm text-blue-700">
              Emergency situations may affect internet connectivity. Having offline access to these contacts is crucial.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
