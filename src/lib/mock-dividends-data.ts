// Dividend types
export type DividendStatus = "Paid" | "Pending" | "Processing"

export interface Dividend {
  id: string
  date: string
  asset: string
  assetName: string
  amount: number
  shares: number
  dividendPerShare: number
  taxWithheld?: number
  status: DividendStatus
  sector?: string
  yield?: number
}

// Generate mock dividend data
const generateDividends = (): Dividend[] => {
  const dividends: Dividend[] = []
  const now = new Date()
  const assets = [
    { symbol: "AAPL", name: "Apple Inc.", sector: "Technology", yield: 0.5 },
    { symbol: "MSFT", name: "Microsoft Corporation", sector: "Technology", yield: 0.8 },
    { symbol: "JNJ", name: "Johnson & Johnson", sector: "Healthcare", yield: 2.6 },
    { symbol: "PG", name: "Procter & Gamble", sector: "Consumer Staples", yield: 2.4 },
    { symbol: "KO", name: "Coca-Cola Company", sector: "Consumer Staples", yield: 2.9 },
    { symbol: "VTI", name: "Vanguard Total Stock Market ETF", sector: "ETF", yield: 1.5 },
    { symbol: "SCHD", name: "Schwab US Dividend Equity ETF", sector: "ETF", yield: 3.5 },
    { symbol: "O", name: "Realty Income Corporation", sector: "Real Estate", yield: 4.8 },
  ]

  // Generate dividends for the past 24 months
  for (let i = 0; i < 60; i++) {
    const date = new Date(now)
    // Distribute dividends throughout the past 24 months
    date.setDate(1) // Set to first day of month
    date.setMonth(date.getMonth() - Math.floor(Math.random() * 24))
    // Random day within the month
    date.setDate(Math.floor(Math.random() * 28) + 1)

    const randomAsset = assets[Math.floor(Math.random() * assets.length)]
    const shares = Math.floor(Math.random() * 100) + 10
    const dividendPerShare = (Math.random() * 0.5 + 0.1).toFixed(2)
    const amount = Number.parseFloat((shares * Number.parseFloat(dividendPerShare)).toFixed(2))
    const taxWithheld = Math.random() > 0.7 ? Number.parseFloat((amount * 0.15).toFixed(2)) : undefined

    // Most dividends are paid, some are pending
    const status: DividendStatus = date > new Date() ? "Pending" : Math.random() > 0.9 ? "Processing" : "Paid"

    dividends.push({
      id: `DIV-${Math.floor(Math.random() * 10000)}`,
      date: date.toISOString(),
      asset: randomAsset.symbol,
      assetName: randomAsset.name,
      amount,
      shares,
      dividendPerShare: Number.parseFloat(dividendPerShare),
      taxWithheld,
      status,
      sector: randomAsset.sector,
      yield: randomAsset.yield,
    })
  }

  // Sort by date (newest first)
  return dividends.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// Generate monthly dividend data
const generateMonthlyDividends = (dividends: Dividend[]) => {
  const monthlyData: {
    month: string
    amount: number
    [key: string]: number | string // For asset-specific amounts
  }[] = []

  // Get the last 12 months
  const now = new Date()
  for (let i = 11; i >= 0; i--) {
    const month = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const monthName = month.toLocaleString("default", { month: "short" })
    const year = month.getFullYear()

    monthlyData.push({
      month: `${monthName} ${year}`,
      amount: 0,
    })
  }

  // Get unique assets
  const uniqueAssets = [...new Set(dividends.map((div) => div.asset))]

  // Initialize asset amounts in monthly data
  monthlyData.forEach((month) => {
    uniqueAssets.forEach((asset) => {
      month[asset] = 0
    })
  })

  // Aggregate dividend amounts by month and asset
  dividends.forEach((dividend) => {
    const date = new Date(dividend.date)
    const monthName = date.toLocaleString("default", { month: "short" })
    const year = date.getFullYear()
    const monthKey = `${monthName} ${year}`

    const monthData = monthlyData.find((data) => data.month === monthKey)
    if (monthData) {
      monthData.amount += dividend.amount
      monthData[dividend.asset] = ((monthData[dividend.asset] as number) || 0) + dividend.amount
    }
  })

  return monthlyData
}

// Generate upcoming dividends forecast
const generateDividendForecast = () => {
  const forecast = []
  const now = new Date()
  const assets = [
    { symbol: "AAPL", name: "Apple Inc.", amount: 35.25 },
    { symbol: "MSFT", name: "Microsoft Corporation", amount: 42.8 },
    { symbol: "JNJ", name: "Johnson & Johnson", amount: 28.5 },
    { symbol: "VTI", name: "Vanguard Total Stock Market ETF", amount: 65.2 },
    { symbol: "SCHD", name: "Schwab US Dividend Equity ETF", amount: 78.4 },
  ]

  // Generate 5 upcoming dividends
  for (let i = 0; i < 5; i++) {
    const date = new Date(now)
    date.setDate(date.getDate() + Math.floor(Math.random() * 60) + 5) // 5-65 days in the future

    const randomAsset = assets[Math.floor(Math.random() * assets.length)]

    forecast.push({
      asset: randomAsset.symbol,
      assetName: randomAsset.name,
      amount: randomAsset.amount,
      date: date.toISOString(),
    })
  }

  // Sort by date (soonest first)
  return forecast.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

// Create mock dividends data
const dividends = generateDividends()

export const mockDividendsData = {
  dividends,
  monthlyDividends: generateMonthlyDividends(dividends),
  forecast: generateDividendForecast(),
}
