"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { Search, Menu, X, Truck } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"
import { motion, AnimatePresence } from "framer-motion"

// navigation links data for reuse
const navLinks = [
  { href: "/", label: "explore" },
  { href: "/map", label: "map" },
  { href: "/vendors", label: "for vendors" },
]

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { openLoginModal } = useAuth()

  // handle scroll event to add shadow to navbar when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-200",
        isScrolled 
          ? "bg-background/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-border/10 dark:border-gray-800/30" 
          : "bg-background dark:bg-gray-900"
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* logo */}
        <Link
          href="/"
          className="flex items-center space-x-2 group"
          aria-label="food truckies home"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-lg bg-gradient-to-br from-primary/90 to-primary p-1.5 sm:p-2 transition-shadow duration-300 shadow-sm group-hover:shadow-md"
          >
            <Truck className="h-5 w-5 text-primary-foreground" aria-hidden="true" />
          </motion.div>
          <span className="hidden font-semibold sm:inline-block">food truckies</span>
        </Link>

        {/* desktop navigation */}
        <DesktopNav pathname={pathname} />

        {/* search and actions */}
        <DesktopActions openLoginModal={openLoginModal} />

        {/* mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full p-2 text-foreground hover:bg-muted/80 dark:hover:bg-gray-800/80 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20"
            aria-label={isMenuOpen ? "close menu" : "open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </motion.button>
        </div>
      </div>

      {/* mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <MobileMenu pathname={pathname} id="mobile-menu" openLoginModal={openLoginModal} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

function DesktopNav({ pathname }: { pathname: string }) {
  return (
    <nav className="hidden md:flex items-center space-x-6">
      {navLinks.map((link) => (
        <motion.div key={link.href} whileHover={{ y: -1 }} whileTap={{ y: 0 }}>
          <Link
            href={link.href}
            className={cn(
              "text-sm font-medium transition-colors relative",
              pathname === link.href 
                ? "text-foreground" 
                : "text-foreground/60 hover:text-foreground/90"
            )}
          >
            {link.label}
            {pathname === link.href && (
              <motion.span
                layoutId="navIndicator"
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/80 to-primary rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </Link>
        </motion.div>
      ))}
    </nav>
  )
}

function DesktopActions({ openLoginModal }: { openLoginModal: (initialTab?: "login" | "signup") => void }) {
  return (
    <div className="hidden md:flex items-center gap-2">
      <motion.div 
        className="relative"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
        <Input
          type="search"
          placeholder="search for food trucks..."
          className="pl-9 pr-4 py-2 h-9 w-60 rounded-full bg-muted/80 dark:bg-gray-800/50 border-none focus-visible:ring-primary hover:bg-muted dark:hover:bg-gray-800/80 transition-colors"
          aria-label="search for food trucks"
        />
      </motion.div>
      <ThemeToggle />
      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
        <Button
          variant="outline"
          className="ml-2 border-border/30 dark:border-gray-700/50 bg-background/50 dark:bg-gray-800/50 hover:bg-background/80 dark:hover:bg-gray-800/80 transition-all"
          onClick={() => openLoginModal("login")}
        >
          login
        </Button>
      </motion.div>
      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
        <Button
          className="bg-gradient-to-r from-primary/90 to-primary hover:from-primary hover:to-primary/90 text-primary-foreground shadow-sm hover:shadow transition-all"
          onClick={() => openLoginModal("signup")}
        >
          sign up
        </Button>
      </motion.div>
    </div>
  )
}

function MobileMenu({ pathname, id, openLoginModal }: { 
  pathname: string; 
  id: string; 
  openLoginModal: (initialTab?: "login" | "signup") => void 
}) {
  return (
    <div className="md:hidden border-t border-border/10 dark:border-gray-800/30" id={id}>
      <div className="container mx-auto px-4 py-4 flex flex-col space-y-4 bg-background/95 dark:bg-gray-900/95 backdrop-blur-sm">
        <motion.div 
          className="relative"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input
            type="search"
            placeholder="search for food trucks..."
            className="pl-9 pr-4 py-2 h-9 rounded-full bg-muted/80 dark:bg-gray-800/50 border-none focus-visible:ring-primary hover:bg-muted dark:hover:bg-gray-800/80 transition-colors"
            aria-label="search for food trucks"
          />
        </motion.div>
        <nav className="flex flex-col space-y-1">
          {navLinks.map((link) => (
            <motion.div key={link.href} whileHover={{ x: 2 }} whileTap={{ x: 0 }}>
              <Link
                href={link.href}
                className={cn(
                  "p-2 text-sm font-medium rounded-md transition-colors flex items-center",
                  pathname === link.href 
                    ? "bg-muted/80 dark:bg-gray-800/50 text-foreground" 
                    : "text-foreground/60 hover:text-foreground/80 hover:bg-muted/50 dark:hover:bg-gray-800/30"
                )}
              >
                {pathname === link.href && (
                  <motion.span
                    layoutId="mobileNavIndicator"
                    className="w-1 h-4 bg-gradient-to-b from-primary/80 to-primary rounded-full mr-2"
                  />
                )}
                {link.label}
              </Link>
            </motion.div>
          ))}
        </nav>
        <div className="flex flex-col space-y-2 pt-2 border-t border-border/10 dark:border-gray-800/30">
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <Button
              variant="outline"
              className="w-full border-border/30 dark:border-gray-700/50 bg-background/50 dark:bg-gray-800/50 hover:bg-background/80 dark:hover:bg-gray-800/80 transition-all"
              onClick={() => openLoginModal("login")}
            >
              login
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <Button
              className="w-full bg-gradient-to-r from-primary/90 to-primary hover:from-primary hover:to-primary/90 text-primary-foreground shadow-sm hover:shadow transition-all"
              onClick={() => openLoginModal("signup")}
            >
              sign up
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
