import { notFound } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"

const blogPosts = {
  "ultimate-maasai-mara-safari-guide": {
    title: "Ultimate Maasai Mara Safari Guide: When to Visit and What to Expect",
    excerpt: "Everything you need to know about planning the perfect Maasai Mara safari experience",
    content: `
      <p>The Maasai Mara National Reserve stands as Kenya's crown jewel, offering some of the most spectacular wildlife viewing opportunities in Africa. This comprehensive guide will help you plan the perfect safari experience.</p>
      
      <h2>Best Time to Visit</h2>
      <p>The Great Migration occurs from July to October, making this the peak season for wildlife viewing. However, each season offers unique advantages:</p>
      
      <h3>July - October (Dry Season)</h3>
      <ul>
        <li>Great Migration river crossings</li>
        <li>Excellent wildlife concentrations</li>
        <li>Clear skies for photography</li>
        <li>Higher prices and crowds</li>
      </ul>
      
      <h3>November - June (Green Season)</h3>
      <ul>
        <li>Lower prices and fewer tourists</li>
        <li>Beautiful landscapes and wildflowers</li>
        <li>Excellent bird watching</li>
        <li>Calving season (January-March)</li>
      </ul>
      
      <h2>What to Expect</h2>
      <p>The Maasai Mara covers 1,510 square kilometers of pristine savannah, home to the Big Five and over 450 bird species. Game drives typically start early morning (6:30 AM) and late afternoon (4:00 PM) when animals are most active.</p>
      
      <h2>Accommodation Options</h2>
      <p>From luxury tented camps to budget-friendly lodges, the Mara offers accommodation for every budget. Popular options include:</p>
      <ul>
        <li>Luxury: Angama Mara, Four Seasons Safari Lodge</li>
        <li>Mid-range: Mara Serena Safari Lodge, Keekorok Lodge</li>
        <li>Budget: Mara Springs Safari Camp, Jambo Mara Safari Lodge</li>
      </ul>
      
      <h2>Cultural Experiences</h2>
      <p>Don't miss the opportunity to visit a traditional Maasai village and learn about their rich culture and traditions. Many lodges offer cultural visits as part of their safari packages.</p>
    `,
    author: "Sarah Johnson",
    date: "2024-01-15",
    category: "Safari Guides",
    image: "/maasai-mara-safari.png",
    readTime: "8 min read",
  },
  "hidden-gems-kenyan-coast": {
    title: "Hidden Gems of the Kenyan Coast: Beyond Diani Beach",
    excerpt: "Discover pristine beaches and coastal treasures away from the crowds",
    content: `
      <p>While Diani Beach rightfully claims fame as one of the world's best beaches, Kenya's coastline harbors numerous hidden gems waiting to be discovered by adventurous travelers.</p>
      
      <h2>Watamu Marine National Park</h2>
      <p>This UNESCO Biosphere Reserve offers pristine coral reefs, sea turtle nesting sites, and crystal-clear waters perfect for snorkeling and diving. The nearby Arabuko Sokoke Forest provides excellent bird watching opportunities.</p>
      
      <h2>Lamu Island</h2>
      <p>Step back in time on this UNESCO World Heritage site, where Swahili culture thrives unchanged for centuries. Narrow streets, traditional dhows, and stone houses create an authentic Arabian atmosphere.</p>
      
      <h2>Kilifi Creek</h2>
      <p>A hidden paradise north of Mombasa, Kilifi Creek offers mangrove forests, pristine beaches, and excellent water sports. The area is perfect for kayaking, stand-up paddleboarding, and deep-sea fishing.</p>
      
      <h2>Shimoni Caves</h2>
      <p>These historical caves near the Tanzanian border offer a glimpse into Kenya's complex past. The nearby Kisite-Mpunguti Marine National Park provides excellent dolphin watching opportunities.</p>
      
      <h2>Best Time to Visit</h2>
      <p>The Kenyan coast enjoys a tropical climate year-round. The best weather occurs from December to March and July to October, with minimal rainfall and comfortable temperatures.</p>
    `,
    author: "David Kimani",
    date: "2024-01-10",
    category: "Beach Destinations",
    image: "/diani-beach-kenya.png",
    readTime: "6 min read",
  },
  "mount-kenya-climbing-guide": {
    title: "Mount Kenya Climbing Guide: Conquering Africa's Second Highest Peak",
    excerpt: "Complete guide to climbing Mount Kenya, from route selection to preparation tips",
    content: `
      <p>Mount Kenya, standing at 5,199 meters, offers one of Africa's most rewarding climbing experiences. This comprehensive guide covers everything you need to know for a successful ascent.</p>
      
      <h2>Climbing Routes</h2>
      
      <h3>Sirimon Route (Most Popular)</h3>
      <ul>
        <li>Duration: 4-5 days</li>
        <li>Difficulty: Moderate</li>
        <li>Best for: First-time climbers</li>
        <li>Highlights: Diverse ecosystems, excellent acclimatization</li>
      </ul>
      
      <h3>Chogoria Route (Most Scenic)</h3>
      <ul>
        <li>Duration: 5-6 days</li>
        <li>Difficulty: Moderate to challenging</li>
        <li>Best for: Experienced hikers</li>
        <li>Highlights: Lake Michaelson, stunning views</li>
      </ul>
      
      <h3>Naro Moru Route (Fastest)</h3>
      <ul>
        <li>Duration: 3-4 days</li>
        <li>Difficulty: Challenging</li>
        <li>Best for: Experienced climbers</li>
        <li>Highlights: Direct route, vertical bog</li>
      </ul>
      
      <h2>What to Pack</h2>
      <p>Essential gear includes:</p>
      <ul>
        <li>Warm sleeping bag (rated to -10°C)</li>
        <li>Waterproof jacket and pants</li>
        <li>Insulated layers</li>
        <li>Sturdy hiking boots</li>
        <li>Headlamp and extra batteries</li>
        <li>Water purification tablets</li>
      </ul>
      
      <h2>Physical Preparation</h2>
      <p>Start training at least 8 weeks before your climb. Focus on cardiovascular fitness, leg strength, and hiking with a weighted pack. Practice on local hills and mountains if possible.</p>
      
      <h2>Best Climbing Season</h2>
      <p>The dry seasons (January-March and June-October) offer the best climbing conditions with clear skies and minimal rainfall.</p>
    `,
    author: "Peter Mwangi",
    date: "2024-01-05",
    category: "Adventure Travel",
    image: "/mount-kenya-hikers.png",
    readTime: "10 min read",
  },
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug as keyof typeof blogPosts]

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/blog">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>

          <Card>
            <div className="relative h-96 overflow-hidden rounded-t-lg">
              <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
            </div>

            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-4">
                <Badge variant="secondary">{post.category}</Badge>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.date).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  {post.author}
                </div>
                <span className="text-sm text-muted-foreground">{post.readTime}</span>
              </div>

              <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>

              <div className="flex items-center justify-between mb-8 pb-4 border-b">
                <p className="text-lg text-muted-foreground">{post.excerpt}</p>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>

              <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
