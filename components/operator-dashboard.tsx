"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  BarChart3,
  Calendar,
  Clock,
  CreditCard,
  Edit,
  FileText,
  MapPin,
  MessageSquare,
  Settings,
  Star,
  Truck,
  Upload,
  Users,
} from "lucide-react"

export function OperatorDashboard() {
  const [isActive, setIsActive] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Truck className="h-6 w-6 text-[#FF5A5F]" />
            <span className="font-bold text-[#FF5A5F]">Food Truckies</span>
            <span className="text-sm text-gray-500">| Operator</span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch id="active-status" checked={isActive} onCheckedChange={setIsActive} />
              <Label htmlFor="active-status" className={isActive ? "text-green-600" : "text-gray-500"}>
                {isActive ? "Active" : "Inactive"}
              </Label>
            </div>

            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>

            <div className="relative h-8 w-8 rounded-full overflow-hidden">
              <Image src="/placeholder.svg?height=32&width=32" alt="Profile" fill className="object-cover" />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
          <div className="hidden md:block">
            <nav className="space-y-1">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/operator">
                  <BarChart3 className="h-5 w-5 mr-3" />
                  Dashboard
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/operator/profile">
                  <Truck className="h-5 w-5 mr-3" />
                  Truck Profile
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/operator/menu">
                  <FileText className="h-5 w-5 mr-3" />
                  Menu
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/operator/schedule">
                  <Calendar className="h-5 w-5 mr-3" />
                  Schedule
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/operator/reviews">
                  <Star className="h-5 w-5 mr-3" />
                  Reviews
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/operator/messages">
                  <MessageSquare className="h-5 w-5 mr-3" />
                  Messages
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/operator/subscription">
                  <CreditCard className="h-5 w-5 mr-3" />
                  Subscription
                </Link>
              </Button>
            </nav>
          </div>

          <div>
            <Tabs defaultValue="dashboard">
              <TabsList className="md:hidden grid w-full grid-cols-4 mb-4">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="menu">Menu</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold">Dashboard</h1>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Clock className="h-4 w-4 mr-2" />
                      Last 7 days
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Profile Views</p>
                          <h3 className="text-2xl font-bold">1,248</h3>
                          <p className="text-xs text-green-600">+12% from last week</p>
                        </div>
                        <Users className="h-10 w-10 text-gray-400" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Active Hours</p>
                          <h3 className="text-2xl font-bold">32.5</h3>
                          <p className="text-xs text-red-600">-4% from last week</p>
                        </div>
                        <Clock className="h-10 w-10 text-gray-400" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">New Reviews</p>
                          <h3 className="text-2xl font-bold">24</h3>
                          <p className="text-xs text-green-600">+8% from last week</p>
                        </div>
                        <Star className="h-10 w-10 text-gray-400" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Average Rating</p>
                          <h3 className="text-2xl font-bold">4.8</h3>
                          <p className="text-xs text-gray-500">No change</p>
                        </div>
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Upcoming Schedule</CardTitle>
                      <CardDescription>Your next 3 scheduled locations</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="flex gap-4 items-center">
                            <div className="bg-gray-100 rounded-md p-3 text-center min-w-[70px]">
                              <div className="text-sm font-medium">
                                {new Date(Date.now() + i * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                })}
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">Downtown Food Festival</div>
                              <div className="text-sm text-gray-600 flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                123 Main St
                              </div>
                              <div className="text-sm text-gray-600 flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                11:00 AM - 8:00 PM
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        View Full Schedule
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Reviews</CardTitle>
                      <CardDescription>Latest customer feedback</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="border-b pb-4 last:border-0 last:pb-0">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                <div className="relative h-8 w-8 rounded-full overflow-hidden mr-2">
                                  <Image
                                    src="/placeholder.svg?height=32&width=32"
                                    alt="User"
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <span className="font-medium">Customer {i}</span>
                              </div>
                              <div className="flex">
                                {Array.from({ length: 5 }).map((_, j) => (
                                  <Star
                                    key={j}
                                    className={`h-3 w-3 ${j < 5 - (i % 2) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-gray-600">
                              {i === 1
                                ? "Amazing food and great service! Will definitely come back again."
                                : i === 2
                                  ? "The tacos were delicious but had to wait a bit too long."
                                  : "Best food truck in the area. Highly recommend the special sauce!"}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        View All Reviews
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="profile" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold">Truck Profile</h1>
                  <Button>Save Changes</Button>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>Update your food truck's basic details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="truck-name">Food Truck Name</Label>
                      <Input id="truck-name" defaultValue="Taco Delights" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="truck-description">Description</Label>
                      <Textarea
                        id="truck-description"
                        rows={4}
                        defaultValue="Authentic Mexican street tacos with a modern twist. We use fresh, locally-sourced ingredients and homemade salsas."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cuisine-type">Cuisine Type</Label>
                        <Input id="cuisine-type" defaultValue="Mexican" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" defaultValue="(555) 123-4567" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input id="website" defaultValue="https://tacodelights.com" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" defaultValue="info@tacodelights.com" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Photos & Media</CardTitle>
                    <CardDescription>Upload photos of your food truck and menu items</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Truck Logo</Label>
                      <div className="flex items-center gap-4">
                        <div className="relative h-20 w-20 rounded-md overflow-hidden border">
                          <Image
                            src="/placeholder.svg?height=80&width=80"
                            alt="Truck Logo"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload New Logo
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Cover Photos</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="relative aspect-video rounded-md overflow-hidden border group">
                            <Image
                              src="/placeholder.svg?height=120&width=200"
                              alt={`Cover Photo ${i}`}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Button variant="ghost" size="icon" className="text-white">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                        <div className="relative aspect-video rounded-md overflow-hidden border flex items-center justify-center bg-gray-50">
                          <Button variant="ghost">
                            <Upload className="h-4 w-4 mr-2" />
                            Add Photo
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Social Media</CardTitle>
                    <CardDescription>Connect your social media accounts</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="instagram">Instagram</Label>
                      <Input id="instagram" defaultValue="@tacodelights" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="twitter">Twitter</Label>
                      <Input id="twitter" defaultValue="@tacodelights" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="facebook">Facebook</Label>
                      <Input id="facebook" defaultValue="facebook.com/tacodelights" />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="menu" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold">Menu Management</h1>
                  <Button>Add Menu Item</Button>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Menu Items</CardTitle>
                    <CardDescription>Manage your food truck's menu</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          name: "Classic Taco",
                          price: 4.99,
                          description: "Corn tortilla, seasoned beef, lettuce, cheese, salsa",
                        },
                        {
                          name: "Veggie Burrito",
                          price: 8.99,
                          description: "Flour tortilla, rice, beans, grilled vegetables, guacamole",
                        },
                        {
                          name: "Chicken Quesadilla",
                          price: 7.99,
                          description: "Flour tortilla, grilled chicken, cheese, peppers, onions",
                        },
                        {
                          name: "Nachos Supreme",
                          price: 9.99,
                          description: "Tortilla chips, beef, beans, cheese, sour cream, jalapeños",
                        },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4 border-b pb-4 last:border-0 last:pb-0">
                          <div className="relative h-16 w-16 rounded-md overflow-hidden">
                            <Image
                              src="/placeholder.svg?height=64&width=64"
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">{item.name}</h3>
                              <span className="font-medium">${item.price.toFixed(2)}</span>
                            </div>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Menu Categories</CardTitle>
                    <CardDescription>Organize your menu with categories</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {["Tacos", "Burritos", "Quesadillas", "Sides", "Drinks"].map((category, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
                        >
                          <span className="font-medium">{category}</span>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Add Category
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="schedule" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold">Schedule Management</h1>
                  <Button>Add Event</Button>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Schedule</CardTitle>
                    <CardDescription>Manage your food truck's locations and hours</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex gap-4 items-center border-b pb-4 last:border-0 last:pb-0">
                          <div className="bg-gray-100 rounded-md p-3 text-center min-w-[70px]">
                            <div className="text-sm font-medium">
                              {new Date(Date.now() + i * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">
                              {i % 3 === 0
                                ? "Downtown Food Festival"
                                : i % 3 === 1
                                  ? "Farmers Market"
                                  : "Tech Park Lunch"}
                            </div>
                            <div className="text-sm text-gray-600 flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {i % 3 === 0 ? "123 Main St" : i % 3 === 1 ? "456 Market Ave" : "789 Tech Blvd"}
                            </div>
                            <div className="text-sm text-gray-600 flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {i % 2 === 0 ? "11:00 AM - 8:00 PM" : "10:00 AM - 3:00 PM"}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-500">
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

