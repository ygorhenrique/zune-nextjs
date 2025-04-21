"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-indigo-600">ZuneMoney</span>
              <span className="ml-2 text-sm text-gray-500">Beta</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link href="#features" className="text-gray-600 hover:text-indigo-600">
              Features
            </Link>
            <Link href="https://blog.zune.money/" className="text-gray-600 hover:text-indigo-600">
              Blog
            </Link>
            <Link href="https://app.zune.money/demo" className="text-gray-600 hover:text-indigo-600">
              Demo
            </Link>
            <Button asChild className="bg-indigo-600 hover:bg-indigo-700 transition transform hover:scale-105 text-white">
              <Link href="https://zune.money/signup.html">Sign Up</Link>
            </Button>
            <Link href="https://zune.money/login.html" className="text-indigo-600 hover:underline">
              Log In
            </Link>
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
          <div className="px-4 pt-2 pb-3 space-y-1">
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
          </div>
        </div>
      )}
    </nav>
  )
}
