import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCw, CreditCard, Phone } from "lucide-react"

export default function CancellationPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <RefreshCw className="w-8 h-8 text-amber-600" />
          </div>
          <h1 className="font-heading text-4xl font-bold text-foreground mb-4">Cancellation & Refund Policy</h1>
          <p className="text-lg text-muted-foreground">Understanding our cancellation terms and refund procedures</p>
          <p className="text-sm text-muted-foreground mt-2">Last updated: December 2024</p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                Cancellation Charges Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-6">
                <h4 className="font-semibold text-red-900 mb-4">Standard Cancellation Fees</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-white rounded border">
                      <span className="font-medium">More than 60 days</span>
                      <span className="text-green-600 font-bold">10% charge</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded border">
                      <span className="font-medium">31-60 days</span>
                      <span className="text-yellow-600 font-bold">25% charge</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded border">
                      <span className="font-medium">15-30 days</span>
                      <span className="text-orange-600 font-bold">50% charge</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-white rounded border">
                      <span className="font-medium">7-14 days</span>
                      <span className="text-red-600 font-bold">75% charge</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded border">
                      <span className="font-medium">Less than 7 days</span>
                      <span className="text-red-700 font-bold">100% charge</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-100 rounded border border-red-300">
                      <span className="font-medium">No-show</span>
                      <span className="text-red-700 font-bold">100% charge</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>1. General Cancellation Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <h4 className="font-semibold">1.1 Cancellation Notice</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>All cancellations must be made in writing (email or letter)</li>
                <li>Cancellation is effective from the date we receive written notice</li>
                <li>Verbal cancellations are not accepted</li>
                <li>Cancellation charges are calculated from the original travel date</li>
              </ul>

              <h4 className="font-semibold">1.2 Booking Modifications</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Date changes are subject to availability and may incur additional costs</li>
                <li>Name changes may be permitted with advance notice (fees apply)</li>
                <li>Itinerary changes are treated as partial cancellations</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Service-Specific Policies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <h4 className="font-semibold">2.1 Safari Packages</h4>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <ul className="list-disc pl-6 space-y-2 text-blue-800">
                  <li>Peak season bookings (July-October, December-January) have stricter terms</li>
                  <li>Group bookings (8+ people) may have different cancellation rates</li>
                  <li>Special event safaris (migration, calving) are non-refundable within 30 days</li>
                </ul>
              </div>

              <h4 className="font-semibold">2.2 Hotel Reservations</h4>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <ul className="list-disc pl-6 space-y-2 text-green-800">
                  <li>Hotel cancellation policies may vary by property</li>
                  <li>Some hotels offer free cancellation up to 24-48 hours</li>
                  <li>Luxury lodges typically have stricter cancellation terms</li>
                </ul>
              </div>

              <h4 className="font-semibold">2.3 Custom Tours</h4>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <ul className="list-disc pl-6 space-y-2 text-purple-800">
                  <li>Custom itineraries require 50% deposit upon confirmation</li>
                  <li>Specialized services (private guides, exclusive access) are non-refundable</li>
                  <li>Multi-destination tours follow the strictest supplier policy</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-green-600" />
                3. Refund Process
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <h4 className="font-semibold">3.1 Refund Timeline</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Refunds are processed within 14 business days of cancellation</li>
                <li>Bank transfers: 3-5 business days</li>
                <li>M-Pesa refunds: 24-48 hours</li>
                <li>Credit card refunds: 5-10 business days (depending on bank)</li>
                <li>International transfers: 7-14 business days</li>
              </ul>

              <h4 className="font-semibold">3.2 Refund Method</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Refunds are made to the original payment method</li>
                <li>Processing fees are non-refundable</li>
                <li>Currency conversion rates may affect international refunds</li>
              </ul>

              <h4 className="font-semibold">3.3 Partial Refunds</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Unused services may be eligible for partial refunds</li>
                <li>Early departure from tours: no refund for unused days</li>
                <li>Missed activities due to personal reasons: no refund</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Force Majeure and Exceptional Circumstances</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <h4 className="font-semibold">4.1 Force Majeure Events</h4>
              <p>In cases of events beyond our control, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Natural disasters (earthquakes, floods, extreme weather)</li>
                <li>Political unrest or government travel advisories</li>
                <li>Pandemic restrictions or health emergencies</li>
                <li>Airline strikes or transportation disruptions</li>
                <li>Terrorism or security threats</li>
              </ul>

              <h4 className="font-semibold">4.2 Force Majeure Options</h4>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <ul className="list-disc pl-6 space-y-2 text-yellow-800">
                  <li>
                    <strong>Reschedule:</strong> Move your trip to a later date (no penalty)
                  </li>
                  <li>
                    <strong>Credit:</strong> Receive travel credit valid for 24 months
                  </li>
                  <li>
                    <strong>Refund:</strong> Subject to supplier policies and actual costs incurred
                  </li>
                </ul>
              </div>

              <h4 className="font-semibold">4.3 Travel Insurance</h4>
              <p>
                We strongly recommend comprehensive travel insurance to protect against unforeseen circumstances.
                Insurance may cover cancellation fees that our policy does not.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Medical and Emergency Cancellations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <h4 className="font-semibold">5.1 Medical Emergencies</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Medical certificate required from licensed physician</li>
                <li>Must be for serious illness preventing travel</li>
                <li>Reduced cancellation fees may apply (case-by-case basis)</li>
              </ul>

              <h4 className="font-semibold">5.2 Family Emergencies</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Death or serious illness of immediate family member</li>
                <li>Documentation required (death certificate, medical records)</li>
                <li>Compassionate consideration for reduced fees</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Group Booking Policies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <h4 className="font-semibold">6.1 Group Definitions</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Small groups: 4-7 people</li>
                <li>Medium groups: 8-15 people</li>
                <li>Large groups: 16+ people</li>
              </ul>

              <h4 className="font-semibold">6.2 Group Cancellation Terms</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Partial group cancellations may affect per-person pricing</li>
                <li>Group leader is responsible for all cancellation notices</li>
                <li>Individual cancellations within groups follow standard policy</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-blue-600" />
                7. How to Cancel
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <h4 className="font-semibold">7.1 Cancellation Process</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ol className="list-decimal pl-6 space-y-2">
                  <li>
                    Send written cancellation request to: <strong>cancellations@riverdaletravel.co.ke</strong>
                  </li>
                  <li>Include booking reference number and reason for cancellation</li>
                  <li>Provide original payment method details for refund</li>
                  <li>Await confirmation email with cancellation details</li>
                  <li>Refund will be processed according to timeline above</li>
                </ol>
              </div>

              <h4 className="font-semibold">7.2 Required Information</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Full name of lead traveler</li>
                <li>Booking reference number</li>
                <li>Travel dates and destination</li>
                <li>Reason for cancellation</li>
                <li>Preferred refund method</li>
              </ul>

              <h4 className="font-semibold">7.3 Contact Information</h4>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p>
                  <strong>Email:</strong> cancellations@riverdaletravel.co.ke
                </p>
                <p>
                  <strong>Phone:</strong> +254 700 123 456
                </p>
                <p>
                  <strong>WhatsApp:</strong> +254 700 123 456
                </p>
                <p>
                  <strong>Office Hours:</strong> Monday-Friday 8AM-6PM, Saturday 9AM-4PM
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
            <p className="text-amber-800 font-medium mb-2">
              Important: This policy is subject to supplier terms and conditions
            </p>
            <p className="text-sm text-amber-700">
              Some services may have different cancellation terms. We will inform you of any variations at the time of
              booking.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
