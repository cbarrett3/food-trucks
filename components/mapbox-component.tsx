"use client"

import { useRef, useEffect } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"

// mapbox access token from environment variables
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
const MAPBOX_STYLE = process.env.NEXT_PUBLIC_MAPBOX_STYLE || 'mapbox://styles/mapbox/light-v11'

// default map settings
const DEFAULT_LATITUDE = 37.7749
const DEFAULT_LONGITUDE = -122.4194
const DEFAULT_ZOOM = 12

// types for props
interface MapboxComponentProps {
  theme?: string;
}

export default function MapboxComponent({ theme }: MapboxComponentProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  
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
    
    // log when map loads
    map.current.on('load', () => {
      console.log('Map loaded successfully')
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
  }, [MAPBOX_TOKEN]) // eslint-disable-line react-hooks/exhaustive-deps
  
  // update map style when theme changes
  useEffect(() => {
    if (!map.current) return
    
    const style = theme === 'dark' 
      ? 'mapbox://styles/mapbox/dark-v11' 
      : MAPBOX_STYLE
    
    map.current.setStyle(style)
  }, [theme])
  
  return (
    <div 
      ref={mapContainer} 
      className="w-full h-full absolute inset-0" 
      aria-label="interactive map"
    />
  )
}
