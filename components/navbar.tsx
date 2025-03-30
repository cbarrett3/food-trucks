"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Truck, Filter } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const isMobile = useMobile()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-gradient-to-b from-black/20 to-transparent",
          isSearchFocused && "bg-white",
        )}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 z-10">
              <div className="relative h-10 w-10 rounded-lg overflow-hidden bg-gradient-to-br from-[#FF5A5F] to-[#FF385C] flex items-center justify-center">
                <Truck className="h-6 w-6 text-white" />
              </div>
              <div
                className={cn(
                  "font-bold text-xl transition-colors",
                  isScrolled || isSearchFocused ? "text-[#FF5A5F]" : "text-white",
                )}
              >
                <span className="hidden sm:inline">Food</span> Truckies
              </div>
            </Link>

            <div
              className={cn(
                "absolute left-1/2 transform -translate-x-1/2 transition-all duration-300",
                isSearchFocused ? "w-full max-w-xl" : "w-auto",
              )}
            >
              <div className={cn("relative group", isSearchFocused ? "opacity-100" : "opacity-90 hover:opacity-100")}>
                <div
                  className={cn(
                    "absolute inset-0 rounded-full transition-all duration-300",
                    isScrolled || isSearchFocused ? "bg-white shadow-md" : "bg-white/90 backdrop-blur-sm",
                    isSearchFocused && "ring-2 ring-[#FF5A5F]/20",
                  )}
                ></div>

                <div className="relative flex items-center px-4 py-2">
                  <Search
                    className={cn(
                      "h-4 w-4 transition-colors",
                      isScrolled || isSearchFocused ? "text-[#FF5A5F]" : "text-gray-600",
                    )}
                  />

                  <Input
                    placeholder="Find amazing food trucks..."
                    className="border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 pl-2 pr-0 py-0 h-auto placeholder:text-gray-500"
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                  />

                  {isSearchFocused && (
                    <Button
                      size="sm"
                      className="ml-2 rounded-full bg-[#FF5A5F] hover:bg-[#FF385C] text-white text-xs px-3 py-1 h-auto"
                    >
                      Search
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 z-10">
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "rounded-full border-none",
                  isScrolled ? "bg-white/90 text-gray-700" : "bg-white/80 backdrop-blur-sm text-gray-700",
                )}
                onClick={() => setIsFilterOpen(true)}
              >
                <Filter className="h-5 w-5" />
              </Button>

              {isMobile ? (
                <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className={cn(
                        "rounded-full border-none",
                        isScrolled ? "bg-white/90 text-gray-700" : "bg-white/80 backdrop-blur-sm text-gray-700",
                      )}
                    >
                      <Avatar className="h-8 w-8 border">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                        <AvatarFallback className="bg-gradient-to-br from-[#FF5A5F] to-[#FF385C] text-white text-xs">
                          FT
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="p-0 border-none">
                    <div className="flex flex-col h-full bg-gradient-to-b from-white to-gray-50">
                      <div className="p-6 border-b">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-14 w-14 border-2 border-white shadow-md">
                            <AvatarImage src="/placeholder.svg?height=56&width=56" alt="User" />
                            <AvatarFallback className="bg-gradient-to-br from-[#FF5A5F] to-[#FF385C] text-white text-lg">
                              FT
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <Link
                              href="/login"
                              className="text-lg font-semibold hover:text-[#FF5A5F] transition-colors"
                            >
                              Log in
                            </Link>
                            <p className="text-sm text-gray-500">Discover your next favorite meal</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex-1 overflow-auto py-4">
                        <nav className="flex flex-col">
                          {[
                            { icon: "🍽️", label: "Explore Food Trucks", href: "/" },
                            { icon: "❤️", label: "Saved Trucks", href: "/favorites" },
                            { icon: "🚚", label: "For Truck Operators", href: "/operator" },
                          ].map((item, index) => (
                            <Link
                              key={index}
                              href={item.href}
                              className="flex items-center gap-4 px-6 py-4 hover:bg-gray-100 transition-colors"
                            >
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                                <span className="text-xl">{item.icon}</span>
                              </div>
                              <span className="font-medium">{item.label}</span>
                            </Link>
                          ))}
                        </nav>
                      </div>

                      <div className="p-6 border-t mt-auto">
                        <Button className="w-full rounded-xl py-6 bg-gradient-to-r from-[#FF5A5F] to-[#FF385C] hover:from-[#FF385C] hover:to-[#FF5A5F] text-white font-semibold text-base">
                          Sign up
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              ) : (
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    "rounded-full border-none",
                    isScrolled ? "bg-white/90 text-gray-700" : "bg-white/80 backdrop-blur-sm text-gray-700",
                  )}
                >
                  <Avatar className="h-8 w-8 border">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback className="bg-gradient-to-br from-[#FF5A5F] to-[#FF385C] text-white text-xs">
                      FT
                    </AvatarFallback>
                  </Avatar>
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <SheetContent side="top" className="h-[85vh] rounded-b-3xl p-0 border-none">
          <FilterPanel onClose={() => setIsFilterOpen(false)} />
        </SheetContent>
      </Sheet>
    </>
  )
}

function FilterPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="h-full bg-gradient-to-b from-white to-gray-50 overflow-auto">
      <div className="flex items-center justify-between p-6 border-b">
        <h3 className="text-xl font-bold">Filters</h3>
        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700" onClick={onClose}>
          Clear All
        </Button>
      </div>

      <div className="p-6 space-y-8">
        <div>
          <h4 className="text-base font-semibold mb-4">Cuisine Type</h4>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {[
              { name: "Mexican", icon: "🌮", selected: true },
              { name: "American", icon: "🍔", selected: false },
              { name: "Italian", icon: "🍕", selected: false },
              { name: "Asian", icon: "🥡", selected: true },
              { name: "Desserts", icon: "🍦", selected: false },
              { name: "Coffee", icon: "☕", selected: false },
              { name: "BBQ", icon: "🍖", selected: false },
              { name: "Vegan", icon: "🥗", selected: true },
              { name: "Breakfast", icon: "🍳", selected: false },
              { name: "Seafood", icon: "🦞", selected: false },
              { name: "Sandwiches", icon: "🥪", selected: false },
              { name: "Other", icon: "🍽️", selected: false },
            ].map((cuisine) => (
              <button
                key={cuisine.name}
                className={cn(
                  "flex flex-col items-center gap-2 p-3 rounded-xl transition-all",
                  cuisine.selected
                    ? "bg-[#FF5A5F]/10 border-2 border-[#FF5A5F]/20"
                    : "bg-gray-50 border-2 border-gray-100 hover:border-gray-200",
                )}
              >
                <span className="text-2xl">{cuisine.icon}</span>
                <span className={cn("text-xs font-medium", cuisine.selected ? "text-[#FF5A5F]" : "text-gray-700")}>
                  {cuisine.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-base font-semibold mb-4">Price Range</h4>
          <div className="flex gap-3">
            {["$", "$$", "$$$", "$$$$"].map((price, index) => (
              <button
                key={price}
                className={cn(
                  "flex-1 py-3 rounded-xl border-2 font-semibold transition-all",
                  index === 1
                    ? "border-[#FF5A5F] bg-[#FF5A5F]/5 text-[#FF5A5F]"
                    : "border-gray-200 text-gray-700 hover:border-gray-300",
                )}
              >
                {price}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-base font-semibold mb-4">Dietary Options</h4>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: "Vegetarian", selected: true },
              { name: "Vegan", selected: false },
              { name: "Gluten-Free", selected: false },
              { name: "Dairy-Free", selected: true },
              { name: "Nut-Free", selected: false },
              { name: "Halal", selected: false },
            ].map((diet) => (
              <button
                key={diet.name}
                className={cn(
                  "py-3 px-4 rounded-xl border-2 font-medium text-sm text-left transition-all",
                  diet.selected
                    ? "border-[#FF5A5F] bg-[#FF5A5F]/5 text-[#FF5A5F]"
                    : "border-gray-200 text-gray-700 hover:border-gray-300",
                )}
              >
                {diet.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-base font-semibold mb-4">Distance</h4>
          <div className="space-y-3">
            {[
              { label: "Walking distance (< 1 mile)", selected: true },
              { label: "Biking distance (< 3 miles)", selected: false },
              { label: "Driving distance (< 10 miles)", selected: false },
              { label: "Any distance", selected: false },
            ].map((distance) => (
              <button
                key={distance.label}
                className={cn(
                  "w-full py-3 px-4 rounded-xl border-2 font-medium text-sm text-left transition-all flex items-center",
                  distance.selected
                    ? "border-[#FF5A5F] bg-[#FF5A5F]/5 text-[#FF5A5F]"
                    : "border-gray-200 text-gray-700 hover:border-gray-300",
                )}
              >
                <span>{distance.label}</span>
                {distance.selected && (
                  <div className="ml-auto h-5 w-5 rounded-full bg-[#FF5A5F] flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 border-t mt-auto">
        <Button className="w-full rounded-xl py-6 bg-gradient-to-r from-[#FF5A5F] to-[#FF385C] hover:from-[#FF385C] hover:to-[#FF5A5F] text-white font-semibold text-base">
          Show 48 Food Trucks
        </Button>
      </div>
    </div>
  )
}

