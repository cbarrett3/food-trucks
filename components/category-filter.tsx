"use client"

import { useState } from "react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export function CategoryFilter() {
  const [activeCategory, setActiveCategory] = useState("All")

  const categories = [
    { name: "All", icon: "🍽️" },
    { name: "Tacos", icon: "🌮" },
    { name: "Burgers", icon: "🍔" },
    { name: "Pizza", icon: "🍕" },
    { name: "BBQ", icon: "🍖" },
    { name: "Asian", icon: "🥡" },
    { name: "Desserts", icon: "🍦" },
    { name: "Coffee", icon: "☕" },
    { name: "Vegan", icon: "🥗" },
    { name: "Breakfast", icon: "🍳" },
    { name: "Seafood", icon: "🦞" },
    { name: "Sandwiches", icon: "🥪" },
  ]

  return (
    <div className="bg-white pt-2 pb-3">
      <ScrollArea className="w-full">
        <div className="flex px-4 space-x-5">
          {categories.map((category) => (
            <motion.button
              key={category.name}
              className="flex flex-col items-center space-y-2 min-w-[70px]"
              onClick={() => setActiveCategory(category.name)}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                <div
                  className={cn(
                    "flex items-center justify-center w-14 h-14 rounded-2xl",
                    "bg-gradient-to-br transition-all duration-300",
                    activeCategory === category.name
                      ? "from-[#FF5A5F]/10 to-[#FF385C]/20 shadow-md"
                      : "from-gray-100 to-gray-50",
                  )}
                >
                  <span className="text-2xl">{category.icon}</span>
                </div>
                {activeCategory === category.name && (
                  <motion.div
                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#FF5A5F]"
                    layoutId="categoryIndicator"
                  />
                )}
              </div>
              <span
                className={cn(
                  "text-xs font-medium transition-colors",
                  activeCategory === category.name ? "text-[#FF5A5F]" : "text-gray-600",
                )}
              >
                {category.name}
              </span>
            </motion.button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}

