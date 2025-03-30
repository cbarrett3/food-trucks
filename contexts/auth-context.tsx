"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { LoginModal } from "@/components/login-modal"

// this is a placeholder type that will be replaced with Nile's user type
interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  // these functions will be implemented with Nile auth later
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string) => Promise<void>
  logout: () => Promise<void>
  // modal control functions
  openLoginModal: (initialTab?: "login" | "signup") => void
  closeLoginModal: () => void
  // placeholder function to show auth modal
  requireAuth: (featureName?: string) => boolean
}

// create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
  openLoginModal: () => {},
  closeLoginModal: () => {},
  requireAuth: () => false,
})

// custom hook to use the auth context
export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [initialModalTab, setInitialModalTab] = useState<"login" | "signup">("login")

  // simulate checking for an existing session
  useEffect(() => {
    // this will be replaced with Nile auth session check
    const checkSession = async () => {
      try {
        // simulate a network request
        await new Promise((resolve) => setTimeout(resolve, 500))
        
        // for now, always set user to null (not authenticated)
        setUser(null)
      } catch (error) {
        console.error("Error checking session:", error)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()
  }, [])

  // modal control functions
  const openLoginModal = (initialTab: "login" | "signup" = "login") => {
    setInitialModalTab(initialTab)
    setShowLoginModal(true)
  }

  const closeLoginModal = () => {
    setShowLoginModal(false)
  }

  // placeholder auth functions that will be replaced with Nile auth
  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // simulate a network request
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      // this is just a placeholder - will be replaced with actual Nile auth
      setUser({
        id: "user-123",
        name: "Demo User",
        email: email,
      })
    } catch (error) {
      console.error("Login error:", error)
      throw new Error("Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (email: string, password: string, name: string) => {
    setIsLoading(true)
    try {
      // simulate a network request
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      // this is just a placeholder - will be replaced with actual Nile auth
      setUser({
        id: "user-" + Math.random().toString(36).substring(2, 9),
        name: name,
        email: email,
      })
    } catch (error) {
      console.error("Signup error:", error)
      throw new Error("Signup failed")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    try {
      // simulate a network request
      await new Promise((resolve) => setTimeout(resolve, 500))
      
      setUser(null)
    } catch (error) {
      console.error("Logout error:", error)
      throw new Error("Logout failed")
    } finally {
      setIsLoading(false)
    }
  }

  // function to check if user is authenticated and show auth modal if not
  const requireAuth = (featureName?: string) => {
    if (!user) {
      // open the login modal with a message about the required feature
      openLoginModal("login")
      return false
    }
    return true
  }

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
    openLoginModal,
    closeLoginModal,
    requireAuth,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={closeLoginModal} 
        initialTab={initialModalTab}
      />
    </AuthContext.Provider>
  )
}
