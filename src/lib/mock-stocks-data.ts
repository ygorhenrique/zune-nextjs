// Stock types
export type StockSector =
  | "Technology"
  | "Healthcare"
  | "Consumer Cyclical"
  | "Communication Services"
  | "Financial Services"
  | "Energy"
  | "Industrials"
  | "Consumer Defensive"
  | "Utilities"
  | "Real Estate"
  | "Basic Materials"

export interface Stock {
  ticker: string
  name: string
  shares: number
  price: number
  value: number
  costBasis: number
  gain: number
  gainPercent: number
  dayChange: number
  dayChangePercent: number
  sector: StockSector
  marketCap: number
  peRatio: number
  fiftyTwoWeekHigh: number
  fiftyTwoWeekLow: number
  volatility: number
  yearToDateChange: number
}

export interface StockPricePoint {
  date: string
  price: number
}

export interface StockNewsItem {
  id: string
  title: string
  source: string
  date: string
  url: string
}

// Generate mock stock data
const generateStocks = (): Stock[] => {
  return [
    {
      ticker: "AAPL",
      name: "Apple Inc.",
      shares: 25,
      price: 198.45,
      value: 4961.25,
      costBasis: 4125.0,
      gain: 836.25,
      gainPercent: 20.27,
      dayChange: 3.45,
      dayChangePercent: 1.77,
      sector: "Technology",
      marketCap: 3100000000000,
      peRatio: 32.5,
      fiftyTwoWeekHigh: 205.87,
      fiftyTwoWeekLow: 142.35,
      volatility: 15.2,
      yearToDateChange: 25.8,
    },
    {
      ticker: "MSFT",
      name: "Microsoft Corporation",
      shares: 15,
      price: 415.32,
      value: 6229.8,
      costBasis: 4875.0,
      gain: 1354.8,
      gainPercent: 27.79,
      dayChange: 5.32,
      dayChangePercent: 1.3,
      sector: "Technology",
      marketCap: 3200000000000,
      peRatio: 38.2,
      fiftyTwoWeekHigh: 425.5,
      fiftyTwoWeekLow: 310.25,
      volatility: 14.5,
      yearToDateChange: 22.4,
    },
    {
      ticker: "AMZN",
      name: "Amazon.com Inc.",
      shares: 18,
      price: 182.75,
      value: 3289.5,
      costBasis: 2970.0,
      gain: 319.5,
      gainPercent: 10.76,
      dayChange: -2.25,
      dayChangePercent: -1.22,
      sector: "Consumer Cyclical",
      marketCap: 1900000000000,
      peRatio: 42.8,
      fiftyTwoWeekHigh: 195.45,
      fiftyTwoWeekLow: 135.28,
      volatility: 18.7,
      yearToDateChange: 15.3,
    },
    {
      ticker: "GOOGL",
      name: "Alphabet Inc.",
      shares: 20,
      price: 175.98,
      value: 3519.6,
      costBasis: 3100.0,
      gain: 419.6,
      gainPercent: 13.54,
      dayChange: 1.28,
      dayChangePercent: 0.73,
      sector: "Communication Services",
      marketCap: 2200000000000,
      peRatio: 25.3,
      fiftyTwoWeekHigh: 180.45,
      fiftyTwoWeekLow: 120.78,
      volatility: 16.4,
      yearToDateChange: 18.7,
    },
    {
      ticker: "NVDA",
      name: "NVIDIA Corporation",
      shares: 12,
      price: 924.79,
      value: 11097.48,
      costBasis: 7800.0,
      gain: 3297.48,
      gainPercent: 42.28,
      dayChange: 15.79,
      dayChangePercent: 1.74,
      sector: "Technology",
      marketCap: 2300000000000,
      peRatio: 68.5,
      fiftyTwoWeekHigh: 950.25,
      fiftyTwoWeekLow: 420.15,
      volatility: 28.9,
      yearToDateChange: 85.4,
    },
    {
      ticker: "TSLA",
      name: "Tesla, Inc.",
      shares: 10,
      price: 177.5,
      value: 1775.0,
      costBasis: 2200.0,
      gain: -425.0,
      gainPercent: -19.32,
      dayChange: -5.25,
      dayChangePercent: -2.87,
      sector: "Consumer Cyclical",
      marketCap: 560000000000,
      peRatio: 45.8,
      fiftyTwoWeekHigh: 278.98,
      fiftyTwoWeekLow: 152.37,
      volatility: 35.6,
      yearToDateChange: -28.5,
    },
    {
      ticker: "JNJ",
      name: "Johnson & Johnson",
      shares: 15,
      price: 152.32,
      value: 2284.8,
      costBasis: 2400.0,
      gain: -115.2,
      gainPercent: -4.8,
      dayChange: 0.82,
      dayChangePercent: 0.54,
      sector: "Healthcare",
      marketCap: 395000000000,
      peRatio: 16.2,
      fiftyTwoWeekHigh: 175.45,
      fiftyTwoWeekLow: 144.95,
      volatility: 12.3,
      yearToDateChange: -5.8,
    },
    {
      ticker: "JPM",
      name: "JPMorgan Chase & Co.",
      shares: 20,
      price: 198.75,
      value: 3975.0,
      costBasis: 3200.0,
      gain: 775.0,
      gainPercent: 24.22,
      dayChange: 2.45,
      dayChangePercent: 1.25,
      sector: "Financial Services",
      marketCap: 580000000000,
      peRatio: 12.1,
      fiftyTwoWeekHigh: 205.45,
      fiftyTwoWeekLow: 135.78,
      volatility: 14.8,
      yearToDateChange: 28.7,
    },
    {
      ticker: "V",
      name: "Visa Inc.",
      shares: 12,
      price: 275.45,
      value: 3305.4,
      costBasis: 2760.0,
      gain: 545.4,
      gainPercent: 19.76,
      dayChange: -1.25,
      dayChangePercent: -0.45,
      sector: "Financial Services",
      marketCap: 570000000000,
      peRatio: 30.5,
      fiftyTwoWeekHigh: 290.45,
      fiftyTwoWeekLow: 208.76,
      volatility: 13.9,
      yearToDateChange: 22.4,
    },
    {
      ticker: "PG",
      name: "Procter & Gamble Co.",
      shares: 18,
      price: 162.35,
      value: 2922.3,
      costBasis: 2700.0,
      gain: 222.3,
      gainPercent: 8.23,
      dayChange: 0.95,
      dayChangePercent: 0.59,
      sector: "Consumer Defensive",
      marketCap: 380000000000,
      peRatio: 26.8,
      fiftyTwoWeekHigh: 165.35,
      fiftyTwoWeekLow: 135.75,
      volatility: 10.5,
      yearToDateChange: 12.8,
    },
  ]
}

// Generate stock price history
const generateStockPriceHistory = (ticker: string, timeRange: string): StockPricePoint[] => {
  const data: StockPricePoint[] = []
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
    default:
      days = 30 // Default to 1 month
  }

  // Get base price and volatility based on ticker
  let basePrice = 150
  let volatility = 0.01
  let trend = 0.0002 // Slight upward trend

  switch (ticker) {
    case "AAPL":
      basePrice = 150
      volatility = 0.012
      trend = 0.0003
      break
    case "MSFT":
      basePrice = 350
      volatility = 0.01
      trend = 0.0004
      break
    case "AMZN":
      basePrice = 140
      volatility = 0.015
      trend = 0.0002
      break
    case "GOOGL":
      basePrice = 130
      volatility = 0.011
      trend = 0.0003
      break
    case "NVDA":
      basePrice = 500
      volatility = 0.025
      trend = 0.0008
      break
    case "TSLA":
      basePrice = 200
      volatility = 0.03
      trend = -0.0002
      break
    case "JNJ":
      basePrice = 160
      volatility = 0.008
      trend = -0.0001
      break
    case "JPM":
      basePrice = 160
      volatility = 0.012
      trend = 0.0004
      break
    case "V":
      basePrice = 240
      volatility = 0.01
      trend = 0.0003
      break
    case "PG":
      basePrice = 150
      volatility = 0.007
      trend = 0.0002
      break
  }

  let price = basePrice

  for (let i = days; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    // Add some randomness to the price with a trend
    const change = (Math.random() - 0.5) * 2 * volatility * price
    price = price * (1 + trend) + change

    // Ensure price doesn't go below a reasonable value
    price = Math.max(price, basePrice * 0.5)

    data.push({
      date: date.toISOString().split("T")[0],
      price: Number(price.toFixed(2)),
    })
  }

  return data
}

// Generate stock news
const generateStockNews = (ticker: string): StockNewsItem[] => {
  const newsItems: Record<string, StockNewsItem[]> = {
    AAPL: [
      {
        id: "aapl-1",
        title: "Apple Announces New iPhone 15 Pro with Revolutionary Camera System",
        source: "TechCrunch",
        date: "2025-03-15",
        url: "#",
      },
      {
        id: "aapl-2",
        title: "Apple's Services Revenue Hits All-Time High in Q1 2025",
        source: "Bloomberg",
        date: "2025-02-28",
        url: "#",
      },
      {
        id: "aapl-3",
        title: "Apple Vision Pro 2 Rumored for Fall 2025 Release",
        source: "MacRumors",
        date: "2025-02-10",
        url: "#",
      },
    ],
    MSFT: [
      {
        id: "msft-1",
        title: "Microsoft Azure AI Services Expand with New Enterprise Features",
        source: "ZDNet",
        date: "2025-03-12",
        url: "#",
      },
      {
        id: "msft-2",
        title: "Microsoft Announces Windows 12 Release Date",
        source: "The Verge",
        date: "2025-03-05",
        url: "#",
      },
      {
        id: "msft-3",
        title: "Microsoft's Gaming Division Reports Record Growth After Activision Integration",
        source: "GameSpot",
        date: "2025-02-20",
        url: "#",
      },
    ],
    AMZN: [
      {
        id: "amzn-1",
        title: "Amazon Expands Same-Day Delivery to 25 New Cities",
        source: "CNBC",
        date: "2025-03-18",
        url: "#",
      },
      {
        id: "amzn-2",
        title: "AWS Launches New AI Infrastructure Services for Enterprise Customers",
        source: "TechCrunch",
        date: "2025-03-02",
        url: "#",
      },
      {
        id: "amzn-3",
        title: "Amazon's Logistics Network Now Handles 85% of Its Own Deliveries",
        source: "Wall Street Journal",
        date: "2025-02-15",
        url: "#",
      },
    ],
    GOOGL: [
      {
        id: "googl-1",
        title: "Google Unveils Next-Generation Search with Advanced AI Integration",
        source: "The Verge",
        date: "2025-03-20",
        url: "#",
      },
      {
        id: "googl-2",
        title: "Alphabet's Waymo Expands Autonomous Taxi Service to 5 New Cities",
        source: "Reuters",
        date: "2025-03-10",
        url: "#",
      },
      {
        id: "googl-3",
        title: "Google Cloud Platform Reports 40% Year-Over-Year Growth",
        source: "Bloomberg",
        date: "2025-02-25",
        url: "#",
      },
    ],
    NVDA: [
      {
        id: "nvda-1",
        title: "NVIDIA Announces Next-Gen GeForce RTX 5090 Graphics Cards",
        source: "PC Gamer",
        date: "2025-03-22",
        url: "#",
      },
      {
        id: "nvda-2",
        title: "NVIDIA's AI Chips Power 80% of New Data Center Deployments",
        source: "Forbes",
        date: "2025-03-08",
        url: "#",
      },
      {
        id: "nvda-3",
        title: "NVIDIA Partners with Leading Automakers for Next-Gen Self-Driving Technology",
        source: "Automotive News",
        date: "2025-02-18",
        url: "#",
      },
    ],
    TSLA: [
      {
        id: "tsla-1",
        title: "Tesla Unveils New Model 2 Starting at $25,000",
        source: "Electrek",
        date: "2025-03-25",
        url: "#",
      },
      {
        id: "tsla-2",
        title: "Tesla's Full Self-Driving Software Reaches Level 4 Autonomy",
        source: "TechCrunch",
        date: "2025-03-15",
        url: "#",
      },
      {
        id: "tsla-3",
        title: "Tesla Energy Storage Deployments Double Year-Over-Year",
        source: "CleanTechnica",
        date: "2025-02-28",
        url: "#",
      },
    ],
    JNJ: [
      {
        id: "jnj-1",
        title: "Johnson & Johnson's New Cancer Treatment Receives FDA Approval",
        source: "Reuters",
        date: "2025-03-20",
        url: "#",
      },
      {
        id: "jnj-2",
        title: "J&J Expands Medical Device Division with Strategic Acquisition",
        source: "MedTech Dive",
        date: "2025-03-05",
        url: "#",
      },
      {
        id: "jnj-3",
        title: "Johnson & Johnson Reports Strong Q1 Results Driven by Pharmaceutical Sales",
        source: "Wall Street Journal",
        date: "2025-02-10",
        url: "#",
      },
    ],
    JPM: [
      {
        id: "jpm-1",
        title: "JPMorgan Chase Launches New Digital Banking Platform for Small Businesses",
        source: "CNBC",
        date: "2025-03-18",
        url: "#",
      },
      {
        id: "jpm-2",
        title: "JPMorgan's Investment Banking Division Reports Record Quarter",
        source: "Financial Times",
        date: "2025-03-02",
        url: "#",
      },
      {
        id: "jpm-3",
        title: "JPMorgan Chase Expands Presence in Asian Markets with New Offices",
        source: "Bloomberg",
        date: "2025-02-15",
        url: "#",
      },
    ],
    V: [
      {
        id: "v-1",
        title: "Visa Introduces New Blockchain-Based Cross-Border Payment Solution",
        source: "PaymentsSource",
        date: "2025-03-22",
        url: "#",
      },
      {
        id: "v-2",
        title: "Visa Reports Strong Growth in Contactless Payments Worldwide",
        source: "CNBC",
        date: "2025-03-10",
        url: "#",
      },
      {
        id: "v-3",
        title: "Visa Partners with Major Fintech Startups to Expand Digital Wallet Services",
        source: "TechCrunch",
        date: "2025-02-25",
        url: "#",
      },
    ],
    PG: [
      {
        id: "pg-1",
        title: "Procter & Gamble Launches Eco-Friendly Product Line",
        source: "Business Insider",
        date: "2025-03-15",
        url: "#",
      },
      {
        id: "pg-2",
        title: "P&G Expands Direct-to-Consumer Strategy with New Online Platform",
        source: "Retail Dive",
        date: "2025-03-01",
        url: "#",
      },
      {
        id: "pg-3",
        title: "Procter & Gamble Raises Dividend for 69th Consecutive Year",
        source: "Seeking Alpha",
        date: "2025-02-12",
        url: "#",
      },
    ],
  }

  return newsItems[ticker] || []
}

// Create mock stocks data
const stocks = generateStocks()
const totalValue = stocks.reduce((sum, stock) => sum + stock.value, 0)

export const mockStocksData = {
  stocks,
  totalValue,
  getPriceHistory: generateStockPriceHistory,
  getStockNews: generateStockNews,
}
