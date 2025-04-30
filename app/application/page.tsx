"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle2, FileText, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"

const steps = [
  { id: 1, name: "Personal Details" },
  { id: 2, name: "Hostel Preferences" },
  { id: 3, name: "Documents" },
  { id: 4, name: "Review & Submit" },
]

export default function ApplicationPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    level: "",
    gender: "",
    hostelPreference: "",
    roomType: "",
    specialRequirements: "",
    documents: {
      studentId: false,
      paymentReceipt: false,
      medicalForm: false,
    },
    termsAccepted: false,
  })

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
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
    router.push("/dashboard")
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
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
          </div>
        )
      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="hostelPreference">Hostel Preference</Label>
              <Select
                value={formData.hostelPreference}
                onValueChange={(value) => updateFormData("hostelPreference", value)}
              >
                <SelectTrigger id="hostelPreference">
                  <SelectValue placeholder="Select your preferred hostel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bakassi">Bakassi Hall (Male)</SelectItem>
                  <SelectItem value="moremi">Moremi Hall (Female)</SelectItem>
                  <SelectItem value="new-hall">New Hall (Mixed)</SelectItem>
                  <SelectItem value="independence">Independence Hall (Male)</SelectItem>
                  <SelectItem value="unity">Unity Hall (Female)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="roomType">Room Type</Label>
              <RadioGroup
                value={formData.roomType}
                onValueChange={(value) => updateFormData("roomType", value)}
                className="flex flex-col space-y-3"
              >
                <div className="flex items-start space-x-3 rounded-lg border p-4">
                  <RadioGroupItem value="standard" id="standard" className="mt-1" />
                  <div>
                    <Label htmlFor="standard" className="text-base font-medium">
                      Standard Room (4 Students)
                    </Label>
                    <p className="text-sm text-[#757575]">
                      Shared room with basic amenities, communal bathroom and kitchen
                    </p>
                    <p className="mt-1 text-sm font-medium text-[#006400]">₦50,000 per session</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 rounded-lg border p-4">
                  <RadioGroupItem value="premium" id="premium" className="mt-1" />
                  <div>
                    <Label htmlFor="premium" className="text-base font-medium">
                      Premium Room (2 Students)
                    </Label>
                    <p className="text-sm text-[#757575]">
                      Shared room with enhanced amenities, attached bathroom, shared kitchen
                    </p>
                    <p className="mt-1 text-sm font-medium text-[#006400]">₦80,000 per session</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 rounded-lg border p-4">
                  <RadioGroupItem value="deluxe" id="deluxe" className="mt-1" />
                  <div>
                    <Label htmlFor="deluxe" className="text-base font-medium">
                      Deluxe Room (Single)
                    </Label>
                    <p className="text-sm text-[#757575]">
                      Private room with premium amenities, private bathroom, shared kitchen
                    </p>
                    <p className="mt-1 text-sm font-medium text-[#006400]">₦120,000 per session</p>
                  </div>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialRequirements">Special Requirements (Optional)</Label>
              <Textarea
                id="specialRequirements"
                placeholder="Please specify any special requirements or preferences"
                value={formData.specialRequirements}
                onChange={(e) => updateFormData("specialRequirements", e.target.value)}
                className="min-h-[100px]"
              />
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
              <h3 className="mb-4 font-heading text-lg font-medium text-[#001F3F]">Hostel Preferences</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-[#757575]">Preferred Hostel</p>
                  <p className="font-medium">
                    {formData.hostelPreference === "bakassi"
                      ? "Bakassi Hall (Male)"
                      : formData.hostelPreference === "moremi"
                        ? "Moremi Hall (Female)"
                        : formData.hostelPreference === "new-hall"
                          ? "New Hall (Mixed)"
                          : formData.hostelPreference === "independence"
                            ? "Independence Hall (Male)"
                            : formData.hostelPreference === "unity"
                              ? "Unity Hall (Female)"
                              : "Not selected"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#757575]">Room Type</p>
                  <p className="font-medium">
                    {formData.roomType === "standard"
                      ? "Standard Room (4 Students)"
                      : formData.roomType === "premium"
                        ? "Premium Room (2 Students)"
                        : formData.roomType === "deluxe"
                          ? "Deluxe Room (Single)"
                          : "Not selected"}
                  </p>
                </div>
              </div>
              {formData.specialRequirements && (
                <div className="mt-4">
                  <p className="text-sm text-[#757575]">Special Requirements</p>
                  <p className="font-medium">{formData.specialRequirements}</p>
                </div>
              )}
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
              <div className="flex items-start space-x-3">
                <div className="flex h-5 items-center">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={formData.termsAccepted}
                    onChange={(e) => updateFormData("termsAccepted", e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-[#006400] focus:ring-[#006400]"
                  />
                </div>
                <div className="text-sm">
                  <label htmlFor="terms" className="font-medium text-gray-900">
                    Terms and Conditions
                  </label>
                  <p className="text-[#757575]">
                    I confirm that all the information provided is accurate and complete. I understand that providing
                    false information may result in the cancellation of my application and/or accommodation.
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
          <h1 className="font-heading text-3xl font-bold text-[#001F3F] md:text-4xl">Hostel Application</h1>
          <p className="mt-2 text-[#757575]">Complete the form below to apply for hostel accommodation</p>
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
              {currentStep === 1 && "Please provide your personal information"}
              {currentStep === 2 && "Select your preferred hostel and room type"}
              {currentStep === 3 && "Upload the required documents for your application"}
              {currentStep === 4 && "Review your application details before submission"}
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
