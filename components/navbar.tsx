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
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-200",
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-background"
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* logo */}
        <Link
          href="/"
          className="flex items-center space-x-2"
          aria-label="food truckies home"
        >
          <div className="rounded-lg bg-primary p-1.5 sm:p-2">
            <Truck className="h-5 w-5 text-primary-foreground" aria-hidden="true" />
          </div>
          <span className="hidden font-semibold sm:inline-block">food truckies</span>
        </Link>

        {/* desktop navigation */}
        <DesktopNav pathname={pathname} />

        {/* search and actions */}
        <DesktopActions openLoginModal={openLoginModal} />

        {/* mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <Button
            variant="ghost"
            size="icon"
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
          </Button>
        </div>
      </div>

      {/* mobile menu */}
      {isMenuOpen && <MobileMenu pathname={pathname} id="mobile-menu" openLoginModal={openLoginModal} />}
    </header>
  )
}

function DesktopNav({ pathname }: { pathname: string }) {
  return (
    <nav className="hidden md:flex items-center space-x-6">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-foreground/80",
            pathname === link.href ? "text-foreground" : "text-foreground/60"
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}

function DesktopActions({ openLoginModal }: { openLoginModal: (initialTab?: "login" | "signup") => void }) {
  return (
    <div className="hidden md:flex items-center gap-2">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
        <Input
          type="search"
          placeholder="search for food trucks..."
          className="pl-9 pr-4 py-2 h-9 w-60 rounded-full bg-muted border-none focus-visible:ring-primary"
          aria-label="search for food trucks"
        />
      </div>
      <ThemeToggle />
      <Button
        variant="outline"
        className="ml-2 border-border"
        onClick={() => openLoginModal("login")}
      >
        login
      </Button>
      <Button
        className="bg-primary hover:bg-primary/90 text-primary-foreground"
        onClick={() => openLoginModal("signup")}
      >
        sign up
      </Button>
    </div>
  )
}

function MobileMenu({ pathname, id, openLoginModal }: { 
  pathname: string; 
  id: string; 
  openLoginModal: (initialTab?: "login" | "signup") => void 
}) {
  return (
    <div className="md:hidden border-t border-border" id={id}>
      <div className="container mx-auto px-4 py-4 flex flex-col space-y-4 bg-background">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input
            type="search"
            placeholder="search for food trucks..."
            className="pl-9 pr-4 py-2 h-9 rounded-full bg-muted border-none focus-visible:ring-primary"
            aria-label="search for food trucks"
          />
        </div>
        <nav className="flex flex-col space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "p-2 text-sm font-medium rounded-md transition-colors",
                pathname === link.href ? "bg-muted text-foreground" : "text-foreground/60 hover:text-foreground/80 hover:bg-muted/50"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col space-y-2 pt-2 border-t border-border">
          <Button
            variant="outline"
            className="w-full border-border"
            onClick={() => openLoginModal("login")}
          >
            login
          </Button>
          <Button
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={() => openLoginModal("signup")}
          >
            sign up
          </Button>
        </div>
      </div>
    </div>
  )
}
