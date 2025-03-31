"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Trophy, Star, MapPin, Calendar, Clock, Truck, Award, Gift } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

export default function TruckiesPage() {
  const [activeTab, setActiveTab] = useState("achievements")
  
  return (
    <div className="min-h-screen bg-background/50 dark:bg-gray-950/90 pt-6">
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground/90 dark:text-foreground/95">truckies hub</h1>
              <p className="text-muted-foreground/80 dark:text-muted-foreground/70">track your food truck adventures and earn rewards</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium text-foreground/90 dark:text-foreground/95">level 3</span>
                <span className="text-xs text-muted-foreground/80 dark:text-muted-foreground/70">food explorer</span>
              </div>
              <Avatar className="h-12 w-12 border-2 border-primary/20">
                <AvatarImage src="/placeholder.svg" alt="User avatar" />
                <AvatarFallback>FT</AvatarFallback>
              </Avatar>
            </div>
          </div>
          
          <Card className="shadow-sm border-border/30 dark:border-gray-800/40 bg-background/80 dark:bg-gray-900/60 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground/90 dark:text-foreground/95">experience progress</CardTitle>
              <CardDescription className="text-muted-foreground/80 dark:text-muted-foreground/70">350 / 500 XP to level 4</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Progress value={70} className="h-2 bg-muted/50 dark:bg-gray-800/50" aria-label="level progress" />
                <div className="flex justify-between text-xs text-muted-foreground/80 dark:text-muted-foreground/70">
                  <span>Level 3</span>
                  <span>Level 4</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 h-10 bg-muted/50 dark:bg-gray-800/30" aria-label="truckies sections">
              <TabsTrigger 
                value="achievements" 
                className="data-[state=active]:bg-background/90 dark:data-[state=active]:bg-gray-800/60"
                aria-label="achievements tab"
              >
                achievements
              </TabsTrigger>
              <TabsTrigger 
                value="visited" 
                className="data-[state=active]:bg-background/90 dark:data-[state=active]:bg-gray-800/60"
                aria-label="visited trucks tab"
              >
                visited trucks
              </TabsTrigger>
              <TabsTrigger 
                value="rewards" 
                className="data-[state=active]:bg-background/90 dark:data-[state=active]:bg-gray-800/60"
                aria-label="rewards tab"
              >
                rewards
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="achievements" className="mt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { 
                    title: "first bite", 
                    description: "visit your first food truck", 
                    icon: Truck, 
                    progress: 100,
                    completed: true
                  },
                  { 
                    title: "food explorer", 
                    description: "visit 5 different food trucks", 
                    icon: MapPin, 
                    progress: 80,
                    completed: false
                  },
                  { 
                    title: "cuisine connoisseur", 
                    description: "try 3 different cuisine types", 
                    icon: Star, 
                    progress: 66,
                    completed: false
                  },
                  { 
                    title: "regular customer", 
                    description: "visit the same truck 3 times", 
                    icon: Trophy, 
                    progress: 100,
                    completed: true
                  },
                  { 
                    title: "weekend foodie", 
                    description: "visit a food truck on a weekend", 
                    icon: Calendar, 
                    progress: 100,
                    completed: true
                  },
                  { 
                    title: "night owl", 
                    description: "visit a food truck after 8pm", 
                    icon: Clock, 
                    progress: 0,
                    completed: false
                  },
                ].map((achievement, i) => (
                  <Card 
                    key={i} 
                    className={cn(
                      "shadow-sm border-border/30 dark:border-gray-800/40 bg-background/80 dark:bg-gray-900/60 backdrop-blur-sm overflow-hidden",
                      achievement.completed && "border-primary/20 dark:border-primary/30"
                    )}
                  >
                    <div className="flex items-start p-4 gap-4">
                      <div className={cn(
                        "rounded-full p-2.5 bg-primary/10 dark:bg-primary/20",
                        achievement.completed ? "text-primary dark:text-primary-foreground" : "text-muted-foreground/70"
                      )}>
                        <achievement.icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium text-foreground/90 dark:text-foreground/95">{achievement.title}</h3>
                          {achievement.completed && (
                            <Badge className="bg-primary/10 hover:bg-primary/15 text-primary/90 dark:bg-primary/20 dark:text-primary-foreground dark:border-primary/30">
                              completed
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground/80 dark:text-muted-foreground/70 mt-1">{achievement.description}</p>
                        {!achievement.completed && (
                          <div className="mt-2">
                            <Progress value={achievement.progress} className="h-1.5 bg-muted/50 dark:bg-gray-800/50" />
                            <p className="text-xs text-muted-foreground/80 dark:text-muted-foreground/70 mt-1">
                              {achievement.progress}% complete
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="visited" className="mt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { 
                    name: "Taco Delights", 
                    cuisine: "Mexican",
                    visits: 3,
                    lastVisit: "2 days ago",
                    rating: 4.5
                  },
                  { 
                    name: "Sushi on Wheels", 
                    cuisine: "Japanese",
                    visits: 1,
                    lastVisit: "1 week ago",
                    rating: 5
                  },
                  { 
                    name: "Burger Bliss", 
                    cuisine: "American",
                    visits: 2,
                    lastVisit: "3 days ago",
                    rating: 4
                  },
                  { 
                    name: "Curry Express", 
                    cuisine: "Indian",
                    visits: 1,
                    lastVisit: "2 weeks ago",
                    rating: 4.5
                  },
                ].map((truck, i) => (
                  <Card key={i} className="shadow-sm border-border/30 dark:border-gray-800/40 bg-background/80 dark:bg-gray-900/60 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-base font-medium text-foreground/90 dark:text-foreground/95">{truck.name}</CardTitle>
                          <CardDescription className="text-muted-foreground/80 dark:text-muted-foreground/70">{truck.cuisine} cuisine</CardDescription>
                        </div>
                        <Badge variant="outline" className="bg-primary/5 text-primary/90 border-primary/20 dark:bg-primary/15 dark:text-primary-foreground dark:border-primary/30">
                          {truck.visits} {truck.visits === 1 ? 'visit' : 'visits'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground/80 dark:text-muted-foreground/70">Last visit: {truck.lastVisit}</span>
                        <div className="flex items-center">
                          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400 mr-1" aria-hidden="true" />
                          <span className="text-sm font-medium text-foreground/90 dark:text-foreground/95">{truck.rating}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="rewards" className="mt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { 
                    title: "10% Off Your Next Order", 
                    description: "Valid at any participating food truck", 
                    icon: Gift, 
                    points: 500,
                    available: true
                  },
                  { 
                    title: "Free Side Dish", 
                    description: "Add a free side to any main dish purchase", 
                    icon: Award, 
                    points: 350,
                    available: true
                  },
                  { 
                    title: "Skip the Line Pass", 
                    description: "Get priority service at participating trucks", 
                    icon: Trophy, 
                    points: 750,
                    available: false
                  },
                  { 
                    title: "Exclusive Tasting Event", 
                    description: "Invitation to a special food truck gathering", 
                    icon: Calendar, 
                    points: 1000,
                    available: false
                  },
                ].map((reward, i) => (
                  <Card key={i} className="shadow-sm border-border/30 dark:border-gray-800/40 bg-background/80 dark:bg-gray-900/60 backdrop-blur-sm">
                    <div className="flex items-start p-4 gap-4">
                      <div className={cn(
                        "rounded-full p-2.5",
                        reward.available 
                          ? "bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-foreground" 
                          : "bg-muted/50 dark:bg-gray-800/50 text-muted-foreground/70"
                      )}>
                        <reward.icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-foreground/90 dark:text-foreground/95">{reward.title}</h3>
                        <p className="text-xs text-muted-foreground/80 dark:text-muted-foreground/70 mt-1">{reward.description}</p>
                        <div className="flex justify-between items-center mt-3">
                          <span className="text-xs font-medium text-foreground/80 dark:text-foreground/90">{reward.points} points</span>
                          <Button 
                            size="sm" 
                            variant={reward.available ? "default" : "outline"}
                            className={cn(
                              "h-8 text-xs",
                              !reward.available && "text-muted-foreground/70 dark:text-muted-foreground/60"
                            )}
                            disabled={!reward.available}
                          >
                            {reward.available ? "Redeem" : "Locked"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
