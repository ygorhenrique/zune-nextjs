"use client"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { SectorStock } from "@/lib/mock-sector-data"

interface SectorStocksTableProps {
  sectorName: string
  stocks: SectorStock[]
  className?: string
}

export function SectorStocksTable({ sectorName, stocks, className }: SectorStocksTableProps) {
  // Safe formatting functions
  const formatNumber = (value: number | undefined, decimals = 2): string => {
    if (value === undefined || value === null) return "N/A"
    return value.toFixed(decimals)
  }

  const formatPercentage = (value: number | undefined, decimals = 2): string => {
    if (value === undefined || value === null) return "N/A"
    return `${value.toFixed(decimals)}%`
  }

  const formatMarketCap = (value: number | undefined): string => {
    if (value === undefined || value === null || isNaN(value)) return "N/A";

    const absValue = Math.abs(value); // Handle negative values if any
    const trillion = 1_000_000_000_000; // 10^12
    const billion = 1_000_000_000;     // 10^9
    const million = 1_000_000;         // 10^6

    if (absValue >= trillion) {
      return `$${(value / trillion).toFixed(1)}T`;
    } else if (absValue >= billion) {
      return `$${(value / billion).toFixed(1)}B`;
    } else if (absValue >= million) {
      return `$${(value / million).toFixed(1)}M`;
    } else {
      return `$${value.toFixed(1)}`; // For values below 1 million, show as dollars
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Top {sectorName} Stocks</CardTitle>
        <CardDescription>Leading companies in the {sectorName.toLowerCase()} sector</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticker</TableHead>
                <TableHead>Company Name</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Change</TableHead>
                <TableHead className="text-right">Dividend Yield</TableHead>
                <TableHead className="text-right hidden md:table-cell">P/E Ratio</TableHead>
                <TableHead className="text-right hidden lg:table-cell">Market Cap</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stocks.map((stock) => (
                <TableRow key={stock.ticker} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                  <TableCell className="font-medium">
                    <Link
                      href={`/stock/${stock.ticker}`}
                      className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                    >
                      {stock.ticker}
                    </Link>
                  </TableCell>
                  <TableCell>{stock.name}</TableCell>
                  <TableCell className="text-right">${formatNumber(stock.price)}</TableCell>
                  <TableCell className={`text-right ${(stock.change || 0) >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {(stock.change || 0) >= 0 ? "+" : ""}
                    {formatNumber(stock.change || 0)} ({formatPercentage(stock.changePercent || 0)})
                  </TableCell>
                  <TableCell className="text-right">{stock.dividendYield ? formatPercentage(stock.dividendYield * 100) : null}</TableCell>
                  <TableCell className="text-right hidden md:table-cell">{formatNumber(stock.peRatio, 1)}</TableCell>
                  <TableCell className="text-right hidden lg:table-cell">{formatMarketCap(stock.marketCap)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
