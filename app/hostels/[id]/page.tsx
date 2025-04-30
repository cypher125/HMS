"use client"

import React, { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Check, ChevronLeft, ChevronRight, MapPin, Share2, Users, Wifi, Loader2, AlertCircle, Bed, Home, Building2, CreditCard, Phone, Mail, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { hostelService, Hostel, Room } from "@/lib/services/hostelService"
import { useAuth } from "@/lib/context/AuthContext"

export default function HostelDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const [hostel, setHostel] = useState<Hostel | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchHostel = async () => {
      try {
        setLoading(true)
        const data = await hostelService.getHostelById(Number(id))
        setHostel(data)
      } catch (err: any) {
        setError(err.message || "Failed to load hostel details")
        console.error("Hostel detail loading error:", err)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchHostel()
    }
  }, [id])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#006400]" />
          <p className="mt-2 text-lg">Loading hostel details...</p>
        </div>
      </div>
    )
  }

  if (error || !hostel) {
    return (
      <div className="container mx-auto mt-8 px-4">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => router.back()} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Hostels
          </Button>
        </div>
        <Card className="mx-auto max-w-3xl">
          <CardContent className="flex flex-col items-center justify-center py-10">
            <AlertCircle className="mb-4 h-16 w-16 text-red-500" />
            <h2 className="mb-2 text-2xl font-bold">Error Loading Hostel</h2>
            <p className="mb-6 text-center text-gray-600">{error || "Hostel not found"}</p>
            <Button onClick={() => router.push("/hostels")} className="bg-[#006400] hover:bg-[#006400]/90">
              Browse Other Hostels
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Hostels
        </Button>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">{hostel.name}</h1>
            <p className="flex items-center text-gray-600">
              <MapPin className="mr-1 h-4 w-4" /> {hostel.location}
            </p>
          </div>
          <Badge 
            className={`px-3 py-1 text-sm ${
              hostel.gender === 'Male' ? 'bg-blue-500 hover:bg-blue-600' :
              hostel.gender === 'Female' ? 'bg-pink-500 hover:bg-pink-600' :
              'bg-purple-500 hover:bg-purple-600'
            }`}
          >
            {hostel.gender} Only
          </Badge>
        </div>
      </div>

      {/* Hostel Images */}
      <div className="mb-8 overflow-hidden rounded-lg bg-gray-100">
        <div className="relative h-[300px] w-full md:h-[400px]">
          {hostel.image ? (
            <Image
              src={hostel.image}
              alt={hostel.name}
              fill
              className="object-cover"
            />
          ) : hostel.images && hostel.images.length > 0 ? (
            <Image
              src={hostel.images.find(img => img.is_primary)?.image || hostel.images[0].image}
              alt={hostel.name}
              fill
              className="object-cover"
            />
          ) : (
                  <Image
              src="/placeholder.svg"
              alt={hostel.name}
                    fill
                    className="object-cover"
                  />
          )}
                </div>
        {/* Additional images could be added in a gallery format */}
        </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Main Content */}
        <div className="md:col-span-2">
          <Tabs defaultValue="overview">
            <TabsList className="mb-4 grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="rooms">Rooms</TabsTrigger>
              <TabsTrigger value="facilities">Facilities</TabsTrigger>
              </TabsList>

            <TabsContent value="overview" className="rounded-lg border p-6">
              <h2 className="mb-4 text-xl font-semibold">About {hostel.name}</h2>
              <p className="mb-6 text-gray-700">{hostel.description || "No description available."}</p>
              
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center rounded-lg bg-gray-50 p-4">
                  <Building2 className="mr-3 h-6 w-6 text-[#006400]" />
                    <div>
                    <p className="text-sm font-medium text-gray-500">Available Rooms</p>
                    <p className="text-lg font-semibold">{hostel.available_rooms} / {hostel.total_rooms}</p>
                      </div>
                    </div>

                <div className="flex items-center rounded-lg bg-gray-50 p-4">
                  <Users className="mr-3 h-6 w-6 text-[#006400]" />
                    <div>
                    <p className="text-sm font-medium text-gray-500">Total Capacity</p>
                    <p className="text-lg font-semibold">{hostel.capacity} Students</p>
                      </div>
                    </div>

                <div className="flex items-center rounded-lg bg-gray-50 p-4">
                  <Calendar className="mr-3 h-6 w-6 text-[#006400]" />
                    <div>
                    <p className="text-sm font-medium text-gray-500">Academic Session</p>
                    <p className="text-lg font-semibold">2024/2025</p>
                      </div>
                    </div>

                <div className="flex items-center rounded-lg bg-gray-50 p-4">
                  <CreditCard className="mr-3 h-6 w-6 text-[#006400]" />
                    <div>
                    <p className="text-sm font-medium text-gray-500">Room Rates</p>
                    <p className="text-lg font-semibold">
                      {hostel.rooms && hostel.rooms.length > 0 
                        ? `₦${Math.min(...hostel.rooms.map(r => parseFloat(r.price))).toLocaleString()} - ₦${Math.max(...hostel.rooms.map(r => parseFloat(r.price))).toLocaleString()}`
                        : "Contact administration"}
                              </p>
                            </div>
                          </div>
                          </div>
            </TabsContent>
            
            <TabsContent value="rooms" className="rounded-lg border p-6">
              <h2 className="mb-4 text-xl font-semibold">Available Rooms</h2>
              
              {hostel.rooms && hostel.rooms.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {hostel.rooms.filter(room => room.is_available).map((room) => (
                    <Card key={room.id} className="overflow-hidden">
                      <div className="relative h-40 w-full">
                        {room.image ? (
                          <Image src={room.image} alt={`Room ${room.room_number}`} fill className="object-cover" />
                        ) : room.images && room.images.length > 0 ? (
                                <Image
                            src={room.images.find(img => img.is_primary)?.image || room.images[0].image} 
                            alt={`Room ${room.room_number}`} 
                                  fill
                                  className="object-cover"
                                />
                        ) : (
                          <Image src="/placeholder.svg" alt={`Room ${room.room_number}`} fill className="object-cover" />
                        )}
                        
                        <Badge className="absolute left-2 top-2 bg-[#006400]">
                          {room.room_type}
                        </Badge>
                      </div>
                      
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Room {room.room_number}</CardTitle>
                        <CardDescription>Floor: {room.floor}</CardDescription>
                      </CardHeader>
                      
                      <CardContent className="pb-2">
                        <div className="mb-3 flex items-center justify-between">
                          <span className="font-medium">₦{parseFloat(room.price).toLocaleString()}</span>
                          <span className="flex items-center text-sm text-gray-600">
                            <Bed className="mr-1 h-4 w-4" /> {room.available_beds} / {room.capacity} beds available
                          </span>
                        </div>
                        
                        <p className="line-clamp-2 text-sm text-gray-600">
                          {room.description || "Standard student accommodation"}
                        </p>
                  </CardContent>
                      
                      <CardFooter>
                  <Button
                          asChild
                          className="w-full bg-[#006400] hover:bg-[#006400]/90"
                          disabled={!room.is_available || room.is_full}
                  >
                          <Link href={isAuthenticated ? `/student/applications/new?room=${room.id}` : `/auth/login?redirect=/hostels/${hostel.id}`}>
                            {room.is_full ? "Room Full" : "Apply for Room"}
                          </Link>
                  </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg bg-gray-50 p-8 text-center">
                  <Home className="mx-auto mb-3 h-10 w-10 text-gray-400" />
                  <h3 className="text-lg font-medium">No rooms available</h3>
                  <p className="mt-2 text-gray-600">
                    There are currently no available rooms in this hostel.
                  </p>
                </div>
              )}
              </TabsContent>

            <TabsContent value="facilities" className="rounded-lg border p-6">
              <h2 className="mb-4 text-xl font-semibold">Hostel Facilities</h2>
              
              <div className="mb-6">
                <p className="mb-4 text-gray-700">
                  {hostel.facilities || "No facilities information available."}
                </p>
                
                {/* You could render a list of amenities here */}
          </div>

              <Separator className="my-6" />
              
              <h3 className="mb-4 text-lg font-semibold">Hostel Staff Information</h3>
              
              <div className="space-y-4">
                {hostel.warden_name && (
                  <div className="flex items-start">
                    <User className="mr-3 mt-1 h-5 w-5 text-[#006400]" />
                    <div>
                      <p className="font-medium">Warden</p>
                      <p className="text-gray-600">{hostel.warden_name}</p>
                    </div>
                  </div>
                )}
                
                {hostel.warden_phone && (
                  <div className="flex items-start">
                    <Phone className="mr-3 mt-1 h-5 w-5 text-[#006400]" />
          <div>
                      <p className="font-medium">Contact Phone</p>
                      <p className="text-gray-600">{hostel.warden_phone}</p>
                    </div>
                  </div>
                )}
                
                {hostel.warden_email && (
                  <div className="flex items-start">
                    <Mail className="mr-3 mt-1 h-5 w-5 text-[#006400]" />
                    <div>
                      <p className="font-medium">Contact Email</p>
                      <p className="text-gray-600">{hostel.warden_email}</p>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Sidebar */}
        <div>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Apply for Accommodation</CardTitle>
              <CardDescription>
                Secure your space for the upcoming academic session
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pb-2">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Available Rooms:</span>
                  <span className="font-medium">{hostel.available_rooms}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Total Capacity:</span>
                  <span className="font-medium">{hostel.capacity} Students</span>
                </div>

                <Separator />
                
                <div className="rounded-lg bg-yellow-50 p-3 text-sm">
                  <p className="font-medium text-yellow-800">Application Timeline</p>
                  <p className="mt-1 text-yellow-700">
                    Applications for 2024/2025 session are open until April 30th, 2025
                  </p>
                </div>
                </div>
              </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <Button asChild className="w-full bg-[#006400] hover:bg-[#006400]/90">
                <Link href={isAuthenticated ? "/student/applications/new" : "/auth/login?redirect=/hostels"}>
                  {isAuthenticated ? "Apply Now" : "Login to Apply"}
                </Link>
              </Button>
              
              <Button variant="outline" asChild className="w-full">
                <Link href="/contact">
                  Contact Administration
                </Link>
                </Button>
              </CardFooter>
            </Card>
        </div>
      </div>
    </div>
  )
}
