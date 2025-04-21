"use client"

import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Star, DollarSign, Calendar, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockStocksData } from "@/lib/mock-stocks-data"
import type { Stock } from "@/lib/mock-stocks-data"

interface StockDetailsModalProps {
  stock: Stock
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function StockDetailsModal({ stock, open, onOpenChange }: StockDetailsModalProps) {
  const [isAddingToWatchlist, setIsAddingToWatchlist] = useState(false)
  const [isInWatchlist, setIsInWatchlist] = useState(false)

  const priceHistory = mockStocksData.getPriceHistory(stock.ticker, "1M")
  const stockNews = mockStocksData.getStockNews(stock.ticker)

  const handleAddToWatchlist = () => {
    setIsAddingToWatchlist(true)
    // Simulate adding to watchlist
    setTimeout(() => {
      setIsAddingToWatchlist(false)
      setIsInWatchlist(!isInWatchlist)
      // Show success message
      alert(isInWatchlist ? "Removed from watchlist" : "Added to watchlist")
    }, 1000)
  }

  const handleTrade = () => {
    // In a real app, this would open a trade form
    alert("Trade functionality would be implemented here")
  }

  const handleViewTransactions = () => {
    // In a real app, this would navigate to transactions page with filter
    alert("View Transactions functionality would be implemented here")
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-md shadow-lg border border-gray-200">
          <p className="font-medium">{formatDate(label)}</p>
          <p className="text-sm">
            Price: <span className="font-medium">€{payload[0].value.toFixed(2)}</span>
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-xl">{stock.ticker}</span>
            <span className="text-muted-foreground">{stock.name}</span>
          </DialogTitle>
          <DialogDescription>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-2xl font-bold">€{stock.price.toFixed(2)}</span>
              <span className={`text-sm ${stock.dayChangePercent >= 0 ? "text-green-600" : "text-red-600"}`}>
                {stock.dayChangePercent >= 0 ? "+" : ""}
                {stock.dayChangePercent.toFixed(2)}% today
              </span>
            </div>
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="chart">Chart</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 gap-4 py-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Your Position</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Shares</span>
                    <span className="text-sm font-medium">{stock.shares}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Avg. Cost</span>
                    <span className="text-sm font-medium">€{(stock.costBasis / stock.shares).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Total Cost</span>
                    <span className="text-sm font-medium">€{stock.costBasis.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Market Value</span>
                    <span className="text-sm font-medium">€{stock.value.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Total Return</span>
                    <span className={`text-sm font-medium ${stock.gain >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {stock.gain >= 0 ? "+" : ""}€{stock.gain.toLocaleString()} ({stock.gain >= 0 ? "+" : ""}
                      {stock.gainPercent.toFixed(2)}%)
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Stock Info</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Sector</span>
                    <span className="text-sm font-medium">{stock.sector}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Market Cap</span>
                    <span className="text-sm font-medium">€{(stock.marketCap / 1000000000).toFixed(1)}B</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">P/E Ratio</span>
                    <span className="text-sm font-medium">{stock.peRatio.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">52-Week High</span>
                    <span className="text-sm font-medium">€{stock.fiftyTwoWeekHigh.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">52-Week Low</span>
                    <span className="text-sm font-medium">€{stock.fiftyTwoWeekLow.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="chart">
            <div className="h-[250px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceHistory} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(date) =>
                      new Date(date).toLocaleDateString(undefined, { month: "short", day: "numeric" })
                    }
                    tick={{ fontSize: 12 }}
                    minTickGap={30}
                  />
                  <YAxis domain={["auto", "auto"]} tickFormatter={(value) => `€${value}`} tick={{ fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#4f46e5"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                    animationDuration={1500}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="news">
            <div className="mt-4 space-y-4">
              {stockNews.map((news) => (
                <div key={news.id} className="border-b pb-3 last:border-0">
                  <a
                    href={news.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium hover:text-primary flex items-start"
                  >
                    {news.title}
                    <ExternalLink className="h-3 w-3 ml-1 flex-shrink-0" />
                  </a>
                  <div className="flex items-center mt-1 text-xs text-muted-foreground">
                    <span>{news.source}</span>
                    <span className="mx-1">•</span>
                    <span>{formatDate(news.date)}</span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={handleAddToWatchlist} disabled={isAddingToWatchlist}>
            <Star className={`h-4 w-4 mr-2 ${isInWatchlist ? "fill-yellow-400" : ""}`} />
            {isInWatchlist ? "In Watchlist" : "Add to Watchlist"}
          </Button>
          <Button variant="outline" onClick={handleViewTransactions}>
            <Calendar className="h-4 w-4 mr-2" />
            View Transactions
          </Button>
          <Button onClick={handleTrade}>
            <DollarSign className="h-4 w-4 mr-2" />
            Trade
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
