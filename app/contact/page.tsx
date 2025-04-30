"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Mail, Clock, Send, Facebook, Twitter, Instagram, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    department: "",
    message: "",
    inquiryType: "general",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user selects
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Required fields
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!formData.subject.trim()) newErrors.subject = "Subject is required"
    if (!formData.message.trim()) newErrors.message = "Message is required"

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)

      // Reset form after submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        department: "",
        message: "",
        inquiryType: "general",
      })
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] pb-16">
      {/* Hero Section */}
      <section className="relative bg-[#001F3F] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 font-heading text-3xl font-bold md:text-4xl">Contact Us</h1>
            <p className="mb-8 text-lg text-white/90">
              Get in touch with our hostel management team for inquiries, support, or feedback
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Contact Information */}
          <div className="md:col-span-1">
            <h2 className="mb-6 font-heading text-2xl font-bold text-[#001F3F]">Contact Information</h2>

            <div className="space-y-6">
              {/* Hostel Management Office */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Hostel Management Office</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="mr-3 h-5 w-5 text-[#006400]" />
                    <p className="text-[#424242]">
                      Administrative Block, Yaba College of Technology, Herbert Macaulay Way, Yaba, Lagos
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Phone className="mr-3 h-5 w-5 text-[#006400]" />
                    <p className="text-[#424242]">+234 812 345 6789</p>
                  </div>
                  <div className="flex items-center">
                    <Mail className="mr-3 h-5 w-5 text-[#006400]" />
                    <p className="text-[#424242]">hostel@yabatech.edu.ng</p>
                  </div>
                  <div className="flex items-start">
                    <Clock className="mr-3 h-5 w-5 text-[#006400]" />
                    <div>
                      <p className="text-[#424242]">Monday - Friday: 8:00 AM - 4:00 PM</p>
                      <p className="text-[#424242]">Saturday: 9:00 AM - 1:00 PM</p>
                      <p className="text-[#424242]">Sunday: Closed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Hall Administrators */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Hall Administrators</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium text-[#001F3F]">Bakassi Hall</p>
                    <p className="text-sm text-[#424242]">Dr. Emmanuel Adebayo</p>
                    <p className="text-sm text-[#424242]">bakassi.admin@yabatech.edu.ng</p>
                  </div>
                  <div>
                    <p className="font-medium text-[#001F3F]">Moremi Hall</p>
                    <p className="text-sm text-[#424242]">Dr. Folashade Ogunleye</p>
                    <p className="text-sm text-[#424242]">moremi.admin@yabatech.edu.ng</p>
                  </div>
                  <div>
                    <p className="font-medium text-[#001F3F]">New Hall</p>
                    <p className="text-sm text-[#424242]">Dr. Samuel Johnson</p>
                    <p className="text-sm text-[#424242]">newhall.admin@yabatech.edu.ng</p>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Connect With Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4">
                    <Link
                      href="#"
                      className="rounded-full bg-[#F5F5F5] p-3 text-[#006400] transition-colors hover:bg-[#006400] hover:text-white"
                    >
                      <Facebook className="h-5 w-5" />
                      <span className="sr-only">Facebook</span>
                    </Link>
                    <Link
                      href="#"
                      className="rounded-full bg-[#F5F5F5] p-3 text-[#006400] transition-colors hover:bg-[#006400] hover:text-white"
                    >
                      <Twitter className="h-5 w-5" />
                      <span className="sr-only">Twitter</span>
                    </Link>
                    <Link
                      href="#"
                      className="rounded-full bg-[#F5F5F5] p-3 text-[#006400] transition-colors hover:bg-[#006400] hover:text-white"
                    >
                      <Instagram className="h-5 w-5" />
                      <span className="sr-only">Instagram</span>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Map */}
              <div className="relative h-64 w-full overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=300&width=500&text=Campus+Map"
                  alt="YabaTech Campus Map"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#001F3F]">
                    View Full Map
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            <h2 className="mb-6 font-heading text-2xl font-bold text-[#001F3F]">Send Us a Message</h2>

            {isSubmitted ? (
              <Card className="border-[#006400]">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F0FFF0]">
                      <Send className="h-8 w-8 text-[#006400]" />
                    </div>
                    <h3 className="mb-2 font-heading text-xl font-bold text-[#001F3F]">Message Sent Successfully!</h3>
                    <p className="mb-6 text-[#424242]">
                      Thank you for contacting us. We have received your message and will respond to you shortly.
                    </p>
                    <Button
                      variant="outline"
                      className="border-[#006400] text-[#006400]"
                      onClick={() => setIsSubmitted(false)}
                    >
                      Send Another Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">
                            Full Name <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={errors.name ? "border-red-500" : ""}
                          />
                          {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">
                            Email Address <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email address"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={errors.email ? "border-red-500" : ""}
                          />
                          {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number (Optional)</Label>
                          <Input
                            id="phone"
                            name="phone"
                            placeholder="Enter your phone number"
                            value={formData.phone}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subject">
                            Subject <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="subject"
                            name="subject"
                            placeholder="Enter message subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            className={errors.subject ? "border-red-500" : ""}
                          />
                          {errors.subject && <p className="text-xs text-red-500">{errors.subject}</p>}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Inquiry Type</Label>
                        <RadioGroup
                          value={formData.inquiryType}
                          onValueChange={(value) => handleSelectChange("inquiryType", value)}
                          className="flex flex-wrap gap-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="general" id="general" />
                            <Label htmlFor="general">General Inquiry</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="application" id="application" />
                            <Label htmlFor="application">Application</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="payment" id="payment" />
                            <Label htmlFor="payment">Payment</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="complaint" id="complaint" />
                            <Label htmlFor="complaint">Complaint</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="feedback" id="feedback" />
                            <Label htmlFor="feedback">Feedback</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="department">Department (Optional)</Label>
                        <Select
                          value={formData.department}
                          onValueChange={(value) => handleSelectChange("department", value)}
                        >
                          <SelectTrigger id="department">
                            <SelectValue placeholder="Select department to contact" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hostel-management">Hostel Management Office</SelectItem>
                            <SelectItem value="bakassi-hall">Bakassi Hall Administration</SelectItem>
                            <SelectItem value="moremi-hall">Moremi Hall Administration</SelectItem>
                            <SelectItem value="new-hall">New Hall Administration</SelectItem>
                            <SelectItem value="bursary">Bursary Department</SelectItem>
                            <SelectItem value="student-affairs">Student Affairs Department</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">
                          Message <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Type your message here..."
                          rows={6}
                          value={formData.message}
                          onChange={handleInputChange}
                          className={errors.message ? "border-red-500" : ""}
                        />
                        {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
                      </div>
                    </div>

                    <Alert className="bg-[#F0FFF0] border-[#006400]">
                      <AlertCircle className="h-4 w-4 text-[#006400]" />
                      <AlertTitle className="text-[#006400]">Response Time</AlertTitle>
                      <AlertDescription className="text-[#424242]">
                        We typically respond to inquiries within 24-48 hours during business days.
                      </AlertDescription>
                    </Alert>

                    <Button type="submit" className="w-full bg-[#006400] hover:bg-[#006400]/90" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-heading text-2xl font-bold text-[#001F3F]">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-[#424242]">
              Find quick answers to common questions about our hostel accommodation system.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                question: "How do I apply for hostel accommodation?",
                answer:
                  "You can apply for hostel accommodation through our online portal. Log in with your matriculation number, complete the application form, and submit it along with the required documents.",
              },
              {
                question: "When is the payment deadline?",
                answer:
                  "Hostel fees must be paid within 48 hours after your application is approved. Failure to pay within this timeframe will result in the cancellation of your allocation.",
              },
              {
                question: "How are rooms allocated?",
                answer:
                  "Rooms are allocated on a first-come, first-served basis after successful payment of hostel fees. Freshers are usually given priority, followed by final year students.",
              },
              {
                question: "Can I choose my roommates?",
                answer:
                  "The system does not currently support roommate selection. However, students from the same department and level are often placed together when possible.",
              },
              {
                question: "What items should I bring to the hostel?",
                answer:
                  "You should bring bedding (sheets, pillows, blankets), toiletries, study materials, a reading lamp, and any personal items you need. The hostel provides the bed frame and mattress, wardrobe, and study desk/chair.",
              },
              {
                question: "How do I report maintenance issues?",
                answer:
                  "Maintenance issues can be reported through your student dashboard or directly to the Hall Administrator's office. Urgent issues should be reported immediately to the hostel security or administrator.",
              },
            ].map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{item.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#424242]">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button className="bg-[#006400] hover:bg-[#006400]/90" asChild>
              <Link href="/faq">View All FAQs</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
