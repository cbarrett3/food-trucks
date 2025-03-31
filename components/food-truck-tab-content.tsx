"use client"

import { FoodTruck } from "@/types/food-truck"
import { FoodTruckMenu } from "./food-truck-menu"
import { FoodTruckReviews } from "./food-truck-reviews"
import { FoodTruckSchedule } from "./food-truck-schedule"
import { TabType } from "./food-truck-tabs"

interface FoodTruckTabContentProps {
  truck: FoodTruck
  activeTab: TabType
}

export function FoodTruckTabContent({ truck, activeTab }: FoodTruckTabContentProps) {
  return (
    <div className="overflow-auto flex-1">
      {activeTab === "findUs" && (
        <FoodTruckSchedule truck={truck} />
      )}
      
      {activeTab === "menu" && (
        <FoodTruckMenu truck={truck} />
      )}
      
      {activeTab === "reviews" && (
        <FoodTruckReviews truck={truck} />
      )}
    </div>
  )
}
