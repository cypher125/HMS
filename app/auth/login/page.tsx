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
import { AlertCircle } from "lucide-react"

interface LoginFormValues {
  email: string
  password: string
}

export default function LoginPage() {
  const { login, isLoading, isAuthenticated } = useAuth()
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const router = useRouter()
  
  // Get the callback URL if any
  const callbackUrl = searchParams.get('callbackUrl') || '/student/dashboard'
  
  // Redirect if user is already authenticated
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.push(callbackUrl)
    }
  }, [isAuthenticated, isLoading, router, callbackUrl])
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>()

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setError(null)
      await login(data.email, data.password)
      // After successful login, the auth context will handle the redirect
    } catch (err: any) {
      setError(err.message || "Login failed. Please check your credentials.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12" suppressHydrationWarning>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center mb-6">
            <Image
              src="/logoyct.png"
              alt="YabaTech Logo"
              width={80}
              height={80}
              className="rounded-full"
            />
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 flex items-center">
              <AlertCircle className="h-4 w-4 mr-2" />
              <p className="text-sm">{error}</p>
            </div>
          )}
          
          {searchParams.get('callbackUrl') && (
            <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded mb-4 text-sm">
              Please log in to access the requested page
            </div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Your email address"
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Please enter a valid email address"
                  }
                })}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
                  </div>
            
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                <Link href="/auth/forgot-password" className="text-sm text-green-700 hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                      <Input
                        id="password"
                type="password"
                placeholder="••••••••"
                {...register("password", { required: "Password is required" })}
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
                    </div>
            
                  <Button type="submit" className="w-full bg-[#006400] hover:bg-[#006400]/90" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link href="/auth/register" className="text-green-700 hover:underline">
              Sign up
                  </Link>
                </div>
              </CardFooter>
            </Card>
    </div>
  )
}
