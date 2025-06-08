import { TransactionsHeader } from "@/components/dashboard/transactions/transactions-header"
import { TransactionsFilters } from "@/components/dashboard/transactions/transactions-filters"
import { TransactionsInsights } from "@/components/dashboard/transactions/transactions-insights"
import { TransactionsTable } from "@/components/dashboard/transactions/transactions-table"
import { TransactionsTrends } from "@/components/dashboard/transactions/transactions-trends"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { mockTransactionsData } from "@/lib/mock-transactions-data"

export default function TransactionsPage() {
  const { transactions } = mockTransactionsData

  return (
    <DashboardShell>
      <TransactionsHeader totalTransactions={transactions.length} />

      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <TransactionsFilters />
        <TransactionsInsights transactions={transactions} />
      </div>

      {transactions.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <TransactionsTable transactions={transactions} />
          <TransactionsTrends transactions={transactions} />
        </>
      )}
    </DashboardShell>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center mt-6">
      <h3 className="mb-2 text-lg font-medium">You have no transactions yet</h3>
      <p className="mb-6 text-sm text-muted-foreground">Start investing now!</p>
      <button className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
        Add Transaction
      </button>
    </div>
  )
}
