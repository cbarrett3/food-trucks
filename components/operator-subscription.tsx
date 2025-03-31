"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, CreditCard, Gift, AlertCircle, ChevronRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface OperatorSubscriptionProps {
  className?: string
}

export function OperatorSubscription({ className }: OperatorSubscriptionProps) {
  const [plan, setPlan] = useState<"free" | "premium">("free")
  const [trialDaysLeft, setTrialDaysLeft] = useState(14)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  
  // calculate trial progress
  const trialProgress = 100 - (trialDaysLeft / 14) * 100

  return (
    <Card className={cn("shadow-md", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>subscription</CardTitle>
          {plan === "free" && (
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              free trial
            </Badge>
          )}
          {plan === "premium" && (
            <Badge variant="outline" className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800">
              premium
            </Badge>
          )}
        </div>
        <CardDescription>
          {plan === "free" 
            ? "manage your subscription plan and payment details" 
            : "you're on the premium plan with all features unlocked"}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {plan === "free" && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">trial period</span>
                <span className="text-sm text-muted-foreground">{trialDaysLeft} days left</span>
              </div>
              <Progress value={trialProgress} className="h-2" aria-label="trial progress" />
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-md p-3 text-amber-800 dark:text-amber-300 text-sm flex items-start gap-2">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">trial ending soon</p>
                <p>upgrade to premium to continue using all features after your trial ends.</p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 border rounded-lg overflow-hidden">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">premium plan</h3>
                    <p className="text-sm text-muted-foreground">$19.99/month</p>
                  </div>
                  <Badge>recommended</Badge>
                </div>
              </div>
              
              <div className="p-4">
                <ul className="space-y-2">
                  {[
                    "unlimited active hours",
                    "priority map placement",
                    "detailed analytics dashboard",
                    "customer messaging",
                    "special event promotion",
                    "menu item spotlight"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
        
        {plan === "premium" && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-3 text-green-800 dark:text-green-300 text-sm flex items-start gap-2">
              <Check className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">premium features active</p>
                <p>you have access to all premium features. next billing date: april 30, 2025.</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">your plan includes</h3>
              <ul className="space-y-2">
                {[
                  "unlimited active hours",
                  "priority map placement",
                  "detailed analytics dashboard",
                  "customer messaging",
                  "special event promotion",
                  "menu item spotlight"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 border rounded-md p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">visa ending in 4242</p>
                    <p className="text-xs text-muted-foreground">expires 12/25</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="h-8 gap-1">
                  <span className="text-xs">update</span>
                  <ChevronRight className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </CardContent>
      
      <CardFooter>
        {plan === "free" && (
          <Button className="w-full" onClick={() => setShowPaymentModal(true)}>
            <CreditCard className="h-4 w-4 mr-2" />
            upgrade to premium
          </Button>
        )}
        
        {plan === "premium" && (
          <div className="w-full flex flex-col gap-2">
            <Button variant="outline" className="w-full" onClick={() => setPlan("free")}>
              manage subscription
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              for demonstration purposes only. click to switch back to free trial view.
            </p>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
