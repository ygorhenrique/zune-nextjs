"use client"

import { useState } from "react"
import { RefreshCw, Plus } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { AddStockModal } from "@/components/dashboard/stocks/add-stock-modal"

interface StocksHeaderProps {
  totalValue: number
}

export function StocksHeader({ totalValue }: StocksHeaderProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate a refresh
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1500)
  }

  return (
    <div className="flex items-center justify-between mb-6">
      <DashboardHeader heading="Stocks" text={`Total Stock Value: €${totalValue.toLocaleString()}`} />
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={handleRefresh}
          disabled={isRefreshing}
          aria-label="Refresh stocks data"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
        </Button>
        <Button id="add-stock-button" onClick={() => setIsAddModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Stock
        </Button>
      </div>

      <AddStockModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} />
    </div>
  )
}
