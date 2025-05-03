"use client"

import type React from "react"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setError("Please enter your email address.")
      return
    }

    setError("")
    setIsLoading(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // For demo purposes, simulate a successful submission
      if (email.includes("@")) {
        setIsSubmitted(true)
        toast({
          title: "Reset link sent",
          description: "Check your email for instructions to reset your password.",
          variant: "default",
        })
      } else {
        setError("Please enter a valid email address.")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">{error}</div>}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${error && !email ? "border-red-500" : ""}`}
              required
            />
          </div>

          <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Reset Link"
            )}
          </Button>
        </form>
      ) : (
        <div className="rounded-md bg-green-50 p-4 text-center text-green-800">
          <p>
            We&apos;ve sent a password reset link to <strong>{email}</strong>
          </p>
          <p className="mt-2 text-sm">Please check your email and follow the instructions to reset your password.</p>
          <Button
            onClick={() => {
              setIsSubmitted(false)
              setEmail("")
            }}
            variant="outline"
            className="mt-4"
          >
            Send to a different email
          </Button>
        </div>
      )}
    </>
  )
}
