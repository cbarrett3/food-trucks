"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, MapPin, X } from "lucide-react"
import type { FoodTruck } from "@/types/food-truck"
import { cn } from "@/lib/utils"

interface FoodTruckMapCardProps {
  truck: FoodTruck
  onClose: () => void
}

export function FoodTruckMapCard({ truck, onClose }: FoodTruckMapCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <Card className="w-full max-w-md shadow-xl overflow-hidden rounded-2xl border-none">
      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 rounded-full bg-white/90 backdrop-blur-sm z-10 shadow-md"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>

        <Link href={`/truck/${truck.id}`} className="block">
          <div className="flex">
            <div className="relative w-2/5 aspect-square">
              <Image src={truck.image || "/placeholder.svg"} alt={truck.name} fill className="object-cover" />

              {/* Logo overlay */}
              <div className="absolute -bottom-6 left-5 z-10">
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
            <div className="p-5 flex-1">
              <div className="flex items-center justify-between pt-1">
                <h3 className="font-semibold text-lg">{truck.name}</h3>
                <div className="flex items-center">
                  <span className="text-sm font-medium bg-gray-100 px-2 py-1 rounded-md">{truck.rating}</span>
                </div>
              </div>

              <div className="flex items-center text-gray-600 text-sm mt-2">
                <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                <span className="truncate">{truck.distance} miles away</span>
              </div>

              <div className="flex flex-wrap gap-1 mt-3">
                {truck.tags.slice(0, 2).map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-xs font-normal rounded-full px-2 py-0.5 bg-gray-50"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex justify-between items-center mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full text-xs px-3 py-1 h-auto"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setIsFavorite(!isFavorite)
                  }}
                >
                  <Heart className={cn("h-3 w-3 mr-1", isFavorite ? "fill-[#FF5A5F] text-[#FF5A5F]" : "")} />
                  {isFavorite ? "Saved" : "Save"}
                </Button>

                <Button
                  size="sm"
                  className="rounded-full text-xs px-4 py-1 h-auto bg-gradient-to-r from-[#FF5A5F] to-[#FF385C] hover:from-[#FF385C] hover:to-[#FF5A5F]"
                >
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </Card>
  )
}

