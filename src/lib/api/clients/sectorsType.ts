export interface SectorData {
  name: string;
  description: string;
  performanceData: Array<{
    date: string;
    value: number;
  }>;
  topStocks: Array<{
    ticker: string;
    name: string;
    price: number;
    marketCap: number;
    peRatio: number;
    dividendYield: number;
  }>;
  trends: Array<{
    title: string;
    description: string;
    impact: 'positive' | 'negative' | 'neutral';
  }>;
  metrics: {
    marketSize: string;
    growthRate: string;
    averagePE: number;
    dividendYield: string;
    volatility: string;
  };
}