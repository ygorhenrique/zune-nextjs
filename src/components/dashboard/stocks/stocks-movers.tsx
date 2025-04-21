"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StockDetailsModal } from "@/components/dashboard/stocks/stock-details-modal"
import type { Stock } from "@/lib/mock-stocks-data"

interface StocksMoversProps {
  stocks: Stock[]
}

export function StocksMovers({ stocks }: StocksMoversProps) {
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)

  // Get top gainers and losers for the day
  const topGainers = [...stocks].sort((a, b) => b.dayChangePercent - a.dayChangePercent).slice(0, 3)

  const topLosers = [...stocks].sort((a, b) => a.dayChangePercent - b.dayChangePercent).slice(0, 3)

  const handleStockClick = (stock: Stock) => {
    setSelectedStock(stock)
    setIsDetailsModalOpen(true)
  }

  return (
    <Card className="mt-6">
      <CardHeader className="pb-2">
        <CardTitle>Market Movers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium mb-3">Top Gainers</h3>
            <div className="space-y-2">
              {topGainers.map((stock) => (
                <div
                  key={stock.ticker}
                  className="flex items-center justify-between p-2 rounded-md border hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => handleStockClick(stock)}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{stock.ticker}</span>
                    <span className="text-sm text-muted-foreground">{stock.name}</span>
                  </div>
                  <div className="text-green-600 font-medium">+{stock.dayChangePercent.toFixed(2)}%</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-3">Top Losers</h3>
            <div className="space-y-2">
              {topLosers.map((stock) => (
                <div
                  key={stock.ticker}
                  className="flex items-center justify-between p-2 rounded-md border hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => handleStockClick(stock)}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{stock.ticker}</span>
                    <span className="text-sm text-muted-foreground">{stock.name}</span>
                  </div>
                  <div className="text-red-600 font-medium">{stock.dayChangePercent.toFixed(2)}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>

      {selectedStock && (
        <StockDetailsModal stock={selectedStock} open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen} />
      )}
    </Card>
  )
}
