"use client"

import { useState } from "react"
import AdminLayout from "@/components/admin/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { ArrowDown, Download, FileText, Printer } from "lucide-react"

// Mock data for reports
const occupancyTrendData = [
  { month: "Jan", rate: 65 },
  { month: "Feb", rate: 72 },
  { month: "Mar", rate: 78 },
  { month: "Apr", rate: 82 },
  { month: "May", rate: 75 },
  { month: "Jun", rate: 68 },
  { month: "Jul", rate: 60 },
  { month: "Aug", rate: 55 },
  { month: "Sep", rate: 92 },
  { month: "Oct", rate: 90 },
  { month: "Nov", rate: 88 },
  { month: "Dec", rate: 84 },
]

const roomTypeDistributionData = [
  { name: "Standard (4 Students)", value: 500, fill: "#4F46E5" },
  { name: "Premium (2 Students)", value: 250, fill: "#10B981" },
  { name: "Deluxe (1 Student)", value: 130, fill: "#F59E0B" },
]

const hostelUtilizationData = [
  { name: "Bakassi Hall", total: 120, occupied: 110, available: 10 },
  { name: "Moremi Hall", total: 150, occupied: 130, available: 20 },
  { name: "New Hall", total: 200, occupied: 150, available: 50 },
  { name: "Independence Hall", total: 100, occupied: 90, available: 10 },
  { name: "Unity Hall", total: 130, occupied: 100, available: 30 },
  { name: "Excellence Hall", total: 180, occupied: 140, available: 40 },
]

const genderDistributionData = [
  { name: "Male", value: 650, fill: "#4F46E5" },
  { name: "Female", value: 600, fill: "#EC4899" },
]

const applicationStatusData = [
  { name: "Approved", value: 720, fill: "#10B981" },
  { name: "Pending", value: 85, fill: "#F59E0B" },
  { name: "Rejected", value: 15, fill: "#EF4444" },
]

const revenueData = [
  { month: "Jan", amount: 2500000 },
  { month: "Feb", amount: 3200000 },
  { month: "Mar", amount: 4100000 },
  { month: "Apr", amount: 5300000 },
  { month: "May", amount: 4800000 },
  { month: "Jun", amount: 3900000 },
  { month: "Jul", amount: 3100000 },
  { month: "Aug", amount: 2700000 },
  { month: "Sep", amount: 7200000 },
  { month: "Oct", amount: 6800000 },
  { month: "Nov", amount: 6400000 },
  { month: "Dec", amount: 5800000 },
]

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("2025")
  const [currentTime] = useState(new Date())

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

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <AdminLayout title="Reports & Analytics" date={formatHeaderDate(currentTime)}>
      {/* Reports Header */}
      <Card className="mb-6 border-none shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-bold">Analytics Dashboard</h2>
              <p className="text-sm text-gray-500">
                View comprehensive reports and analytics on hostel utilization and occupancy
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="thisYear">This Year</SelectItem>
                  <SelectItem value="lastYear">Last Year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="flex items-center gap-1">
                <Download className="h-4 w-4" /> Export
              </Button>
              <Button variant="outline" className="flex items-center gap-1">
                <Printer className="h-4 w-4" /> Print
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Tabs */}
      <Tabs defaultValue="occupancy" className="w-full">
        <TabsList className="w-full mb-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <TabsTrigger value="occupancy">Occupancy</TabsTrigger>
          <TabsTrigger value="room-types">Room Types</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="demographic">Demographics</TabsTrigger>
        </TabsList>

        {/* Occupancy Report */}
        <TabsContent value="occupancy" className="mt-0">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Occupancy Trend */}
            <Card className="border-none shadow-md md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Occupancy Trend</CardTitle>
                <CardDescription>Monthly occupancy rate for {selectedPeriod}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={occupancyTrendData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis
                        dataKey="month"
                        tick={{ fontSize: 12, fill: "#64748b" }}
                        axisLine={{ stroke: "#e2e8f0" }}
                      />
                      <YAxis
                        tick={{ fontSize: 12, fill: "#64748b" }}
                        axisLine={{ stroke: "#e2e8f0" }}
                        domain={[0, 100]}
                        tickFormatter={(value) => `${value}%`}
                      />
                      <Tooltip
                        formatter={(value) => [`${value}%`, "Occupancy Rate"]}
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e2e8f0",
                          borderRadius: "0.375rem",
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="rate"
                        stroke="#0F172A"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Hostel Utilization */}
            <Card className="border-none shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Hostel Utilization</CardTitle>
                <CardDescription>Current occupancy by hostel</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={hostelUtilizationData}
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 80, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis
                        type="number"
                        domain={[0, "dataMax"]}
                        tick={{ fontSize: 12, fill: "#64748b" }}
                        axisLine={{ stroke: "#e2e8f0" }}
                      />
                      <YAxis
                        dataKey="name"
                        type="category"
                        tick={{ fontSize: 12, fill: "#64748b" }}
                        axisLine={{ stroke: "#e2e8f0" }}
                        width={80}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e2e8f0",
                          borderRadius: "0.375rem",
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="occupied" stackId="a" fill="#10B981" name="Occupied" />
                      <Bar dataKey="available" stackId="a" fill="#E2E8F0" name="Available" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Average Occupancy */}
            <Card className="border-none shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Occupancy Statistics</CardTitle>
                <CardDescription>Summary of hostel occupancy data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-2 text-sm font-medium text-gray-500">Average Occupancy Rate</h3>
                    <div className="flex items-end justify-between">
                      <span className="text-3xl font-bold">82%</span>
                      <span className="flex items-center text-sm text-green-600">
                        <ArrowDown className="mr-1 h-4 w-4 rotate-180" />
                        4.2% from previous year
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2 text-sm font-medium text-gray-500">Total Available Beds</h3>
                    <div className="flex items-end justify-between">
                      <span className="text-3xl font-bold">880</span>
                      <span className="text-sm text-gray-500">Total capacity</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2 text-sm font-medium text-gray-500">Occupied Beds</h3>
                    <div className="flex items-end justify-between">
                      <span className="text-3xl font-bold">720</span>
                      <span className="text-sm text-gray-500">81.8% of total</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2 text-sm font-medium text-gray-500">Peak Occupancy Month</h3>
                    <div className="flex items-end justify-between">
                      <span className="text-3xl font-bold">September</span>
                      <span className="text-sm text-gray-500">92% occupancy</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Room Types Report */}
        <TabsContent value="room-types" className="mt-0">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Room Type Distribution */}
            <Card className="border-none shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Room Type Distribution</CardTitle>
                <CardDescription>Distribution of rooms by type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={roomTypeDistributionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        labelLine={false}
                      >
                        {roomTypeDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [value, "Rooms"]}
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e2e8f0",
                          borderRadius: "0.375rem",
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Room Type Occupancy */}
            <Card className="border-none shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Room Type Occupancy</CardTitle>
                <CardDescription>Occupancy rates by room type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col justify-between h-80">
                  <div className="space-y-6 my-auto">
                    {[
                      { type: "Standard (4 Students)", occupancy: 92, color: "#4F46E5" },
                      { type: "Premium (2 Students)", occupancy: 84, color: "#10B981" },
                      { type: "Deluxe (1 Student)", occupancy: 76, color: "#F59E0B" },
                    ].map((room, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{room.type}</span>
                          <span className="font-medium">{room.occupancy}%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-gray-100">
                          <div
                            className="h-2 rounded-full"
                            style={{ width: `${room.occupancy}%`, backgroundColor: room.color }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-gray-50 p-4 text-center">
                      <p className="text-sm text-gray-500">Most Popular</p>
                      <p className="font-bold text-gray-900">Standard Rooms</p>
                      <p className="text-xs text-gray-500">92% occupancy rate</p>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-4 text-center">
                      <p className="text-sm text-gray-500">Highest Revenue</p>
                      <p className="font-bold text-gray-900">Deluxe Rooms</p>
                      <p className="text-xs text-gray-500">₦15.6M per session</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Applications Report */}
        <TabsContent value="applications" className="mt-0">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Application Status Distribution */}
            <Card className="border-none shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Application Status</CardTitle>
                <CardDescription>Distribution of applications by status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={applicationStatusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        labelLine={false}
                      >
                        {applicationStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [value, "Applications"]}
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e2e8f0",
                          borderRadius: "0.375rem",
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Application Statistics */}
            <Card className="border-none shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Application Statistics</CardTitle>
                <CardDescription>Summary of application data for {selectedPeriod}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-2 text-sm font-medium text-gray-500">Total Applications</h3>
                    <div className="flex items-end justify-between">
                      <span className="text-3xl font-bold">820</span>
                      <span className="flex items-center text-sm text-green-600">
                        <ArrowDown className="mr-1 h-4 w-4 rotate-180" />
                        12% from previous year
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2 text-sm font-medium text-gray-500">Approved Applications</h3>
                    <div className="flex items-end justify-between">
                      <span className="text-3xl font-bold">720</span>
                      <span className="text-sm text-gray-500">87.8% approval rate</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2 text-sm font-medium text-gray-500">Pending Applications</h3>
                    <div className="flex items-end justify-between">
                      <span className="text-3xl font-bold">85</span>
                      <span className="text-sm text-gray-500">10.4% of total</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2 text-sm font-medium text-gray-500">Rejected Applications</h3>
                    <div className="flex items-end justify-between">
                      <span className="text-3xl font-bold">15</span>
                      <span className="text-sm text-gray-500">1.8% of total</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Revenue Report */}
        <TabsContent value="revenue" className="mt-0">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Revenue Trend */}
            <Card className="border-none shadow-md md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Revenue Trend</CardTitle>
                <CardDescription>Monthly revenue for {selectedPeriod}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis
                        dataKey="month"
                        tick={{ fontSize: 12, fill: "#64748b" }}
                        axisLine={{ stroke: "#e2e8f0" }}
                      />
                      <YAxis
                        tick={{ fontSize: 12, fill: "#64748b" }}
                        axisLine={{ stroke: "#e2e8f0" }}
                        tickFormatter={(value) => `₦${value / 1000000}M`}
                      />
                      <Tooltip
                        formatter={(value) => [formatCurrency(value as number), "Revenue"]}
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e2e8f0",
                          borderRadius: "0.375rem",
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="amount" fill="#10B981" name="Revenue" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Revenue Statistics */}
            <Card className="border-none shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Revenue Statistics</CardTitle>
                <CardDescription>Summary of revenue data for {selectedPeriod}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-2 text-sm font-medium text-gray-500">Total Revenue</h3>
                    <div className="flex items-end justify-between">
                      <span className="text-3xl font-bold">₦72,000,000</span>
                      <span className="flex items-center text-sm text-green-600">
                        <ArrowDown className="mr-1 h-4 w-4 rotate-180" />
                        15% from previous year
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2 text-sm font-medium text-gray-500">Average Monthly Revenue</h3>
                    <div className="flex items-end justify-between">
                      <span className="text-3xl font-bold">₦6,000,000</span>
                      <span className="text-sm text-gray-500">Per month</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2 text-sm font-medium text-gray-500">Peak Revenue Month</h3>
                    <div className="flex items-end justify-between">
                      <span className="text-3xl font-bold">September</span>
                      <span className="text-sm text-gray-500">₦7,200,000</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2 text-sm font-medium text-gray-500">Outstanding Payments</h3>
                    <div className="flex items-end justify-between">
                      <span className="text-3xl font-bold">₦8,500,000</span>
                      <span className="text-sm text-gray-500">11.8% of total</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Revenue by Hostel */}
            <Card className="border-none shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Revenue by Hostel</CardTitle>
                <CardDescription>Contribution of each hostel to total revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Bakassi Hall", amount: 15600000, percentage: 21.7, color: "#4F46E5" },
                    { name: "Moremi Hall", amount: 14200000, percentage: 19.7, color: "#EC4899" },
                    { name: "New Hall", amount: 18500000, percentage: 25.7, color: "#10B981" },
                    { name: "Independence Hall", amount: 8900000, percentage: 12.4, color: "#F59E0B" },
                    { name: "Unity Hall", amount: 8100000, percentage: 11.3, color: "#6366F1" },
                    { name: "Excellence Hall", amount: 6700000, percentage: 9.3, color: "#8B5CF6" },
                  ].map((hostel, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{hostel.name}</span>
                        <span className="font-medium">{formatCurrency(hostel.amount)}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <div className="h-2 w-full rounded-full bg-gray-100">
                          <div
                            className="h-2 rounded-full"
                            style={{ width: `${hostel.percentage}%`, backgroundColor: hostel.color }}
                          ></div>
                        </div>
                        <span className="ml-2 w-12 text-right">{hostel.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Demographics Report */}
        <TabsContent value="demographic" className="mt-0">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Gender Distribution */}
            <Card className="border-none shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Gender Distribution</CardTitle>
                <CardDescription>Distribution of students by gender</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={genderDistributionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        labelLine={false}
                      >
                        {genderDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [value, "Students"]}
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e2e8f0",
                          borderRadius: "0.375rem",
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-gray-50 p-4 text-center">
                    <p className="text-sm text-gray-500">Male Students</p>
                    <p className="text-2xl font-bold" style={{ color: "#4F46E5" }}>
                      650
                    </p>
                    <p className="text-xs text-gray-500">52% of total</p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-4 text-center">
                    <p className="text-sm text-gray-500">Female Students</p>
                    <p className="text-2xl font-bold" style={{ color: "#EC4899" }}>
                      600
                    </p>
                    <p className="text-xs text-gray-500">48% of total</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Student Distribution by Department */}
            <Card className="border-none shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Student Distribution by Department</CardTitle>
                <CardDescription>Top departments by student count</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Computer Science", count: 180, percentage: 14.4 },
                    { name: "Electrical Engineering", count: 165, percentage: 13.2 },
                    { name: "Business Administration", count: 150, percentage: 12.0 },
                    { name: "Mass Communication", count: 130, percentage: 10.4 },
                    { name: "Mechanical Engineering", count: 125, percentage: 10.0 },
                    { name: "Civil Engineering", count: 110, percentage: 8.8 },
                    { name: "Accounting", count: 105, percentage: 8.4 },
                    { name: "Other Departments", count: 285, percentage: 22.8 },
                  ].map((dept, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{dept.name}</span>
                        <span className="font-medium">{dept.count} students</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <div className="h-2 w-full rounded-full bg-gray-100">
                          <div className="h-2 rounded-full bg-blue-500" style={{ width: `${dept.percentage}%` }}></div>
                        </div>
                        <span className="ml-2 w-12 text-right">{dept.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Student Distribution by Level */}
            <Card className="border-none shadow-md md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Student Distribution by Level</CardTitle>
                <CardDescription>Distribution of hostel residents by academic level</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { level: "100 Level", male: 150, female: 140 },
                        { level: "200 Level", male: 160, female: 155 },
                        { level: "300 Level", male: 170, female: 160 },
                        { level: "400 Level", male: 130, female: 125 },
                        { level: "500 Level", male: 40, female: 20 },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis
                        dataKey="level"
                        tick={{ fontSize: 12, fill: "#64748b" }}
                        axisLine={{ stroke: "#e2e8f0" }}
                      />
                      <YAxis tick={{ fontSize: 12, fill: "#64748b" }} axisLine={{ stroke: "#e2e8f0" }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e2e8f0",
                          borderRadius: "0.375rem",
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="male" name="Male" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="female" name="Female" fill="#EC4899" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Available Reports */}
      <div className="mt-8">
        <h3 className="mb-4 text-lg font-bold">Available Reports</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            {
              title: "Annual Occupancy Report",
              description: "Detailed analysis of hostel occupancy for the year 2025",
              date: "January 15, 2026",
            },
            {
              title: "Revenue Summary",
              description: "Financial report for hostel accommodation fees",
              date: "December 31, 2025",
            },
            {
              title: "Student Demographics",
              description: "Analysis of student distribution across hostels",
              date: "November 20, 2025",
            },
          ].map((report, index) => (
            <Card key={index} className="border-none shadow-md">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-100">
                    <FileText className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{report.title}</h4>
                    <p className="text-sm text-gray-500">{report.description}</p>
                    <p className="mt-1 text-xs text-gray-500">Generated: {report.date}</p>
                    <Button variant="link" size="sm" className="mt-1 h-auto p-0 text-[#006400]">
                      Download Report
                    </Button>
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
