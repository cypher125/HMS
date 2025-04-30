"use client";

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Building2, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[600px] w-full">
        <Image
          src="/yabatech.jpg?height=600&width=1920"
          alt="YabaTech Campus"
          fill
          className="object-cover brightness-[0.7]"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <h1 className="mb-4 font-heading text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            YabaTech Hostel Management System
          </h1>
          <p className="mb-8 max-w-2xl text-lg text-white/90">
            A modern and efficient way to manage your hostel accommodation needs at Yaba College of Technology
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Button
              size="lg"
              className="bg-[#006400] hover:bg-[#006400]/90 transition-transform hover:scale-105 animate-bounce"
              asChild
            >
              <Link href="/hostels">Apply for Hostel</Link>
            </Button>
            <Button
              size="lg"
              className="bg-white text-[#006400] hover:bg-white/90 transition-transform hover:scale-105"
              asChild
            >
              <Link href="/auth/register">Create Account</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Announcement Banner */}
      <div className="bg-[#FFD700] px-4 py-3 text-center text-[#001F3F]">
        <p className="font-medium">
          <span className="font-bold">Important:</span> Hostel applications for the 2025/2026 session are now open until
          April 30th, 2025
        </p>
      </div>

      {/* Quick Access Section */}
      <section className="bg-[#FFF8E1] px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center font-heading text-3xl font-bold text-[#001F3F] md:text-4xl">Quick Access</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:max-w-4xl lg:mx-auto">
            {[
              {
                title: "Student Login",
                description: "Access your dashboard and application status",
                icon: <Users className="h-10 w-10 text-[#006400]" />,
                link: "/auth/login",
              },
              {
                title: "Browse Hostels",
                description: "Explore available accommodation options",
                icon: <Building2 className="h-10 w-10 text-[#006400]" />,
                link: "/hostels",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center rounded-lg bg-white p-8 text-center shadow-md transition-all duration-300 hover:shadow-lg"
              >
                <div className="mb-4 rounded-full bg-[#F5F5F5] p-4">{item.icon}</div>
                <h3 className="mb-2 font-heading text-xl font-semibold text-[#001F3F]">{item.title}</h3>
                <p className="mb-4 text-[#424242]">{item.description}</p>
                <Link href={item.link} className="mt-auto inline-flex items-center text-[#006400] hover:underline">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="bg-[#001F3F] px-4 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center font-heading text-3xl font-bold md:text-4xl">How It Works</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Register",
                description: "Create an account using your matriculation number",
              },
              {
                step: "02",
                title: "Apply",
                description: "Browse hostels and submit your application",
              },
              {
                step: "03",
                title: "Pay",
                description: "Make payment to confirm your reservation",
              },
              {
                step: "04",
                title: "Move In",
                description: "Get your allocation and move into your new room",
              },
            ].map((item, index) => (
              <div key={index} className="relative rounded-lg bg-white/5 p-6 backdrop-blur-sm">
                <div className="absolute -top-4 left-6 rounded-full bg-[#FFD700] px-3 py-1 text-sm font-bold text-[#001F3F]">
                  {item.step}
                </div>
                <h3 className="mb-2 mt-4 font-heading text-xl font-semibold">{item.title}</h3>
                <p className="text-white/80">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#FFF8E1] px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 font-heading text-3xl font-bold text-[#001F3F] md:text-4xl">
            Ready to Secure Your Accommodation?
          </h2>
          <p className="mb-8 text-lg text-[#424242]">
            Don&apos;t miss out on your preferred hostel. Browse available rooms and secure your spot for the upcoming
            academic session.
          </p>
          <Button size="lg" className="bg-[#006400] hover:bg-[#006400]/90" asChild>
            <Link href="/hostels">Browse Available Hostels</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
