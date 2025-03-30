"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { X, Facebook, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/auth-context"
import { cn } from "@/lib/utils"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  initialTab?: "login" | "signup"
}

export function LoginModal({ isOpen, onClose, initialTab = "login" }: LoginModalProps) {
  const [activeTab, setActiveTab] = useState<"login" | "signup">(initialTab)
  const [isLoading, setIsLoading] = useState(false)
  const { login, signup } = useAuth()

  // prevent scrolling when modal is open
  if (typeof window !== "undefined") {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    const form = e.target as HTMLFormElement
    const email = (form.elements.namedItem("email") as HTMLInputElement).value
    const password = (form.elements.namedItem("password") as HTMLInputElement).value
    
    try {
      await login(email, password)
      onClose()
    } catch (error) {
      console.error("Login error:", error)
      // handle error state
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    const form = e.target as HTMLFormElement
    const name = (form.elements.namedItem("name") as HTMLInputElement).value
    const email = (form.elements.namedItem("email") as HTMLInputElement).value
    const password = (form.elements.namedItem("password") as HTMLInputElement).value
    
    try {
      await signup(email, password, name)
      onClose()
    } catch (error) {
      console.error("Signup error:", error)
      // handle error state
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* modal */}
          <motion.div
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-background p-6 shadow-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.3 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            {/* close button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 h-8 w-8 rounded-full"
              onClick={onClose}
              aria-label="close modal"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </Button>

            <div className="flex flex-col items-center mb-4">
              <motion.div 
                className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center mb-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Truck className="h-7 w-7 text-primary-foreground" aria-hidden="true" />
              </motion.div>
              <h2 id="auth-modal-title" className="text-xl font-semibold">
                welcome to food truckies
              </h2>
            </div>

            <Tabs 
              defaultValue={activeTab} 
              onValueChange={(value) => setActiveTab(value as "login" | "signup")}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-4" aria-label="authentication options">
                <TabsTrigger value="login">login</TabsTrigger>
                <TabsTrigger value="signup">sign up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">email</Label>
                    <Input 
                      id="email" 
                      name="email"
                      type="email" 
                      placeholder="hello@example.com" 
                      required 
                      aria-required="true"
                      autoComplete="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">password</Label>
                      <Link 
                        href="/forgot-password" 
                        className="text-sm text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          onClose()
                        }}
                      >
                        forgot?
                      </Link>
                    </div>
                    <Input 
                      id="password" 
                      name="password"
                      type="password" 
                      required 
                      aria-required="true"
                      autoComplete="current-password"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" 
                    disabled={isLoading}
                    aria-busy={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        signing in...
                      </span>
                    ) : (
                      "sign in"
                    )}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">name</Label>
                    <Input 
                      id="name" 
                      name="name"
                      type="text" 
                      placeholder="john doe" 
                      required 
                      aria-required="true"
                      autoComplete="name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">email</Label>
                    <Input 
                      id="signup-email" 
                      name="email"
                      type="email" 
                      placeholder="hello@example.com" 
                      required 
                      aria-required="true"
                      autoComplete="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">password</Label>
                    <Input 
                      id="signup-password" 
                      name="password"
                      type="password" 
                      required 
                      aria-required="true"
                      autoComplete="new-password"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" 
                    disabled={isLoading}
                    aria-busy={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        creating account...
                      </span>
                    ) : (
                      "create account"
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <Button 
                variant="outline" 
                className="border-border hover:bg-secondary/10"
                aria-label="sign in with google"
              >
                <div className="mr-2 h-4 w-4 relative" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                </div>
                google
              </Button>
              <Button 
                variant="outline" 
                className="border-border hover:bg-secondary/10"
                aria-label="sign in with facebook"
              >
                <Facebook className="mr-2 h-4 w-4" aria-hidden="true" />
                facebook
              </Button>
            </div>

            <div className="text-center text-xs text-muted-foreground">
              by continuing, you agree to our{" "}
              <Link 
                href="/terms" 
                className="underline underline-offset-2 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
                onClick={(e) => e.stopPropagation()}
              >
                terms of service
              </Link>{" "}
              and{" "}
              <Link 
                href="/privacy" 
                className="underline underline-offset-2 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
                onClick={(e) => e.stopPropagation()}
              >
                privacy policy
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
