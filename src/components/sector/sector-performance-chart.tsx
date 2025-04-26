"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import type { SectorPerformance } from "@/lib/mock-sector-data"

interface SectorPerformanceChartProps {
  sectorName: string
  performanceData: SectorPerformance[]
  className?: string
}

export function SectorPerformanceChart({ sectorName, performanceData, className }: SectorPerformanceChartProps) {
  // Ensure we have data to display
  if (!performanceData || performanceData.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>{sectorName} Sector Performance</CardTitle>
          <CardDescription>1-year price trend for the {sectorName.toLowerCase()} sector</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <p>No performance data available</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Take data points at regular intervals to avoid overcrowding
  // For a year of daily data, showing ~12 points (monthly) works well
  const dataPointCount = performanceData.length
  const interval = Math.max(1, Math.floor(dataPointCount / 12))

  const chartData = performanceData
    .filter((_, index) => index % interval === 0 || index === performanceData.length - 1)
    .map((item) => ({
      date: new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      value: item.value,
    }))

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{sectorName} Sector Performance</CardTitle>
        <CardDescription>1-year price trend for the {sectorName.toLowerCase()} sector</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 25 }}>
              <XAxis dataKey="date" tick={{ fontSize: 12 }} tickMargin={10} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `$${value}`} domain={["auto", "auto"]} />
              <Tooltip
                formatter={(value) => [`$${Number(value).toFixed(2)}`, "Price"]}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#4f46e5"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                isAnimationActive={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
