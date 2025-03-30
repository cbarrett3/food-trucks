"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, MapPin, Phone, Globe, Star, ChevronDown, Instagram, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FoodTruck } from "@/types/food-truck"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface FoodTruckDetailDrawerProps {
  truck: FoodTruck | null
  open: boolean
  onClose: () => void
}

export function FoodTruckDetailDrawer({ truck, open, onClose }: FoodTruckDetailDrawerProps) {
  const [expanded, setExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState<"menu" | "reviews">("menu")
  
  if (!truck) return null
  
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />
          
          {/* Drawer */}
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
            {/* Drag handle */}
            <div 
              className="h-6 w-full flex items-center justify-center cursor-pointer"
              onClick={() => setExpanded(!expanded)}
              aria-label={expanded ? "collapse drawer" : "expand drawer"}
            >
              <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
            </div>
            
            {/* Close button */}
            <button
              className="absolute top-6 right-4 p-2 rounded-full bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              onClick={onClose}
              aria-label="close food truck details"
            >
              <X className="h-4 w-4" />
            </button>
            
            {/* Header */}
            <div className="px-4 pt-2 pb-4">
              <div className="flex items-start gap-3">
                <div className="relative h-16 w-16 rounded-xl overflow-hidden flex-shrink-0 border border-border">
                  <Image
                    src={truck.logo}
                    alt={`${truck.name} logo`}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h2 
                    id="food-truck-detail-title"
                    className="text-lg font-semibold truncate"
                  >
                    {truck.name}
                  </h2>
                  
                  <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
                    <div className="flex items-center">
                      <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500 mr-1" aria-hidden="true" />
                      <span className="font-medium">{truck.rating.toFixed(1)}</span>
                      <span className="mx-1">·</span>
                      <span>{truck.reviewCount} reviews</span>
                    </div>
                    <span className="mx-1">·</span>
                    <span>{truck.priceRange}</span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                    <span className={cn(
                      "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
                      truck.isOpen 
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" 
                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                    )}>
                      {truck.isOpen ? "Open" : "Closed"}
                    </span>
                    <span className="mx-1">·</span>
                    <span className="truncate">{truck.tags.join(", ")}</span>
                  </div>
                </div>
              </div>
              
              {/* Location and contact */}
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <span>{truck.location}</span>
                </div>
                
                <div className="flex items-start gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <a 
                    href={`tel:${truck.phone}`}
                    className="text-primary hover:underline"
                    aria-label={`call ${truck.name} at ${truck.phone}`}
                  >
                    {truck.phone}
                  </a>
                </div>
                
                <div className="flex items-center gap-4">
                  {truck.website && (
                    <a 
                      href={truck.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1"
                      aria-label={`visit ${truck.name} website`}
                    >
                      <Globe className="h-4 w-4" />
                      <span>Website</span>
                    </a>
                  )}
                  
                  {truck.instagram && (
                    <a 
                      href={`https://instagram.com/${truck.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1"
                      aria-label={`visit ${truck.name} instagram`}
                    >
                      <Instagram className="h-4 w-4" />
                      <span>Instagram</span>
                    </a>
                  )}
                  
                  {truck.twitter && (
                    <a 
                      href={`https://twitter.com/${truck.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1"
                      aria-label={`visit ${truck.name} twitter`}
                    >
                      <Twitter className="h-4 w-4" />
                      <span>Twitter</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
            
            {/* Tabs */}
            <div className="border-t border-border">
              <div className="flex">
                <button
                  className={cn(
                    "flex-1 py-3 text-sm font-medium relative",
                    activeTab === "menu" 
                      ? "text-foreground" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => setActiveTab("menu")}
                  aria-pressed={activeTab === "menu"}
                  aria-label="show menu tab"
                >
                  Menu
                  {activeTab === "menu" && (
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      layoutId="activeTabIndicator"
                    />
                  )}
                </button>
                
                <button
                  className={cn(
                    "flex-1 py-3 text-sm font-medium relative",
                    activeTab === "reviews" 
                      ? "text-foreground" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => setActiveTab("reviews")}
                  aria-pressed={activeTab === "reviews"}
                  aria-label="show reviews tab"
                >
                  Reviews
                  {activeTab === "reviews" && (
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      layoutId="activeTabIndicator"
                    />
                  )}
                </button>
              </div>
            </div>
            
            {/* Tab content */}
            <div className="overflow-y-auto pb-6" style={{ maxHeight: 'calc(70vh - 200px)' }}>
              {activeTab === "menu" && (
                <div className="px-4 py-4 space-y-4">
                  {truck.specialOffer && (
                    <div className="bg-primary/10 rounded-lg p-3 text-sm">
                      <p className="font-medium text-primary">special offer</p>
                      <p>{truck.specialOffer}</p>
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    {truck.menuItems.map((item, index) => (
                      <div key={index} className="flex gap-3">
                        {item.image && (
                          <div className="relative h-16 w-16 rounded-lg overflow-hidden flex-shrink-0 border border-border">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-medium">{item.name}</h3>
                            <span className="font-medium">${item.price.toFixed(2)}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === "reviews" && (
                <div className="px-4 py-4 space-y-4">
                  {truck.reviews.map((review) => (
                    <div key={review.id} className="border-b border-border pb-4 last:border-0">
                      <div className="flex items-center gap-2">
                        <div className="relative h-8 w-8 rounded-full overflow-hidden">
                          <Image
                            src={review.userImage}
                            alt={review.userName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        
                        <div>
                          <div className="font-medium">{review.userName}</div>
                          <div className="text-xs text-muted-foreground">{review.date}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center mt-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i}
                            className={cn(
                              "h-3.5 w-3.5 mr-0.5",
                              i < review.rating 
                                ? "text-yellow-500 fill-yellow-500" 
                                : "text-muted stroke-muted"
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      
                      <p className="text-sm mt-2">{review.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Action buttons */}
            <div className="border-t border-border p-4 bg-background">
              <div className="flex gap-2">
                <Button 
                  className="flex-1"
                  variant="outline"
                  aria-label="get directions to food truck"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  directions
                </Button>
                
                <Button 
                  className="flex-1"
                  aria-label="call food truck"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  call
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
