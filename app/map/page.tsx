import { Metadata } from "next"
import { MapView } from "@/components/map-view"

export const metadata: Metadata = {
  title: "map view | food truckies",
  description: "explore food trucks near you on an interactive map",
}

export default function MapPage() {
  return (
    <main className="flex-1 flex flex-col min-h-[calc(100vh-4rem)]">
      <div className="flex-1 relative">
        <MapView />
      </div>
    </main>
  )
}
