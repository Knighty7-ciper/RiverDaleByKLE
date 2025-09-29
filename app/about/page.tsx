"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Award, Heart, ArrowLeft, Shield, Star, CheckCircle } from "lucide-react"
import Link from "next/link"
import Footer from "@/components/layout/footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/professional-safari-guides-team-kenya-wildlife-exp.jpg')`,
          }}
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <Link
              href="/"
              className="inline-flex items-center text-amber-300 hover:text-white mb-8 transition-colors font-medium"
            >
              <ArrowLeft className="w-5 h-5 mr-3" />
              Back to Home
            </Link>
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-8 text-balance drop-shadow-2xl">
              About <span className="text-amber-300">Riverdale Safaris</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/95 max-w-4xl mx-auto leading-relaxed drop-shadow-lg">
              Your trusted <strong className="text-amber-300">Kenya based East African Tour Operator</strong> and
              licensed KATO member, crafting authentic safari experiences with 15+ years of expertise since 2009.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10">
              <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                <Shield className="w-6 h-6 text-amber-300" />
                <span className="text-white font-semibold">Licensed KATO Member</span>
              </div>
              <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                <Star className="w-6 h-6 text-amber-300 fill-amber-300" />
                <span className="text-white font-semibold">4.9/5 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="bg-primary/10 text-primary px-6 py-3 text-sm font-medium mb-8 rounded-full">
                Our Heritage
              </Badge>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-8 text-balance">
                Rooted in Kenya's Rich Safari Heritage
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Founded in 2009 by passionate Kenyan safari experts, Riverdale Safaris was born from a profound
                belief: that Kenya's extraordinary wildlife and cultural treasures deserve to be shared with the world
                through authentic, sustainable, and deeply meaningful experiences.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                What began as a small local tour company has evolved into Kenya's premier safari experience provider,
                proudly serving over 5,000 satisfied travelers from across the globe. We specialize in crafting
                personalized safari adventures, pristine beach getaways, challenging mountain expeditions, and immersive
                cultural encounters.
              </p>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                Our deep local knowledge, unwavering commitment to sustainable tourism, and passion for exceptional
                service have earned us recognition as a fully licensed KATO member and one of Kenya's most trusted
                travel companies.
              </p>

              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="text-foreground font-medium">
                    Licensed Kenya Association of Tour Operators (KATO) Member
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="text-foreground font-medium">15+ Years of Safari Excellence in East Africa</span>
                </div>
                <div className="flex items-center gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="text-foreground font-medium">5000+ Satisfied Travelers from Around the World</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button className="luxury-button text-white px-8 py-4 text-lg font-semibold rounded-xl">
                    Plan Your Safari
                  </Button>
                </Link>
                <Link href="/destinations">
                  <Button
                    variant="outline"
                    className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg font-semibold rounded-xl bg-transparent"
                  >
                    View Destinations
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="luxury-card rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/maasai-mara-safari.png"
                  alt="Riverdale Safari team with clients"
                  className="w-full h-[600px] object-cover"
                />
              </div>
              <Badge className="absolute top-6 right-6 bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold rounded-full">
                Since 2009
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 section-luxury">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="bg-primary text-primary-foreground px-6 py-3 text-sm font-medium mb-8 rounded-full">
              Our Core Values
            </Badge>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-8 text-balance">
              What Drives Our Safari Excellence
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              These fundamental values guide every safari experience we create and shape our commitment to authentic,
              sustainable, and transformative travel in Kenya.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="luxury-card rounded-3xl p-10 text-center transition-all duration-500 hover:scale-105">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <Heart className="w-10 h-10 text-primary" />
              </div>
              <h3 className="font-serif text-2xl font-semibold mb-6 text-foreground">Authentic Experiences</h3>
              <p className="text-muted-foreground leading-relaxed">
                We create genuine connections between travelers and Kenya's people, wildlife, and breathtaking
                landscapes through immersive cultural encounters.
              </p>
            </div>

            <div className="luxury-card rounded-3xl p-10 text-center transition-all duration-500 hover:scale-105">
              <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <MapPin className="w-10 h-10 text-secondary" />
              </div>
              <h3 className="font-serif text-2xl font-semibold mb-6 text-foreground">Sustainable Tourism</h3>
              <p className="text-muted-foreground leading-relaxed">
                We're deeply committed to protecting Kenya's pristine environment and empowering local communities
                through responsible tourism practices.
              </p>
            </div>

            <div className="luxury-card rounded-3xl p-10 text-center transition-all duration-500 hover:scale-105">
              <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <Users className="w-10 h-10 text-accent" />
              </div>
              <h3 className="font-serif text-2xl font-semibold mb-6 text-foreground">Expert Guidance</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our passionate local guides are wildlife experts and cultural ambassadors who bring Kenya's incredible
                stories to life with encyclopedic knowledge.
              </p>
            </div>

            <div className="luxury-card rounded-3xl p-10 text-center transition-all duration-500 hover:scale-105">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <Award className="w-10 h-10 text-primary" />
              </div>
              <h3 className="font-serif text-2xl font-semibold mb-6 text-foreground">Safari Excellence</h3>
              <p className="text-muted-foreground leading-relaxed">
                We pursue perfection in every detail of your safari journey, from initial planning to final farewell,
                ensuring unforgettable memories.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="bg-primary/10 text-primary px-6 py-3 text-sm font-medium mb-8 rounded-full">
              Meet Our Safari Experts
            </Badge>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-8 text-balance">
              The Passionate Team Behind Your Adventure
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Our experienced team of safari professionals and local wildlife experts are dedicated to making your
              Kenyan adventure extraordinary and unforgettable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="luxury-card rounded-3xl overflow-hidden transition-all duration-500 hover:scale-105">
              <div className="h-80 luxury-gradient flex items-center justify-center">
                <Users className="w-24 h-24 text-white" />
              </div>
              <div className="p-8">
                <h3 className="font-serif text-2xl font-semibold mb-3 text-foreground">Samuel Kiprotich</h3>
                <p className="text-primary font-semibold mb-4 text-lg">Founder & CEO</p>
                <p className="text-muted-foreground leading-relaxed">
                  With over 15 years in Kenya's tourism industry, Samuel founded Riverdale Safaris to share his
                  deep passion for Kenya's extraordinary natural wonders and rich cultural heritage.
                </p>
              </div>
            </div>

            <div className="luxury-card rounded-3xl overflow-hidden transition-all duration-500 hover:scale-105">
              <div className="h-80 luxury-gradient flex items-center justify-center">
                <MapPin className="w-24 h-24 text-white" />
              </div>
              <div className="p-8">
                <h3 className="font-serif text-2xl font-semibold mb-3 text-foreground">Grace Wanjiku</h3>
                <p className="text-primary font-semibold mb-4 text-lg">Head of Operations</p>
                <p className="text-muted-foreground leading-relaxed">
                  Grace ensures every safari runs flawlessly, coordinating with our trusted network of expert guides,
                  professional drivers, and premium accommodation partners across Kenya.
                </p>
              </div>
            </div>

            <div className="luxury-card rounded-3xl overflow-hidden transition-all duration-500 hover:scale-105">
              <div className="h-80 luxury-gradient flex items-center justify-center">
                <Award className="w-24 h-24 text-white" />
              </div>
              <div className="p-8">
                <h3 className="font-serif text-2xl font-semibold mb-3 text-foreground">David Mwangi</h3>
                <p className="text-primary font-semibold mb-4 text-lg">Senior Safari Guide</p>
                <p className="text-muted-foreground leading-relaxed">
                  A renowned wildlife expert with 12 years of guiding experience, David brings Kenya's diverse
                  ecosystems to life with his encyclopedic knowledge and infectious passion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 section-luxury-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="bg-primary text-primary-foreground px-6 py-3 text-sm font-medium mb-8 rounded-full">
              Our Safari Impact
            </Badge>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-8 text-balance">
              Numbers That Reflect Our Excellence
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              These achievements reflect our unwavering commitment to safari excellence and sustainable tourism
              throughout Kenya and East Africa.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            <div className="text-center">
              <div className="font-serif text-5xl md:text-6xl font-bold text-primary mb-4">5,000+</div>
              <p className="text-muted-foreground text-lg font-medium">Happy Safari Travelers</p>
            </div>
            <div className="text-center">
              <div className="font-serif text-5xl md:text-6xl font-bold text-secondary mb-4">15+</div>
              <p className="text-muted-foreground text-lg font-medium">Years of Safari Excellence</p>
            </div>
            <div className="text-center">
              <div className="font-serif text-5xl md:text-6xl font-bold text-accent mb-4">50+</div>
              <p className="text-muted-foreground text-lg font-medium">Kenya Destinations</p>
            </div>
            <div className="text-center">
              <div className="font-serif text-5xl md:text-6xl font-bold text-primary mb-4">4.9</div>
              <p className="text-muted-foreground text-lg font-medium">Average Safari Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 luxury-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-8 text-balance">
            Ready to Discover Kenya with Our Expert Team?
          </h2>
          <p className="text-xl text-white/95 mb-12 leading-relaxed">
            Let our experienced safari professionals create an unforgettable Kenyan adventure tailored perfectly to your
            dreams and interests.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 px-10 py-4 text-lg font-semibold rounded-xl shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Start Planning Your Safari
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-primary px-10 py-4 text-lg font-semibold bg-white/10 rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-105"
              >
                Contact Our Safari Experts
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
