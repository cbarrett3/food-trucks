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
    <section className="bg-background pt-2 pb-3" aria-labelledby="category-filter-heading">
      <h2 id="category-filter-heading" className="sr-only">filter food trucks by category</h2>
      <ScrollArea className="w-full">
        <div className="flex px-4 space-x-5" role="radiogroup" aria-label="food truck categories">
          {categories.map((category) => (
            <motion.div
              key={category.name}
              className="flex flex-col items-center space-y-2 min-w-[70px]"
              whileTap={{ scale: 0.95 }}
            >
              <button
                type="button"
                onClick={() => setActiveCategory(category.name)}
                className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-2xl"
                aria-checked={activeCategory === category.name}
                role="radio"
                aria-label={`${category.name} category`}
              >
                <div className="relative">
                  <div
                    className={cn(
                      "flex items-center justify-center w-14 h-14 rounded-2xl",
                      "bg-gradient-to-br transition-all duration-300",
                      activeCategory === category.name
                        ? "from-primary/10 to-primary/20 shadow-md"
                        : "from-secondary/10 to-secondary/5",
                    )}
                  >
                    <span className="text-2xl" aria-hidden="true">{category.icon}</span>
                  </div>
                  {activeCategory === category.name && (
                    <motion.div
                      className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary"
                      layoutId="categoryIndicator"
                      aria-hidden="true"
                    />
                  )}
                </div>
                <span
                  className={cn(
                    "text-xs font-medium transition-colors",
                    activeCategory === category.name ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {category.name}
                </span>
              </button>
            </motion.div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  )
}
