"use client"

import React from 'react'
import Link from 'next/link'
import { Building2, ArrowRight } from 'lucide-react'
import { useAuth } from '@/lib/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function NoApplicationPage() {
  const { user } = useAuth()

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-200px)] items-center justify-center px-4 py-8">
      <Card className="mx-auto max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
            <Building2 className="h-8 w-8 text-yellow-600" />
          </div>
          <CardTitle className="text-xl font-bold md:text-2xl">No Hostel Application Found</CardTitle>
          <CardDescription className="mt-2 text-base">
            Welcome, {user?.username || 'Student'}! To access your dashboard, you need to apply for hostel accommodation first.
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-4 text-center">
          <p className="mb-6 text-muted-foreground">
            The dashboard displays information about your hostel application, room allocation, and payment status. 
            Without an application, there's no data to show.
          </p>
          
          <div className="mx-auto mb-6 max-w-md rounded-lg bg-blue-50 p-4 text-left">
            <h3 className="mb-2 font-medium text-blue-800">Getting Started:</h3>
            <ol className="ml-5 list-decimal space-y-2 text-sm text-blue-700">
              <li>Browse available hostels and find one that suits your preferences</li>
              <li>Submit your application for your chosen hostel</li>
              <li>Once approved, make your payment to secure your accommodation</li>
              <li>Access your dashboard to track your application and room status</li>
            </ol>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button asChild className="bg-[#006400] hover:bg-[#006400]/90">
            <Link href="/hostels">
              Browse Hostels <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/student/profile">Update Profile</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
} 