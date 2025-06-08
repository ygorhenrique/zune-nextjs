"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown, ChevronRight, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export function EditProfileSection() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentName, setCurrentName] = useState("John Doe")
  const [newName, setNewName] = useState("")
  const [error, setError] = useState("")
  const { toast } = useToast()

  const validateName = (name: string) => {
    if (name.length < 2) {
      return "Profile name must be at least 2 characters long"
    }
    return ""
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validationError = validateName(newName)
    if (validationError) {
      setError(validationError)
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Success!",
        description: "Profile name updated successfully!",
        variant: "success",
      })

      setCurrentName(newName)
      setNewName("")
      setIsExpanded(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile name. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setNewName("")
    setError("")
    setIsExpanded(false)
  }

  const handleExpand = () => {
    setIsExpanded(!isExpanded)
    if (!isExpanded) {
      setNewName(currentName)
    }
  }

  return (
    <Card>
      <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors" onClick={handleExpand}>
        <CardTitle className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">Edit Profile Name</span>
          {isExpanded ? (
            <ChevronDown className="h-5 w-5 text-gray-500 transition-transform" />
          ) : (
            <ChevronRight className="h-5 w-5 text-gray-500 transition-transform" />
          )}
        </CardTitle>
        {!isExpanded && (
          <div className="flex items-center space-x-2 text-gray-600">
            <User className="h-4 w-4" />
            <span>{currentName}</span>
          </div>
        )}
      </CardHeader>

      {isExpanded && (
        <CardContent className="animate-in slide-in-from-top-2 duration-300">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="profileName">Profile Name</Label>
              <Input
                id="profileName"
                type="text"
                value={newName}
                onChange={(e) => {
                  setNewName(e.target.value)
                  if (error) setError("")
                }}
                className={error ? "border-red-500" : ""}
                placeholder="e.g., Jane Smith"
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>

            <div className="flex space-x-3 pt-4">
              <Button
                type="submit"
                disabled={isLoading || !newName.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  "Save Name"
                )}
              </Button>
              <Button type="button" variant="outline" onClick={handleCancel} disabled={isLoading}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      )}
    </Card>
  )
}
