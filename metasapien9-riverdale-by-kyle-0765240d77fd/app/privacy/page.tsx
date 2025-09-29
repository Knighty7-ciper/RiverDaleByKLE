import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Eye, Lock, Database } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="font-heading text-4xl font-bold text-foreground mb-4">Privacy Policy</h1>
          <p className="text-lg text-muted-foreground">
            Your privacy is important to us. Learn how we collect, use, and protect your information.
          </p>
          <p className="text-sm text-muted-foreground mt-2">Last updated: December 2024</p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-blue-600" />
                1. Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <h4 className="font-semibold">1.1 Personal Information</h4>
              <p>When you book our services or contact us, we may collect:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name, email address, and phone number</li>
                <li>Passport information and nationality</li>
                <li>Payment information and billing address</li>
                <li>Travel preferences and special requirements</li>
                <li>Emergency contact details</li>
              </ul>

              <h4 className="font-semibold">1.2 Automatically Collected Information</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>IP address and browser information</li>
                <li>Website usage patterns and preferences</li>
                <li>Device information and operating system</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>

              <h4 className="font-semibold">1.3 Third-Party Information</h4>
              <p>
                We may receive information about you from travel partners, payment processors, and other service
                providers involved in your booking.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5 text-purple-600" />
                2. How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <h4 className="font-semibold">2.1 Service Provision</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Process and confirm your bookings</li>
                <li>Arrange travel services and accommodations</li>
                <li>Communicate important travel information</li>
                <li>Provide customer support and assistance</li>
              </ul>

              <h4 className="font-semibold">2.2 Business Operations</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Process payments and prevent fraud</li>
                <li>Improve our services and website functionality</li>
                <li>Conduct market research and analytics</li>
                <li>Comply with legal and regulatory requirements</li>
              </ul>

              <h4 className="font-semibold">2.3 Marketing Communications</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Send promotional offers and travel deals (with consent)</li>
                <li>Share travel tips and destination information</li>
                <li>Conduct customer satisfaction surveys</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-red-600" />
                3. Information Sharing and Disclosure
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <h4 className="font-semibold">3.1 Service Providers</h4>
              <p>We share information with trusted partners to provide our services:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Hotels, lodges, and accommodation providers</li>
                <li>Airlines and transportation companies</li>
                <li>Tour guides and activity operators</li>
                <li>Payment processors and financial institutions</li>
              </ul>

              <h4 className="font-semibold">3.2 Legal Requirements</h4>
              <p>We may disclose information when required by law or to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Comply with legal processes and government requests</li>
                <li>Protect our rights and property</li>
                <li>Ensure safety and security of our clients</li>
                <li>Prevent fraud and illegal activities</li>
              </ul>

              <h4 className="font-semibold">3.3 Business Transfers</h4>
              <p>
                In the event of a merger, acquisition, or sale of assets, your information may be transferred to the new
                entity.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Data Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <h4 className="font-semibold">4.1 Security Measures</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>SSL encryption for data transmission</li>
                <li>Secure servers and data storage facilities</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and employee training</li>
              </ul>

              <h4 className="font-semibold">4.2 Payment Security</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>PCI DSS compliant payment processing</li>
                <li>Tokenization of sensitive payment data</li>
                <li>Fraud detection and prevention systems</li>
              </ul>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  <strong>Note:</strong> While we implement strong security measures, no system is 100% secure. We
                  cannot guarantee absolute security of your information.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Your Rights and Choices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <h4 className="font-semibold">5.1 Access and Correction</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Request access to your personal information</li>
                <li>Correct inaccurate or incomplete data</li>
                <li>Update your contact preferences</li>
              </ul>

              <h4 className="font-semibold">5.2 Marketing Preferences</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Opt-out of marketing communications</li>
                <li>Choose communication channels (email, SMS, phone)</li>
                <li>Update frequency preferences</li>
              </ul>

              <h4 className="font-semibold">5.3 Data Deletion</h4>
              <p>
                You may request deletion of your personal information, subject to legal and business requirements. Some
                information may be retained for legitimate business purposes.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Cookies and Tracking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <h4 className="font-semibold">6.1 Types of Cookies</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Essential Cookies:</strong> Required for website functionality
                </li>
                <li>
                  <strong>Analytics Cookies:</strong> Help us understand website usage
                </li>
                <li>
                  <strong>Marketing Cookies:</strong> Used for targeted advertising
                </li>
                <li>
                  <strong>Preference Cookies:</strong> Remember your settings and choices
                </li>
              </ul>

              <h4 className="font-semibold">6.2 Managing Cookies</h4>
              <p>
                You can control cookies through your browser settings. Disabling certain cookies may affect website
                functionality.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. International Data Transfers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Your information may be transferred to and processed in countries other than Kenya. We ensure
                appropriate safeguards are in place to protect your data during international transfers.
              </p>
              <p>
                We comply with applicable data protection laws and international frameworks for cross-border data
                transfers.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Our services are not directed to children under 13. We do not knowingly collect personal information
                from children under 13 without parental consent.
              </p>
              <p>If you believe we have collected information from a child under 13, please contact us immediately.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. Changes to This Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                We may update this privacy policy periodically. Changes will be posted on our website with the updated
                date.
              </p>
              <p>Significant changes will be communicated through email or prominent website notices.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>10. Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>For questions about this privacy policy or your personal information:</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p>
                  <strong>Privacy Officer:</strong> bknglabs.dev@gmails.com
                </p>
                <p>
                  <strong>Phone:</strong> +254 700 123 456
                </p>
                <p>
                  <strong>Address:</strong> Riverdale Travel Ltd, Westlands, Nairobi, Kenya
                </p>
                <p>
                  <strong>Response Time:</strong> We will respond within 30 days
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            By using our services, you consent to the collection and use of your information as described in this
            privacy policy.
          </p>
        </div>
      </div>
    </div>
  )
}
