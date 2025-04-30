"use client"

import type React from "react"

import { useState } from "react"
import AdminLayout from "@/components/admin/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowDownUp, Filter, MoreHorizontal, Plus, Search } from "lucide-react"
import { useRouter } from "next/navigation"

// Mock data for students
const studentsData = [
  {
    id: 1,
    name: "John Doe",
    matricNumber: "YCT/2023/0001",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "john.doe@student.yabatech.edu.ng",
    phone: "+234 812 345 6789",
    department: "Computer Science",
    level: "300 Level",
    gender: "Male",
    hostelAllocation: {
      hostel: "Bakassi Hall",
      roomNumber: "B105",
      roomType: "Standard",
    },
    paymentStatus: "paid",
  },
  {
    id: 2,
    name: "Jane Smith",
    matricNumber: "YCT/2023/0042",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "jane.smith@student.yabatech.edu.ng",
    phone: "+234 812 345 7890",
    department: "Electrical Engineering",
    level: "400 Level",
    gender: "Female",
    hostelAllocation: {
      hostel: "Moremi Hall",
      roomNumber: "M230",
      roomType: "Premium",
    },
    paymentStatus: "paid",
  },
  {
    id: 3,
    name: "Michael Johnson",
    matricNumber: "YCT/2023/0103",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "michael.johnson@student.yabatech.edu.ng",
    phone: "+234 813 456 7890",
    department: "Mechanical Engineering",
    level: "300 Level",
    gender: "Male",
    hostelAllocation: null,
    paymentStatus: "unpaid",
  },
  {
    id: 4,
    name: "Sarah Williams",
    matricNumber: "YCT/2023/0078",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "sarah.williams@student.yabatech.edu.ng",
    phone: "+234 814 567 8901",
    department: "Civil Engineering",
    level: "200 Level",
    gender: "Female",
    hostelAllocation: {
      hostel: "Unity Hall",
      roomNumber: "U154",
      roomType: "Standard",
    },
    paymentStatus: "paid",
  },
  {
    id: 5,
    name: "David Brown",
    matricNumber: "YCT/2023/0125",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "david.brown@student.yabatech.edu.ng",
    phone: "+234 815 678 9012",
    department: "Computer Science",
    level: "300 Level",
    gender: "Male",
    hostelAllocation: {
      hostel: "Independence Hall",
      roomNumber: "I102",
      roomType: "Premium",
    },
    paymentStatus: "pending",
  },
  {
    id: 6,
    name: "Emily Davis",
    matricNumber: "YCT/2023/0156",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "emily.davis@student.yabatech.edu.ng",
    phone: "+234 816 789 0123",
    department: "Mass Communication",
    level: "300 Level",
    gender: "Female",
    hostelAllocation: {
      hostel: "Moremi Hall",
      roomNumber: "M120",
      roomType: "Standard",
    },
    paymentStatus: "paid",
  },
  {
    id: 7,
    name: "James Wilson",
    matricNumber: "YCT/2023/0189",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "james.wilson@student.yabatech.edu.ng",
    phone: "+234 817 890 1234",
    department: "Electrical Engineering",
    level: "300 Level",
    gender: "Male",
    hostelAllocation: {
      hostel: "Bakassi Hall",
      roomNumber: "B205",
      roomType: "Standard",
    },
    paymentStatus: "paid",
  },
  {
    id: 8,
    name: "Olivia Taylor",
    matricNumber: "YCT/2023/0204",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "olivia.taylor@student.yabatech.edu.ng",
    phone: "+234 818 901 2345",
    department: "Business Administration",
    level: "200 Level",
    gender: "Female",
    hostelAllocation: null,
    paymentStatus: "unpaid",
  },
]

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [genderFilter, setGenderFilter] = useState("all")
  const [levelFilter, setLevelFilter] = useState("all")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [allocationFilter, setAllocationFilter] = useState("all")
  const [filteredStudents, setFilteredStudents] = useState(studentsData)
  const [currentTime] = useState(new Date())
  const router = useRouter()

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

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    filterStudents(e.target.value, genderFilter, levelFilter, departmentFilter, allocationFilter)
  }

  // Handle filter changes
  const handleGenderFilterChange = (value: string) => {
    setGenderFilter(value)
    filterStudents(searchTerm, value, levelFilter, departmentFilter, allocationFilter)
  }

  const handleLevelFilterChange = (value: string) => {
    setLevelFilter(value)
    filterStudents(searchTerm, genderFilter, value, departmentFilter, allocationFilter)
  }

  const handleDepartmentFilterChange = (value: string) => {
    setDepartmentFilter(value)
    filterStudents(searchTerm, genderFilter, levelFilter, value, allocationFilter)
  }

  const handleAllocationFilterChange = (value: string) => {
    setAllocationFilter(value)
    filterStudents(searchTerm, genderFilter, levelFilter, departmentFilter, value)
  }

  // Filter students based on search term and filters
  const filterStudents = (search: string, gender: string, level: string, department: string, allocation: string) => {
    let filtered = studentsData

    // Apply search filter
    if (search) {
      filtered = filtered.filter(
        (student) =>
          student.name.toLowerCase().includes(search.toLowerCase()) ||
          student.matricNumber.toLowerCase().includes(search.toLowerCase()) ||
          student.email.toLowerCase().includes(search.toLowerCase()),
      )
    }

    // Apply gender filter
    if (gender !== "all") {
      filtered = filtered.filter((student) => student.gender === gender)
    }

    // Apply level filter
    if (level !== "all") {
      filtered = filtered.filter((student) => student.level === level)
    }

    // Apply department filter
    if (department !== "all") {
      filtered = filtered.filter((student) => student.department === department)
    }

    // Apply allocation filter
    if (allocation !== "all") {
      if (allocation === "allocated") {
        filtered = filtered.filter((student) => student.hostelAllocation !== null)
      } else if (allocation === "unallocated") {
        filtered = filtered.filter((student) => student.hostelAllocation === null)
      }
    }

    setFilteredStudents(filtered)
  }

  // Get unique departments
  const departments = [...new Set(studentsData.map((student) => student.department))].sort()

  return (
    <AdminLayout title="Students" date={formatHeaderDate(currentTime)}>
      {/* Filters */}
      <Card className="mb-6 border-none shadow-md">
        <CardContent className="p-6">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search by name, matric number, or email..."
                className="pl-10"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div className="flex flex-wrap gap-4">
              <Select value={genderFilter} onValueChange={handleGenderFilterChange}>
                <SelectTrigger className="w-full sm:w-[120px]">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genders</SelectItem>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
              <Select value={levelFilter} onValueChange={handleLevelFilterChange}>
                <SelectTrigger className="w-full sm:w-[120px]">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="100 Level">100 Level</SelectItem>
                  <SelectItem value="200 Level">200 Level</SelectItem>
                  <SelectItem value="300 Level">300 Level</SelectItem>
                  <SelectItem value="400 Level">400 Level</SelectItem>
                  <SelectItem value="500 Level">500 Level</SelectItem>
                </SelectContent>
              </Select>
              <Select value={departmentFilter} onValueChange={handleDepartmentFilterChange}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={allocationFilter} onValueChange={handleAllocationFilterChange}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Allocation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Students</SelectItem>
                  <SelectItem value="allocated">Allocated</SelectItem>
                  <SelectItem value="unallocated">Unallocated</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" /> More Filters
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium text-gray-900">{filteredStudents.length}</span> students
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8">
                <ArrowDownUp className="mr-2 h-3 w-3" />
                Sort
              </Button>
              <Button variant="outline" size="sm" className="h-8">
                Export
              </Button>
              <Button size="sm" className="bg-[#006400] hover:bg-[#006400]/90 h-8">
                <Plus className="mr-2 h-3 w-3" />
                Add Student
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card className="border-none shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">All Students</CardTitle>
          <CardDescription>Manage student information and hostel allocations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Hostel Allocation</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={student.avatar} alt={student.name} />
                          <AvatarFallback className="bg-gray-100 text-gray-800">
                            {student.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{student.name}</p>
                          <p className="text-xs text-gray-500">{student.matricNumber}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{student.department}</TableCell>
                    <TableCell>{student.level}</TableCell>
                    <TableCell>{student.gender}</TableCell>
                    <TableCell>
                      {student.hostelAllocation ? (
                        <div className="text-sm">
                          <p className="font-medium text-gray-900">{student.hostelAllocation.hostel}</p>
                          <p className="text-xs text-gray-500">
                            Room {student.hostelAllocation.roomNumber} ({student.hostelAllocation.roomType})
                          </p>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">Not allocated</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          student.paymentStatus === "paid"
                            ? "bg-green-100 text-green-800"
                            : student.paymentStatus === "pending"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-red-100 text-red-800"
                        }
                      >
                        {student.paymentStatus.charAt(0).toUpperCase() + student.paymentStatus.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => router.push(`/admin/students/${student.id}`)}>
                            View details
                          </DropdownMenuItem>
                          <DropdownMenuItem>Edit student</DropdownMenuItem>
                          {!student.hostelAllocation && <DropdownMenuItem>Allocate room</DropdownMenuItem>}
                          {student.hostelAllocation && <DropdownMenuItem>Change allocation</DropdownMenuItem>}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Delete student</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  )
}
