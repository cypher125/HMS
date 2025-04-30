"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Building2, FileText, Home, LayoutDashboard, LogOut, Settings, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/lib/context/AuthContext"

export default function AdminSidebar({ isMobileMenuOpen }: { isMobileMenuOpen: boolean }) {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const router = useRouter()
  
  const handleLogout = () => {
    logout()
    router.push('/admin/login')
  }

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 flex flex-col bg-[#0F172A] text-white transition-transform duration-300 ease-in-out",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
      )}
    >
      <div className="flex h-16 items-center border-b border-white/10 px-6">
        <Link href="/admin/dashboard" className="flex items-center space-x-2">
          <div className="rounded-md bg-[#FFD700] p-1">
            <Building2 className="h-6 w-6 text-[#0F172A]" />
          </div>
          <span className="font-heading text-lg font-bold">YabaTech HMS</span>
        </Link>
      </div>

      <div className="flex flex-col justify-between h-[calc(100%-4rem)]">
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1 pb-4">
            <p className="px-2 py-1 text-xs uppercase text-white/40">DASHBOARD</p>
            <Link
              href="/admin/dashboard"
              className={cn(
                "flex items-center space-x-2 rounded-lg px-3 py-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white",
                pathname === "/admin/dashboard" && "bg-white/10 text-white",
              )}
            >
              <LayoutDashboard className="h-5 w-5" />
              <span>Overview</span>
            </Link>
            <Link
              href="/admin/applications"
              className={cn(
                "flex items-center space-x-2 rounded-lg px-3 py-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white",
                pathname === "/admin/applications" && "bg-white/10 text-white",
              )}
            >
              <FileText className="h-5 w-5" />
              <span>Applications</span>
            </Link>
            <Link
              href="/admin/hostels"
              className={cn(
                "flex items-center space-x-2 rounded-lg px-3 py-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white",
                pathname === "/admin/hostels" && "bg-white/10 text-white",
              )}
            >
              <Home className="h-5 w-5" />
              <span>Hostels</span>
            </Link>
            <Link
              href="/admin/students"
              className={cn(
                "flex items-center space-x-2 rounded-lg px-3 py-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white",
                pathname === "/admin/students" && "bg-white/10 text-white",
              )}
            >
              <Users className="h-5 w-5" />
              <span>Students</span>
            </Link>
          </div>
        </nav>

        <div className="p-4 space-y-1">
          <Link
            href="/admin/settings"
            className={cn(
              "flex items-center space-x-2 rounded-lg px-3 py-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white",
              pathname === "/admin/settings" && "bg-white/10 text-white",
            )}
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>
          <button 
            onClick={handleLogout}
            className="flex w-full items-center space-x-2 rounded-lg px-3 py-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10 border-2 border-white/20">
              <AvatarImage src={user?.profile_picture || "/placeholder.svg?height=40&width=40"} alt="Admin" />
              <AvatarFallback className="bg-[#FFD700] text-[#0F172A]">
                {user?.username?.substring(0, 2).toUpperCase() || "AD"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{user?.username || "Admin User"}</p>
              <p className="text-xs text-white/60">{user?.email || "admin@yabatech.edu.ng"}</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
} 