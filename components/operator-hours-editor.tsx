"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, Plus, Trash2, Save } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { TimePicker } from "./time-picker"

interface OperatorHoursEditorProps {
  className?: string
}

interface DaySchedule {
  id: string
  day: string
  isOpen: boolean
  startTime: string
  endTime: string
}

export function OperatorHoursEditor({ className }: OperatorHoursEditorProps) {
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  
  // initial schedule data
  const [schedule, setSchedule] = useState<DaySchedule[]>([
    { id: "1", day: "monday", isOpen: true, startTime: "11:00", endTime: "20:00" },
    { id: "2", day: "tuesday", isOpen: true, startTime: "11:00", endTime: "20:00" },
    { id: "3", day: "wednesday", isOpen: true, startTime: "11:00", endTime: "20:00" },
    { id: "4", day: "thursday", isOpen: true, startTime: "11:00", endTime: "20:00" },
    { id: "5", day: "friday", isOpen: true, startTime: "11:00", endTime: "22:00" },
    { id: "6", day: "saturday", isOpen: true, startTime: "12:00", endTime: "22:00" },
    { id: "7", day: "sunday", isOpen: false, startTime: "12:00", endTime: "18:00" }
  ])
  
  // handle toggling a day's open status
  const handleToggleDay = (id: string) => {
    setSchedule(schedule.map(day => 
      day.id === id ? { ...day, isOpen: !day.isOpen } : day
    ))
  }
  
  // handle updating a day's start time
  const handleStartTimeChange = (id: string, time: string) => {
    setSchedule(schedule.map(day => 
      day.id === id ? { ...day, startTime: time } : day
    ))
  }
  
  // handle updating a day's end time
  const handleEndTimeChange = (id: string, time: string) => {
    setSchedule(schedule.map(day => 
      day.id === id ? { ...day, endTime: time } : day
    ))
  }
  
  // handle adding a special schedule
  const handleAddSpecialDay = () => {
    const newId = `special-${Date.now()}`
    setSchedule([...schedule, { 
      id: newId, 
      day: "special", 
      isOpen: true, 
      startTime: "12:00", 
      endTime: "20:00" 
    }])
  }
  
  // handle removing a special schedule
  const handleRemoveDay = (id: string) => {
    setSchedule(schedule.filter(day => day.id !== id))
  }
  
  // handle save
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
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl">hours of operation</CardTitle>
            <CardDescription>
              set your regular weekly schedule
            </CardDescription>
          </div>
          <Calendar className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {schedule.map((day) => (
            <motion.div 
              key={day.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Switch 
                    id={`day-toggle-${day.id}`}
                    checked={day.isOpen}
                    onCheckedChange={() => handleToggleDay(day.id)}
                    aria-label={`toggle ${day.day} open status`}
                  />
                  <Label 
                    htmlFor={`day-toggle-${day.id}`}
                    className="font-medium capitalize cursor-pointer"
                  >
                    {day.day}
                  </Label>
                  
                  {!day.isOpen && (
                    <Badge variant="outline" className="text-muted-foreground border-muted-foreground/30">
                      closed
                    </Badge>
                  )}
                </div>
                
                {day.day === "special" && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleRemoveDay(day.id)}
                    aria-label="remove special day"
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  </Button>
                )}
              </div>
              
              {day.isOpen && (
                <div className="grid grid-cols-2 gap-4 ml-10">
                  <div className="space-y-1">
                    <Label htmlFor={`start-time-${day.id}`} className="text-xs text-muted-foreground">
                      open
                    </Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                      <Select 
                        defaultValue={day.startTime}
                        onValueChange={(value) => handleStartTimeChange(day.id, value)}
                      >
                        <SelectTrigger 
                          id={`start-time-${day.id}`}
                          className="pl-9"
                          aria-label={`select opening time for ${day.day}`}
                        >
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 24 }).map((_, i) => {
                            const hour = i.toString().padStart(2, "0")
                            return (
                              <React.Fragment key={`start-${hour}`}>
                                <SelectItem key={`${hour}:00`} value={`${hour}:00`}>
                                  {`${hour}:00`}
                                </SelectItem>
                                <SelectItem key={`${hour}:30`} value={`${hour}:30`}>
                                  {`${hour}:30`}
                                </SelectItem>
                              </React.Fragment>
                            )
                          })}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor={`end-time-${day.id}`} className="text-xs text-muted-foreground">
                      close
                    </Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                      <Select 
                        defaultValue={day.endTime}
                        onValueChange={(value) => handleEndTimeChange(day.id, value)}
                      >
                        <SelectTrigger 
                          id={`end-time-${day.id}`}
                          className="pl-9"
                          aria-label={`select closing time for ${day.day}`}
                        >
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 24 }).map((_, i) => {
                            const hour = i.toString().padStart(2, "0")
                            return (
                              <React.Fragment key={`end-${hour}`}>
                                <SelectItem key={`${hour}:00`} value={`${hour}:00`}>
                                  {`${hour}:00`}
                                </SelectItem>
                                <SelectItem key={`${hour}:30`} value={`${hour}:30`}>
                                  {`${hour}:30`}
                                </SelectItem>
                              </React.Fragment>
                            )
                          })}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}
              
              {day.id !== "7" && <Separator className="mt-2" />}
            </motion.div>
          ))}
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full" 
          onClick={handleAddSpecialDay}
          aria-label="add special hours"
        >
          <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
          add special hours
        </Button>
        
        <div className="bg-muted/50 rounded-md p-3 text-sm flex items-start gap-2">
          <Clock className="h-5 w-5 flex-shrink-0 mt-0.5 text-muted-foreground" aria-hidden="true" />
          <div>
            <p className="text-muted-foreground">
              these are your regular hours of operation. you can still start and end sessions at different times using the session control panel.
            </p>
          </div>
        </div>
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
              <Save className="h-4 w-4 mr-1" aria-hidden="true" />
              <span>schedule saved</span>
            </motion.div>
          )}
        </div>
        
        <Button onClick={handleSave} disabled={isSaving} aria-label="save schedule">
          {isSaving ? (
            <motion.div
              className="h-4 w-4 rounded-full border-2 border-current border-r-transparent animate-spin mr-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
          ) : (
            <Save className="h-4 w-4 mr-2" aria-hidden="true" />
          )}
          save schedule
        </Button>
      </CardFooter>
    </Card>
  )
}
