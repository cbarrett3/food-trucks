"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MapPin, Star } from "lucide-react"
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
    <section className="pb-20" aria-labelledby="food-trucks-heading">
      <div className="p-6">
        <h2 id="food-trucks-heading" className="text-2xl font-bold">food trucks near you</h2>
        <p className="text-muted-foreground text-sm">showing {foodTrucks.length} amazing options</p>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-4">
        {foodTrucks.map((truck, index) => (
          <li key={truck.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
            >
              <Link
                href={`/truck/${truck.id}`}
                className="block h-full"
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                aria-label={`view details for ${truck.name}${!truck.isOpen ? ', currently closed' : ''}`}
              >
                <article className="bg-background rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full border border-border">
                  <div className="relative">
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <Image
                        src={truck.image || "/placeholder.svg"}
                        alt=""
                        fill
                        className={cn(
                          "object-cover transition-transform duration-500",
                          activeIndex === index ? "scale-110" : "scale-100",
                        )}
                        aria-hidden="true"
                      />
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-3 right-3 rounded-full bg-background/90 backdrop-blur-sm hover:bg-background z-10 shadow-md"
                      onClick={(e) => toggleFavorite(truck.id, e)}
                      aria-label={favorites.includes(truck.id) ? "remove from favorites" : "add to favorites"}
                      aria-pressed={favorites.includes(truck.id)}
                    >
                      <Heart
                        className={cn(
                          "h-5 w-5 transition-all duration-300",
                          favorites.includes(truck.id) ? "fill-primary text-primary scale-110" : "text-muted-foreground",
                        )}
                        aria-hidden="true"
                      />
                    </Button>

                    {truck.isPopular && (
                      <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold flex items-center shadow-md">
                        <Star
                          width="12"
                          height="12"
                          className="mr-1 text-yellow fill-yellow"
                          aria-hidden="true"
                        />
                        popular
                      </div>
                    )}

                    {!truck.isOpen && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px]">
                        <Badge variant="secondary" className="text-sm font-medium px-4 py-1.5 bg-background/90 text-foreground">
                          opens tomorrow
                        </Badge>
                      </div>
                    )}

                    {/* logo overlay */}
                    <div className="absolute -bottom-6 left-5">
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

                  <div className="p-5 pt-8 space-y-3">
                    <header className="flex justify-between items-start">
                      <h3 className="font-semibold text-lg">{truck.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 text-yellow fill-yellow" aria-hidden="true" />
                        <span 
                          className="text-sm font-medium"
                          aria-label={`rating ${truck.rating} out of 5`}
                        >
                          {truck.rating}
                        </span>
                      </div>
                    </header>

                    <div className="flex items-center text-muted-foreground text-sm">
                      <MapPin className="h-3 w-3 mr-1 flex-shrink-0" aria-hidden="true" />
                      <span>
                        {truck.distance} miles {truck.isOpen ? "• open now" : "• opens tomorrow"}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-1" aria-label="cuisine types">
                      {truck.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-xs font-normal rounded-full px-2.5 py-0.5 bg-secondary/20 text-secondary-foreground border-secondary/30"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {truck.specialOffer && (
                      <div className="pt-1">
                        <p className="text-sm font-medium text-primary bg-primary/5 px-3 py-1.5 rounded-lg">
                          {truck.specialOffer}
                        </p>
                      </div>
                    )}
                  </div>
                </article>
              </Link>
            </motion.div>
          </li>
        ))}
      </ul>
    </section>
  )
}
