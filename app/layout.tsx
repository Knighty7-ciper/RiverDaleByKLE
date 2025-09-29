import type React from "react"
import type { Metadata, Viewport } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import ConditionalHeader from "@/components/layout/conditional-header"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css"

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Riverdale Safaris - Luxury East Africa Safari Experts",
  description:
    "Experience East Africa's finest safari adventures with Riverdale Safaris. Luxury safaris, beach holidays, and mountain adventures across Kenya, Tanzania, Uganda, and Rwanda. 15+ years of expertise.",
  generator: "v0.app",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#d97706",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Riverdale Safaris",
    url: process.env.NEXT_PUBLIC_SITE_URL || "",
    logo: "/placeholder-logo.svg",
    areaServed: ["Kenya", "Tanzania", "Uganda", "Rwanda"],
    sameAs: [],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Westlands",
      addressRegion: "Nairobi",
      addressCountry: "KE",
    },
    telephone: "+254 700 123 456",
  }
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Riverdale Safaris",
    url: process.env.NEXT_PUBLIC_SITE_URL || "",
    potentialAction: {
      "@type": "SearchAction",
      target: `${process.env.NEXT_PUBLIC_SITE_URL || ""}/search?q={query}`,
      "query-input": "required name=query",
    },
  }
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${inter.variable} antialiased`}>
      <body className="font-sans bg-background">
        <ConditionalHeader />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
