"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, type TooltipProps } from "recharts"
import { Loader2 } from "lucide-react"

// Mock data for portfolio performance
const mockChartData = {
  "1m": [
    { date: "Mar 1", value: 70438.82 },
    { date: "Mar 8", value: 70650.45 },
    { date: "Mar 15", value: 70520.18 },
    { date: "Mar 22", value: 70780.92 },
    { date: "Mar 29", value: 71000.0 },
  ],
  "3m": [
    { date: "Jan 1", value: 68000.0 },
    { date: "Jan 15", value: 68500.25 },
    { date: "Feb 1", value: 69200.5 },
    { date: "Feb 15", value: 68900.75 },
    { date: "Mar 1", value: 70438.82 },
    { date: "Mar 15", value: 70520.18 },
    { date: "Mar 29", value: 71000.0 },
  ],
  "6m": [
    { date: "Oct 1", value: 65000.0 },
    { date: "Nov 1", value: 66200.35 },
    { date: "Dec 1", value: 67500.42 },
    { date: "Jan 1", value: 68000.0 },
    { date: "Feb 1", value: 69200.5 },
    { date: "Mar 1", value: 70438.82 },
    { date: "Mar 29", value: 71000.0 },
  ],
  "1y": [
    { date: "Apr 1, 2024", value: 62000.0 },
    { date: "Jun 1, 2024", value: 63500.25 },
    { date: "Aug 1, 2024", value: 65000.0 },
    { date: "Oct 1, 2024", value: 66200.35 },
    { date: "Dec 1, 2024", value: 67500.42 },
    { date: "Feb 1, 2025", value: 69200.5 },
    { date: "Mar 29, 2025", value: 71000.0 },
  ],
  all: [
    { date: "Apr 1, 2023", value: 60000.0 },
    { date: "Jul 1, 2023", value: 61200.15 },
    { date: "Oct 1, 2023", value: 63500.25 },
    { date: "Jan 1, 2024", value: 65000.0 },
    { date: "Apr 1, 2024", value: 66200.35 },
    { date: "Jul 1, 2024", value: 67500.42 },
    { date: "Oct 1, 2024", value: 68000.0 },
    { date: "Jan 1, 2025", value: 69200.5 },
    { date: "Mar 29, 2025", value: 71000.0 },
  ],
}

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-md shadow-md">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-sm text-indigo-600">
          {/* €{payload[0].value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} */}
        </p>
      </div>
    )
  }
  return null
}

export function PortfolioChart() {
  const [timeRange, setTimeRange] = useState<"1m" | "3m" | "6m" | "1y" | "all">("1y")
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)

  const handleTimeRangeChange = (value: string) => {
    setIsLoading(true)
    setHasError(false)

    // Simulate API call delay
    setTimeout(() => {
      if (Math.random() > 0.95) {
        // 5% chance of error for demo
        setHasError(true)
      }
      setIsLoading(false)
    }, 500)

    setTimeRange(value as "1m" | "3m" | "6m" | "1y" | "all")
  }

  const handleRetry = () => {
    setIsLoading(true)
    setHasError(false)

    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>Portfolio Performance</CardTitle>
        <CardDescription>Track your portfolio growth over time</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={timeRange} onValueChange={handleTimeRangeChange} className="mb-4">
          <TabsList>
            <TabsTrigger value="1m">1M</TabsTrigger>
            <TabsTrigger value="3m">3M</TabsTrigger>
            <TabsTrigger value="6m">6M</TabsTrigger>
            <TabsTrigger value="1y">1Y</TabsTrigger>
            <TabsTrigger value="all">ALL</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="h-[300px] w-full">
          {isLoading ? (
            <div className="flex h-full items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
            </div>
          ) : hasError ? (
            <div className="flex h-full flex-col items-center justify-center">
              <p className="mb-4 text-gray-500">Oops, we couldn't load the chart. Please try again.</p>
              <button
                onClick={handleRetry}
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
              >
                Retry
              </button>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockChartData[timeRange]} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} tickLine={false} axisLine={{ stroke: "#e5e7eb" }} />
                <YAxis
                  tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`}
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: "#e5e7eb" }}
                  domain={["dataMin - 1000", "dataMax + 1000"]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#4f46e5"
                  strokeWidth={2}
                  dot={{ r: 4, strokeWidth: 2, fill: "white" }}
                  activeDot={{ r: 6, strokeWidth: 0, fill: "#4f46e5" }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
