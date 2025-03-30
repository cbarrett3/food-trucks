"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface FoodTruckClusterProps {
  count: number
  size?: "small" | "medium" | "large" | "auto"
  onClick?: () => void
}

export function FoodTruckCluster({ 
  count, 
  size = "medium", 
  onClick 
}: FoodTruckClusterProps) {
  // determine size based on count
  const actualSize = size === "auto" 
    ? count < 10 
      ? "small" 
      : count < 50 
        ? "medium" 
        : "large"
    : size;
  
  // size mappings
  const sizeClasses = {
    small: "h-10 w-10 text-xs",
    medium: "h-12 w-12 text-sm",
    large: "h-14 w-14 text-base"
  };
  
  // color mappings based on count
  const getColor = () => {
    if (count < 10) return "bg-blue-500";
    if (count < 50) return "bg-yellow-500";
    return "bg-primary";
  };

  return (
    <motion.button
      className={cn(
        "rounded-full flex items-center justify-center font-semibold text-white shadow-md cursor-pointer",
        sizeClasses[actualSize],
        getColor()
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      aria-label={`Cluster of ${count} food trucks. Click to zoom in.`}
    >
      {count}
    </motion.button>
  );
}
