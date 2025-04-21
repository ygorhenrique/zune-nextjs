import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockDividendsData } from "@/lib/mock-dividends-data"

export function DividendsForecast() {
  const { forecast } = mockDividendsData

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  return (
    <Card className="mt-6">
      <CardHeader className="pb-2">
        <CardTitle>Dividend Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {forecast.map((item) => (
            <li key={`${item.asset}-${item.date}`} className="flex items-start">
              <div className="h-2 w-2 mt-1.5 rounded-full bg-green-500 mr-2" />
              <div>
                <p>
                  <span className="font-medium">Expected Dividend:</span> €{item.amount.toFixed(2)} from{" "}
                  <span className="font-medium">{item.asset}</span> ({item.assetName}) on {formatDate(item.date)}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <p className="text-xs text-muted-foreground italic mt-4">
          Estimates based on current holdings and historical dividend schedules. Actual payments may vary.
        </p>
      </CardContent>
    </Card>
  )
}
