"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { toast } = useToast()

  const passwordStrength = getPasswordStrength(formData.password)

  function getPasswordStrength(password: string): { strength: "weak" | "medium" | "strong"; color: string } {
    if (!password) return { strength: "weak", color: "text-red-500" }
    if (password.length < 8) return { strength: "weak", color: "text-red-500" }
    if (password.length < 12) return { strength: "medium", color: "text-yellow-500" }
    return { strength: "strong", color: "text-green-500" }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all required fields.")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    if (!agreeTerms) {
      setError("Please agree to the terms and conditions.")
      return
    }

    setError("")
    setIsLoading(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // For demo purposes, simulate a successful signup
      toast({
        title: "Account created",
        description: "Your account has been created successfully. Redirecting to login...",
        variant: "default",
      })

      // Redirect to login after a short delay
      setTimeout(() => {
        window.location.href = "/login"
      }, 1500)
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">{error}</div>}

      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="John Doe"
          value={formData.name}
          onChange={handleChange}
          className={`${error && !formData.name ? "border-red-500" : ""}`}
          required
        />
      </div>

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

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`${error && !formData.confirmPassword ? "border-red-500" : ""}`}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
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
        className="w-full bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.02] transition-all"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating account...
          </>
        ) : (
          "Create Account"
        )}
      </Button>

      <div className="mt-4 flex items-center justify-center text-xs text-gray-500">
        <CheckCircle2 className="mr-1 h-4 w-4 text-green-500" />
        Your data is secure and encrypted
      </div>
    </form>
  )
}
