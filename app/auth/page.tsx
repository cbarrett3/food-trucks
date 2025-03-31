"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AuthForm } from "@/components/auth-form"
import { Truck } from "lucide-react"
import { motion } from "framer-motion"

export default function AuthPage() {
  const router = useRouter()
  
  // handle successful authentication
  const handleAuthSuccess = () => {
    router.push("/operator")
  }
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 p-4">
      <motion.div 
        className="mb-8 flex flex-col items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Truck className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-primary">food truckies</h1>
        </div>
        <p className="text-muted-foreground text-center">operator portal</p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full max-w-md"
      >
        <AuthForm onSuccess={handleAuthSuccess} />
      </motion.div>
    </div>
  )
}
