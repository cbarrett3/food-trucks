"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { foodTrucks } from "@/data/food-trucks"
import type { FoodTruck } from "@/types/food-truck"
import type { LngLatBounds } from "mapbox-gl"

interface VisibleTrucksContextType {
  visibleTrucks: FoodTruck[]
  setMapBounds: (bounds: LngLatBounds | null) => void
  isFiltered: boolean
}

const VisibleTrucksContext = createContext<VisibleTrucksContextType>({
  visibleTrucks: foodTrucks,
  setMapBounds: () => {},
  isFiltered: false
})

export function useVisibleTrucks() {
  return useContext(VisibleTrucksContext)
}

interface VisibleTrucksProviderProps {
  children: ReactNode
}

export function VisibleTrucksProvider({ children }: VisibleTrucksProviderProps) {
  const [visibleTrucks, setVisibleTrucks] = useState<FoodTruck[]>(foodTrucks)
  const [mapBounds, setMapBounds] = useState<LngLatBounds | null>(null)
  const [isFiltered, setIsFiltered] = useState(false)

  // update visible trucks when map bounds change
  useEffect(() => {
    if (!mapBounds) {
      // if no bounds, show all trucks
      setVisibleTrucks(foodTrucks)
      setIsFiltered(false)
      return
    }

    // filter trucks based on map bounds
    const filtered = foodTrucks.filter(truck => {
      const { longitude, latitude } = truck.coordinates
      
      // check if truck is within current map bounds
      return mapBounds.contains([longitude, latitude])
    })

    setVisibleTrucks(filtered)
    setIsFiltered(filtered.length !== foodTrucks.length)
  }, [mapBounds])

  return (
    <VisibleTrucksContext.Provider value={{ visibleTrucks, setMapBounds, isFiltered }}>
      {children}
    </VisibleTrucksContext.Provider>
  )
}
