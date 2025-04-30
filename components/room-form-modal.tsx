"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Upload } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

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

interface RoomFormModalProps {
  isOpen: boolean
  onClose: () => void
  roomType?: RoomType | null
  onSave: (roomType: RoomType) => void
  mode: "add" | "edit"
}

const defaultRoomType: RoomType = {
  type: "Standard",
  capacity: 4,
  priceRange: "₦45,000 - ₦55,000",
  available: 0,
  description: "Basic accommodation with shared facilities",
  amenities: ["Bunk beds", "Study tables", "Wardrobes", "Ceiling fan"],
  image: "/placeholder.svg?height=200&width=300",
}

const amenityOptions = [
  "Bunk beds",
  "Single beds",
  "Study tables",
  "Wardrobes",
  "Ceiling fan",
  "Air conditioning",
  "Reading lamps",
  "Private bathroom",
  "Shared bathroom",
  "Mini fridge",
]

export function RoomFormModal({ isOpen, onClose, roomType, onSave, mode }: RoomFormModalProps) {
  const [formData, setFormData] = useState<RoomType>(roomType || defaultRoomType)
  const [imagePreview, setImagePreview] = useState(roomType?.image || defaultRoomType.image)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle number input change
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: Number(value),
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

  // Handle amenity toggle
  const handleAmenityToggle = (amenity: string, checked: boolean) => {
    setFormData((prev) => {
      const currentAmenities = prev.amenities || []
      if (checked) {
        return { ...prev, amenities: [...currentAmenities, amenity] }
      } else {
        return { ...prev, amenities: currentAmenities.filter((a) => a !== amenity) }
      }
    })
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      onSave(formData)
      setIsSubmitting(false)
      onClose()
    }, 500)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Add New Room Type" : "Edit Room Type"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="type">Room Type</Label>
                <Input
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  placeholder="e.g., Standard, Premium, Deluxe"
                  required
                />
              </div>

              <div>
                <Label htmlFor="capacity">Capacity (students)</Label>
                <Input
                  id="capacity"
                  name="capacity"
                  type="number"
                  min="1"
                  value={formData.capacity}
                  onChange={handleNumberChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="priceRange">Price Range</Label>
                <Input
                  id="priceRange"
                  name="priceRange"
                  value={formData.priceRange}
                  onChange={handleChange}
                  placeholder="e.g., ₦45,000 - ₦55,000"
                  required
                />
              </div>

              <div>
                <Label htmlFor="available">Available Rooms</Label>
                <Input
                  id="available"
                  name="available"
                  type="number"
                  min="0"
                  value={formData.available}
                  onChange={handleNumberChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description || ""}
                  onChange={handleChange}
                  placeholder="Enter room description"
                  rows={3}
                />
              </div>
            </div>

            {/* Image Upload and Amenities */}
            <div className="space-y-4">
              <div>
                <Label>Room Image</Label>
                <div className="mt-2 flex flex-col items-center space-y-2">
                  <div className="relative h-40 w-full overflow-hidden rounded-md border">
                    <Image src={imagePreview || "/placeholder.svg"} alt="Room preview" fill className="object-cover" />
                  </div>
                  <Label
                    htmlFor="room-image-upload"
                    className="flex w-full cursor-pointer items-center justify-center rounded-md border border-dashed border-gray-300 p-3 text-sm text-gray-500 hover:border-gray-400"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Image
                    <Input
                      id="room-image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </Label>
                </div>
              </div>

              <div>
                <Label className="mb-2 block">Amenities</Label>
                <div className="grid grid-cols-2 gap-2">
                  {amenityOptions.map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox
                        id={`amenity-${amenity}`}
                        checked={(formData.amenities || []).includes(amenity)}
                        onCheckedChange={(checked) => handleAmenityToggle(amenity, checked as boolean)}
                      />
                      <Label htmlFor={`amenity-${amenity}`} className="text-sm font-normal">
                        {amenity}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-[#006400] hover:bg-[#006400]/90">
              {isSubmitting ? "Saving..." : mode === "add" ? "Add Room Type" : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
