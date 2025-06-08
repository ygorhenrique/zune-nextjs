"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, AlertTriangle, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

export function DeleteAccountSection() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { toast } = useToast()

  const handleDeleteClick = () => {
    setIsModalOpen(true)
    setPassword("")
    setError("")
  }

  const handleConfirmDelete = async () => {
    if (!password) {
      setError("Password is required to confirm deletion")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate random password failure for demo
      if (Math.random() > 0.6) {
        setError("Incorrect password. Please try again.")
        // Add shake animation class
        const modal = document.querySelector('[role="dialog"]')
        if (modal) {
          modal.classList.add("animate-pulse")
          setTimeout(() => modal.classList.remove("animate-pulse"), 500)
        }
        return
      }

      // Simulate account deletion success
      toast({
        title: "Account Deleted",
        description: "Your account has been deleted. We're sorry to see you go.",
        variant: "destructive",
      })

      // In a real app, this would redirect to login
      setTimeout(() => {
        window.location.href = "/login"
      }, 2000)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete account. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    setPassword("")
    setError("")
  }

  return (
    <>
      <Card className="border-red-200">
        <CardHeader
          className="cursor-pointer hover:bg-red-50 transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <CardTitle className="flex items-center justify-between">
            <span className="text-xl font-bold text-red-600">Delete Account</span>
            {isExpanded ? (
              <ChevronDown className="h-5 w-5 text-red-500 transition-transform" />
            ) : (
              <ChevronRight className="h-5 w-5 text-red-500 transition-transform" />
            )}
          </CardTitle>
          {!isExpanded && <p className="text-red-500 text-sm">Permanently delete your account</p>}
        </CardHeader>

        {isExpanded && (
          <CardContent className="animate-in slide-in-from-top-2 duration-300">
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-4 bg-red-50 rounded-lg border border-red-200">
                <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-red-800">Warning</h4>
                  <p className="text-sm text-red-700 mt-1">
                    This will erase all portfolio data, transactions, and settings. This action cannot be undone.
                  </p>
                </div>
              </div>

              <Button onClick={handleDeleteClick} variant="destructive" className="bg-red-600 hover:bg-red-700">
                Delete My Account
              </Button>
            </div>
          </CardContent>
        )}
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md animate-in fade-in-0 zoom-in-95 duration-300">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-red-600 flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5" />
              <span>Confirm Account Deletion</span>
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Are you sure you want to delete your account? This action is irreversible and will remove all your data.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="deletePassword">Enter your password to confirm</Label>
              <div className="relative">
                <Input
                  id="deletePassword"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    if (error) setError("")
                  }}
                  className={error ? "border-red-500" : ""}
                  placeholder="Enter your password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
          </div>

          <DialogFooter className="flex space-x-2">
            <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Deleting...
                </>
              ) : (
                "Confirm Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
