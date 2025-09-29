import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Cookie, Settings, Shield, BarChart3, Target } from "lucide-react"
import Footer from "@/components/layout/footer"

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Cookie className="w-8 h-8 text-amber-600" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Cookie Policy</h1>
          <p className="text-lg text-muted-foreground">
            Learn about how we use cookies and similar technologies on our website.
          </p>
          <p className="text-sm text-muted-foreground mt-2">Last updated: December 2024</p>
        </div>

        {/* What are Cookies */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>What are Cookies?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Cookies are small text files that are stored on your device when you visit our website. They help us
              provide you with a better browsing experience by remembering your preferences and analyzing how you use
              our site.
            </p>
            <p>
              We use both first-party cookies (set by our website) and third-party cookies (set by external services we
              use) to enhance your experience and provide our services effectively.
            </p>
          </CardContent>
        </Card>

        {/* Types of Cookies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                Essential Cookies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">Required for basic website functionality</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span>Session management and security</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span>Shopping cart functionality</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span>Form submission and validation</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span>Load balancing and performance</span>
                </li>
              </ul>
              <div className="bg-green-50 border border-green-200 rounded p-3">
                <p className="text-xs text-green-700">
                  These cookies cannot be disabled as they are necessary for the website to function.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                Analytics Cookies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">Help us understand how visitors use our website</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>Page views and user behavior</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>Traffic sources and referrals</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>Popular content and features</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>Website performance metrics</span>
                </li>
              </ul>
              <div className="bg-blue-50 border border-blue-200 rounded p-3">
                <p className="text-xs text-blue-700">We use Google Analytics to collect anonymous usage data.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-purple-600" />
                Functional Cookies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">Remember your preferences and choices</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <span>Language and region preferences</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <span>Theme and display settings</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <span>Recently viewed destinations</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <span>Saved search filters</span>
                </li>
              </ul>
              <div className="bg-purple-50 border border-purple-200 rounded p-3">
                <p className="text-xs text-purple-700">
                  These enhance your experience but are not essential for basic functionality.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-orange-600" />
                Marketing Cookies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">Used to deliver relevant advertisements</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>Personalized ad content</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>Social media integration</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>Retargeting campaigns</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>Conversion tracking</span>
                </li>
              </ul>
              <div className="bg-orange-50 border border-orange-200 rounded p-3">
                <p className="text-xs text-orange-700">These cookies require your consent and can be disabled.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Third-Party Services */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Third-Party Services</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>We use several third-party services that may set their own cookies:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Google Analytics</h4>
                <p className="text-sm text-muted-foreground mb-2">Website analytics and performance tracking</p>
                <a href="https://policies.google.com/privacy" className="text-blue-600 text-xs hover:underline">
                  Google Privacy Policy
                </a>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Google Maps</h4>
                <p className="text-sm text-muted-foreground mb-2">Interactive maps and location services</p>
                <a href="https://policies.google.com/privacy" className="text-blue-600 text-xs hover:underline">
                  Google Privacy Policy
                </a>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Facebook Pixel</h4>
                <p className="text-sm text-muted-foreground mb-2">Social media integration and advertising</p>
                <a href="https://www.facebook.com/privacy/policy/" className="text-blue-600 text-xs hover:underline">
                  Facebook Privacy Policy
                </a>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">YouTube</h4>
                <p className="text-sm text-muted-foreground mb-2">Embedded video content</p>
                <a href="https://policies.google.com/privacy" className="text-blue-600 text-xs hover:underline">
                  YouTube Privacy Policy
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Managing Cookies */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Managing Your Cookie Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h4 className="font-semibold">Browser Settings</h4>
            <p className="text-sm">
              You can control cookies through your browser settings. Most browsers allow you to:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>View and delete existing cookies</li>
              <li>Block cookies from specific websites</li>
              <li>Block third-party cookies</li>
              <li>Clear all cookies when you close the browser</li>
              <li>Set up notifications when cookies are being set</li>
            </ul>

            <h4 className="font-semibold">Browser-Specific Instructions</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <a
                href="https://support.google.com/chrome/answer/95647"
                className="p-3 border rounded-lg text-center hover:bg-gray-50 transition-colors"
              >
                <div className="font-medium text-sm">Chrome</div>
                <div className="text-xs text-muted-foreground">Cookie Settings</div>
              </a>
              <a
                href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop"
                className="p-3 border rounded-lg text-center hover:bg-gray-50 transition-colors"
              >
                <div className="font-medium text-sm">Firefox</div>
                <div className="text-xs text-muted-foreground">Cookie Settings</div>
              </a>
              <a
                href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
                className="p-3 border rounded-lg text-center hover:bg-gray-50 transition-colors"
              >
                <div className="font-medium text-sm">Safari</div>
                <div className="text-xs text-muted-foreground">Cookie Settings</div>
              </a>
              <a
                href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                className="p-3 border rounded-lg text-center hover:bg-gray-50 transition-colors"
              >
                <div className="font-medium text-sm">Edge</div>
                <div className="text-xs text-muted-foreground">Cookie Settings</div>
              </a>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-sm text-amber-800">
                <strong>Note:</strong> Disabling certain cookies may affect website functionality and your user
                experience.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Cookie Consent */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Consent</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              By continuing to use our website, you consent to our use of essential cookies. For non-essential cookies,
              we will ask for your explicit consent through our cookie banner.
            </p>
            <p>
              You can withdraw your consent at any time by adjusting your browser settings or contacting us directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button>Manage Cookie Preferences</Button>
              <Button variant="outline">Clear All Cookies</Button>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Questions About Cookies?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>If you have any questions about our use of cookies or this Cookie Policy, please contact us:</p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p>
                <strong>Email:</strong> privacy@riverdalekenya.co.ke
              </p>
              <p>
                <strong>Phone:</strong> +254 700 123 456
              </p>
              <p>
                <strong>Address:</strong> Riverdale Travel Ltd, Westlands, Nairobi, Kenya
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
