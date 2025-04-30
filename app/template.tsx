"use client"

import { usePathname } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useEffect, useState } from "react"

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  
  // Only render the content client-side to avoid hydration errors
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Don't include header/footer for admin routes
  const isAdminRoute = pathname.startsWith('/admin')
  
  if (isAdminRoute) {
    return <>{children}</>
  }
  
  if (!mounted) {
    return <div suppressHydrationWarning></div>
  }
  
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
} 