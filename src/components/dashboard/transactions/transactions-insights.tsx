import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Transaction } from "@/lib/mock-transactions-data"

interface TransactionsInsightsProps {
  transactions: Transaction[]
}

export function TransactionsInsights({ transactions }: TransactionsInsightsProps) {
  // Calculate most active asset
  const assetCounts: Record<string, number> = {}
  transactions.forEach((transaction) => {
    assetCounts[transaction.asset] = (assetCounts[transaction.asset] || 0) + 1
  })

  const mostActiveAsset = Object.entries(assetCounts)
    .sort((a, b) => b[1] - a[1])
    .shift()

  // Calculate total fees paid this year
  const currentYear = new Date().getFullYear()
  const totalFees = transactions
    .filter((transaction) => new Date(transaction.date).getFullYear() === currentYear && transaction.fees !== undefined)
    .reduce((sum, transaction) => sum + (transaction.fees || 0), 0)

  // Calculate total transactions this month
  const currentMonth = new Date().getMonth()
  const transactionsThisMonth = transactions.filter(
    (transaction) => new Date(transaction.date).getMonth() === currentMonth,
  ).length

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Insights</CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="space-y-3">
          {mostActiveAsset && (
            <div>
              <p className="text-sm font-medium">Most Active Asset</p>
              <p className="text-lg">
                {mostActiveAsset[0]} ({mostActiveAsset[1]} transactions)
              </p>
            </div>
          )}

          <div>
            <p className="text-sm font-medium">Total Fees Paid</p>
            <p className="text-lg">€{totalFees.toFixed(2)} this year</p>
          </div>

          <div>
            <p className="text-sm font-medium">Monthly Activity</p>
            <p className="text-lg">{transactionsThisMonth} transactions this month</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
