"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface TimePickerProps {
  value: Date | null
  onChange: (date: Date | null) => void
  className?: string
  disabled?: boolean
  "aria-label"?: string
}

export function TimePicker({ value, onChange, className, disabled, "aria-label": ariaLabel }: TimePickerProps) {
  const [hours, setHours] = useState<string>("12")
  const [minutes, setMinutes] = useState<string>("00")
  const [period, setPeriod] = useState<"AM" | "PM">("AM")
  const [open, setOpen] = useState(false)

  // update internal state when value changes
  useEffect(() => {
    if (value) {
      const date = new Date(value)
      let hours = date.getHours()
      const minutes = date.getMinutes()
      const period = hours >= 12 ? "PM" : "AM"
      
      // convert to 12-hour format
      hours = hours % 12
      hours = hours === 0 ? 12 : hours
      
      setHours(hours.toString())
      setMinutes(minutes.toString().padStart(2, "0"))
      setPeriod(period)
    }
  }, [value])

  // handle time selection
  const handleTimeChange = () => {
    let hoursValue = parseInt(hours)
    const minutesValue = parseInt(minutes)
    
    // convert to 24-hour format
    if (period === "PM" && hoursValue < 12) {
      hoursValue += 12
    } else if (period === "AM" && hoursValue === 12) {
      hoursValue = 0
    }
    
    const date = new Date()
    date.setHours(hoursValue)
    date.setMinutes(minutesValue)
    date.setSeconds(0)
    date.setMilliseconds(0)
    
    onChange(date)
    setOpen(false)
  }

  // handle hour input changes
  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    if (value === "") {
      setHours("")
      return
    }
    
    const numValue = parseInt(value)
    if (numValue >= 0 && numValue <= 12) {
      setHours(numValue.toString())
    }
  }

  // handle minute input changes
  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    if (value === "") {
      setMinutes("")
      return
    }
    
    const numValue = parseInt(value)
    if (numValue >= 0 && numValue <= 59) {
      setMinutes(numValue.toString().padStart(2, "0"))
    }
  }

  // format time for display
  const formatTime = (date: Date | null) => {
    if (!date) return "--:-- --"
    
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const period = hours >= 12 ? "PM" : "AM"
    
    // convert to 12-hour format
    const displayHours = hours % 12
    const formattedHours = displayHours === 0 ? 12 : displayHours
    
    return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
            className
          )}
          disabled={disabled}
          aria-label={ariaLabel || "select time"}
        >
          <Clock className="mr-2 h-4 w-4" />
          {value ? formatTime(value) : "select time"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4" align="start">
        <div className="flex items-center gap-2">
          <div className="grid gap-1">
            <div className="flex items-center gap-2">
              <Input
                className="w-12 text-center"
                value={hours}
                onChange={handleHoursChange}
                maxLength={2}
                aria-label="hours"
              />
              <span>:</span>
              <Input
                className="w-12 text-center"
                value={minutes}
                onChange={handleMinutesChange}
                maxLength={2}
                aria-label="minutes"
              />
              <div className="flex flex-col gap-1">
                <Button
                  variant={period === "AM" ? "default" : "outline"}
                  size="sm"
                  className="h-8 w-12"
                  onClick={() => setPeriod("AM")}
                  aria-pressed={period === "AM"}
                  aria-label="set AM"
                >
                  AM
                </Button>
                <Button
                  variant={period === "PM" ? "default" : "outline"}
                  size="sm"
                  className="h-8 w-12"
                  onClick={() => setPeriod("PM")}
                  aria-pressed={period === "PM"}
                  aria-label="set PM"
                >
                  PM
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button size="sm" onClick={handleTimeChange}>
            apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
