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
const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
const mapboxStyle = process.env.NEXT_PUBLIC_MAPBOX_STYLE || 'mapbox://styles/mapbox/light-v11'

// default map settings - minneapolis/st. paul
const defaultLatitude = 44.9778
const defaultLongitude = -93.2650
const defaultZoom = 12

// performance optimization settings
const MAP_MOVE_DELAY = 100 // ms to delay updates for better performance

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
  const userLocationMarker = useRef<mapboxgl.Marker | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [isLocating, setIsLocating] = useState(false)
  const mapInitialized = useRef(false)
  const initialLocationSet = useRef(false)
  const [userLocation, setUserLocation] = useState<{lng: number, lat: number} | null>(null)
  
  // store last map position and zoom to preserve when toggling views
  const lastPosition = useRef<{
    center: mapboxgl.LngLatLike;
    zoom: number;
  }>({
    center: [defaultLongitude, defaultLatitude],
    zoom: defaultZoom
  })
  
  // use the cluster hook
  const { setupClusters, handleClusterClick } = useMapboxCluster({ map, onTruckSelect })
  
  // use the visible trucks context
  const { setMapBounds } = useVisibleTrucks()
  
  // track if user location is active
  const [isUserLocationActive, setIsUserLocationActive] = useState(false)
  
  // check if location was active before
  useEffect(() => {
    const wasLocationActive = localStorage.getItem('userLocationActive') === 'true'
    setIsUserLocationActive(wasLocationActive)
    
    // try to get stored user location
    const storedLat = localStorage.getItem('userLocationLat')
    const storedLng = localStorage.getItem('userLocationLng')
    
    if (storedLat && storedLng) {
      setUserLocation({
        lat: parseFloat(storedLat),
        lng: parseFloat(storedLng)
      })
    }
  }, [])
  
  // save map position when it changes
  const mapMoveTimeout = useRef<NodeJS.Timeout | null>(null)
  const saveMapPosition = useCallback(() => {
    if (!map.current) return
    
    const center = map.current.getCenter()
    const zoom = map.current.getZoom()
    
    lastPosition.current = {
      center: [center.lng, center.lat],
      zoom
    }
    
    // update visible trucks context with new map bounds
    // use a timeout to prevent excessive updates during rapid movements
    if (mapMoveTimeout.current) {
      clearTimeout(mapMoveTimeout.current)
    }
    
    mapMoveTimeout.current = setTimeout(() => {
      const bounds = map.current?.getBounds()
      if (bounds) {
        setMapBounds(bounds)
      }
    }, MAP_MOVE_DELAY)
  }, [setMapBounds])
  
  // update user location marker
  const updateUserLocationMarker = useCallback(() => {
    if (!map.current || !userLocation) return
    
    // create a custom user location marker if it doesn't exist
    if (!userLocationMarker.current) {
      // create marker element
      const el = document.createElement('div')
      el.className = 'user-location-marker'
      el.style.width = '20px'
      el.style.height = '20px'
      el.style.borderRadius = '50%'
      el.style.background = 'rgba(0, 120, 255, 0.3)'
      el.style.border = '3px solid rgb(0, 120, 255)'
      el.style.boxShadow = '0 0 0 2px white'
      
      // create the marker
      userLocationMarker.current = new mapboxgl.Marker({
        element: el,
        anchor: 'center'
      })
        .setLngLat([userLocation.lng, userLocation.lat])
        .addTo(map.current)
    } else {
      // update existing marker position
      userLocationMarker.current.setLngLat([userLocation.lng, userLocation.lat])
    }
  }, [userLocation])
  
  // update marker when user location changes
  useEffect(() => {
    updateUserLocationMarker()
  }, [userLocation, updateUserLocationMarker])
  
  // get current user location
  const getCurrentLocation = useCallback(() => {
    if (!locationPermissionGranted) return
    
    setIsLocating(true)
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords
        
        // store the user location
        setUserLocation({ lng: longitude, lat: latitude })
        localStorage.setItem('userLocationLat', latitude.toString())
        localStorage.setItem('userLocationLng', longitude.toString())
        localStorage.setItem('userLocationActive', 'true')
        setIsUserLocationActive(true)
        
        // fly to the location
        map.current?.flyTo({
          center: [longitude, latitude],
          zoom: 11,
          padding: 100,
          animate: true,
          duration: 1500,
          essential: true
        })
        
        setIsLocating(false)
      },
      (error) => {
        console.error('error getting user location:', error)
        setIsLocating(false)
        localStorage.setItem('userLocationActive', 'false')
        setIsUserLocationActive(false)
      }
    )
  }, [locationPermissionGranted])
  
  // initialize map only once
  useEffect(() => {
    if (mapInitialized.current || map.current || !mapboxToken || !mapContainer.current) return
    
    console.log('initializing map with token:', mapboxToken ? 'token exists' : 'no token')
    
    // set mapbox access token
    mapboxgl.accessToken = mapboxToken
    
    // create map with performance optimizations
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: theme === 'dark' ? 'mapbox://styles/mapbox/dark-v11' : mapboxStyle,
      center: lastPosition.current.center,
      zoom: lastPosition.current.zoom,
      dragRotate: false,
      touchZoomRotate: false,
      cooperativeGestures: true,
      attributionControl: false, // we'll add it manually for better placement
      renderWorldCopies: false, // performance optimization
      fadeDuration: 100, // faster transitions for better performance
      preserveDrawingBuffer: false, // performance optimization
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
      console.log('map loaded successfully')
      setMapLoaded(true)
      mapInitialized.current = true
      
      if (map.current) {
        // setup clusters and event handlers
        setupClusters(foodTrucks)
        
        // add event listeners to track map position
        map.current.on('moveend', saveMapPosition)
        map.current.on('zoomend', saveMapPosition)
        
        // if we have a stored user location and it was active, show it
        if (isUserLocationActive && userLocation) {
          updateUserLocationMarker()
        }
        
        // if location permission is granted and initial location not set yet, get user location
        if (locationPermissionGranted && !initialLocationSet.current) {
          // get user location after a short delay to ensure map is ready
          setTimeout(() => {
            console.log('getting initial user location')
            getCurrentLocation()
            initialLocationSet.current = true
          }, 1000)
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
        
        // remove marker
        if (userLocationMarker.current) {
          userLocationMarker.current.remove()
          userLocationMarker.current = null
        }
        
        map.current.remove()
        map.current = null
        mapInitialized.current = false
      }
    }
  }, [mapboxToken, theme, setupClusters, locationPermissionGranted, saveMapPosition, 
      isUserLocationActive, userLocation, updateUserLocationMarker, getCurrentLocation])
  
  // update map style when theme changes
  useEffect(() => {
    if (!map.current || !mapInitialized.current) return
    
    const style = theme === 'dark' 
      ? 'mapbox://styles/mapbox/dark-v11' 
      : mapboxStyle
    
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
        
        // restore user location marker if active
        if (isUserLocationActive && userLocation) {
          updateUserLocationMarker()
        }
      }
    })
  }, [theme, setupClusters, isUserLocationActive, userLocation, updateUserLocationMarker])
  
  // center on user location when button is clicked
  const handleLocationButtonClick = useCallback(() => {
    if (userLocation && map.current) {
      // if we already have the user location, just fly to it
      map.current.flyTo({
        center: [userLocation.lng, userLocation.lat],
        zoom: 11,
        padding: 100,
        animate: true,
        duration: 1500,
        essential: true
      })
    } else {
      // otherwise get the current location
      getCurrentLocation()
    }
  }, [userLocation, getCurrentLocation])
  
  return (
    <div className="relative w-full h-full">
      {/* map container must be empty to avoid mapbox warnings */}
      <div 
        ref={mapContainer} 
        className="w-full h-full absolute inset-0" 
        aria-label="interactive map showing food trucks in the twin cities area"
        role="application"
      />
      
      {/* custom location button */}
      {locationPermissionGranted && (
        <button
          className={cn(
            "absolute bottom-6 right-6 p-3 rounded-full shadow-lg z-50",
            "bg-primary text-primary-foreground hover:bg-primary/90",
            "cursor-pointer transform hover:scale-105 active:scale-95",
            "transition-all border border-primary/20",
            isLocating && "animate-pulse"
          )}
          onClick={handleLocationButtonClick}
          disabled={isLocating}
          aria-label="center map on your location"
          aria-live="polite"
        >
          <MapPin className="h-5 w-5" />
        </button>
      )}
    </div>
  )
}
