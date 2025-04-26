"use client"

import { useState } from "react"
import type { DividendPayment } from "@/lib/mock-stock-data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"

interface DividendTableProps {
  dividendHistory: DividendPayment[]
}

export function DividendTable({ dividendHistory }: DividendTableProps) {
  const [sortField, setSortField] = useState<keyof DividendPayment>("paymentDate")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const handleSort = (field: keyof DividendPayment) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const sortedDividends = [...dividendHistory].sort((a, b) => {
    if (sortField === "amount") {
      return sortDirection === "asc" ? a.amount - b.amount : b.amount - a.amount
    } else {
      const valueA = a[sortField]
      const valueB = b[sortField]
      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortDirection === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
      }
      return 0
    }
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">Dividend Payments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleSort("declarationDate")}>
                  Declared Date
                  {sortField === "declarationDate" && (
                    <span className="ml-1 inline-block">
                      {sortDirection === "asc" ? (
                        <ChevronUp className="h-4 w-4 inline" />
                      ) : (
                        <ChevronDown className="h-4 w-4 inline" />
                      )}
                    </span>
                  )}
                </TableHead>
                <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleSort("recordDate")}>
                  Record Date
                  {sortField === "recordDate" && (
                    <span className="ml-1 inline-block">
                      {sortDirection === "asc" ? (
                        <ChevronUp className="h-4 w-4 inline" />
                      ) : (
                        <ChevronDown className="h-4 w-4 inline" />
                      )}
                    </span>
                  )}
                </TableHead>
                <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleSort("paymentDate")}>
                  Payment Date
                  {sortField === "paymentDate" && (
                    <span className="ml-1 inline-block">
                      {sortDirection === "asc" ? (
                        <ChevronUp className="h-4 w-4 inline" />
                      ) : (
                        <ChevronDown className="h-4 w-4 inline" />
                      )}
                    </span>
                  )}
                </TableHead>
                <TableHead className="cursor-pointer hover:bg-gray-50 text-right" onClick={() => handleSort("amount")}>
                  Amount
                  {sortField === "amount" && (
                    <span className="ml-1 inline-block">
                      {sortDirection === "asc" ? (
                        <ChevronUp className="h-4 w-4 inline" />
                      ) : (
                        <ChevronDown className="h-4 w-4 inline" />
                      )}
                    </span>
                  )}
                </TableHead>
                <TableHead>Frequency</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedDividends.map((dividend, index) => (
                <TableRow key={index}>
                  <TableCell>{formatDate(dividend.declarationDate)}</TableCell>
                  <TableCell>{formatDate(dividend.recordDate)}</TableCell>
                  <TableCell>{formatDate(dividend.paymentDate)}</TableCell>
                  <TableCell className="text-right">
                    {dividend.currency} {dividend.amount.toFixed(2)}
                  </TableCell>
                  <TableCell>{dividend.frequency}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
