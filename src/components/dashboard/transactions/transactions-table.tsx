"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, Download, FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Transaction } from "@/lib/mock-transactions-data"
import { TransactionDetailsModal } from "@/components/dashboard/transactions/transaction-details-modal"

interface TransactionsTableProps {
  transactions: Transaction[]
}

type SortField = "date" | "type" | "asset" | "amount"
type SortDirection = "asc" | "desc"

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>([])
  const [sortField, setSortField] = useState<SortField>("date")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const sortedTransactions = [...transactions].sort((a, b) => {
    let comparison = 0

    switch (sortField) {
      case "date":
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime()
        break
      case "type":
        comparison = a.type.localeCompare(b.type)
        break
      case "asset":
        comparison = a.asset.localeCompare(b.asset)
        break
      case "amount":
        comparison = a.amount - b.amount
        break
    }

    return sortDirection === "asc" ? comparison : -comparison
  })

  const handleSelectAll = () => {
    if (selectedTransactions.length === transactions.length) {
      setSelectedTransactions([])
    } else {
      setSelectedTransactions(transactions.map((t) => t.id))
    }
  }

  const handleSelectTransaction = (id: string) => {
    if (selectedTransactions.includes(id)) {
      setSelectedTransactions(selectedTransactions.filter((t) => t !== id))
    } else {
      setSelectedTransactions([...selectedTransactions, id])
    }
  }

  const handleRowClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setIsDetailsModalOpen(true)
  }

  const handleExportSelected = () => {
    alert(`Exporting ${selectedTransactions.length} transactions`)
    // In a real app, this would trigger a CSV download
  }

  const handleExportAll = () => {
    alert(`Exporting all ${transactions.length} transactions`)
    // In a real app, this would trigger a CSV download
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Completed
          </Badge>
        )
      case "Pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Pending
          </Badge>
        )
      case "Failed":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Failed
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Buy":
        return "text-green-600"
      case "Sell":
        return "text-red-600"
      case "Deposit":
        return "text-blue-600"
      case "Withdrawal":
        return "text-orange-600"
      case "Dividend":
        return "text-purple-600"
      default:
        return ""
    }
  }

  return (
    <Card className="mt-6">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Transaction History</CardTitle>
          <div className="flex items-center gap-2">
            {selectedTransactions.length > 0 && (
              <Button variant="outline" size="sm" onClick={handleExportSelected}>
                <Download className="h-4 w-4 mr-1" />
                Export Selected ({selectedTransactions.length})
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={handleExportAll}>
              <FileText className="h-4 w-4 mr-1" />
              Export All
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]">
                  <Checkbox
                    checked={selectedTransactions.length === transactions.length && transactions.length > 0}
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all transactions"
                  />
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("date")}>
                  <div className="flex items-center">
                    Date
                    {sortField === "date" &&
                      (sortDirection === "asc" ? (
                        <ArrowUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ArrowDown className="ml-1 h-4 w-4" />
                      ))}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("type")}>
                  <div className="flex items-center">
                    Type
                    {sortField === "type" &&
                      (sortDirection === "asc" ? (
                        <ArrowUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ArrowDown className="ml-1 h-4 w-4" />
                      ))}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("asset")}>
                  <div className="flex items-center">
                    Asset
                    {sortField === "asset" &&
                      (sortDirection === "asc" ? (
                        <ArrowUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ArrowDown className="ml-1 h-4 w-4" />
                      ))}
                  </div>
                </TableHead>
                <TableHead className="text-right cursor-pointer" onClick={() => handleSort("amount")}>
                  <div className="flex items-center justify-end">
                    Amount
                    {sortField === "amount" &&
                      (sortDirection === "asc" ? (
                        <ArrowUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ArrowDown className="ml-1 h-4 w-4" />
                      ))}
                  </div>
                </TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedTransactions.map((transaction) => (
                <TableRow
                  key={transaction.id}
                  className="cursor-pointer hover:bg-muted/50 animate-in fade-in-50 duration-300"
                  onClick={() => handleRowClick(transaction)}
                >
                  <TableCell className="w-[40px]" onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={selectedTransactions.includes(transaction.id)}
                      onCheckedChange={() => handleSelectTransaction(transaction.id)}
                      aria-label={`Select transaction ${transaction.id}`}
                    />
                  </TableCell>
                  <TableCell>{formatDate(transaction.date)}</TableCell>
                  <TableCell>
                    <span className={getTypeColor(transaction.type)}>{transaction.type}</span>
                  </TableCell>
                  <TableCell>{transaction.asset}</TableCell>
                  <TableCell className="text-right font-medium">
                    €{Math.abs(transaction.amount).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">{getStatusBadge(transaction.status)}</TableCell>
                </TableRow>
              ))}

              {sortedTransactions.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No transactions match your filters. Try adjusting your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {selectedTransaction && (
        <TransactionDetailsModal
          transaction={selectedTransaction}
          open={isDetailsModalOpen}
          onOpenChange={setIsDetailsModalOpen}
        />
      )}
    </Card>
  )
}
