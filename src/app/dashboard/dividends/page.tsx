import { DividendsHeader } from "@/components/dashboard/dividends/dividends-header"
import { DividendsFilters } from "@/components/dashboard/dividends/dividends-filters"
import { DividendsInsights } from "@/components/dashboard/dividends/dividends-insights"
import { DividendsTable } from "@/components/dashboard/dividends/dividends-table"
import { DividendsChart } from "@/components/dashboard/dividends/dividends-chart"
import { DividendsForecast } from "@/components/dashboard/dividends/dividends-forecast"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { mockDividendsData } from "@/lib/mock-dividends-data"

export default function DividendsPage() {
  const { dividends } = mockDividendsData

  return (
    <DashboardShell>
      <DividendsHeader totalDividends={dividends.reduce((sum, div) => sum + div.amount, 0)} />

      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <DividendsFilters />
        <DividendsInsights dividends={dividends} />
      </div>

      {dividends.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <DividendsTable dividends={dividends} />
          <DividendsChart dividends={dividends} />
          <DividendsForecast />
        </>
      )}
    </DashboardShell>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center mt-6">
      <h3 className="mb-2 text-lg font-medium">You haven't received any dividends yet</h3>
      <p className="mb-6 text-sm text-muted-foreground">Invest in dividend-paying assets to get started!</p>
      <a
        href="/dashboard/stocks"
        className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      >
        Explore Dividend Stocks
      </a>
    </div>
  )
}
