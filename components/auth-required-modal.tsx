"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"

interface AuthRequiredModalProps {
  isOpen: boolean
  onClose: () => void
  featureName?: string
  className?: string
}

export function AuthRequiredModal({
  isOpen,
  onClose,
  featureName = "this feature",
  className,
}: AuthRequiredModalProps) {
  const { openLoginModal } = useAuth()

  // prevent scrolling when modal is open
  if (typeof window !== "undefined") {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
  }

  const handleSignIn = () => {
    onClose()
    openLoginModal("login")
  }

  const handleSignUp = () => {
    onClose()
    openLoginModal("signup")
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
            className={cn(
              "fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-background p-6 shadow-lg",
              className
            )}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.3 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-modal-title"
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

            <div className="text-center">
              <h2 id="auth-modal-title" className="text-xl font-semibold mb-2">
                sign in required
              </h2>
              <p className="text-muted-foreground mb-6">
                please sign in or create an account to use {featureName}
              </p>

              <div className="flex flex-col gap-3">
                <Button
                  variant="default"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={handleSignIn}
                >
                  sign in
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-border" 
                  onClick={handleSignUp}
                >
                  create account
                </Button>
                <Button
                  variant="ghost"
                  className="mt-2 text-muted-foreground hover:text-foreground"
                  onClick={onClose}
                >
                  continue browsing
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
