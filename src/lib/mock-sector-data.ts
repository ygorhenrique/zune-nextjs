// Mock data for sector-based stock pages

export interface SectorPerformance {
  date: string
  value: number
}

export interface SectorStock {
  ticker: string
  companyName: string
  price: number
  change?: number
  changePercent?: number
  dividendYield: number
  peRatio: number
  marketCap: number
}

export interface SectorTrend {
  title: string
  description: string
}

export interface SectorMetric {
  marketSize: string
  growthRate: string
  averagePE: number
  dividendYield: string
  volatility: string
}

export interface SectorData {
  id: string
  name: string
  description: string
  performanceData: SectorPerformance[]
  topStocks: SectorStock[]
  trends: SectorTrend[]
  metrics: SectorMetric
}

// Let's update the generatePerformanceData function to ensure it's creating valid data
function generatePerformanceData(baseValue: number, volatility: number): SectorPerformance[] {
  const data: SectorPerformance[] = []
  const today = new Date()
  const oneYearAgo = new Date()
  oneYearAgo.setFullYear(today.getFullYear() - 1)

  let currentValue = baseValue
  let currentDate = new Date(oneYearAgo)

  while (currentDate <= today) {
    // Random daily fluctuation based on volatility
    const change = (Math.random() - 0.5) * volatility * currentValue
    currentValue = Math.max(currentValue + change, currentValue * 0.7) // Prevent going too low

    data.push({
      date: currentDate.toISOString().split("T")[0],
      value: Number(currentValue.toFixed(2)),
    })

    // Move to next day
    const nextDate = new Date(currentDate)
    nextDate.setDate(nextDate.getDate() + 1)
    currentDate = nextDate
  }

  return data
}

const sectorData: Record<string, SectorData> = {
  tech: {
    id: "tech",
    name: "Technology",
    description:
      "The technology sector encompasses companies focused on research, development, and distribution of technology-based products and services. This includes software development, hardware manufacturing, cloud computing, artificial intelligence, and more. The sector is known for its rapid innovation, high growth potential, and significant impact on global economies.",
    performanceData: generatePerformanceData(100, 0.02),
    topStocks: [
      { ticker: "AAPL", companyName: "Apple Inc.", price: 189.84, dividendYield: 0.5, peRatio: 31.2, marketCap: 2950 },
      {
        ticker: "MSFT",
        companyName: "Microsoft Corporation",
        price: 378.92,
        dividendYield: 0.7,
        peRatio: 37.5,
        marketCap: 2820,
      },
      {
        ticker: "GOOGL",
        companyName: "Alphabet Inc.",
        price: 142.65,
        dividendYield: 0,
        peRatio: 25.8,
        marketCap: 1790,
      },
      {
        ticker: "AMZN",
        companyName: "Amazon.com Inc.",
        price: 178.35,
        dividendYield: 0,
        peRatio: 61.2,
        marketCap: 1850,
      },
      {
        ticker: "NVDA",
        companyName: "NVIDIA Corporation",
        price: 824.18,
        dividendYield: 0.03,
        peRatio: 96.4,
        marketCap: 2030,
      },
      {
        ticker: "META",
        companyName: "Meta Platforms Inc.",
        price: 474.32,
        dividendYield: 0,
        peRatio: 32.1,
        marketCap: 1210,
      },
      { ticker: "TSLA", companyName: "Tesla, Inc.", price: 177.58, dividendYield: 0, peRatio: 50.8, marketCap: 565 },
      { ticker: "ADBE", companyName: "Adobe Inc.", price: 474.75, dividendYield: 0, peRatio: 45.6, marketCap: 215 },
      {
        ticker: "CRM",
        companyName: "Salesforce, Inc.",
        price: 273.66,
        dividendYield: 0,
        peRatio: 65.3,
        marketCap: 266,
      },
      {
        ticker: "INTC",
        companyName: "Intel Corporation",
        price: 31.36,
        dividendYield: 1.4,
        peRatio: 32.5,
        marketCap: 132,
      },
    ],
    trends: [
      {
        title: "AI Integration Accelerates",
        description:
          "Technology companies are rapidly integrating artificial intelligence capabilities into their products and services, driving innovation and creating new market opportunities.",
      },
      {
        title: "Cloud Computing Expansion",
        description:
          "The cloud computing market continues to grow as businesses increasingly migrate their operations to cloud-based platforms, benefiting major providers.",
      },
      {
        title: "Semiconductor Demand Surge",
        description:
          "Global demand for semiconductors remains strong, particularly for advanced chips used in AI applications, data centers, and electric vehicles.",
      },
      {
        title: "Regulatory Scrutiny Increases",
        description:
          "Tech giants face growing regulatory challenges globally, with concerns about market dominance, data privacy, and content moderation.",
      },
    ],
    metrics: {
      marketSize: "$5.2 trillion globally",
      growthRate: "7.4% annual growth rate",
      averagePE: 37.2,
      dividendYield: "0.38%",
      volatility: "Medium-High",
    },
  },
  energy: {
    id: "energy",
    name: "Energy",
    description:
      "The energy sector comprises companies involved in the exploration, production, refining, marketing, and distribution of energy resources. This includes traditional oil and gas companies, as well as renewable energy providers focusing on solar, wind, hydroelectric, and other sustainable energy sources. The sector plays a critical role in global economic development and is undergoing significant transformation due to the shift toward cleaner energy alternatives.",
    performanceData: generatePerformanceData(80, 0.025),
    topStocks: [
      {
        ticker: "XOM",
        companyName: "Exxon Mobil Corporation",
        price: 118.96,
        dividendYield: 3.2,
        peRatio: 14.5,
        marketCap: 475,
      },
      {
        ticker: "CVX",
        companyName: "Chevron Corporation",
        price: 156.28,
        dividendYield: 4.0,
        peRatio: 13.8,
        marketCap: 290,
      },
      { ticker: "SHEL", companyName: "Shell plc", price: 71.82, dividendYield: 3.8, peRatio: 12.9, marketCap: 235 },
      { ticker: "BP", companyName: "BP p.l.c.", price: 35.42, dividendYield: 4.5, peRatio: 11.2, marketCap: 98 },
      {
        ticker: "TTE",
        companyName: "TotalEnergies SE",
        price: 67.85,
        dividendYield: 4.7,
        peRatio: 8.4,
        marketCap: 162,
      },
      {
        ticker: "ENPH",
        companyName: "Enphase Energy, Inc.",
        price: 118.92,
        dividendYield: 0,
        peRatio: 38.6,
        marketCap: 16,
      },
      {
        ticker: "NEE",
        companyName: "NextEra Energy, Inc.",
        price: 73.45,
        dividendYield: 2.5,
        peRatio: 20.1,
        marketCap: 150,
      },
      {
        ticker: "FSLR",
        companyName: "First Solar, Inc.",
        price: 176.83,
        dividendYield: 0,
        peRatio: 19.3,
        marketCap: 18.9,
      },
      {
        ticker: "COP",
        companyName: "ConocoPhillips",
        price: 114.57,
        dividendYield: 1.8,
        peRatio: 12.8,
        marketCap: 134,
      },
      {
        ticker: "SLB",
        companyName: "Schlumberger Limited",
        price: 43.89,
        dividendYield: 2.0,
        peRatio: 14.7,
        marketCap: 62.5,
      },
    ],
    trends: [
      {
        title: "Renewable Energy Growth",
        description:
          "Investment in renewable energy continues to accelerate, with solar and wind capacity expanding globally as costs decrease and efficiency improves.",
      },
      {
        title: "Energy Transition Investments",
        description:
          "Traditional oil and gas companies are increasingly diversifying their portfolios by investing in clean energy technologies and carbon capture solutions.",
      },
      {
        title: "Oil Price Volatility",
        description:
          "Geopolitical tensions and supply chain disruptions continue to cause fluctuations in oil prices, affecting the profitability of exploration and production companies.",
      },
      {
        title: "Hydrogen Economy Emergence",
        description:
          "Growing interest in hydrogen as a clean energy carrier is driving investments in production, storage, and distribution infrastructure.",
      },
    ],
    metrics: {
      marketSize: "$7.3 trillion globally",
      growthRate: "4.6% annual growth rate",
      averagePE: 15.8,
      dividendYield: "3.65%",
      volatility: "High",
    },
  },
  finance: {
    id: "finance",
    name: "Finance",
    description:
      "The financial sector includes companies that provide financial services to commercial and retail customers. This encompasses banks, investment firms, insurance companies, real estate firms, and fintech enterprises. The sector is essential for economic stability and growth, facilitating capital allocation, risk management, and financial transactions across the global economy.",
    performanceData: generatePerformanceData(90, 0.018),
    topStocks: [
      {
        ticker: "JPM",
        companyName: "JPMorgan Chase & Co.",
        price: 198.47,
        dividendYield: 2.4,
        peRatio: 12.1,
        marketCap: 570,
      },
      {
        ticker: "BAC",
        companyName: "Bank of America Corporation",
        price: 37.92,
        dividendYield: 2.5,
        peRatio: 12.4,
        marketCap: 298,
      },
      {
        ticker: "WFC",
        companyName: "Wells Fargo & Company",
        price: 59.81,
        dividendYield: 2.3,
        peRatio: 12.5,
        marketCap: 215,
      },
      { ticker: "C", companyName: "Citigroup Inc.", price: 61.78, dividendYield: 3.1, peRatio: 10.2, marketCap: 118 },
      {
        ticker: "GS",
        companyName: "The Goldman Sachs Group, Inc.",
        price: 442.88,
        dividendYield: 2.7,
        peRatio: 17.3,
        marketCap: 144,
      },
      { ticker: "MS", companyName: "Morgan Stanley", price: 97.42, dividendYield: 3.4, peRatio: 16.8, marketCap: 159 },
      {
        ticker: "BLK",
        companyName: "BlackRock, Inc.",
        price: 806.77,
        dividendYield: 2.5,
        peRatio: 21.9,
        marketCap: 120,
      },
      {
        ticker: "SCHW",
        companyName: "The Charles Schwab Corporation",
        price: 74.96,
        dividendYield: 1.5,
        peRatio: 29.2,
        marketCap: 133,
      },
      {
        ticker: "AXP",
        companyName: "American Express Company",
        price: 235.96,
        dividendYield: 1.2,
        peRatio: 19.4,
        marketCap: 170,
      },
      { ticker: "V", companyName: "Visa Inc.", price: 277.18, dividendYield: 0.8, peRatio: 31.2, marketCap: 560 },
    ],
    trends: [
      {
        title: "Digital Banking Acceleration",
        description:
          "Traditional banks are rapidly expanding their digital capabilities to compete with fintech disruptors and meet changing customer preferences.",
      },
      {
        title: "Interest Rate Environment",
        description:
          "Central bank policies and interest rate changes continue to impact bank profitability, lending activity, and investment strategies.",
      },
      {
        title: "Blockchain and DeFi Growth",
        description:
          "Decentralized finance applications and blockchain technology are creating new opportunities and challenges for traditional financial institutions.",
      },
      {
        title: "ESG Investment Focus",
        description:
          "Financial firms are increasingly incorporating environmental, social, and governance factors into their investment decisions and product offerings.",
      },
    ],
    metrics: {
      marketSize: "$22.5 trillion globally",
      growthRate: "6.2% annual growth rate",
      averagePE: 16.4,
      dividendYield: "2.45%",
      volatility: "Medium",
    },
  },
  healthcare: {
    id: "healthcare",
    name: "Healthcare",
    description:
      "The healthcare sector encompasses companies involved in the provision of medical services, manufacturing of medical equipment, development of pharmaceuticals and biotechnology products, and healthcare insurance. This diverse sector plays a crucial role in improving public health outcomes and is characterized by significant research and development activities, regulatory oversight, and technological innovation.",
    performanceData: generatePerformanceData(110, 0.022),
    topStocks: [
      {
        ticker: "JNJ",
        companyName: "Johnson & Johnson",
        price: 147.52,
        dividendYield: 3.1,
        peRatio: 26.4,
        marketCap: 355,
      },
      {
        ticker: "UNH",
        companyName: "UnitedHealth Group Incorporated",
        price: 527.24,
        dividendYield: 1.4,
        peRatio: 24.3,
        marketCap: 485,
      },
      {
        ticker: "LLY",
        companyName: "Eli Lilly and Company",
        price: 770.42,
        dividendYield: 0.7,
        peRatio: 110.5,
        marketCap: 731,
      },
      { ticker: "PFE", companyName: "Pfizer Inc.", price: 28.15, dividendYield: 5.7, peRatio: 15.6, marketCap: 159 },
      { ticker: "ABBV", companyName: "AbbVie Inc.", price: 170.87, dividendYield: 3.5, peRatio: 50.8, marketCap: 302 },
      {
        ticker: "MRK",
        companyName: "Merck & Co., Inc.",
        price: 125.45,
        dividendYield: 2.4,
        peRatio: 892.5,
        marketCap: 318,
      },
      {
        ticker: "TMO",
        companyName: "Thermo Fisher Scientific Inc.",
        price: 573.16,
        dividendYield: 0.3,
        peRatio: 36.8,
        marketCap: 221,
      },
      {
        ticker: "ABT",
        companyName: "Abbott Laboratories",
        price: 107.53,
        dividendYield: 2.1,
        peRatio: 33.4,
        marketCap: 187,
      },
      {
        ticker: "DHR",
        companyName: "Danaher Corporation",
        price: 249.72,
        dividendYield: 0.4,
        peRatio: 42.3,
        marketCap: 185,
      },
      { ticker: "AMGN", companyName: "Amgen Inc.", price: 268.08, dividendYield: 3.3, peRatio: 21.5, marketCap: 143 },
    ],
    trends: [
      {
        title: "Precision Medicine Advances",
        description:
          "Healthcare companies are increasingly focusing on personalized treatments based on genetic profiles, improving efficacy and reducing side effects.",
      },
      {
        title: "Digital Health Expansion",
        description:
          "Telemedicine, remote patient monitoring, and digital health platforms continue to transform healthcare delivery and patient engagement.",
      },
      {
        title: "Aging Population Impact",
        description:
          "The growing elderly population in developed countries is driving demand for healthcare services, pharmaceuticals, and medical devices.",
      },
      {
        title: "Healthcare AI Applications",
        description:
          "Artificial intelligence is being increasingly applied to drug discovery, diagnostic imaging, clinical decision support, and administrative processes.",
      },
    ],
    metrics: {
      marketSize: "$8.8 trillion globally",
      growthRate: "5.4% annual growth rate",
      averagePE: 42.6,
      dividendYield: "1.95%",
      volatility: "Medium-Low",
    },
  },
  consumer: {
    id: "consumer",
    name: "Consumer",
    description:
      "The consumer sector comprises companies that produce and sell goods and services directly to individuals. This includes both consumer staples (essential products like food, beverages, and household items) and consumer discretionary goods (non-essential products like apparel, entertainment, and luxury items). The sector's performance is closely tied to economic conditions, consumer confidence, and changing lifestyle preferences.",
    performanceData: generatePerformanceData(95, 0.016),
    topStocks: [
      {
        ticker: "PG",
        companyName: "The Procter & Gamble Company",
        price: 165.87,
        dividendYield: 2.4,
        peRatio: 28.6,
        marketCap: 391,
      },
      {
        ticker: "KO",
        companyName: "The Coca-Cola Company",
        price: 60.24,
        dividendYield: 3.0,
        peRatio: 26.2,
        marketCap: 260,
      },
      { ticker: "PEP", companyName: "PepsiCo, Inc.", price: 169.84, dividendYield: 3.1, peRatio: 25.7, marketCap: 233 },
      {
        ticker: "COST",
        companyName: "Costco Wholesale Corporation",
        price: 731.31,
        dividendYield: 0.6,
        peRatio: 48.1,
        marketCap: 324,
      },
      { ticker: "WMT", companyName: "Walmart Inc.", price: 60.24, dividendYield: 1.4, peRatio: 28.5, marketCap: 485 },
      {
        ticker: "HD",
        companyName: "The Home Depot, Inc.",
        price: 342.45,
        dividendYield: 2.5,
        peRatio: 23.1,
        marketCap: 339,
      },
      { ticker: "NKE", companyName: "NIKE, Inc.", price: 93.46, dividendYield: 1.5, peRatio: 27.8, marketCap: 141 },
      {
        ticker: "MCD",
        companyName: "McDonald's Corporation",
        price: 266.69,
        dividendYield: 2.3,
        peRatio: 22.6,
        marketCap: 193,
      },
      {
        ticker: "SBUX",
        companyName: "Starbucks Corporation",
        price: 75.12,
        dividendYield: 2.7,
        peRatio: 20.5,
        marketCap: 85,
      },
      {
        ticker: "AMZN",
        companyName: "Amazon.com, Inc.",
        price: 178.35,
        dividendYield: 0,
        peRatio: 61.2,
        marketCap: 1850,
      },
    ],
    trends: [
      {
        title: "E-commerce Dominance",
        description:
          "Online shopping continues to grow, with retailers investing in digital platforms, logistics, and delivery services to meet consumer expectations.",
      },
      {
        title: "Sustainability Focus",
        description:
          "Consumer companies are responding to growing demand for environmentally friendly products and transparent supply chains.",
      },
      {
        title: "Direct-to-Consumer Models",
        description:
          "Brands are increasingly selling directly to consumers through their own channels, bypassing traditional retail intermediaries.",
      },
      {
        title: "Premiumization Trend",
        description:
          "Consumers are showing willingness to pay premium prices for high-quality, distinctive products that offer enhanced experiences or benefits.",
      },
    ],
    metrics: {
      marketSize: "$14.5 trillion globally",
      growthRate: "4.2% annual growth rate",
      averagePE: 31.2,
      dividendYield: "2.05%",
      volatility: "Medium",
    },
  },
}

export function getSectorData(sectorId: string): SectorData | undefined {
  return sectorData[sectorId.toLowerCase()]
}

export function getAllSectors(): { id: string; name: string }[] {
  return Object.values(sectorData).map((sector) => ({
    id: sector.id,
    name: sector.name,
  }))
}

export function getPopularStocks(): { ticker: string; companyName: string }[] {
  return [
    { ticker: "AAPL", companyName: "Apple Inc." },
    { ticker: "MSFT", companyName: "Microsoft Corporation" },
    { ticker: "TSLA", companyName: "Tesla, Inc." },
    { ticker: "AMZN", companyName: "Amazon.com, Inc." },
    { ticker: "GOOGL", companyName: "Alphabet Inc." },
  ]
}
