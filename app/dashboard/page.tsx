"use client"

import { useState } from "react"
import {
  Bell,
  Building2,
  Calendar,
  CheckCircle2,
  CreditCard,
  FileText,
  HelpCircle,
  Home,
  Settings,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// Mock student data
const studentData = {
  name: "John Doe",
  matricNumber: "YCT/2023/0001",
  department: "Computer Science",
  level: "300 Level",
  applicationStatus: "Pending Payment",
  applicationProgress: 60,
  notifications: [
    {
      id: 1,
      title: "Application Update",
      message: "Your hostel application has been received and is being processed.",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      title: "Payment Reminder",
      message: "Please complete your hostel fee payment before the deadline.",
      time: "1 day ago",
      read: false,
    },
    {
      id: 3,
      title: "Room Allocation",
      message: "Room allocations for the new session will begin next week.",
      time: "3 days ago",
      read: true,
    },
  ],
  timeline: [
    {
      id: 1,
      title: "Application Submitted",
      date: "March 10, 2025",
      completed: true,
    },
    {
      id: 2,
      title: "Application Approved",
      date: "March 12, 2025",
      completed: true,
    },
    {
      id: 3,
      title: "Payment",
      date: "Pending",
      completed: false,
    },
    {
      id: 4,
      title: "Room Allocation",
      date: "Pending",
      completed: false,
    },
    {
      id: 5,
      title: "Check-in",
      date: "Pending",
      completed: false,
    },
  ],
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [unreadNotifications, setUnreadNotifications] = useState(
    studentData.notifications.filter((n) => !n.read).length,
  )

  const markAllAsRead = () => {
    setUnreadNotifications(0)
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Dashboard Header */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-full bg-[#E0E0E0]">
                <User className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 text-[#757575]" />
              </div>
              <div>
                <h1 className="font-heading text-2xl font-bold text-[#001F3F]">Welcome, {studentData.name}</h1>
                <p className="text-[#757575]">
                  {studentData.matricNumber} | {studentData.department} | {studentData.level}
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row">
              <Button variant="outline" className="flex items-center gap-2 border-[#006400] text-[#006400]">
                <Settings className="h-4 w-4" /> Account Settings
              </Button>
              <div className="relative">
                <Button variant="outline" className="flex w-full items-center gap-2 md:w-auto">
                  <Bell className="h-4 w-4" /> Notifications
                  {unreadNotifications > 0 && <Badge className="ml-1 bg-[#C62828]">{unreadNotifications}</Badge>}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Application Status */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-4 flex flex-col justify-between gap-2 md:flex-row md:items-center">
            <div>
              <h2 className="font-heading text-xl font-semibold text-[#001F3F]">Application Status</h2>
              <p className="text-[#757575]">
                Current Status: <Badge className="ml-1 bg-[#FF8F00]">{studentData.applicationStatus}</Badge>
              </p>
            </div>
            <Button className="bg-[#006400] hover:bg-[#006400]/90">Complete Payment</Button>
          </div>
          <div className="mb-2 flex justify-between text-sm">
            <span>Progress</span>
            <span>{studentData.applicationProgress}%</span>
          </div>
          <Progress value={studentData.applicationProgress} className="h-2 bg-[#E0E0E0]" />

          <div className="mt-6">
            <h3 className="mb-4 font-heading text-lg font-medium text-[#001F3F]">Application Timeline</h3>
            <div className="space-y-4">
              {studentData.timeline.map((item, index) => (
                <div key={item.id} className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 flex h-6 w-6 items-center justify-center rounded-full ${
                      item.completed ? "bg-[#2E7D32]" : "border border-[#E0E0E0] bg-white"
                    }`}
                  >
                    {item.completed ? (
                      <CheckCircle2 className="h-6 w-6 text-white" />
                    ) : (
                      <span className="text-xs text-[#757575]">{index + 1}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                      <h4 className={`font-medium ${item.completed ? "text-[#001F3F]" : "text-[#757575]"}`}>
                        {item.title}
                      </h4>
                      <span className="text-sm text-[#757575]">{item.date}</span>
                    </div>
                    {index < studentData.timeline.length - 1 && (
                      <div className="ml-3 mt-1 h-6 w-0.5 bg-[#E0E0E0]"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <Tabs defaultValue="overview" onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="notifications">
              Notifications
              {unreadNotifications > 0 && <Badge className="ml-2 bg-[#C62828]">{unreadNotifications}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-0">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Apply for Accommodation",
                  description: "Start or continue your hostel application process",
                  icon: <Building2 className="h-10 w-10 text-[#006400]" />,
                  link: "/application",
                  buttonText: "Apply Now",
                },
                {
                  title: "Make Payment",
                  description: "Pay your hostel fees securely online",
                  icon: <CreditCard className="h-10 w-10 text-[#006400]" />,
                  link: "/payment",
                  buttonText: "Pay Now",
                },
                {
                  title: "Browse Hostels",
                  description: "Explore available accommodation options",
                  icon: <Home className="h-10 w-10 text-[#006400]" />,
                  link: "/hostels",
                  buttonText: "View Hostels",
                },
                {
                  title: "Important Dates",
                  description: "Stay updated with application deadlines",
                  icon: <Calendar className="h-10 w-10 text-[#006400]" />,
                  link: "/timeline",
                  buttonText: "View Calendar",
                },
                {
                  title: "Help & Support",
                  description: "Get assistance with your application",
                  icon: <HelpCircle className="h-10 w-10 text-[#006400]" />,
                  link: "/support",
                  buttonText: "Get Help",
                },
                {
                  title: "My Documents",
                  description: "Access and upload required documents",
                  icon: <FileText className="h-10 w-10 text-[#006400]" />,
                  link: "/documents",
                  buttonText: "View Documents",
                },
              ].map((item, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="mb-2 rounded-full bg-[#F5F5F5] p-3 w-fit">{item.icon}</div>
                    <CardTitle className="font-heading text-xl text-[#001F3F]">{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button className="w-full bg-[#006400] hover:bg-[#006400]/90">{item.buttonText}</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="mt-0">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="font-heading text-xl text-[#001F3F]">Notifications</CardTitle>
                  <CardDescription>Stay updated with your application status and announcements</CardDescription>
                </div>
                {unreadNotifications > 0 && (
                  <Button variant="outline" onClick={markAllAsRead}>
                    Mark all as read
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studentData.notifications.length > 0 ? (
                    studentData.notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`rounded-lg border p-4 ${
                          !notification.read ? "border-l-4 border-l-[#006400] bg-[#F5F5F5]" : ""
                        }`}
                      >
                        <div className="mb-1 flex items-center justify-between">
                          <h4 className="font-heading font-medium text-[#001F3F]">{notification.title}</h4>
                          <span className="text-xs text-[#757575]">{notification.time}</span>
                        </div>
                        <p className="text-[#424242]">{notification.message}</p>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Bell className="mb-4 h-12 w-12 text-[#E0E0E0]" />
                      <h4 className="mb-2 font-heading text-lg font-medium text-[#001F3F]">No Notifications</h4>
                      <p className="text-[#757575]">You don&apos;t have any notifications at the moment</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-xl text-[#001F3F]">Payment History</CardTitle>
                <CardDescription>View and manage your hostel fee payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border p-6 text-center">
                  <CreditCard className="mx-auto mb-4 h-12 w-12 text-[#E0E0E0]" />
                  <h4 className="mb-2 font-heading text-lg font-medium text-[#001F3F]">No Payment Records</h4>
                  <p className="mb-6 text-[#757575]">You haven&apos;t made any payments for hostel accommodation yet</p>
                  <Button className="bg-[#006400] hover:bg-[#006400]/90">Make Payment</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-xl text-[#001F3F]">My Documents</CardTitle>
                <CardDescription>Upload and manage required documents for your application</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border p-6 text-center">
                  <FileText className="mx-auto mb-4 h-12 w-12 text-[#E0E0E0]" />
                  <h4 className="mb-2 font-heading text-lg font-medium text-[#001F3F]">No Documents Uploaded</h4>
                  <p className="mb-6 text-[#757575]">
                    You haven&apos;t uploaded any documents for your hostel application
                  </p>
                  <Button className="bg-[#006400] hover:bg-[#006400]/90">Upload Documents</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
