"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { X, Upload, Plus, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RoomFormModal } from "./room-form-modal"

// Define the room type interface
interface RoomType {
  id?: string
  type: string
  capacity: number
  priceRange: string
  available: number
  description?: string
  amenities?: string[]
  image?: string
}

// Define the hostel interface
interface Hostel {
  id?: number
  name: string
  type: string
  image: string
  location: string
  address?: string
  description: string
  totalRooms: number
  occupiedRooms?: number
  availableRooms?: number
  occupancyRate?: number
  capacity?: number
  currentOccupants?: number
  yearBuilt?: number
  lastRenovated?: number
  warden?: {
    name: string
    email: string
    avatar?: string
  }
  facilities: string[]
  roomTypes: RoomType[]
}

interface HostelFormModalProps {
  isOpen: boolean
  onClose: () => void
  hostel?: Hostel
  onSave: (hostel: Hostel) => void
  mode: "add" | "edit"
}

const defaultHostel: Hostel = {
  name: "",
  type: "Male",
  image: "/placeholder.svg?height=300&width=500",
  location: "North Campus",
  address: "",
  description: "",
  totalRooms: 0,
  capacity: 0,
  currentOccupants: 0,
  yearBuilt: new Date().getFullYear(),
  lastRenovated: new Date().getFullYear(),
  warden: {
    name: "",
    email: "",
    avatar: "/placeholder.svg?height=64&width=64",
  },
  facilities: [],
  roomTypes: [],
}

const campusLocations = ["North Campus", "South Campus", "Central Campus", "East Campus", "West Campus"]

const facilityOptions = [
  "Wi-Fi",
  "Study Area",
  "Common Room",
  "Laundry",
  "Security",
  "Cafeteria",
  "Water Supply",
  "Electricity",
  "Bathroom",
  "Toilet",
]

export function HostelFormModal({ isOpen, onClose, hostel, onSave, mode }: HostelFormModalProps) {
  const [formData, setFormData] = useState<Hostel>(hostel || defaultHostel)
  const [newFacility, setNewFacility] = useState("")
  const [imagePreview, setImagePreview] = useState(hostel?.image || defaultHostel.image)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false)
  const [currentRoomType, setCurrentRoomType] = useState<RoomType | null>(null)
  const [roomModalMode, setRoomModalMode] = useState<"add" | "edit">("add")

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle select change
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle nested object change
  const handleNestedChange = (parent: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof Hostel],
        [field]: value,
      },
    }))
  }

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
        setFormData((prev) => ({
          ...prev,
          image: reader.result as string,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  // Add facility
  const addFacility = () => {
    if (newFacility && !formData.facilities.includes(newFacility)) {
      setFormData((prev) => ({
        ...prev,
        facilities: [...prev.facilities, newFacility],
      }))
      setNewFacility("")
    }
  }

  // Remove facility
  const removeFacility = (facility: string) => {
    setFormData((prev) => ({
      ...prev,
      facilities: prev.facilities.filter((f) => f !== facility),
    }))
  }

  // Open room modal for adding
  const openAddRoomModal = () => {
    setCurrentRoomType(null)
    setRoomModalMode("add")
    setIsRoomModalOpen(true)
  }

  // Open room modal for editing
  const openEditRoomModal = (roomType: RoomType) => {
    setCurrentRoomType(roomType)
    setRoomModalMode("edit")
    setIsRoomModalOpen(true)
  }

  // Handle save room
  const handleSaveRoom = (roomType: RoomType) => {
    if (roomModalMode === "add") {
      // Add new room type
      setFormData((prev) => ({
        ...prev,
        roomTypes: [...prev.roomTypes, { ...roomType, id: Date.now().toString() }],
      }))
    } else {
      // Update existing room type
      setFormData((prev) => ({
        ...prev,
        roomTypes: prev.roomTypes.map((rt) => (rt.id === roomType.id ? roomType : rt)),
      }))
    }
    setIsRoomModalOpen(false)
  }

  // Remove room type
  const removeRoomType = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      roomTypes: prev.roomTypes.filter((rt) => rt.id !== id),
    }))
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Calculate some derived values
    const availableRooms = formData.roomTypes.reduce((sum, rt) => sum + rt.available, 0)
    const totalRooms = Number(formData.totalRooms)
    const occupiedRooms = totalRooms - availableRooms
    const occupancyRate = totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0

    const completeHostel: Hostel = {
      ...formData,
      availableRooms,
      occupiedRooms,
      occupancyRate,
    }

    // Simulate API call
    setTimeout(() => {
      onSave(completeHostel)
      setIsSubmitting(false)
      onClose()
    }, 500)
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{mode === "add" ? "Add New Hostel" : "Edit Hostel"}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Basic Information */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Hostel Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter hostel name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="type">Hostel Type</Label>
                  <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select hostel type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Select value={formData.location} onValueChange={(value) => handleSelectChange("location", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {campusLocations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address || ""}
                    onChange={handleChange}
                    placeholder="Enter hostel address"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="totalRooms">Total Rooms</Label>
                    <Input
                      id="totalRooms"
                      name="totalRooms"
                      type="number"
                      min="0"
                      value={formData.totalRooms}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="capacity">Total Capacity</Label>
                    <Input
                      id="capacity"
                      name="capacity"
                      type="number"
                      min="0"
                      value={formData.capacity || 0}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="yearBuilt">Year Built</Label>
                    <Input
                      id="yearBuilt"
                      name="yearBuilt"
                      type="number"
                      min="1900"
                      max={new Date().getFullYear()}
                      value={formData.yearBuilt || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastRenovated">Last Renovated</Label>
                    <Input
                      id="lastRenovated"
                      name="lastRenovated"
                      type="number"
                      min="1900"
                      max={new Date().getFullYear()}
                      value={formData.lastRenovated || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter hostel description"
                    rows={4}
                  />
                </div>
              </div>

              {/* Image Upload, Warden and Facilities */}
              <div className="space-y-4">
                <div>
                  <Label>Hostel Image</Label>
                  <div className="mt-2 flex flex-col items-center space-y-2">
                    <div className="relative h-48 w-full overflow-hidden rounded-md border">
                      <Image
                        src={imagePreview || "/placeholder.svg"}
                        alt="Hostel preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <Label
                      htmlFor="image-upload"
                      className="flex w-full cursor-pointer items-center justify-center rounded-md border border-dashed border-gray-300 p-3 text-sm text-gray-500 hover:border-gray-400"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Image
                      <Input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </Label>
                  </div>
                </div>

                <div className="space-y-3 rounded-md border border-gray-200 p-4">
                  <h3 className="font-medium">Warden Information</h3>
                  <div>
                    <Label htmlFor="warden-name">Warden Name</Label>
                    <Input
                      id="warden-name"
                      value={formData.warden?.name || ""}
                      onChange={(e) => handleNestedChange("warden", "name", e.target.value)}
                      placeholder="Enter warden name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="warden-email">Warden Email</Label>
                    <Input
                      id="warden-email"
                      type="email"
                      value={formData.warden?.email || ""}
                      onChange={(e) => handleNestedChange("warden", "email", e.target.value)}
                      placeholder="Enter warden email"
                    />
                  </div>
                </div>

                <div>
                  <Label>Facilities</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {formData.facilities.map((facility) => (
                      <Badge key={facility} variant="secondary" className="flex items-center gap-1">
                        {facility}
                        <button
                          type="button"
                          onClick={() => removeFacility(facility)}
                          className="ml-1 rounded-full p-1 hover:bg-gray-200"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-2 flex gap-2">
                    <Select onValueChange={setNewFacility} value={newFacility}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select facility" />
                      </SelectTrigger>
                      <SelectContent>
                        {facilityOptions
                          .filter((f) => !formData.facilities.includes(f))
                          .map((facility) => (
                            <SelectItem key={facility} value={facility}>
                              {facility}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <Button type="button" onClick={addFacility} size="sm">
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Room Types */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <Label>Room Types</Label>
                <Button
                  type="button"
                  onClick={openAddRoomModal}
                  size="sm"
                  variant="outline"
                  className="flex items-center gap-1"
                >
                  <Plus className="h-4 w-4" /> Add Room Type
                </Button>
              </div>

              {formData.roomTypes.length === 0 ? (
                <div className="flex h-24 items-center justify-center rounded-md border border-dashed border-gray-300">
                  <p className="text-sm text-gray-500">No room types added yet. Click "Add Room Type" to add one.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {formData.roomTypes.map((roomType) => (
                    <Card key={roomType.id} className="border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{roomType.type} Room</h4>
                          <div className="flex gap-2">
                            <Button
                              type="button"
                              onClick={() => openEditRoomModal(roomType)}
                              size="sm"
                              variant="outline"
                              className="h-8 px-2 py-0"
                            >
                              Edit
                            </Button>
                            <Button
                              type="button"
                              onClick={() => removeRoomType(roomType.id!)}
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <p className="text-xs text-gray-500">Capacity</p>
                            <p className="font-medium">{roomType.capacity} students</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Price Range</p>
                            <p className="font-medium">{roomType.priceRange}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Available Rooms</p>
                            <p className="font-medium">{roomType.available}</p>
                          </div>
                          {roomType.amenities && roomType.amenities.length > 0 && (
                            <div className="sm:col-span-2">
                              <p className="mb-1 text-xs text-gray-500">Amenities:</p>
                              <div className="flex flex-wrap gap-1">
                                {roomType.amenities.map((amenity, idx) => (
                                  <Badge key={idx} variant="secondary" className="text-xs">
                                    {amenity}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="bg-[#006400] hover:bg-[#006400]/90">
                {isSubmitting ? "Saving..." : mode === "add" ? "Add Hostel" : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Room Form Modal */}
      <RoomFormModal
        isOpen={isRoomModalOpen}
        onClose={() => setIsRoomModalOpen(false)}
        roomType={currentRoomType}
        onSave={handleSaveRoom}
        mode={roomModalMode}
      />
    </>
  )
}
