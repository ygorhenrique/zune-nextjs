"use client"

import { useState } from "react"
import { RefreshCw, FileDown } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"

interface DividendsHeaderProps {
  totalDividends: number
}

export function DividendsHeader({ totalDividends }: DividendsHeaderProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isExporting, setIsExporting] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate a refresh
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1500)
  }

  const handleExport = () => {
    setIsExporting(true)
    // Simulate export
    setTimeout(() => {
      setIsExporting(false)
      alert("Dividend history exported successfully!")
    }, 1500)
  }

  return (
    <div className="flex items-center justify-between mb-6">
      <DashboardHeader
        heading="Dividends"
        text={`Track and analyze your dividend income (€${totalDividends.toLocaleString()} total)`}
      />
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={handleExport} disabled={isExporting} className="hidden sm:flex">
          <FileDown className="h-4 w-4 mr-2" />
          {isExporting ? "Exporting..." : "Export History"}
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleRefresh}
          disabled={isRefreshing}
          aria-label="Refresh dividends"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
        </Button>
      </div>
    </div>
  )
}
