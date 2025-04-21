import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { PortfolioSummary } from "@/components/dashboard/portfolio-summary"
import { PortfolioChart } from "@/components/dashboard/portfolio-chart"
import { AssetAllocation } from "@/components/dashboard/asset-allocation"
import { CurrentHoldings } from "@/components/dashboard/current-holdings"
import { DividendSummary } from "@/components/dashboard/dividend-summary"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="View and manage your investment portfolio." />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <PortfolioSummary />
        <DividendSummary />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <PortfolioChart />
        <AssetAllocation />
      </div>
      <CurrentHoldings />
    </DashboardShell>
  )
}
