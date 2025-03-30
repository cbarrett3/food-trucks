"use client"

import { useState, useEffect } from "react"
import { MapView } from "@/components/map-view"
import { FoodTruckList } from "@/components/food-truck-list"
import { CategoryFilter } from "@/components/category-filter"
import { LocationNotification } from "@/components/location-notification"
import { Button } from "@/components/ui/button"
import { MapPin, List } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export function HomeView() {
  const [viewMode, setViewMode] = useState<"map" | "list">("map")
  const isMobile = useMobile()
  const [showLocationPrompt, setShowLocationPrompt] = useState(true)

  // hide location prompt after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLocationPrompt(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <CategoryFilter />

      <section className="relative flex-1 overflow-hidden" aria-live="polite">
        <AnimatePresence mode="wait">
          {viewMode === "map" ? (
            <motion.div
              key="map"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full"
              aria-label="map view of food trucks"
            >
              <MapView />
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full overflow-y-auto pb-20 scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent"
              aria-label="list view of food trucks"
            >
              <FoodTruckList />
            </motion.div>
          )}
        </AnimatePresence>

        {/* twin cities location notification */}
        <LocationNotification />

        {/* location permission notification */}
        <AnimatePresence>
          {showLocationPrompt && (
            <motion.div
              className="absolute top-4 left-0 right-0 mx-auto w-max z-10"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              role="alert"
              aria-live="polite"
            >
              <div className="bg-background/90 dark:bg-background/80 backdrop-blur-md shadow-lg rounded-full px-5 py-3 max-w-md flex items-center gap-3 border border-border">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-accent flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-accent-foreground" aria-hidden="true" />
                </div>
                <p className="text-sm">enable location for the best food truck recommendations near you</p>
                <Button
                  size="sm"
                  className="flex-shrink-0 rounded-full bg-primary hover:bg-primary/90 text-xs px-3 py-1 h-auto text-primary-foreground cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setShowLocationPrompt(false)}
                  aria-label="allow location access"
                >
                  allow
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* floating view toggle */}
        <div
          className={cn(
            "absolute z-10 bg-background dark:bg-background/90 rounded-full shadow-lg overflow-hidden border border-border",
            isMobile ? "bottom-6 left-1/2 transform -translate-x-1/2" : "top-4 right-4",
          )}
          role="group"
          aria-label="view mode toggle"
        >
          <div className="flex p-1">
            <Button
              variant={viewMode === "map" ? "default" : "ghost"}
              className={cn(
                "rounded-full text-sm h-9 cursor-pointer transition-all",
                viewMode === "map" 
                  ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-md" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
              onClick={() => setViewMode("map")}
              aria-pressed={viewMode === "map"}
              aria-label="show map view"
            >
              <MapPin className="h-4 w-4 mr-2" aria-hidden="true" />
              map
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              className={cn(
                "rounded-full text-sm h-9 cursor-pointer transition-all",
                viewMode === "list" 
                  ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-md" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
              onClick={() => setViewMode("list")}
              aria-pressed={viewMode === "list"}
              aria-label="show list view"
            >
              <List className="h-4 w-4 mr-2" aria-hidden="true" />
              list
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
