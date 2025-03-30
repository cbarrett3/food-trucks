"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Menu, X, Truck } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

// navigation links data for reuse
const navLinks = [
  { href: "/", label: "home" },
  { href: "/map", label: "map" },
  { href: "/trucks", label: "trucks" },
  { href: "/about", label: "about" },
]

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  // handle scroll event to add shadow to navbar when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200 bg-background border-b border-border",
        isScrolled && "shadow-sm"
      )}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* logo */}
        <Link href="/" className="flex items-center gap-2" aria-label="food truckies home">
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
            <Truck className="h-5 w-5 text-primary-foreground" aria-hidden="true" />
          </div>
          <span className="font-bold text-lg hidden sm:inline-block">food truckies</span>
        </Link>

        {/* desktop navigation */}
        <DesktopNav pathname={pathname} />

        {/* search and actions */}
        <DesktopActions />

        {/* mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "close menu" : "open menu"}
          >
            {isMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </Button>
        </div>
      </div>

      {/* mobile menu */}
      {isMenuOpen && <MobileMenu pathname={pathname} id="mobile-menu" />}
    </header>
  )
}

function DesktopNav({ pathname }: { pathname: string }) {
  return (
    <nav className="hidden md:flex items-center space-x-1" aria-label="main navigation">
      {navLinks.map((link) => (
        <NavLink 
          key={link.href} 
          href={link.href} 
          active={pathname === link.href}
          aria-current={pathname === link.href ? "page" : undefined}
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  )
}

function DesktopActions() {
  return (
    <div className="hidden md:flex items-center gap-2">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" aria-hidden="true" />
        <Input
          type="search"
          placeholder="search trucks..."
          className="w-[200px] pl-8 bg-background border-border focus-visible:ring-primary"
          aria-label="search for food trucks"
        />
      </div>
      <ThemeToggle />
      <Link href="/login">
        <Button variant="outline" className="ml-2 border-border">
          login
        </Button>
      </Link>
      <Link href="/signup">
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          sign up
        </Button>
      </Link>
    </div>
  )
}

function MobileMenu({ pathname, id }: { pathname: string; id: string }) {
  return (
    <div className="md:hidden border-t border-border" id={id}>
      <div className="container mx-auto px-4 py-4 flex flex-col space-y-4 bg-background">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <Input
            type="search"
            placeholder="search trucks..."
            className="w-full pl-8 bg-background border-border"
            aria-label="search for food trucks"
          />
        </div>
        <nav className="flex flex-col space-y-2" aria-label="mobile navigation">
          {navLinks.map((link) => (
            <MobileNavLink 
              key={link.href} 
              href={link.href} 
              active={pathname === link.href}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </MobileNavLink>
          ))}
        </nav>
        <div className="flex flex-col space-y-2 pt-2 border-t border-border">
          <Link href="/login" className="w-full">
            <Button variant="outline" className="w-full border-border">
              login
            </Button>
          </Link>
          <Link href="/signup" className="w-full">
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              sign up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

function NavLink({ 
  href, 
  active, 
  children,
  ...props 
}: { 
  href: string; 
  active: boolean; 
  children: React.ReactNode;
  [key: string]: any;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "px-3 py-2 rounded-md text-sm font-medium transition-colors",
        active
          ? "bg-primary/10 text-primary"
          : "text-foreground hover:bg-muted hover:text-foreground"
      )}
      {...props}
    >
      {children}
    </Link>
  )
}

function MobileNavLink({ 
  href, 
  active, 
  children,
  ...props 
}: { 
  href: string; 
  active: boolean; 
  children: React.ReactNode;
  [key: string]: any;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "px-3 py-2 rounded-md text-sm font-medium transition-colors",
        active
          ? "bg-primary/10 text-primary"
          : "text-foreground hover:bg-muted hover:text-foreground"
      )}
      {...props}
    >
      {children}
    </Link>
  )
}
