"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export type TabType = "findUs" | "menu" | "reviews"

interface FoodTruckTabsProps {
  activeTab: TabType
  setActiveTab: (tab: TabType) => void
}

export function FoodTruckTabs({ activeTab, setActiveTab }: FoodTruckTabsProps) {
  return (
    <div className="border-t border-border">
      <div className="flex">
        <button
          className={cn(
            "flex-1 py-3 text-sm font-medium relative",
            activeTab === "findUs" 
              ? "text-foreground" 
              : "text-muted-foreground hover:text-foreground hover:cursor-pointer"
          )}
          onClick={() => setActiveTab("findUs")}
          aria-pressed={activeTab === "findUs"}
          aria-label="show find us tab"
        >
          find us
          {activeTab === "findUs" && (
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              layoutId="activeTabIndicator"
            />
          )}
        </button>
        
        <button
          className={cn(
            "flex-1 py-3 text-sm font-medium relative",
            activeTab === "menu" 
              ? "text-foreground" 
              : "text-muted-foreground hover:text-foreground hover:cursor-pointer"
          )}
          onClick={() => setActiveTab("menu")}
          aria-pressed={activeTab === "menu"}
          aria-label="show menu tab"
        >
          menu
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
              : "text-muted-foreground hover:text-foreground hover:cursor-pointer"
          )}
          onClick={() => setActiveTab("reviews")}
          aria-pressed={activeTab === "reviews"}
          aria-label="show reviews tab"
        >
          reviews
          {activeTab === "reviews" && (
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              layoutId="activeTabIndicator"
            />
          )}
        </button>
      </div>
    </div>
  )
}
