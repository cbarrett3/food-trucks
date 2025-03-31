"use client"

import * as React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { 
  MapPin, 
  Leaf, 
  Clock, 
  Sparkles,
  ChevronDown,
  List,
  Search,
  X
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Dialog,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import * as DialogPrimitive from "@radix-ui/react-dialog"

// Custom DialogContent without X button
const CustomDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay 
      asChild
      className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    </DialogPrimitive.Overlay>
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200",
        className
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
))
CustomDialogContent.displayName = DialogPrimitive.Content.displayName

interface FilterBarProps {
  onFilterClick?: () => void;
  viewMode?: "map" | "list";
  setViewMode?: (mode: "map" | "list") => void;
}

export function FilterBar({ onFilterClick, viewMode = "map", setViewMode }: FilterBarProps) {
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [radius, setRadius] = useState<number>(5)
  const [searchExpanded, setSearchExpanded] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  
  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 640)
    }
    
    // Initial check
    checkScreenSize()
    
    // Add resize listener
    window.addEventListener('resize', checkScreenSize)
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])
  
  // Focus search input when expanded
  useEffect(() => {
    if (searchExpanded && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [searchExpanded])
  
  // toggle a filter on/off
  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter))
    } else {
      setActiveFilters([...activeFilters, filter])
    }
  }
  
  // check if a filter is active
  const isActive = (filter: string) => activeFilters.includes(filter)
  
  // handle view mode toggle
  const handleViewModeChange = (mode: "map" | "list") => {
    if (setViewMode) {
      setViewMode(mode)
    }
  }
  
  // handle search query change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }
  
  // handle search clear
  const handleClearSearch = () => {
    setSearchQuery("")
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }
  
  // handle search submit
  const handleSearchSubmit = () => {
    // Implement search functionality
    console.log("Searching for:", searchQuery)
    // Close search on mobile after submit
    if (isSmallScreen) {
      setSearchExpanded(false)
    }
  }

  return (
    <div className="space-y-3">
      {/* Mobile collapsed search bar - Airbnb inspired */}
      {isSmallScreen && !searchExpanded && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="sm:hidden"
        >
          <button
            onClick={() => setSearchExpanded(true)}
            className="flex items-center w-full rounded-full border border-border/30 dark:border-gray-700/50 bg-background/80 dark:bg-gray-800/70 shadow-sm py-2.5 px-4 hover:cursor-pointer"
            aria-label="expand search options"
          >
            <Search className="h-4 w-4 text-muted-foreground mr-2" />
            <span className="text-muted-foreground text-sm">Start your search</span>
            <div className="ml-auto bg-primary rounded-full p-1.5">
              <Search className="h-3 w-3 text-primary-foreground" />
            </div>
          </button>
        </motion.div>
      )}
      
      {/* Mobile expanded search dialog - Airbnb inspired */}
      {isSmallScreen && (
        <Dialog open={searchExpanded} onOpenChange={setSearchExpanded}>
          <AnimatePresence mode="wait">
            {searchExpanded && (
              <CustomDialogContent className="sm:hidden p-0 gap-0 max-w-full h-screen rounded-none fixed inset-0 top-0 left-0 translate-x-0 translate-y-0 border-0 dark:bg-gray-900" asChild>
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ 
                    type: "spring", 
                    damping: 25,
                    stiffness: 400,
                    mass: 0.5,
                    duration: 0.2
                  }}
                >
                  <div className="relative pt-3 pb-4">
                    {/* Airbnb-style circular close button in top-left */}
                    <motion.button 
                      onClick={() => setSearchExpanded(false)}
                      className="absolute top-3 left-4 rounded-full p-2.5 bg-background dark:bg-gray-800 border border-border/20 dark:border-gray-700/50 hover:bg-muted/80 flex items-center justify-center shadow-sm z-10 hover:cursor-pointer"
                      aria-label="close search"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1, duration: 0.15 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <X className="h-4 w-4" />
                    </motion.button>
                    
                    {/* Hidden DialogTitle for accessibility */}
                    <DialogTitle className="sr-only">Search</DialogTitle>
                    
                    {/* Food Trucks heading */}
                    <motion.div 
                      className="flex justify-center pb-2 pt-1"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.3 }}
                    >
                      <h2 className="text-base font-medium px-2">
                        Food Trucks
                      </h2>
                    </motion.div>
                  </div>
                  
                  <div className="p-6 pt-3 overflow-y-auto">
                    <motion.div 
                      className="space-y-7"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                    >
                      {/* Search location */}
                      <div className="space-y-3">
                        <label className="text-base font-medium block text-foreground/90">Where to?</label>
                        <div className="relative">
                          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                          </div>
                          <Input 
                            ref={searchInputRef}
                            type="text" 
                            placeholder="Search location" 
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="pl-10 bg-background dark:bg-gray-800/50 border-input/30 dark:border-gray-700/50 rounded-full h-12 shadow-sm focus:ring-2 focus:ring-primary/20"
                            aria-label="search for food trucks by location"
                          />
                          {searchQuery && (
                            <button 
                              onClick={handleClearSearch}
                              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground hover:cursor-pointer"
                              aria-label="clear search"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </div>
                      
                      {/* Miles radius */}
                      <div className="space-y-3">
                        <label className="text-base font-medium block text-foreground/90">Distance</label>
                        <div className="space-y-5 px-1">
                          <div className="flex justify-between">
                            <span className="text-xs text-muted-foreground">1 mile</span>
                            <span className="text-xs text-muted-foreground">20 miles</span>
                          </div>
                          <Slider
                            value={[radius]}
                            min={1}
                            max={20}
                            step={1}
                            onValueChange={(value) => setRadius(value[0])}
                            className="py-1"
                            aria-label="select search radius"
                          />
                          <div className="text-center">
                            <span className="text-sm font-medium">{radius} {radius === 1 ? 'mile' : 'miles'}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Filter categories */}
                      <div className="space-y-3">
                        <label className="text-base font-medium block text-foreground/90">Filters</label>
                        <div className="flex flex-wrap gap-2.5">
                          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleFilter('vegetarian')}
                              className={cn(
                                "rounded-full border-input/30 dark:border-gray-700/50 whitespace-nowrap transition-all duration-200 cursor-pointer h-10 hover:cursor-pointer",
                                "hover:shadow-sm hover:border-primary/30 focus:ring-2 focus:ring-primary/20",
                                isActive('vegetarian') 
                                  ? "bg-gradient-to-r from-primary/90 to-primary text-primary-foreground border-primary shadow-sm" 
                                  : "bg-background dark:bg-gray-800/50 hover:bg-background/80 dark:hover:bg-gray-800/80"
                              )}
                              aria-label="filter vegetarian food trucks"
                              aria-pressed={isActive('vegetarian')}
                            >
                              <Leaf className="h-3.5 w-3.5 mr-1.5" />
                              <span>Vegetarian</span>
                            </Button>
                          </motion.div>
                          
                          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleFilter('vegan')}
                              className={cn(
                                "rounded-full border-input/30 dark:border-gray-700/50 whitespace-nowrap transition-all duration-200 cursor-pointer h-10 hover:cursor-pointer",
                                "hover:shadow-sm hover:border-primary/30 focus:ring-2 focus:ring-primary/20",
                                isActive('vegan') 
                                  ? "bg-gradient-to-r from-primary/90 to-primary text-primary-foreground border-primary shadow-sm" 
                                  : "bg-background dark:bg-gray-800/50 hover:bg-background/80 dark:hover:bg-gray-800/80"
                              )}
                              aria-label="filter vegan food trucks"
                              aria-pressed={isActive('vegan')}
                            >
                              <Leaf className="h-3.5 w-3.5 mr-1.5" />
                              <span>Vegan</span>
                            </Button>
                          </motion.div>
                          
                          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleFilter('recentlyAdded')}
                              className={cn(
                                "rounded-full border-input/30 dark:border-gray-700/50 whitespace-nowrap transition-all duration-200 cursor-pointer h-10 hover:cursor-pointer",
                                "hover:shadow-sm hover:border-primary/30 focus:ring-2 focus:ring-primary/20",
                                isActive('recentlyAdded') 
                                  ? "bg-gradient-to-r from-primary/90 to-primary text-primary-foreground border-primary shadow-sm" 
                                  : "bg-background dark:bg-gray-800/50 hover:bg-background/80 dark:hover:bg-gray-800/80"
                              )}
                              aria-label="filter recently added food trucks"
                              aria-pressed={isActive('recentlyAdded')}
                            >
                              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                              <span>Recently Added</span>
                            </Button>
                          </motion.div>
                          
                          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleFilter('openNow')}
                              className={cn(
                                "rounded-full border-input/30 dark:border-gray-700/50 whitespace-nowrap transition-all duration-200 cursor-pointer h-10 hover:cursor-pointer",
                                "hover:shadow-sm hover:border-primary/30 focus:ring-2 focus:ring-primary/20",
                                isActive('openNow') 
                                  ? "bg-gradient-to-r from-primary/90 to-primary text-primary-foreground border-primary shadow-sm" 
                                  : "bg-background dark:bg-gray-800/50 hover:bg-background/80 dark:hover:bg-gray-800/80"
                              )}
                              aria-label="filter open now food trucks"
                              aria-pressed={isActive('openNow')}
                            >
                              <Clock className="h-3.5 w-3.5 mr-1.5" />
                              <span>Open Now</span>
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                      
                      {/* View toggle */}
                      <div className="space-y-3">
                        <label className="text-base font-medium block text-foreground/90">View</label>
                        <div className="flex justify-center">
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="bg-background dark:bg-gray-800/70 backdrop-blur-md rounded-lg p-1 flex gap-1 border border-border/10 dark:border-gray-700/30 shadow-sm h-10 w-full max-w-xs"
                          >
                            <motion.button
                              onClick={() => handleViewModeChange("map")}
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              className={cn(
                                "flex items-center justify-center gap-1.5 px-3 py-1 rounded-md transition-all duration-200 cursor-pointer flex-1",
                                viewMode === "map" 
                                  ? "bg-gradient-to-r from-primary/90 to-primary text-primary-foreground shadow-sm" 
                                  : "text-muted-foreground hover:text-foreground hover:bg-background/90 dark:hover:bg-gray-800/90 hover:cursor-pointer"
                              )}
                              aria-label="switch to map view"
                              aria-pressed={viewMode === "map"}
                            >
                              <MapPin className="w-4 h-4" />
                              <span className="text-sm font-medium">map</span>
                            </motion.button>
                            <motion.button
                              onClick={() => handleViewModeChange("list")}
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              className={cn(
                                "flex items-center justify-center gap-1.5 px-3 py-1 rounded-md transition-all duration-200 cursor-pointer flex-1",
                                viewMode === "list" 
                                  ? "bg-gradient-to-r from-primary/90 to-primary text-primary-foreground shadow-sm" 
                                  : "text-muted-foreground hover:text-foreground hover:bg-background/90 dark:hover:bg-gray-800/90 hover:cursor-pointer"
                              )}
                              aria-label="switch to list view"
                              aria-pressed={viewMode === "list"}
                            >
                              <List className="w-4 h-4" />
                              <span className="text-sm font-medium">list</span>
                            </motion.button>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                    
                    {/* Search button */}
                    <motion.div 
                      className="mt-12 px-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.3 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        className="w-full rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base font-medium shadow-md hover:cursor-pointer"
                        onClick={handleSearchSubmit}
                      >
                        Search
                      </Button>
                    </motion.div>
                    
                    {/* Clear all button - Airbnb style */}
                    <motion.div 
                      className="mt-4 text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.3 }}
                    >
                      <button 
                        className="text-sm font-medium text-primary hover:underline hover:cursor-pointer"
                        onClick={() => {
                          setSearchQuery("");
                          setRadius(5);
                          setActiveFilters([]);
                        }}
                      >
                        Clear all
                      </button>
                    </motion.div>
                  </div>
                </motion.div>
              </CustomDialogContent>
            )}
          </AnimatePresence>
        </Dialog>
      )}
      
      {/* Desktop or mobile expanded search interface */}
      {(!isSmallScreen || (isSmallScreen && searchExpanded)) && (
        <AnimatePresence>
          {!isSmallScreen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="hidden sm:block"
            >
              {/* Desktop search interface */}
              <div className="space-y-3">
                {/* location search and miles radius */}
                <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                  {/* location search input */}
                  <div className="relative flex-grow">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <Input 
                      type="text" 
                      placeholder="Search location" 
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="pl-9 bg-background/50 dark:bg-gray-800/50 border-input/30 dark:border-gray-700/50 rounded-full h-10"
                      aria-label="search for food trucks by location"
                    />
                    {searchQuery && (
                      <button 
                        onClick={handleClearSearch}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground hover:cursor-pointer"
                        aria-label="clear search"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  
                  {/* miles radius selector */}
                  <div className="flex-shrink-0">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button 
                          variant="outline" 
                          className="bg-background/50 dark:bg-gray-800/50 border-input/30 dark:border-gray-700/50 rounded-full h-10 w-full sm:w-auto hover:cursor-pointer"
                          aria-label="select search radius in miles"
                        >
                          <span className="mr-1">{radius} miles</span>
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80 p-4" align="end">
                        <div className="space-y-4">
                          <h4 className="font-medium">Search radius</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">1 mile</span>
                              <span className="text-sm text-muted-foreground">20 miles</span>
                            </div>
                            <Slider
                              value={[radius]}
                              min={1}
                              max={20}
                              step={1}
                              onValueChange={(value) => setRadius(value[0])}
                              aria-label="select search radius"
                            />
                            <div className="text-center">
                              <span className="text-sm font-medium">{radius} {radius === 1 ? 'mile' : 'miles'}</span>
                            </div>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* filter buttons and view toggle */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* filter buttons */}
                  <div className="flex flex-wrap gap-2 flex-grow">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleFilter('vegetarian')}
                        className={cn(
                          "rounded-full border-input/30 dark:border-gray-700/50 whitespace-nowrap transition-all duration-200 cursor-pointer h-9 hover:cursor-pointer",
                          "hover:shadow-sm hover:border-primary/30 focus:ring-2 focus:ring-primary/20",
                          isActive('vegetarian') 
                            ? "bg-gradient-to-r from-primary/90 to-primary text-primary-foreground border-primary shadow-sm" 
                            : "bg-background/50 dark:bg-gray-800/50 hover:bg-background/80 dark:hover:bg-gray-800/80"
                        )}
                        aria-label="filter vegetarian food trucks"
                        aria-pressed={isActive('vegetarian')}
                      >
                        <Leaf className="h-3.5 w-3.5 mr-1" />
                        <span>Vegetarian</span>
                      </Button>
                    </motion.div>
                    
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleFilter('vegan')}
                        className={cn(
                          "rounded-full border-input/30 dark:border-gray-700/50 whitespace-nowrap transition-all duration-200 cursor-pointer h-9 hover:cursor-pointer",
                          "hover:shadow-sm hover:border-primary/30 focus:ring-2 focus:ring-primary/20",
                          isActive('vegan') 
                            ? "bg-gradient-to-r from-primary/90 to-primary text-primary-foreground border-primary shadow-sm" 
                            : "bg-background/50 dark:bg-gray-800/50 hover:bg-background/80 dark:hover:bg-gray-800/80"
                        )}
                        aria-label="filter vegan food trucks"
                        aria-pressed={isActive('vegan')}
                      >
                        <Leaf className="h-3.5 w-3.5 mr-1" />
                        <span>Vegan</span>
                      </Button>
                    </motion.div>
                    
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleFilter('recentlyAdded')}
                        className={cn(
                          "rounded-full border-input/30 dark:border-gray-700/50 whitespace-nowrap transition-all duration-200 cursor-pointer h-9 hover:cursor-pointer",
                          "hover:shadow-sm hover:border-primary/30 focus:ring-2 focus:ring-primary/20",
                          isActive('recentlyAdded') 
                            ? "bg-gradient-to-r from-primary/90 to-primary text-primary-foreground border-primary shadow-sm" 
                            : "bg-background/50 dark:bg-gray-800/50 hover:bg-background/80 dark:hover:bg-gray-800/80"
                        )}
                        aria-label="filter recently added food trucks"
                        aria-pressed={isActive('recentlyAdded')}
                      >
                        <Sparkles className="h-3.5 w-3.5 mr-1" />
                        <span>Recently Added</span>
                      </Button>
                    </motion.div>
                    
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleFilter('openNow')}
                        className={cn(
                          "rounded-full border-input/30 dark:border-gray-700/50 whitespace-nowrap transition-all duration-200 cursor-pointer h-9 hover:cursor-pointer",
                          "hover:shadow-sm hover:border-primary/30 focus:ring-2 focus:ring-primary/20",
                          isActive('openNow') 
                            ? "bg-gradient-to-r from-primary/90 to-primary text-primary-foreground border-primary shadow-sm" 
                            : "bg-background/50 dark:bg-gray-800/50 hover:bg-background/80 dark:hover:bg-gray-800/80"
                        )}
                        aria-label="filter open now food trucks"
                        aria-pressed={isActive('openNow')}
                      >
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        <span>Open Now</span>
                      </Button>
                    </motion.div>
                  </div>
                  
                  {/* view toggle - aligned with filter buttons */}
                  {setViewMode && (
                    <div className="ml-auto mt-0">
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-background/80 dark:bg-gray-800/70 backdrop-blur-md rounded-lg p-1 flex gap-1 border border-border/10 dark:border-gray-700/30 shadow-md h-9"
                      >
                        <motion.button
                          onClick={() => handleViewModeChange("map")}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className={cn(
                            "flex items-center gap-1 px-3 py-1 rounded-md transition-all duration-200 cursor-pointer",
                            viewMode === "map" 
                              ? "bg-gradient-to-r from-primary/90 to-primary text-primary-foreground shadow-sm" 
                              : "text-muted-foreground hover:text-foreground hover:bg-background/90 dark:hover:bg-gray-800/90 hover:cursor-pointer"
                          )}
                          aria-label="switch to map view"
                          aria-pressed={viewMode === "map"}
                        >
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm font-medium">map</span>
                        </motion.button>
                        <motion.button
                          onClick={() => handleViewModeChange("list")}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className={cn(
                            "flex items-center gap-1 px-3 py-1 rounded-md transition-all duration-200 cursor-pointer",
                            viewMode === "list" 
                              ? "bg-gradient-to-r from-primary/90 to-primary text-primary-foreground shadow-sm" 
                              : "text-muted-foreground hover:text-foreground hover:bg-background/90 dark:hover:bg-gray-800/90 hover:cursor-pointer"
                          )}
                          aria-label="switch to list view"
                          aria-pressed={viewMode === "list"}
                        >
                          <List className="w-4 h-4" />
                          <span className="text-sm font-medium">list</span>
                        </motion.button>
                      </motion.div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  )
}
