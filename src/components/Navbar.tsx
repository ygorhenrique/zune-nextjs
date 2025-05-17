"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { Search } from "@/components/search"

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const isDashboard = pathname.startsWith("/dashboard")

  return (
    <nav className={`bg-white shadow-md sticky top-0 z-50 ${isDashboard ? "border-b border-gray-200" : ""}`}>
      <div className={`mx-auto ${isDashboard ? "px-4" : "max-w-6xl px-4 sm:px:6 lg:px-8"}`}>
        <div className={`flex justify-between ${isDashboard ? "h-14" : "h-16"}`}>
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-indigo-600">ZuneMoney</span>
              <span className="ml-2 text-sm text-gray-500">Beta</span>
            </Link>
          </div>

          {/* Search Component - Desktop */}
          <div className="hidden md:flex items-center flex-1 justify-center px-4 max-w-md mx-auto">
            <Search />
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {!isDashboard ? (
              <>
                <Link href="#features" className="text-gray-600 hover:text-indigo-600">
                  Features
                </Link>
                <Link href="https://blog.zune.money/" className="text-gray-600 hover:text-indigo-600">
                  Blog
                </Link>
                <Link href="https://app.zune.money/demo" className="text-gray-600 hover:text-indigo-600">
                  Demo
                </Link>
                <Button asChild className="bg-indigo-600 hover:bg-indigo-700 transition transform hover:scale-105">
                  <Link href="/signup">Sign Up</Link>
                </Button>
                <Link href="/login" className="text-indigo-600 hover:underline">
                  Log In
                </Link>
              </>
            ) : (
              <>
                <Link href="/dashboard" className="text-gray-600 hover:text-indigo-600">
                  Dashboard
                </Link>
                <Link href="/dashboard/settings" className="text-gray-600 hover:text-indigo-600">
                  Settings
                </Link>
                <Link href="/" className="text-indigo-600 hover:underline">
                  Log Out
                </Link>
              </>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 focus:outline-none"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          {/* Search Component - Mobile */}
          <div className="px-4 pt-2 pb-3">
            <Search />
          </div>

          <div className="px-4 pt-2 pb-3 space-y-1">
            {!isDashboard ? (
              <>
                <Link href="#features" className="block text-gray-600 hover:text-indigo-600">
                  Features
                </Link>
                <Link href="https://blog.zune.money/" className="block text-gray-600 hover:text-indigo-600">
                  Blog
                </Link>
                <Link href="https://app.zune.money/demo" className="block text-gray-600 hover:text-indigo-600">
                  Demo
                </Link>
                <Link
                  href="https://app.zune.money/signup"
                  className="block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Sign Up
                </Link>
                <Link href="https://app.zune.money" className="block text-indigo-600 hover:underline">
                  Log In
                </Link>
              </>
            ) : (
              <>
                <Link href="/dashboard" className="block text-gray-600 hover:text-indigo-600">
                  Dashboard
                </Link>
                <Link href="/dashboard/settings" className="block text-gray-600 hover:text-indigo-600">
                  Settings
                </Link>
                <Link href="/" className="block text-indigo-600 hover:underline">
                  Log Out
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
