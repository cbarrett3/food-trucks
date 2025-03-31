"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { BarChart3, Calendar, FileText, MapPin, MessageSquare, Settings, Truck, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OperatorSessionControl } from "@/components/operator-session-control"
import { OperatorSubscriptionPlan } from "@/components/operator-subscription-plan"
import { OperatorProfileEditor } from "@/components/operator-profile-editor"
import { OperatorHoursEditor } from "@/components/operator-hours-editor"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function OperatorDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-background/50 dark:bg-gray-950/90 pt-6">
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* sidebar navigation - hidden on mobile */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 md:top-16 border-r border-border/30 dark:border-gray-800/40 bg-background/70 dark:bg-gray-900/50 backdrop-blur-sm">
          <div className="flex-1 flex flex-col overflow-y-auto pt-5 pb-4">
            <nav className="flex-1 px-4 space-y-1">
              {[
                { name: "overview", icon: BarChart3, href: "/operator/dashboard" },
                { name: "profile", icon: User, href: "/operator/dashboard?tab=profile" },
                { name: "menu", icon: FileText, href: "/operator/dashboard?tab=menu" },
                { name: "schedule", icon: Calendar, href: "/operator/dashboard?tab=schedule" },
                { name: "locations", icon: MapPin, href: "/operator/dashboard?tab=locations" },
                { name: "messages", icon: MessageSquare, href: "/operator/dashboard?tab=messages" },
                { name: "settings", icon: Settings, href: "/operator/dashboard?tab=settings" },
              ].map((item) => (
                <Button
                  key={item.name}
                  variant={activeTab === item.name ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start transition-all",
                    activeTab === item.name 
                      ? "bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-foreground/90" 
                      : "text-muted-foreground hover:text-foreground/80 hover:bg-background/80 dark:hover:bg-gray-800/30"
                  )}
                  onClick={() => setActiveTab(item.name)}
                  aria-label={`go to ${item.name}`}
                  aria-current={activeTab === item.name ? "page" : undefined}
                >
                  <item.icon className="h-5 w-5 mr-3 opacity-80" aria-hidden="true" />
                  {item.name}
                </Button>
              ))}
            </nav>
          </div>
        </div>

        {/* mobile tabs - visible only on mobile */}
        <div className="md:hidden border-b border-border/30 dark:border-gray-800/40 sticky top-16 z-10 bg-background/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <Tabs defaultValue="overview" onValueChange={setActiveTab} className="px-4 pb-2 pt-2">
            <TabsList className="grid grid-cols-4 h-10 bg-muted/50 dark:bg-gray-800/30" aria-label="dashboard sections">
              <TabsTrigger value="overview" aria-label="overview tab" className="data-[state=active]:bg-background/90 dark:data-[state=active]:bg-gray-800/60">overview</TabsTrigger>
              <TabsTrigger value="profile" aria-label="profile tab" className="data-[state=active]:bg-background/90 dark:data-[state=active]:bg-gray-800/60">profile</TabsTrigger>
              <TabsTrigger value="menu" aria-label="menu tab" className="data-[state=active]:bg-background/90 dark:data-[state=active]:bg-gray-800/60">menu</TabsTrigger>
              <TabsTrigger value="schedule" aria-label="schedule tab" className="data-[state=active]:bg-background/90 dark:data-[state=active]:bg-gray-800/60">schedule</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* main content */}
        <div className="flex-1 md:ml-64">
          <main className="py-6 px-4 sm:px-6 md:px-8">
            <div className="space-y-6">
              {/* overview tab */}
              {activeTab === "overview" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-foreground/90 dark:text-foreground/95">operator dashboard</h1>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <OperatorSessionControl className="shadow-sm border-border/30 dark:border-gray-800/40 bg-background/80 dark:bg-gray-900/60 backdrop-blur-sm" />
                    <OperatorSubscriptionPlan className="shadow-sm border-border/30 dark:border-gray-800/40 bg-background/80 dark:bg-gray-900/60 backdrop-blur-sm" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="shadow-sm border-border/30 dark:border-gray-800/40 bg-background/80 dark:bg-gray-900/60 backdrop-blur-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-foreground/90 dark:text-foreground/95">profile views</CardTitle>
                        <CardDescription className="text-muted-foreground/80 dark:text-muted-foreground/70">last 7 days</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-foreground/90 dark:text-foreground/95">1,248</div>
                        <p className="text-xs text-green-600/90 dark:text-green-400/95">+12% from last week</p>
                      </CardContent>
                    </Card>
                    <Card className="shadow-sm border-border/30 dark:border-gray-800/40 bg-background/80 dark:bg-gray-900/60 backdrop-blur-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-foreground/90 dark:text-foreground/95">active hours</CardTitle>
                        <CardDescription className="text-muted-foreground/80 dark:text-muted-foreground/70">last 7 days</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-foreground/90 dark:text-foreground/95">32.5</div>
                        <p className="text-xs text-red-600/90 dark:text-red-400/95">-4% from last week</p>
                      </CardContent>
                    </Card>
                    <Card className="shadow-sm border-border/30 dark:border-gray-800/40 bg-background/80 dark:bg-gray-900/60 backdrop-blur-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-foreground/90 dark:text-foreground/95">new followers</CardTitle>
                        <CardDescription className="text-muted-foreground/80 dark:text-muted-foreground/70">last 7 days</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-foreground/90 dark:text-foreground/95">73</div>
                        <p className="text-xs text-green-600/90 dark:text-green-400/95">+18% from last week</p>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              )}
              
              {/* profile tab */}
              {activeTab === "profile" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-foreground/90 dark:text-foreground/95">profile settings</h1>
                  </div>
                  
                  <OperatorProfileEditor />
                </motion.div>
              )}
              
              {/* schedule tab */}
              {activeTab === "schedule" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-foreground/90 dark:text-foreground/95">schedule management</h1>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-6">
                    <OperatorHoursEditor />
                  </div>
                </motion.div>
              )}
              
              {/* menu tab */}
              {activeTab === "menu" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-foreground/90 dark:text-foreground/95">menu management</h1>
                    <Button aria-label="add new menu item">add item</Button>
                  </div>
                  
                  <Card className="shadow-sm border-border/30 dark:border-gray-800/40 bg-background/80 dark:bg-gray-900/60 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-sm font-medium text-foreground/90 dark:text-foreground/95">menu items</CardTitle>
                      <CardDescription className="text-muted-foreground/80 dark:text-muted-foreground/70">manage your food truck's offerings</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground/80 dark:text-muted-foreground/70">menu management interface will be implemented here</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
              
              {/* placeholder for other tabs */}
              {!["overview", "profile", "menu", "schedule"].includes(activeTab) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-foreground/90 dark:text-foreground/95">{activeTab}</h1>
                  </div>
                  
                  <Card className="shadow-sm border-border/30 dark:border-gray-800/40 bg-background/80 dark:bg-gray-900/60 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-sm font-medium text-foreground/90 dark:text-foreground/95">coming soon</CardTitle>
                      <CardDescription className="text-muted-foreground/80 dark:text-muted-foreground/70">this section is under development</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground/80 dark:text-muted-foreground/70">the {activeTab} interface will be implemented soon</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
