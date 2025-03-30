"use client"

import { useState, useEffect, useRef } from "react"
import { MapView } from "@/components/map-view"
import { FoodTruckList } from "@/components/food-truck-list"
import { FilterBar } from "@/components/filter-bar"
import { LocationNotification } from "@/components/location-notification"
import { Button } from "@/components/ui/button"
import { MapPin, List, X, Check } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { VisibleTrucksProvider } from "@/context/visible-trucks-context"

export function HomeView() {
  const [viewMode, setViewMode] = useState<"map" | "list">("map")
  const isMobile = useMobile()
  const [showLocationPrompt, setShowLocationPrompt] = useState(true)
  const [locationPermissionGranted, setLocationPermissionGranted] = useState(false)
  const [showLocationSuccess, setShowLocationSuccess] = useState(false)
  const locationPromptDismissed = useRef(false)

  // check if location prompt should be shown based on local storage
  useEffect(() => {
    // check if we've already dismissed the prompt or granted permission
    const promptDismissed = localStorage.getItem('locationPromptDismissed') === 'true'
    const permissionGranted = localStorage.getItem('locationPermissionGranted') === 'true'
    
    locationPromptDismissed.current = promptDismissed
    setLocationPermissionGranted(permissionGranted)
    
    console.log('location permission from local storage:', permissionGranted)
    
    // only show prompt if neither dismissed nor permission granted
    setShowLocationPrompt(!promptDismissed && !permissionGranted)
    
    // check if permission is already granted using permissions api
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions.query({ name: "geolocation" as PermissionName })
        .then(status => {
          console.log('permissions api status:', status.state)
          if (status.state === "granted") {
            console.log('setting location permission to true from permissions api')
            setLocationPermissionGranted(true)
            localStorage.setItem('locationPermissionGranted', 'true')
            setShowLocationPrompt(false)
          }
        })
        .catch(err => {
          console.error("error checking location permission:", err)
        })
    }
  }, [])
  
  // handle location prompt dismissal
  const dismissLocationPrompt = () => {
    setShowLocationPrompt(false)
    localStorage.setItem('locationPromptDismissed', 'true')
    locationPromptDismissed.current = true
  }
  
  // handle location permission granted
  const handleLocationPermissionGranted = () => {
    navigator.geolocation.getCurrentPosition(
      // success callback
      () => {
        setShowLocationPrompt(false)
        setLocationPermissionGranted(true)
        localStorage.setItem('locationPermissionGranted', 'true')
        
        // show success notification briefly
        setShowLocationSuccess(true)
        setTimeout(() => {
          setShowLocationSuccess(false)
        }, 3000)
      },
      // error callback
      (error) => {
        console.error("error getting location:", error)
        // still dismiss the prompt even if permission denied
        setShowLocationPrompt(false)
      }
    )
  }

  return (
    <VisibleTrucksProvider>
      <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-background dark:bg-gray-900">
        <FilterBar />

        {/* view toggle buttons */}
        <div className="flex justify-center my-2">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-background/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-1 flex gap-1 border border-border/10 dark:border-gray-700/30 shadow-sm"
          >
            <motion.button
              onClick={() => setViewMode("map")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={cn(
                "flex items-center gap-1 px-3 py-1.5 rounded-md transition-all duration-200 cursor-pointer",
                viewMode === "map" 
                  ? "bg-gradient-to-r from-primary/90 to-primary text-primary-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground hover:bg-background/90 dark:hover:bg-gray-800/90"
              )}
              aria-label="switch to map view"
              aria-pressed={viewMode === "map"}
            >
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">map</span>
            </motion.button>
            <motion.button
              onClick={() => setViewMode("list")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={cn(
                "flex items-center gap-1 px-3 py-1.5 rounded-md transition-all duration-200 cursor-pointer",
                viewMode === "list" 
                  ? "bg-gradient-to-r from-primary/90 to-primary text-primary-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground hover:bg-background/90 dark:hover:bg-gray-800/90"
              )}
              aria-label="switch to list view"
              aria-pressed={viewMode === "list"}
            >
              <List className="w-4 h-4" />
              <span className="text-sm font-medium">list</span>
            </motion.button>
          </motion.div>
        </div>

        <section className="relative flex-1 overflow-hidden" aria-live="polite">
          {/* keep mapview always mounted but hide it when in list view */}
          <motion.div 
            className={cn(
              "absolute inset-0 transition-all duration-300",
              viewMode === "map" ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            )}
            aria-hidden={viewMode !== "map"}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: viewMode === "map" ? 1 : 0,
              scale: viewMode === "map" ? 1 : 0.98
            }}
            transition={{ duration: 0.3 }}
          >
            <MapView locationPermissionGranted={locationPermissionGranted} />
          </motion.div>
          
          {/* only render the list when in list view for performance */}
          {viewMode === "list" && (
            <motion.div
              className="h-full overflow-y-auto pb-20 scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent"
              aria-label="list view of food trucks"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <FoodTruckList />
            </motion.div>
          )}

          {/* location permission notification */}
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
              <div className="bg-background/90 dark:bg-gray-800/80 backdrop-blur-md shadow-lg rounded-full px-5 py-3 max-w-md flex items-center gap-3 border border-border/10 dark:border-gray-700/30">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-accent flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-accent-foreground" aria-hidden="true" />
                </div>
                <p className="text-sm">enable location for the best food truck recommendations near you</p>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="flex-shrink-0 rounded-full h-auto p-1 text-muted-foreground hover:text-foreground cursor-pointer"
                    onClick={dismissLocationPrompt}
                    aria-label="dismiss notification"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    className="flex-shrink-0 rounded-full bg-primary hover:bg-primary/90 text-xs px-3 py-1 h-auto text-primary-foreground cursor-pointer hover:shadow-md transition-shadow"
                    onClick={handleLocationPermissionGranted}
                    aria-label="allow location access"
                  >
                    allow
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* location success notification */}
          {showLocationSuccess && (
            <motion.div
              className="absolute top-4 left-0 right-0 mx-auto w-max z-10"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              role="status"
              aria-live="polite"
            >
              <div className="bg-background/90 dark:bg-gray-800/80 backdrop-blur-md shadow-lg rounded-full px-5 py-3 flex items-center gap-3 border border-border/10 dark:border-gray-700/30">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <Check className="h-4 w-4 text-green-600 dark:text-green-400" aria-hidden="true" />
                </div>
                <p className="text-sm">location access granted! map centered on your location</p>
              </div>
            </motion.div>
          )}
        </section>
      </div>
    </VisibleTrucksProvider>
  )
}
