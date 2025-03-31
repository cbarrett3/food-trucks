"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Clock, MapPin, Power, Calendar, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import { TimePicker } from "@/components/time-picker"

interface OperatorSessionProps {
  className?: string
}

export function OperatorSession({ className }: OperatorSessionProps) {
  const [isActive, setIsActive] = useState(false)
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null)
  const [sessionEndTime, setSessionEndTime] = useState<Date | null>(null)
  const [locationPermission, setLocationPermission] = useState<boolean | "loading">("loading")
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number} | null>(null)
  const [locationRadius, setLocationRadius] = useState(100) // radius in meters

  // check for location permission on component mount
  useEffect(() => {
    if (navigator.permissions) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        setLocationPermission(result.state === "granted")
      })
    } else {
      setLocationPermission(false)
    }
  }, [])

  // request location when session is activated
  useEffect(() => {
    if (isActive && locationPermission === true) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => {
          console.error("error getting location:", error.message)
          setIsActive(false)
        }
      )
    }
  }, [isActive, locationPermission])

  // handle session activation
  const handleSessionToggle = () => {
    if (!isActive) {
      // starting a new session
      if (locationPermission !== true) {
        // request permission if not already granted
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocationPermission(true)
            setCurrentLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            })
            activateSession()
          },
          (error) => {
            console.error("error getting location:", error.message)
            setLocationPermission(false)
          }
        )
      } else {
        activateSession()
      }
    } else {
      // ending current session
      setIsActive(false)
      setSessionStartTime(null)
      setSessionEndTime(null)
    }
  }

  const activateSession = () => {
    const now = new Date()
    
    // default end time is 4 hours from now
    const defaultEnd = new Date(now)
    defaultEnd.setHours(defaultEnd.getHours() + 4)
    
    setSessionStartTime(now)
    setSessionEndTime(defaultEnd)
    setIsActive(true)
  }

  return (
    <Card className={cn("shadow-md", className)}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>truck session</span>
          <Switch
            id="session-toggle"
            checked={isActive}
            onCheckedChange={handleSessionToggle}
            aria-label={isActive ? "end truck session" : "start truck session"}
          />
        </CardTitle>
        <CardDescription>
          {isActive 
            ? "your truck is currently visible to customers" 
            : "activate to make your truck visible on the map"}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {locationPermission === false && (
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-md p-3 text-amber-800 dark:text-amber-300 text-sm flex items-start gap-2">
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">location access required</p>
              <p>customers need to know where to find your truck. please allow location access when prompted.</p>
            </div>
          </div>
        )}
        
        {isActive && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="session-hours" className="text-sm text-muted-foreground">session hours</Label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start-time" className="text-xs">start time</Label>
                  <TimePicker 
                    value={sessionStartTime} 
                    onChange={setSessionStartTime} 
                    aria-label="set session start time"
                  />
                </div>
                <div>
                  <Label htmlFor="end-time" className="text-xs">end time</Label>
                  <TimePicker 
                    value={sessionEndTime} 
                    onChange={setSessionEndTime} 
                    aria-label="set session end time"
                  />
                </div>
              </div>
            </div>
            
            {currentLocation && (
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">current location</Label>
                <div className="bg-muted/50 rounded-md p-3 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>
                      {currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)}
                    </span>
                  </div>
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="location-radius" className="text-sm text-muted-foreground">location radius</Label>
                <span className="text-xs font-medium">{locationRadius}m</span>
              </div>
              <Slider
                id="location-radius"
                min={50}
                max={500}
                step={10}
                value={[locationRadius]}
                onValueChange={(values) => setLocationRadius(values[0])}
                aria-label="set location radius"
              />
              <p className="text-xs text-muted-foreground">customers will see your truck within this radius</p>
            </div>
          </motion.div>
        )}
      </CardContent>
      
      <CardFooter className={cn("flex justify-between", !isActive && "hidden")}>
        <Button variant="outline" size="sm" className="w-full" onClick={() => setIsActive(false)}>
          <Power className="h-4 w-4 mr-2" />
          end session
        </Button>
      </CardFooter>
    </Card>
  )
}
