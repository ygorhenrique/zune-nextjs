"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

export function SignupForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formId] = useState("signup-form")

  // Password strength calculation
  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: "weak", color: "text-red-500" }
    if (password.length < 8) return { strength: "weak", color: "text-red-500" }

    let score = 0
    // Check for length
    if (password.length >= 8) score += 1
    if (password.length >= 12) score += 1

    // Check for different character types
    if (/[A-Z]/.test(password)) score += 1
    if (/[a-z]/.test(password)) score += 1
    if (/[0-9]/.test(password)) score += 1
    if (/[^A-Za-z0-9]/.test(password)) score += 1

    if (score < 3) return { strength: "weak", color: "text-red-500" }
    if (score < 5) return { strength: "medium", color: "text-yellow-500" }
    return { strength: "strong", color: "text-green-500" }
  }

  const passwordStrength = getPasswordStrength(formData.password)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Form validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all required fields.")
      return
    }

    if (!agreeTerms) {
      setError("Please agree to the Terms of Service and Privacy Policy.")
      return
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long.")
      return
    }

    // Clear previous errors
    setError("")
    setIsLoading(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // For demo purposes, simulate a successful signup
      window.location.href = "/dashboard"
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Handle scroll to form when CTA button is clicked
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === `#${formId}`) {
        document.getElementById(formId)?.scrollIntoView({ behavior: "smooth" })
      }
    }

    // Check on initial load
    if (window.location.hash === `#${formId}`) {
      setTimeout(() => {
        document.getElementById(formId)?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    }

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [formId])

  return (
    <form id={formId} onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">{error}</div>}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          className={`${error && !formData.email ? "border-red-500" : ""}`}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            className={`${error && !formData.password ? "border-red-500" : ""}`}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>

        {formData.password && (
          <div className="mt-1 flex items-center space-x-2 text-xs">
            <span>Password strength:</span>
            <span className={passwordStrength.color}>
              {passwordStrength.strength.charAt(0).toUpperCase() + passwordStrength.strength.slice(1)}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="terms" checked={agreeTerms} onCheckedChange={(checked) => setAgreeTerms(checked as boolean)} />
        <Label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I agree to the{" "}
          <Link href="/terms" className="text-indigo-600 hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-indigo-600 hover:underline">
            Privacy Policy
          </Link>
        </Label>
      </div>

      <Button
        type="submit"
        className="w-full bg-yellow-500 text-gray-800 hover:bg-yellow-400 hover:scale-[1.02] transition-all"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating account...
          </>
        ) : (
          "🚀 Sign Up for Free"
        )}
      </Button>

      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="text-indigo-600 hover:underline">
          Log in
        </Link>
      </div>

      <div className="mt-4 flex flex-col items-center justify-center space-y-2 text-xs text-gray-500">
        <div className="flex items-center">
          <CheckCircle2 className="mr-1 h-4 w-4 text-green-500" />
          Secure Sign-Up
        </div>
        <div className="flex items-center">
          <CheckCircle2 className="mr-1 h-4 w-4 text-green-500" />
          No Credit Card Required
        </div>
      </div>
    </form>
  )
}
