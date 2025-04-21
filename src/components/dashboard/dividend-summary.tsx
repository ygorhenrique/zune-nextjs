import { Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockPortfolioData } from "@/lib/mock-data"

export function DividendSummary() {
  const { dividendsThisMonth, dividendsYTD } = mockPortfolioData.dividends

  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Dividend Income</CardTitle>
        <Calendar className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">€{dividendsThisMonth.toLocaleString()}</div>
        <p className="text-xs text-muted-foreground">This month</p>
        <div className="mt-2">
          <div className="text-sm font-medium">€{dividendsYTD.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Year to date</p>
        </div>
      </CardContent>
    </Card>
  )
}
