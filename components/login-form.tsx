"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Facebook, Truck, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // simulate api call
    setTimeout(() => {
      setIsLoading(false)
      window.location.href = "/"
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4">
      {/* theme toggle - only shown after mounting to prevent hydration mismatch */}
      {mounted && (
        <div className="absolute top-4 right-4">
          <Button
            variant="outline"
            size="icon"
            className="w-9 h-9 rounded-full border-border hover:bg-secondary/10"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={theme === "dark" ? "switch to light theme" : "switch to dark theme"}
          >
            <span className="sr-only">toggle theme</span>
            {mounted && theme === "dark" ? (
              <Sun className="h-4 w-4 text-accent" aria-hidden="true" />
            ) : (
              <Moon className="h-4 w-4 text-secondary" aria-hidden="true" />
            )}
          </Button>
        </div>
      )}
      
      <Link 
        href="/" 
        className="flex items-center gap-2 mb-8 hover:opacity-90 transition-opacity"
        aria-label="return to home page"
      >
        <motion.div 
          className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Truck className="h-7 w-7 text-primary-foreground" aria-hidden="true" />
        </motion.div>
        <span className="text-2xl font-bold">food truckies</span>
      </Link>

      <div className="w-full max-w-md">
        <Card className="border-border shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">welcome back</CardTitle>
            <CardDescription className="text-center">
              sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="email" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4" aria-label="sign in options">
                <TabsTrigger value="email">email</TabsTrigger>
                <TabsTrigger value="phone">phone</TabsTrigger>
              </TabsList>
              <TabsContent value="email">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">email</Label>
                    <Input 
                      id="email" 
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
                        href="#" 
                        className="text-sm text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
                      >
                        forgot password?
                      </Link>
                    </div>
                    <Input 
                      id="password" 
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
              <TabsContent value="phone">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">phone number</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="(123) 456-7890" 
                      required 
                      aria-required="true"
                      autoComplete="tel"
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
                        sending code...
                      </span>
                    ) : (
                      "send verification code"
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
                <span className="bg-card px-2 text-muted-foreground">or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="border-border hover:bg-secondary/10"
                aria-label="sign in with google"
              >
                {/* only show google icon after mounting to prevent hydration mismatch */}
                {mounted ? (
                  <div className="mr-2 h-4 w-4 relative" aria-hidden="true">
                    {theme === "dark" ? (
                      <svg viewBox="0 0 24 24">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#8ab4f8"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#fabb05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#e8453c"
                        />
                      </svg>
                    ) : (
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
                    )}
                  </div>
                ) : (
                  <div className="mr-2 h-4 w-4" />
                )}
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
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              don't have an account?{" "}
              <Link 
                href="#" 
                className="text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
              >
                sign up
              </Link>
            </div>
            <div className="text-center text-xs text-muted-foreground">
              by continuing, you agree to our{" "}
              <Link 
                href="#" 
                className="underline underline-offset-2 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
              >
                terms of service
              </Link>{" "}
              and{" "}
              <Link 
                href="#" 
                className="underline underline-offset-2 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
              >
                privacy policy
              </Link>
              .
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
