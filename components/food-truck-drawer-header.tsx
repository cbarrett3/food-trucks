"use client"

import Image from "next/image"
import { MapPin, Phone, Globe, Star, Instagram, Twitter } from "lucide-react"
import { FoodTruck } from "@/types/food-truck"
import { cn } from "@/lib/utils"

interface FoodTruckDrawerHeaderProps {
  truck: FoodTruck
}

export function FoodTruckDrawerHeader({ truck }: FoodTruckDrawerHeaderProps) {
  return (
    <div className="px-4 pt-2 pb-4">
      <div className="flex items-start gap-3">
        <div className="relative h-16 w-16 rounded-xl overflow-hidden flex-shrink-0 border border-border">
          <Image
            src={truck.logo}
            alt={`${truck.name} logo`}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <h2 
            id="food-truck-detail-title"
            className="text-lg font-semibold truncate"
          >
            {truck.name}
          </h2>
          
          <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
            <div className="flex items-center">
              <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500 mr-1" aria-hidden="true" />
              <span className="font-medium">{truck.rating.toFixed(1)}</span>
              <span className="mx-1">·</span>
              <span>{truck.reviewCount} reviews</span>
            </div>
            <span className="mx-1">·</span>
            <span>{truck.priceRange}</span>
          </div>
          
          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
            <span className={cn(
              "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
              truck.isOpen 
                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" 
                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
            )}>
              {truck.isOpen ? "open" : "closed"}
            </span>
            <span className="mx-1">·</span>
            <span className="truncate">{truck.tags.join(", ")}</span>
          </div>
        </div>
      </div>
      
      {/* location and contact */}
      <div className="mt-4 space-y-2 text-sm">
        <div className="flex items-start gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
          <span>{truck.location}</span>
        </div>
        
        <div className="flex items-start gap-2">
          <Phone className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
          <a 
            href={`tel:${truck.phone}`}
            className="text-primary hover:underline"
            aria-label={`call ${truck.name} at ${truck.phone}`}
          >
            {truck.phone}
          </a>
        </div>
        
        <div className="flex items-center gap-4">
          {truck.website && (
            <a 
              href={truck.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline flex items-center gap-1"
              aria-label={`visit ${truck.name} website`}
            >
              <Globe className="h-4 w-4" />
              <span>website</span>
            </a>
          )}
          
          {truck.instagram && (
            <a 
              href={`https://instagram.com/${truck.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline flex items-center gap-1"
              aria-label={`visit ${truck.name} instagram`}
            >
              <Instagram className="h-4 w-4" />
              <span>instagram</span>
            </a>
          )}
          
          {truck.twitter && (
            <a 
              href={`https://twitter.com/${truck.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline flex items-center gap-1"
              aria-label={`visit ${truck.name} twitter`}
            >
              <Twitter className="h-4 w-4" />
              <span>twitter</span>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
