"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import AdminSidebar from "@/components/admin/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Bell, ChevronDown, Menu, Search, Loader2 } from "lucide-react"
import { useAuth } from "@/lib/context/AuthContext"

interface AdminLayoutProps {
  children: React.ReactNode
  title: string
  date?: string
}

export default function AdminLayout({ children, title, date }: AdminLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, logout, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  // Redirect to login if not authenticated as admin
  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.user_type !== 'Admin')) {
      router.push('/admin/login')
    }
  }, [isAuthenticated, isLoading, router, user])

  const handleLogout = () => {
    logout()
    router.push('/admin/login')
  }

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="mx-auto h-10 w-10 animate-spin text-[#0F172A]" />
          <p className="mt-4 text-lg text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Don't render anything if not authenticated as admin
  if (!isAuthenticated || user?.user_type !== 'Admin') {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar isMobileMenuOpen={isMobileMenuOpen} />

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2 md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold">{title}</h1>
              {date && <p className="text-sm text-gray-500">{date}</p>}
            </div>
            <div className="relative ml-4 md:ml-8">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input placeholder="Search..." className="w-full max-w-xs pl-10 md:w-80" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.profile_picture || "/placeholder.svg?height=32&width=32"} alt="Admin" />
                    <AvatarFallback>
                      {user?.username?.substring(0, 2).toUpperCase() || "AD"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden text-sm font-medium md:inline-block">
                    {user?.username || "Admin User"}
                  </span>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/admin/profile')}>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/admin/settings')}>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 md:p-6">
          <div className="md:hidden mb-4">
            <h1 className="text-xl font-bold">{title}</h1>
            {date && <p className="text-sm text-gray-500">{date}</p>}
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
