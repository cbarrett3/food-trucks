"use client"

import Image from "next/image"
import { Star } from "lucide-react"
import { FoodTruck } from "@/types/food-truck"
import { cn } from "@/lib/utils"

interface FoodTruckReviewsProps {
  truck: FoodTruck
}

export function FoodTruckReviews({ truck }: FoodTruckReviewsProps) {
  return (
    <div className="px-4 py-4 space-y-4">
      {truck.reviews.map((review) => (
        <div 
          key={review.id} 
          className="border-b border-border pb-4 last:border-0 hover:bg-muted/30 p-2 rounded-lg transition-colors"
          aria-label={`review by ${review.userName}`}
        >
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8 rounded-full overflow-hidden">
              <Image
                src={review.userImage}
                alt={review.userName}
                fill
                className="object-cover"
              />
            </div>
            
            <div>
              <div className="font-medium">{review.userName.toLowerCase()}</div>
              <div className="text-xs text-muted-foreground">{review.date}</div>
            </div>
          </div>
          
          <div className="flex items-center mt-2" aria-label={`rating: ${review.rating} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i}
                className={cn(
                  "h-3.5 w-3.5 mr-0.5",
                  i < review.rating 
                    ? "text-yellow-500 fill-yellow-500" 
                    : "text-muted stroke-muted"
                )}
                aria-hidden="true"
              />
            ))}
          </div>
          
          <p className="text-sm mt-2">{review.text.toLowerCase()}</p>
        </div>
      ))}
    </div>
  )
}
