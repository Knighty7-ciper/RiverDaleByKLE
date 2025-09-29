import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dessert as Passport, Clock, DollarSign, FileText, AlertCircle, CheckCircle, ExternalLink } from "lucide-react"
import Footer from "@/components/layout/footer"

export default function VisaInfoPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Passport className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Kenya Visa Information</h1>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about visa requirements for visiting Kenya.
          </p>
        </div>

        {/* Visa Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-800">Recommended</Badge>
                eVisa (Electronic Visa)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="text-sm">Processing: 2-7 business days</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span className="text-sm">Cost: $51 USD</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-purple-600" />
                <span className="text-sm">Valid: 90 days from issue date</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Apply online before travel. Most convenient option for tourists.
              </p>
              <Button className="w-full">
                Apply for eVisa <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Visa on Arrival</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="text-sm">Processing: At airport (30-60 mins)</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span className="text-sm">Cost: $51 USD</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span className="text-sm">May involve longer queues</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Available at major airports and border crossings. Cash payment required.
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded p-3">
                <p className="text-xs text-amber-700">Note: eVisa is recommended to avoid airport delays</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Visa-Free Countries */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Visa-Free Entry
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Citizens of the following countries can enter Kenya without a visa for up to 90 days:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
              <div>• Barbados</div>
              <div>• Botswana</div>
              <div>• Cyprus</div>
              <div>• Dominica</div>
              <div>• Ethiopia</div>
              <div>• Fiji</div>
              <div>• Gambia</div>
              <div>• Ghana</div>
              <div>• Grenada</div>
              <div>• Jamaica</div>
              <div>• Lesotho</div>
              <div>• Malawi</div>
              <div>• Malaysia</div>
              <div>• Mauritius</div>
              <div>• Namibia</div>
              <div>• Rwanda</div>
              <div>• Seychelles</div>
              <div>• Sierra Leone</div>
              <div>• Singapore</div>
              <div>• South Africa</div>
              <div>• Swaziland</div>
              <div>• Tanzania</div>
              <div>• Trinidad & Tobago</div>
              <div>• Turkey</div>
              <div>• Uganda</div>
              <div>• Zambia</div>
              <div>• Zimbabwe</div>
            </div>
          </CardContent>
        </Card>

        {/* Requirements */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Visa Application Requirements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-semibold mb-3">Required Documents:</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <span className="text-sm">Passport valid for at least 6 months from entry date</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <span className="text-sm">Passport-size digital photograph (recent)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <span className="text-sm">Return/onward flight ticket</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <span className="text-sm">Proof of accommodation (hotel booking/invitation letter)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <span className="text-sm">Proof of sufficient funds ($500+ recommended)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <span className="text-sm">Yellow fever vaccination certificate (if coming from endemic areas)</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Additional Requirements for Some Nationalities:</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5" />
                  <span className="text-sm">Letter of invitation (if visiting friends/family)</span>
                </div>
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5" />
                  <span className="text-sm">Bank statements (last 3 months)</span>
                </div>
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5" />
                  <span className="text-sm">Travel itinerary</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* East Africa Tourist Visa */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge className="bg-purple-100 text-purple-800">Special Offer</Badge>
              East Africa Tourist Visa
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Perfect for travelers visiting multiple East African countries:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium mb-2">Coverage:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Kenya</li>
                  <li>• Uganda</li>
                  <li>• Rwanda</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium mb-2">Benefits:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Valid for 90 days</li>
                  <li>• Multiple entries</li>
                  <li>• Cost: $100 USD</li>
                </ul>
              </div>
            </div>
            <Button variant="outline" className="w-full bg-transparent">
              Learn More About EAC Visa <ExternalLink className="w-3 h-3 ml-1" />
            </Button>
          </CardContent>
        </Card>

        {/* Important Tips */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Important Tips</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Apply Early</h4>
              <p className="text-blue-700 text-sm">
                Apply for your eVisa at least 7 days before travel to avoid any delays.
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">Print Your eVisa</h4>
              <p className="text-green-700 text-sm">
                Always carry a printed copy of your eVisa approval. Digital copies may not be accepted.
              </p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h4 className="font-semibold text-amber-800 mb-2">Check Passport Validity</h4>
              <p className="text-amber-700 text-sm">
                Ensure your passport has at least 2 blank pages and is valid for 6+ months.
              </p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-800 mb-2">Yellow Fever Requirement</h4>
              <p className="text-red-700 text-sm">
                Vaccination required if traveling from yellow fever endemic countries. Check current requirements.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact for Help */}
        <Card>
          <CardHeader>
            <CardTitle>Need Visa Assistance?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Our team can help guide you through the visa application process and answer any questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button>Contact Visa Support</Button>
              <Button variant="outline">Download Visa Checklist</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
