"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Calendar, User, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const blogPosts = [
    {
      id: 1,
      slug: "ultimate-maasai-mara-safari-guide",
      title: "Ultimate Guide to Safari in Maasai Mara",
      excerpt:
        "Discover the best time to visit, what to pack, and wildlife viewing tips for Kenya's most famous national reserve.",
      content: `The Maasai Mara National Reserve is Kenya's crown jewel, offering unparalleled wildlife viewing opportunities. Best visited during the Great Migration (July-October), the reserve hosts over 2 million wildebeest, zebras, and gazelles.

**Best Time to Visit:**
- July-October: Great Migration season
- January-March: Calving season with baby animals
- June-September: Dry season with excellent game viewing

**What to Pack:**
- Neutral-colored clothing (khaki, brown, green)
- Wide-brimmed hat and sunglasses
- Binoculars for wildlife viewing
- Camera with extra batteries
- Insect repellent and sunscreen

**Wildlife Highlights:**
The Big Five (lion, leopard, elephant, buffalo, rhino) roam freely across the savanna. The Mara River crossing during migration season offers dramatic wildlife encounters as thousands of animals brave crocodile-infested waters.

**Cultural Experiences:**
Visit authentic Maasai villages to learn about traditional customs, beadwork, and warrior traditions. Many lodges offer cultural visits as part of safari packages.`,
      author: "Safari Expert",
      date: "2024-01-15",
      image: "/maasai-mara-safari.png",
      category: "Safari Guide",
      readTime: "8 min read",
    },
    {
      id: 2,
      slug: "hidden-gems-kenyan-coast",
      title: "Kenya's Coastal Paradise: Diani Beach Guide",
      excerpt:
        "Everything you need to know about Kenya's pristine white sand beaches, water sports, and coastal culture.",
      content: `Diani Beach, located 30km south of Mombasa, boasts 17km of pristine white sand beaches and crystal-clear waters. This tropical paradise offers the perfect blend of relaxation and adventure.

**Beach Activities:**
- Snorkeling and diving in coral reefs
- Deep-sea fishing for marlin and sailfish
- Kitesurfing and windsurfing
- Dhow sailing trips at sunset
- Beach volleyball and soccer

**Marine Life:**
The coral reefs off Diani are home to over 200 fish species, sea turtles, and dolphins. The best diving spots include Chale Island and Kisite-Mpunguti Marine Park.

**Cultural Attractions:**
- Kaya Kinondo Sacred Forest
- Colobus Conservation Centre
- Local Swahili villages
- Traditional dhow building workshops

**Best Time to Visit:**
- December-March: Hot and dry, perfect for beach activities
- June-October: Cooler temperatures, ideal for water sports
- Avoid April-May: Heavy rains

**Accommodation:**
From luxury beach resorts to budget-friendly guesthouses, Diani offers accommodation for every budget. Many resorts offer all-inclusive packages with meals and activities.`,
      author: "Coastal Tourism Expert",
      date: "2024-01-10",
      image: "/diani-beach-kenya.png",
      category: "Beach Guide",
      readTime: "6 min read",
    },
    {
      id: 3,
      slug: "mount-kenya-climbing-guide",
      title: "Mount Kenya Climbing: Complete Adventure Guide",
      excerpt:
        "Essential tips for conquering Africa's second-highest peak, from route planning to gear recommendations.",
      content: `Mount Kenya offers some of East Africa's most spectacular mountain climbing experiences. At 5,199 meters, it's Africa's second-highest peak and a UNESCO World Heritage Site.

**Climbing Routes:**
- Sirimon Route: Most popular, gradual ascent
- Naro Moru Route: Fastest but steepest
- Chogoria Route: Most scenic approach

**Best Climbing Season:**
- January-February: Clear skies, cold nights
- June-September: Dry season, good visibility
- Avoid March-May and November: Rainy seasons

**Essential Gear:**
- Warm sleeping bag (-10°C rating)
- Waterproof jacket and pants
- Insulated boots and gaiters
- Headlamp with extra batteries
- High-altitude sunglasses

**Acclimatization Tips:**
Take time to acclimatize properly. Most climbers spend 4-5 days on the mountain, with rest days at key altitudes to prevent altitude sickness.`,
      author: "Mountain Guide",
      date: "2024-01-05",
      image: "/mount-kenya-hikers.png",
      category: "Adventure",
      readTime: "10 min read",
    },
    {
      id: 4,
      slug: "maasai-cultural-immersion",
      title: "Cultural Immersion: Living with the Maasai",
      excerpt: "Experience authentic Maasai culture through community-based tourism and traditional village stays.",
      content: `The Maasai people of Kenya and Tanzania have maintained their traditional way of life for centuries. Community-based tourism offers visitors authentic cultural experiences while supporting local communities.

**Cultural Activities:**
- Traditional warrior training
- Beadwork and jewelry making
- Cattle herding experiences
- Traditional cooking lessons
- Storytelling around the fire

**Maasai Traditions:**
Learn about age-set systems, traditional medicine, and the importance of cattle in Maasai culture. Participate in traditional dances and ceremonies.

**Responsible Tourism:**
Choose community-owned conservancies and cultural centers that directly benefit Maasai families. Respect photography guidelines and cultural sensitivities.

**What to Expect:**
Village stays include traditional meals, sleeping in authentic manyattas (traditional houses), and participating in daily activities like livestock herding.`,
      author: "Cultural Expert",
      date: "2023-12-28",
      image: "/masai-village-cultural-experience.png",
      category: "Culture",
      readTime: "7 min read",
    },
  ]

  const categories = ["All", "Safari Guide", "Beach Guide", "Adventure", "Culture", "Travel Tips"]

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative py-24 mb-16 rounded-3xl overflow-hidden shadow-2xl">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('/african-lion-pride-golden-hour.jpg')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 via-amber-800/70 to-orange-900/80" />
          <div className="relative z-10 text-center text-white px-6">
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 text-balance">
              Safari Stories & Travel Guides
            </h1>
            <p className="text-xl md:text-2xl text-amber-100 max-w-3xl mx-auto leading-relaxed">
              Expert insights, authentic experiences, and inspiring stories from Kenya's most extraordinary destinations
            </p>
          </div>
        </div>

        <div className="mb-12 space-y-6">
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-amber-600" />
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 text-lg border-amber-200 focus:border-amber-500 focus:ring-amber-500/20 rounded-xl"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="lg"
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-amber-600 hover:bg-amber-700 text-white shadow-lg"
                    : "border-amber-200 text-amber-700 hover:bg-amber-50 hover:border-amber-300"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Card
              key={post.id}
              className="overflow-hidden hover:shadow-2xl transition-all duration-500 group bg-white/95 backdrop-blur-sm border-amber-100 hover:border-amber-200"
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <Badge className="absolute top-4 left-4 bg-amber-600 text-white shadow-lg font-medium">
                  {post.category}
                </Badge>
              </div>
              <CardContent className="p-8">
                <div className="flex items-center gap-4 text-sm text-amber-700 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {post.author}
                  </div>
                </div>
                <h2 className="font-serif text-2xl font-bold text-amber-900 mb-4 line-clamp-2 leading-tight">
                  {post.title}
                </h2>
                <p className="text-amber-700/80 mb-6 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-amber-600 font-medium">{post.readTime}</span>
                  <Link href={`/blog/${post.slug}`}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-amber-600 hover:text-amber-700 hover:bg-amber-50 p-0 font-semibold group"
                    >
                      Read More
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-amber-700 text-xl mb-6">No articles found matching your search.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("All")
              }}
              className="border-amber-200 text-amber-700 hover:bg-amber-50 hover:border-amber-300"
            >
              Clear Filters
            </Button>
          </div>
        )}

        <Card className="mt-20 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 shadow-xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="font-serif text-3xl text-amber-900 mb-3">Stay Connected with Kenya</CardTitle>
            <p className="text-amber-700 text-lg">
              Get exclusive travel guides, safari tips, and cultural insights delivered to your inbox
            </p>
          </CardHeader>
          <CardContent className="pb-8">
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <Input
                placeholder="Enter your email"
                type="email"
                className="flex-1 h-12 border-amber-200 focus:border-amber-500 focus:ring-amber-500/20"
              />
              <Button className="bg-amber-600 hover:bg-amber-700 h-12 px-8 font-semibold shadow-lg">Subscribe</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
