import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Open_Sans } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { AuthProvider } from '@/lib/context/AuthContext'
import { Toaster } from "@/components/ui/toaster"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
})

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
})

export const metadata: Metadata = {
  title: "YabaTech HMS - Hostel Management System",
  description: "A comprehensive hostel management system for YabaTech",
}

// Define paths where main header/footer should be shown
export const mainLayoutPaths = [
  '/',
  '/hostels',
  '/faq',
  '/contact',
  '/auth',
  '/student',
  '/application'
];

// Admin paths that should NOT use the main layout
export const adminPaths = ['/admin'];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${montserrat.variable} ${openSans.variable} font-body`} suppressHydrationWarning={true}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  )
}
