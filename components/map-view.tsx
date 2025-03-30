"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { foodTrucks } from "@/data/food-trucks"
import { FoodTruckMapCard } from "@/components/food-truck-map-card"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export function MapView() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [selectedTruck, setSelectedTruck] = useState<string | null>(null)
  const [isLocating, setIsLocating] = useState(false)

  useEffect(() => {
    // In a real app, this would be replaced with actual map integration
    // like Google Maps or Mapbox
    const mockMap = () => {
      if (mapRef.current) {
        const mapContainer = mapRef.current
        mapContainer.style.backgroundImage = "url('/placeholder.svg?height=1000&width=1000')"
        mapContainer.style.backgroundSize = "cover"
        mapContainer.style.backgroundPosition = "center"
      }
    }

    mockMap()

    // Try to get user location, but handle errors gracefully
    if (navigator.geolocation) {
      try {
        setIsLocating(true)
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            })
            setIsLocating(false)
          },
          (error) => {
            console.log("Geolocation error:", error.message)
            // Set a default location instead (e.g., city center)
            setUserLocation({
              lat: 37.7749, // Default to San Francisco coordinates
              lng: -122.4194, // or any other default location
            })
            setIsLocating(false)
          },
          { timeout: 10000, enableHighAccuracy: false },
        )
      } catch (error) {
        console.log("Geolocation exception:", error)
        // Set default location here too
        setUserLocation({
          lat: 37.7749,
          lng: -122.4194,
        })
        setIsLocating(false)
      }
    } else {
      console.log("Geolocation is not supported by this browser")
      // Set default location for browsers without geolocation support
      setUserLocation({
        lat: 37.7749,
        lng: -122.4194,
      })
    }
  }, [])

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full bg-gray-200">
        {/* Map will be rendered here */}
      </div>

      {/* Food truck markers */}
      {foodTrucks.map((truck) => (
        <motion.div
          key={truck.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{ top: `${30 + Math.random() * 40}%`, left: `${30 + Math.random() * 40}%` }}
          onClick={() => setSelectedTruck(truck.id)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div
            className={cn(
              "flex items-center justify-center rounded-full shadow-lg cursor-pointer transition-all",
              selectedTruck === truck.id ? "ring-2 ring-[#FF5A5F] scale-110" : "hover:shadow-xl",
            )}
          >
            <div className="h-12 w-12 rounded-full overflow-hidden bg-white p-0.5">
              <Image
                src={truck.logo || "/placeholder.svg?height=48&width=48"}
                alt={`${truck.name} logo`}
                width={48}
                height={48}
                className="object-cover rounded-full"
              />
            </div>
          </div>
        </motion.div>
      ))}

      {/* User location marker */}
      {userLocation && (
        <div className="absolute transform -translate-x-1/2 -translate-y-1/2" style={{ top: "50%", left: "50%" }}>
          <div className="relative">
            <div className="h-6 w-6 rounded-full bg-blue-500 border-2 border-white shadow-md flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-white"></div>
            </div>
            <div className="absolute -top-1 -left-1 h-8 w-8 rounded-full bg-blue-500 opacity-30 animate-ping"></div>
          </div>
        </div>
      )}

      {/* Selected food truck card */}
      <AnimatePresence>
        {selectedTruck && (
          <motion.div
            className="absolute bottom-24 left-0 right-0 flex justify-center px-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <FoodTruckMapCard
              truck={foodTrucks.find((t) => t.id === selectedTruck)!}
              onClose={() => setSelectedTruck(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* User location button */}
      <div className="absolute bottom-24 right-4">
        <Button
          variant="default"
          size="icon"
          className={cn(
            "h-12 w-12 rounded-full shadow-lg bg-white text-gray-800 hover:bg-gray-100",
            isLocating && "animate-pulse",
          )}
          onClick={() => {
            if (navigator.geolocation) {
              try {
                setIsLocating(true)
                navigator.geolocation.getCurrentPosition(
                  (position) => {
                    setUserLocation({
                      lat: position.coords.latitude,
                      lng: position.coords.longitude,
                    })
                    setIsLocating(false)
                  },
                  (error) => {
                    alert("Could not access your location. Please check your browser permissions.")
                    setIsLocating(false)
                  },
                )
              } catch (error) {
                alert("Could not access your location. Please check your browser permissions.")
                setIsLocating(false)
              }
            } else {
              alert("Geolocation is not supported by this browser")
            }
          }}
        >
          <MapPin className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}

