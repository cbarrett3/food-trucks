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
import { motion } from "framer-motion"
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
    <div className="bg-background border-b dark:border-border/40 py-3 px-4">
      {/* location search and radius */}
      <div className="mb-3 flex flex-col sm:flex-row gap-2">
        <div className="relative flex-grow">
          <Input
            placeholder="Search location"
            className="pl-10 pr-4 py-2 rounded-full border-input/50 focus:border-primary"
            aria-label="search for a location"
          />
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              className="flex items-center gap-1 rounded-full border-input/50 whitespace-nowrap"
              aria-label="set radius distance filter"
            >
              <span>{radius} miles</span>
              <ChevronDown className="h-3 w-3 opacity-70" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-4">
            <div className="space-y-4">
              <h4 className="font-medium text-sm">Distance Radius</h4>
              <Slider
                defaultValue={[radius]}
                max={25}
                min={1}
                step={1}
                onValueChange={(value) => setRadius(value[0])}
                aria-label="adjust distance radius"
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
          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleFilter('vegetarian')}
            className={cn(
              "rounded-full border-input/50 whitespace-nowrap transition-all",
              isActive('vegetarian') && "bg-primary text-primary-foreground border-primary"
            )}
            aria-label="filter vegetarian food trucks"
            aria-pressed={isActive('vegetarian')}
          >
            <Leaf className="h-3.5 w-3.5 mr-1" />
            <span>Vegetarian</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleFilter('vegan')}
            className={cn(
              "rounded-full border-input/50 whitespace-nowrap transition-all",
              isActive('vegan') && "bg-primary text-primary-foreground border-primary"
            )}
            aria-label="filter vegan food trucks"
            aria-pressed={isActive('vegan')}
          >
            <Leaf className="h-3.5 w-3.5 mr-1" />
            <span>Vegan</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleFilter('recent')}
            className={cn(
              "rounded-full border-input/50 whitespace-nowrap transition-all",
              isActive('recent') && "bg-primary text-primary-foreground border-primary"
            )}
            aria-label="filter recently added food trucks"
            aria-pressed={isActive('recent')}
          >
            <Sparkles className="h-3.5 w-3.5 mr-1" />
            <span>Recently Added</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleFilter('open')}
            className={cn(
              "rounded-full border-input/50 whitespace-nowrap transition-all",
              isActive('open') && "bg-primary text-primary-foreground border-primary"
            )}
            aria-label="filter open food trucks"
            aria-pressed={isActive('open')}
          >
            <Clock className="h-3.5 w-3.5 mr-1" />
            <span>Open Now</span>
          </Button>
        </div>
        <ScrollBar orientation="horizontal" className="opacity-0 sm:opacity-100" />
      </ScrollArea>
      
      {/* active filters indicator */}
      {activeFilters.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 flex items-center"
        >
          <span className="text-xs text-muted-foreground">
            {activeFilters.length} {activeFilters.length === 1 ? 'filter' : 'filters'} applied
          </span>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs h-auto py-0 px-2 text-muted-foreground hover:text-foreground"
            onClick={() => setActiveFilters([])}
            aria-label="clear all filters"
          >
            Clear all
          </Button>
        </motion.div>
      )}
    </div>
  )
}
