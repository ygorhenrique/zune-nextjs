"use client"

import { useState } from "react"
import { RefreshCw, Plus } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { AddTransactionModal } from "@/components/dashboard/transactions/add-transaction-modal"

interface TransactionsHeaderProps {
  totalTransactions: number
}

export function TransactionsHeader({ totalTransactions }: TransactionsHeaderProps) {
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
      <DashboardHeader
        heading="Transactions"
        text={`View and manage your investment transactions (${totalTransactions} total)`}
      />
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={handleRefresh}
          disabled={isRefreshing}
          aria-label="Refresh transactions"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
        </Button>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Transaction
        </Button>
      </div>

      <AddTransactionModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} />
    </div>
  )
}
