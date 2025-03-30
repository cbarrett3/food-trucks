"use client"

import { useAuth } from "@/contexts/auth-context"

export function useAuthRequired() {
  const { isAuthenticated, openLoginModal } = useAuth()

  // function to check auth and show modal if needed
  const checkAuth = (feature?: string) => {
    if (!isAuthenticated) {
      openLoginModal("login")
      return false
    }
    return true
  }

  return {
    checkAuth,
    isAuthenticated,
  }
}
