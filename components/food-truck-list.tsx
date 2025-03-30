"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MapPin } from "lucide-react"
import { foodTrucks } from "@/data/food-trucks"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export function FoodTruckList() {
  const [favorites, setFavorites] = useState<string[]>([])
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setFavorites(favorites.includes(id) ? favorites.filter((fav) => fav !== id) : [...favorites, id])
  }

  return (
    <div className="pb-20">
      <div className="p-6">
        <h2 className="text-2xl font-bold">Food Trucks Near You</h2>
        <p className="text-gray-500 text-sm">Showing {foodTrucks.length} amazing options</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-4">
        {foodTrucks.map((truck, index) => (
          <motion.div
            key={truck.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ y: -5 }}
          >
            <Link
              href={`/truck/${truck.id}`}
              className="block"
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full">
                <div className="relative">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image
                      src={truck.image || "/placeholder.svg"}
                      alt={truck.name}
                      fill
                      className={cn(
                        "object-cover transition-transform duration-500",
                        activeIndex === index ? "scale-110" : "scale-100",
                      )}
                    />
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-3 right-3 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white z-10 shadow-md"
                    onClick={(e) => toggleFavorite(truck.id, e)}
                  >
                    <Heart
                      className={cn(
                        "h-5 w-5 transition-all duration-300",
                        favorites.includes(truck.id) ? "fill-[#FF5A5F] text-[#FF5A5F] scale-110" : "text-gray-600",
                      )}
                    />
                  </Button>

                  {truck.isPopular && (
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold flex items-center shadow-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="#FFD700"
                        stroke="#FFD700"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-1"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      Popular
                    </div>
                  )}

                  {!truck.isOpen && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px]">
                      <Badge variant="secondary" className="text-sm font-medium px-4 py-1.5 bg-white/90 text-gray-800">
                        Opens Tomorrow
                      </Badge>
                    </div>
                  )}

                  {/* Logo overlay */}
                  <div className="absolute -bottom-6 left-5">
                    <div className="h-12 w-12 rounded-xl overflow-hidden border-2 border-white shadow-md bg-white">
                      <Image
                        src={truck.logo || "/placeholder.svg?height=48&width=48"}
                        alt={`${truck.name} logo`}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-8 space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg">{truck.name}</h3>
                    <div className="flex items-center">
                      <span className="text-sm font-medium bg-gray-100 px-2 py-1 rounded-md">{truck.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                    <span className="truncate">
                      {truck.distance} miles • {truck.isOpen ? "Open now" : "Opens tomorrow"}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {truck.tags.slice(0, 3).map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-xs font-normal rounded-full px-2.5 py-0.5 bg-gray-50"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {truck.specialOffer && (
                    <div className="pt-1">
                      <p className="text-sm font-medium text-[#FF5A5F] bg-[#FF5A5F]/5 px-3 py-1.5 rounded-lg">
                        {truck.specialOffer}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

