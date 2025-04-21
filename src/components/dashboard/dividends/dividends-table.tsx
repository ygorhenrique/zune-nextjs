"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Dividend } from "@/lib/mock-dividends-data"
import { DividendDetailsModal } from "@/components/dashboard/dividends/dividend-details-modal"

interface DividendsTableProps {
  dividends: Dividend[]
}

type SortField = "date" | "asset" | "amount" | "shares" | "dividendPerShare"
type SortDirection = "asc" | "desc"

export function DividendsTable({ dividends }: DividendsTableProps) {
  const [sortField, setSortField] = useState<SortField>("date")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const [selectedDividend, setSelectedDividend] = useState<Dividend | null>(null)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const sortedDividends = [...dividends].sort((a, b) => {
    let comparison = 0

    switch (sortField) {
      case "date":
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime()
        break
      case "asset":
        comparison = a.asset.localeCompare(b.asset)
        break
      case "amount":
        comparison = a.amount - b.amount
        break
      case "shares":
        comparison = a.shares - b.shares
        break
      case "dividendPerShare":
        comparison = a.dividendPerShare - b.dividendPerShare
        break
    }

    return sortDirection === "asc" ? comparison : -comparison
  })

  const handleRowClick = (dividend: Dividend) => {
    setSelectedDividend(dividend)
    setIsDetailsModalOpen(true)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Paid":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Paid
          </Badge>
        )
      case "Pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Pending
          </Badge>
        )
      case "Processing":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Processing
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Card className="mt-6">
      <CardHeader className="pb-2">
        <CardTitle>Dividend History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
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
                <TableHead className="text-right cursor-pointer" onClick={() => handleSort("shares")}>
                  <div className="flex items-center justify-end">
                    Shares
                    {sortField === "shares" &&
                      (sortDirection === "asc" ? (
                        <ArrowUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ArrowDown className="ml-1 h-4 w-4" />
                      ))}
                  </div>
                </TableHead>
                <TableHead className="text-right cursor-pointer" onClick={() => handleSort("dividendPerShare")}>
                  <div className="flex items-center justify-end">
                    Per Share
                    {sortField === "dividendPerShare" &&
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
              {sortedDividends.map((dividend) => (
                <TableRow
                  key={dividend.id}
                  className="cursor-pointer hover:bg-muted/50 animate-in fade-in-50 duration-300"
                  onClick={() => handleRowClick(dividend)}
                >
                  <TableCell>{formatDate(dividend.date)}</TableCell>
                  <TableCell>
                    <div className="font-medium">{dividend.asset}</div>
                    <div className="text-xs text-muted-foreground">{dividend.assetName}</div>
                  </TableCell>
                  <TableCell className="text-right font-medium">€{dividend.amount.toFixed(2)}</TableCell>
                  <TableCell className="text-right">{dividend.shares}</TableCell>
                  <TableCell className="text-right">€{dividend.dividendPerShare.toFixed(4)}</TableCell>
                  <TableCell className="text-right">{getStatusBadge(dividend.status)}</TableCell>
                </TableRow>
              ))}

              {sortedDividends.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No dividends match your filters. Try adjusting your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {selectedDividend && (
        <DividendDetailsModal
          dividend={selectedDividend}
          open={isDetailsModalOpen}
          onOpenChange={setIsDetailsModalOpen}
        />
      )}
    </Card>
  )
}
