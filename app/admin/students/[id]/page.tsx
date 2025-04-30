"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import AdminLayout from "@/components/admin/layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Calendar, Download, Edit, FileText, Home, Mail, MapPin, Phone, User } from "lucide-react"

// Mock student data
const getStudentData = (id: string) => {
  return {
    id: id,
    name: "John Doe",
    matricNumber: "YCT/2023/0001",
    avatar: "/placeholder.svg?height=128&width=128",
    email: "john.doe@student.yabatech.edu.ng",
    phone: "+234 812 345 6789",
    department: "Computer Science",
    faculty: "School of Technology",
    level: "300 Level",
    gender: "Male",
    dateOfBirth: "1998-03-15",
    address: "23 University Road, Lagos",
    stateOfOrigin: "Lagos",
    nationality: "Nigerian",
    admissionYear: "2023",
    expectedGraduationYear: "2026",
    guardianInfo: {
      name: "Robert Doe",
      relationship: "Father",
      phone: "+234 802 123 4567",
      email: "robert.doe@example.com",
      address: "23 University Road, Lagos",
    },
    hostelAllocation: {
      hostel: "Bakassi Hall",
      hostelId: "1",
      roomNumber: "B105",
      roomType: "Standard",
      dateAllocated: "Mar 15, 2025",
      expiryDate: "Jul 31, 2025",
      status: "active",
    },
    academicInfo: {
      program: "B.Sc. Computer Science",
      cgpa: 3.8,
      academicStatus: "Good Standing",
      scholarshipStatus: "None",
      advisor: "Dr. James Wilson",
    },
    paymentHistory: [
      {
        id: "PAY-2025-001",
        description: "Hostel Fee - Bakassi Hall (Standard)",
        amount: "₦50,000",
        date: "Mar 15, 2025",
        status: "paid",
        reference: "HF-BAK-001-2025",
      },
      {
        id: "PAY-2025-002",
        description: "Tuition Fee - 2025 Academic Year",
        amount: "₦150,000",
        date: "Feb 10, 2025",
        status: "paid",
        reference: "TF-CS-001-2025",
      },
      {
        id: "PAY-2024-003",
        description: "Library Fee - 2025 Academic Year",
        amount: "₦5,000",
        date: "Feb 10, 2025",
        status: "paid",
        reference: "LF-001-2025",
      },
    ],
    applications: [
      {
        id: "APP-2025-001",
        type: "Hostel Application",
        hostel: "Bakassi Hall",
        roomType: "Standard",
        dateApplied: "Mar 10, 2025",
        status: "approved",
      },
      {
        id: "APP-2024-002",
        type: "Scholarship Application",
        scholarship: "Merit Scholarship",
        dateApplied: "Jan 15, 2025",
        status: "pending",
      },
    ],
    documents: [
      {
        name: "Student ID Card",
        type: "image/jpeg",
        size: "1.2 MB",
        uploadDate: "Mar 5, 2025",
        url: "#",
      },
      {
        name: "Admission Letter",
        type: "application/pdf",
        size: "245 KB",
        uploadDate: "Feb 20, 2023",
        url: "#",
      },
      {
        name: "Medical Certificate",
        type: "application/pdf",
        size: "380 KB",
        uploadDate: "Mar 1, 2023",
        url: "#",
      },
    ],
  }
}

export default function StudentDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [currentTime] = useState(new Date())
  const student = getStudentData(params.id)

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

  // Status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
      case "paid":
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-amber-100 text-amber-800"
      case "rejected":
      case "unpaid":
      case "expired":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <AdminLayout title="Student Profile" date={formatHeaderDate(currentTime)}>
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center text-sm text-gray-500">
        <Link href="/admin/students" className="flex items-center hover:text-gray-900">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Students
        </Link>
      </div>

      {/* Student Header */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center">
          <Avatar className="mr-4 h-16 w-16 border-4 border-white shadow-md">
            <AvatarImage src={student.avatar} alt={student.name} />
            <AvatarFallback className="text-2xl">{student.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{student.name}</h1>
            <div className="flex items-center text-sm text-gray-500">
              <span className="mr-2">{student.matricNumber}</span>
              <Badge variant="outline">{student.level}</Badge>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline">
            <Mail className="mr-2 h-4 w-4" />
            Contact
          </Button>
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
          <Button className="bg-[#006400] hover:bg-[#006400]/90">
            <Home className="mr-2 h-4 w-4" />
            Manage Allocation
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column - Student Information */}
        <div className="lg:col-span-1">
          <Card className="mb-6 border-none shadow-md">
            <CardHeader className="pb-2">
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start">
                  <Mail className="mr-3 h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="text-sm">{student.email}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="mr-3 h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <p className="text-sm">{student.phone}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <User className="mr-3 h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Gender</p>
                    <p className="text-sm">{student.gender}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="mr-3 h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Date of Birth</p>
                    <p className="text-sm">{student.dateOfBirth}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="mr-3 h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Address</p>
                    <p className="text-sm">{student.address}</p>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-3">
                <div className="flex items-start">
                  <User className="mr-3 h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">State of Origin</p>
                    <p className="text-sm">{student.stateOfOrigin}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <User className="mr-3 h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Nationality</p>
                    <p className="text-sm">{student.nationality}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6 border-none shadow-md">
            <CardHeader className="pb-2">
              <CardTitle>Academic Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start">
                  <FileText className="mr-3 h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Program</p>
                    <p className="text-sm">{student.academicInfo.program}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FileText className="mr-3 h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Department</p>
                    <p className="text-sm">{student.department}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FileText className="mr-3 h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Faculty</p>
                    <p className="text-sm">{student.faculty}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FileText className="mr-3 h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">CGPA</p>
                    <p className="text-sm">{student.academicInfo.cgpa}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FileText className="mr-3 h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Academic Status</p>
                    <p className="text-sm">{student.academicInfo.academicStatus}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="mr-3 h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Admission Year</p>
                    <p className="text-sm">{student.admissionYear}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="mr-3 h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Expected Graduation</p>
                    <p className="text-sm">{student.expectedGraduationYear}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader className="pb-2">
              <CardTitle>Guardian Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start">
                  <User className="mr-3 h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Name</p>
                    <p className="text-sm">{student.guardianInfo.name}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <User className="mr-3 h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Relationship</p>
                    <p className="text-sm">{student.guardianInfo.relationship}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="mr-3 h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <p className="text-sm">{student.guardianInfo.phone}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="mr-3 h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="text-sm">{student.guardianInfo.email}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="mr-3 h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Address</p>
                    <p className="text-sm">{student.guardianInfo.address}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Tabs */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="hostel" className="w-full">
            <TabsList className="mb-4 grid w-full grid-cols-4">
              <TabsTrigger value="hostel">Hostel</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            {/* Hostel Tab */}
            <TabsContent value="hostel">
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle>Hostel Allocation</CardTitle>
                  <CardDescription>Current hostel allocation details</CardDescription>
                </CardHeader>
                <CardContent>
                  {student.hostelAllocation ? (
                    <div>
                      <div className="mb-6 rounded-lg bg-gray-50 p-4">
                        <div className="mb-4 flex items-center justify-between">
                          <h3 className="text-lg font-semibold">{student.hostelAllocation.hostel}</h3>
                          <Badge className={getStatusColor(student.hostelAllocation.status)}>
                            {student.hostelAllocation.status.charAt(0).toUpperCase() +
                              student.hostelAllocation.status.slice(1)}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500">Room Number</p>
                            <p className="text-lg font-semibold">{student.hostelAllocation.roomNumber}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500">Room Type</p>
                            <p>{student.hostelAllocation.roomType}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500">Date Allocated</p>
                            <p>{student.hostelAllocation.dateAllocated}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500">Expiry Date</p>
                            <p>{student.hostelAllocation.expiryDate}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <Button
                          variant="outline"
                          onClick={() => router.push(`/admin/hostels/${student.hostelAllocation.hostelId}`)}
                        >
                          View Hostel Details
                        </Button>
                        <div className="flex gap-2">
                          <Button variant="outline">
                            <Edit className="mr-2 h-4 w-4" />
                            Change Room
                          </Button>
                          <Button
                            variant="outline"
                            className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                          >
                            Cancel Allocation
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-md border border-dashed border-gray-300 p-8 text-center">
                      <h3 className="mb-2 text-lg font-medium">No Hostel Allocated</h3>
                      <p className="mb-4 text-sm text-gray-500">
                        This student has not been allocated a hostel room yet.
                      </p>
                      <Button className="bg-[#006400] hover:bg-[#006400]/90">
                        <Home className="mr-2 h-4 w-4" />
                        Allocate Room
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Payments Tab */}
            <TabsContent value="payments">
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle>Payment History</CardTitle>
                  <CardDescription>Record of all payments made by the student</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Reference</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {student.paymentHistory.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">{payment.id}</TableCell>
                          <TableCell>{payment.description}</TableCell>
                          <TableCell>{payment.amount}</TableCell>
                          <TableCell>{payment.date}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(payment.status)}>
                              {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>{payment.reference}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export History
                  </Button>
                  <Button className="bg-[#006400] hover:bg-[#006400]/90">Record New Payment</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Applications Tab */}
            <TabsContent value="applications">
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle>Applications</CardTitle>
                  <CardDescription>Applications submitted by the student</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Details</TableHead>
                        <TableHead>Date Applied</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {student.applications.map((application) => (
                        <TableRow key={application.id}>
                          <TableCell className="font-medium">{application.id}</TableCell>
                          <TableCell>{application.type}</TableCell>
                          <TableCell>
                            {application.hostel
                              ? `${application.hostel} (${application.roomType})`
                              : application.scholarship}
                          </TableCell>
                          <TableCell>{application.dateApplied}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(application.status)}>
                              {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => router.push(`/admin/applications/${application.id}`)}
                            >
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents">
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle>Documents</CardTitle>
                  <CardDescription>Student documents and records</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {student.documents.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg border border-gray-200 p-4"
                      >
                        <div className="flex items-center">
                          <div className="mr-4 rounded-md bg-blue-50 p-2">
                            <FileText className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">{doc.name}</h4>
                            <div className="flex items-center text-xs text-gray-500">
                              <span>{doc.type}</span>
                              <span className="mx-2">•</span>
                              <span>{doc.size}</span>
                              <span className="mx-2">•</span>
                              <span>Uploaded on {doc.uploadDate}</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Upload New Document</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AdminLayout>
  )
}
