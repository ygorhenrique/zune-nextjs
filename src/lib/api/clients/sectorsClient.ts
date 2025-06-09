import { apiClient } from './apiClient';
import { SectorData } from './sectorsType';

export const sectorsClient = {
  // Fetch sector data for a specific sector by name
  async getSectorData(sectorName: string): Promise<SectorData> {
    try {
      const url = `https://api.zune.money/sector/${sectorName.toLowerCase()}`;
      const response = await apiClient.get<SectorData>(url);

      if (!response) {
        throw new Error('Invalid response format or no data available');
      }

      return {
        name: response.name,
        description: response.description,
        performanceData: response.performanceData.map((data: any) => ({
          date: data.date,
          value: data.value,
        })),
        topStocks: response.topStocks.map((stock: any) => ({
          ticker: stock.ticker,
          name: stock.name,
          price: stock.price,
          dividendYield: stock.dividendYield,
          peRatio: stock.peRatio,
          marketCap: stock.marketCap,
        })),
        trends: response.trends.map((trend: any) => ({
          title: trend.title,
          description: trend.description,
          impact: trend.impact,
        })),
        metrics: {
          marketSize: response.metrics.marketSize,
          growthRate: response.metrics.growthRate,
          averagePE: response.metrics.averagePE,
          dividendYield: response.metrics.dividendYield,
          volatility: response.metrics.volatility,
        },
      };
    } catch (error) {
      console.error(`Error fetching sector data for ${sectorName}:`, error);
      throw error;
    }
  },
};