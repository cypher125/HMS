"use client" 

import React, { useEffect, useState } from "react"
import Link from "next/link"
import {
  Calendar,
  CreditCard,
  User,
  AlertCircle,
  Info,
  Building2,
  Clock,
  CheckCircle,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/lib/context/AuthContext"
import { applicationService } from "@/lib/services/applicationService"
import { authService } from "@/lib/services/authService"
import { Application, Payment } from "@/lib/services/applicationService"
import { formatDate } from "@/lib/utils"

export default function StudentDashboard() {
  const { user } = useAuth()
  const [applications, setApplications] = useState<Application[]>([])
  const [latestApplication, setLatestApplication] = useState<Application | null>(null)
  const [payments, setPayments] = useState<Payment[]>([])
  const [studentProfile, setStudentProfile] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState<number>(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Initialize default values in case of partial failures
        let appsData: Application[] = []
        let paymentsData: Payment[] = []
        let profileData = null
        
        // Fetch student's applications
        try {
          appsData = await applicationService.getMyApplications()
          setApplications(appsData)
          
          // Set the latest application (most recent one)
          if (appsData && appsData.length > 0) {
            // Sort by date descending
            const sortedApps = [...appsData].sort((a, b) => 
              new Date(b.application_date).getTime() - new Date(a.application_date).getTime()
            )
            setLatestApplication(sortedApps[0])
            
            // Calculate progress based on application status
            const latestApp = sortedApps[0]
            if (latestApp.status === 'Approved' && latestApp.payment_status === 'Paid') {
              setProgress(100)
            } else if (latestApp.status === 'Approved' && latestApp.payment_status === 'Partially Paid') {
              setProgress(75)
            } else if (latestApp.status === 'Approved' && latestApp.payment_status === 'Unpaid') {
              setProgress(60)
            } else if (latestApp.status === 'Pending') {
              setProgress(30)
            }
          }
        } catch (appsError: any) {
          console.error("Error fetching applications:", appsError)
        }
        
        // Fetch payments
        try {
          paymentsData = await applicationService.getMyPayments()
          setPayments(paymentsData)
        } catch (paymentsError: any) {
          console.error("Error fetching payments:", paymentsError)
          // Set empty payments array to avoid UI errors
          setPayments([])
        }
        
        // Fetch student profile
        try {
          profileData = await authService.getStudentProfile()
          setStudentProfile(profileData)
        } catch (profileError: any) {
          console.error("Student profile not available yet:", profileError)
        }
        
        // Only set an error if all requests failed
        if (!appsData.length && !profileData) {
          setError("Failed to load dashboard data. Please check your connection and try again.")
        }
      } catch (err: any) {
        setError(err.message || "Failed to load dashboard data")
        console.error("Dashboard loading error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#006400]" />
          <p className="mt-2 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold md:text-3xl">Student Dashboard</h1>
        
        <Card className="mb-8 border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <div>
                <p className="font-medium text-red-600">There was a problem loading your dashboard</p>
                <p className="text-sm text-red-600">{error}</p>
                <Button 
                  onClick={() => window.location.reload()} 
                  className="mt-2 bg-red-600 hover:bg-red-700"
                  size="sm"
                >
                  Try Again
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Welcome Card */}
        <Card className="mb-8">
          <CardHeader className="bg-[#006400]/10 pb-4">
            <CardTitle>Welcome, {user?.username || "Student"}!</CardTitle>
            <CardDescription>
              {studentProfile ? 
                `${studentProfile.matric_number || 'N/A'} • ${studentProfile.faculty || 'N/A'} • ${studentProfile.department || 'N/A'}` 
                : "Complete your profile to get started"}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="flex items-center gap-3">
                <User className="h-10 w-10 rounded-full bg-[#006400]/10 p-2 text-[#006400]" />
                <div>
                  <p className="text-sm text-muted-foreground">Student Details</p>
                  <p className="font-medium">
                    {studentProfile ? 
                      `${studentProfile.first_name || user?.username} ${studentProfile.last_name || ''}` 
                      : "Not completed"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Building2 className="h-10 w-10 rounded-full bg-[#006400]/10 p-2 text-[#006400]" />
                <div>
                  <p className="text-sm text-muted-foreground">Current Accommodation</p>
                  <p className="font-medium">
                    {applications.some(app => app.status === "Approved") 
                      ? applications.find(app => app.status === "Approved")?.room?.hostel_name || "Assigned"
                      : "None"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CreditCard className="h-10 w-10 rounded-full bg-[#006400]/10 p-2 text-[#006400]" />
                <div>
                  <p className="text-sm text-muted-foreground">Payment Status</p>
                  <p className="font-medium">
                    {applications.some(app => app.payment_status === "Paid") 
                      ? "Fully Paid" 
                      : applications.some(app => app.payment_status === "Partially Paid") 
                        ? "Partially Paid" 
                        : "No Payments"}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="outline" className="border-[#006400] text-[#006400] hover:bg-[#006400]/10">
                <Link href="/student/profile">View/Update Profile</Link>
              </Button>
              <Button asChild className="bg-[#006400] hover:bg-[#006400]/90">
                <Link href="/hostels">Apply for Accommodation</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getApplicationStatusUI = (status: string) => {
    switch(status) {
      case 'Approved':
        return { color: 'bg-green-500', icon: <CheckCircle className="h-4 w-4 text-green-500" />, text: 'Your application has been approved!' };
      case 'Rejected': 
        return { color: 'bg-red-500', icon: <AlertCircle className="h-4 w-4 text-red-500" />, text: 'Your application was rejected.' };
      case 'Cancelled':
        return { color: 'bg-gray-500', icon: <Info className="h-4 w-4 text-gray-500" />, text: 'You cancelled your application.' };
      default:
        return { color: 'bg-yellow-500', icon: <Clock className="h-4 w-4 text-yellow-500" />, text: 'Your application is being reviewed.' };
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold md:text-3xl">Student Dashboard</h1>
      
      {/* Welcome Card */}
      <Card className="mb-8">
        <CardHeader className="bg-[#006400]/10 pb-4">
          <CardTitle>Welcome, {user?.username || "Student"}!</CardTitle>
          <CardDescription>
            {studentProfile ? 
              `${studentProfile.matric_number || 'N/A'} • ${studentProfile.faculty || 'N/A'} • ${studentProfile.department || 'N/A'}` 
              : "Complete your profile to get started"}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex items-center gap-3">
              <User className="h-10 w-10 rounded-full bg-[#006400]/10 p-2 text-[#006400]" />
              <div>
                <p className="text-sm text-muted-foreground">Student Details</p>
                <p className="font-medium">
                  {studentProfile ? 
                    `${studentProfile.first_name || user?.username} ${studentProfile.last_name || ''}` 
                    : "Not completed"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Building2 className="h-10 w-10 rounded-full bg-[#006400]/10 p-2 text-[#006400]" />
              <div>
                <p className="text-sm text-muted-foreground">Current Accommodation</p>
                <p className="font-medium">
                  {applications.some(app => app.status === "Approved") 
                    ? applications.find(app => app.status === "Approved")?.room?.hostel_name || "Assigned"
                    : "None"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CreditCard className="h-10 w-10 rounded-full bg-[#006400]/10 p-2 text-[#006400]" />
              <div>
                <p className="text-sm text-muted-foreground">Payment Status</p>
                <p className="font-medium">
                  {applications.some(app => app.payment_status === "Paid") 
                    ? "Fully Paid" 
                    : applications.some(app => app.payment_status === "Partially Paid") 
                      ? "Partially Paid" 
                      : "No Payments"}
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="outline" className="border-[#006400] text-[#006400] hover:bg-[#006400]/10">
              <Link href="/student/profile">View/Update Profile</Link>
            </Button>
            <Button asChild className="bg-[#006400] hover:bg-[#006400]/90">
              <Link href="/hostels">Apply for Accommodation</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {latestApplication && (
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Application Status</CardTitle>
              <Badge 
                variant={latestApplication.status === 'Approved' ? 'default' : 
                      latestApplication.status === 'Rejected' ? 'destructive' : 
                      'outline'}
              >
                {latestApplication.status}
              </Badge>
            </div>
            <CardDescription>
              Current Status: {latestApplication.status === 'Approved' 
                ? 'Your application has been approved!' 
                : latestApplication.status === 'Rejected' 
                  ? 'Your application was rejected.'
                  : latestApplication.status === 'Cancelled'
                    ? 'You cancelled your application.'
                    : 'Your application is being reviewed.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span>Progress</span>
                  <span>
                    {latestApplication.status === 'Approved' && latestApplication.payment_status === 'Paid' ? '100%' :
                    latestApplication.status === 'Approved' && latestApplication.payment_status === 'Partially Paid' ? '75%' :
                    latestApplication.status === 'Approved' && latestApplication.payment_status === 'Unpaid' ? '60%' :
                    latestApplication.status === 'Pending' ? '30%' : '0%'}
                  </span>
                </div>
                <Progress value={
                    latestApplication.status === 'Approved' && latestApplication.payment_status === 'Paid' ? 100 :
                    latestApplication.status === 'Approved' && latestApplication.payment_status === 'Partially Paid' ? 75 :
                    latestApplication.status === 'Approved' && latestApplication.payment_status === 'Unpaid' ? 60 :
                    latestApplication.status === 'Pending' ? 30 : 0
                  } className="h-2" />
              </div>
              
              <h3 className="text-lg font-medium">Application Timeline</h3>
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Application Submitted</p>
                      <span className="text-sm text-muted-foreground">
                        {new Date(latestApplication.application_date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className={`flex h-6 w-6 items-center justify-center rounded-full ${
                    latestApplication.status === 'Approved' || latestApplication.status === 'Rejected' 
                      ? 'bg-green-100' 
                      : 'bg-gray-100'
                  }`}>
                    {latestApplication.status === 'Approved' || latestApplication.status === 'Rejected' 
                      ? <CheckCircle className="h-3 w-3 text-green-600" />
                      : <Clock className="h-3 w-3 text-gray-400" />
                    }
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className={`font-medium ${
                        latestApplication.status === 'Pending' ? 'text-muted-foreground' : ''
                      }`}>Application Reviewed</p>
                      <span className="text-sm text-muted-foreground">
                        {latestApplication.review_date ? new Date(latestApplication.review_date).toLocaleDateString() : 'Pending'}
                      </span>
                    </div>
                    {latestApplication.review_notes && (
                      <p className="mt-1 text-sm text-muted-foreground">{latestApplication.review_notes}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className={`flex h-6 w-6 items-center justify-center rounded-full ${
                    latestApplication.payment_status === 'Paid' 
                      ? 'bg-green-100' 
                      : latestApplication.payment_status === 'Partially Paid'
                        ? 'bg-yellow-100'
                        : 'bg-gray-100'
                  }`}>
                    {latestApplication.payment_status === 'Paid' 
                      ? <CheckCircle className="h-3 w-3 text-green-600" />
                      : latestApplication.payment_status === 'Partially Paid'
                        ? <CheckCircle className="h-3 w-3 text-yellow-600" />
                        : <Clock className="h-3 w-3 text-gray-400" />
                    }
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className={`font-medium ${
                        latestApplication.payment_status === 'Unpaid' ? 'text-muted-foreground' : ''
                      }`}>Payment</p>
                      <Badge 
                        variant={
                          latestApplication.payment_status === 'Paid' ? 'default' : 
                          latestApplication.payment_status === 'Partially Paid' ? 'outline' : 
                          'secondary'
                        }
                      >
                        {latestApplication.payment_status}
                      </Badge>
                    </div>

                    {latestApplication.payment_status !== 'Paid' && latestApplication.status === 'Approved' && (
                      <Button asChild className="mt-3 bg-[#006400] hover:bg-[#006400]/90" size="sm">
                        <Link href={`/student/applications/${latestApplication.id}/payment`}>
                          Complete Payment
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-[#006400] hover:bg-[#006400]/90">
              <Link href={`/student/applications/${latestApplication.id}`}>View Full Application Details</Link>
            </Button>
          </CardFooter>
        </Card>
      )}
      
      {/* All Applications */}
      <h2 className="mb-4 text-xl font-semibold">Your Applications</h2>
      {applications.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {applications.map((application) => (
            <Card key={application.id} className="overflow-hidden">
              <div 
                className={`h-2 w-full ${
                  application.status === 'Approved' ? 'bg-green-500' :
                  application.status === 'Rejected' ? 'bg-red-500' :
                  application.status === 'Cancelled' ? 'bg-gray-500' :
                  'bg-yellow-500'
                }`}
              />
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Application APP-{application.id}</CardTitle>
                <CardDescription>
                  {formatDate(application.application_date)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Status:</span>
                    <span 
                      className={`flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        application.status === 'Approved' ? 'bg-green-100 text-green-800' :
                        application.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                        application.status === 'Cancelled' ? 'bg-gray-100 text-gray-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {application.status === 'Approved' && <CheckCircle className="mr-1 h-3 w-3" />}
                      {application.status === 'Pending' && <Clock className="mr-1 h-3 w-3" />}
                      {application.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Payment:</span>
                    <span 
                      className={`flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        application.payment_status === 'Paid' ? 'bg-green-100 text-green-800' :
                        application.payment_status === 'Partially Paid' ? 'bg-blue-100 text-blue-800' :
                        application.payment_status === 'Refunded' ? 'bg-purple-100 text-purple-800' :
                        'bg-red-100 text-red-800'
                      }`}
                    >
                      {application.payment_status}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Room:</span>
                    <span className="text-sm font-medium">
                      {typeof application.room === 'object' 
                        ? `${application.room.hostel_name || application.room.hostel} - Room ${application.room.room_number}` 
                        : `Room ID: ${application.room}`}
                    </span>
                  </div>
                  
                  <Button asChild className="mt-2 w-full bg-[#006400] hover:bg-[#006400]/90">
                    <Link href={`/student/applications/${application.id}`}>View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-6">
            <Calendar className="mb-2 h-12 w-12 text-[#006400]/60" />
            <h3 className="mb-1 text-lg font-semibold">No Applications Yet</h3>
            <p className="mb-4 text-center text-gray-500">
              You haven&apos;t applied for any hostel accommodations yet.
            </p>
            <Button asChild className="bg-[#006400] hover:bg-[#006400]/90">
              <Link href="/hostels">Browse Hostels</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
