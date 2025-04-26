export type SearchResultType = "stock" | "profile" | "portfolio"

export interface SearchResult {
  id: string
  type: SearchResultType
  title: string
  subtitle: string
  metadata: string
  url: string
  performance?: {
    value: number
    isPositive: boolean
  }
}

// Mock data for search suggestions
export const mockStocks = [
  { ticker: "AAPL", name: "Apple Inc.", price: 150.25, change: 2.5 },
  { ticker: "TSLA", name: "Tesla Inc.", price: 245.5, change: -1.8 },
  { ticker: "MSFT", name: "Microsoft Corp.", price: 305.75, change: 1.2 },
  { ticker: "AMZN", name: "Amazon.com Inc.", price: 135.2, change: 0.8 },
  { ticker: "GOOGL", name: "Alphabet Inc.", price: 128.9, change: -0.5 },
  { ticker: "META", name: "Meta Platforms Inc.", price: 325.45, change: 1.7 },
  { ticker: "NVDA", name: "NVIDIA Corp.", price: 420.8, change: 3.2 },
  { ticker: "NFLX", name: "Netflix Inc.", price: 550.3, change: -0.3 },
  { ticker: "DIS", name: "Walt Disney Co.", price: 105.75, change: 0.5 },
  { ticker: "PYPL", name: "PayPal Holdings Inc.", price: 62.4, change: -1.2 },
]

export const mockProfiles = [
  { name: "Alex Smith", role: "Investor", followers: 500, username: "alexsmith" },
  { name: "Emma Johnson", role: "Trader", followers: 1200, username: "emmajohnson" },
  { name: "Michael Brown", role: "Analyst", followers: 300, username: "michaelbrown" },
  { name: "Sarah Davis", role: "Financial Advisor", followers: 850, username: "sarahdavis" },
  { name: "James Wilson", role: "Portfolio Manager", followers: 1500, username: "jameswilson" },
  { name: "Olivia Martinez", role: "Day Trader", followers: 720, username: "oliviamartinez" },
  { name: "William Taylor", role: "Wealth Manager", followers: 950, username: "williamtaylor" },
  { name: "Sophia Anderson", role: "Investment Banker", followers: 1100, username: "sophiaanderson" },
]

export const mockPortfolios = [
  { name: "Growth Portfolio", creator: "Alex Smith", ytd: 25, id: "growth-portfolio" },
  { name: "Tech Focus", creator: "Emma Johnson", ytd: 18, id: "tech-focus" },
  { name: "Dividend Kings", creator: "Michael Brown", ytd: 10, id: "dividend-kings" },
  { name: "Value Investing", creator: "Sarah Davis", ytd: 15, id: "value-investing" },
  { name: "Global Markets", creator: "James Wilson", ytd: -5, id: "global-markets" },
  { name: "Green Energy", creator: "Olivia Martinez", ytd: 22, id: "green-energy" },
  { name: "Healthcare Innovation", creator: "William Taylor", ytd: 12, id: "healthcare-innovation" },
  { name: "Emerging Markets", creator: "Sophia Anderson", ytd: -8, id: "emerging-markets" },
]

export const mockSearchData: SearchResult[] = [
  // Stocks
  {
    id: "aapl",
    type: "stock",
    title: "AAPL",
    subtitle: "Apple Inc.",
    metadata: "$150.25",
    url: "/stock/AAPL",
    performance: {
      value: 2.5,
      isPositive: true,
    },
  },
  {
    id: "tsla",
    type: "stock",
    title: "TSLA",
    subtitle: "Tesla Inc.",
    metadata: "$245.50",
    url: "/stock/TSLA",
    performance: {
      value: 1.8,
      isPositive: false,
    },
  },
  {
    id: "msft",
    type: "stock",
    title: "MSFT",
    subtitle: "Microsoft Corp.",
    metadata: "$305.75",
    url: "/stock/MSFT",
    performance: {
      value: 1.2,
      isPositive: true,
    },
  },
  {
    id: "amzn",
    type: "stock",
    title: "AMZN",
    subtitle: "Amazon.com Inc.",
    metadata: "$182.75",
    url: "/stock/AMZN",
    performance: {
      value: 0.8,
      isPositive: true,
    },
  },
  {
    id: "googl",
    type: "stock",
    title: "GOOGL",
    subtitle: "Alphabet Inc.",
    metadata: "$175.98",
    url: "/stock/GOOGL",
    performance: {
      value: 0.5,
      isPositive: true,
    },
  },
  {
    id: "nvda",
    type: "stock",
    title: "NVDA",
    subtitle: "NVIDIA Corporation",
    metadata: "$924.79",
    url: "/stock/NVDA",
    performance: {
      value: 3.2,
      isPositive: true,
    },
  },
  {
    id: "meta",
    type: "stock",
    title: "META",
    subtitle: "Meta Platforms Inc.",
    metadata: "$485.15",
    url: "/stock/META",
    performance: {
      value: 1.5,
      isPositive: true,
    },
  },

  // Profiles
  {
    id: "alexsmith",
    type: "profile",
    title: "Alex Smith",
    subtitle: "Investor",
    metadata: "500 followers",
    url: "/profile/alexsmith",
  },
  {
    id: "emmajohnson",
    type: "profile",
    title: "Emma Johnson",
    subtitle: "Trader",
    metadata: "1,200 followers",
    url: "/profile/emmajohnson",
  },
  {
    id: "michaelbrown",
    type: "profile",
    title: "Michael Brown",
    subtitle: "Analyst",
    metadata: "300 followers",
    url: "/profile/michaelbrown",
  },
  {
    id: "sarahwilliams",
    type: "profile",
    title: "Sarah Williams",
    subtitle: "Financial Advisor",
    metadata: "850 followers",
    url: "/profile/sarahwilliams",
  },

  // Portfolios
  {
    id: "growthportfolio",
    type: "portfolio",
    title: "Growth Portfolio",
    subtitle: "by Alex Smith",
    metadata: "YTD",
    url: "/portfolio/growthportfolio",
    performance: {
      value: 25,
      isPositive: true,
    },
  },
  {
    id: "techfocus",
    type: "portfolio",
    title: "Tech Focus",
    subtitle: "by Emma Johnson",
    metadata: "YTD",
    url: "/portfolio/techfocus",
    performance: {
      value: 18,
      isPositive: true,
    },
  },
  {
    id: "dividendkings",
    type: "portfolio",
    title: "Dividend Kings",
    subtitle: "by Michael Brown",
    metadata: "YTD",
    url: "/portfolio/dividendkings",
    performance: {
      value: 10,
      isPositive: true,
    },
  },
  {
    id: "valueportfolio",
    type: "portfolio",
    title: "Value Portfolio",
    subtitle: "by Sarah Williams",
    metadata: "YTD",
    url: "/portfolio/valueportfolio",
    performance: {
      value: 8.5,
      isPositive: true,
    },
  },
  {
    id: "etfportfolio",
    type: "portfolio",
    title: "ETF Portfolio",
    subtitle: "by Alex Smith",
    metadata: "YTD",
    url: "/portfolio/etfportfolio",
    performance: {
      value: 12.3,
      isPositive: true,
    },
  },
]

// Function to filter search results based on query and type filters
export function filterSearchResults(
  query: string,
  typeFilters: SearchResultType[] = ["stock", "profile", "portfolio"],
): SearchResult[] {
  if (!query || query.length < 2) return []

  const normalizedQuery = query.toLowerCase()

  return mockSearchData.filter((result) => {
    // Check if the result type is in the active filters
    if (!typeFilters.includes(result.type)) return false

    // Check if the query matches the title or subtitle
    return (
      result.title.toLowerCase().includes(normalizedQuery) || result.subtitle.toLowerCase().includes(normalizedQuery)
    )
  })
}

// Function to get recent searches from local storage
export function getRecentSearches(): SearchResult[] {
  if (typeof window === "undefined") return []

  try {
    const recentSearches = localStorage.getItem("recentSearches")
    return recentSearches ? JSON.parse(recentSearches) : []
  } catch (error) {
    console.error("Error getting recent searches:", error)
    return []
  }
}

// Function to save a search to recent searches
export function saveRecentSearch(result: SearchResult): void {
  if (typeof window === "undefined") return

  try {
    const recentSearches = getRecentSearches()

    // Remove the result if it already exists
    const filteredSearches = recentSearches.filter((search) => search.id !== result.id)

    // Add the new result to the beginning
    const updatedSearches = [result, ...filteredSearches].slice(0, 3)

    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches))
  } catch (error) {
    console.error("Error saving recent search:", error)
  }
}
