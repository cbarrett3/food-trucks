// mapbox configuration and helper functions
import mapboxgl from 'mapbox-gl';
import { FoodTruck } from '@/types/food-truck';

// set mapbox access token from environment variable
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

if (MAPBOX_TOKEN) {
  mapboxgl.accessToken = MAPBOX_TOKEN;
} else {
  console.warn('mapbox access token not found in environment variables');
}

// default map style from environment variable or fallback to streets style
export const defaultMapStyle = process.env.NEXT_PUBLIC_MAPBOX_STYLE || 'mapbox://styles/mapbox/streets-v12';

// default map center (san francisco)
export const defaultCenter = {
  lng: -122.4194,
  lat: 37.7749
};

// default zoom level
export const defaultZoom = 13;

// cluster configuration
export const clusterConfig = {
  radius: 50,
  maxZoom: 16
};

// create a geojson feature from a food truck
export function createFeatureFromTruck(truck: FoodTruck): GeoJSON.Feature {
  // in a real app, each truck would have actual coordinates
  // here we're generating random coordinates around the default center
  // this would be replaced with actual data from your API
  const randomLng = defaultCenter.lng + (Math.random() - 0.5) * 0.05;
  const randomLat = defaultCenter.lat + (Math.random() - 0.5) * 0.05;
  
  return {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [randomLng, randomLat]
    },
    properties: {
      id: truck.id,
      name: truck.name,
      isOpen: truck.isOpen,
      rating: truck.rating,
      logo: truck.logo || '/placeholder.svg',
      cuisine: truck.tags.join(', '),
      distance: truck.distance
    }
  };
}

// create a geojson feature collection from an array of food trucks
export function createGeoJsonFromTrucks(trucks: FoodTruck[]): GeoJSON.FeatureCollection {
  return {
    type: 'FeatureCollection',
    features: trucks.map(createFeatureFromTruck)
  };
}

// optimize map performance for large datasets
export function optimizeMapForPerformance(map: mapboxgl.Map): void {
  // reduce memory usage by limiting the max zoom level
  map.setMaxZoom(18);
  
  // reduce tile requests by setting min zoom
  map.setMinZoom(9);
  
  // reduce WebGL memory usage
  (map as any).transform.maxPitch = 60;
  
  // disable terrain if not needed
  if (map.getTerrain()) {
    map.setTerrain(null);
  }
  
  // reduce memory usage by limiting the cache size
  (mapboxgl as any).setRTLTextPlugin = () => {}; // disable RTL text plugin if not needed
  
  // use low quality rendering when moving the map for better performance
  map.on('movestart', () => {
    map.getCanvas().style.imageRendering = 'auto';
  });
  
  // restore high quality rendering when movement ends
  map.on('moveend', () => {
    map.getCanvas().style.imageRendering = 'high-quality';
  });
}

// handle marker visibility based on zoom level and bounds
export function updateMarkerVisibility(
  map: mapboxgl.Map,
  markers: HTMLElement[],
  coordinates: [number, number][]
): void {
  const bounds = map.getBounds();
  
  // if bounds is null, return early
  if (!bounds) return;
  
  const zoom = map.getZoom();
  
  // only show markers at appropriate zoom levels
  const showIndividualMarkers = zoom >= clusterConfig.maxZoom - 1;
  
  markers.forEach((marker, i) => {
    const [lng, lat] = coordinates[i];
    
    // check if marker is in the current viewport
    const isInBounds = bounds.contains([lng, lat]);
    
    // only show marker if it's in bounds and we're zoomed in enough
    marker.style.display = isInBounds && showIndividualMarkers ? 'block' : 'none';
  });
}
