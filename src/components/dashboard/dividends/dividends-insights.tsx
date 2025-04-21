"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, LabelList } from "recharts"
import type { Dividend } from "@/lib/mock-dividends-data"

interface DividendsInsightsProps {
  dividends: Dividend[]
}

export function DividendsInsights({ dividends }: DividendsInsightsProps) {
  // Calculate highest yielding asset
  const assetYields = new Map<string, { symbol: string; name: string; yield: number }>()

  dividends.forEach((dividend) => {
    if (dividend.yield && dividend.asset) {
      assetYields.set(dividend.asset, {
        symbol: dividend.asset,
        name: dividend.assetName,
        yield: dividend.yield,
      })
    }
  })

  const sortedAssets = Array.from(assetYields.values())
    .sort((a, b) => b.yield - a.yield)
    .slice(0, 3)

  // Calculate total dividends this year
  const currentYear = new Date().getFullYear()
  const totalDividendsThisYear = dividends
    .filter((dividend) => new Date(dividend.date).getFullYear() === currentYear)
    .reduce((sum, dividend) => sum + dividend.amount, 0)

  // Calculate monthly average
  const monthlyAverage = totalDividendsThisYear / 12

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Dividend Insights</CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium">Total Dividends This Year</p>
            <p className="text-lg">€{totalDividendsThisYear.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground">Monthly Average: €{monthlyAverage.toFixed(2)}</p>
          </div>

          {sortedAssets.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2">Highest Yielding Assets</p>
              <div className="h-[100px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sortedAssets} layout="vertical">
                    <XAxis type="number" domain={[0, Math.max(...sortedAssets.map((a) => a.yield)) * 1.1]} hide />
                    <YAxis type="category" dataKey="symbol" width={40} />
                    <Bar dataKey="yield" radius={[0, 4, 4, 0]} barSize={20}>
                      {sortedAssets.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? "#4f46e5" : "#6366f1"} />
                      ))}
                      <LabelList
                        dataKey="yield"
                        position="right"
                        formatter={(value: number) => `${value.toFixed(1)}%`}
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
