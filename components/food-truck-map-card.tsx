"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, MapPin, X, Star } from "lucide-react"
import type { FoodTruck } from "@/types/food-truck"
import { cn } from "@/lib/utils"
import { useAuthRequired } from "@/hooks/use-auth-required"

interface FoodTruckMapCardProps {
  truck: FoodTruck
  onClose: () => void
}

export function FoodTruckMapCard({ truck, onClose }: FoodTruckMapCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const { checkAuth } = useAuthRequired()

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    // check if user is authenticated before allowing to favorite
    if (checkAuth("saving favorites")) {
      setIsFavorite(!isFavorite)
    }
  }

  return (
    <Card className="w-full max-w-md shadow-xl overflow-hidden rounded-2xl border-border hover:shadow-2xl transition-shadow">
      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 rounded-full bg-background/90 dark:bg-background/80 backdrop-blur-sm z-10 shadow-md hover:bg-background/100 dark:hover:bg-background/100 transition-colors"
          onClick={onClose}
          aria-label="close food truck details"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </Button>

        <Link href={`/truck/${truck.id}`} className="block focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-2xl" aria-label={`view details for ${truck.name}`}>
          <article className="flex">
            <div className="relative w-2/5 aspect-square">
              <Image 
                src={truck.image || "/placeholder.svg"} 
                alt="" 
                fill 
                className="object-cover" 
                aria-hidden="true" 
              />

              {/* logo overlay */}
              <div className="absolute -bottom-6 left-5 z-10">
                <div className="h-12 w-12 rounded-xl overflow-hidden border-2 border-background shadow-md bg-background">
                  <Image
                    src={truck.logo || "/placeholder.svg?height=48&width=48"}
                    alt=""
                    width={48}
                    height={48}
                    className="object-cover"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
            <div className="p-5 flex-1">
              <header className="flex items-center justify-between pt-1">
                <h3 className="font-semibold text-lg text-foreground">{truck.name.toLowerCase()}</h3>
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" aria-hidden="true" />
                  <span 
                    className="text-sm font-medium"
                    aria-label={`rating ${truck.rating} out of 5`}
                  >
                    {truck.rating}
                  </span>
                </div>
              </header>

              <div className="flex items-center text-muted-foreground text-sm mt-2">
                <MapPin className="h-3 w-3 mr-1 flex-shrink-0" aria-hidden="true" />
                <span>{truck.distance} miles away</span>
              </div>

              <div className="flex flex-wrap gap-1 mt-3" aria-label="cuisine types">
                {truck.tags.slice(0, 2).map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-xs font-normal rounded-full px-2 py-0.5 bg-secondary/20 dark:bg-secondary/10 text-secondary-foreground border-secondary/30"
                  >
                    {tag.toLowerCase()}
                  </Badge>
                ))}
              </div>

              <div className="flex justify-between items-center mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full text-xs px-3 py-1 h-auto border-border hover:bg-muted/50 transition-colors"
                  onClick={toggleFavorite}
                  aria-pressed={isFavorite}
                  aria-label={isFavorite ? "remove from favorites" : "add to favorites"}
                >
                  <Heart 
                    className={cn("h-3 w-3 mr-1", isFavorite ? "fill-primary text-primary" : "")} 
                    aria-hidden="true" 
                  />
                  {isFavorite ? "saved" : "save"}
                </Button>

                <Button
                  size="sm"
                  className="rounded-full text-xs px-4 py-1 h-auto bg-primary hover:bg-primary/90 text-primary-foreground hover:shadow-md transition-all"
                >
                  view details
                </Button>
              </div>
              
              {!truck.isOpen && (
                <div className="mt-3 text-xs text-muted-foreground bg-muted dark:bg-muted/50 rounded-full px-2 py-1 inline-block">
                  currently closed
                </div>
              )}
            </div>
          </article>
        </Link>
      </div>
    </Card>
  )
}
