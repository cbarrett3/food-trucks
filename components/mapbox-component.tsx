"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { foodTrucks } from "@/data/food-trucks"
import { MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMapboxCluster } from "@/hooks/use-mapbox-clusters"
import { useVisibleTrucks } from "@/context/visible-trucks-context"

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
  locationPermissionGranted?: boolean;
}

export default function MapboxComponent({ 
  theme, 
  onTruckSelect,
  locationPermissionGranted = false 
}: MapboxComponentProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const geolocateControl = useRef<mapboxgl.GeolocateControl | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [isLocating, setIsLocating] = useState(false)
  const mapInitialized = useRef(false)
  const initialLocationSet = useRef(false)
  
  // store last map position and zoom to preserve when toggling views
  const lastPosition = useRef<{
    center: mapboxgl.LngLatLike;
    zoom: number;
  }>({
    center: [DEFAULT_LONGITUDE, DEFAULT_LATITUDE],
    zoom: DEFAULT_ZOOM
  })
  
  // use the cluster hook
  const { setupClusters, handleClusterClick } = useMapboxCluster({ map, onTruckSelect })
  
  // use the visible trucks context
  const { setMapBounds } = useVisibleTrucks()
  
  // save map position when it changes
  const saveMapPosition = useCallback(() => {
    if (!map.current) return
    
    const center = map.current.getCenter()
    const zoom = map.current.getZoom()
    
    lastPosition.current = {
      center: [center.lng, center.lat],
      zoom
    }
    
    // update visible trucks context with new map bounds
    const bounds = map.current.getBounds()
    setMapBounds(bounds)
  }, [setMapBounds])
  
  // initialize map only once
  useEffect(() => {
    if (mapInitialized.current || map.current || !MAPBOX_TOKEN || !mapContainer.current) return
    
    console.log('initializing map with token:', MAPBOX_TOKEN ? 'token exists' : 'no token')
    
    // set mapbox access token
    mapboxgl.accessToken = MAPBOX_TOKEN
    
    // create map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: theme === 'dark' ? 'mapbox://styles/mapbox/dark-v11' : MAPBOX_STYLE,
      center: lastPosition.current.center,
      zoom: lastPosition.current.zoom,
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
    
    // create geolocate control
    geolocateControl.current = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true,
      showAccuracyCircle: true,
      showUserHeading: true,
      fitBoundsOptions: {
        maxZoom: 11,
        padding: 100,
        animate: true,
        duration: 1500,
        essential: true
      }
    })
    
    console.log('geolocate control created:', geolocateControl.current ? 'yes' : 'no')
    
    // when map loads
    map.current.on('load', () => {
      console.log('map loaded successfully')
      setMapLoaded(true)
      mapInitialized.current = true
      
      if (map.current) {
        // setup clusters and event handlers
        setupClusters(foodTrucks)
        
        // add event listeners to track map position
        map.current.on('moveend', saveMapPosition)
        map.current.on('zoomend', saveMapPosition)
        
        // add the geolocate control to the map AFTER it's loaded
        if (geolocateControl.current) {
          console.log('adding geolocate control to map')
          map.current.addControl(geolocateControl.current, 'bottom-right')
          
          // set up geolocate events
          geolocateControl.current.on('geolocate', () => {
            console.log('geolocate triggered')
            setIsLocating(true)
          })
          
          // when geolocate ends
          geolocateControl.current.on('trackuserlocationend', () => {
            console.log('geolocate tracking ended')
            setIsLocating(false)
          })
          
          // when geolocate errors
          geolocateControl.current.on('error', (e) => {
            console.error('geolocate error:', e)
            setIsLocating(false)
          })
          
          // if location permission is granted and initial location not set yet, trigger geolocate
          if (locationPermissionGranted && !initialLocationSet.current) {
            // trigger the geolocate control after a short delay to ensure it's ready
            setTimeout(() => {
              console.log('triggering geolocate control')
              geolocateControl.current?.trigger()
              initialLocationSet.current = true
            }, 1000)
          }
        }
      }
    })
    
    // log any errors
    map.current.on('error', (e) => {
      console.error('map error:', e)
    })
    
    // cleanup function
    return () => {
      if (map.current) {
        // remove event listeners
        map.current.off('moveend', saveMapPosition)
        map.current.off('zoomend', saveMapPosition)
        
        map.current.remove()
        map.current = null
        mapInitialized.current = false
        geolocateControl.current = null
      }
    }
  }, [MAPBOX_TOKEN, theme, setupClusters, locationPermissionGranted, saveMapPosition, setMapBounds])
  
  // update map style when theme changes
  useEffect(() => {
    if (!map.current || !mapInitialized.current) return
    
    const style = theme === 'dark' 
      ? 'mapbox://styles/mapbox/dark-v11' 
      : MAPBOX_STYLE
    
    // save current position before style change
    const currentCenter = map.current.getCenter()
    const currentZoom = map.current.getZoom()
    
    map.current.setStyle(style)
    
    // re-setup clusters after style change and restore position
    map.current.once('style.load', () => {
      if (map.current) {
        setupClusters(foodTrucks)
        
        // restore position after style change
        map.current.setCenter([currentCenter.lng, currentCenter.lat])
        map.current.setZoom(currentZoom)
      }
    })
  }, [theme, setupClusters])
  
  // trigger geolocate when permission is granted for the first time
  useEffect(() => {
    if (locationPermissionGranted && mapInitialized.current && map.current && !initialLocationSet.current && geolocateControl.current) {
      // trigger the geolocate control after a short delay to ensure it's ready
      setTimeout(() => {
        console.log('triggering geolocate from permission change')
        geolocateControl.current?.trigger()
        initialLocationSet.current = true
      }, 1000)
    }
  }, [locationPermissionGranted])
  
  // add a custom location button as fallback in case the mapbox control doesn't appear
  const handleCustomLocationClick = useCallback(() => {
    if (geolocateControl.current) {
      console.log('triggering geolocate from custom button')
      geolocateControl.current.trigger()
    }
  }, [])
  
  return (
    <div className="relative w-full h-full">
      {/* map container must be empty to avoid mapbox warnings */}
      <div 
        ref={mapContainer} 
        className="w-full h-full absolute inset-0" 
        aria-label="interactive map showing food trucks in the twin cities area"
      />
      
      {/* custom location button as fallback */}
      {locationPermissionGranted && (
        <button
          className="absolute bottom-24 right-6 p-3 rounded-full shadow-lg z-50 
                    bg-primary text-primary-foreground hover:bg-primary/90 
                    cursor-pointer transform hover:scale-105 active:scale-95
                    transition-all border border-primary/20"
          onClick={handleCustomLocationClick}
          aria-label="center map on your location"
        >
          <MapPin className="h-5 w-5" />
        </button>
      )}
    </div>
  )
}
