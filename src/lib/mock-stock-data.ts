// Mock data for stock details page
export interface StockPrice {
  date: string
  close: number
}

export interface DividendPayment {
  declarationDate: string
  recordDate: string
  paymentDate: string
  amount: number
  currency: string
  frequency: "Quarterly" | "Semi-Annual" | "Annual" | "Monthly" | "Special"
}

export interface SimilarCompany {
  ticker: string
  companyName: string
  exchange: string
  ceo: string
  employees: number
  city: string
  country: string
  logoUrl: string
}

export interface SectorStock {
  name: string
  ticker: string
  price: number
  change: number
}

export interface StockDetails {
  ticker: string
  companyName: string
  exchange: string
  currentPrice: number
  previousClose: number
  change: number
  changePercent: number
  currency: string
  peRatio: number
  dividendYield: number
  marketCap: number
  volume: number
  avgVolume: number
  high52Week: number
  low52Week: number
  open: number
  logoUrl: string
  sector: string
  industry: string
  employees: number
  website: string
  description: string
  headquarters: {
    city: string
    country: string
  }
  founded: number
  ceo: string
  priceHistory: {
    week: StockPrice[]
    month: StockPrice[]
    year: StockPrice[]
    fiveYears: StockPrice[]
  }
  dividendHistory: DividendPayment[]
  similarCompanies: SimilarCompany[]
  stocksBySector: Record<string, SectorStock[]>
}

// Generate mock price history data
const generatePriceHistory = (basePrice: number, days: number, volatility: number): StockPrice[] => {
  const prices: StockPrice[] = []
  let currentPrice = basePrice

  const now = new Date()

  for (let i = days; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    // Random price movement with trend
    const change = (Math.random() - 0.5) * volatility * currentPrice
    currentPrice = Math.max(currentPrice + change, 1) // Ensure price doesn't go below 1

    prices.push({
      date: date.toISOString().split("T")[0],
      close: Number.parseFloat(currentPrice.toFixed(2)),
    })
  }

  return prices
}

// Mock stock data
export const mockStockData: Record<string, StockDetails> = {
  AAPL: {
    ticker: "AAPL",
    companyName: "Apple Inc.",
    exchange: "NASDAQ",
    currentPrice: 175.5,
    previousClose: 173.75,
    change: 1.75,
    changePercent: 1.01,
    currency: "USD",
    peRatio: 28.5,
    dividendYield: 0.5,
    marketCap: 2850000000000,
    volume: 58900000,
    avgVolume: 62500000,
    high52Week: 182.94,
    low52Week: 143.9,
    open: 174.2,
    logoUrl: "/stylized-fruit-logo.png",
    sector: "Technology",
    industry: "Consumer Electronics",
    employees: 147000,
    website: "https://www.apple.com",
    description:
      "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. The company offers iPhone, iPad, Mac, Apple Watch, and various accessories.",
    headquarters: {
      city: "Cupertino",
      country: "USA",
    },
    founded: 1976,
    ceo: "Tim Cook",
    priceHistory: {
      week: generatePriceHistory(175.5, 7, 0.01),
      month: generatePriceHistory(170.25, 30, 0.015),
      year: generatePriceHistory(155.75, 365, 0.02),
      fiveYears: generatePriceHistory(120.5, 1825, 0.025),
    },
    dividendHistory: [
      {
        declarationDate: "2025-01-28",
        recordDate: "2025-02-10",
        paymentDate: "2025-02-17",
        amount: 0.24,
        currency: "USD",
        frequency: "Quarterly",
      },
      {
        declarationDate: "2024-10-30",
        recordDate: "2024-11-11",
        paymentDate: "2024-11-18",
        amount: 0.24,
        currency: "USD",
        frequency: "Quarterly",
      },
      {
        declarationDate: "2024-07-31",
        recordDate: "2024-08-12",
        paymentDate: "2024-08-19",
        amount: 0.24,
        currency: "USD",
        frequency: "Quarterly",
      },
      {
        declarationDate: "2024-05-02",
        recordDate: "2024-05-13",
        paymentDate: "2024-05-20",
        amount: 0.24,
        currency: "USD",
        frequency: "Quarterly",
      },
      {
        declarationDate: "2024-01-30",
        recordDate: "2024-02-12",
        paymentDate: "2024-02-19",
        amount: 0.23,
        currency: "USD",
        frequency: "Quarterly",
      },
      {
        declarationDate: "2023-11-02",
        recordDate: "2023-11-13",
        paymentDate: "2023-11-20",
        amount: 0.23,
        currency: "USD",
        frequency: "Quarterly",
      },
      {
        declarationDate: "2023-08-03",
        recordDate: "2023-08-14",
        paymentDate: "2023-08-21",
        amount: 0.23,
        currency: "USD",
        frequency: "Quarterly",
      },
      {
        declarationDate: "2023-05-04",
        recordDate: "2023-05-15",
        paymentDate: "2023-05-22",
        amount: 0.23,
        currency: "USD",
        frequency: "Quarterly",
      },
    ],
    similarCompanies: [
      {
        ticker: "MSFT",
        companyName: "Microsoft Corp.",
        exchange: "NASDAQ",
        ceo: "Satya Nadella",
        employees: 181000,
        city: "Redmond",
        country: "USA",
        logoUrl: "/four-squares-logo.png",
      },
      {
        ticker: "GOOGL",
        companyName: "Alphabet Inc.",
        exchange: "NASDAQ",
        ceo: "Sundar Pichai",
        employees: 156500,
        city: "Mountain View",
        country: "USA",
        logoUrl: "/colorful-search-bar.png",
      },
      {
        ticker: "AMZN",
        companyName: "Amazon.com Inc.",
        exchange: "NASDAQ",
        ceo: "Andy Jassy",
        employees: 1335000,
        city: "Seattle",
        country: "USA",
        logoUrl: "/smiling-arrow.png",
      },
      {
        ticker: "META",
        companyName: "Meta Platforms Inc.",
        exchange: "NASDAQ",
        ceo: "Mark Zuckerberg",
        employees: 77805,
        city: "Menlo Park",
        country: "USA",
        logoUrl: "/interconnected-infinity.png",
      },
      {
        ticker: "NFLX",
        companyName: "Netflix Inc.",
        exchange: "NASDAQ",
        ceo: "Ted Sarandos",
        employees: 12800,
        city: "Los Gatos",
        country: "USA",
        logoUrl: "/abstract-red-curve.png",
      },
    ],
    stocksBySector: {
      Technology: [
        { name: "Microsoft", ticker: "MSFT", price: 305.75, change: 1.2 },
        { name: "Alphabet", ticker: "GOOGL", price: 128.9, change: -0.5 },
        { name: "Amazon", ticker: "AMZN", price: 135.2, change: 0.8 },
        { name: "Meta", ticker: "META", price: 325.8, change: 2.1 },
        { name: "Netflix", ticker: "NFLX", price: 425.15, change: -0.3 },
      ],
      Finance: [
        { name: "JPMorgan Chase", ticker: "JPM", price: 145.3, change: 0.7 },
        { name: "Bank of America", ticker: "BAC", price: 35.75, change: -0.2 },
        { name: "Wells Fargo", ticker: "WFC", price: 42.5, change: 0.5 },
        { name: "Goldman Sachs", ticker: "GS", price: 325.4, change: 1.3 },
        { name: "Morgan Stanley", ticker: "MS", price: 85.2, change: -0.8 },
      ],
      Healthcare: [
        { name: "Johnson & Johnson", ticker: "JNJ", price: 165.8, change: 0.3 },
        { name: "UnitedHealth", ticker: "UNH", price: 475.25, change: -0.4 },
        { name: "Pfizer", ticker: "PFE", price: 38.9, change: 1.5 },
        { name: "Merck", ticker: "MRK", price: 105.6, change: 0.9 },
        { name: "AbbVie", ticker: "ABBV", price: 142.3, change: -0.6 },
      ],
      Energy: [
        { name: "Exxon Mobil", ticker: "XOM", price: 105.4, change: 1.8 },
        { name: "Chevron", ticker: "CVX", price: 155.2, change: 0.5 },
        { name: "ConocoPhillips", ticker: "COP", price: 115.8, change: 2.1 },
        { name: "Schlumberger", ticker: "SLB", price: 48.75, change: -0.7 },
        { name: "EOG Resources", ticker: "EOG", price: 125.3, change: 1.2 },
      ],
    },
  },
  MSFT: {
    ticker: "MSFT",
    companyName: "Microsoft Corporation",
    exchange: "NASDAQ",
    currentPrice: 305.75,
    previousClose: 302.15,
    change: 3.6,
    changePercent: 1.19,
    currency: "USD",
    peRatio: 32.8,
    dividendYield: 0.8,
    marketCap: 2270000000000,
    volume: 25300000,
    avgVolume: 28700000,
    high52Week: 315.95,
    low52Week: 245.8,
    open: 303.5,
    logoUrl: "/four-squares-logo.png",
    sector: "Technology",
    industry: "Software—Infrastructure",
    employees: 181000,
    website: "https://www.microsoft.com",
    description:
      "Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide. The company operates in three segments: Productivity and Business Processes, Intelligent Cloud, and More Personal Computing.",
    headquarters: {
      city: "Redmond",
      country: "USA",
    },
    founded: 1975,
    ceo: "Satya Nadella",
    priceHistory: {
      week: generatePriceHistory(305.75, 7, 0.01),
      month: generatePriceHistory(300.25, 30, 0.015),
      year: generatePriceHistory(280.75, 365, 0.02),
      fiveYears: generatePriceHistory(150.5, 1825, 0.025),
    },
    dividendHistory: [
      {
        declarationDate: "2025-03-12",
        recordDate: "2025-03-20",
        paymentDate: "2025-04-10",
        amount: 0.68,
        currency: "USD",
        frequency: "Quarterly",
      },
      {
        declarationDate: "2024-12-10",
        recordDate: "2024-12-18",
        paymentDate: "2025-01-09",
        amount: 0.68,
        currency: "USD",
        frequency: "Quarterly",
      },
      {
        declarationDate: "2024-09-15",
        recordDate: "2024-09-23",
        paymentDate: "2024-10-14",
        amount: 0.68,
        currency: "USD",
        frequency: "Quarterly",
      },
      {
        declarationDate: "2024-06-13",
        recordDate: "2024-06-21",
        paymentDate: "2024-07-11",
        amount: 0.68,
        currency: "USD",
        frequency: "Quarterly",
      },
      {
        declarationDate: "2024-03-14",
        recordDate: "2024-03-22",
        paymentDate: "2024-04-12",
        amount: 0.62,
        currency: "USD",
        frequency: "Quarterly",
      },
      {
        declarationDate: "2023-12-12",
        recordDate: "2023-12-20",
        paymentDate: "2024-01-11",
        amount: 0.62,
        currency: "USD",
        frequency: "Quarterly",
      },
      {
        declarationDate: "2023-09-14",
        recordDate: "2023-09-22",
        paymentDate: "2023-10-12",
        amount: 0.62,
        currency: "USD",
        frequency: "Quarterly",
      },
      {
        declarationDate: "2023-06-15",
        recordDate: "2023-06-23",
        paymentDate: "2023-07-13",
        amount: 0.62,
        currency: "USD",
        frequency: "Quarterly",
      },
    ],
    similarCompanies: [
      {
        ticker: "AAPL",
        companyName: "Apple Inc.",
        exchange: "NASDAQ",
        ceo: "Tim Cook",
        employees: 147000,
        city: "Cupertino",
        country: "USA",
        logoUrl: "/stylized-fruit-logo.png",
      },
      {
        ticker: "GOOGL",
        companyName: "Alphabet Inc.",
        exchange: "NASDAQ",
        ceo: "Sundar Pichai",
        employees: 156500,
        city: "Mountain View",
        country: "USA",
        logoUrl: "/colorful-search-bar.png",
      },
      {
        ticker: "AMZN",
        companyName: "Amazon.com Inc.",
        exchange: "NASDAQ",
        ceo: "Andy Jassy",
        employees: 1335000,
        city: "Seattle",
        country: "USA",
        logoUrl: "/smiling-arrow.png",
      },
      {
        ticker: "CRM",
        companyName: "Salesforce Inc.",
        exchange: "NYSE",
        ceo: "Marc Benioff",
        employees: 79000,
        city: "San Francisco",
        country: "USA",
        logoUrl: "/Salesforce-Cloud.png",
      },
      {
        ticker: "ORCL",
        companyName: "Oracle Corporation",
        exchange: "NYSE",
        ceo: "Safra Catz",
        employees: 143000,
        city: "Austin",
        country: "USA",
        logoUrl: "/abstract-geometric-logo.png",
      },
    ],
    stocksBySector: {
      Technology: [
        { name: "Apple", ticker: "AAPL", price: 175.5, change: 1.01 },
        { name: "Alphabet", ticker: "GOOGL", price: 128.9, change: -0.5 },
        { name: "Amazon", ticker: "AMZN", price: 135.2, change: 0.8 },
        { name: "Meta", ticker: "META", price: 325.8, change: 2.1 },
        { name: "Netflix", ticker: "NFLX", price: 425.15, change: -0.3 },
      ],
      Finance: [
        { name: "JPMorgan Chase", ticker: "JPM", price: 145.3, change: 0.7 },
        { name: "Bank of America", ticker: "BAC", price: 35.75, change: -0.2 },
        { name: "Wells Fargo", ticker: "WFC", price: 42.5, change: 0.5 },
        { name: "Goldman Sachs", ticker: "GS", price: 325.4, change: 1.3 },
        { name: "Morgan Stanley", ticker: "MS", price: 85.2, change: -0.8 },
      ],
      Healthcare: [
        { name: "Johnson & Johnson", ticker: "JNJ", price: 165.8, change: 0.3 },
        { name: "UnitedHealth", ticker: "UNH", price: 475.25, change: -0.4 },
        { name: "Pfizer", ticker: "PFE", price: 38.9, change: 1.5 },
        { name: "Merck", ticker: "MRK", price: 105.6, change: 0.9 },
        { name: "AbbVie", ticker: "ABBV", price: 142.3, change: -0.6 },
      ],
      Energy: [
        { name: "Exxon Mobil", ticker: "XOM", price: 105.4, change: 1.8 },
        { name: "Chevron", ticker: "CVX", price: 155.2, change: 0.5 },
        { name: "ConocoPhillips", ticker: "COP", price: 115.8, change: 2.1 },
        { name: "Schlumberger", ticker: "SLB", price: 48.75, change: -0.7 },
        { name: "EOG Resources", ticker: "EOG", price: 125.3, change: 1.2 },
      ],
    },
  },
  // Add more stocks as needed
}

// Function to get stock details by ticker
export const getStockByTicker = (ticker: string): StockDetails | undefined => {
  return mockStockData[ticker.toUpperCase()]
}

// Function to get all available stock tickers
export const getAllStockTickers = (): string[] => {
  return Object.keys(mockStockData)
}

// Mock stock data for the stock comparison tool

interface StockData {
  ticker: string
  companyName: string
  currentPrice: number
  dividendYield: number
  peRatio: number
  marketCap: string
  fiftyTwoWeekHigh: number
  fiftyTwoWeekLow: number
  sector: string
  industry: string
  description: string
}

const stockDatabase: Record<string, StockData> = {
  AAPL: {
    ticker: "AAPL",
    companyName: "Apple Inc.",
    currentPrice: 150.25,
    dividendYield: 0.65,
    peRatio: 25.3,
    marketCap: "$2.5T",
    fiftyTwoWeekHigh: 180.1,
    fiftyTwoWeekLow: 120.5,
    sector: "Technology",
    industry: "Consumer Electronics",
    description:
      "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.",
  },
  MSFT: {
    ticker: "MSFT",
    companyName: "Microsoft Corp.",
    currentPrice: 305.75,
    dividendYield: 0.75,
    peRatio: 32.1,
    marketCap: "$2.3T",
    fiftyTwoWeekHigh: 349.67,
    fiftyTwoWeekLow: 243.0,
    sector: "Technology",
    industry: "Software",
    description:
      "Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide.",
  },
  KO: {
    ticker: "KO",
    companyName: "Coca-Cola Co.",
    currentPrice: 62.5,
    dividendYield: 3.1,
    peRatio: 24.8,
    marketCap: "$270B",
    fiftyTwoWeekHigh: 65.0,
    fiftyTwoWeekLow: 55.0,
    sector: "Consumer Defensive",
    industry: "Beverages",
    description: "The Coca-Cola Company manufactures, markets, and sells various nonalcoholic beverages worldwide.",
  },
  JNJ: {
    ticker: "JNJ",
    companyName: "Johnson & Johnson",
    currentPrice: 165.3,
    dividendYield: 2.95,
    peRatio: 22.5,
    marketCap: "$430B",
    fiftyTwoWeekHigh: 175.2,
    fiftyTwoWeekLow: 155.1,
    sector: "Healthcare",
    industry: "Drug Manufacturers",
    description:
      "Johnson & Johnson researches, develops, manufactures, and sells various products in the healthcare field worldwide.",
  },
  PG: {
    ticker: "PG",
    companyName: "Procter & Gamble",
    currentPrice: 145.8,
    dividendYield: 2.45,
    peRatio: 25.2,
    marketCap: "$400B",
    fiftyTwoWeekHigh: 152.3,
    fiftyTwoWeekLow: 135.7,
    sector: "Consumer Defensive",
    industry: "Household Products",
    description: "The Procter & Gamble Company provides branded consumer packaged goods worldwide.",
  },
  V: {
    ticker: "V",
    companyName: "Visa Inc.",
    currentPrice: 235.4,
    dividendYield: 0.8,
    peRatio: 30.5,
    marketCap: "$490B",
    fiftyTwoWeekHigh: 250.2,
    fiftyTwoWeekLow: 200.1,
    sector: "Financial Services",
    industry: "Credit Services",
    description: "Visa Inc. operates as a payments technology company worldwide.",
  },
  JPM: {
    ticker: "JPM",
    companyName: "JPMorgan Chase & Co.",
    currentPrice: 155.2,
    dividendYield: 2.6,
    peRatio: 12.3,
    marketCap: "$460B",
    fiftyTwoWeekHigh: 172.5,
    fiftyTwoWeekLow: 135.8,
    sector: "Financial Services",
    industry: "Banks",
    description: "JPMorgan Chase & Co. operates as a financial services company worldwide.",
  },
  HD: {
    ticker: "HD",
    companyName: "Home Depot Inc.",
    currentPrice: 325.7,
    dividendYield: 2.3,
    peRatio: 21.8,
    marketCap: "$330B",
    fiftyTwoWeekHigh: 345.6,
    fiftyTwoWeekLow: 280.2,
    sector: "Consumer Cyclical",
    industry: "Home Improvement Retail",
    description: "The Home Depot, Inc. operates home improvement retail stores.",
  },
  DIS: {
    ticker: "DIS",
    companyName: "Walt Disney Co.",
    currentPrice: 110.5,
    dividendYield: 0.0,
    peRatio: 68.2,
    marketCap: "$200B",
    fiftyTwoWeekHigh: 150.3,
    fiftyTwoWeekLow: 90.4,
    sector: "Communication Services",
    industry: "Entertainment",
    description: "The Walt Disney Company operates as an entertainment company worldwide.",
  },
  NVDA: {
    ticker: "NVDA",
    companyName: "NVIDIA Corp.",
    currentPrice: 420.3,
    dividendYield: 0.05,
    peRatio: 65.8,
    marketCap: "$1.05T",
    fiftyTwoWeekHigh: 480.9,
    fiftyTwoWeekLow: 180.7,
    sector: "Technology",
    industry: "Semiconductors",
    description:
      "NVIDIA Corporation provides graphics, and compute and networking solutions in the United States, Taiwan, China, and internationally.",
  },
}

export function getStockData(ticker: string): StockData {
  const stock = stockDatabase[ticker.toUpperCase()]
  if (!stock) {
    throw new Error(`Stock data not found for ticker: ${ticker}`)
  }
  return stock
}

export function getAllStocks(): StockData[] {
  return Object.values(stockDatabase)
}

export function getStocksByIndustry(industry: string): StockData[] {
  return Object.values(stockDatabase).filter((stock) => stock.industry === industry)
}

export function getStocksBySector(sector: string): StockData[] {
  return Object.values(stockDatabase).filter((stock) => stock.sector === sector)
}
