"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/context/AuthContext"

export default function AdminRootPage() {
  const router = useRouter()
  const { isAuthenticated, isLoading, user } = useAuth()

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated && user?.user_type === 'Admin') {
        router.push('/admin/dashboard')
      } else {
        router.push('/admin/login')
      }
    }
  }, [isAuthenticated, isLoading, router, user])

  // Show a loading state or nothing while redirecting
  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#0F172A]">
      <div className="text-center">
        <div className="mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-[#FFD700] mx-auto"></div>
        <p className="text-white">Redirecting...</p>
      </div>
    </div>
  )
} 