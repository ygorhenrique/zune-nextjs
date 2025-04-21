"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StockDetailsModal } from "@/components/dashboard/stocks/stock-details-modal"
import type { Stock } from "@/lib/mock-stocks-data"

interface StocksTableProps {
  stocks: Stock[]
}

type SortField = "ticker" | "name" | "shares" | "price" | "value" | "gain" | "dayChange"
type SortDirection = "asc" | "desc"

export function StocksTable({ stocks }: StocksTableProps) {
  const [sortField, setSortField] = useState<SortField>("value")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const sortedStocks = [...stocks].sort((a, b) => {
    let comparison = 0

    switch (sortField) {
      case "ticker":
        comparison = a.ticker.localeCompare(b.ticker)
        break
      case "name":
        comparison = a.name.localeCompare(b.name)
        break
      case "shares":
        comparison = a.shares - b.shares
        break
      case "price":
        comparison = a.price - b.price
        break
      case "value":
        comparison = a.value - b.value
        break
      case "gain":
        comparison = a.gainPercent - b.gainPercent
        break
      case "dayChange":
        comparison = a.dayChangePercent - b.dayChangePercent
        break
    }

    return sortDirection === "asc" ? comparison : -comparison
  })

  const handleRowClick = (stock: Stock) => {
    setSelectedStock(stock)
    setIsDetailsModalOpen(true)
  }

  return (
    <Card className="mt-6">
      <CardHeader className="pb-2">
        <CardTitle>Stock Holdings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="cursor-pointer w-[80px]" onClick={() => handleSort("ticker")}>
                  <div className="flex items-center">
                    Ticker
                    {sortField === "ticker" &&
                      (sortDirection === "asc" ? (
                        <ArrowUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ArrowDown className="ml-1 h-4 w-4" />
                      ))}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                  <div className="flex items-center">
                    Company
                    {sortField === "name" &&
                      (sortDirection === "asc" ? (
                        <ArrowUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ArrowDown className="ml-1 h-4 w-4" />
                      ))}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer text-right" onClick={() => handleSort("shares")}>
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
                <TableHead className="cursor-pointer text-right" onClick={() => handleSort("price")}>
                  <div className="flex items-center justify-end">
                    Price
                    {sortField === "price" &&
                      (sortDirection === "asc" ? (
                        <ArrowUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ArrowDown className="ml-1 h-4 w-4" />
                      ))}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer text-right" onClick={() => handleSort("value")}>
                  <div className="flex items-center justify-end">
                    Value
                    {sortField === "value" &&
                      (sortDirection === "asc" ? (
                        <ArrowUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ArrowDown className="ml-1 h-4 w-4" />
                      ))}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer text-right" onClick={() => handleSort("gain")}>
                  <div className="flex items-center justify-end">
                    Gain/Loss
                    {sortField === "gain" &&
                      (sortDirection === "asc" ? (
                        <ArrowUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ArrowDown className="ml-1 h-4 w-4" />
                      ))}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer text-right" onClick={() => handleSort("dayChange")}>
                  <div className="flex items-center justify-end">
                    1D Change
                    {sortField === "dayChange" &&
                      (sortDirection === "asc" ? (
                        <ArrowUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ArrowDown className="ml-1 h-4 w-4" />
                      ))}
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedStocks.map((stock) => (
                <TableRow
                  key={stock.ticker}
                  className="cursor-pointer hover:bg-muted/50 animate-in fade-in-50 duration-300"
                  onClick={() => handleRowClick(stock)}
                >
                  <TableCell className="font-medium">{stock.ticker}</TableCell>
                  <TableCell>{stock.name}</TableCell>
                  <TableCell className="text-right">{stock.shares}</TableCell>
                  <TableCell className="text-right">€{stock.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">€{stock.value.toLocaleString()}</TableCell>
                  <TableCell className={`text-right ${stock.gain >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {stock.gain >= 0 ? "+" : ""}€{stock.gain.toLocaleString()} ({stock.gain >= 0 ? "+" : ""}
                    {stock.gainPercent.toFixed(2)}%)
                  </TableCell>
                  <TableCell
                    className={`text-right ${stock.dayChangePercent >= 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {stock.dayChangePercent >= 0 ? "+" : ""}
                    {stock.dayChangePercent.toFixed(2)}%
                  </TableCell>
                </TableRow>
              ))}

              {sortedStocks.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No stocks match your filters. Try adjusting your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {selectedStock && (
        <StockDetailsModal stock={selectedStock} open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen} />
      )}
    </Card>
  )
}
