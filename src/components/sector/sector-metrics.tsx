import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface SectorMetricsProps {
  sectorName: string
  marketSize: string
  growthRate: string
  averagePE: number
  averageDividendYield: number
  volatility: string
  className?: string
}

export function SectorMetrics({
  sectorName,
  marketSize,
  growthRate,
  averagePE,
  averageDividendYield,
  volatility,
  className,
}: SectorMetricsProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{sectorName} Sector Metrics</CardTitle>
        <CardDescription>Key financial indicators for the {sectorName.toLowerCase()} sector</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Market Size</h3>
            <p className="mt-1 text-2xl font-semibold">{marketSize}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Growth Rate</h3>
            <p className="mt-1 text-2xl font-semibold">{growthRate}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Average P/E</h3>
            <p className="mt-1 text-2xl font-semibold">{averagePE !== undefined ? averagePE.toFixed(1) : "N/A"}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg Dividend Yield</h3>
            <p className="mt-1 text-2xl font-semibold">
              {averageDividendYield !== undefined ? `${averageDividendYield.toFixed(2)}%` : "N/A"}
            </p>
          </div>
          <div className="sm:col-span-2">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Volatility</h3>
            <p className="mt-1 text-2xl font-semibold">{volatility}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
