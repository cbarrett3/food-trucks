"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

interface AuthFormProps {
  className?: string
  onSuccess?: () => void
}

export function AuthForm({ className, onSuccess }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin")
  
  // handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    
    // simulate authentication delay
    setTimeout(() => {
      setIsLoading(false)
      if (onSuccess) onSuccess()
    }, 1500)
  }
  
  // handle social login
  const handleSocialLogin = (provider: "google" | "facebook") => {
    setIsLoading(true)
    
    // simulate authentication delay
    setTimeout(() => {
      setIsLoading(false)
      if (onSuccess) onSuccess()
    }, 1500)
  }

  return (
    <Card className={cn("w-full max-w-md mx-auto", className)}>
      <CardHeader>
        <CardTitle className="text-center">
          {authMode === "signin" ? "sign in to your account" : "create an account"}
        </CardTitle>
        <CardDescription className="text-center">
          {authMode === "signin" 
            ? "enter your credentials to access your dashboard" 
            : "sign up as a food truck operator"}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => handleSocialLogin("google")}
            disabled={isLoading}
            aria-label="sign in with google"
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                fill="#EA4335"
              />
              <path
                d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                fill="#4285F4"
              />
              <path
                d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                fill="#FBBC05"
              />
              <path
                d="M12.0004 24C15.2404 24 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24 12.0004 24Z"
                fill="#34A853"
              />
            </svg>
            google
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => handleSocialLogin("facebook")}
            disabled={isLoading}
            aria-label="sign in with facebook"
          >
            <svg className="mr-2 h-4 w-4" fill="#1877F2" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
              />
            </svg>
            facebook
          </Button>
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">or continue with</span>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {authMode === "signup" && (
            <div className="grid gap-2">
              <Label htmlFor="name">name</Label>
              <Input id="name" placeholder="your name" required disabled={isLoading} />
            </div>
          )}
          
          <div className="grid gap-2">
            <Label htmlFor="email">email</Label>
            <Input id="email" type="email" placeholder="name@example.com" required disabled={isLoading} />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="password">password</Label>
            <Input id="password" type="password" required disabled={isLoading} />
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <motion.div
                className="h-4 w-4 rounded-full border-2 border-current border-r-transparent animate-spin"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
            ) : authMode === "signin" ? (
              "sign in"
            ) : (
              "create account"
            )}
          </Button>
        </form>
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-2">
        <div className="text-sm text-center text-muted-foreground">
          {authMode === "signin" ? (
            <span>
              don't have an account?{" "}
              <button
                className="underline underline-offset-4 hover:text-primary"
                onClick={() => setAuthMode("signup")}
                type="button"
                aria-label="switch to sign up"
              >
                sign up
              </button>
            </span>
          ) : (
            <span>
              already have an account?{" "}
              <button
                className="underline underline-offset-4 hover:text-primary"
                onClick={() => setAuthMode("signin")}
                type="button"
                aria-label="switch to sign in"
              >
                sign in
              </button>
            </span>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
