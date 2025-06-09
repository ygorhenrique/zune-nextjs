// Mock data for sector-based stock pages

export interface SectorPerformance {
  date: string
  value: number
}

export interface SectorStock {
  ticker: string
  name: string
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