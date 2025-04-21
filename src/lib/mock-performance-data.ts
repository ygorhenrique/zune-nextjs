// Performance data types
export type TimeRange = "1M" | "3M" | "6M" | "1Y" | "ALL"
export type AssetClass = "Stocks" | "ETFs" | "Bonds" | "Crypto" | "Real Estate" | "Cash"

export interface PerformanceDataPoint {
  date: string
  value: number
  percentChange: number
}

export interface AssetPerformance {
  name: string
  value: number
  initialValue: number
  gain: number
  gainPercent: number
  contribution: number
}

export interface AssetClassPerformance {
  class: AssetClass
  value: number
  initialValue: number
  gain: number
  gainPercent: number
  contribution: number
  assets: AssetPerformance[]
}

export interface PerformanceMetric {
  name: string
  value: number
  description: string
  color: string
}

export interface HistoricalInsight {
  type: "best_month" | "worst_month" | "top_performer" | "worst_performer" | "longest_streak"
  label: string
  value: string
  detail: string
}

// Generate mock performance data
const generatePerformanceData = (timeRange: TimeRange): PerformanceDataPoint[] => {
  const data: PerformanceDataPoint[] = []
  const now = new Date()
  let days: number

  switch (timeRange) {
    case "1M":
      days = 30
      break
    case "3M":
      days = 90
      break
    case "6M":
      days = 180
      break
    case "1Y":
      days = 365
      break
    case "ALL":
      days = 730 // 2 years
      break
  }

  let value = 10000 // Starting value
  const initialValue = value

  for (let i = days; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    // Add some randomness to the value with a slight upward trend
    const change = (Math.random() - 0.45) * 100
    value += change

    // Add some seasonal patterns
    if (date.getMonth() === 11) {
      // December
      value += 200 // Year-end rally
    }

    if (date.getMonth() === 2) {
      // March
      value -= 150 // Spring correction
    }

    const percentChange = ((value - initialValue) / initialValue) * 100

    data.push({
      date: date.toISOString().split("T")[0],
      value: Math.round(value),
      percentChange: Number(percentChange.toFixed(2)),
    })
  }

  return data
}

// Generate benchmark data (S&P 500)
const generateBenchmarkData = (timeRange: TimeRange): PerformanceDataPoint[] => {
  const data: PerformanceDataPoint[] = []
  const now = new Date()
  let days: number

  switch (timeRange) {
    case "1M":
      days = 30
      break
    case "3M":
      days = 90
      break
    case "6M":
      days = 180
      break
    case "1Y":
      days = 365
      break
    case "ALL":
      days = 730 // 2 years
      break
  }

  let value = 10000 // Starting value
  const initialValue = value

  for (let i = days; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    // Add some randomness to the value with a slight upward trend
    // Make benchmark slightly underperform the portfolio
    const change = (Math.random() - 0.47) * 90
    value += change

    // Add some seasonal patterns
    if (date.getMonth() === 11) {
      // December
      value += 180 // Year-end rally
    }

    if (date.getMonth() === 2) {
      // March
      value -= 170 // Spring correction
    }

    const percentChange = ((value - initialValue) / initialValue) * 100

    data.push({
      date: date.toISOString().split("T")[0],
      value: Math.round(value),
      percentChange: Number(percentChange.toFixed(2)),
    })
  }

  return data
}

// Generate asset class performance data
const generateAssetClassPerformance = (): AssetClassPerformance[] => {
  const assetClasses: AssetClassPerformance[] = [
    {
      class: "Stocks",
      value: 42263,
      initialValue: 35000,
      gain: 7263,
      gainPercent: 20.75,
      contribution: 60.5,
      assets: [
        {
          name: "AAPL",
          value: 4961,
          initialValue: 4125,
          gain: 836,
          gainPercent: 20.27,
          contribution: 6.97,
        },
        {
          name: "MSFT",
          value: 6230,
          initialValue: 4875,
          gain: 1355,
          gainPercent: 27.79,
          contribution: 11.29,
        },
        {
          name: "AMZN",
          value: 3290,
          initialValue: 2970,
          gain: 320,
          gainPercent: 10.76,
          contribution: 2.67,
        },
        {
          name: "GOOGL",
          value: 3520,
          initialValue: 3100,
          gain: 420,
          gainPercent: 13.54,
          contribution: 3.5,
        },
        {
          name: "NVDA",
          value: 11097,
          initialValue: 7800,
          gain: 3297,
          gainPercent: 42.28,
          contribution: 27.48,
        },
        {
          name: "TSLA",
          value: 1775,
          initialValue: 2200,
          gain: -425,
          gainPercent: -19.32,
          contribution: -3.54,
        },
      ],
    },
    {
      class: "ETFs",
      value: 15496,
      initialValue: 14000,
      gain: 1496,
      gainPercent: 10.69,
      contribution: 12.47,
      assets: [
        {
          name: "VWCE",
          value: 5055,
          initialValue: 4725,
          gain: 330,
          gainPercent: 6.99,
          contribution: 2.75,
        },
        {
          name: "EUNL",
          value: 5125,
          initialValue: 4800,
          gain: 325,
          gainPercent: 6.78,
          contribution: 2.71,
        },
        {
          name: "IWDA",
          value: 5316,
          initialValue: 4475,
          gain: 841,
          gainPercent: 18.79,
          contribution: 7.01,
        },
      ],
    },
    {
      class: "Crypto",
      value: 2818,
      initialValue: 2250,
      gain: 568,
      gainPercent: 25.22,
      contribution: 4.73,
      assets: [
        {
          name: "BTCE",
          value: 2818,
          initialValue: 2250,
          gain: 568,
          gainPercent: 25.22,
          contribution: 4.73,
        },
      ],
    },
    {
      class: "Real Estate",
      value: 8453,
      initialValue: 9000,
      gain: -547,
      gainPercent: -6.08,
      contribution: -4.56,
      assets: [
        {
          name: "O",
          value: 4226,
          initialValue: 4640,
          gain: -414,
          gainPercent: -8.91,
          contribution: -3.45,
        },
        {
          name: "VNQ",
          value: 4227,
          initialValue: 4360,
          gain: -133,
          gainPercent: -3.05,
          contribution: -1.11,
        },
      ],
    },
    {
      class: "Cash",
      value: 1409,
      initialValue: 1400,
      gain: 9,
      gainPercent: 0.64,
      contribution: 0.08,
      assets: [
        {
          name: "EUR",
          value: 1409,
          initialValue: 1400,
          gain: 9,
          gainPercent: 0.64,
          contribution: 0.08,
        },
      ],
    },
  ]

  return assetClasses
}

// Generate performance metrics
const generatePerformanceMetrics = (): PerformanceMetric[] => {
  return [
    {
      name: "Annualized Return",
      value: 12.5,
      description: "Your portfolio's average yearly return. Higher is better.",
      color: "#4ade80", // green
    },
    {
      name: "Volatility",
      value: 15.2,
      description: "Measures how much your portfolio's returns fluctuate. Lower volatility means more stable returns.",
      color: "#f97316", // orange
    },
    {
      name: "Sharpe Ratio",
      value: 1.2,
      description: "Measures risk-adjusted return. A higher Sharpe ratio indicates better risk-adjusted performance.",
      color: "#4f46e5", // indigo
    },
    {
      name: "Max Drawdown",
      value: -12.8,
      description: "The largest drop from peak to trough in your portfolio's value. Smaller is better.",
      color: "#ef4444", // red
    },
  ]
}

// Generate historical insights
const generateHistoricalInsights = (): HistoricalInsight[] => {
  return [
    {
      type: "best_month",
      label: "Best Month",
      value: "March 2025",
      detail: "+5.2%",
    },
    {
      type: "worst_month",
      label: "Worst Month",
      value: "January 2025",
      detail: "-3.1%",
    },
    {
      type: "top_performer",
      label: "Top Performer",
      value: "NVDA",
      detail: "+42.3%",
    },
    {
      type: "worst_performer",
      label: "Worst Performer",
      value: "TSLA",
      detail: "-19.3%",
    },
    {
      type: "longest_streak",
      label: "Longest Winning Streak",
      value: "8 days",
      detail: "Feb 10-18, 2025",
    },
  ]
}

// Create mock performance data
const performanceData1Y = generatePerformanceData("1Y")
const lastDataPoint = performanceData1Y[performanceData1Y.length - 1]
const totalReturn = lastDataPoint.percentChange

export const mockPerformanceData = {
  hasInvestments: true,
  totalReturn,
  performanceData: {
    "1M": generatePerformanceData("1M"),
    "3M": generatePerformanceData("3M"),
    "6M": generatePerformanceData("6M"),
    "1Y": performanceData1Y,
    ALL: generatePerformanceData("ALL"),
  },
  benchmarkData: {
    "1M": generateBenchmarkData("1M"),
    "3M": generateBenchmarkData("3M"),
    "6M": generateBenchmarkData("6M"),
    "1Y": generateBenchmarkData("1Y"),
    ALL: generateBenchmarkData("ALL"),
  },
  assetClassPerformance: generateAssetClassPerformance(),
  performanceMetrics: generatePerformanceMetrics(),
  historicalInsights: generateHistoricalInsights(),
}
