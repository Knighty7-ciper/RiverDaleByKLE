import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, Keyboard, Volume2, MousePointer, Smartphone, Mail } from "lucide-react"
import Footer from "@/components/layout/footer"

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Eye className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Accessibility Statement</h1>
          <p className="text-lg text-muted-foreground">
            We're committed to making our website accessible to everyone, including people with disabilities.
          </p>
          <p className="text-sm text-muted-foreground mt-2">Last updated: December 2024</p>
        </div>

        {/* Our Commitment */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Our Commitment to Accessibility</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Riverdale Safaris is committed to ensuring digital accessibility for people with disabilities. We are
              continually improving the user experience for everyone and applying the relevant accessibility standards.
            </p>
            <p>
              We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards to ensure
              our website is accessible to people with a wide range of disabilities.
            </p>
          </CardContent>
        </Card>

        {/* Accessibility Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-blue-600" />
                Visual Accessibility
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <span className="text-sm">High contrast color schemes</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <span className="text-sm">Scalable text and images</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <span className="text-sm">Alternative text for images</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <span className="text-sm">Clear visual focus indicators</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Keyboard className="w-5 h-5 text-purple-600" />
                Keyboard Navigation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <span className="text-sm">Full keyboard navigation support</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <span className="text-sm">Logical tab order</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <span className="text-sm">Skip navigation links</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <span className="text-sm">Accessible dropdown menus</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-green-600" />
                Screen Reader Support
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <span className="text-sm">Semantic HTML structure</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <span className="text-sm">ARIA labels and descriptions</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <span className="text-sm">Descriptive link text</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <span className="text-sm">Form labels and instructions</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-orange-600" />
                Mobile Accessibility
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <span className="text-sm">Responsive design for all devices</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <span className="text-sm">Touch-friendly interface</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <span className="text-sm">Adequate touch target sizes</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <span className="text-sm">Mobile screen reader compatibility</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Browser Compatibility */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Browser and Assistive Technology Compatibility</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h4 className="font-semibold">Supported Browsers:</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="p-3 border rounded-lg text-center">
                <div className="font-medium">Chrome</div>
                <div className="text-muted-foreground">Latest version</div>
              </div>
              <div className="p-3 border rounded-lg text-center">
                <div className="font-medium">Firefox</div>
                <div className="text-muted-foreground">Latest version</div>
              </div>
              <div className="p-3 border rounded-lg text-center">
                <div className="font-medium">Safari</div>
                <div className="text-muted-foreground">Latest version</div>
              </div>
              <div className="p-3 border rounded-lg text-center">
                <div className="font-medium">Edge</div>
                <div className="text-muted-foreground">Latest version</div>
              </div>
            </div>

            <h4 className="font-semibold">Assistive Technologies:</h4>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>JAWS (Job Access With Speech)</li>
              <li>NVDA (NonVisual Desktop Access)</li>
              <li>VoiceOver (macOS and iOS)</li>
              <li>TalkBack (Android)</li>
              <li>Dragon NaturallySpeaking</li>
              <li>ZoomText</li>
            </ul>
          </CardContent>
        </Card>

        {/* Accessibility Shortcuts */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MousePointer className="w-5 h-5 text-blue-600" />
              Keyboard Shortcuts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm">Skip to main content</span>
                  <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">Tab</kbd>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm">Navigate links/buttons</span>
                  <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">Tab / Shift+Tab</kbd>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm">Activate link/button</span>
                  <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">Enter / Space</kbd>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm">Close modal/dropdown</span>
                  <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">Escape</kbd>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm">Navigate dropdown</span>
                  <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">Arrow Keys</kbd>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm">Zoom in/out</span>
                  <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">Ctrl + / Ctrl -</kbd>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Known Issues */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Known Issues and Limitations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>We are continuously working to improve accessibility. Currently known issues include:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Some third-party embedded content may not be fully accessible</li>
              <li>PDF documents are being updated to meet accessibility standards</li>
              <li>Some older blog posts may not have complete alt text for images</li>
            </ul>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                We are actively working to address these issues and expect to have them resolved in upcoming updates.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Feedback */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-green-600" />
              Accessibility Feedback
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We welcome your feedback on the accessibility of our website. If you encounter any accessibility barriers
              or have suggestions for improvement, please let us know.
            </p>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Contact Information:</h4>
              <p>
                <strong>Email:</strong> accessibility@riverdalekenya.co.ke
              </p>
              <p>
                <strong>Phone:</strong> +254 700 123 456
              </p>
              <p>
                <strong>Response Time:</strong> We aim to respond within 2 business days
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button>Report Accessibility Issue</Button>
              <Button variant="outline">Suggest Improvement</Button>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-800">
                <strong>Thank you</strong> for helping us make our website more accessible for everyone. Your feedback
                is valuable and helps us improve.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
