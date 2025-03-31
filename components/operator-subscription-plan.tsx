"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, CreditCard, Gift, AlertCircle, ChevronRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface OperatorSubscriptionPlanProps {
  className?: string
}

export function OperatorSubscriptionPlan({ className }: OperatorSubscriptionPlanProps) {
  const [plan, setPlan] = useState<"free-trial" | "premium">("free-trial")
  const [trialDaysLeft, setTrialDaysLeft] = useState(14)
  
  // calculate trial progress
  const trialProgress = 100 - (trialDaysLeft / 14) * 100

  return (
    <Card className={cn("shadow-sm border-border/30 dark:border-gray-800/40 bg-background/80 dark:bg-gray-900/60 backdrop-blur-sm", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-xl text-foreground/90 dark:text-foreground/95">subscription</CardTitle>
          <CardDescription className="text-muted-foreground/80 dark:text-muted-foreground/70">
            {plan === "free-trial" 
              ? "manage your subscription plan and payment details" 
              : "you're on the premium plan with all features unlocked"}
          </CardDescription>
        </div>
        <div>
          {plan === "free-trial" && (
            <Badge variant="outline" className="bg-primary/5 text-primary/90 border-primary/20 dark:bg-primary/15 dark:text-primary-foreground dark:border-primary/30">
              free trial
            </Badge>
          )}
          {plan === "premium" && (
            <Badge variant="outline" className="bg-green-50/80 dark:bg-green-900/20 text-green-700/90 dark:text-green-300 border-green-200/80 dark:border-green-800/40">
              premium
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4 pt-4">
        {plan === "free-trial" && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground/80 dark:text-foreground/90">trial period</span>
                <span className="text-sm text-muted-foreground/90 dark:text-muted-foreground/70">{trialDaysLeft} days left</span>
              </div>
              <Progress value={trialProgress} className="h-2 bg-muted/50 dark:bg-gray-800/50" aria-label="trial progress" />
            </div>
            
            <div className="bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-800/30 rounded-md p-3 text-amber-800/90 dark:text-amber-300/95 text-sm flex items-start gap-2">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5 opacity-80" aria-hidden="true" />
              <div>
                <p className="font-medium">trial ending soon</p>
                <p className="opacity-90 dark:opacity-95">upgrade to premium to continue using all features after your trial ends.</p>
              </div>
            </div>
            
            <div className="bg-background/90 dark:bg-gray-800/50 border border-border/30 dark:border-gray-700/30 rounded-lg overflow-hidden">
              <div className="p-4 border-b border-border/20 dark:border-gray-700/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-foreground/90 dark:text-foreground/95">premium plan</h3>
                    <p className="text-sm text-muted-foreground/90 dark:text-muted-foreground/70">$19.99/month</p>
                  </div>
                  <Badge className="bg-primary/10 hover:bg-primary/15 text-primary/90 dark:bg-primary/20 dark:text-primary-foreground dark:border-primary/30">recommended</Badge>
                </div>
              </div>
              
              <div className="p-4">
                <ul className="space-y-2">
                  {[
                    "unlimited active hours",
                    "text messaging to customers",
                    "detailed analytics dashboard",
                    "customer messaging",
                    "special event promotion",
                    "menu item spotlight"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-foreground/80 dark:text-foreground/90">
                      <Check className="h-4 w-4 text-green-500/90 dark:text-green-400/95" aria-hidden="true" />
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
            <div className="bg-green-50/80 dark:bg-green-900/20 border border-green-200/70 dark:border-green-800/30 rounded-md p-3 text-green-800/90 dark:text-green-300/95 text-sm flex items-start gap-2">
              <Check className="h-5 w-5 flex-shrink-0 mt-0.5 opacity-80" aria-hidden="true" />
              <div>
                <p className="font-medium">premium features active</p>
                <p className="opacity-90 dark:opacity-95">you have access to all premium features. next billing date: april 30, 2025.</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-foreground/90 dark:text-foreground/95">your plan includes</h3>
              <ul className="space-y-2">
                {[
                  "unlimited active hours",
                  "text messaging to customers",
                  "detailed analytics dashboard",
                  "customer messaging",
                  "special event promotion",
                  "menu item spotlight"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-foreground/80 dark:text-foreground/90">
                    <Check className="h-4 w-4 text-green-500/90 dark:text-green-400/95" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-background/90 dark:bg-gray-800/50 border border-border/30 dark:border-gray-700/30 rounded-md p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-muted-foreground/80" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-medium text-foreground/90 dark:text-foreground/95">visa ending in 4242</p>
                    <p className="text-xs text-muted-foreground/80 dark:text-muted-foreground/70">expires 12/25</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="h-8 gap-1 text-muted-foreground/90 hover:text-foreground/80" aria-label="update payment method">
                  <span className="text-xs">update</span>
                  <ChevronRight className="h-3 w-3" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </CardContent>
      
      <CardFooter>
        {plan === "free-trial" && (
          <Button className="w-full bg-primary/90 hover:bg-primary text-primary-foreground/90 hover:text-primary-foreground transition-all shadow-sm hover:shadow" onClick={() => setPlan("premium")} aria-label="upgrade to premium plan">
            <CreditCard className="h-4 w-4 mr-2 opacity-80" aria-hidden="true" />
            upgrade to premium
          </Button>
        )}
        
        {plan === "premium" && (
          <div className="w-full flex flex-col gap-2">
            <Button variant="outline" className="w-full border-border/40 dark:border-gray-700/40 bg-background/70 dark:bg-gray-800/40 hover:bg-background/90 dark:hover:bg-gray-800/60 text-foreground/80 hover:text-foreground/90" onClick={() => setPlan("free-trial")} aria-label="manage subscription">
              manage subscription
            </Button>
            <p className="text-xs text-center text-muted-foreground/70">
              for demonstration purposes only. click to switch back to free trial view.
            </p>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
