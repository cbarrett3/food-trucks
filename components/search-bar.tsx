"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { MapPin, Search, CalendarIcon, Clock, Users } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export function SearchBar() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)

  return (
    <div className="w-full px-4 py-4 bg-white">
      <div className="mx-auto max-w-3xl">
        {!isSearchExpanded ? (
          <Button
            variant="outline"
            className="w-full flex items-center justify-between rounded-full border border-gray-300 shadow-sm hover:shadow-md transition-shadow"
            onClick={() => setIsSearchExpanded(true)}
          >
            <div className="flex items-center">
              <Search className="h-4 w-4 mr-2 text-gray-500" />
              <span className="text-gray-800">Find food trucks nearby</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-6 w-[1px] bg-gray-300"></div>
              <div className="bg-[#FF5A5F] rounded-full p-1">
                <Search className="h-4 w-4 text-white" />
              </div>
            </div>
          </Button>
        ) : (
          <div className="bg-white rounded-3xl shadow-lg border p-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Where are you looking for food trucks?"
                    className="pl-10 rounded-full border-gray-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal rounded-full",
                          !date && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Time</label>
                  <Button variant="outline" className="w-full justify-start rounded-full">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>Any time</span>
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Guests</label>
                <Button variant="outline" className="w-full justify-start rounded-full">
                  <Users className="mr-2 h-4 w-4" />
                  <span>Number of people</span>
                </Button>
              </div>

              <div className="flex justify-between items-center pt-2">
                <Button variant="ghost" className="text-gray-500" onClick={() => setIsSearchExpanded(false)}>
                  Cancel
                </Button>
                <Button className="rounded-full bg-[#FF5A5F] hover:bg-[#FF5A5F]/90 px-6">Search</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

