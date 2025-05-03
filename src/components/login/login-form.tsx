"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, CheckCircle, Loader2 } from "lucide-react"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [passwordStrength, setPasswordStrength] = useState<"weak" | "medium" | "strong" | null>(null)

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    setError("")
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPassword(value)
    setError("")

    // Simple password strength check
    if (value.length === 0) {
      setPasswordStrength(null)
    } else if (value.length < 8) {
      setPasswordStrength("weak")
    } else if (value.length >= 8 && /[A-Z]/.test(value) && /[0-9]/.test(value)) {
      setPasswordStrength("strong")
    } else {
      setPasswordStrength("medium")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Form validation
    if (!email || !password) {
      setError("Please fill in all required fields.")
      return
    }

    setIsLoading(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // For demo purposes, simulate a failed login
      if (email === "demo@example.com" && password === "password") {
        window.location.href = "/dashboard"
      } else {
        setError("Invalid email or password. Please try again.")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-form-container w-full max-w-md mx-auto opacity-0 animate-fade-in-delayed">
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Log In to Your Account</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={handleEmailChange}
              className="w-full"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={handlePasswordChange}
                className="w-full pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {passwordStrength && (
              <div className="mt-1 flex items-center space-x-2">
                <div className="h-1 flex-1 rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className={`h-full ${
                      passwordStrength === "weak"
                        ? "w-1/3 bg-red-500"
                        : passwordStrength === "medium"
                          ? "w-2/3 bg-yellow-500"
                          : "w-full bg-green-500"
                    }`}
                  />
                </div>
                <span
                  className={`text-xs ${
                    passwordStrength === "weak"
                      ? "text-red-500"
                      : passwordStrength === "medium"
                        ? "text-yellow-500"
                        : "text-green-500"
                  }`}
                >
                  {passwordStrength.charAt(0).toUpperCase() + passwordStrength.slice(1)}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <Label htmlFor="remember" className="text-sm cursor-pointer">
                Remember me
              </Label>
            </div>
            <Link href="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-800 hover:underline">
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition-all hover:scale-[1.02]"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              "Log In"
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            New to ZuneMoney?{" "}
            <Link href="/signup" className="text-indigo-600 hover:text-indigo-800 hover:underline">
              Create an account
            </Link>
          </p>
        </div>

        <div className="mt-4 flex items-center justify-center text-xs text-green-600">
          <CheckCircle size={16} className="mr-1" />
          <span>Secure Login</span>
        </div>
      </div>
    </div>
  )
}
