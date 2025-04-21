import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, BarChart2 } from "lucide-react"
import type { Stock } from "@/lib/mock-stocks-data"

interface StocksInsightsProps {
  stocks: Stock[]
}

export function StocksInsights({ stocks }: StocksInsightsProps) {
  // Find top performer (highest gain percentage)
  const topPerformer = [...stocks].sort((a, b) => b.yearToDateChange - a.yearToDateChange)[0]

  // Find most volatile stock
  const mostVolatile = [...stocks].sort((a, b) => b.volatility - a.volatility)[0]

  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="text-sm font-medium mb-3">Stock Insights</h3>
        <div className="space-y-3">
          {topPerformer && (
            <div className="flex items-start gap-2">
              <div className="bg-green-100 p-1.5 rounded-full text-green-600">
                <TrendingUp className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium">Top Performer</p>
                <p className="text-xs text-muted-foreground">
                  {topPerformer.ticker} ({topPerformer.yearToDateChange > 0 ? "+" : ""}
                  {topPerformer.yearToDateChange.toFixed(1)}% this year)
                </p>
              </div>
            </div>
          )}

          {mostVolatile && (
            <div className="flex items-start gap-2">
              <div className="bg-orange-100 p-1.5 rounded-full text-orange-600">
                <BarChart2 className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium">Most Volatile</p>
                <p className="text-xs text-muted-foreground">
                  {mostVolatile.ticker} (Volatility: {mostVolatile.volatility.toFixed(1)}%)
                </p>
              </div>
            </div>
          )}

          <div className="flex items-start gap-2">
            <div className="bg-blue-100 p-1.5 rounded-full text-blue-600">
              <TrendingDown className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-medium">Sector Exposure</p>
              <p className="text-xs text-muted-foreground">
                {(() => {
                  const sectors = stocks.reduce(
                    (acc, stock) => {
                      acc[stock.sector] = (acc[stock.sector] || 0) + stock.value
                      return acc
                    },
                    {} as Record<string, number>,
                  )

                  const topSector = Object.entries(sectors).sort((a, b) => b[1] - a[1])[0]
                  const percentage = ((topSector[1] / stocks.reduce((sum, s) => sum + s.value, 0)) * 100).toFixed(1)

                  return `${topSector[0]} (${percentage}% of portfolio)`
                })()}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
