"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ThemeToggle } from "@/components/theme-toggle"
import { Heart, MapPin, Truck } from "lucide-react"

export default function ThemePage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
              <Truck className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold">food truck theme showcase</h1>
          </div>
          <ThemeToggle />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <section>
            <h2 className="text-xl font-semibold mb-4">color palette</h2>
            <div className="grid grid-cols-2 gap-4">
              <ColorCard name="primary" color="var(--color-primary)" textColor="var(--color-primary-foreground)" />
              <ColorCard name="secondary" color="var(--color-secondary)" textColor="var(--color-secondary-foreground)" />
              <ColorCard name="accent" color="var(--color-accent)" textColor="var(--color-accent-foreground)" />
              <ColorCard name="muted" color="var(--color-muted)" textColor="var(--color-muted-foreground)" />
              <ColorCard name="background" color="var(--color-background)" textColor="var(--color-foreground)" />
              <ColorCard name="card" color="var(--color-card)" textColor="var(--color-card-foreground)" />
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">food truck colors</h2>
            <div className="grid grid-cols-2 gap-4">
              <ColorCard name="food truck orange" color="oklch(0.75 0.15 60)" textColor="white" />
              <ColorCard name="warm yellow" color="oklch(0.85 0.12 85)" textColor="black" />
              <ColorCard name="night blue" color="oklch(0.3 0.1 265)" textColor="white" />
              <ColorCard name="herb green" color="oklch(0.65 0.12 145)" textColor="black" />
              <ColorCard name="wood brown" color="oklch(0.55 0.1 60)" textColor="white" />
              <ColorCard name="airbnb red" color="oklch(0.67 0.2 22)" textColor="white" />
            </div>
          </section>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <section>
            <h2 className="text-xl font-semibold mb-4">buttons</h2>
            <div className="flex flex-wrap gap-4">
              <Button>default</Button>
              <Button variant="secondary">secondary</Button>
              <Button variant="destructive">destructive</Button>
              <Button variant="outline">outline</Button>
              <Button variant="ghost">ghost</Button>
              <Button variant="link">link</Button>
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              <Button size="sm">small</Button>
              <Button>default</Button>
              <Button size="lg">large</Button>
              <Button size="icon"><Heart /></Button>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">badges</h2>
            <div className="flex flex-wrap gap-2">
              <Badge>default</Badge>
              <Badge variant="secondary">secondary</Badge>
              <Badge variant="destructive">destructive</Badge>
              <Badge variant="outline">outline</Badge>
              <Badge className="bg-[oklch(0.75_0.15_60)] text-white">orange</Badge>
              <Badge className="bg-[oklch(0.85_0.12_85)] text-black">yellow</Badge>
              <Badge className="bg-[oklch(0.3_0.1_265)] text-white">blue</Badge>
              <Badge className="bg-[oklch(0.65_0.12_145)] text-black">green</Badge>
              <Badge className="bg-[oklch(0.55_0.1_60)] text-white">brown</Badge>
            </div>
          </section>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">card example</h2>
            <Card>
              <CardHeader>
                <CardTitle>food truck finder</CardTitle>
                <CardDescription>discover amazing food trucks near you</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">san francisco, ca</span>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline" className="bg-secondary/20 text-secondary-foreground border-secondary/30">tacos</Badge>
                  <Badge variant="outline" className="bg-secondary/20 text-secondary-foreground border-secondary/30">burritos</Badge>
                  <Badge variant="outline" className="bg-secondary/20 text-secondary-foreground border-secondary/30">mexican</Badge>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  <Heart className="h-4 w-4 mr-2" />
                  save
                </Button>
                <Button size="sm">view details</Button>
              </CardFooter>
            </Card>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">form example</h2>
            <Card>
              <CardHeader>
                <CardTitle>login</CardTitle>
                <CardDescription>access your account</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="email" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="email">email</TabsTrigger>
                    <TabsTrigger value="phone">phone</TabsTrigger>
                  </TabsList>
                  <TabsContent value="email" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">email</Label>
                      <Input id="email" type="email" placeholder="hello@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">password</Label>
                      <Input id="password" type="password" />
                    </div>
                  </TabsContent>
                  <TabsContent value="phone" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">phone number</Label>
                      <Input id="phone" type="tel" placeholder="(123) 456-7890" />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter>
                <Button className="w-full">sign in</Button>
              </CardFooter>
            </Card>
          </section>
        </div>

        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>toggle between light and dark mode using the theme toggle in the header</p>
          <p className="mt-2">all colors use the oklch color format for better color perception</p>
        </footer>
      </div>
    </div>
  )
}

function ColorCard({ name, color, textColor }: { name: string; color: string; textColor: string }) {
  return (
    <div 
      className="rounded-lg p-4 flex flex-col justify-between h-32 border border-border"
      style={{ backgroundColor: color, color: textColor }}
    >
      <span className="text-sm">{name}</span>
      <div className="mt-auto">
        <div className="text-xs opacity-80">{color}</div>
      </div>
    </div>
  )
}
