"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import dynamic from "next/dynamic"
import { Skeleton } from "@/components/ui/skeleton"
import { FoodTruckDetailDrawer } from "./food-truck-detail-drawer"
import { foodTrucks } from "@/data/food-trucks"
import type { FoodTruck } from "@/types/food-truck"

// dynamically import mapbox component with no SSR
const MapboxComponent = dynamic(
  () => import("@/components/mapbox-component"),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-accent/10">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-24 h-24">
            <Skeleton className="absolute inset-0 rounded-full animate-pulse" />
          </div>
          <p className="text-sm text-muted-foreground">loading map...</p>
        </div>
      </div>
    )
  }
)

export function MapView() {
  const [selectedTruckId, setSelectedTruckId] = useState<string | null>(null)
  const { theme } = useTheme()
  
  // find the selected truck
  const selectedTruck = selectedTruckId 
    ? foodTrucks.find(truck => truck.id === selectedTruckId) || null 
    : null
  
  // handle selecting a truck
  const handleTruckSelect = (truckId: string | null) => {
    setSelectedTruckId(truckId)
  }
  
  return (
    <div className="relative w-full h-[calc(100vh-8rem)]">
      <MapboxComponent 
        theme={theme} 
        onTruckSelect={handleTruckSelect} 
      />
      
      {/* Food truck detail drawer */}
      <FoodTruckDetailDrawer 
        truck={selectedTruck} 
        open={!!selectedTruck}
        onClose={() => setSelectedTruckId(null)}
      />
    </div>
  )
}
