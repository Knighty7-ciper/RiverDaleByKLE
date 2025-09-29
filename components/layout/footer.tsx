"use client"

import Link from "next/link"
import { MapPin, Phone, Mail, Star, Facebook, Twitter, Instagram, Youtube, CreditCard, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-amber-900 via-orange-900 to-amber-950 text-white">
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 via-orange-400 to-amber-500 rounded-xl flex items-center justify-center shadow-lg border-2 border-amber-300">
                  <svg viewBox="0 0 24 24" className="w-10 h-10 text-white" fill="currentColor">
                    <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-3xl font-serif font-bold text-amber-300">Riverdale Safaris</h3>
                  <p className="text-amber-200 font-medium">Luxury Safari Experiences</p>
                </div>
              </div>

              <p className="text-amber-100 mb-8 leading-relaxed text-lg">
                Your trusted partner for authentic East African adventures. From the Maasai Mara and Serengeti to the
                Indian Ocean coast, we create unforgettable experiences that showcase the region's natural beauty and
                rich cultural heritage.
              </p>

              <div className="flex items-center gap-3 text-amber-300 mb-8 p-4 bg-amber-800/30 rounded-lg border border-amber-700">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="font-semibold text-lg">4.9/5 from 5000+ travelers</span>
              </div>

              <div className="mb-8">
                <h4 className="font-serif text-xl font-semibold mb-4 text-amber-300">Stay Updated</h4>
                <p className="text-amber-200 mb-4 leading-relaxed">
                  Get travel tips, exclusive deals, and East Africa insights
                </p>
                <div className="flex gap-3">
                  <Input
                    placeholder="Enter your email"
                    className="bg-amber-800/50 border-2 border-amber-600 text-white placeholder-amber-300 focus:border-amber-400 h-12"
                  />
                  <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 h-12 font-semibold shadow-lg">
                    Subscribe
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="font-serif text-xl font-semibold mb-4 text-amber-300">Follow Our Safari Journey</h4>
                <div className="flex gap-4">
                  <Link
                  href="https://facebook.com"
                  target="_blank" rel="noopener noreferrer"
                  className="w-12 h-12 bg-gradient-to-br from-amber-700 to-orange-700 hover:from-amber-600 hover:to-orange-600 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
                >
                  <Facebook className="w-6 h-6" />
                  </Link>
                  <Link
                  href="https://instagram.com"
                  target="_blank" rel="noopener noreferrer"
                  className="w-12 h-12 bg-gradient-to-br from-amber-700 to-orange-700 hover:from-amber-600 hover:to-orange-600 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
                >
                  <Instagram className="w-6 h-6" />
                  </Link>
                  <Link
                  href="https://twitter.com"
                  target="_blank" rel="noopener noreferrer"
                  className="w-12 h-12 bg-gradient-to-br from-amber-700 to-orange-700 hover:from-amber-600 hover:to-orange-600 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
                >
                  <Twitter className="w-6 h-6" />
                  </Link>
                  <Link
                  href="https://youtube.com"
                  target="_blank" rel="noopener noreferrer"
                  className="w-12 h-12 bg-gradient-to-br from-amber-700 to-orange-700 hover:from-amber-600 hover:to-orange-600 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
                >
                  <Youtube className="w-6 h-6" />
                  </Link>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-serif text-xl font-semibold mb-6 text-amber-300">Explore East Africa</h4>
              <ul className="space-y-4 text-amber-100">
                <li>
                  <Link
                    href="/destinations"
                    className="hover:text-amber-300 transition-colors text-base font-medium hover:pl-2 transition-all duration-200"
                  >
                    Safari Destinations
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hotels"
                    className="hover:text-amber-300 transition-colors text-base font-medium hover:pl-2 transition-all duration-200"
                  >
                    Luxury Hotels
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-amber-300 transition-colors text-base font-medium hover:pl-2 transition-all duration-200"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/gallery"
                    className="hover:text-amber-300 transition-colors text-base font-medium hover:pl-2 transition-all duration-200"
                  >
                    Photo Gallery
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="hover:text-amber-300 transition-colors text-base font-medium hover:pl-2 transition-all duration-200"
                  >
                    Travel Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/reviews"
                    className="hover:text-amber-300 transition-colors text-base font-medium hover:pl-2 transition-all duration-200"
                  >
                    Customer Reviews
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-xl font-semibold mb-6 text-amber-300">Safari Support</h4>
              <ul className="space-y-4 text-amber-100">
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-amber-300 transition-colors text-base font-medium hover:pl-2 transition-all duration-200"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/support"
                    className="hover:text-amber-300 transition-colors text-base font-medium hover:pl-2 transition-all duration-200"
                  >
                    Help & FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/booking-help"
                    className="hover:text-amber-300 transition-colors text-base font-medium hover:pl-2 transition-all duration-200"
                  >
                    Booking Assistance
                  </Link>
                </li>
                <li>
                  <Link
                    href="/travel-insurance"
                    className="hover:text-amber-300 transition-colors text-base font-medium hover:pl-2 transition-all duration-200"
                  >
                    Travel Insurance
                  </Link>
                </li>
                <li>
                  <Link
                    href="/visa-info"
                    className="hover:text-amber-300 transition-colors text-base font-medium hover:pl-2 transition-all duration-200"
                  >
                    Visa Information
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-amber-300 transition-colors text-base font-medium hover:pl-2 transition-all duration-200"
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-amber-300 transition-colors text-base font-medium hover:pl-2 transition-all duration-200"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-xl font-semibold mb-6 text-amber-300">Contact Info</h4>

              {/* Main Office */}
              <div className="mb-6 p-5 bg-amber-800/40 rounded-xl border border-amber-600/50 shadow-lg backdrop-blur-sm">
                <h5 className="font-semibold text-amber-200 mb-4 text-lg flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-amber-400" />
                  Main Office
                </h5>
                <div className="space-y-3 text-amber-100">
                  <p className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-amber-400 mt-1 flex-shrink-0" />
                    <span className="leading-relaxed text-sm">
                      Westlands, Nairobi
                      <br />
                      Kenya
                    </span>
                  </p>
                  <p className="flex items-center gap-3 min-w-0">
                    <Phone className="w-4 h-4 text-amber-400" />
                    <span className="font-medium text-sm">+254 700 123 456</span>
                  </p>
                  <p className="flex items-center gap-3 min-w-0">
                    <Mail className="w-4 h-4 text-amber-400" />
                    <span className="font-medium text-sm break-words">bknglabs.dev@gmails.com</span>
                  </p>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="mb-6 p-5 bg-red-900/40 rounded-xl border border-red-600/50 shadow-lg backdrop-blur-sm">
                <h5 className="font-semibold text-red-200 mb-4 text-lg flex items-center gap-2">
                  <Phone className="w-5 h-5 text-red-400" />
                  24/7 Emergency
                </h5>
                <div className="space-y-3 text-red-100">
                  <p className="flex items-center gap-3 min-w-0">
                    <Phone className="w-4 h-4 text-red-400" />
                    <span className="font-bold text-lg">+254 722 000 911</span>
                  </p>
                  <p className="text-sm text-red-200">Available during your safari</p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="p-5 bg-amber-800/40 rounded-xl border border-amber-600/50 shadow-lg backdrop-blur-sm">
                <h5 className="font-semibold text-amber-200 mb-4 text-lg">Business Hours</h5>
                <div className="text-amber-100 space-y-2 text-sm">
                  <p className="font-medium">Mon - Fri: 8:00 AM - 6:00 PM</p>
                  <p className="font-medium">Sat: 9:00 AM - 4:00 PM</p>
                  <p className="font-medium">Sun: 10:00 AM - 2:00 PM</p>
                  <p className="text-amber-300 font-semibold mt-3">WhatsApp support 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t-2 border-amber-800 py-10 bg-amber-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Certifications */}
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3 text-amber-200 p-3 bg-amber-800/30 rounded-lg border border-amber-700">
                <Shield className="w-6 h-6 text-green-400" />
                <span className="font-semibold">Licensed Tour Operator</span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-6">
              <span className="text-amber-300 font-semibold">We Accept:</span>
              <div className="flex items-center gap-4">
                <div className="w-10 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold shadow-md">
                  VISA
                </div>
                <div className="w-10 h-6 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold shadow-md">
                  MC
                </div>
                <div className="w-10 h-6 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold shadow-md">
                  M-PESA
                </div>
                <CreditCard className="w-6 h-6 text-amber-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t-2 border-amber-800 py-8 bg-amber-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-amber-200 font-medium">
              &copy; 2025 Riverdale Safaris. All rights reserved. | License No: KTB/OP/000123
            </p>
            <div className="flex items-center gap-6 text-amber-200">
              <Link href="/sitemap" className="hover:text-amber-300 transition-colors font-medium">
                Sitemap
              </Link>
              <span className="text-amber-600">|</span>
              <Link href="/accessibility" className="hover:text-amber-300 transition-colors font-medium">
                Accessibility
              </Link>
              <span className="text-amber-600">|</span>
              <Link href="/cookies" className="hover:text-amber-300 transition-colors font-medium">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
