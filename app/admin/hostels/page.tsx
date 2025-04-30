"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import AdminLayout from "@/components/admin/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Filter, MoreHorizontal, Plus, Search, Edit } from "lucide-react"
import { HostelFormModal } from "@/components/admin/hostel-form-modal"

// Mock data for hostels
const hostelsData = [
  {
    id: 1,
    name: "Bakassi Hall",
    type: "Male",
    image: "/placeholder.svg?height=300&width=500",
    location: "North Campus",
    description: "A comfortable hostel for male students with modern amenities.",
    totalRooms: 120,
    occupiedRooms: 110,
    availableRooms: 10,
    occupancyRate: 92,
    facilities: ["Wi-Fi", "Reading Room", "Common Room", "Laundry", "Security"],
    roomTypes: [
      { id: "1", type: "Standard", capacity: 4, priceRange: "₦45,000 - ₦55,000", available: 5 },
      { id: "2", type: "Premium", capacity: 2, priceRange: "₦75,000 - ₦85,000", available: 3 },
      { id: "3", type: "Deluxe", capacity: 1, priceRange: "₦110,000 - ₦130,000", available: 2 },
    ],
  },
  {
    id: 2,
    name: "Moremi Hall",
    type: "Female",
    image: "/placeholder.svg?height=300&width=500",
    location: "South Campus",
    description: "A secure and comfortable hostel for female students.",
    totalRooms: 150,
    occupiedRooms: 130,
    availableRooms: 20,
    occupancyRate: 87,
    facilities: ["Wi-Fi", "Reading Room", "Common Room", "Laundry", "Security", "Kitchen"],
    roomTypes: [
      { id: "1", type: "Standard", capacity: 4, priceRange: "₦45,000 - ₦55,000", available: 10 },
      { id: "2", type: "Premium", capacity: 2, priceRange: "₦75,000 - ₦85,000", available: 7 },
      { id: "3", type: "Deluxe", capacity: 1, priceRange: "₦110,000 - ₦130,000", available: 3 },
    ],
  },
  {
    id: 3,
    name: "New Hall",
    type: "Mixed",
    image: "/placeholder.svg?height=300&width=500",
    location: "Central Campus",
    description: "A modern mixed hostel with separate wings for male and female students.",
    totalRooms: 200,
    occupiedRooms: 150,
    availableRooms: 50,
    occupancyRate: 75,
    facilities: ["Wi-Fi", "Reading Room", "Common Room", "Laundry", "Security", "Gym"],
    roomTypes: [
      { id: "1", type: "Standard", capacity: 4, priceRange: "₦45,000 - ₦55,000", available: 25 },
      { id: "2", type: "Premium", capacity: 2, priceRange: "₦75,000 - ₦85,000", available: 15 },
      { id: "3", type: "Deluxe", capacity: 1, priceRange: "₦110,000 - ₦130,000", available: 10 },
    ],
  },
  {
    id: 4,
    name: "Independence Hall",
    type: "Male",
    image: "/placeholder.svg?height=300&width=500",
    location: "East Campus",
    description: "A traditional hostel with a strong community atmosphere.",
    totalRooms: 100,
    occupiedRooms: 90,
    availableRooms: 10,
    occupancyRate: 90,
    facilities: ["Wi-Fi", "Reading Room", "Common Room", "Security"],
    roomTypes: [
      { id: "1", type: "Standard", capacity: 4, priceRange: "₦45,000 - ₦55,000", available: 5 },
      { id: "2", type: "Premium", capacity: 2, priceRange: "₦75,000 - ₦85,000", available: 3 },
      { id: "3", type: "Deluxe", capacity: 1, priceRange: "₦110,000 - ₦130,000", available: 2 },
    ],
  },
  {
    id: 5,
    name: "Unity Hall",
    type: "Female",
    image: "/placeholder.svg?height=300&width=500",
    location: "West Campus",
    description: "A quiet and peaceful hostel for female students.",
    totalRooms: 130,
    occupiedRooms: 100,
    availableRooms: 30,
    occupancyRate: 77,
    facilities: ["Wi-Fi", "Reading Room", "Common Room", "Laundry", "Security", "Kitchen"],
    roomTypes: [
      { id: "1", type: "Standard", capacity: 4, priceRange: "₦45,000 - ₦55,000", available: 15 },
      { id: "2", type: "Premium", capacity: 2, priceRange: "₦75,000 - ₦85,000", available: 10 },
      { id: "3", type: "Deluxe", capacity: 1, priceRange: "₦110,000 - ₦130,000", available: 5 },
    ],
  },
  {
    id: 6,
    name: "Excellence Hall",
    type: "Mixed",
    image: "/placeholder.svg?height=300&width=500",
    location: "North Campus",
    description: "A modern hostel with excellent facilities for both male and female students.",
    totalRooms: 180,
    occupiedRooms: 140,
    availableRooms: 40,
    occupancyRate: 78,
    facilities: ["Wi-Fi", "Reading Room", "Common Room", "Laundry", "Security", "Gym", "Kitchen"],
    roomTypes: [
      { id: "1", type: "Standard", capacity: 4, priceRange: "₦45,000 - ₦55,000", available: 20 },
      { id: "2", type: "Premium", capacity: 2, priceRange: "₦75,000 - ₦85,000", available: 15 },
      { id: "3", type: "Deluxe", capacity: 1, priceRange: "₦110,000 - ₦130,000", available: 5 },
    ],
  },
]

export default function HostelsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")
  const [filteredHostels, setFilteredHostels] = useState(hostelsData)
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid")
  const [currentTime] = useState(new Date())
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedHostel, setSelectedHostel] = useState<any>(null)
  const [hostels, setHostels] = useState(hostelsData)
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
    filterHostels(e.target.value, typeFilter, locationFilter)
  }

  // Handle type filter change
  const handleTypeFilterChange = (value: string) => {
    setTypeFilter(value)
    filterHostels(searchTerm, value, locationFilter)
  }

  // Handle location filter change
  const handleLocationFilterChange = (value: string) => {
    setLocationFilter(value)
    filterHostels(searchTerm, typeFilter, value)
  }

  // Filter hostels based on search term and filters
  const filterHostels = (search: string, type: string, location: string) => {
    let filtered = hostels

    // Apply search filter
    if (search) {
      filtered = filtered.filter(
        (hostel) =>
          hostel.name.toLowerCase().includes(search.toLowerCase()) ||
          hostel.location.toLowerCase().includes(search.toLowerCase()),
      )
    }

    // Apply type filter
    if (type !== "all") {
      filtered = filtered.filter((hostel) => hostel.type === type)
    }

    // Apply location filter
    if (location !== "all") {
      filtered = filtered.filter((hostel) => hostel.location === location)
    }

    setFilteredHostels(filtered)
  }

  // Open edit modal
  const openEditModal = (hostel: any) => {
    setSelectedHostel(hostel)
    setIsEditModalOpen(true)
  }

  // Handle save hostel (add or edit)
  const handleSaveHostel = (hostel: any) => {
    if (hostel.id) {
      // Edit existing hostel
      const updatedHostels = hostels.map((h) => (h.id === hostel.id ? hostel : h))
      setHostels(updatedHostels)
      setFilteredHostels(
        updatedHostels.filter((h) => {
          let match = true
          if (searchTerm) {
            match =
              h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              h.location.toLowerCase().includes(searchTerm.toLowerCase())
          }
          if (typeFilter !== "all") {
            match = match && h.type === typeFilter
          }
          if (locationFilter !== "all") {
            match = match && h.location === locationFilter
          }
          return match
        }),
      )
    } else {
      // Add new hostel
      const newHostel = {
        ...hostel,
        id: hostels.length + 1,
      }
      const updatedHostels = [...hostels, newHostel]
      setHostels(updatedHostels)

      // Apply current filters to updated hostels
      filterHostels(searchTerm, typeFilter, locationFilter)
    }
  }

  return (
    <AdminLayout title="Manage Hostels" date={formatHeaderDate(currentTime)}>
      {/* Filters */}
      <Card className="mb-6 border-none shadow-md">
        <CardContent className="p-6">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search hostels by name or location..."
                className="pl-10"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Select value={typeFilter} onValueChange={handleTypeFilterChange}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Hostel Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Mixed">Mixed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={locationFilter} onValueChange={handleLocationFilterChange}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="North Campus">North Campus</SelectItem>
                  <SelectItem value="South Campus">South Campus</SelectItem>
                  <SelectItem value="Central Campus">Central Campus</SelectItem>
                  <SelectItem value="East Campus">East Campus</SelectItem>
                  <SelectItem value="West Campus">West Campus</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" /> More Filters
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium text-gray-900">{filteredHostels.length}</span> hostels
            </p>
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                className="flex items-center gap-1 bg-[#006400] hover:bg-[#006400]/90"
                onClick={() => setIsAddModalOpen(true)}
              >
                <Plus className="h-4 w-4" /> Add Hostel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* View Toggle */}
      <div className="mb-6">
        <Tabs defaultValue="grid" onValueChange={(value) => setViewMode(value as "grid" | "table")}>
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="table">Table View</TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
      </div>

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredHostels.map((hostel) => (
            <Card key={hostel.id} className="overflow-hidden border-none shadow-md">
              <div className="relative h-48 w-full">
                <Image src={hostel.image || "/placeholder.svg"} alt={hostel.name} fill className="object-cover" />
                <div className="absolute right-3 top-3">
                  <Badge
                    className={`${
                      hostel.type === "Male"
                        ? "bg-blue-500"
                        : hostel.type === "Female"
                          ? "bg-pink-500"
                          : "bg-purple-500"
                    }`}
                  >
                    {hostel.type}
                  </Badge>
                </div>
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="font-heading text-xl text-gray-900">{hostel.name}</CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => router.push(`/admin/hostels/${hostel.id}`)}>
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => openEditModal(hostel)}>Edit Hostel</DropdownMenuItem>
                      <DropdownMenuItem>Manage Rooms</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Delete Hostel</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <p className="text-sm text-gray-500 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 mr-1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {hostel.location}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>Occupancy Rate</span>
                    <span>{hostel.occupancyRate}%</span>
                  </div>
                  <Progress value={hostel.occupancyRate} className="h-2" />
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-sm">
                  <div className="rounded-md bg-gray-50 p-2">
                    <p className="text-gray-500">Total</p>
                    <p className="font-medium">{hostel.totalRooms}</p>
                  </div>
                  <div className="rounded-md bg-gray-50 p-2">
                    <p className="text-gray-500">Occupied</p>
                    <p className="font-medium">{hostel.occupiedRooms}</p>
                  </div>
                  <div className="rounded-md bg-gray-50 p-2">
                    <p className="text-gray-500">Available</p>
                    <p className="font-medium">{hostel.availableRooms}</p>
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium">Room Types:</p>
                  <div className="space-y-1">
                    {hostel.roomTypes.map((room: any, index: number) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span>
                          {room.type} ({room.capacity} students)
                        </span>
                        <div className="flex items-center">
                          <span className="mr-2 font-medium">{room.priceRange}</span>
                          <Badge variant="outline" className="bg-gray-50">
                            {room.available} left
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between pt-2">
                  <Button variant="outline" onClick={() => router.push(`/admin/hostels/${hostel.id}`)}>
                    View Details
                  </Button>
                  <Button className="bg-[#006400] hover:bg-[#006400]/90" onClick={() => openEditModal(hostel)}>
                    <Edit className="h-4 w-4 mr-2" /> Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Table View */}
      {viewMode === "table" && (
        <Card className="border-none shadow-md">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50 text-left">
                    <th className="px-4 py-3 text-sm font-medium text-gray-500">Hostel Name</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-500">Type</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-500">Location</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-500">Total Rooms</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-500">Available</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-500">Occupancy</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-500 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHostels.map((hostel) => (
                    <tr key={hostel.id} className="border-b">
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-2">
                          <div className="relative h-10 w-10 overflow-hidden rounded-md">
                            <Image
                              src={hostel.image || "/placeholder.svg"}
                              alt={hostel.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="font-medium">{hostel.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          className={`${
                            hostel.type === "Male"
                              ? "bg-blue-500"
                              : hostel.type === "Female"
                                ? "bg-pink-500"
                                : "bg-purple-500"
                          }`}
                        >
                          {hostel.type}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">{hostel.location}</td>
                      <td className="px-4 py-3">{hostel.totalRooms}</td>
                      <td className="px-4 py-3">{hostel.availableRooms}</td>
                      <td className="px-4 py-3">
                        <div className="flex w-24 items-center">
                          <div className="mr-2 w-full">
                            <Progress value={hostel.occupancyRate} className="h-2" />
                          </div>
                          <span className="text-xs">{hostel.occupancyRate}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8"
                            onClick={() => router.push(`/admin/hostels/${hostel.id}`)}
                          >
                            View
                          </Button>
                          <Button size="sm" variant="outline" className="h-8" onClick={() => openEditModal(hostel)}>
                            Edit
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => router.push(`/admin/hostels/${hostel.id}`)}>
                                View details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => openEditModal(hostel)}>Edit hostel</DropdownMenuItem>
                              <DropdownMenuItem>Manage rooms</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">Delete hostel</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add Hostel Modal */}
      <HostelFormModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveHostel}
        mode="add"
      />

      {/* Edit Hostel Modal */}
      {selectedHostel && (
        <HostelFormModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          hostel={selectedHostel}
          onSave={handleSaveHostel}
          mode="edit"
        />
      )}
    </AdminLayout>
  )
}
