"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import AdminLayout from "@/components/admin/layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowLeft, Building, Edit, Home, MapPin, MoreHorizontal, Plus, Users, Wifi } from "lucide-react"
import { HostelFormModal } from "@/components/admin/hostel-form-modal"

// Mock hostel data
const getHostelData = (id: string) => {
  return {
    id: Number.parseInt(id),
    name: "Bakassi Hall",
    type: "Male",
    image: "/placeholder.svg?height=400&width=800",
    location: "North Campus",
    address: "23 University Road, Yaba, Lagos",
    description:
      "Bakassi Hall is a modern male hostel located in the North Campus. It offers comfortable accommodation with various amenities including Wi-Fi, study areas, and common rooms. The hostel is well-maintained and provides a conducive environment for academic pursuits.",
    totalRooms: 120,
    occupiedRooms: 110,
    availableRooms: 10,
    occupancyRate: 92,
    capacity: 480,
    currentOccupants: 440,
    yearBuilt: 2010,
    lastRenovated: 2020,
    warden: {
      name: "Dr. James Wilson",
      email: "james.wilson@yabatech.edu.ng",
      phone: "+234 812 345 6789",
      avatar: "/placeholder.svg?height=64&width=64",
    },
    facilities: ["Wi-Fi", "Study Area", "Common Room", "Security", "Laundry", "Cafeteria"],
    roomTypes: [
      {
        id: "1",
        type: "Standard",
        capacity: 4,
        priceRange: "₦45,000 - ₦55,000",
        available: 5,
        description: "Basic accommodation with shared facilities",
        amenities: ["Bunk beds", "Study tables", "Wardrobes", "Ceiling fan"],
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: "2",
        type: "Premium",
        capacity: 2,
        priceRange: "₦75,000 - ₦85,000",
        available: 3,
        description: "Enhanced comfort with better facilities",
        amenities: ["Single beds", "Study tables", "Wardrobes", "Ceiling fan", "Reading lamps"],
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: "3",
        type: "Deluxe",
        capacity: 1,
        priceRange: "₦110,000 - ₦130,000",
        available: 2,
        description: "Premium single occupancy rooms",
        amenities: ["Single bed", "Study table", "Wardrobe", "Air conditioning", "Private bathroom"],
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
    recentAllocations: [
      {
        id: "AL-2025-001",
        student: {
          name: "John Doe",
          matricNumber: "YCT/2023/0001",
          avatar: "/placeholder.svg?height=32&width=32",
        },
        roomNumber: "B105",
        roomType: "Standard",
        dateAllocated: "Mar 15, 2025",
      },
      {
        id: "AL-2025-002",
        student: {
          name: "Michael Johnson",
          matricNumber: "YCT/2023/0103",
          avatar: "/placeholder.svg?height=32&width=32",
        },
        roomNumber: "B107",
        roomType: "Standard",
        dateAllocated: "Mar 14, 2025",
      },
      {
        id: "AL-2025-003",
        student: {
          name: "David Brown",
          matricNumber: "YCT/2023/0125",
          avatar: "/placeholder.svg?height=32&width=32",
        },
        roomNumber: "B205",
        roomType: "Premium",
        dateAllocated: "Mar 13, 2025",
      },
      {
        id: "AL-2025-004",
        student: {
          name: "James Wilson",
          matricNumber: "YCT/2023/0189",
          avatar: "/placeholder.svg?height=32&width=32",
        },
        roomNumber: "B210",
        roomType: "Standard",
        dateAllocated: "Mar 12, 2025",
      },
    ],
    maintenanceIssues: [
      {
        id: "MI-2025-001",
        room: "B103",
        issue: "Faulty light fixture",
        reportedBy: "John Smith",
        reportedDate: "Mar 10, 2025",
        status: "pending",
      },
      {
        id: "MI-2025-002",
        room: "B115",
        issue: "Leaking faucet",
        reportedBy: "Michael Johnson",
        reportedDate: "Mar 12, 2025",
        status: "in-progress",
      },
      {
        id: "MI-2025-003",
        room: "Common Room",
        issue: "Air conditioner not working",
        reportedBy: "Warden",
        reportedDate: "Mar 14, 2025",
        status: "resolved",
      },
    ],
  }
}

export default function HostelDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [currentTime] = useState(new Date())
  const [hostel, setHostel] = useState(getHostelData(params.id))
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

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

  // Status badge color for maintenance issues
  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-amber-100 text-amber-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Handle edit hostel
  const handleEditHostel = () => {
    setIsEditModalOpen(true)
  }

  // Handle save hostel
  const handleSaveHostel = (updatedHostel: any) => {
    setHostel(updatedHostel)
  }

  return (
    <AdminLayout title={hostel.name} date={formatHeaderDate(currentTime)}>
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center text-sm text-gray-500">
        <Link href="/admin/hostels" className="flex items-center hover:text-gray-900">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Hostels
        </Link>
      </div>

      {/* Hostel Header */}
      <div className="mb-6">
        <div className="relative h-64 w-full overflow-hidden rounded-xl">
          <Image src={hostel.image || "/placeholder.svg"} alt={hostel.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6">
            <Badge
              className={`mb-2 ${
                hostel.type === "Male" ? "bg-blue-500" : hostel.type === "Female" ? "bg-pink-500" : "bg-purple-500"
              }`}
            >
              {hostel.type}
            </Badge>
            <h1 className="text-3xl font-bold text-white">{hostel.name}</h1>
            <div className="flex items-center text-white/80">
              <MapPin className="mr-1 h-4 w-4" />
              <span>{hostel.location}</span>
            </div>
          </div>
          <div className="absolute right-4 top-4 flex gap-2">
            <Button variant="outline" className="bg-white/90 hover:bg-white" onClick={handleEditHostel}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Hostel
            </Button>
          </div>
        </div>
      </div>

      {/* Hostel Overview */}
      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Rooms</p>
                <p className="text-2xl font-bold">{hostel.totalRooms}</p>
              </div>
              <div className="rounded-full bg-blue-50 p-3">
                <Home className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Occupancy Rate</p>
                <p className="text-2xl font-bold">{hostel.occupancyRate}%</p>
              </div>
              <div className="rounded-full bg-green-50 p-3">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <Progress value={hostel.occupancyRate} className="mt-2 h-2" />
          </CardContent>
        </Card>
        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Available Rooms</p>
                <p className="text-2xl font-bold">{hostel.availableRooms}</p>
              </div>
              <div className="rounded-full bg-amber-50 p-3">
                <Building className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Capacity</p>
                <p className="text-2xl font-bold">{hostel.capacity}</p>
              </div>
              <div className="rounded-full bg-purple-50 p-3">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm">
              <span className="text-gray-500">Current: </span>
              <span className="ml-1 font-medium">{hostel.currentOccupants} students</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column - Hostel Information */}
        <div className="lg:col-span-1">
          <Card className="mb-6 border-none shadow-md">
            <CardHeader className="pb-2">
              <CardTitle>Hostel Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Description</h3>
                  <p className="mt-1 text-sm">{hostel.description}</p>
                </div>
                <Separator />
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Address</h3>
                  <p className="mt-1 text-sm">{hostel.address}</p>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Year Built</h3>
                    <p className="mt-1 text-sm">{hostel.yearBuilt}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Last Renovated</h3>
                    <p className="mt-1 text-sm">{hostel.lastRenovated}</p>
                  </div>
                </div>
                <Separator />
                <div>
                  <h3 className="mb-2 text-sm font-medium text-gray-500">Warden</h3>
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={hostel.warden.avatar || "/placeholder.svg"} alt={hostel.warden.name} />
                      <AvatarFallback>{hostel.warden.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-3">
                      <p className="text-sm font-medium">{hostel.warden.name}</p>
                      <p className="text-xs text-gray-500">{hostel.warden.email}</p>
                    </div>
                  </div>
                </div>
                <Separator />
                <div>
                  <h3 className="mb-2 text-sm font-medium text-gray-500">Facilities</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {hostel.facilities.map((facility, index) => (
                      <div key={index} className="flex items-center">
                        <Wifi className="mr-2 h-4 w-4 text-gray-400" />
                        <span className="text-sm">{facility}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Tabs */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="rooms" className="w-full">
            <TabsList className="mb-4 grid w-full grid-cols-2">
              <TabsTrigger value="rooms">Room Types</TabsTrigger>
              <TabsTrigger value="allocations">Recent Allocations</TabsTrigger>
            </TabsList>

            {/* Room Types Tab */}
            <TabsContent value="rooms">
              <Card className="border-none shadow-md">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Room Types</CardTitle>
                      <CardDescription>Available room types and their details</CardDescription>
                    </div>
                    <Button className="bg-[#006400] hover:bg-[#006400]/90" onClick={handleEditHostel}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Room Type
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {hostel.roomTypes.map((room, index) => (
                      <div key={index} className="rounded-lg border border-gray-100 p-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                          <div className="relative h-32 w-full overflow-hidden rounded-lg md:h-full">
                            <Image
                              src={room.image || "/placeholder.svg"}
                              alt={room.type}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <div className="mb-2 flex items-center justify-between">
                              <h3 className="text-lg font-semibold">{room.type} Room</h3>
                              <Badge variant="outline" className="bg-gray-50">
                                {room.available} available
                              </Badge>
                            </div>
                            <p className="mb-2 text-sm text-gray-600">{room.description}</p>
                            <div className="mb-3 grid grid-cols-2 gap-2">
                              <div>
                                <p className="text-xs text-gray-500">Capacity</p>
                                <p className="font-medium">{room.capacity} students</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Price Range</p>
                                <p className="font-medium">{room.priceRange}</p>
                              </div>
                            </div>
                            <div>
                              <p className="mb-1 text-xs text-gray-500">Amenities:</p>
                              <div className="flex flex-wrap gap-1">
                                {room.amenities.map((amenity, idx) => (
                                  <Badge key={idx} variant="secondary" className="text-xs">
                                    {amenity}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="mt-3">
                              <Button variant="outline" size="sm">
                                <Link href={`/admin/hostels/${hostel.id}/rooms?type=${room.type}`}>View Rooms</Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Recent Allocations Tab */}
            <TabsContent value="allocations">
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle>Recent Allocations</CardTitle>
                  <CardDescription>Recently allocated rooms in this hostel</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Room</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Date Allocated</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {hostel.recentAllocations.map((allocation) => (
                        <TableRow key={allocation.id}>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage
                                  src={allocation.student.avatar || "/placeholder.svg"}
                                  alt={allocation.student.name}
                                />
                                <AvatarFallback className="bg-gray-100 text-gray-800">
                                  {allocation.student.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium text-gray-900">{allocation.student.name}</p>
                                <p className="text-xs text-gray-500">{allocation.student.matricNumber}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{allocation.roomNumber}</TableCell>
                          <TableCell>{allocation.roomType}</TableCell>
                          <TableCell>{allocation.dateAllocated}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View details</DropdownMenuItem>
                                <DropdownMenuItem>Change room</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">Remove allocation</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">View All Allocations</Button>
                  <Button className="bg-[#006400] hover:bg-[#006400]/90">
                    <Plus className="mr-2 h-4 w-4" />
                    New Allocation
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Edit Hostel Modal */}
      <HostelFormModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        hostel={hostel}
        onSave={handleSaveHostel}
        mode="edit"
      />
    </AdminLayout>
  )
}
