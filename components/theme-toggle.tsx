"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button 
        variant="ghost" 
        size="icon" 
        className="w-9 h-9 rounded-full"
        aria-label="loading theme toggle"
        disabled
      >
        <span className="sr-only">toggle theme</span>
        <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse" aria-hidden="true" />
      </Button>
    )
  }

  const isDark = theme === "dark"
  
  return (
    <Button
      variant="ghost"
      size="icon"
      className="w-9 h-9 rounded-full"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "switch to light theme" : "switch to dark theme"}
      aria-pressed={isDark}
      type="button"
    >
      <span className="sr-only">
        {isDark ? "switch to light theme" : "switch to dark theme"}
      </span>
      {isDark ? (
        <Sun className="h-4 w-4 transition-all" aria-hidden="true" />
      ) : (
        <Moon className="h-4 w-4 transition-all" aria-hidden="true" />
      )}
    </Button>
  )
}
