"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowLeft, Check, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import * as React from "react"

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
        description:
          "Standard room with basic amenities for four students. Includes beds, lockers, and a shared study table.",
        images: [
          "/placeholder.svg?height=300&width=500&text=Room+View",
          "/placeholder.svg?height=300&width=500&text=Another+Angle",
        ],
        dimensions: "4m x 5m",
        lastRenovated: "January 2023",
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
        description:
          "Premium room with enhanced amenities for two students. Includes beds, wardrobes, study tables, and a small refrigerator.",
        images: [
          "/placeholder.svg?height=300&width=500&text=Premium+Room",
          "/placeholder.svg?height=300&width=500&text=Room+Interior",
        ],
        dimensions: "4m x 4m",
        lastRenovated: "March 2023",
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
        description:
          "Deluxe single-occupancy room with premium amenities. Includes a bed, wardrobe, study desk, and private bathroom.",
        images: [
          "/placeholder.svg?height=300&width=500&text=Deluxe+Room",
          "/placeholder.svg?height=300&width=500&text=Private+Bathroom",
        ],
        dimensions: "3.5m x 4m",
        lastRenovated: "June 2023",
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
        description:
          "Standard room with basic amenities for four students. Includes beds, lockers, and a shared study table.",
        images: [
          "/placeholder.svg?height=300&width=500&text=Room+View",
          "/placeholder.svg?height=300&width=500&text=Another+Angle",
        ],
        dimensions: "4m x 5m",
        lastRenovated: "February 2023",
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
        description:
          "Premium room with enhanced amenities for two students. Includes beds, wardrobes, study tables, and a small refrigerator.",
        images: [
          "/placeholder.svg?height=300&width=500&text=Premium+Room",
          "/placeholder.svg?height=300&width=500&text=Room+Interior",
        ],
        dimensions: "4m x 4m",
        lastRenovated: "April 2023",
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
        description:
          "Deluxe single-occupancy room with premium amenities. Includes a bed, wardrobe, study desk, and private bathroom.",
        images: [
          "/placeholder.svg?height=300&width=500&text=Deluxe+Room",
          "/placeholder.svg?height=300&width=500&text=Private+Bathroom",
        ],
        dimensions: "3.5m x 4m",
        lastRenovated: "May 2023",
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

export default function RoomDetailPage({ params }: { params: { id: string; roomId: string } }) {
  const router = useRouter()
  const unwrappedParams = React.use(params)
  const hostelId = Number.parseInt(unwrappedParams.id)
  const roomId = unwrappedParams.roomId

  const hostel = hostelsData.find((h) => h.id === hostelId)
  const room = hostel?.rooms.find((r) => r.id === roomId)

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!hostel || !room) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center">
        <h1 className="mb-4 text-2xl font-bold">Room Not Found</h1>
        <p className="mb-6 text-[#757575]">The room you are looking for does not exist or has been removed.</p>
        <Button onClick={() => router.push(`/hostels/${hostelId}/rooms`)}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Rooms
        </Button>
      </div>
    )
  }

  const availableSpaces = room.capacity - room.occupied
  const occupancyPercentage = (room.occupied / room.capacity) * 100

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
            <Link href={`/hostels/${hostelId}/rooms`} className="text-[#757575] hover:text-[#006400]">
              Rooms
            </Link>
            <span className="mx-2 text-[#757575]">/</span>
            <span className="font-medium text-[#001F3F]">Room {room.id}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Room Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="font-heading text-3xl font-bold text-[#001F3F] md:text-4xl">Room {room.id}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <Badge
                className={
                  room.type === "Standard" ? "bg-blue-500" : room.type === "Premium" ? "bg-purple-500" : "bg-green-500"
                }
              >
                {room.type} Room
              </Badge>
              <div className="flex items-center text-sm text-[#757575]">
                <MapPin className="mr-1 h-4 w-4" />
                Floor {room.floor}, Block {room.block}
              </div>
              <Badge
                className={
                  room.occupied === 0 ? "bg-green-500" : room.occupied < room.capacity ? "bg-yellow-500" : "bg-red-500"
                }
              >
                {room.occupied === 0 ? "Empty" : room.occupied < room.capacity ? "Partially Occupied" : "Full"}
              </Badge>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="outline" onClick={() => router.push(`/hostels/${hostelId}/rooms`)}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Rooms
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column - Details */}
          <div className="lg:col-span-2">
            {/* Room Images */}
            <Card className="mb-8 overflow-hidden">
              <div className="relative h-[300px]">
                <Image
                  src={room.images[currentImageIndex] || "/placeholder.svg"}
                  alt={`Room ${room.id} - Image ${currentImageIndex + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex overflow-x-auto p-2">
                {room.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`mr-2 flex-shrink-0 overflow-hidden rounded-md border-2 ${
                      index === currentImageIndex ? "border-[#006400]" : "border-transparent"
                    }`}
                  >
                    <div className="relative h-16 w-24">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Room ${room.id} - Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Room Details */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Room Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-[#424242]">{room.description}</p>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="mb-2 font-medium text-[#001F3F]">Room Type</h3>
                    <p className="text-[#424242]">{room.type}</p>
                  </div>
                  <div>
                    <h3 className="mb-2 font-medium text-[#001F3F]">Capacity</h3>
                    <p className="text-[#424242]">
                      {room.capacity} {room.capacity === 1 ? "student" : "students"}
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-2 font-medium text-[#001F3F]">Dimensions</h3>
                    <p className="text-[#424242]">{room.dimensions}</p>
                  </div>
                  <div>
                    <h3 className="mb-2 font-medium text-[#001F3F]">Last Renovated</h3>
                    <p className="text-[#424242]">{room.lastRenovated}</p>
                  </div>
                  <div>
                    <h3 className="mb-2 font-medium text-[#001F3F]">Floor</h3>
                    <p className="text-[#424242]">Floor {room.floor}</p>
                  </div>
                  <div>
                    <h3 className="mb-2 font-medium text-[#001F3F]">Block</h3>
                    <p className="text-[#424242]">Block {room.block}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="mb-3 font-medium text-[#001F3F]">Amenities</h3>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {room.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-[#006400]" />
                        <span className="text-[#424242]">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="mb-3 font-medium text-[#001F3F]">Occupancy Status</h3>
                  <div className="mb-2 flex justify-between text-sm">
                    <span>Occupancy</span>
                    <span>
                      {room.occupied} of {room.capacity} ({Math.round(occupancyPercentage)}%)
                    </span>
                  </div>
                  <Progress value={occupancyPercentage} className="h-2 bg-[#E0E0E0]" />

                  <div className="mt-4">
                    <h4 className="mb-2 font-medium text-[#001F3F]">Available Spaces</h4>
                    {availableSpaces > 0 ? (
                      <Alert className="bg-green-50 border-green-200">
                        <Check className="h-4 w-4 text-green-600" />
                        <AlertTitle className="text-green-800">Spaces Available</AlertTitle>
                        <AlertDescription className="text-green-700">
                          This room has {availableSpaces} {availableSpaces === 1 ? "space" : "spaces"} available for the
                          current academic session.
                        </AlertDescription>
                      </Alert>
                    ) : (
                      <Alert className="bg-red-50 border-red-200">
                        <Clock className="h-4 w-4 text-red-600" />
                        <AlertTitle className="text-red-800">Fully Occupied</AlertTitle>
                        <AlertDescription className="text-red-700">
                          This room is currently at full capacity. Please check other rooms or join the waiting list.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </div>

                {/* Current Occupants (if any) */}
                {room.occupied > 0 && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="mb-3 font-medium text-[#001F3F]">Current Occupants</h3>
                      <div className="space-y-3">
                        {room.occupants.map((occupant, index) => (
                          <div key={index} className="flex items-center rounded-lg border p-3">
                            <Avatar className="mr-3 h-10 w-10">
                              <AvatarFallback className="bg-[#006400] text-white">
                                {occupant.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{occupant.name}</p>
                              <p className="text-sm text-[#757575]">
                                {occupant.department}, {occupant.level}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Simple Room Info */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Room {room.id}</CardTitle>
                <Badge className="mt-1">{room.type} Room</Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-[#F5F5F5] p-3 text-center">
                      <p className="text-sm text-[#757575]">Price</p>
                      <p className="text-lg font-bold text-[#001F3F]">{room.price}</p>
                    </div>
                    <div className="rounded-lg bg-[#F5F5F5] p-3 text-center">
                      <p className="text-sm text-[#757575]">Capacity</p>
                      <p className="text-lg font-bold">{room.capacity}</p>
                    </div>
                  </div>

                  <div className="rounded-lg border p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Location:</span>
                      <span>
                        Floor {room.floor}, Block {room.block}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Available:</span>
                      <span
                        className={availableSpaces > 0 ? "text-[#006400] font-medium" : "text-[#C62828] font-medium"}
                      >
                        {availableSpaces} {availableSpaces === 1 ? "space" : "spaces"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                {availableSpaces > 0 ? (
                  <Button
                    className="w-full bg-[#006400] hover:bg-[#006400]/90"
                    onClick={() => router.push(`/application/room/${roomId}`)}
                  >
                    Apply for this Room
                  </Button>
                ) : (
                  <Button className="w-full" disabled>
                    Room Fully Occupied
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
