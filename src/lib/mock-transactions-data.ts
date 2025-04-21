// Transaction types
export type TransactionType = "Buy" | "Sell" | "Deposit" | "Withdrawal" | "Dividend"
export type TransactionStatus = "Completed" | "Pending" | "Failed"
export type AssetClass = "Stocks" | "ETFs" | "Bonds" | "Crypto" | "Cash" | "Real Estate"

export interface Transaction {
  id: string
  date: string
  type: TransactionType
  asset: string
  assetClass: AssetClass
  amount: number
  quantity?: number
  price?: number
  fees?: number
  status: TransactionStatus
  notes?: string
}

// Generate mock transaction data
const generateTransactions = (): Transaction[] => {
  const transactions: Transaction[] = []
  const now = new Date()
  const assets = [
    { symbol: "AAPL", name: "Apple Inc.", class: "Stocks" as AssetClass },
    { symbol: "MSFT", name: "Microsoft Corporation", class: "Stocks" as AssetClass },
    { symbol: "AMZN", name: "Amazon.com Inc.", class: "Stocks" as AssetClass },
    { symbol: "GOOGL", name: "Alphabet Inc.", class: "Stocks" as AssetClass },
    { symbol: "NVDA", name: "NVIDIA Corporation", class: "Stocks" as AssetClass },
    { symbol: "TSLA", name: "Tesla, Inc.", class: "Stocks" as AssetClass },
    { symbol: "VWCE", name: "Vanguard FTSE All-World UCITS ETF", class: "ETFs" as AssetClass },
    { symbol: "EUNL", name: "iShares Core MSCI World UCITS ETF", class: "ETFs" as AssetClass },
    { symbol: "BTCE", name: "Bitcoin ETC", class: "Crypto" as AssetClass },
    { symbol: "O", name: "Realty Income Corporation", class: "Real Estate" as AssetClass },
    { symbol: "Cash", name: "Cash", class: "Cash" as AssetClass },
  ]

  // Generate transactions for the past 12 months
  for (let i = 0; i < 45; i++) {
    const date = new Date(now)
    date.setDate(date.getDate() - Math.floor(Math.random() * 365)) // Random date within the last year

    const randomAsset = assets[Math.floor(Math.random() * assets.length)]
    const isDeposit = randomAsset.symbol === "Cash" && Math.random() > 0.5
    const isWithdrawal = randomAsset.symbol === "Cash" && !isDeposit && Math.random() > 0.7
    const isDividend = Math.random() > 0.8

    let type: TransactionType
    if (isDeposit) {
      type = "Deposit"
    } else if (isWithdrawal) {
      type = "Withdrawal"
    } else if (isDividend) {
      type = "Dividend"
    } else {
      type = Math.random() > 0.5 ? "Buy" : "Sell"
    }

    const quantity = type === "Deposit" || type === "Withdrawal" ? undefined : Math.floor(Math.random() * 20) + 1
    const price = type === "Deposit" || type === "Withdrawal" ? undefined : Math.floor(Math.random() * 500) + 50
    const amount =
      type === "Deposit" || type === "Withdrawal" || !quantity || !price
        ? Math.floor(Math.random() * 5000) + 100
        : quantity * price

    const fees = type === "Buy" || type === "Sell" ? Math.floor(Math.random() * 20) + 1 : undefined

    const status: TransactionStatus = Math.random() > 0.9 ? "Pending" : Math.random() > 0.95 ? "Failed" : "Completed"

    transactions.push({
      id: `TRX-${Math.floor(Math.random() * 10000)}`,
      date: date.toISOString(),
      type,
      asset: randomAsset.symbol,
      assetClass: randomAsset.class,
      amount: type === "Sell" || type === "Withdrawal" ? -amount : amount,
      quantity,
      price,
      fees,
      status,
      notes: Math.random() > 0.7 ? `Transaction note for ${randomAsset.symbol}` : undefined,
    })
  }

  // Sort by date (newest first)
  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// Generate monthly transaction trends
const generateMonthlyTrends = (transactions: Transaction[]) => {
  const monthlyData: {
    month: string
    buy: number
    sell: number
    deposit: number
    withdrawal: number
    dividend: number
  }[] = []

  // Get the last 12 months
  const now = new Date()
  for (let i = 11; i >= 0; i--) {
    const month = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const monthName = month.toLocaleString("default", { month: "short" })
    const year = month.getFullYear()

    monthlyData.push({
      month: `${monthName} ${year}`,
      buy: 0,
      sell: 0,
      deposit: 0,
      withdrawal: 0,
      dividend: 0,
    })
  }

  // Aggregate transaction amounts by month and type
  transactions.forEach((transaction) => {
    const date = new Date(transaction.date)
    const monthName = date.toLocaleString("default", { month: "short" })
    const year = date.getFullYear()
    const monthKey = `${monthName} ${year}`

    const monthData = monthlyData.find((data) => data.month === monthKey)
    if (monthData) {
      const amount = Math.abs(transaction.amount)
      switch (transaction.type) {
        case "Buy":
          monthData.buy += amount
          break
        case "Sell":
          monthData.sell += amount
          break
        case "Deposit":
          monthData.deposit += amount
          break
        case "Withdrawal":
          monthData.withdrawal += amount
          break
        case "Dividend":
          monthData.dividend += amount
          break
      }
    }
  })

  return monthlyData
}

// Create mock transactions data
const transactions = generateTransactions()

export const mockTransactionsData = {
  transactions,
  monthlyTrends: generateMonthlyTrends(transactions),
}
