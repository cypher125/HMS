"use client"

import type React from "react"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { 
  ArrowDownUp, 
  Filter, 
  Loader2, 
  MoreHorizontal, 
  Search,
  ChevronDown,
  Check,
  X,
  FileExport,
  FileDown,
  EllipsisVertical,
  Eye,
  Mail,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { apiService } from "@/lib/services/apiService"
import { toast } from "@/components/ui/use-toast"

// API response structures based on actual data
interface APIApplication {
  id: number
  application_date: string
  status: string
  payment_status: string
  special_requests: string
  updated_at: string
  student: number // ID of student
  room: number // ID of room
}

interface APIResponseList<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

interface StudentDetail {
  matric_number?: string
  department?: string
  level?: string
  gender?: string
  address?: string
  date_of_birth?: string
}

interface APIStudent {
  id: number
  username: string
  first_name?: string
  last_name?: string
  email?: string
  profile_picture?: string
  phone_number?: string
  student?: StudentDetail
}

interface HostelData {
  id: number
  name: string
  gender?: string
  location?: string
}

interface RoomData {
  id: number
  hostel: HostelData
  room_type: string
  price: number
}

// Frontend data structure for displaying applications
interface Student {
  id: number
  name: string
  matricNumber: string
  avatar: string
  email?: string
  phone?: string
  department?: string
  level?: string
}

interface FormattedApplication {
  id: number
  student: Student
  hostel: string
  hostelId: number
  roomType: string
  dateApplied: string
  lastUpdated: string
  status: string
}

interface HostelOption {
  id: number
  name: string
}

export default function ApplicationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [hostelFilter, setHostelFilter] = useState("all")
  const [applications, setApplications] = useState<FormattedApplication[]>([])
  const [filteredApplications, setFilteredApplications] = useState<FormattedApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentTime] = useState(new Date())
  const router = useRouter()
  const [availableHostels, setAvailableHostels] = useState<HostelOption[]>([])

  // Cache student and room data
  const [studentCache, setStudentCache] = useState<Record<number, APIStudent>>({})
  const [roomCache, setRoomCache] = useState<Record<number, RoomData>>({})

  // Fetch applications data
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true)
        
        // Fetch all applications from the API
        const response = await apiService.get<APIResponseList<APIApplication>>('/applications/applications/')
        
        // Get the applications array
        const applicationsData = response.data.results || [];
        
        console.log('Applications data:', applicationsData);
        
        // Fetch student and room details
        const studentIds = [...new Set(applicationsData.map(app => app.student))];
        const roomIds = [...new Set(applicationsData.map(app => app.room))];
        
        // Create cache for student and room data
        const students: Record<number, APIStudent> = {};
        const rooms: Record<number, RoomData> = {};
        
        // Fetch student details
        await Promise.all(studentIds.map(async (studentId) => {
          try {
            const studentResponse = await apiService.get<APIStudent>(`/accounts/users/${studentId}/`);
            students[studentId] = studentResponse.data;
          } catch (error) {
            console.error(`Failed to fetch student ${studentId}:`, error);
          }
        }));
        
        // Fetch room details
        await Promise.all(roomIds.map(async (roomId) => {
          try {
            const roomResponse = await apiService.get<RoomData>(`/hostels/rooms/${roomId}/`);
            rooms[roomId] = roomResponse.data;
          } catch (error) {
            console.error(`Failed to fetch room ${roomId}:`, error);
          }
        }));
        
        // Store in cache
        setStudentCache(students);
        setRoomCache(rooms);
        
        // Format dates helper
        const formatDate = (dateString: string) => {
          if (!dateString) return 'Unknown date';
          
          return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          });
        };
        
        // Process and format the applications data
        const formattedApplications = applicationsData.map((app): FormattedApplication => {
          const student = students[app.student];
          const room = rooms[app.room];
          
          // Process student info
          const studentName = student?.first_name && student?.last_name 
            ? `${student.first_name} ${student.last_name}` 
            : student?.username || 'Unknown Student';
          
          // Get hostel info
          const hostelName = room?.hostel?.name || 'Unknown Hostel';
          const hostelId = room?.hostel?.id || 0;
          
          return {
            id: app.id,
            student: {
              id: student?.id || app.student,
              name: studentName,
              matricNumber: student?.student?.matric_number || 'N/A',
              avatar: student?.profile_picture || "/placeholder.svg?height=32&width=32",
              email: student?.email || '',
              phone: student?.phone_number || '',
              department: student?.student?.department || 'N/A',
              level: student?.student?.level || 'N/A',
            },
            hostel: hostelName,
            hostelId: hostelId,
            roomType: room?.room_type || 'Standard',
            dateApplied: formatDate(app.application_date),
            lastUpdated: formatDate(app.updated_at),
            status: (app.status || 'pending').toLowerCase(),
          }
        });
        
        setApplications(formattedApplications);
        setFilteredApplications(formattedApplications);
        
        // Extract unique hostels for the filter
        const hostels: HostelOption[] = Array.from(
          new Map(
            formattedApplications
              .filter(app => app.hostelId) 
              .map(app => [app.hostelId, { id: app.hostelId, name: app.hostel }])
          ).values()
        );
        
        setAvailableHostels(hostels);
        
        setError(null);
      } catch (err) {
        console.error('Error fetching applications:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to load applications data';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }

    fetchApplications();
  }, []);

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
    filterApplications(e.target.value, statusFilter, hostelFilter)
  }

  // Handle status filter change
  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value)
    filterApplications(searchTerm, value, hostelFilter)
  }

  // Handle hostel filter change
  const handleHostelFilterChange = (value: string) => {
    setHostelFilter(value)
    filterApplications(searchTerm, statusFilter, value)
  }

  // Filter applications based on search term and filters
  const filterApplications = (search: string, status: string, hostel: string) => {
    let filtered = applications

    // Apply search filter
    if (search) {
      filtered = filtered.filter(
        (app) =>
          app.student.name.toLowerCase().includes(search.toLowerCase()) ||
          app.student.matricNumber.toLowerCase().includes(search.toLowerCase()) ||
          app.id.toString().includes(search.toLowerCase()),
      )
    }

    // Apply status filter
    if (status !== "all") {
      filtered = filtered.filter((app) => app.status === status)
    }

    // Apply hostel filter
    if (hostel !== "all") {
      filtered = filtered.filter((app) => app.hostelId === parseInt(hostel))
    }

    setFilteredApplications(filtered)
  }

  // Handle application status update
  const handleStatusUpdate = async (applicationId: number, newStatus: string) => {
    try {
      // Send the update to the API using the numeric ID directly
      await apiService.patch(`/applications/applications/${applicationId}/`, {
        status: newStatus.charAt(0).toUpperCase() + newStatus.slice(1) // Capitalize first letter
      })
      
      // Update the local state
      const updatedApplications = applications.map(app => {
        if (app.id === applicationId) {
          return { ...app, status: newStatus.toLowerCase() }
        }
        return app
      })
      
      setApplications(updatedApplications)
      filterApplications(searchTerm, statusFilter, hostelFilter)
      
      // Show success toast
      toast({
        title: "Status Updated",
        description: `Application ${applicationId} has been ${newStatus}`,
        variant: "default",
      })
      
    } catch (err) {
      console.error('Error updating application status:', err)
      
      // Show error toast
      toast({
        title: "Update Failed",
        description: err instanceof Error ? err.message : "Failed to update application status",
        variant: "destructive",
      })
    }
  }

  // Get status badge based on application status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>
      case "pending":
        return <Badge className="bg-amber-100 text-amber-800">Pending</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  if (loading) {
    return (
      <AdminLayout title="Applications" date={formatHeaderDate(currentTime)}>
        <div className="flex items-center justify-center h-[70vh]">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-[#006400] mx-auto" />
            <p className="mt-4 text-lg">Loading applications data...</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  if (error) {
    return (
      <AdminLayout title="Applications Error" date={formatHeaderDate(currentTime)}>
        <div className="flex items-center justify-center h-[70vh]">
          <div className="text-center max-w-lg">
            <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-4">
              <p className="font-medium">Failed to load applications data</p>
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
    <AdminLayout title="Applications" date={formatHeaderDate(currentTime)}>
      {/* Filters */}
      <Card className="mb-6 border-none shadow-md">
        <CardContent className="p-6">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search by name, matric number, or application ID..."
                className="pl-10"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select value={hostelFilter} onValueChange={handleHostelFilterChange}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Hostel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Hostels</SelectItem>
                  {availableHostels.map(hostel => (
                    <SelectItem key={hostel.id} value={hostel.id.toString()}>{hostel.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" /> More Filters
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium text-gray-900">{filteredApplications.length}</span> applications
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8">
                <ArrowDownUp className="mr-2 h-3 w-3" />
                Sort
              </Button>
              <Button variant="outline" size="sm" className="h-8">
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Applications Table */}
      <Card className="border-none shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">All Applications</CardTitle>
          <CardDescription>Manage student hostel applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Application ID</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Hostel</TableHead>
                  <TableHead>Room Type</TableHead>
                  <TableHead>Date Applied</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.length > 0 ? (
                  filteredApplications.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell className="font-medium">APP-{application.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={application.student.avatar} alt={application.student.name} />
                            <AvatarFallback className="bg-gray-100 text-gray-800">
                              {application.student.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{application.student.name}</p>
                            <p className="text-xs text-gray-500">{application.student.matricNumber}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{application.hostel}</TableCell>
                      <TableCell>{application.roomType}</TableCell>
                      <TableCell>{application.dateApplied}</TableCell>
                      <TableCell>
                        {getStatusBadge(application.status)}
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
                            <DropdownMenuItem onClick={() => router.push(`/admin/applications/${application.id}`)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View details
                            </DropdownMenuItem>
                            {application.status === "pending" && (
                              <>
                                <DropdownMenuItem onClick={() => handleStatusUpdate(application.id, "approved")}>
                                  <Check className="mr-2 h-4 w-4" />
                                  Approve
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatusUpdate(application.id, "rejected")}>
                                  <X className="mr-2 h-4 w-4" />
                                  Reject
                                </DropdownMenuItem>
                              </>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              Contact student
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No applications found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  )
}
