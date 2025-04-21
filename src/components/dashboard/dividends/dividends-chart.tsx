"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Dividend } from "@/lib/mock-dividends-data"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { mockDividendsData } from "@/lib/mock-dividends-data"

interface DividendsChartProps {
  dividends: Dividend[]
}

export function DividendsChart({ dividends }: DividendsChartProps) {
  const [selectedAsset, setSelectedAsset] = useState<string>("all")
  const { monthlyDividends } = mockDividendsData

  // Get unique assets
  const uniqueAssets = [...new Set(dividends.map((div) => div.asset))]

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-md shadow-lg border border-gray-200">
          <p className="font-medium">{label}</p>
          <p className="text-sm">
            <span className="font-medium">€{payload[0].value.toFixed(2)}</span> in dividends
          </p>
          {selectedAsset === "all" && (
            <div className="mt-1 pt-1 border-t border-gray-200">
              {uniqueAssets.map((asset) => {
                const value = payload[0].payload[asset]
                if (value && value > 0) {
                  return (
                    <p key={asset} className="text-xs">
                      {asset}: €{value.toFixed(2)}
                    </p>
                  )
                }
                return null
              })}
            </div>
          )}
        </div>
      )
    }
    return null
  }

  // Filter chart data based on selected asset
  const chartData =
    selectedAsset === "all"
      ? monthlyDividends
      : monthlyDividends.map((month) => ({
          month: month.month,
          amount: (month[selectedAsset] as number) || 0,
        }))

  return (
    <Card className="mt-6">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Dividend Income Over Time</CardTitle>
          <Select value={selectedAsset} onValueChange={setSelectedAsset}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by asset" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Assets</SelectItem>
              {uniqueAssets.map((asset) => (
                <SelectItem key={asset} value={asset}>
                  {asset}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => value.split(" ")[0]} // Show only month abbreviation
              />
              <YAxis tickFormatter={(value) => `€${value}`} tick={{ fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="amount"
                fill="#4ade80"
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
                animationEasing="ease-in-out"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
