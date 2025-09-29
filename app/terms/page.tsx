import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Shield, AlertTriangle } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-cyan-600" />
          </div>
          <h1 className="font-heading text-4xl font-bold text-foreground mb-4">Terms and Conditions</h1>
          <p className="text-lg text-muted-foreground">Please read these terms carefully before using our services</p>
          <p className="text-sm text-muted-foreground mt-2">Last updated: December 2024</p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                1. Agreement to Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                By accessing and using the services of Riverdale Travel Ltd ("we," "our," or "us"), you accept and agree
                to be bound by the terms and provision of this agreement. If you do not agree to abide by the above,
                please do not use this service.
              </p>
              <p>
                These terms apply to all visitors, users, and others who access or use our travel booking services,
                whether through our website, phone, email, or in person.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Company Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                <strong>Company Name:</strong> Riverdale Travel Ltd
              </p>
              <p>
                <strong>Registration:</strong> Registered in Kenya under the Companies Act
              </p>
              <p>
                <strong>License:</strong> Licensed by Kenya Association of Tour Operators (KATO)
              </p>
              <p>
                <strong>Address:</strong> Westlands, Nairobi, Kenya
              </p>
              <p>
                <strong>Contact:</strong> +254 700 123 456 | bknglabs.dev@gmails.com
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Booking and Payment Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <h4 className="font-semibold">3.1 Booking Process</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>All bookings are subject to availability and confirmation</li>
                <li>A booking is confirmed only upon receipt of required deposit</li>
                <li>Full payment is required 30 days before travel date</li>
                <li>Late bookings (within 30 days) require full payment at time of booking</li>
              </ul>

              <h4 className="font-semibold">3.2 Payment Methods</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>M-Pesa mobile money transfers</li>
                <li>Bank transfers to our registered accounts</li>
                <li>Credit/debit cards (processing fees may apply)</li>
                <li>PayPal for international clients</li>
              </ul>

              <h4 className="font-semibold">3.3 Pricing</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>All prices are in Kenyan Shillings (KSH) unless otherwise stated</li>
                <li>Prices are subject to change without notice until booking is confirmed</li>
                <li>Additional charges may apply for special requests or changes</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Cancellation and Refund Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-amber-900">Cancellation Charges</h4>
                    <ul className="text-sm text-amber-800 mt-2 space-y-1">
                      <li>• More than 60 days: 10% of total cost</li>
                      <li>• 31-60 days: 25% of total cost</li>
                      <li>• 15-30 days: 50% of total cost</li>
                      <li>• 7-14 days: 75% of total cost</li>
                      <li>• Less than 7 days: 100% of total cost</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h4 className="font-semibold">4.1 Force Majeure</h4>
              <p>
                In cases of force majeure (natural disasters, political unrest, pandemic restrictions), we will work
                with clients to reschedule or provide credit for future travel. Refunds in such cases are subject to
                supplier policies.
              </p>

              <h4 className="font-semibold">4.2 No-Show Policy</h4>
              <p>
                Failure to show up for confirmed services without prior notice will result in forfeiture of all payments
                made.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Travel Requirements and Responsibilities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <h4 className="font-semibold">5.1 Client Responsibilities</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Ensure valid passport with at least 6 months validity</li>
                <li>Obtain necessary visas and permits</li>
                <li>Comply with health requirements and vaccinations</li>
                <li>Arrive at designated meeting points on time</li>
                <li>Follow guide instructions and safety protocols</li>
              </ul>

              <h4 className="font-semibold">5.2 Age Restrictions</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Children under 12 must be accompanied by adults</li>
                <li>Some activities have minimum age requirements</li>
                <li>Special arrangements needed for unaccompanied minors</li>
              </ul>

              <h4 className="font-semibold">5.3 Health and Safety</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Clients must disclose any medical conditions</li>
                <li>Travel insurance is strongly recommended</li>
                <li>We reserve the right to refuse service for safety reasons</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Liability and Insurance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <h4 className="font-semibold">6.1 Limitation of Liability</h4>
              <p>
                Riverdale Travel Ltd acts as an agent for suppliers and is not liable for their acts, omissions, or
                defaults. Our liability is limited to the cost of services booked through us.
              </p>

              <h4 className="font-semibold">6.2 Insurance Coverage</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>We maintain professional indemnity insurance</li>
                <li>Vehicle insurance covers transportation services</li>
                <li>Clients are responsible for personal travel insurance</li>
              </ul>

              <h4 className="font-semibold">6.3 Exclusions</h4>
              <p>
                We are not liable for delays, cancellations, or changes due to weather, political situations, natural
                disasters, or circumstances beyond our control.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                All content on our website, including text, graphics, logos, images, and software, is the property of
                Riverdale Travel Ltd and protected by copyright laws.
              </p>
              <p>
                Clients may not reproduce, distribute, or create derivative works from our content without written
                permission.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Dispute Resolution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <h4 className="font-semibold">8.1 Governing Law</h4>
              <p>These terms are governed by the laws of Kenya. Any disputes will be resolved in Kenyan courts.</p>

              <h4 className="font-semibold">8.2 Complaint Procedure</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Complaints should be made in writing within 30 days</li>
                <li>We will investigate and respond within 14 days</li>
                <li>Unresolved disputes may be referred to KATO mediation</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                We reserve the right to modify these terms at any time. Changes will be posted on our website and take
                effect immediately upon posting.
              </p>
              <p>Continued use of our services after changes constitutes acceptance of the new terms.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>10. Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>For questions about these terms, please contact us:</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p>
                  <strong>Email:</strong> bknglabs.dev@gmails.com
                </p>
                <p>
                  <strong>Phone:</strong> +254 700 123 456
                </p>
                <p>
                  <strong>Address:</strong> Riverdale Travel Ltd, Westlands, Nairobi, Kenya
                </p>
                <p>
                  <strong>Business Hours:</strong> Monday-Friday 8AM-6PM, Saturday 9AM-4PM
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            By using our services, you acknowledge that you have read, understood, and agree to these terms and
            conditions.
          </p>
        </div>
      </div>
    </div>
  )
}
