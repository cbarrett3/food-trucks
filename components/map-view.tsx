"use client"

import { useTheme } from "next-themes"
import dynamic from "next/dynamic"

// Dynamically import mapbox component to avoid SSR issues
const MapboxComponent = dynamic(() => import('@/components/mapbox-component'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-muted/20">
      <div className="animate-pulse text-muted-foreground">Loading map...</div>
    </div>
  )
})

export function MapView() {
  const { theme } = useTheme()

  return (
    <div className="relative w-full h-[calc(100vh-10rem)] md:h-[calc(100vh-8rem)]">
      {/* Map container */}
      <MapboxComponent theme={theme} />
    </div>
  )
}
