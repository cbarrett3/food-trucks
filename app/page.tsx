import { HomeView } from "@/components/home-view"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Food Truckies | Find Food Trucks Near You",
  description: "Discover the best food trucks in your area with real-time location tracking and reviews.",
}

export default function Home() {
  return (
    <main>
      <HomeView />
    </main>
  )
}
