"use client"

import { useRef, useEffect, useState } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { foodTrucks } from "@/data/food-trucks"
import { FoodTruckCluster } from "@/components/food-truck-cluster"
import { createRoot } from "react-dom/client"
import { MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

// mapbox access token from environment variables
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
const MAPBOX_STYLE = process.env.NEXT_PUBLIC_MAPBOX_STYLE || 'mapbox://styles/mapbox/light-v11'

// default map settings - Minneapolis/St. Paul
const DEFAULT_LATITUDE = 44.9778
const DEFAULT_LONGITUDE = -93.2650
const DEFAULT_ZOOM = 12

// cluster settings
const CLUSTER_MAX_ZOOM = 14
const CLUSTER_RADIUS = 50

// types for props
interface MapboxComponentProps {
  theme?: string;
  onTruckSelect?: (truckId: string | null) => void;
}

export default function MapboxComponent({ theme, onTruckSelect }: MapboxComponentProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const markersRef = useRef<{[key: string]: mapboxgl.Marker}>({})
  const popupsRef = useRef<{[key: string]: mapboxgl.Popup}>({})
  const [isLocating, setIsLocating] = useState(false)
  
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
        // add a source for food truck clusters
        map.current.addSource('food-trucks', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: foodTrucks.map(truck => ({
              type: 'Feature',
              properties: {
                id: truck.id,
                name: truck.name,
                isOpen: truck.isOpen,
                description: truck.description,
                rating: truck.rating,
                tags: truck.tags.join(', ')
              },
              geometry: {
                type: 'Point',
                coordinates: [truck.coordinates.longitude, truck.coordinates.latitude]
              }
            }))
          },
          cluster: true,
          clusterMaxZoom: CLUSTER_MAX_ZOOM,
          clusterRadius: CLUSTER_RADIUS
        })
        
        // add a layer for clusters
        map.current.addLayer({
          id: 'clusters',
          type: 'circle',
          source: 'food-trucks',
          filter: ['has', 'point_count'],
          paint: {
            // size based on point count
            'circle-radius': [
              'step',
              ['get', 'point_count'],
              20, // 20px circle for count < 10
              10, 
              30, // 30px circle for count >= 10 and < 50
              50,
              40  // 40px circle for count >= 50
            ],
            // color based on point count
            'circle-color': [
              'step',
              ['get', 'point_count'],
              '#3b82f6', // blue for count < 10
              10,
              '#facc15', // yellow for count >= 10 and < 50
              50,
              '#ef4444'  // red for count >= 50
            ],
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff'
          }
        })
        
        // add a layer for cluster counts
        map.current.addLayer({
          id: 'cluster-count',
          type: 'symbol',
          source: 'food-trucks',
          filter: ['has', 'point_count'],
          layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 14
          },
          paint: {
            'text-color': '#ffffff'
          }
        })
        
        // add a layer for individual food truck points
        map.current.addLayer({
          id: 'unclustered-point',
          type: 'circle',
          source: 'food-trucks',
          filter: ['!', ['has', 'point_count']],
          paint: {
            'circle-radius': 15,
            'circle-color': [
              'case',
              ['==', ['get', 'isOpen'], true],
              '#ef4444', // red for open trucks
              '#aaaaaa' // gray for closed trucks
            ],
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff'
          }
        })
        
        // add a layer for food truck names
        map.current.addLayer({
          id: 'food-truck-label',
          type: 'symbol',
          source: 'food-trucks',
          filter: ['!', ['has', 'point_count']],
          layout: {
            'text-field': ['get', 'name'],
            'text-font': ['DIN Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12,
            'text-offset': [0, 1.5],
            'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
            'text-radial-offset': 1.5,
            'text-optional': true,
          },
          paint: {
            'text-color': '#333333',
            'text-halo-color': '#ffffff',
            'text-halo-width': 1
          }
        })
        
        // click event for clusters
        map.current.on('click', 'clusters', (e) => {
          if (!map.current || !e.features || !e.features[0]) return
          
          const feature = e.features[0]
          const clusterId = feature.properties?.cluster_id
          
          if (!clusterId) return
          
          const source = map.current.getSource('food-trucks')
          if (source && 'getClusterExpansionZoom' in source) {
            // Type assertion to access the method and handle the callback properly
            (source as mapboxgl.GeoJSONSource & {
              getClusterExpansionZoom(clusterId: number, callback: (err: Error | null, zoom: number) => void): void;
            }).getClusterExpansionZoom(clusterId, (err, zoom) => {
              if (err || !map.current) return
              
              const coordinates = (feature.geometry as any).coordinates.slice()
              
              // zoom to cluster - ensure zoom is a number
              map.current.easeTo({
                center: coordinates,
                zoom: typeof zoom === 'number' ? zoom : DEFAULT_ZOOM
              })
            })
          }
        })
        
        // change cursor on hover
        map.current.on('mouseenter', 'clusters', () => {
          if (map.current) map.current.getCanvas().style.cursor = 'pointer'
        })
        
        map.current.on('mouseleave', 'clusters', () => {
          if (map.current) map.current.getCanvas().style.cursor = ''
        })
        
        map.current.on('mouseenter', 'unclustered-point', () => {
          if (map.current) map.current.getCanvas().style.cursor = 'pointer'
        })
        
        map.current.on('mouseleave', 'unclustered-point', () => {
          if (map.current) map.current.getCanvas().style.cursor = ''
        })
        
        // click event for individual food trucks
        map.current.on('click', 'unclustered-point', (e) => {
          if (!map.current || !e.features || !e.features[0] || !onTruckSelect) return
          
          const feature = e.features[0]
          const truckId = feature.properties?.id
          
          if (truckId) {
            onTruckSelect(truckId)
          }
        })
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
  }, [MAPBOX_TOKEN, onTruckSelect]) // eslint-disable-line react-hooks/exhaustive-deps
  
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
      
      {/* Location button */}
      <button
        className={cn(
          "absolute bottom-6 right-6 p-3 rounded-full shadow-md z-10 transition-all",
          "bg-background border border-border hover:bg-accent",
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
