"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { 
  MapPin, 
  Leaf, 
  Clock, 
  Sparkles,
  ChevronDown
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

interface FilterBarProps {
  onFilterClick?: () => void;
}

export function FilterBar({ onFilterClick }: FilterBarProps) {
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [radius, setRadius] = useState<number>(5)
  
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
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-background/80 backdrop-blur-md border-b border-border/30 dark:border-border/10 py-3 px-4 dark:bg-gray-900/90"
    >
      {/* location search and radius */}
      <div className="mb-3 flex flex-col sm:flex-row gap-2">
        <motion.div 
          className="relative flex-grow"
          whileTap={{ scale: 0.99 }}
        >
          <Input
            placeholder="Search location"
            className="pl-10 pr-4 py-2 rounded-full border-input/50 focus:border-primary bg-background/50 dark:bg-gray-800/50 hover:bg-background/80 dark:hover:bg-gray-800/80 transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:bg-background dark:focus:bg-gray-800"
            aria-label="search for a location"
          />
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </motion.div>
        
        <Popover>
          <PopoverTrigger asChild>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-1 rounded-full py-2 px-4 whitespace-nowrap bg-background/50 dark:bg-gray-800/50 hover:bg-background/80 dark:hover:bg-gray-800/80 border border-input/30 dark:border-gray-700/50 text-sm font-medium text-foreground cursor-pointer transition-all duration-200 hover:shadow-sm hover:border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/20"
              aria-label="set radius distance filter"
            >
              <span>{radius} miles</span>
              <ChevronDown className="h-3 w-3 opacity-70" />
            </motion.button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-4 bg-background/95 dark:bg-gray-900/95 backdrop-blur-md border border-border/30 dark:border-gray-700/50 shadow-lg rounded-xl">
            <div className="space-y-4">
              <h4 className="font-medium text-sm">Distance Radius</h4>
              <Slider
                defaultValue={[radius]}
                max={25}
                min={1}
                step={1}
                onValueChange={(value) => setRadius(value[0])}
                aria-label="adjust distance radius"
                className="[&>span]:bg-primary/80 [&>span]:hover:bg-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1 mile</span>
                <span>25 miles</span>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* filter buttons */}
      <ScrollArea className="w-full">
        <div className="flex space-x-2 py-1">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleFilter('vegetarian')}
              className={cn(
                "rounded-full border-input/30 dark:border-gray-700/50 whitespace-nowrap transition-all duration-200 cursor-pointer",
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
                "rounded-full border-input/30 dark:border-gray-700/50 whitespace-nowrap transition-all duration-200 cursor-pointer",
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
              onClick={() => toggleFilter('recent')}
              className={cn(
                "rounded-full border-input/30 dark:border-gray-700/50 whitespace-nowrap transition-all duration-200 cursor-pointer",
                "hover:shadow-sm hover:border-primary/30 focus:ring-2 focus:ring-primary/20",
                isActive('recent') 
                  ? "bg-gradient-to-r from-primary/90 to-primary text-primary-foreground border-primary shadow-sm" 
                  : "bg-background/50 dark:bg-gray-800/50 hover:bg-background/80 dark:hover:bg-gray-800/80"
              )}
              aria-label="filter recently added food trucks"
              aria-pressed={isActive('recent')}
            >
              <Sparkles className="h-3.5 w-3.5 mr-1" />
              <span>Recently Added</span>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleFilter('open')}
              className={cn(
                "rounded-full border-input/30 dark:border-gray-700/50 whitespace-nowrap transition-all duration-200 cursor-pointer",
                "hover:shadow-sm hover:border-primary/30 focus:ring-2 focus:ring-primary/20",
                isActive('open') 
                  ? "bg-gradient-to-r from-primary/90 to-primary text-primary-foreground border-primary shadow-sm" 
                  : "bg-background/50 dark:bg-gray-800/50 hover:bg-background/80 dark:hover:bg-gray-800/80"
              )}
              aria-label="filter open food trucks"
              aria-pressed={isActive('open')}
            >
              <Clock className="h-3.5 w-3.5 mr-1" />
              <span>Open Now</span>
            </Button>
          </motion.div>
        </div>
        <ScrollBar orientation="horizontal" className="opacity-0 sm:opacity-100" />
      </ScrollArea>
      
      {/* active filters indicator */}
      <AnimatePresence>
        {activeFilters.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mt-2 flex items-center"
          >
            <span className="text-xs text-muted-foreground">
              {activeFilters.length} {activeFilters.length === 1 ? 'filter' : 'filters'} applied
            </span>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-xs h-auto py-0 px-2 text-muted-foreground hover:text-foreground cursor-pointer"
              onClick={() => setActiveFilters([])}
              aria-label="clear all filters"
            >
              Clear all
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
