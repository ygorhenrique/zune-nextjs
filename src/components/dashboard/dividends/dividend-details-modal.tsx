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
import type { Dividend } from "@/lib/mock-dividends-data"
import { Badge } from "@/components/ui/badge"

interface DividendDetailsModalProps {
  dividend: Dividend
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DividendDetailsModal({ dividend, open, onOpenChange }: DividendDetailsModalProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString()
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Paid":
        return <Badge className="bg-green-50 text-green-700 border-green-200">Paid</Badge>
      case "Pending":
        return <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>
      case "Processing":
        return <Badge className="bg-blue-50 text-blue-700 border-blue-200">Processing</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const handleDownloadStatement = () => {
    alert(`Downloading statement for dividend ${dividend.id}`)
    // In a real app, this would trigger a PDF download
  }

  const getPaymentNote = () => {
    if (dividend.status === "Pending") {
      const paymentDate = new Date(dividend.date)
      return `This dividend is scheduled to be paid on ${paymentDate.toLocaleDateString()}.`
    }
    return null
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Dividend Details</DialogTitle>
          <DialogDescription>View detailed information about this dividend payment.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm font-medium">Dividend ID</div>
            <div className="text-sm">{dividend.id}</div>

            <div className="text-sm font-medium">Date & Time</div>
            <div className="text-sm">{formatDate(dividend.date)}</div>

            <div className="text-sm font-medium">Asset</div>
            <div className="text-sm">
              {dividend.asset} ({dividend.assetName})
            </div>

            <div className="text-sm font-medium">Amount</div>
            <div className="text-sm">€{dividend.amount.toFixed(2)}</div>

            <div className="text-sm font-medium">Shares</div>
            <div className="text-sm">{dividend.shares}</div>

            <div className="text-sm font-medium">Dividend per Share</div>
            <div className="text-sm">€{dividend.dividendPerShare.toFixed(4)}</div>

            {dividend.taxWithheld !== undefined && (
              <>
                <div className="text-sm font-medium">Tax Withheld</div>
                <div className="text-sm">€{dividend.taxWithheld.toFixed(2)}</div>
              </>
            )}

            <div className="text-sm font-medium">Status</div>
            <div className="text-sm">{getStatusBadge(dividend.status)}</div>

            {dividend.sector && (
              <>
                <div className="text-sm font-medium">Sector</div>
                <div className="text-sm">{dividend.sector}</div>
              </>
            )}

            {dividend.yield && (
              <>
                <div className="text-sm font-medium">Current Yield</div>
                <div className="text-sm">{dividend.yield.toFixed(2)}%</div>
              </>
            )}
          </div>

          {getPaymentNote() && (
            <div className="bg-yellow-50 p-3 rounded-md text-sm text-yellow-800">{getPaymentNote()}</div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleDownloadStatement}>
            <FileDown className="mr-2 h-4 w-4" />
            View Statement
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
