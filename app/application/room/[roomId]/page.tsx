"use client"

import { useState, useEffect } from "react"
import * as React from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, CheckCircle2, FileText, Upload, Building, Bed, MapPin, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"

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

const steps = [
  { id: 1, name: "Room Details" },
  { id: 2, name: "Personal Information" },
  { id: 3, name: "Documents" },
  { id: 4, name: "Payment" },
  { id: 5, name: "Review & Submit" },
]

export default function RoomApplicationPage({ params }: { params: { roomId: string } }) {
  const router = useRouter()
  const unwrappedParams = React.use(params)
  const roomId = unwrappedParams.roomId

  // Find the hostel and room
  const [hostel, setHostel] = useState<any>(null)
  const [room, setRoom] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    matricNumber: "",
    department: "",
    level: "",
    gender: "",
    address: "",
    emergencyContact: {
      name: "",
      relationship: "",
      phone: "",
    },
    documents: {
      studentId: false,
      paymentReceipt: false,
      medicalForm: false,
    },
    paymentMethod: "",
    termsAccepted: false,
  })

  useEffect(() => {
    // Find the hostel and room from the mock data
    for (const h of hostelsData) {
      const foundRoom = h.rooms.find((r) => r.id === roomId)
      if (foundRoom) {
        setHostel(h)
        setRoom(foundRoom)
        break
      }
    }
    setLoading(false)
  }, [roomId])

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => {
      // Handle nested objects
      if (field.includes(".")) {
        const [parent, child] = field.split(".")
        return {
          ...prev,
          [parent]: {
            ...prev[parent as keyof typeof prev],
            [child]: value,
          },
        }
      }
      return {
        ...prev,
        [field]: value,
      }
    })
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleSubmit = () => {
    // Submit application logic would go here
    router.push("/student/dashboard?application=success")
  }

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#006400] border-t-transparent"></div>
          <p className="text-lg font-medium">Loading application form...</p>
        </div>
      </div>
    )
  }

  if (!room || !hostel) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center">
        <h1 className="mb-4 text-2xl font-bold">Room Not Found</h1>
        <p className="mb-6 text-[#757575]">The room you are trying to apply for does not exist or has been removed.</p>
        <Button onClick={() => router.push("/hostels")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Hostels
        </Button>
      </div>
    )
  }

  const availableSpaces = room.capacity - room.occupied

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="rounded-lg border p-6">
              <div className="mb-4 flex items-center">
                <Building className="mr-3 h-6 w-6 text-[#006400]" />
                <h3 className="font-heading text-lg font-medium text-[#001F3F]">Hostel Information</h3>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-[#757575]">Hostel Name</p>
                  <p className="font-medium">{hostel.name}</p>
                </div>
                <div>
                  <p className="text-sm text-[#757575]">Hostel Type</p>
                  <p className="font-medium">{hostel.type} Hostel</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-6">
              <div className="mb-4 flex items-center">
                <Bed className="mr-3 h-6 w-6 text-[#006400]" />
                <h3 className="font-heading text-lg font-medium text-[#001F3F]">Room Information</h3>
              </div>
              <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h4 className="text-lg font-medium">Room {room.id}</h4>
                  <div className="mt-1 flex items-center">
                    <MapPin className="mr-1 h-4 w-4 text-[#757575]" />
                    <span className="text-sm text-[#757575]">
                      Floor {room.floor}, Block {room.block}
                    </span>
                  </div>
                </div>
                <div className="mt-2 sm:mt-0">
                  <Badge
                    className={
                      room.type === "Standard"
                        ? "bg-blue-500"
                        : room.type === "Premium"
                          ? "bg-purple-500"
                          : "bg-green-500"
                    }
                  >
                    {room.type} Room
                  </Badge>
                </div>
              </div>

              <div className="mb-4">
                <div className="relative h-48 w-full overflow-hidden rounded-md">
                  <Image
                    src={room.images[0] || "/placeholder.svg"}
                    alt={`Room ${room.id}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="mb-4">
                <p className="text-[#424242]">{room.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-[#757575]">Room Type</p>
                  <p className="font-medium">{room.type}</p>
                </div>
                <div>
                  <p className="text-sm text-[#757575]">Capacity</p>
                  <p className="font-medium">
                    {room.capacity} {room.capacity === 1 ? "student" : "students"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#757575]">Available Spaces</p>
                  <p className="font-medium text-[#006400]">{availableSpaces}</p>
                </div>
                <div>
                  <p className="text-sm text-[#757575]">Price</p>
                  <p className="font-medium">{room.price} per session</p>
                </div>
              </div>

              <Separator className="my-4" />

              <div>
                <h4 className="mb-2 font-medium text-[#001F3F]">Amenities</h4>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {room.amenities.map((amenity: string, index: number) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-[#006400]" />
                      <span className="text-[#424242]">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Alert className="bg-yellow-50 border-yellow-200">
              <AlertDescription className="text-yellow-800">
                Please review the room details carefully before proceeding with your application. Once submitted,
                changes to your room selection may not be possible.
              </AlertDescription>
            </Alert>
          </div>
        )
      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={(e) => updateFormData("firstName", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={(e) => updateFormData("lastName", e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => updateFormData("phone", e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="matricNumber">Matriculation Number</Label>
              <Input
                id="matricNumber"
                placeholder="Enter your matriculation number"
                value={formData.matricNumber}
                onChange={(e) => updateFormData("matricNumber", e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select value={formData.department} onValueChange={(value) => updateFormData("department", value)}>
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Select your department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="computer-science">Computer Science</SelectItem>
                    <SelectItem value="electrical-engineering">Electrical Engineering</SelectItem>
                    <SelectItem value="mechanical-engineering">Mechanical Engineering</SelectItem>
                    <SelectItem value="civil-engineering">Civil Engineering</SelectItem>
                    <SelectItem value="business-admin">Business Administration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="level">Level</Label>
                <Select value={formData.level} onValueChange={(value) => updateFormData("level", value)}>
                  <SelectTrigger id="level">
                    <SelectValue placeholder="Select your level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="100">100 Level</SelectItem>
                    <SelectItem value="200">200 Level</SelectItem>
                    <SelectItem value="300">300 Level</SelectItem>
                    <SelectItem value="400">400 Level</SelectItem>
                    <SelectItem value="500">500 Level</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <RadioGroup
                value={formData.gender}
                onValueChange={(value) => updateFormData("gender", value)}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Home Address</Label>
              <Textarea
                id="address"
                placeholder="Enter your permanent home address"
                value={formData.address}
                onChange={(e) => updateFormData("address", e.target.value)}
                className="min-h-[80px]"
              />
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="mb-3 font-medium text-[#001F3F]">Emergency Contact</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="emergencyName">Full Name</Label>
                  <Input
                    id="emergencyName"
                    placeholder="Enter emergency contact name"
                    value={formData.emergencyContact.name}
                    onChange={(e) => updateFormData("emergencyContact.name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyRelationship">Relationship</Label>
                  <Input
                    id="emergencyRelationship"
                    placeholder="E.g., Parent, Guardian, Sibling"
                    value={formData.emergencyContact.relationship}
                    onChange={(e) => updateFormData("emergencyContact.relationship", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyPhone">Phone Number</Label>
                  <Input
                    id="emergencyPhone"
                    placeholder="Enter emergency contact phone number"
                    value={formData.emergencyContact.phone}
                    onChange={(e) => updateFormData("emergencyContact.phone", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-6">
            <p className="text-[#757575]">
              Please upload the following required documents to complete your application. All documents must be in PDF
              format and not exceed 2MB in size.
            </p>
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-[#757575]" />
                    <div>
                      <h4 className="font-medium">Student ID Card</h4>
                      <p className="text-sm text-[#757575]">A scanned copy of your student ID card</p>
                    </div>
                  </div>
                  <div>
                    {formData.documents.studentId ? (
                      <div className="flex items-center text-[#2E7D32]">
                        <CheckCircle2 className="mr-1 h-5 w-5" />
                        <span className="text-sm">Uploaded</span>
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center space-x-1"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            documents: { ...prev.documents, studentId: true },
                          }))
                        }
                      >
                        <Upload className="mr-1 h-4 w-4" />
                        <span>Upload</span>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-[#757575]" />
                    <div>
                      <h4 className="font-medium">School Fees Payment Receipt</h4>
                      <p className="text-sm text-[#757575]">Proof of payment for current session</p>
                    </div>
                  </div>
                  <div>
                    {formData.documents.paymentReceipt ? (
                      <div className="flex items-center text-[#2E7D32]">
                        <CheckCircle2 className="mr-1 h-5 w-5" />
                        <span className="text-sm">Uploaded</span>
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center space-x-1"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            documents: { ...prev.documents, paymentReceipt: true },
                          }))
                        }
                      >
                        <Upload className="mr-1 h-4 w-4" />
                        <span>Upload</span>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-[#757575]" />
                    <div>
                      <h4 className="font-medium">Medical Clearance Form</h4>
                      <p className="text-sm text-[#757575]">Completed medical form from the school clinic</p>
                    </div>
                  </div>
                  <div>
                    {formData.documents.medicalForm ? (
                      <div className="flex items-center text-[#2E7D32]">
                        <CheckCircle2 className="mr-1 h-5 w-5" />
                        <span className="text-sm">Uploaded</span>
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center space-x-1"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            documents: { ...prev.documents, medicalForm: true },
                          }))
                        }
                      >
                        <Upload className="mr-1 h-4 w-4" />
                        <span>Upload</span>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case 4:
        return (
          <div className="space-y-6">
            <div className="rounded-lg border p-6">
              <div className="mb-4 flex items-center">
                <CreditCard className="mr-3 h-6 w-6 text-[#006400]" />
                <h3 className="font-heading text-lg font-medium text-[#001F3F]">Payment Information</h3>
              </div>
              <p className="mb-4 text-[#424242]">
                Please select your preferred payment method for the accommodation fee of {room.price}.
              </p>
              <div className="space-y-4">
                <RadioGroup
                  value={formData.paymentMethod}
                  onValueChange={(value) => updateFormData("paymentMethod", value)}
                  className="flex flex-col space-y-3"
                >
                  <div className="flex items-start space-x-3 rounded-lg border p-4">
                    <RadioGroupItem value="bank-transfer" id="bank-transfer" className="mt-1" />
                    <div>
                      <Label htmlFor="bank-transfer" className="text-base font-medium">
                        Bank Transfer
                      </Label>
                      <p className="text-sm text-[#757575]">
                        Make a direct transfer to the school account and upload proof of payment
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 rounded-lg border p-4">
                    <RadioGroupItem value="online-payment" id="online-payment" className="mt-1" />
                    <div>
                      <Label htmlFor="online-payment" className="text-base font-medium">
                        Online Payment
                      </Label>
                      <p className="text-sm text-[#757575]">
                        Pay securely online using your debit/credit card or bank account
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 rounded-lg border p-4">
                    <RadioGroupItem value="bursary" id="bursary" className="mt-1" />
                    <div>
                      <Label htmlFor="bursary" className="text-base font-medium">
                        Pay at Bursary
                      </Label>
                      <p className="text-sm text-[#757575]">Make payment at the school bursary and obtain a receipt</p>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="rounded-lg border p-6">
              <h3 className="mb-4 font-heading text-lg font-medium text-[#001F3F]">Payment Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-[#757575]">Room Type:</span>
                  <span>{room.type} Room</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#757575]">Accommodation Fee:</span>
                  <span>{room.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#757575]">Maintenance Fee:</span>
                  <span>₦5,000</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total Amount:</span>
                  <span className="text-[#006400]">
                    {room.price.replace("₦", "") === "50,000"
                      ? "₦55,000"
                      : room.price.replace("₦", "") === "80,000"
                        ? "₦85,000"
                        : "₦125,000"}
                  </span>
                </div>
              </div>
            </div>

            <Alert className="bg-yellow-50 border-yellow-200">
              <AlertDescription className="text-yellow-800">
                Payment must be completed within 48 hours of application approval to secure your room allocation.
              </AlertDescription>
            </Alert>
          </div>
        )
      case 5:
        return (
          <div className="space-y-6">
            <div className="rounded-lg border p-6">
              <h3 className="mb-4 font-heading text-lg font-medium text-[#001F3F]">Room Details</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-[#757575]">Hostel</p>
                  <p className="font-medium">{hostel.name}</p>
                </div>
                <div>
                  <p className="text-sm text-[#757575]">Room Number</p>
                  <p className="font-medium">{room.id}</p>
                </div>
                <div>
                  <p className="text-sm text-[#757575]">Room Type</p>
                  <p className="font-medium">{room.type} Room</p>
                </div>
                <div>
                  <p className="text-sm text-[#757575]">Location</p>
                  <p className="font-medium">
                    Floor {room.floor}, Block {room.block}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#757575]">Price</p>
                  <p className="font-medium">{room.price}</p>
                </div>
                <div>
                  <p className="text-sm text-[#757575]">Capacity</p>
                  <p className="font-medium">
                    {room.capacity} {room.capacity === 1 ? "student" : "students"}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-6">
              <h3 className="mb-4 font-heading text-lg font-medium text-[#001F3F]">Personal Information</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-[#757575]">Full Name</p>
                  <p className="font-medium">
                    {formData.firstName} {formData.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#757575]">Email Address</p>
                  <p className="font-medium">{formData.email || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-sm text-[#757575]">Phone Number</p>
                  <p className="font-medium">{formData.phone || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-sm text-[#757575]">Matriculation Number</p>
                  <p className="font-medium">{formData.matricNumber || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-sm text-[#757575]">Department</p>
                  <p className="font-medium">
                    {formData.department === "computer-science"
                      ? "Computer Science"
                      : formData.department === "electrical-engineering"
                        ? "Electrical Engineering"
                        : formData.department === "mechanical-engineering"
                          ? "Mechanical Engineering"
                          : formData.department === "civil-engineering"
                            ? "Civil Engineering"
                            : formData.department === "business-admin"
                              ? "Business Administration"
                              : "Not selected"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#757575]">Level</p>
                  <p className="font-medium">{formData.level ? `${formData.level} Level` : "Not selected"}</p>
                </div>
                <div>
                  <p className="text-sm text-[#757575]">Gender</p>
                  <p className="font-medium">
                    {formData.gender === "male" ? "Male" : formData.gender === "female" ? "Female" : "Not selected"}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-6">
              <h3 className="mb-4 font-heading text-lg font-medium text-[#001F3F]">Documents</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <CheckCircle2
                    className={`mr-2 h-5 w-5 ${formData.documents.studentId ? "text-[#2E7D32]" : "text-[#E0E0E0]"}`}
                  />
                  <p className={formData.documents.studentId ? "font-medium" : "text-[#757575]"}>Student ID Card</p>
                </div>
                <div className="flex items-center">
                  <CheckCircle2
                    className={`mr-2 h-5 w-5 ${
                      formData.documents.paymentReceipt ? "text-[#2E7D32]" : "text-[#E0E0E0]"
                    }`}
                  />
                  <p className={formData.documents.paymentReceipt ? "font-medium" : "text-[#757575]"}>
                    School Fees Payment Receipt
                  </p>
                </div>
                <div className="flex items-center">
                  <CheckCircle2
                    className={`mr-2 h-5 w-5 ${formData.documents.medicalForm ? "text-[#2E7D32]" : "text-[#E0E0E0]"}`}
                  />
                  <p className={formData.documents.medicalForm ? "font-medium" : "text-[#757575]"}>
                    Medical Clearance Form
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-6">
              <h3 className="mb-4 font-heading text-lg font-medium text-[#001F3F]">Payment Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-[#757575]">Payment Method:</span>
                  <span>
                    {formData.paymentMethod === "bank-transfer"
                      ? "Bank Transfer"
                      : formData.paymentMethod === "online-payment"
                        ? "Online Payment"
                        : formData.paymentMethod === "bursary"
                          ? "Pay at Bursary"
                          : "Not selected"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#757575]">Total Amount:</span>
                  <span className="font-medium text-[#006400]">
                    {room.price.replace("₦", "") === "50,000"
                      ? "₦55,000"
                      : room.price.replace("₦", "") === "80,000"
                        ? "₦85,000"
                        : "₦125,000"}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-6">
              <div className="flex items-start space-x-3">
                <div className="flex h-5 items-center">
                  <Checkbox
                    id="terms"
                    checked={formData.termsAccepted}
                    onCheckedChange={(checked) => updateFormData("termsAccepted", checked)}
                  />
                </div>
                <div className="text-sm">
                  <label htmlFor="terms" className="font-medium text-gray-900">
                    Terms and Conditions
                  </label>
                  <p className="text-[#757575]">
                    I confirm that all the information provided is accurate and complete. I understand that providing
                    false information may result in the cancellation of my application and/or accommodation. I agree to
                    abide by the hostel rules and regulations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] pb-16 pt-8">
      <div className="mx-auto max-w-3xl px-4">
        <div className="mb-8 text-center">
          <h1 className="font-heading text-3xl font-bold text-[#001F3F] md:text-4xl">Room Application</h1>
          <p className="mt-2 text-[#757575]">
            Complete the form below to apply for Room {room.id} in {hostel.name}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="mb-2 flex justify-between text-sm">
            <span>Application Progress</span>
            <span>{Math.round((currentStep / steps.length) * 100)}%</span>
          </div>
          <Progress value={(currentStep / steps.length) * 100} className="h-2 bg-[#E0E0E0]" />
        </div>

        {/* Steps */}
        <div className="mb-8 hidden md:block">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                    currentStep >= step.id
                      ? "border-[#006400] bg-[#006400] text-white"
                      : "border-[#E0E0E0] bg-white text-[#757575]"
                  }`}
                >
                  {currentStep > step.id ? <CheckCircle2 className="h-6 w-6" /> : <span>{step.id}</span>}
                </div>
                <div className={`ml-2 ${currentStep >= step.id ? "text-[#001F3F]" : "text-[#757575]"}`}>
                  {step.name}
                </div>
                {index < steps.length - 1 && (
                  <div className={`mx-2 h-0.5 w-16 ${currentStep > step.id ? "bg-[#006400]" : "bg-[#E0E0E0]"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Current Step Title (Mobile) */}
        <div className="mb-4 md:hidden">
          <div className="flex items-center">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#006400] bg-[#006400] text-white`}
            >
              <span>{currentStep}</span>
            </div>
            <div className="ml-2 font-heading font-medium text-[#001F3F]">{steps[currentStep - 1].name}</div>
          </div>
        </div>

        {/* Form Card */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-xl text-[#001F3F]">{steps[currentStep - 1].name}</CardTitle>
            <CardDescription>
              {currentStep === 1 && "Review the details of the room you are applying for"}
              {currentStep === 2 && "Please provide your personal information"}
              {currentStep === 3 && "Upload the required documents for your application"}
              {currentStep === 4 && "Select your payment method and review the payment details"}
              {currentStep === 5 && "Review your application details before submission"}
            </CardDescription>
          </CardHeader>
          <CardContent>{renderStepContent()}</CardContent>
          <CardFooter className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:space-y-0">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === 1} className="w-full sm:w-auto">
              Previous
            </Button>
            <div className="flex w-full flex-col space-y-4 sm:w-auto sm:flex-row sm:space-x-4 sm:space-y-0">
              {currentStep < steps.length ? (
                <Button onClick={nextStep} className="w-full bg-[#006400] hover:bg-[#006400]/90 sm:w-auto">
                  Next Step
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!formData.termsAccepted}
                  className="w-full bg-[#006400] hover:bg-[#006400]/90 sm:w-auto"
                >
                  Submit Application
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
