"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Filter, Clock, Star, DollarSign, MapPin } from "lucide-react"
import { Input } from "@/components/ui/input"

interface FilterBarProps {
  onFilterClick: () => void
}

export function FilterBar({ onFilterClick }: FilterBarProps) {
  const categories = [
    "All",
    "Mexican",
    "Italian",
    "American",
    "Asian",
    "Dessert",
    "Vegan",
    "Vegetarian",
    "Breakfast",
    "Lunch",
    "Dinner",
  ]

  return (
    <div className="bg-white border-b py-3 px-4">
      {/* Add location search input */}
      <div className="mb-3 relative">
        <Input
          placeholder="Enter your location (e.g., San Francisco, CA)"
          className="pl-10 pr-4 py-2 rounded-full border-gray-300"
        />
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className="flex items-center gap-2 rounded-full border-gray-300"
          onClick={onFilterClick}
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
        </Button>

        <Button variant="outline" className="flex items-center gap-2 rounded-full border-gray-300">
          <Clock className="h-4 w-4" />
          <span>Open Now</span>
        </Button>

        <Button variant="outline" className="flex items-center gap-2 rounded-full border-gray-300">
          <Star className="h-4 w-4" />
          <span>Rating</span>
        </Button>

        <Button variant="outline" className="flex items-center gap-2 rounded-full border-gray-300">
          <DollarSign className="h-4 w-4" />
          <span>Price</span>
        </Button>

        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex space-x-2 p-1">
            {categories.map((category) => (
              <Button key={category} variant="ghost" className="rounded-full px-4 py-2 text-sm">
                {category}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  )
}

