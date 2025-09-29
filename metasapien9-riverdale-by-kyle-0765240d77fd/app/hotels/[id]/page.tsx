"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Star,
  MapPin,
  Clock,
  Phone,
  Mail,
  Shield,
  Award,
  Heart,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Wifi,
  Car,
  Utensils,
  Waves,
  Dumbbell,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const hotels = {
  "diani-beach-resort": {
    id: "diani-beach-resort",
    name: "Diani Beach Resort & Spa",
    location: "Diani Beach, Kwale County, Kenya",
    rating: 4.8,
    reviews: 342,
    originalPrice: 35900,
    currentPrice: 29900,
    savings: 6000,
    category: "Beach Resort",
    checkIn: "2:00 PM",
    checkOut: "11:00 AM",
    images: [
      "/diani-beach-kenya.png",
      "/placeholder.svg?height=400&width=600&text=Resort+Pool",
      "/placeholder.svg?height=400&width=600&text=Beach+View",
      "/placeholder.svg?height=400&width=600&text=Spa+Facilities",
      "/placeholder.svg?height=400&width=600&text=Restaurant",
    ],
    description:
      "A luxury beachfront resort offering pristine white sand beaches, crystal-clear waters, and world-class amenities. Perfect for relaxation after your safari adventure or as a romantic getaway destination with award-winning spa services and multiple dining options.",
    highlights: [
      "Private beach access",
      "Award-winning spa services",
      "Multiple dining options",
      "Water sports center",
      "Coral reef snorkeling",
      "Sunset dhow cruises",
      "Family-friendly facilities",
      "Airport transfers included",
    ],
    amenities: [
      "Private Beach Access",
      "Spa Services",
      "Swimming Pool",
      "Water Sports",
      "Fine Dining",
      "WiFi",
      "Airport Transfers",
      "Fitness Center",
      "Kids Club",
      "Conference Facilities",
    ],
    roomTypes: [
      {
        type: "Ocean View Suite",
        size: "65 sqm",
        occupancy: "2 adults + 1 child",
        price: 29900,
        amenities: ["King bed", "Ocean balcony", "Mini bar", "Air conditioning", "Room service"],
      },
      {
        type: "Beach Villa",
        size: "120 sqm",
        occupancy: "4 adults + 2 children",
        price: 45900,
        amenities: ["2 bedrooms", "Private terrace", "Kitchenette", "Living area", "Butler service"],
      },
      {
        type: "Presidential Suite",
        size: "200 sqm",
        occupancy: "6 adults",
        price: 89900,
        amenities: ["3 bedrooms", "Private pool", "Butler service", "Panoramic views", "Dining room"],
      },
    ],
    inclusions: [
      "Beachfront resort accommodation",
      "Daily breakfast buffet",
      "Water sports equipment",
      "Snorkeling gear and guide",
      "Sunset dhow cruise (once per stay)",
      "Kids club activities",
      "WiFi throughout resort",
      "Airport transfers",
      "Welcome drink on arrival",
    ],
    exclusions: [
      "International flights",
      "Lunch and dinner (available à la carte)",
      "Alcoholic beverages",
      "Spa treatments",
      "Scuba diving courses",
      "Tips and gratuities",
      "Travel insurance",
      "Personal expenses",
    ],
    nearbyAttractions: [
      "Shimba Hills National Reserve (30 min)",
      "Colobus Conservation (15 min)",
      "Kongo Mosque (20 min)",
      "Diani Beach Art Gallery (10 min)",
      "Jadini Forest (25 min)",
    ],
    faq: [
      {
        question: "Is the beach private?",
        answer:
          "Yes, we have exclusive access to a pristine stretch of Diani Beach with dedicated beach staff and complimentary sun loungers and umbrellas.",
      },
      {
        question: "What water sports are included?",
        answer:
          "Complimentary kayaking, windsurfing, and snorkeling equipment. Jet skiing, parasailing, and deep-sea fishing are available at additional cost.",
      },
      {
        question: "Is the resort family-friendly?",
        answer:
          "We have a kids club, family rooms, children's pool, and special children's menus. Children under 12 stay free when sharing with parents.",
      },
      {
        question: "How far is the resort from the airport?",
        answer:
          "We're 45 minutes from Ukunda Airstrip and 1.5 hours from Moi International Airport in Mombasa. Complimentary transfers are included.",
      },
    ],
    reviews: [
      {
        name: "Lisa Anderson",
        rating: 5,
        date: "1 week ago",
        comment:
          "Perfect beach getaway! The resort was amazing and the water sports were so much fun. The sunset cruise was magical and the spa treatments were world-class!",
        verified: true,
      },
      {
        name: "James Wilson",
        rating: 5,
        date: "3 weeks ago",
        comment:
          "Best beach holiday ever! Crystal clear waters, white sand, and excellent service. The kids club kept our children entertained while we relaxed.",
        verified: true,
      },
      {
        name: "Sarah Mitchell",
        rating: 4,
        date: "1 month ago",
        comment:
          "Beautiful resort with great facilities. The beach is pristine and the food was excellent. Only minor issue was some noise from construction nearby.",
        verified: true,
      },
    ],
  },
  "nairobi-serena-hotel": {
    id: "nairobi-serena-hotel",
    name: "Nairobi Serena Hotel",
    location: "Central Nairobi, Kenya",
    rating: 4.6,
    reviews: 567,
    originalPrice: 22900,
    currentPrice: 18900,
    savings: 4000,
    category: "City Hotel",
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    images: [
      "/placeholder.svg?height=400&width=600&text=Nairobi+Serena+Hotel",
      "/placeholder.svg?height=400&width=600&text=Hotel+Lobby",
      "/placeholder.svg?height=400&width=600&text=Executive+Room",
      "/placeholder.svg?height=400&width=600&text=Restaurant",
      "/placeholder.svg?height=400&width=600&text=Conference+Room",
    ],
    description:
      "An elegant city hotel blending modern luxury with African heritage. Located in the heart of Nairobi, it offers easy access to the city's attractions while providing a peaceful retreat from urban bustle with award-winning cuisine and business facilities.",
    highlights: [
      "Central Nairobi location",
      "African-inspired design",
      "Award-winning cuisine",
      "Business facilities",
      "Cultural performances",
      "City tour arrangements",
      "Executive lounge access",
      "24-hour room service",
    ],
    amenities: [
      "Business Center",
      "Fitness Center",
      "Swimming Pool",
      "Conference Facilities",
      "Restaurant",
      "Bar",
      "WiFi",
      "Concierge",
      "Room Service",
      "Laundry Service",
    ],
    roomTypes: [
      {
        type: "Standard Room",
        size: "32 sqm",
        occupancy: "2 adults",
        price: 18900,
        amenities: ["Queen bed", "City view", "Work desk", "Air conditioning", "Mini bar"],
      },
      {
        type: "Executive Room",
        size: "40 sqm",
        occupancy: "2 adults + 1 child",
        price: 25900,
        amenities: [
          "King bed",
          "Sitting area",
          "Executive lounge access",
          "Premium amenities",
          "Complimentary breakfast",
        ],
      },
      {
        type: "Presidential Suite",
        size: "150 sqm",
        occupancy: "4 adults",
        price: 65900,
        amenities: ["2 bedrooms", "Living room", "Dining area", "Butler service", "Private balcony"],
      },
    ],
    inclusions: [
      "Daily breakfast",
      "WiFi throughout hotel",
      "Airport shuttle service",
      "Fitness center access",
      "Swimming pool access",
      "24-hour room service",
      "Concierge services",
      "Business center access",
      "Welcome amenities",
    ],
    exclusions: [
      "International flights",
      "Lunch and dinner",
      "Alcoholic beverages",
      "Spa treatments",
      "City tours",
      "Tips and gratuities",
      "Travel insurance",
      "Personal expenses",
    ],
    nearbyAttractions: [
      "Nairobi National Park (20 min)",
      "Karen Blixen Museum (30 min)",
      "Giraffe Centre (25 min)",
      "National Museum (15 min)",
      "Uhuru Park (10 min)",
    ],
    faq: [
      {
        question: "How close is the hotel to the airport?",
        answer:
          "We're 45 minutes from Jomo Kenyatta International Airport. We provide complimentary shuttle service with advance booking.",
      },
      {
        question: "Do you have business facilities?",
        answer:
          "Yes, we have a 24-hour business center, multiple meeting rooms, and conference facilities for up to 500 people.",
      },
      {
        question: "Can you arrange city tours?",
        answer:
          "Our concierge can arrange various city tours including Nairobi National Park, Karen Blixen Museum, and cultural experiences.",
      },
      {
        question: "Is there a fitness center?",
        answer: "Yes, we have a fully equipped fitness center and swimming pool available 24/7 for hotel guests.",
      },
    ],
    reviews: [
      {
        name: "Michael Chen",
        rating: 5,
        date: "2 weeks ago",
        comment:
          "Excellent business hotel in the heart of Nairobi. Great service, comfortable rooms, and the restaurant serves amazing local and international cuisine.",
        verified: true,
      },
      {
        name: "Emma Thompson",
        rating: 4,
        date: "1 month ago",
        comment:
          "Perfect location for exploring Nairobi. The staff were very helpful in arranging tours and the executive lounge was a nice touch.",
        verified: true,
      },
    ],
  },
  "mara-safari-lodge": {
    id: "mara-safari-lodge",
    name: "Mara Safari Lodge",
    location: "Maasai Mara National Reserve, Kenya",
    rating: 4.9,
    reviews: 234,
    originalPrice: 54900,
    currentPrice: 44900,
    savings: 10000,
    category: "Safari Lodge",
    checkIn: "2:00 PM",
    checkOut: "11:00 AM",
    images: [
      "/placeholder.svg?height=400&width=600&text=Mara+Safari+Lodge",
      "/placeholder.svg?height=400&width=600&text=Safari+Tent",
      "/placeholder.svg?height=400&width=600&text=Game+Drive",
      "/placeholder.svg?height=400&width=600&text=Maasai+Village",
      "/placeholder.svg?height=400&width=600&text=Sunset+Deck",
    ],
    description:
      "An authentic safari lodge overlooking the Maasai Mara, offering front-row seats to the greatest wildlife show on earth. Experience luxury in the wilderness with unparalleled game viewing from your room and expert Maasai guides.",
    highlights: [
      "Prime Mara location",
      "Wildlife viewing from rooms",
      "Expert safari guides",
      "Cultural experiences",
      "Luxury tented accommodation",
      "All meals included",
      "Game drives included",
      "Maasai village visits",
    ],
    amenities: [
      "Game Viewing Deck",
      "Safari Drives",
      "Cultural Visits",
      "Bush Dining",
      "Spa Treatments",
      "WiFi",
      "All Meals Included",
      "Bar & Lounge",
      "Gift Shop",
      "Laundry Service",
    ],
    roomTypes: [
      {
        type: "Safari Tent",
        size: "45 sqm",
        occupancy: "2 adults",
        price: 44900,
        amenities: ["King bed", "Private deck", "River view", "En-suite bathroom", "Safari furniture"],
      },
      {
        type: "Family Tent",
        size: "65 sqm",
        occupancy: "2 adults + 2 children",
        price: 65900,
        amenities: ["2 bedrooms", "Shared deck", "Game viewing area", "Family bathroom", "Connecting rooms"],
      },
      {
        type: "Luxury Suite",
        size: "85 sqm",
        occupancy: "2 adults",
        price: 89900,
        amenities: [
          "Separate living area",
          "Private butler",
          "Premium location",
          "Champagne service",
          "Private game drives",
        ],
      },
    ],
    inclusions: [
      "Luxury tented accommodation",
      "All meals (breakfast, lunch, dinner)",
      "Two game drives daily",
      "Professional safari guide",
      "Park entrance fees",
      "Maasai village visit",
      "Cultural performances",
      "Airport transfers (airstrip)",
      "Emergency evacuation insurance",
    ],
    exclusions: [
      "International flights",
      "Domestic flights to Mara",
      "Alcoholic beverages",
      "Spa treatments",
      "Hot air balloon safari",
      "Tips and gratuities",
      "Travel insurance",
      "Personal expenses",
    ],
    nearbyAttractions: [
      "Mara River (5 min)",
      "Maasai Villages (10 min)",
      "Balloon Safari Launch (15 min)",
      "Hippo Pools (20 min)",
      "Migration Crossing Points (varies)",
    ],
    faq: [
      {
        question: "When is the best time to visit for the migration?",
        answer:
          "The Great Migration is typically in the Mara from July to October, with river crossings most dramatic from August to September.",
      },
      {
        question: "How many game drives are included?",
        answer:
          "Two game drives daily are included - early morning (6-9 AM) and late afternoon (4-7 PM). Additional drives can be arranged.",
      },
      {
        question: "Can children participate in all activities?",
        answer:
          "Yes, we're family-friendly. Children under 12 get special rates and we have educational programs designed for young wildlife enthusiasts.",
      },
      {
        question: "What wildlife can we expect to see?",
        answer:
          "The Big Five, cheetahs, hippos, crocodiles, and over 450 bird species. During migration season, millions of wildebeest and zebras.",
      },
    ],
    reviews: [
      {
        name: "David Brown",
        rating: 5,
        date: "1 week ago",
        comment:
          "Incredible safari experience! Saw lions, elephants, and witnessed a river crossing. The guides were knowledgeable and the tented accommodation was luxurious.",
        verified: true,
      },
      {
        name: "Jennifer Lee",
        rating: 5,
        date: "2 weeks ago",
        comment:
          "Best safari lodge in the Mara! The location is perfect for game viewing and the Maasai cultural visit was authentic and educational.",
        verified: true,
      },
    ],
  },
}

export default function HotelDetailPage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const hotel = hotels[params.id as keyof typeof hotels]

  if (!hotel) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Hotel not found</h1>
          <p className="text-muted-foreground mb-6">The hotel you're looking for doesn't exist.</p>
          <Link href="/hotels">
            <Button className="bg-amber-600 hover:bg-amber-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Hotels
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % hotel.images.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + hotel.images.length) % hotel.images.length)
  }

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
        return <Wifi className="w-4 h-4" />
      case "swimming pool":
        return <Waves className="w-4 h-4" />
      case "fitness center":
        return <Dumbbell className="w-4 h-4" />
      case "restaurant":
      case "fine dining":
        return <Utensils className="w-4 h-4" />
      case "airport transfers":
        return <Car className="w-4 h-4" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/">
                <h1 className="font-heading text-2xl font-bold text-cyan-600">Riverdale</h1>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link href="/destinations" className="text-foreground hover:text-cyan-600 transition-colors">
                  Destinations
                </Link>
                <Link href="/hotels" className="text-cyan-600 font-medium">
                  Hotels
                </Link>
                <Link href="/about" className="text-foreground hover:text-cyan-600 transition-colors">
                  About
                </Link>
                <Link href="/contact" className="text-foreground hover:text-cyan-600 transition-colors">
                  Contact
                </Link>
              </div>
            </div>
            <Link href={`/booking?hotel=${hotel.id}`}>
              <Button className="bg-amber-500 hover:bg-amber-600 text-white">Book Now</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section with Image Gallery */}
      <div className="relative h-96 bg-black">
        <Image
          src={hotel.images[selectedImage] || "/placeholder.svg"}
          alt={hotel.name}
          fill
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Image Navigation */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <Link
              href="/hotels"
              className="inline-flex items-center text-amber-200 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Hotels
            </Link>
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-4 text-balance">{hotel.name}</h1>
            <div className="flex items-center justify-center space-x-6 text-lg flex-wrap gap-2">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                {hotel.location}
              </div>
              <div className="flex items-center">
                <Star className="h-5 w-5 mr-1 fill-yellow-400 text-yellow-400" />
                {hotel.rating} ({hotel.reviews} reviews)
              </div>
              <Badge className="bg-amber-500 text-white">{hotel.category}</Badge>
            </div>
          </div>
        </div>

        {/* Image Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {hotel.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                selectedImage === index ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="rooms">Rooms</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About This Hotel</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6 leading-relaxed">{hotel.description}</p>
                    <h3 className="font-semibold mb-4">Hotel Highlights</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {hotel.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center">
                          <Badge variant="secondary" className="mr-3 bg-green-100 text-green-800 flex-shrink-0">
                            ✓
                          </Badge>
                          <span className="text-sm">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Nearby Attractions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-3">
                      {hotel.nearbyAttractions.map((attraction, index) => (
                        <div key={index} className="flex items-center">
                          <Badge variant="outline" className="mr-3 flex-shrink-0">
                            <MapPin className="w-3 h-3" />
                          </Badge>
                          <span className="text-sm">{attraction}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Why Choose This Hotel</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Shield className="w-6 h-6 text-amber-600" />
                        </div>
                        <h4 className="font-semibold mb-2">Safe & Secure</h4>
                        <p className="text-sm text-muted-foreground">
                          24/7 security, safe deposit boxes, secure parking
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Award className="w-6 h-6 text-amber-600" />
                        </div>
                        <h4 className="font-semibold mb-2">Award Winning</h4>
                        <p className="text-sm text-muted-foreground">Top rated hotel with excellent service</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Heart className="w-6 h-6 text-amber-600" />
                        </div>
                        <h4 className="font-semibold mb-2">Guest Favorite</h4>
                        <p className="text-sm text-muted-foreground">Highly rated by previous guests</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="rooms" className="space-y-4">
                {hotel.roomTypes.map((room, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center">
                          {room.type}
                          <Badge className="ml-3 bg-amber-600">{room.size}</Badge>
                        </CardTitle>
                        <div className="text-right">
                          <div className="font-heading text-xl font-bold text-amber-600">
                            KSh {room.price.toLocaleString()}
                          </div>
                          <span className="text-xs text-muted-foreground">per night</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-semibold mb-2 text-amber-600">Occupancy</h5>
                          <p className="text-sm text-muted-foreground mb-4">{room.occupancy}</p>
                          <h5 className="font-semibold mb-2 text-amber-600">Room Amenities</h5>
                          <ul className="space-y-1">
                            {room.amenities.map((amenity, idx) => (
                              <li key={idx} className="text-sm text-muted-foreground flex items-center">
                                <Badge variant="outline" className="mr-2 h-4 w-4 p-0 border-green-300">
                                  •
                                </Badge>
                                {amenity}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex items-end">
                          <Link href={`/booking?hotel=${hotel.id}&room=${room.type}`} className="w-full">
                            <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                              Book This Room
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="amenities" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-green-600">What's Included</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {hotel.inclusions.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <Badge
                              variant="secondary"
                              className="mr-2 bg-green-100 text-green-800 mt-0.5 flex-shrink-0"
                            >
                              ✓
                            </Badge>
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-red-600">Not Included</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {hotel.exclusions.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <Badge variant="secondary" className="mr-2 bg-red-100 text-red-800 mt-0.5 flex-shrink-0">
                              ✗
                            </Badge>
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Hotel Amenities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      {hotel.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                          {getAmenityIcon(amenity)}
                          <span className="ml-2 text-sm font-medium">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="faq" className="space-y-4">
                {hotel.faq.map((item, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{item.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="reviews">
                <Card>
                  <CardHeader>
                    <CardTitle>Guest Reviews ({hotel.reviews} reviews)</CardTitle>
                    <div className="flex items-center space-x-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-5 w-5 ${i < Math.floor(hotel.rating) ? "fill-current" : ""}`} />
                        ))}
                      </div>
                      <span className="text-xl font-bold">{hotel.rating}</span>
                      <span className="text-muted-foreground">out of 5</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {hotel.reviews.map((review, index) => (
                        <div key={index} className="border-b pb-4 last:border-b-0">
                          <div className="flex items-center mb-2">
                            <div className="flex text-yellow-400">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-current" />
                              ))}
                            </div>
                            <span className="ml-2 font-semibold">{review.name}</span>
                            {review.verified && (
                              <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800 text-xs">
                                Verified
                              </Badge>
                            )}
                            <span className="ml-2 text-muted-foreground">• {review.date}</span>
                          </div>
                          <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground line-through">
                      KSh {hotel.originalPrice.toLocaleString()}
                    </span>
                    <Badge className="bg-red-500 text-white">SAVE KSh {hotel.savings.toLocaleString()}</Badge>
                  </div>
                  <CardTitle className="text-3xl text-amber-600">KSh {hotel.currentPrice.toLocaleString()}</CardTitle>
                  <p className="text-sm text-muted-foreground">per night</p>
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Check-in: {hotel.checkIn}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Check-out: {hotel.checkOut}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link href={`/booking?hotel=${hotel.id}`}>
                  <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 text-lg font-semibold">
                    Book This Hotel
                  </Button>
                </Link>

                <div className="text-center text-sm text-muted-foreground">or</div>

                <div className="space-y-2">
                  <Link href="/contact">
                    <Button
                      variant="outline"
                      className="w-full border-amber-600 text-amber-600 hover:bg-amber-50 bg-transparent"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Get Custom Quote
                    </Button>
                  </Link>
                  <Link href="tel:+254700123456">
                    <Button
                      variant="outline"
                      className="w-full border-amber-600 text-amber-600 hover:bg-amber-50 bg-transparent"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call Us Now
                    </Button>
                  </Link>
                </div>

                <div className="bg-amber-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-amber-800 mb-2">Special Offers</h4>
                  <ul className="text-sm text-amber-700 space-y-1">
                    <li>• Children under 12: Stay free with parents</li>
                    <li>• Free cancellation up to 24 hours</li>
                    <li>• Extended stay discounts available</li>
                    <li>• Complimentary airport transfers</li>
                  </ul>
                </div>

                <div className="text-xs text-muted-foreground text-center">
                  Secure booking • Instant confirmation • 24/7 support
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
