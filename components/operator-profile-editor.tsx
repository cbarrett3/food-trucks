"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Upload, Check, Instagram, Twitter, Globe, Phone, MapPin, Save } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface OperatorProfileEditorProps {
  className?: string
}

export function OperatorProfileEditor({ className }: OperatorProfileEditorProps) {
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<"basic" | "media" | "social">("basic")
  const [saveSuccess, setSaveSuccess] = useState(false)
  
  // handle form submission
  const handleSave = () => {
    setIsSaving(true)
    
    // simulate saving delay
    setTimeout(() => {
      setIsSaving(false)
      setSaveSuccess(true)
      
      // reset success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false)
      }, 3000)
    }, 1000)
  }

  return (
    <Card className={cn("shadow-md", className)}>
      <CardHeader>
        <CardTitle className="text-xl">truck profile</CardTitle>
        <CardDescription>
          customize your food truck's profile information
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
          <TabsList className="grid w-full grid-cols-3 rounded-none border-b" aria-label="profile sections">
            <TabsTrigger value="basic" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary" aria-label="basic information tab">
              basic info
            </TabsTrigger>
            <TabsTrigger value="media" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary" aria-label="media tab">
              media
            </TabsTrigger>
            <TabsTrigger value="social" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary" aria-label="social media tab">
              social
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="p-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="truck-name">truck name</Label>
              <Input 
                id="truck-name" 
                defaultValue="Taco Delights" 
                aria-label="enter truck name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="truck-description">description</Label>
              <Textarea
                id="truck-description"
                rows={4}
                defaultValue="Authentic Mexican street tacos with a modern twist. We use fresh, locally-sourced ingredients and homemade salsas."
                aria-label="enter truck description"
              />
              <p className="text-xs text-muted-foreground">
                briefly describe your food truck, specialties, and what makes you unique
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cuisine-type">cuisine type</Label>
                <Input 
                  id="cuisine-type" 
                  defaultValue="Mexican" 
                  aria-label="enter cuisine type"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="price-range">price range</Label>
                <Input 
                  id="price-range" 
                  defaultValue="$" 
                  aria-label="enter price range"
                />
                <p className="text-xs text-muted-foreground">
                  use $ for budget, $$ for mid-range, $$$ for high-end
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">phone number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <Input 
                  id="phone" 
                  defaultValue="(555) 123-4567" 
                  className="pl-9"
                  aria-label="enter phone number"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">primary location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <Input 
                  id="address" 
                  defaultValue="123 Main St, San Francisco, CA" 
                  className="pl-9"
                  aria-label="enter primary location"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                this is your default location when not actively sharing your position
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="media" className="p-4 space-y-4">
            <div className="space-y-2">
              <Label>truck logo</Label>
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 rounded-md overflow-hidden border">
                  <Image
                    src="/placeholder.svg?height=80&width=80"
                    alt="Truck Logo"
                    fill
                    className="object-cover"
                  />
                </div>
                <Button variant="outline" size="sm" className="h-9" aria-label="upload new logo">
                  <Upload className="h-4 w-4 mr-2" aria-hidden="true" />
                  upload new logo
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                recommended size: 400x400px, max 2MB
              </p>
            </div>
            
            <div className="space-y-2">
              <Label>cover photos</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="relative aspect-video rounded-md overflow-hidden border group">
                    <Image
                      src="/placeholder.svg?height=120&width=200"
                      alt={`Cover Photo ${i}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button variant="ghost" size="sm" className="text-white" aria-label={`edit photo ${i}`}>
                        edit
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="relative aspect-video rounded-md overflow-hidden border flex items-center justify-center bg-muted/50">
                  <Button variant="ghost" aria-label="add photo">
                    <Upload className="h-4 w-4 mr-2" aria-hidden="true" />
                    add photo
                  </Button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                recommended size: 1200x800px, max 5MB each
              </p>
            </div>
            
            <div className="space-y-2">
              <Label>menu photos</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="relative aspect-square rounded-md overflow-hidden border group">
                    <Image
                      src="/placeholder.svg?height=150&width=150"
                      alt={`Menu Item ${i}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button variant="ghost" size="sm" className="text-white" aria-label={`edit menu item ${i}`}>
                        edit
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="relative aspect-square rounded-md overflow-hidden border flex items-center justify-center bg-muted/50">
                  <Button variant="ghost" aria-label="add menu item photo">
                    <Upload className="h-4 w-4 mr-2" aria-hidden="true" />
                    add item
                  </Button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                showcase your most popular menu items
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="social" className="p-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="website">website</Label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <Input 
                  id="website" 
                  defaultValue="https://tacodelights.com" 
                  className="pl-9"
                  aria-label="enter website url"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="instagram">instagram</Label>
              <div className="relative">
                <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <Input 
                  id="instagram" 
                  defaultValue="@tacodelights" 
                  className="pl-9"
                  aria-label="enter instagram handle"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="twitter">twitter</Label>
              <div className="relative">
                <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <Input 
                  id="twitter" 
                  defaultValue="@tacodelights" 
                  className="pl-9"
                  aria-label="enter twitter handle"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="flex justify-between border-t p-4">
        <div className="flex items-center">
          {saveSuccess && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center text-green-600 dark:text-green-400 text-sm"
            >
              <Check className="h-4 w-4 mr-1" aria-hidden="true" />
              <span>changes saved</span>
            </motion.div>
          )}
        </div>
        
        <Button onClick={handleSave} disabled={isSaving} aria-label="save profile changes">
          {isSaving ? (
            <motion.div
              className="h-4 w-4 rounded-full border-2 border-current border-r-transparent animate-spin mr-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
          ) : (
            <Save className="h-4 w-4 mr-2" aria-hidden="true" />
          )}
          save changes
        </Button>
      </CardFooter>
    </Card>
  )
}
