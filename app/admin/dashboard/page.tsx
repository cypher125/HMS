"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import AdminLayout from "@/components/admin/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Clock,
  FileText,
  Home,
  MoreHorizontal,
  Users,
} from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { apiService } from "@/lib/services/apiService"
import { Loader2 } from "lucide-react"

// Map string icon names to Lucide icon components
const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "FileText": return FileText;
    case "CheckCircle2": return CheckCircle2;
    case "Home": return Home;
    case "Users": return Users;
    default: return FileText;
  }
};

export default function AdminDashboardPage() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Use state for dashboard data
  const [statsData, setStatsData] = useState({
    totalStudents: 0,
    totalHostels: 0,
    totalRooms: 0,
    occupiedRooms: 0,
    pendingApplications: 0,
    approvedApplications: 0,
    rejectedApplications: 0,
    maleStudents: 0,
    femaleStudents: 0,
    occupancyRate: 0,
    revenueCollected: "₦0",
    outstandingPayments: "₦0",
  })
  
  const [hostelOccupancyData, setHostelOccupancyData] = useState([])
  const [genderDistributionData, setGenderDistributionData] = useState([])
  const [recentApplicationsData, setRecentApplicationsData] = useState([])
  const [recentActivities, setRecentActivities] = useState([])

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        const response = await apiService.get('/applications/applications/dashboard_stats/')
        
        // Update all state with fetched data
        setStatsData(response.data.stats)
        setHostelOccupancyData(response.data.hostelOccupancy)
        setGenderDistributionData(response.data.genderDistribution)
        setRecentApplicationsData(response.data.recentApplications)
        setRecentActivities(response.data.recentActivities)
        
        setError(null)
      } catch (err: any) {
        console.error('Error fetching dashboard data:', err)
        setError(err.message || 'Failed to load dashboard data')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

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

  if (loading) {
    return (
      <AdminLayout title="Loading Dashboard..." date={formatHeaderDate(currentTime)}>
        <div className="flex items-center justify-center h-[70vh]">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-[#006400] mx-auto" />
            <p className="mt-4 text-lg">Loading dashboard data...</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  if (error) {
    return (
      <AdminLayout title="Dashboard Error" date={formatHeaderDate(currentTime)}>
        <div className="flex items-center justify-center h-[70vh]">
          <div className="text-center max-w-lg">
            <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-4">
              <p className="font-medium">Failed to load dashboard data</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
            <Button onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Welcome back, Admin" date={formatHeaderDate(currentTime)}>
      {/* Stats Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden border-none shadow-md">
          <CardContent className="p-0">
            <div className="flex">
              <div className="flex-1 p-6">
                <p className="text-sm font-medium text-gray-500">Total Students</p>
                <h3 className="mt-1 text-2xl font-bold text-gray-900">{statsData.totalStudents}</h3>
              </div>
              <div className="flex items-center justify-center bg-blue-50 px-6">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none shadow-md">
          <CardContent className="p-0">
            <div className="flex">
              <div className="flex-1 p-6">
                <p className="text-sm font-medium text-gray-500">Occupancy Rate</p>
                <h3 className="mt-1 text-2xl font-bold text-gray-900">{statsData.occupancyRate}%</h3>
                <div className="mt-2">
                  <Progress value={statsData.occupancyRate} className="h-2" />
                </div>
              </div>
              <div className="flex items-center justify-center bg-green-50 px-6">
                <Home className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none shadow-md">
          <CardContent className="p-0">
            <div className="flex">
              <div className="flex-1 p-6">
                <p className="text-sm font-medium text-gray-500">Pending Applications</p>
                <h3 className="mt-1 text-2xl font-bold text-gray-900">{statsData.pendingApplications}</h3>
                <div className="mt-2 text-xs text-amber-500">
                  Requires attention
                </div>
              </div>
              <div className="flex items-center justify-center bg-amber-50 px-6">
                <Clock className="h-8 w-8 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none shadow-md">
          <CardContent className="p-0">
            <div className="flex">
              <div className="flex-1 p-6">
                <p className="text-sm font-medium text-gray-500">Revenue Collected</p>
                <h3 className="mt-1 text-2xl font-bold text-gray-900">{statsData.revenueCollected}</h3>
                <div className="mt-2 text-xs text-red-500">
                  Outstanding: {statsData.outstandingPayments}
                </div>
              </div>
              <div className="flex items-center justify-center bg-purple-50 px-6">
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Hostel Occupancy */}
          <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle>Hostel Occupancy</CardTitle>
            <CardDescription>Current occupancy status across all hostels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hostelOccupancyData} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tickMargin={8}
                    fontSize={12}
                      angle={-45}
                      textAnchor="end"
                    height={80}
                    />
                  <YAxis axisLine={false} tickLine={false} tickMargin={8} fontSize={12} />
                    <Tooltip
                    cursor={{ fill: "#f3f4f6" }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="rounded-lg border bg-white p-2 shadow-sm">
                            <div className="font-medium">{data.name}</div>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>Total: {data.total}</div>
                              <div>Occupied: {data.occupied}</div>
                              <div>Available: {data.available}</div>
                              <div>Rate: {Math.round((data.occupied / data.total) * 100)}%</div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar
                    dataKey="occupied"
                    stackId="a"
                    fill="#10b981"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="available"
                    stackId="a"
                    fill="#d1d5db"
                    radius={[4, 4, 0, 0]}
                  />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

        {/* Student Distribution */}
          <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle>Student Distribution</CardTitle>
            <CardDescription>Gender distribution</CardDescription>
            </CardHeader>
            <CardContent>
            <div className="flex h-80 items-center justify-center">
              <div className="text-center">
                <div className="mx-auto h-64 w-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={genderDistributionData}
                      cx="50%"
                      cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                      dataKey="value"
                        strokeWidth={1}
                        stroke="#fff"
                    >
                      {genderDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="rounded-lg border bg-white p-2 shadow-sm">
                                <div className="font-medium">{payload[0].name}</div>
                                <div className="text-sm">{payload[0].value} students</div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                  </PieChart>
                </ResponsiveContainer>
              </div>
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="flex items-center">
                      <div className="mr-2 h-3 w-3 rounded-full bg-[#4F46E5]" />
                      <span className="font-medium">Male</span>
                    </div>
                    <div className="mt-1 text-2xl font-bold">{statsData.maleStudents}</div>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <div className="mr-2 h-3 w-3 rounded-full bg-[#EC4899]" />
                      <span className="font-medium">Female</span>
                    </div>
                    <div className="mt-1 text-2xl font-bold">{statsData.femaleStudents}</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Applications */}
        <Card className="border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Applications</CardTitle>
              <CardDescription>Latest hostel applications submitted by students</CardDescription>
            </div>
            <Button asChild variant="ghost" size="sm" className="text-sm">
              <Link href="/admin/applications">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApplicationsData.length > 0 ? (
                recentApplicationsData.slice(0, 4).map((application: any) => (
                  <div key={application.id} className="flex items-center space-x-4">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={application.student.avatar} alt={application.student.name} />
                      <AvatarFallback>{application.student.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{application.student.name}</p>
                      <p className="text-xs text-gray-500">{application.student.matricNumber}</p>
                    </div>
                    <div className="text-sm text-right">
                      <p className="font-medium">{application.hostel}</p>
                      <p className="text-xs text-gray-500">{application.dateApplied}</p>
                    </div>
                    <Badge
                      className={
                        application.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : application.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </Badge>
                  </div>
                ))
              ) : (
                <div className="py-6 text-center text-gray-500">
                  <p className="text-sm">No recent applications found</p>
                </div>
              )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest actions in the system</CardDescription>
            </CardHeader>
            <CardContent>
            <div className="space-y-6">
              {recentActivities.length > 0 ? (
                recentActivities.map((activity: any) => {
                  const IconComponent = getIconComponent(activity.icon);
                  return (
                    <div key={activity.id} className="flex">
                      <div className="mr-4 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
                        <IconComponent className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                        <div className="mb-1 font-medium">{activity.action}</div>
                        <div className="flex items-center text-sm text-gray-500">
                          <span className="mr-2">{activity.user}</span>
                          <span>•</span>
                          <span className="ml-2">{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-6 text-center text-gray-500">
                  <p className="text-sm">No recent activities found</p>
                  </div>
              )}
              </div>
            </CardContent>
          </Card>
      </div>
    </AdminLayout>
  )
}
