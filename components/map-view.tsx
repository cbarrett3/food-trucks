"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"
import { FoodTruckDetailDrawer } from "./food-truck-detail-drawer"
import { foodTrucks } from "@/data/food-trucks"
import type { FoodTruck } from "@/types/food-truck"

// dynamically import mapbox component with no ssr
const MapboxComponent = dynamic(
  () => import("@/components/mapbox-component"),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-accent/10 dark:bg-gray-800/20">
        <motion.div 
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="relative w-24 h-24">
            <Skeleton className="absolute inset-0 rounded-full animate-pulse bg-gradient-to-br from-background/80 to-muted/50 dark:from-gray-800/80 dark:to-gray-700/50" />
          </div>
          <p className="text-sm text-muted-foreground">loading map...</p>
        </motion.div>
      </div>
    )
  }
)

interface MapViewProps {
  locationPermissionGranted?: boolean;
}

export function MapView({ locationPermissionGranted = false }: MapViewProps) {
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
    <motion.div 
      className="relative w-full h-[calc(100vh-8rem)]" 
      aria-label="food truck map view"
      role="region"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <MapboxComponent 
        theme={theme} 
        onTruckSelect={handleTruckSelect}
        locationPermissionGranted={locationPermissionGranted}
      />
      
      {/* food truck detail drawer */}
      <FoodTruckDetailDrawer 
        truck={selectedTruck} 
        open={!!selectedTruck}
        onClose={() => handleTruckSelect(null)}
      />
    </motion.div>
  )
}
