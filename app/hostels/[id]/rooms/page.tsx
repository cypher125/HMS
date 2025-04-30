"use client"

import { useState } from "react"
import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for hostels
const hostelsData = [
  {
    id: 1,
    name: "Bakassi Hall",
    type: "Male",
    rooms: [
      // Standard Rooms (4-person)
      ...Array.from({ length: 80 }, (_, i) => ({
        id: `B${(i + 1).toString().padStart(3, "0")}`,
        type: "Standard",
        capacity: 4,
        occupied: Math.min(4, Math.floor(Math.random() * 5)),
        floor: Math.floor(i / 20) + 1,
        block: String.fromCharCode(65 + Math.floor((i % 20) / 5)),
        price: "₦50,000",
        amenities: ["Bed", "Locker", "Study Table", "Chair"],
        occupants: Array.from({ length: Math.min(4, Math.floor(Math.random() * 5)) }, (_, j) => ({
          name: `Student ${j + 1}`,
          matricNumber: `YCT/2023/${Math.floor(1000 + Math.random() * 9000)}`,
          department: "Computer Science",
          level: "300 Level",
        })),
      })),
      // Premium Rooms (2-person)
      ...Array.from({ length: 30 }, (_, i) => ({
        id: `BP${(i + 1).toString().padStart(3, "0")}`,
        type: "Premium",
        capacity: 2,
        occupied: Math.min(2, Math.floor(Math.random() * 3)),
        floor: Math.floor(i / 10) + 1,
        block: String.fromCharCode(65 + Math.floor((i % 10) / 3)),
        price: "₦80,000",
        amenities: ["Bed", "Wardrobe", "Study Table", "Chair", "Small Refrigerator"],
        occupants: Array.from({ length: Math.min(2, Math.floor(Math.random() * 3)) }, (_, j) => ({
          name: `Student ${j + 1}`,
          matricNumber: `YCT/2023/${Math.floor(1000 + Math.random() * 9000)}`,
          department: "Electrical Engineering",
          level: "400 Level",
        })),
      })),
      // Deluxe Rooms (1-person)
      ...Array.from({ length: 10 }, (_, i) => ({
        id: `BD${(i + 1).toString().padStart(3, "0")}`,
        type: "Deluxe",
        capacity: 1,
        occupied: Math.min(1, Math.floor(Math.random() * 2)),
        floor: Math.floor(i / 5) + 1,
        block: String.fromCharCode(65 + Math.floor(i % 5)),
        price: "₦120,000",
        amenities: ["Bed", "Wardrobe", "Study Table", "Chair", "Small Refrigerator", "Private Bathroom"],
        occupants: Array.from({ length: Math.min(1, Math.floor(Math.random() * 2)) }, (_, j) => ({
          name: `Student ${j + 1}`,
          matricNumber: `YCT/2023/${Math.floor(1000 + Math.random() * 9000)}`,
          department: "Mechanical Engineering",
          level: "500 Level",
        })),
      })),
    ],
  },
  {
    id: 2,
    name: "Moremi Hall",
    type: "Female",
    rooms: [
      // Standard Rooms (4-person)
      ...Array.from({ length: 100 }, (_, i) => ({
        id: `M${(i + 1).toString().padStart(3, "0")}`,
        type: "Standard",
        capacity: 4,
        occupied: Math.min(4, Math.floor(Math.random() * 5)),
        floor: Math.floor(i / 25) + 1,
        block: String.fromCharCode(65 + Math.floor((i % 25) / 6)),
        price: "₦50,000",
        amenities: ["Bed", "Locker", "Study Table", "Chair"],
        occupants: Array.from({ length: Math.min(4, Math.floor(Math.random() * 5)) }, (_, j) => ({
          name: `Student ${j + 1}`,
          matricNumber: `YCT/2023/${Math.floor(1000 + Math.random() * 9000)}`,
          department: "Business Administration",
          level: "200 Level",
        })),
      })),
      // Premium Rooms (2-person)
      ...Array.from({ length: 40 }, (_, i) => ({
        id: `MP${(i + 1).toString().padStart(3, "0")}`,
        type: "Premium",
        capacity: 2,
        occupied: Math.min(2, Math.floor(Math.random() * 3)),
        floor: Math.floor(i / 10) + 1,
        block: String.fromCharCode(65 + Math.floor((i % 10) / 3)),
        price: "₦80,000",
        amenities: ["Bed", "Wardrobe", "Study Table", "Chair", "Small Refrigerator"],
        occupants: Array.from({ length: Math.min(2, Math.floor(Math.random() * 3)) }, (_, j) => ({
          name: `Student ${j + 1}`,
          matricNumber: `YCT/2023/${Math.floor(1000 + Math.random() * 9000)}`,
          department: "Mass Communication",
          level: "300 Level",
        })),
      })),
      // Deluxe Rooms (1-person)
      ...Array.from({ length: 10 }, (_, i) => ({
        id: `MD${(i + 1).toString().padStart(3, "0")}`,
        type: "Deluxe",
        capacity: 1,
        occupied: Math.min(1, Math.floor(Math.random() * 2)),
        floor: Math.floor(i / 5) + 1,
        block: String.fromCharCode(65 + Math.floor(i % 5)),
        price: "₦120,000",
        amenities: ["Bed", "Wardrobe", "Study Table", "Chair", "Small Refrigerator", "Private Bathroom"],
        occupants: Array.from({ length: Math.min(1, Math.floor(Math.random() * 2)) }, (_, j) => ({
          name: `Student ${j + 1}`,
          matricNumber: `YCT/2023/${Math.floor(1000 + Math.random() * 9000)}`,
          department: "Accounting",
          level: "400 Level",
        })),
      })),
    ],
  },
  // Additional hostels would be defined here
]

export default function HostelRoomsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const unwrappedParams = React.use(params)
  const hostelId = Number.parseInt(unwrappedParams.id)
  const hostel = hostelsData.find((h) => h.id === hostelId)

  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [floorFilter, setFloorFilter] = useState("all")
  const [blockFilter, setBlockFilter] = useState("all")
  const [availabilityFilter, setAvailabilityFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "table">("table")

  if (!hostel) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center">
        <h1 className="mb-4 text-2xl font-bold">Hostel Not Found</h1>
        <p className="mb-6 text-[#757575]">The hostel you are looking for does not exist or has been removed.</p>
        <Button onClick={() => router.push("/hostels")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Hostels
        </Button>
      </div>
    )
  }

  // Get unique floors and blocks for filters
  const floors = Array.from(new Set(hostel.rooms.map((room) => room.floor))).sort((a, b) => a - b)
  const blocks = Array.from(new Set(hostel.rooms.map((room) => room.block))).sort()

  // Filter rooms based on search and filters
  const filteredRooms = hostel.rooms.filter((room) => {
    // Search filter
    if (searchTerm && !room.id.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false
    }

    // Type filter
    if (typeFilter !== "all" && room.type !== typeFilter) {
      return false
    }

    // Floor filter
    if (floorFilter !== "all" && room.floor !== Number.parseInt(floorFilter)) {
      return false
    }

    // Block filter
    if (blockFilter !== "all" && room.block !== blockFilter) {
      return false
    }

    // Availability filter
    if (availabilityFilter === "available" && room.occupied >= room.capacity) {
      return false
    }

    if (availabilityFilter === "full" && room.occupied < room.capacity) {
      return false
    }

    return true
  })

  // Calculate statistics
  const totalRooms = hostel.rooms.length
  const availableRooms = hostel.rooms.filter((room) => room.occupied < room.capacity).length
  const occupiedRooms = hostel.rooms.filter((room) => room.occupied === room.capacity).length
  const partiallyOccupiedRooms = hostel.rooms.filter(
    (room) => room.occupied > 0 && room.occupied < room.capacity,
  ).length

  // Group rooms by type for summary
  const roomsByType = {
    Standard: hostel.rooms.filter((room) => room.type === "Standard"),
    Premium: hostel.rooms.filter((room) => room.type === "Premium"),
    Deluxe: hostel.rooms.filter((room) => room.type === "Deluxe"),
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] pb-16">
      {/* Breadcrumb */}
      <div className="bg-white px-4 py-3 shadow-sm">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center text-sm">
            <Link href="/" className="text-[#757575] hover:text-[#006400]">
              Home
            </Link>
            <span className="mx-2 text-[#757575]">/</span>
            <Link href="/hostels" className="text-[#757575] hover:text-[#006400]">
              Hostels
            </Link>
            <span className="mx-2 text-[#757575]">/</span>
            <Link href={`/hostels/${hostelId}`} className="text-[#757575] hover:text-[#006400]">
              {hostel.name}
            </Link>
            <span className="mx-2 text-[#757575]">/</span>
            <span className="font-medium text-[#001F3F]">Rooms</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="font-heading text-3xl font-bold text-[#001F3F] md:text-4xl">{hostel.name} - Rooms</h1>
            <p className="mt-2 text-[#757575]">Browse and search through all rooms in {hostel.name}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="outline" onClick={() => router.push(`/hostels/${hostelId}`)}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Hostel
            </Button>
          </div>
        </div>

        {/* Room Statistics */}
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <h3 className="text-3xl font-bold text-[#001F3F]">{totalRooms}</h3>
                <p className="text-sm text-[#757575]">Total Rooms</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <h3 className="text-3xl font-bold text-[#006400]">{availableRooms}</h3>
                <p className="text-sm text-[#757575]">Available Rooms</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <h3 className="text-3xl font-bold text-[#C62828]">{occupiedRooms}</h3>
                <p className="text-sm text-[#757575]">Fully Occupied</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <h3 className="text-3xl font-bold text-[#FF8F00]">{partiallyOccupiedRooms}</h3>
                <p className="text-sm text-[#757575]">Partially Occupied</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Room Type Summary */}
        <div className="mb-8">
          <h2 className="mb-4 font-heading text-xl font-semibold text-[#001F3F]">Room Types Summary</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {Object.entries(roomsByType).map(([type, rooms]) => {
              const totalOfType = rooms.length
              const availableOfType = rooms.filter((room) => room.occupied < room.capacity).length
              const price = rooms[0]?.price || "N/A"

              return (
                <Card key={type}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{type} Rooms</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-[#757575]">Total:</span>
                        <span className="font-medium">{totalOfType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#757575]">Available:</span>
                        <span className="font-medium text-[#006400]">{availableOfType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#757575]">Capacity:</span>
                        <span className="font-medium">
                          {rooms[0]?.capacity || "N/A"} {rooms[0]?.capacity === 1 ? "student" : "students"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#757575]">Price:</span>
                        <span className="font-medium">{price}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search by room number..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-4">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-[140px]">
                  <SelectValue placeholder="Room Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Standard">Standard</SelectItem>
                  <SelectItem value="Premium">Premium</SelectItem>
                  <SelectItem value="Deluxe">Deluxe</SelectItem>
                </SelectContent>
              </Select>

              <Select value={floorFilter} onValueChange={setFloorFilter}>
                <SelectTrigger className="w-full sm:w-[140px]">
                  <SelectValue placeholder="Floor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Floors</SelectItem>
                  {floors.map((floor) => (
                    <SelectItem key={floor} value={floor.toString()}>
                      Floor {floor}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={blockFilter} onValueChange={setBlockFilter}>
                <SelectTrigger className="w-full sm:w-[140px]">
                  <SelectValue placeholder="Block" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Blocks</SelectItem>
                  {blocks.map((block) => (
                    <SelectItem key={block} value={block}>
                      Block {block}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                <SelectTrigger className="w-full sm:w-[140px]">
                  <SelectValue placeholder="Availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Rooms</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="full">Fully Occupied</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-[#757575]">
              Showing <span className="font-medium text-[#424242]">{filteredRooms.length}</span> rooms
            </p>
            <Tabs defaultValue="table" onValueChange={(value) => setViewMode(value as "grid" | "table")}>
              <TabsList>
                <TabsTrigger value="grid">Grid View</TabsTrigger>
                <TabsTrigger value="table">Table View</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Room Listing */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredRooms.map((room) => (
              <Link href={`/hostels/${hostelId}/rooms/${room.id}`} key={room.id}>
                <Card className="h-full transition-all hover:shadow-md">
                  <CardContent className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="text-lg font-bold text-[#001F3F]">Room {room.id}</h3>
                      <Badge
                        className={
                          room.occupied === 0
                            ? "bg-green-500"
                            : room.occupied < room.capacity
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }
                      >
                        {room.occupied === 0 ? "Empty" : room.occupied < room.capacity ? "Partially Occupied" : "Full"}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#757575]">Type:</span>
                        <span>{room.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#757575]">Floor:</span>
                        <span>Floor {room.floor}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#757575]">Block:</span>
                        <span>Block {room.block}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#757575]">Capacity:</span>
                        <span>
                          {room.capacity} {room.capacity === 1 ? "student" : "students"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#757575]">Available:</span>
                        <span
                          className={room.capacity - room.occupied > 0 ? "text-green-600 font-medium" : "text-red-600"}
                        >
                          {room.capacity - room.occupied} {room.capacity - room.occupied === 1 ? "space" : "spaces"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#757575]">Price:</span>
                        <span className="font-medium">{room.price}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Room Number</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Occupied</TableHead>
                    <TableHead>Available</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRooms.map((room) => (
                    <TableRow
                      key={room.id}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => router.push(`/hostels/${hostelId}/rooms/${room.id}`)}
                    >
                      <TableCell className="font-medium">{room.id}</TableCell>
                      <TableCell>{room.type}</TableCell>
                      <TableCell>
                        Floor {room.floor}, Block {room.block}
                      </TableCell>
                      <TableCell>{room.capacity}</TableCell>
                      <TableCell>{room.occupied}</TableCell>
                      <TableCell
                        className={room.capacity - room.occupied > 0 ? "text-green-600 font-medium" : "text-red-600"}
                      >
                        {room.capacity - room.occupied}
                      </TableCell>
                      <TableCell>{room.price}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            room.occupied === 0
                              ? "bg-green-500"
                              : room.occupied < room.capacity
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }
                        >
                          {room.occupied === 0
                            ? "Empty"
                            : room.occupied < room.capacity
                              ? "Partially Occupied"
                              : "Full"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
