"use client"

import { useCallback, useRef } from "react"
import mapboxgl from "mapbox-gl"
import { FoodTruck } from "@/types/food-truck"

// cluster settings
const CLUSTER_MAX_ZOOM = 14
const CLUSTER_RADIUS = 50
const DEFAULT_ZOOM = 12

interface UseMapboxClusterProps {
  map: React.RefObject<mapboxgl.Map | null>
  onTruckSelect?: (truckId: string | null) => void
}

export function useMapboxCluster({ map, onTruckSelect }: UseMapboxClusterProps) {
  const markersRef = useRef<{[key: string]: mapboxgl.Marker}>({})
  const popupsRef = useRef<{[key: string]: mapboxgl.Popup}>({})

  // setup clusters and event handlers
  const setupClusters = useCallback((foodTrucks: FoodTruck[]) => {
    if (!map.current) return

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
    map.current.on('click', 'clusters', handleClusterClick)
    
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
  }, [onTruckSelect])

  // handle cluster click
  const handleClusterClick = useCallback((e: mapboxgl.MapMouseEvent & { features?: mapboxgl.MapboxGeoJSONFeature[] }) => {
    if (!map.current || !e.features || !e.features[0]) return
    
    const feature = e.features[0]
    const clusterId = feature.properties?.cluster_id
    
    if (!clusterId) return
    
    const source = map.current.getSource('food-trucks')
    if (source && 'getClusterExpansionZoom' in source) {
      // type assertion to access the method and handle the callback properly
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
  }, [map])

  return {
    setupClusters,
    handleClusterClick
  }
}
