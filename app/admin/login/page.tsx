"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/context/AuthContext"
import { AlertCircle, Building2, ShieldAlert, Mail } from "lucide-react"

interface AdminLoginFormValues {
  email: string
  password: string
}

export default function AdminLoginPage() {
  const { login, isLoading, isAuthenticated, user } = useAuth()
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const router = useRouter()
  
  // Get the callback URL if any
  const callbackUrl = searchParams.get('callbackUrl') || '/admin/dashboard'
  
  // Redirect if user is already authenticated and is an admin
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      if (user?.user_type === 'Admin') {
        router.push(callbackUrl)
      } else if (user) {
        // If the user is authenticated but not an admin, show an error
        setError("You don't have admin privileges. Please log in with an admin account.")
      }
    }
  }, [isAuthenticated, isLoading, router, callbackUrl, user])
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginFormValues>()

  const onSubmit = async (data: AdminLoginFormValues) => {
    try {
      setError(null)
      
      // Call login from auth context
      await login(data.email, data.password)
      
      // Redirect is handled by the useEffect
    } catch (err: any) {
      setError(err.message || "Login failed. Please check your credentials.")
      console.error('Login error:', err)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A] px-4 py-12">
      <Card className="w-full max-w-md border-0 shadow-lg">
        <CardHeader className="space-y-1 text-center bg-[#0F172A] text-white rounded-t-lg">
          <div className="flex justify-center mb-2">
            <div className="rounded-full bg-[#FFD700] p-2">
              <Building2 className="h-8 w-8 text-[#0F172A]" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
          <CardDescription className="text-gray-300">
            Enter your credentials to access the admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 flex items-center">
              <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}
          
          {searchParams.get('callbackUrl') && (
            <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded mb-4 text-sm">
              Please log in to access the requested admin page
            </div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@yabatech.edu.ng"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Please enter a valid email address"
                    } 
                  })}
                  className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                  defaultValue="admin@yabatech.edu.ng"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/admin/forgot-password" className="text-sm text-[#FFD700] hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })}
                className={errors.password ? "border-red-500" : ""}
                defaultValue="adminpassword"
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>
            
            <Button type="submit" className="w-full bg-[#FFD700] text-[#0F172A] hover:bg-[#FFD700]/90 font-bold" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In to Admin Panel"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 border-t pt-4">
          <div className="flex items-center justify-center text-sm">
            <ShieldAlert className="h-4 w-4 mr-2 text-amber-500" />
            <span className="text-gray-600">This area is restricted to authorized personnel only</span>
          </div>
          <div className="text-center text-sm">
            <Link href="/" className="text-[#0F172A] hover:underline">
              Back to Main Site
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
} 