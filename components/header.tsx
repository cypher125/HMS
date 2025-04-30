"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/context/AuthContext"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = () => {
    logout()
    setIsMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative h-10 w-10">
            <Image src="/logoyct.png?height=40&width=40" alt="YabaTech Logo" fill className="object-contain" />
          </div>
          <span className="hidden font-heading text-xl font-bold text-[#001F3F] sm:inline-block">YabaTech HMS</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:space-x-6">
          <Link href="/hostels" className="text-[#424242] transition-colors hover:text-[#006400]">
            Hostels
          </Link>
          <Link href="/faq" className="text-[#424242] transition-colors hover:text-[#006400]">
            FAQ
          </Link>
          <Link href="/contact" className="text-[#424242] transition-colors hover:text-[#006400]">
            Contact
          </Link>
        </nav>

        <div className="hidden md:flex md:items-center md:space-x-4">
          {isAuthenticated ? (
            <>
              <Link href={user?.user_type === 'Admin' ? "/admin/dashboard" : "/student/dashboard"}>
                <Button variant="outline" className="border-[#006400] text-[#006400]">
                  <User className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Button onClick={handleLogout} className="bg-[#006400] hover:bg-[#006400]/90">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="outline" className="border-[#006400] text-[#006400]">
                  Login
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="bg-[#006400] hover:bg-[#006400]/90">Register</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="flex items-center md:hidden"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X className="h-6 w-6 text-[#424242]" /> : <Menu className="h-6 w-6 text-[#424242]" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "absolute left-0 right-0 z-20 bg-white px-4 py-5 shadow-md transition-all duration-300 md:hidden",
          isMenuOpen ? "top-16 opacity-100" : "-top-96 opacity-0",
        )}
      >
        <nav className="flex flex-col space-y-4">
          <Link
            href="/hostels"
            className="text-[#424242] transition-colors hover:text-[#006400]"
            onClick={() => setIsMenuOpen(false)}
          >
            Hostels
          </Link>
          <Link
            href="/faq"
            className="text-[#424242] transition-colors hover:text-[#006400]"
            onClick={() => setIsMenuOpen(false)}
          >
            FAQ
          </Link>
          <Link
            href="/contact"
            className="text-[#424242] transition-colors hover:text-[#006400]"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
          <div className="flex flex-col space-y-2 pt-2">
            {isAuthenticated ? (
              <>
                <Link 
                  href={user?.user_type === 'Admin' ? "/admin/dashboard" : "/student/dashboard"} 
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button variant="outline" className="w-full border-[#006400] text-[#006400]">
                    <User className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
                <Button onClick={handleLogout} className="w-full bg-[#006400] hover:bg-[#006400]/90">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-[#006400] text-[#006400]">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/register" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-[#006400] hover:bg-[#006400]/90">Register</Button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
