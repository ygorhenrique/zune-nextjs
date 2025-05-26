import { Card, CardContent } from "@/components/ui/card"

interface StockMetricsProps {
  currentPrice: number | null
  previousClose: number | null
  change: number | null
  changePercent: number | null
  currency: string
  peRatio: number | undefined
  dividendYield: number | undefined
  marketCap: number | undefined
  volume: number | null
  avgVolume: number
  high52Week: number | undefined
  low52Week: number | undefined
  open: number | null
}

export function StockMetrics({
  currentPrice,
  previousClose,
  change,
  changePercent,
  currency,
  peRatio,
  dividendYield,
  marketCap,
  volume,
  avgVolume,
  high52Week,
  low52Week,
  open,
}: StockMetricsProps) {
  const formatCurrency = (value: number) => {
    return `${currency} ${value.toFixed(2)}`
  }

  const formatLargeNumber = (value: number) => {
    if (value >= 1e12) {
      return `${(value / 1e12).toFixed(2)}T`
    } else if (value >= 1e9) {
      return `${(value / 1e9).toFixed(2)}B`
    } else if (value >= 1e6) {
      return `${(value / 1e6).toFixed(2)}M`
    } else {
      return value.toLocaleString()
    }
  }

  return (
    <Card className="shadow-md">
      <CardContent className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Current Price</p>
            <p className="text-lg font-semibold">{currentPrice && formatCurrency(currentPrice)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Change</p>
            <p className={`text-lg font-semibold ${change && change >= 0 ? "text-green-600" : "text-red-600"}`}>
              {change && change >= 0 ? "+" : ""}
              {change && formatCurrency(change)} ({changePercent && changePercent.toFixed(2)}%)
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">P/E Ratio</p>
            <p className="text-lg font-semibold">{peRatio && peRatio.toFixed(2)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Dividend Yield</p>
            <p className="text-lg font-semibold">{dividendYield && (dividendYield.toFixed(2) + '%')}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Market Cap</p>
            <p className="text-lg font-semibold">{marketCap && formatLargeNumber(marketCap)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Volume</p>
            <p className="text-lg font-semibold">{volume && formatLargeNumber(volume)}</p>
          </div>
          {/* <div className="space-y-1">
            <p className="text-sm text-gray-500">Avg. Volume</p>
            <p className="text-lg font-semibold">{formatLargeNumber(avgVolume)}</p>
          </div> */}
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Open</p>
            <p className="text-lg font-semibold">{open && formatCurrency(open)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Previous Close</p>
            <p className="text-lg font-semibold">{previousClose && formatCurrency(previousClose)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">52-Week High</p>
            <p className="text-lg font-semibold">{high52Week && formatCurrency(high52Week)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">52-Week Low</p>
            <p className="text-lg font-semibold">{low52Week && formatCurrency(low52Week)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
