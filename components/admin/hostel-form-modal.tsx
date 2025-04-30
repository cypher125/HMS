"use client"

import { useState, useEffect } from "react"
import { 
  Dialog, DialogContent, DialogHeader, 
  DialogTitle, DialogFooter, DialogDescription 
} from "@/components/ui/dialog"
import { 
  Form, FormControl, FormField, FormItem, 
  FormLabel, FormMessage 
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from "@/components/ui/select"

interface HostelFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: any) => void
  hostel?: any
  mode: "add" | "edit"
}

export function HostelFormModal({ 
  isOpen, 
  onClose, 
  onSave, 
  hostel, 
  mode 
}: HostelFormModalProps) {
  const defaultValues = {
    id: hostel?.id || null,
    name: hostel?.name || "",
    type: hostel?.type || "Male",
    location: hostel?.location || "North Campus",
    description: hostel?.description || "",
    totalRooms: hostel?.totalRooms || 0,
    occupiedRooms: hostel?.occupiedRooms || 0,
    availableRooms: hostel?.availableRooms || 0,
    occupancyRate: hostel?.occupancyRate || 0,
    image: hostel?.image || "/placeholder.svg?height=300&width=500",
    facilities: hostel?.facilities || ["Wi-Fi", "Reading Room", "Security"],
    roomTypes: hostel?.roomTypes || [
      { id: "1", type: "Standard", capacity: 4, priceRange: "₦45,000 - ₦55,000", available: 5 },
      { id: "2", type: "Premium", capacity: 2, priceRange: "₦75,000 - ₦85,000", available: 3 },
    ]
  }

  const form = useForm({
    defaultValues
  })

  useEffect(() => {
    if (isOpen) {
      form.reset(defaultValues)
    }
  }, [isOpen, hostel, form])

  const handleSubmit = (data: any) => {
    onSave({
      ...data,
      // Calculate occupancy rate
      occupancyRate: data.totalRooms > 0 
        ? Math.round((data.occupiedRooms / data.totalRooms) * 100) 
        : 0,
      // Ensure available rooms is correct
      availableRooms: data.totalRooms - data.occupiedRooms
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Add New Hostel" : "Edit Hostel"}</DialogTitle>
          <DialogDescription>
            {mode === "add" 
              ? "Add a new hostel to the system" 
              : "Update the hostel information"}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hostel Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter hostel name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hostel Type</FormLabel>
                    <Select 
                      value={field.value} 
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Mixed">Mixed</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <Select 
                      value={field.value} 
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="North Campus">North Campus</SelectItem>
                        <SelectItem value="South Campus">South Campus</SelectItem>
                        <SelectItem value="Central Campus">Central Campus</SelectItem>
                        <SelectItem value="East Campus">East Campus</SelectItem>
                        <SelectItem value="West Campus">West Campus</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      placeholder="Enter hostel description" 
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="totalRooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Rooms</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="number" 
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="occupiedRooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Occupied Rooms</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="number" 
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter image URL" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-[#006400] hover:bg-[#006400]/90">
                {mode === "add" ? "Create Hostel" : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 