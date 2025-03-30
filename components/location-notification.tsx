"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface LocationNotificationProps {
  className?: string
}

export function LocationNotification({ className }: LocationNotificationProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isDismissed, setIsDismissed] = useState(false)

  // check if notification has been dismissed before
  useEffect(() => {
    const dismissed = localStorage.getItem("location-notification-dismissed")
    if (dismissed === "true") {
      setIsDismissed(true)
    }
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    // remember that user dismissed the notification
    localStorage.setItem("location-notification-dismissed", "true")
    
    // after animation completes, update state
    setTimeout(() => {
      setIsDismissed(true)
    }, 300)
  }

  if (isDismissed) {
    return null
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={cn(
            "fixed bottom-20 left-0 right-0 mx-auto w-max z-50 px-1",
            className
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          role="alert"
          aria-live="polite"
        >
          <div className="bg-background/90 backdrop-blur-md shadow-lg rounded-full px-5 py-3 max-w-md flex items-center gap-3 border border-border">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
            </div>
            <p className="text-sm">
              <span className="font-medium">twin cities only:</span> food truck finder is currently available in minneapolis/st. paul area only
            </p>
            <button
              className="flex-shrink-0 rounded-full p-1 text-muted-foreground hover:text-foreground transition-colors"
              onClick={handleDismiss}
              aria-label="dismiss notification"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
