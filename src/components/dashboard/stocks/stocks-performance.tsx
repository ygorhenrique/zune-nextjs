"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { mockStocksData } from "@/lib/mock-stocks-data"
import type { TimeRange } from "@/lib/mock-performance-data"

export function StocksPerformance() {
  const [timeRange, setTimeRange] = useState<TimeRange>("1Y")
  const [selectedStocks, setSelectedStocks] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const { stocks } = mockStocksData

  const handleTimeRangeChange = (range: TimeRange) => {
    setIsLoading(true)
    setTimeRange(range)
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

  const toggleStock = (ticker: string) => {
    setSelectedStocks((prev) => {
      if (prev.includes(ticker)) {
        return prev.filter((t) => t !== ticker)
      } else {
        return [...prev, ticker]
      }
    })
  }

  // Generate combined performance data
  const generateCombinedData = () => {
    // Get the first stock's price history for dates
    const baseStock = stocks[0]
    const basePriceHistory = mockStocksData.getPriceHistory(baseStock.ticker, timeRange)

    // Create combined data with normalized prices (percentage change from start)
    const combinedData = basePriceHistory.map((point) => {
      const date = point.date
      const result: any = { date }

      // Add portfolio performance (weighted average of all stocks)
      const portfolioValue = stocks.reduce((sum, stock) => {
        const stockHistory = mockStocksData.getPriceHistory(stock.ticker, timeRange)
        const stockPoint = stockHistory.find((p) => p.date === date)
        return sum + (stockPoint?.price || 0) * stock.shares
      }, 0)

      result.portfolio = portfolioValue

      // Add selected individual stocks
      selectedStocks.forEach((ticker) => {
        const stockHistory = mockStocksData.getPriceHistory(ticker, timeRange)
        const stockPoint = stockHistory.find((p) => p.date === date)
        if (stockPoint) {
          result[ticker] = stockPoint.price
        }
      })

      return result
    })

    return combinedData
  }

  const chartData = generateCombinedData()

  // Stock colors for the chart
  const stockColors: Record<string, string> = {
    AAPL: "#4f46e5", // indigo
    MSFT: "#06b6d4", // cyan
    AMZN: "#f97316", // orange
    GOOGL: "#ef4444", // red
    NVDA: "#10b981", // emerald
    TSLA: "#ec4899", // pink
    JNJ: "#8b5cf6", // violet
    JPM: "#f59e0b", // amber
    V: "#6366f1", // indigo
    PG: "#84cc16", // lime
    portfolio: "#000000", // black
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    if (timeRange === "1M" || timeRange === "3M") {
      return date.toLocaleDateString(undefined, { month: "short", day: "numeric" })
    }
    return date.toLocaleDateString(undefined, { month: "short", year: "numeric" })
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const date = new Date(label).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
      return (
        <div className="bg-white p-3 rounded-md shadow-lg border border-gray-200">
          <p className="font-medium">{date}</p>
          <div className="mt-2 space-y-1">
            {payload.map((entry: any, index: number) => (
              <p key={`item-${index}`} className="text-sm flex items-center">
                <span className="h-2 w-2 rounded-full mr-2" style={{ backgroundColor: entry.stroke }}></span>
                <span className="capitalize">{entry.dataKey === "portfolio" ? "Portfolio" : entry.dataKey}: </span>
                <span className="font-medium ml-1">€{entry.value.toFixed(2)}</span>
              </p>
            ))}
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="mt-6">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle>Portfolio Stock Performance</CardTitle>
          <div className="flex space-x-1">
            {(["1M", "3M", "6M", "1Y", "ALL"] as TimeRange[]).map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? "default" : "outline"}
                size="sm"
                onClick={() => handleTimeRangeChange(range)}
              >
                {range}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {stocks.slice(0, 6).map((stock) => (
            <div key={stock.ticker} className="flex items-center space-x-2">
              <Checkbox
                id={`stock-${stock.ticker}`}
                checked={selectedStocks.includes(stock.ticker)}
                onCheckedChange={() => toggleStock(stock.ticker)}
              />
              <Label htmlFor={`stock-${stock.ticker}`} className="text-sm flex items-center cursor-pointer">
                <span
                  className="h-2 w-2 rounded-full mr-1"
                  style={{ backgroundColor: stockColors[stock.ticker] || "#000000" }}
                ></span>
                {stock.ticker}
              </Label>
            </div>
          ))}
        </div>

        <div className="h-[400px] w-full relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-10">
              <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full"></div>
            </div>
          )}
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={formatDate}
                tick={{ fontSize: 12 }}
                minTickGap={30}
                padding={{ left: 10, right: 10 }}
              />
              <YAxis tickFormatter={(value) => `€${value}`} tick={{ fontSize: 12 }} domain={["auto", "auto"]} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="portfolio"
                name="Portfolio"
                stroke={stockColors.portfolio}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
                animationDuration={1500}
              />
              {selectedStocks.map((ticker) => (
                <Line
                  key={ticker}
                  type="monotone"
                  dataKey={ticker}
                  name={ticker}
                  stroke={stockColors[ticker] || "#000000"}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                  animationDuration={1500}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
