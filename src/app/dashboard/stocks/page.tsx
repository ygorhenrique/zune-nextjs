"use client"

import { StocksHeader } from "@/components/dashboard/stocks/stocks-header"
import { StocksFilters } from "@/components/dashboard/stocks/stocks-filters"
import { StocksInsights } from "@/components/dashboard/stocks/stocks-insights"
import { StocksTable } from "@/components/dashboard/stocks/stocks-table"
import { StocksPerformance } from "@/components/dashboard/stocks/stocks-performance"
import { StocksMovers } from "@/components/dashboard/stocks/stocks-movers"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { mockStocksData } from "@/lib/mock-stocks-data"

export default function StocksPage() {
  const { stocks, totalValue } = mockStocksData

  return (
    <DashboardShell>
      <StocksHeader totalValue={totalValue} />

      {stocks.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
            <StocksFilters />
            <StocksInsights stocks={stocks} />
          </div>
          <StocksTable stocks={stocks} />
          <StocksPerformance />
          <StocksMovers stocks={stocks} />
        </>
      )}
    </DashboardShell>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center mt-6">
      <h3 className="mb-2 text-lg font-medium">You haven't invested in any stocks yet</h3>
      <p className="mb-6 text-sm text-muted-foreground">Start investing now to track your stock portfolio!</p>
      <a
        href="#add-stock-modal"
        className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        onClick={(e) => {
          e.preventDefault()
          document.getElementById("add-stock-button")?.click()
        }}
      >
        Add Stock
      </a>
    </div>
  )
}
