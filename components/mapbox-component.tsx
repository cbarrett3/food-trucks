"use client"

import { useRef, useEffect, useState } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { foodTrucks } from "@/data/food-trucks"
import { FoodTruckCluster } from "@/components/food-truck-cluster"
import { createRoot } from "react-dom/client"
import { MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMapboxCluster } from "@/hooks/use-mapbox-clusters"

// mapbox access token from environment variables
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
const MAPBOX_STYLE = process.env.NEXT_PUBLIC_MAPBOX_STYLE || 'mapbox://styles/mapbox/light-v11'

// default map settings - minneapolis/st. paul
const DEFAULT_LATITUDE = 44.9778
const DEFAULT_LONGITUDE = -93.2650
const DEFAULT_ZOOM = 12

// types for props
interface MapboxComponentProps {
  theme?: string;
  onTruckSelect?: (truckId: string | null) => void;
}

export default function MapboxComponent({ theme, onTruckSelect }: MapboxComponentProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [isLocating, setIsLocating] = useState(false)
  
  // use the cluster hook
  const { setupClusters, handleClusterClick } = useMapboxCluster({ map, onTruckSelect })
  
  // initialize map
  useEffect(() => {
    if (map.current || !MAPBOX_TOKEN) return; // map already initialized or no token
    
    // set mapbox access token
    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    // create map
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: theme === 'dark' ? 'mapbox://styles/mapbox/dark-v11' : MAPBOX_STYLE,
      center: [DEFAULT_LONGITUDE, DEFAULT_LATITUDE],
      zoom: DEFAULT_ZOOM,
      attributionControl: false,
      dragRotate: false,
      touchZoomRotate: false,
      cooperativeGestures: true,
    })
    
    // add navigation control
    map.current.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      'top-right'
    )
    
    // add attribution control
    map.current.addControl(
      new mapboxgl.AttributionControl({
        compact: true
      }),
      'bottom-left'
    )
    
    // when map loads
    map.current.on('load', () => {
      console.log('Map loaded successfully')
      setMapLoaded(true)
      
      if (map.current) {
        // setup clusters and event handlers
        setupClusters(foodTrucks)
      }
    })
    
    // log any errors
    map.current.on('error', (e) => {
      console.error('Map error:', e)
    })
    
    // cleanup function
    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [MAPBOX_TOKEN, onTruckSelect, setupClusters]) 
  
  // update map style when theme changes
  useEffect(() => {
    if (!map.current) return
    
    const style = theme === 'dark' 
      ? 'mapbox://styles/mapbox/dark-v11' 
      : MAPBOX_STYLE
    
    map.current.setStyle(style)
  }, [theme])
  
  // handle user location
  const handleUserLocation = () => {
    if (!map.current) return
    
    setIsLocating(true)
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords
          
          map.current?.flyTo({
            center: [longitude, latitude],
            zoom: 14,
            essential: true
          })
          
          setIsLocating(false)
        },
        (error) => {
          console.error('Error getting user location:', error)
          setIsLocating(false)
        }
      )
    } else {
      setIsLocating(false)
    }
  }
  
  return (
    <div className="relative w-full h-full">
      <div 
        ref={mapContainer} 
        className="w-full h-full absolute inset-0" 
        aria-label="interactive map showing food trucks in the twin cities area"
      />
      
      {/* location button */}
      <button
        className={cn(
          "absolute bottom-6 right-6 p-3 rounded-full shadow-md z-10 transition-all",
          "bg-background border border-border hover:bg-accent cursor-pointer",
          isLocating && "animate-pulse"
        )}
        onClick={handleUserLocation}
        disabled={isLocating}
        aria-label="center map on your location"
      >
        <MapPin className="h-5 w-5 text-primary" />
      </button>
    </div>
  )
}
