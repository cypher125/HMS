"use client"

import { useState } from "react"
import AdminLayout from "@/components/admin/layout"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"

// Mock data for calendar events
const calendarEvents = [
  {
    id: 1,
    title: "Application Deadline",
    date: new Date(2025, 3, 30), // April 30, 2025
    time: "11:59 PM",
    description: "Deadline for hostel applications for the upcoming academic session.",
    type: "deadline",
    location: "Online",
  },
  {
    id: 2,
    title: "Room Allocation",
    date: new Date(2025, 4, 15), // May 15, 2025
    time: "9:00 AM",
    description: "Room allocation process begins for approved applications.",
    type: "process",
    location: "Admin Office",
  },
  {
    id: 3,
    title: "Payment Deadline",
    date: new Date(2025, 4, 20), // May 20, 2025
    time: "11:59 PM",
    description: "Last day to complete payment for allocated rooms.",
    type: "deadline",
    location: "Online",
  },
  {
    id: 4,
    title: "Hostel Maintenance",
    date: new Date(2025, 5, 5), // June 5, 2025
    time: "8:00 AM - 5:00 PM",
    description: "General maintenance and cleaning of all hostels.",
    type: "maintenance",
    location: "All Hostels",
  },
  {
    id: 5,
    title: "Check-in Day (New Students)",
    date: new Date(2025, 8, 1), // September 1, 2025
    time: "8:00 AM - 4:00 PM",
    description: "Check-in for new students allocated to hostel accommodation.",
    type: "check-in",
    location: "All Hostels",
  },
  {
    id: 6,
    title: "Check-in Day (Returning Students)",
    date: new Date(2025, 8, 2), // September 2, 2025
    time: "8:00 AM - 4:00 PM",
    description: "Check-in for returning students allocated to hostel accommodation.",
    type: "check-in",
    location: "All Hostels",
  },
  {
    id: 7,
    title: "Hostel Orientation",
    date: new Date(2025, 8, 3), // September 3, 2025
    time: "10:00 AM - 12:00 PM",
    description: "Orientation for all hostel residents on rules and regulations.",
    type: "meeting",
    location: "Main Auditorium",
  },
  {
    id: 8,
    title: "Fire Drill",
    date: new Date(2025, 8, 15), // September 15, 2025
    time: "2:00 PM - 3:00 PM",
    description: "Mandatory fire drill for all hostel residents.",
    type: "drill",
    location: "All Hostels",
  },
]

// Function to get days in a month
const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate()
}

// Function to get the day of week (0-6) for the first day of the month
const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay()
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month")

  // Format date for display
  const formatHeaderDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    return date.toLocaleDateString("en-US", options)
  }

  // Get current month and year
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  // Month navigation
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1))
  }

  // Format month year string
  const monthYearString = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(currentDate)

  // Get calendar data
  const daysInMonth = getDaysInMonth(currentYear, currentMonth)
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth)

  // Create calendar grid
  const calendarDays = []

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null)
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  // Find events for current month
  const eventsThisMonth = calendarEvents.filter((event) => {
    return event.date.getMonth() === currentMonth && event.date.getFullYear() === currentYear
  })

  // Group events by day
  const eventsByDay: { [key: number]: typeof calendarEvents } = {}

  eventsThisMonth.forEach((event) => {
    const day = event.date.getDate()
    if (!eventsByDay[day]) {
      eventsByDay[day] = []
    }
    eventsByDay[day].push(event)
  })

  return (
    <AdminLayout title="Event Calendar" date={formatHeaderDate(new Date())}>
      {/* Calendar Header */}
      <Card className="mb-6 border-none shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-xl font-bold">{monthYearString}</h2>
              <Button variant="outline" size="icon" onClick={goToNextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Select value={viewMode} onValueChange={(value) => setViewMode(value as "month" | "week" | "day")}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="View" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Month</SelectItem>
                  <SelectItem value="week">Week</SelectItem>
                  <SelectItem value="day">Day</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-[#006400] hover:bg-[#006400]/90">
                <Plus className="mr-2 h-4 w-4" /> Add Event
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar Grid */}
      <Card className="border-none shadow-md">
        <CardContent className="p-6">
          {/* Day names header */}
          <div className="mb-2 grid grid-cols-7 gap-1">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center font-medium text-gray-500 p-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={`min-h-[120px] rounded-md border p-1 ${
                  day === null
                    ? "bg-gray-50"
                    : day === new Date().getDate() &&
                        currentMonth === new Date().getMonth() &&
                        currentYear === new Date().getFullYear()
                      ? "bg-blue-50 border-blue-200"
                      : "bg-white"
                }`}
              >
                {day !== null && (
                  <>
                    <div className="text-right p-1 font-medium">{day}</div>
                    <div className="space-y-1">
                      {eventsByDay[day]?.map((event, eventIndex) => (
                        <div
                          key={eventIndex}
                          className={`p-1 rounded text-xs truncate ${
                            event.type === "deadline"
                              ? "bg-red-100 text-red-800"
                              : event.type === "check-in"
                                ? "bg-green-100 text-green-800"
                                : event.type === "meeting"
                                  ? "bg-blue-100 text-blue-800"
                                  : event.type === "maintenance"
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-purple-100 text-purple-800"
                          }`}
                          title={`${event.title} - ${event.time}\n${event.description}`}
                        >
                          {event.title}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <div className="mt-6">
        <h3 className="mb-4 text-lg font-bold">Upcoming Events</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {calendarEvents
            .filter((event) => event.date >= new Date())
            .sort((a, b) => a.date.getTime() - b.date.getTime())
            .slice(0, 3)
            .map((event) => (
              <Card key={event.id} className="border-none shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md bg-gray-100">
                      <span className="text-lg font-bold">{event.date.getDate()}</span>
                      <span className="absolute -top-2 -right-2">
                        <Badge
                          className={
                            event.type === "deadline"
                              ? "bg-red-500"
                              : event.type === "check-in"
                                ? "bg-green-500"
                                : event.type === "meeting"
                                  ? "bg-blue-500"
                                  : event.type === "maintenance"
                                    ? "bg-amber-500"
                                    : "bg-purple-500"
                          }
                        >
                          {event.type}
                        </Badge>
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium">{event.title}</h4>
                      <p className="text-sm text-gray-500">
                        {new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(event.date)} •{" "}
                        {event.time}
                      </p>
                      <p className="mt-1 text-sm">{event.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </AdminLayout>
  )
}
