import { ArrowDown, ArrowUp, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockPortfolioData } from "@/lib/mock-data"

export function PortfolioSummary() {
  const { totalValue, totalGain, totalGainPercentage } = mockPortfolioData.summary
  const isPositive = totalGain >= 0

  return (
    <div className="grid gap-4 md:col-span-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">€{totalValue.toLocaleString()}</div>
          <div className="flex items-center space-x-2">
            <span className={`flex items-center ${isPositive ? "text-green-500" : "text-red-500"}`}>
              {isPositive ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}€
              {Math.abs(totalGain).toLocaleString()}
            </span>
            <span className={`text-sm ${isPositive ? "text-green-500" : "text-red-500"}`}>
              ({isPositive ? "+" : ""}
              {totalGainPercentage.toFixed(2)}%)
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Updated today at {new Date().toLocaleTimeString()}</p>
        </CardContent>
      </Card>
    </div>
  )
}
