"use client"

import { useState } from "react"
import { RefreshCw } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"

interface AllocationHeaderProps {
  totalValue: number
}

export function AllocationHeader({ totalValue }: AllocationHeaderProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate a refresh
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1500)
  }

  return (
    <div className="flex items-center justify-between mb-6">
      <DashboardHeader heading="Asset Allocation" text="View and analyze your investment distribution" />
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Total Portfolio</p>
          <p className="text-2xl font-bold">€{totalValue.toLocaleString()}</p>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={handleRefresh}
          disabled={isRefreshing}
          aria-label="Refresh allocation data"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
        </Button>
      </div>
    </div>
  )
}
