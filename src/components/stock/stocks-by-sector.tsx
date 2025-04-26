import type { SectorStock } from "@/lib/mock-stock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

interface StocksBySectorProps {
  sectors: Record<string, SectorStock[]>
}

export function StocksBySector({ sectors }: StocksBySectorProps) {
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">Explore Stocks by Sector</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(sectors).map(([sector, stocks]) => (
            <div key={sector}>
              <h3 className="font-medium text-lg mb-2">{sector}</h3>
              <div className="space-y-2">
                {stocks.slice(0, 5).map((stock) => (
                  <Link href={`/stock/${stock.ticker}`} key={stock.ticker} className="block">
                    <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md transition-colors">
                      <div>
                        <span className="font-medium">{stock.name}</span>
                        <span className="text-gray-500 ml-2 text-sm">{stock.ticker}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium">${stock.price.toFixed(2)}</span>
                        <span className={`ml-2 text-sm ${stock.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {stock.change >= 0 ? "+" : ""}
                          {stock.change}%
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
