"use client"

import { FileDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { Transaction } from "@/lib/mock-transactions-data"
import { Badge } from "@/components/ui/badge"

interface TransactionDetailsModalProps {
  transaction: Transaction
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TransactionDetailsModal({ transaction, open, onOpenChange }: TransactionDetailsModalProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString()
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-green-50 text-green-700 border-green-200">Completed</Badge>
      case "Pending":
        return <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>
      case "Failed":
        return <Badge className="bg-red-50 text-red-700 border-red-200">Failed</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const handleDownloadReceipt = () => {
    alert(`Downloading receipt for transaction ${transaction.id}`)
    // In a real app, this would trigger a PDF download
  }

  const getTransactionDescription = () => {
    switch (transaction.type) {
      case "Buy":
        return `Bought ${transaction.quantity} shares of ${transaction.asset} at €${transaction.price}/share`
      case "Sell":
        return `Sold ${transaction.quantity} shares of ${transaction.asset} at €${transaction.price}/share`
      case "Deposit":
        return `Deposited €${Math.abs(transaction.amount)} to your account`
      case "Withdrawal":
        return `Withdrew €${Math.abs(transaction.amount)} from your account`
      case "Dividend":
        return `Received dividend from ${transaction.asset}`
      default:
        return ""
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Transaction Details</DialogTitle>
          <DialogDescription>View detailed information about this transaction.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm font-medium">Transaction ID</div>
            <div className="text-sm">{transaction.id}</div>

            <div className="text-sm font-medium">Date & Time</div>
            <div className="text-sm">{formatDate(transaction.date)}</div>

            <div className="text-sm font-medium">Type</div>
            <div className="text-sm">{transaction.type}</div>

            <div className="text-sm font-medium">Asset</div>
            <div className="text-sm">{transaction.asset}</div>

            <div className="text-sm font-medium">Asset Class</div>
            <div className="text-sm">{transaction.assetClass}</div>

            <div className="text-sm font-medium">Description</div>
            <div className="text-sm">{getTransactionDescription()}</div>

            <div className="text-sm font-medium">Amount</div>
            <div className="text-sm">€{Math.abs(transaction.amount).toLocaleString()}</div>

            {transaction.fees !== undefined && (
              <>
                <div className="text-sm font-medium">Fees</div>
                <div className="text-sm">€{transaction.fees.toLocaleString()}</div>
              </>
            )}

            <div className="text-sm font-medium">Status</div>
            <div className="text-sm">{getStatusBadge(transaction.status)}</div>

            {transaction.notes && (
              <>
                <div className="text-sm font-medium">Notes</div>
                <div className="text-sm">{transaction.notes}</div>
              </>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleDownloadReceipt}>
            <FileDown className="mr-2 h-4 w-4" />
            View Receipt
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
