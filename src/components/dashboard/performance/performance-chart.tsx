"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { mockPerformanceData } from "@/lib/mock-performance-data"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { TimeRange } from "@/lib/mock-performance-data"

export function PerformanceChart() {
  const [timeRange, setTimeRange] = useState<TimeRange>("1Y")
  const [showBenchmark, setShowBenchmark] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleTimeRangeChange = (range: TimeRange) => {
    setIsLoading(true)
    setTimeRange(range)
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

  const portfolioData = mockPerformanceData.performanceData[timeRange]
  const benchmarkData = mockPerformanceData.benchmarkData[timeRange]

  // Combine portfolio and benchmark data for the chart
  const chartData = portfolioData.map((point, index) => ({
    date: point.date,
    portfolio: point.value,
    benchmark: benchmarkData[index].value,
    portfolioPercent: point.percentChange,
    benchmarkPercent: benchmarkData[index].percentChange,
  }))

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    if (timeRange === "1M" || timeRange === "3M") {
      return date.toLocaleDateString(undefined, { month: "short", day: "numeric" })
    }
    return date.toLocaleDateString(undefined, { month: "short", year: "numeric" })
  }

  const formatCurrency = (value: number) => {
    return `€${value.toLocaleString()}`
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
          <div className="mt-2">
            <p className="text-sm flex items-center">
              <span className="h-2 w-2 rounded-full bg-indigo-600 mr-2"></span>
              Portfolio: {formatCurrency(payload[0].value)}
              <span className={`ml-2 ${payload[0].payload.portfolioPercent >= 0 ? "text-green-600" : "text-red-600"}`}>
                {payload[0].payload.portfolioPercent >= 0 ? "+" : ""}
                {payload[0].payload.portfolioPercent.toFixed(2)}%
              </span>
            </p>
            {showBenchmark && (
              <p className="text-sm flex items-center mt-1">
                <span className="h-2 w-2 rounded-full bg-gray-400 mr-2"></span>
                S&P 500: {formatCurrency(payload[1].value)}
                <span
                  className={`ml-2 ${payload[0].payload.benchmarkPercent >= 0 ? "text-green-600" : "text-red-600"}`}
                >
                  {payload[0].payload.benchmarkPercent >= 0 ? "+" : ""}
                  {payload[0].payload.benchmarkPercent.toFixed(2)}%
                </span>
              </p>
            )}
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle>Portfolio Performance</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center space-x-2">
              <Switch id="benchmark" checked={showBenchmark} onCheckedChange={setShowBenchmark} />
              <Label htmlFor="benchmark">Compare to S&P 500</Label>
            </div>
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
        </div>
      </CardHeader>
      <CardContent>
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
              <YAxis
                tickFormatter={formatCurrency}
                tick={{ fontSize: 12 }}
                domain={[(dataMin: number) => dataMin * 0.95, (dataMax: number) => dataMax * 1.05]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="portfolio"
                stroke="#4f46e5"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
                animationDuration={1500}
                animationEasing="ease-in-out"
                name="Portfolio"
              />
              {showBenchmark && (
                <Line
                  type="monotone"
                  dataKey="benchmark"
                  stroke="#9ca3af"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                  animationDuration={1500}
                  animationEasing="ease-in-out"
                  name="S&P 500"
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
