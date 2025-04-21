"use client"

import { useState } from "react"
import { RefreshCw, FileDown } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { PerformanceAlertsModal } from "@/components/dashboard/performance/performance-alerts-modal"

interface PerformanceHeaderProps {
  totalReturn: number
}

export function PerformanceHeader({ totalReturn }: PerformanceHeaderProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [isAlertsModalOpen, setIsAlertsModalOpen] = useState(false)

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
      alert("Performance report exported successfully!")
    }, 1500)
  }

  return (
    <div className="flex items-center justify-between mb-6">
      <DashboardHeader
        heading="Performance"
        text={
          <span>
            Total Return:{" "}
            <span className={totalReturn >= 0 ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
              {totalReturn >= 0 ? "+" : ""}
              {totalReturn.toFixed(2)}%
            </span>
          </span>
        }
      />
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={handleExport} disabled={isExporting} className="hidden sm:flex">
          <FileDown className="h-4 w-4 mr-2" />
          {isExporting ? "Exporting..." : "Export Report"}
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleRefresh}
          disabled={isRefreshing}
          aria-label="Refresh performance data"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
        </Button>
      </div>

      <PerformanceAlertsModal open={isAlertsModalOpen} onOpenChange={setIsAlertsModalOpen} />
    </div>
  )
}
