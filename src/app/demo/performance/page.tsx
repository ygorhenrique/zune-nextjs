import { PerformanceHeader } from "@/components/dashboard/performance/performance-header"
import { PerformanceChart } from "@/components/dashboard/performance/performance-chart"
import { PerformanceBreakdown } from "@/components/dashboard/performance/performance-breakdown"
import { PerformanceMetrics } from "@/components/dashboard/performance/performance-metrics"
import { PerformanceInsights } from "@/components/dashboard/performance/performance-insights"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { mockPerformanceData } from "@/lib/mock-performance-data"

export default function PerformancePage() {
  const { totalReturn, hasInvestments } = mockPerformanceData

  return (
    <DashboardShell>
      <PerformanceHeader totalReturn={totalReturn} />

      {!hasInvestments ? (
        <EmptyState />
      ) : (
        <>
          <PerformanceChart />
          <PerformanceBreakdown />
          <PerformanceMetrics />
          <PerformanceInsights />
        </>
      )}
    </DashboardShell>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center mt-6">
      <h3 className="mb-2 text-lg font-medium">You have no investments to track</h3>
      <p className="mb-6 text-sm text-muted-foreground">Start investing now to track your performance!</p>
      <a
        href="/dashboard/stocks"
        className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      >
        Explore Stocks
      </a>
    </div>
  )
}
