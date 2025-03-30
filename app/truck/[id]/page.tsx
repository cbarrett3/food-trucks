import { FoodTruckDetail } from "@/components/food-truck-detail"
import { foodTrucks } from "@/data/food-trucks"
import { notFound } from "next/navigation"

export default function TruckDetailPage({ params }: { params: { id: string } }) {
  const truck = foodTrucks.find((t) => t.id === params.id)

  if (!truck) {
    notFound()
  }

  return <FoodTruckDetail truck={truck} />
}

