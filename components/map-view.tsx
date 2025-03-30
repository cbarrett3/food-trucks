"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { MapPin, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { foodTrucks } from "@/data/food-trucks"
import { FoodTruckMapCard } from "@/components/food-truck-map-card"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

// deterministic positions for food trucks to avoid hydration errors
const truckPositions = [
  { top: "35.5%", left: "42.8%" },
  { top: "48.2%", left: "38.5%" },
  { top: "42.7%", left: "55.3%" },
  { top: "52.1%", left: "48.9%" },
  { top: "38.4%", left: "60.2%" },
  { top: "45.6%", left: "35.7%" },
]

export interface FoodTruck {
  id: string;
  name: string;
  description: string;
  cuisine: string[];
  rating: number;
  priceRange: string;
  distance: string;
  address: string;
  hours: string;
  logo?: string;
  images: string[];
  isOpen: boolean;
}

export function MapView() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [selectedTruck, setSelectedTruck] = useState<string | null>(null)
  const [isLocating, setIsLocating] = useState(false)
  // client-side only state for marker animations
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // mark that we're on the client to enable animations
    setIsClient(true)
    
    // in a real app, this would be replaced with actual map integration
    // like google maps or mapbox
    const mockMap = () => {
      if (mapRef.current) {
        const mapContainer = mapRef.current
        mapContainer.style.backgroundImage = "url('/placeholder.svg?height=1000&width=1000')"
        mapContainer.style.backgroundSize = "cover"
        mapContainer.style.backgroundPosition = "center"
      }
    }

    mockMap()

    // try to get user location, but handle errors gracefully
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
            console.log("geolocation error:", error.message)
            // set a default location instead (e.g., city center)
            setUserLocation({
              lat: 37.7749, // default to san francisco coordinates
              lng: -122.4194, // or any other default location
            })
            setIsLocating(false)
          },
          { timeout: 10000, enableHighAccuracy: false },
        )
      } catch (error) {
        console.log("geolocation exception:", error)
        // set default location here too
        setUserLocation({
          lat: 37.7749,
          lng: -122.4194,
        })
        setIsLocating(false)
      }
    } else {
      console.log("geolocation is not supported by this browser")
      // set default location for browsers without geolocation support
      setUserLocation({
        lat: 37.7749,
        lng: -122.4194,
      })
    }
  }, [])

  const handleLocationRequest = () => {
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
            alert("could not access your location. please check your browser permissions.")
            setIsLocating(false)
          },
        )
      } catch (error) {
        alert("could not access your location. please check your browser permissions.")
        setIsLocating(false)
      }
    } else {
      alert("geolocation is not supported by this browser")
    }
  }

  return (
    <section className="relative w-full h-full" aria-label="interactive food truck map">
      <div 
        ref={mapRef} 
        className="w-full h-full bg-muted"
        role="img" 
        aria-label="map of food truck locations"
      >
        {/* map will be rendered here */}
      </div>

      {/* food truck markers */}
      {foodTrucks.map((truck, index) => {
        // use modulo to ensure we don't go out of bounds with positions array
        const position = truckPositions[index % truckPositions.length]
        
        return (
          <motion.div
            key={truck.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ 
              top: position.top, 
              left: position.left,
              // disable animations until client-side
              opacity: isClient ? undefined : 0,
              scale: isClient ? undefined : 0
            }}
            onClick={() => setSelectedTruck(truck.id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={isClient ? { scale: 0, opacity: 0 } : false}
            animate={isClient ? { scale: 1, opacity: 1 } : false}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            role="button"
            tabIndex={0}
            aria-label={`${truck.name} food truck${truck.isOpen ? ', currently open' : ', currently closed'}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setSelectedTruck(truck.id);
              }
            }}
          >
            <div
              className={cn(
                "flex items-center justify-center rounded-full shadow-lg cursor-pointer transition-all",
                selectedTruck === truck.id ? "ring-2 ring-primary scale-110" : "hover:shadow-xl",
                !truck.isOpen && "grayscale opacity-75"
              )}
            >
              <div className="h-12 w-12 rounded-full overflow-hidden bg-background p-0.5">
                <Image
                  src={truck.logo || "/placeholder.svg?height=48&width=48"}
                  alt=""
                  width={48}
                  height={48}
                  className="object-cover rounded-full"
                  aria-hidden="true"
                />
              </div>
            </div>
          </motion.div>
        )
      })}

      {/* user location marker */}
      {userLocation && (
        <div 
          className="absolute transform -translate-x-1/2 -translate-y-1/2" 
          style={{ top: "50%", left: "50%" }}
          aria-hidden="true"
        >
          <div className="relative">
            <div className="h-6 w-6 rounded-full bg-accent border-2 border-background shadow-md flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-background"></div>
            </div>
            <div className="absolute -top-1 -left-1 h-8 w-8 rounded-full bg-accent opacity-30 animate-ping"></div>
          </div>
        </div>
      )}

      {/* selected food truck card */}
      <AnimatePresence>
        {selectedTruck && (
          <motion.div
            className="absolute bottom-24 left-0 right-0 flex justify-center px-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            role="dialog"
            aria-modal="true"
            aria-label="food truck details"
          >
            <FoodTruckMapCard
              truck={foodTrucks.find((t) => t.id === selectedTruck)!}
              onClose={() => setSelectedTruck(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* user location button */}
      <div className="absolute bottom-24 right-4">
        <Button
          variant="default"
          size="icon"
          className={cn(
            "h-12 w-12 rounded-full shadow-lg bg-background text-foreground hover:bg-muted",
            isLocating && "animate-pulse"
          )}
          onClick={handleLocationRequest}
          aria-label="find my location"
          title="Find my location"
        >
          <Navigation className="h-6 w-6" aria-hidden="true" />
        </Button>
      </div>
    </section>
  )
}
