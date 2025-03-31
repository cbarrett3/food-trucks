"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, MapPin, Info, Share2, CalendarPlus } from "lucide-react"
import { FoodTruck } from "@/types/food-truck"

export function FoodTruckSchedule({ truck }: { truck: FoodTruck }) {
  // If no upcoming schedule, show a message
  if (!truck.upcomingSchedule || truck.upcomingSchedule.length === 0) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        <Calendar className="h-12 w-12 mx-auto mb-2 opacity-30" />
        <p>No upcoming schedule available.</p>
        <p className="text-sm mt-1">Check back soon or visit our website for updates.</p>
      </div>
    );
  }

  // Function to handle sharing an event
  const handleShare = (event: React.MouseEvent, schedule: typeof truck.upcomingSchedule[0]) => {
    event.stopPropagation();
    
    // Create share text
    const shareText = `Join me at ${truck.name} on ${schedule.date} from ${schedule.hours} at ${schedule.location}${schedule.notes ? ` - ${schedule.notes}` : ''}`;
    
    // Use Web Share API if available
    if (navigator.share) {
      navigator.share({
        title: `${truck.name} Food Truck Event`,
        text: shareText,
        url: truck.website || window.location.href,
      }).catch(err => {
        console.log('Error sharing:', err);
      });
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(shareText).then(() => {
        alert('Event details copied to clipboard!');
      }).catch(err => {
        console.log('Error copying to clipboard:', err);
      });
    }
  };

  // Function to handle adding an event to calendar
  const handleAddToCalendar = (event: React.MouseEvent, schedule: typeof truck.upcomingSchedule[0]) => {
    event.stopPropagation();
    
    try {
      // Parse date and time from schedule
      const dateStr = schedule.date;
      
      // Handle different date formats
      let year, month, day;
      
      // Try to extract date components using different patterns
      if (dateStr.includes(',')) {
        // Format like "Mon, Apr 7, 2025"
        const parts = dateStr.split(',').map(p => p.trim());
        const datePart = parts[1] ? parts[1] : parts[0]; // Use second part if available, otherwise first
        const yearPart = parts[2] ? parts[2].trim() : new Date().getFullYear().toString();
        
        const dateComponents = datePart.split(' ');
        month = getMonthNumber(dateComponents[0]);
        day = parseInt(dateComponents[1] || '1');
        year = parseInt(yearPart);
      } else if (dateStr.includes('-')) {
        // Format like "7-Apr-2025" or "2025-04-07"
        const parts = dateStr.split('-').map(p => p.trim());
        
        if (parts[0].length === 4) {
          // Likely YYYY-MM-DD
          year = parseInt(parts[0]);
          month = parseInt(parts[1]);
          day = parseInt(parts[2]);
        } else {
          // Likely DD-MMM-YYYY
          day = parseInt(parts[0]);
          month = getMonthNumber(parts[1]);
          year = parseInt(parts[2]);
        }
      } else {
        // Try simple space-separated format like "7 Apr 2025"
        const parts = dateStr.split(' ').map(p => p.trim());
        
        if (parts.length >= 3) {
          if (isNaN(parseInt(parts[0]))) {
            // Format like "Apr 7 2025"
            month = getMonthNumber(parts[0]);
            day = parseInt(parts[1]);
            year = parseInt(parts[2]);
          } else {
            // Format like "7 Apr 2025"
            day = parseInt(parts[0]);
            month = getMonthNumber(parts[1]);
            year = parseInt(parts[2]);
          }
        } else {
          // Fallback to current date
          const now = new Date();
          day = now.getDate();
          month = now.getMonth() + 1;
          year = now.getFullYear();
        }
      }
      
      // Validate date components
      if (isNaN(year) || isNaN(month) || isNaN(day)) {
        throw new Error(`Could not parse date from: ${dateStr}`);
      }
      
      // Ensure year is 4 digits
      if (year < 100) {
        year += 2000;
      }
      
      // Parse time parts
      const [startTimeStr, endTimeStr] = schedule.hours.split('-').map(time => time.trim());
      
      // Create date objects for start and end times
      const startDateTime = new Date(year, month - 1, day);
      const endDateTime = new Date(year, month - 1, day);
      
      // Parse start time
      const [startHour, startMinute, startPeriod] = parseTime(startTimeStr);
      startDateTime.setHours(
        startPeriod === 'PM' && startHour !== 12 ? startHour + 12 : startHour === 12 && startPeriod === 'AM' ? 0 : startHour,
        startMinute
      );
      
      // Parse end time
      const [endHour, endMinute, endPeriod] = parseTime(endTimeStr);
      endDateTime.setHours(
        endPeriod === 'PM' && endHour !== 12 ? endHour + 12 : endHour === 12 && endPeriod === 'AM' ? 0 : endHour,
        endMinute
      );
      
      // Create iCalendar content
      const icalContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'BEGIN:VEVENT',
        `SUMMARY:${truck.name} Food Truck`,
        `DTSTART:${formatDateForICal(startDateTime)}`,
        `DTEND:${formatDateForICal(endDateTime)}`,
        `LOCATION:${schedule.location}`,
        `DESCRIPTION:${truck.name} will be at ${schedule.location} from ${schedule.hours}.${schedule.notes ? ' ' + schedule.notes : ''}`,
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');
      
      // Create and download the .ics file
      const blob = new Blob([icalContent], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${truck.name.replace(/\s+/g, '-').toLowerCase()}-event.ics`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error creating calendar event:', error);
      alert('Sorry, there was an error creating the calendar event. Please try again later.');
    }
  };
  
  // Helper function to get month number from name
  const getMonthNumber = (monthName: string): number => {
    if (!monthName) return 1;
    
    const months: Record<string, number> = {
      'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6,
      'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12,
      'January': 1, 'February': 2, 'March': 3, 'April': 4, 'June': 6,
      'July': 7, 'August': 8, 'September': 9, 'October': 10, 'November': 11, 'December': 12
    };
    
    // Try to match regardless of case
    const key = Object.keys(months).find(
      k => k.toLowerCase() === monthName.toLowerCase()
    );
    
    return key ? months[key] : 1; // Default to January if not found
  };
  
  // Helper function to parse time like "11:00 AM"
  const parseTime = (timeStr: string): [number, number, string] => {
    if (!timeStr) return [0, 0, 'AM']; // Default fallback
    
    // Handle various time formats
    const match = timeStr.match(/(\d+)(?::(\d+))?\s*(AM|PM|am|pm)?/);
    if (match) {
      const hour = parseInt(match[1] || '0');
      const minute = parseInt(match[2] || '0');
      let period = match[3] ? match[3].toUpperCase() : 'AM';
      
      // If no AM/PM specified but hour > 12, assume PM
      if (!match[3] && hour > 12) {
        period = 'PM';
      }
      
      return [hour, minute, period];
    }
    
    return [0, 0, 'AM']; // Default fallback
  };
  
  // Helper function to format date for iCalendar
  const formatDateForICal = (date: Date): string => {
    try {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    } catch (error) {
      console.error('Error formatting date for iCal:', error, date);
      // Return a fallback date format
      const now = new Date();
      return now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    }
  };

  return (
    <div className="px-4 py-3">
      <h3 className="text-base font-medium mb-4">Upcoming Schedule</h3>
      
      <div className="space-y-4">
        {truck.upcomingSchedule.map((schedule, index) => (
          <motion.div 
            key={`${schedule.date}-${index}`}
            className="p-3 rounded-lg border border-border/50 dark:border-gray-700/50 bg-background/50 dark:bg-gray-800/30"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 dark:bg-primary/20 rounded-md p-2 text-primary">
                <Calendar className="h-5 w-5" />
              </div>
              
              <div className="flex-1">
                <div className="font-medium">{schedule.date}</div>
                
                <div className="mt-2 space-y-1.5 text-sm">
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <span>{schedule.hours}</span>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <span>{schedule.location}</span>
                  </div>
                  
                  {schedule.notes && (
                    <div className="flex items-start gap-2 text-muted-foreground">
                      <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>{schedule.notes}</span>
                    </div>
                  )}
                </div>
                
                {/* Share/Calendar buttons */}
                <div className="flex items-center gap-2 mt-3">
                  <motion.button
                    className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 text-primary hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors hover:cursor-pointer"
                    onClick={(e) => handleShare(e, schedule)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="share this event"
                  >
                    <Share2 className="h-3.5 w-3.5" />
                    <span>Share</span>
                  </motion.button>
                  
                  <motion.button
                    className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 text-primary hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors hover:cursor-pointer"
                    onClick={(e) => handleAddToCalendar(e, schedule)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="add this event to calendar"
                  >
                    <CalendarPlus className="h-3.5 w-3.5" />
                    <span>Add to Calendar</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
