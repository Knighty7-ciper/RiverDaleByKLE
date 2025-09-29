"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, ZoomIn, Camera, ArrowLeft } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import Link from "next/link"
import Footer from "@/components/layout/footer"

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("All")

  // API-driven gallery
  const [galleryImages, setGalleryImages] = useState<Array<{ id: string; src: string; alt: string; category?: string; title?: string; description?: string }>>([])

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/destinations?limit=50")
        const json = await res.json()
        const rows = (json.destinations || []) as any[]
        setGalleryImages(
          rows.map((d: any) => ({
            id: d.id,
            src: d.image_url,
            alt: d.name,
            category: d.category,
            title: d.name,
            description: d.description || "",
          })),
        )
      } catch (e) {
        setGalleryImages([])
      }
    }
    load()
  }, [])

  const categories = ["All", "Safari", "Beach", "Adventure", "Culture", "Wildlife"]

  const filteredImages = galleryImages.filter(
    (image) => selectedCategory === "All" || image.category === selectedCategory,
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/african-lion-pride-golden-hour.jpg')`,
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
              East Africa Safari <span className="text-amber-300">Gallery</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/95 max-w-4xl mx-auto leading-relaxed drop-shadow-lg mb-12">
              Explore the breathtaking beauty of East Africa through our curated collection of professional safari
              photography, showcasing the incredible wildlife, stunning landscapes, and rich cultural heritage across East
              Africa.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                <Camera className="w-6 h-6 text-amber-300" />
                <span className="text-white font-semibold">500+ Photos</span>
              </div>
              <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                <ZoomIn className="w-6 h-6 text-amber-300" />
                <span className="text-white font-semibold">Professional Quality</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Category Filters */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <Badge className="bg-primary/10 text-primary px-6 py-3 text-sm font-medium mb-6 rounded-full">
              Photo Categories
            </Badge>
            <h2 className="font-serif text-3xl font-bold text-foreground mb-4">Discover Kenya Through Our Lens</h2>
            <p className="text-muted-foreground text-lg">
              Filter by category to explore specific aspects of Kenya's natural beauty and cultural richness
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="lg"
                onClick={() => setSelectedCategory(category)}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? "luxury-button text-white shadow-lg scale-105"
                    : "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground hover:scale-105"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-muted-foreground text-lg">
            Showing <span className="font-semibold text-foreground">{filteredImages.length}</span> photos
            {selectedCategory !== "All" && (
              <span>
                {" "}
                in <span className="font-semibold text-primary">{selectedCategory}</span> category
              </span>
            )}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="luxury-card rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-105 shadow-xl"
              onClick={() => setSelectedImage(image.src)}
            >
              <div className="relative group aspect-square overflow-hidden">
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <ZoomIn className="h-12 w-12 text-white transform scale-75 group-hover:scale-100 transition-transform duration-300" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <Badge className="mb-3 bg-primary text-primary-foreground px-3 py-1 rounded-full font-semibold">
                    {image.category}
                  </Badge>
                  <h3 className="text-white font-serif text-xl font-bold mb-2 drop-shadow-lg">{image.title}</h3>
                  <p className="text-white/90 text-sm leading-relaxed drop-shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {image.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <section className="luxury-gradient rounded-3xl p-12 md:p-16 text-center text-white shadow-2xl">
          <Camera className="w-16 h-16 text-white/80 mx-auto mb-8" />
          <h3 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-balance">
            Ready to Create Your Own Safari Memories?
          </h3>
          <p className="text-xl mb-10 text-white/95 max-w-4xl mx-auto leading-relaxed">
            Join us on an unforgettable Kenya safari adventure and capture your own stunning photographs of Africa's
            incredible wildlife and landscapes.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/destinations">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 px-10 py-4 text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
              >
                <Camera className="w-5 h-5 mr-3" />
                Book Your Safari
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-primary px-10 py-4 text-lg font-semibold bg-white/10 rounded-xl backdrop-blur-sm transition-all duration-300"
              >
                Plan Custom Trip
              </Button>
            </Link>
          </div>
        </section>

        {/* Image Modal */}
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-6xl w-full p-0 bg-transparent border-none">
            <div className="relative">
              <Button
                variant="ghost"
                size="lg"
                className="absolute top-6 right-6 z-10 bg-black/70 text-white hover:bg-black/90 rounded-full w-12 h-12 p-0"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-6 w-6" />
              </Button>
              {selectedImage && (
                <div className="luxury-card rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={selectedImage || "/placeholder.svg"}
                    alt="Gallery image"
                    className="w-full h-auto max-h-[85vh] object-contain"
                  />
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Footer />
    </div>
  )
}
