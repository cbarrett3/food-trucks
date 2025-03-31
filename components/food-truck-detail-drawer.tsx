"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { FoodTruck } from "@/types/food-truck"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { FoodTruckDrawerHeader } from "./food-truck-drawer-header"
import { FoodTruckTabs, TabType } from "./food-truck-tabs"
import { FoodTruckTabContent } from "./food-truck-tab-content"

interface FoodTruckDetailDrawerProps {
  truck: FoodTruck | null
  open: boolean
  onClose: () => void
}

export function FoodTruckDetailDrawer({ truck, open, onClose }: FoodTruckDetailDrawerProps) {
  const [expanded, setExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState<TabType>("findUs")
  
  if (!truck) return null
  
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* backdrop */}
          <motion.div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />
          
          {/* drawer */}
          <motion.div
            className={cn(
              "fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-3xl shadow-lg border border-border overflow-hidden",
              expanded ? "h-[90vh]" : "max-h-[70vh]"
            )}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="food-truck-detail-title"
          >
            {/* drag handle */}
            <div 
              className="h-6 w-full flex items-center justify-center cursor-pointer hover:bg-muted/20 transition-colors"
              onClick={() => setExpanded(!expanded)}
              aria-label={expanded ? "collapse drawer" : "expand drawer"}
            >
              <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
            </div>
            
            {/* close button */}
            <button
              className="absolute top-6 right-4 p-2 rounded-full bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              onClick={onClose}
              aria-label="close food truck details"
            >
              <X className="h-4 w-4" />
            </button>
            
            {/* header */}
            <FoodTruckDrawerHeader truck={truck} />
            
            {/* tabs */}
            <FoodTruckTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            
            {/* tab content */}
            <FoodTruckTabContent truck={truck} activeTab={activeTab} />
            
            {/* action buttons */}
            <div className="border-t border-border p-4 bg-background">
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  aria-label="save food truck to favorites"
                >
                  save
                </Button>
                <Button 
                  className="flex-1"
                  aria-label="order from food truck"
                >
                  order
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
