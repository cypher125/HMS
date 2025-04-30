"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Filter, MapPin, Search, Users, Building2, Wifi, Bed, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { hostelService, Hostel } from "@/lib/services/hostelService"

export default function HostelsPage() {
  const [hostels, setHostels] = useState<Hostel[]>([])
  const [filteredHostels, setFilteredHostels] = useState<Hostel[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [genderFilter, setGenderFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("name")
  
  useEffect(() => {
    const fetchHostels = async () => {
      try {
        setLoading(true)
        const data = await hostelService.getHostels()
        setHostels(data)
        setFilteredHostels(data)
      } catch (err: any) {
        setError(err.message || "Failed to load hostels")
        console.error("Hostels loading error:", err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchHostels()
  }, [])
  
  useEffect(() => {
    // Apply filters
    let filtered = [...hostels]
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(hostel => 
        hostel.name.toLowerCase().includes(query) || 
        hostel.location.toLowerCase().includes(query) ||
        hostel.description.toLowerCase().includes(query)
      )
    }
    
    // Apply gender filter
    if (genderFilter !== "all") {
      filtered = filtered.filter(hostel => hostel.gender === genderFilter)
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "available":
          return b.available_rooms - a.available_rooms
        case "capacity":
          return b.capacity - a.capacity
        default:
          return 0
      }
    })
    
    setFilteredHostels(filtered)
  }, [hostels, searchQuery, genderFilter, sortBy])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#006400]" />
          <p className="mt-2 text-lg">Loading hostels...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold md:text-4xl">Available Hostels</h1>
        <p className="mx-auto max-w-2xl text-gray-600">
          Browse through our selection of comfortable and convenient accommodations for students
          </p>
        </div>
      
      {/* Filters Section */}
      <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <Label htmlFor="search" className="mb-2">Search</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                id="search"
                placeholder="Search by name or location..."
                className="pl-10"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="gender-filter" className="mb-2">Gender</Label>
            <RadioGroup
              id="gender-filter"
              defaultValue="all"
              className="flex flex-wrap gap-4"
              onValueChange={setGenderFilter}
              value={genderFilter}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all" className="cursor-pointer">All</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Male" id="male" />
                <Label htmlFor="male" className="cursor-pointer">Male Only</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Female" id="female" />
                <Label htmlFor="female" className="cursor-pointer">Female Only</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Mixed" id="mixed" />
                <Label htmlFor="mixed" className="cursor-pointer">Mixed</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div>
            <Label htmlFor="sort" className="mb-2">Sort By</Label>
            <Select defaultValue="name" onValueChange={setSortBy} value={sortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="name">Name (A-Z)</SelectItem>
                <SelectItem value="available">Available Rooms</SelectItem>
                <SelectItem value="capacity">Capacity</SelectItem>
                </SelectContent>
              </Select>
          </div>
            </div>
          </div>

      {/* Results */}
      {error ? (
        <div className="rounded-lg bg-red-50 p-6 text-center">
          <p className="text-lg text-red-800">{error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">Try Again</Button>
        </div>
      ) : filteredHostels.length === 0 ? (
        <div className="rounded-lg bg-gray-50 p-12 text-center">
          <Building2 className="mx-auto mb-4 h-12 w-12 text-gray-400" />
          <h3 className="mb-2 text-xl font-semibold">No Hostels Found</h3>
          <p className="mb-6 text-gray-600">
            No hostels match your current filters. Try adjusting your search criteria.
          </p>
          <Button onClick={() => {
            setSearchQuery("")
            setGenderFilter("all")
            setSortBy("name")
          }}>
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredHostels.map((hostel) => (
            <Card key={hostel.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <div className="relative h-48 w-full">
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
                
                <div 
                  className={`absolute right-2 top-2 rounded-full px-3 py-1 text-sm font-bold ${
                    hostel.gender === 'Male' ? 'bg-blue-500 text-white' :
                    hostel.gender === 'Female' ? 'bg-pink-500 text-white' :
                    'bg-purple-500 text-white'
                  }`}
                >
                  {hostel.gender}
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold">{hostel.name}</CardTitle>
                <CardDescription className="flex items-center text-gray-500">
                  <MapPin className="mr-1 h-4 w-4" /> {hostel.location}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="mb-4">
                  <p className="line-clamp-2 text-gray-600">{hostel.description}</p>
                    </div>
                
                <Separator className="my-4" />
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center">
                    <Building2 className="mr-2 h-5 w-5 text-gray-500" />
                    <span className="text-sm">
                      {hostel.available_rooms} / {hostel.total_rooms} Rooms
                    </span>
                  </div>
                  
                  <div className="flex items-center">
                    <Users className="mr-2 h-5 w-5 text-gray-500" />
                    <span className="text-sm">Capacity: {hostel.capacity}</span>
                    </div>
                  
                  {hostel.facilities && (
                    <div className="col-span-2 flex items-center">
                      <Wifi className="mr-2 h-5 w-5 text-gray-500" />
                      <span className="text-sm line-clamp-1">{hostel.facilities}</span>
                    </div>
                        )}
                      </div>
              </CardContent>
              
              <CardFooter>
                <Button asChild className="w-full bg-[#006400] hover:bg-[#006400]/90">
                  <Link href={`/hostels/${hostel.id}`}>
                        View Details <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                </Button>
              </CardFooter>
                </Card>
              ))}
            </div>
      )}
    </div>
  )
}
