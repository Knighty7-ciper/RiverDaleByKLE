"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { User, Calendar, Star, Edit } from "lucide-react"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile")

  // Real profile wiring requires auth; placeholder data removed. Display minimal UI until auth is configured.
  const user = { name: "", email: "", phone: "", location: "", joinDate: "", totalBookings: 0, favoriteDestination: "" }
  const bookings: { id: string; destination: string; date: string; status: string; price: string; rating: number | null }[] = []

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-amber-50/20 dark:to-amber-950/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-heading text-4xl font-bold bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent mb-2">
            My Profile
          </h1>
          <p className="text-muted-foreground text-lg">Manage your account and view your travel history</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-amber-600 data-[state=active]:text-white"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="bookings"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-amber-600 data-[state=active]:text-white"
            >
              My Bookings
            </TabsTrigger>
            <TabsTrigger
              value="preferences"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-amber-600 data-[state=active]:text-white"
            >
              Preferences
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Info */}
              <Card className="lg:col-span-2 border-amber-200 dark:border-amber-800 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-amber-50 to-amber-100/50 dark:from-amber-950/20 dark:to-amber-900/10 rounded-t-lg">
                  <CardTitle className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
                    <User className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-amber-300 hover:bg-amber-50 dark:border-amber-700 dark:hover:bg-amber-950/20 bg-transparent"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                      <p className="text-foreground font-medium">{user.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Email</label>
                      <p className="text-foreground font-medium">{user.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Phone</label>
                      <p className="text-foreground font-medium">{user.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Location</label>
                      <p className="text-foreground font-medium">{user.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stats Card */}
              <Card className="border-amber-200 dark:border-amber-800 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100/50 dark:from-amber-950/20 dark:to-amber-900/10 rounded-t-lg">
                  <CardTitle className="text-amber-800 dark:text-amber-200">Travel Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
                      {user.totalBookings}
                    </div>
                    <p className="text-sm text-muted-foreground">Total Bookings</p>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-foreground">{user.favoriteDestination}</div>
                    <p className="text-sm text-muted-foreground">Favorite Destination</p>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-foreground">{user.joinDate}</div>
                    <p className="text-sm text-muted-foreground">Member Since</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <Card className="border-amber-200 dark:border-amber-800 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100/50 dark:from-amber-950/20 dark:to-amber-900/10 rounded-t-lg">
                <CardTitle className="text-amber-800 dark:text-amber-200">My Bookings</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-6 border border-amber-200 dark:border-amber-800 rounded-lg bg-gradient-to-r from-amber-50/50 to-transparent dark:from-amber-950/10 hover:shadow-md transition-shadow"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{booking.destination}</h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {booking.date}
                          </div>
                          <div className="font-medium text-foreground">{booking.price}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={booking.status === "Completed" ? "default" : "secondary"}>
                          {booking.status}
                        </Badge>
                        {booking.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                            <span className="text-sm font-medium">{booking.rating}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <Card className="border-amber-200 dark:border-amber-800 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100/50 dark:from-amber-950/20 dark:to-amber-900/10 rounded-t-lg">
                <CardTitle className="text-amber-800 dark:text-amber-200">Travel Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Preferred Travel Style</label>
                  <p className="text-foreground font-medium">Adventure & Wildlife</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Budget Range</label>
                  <p className="text-foreground font-medium">KSh 25,000 - KSh 50,000</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Notification Preferences</label>
                  <p className="text-foreground font-medium">Email & SMS</p>
                </div>
                <Button
                  variant="outline"
                  className="border-amber-300 hover:bg-amber-50 dark:border-amber-700 dark:hover:bg-amber-950/20 bg-transparent"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Update Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
