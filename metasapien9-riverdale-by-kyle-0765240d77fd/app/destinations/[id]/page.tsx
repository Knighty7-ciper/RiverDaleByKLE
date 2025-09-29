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
  Users,
  Calendar,
  Phone,
  Mail,
  Shield,
  Award,
  Heart,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const destinations = {
  "maasai-mara-safari": {
    id: "maasai-mara-safari",
    name: "Maasai Mara Safari Adventure",
    location: "Maasai Mara National Reserve, Kenya",
    rating: 4.9,
    reviews: 127,
    originalPrice: 149900,
    currentPrice: 129900,
    savings: 20000,
    duration: "4 Days / 3 Nights",
    bestTime: "July - October (Great Migration)",
    groupSize: "2-12 people",
    difficulty: "Moderate",
    images: [
      "/maasai-mara-safari.png",
      "/maasai-mara-lions-hunting.jpg",
      "/great-migration-wildebeest-crossing.jpg",
      "/maasai-mara-sunset-landscape.jpg",
      "/maasai-warriors-traditional-dance.jpg",
    ],
    description:
      "Experience the world-famous Great Migration and witness millions of wildebeest, zebras, and gazelles crossing the Mara River. This iconic safari destination offers unparalleled wildlife viewing opportunities in Kenya's most celebrated game reserve with luxury accommodations and expert Maasai guides.",
    highlights: [
      "Great Migration viewing (July-October)",
      "Big Five encounters guaranteed",
      "Maasai cultural village visits",
      "Hot air balloon safari option",
      "Professional guide services",
      "Luxury tented accommodation",
      "All meals included",
      "Airport transfers included",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & First Game Drive",
        description:
          "Arrive at Maasai Mara airstrip, meet your professional guide, and transfer to your luxury tented camp. After lunch and settling in, embark on your first game drive to spot the Big Five. Evening sundowner drinks overlooking the savannah.",
        activities: [
          "Airport pickup from Wilson Airport",
          "Camp check-in and orientation",
          "Afternoon game drive (3-6 PM)",
          "Sundowner drinks with Mara views",
        ],
        meals: ["Welcome lunch", "Dinner under the stars"],
      },
      {
        day: 2,
        title: "Full Day Safari Adventure",
        description:
          "Early morning game drive to catch predators in action, followed by breakfast in the bush. Visit a traditional Maasai village to learn about local culture and traditions. Afternoon game drive focusing on the Great Migration crossing points.",
        activities: [
          "Early morning game drive (6-9 AM)",
          "Bush breakfast experience",
          "Maasai village cultural visit",
          "Afternoon game drive (4-7 PM)",
        ],
        meals: ["Bush breakfast", "Lunch at camp", "Traditional dinner"],
      },
      {
        day: 3,
        title: "Migration & Wildlife Photography",
        description:
          "Dedicated day for witnessing the Great Migration river crossings and wildlife photography. Optional hot air balloon safari at dawn for aerial views of the migration. Professional photography guidance included.",
        activities: [
          "Optional balloon safari (5-8 AM)",
          "Migration crossing viewing",
          "Photography masterclass",
          "Evening game drive",
        ],
        meals: ["Champagne breakfast (balloon)", "Picnic lunch", "Farewell dinner"],
      },
      {
        day: 4,
        title: "Final Game Drive & Departure",
        description:
          "Final morning game drive with focus on any missed wildlife sightings. Return to camp for brunch before departure to airstrip. Certificate presentation and souvenir shopping opportunity.",
        activities: ["Final morning game drive", "Certificate presentation", "Souvenir shopping", "Airport transfer"],
        meals: ["Breakfast", "Farewell brunch"],
      },
    ],
    inclusions: [
      "Luxury tented camp accommodation (3 nights)",
      "All meals during safari (breakfast, lunch, dinner)",
      "Professional safari guide & driver",
      "Game drives in 4WD safari vehicle with pop-up roof",
      "Park entrance fees & conservancy fees",
      "Airport/airstrip transfers (Wilson Airport)",
      "Bottled water during all game drives",
      "Maasai village visit with cultural performance",
      "Emergency evacuation insurance",
      "Binoculars and field guides",
    ],
    exclusions: [
      "International flights to Kenya",
      "Domestic flights (Wilson-Mara: $200 pp)",
      "Travel insurance (highly recommended)",
      "Personal expenses & souvenirs",
      "Alcoholic beverages at camp",
      "Tips and gratuities (suggested $15-20/day)",
      "Hot air balloon safari ($450 pp)",
      "Kenya visa fees ($50)",
      "Yellow fever vaccination",
    ],
    faq: [
      {
        question: "When is the best time to see the Great Migration?",
        answer:
          "The Great Migration typically occurs from July to October when millions of animals cross from Serengeti to Maasai Mara. River crossings are most dramatic from August to September.",
      },
      {
        question: "What animals can I expect to see?",
        answer:
          "You can expect to see the Big Five (lion, leopard, elephant, buffalo, rhino), cheetahs, hippos, crocodiles, and over 450 bird species. During migration season, millions of wildebeest, zebras, and gazelles.",
      },
      {
        question: "Is this safari suitable for children?",
        answer:
          "Yes, this safari is family-friendly and suitable for children above 5 years old. We provide special children's activities and educational programs.",
      },
      {
        question: "What should I pack?",
        answer:
          "Pack neutral-colored clothing, comfortable walking shoes, hat, sunscreen, binoculars, and camera with extra batteries. Full packing list provided upon booking.",
      },
    ],
    reviews: [
      {
        name: "Sarah Johnson",
        rating: 5,
        date: "2 weeks ago",
        comment:
          "Absolutely incredible experience! The wildlife viewing was beyond our expectations and our guide was extremely knowledgeable. Saw the Big Five in just two days and witnessed an amazing river crossing!",
        verified: true,
      },
      {
        name: "Michael Chen",
        rating: 5,
        date: "1 month ago",
        comment:
          "Best safari experience ever! The luxury tented camp was amazing and the food was exceptional. Our guide David was fantastic - so passionate about wildlife and conservation.",
        verified: true,
      },
      {
        name: "Emma Thompson",
        rating: 4,
        date: "2 months ago",
        comment:
          "Great value for money. The Maasai village visit was very authentic and educational. Only minor issue was some vehicle maintenance delays on day 2.",
        verified: true,
      },
    ],
  },
  "mount-kenya-trekking": {
    id: "mount-kenya-trekking",
    name: "Mount Kenya Trekking Expedition",
    location: "Mount Kenya National Park, Kenya",
    rating: 4.7,
    reviews: 89,
    originalPrice: 109900,
    currentPrice: 89900,
    savings: 20000,
    duration: "5 Days / 4 Nights",
    bestTime: "January - March, June - October",
    groupSize: "4-8 people",
    difficulty: "Challenging",
    images: [
      "/mount-kenya-hikers.png",
      "/mount-kenya-point-lenana-summit.jpg",
      "/mount-kenya-alpine-lakes.jpg",
      "/mount-kenya-mountain-huts.jpg",
      "/mount-kenya-wildlife-colobus-monkeys.jpg",
    ],
    description:
      "Conquer Africa's second-highest peak on this challenging yet rewarding trekking adventure. Experience diverse ecosystems, from bamboo forests to alpine meadows, while enjoying breathtaking views of the surrounding landscape and attempting to summit Point Lenana at 4,985 meters.",
    highlights: [
      "Summit Point Lenana (4,985m)",
      "Diverse ecosystems exploration",
      "Alpine lakes and glacial valleys",
      "Unique flora and fauna",
      "UNESCO World Heritage Site",
      "Professional mountain guides",
      "Mountain hut accommodation",
      "Summit certificate",
    ],
    itinerary: [
      {
        day: 1,
        title: "Nairobi to Naro Moru - Met Station",
        description:
          "Depart Nairobi for Naro Moru Gate, meet your mountain guide and porters, equipment check, and begin trek through bamboo forest to Met Station (3,048m). Acclimatization walk in the afternoon.",
        activities: [
          "Equipment briefing and check",
          "Trek through bamboo forest",
          "Arrive at Met Station",
          "Acclimatization walk",
        ],
        meals: ["Packed lunch", "Dinner at hut"],
      },
      {
        day: 2,
        title: "Met Station to Mackinders Camp",
        description:
          "Trek through the moorland zone with spectacular views of the main peaks. Pass through the Teleki Valley to reach Mackinders Camp (4,200m). Afternoon rest and preparation for summit attempt.",
        activities: ["Moorland trekking", "Teleki Valley crossing", "Arrive at Mackinders Camp", "Summit preparation"],
        meals: ["Breakfast", "Packed lunch", "Dinner"],
      },
      {
        day: 3,
        title: "Summit Day - Point Lenana",
        description:
          "Early morning (3:00 AM) summit attempt to Point Lenana (4,985m), Kenya's third highest peak. Watch sunrise from the summit before descending to Shipton Camp (4,200m) via different route.",
        activities: ["3 AM summit attempt", "Sunrise at Point Lenana", "Summit photography", "Descend to Shipton Camp"],
        meals: ["Early breakfast", "Summit snacks", "Dinner at Shipton"],
      },
      {
        day: 4,
        title: "Shipton to Old Moses Camp",
        description:
          "Descend through the moorland and forest zones to Old Moses Camp (3,300m). Different route offers new scenery and wildlife spotting opportunities including colobus monkeys.",
        activities: ["Descent through Sirimon route", "Wildlife viewing", "Forest exploration", "Arrive at Old Moses"],
        meals: ["Breakfast", "Packed lunch", "Dinner"],
      },
      {
        day: 5,
        title: "Old Moses to Sirimon Gate - Nairobi",
        description:
          "Final descent through the forest to Sirimon Gate. Certificate presentation ceremony before returning to Nairobi. Celebration lunch en route.",
        activities: ["Final forest descent", "Certificate ceremony", "Return to Nairobi", "Celebration lunch"],
        meals: ["Breakfast", "Celebration lunch"],
      },
    ],
    inclusions: [
      "Mountain hut accommodation (4 nights)",
      "All meals during trek",
      "Professional mountain guides (2 guides)",
      "Porters for group equipment",
      "Climbing equipment rental",
      "Park entrance fees",
      "Transport to/from Nairobi",
      "Summit certificate",
      "Emergency evacuation insurance",
      "First aid kit and oxygen",
    ],
    exclusions: [
      "Personal climbing gear (boots, clothing)",
      "Sleeping bags (available for rent $10/day)",
      "Personal expenses",
      "Tips for guides and porters ($50-80 total)",
      "Travel insurance",
      "Accommodation in Nairobi",
      "International flights",
      "Personal medication",
    ],
    faq: [
      {
        question: "Do I need prior trekking experience?",
        answer:
          "Yes, good physical fitness and some trekking experience is recommended. You should be able to walk 6-8 hours daily and be comfortable with basic camping.",
      },
      {
        question: "What is the success rate for reaching Point Lenana?",
        answer:
          "With proper preparation and acclimatization, the success rate is approximately 85-90%. Weather conditions can affect summit attempts.",
      },
      {
        question: "What gear do I need to bring?",
        answer:
          "You need proper trekking boots, warm clothing, rain gear, and personal items. We provide tents, cooking equipment, and group gear. Detailed packing list provided.",
      },
      {
        question: "Is altitude sickness a concern?",
        answer:
          "Yes, we include acclimatization days and our guides are trained in altitude sickness recognition and treatment. We carry emergency oxygen.",
      },
    ],
    reviews: [
      {
        name: "Mark Thompson",
        rating: 5,
        date: "2 weeks ago",
        comment:
          "Incredible mountain adventure! The guides were excellent and reaching Point Lenana was unforgettable. Well organized trek with great food and accommodation.",
        verified: true,
      },
      {
        name: "Sarah Mitchell",
        rating: 4,
        date: "1 month ago",
        comment:
          "Challenging but rewarding experience. The scenery was breathtaking and the wildlife sightings were a bonus! Guides were very professional.",
        verified: true,
      },
    ],
  },
  "amboseli-elephant-paradise": {
    id: "amboseli-elephant-paradise",
    name: "Amboseli Elephant Paradise",
    location: "Amboseli National Park, Kenya",
    rating: 4.8,
    reviews: 156,
    originalPrice: 129900,
    currentPrice: 109900,
    savings: 20000,
    duration: "3 Days / 2 Nights",
    bestTime: "June - October, January - March",
    groupSize: "2-15 people",
    difficulty: "Easy",
    images: [
      "/amboseli-elephants-kilimanjaro.png",
      "/placeholder-ob4ga.png",
      "/placeholder-5eo91.png",
      "/placeholder-x9nmu.png",
      "/placeholder-6eyg3.png",
    ],
    description:
      "Discover the land of giants beneath the majestic Mount Kilimanjaro. Amboseli is renowned for its large elephant herds and offers spectacular views of Africa's highest peak as a backdrop to incredible wildlife encounters. Perfect for photographers and families.",
    highlights: [
      "Large elephant herds (1,600+ elephants)",
      "Mount Kilimanjaro views",
      "Diverse birdlife (400+ species)",
      "Maasai culture experiences",
      "Swamp ecosystems",
      "Photography opportunities",
      "Family-friendly safari",
      "Luxury tented camps",
    ],
    itinerary: [
      {
        day: 1,
        title: "Nairobi to Amboseli - Afternoon Safari",
        description:
          "Depart Nairobi for Amboseli National Park (4-hour drive). Arrive at camp for lunch with views of Mount Kilimanjaro. Afternoon game drive focusing on elephant herds and bird watching at the swamps.",
        activities: [
          "Scenic drive to Amboseli",
          "Camp check-in",
          "Lunch with Kilimanjaro views",
          "Afternoon game drive",
        ],
        meals: ["Lunch", "Dinner"],
      },
      {
        day: 2,
        title: "Full Day Amboseli Safari",
        description:
          "Full day exploring Amboseli with morning and afternoon game drives. Visit Maasai village for cultural experience. Enjoy sundowner drinks with Mount Kilimanjaro backdrop. Photography workshop included.",
        activities: [
          "Early morning game drive",
          "Maasai village visit",
          "Photography workshop",
          "Afternoon game drive",
          "Sundowner drinks",
        ],
        meals: ["Breakfast", "Lunch", "Dinner"],
      },
      {
        day: 3,
        title: "Final Game Drive & Return to Nairobi",
        description:
          "Early morning game drive for final wildlife viewing and photography with clear Kilimanjaro views. Return to camp for breakfast before departing to Nairobi. Lunch en route.",
        activities: [
          "Early morning game drive",
          "Final photography session",
          "Return journey to Nairobi",
          "Lunch stop",
        ],
        meals: ["Breakfast", "Lunch en route"],
      },
    ],
    inclusions: [
      "Luxury tented camp accommodation (2 nights)",
      "All meals during safari",
      "Professional safari guide",
      "Game drives in 4WD vehicle with pop-up roof",
      "Park entrance fees",
      "Maasai village visit",
      "Transport from/to Nairobi",
      "Bottled water during drives",
      "Emergency evacuation insurance",
      "Photography guidance",
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Alcoholic beverages",
      "Tips and gratuities",
      "Kenya visa fees",
      "Optional activities",
      "Laundry services",
    ],
    faq: [
      {
        question: "Will I see Mount Kilimanjaro clearly?",
        answer:
          "The best views are early morning and late afternoon when clouds are minimal. Weather conditions affect visibility, but chances are highest during dry seasons (June-October, January-March).",
      },
      {
        question: "How many elephants can we expect to see?",
        answer:
          "Amboseli has over 1,600 elephants. You can expect to see multiple herds, especially around the swamps where they come to drink and bathe.",
      },
      {
        question: "Is this suitable for photography?",
        answer:
          "Amboseli offers some of the best wildlife photography opportunities in Africa, especially elephants against Kilimanjaro. We provide photography guidance and tips.",
      },
      {
        question: "What other animals will we see?",
        answer:
          "Besides elephants, you'll see lions, cheetahs, buffalo, zebras, wildebeest, giraffes, hippos, and over 400 bird species including flamingos and pelicans.",
      },
    ],
    reviews: [
      {
        name: "David Brown",
        rating: 5,
        date: "1 week ago",
        comment:
          "Amazing elephant sightings with Kilimanjaro in the background! Our guide was fantastic and very knowledgeable about wildlife behavior and conservation.",
        verified: true,
      },
      {
        name: "Jennifer Lee",
        rating: 5,
        date: "2 weeks ago",
        comment:
          "Perfect safari experience! The camp was luxurious and the game drives exceeded all expectations. Great for families with children.",
        verified: true,
      },
      {
        name: "Robert Wilson",
        rating: 4,
        date: "1 month ago",
        comment:
          "Excellent photography opportunities and incredible elephant encounters. The Maasai village visit was very educational and authentic.",
        verified: true,
      },
    ],
  },
}

export default function DestinationDetailPage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const destination = destinations[params.id as keyof typeof destinations]

  if (!destination) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Destination not found</h1>
          <p className="text-muted-foreground mb-6">The destination you're looking for doesn't exist.</p>
          <Link href="/destinations">
            <Button className="bg-cyan-600 hover:bg-cyan-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Destinations
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % destination.images.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + destination.images.length) % destination.images.length)
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
                <Link href="/destinations" className="text-cyan-600 font-medium">
                  Destinations
                </Link>
                <Link href="/hotels" className="text-foreground hover:text-cyan-600 transition-colors">
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
            <Link href={`/booking?destination=${destination.id}`}>
              <Button className="bg-amber-500 hover:bg-amber-600 text-white">Book Now</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section with Image Gallery */}
      <div className="relative h-96 bg-black">
        <Image
          src={destination.images[selectedImage] || "/placeholder.svg"}
          alt={destination.name}
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
              href="/destinations"
              className="inline-flex items-center text-cyan-200 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Destinations
            </Link>
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-4 text-balance">{destination.name}</h1>
            <div className="flex items-center justify-center space-x-6 text-lg flex-wrap gap-2">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                {destination.location}
              </div>
              <div className="flex items-center">
                <Star className="h-5 w-5 mr-1 fill-yellow-400 text-yellow-400" />
                {destination.rating} ({destination.reviews} reviews)
              </div>
              <Badge
                className={`${
                  destination.difficulty === "Easy"
                    ? "bg-green-500"
                    : destination.difficulty === "Moderate"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                } text-white`}
              >
                {destination.difficulty}
              </Badge>
            </div>
          </div>
        </div>

        {/* Image Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {destination.images.map((_, index) => (
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
                <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About This Experience</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6 leading-relaxed">{destination.description}</p>
                    <h3 className="font-semibold mb-4">Experience Highlights</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {destination.highlights.map((highlight, index) => (
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
                    <CardTitle>Why Choose This Experience</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Shield className="w-6 h-6 text-cyan-600" />
                        </div>
                        <h4 className="font-semibold mb-2">Safe & Secure</h4>
                        <p className="text-sm text-muted-foreground">
                          Licensed guides, insured vehicles, emergency support
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Award className="w-6 h-6 text-cyan-600" />
                        </div>
                        <h4 className="font-semibold mb-2">Award Winning</h4>
                        <p className="text-sm text-muted-foreground">Top rated safari operator in Kenya</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Heart className="w-6 h-6 text-cyan-600" />
                        </div>
                        <h4 className="font-semibold mb-2">Family Friendly</h4>
                        <p className="text-sm text-muted-foreground">Special pricing and activities for children</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="itinerary" className="space-y-4">
                {destination.itinerary.map((day, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Badge className="mr-3 bg-cyan-600">Day {day.day}</Badge>
                        {day.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4 leading-relaxed">{day.description}</p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-semibold mb-2 text-cyan-600">Activities</h5>
                          <ul className="space-y-1">
                            {day.activities.map((activity, idx) => (
                              <li key={idx} className="text-sm text-muted-foreground flex items-start">
                                <Badge
                                  variant="outline"
                                  className="mr-2 h-4 w-4 p-0 border-cyan-300 mt-0.5 flex-shrink-0"
                                >
                                  •
                                </Badge>
                                {activity}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-2 text-amber-600">Meals</h5>
                          <ul className="space-y-1">
                            {day.meals.map((meal, idx) => (
                              <li key={idx} className="text-sm text-muted-foreground flex items-center">
                                <Badge variant="outline" className="mr-2 h-4 w-4 p-0 border-amber-300">
                                  •
                                </Badge>
                                {meal}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="inclusions" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-green-600">What's Included</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {destination.inclusions.map((item, index) => (
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
                        {destination.exclusions.map((item, index) => (
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
              </TabsContent>

              <TabsContent value="faq" className="space-y-4">
                {destination.faq.map((item, index) => (
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
                    <CardTitle>Customer Reviews ({destination.reviews} reviews)</CardTitle>
                    <div className="flex items-center space-x-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${i < Math.floor(destination.rating) ? "fill-current" : ""}`}
                          />
                        ))}
                      </div>
                      <span className="text-xl font-bold">{destination.rating}</span>
                      <span className="text-muted-foreground">out of 5</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {destination.reviews.map((review, index) => (
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
                      KSh {destination.originalPrice.toLocaleString()}
                    </span>
                    <Badge className="bg-red-500 text-white">SAVE KSh {destination.savings.toLocaleString()}</Badge>
                  </div>
                  <CardTitle className="text-3xl text-cyan-600">
                    KSh {destination.currentPrice.toLocaleString()}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">per person</p>
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {destination.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {destination.groupSize}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Best Time to Visit</label>
                  <div className="flex items-center p-3 bg-cyan-50 rounded-lg">
                    <Calendar className="h-4 w-4 mr-2 text-cyan-600" />
                    <span className="text-sm">{destination.bestTime}</span>
                  </div>
                </div>

                <Link href={`/booking?destination=${destination.id}`}>
                  <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 text-lg font-semibold">
                    Book This Experience
                  </Button>
                </Link>

                <div className="text-center text-sm text-muted-foreground">or</div>

                <div className="space-y-2">
                  <Link href="/contact">
                    <Button
                      variant="outline"
                      className="w-full border-cyan-600 text-cyan-600 hover:bg-cyan-50 bg-transparent"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Get Custom Quote
                    </Button>
                  </Link>
                  <Link href="tel:+254700123456">
                    <Button
                      variant="outline"
                      className="w-full border-cyan-600 text-cyan-600 hover:bg-cyan-50 bg-transparent"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call Us Now
                    </Button>
                  </Link>
                </div>

                <div className="bg-amber-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-amber-800 mb-2">Special Offers</h4>
                  <ul className="text-sm text-amber-700 space-y-1">
                    <li>• Children under 12: 45% discount</li>
                    <li>• Free cancellation up to 48 hours</li>
                    <li>• Group discounts available (6+ people)</li>
                    <li>• Early bird: Book 30 days ahead, save 10%</li>
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
