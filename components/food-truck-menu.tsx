"use client"

import Image from "next/image"
import { FoodTruck } from "@/types/food-truck"

interface FoodTruckMenuProps {
  truck: FoodTruck
}

export function FoodTruckMenu({ truck }: FoodTruckMenuProps) {
  return (
    <div className="px-4 py-4 space-y-4">
      {truck.specialOffer && (
        <div className="bg-primary/10 dark:bg-primary/20 rounded-lg p-3 text-sm">
          <p className="font-medium text-primary">special offer</p>
          <p>{truck.specialOffer.toLowerCase()}</p>
        </div>
      )}
      
      <div className="space-y-4">
        {truck.menuItems.map((item, index) => (
          <div 
            key={index} 
            className="flex gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
            aria-label={`menu item ${item.name}`}
          >
            {item.image && (
              <div className="relative h-16 w-16 rounded-lg overflow-hidden flex-shrink-0 border border-border">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            
            <div className="flex-1">
              <div className="flex justify-between">
                <h3 className="font-medium">{item.name.toLowerCase()}</h3>
                <span className="font-medium">${item.price.toFixed(2)}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{item.description.toLowerCase()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
