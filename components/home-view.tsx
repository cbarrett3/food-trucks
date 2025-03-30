"use client"

import { useState, useEffect } from "react"
import { MapView } from "@/components/map-view"
import { FoodTruckList } from "@/components/food-truck-list"
import { Navbar } from "@/components/navbar"
import { CategoryFilter } from "@/components/category-filter"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export function HomeView() {
  const [viewMode, setViewMode] = useState<"map" | "list">("map")
  const isMobile = useMobile()
  const [showLocationPrompt, setShowLocationPrompt] = useState(true)

  useEffect(() => {
    // Hide location prompt after 5 seconds
    const timer = setTimeout(() => {
      setShowLocationPrompt(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <CategoryFilter />

      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {viewMode === "map" ? (
            <motion.div
              key="map"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full"
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
              className="h-full overflow-y-auto pb-20"
            >
              <FoodTruckList />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Location permission notification */}
        <AnimatePresence>
          {showLocationPrompt && (
            <motion.div
              className="absolute top-4 left-0 right-0 mx-auto w-max z-10"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white/90 backdrop-blur-md shadow-lg rounded-full px-5 py-3 max-w-md flex items-center gap-3">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-blue-600" />
                </div>
                <p className="text-sm">Enable location for the best food truck recommendations near you</p>
                <Button
                  size="sm"
                  className="flex-shrink-0 rounded-full bg-blue-600 hover:bg-blue-700 text-xs px-3 py-1 h-auto"
                  onClick={() => setShowLocationPrompt(false)}
                >
                  Allow
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating view toggle */}
        <div
          className={cn(
            "absolute z-10 bg-white rounded-full shadow-lg overflow-hidden",
            isMobile ? "bottom-6 left-1/2 transform -translate-x-1/2" : "top-4 right-4",
          )}
        >
          <div className="flex p-1">
            <Button
              variant={viewMode === "map" ? "default" : "ghost"}
              className={cn(
                "rounded-full text-sm h-9",
                viewMode === "map" ? "bg-[#FF5A5F] text-white hover:bg-[#FF385C]" : "text-gray-600",
              )}
              onClick={() => setViewMode("map")}
            >
              <MapPin className="h-4 w-4 mr-2" />
              Map
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              className={cn(
                "rounded-full text-sm h-9",
                viewMode === "list" ? "bg-[#FF5A5F] text-white hover:bg-[#FF385C]" : "text-gray-600",
              )}
              onClick={() => setViewMode("list")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-list mr-2"
              >
                <line x1="8" x2="21" y1="6" y2="6" />
                <line x1="8" x2="21" y1="12" y2="12" />
                <line x1="8" x2="21" y1="18" y2="18" />
                <line x1="3" x2="3.01" y1="6" y2="6" />
                <line x1="3" x2="3.01" y1="12" y2="12" />
                <line x1="3" x2="3.01" y1="18" y2="18" />
              </svg>
              List
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

