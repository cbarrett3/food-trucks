import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "food truckies",
  description: "discover amazing food trucks near you",
  manifest: "/manifest.json",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0f172a" media="(prefers-color-scheme: dark)" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:bg-background focus:text-foreground focus:p-4">
              skip to main content
            </a>
            <Navbar />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <footer className="border-t py-6 md:py-8">
              <div className="container flex flex-col items-center justify-center gap-4 text-center">
                <nav aria-label="footer navigation" className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                  <a href="/about" className="hover:text-foreground transition-colors">about</a>
                  <a href="/privacy" className="hover:text-foreground transition-colors">privacy</a>
                  <a href="/terms" className="hover:text-foreground transition-colors">terms</a>
                  <a href="/contact" className="hover:text-foreground transition-colors">contact</a>
                </nav>
                <p className="text-sm text-muted-foreground">
                  &copy; {new Date().getFullYear()} food truckies. all rights reserved.
                </p>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}