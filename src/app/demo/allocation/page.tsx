import { AllocationHeader } from "@/components/dashboard/allocation/allocation-header"
import { AllocationChart } from "@/components/dashboard/allocation/allocation-chart"
import { AllocationTable } from "@/components/dashboard/allocation/allocation-table"
import { AllocationInsights } from "@/components/dashboard/allocation/allocation-insights"
import { AllocationExport } from "@/components/dashboard/allocation/allocation-export"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { mockPortfolioData } from "@/lib/mock-data"

export default function AllocationPage() {
  const { assetAllocation } = mockPortfolioData
  const totalValue = assetAllocation.reduce((sum, item) => sum + item.value, 0)

  return (
    <DashboardShell>
      <AllocationHeader totalValue={totalValue} />

      {assetAllocation.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2">
            <AllocationChart allocation={assetAllocation} />
            <AllocationTable allocation={assetAllocation} totalValue={totalValue} />
          </div>
          <AllocationInsights allocation={assetAllocation} />
          <AllocationExport />
        </>
      )}
    </DashboardShell>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
      <h3 className="mb-2 text-lg font-medium">Your portfolio is empty</h3>
      <p className="mb-6 text-sm text-muted-foreground">Add some investments to see your allocation!</p>
      <a
        href="/dashboard/transactions"
        className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      >
        Add Investments
      </a>
    </div>
  )
}
