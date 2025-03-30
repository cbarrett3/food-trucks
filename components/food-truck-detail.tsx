"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowLeft,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  CreditCard,
  ExternalLink,
  Heart,
  Instagram,
  MapPin,
  Phone,
  Share2,
  Star,
  Twitter,
} from "lucide-react"
import type { FoodTruck } from "@/types/food-truck"
import { useMobile } from "@/hooks/use-mobile"

interface FoodTruckDetailProps {
  truck: FoodTruck
}

export function FoodTruckDetail({ truck }: FoodTruckDetailProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const isMobile = useMobile()

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white sticky top-0 z-10 border-b">
        <div className="container mx-auto px-4 py-3 flex items-center">
          <Link href="/" className="mr-4">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">{truck.name}</h1>
        </div>
      </header>

      <div className="relative">
        <div className="relative h-64 md:h-96 overflow-hidden">
          <div className="absolute inset-0 flex">
            <div className="relative flex-1">
              <Image src={truck.image || "/placeholder.svg"} alt={truck.name} fill className="object-cover" />
            </div>
            {!isMobile && (
              <>
                <div className="relative w-1/3">
                  <Image
                    src={truck.menuImage || "/placeholder.svg?height=400&width=300"}
                    alt={`${truck.name} menu`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative w-1/3">
                  <Image
                    src={truck.interiorImage || "/placeholder.svg?height=400&width=300"}
                    alt={`${truck.name} interior`}
                    fill
                    className="object-cover"
                  />
                </div>
              </>
            )}
          </div>

          <div className="absolute bottom-4 right-4 flex gap-2">
            <Button
              variant="default"
              size="icon"
              className="rounded-full bg-white/90 backdrop-blur-sm text-black hover:bg-white"
            >
              <Share2 className="h-5 w-5" />
            </Button>
            <Button
              variant="default"
              size="icon"
              className={`rounded-full bg-white/90 backdrop-blur-sm ${isFavorite ? "text-red-500" : "text-black"} hover:bg-white`}
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart className="h-5 w-5" fill={isFavorite ? "currentColor" : "none"} />
            </Button>
          </div>

          {!isMobile && (
            <div className="absolute inset-y-0 left-0 flex items-center">
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-white/80 ml-4">
                <ChevronLeft className="h-6 w-6" />
              </Button>
            </div>
          )}

          {!isMobile && (
            <div className="absolute inset-y-0 right-0 flex items-center">
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-white/80 mr-4">
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div>
              <div className="flex justify-between items-start">
                <h1 className="text-2xl font-bold">{truck.name}</h1>
                <div className="flex items-center bg-gray-100 px-2 py-1 rounded-md">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1 font-medium">{truck.rating}</span>
                  <span className="mx-1 text-gray-400">·</span>
                  <span className="text-sm text-gray-600">{truck.reviewCount} reviews</span>
                </div>
              </div>

              <div className="flex items-center mt-2 text-gray-600">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{truck.location}</span>
                <span className="mx-1">·</span>
                <span>{truck.distance} miles away</span>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {truck.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold mb-4">About</h2>
              <p className="text-gray-700">{truck.description}</p>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold mb-4">Menu Highlights</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {truck.menuItems.map((item) => (
                  <Card key={item.name}>
                    <CardContent className="p-4 flex gap-4">
                      <div className="relative h-20 w-20 rounded-md overflow-hidden">
                        <Image
                          src={item.image || "/placeholder.svg?height=80&width=80"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                        <p className="font-medium mt-1">${item.price.toFixed(2)}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Button variant="outline" className="mt-4 w-full">
                View Full Menu
              </Button>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold mb-4">Reviews</h2>
              <div className="space-y-4">
                {truck.reviews.map((review) => (
                  <div key={review.id} className="border-b pb-4">
                    <div className="flex items-center mb-2">
                      <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                        <Image
                          src={review.userImage || "/placeholder.svg?height=40&width=40"}
                          alt={review.userName}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">{review.userName}</h4>
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                            />
                          ))}
                          <span className="ml-2 text-xs text-gray-500">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">{review.text}</p>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="mt-4 w-full">
                See All Reviews
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Hours Today</h3>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-green-500" />
                    <span className="text-green-500 font-medium">Open Now</span>
                  </div>
                  <span>11:00 AM - 8:00 PM</span>
                </div>

                <div className="mt-4 space-y-2">
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                    <div key={day} className="flex justify-between text-sm">
                      <span className="text-gray-600">{day}</span>
                      <span>11:00 AM - 8:00 PM</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Location</h3>
                <div className="aspect-video bg-gray-200 rounded-md mb-3 relative overflow-hidden">
                  <Image src="/placeholder.svg?height=200&width=300" alt="Map location" fill className="object-cover" />
                </div>
                <p className="text-gray-700 mb-3">{truck.location}</p>
                <Button variant="outline" className="w-full">
                  Get Directions
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Contact & Links</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-3 text-gray-500" />
                    <span>{truck.phone || "(555) 123-4567"}</span>
                  </div>
                  <div className="flex items-center">
                    <ExternalLink className="h-4 w-4 mr-3 text-gray-500" />
                    <a href={truck.website} className="text-blue-600 hover:underline">
                      {truck.website || "foodtruckwebsite.com"}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Instagram className="h-4 w-4 mr-3 text-gray-500" />
                    <a href={truck.instagram} className="text-blue-600 hover:underline">
                      {truck.instagram || "@foodtruck"}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Twitter className="h-4 w-4 mr-3 text-gray-500" />
                    <a href={truck.twitter} className="text-blue-600 hover:underline">
                      {truck.twitter || "@foodtruck"}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Payment Options</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <CreditCard className="h-3 w-3" />
                    Credit Card
                  </Badge>
                  <Badge variant="outline">Cash</Badge>
                  <Badge variant="outline">Apple Pay</Badge>
                  <Badge variant="outline">Google Pay</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Upcoming Schedule</h3>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-3">
                      <div className="bg-gray-100 rounded-md p-2 text-center min-w-[60px]">
                        <Calendar className="h-4 w-4 mx-auto mb-1" />
                        <div className="text-sm font-medium">
                          {new Date(Date.now() + i * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">Downtown Food Festival</div>
                        <div className="text-sm text-gray-600">123 Main St, 11:00 AM - 8:00 PM</div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-3">
                  View Full Schedule
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

