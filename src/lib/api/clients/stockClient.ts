// lib/api/clients/stockClient.ts
import { SimilarCompany } from '@/lib/mock-stock-data';
import { apiClient } from './apiClient';
import {
  LastCloseResponse,
  CompanyFundamentals,
  Dividend,
  CompanyInfo,
  StockDailyResponse,
  StockData,
  Peer,
  CompanyLegacyEntity,
  SectorStockResponse,
  QuoteResponse
} from './types';

// Helper to map period to Alpha Vantage output size
const mapPeriodToOutputSize = (period: string): string => {
  switch (period) {
    case 'week':
      return 'compact'; // Last 100 data points (~3 months, adjust as needed)
    case 'month':
      return 'compact';
    case '12-months':
      return 'full'; // Full history
    case '5-years':
      return 'full';
    default:
      return 'compact';
  }
};

export const stockClient = {
  // Existing method for daily stock data (Alpha Vantage)
  async getDailyStockData(symbol: string): Promise<StockData[]> {
    try {
      const outputSize = 'compact';
      const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=${outputSize}&apikey=demo`;
      const response = await apiClient.get<StockDailyResponse>(url);

      if (!response['Time Series (Daily)']) {
        throw new Error('Invalid response format or no data available');
      }

      const timeSeries = response['Time Series (Daily)'];
      const stockData: StockData[] = Object.entries(timeSeries).map(([date, values]) => ({
        date,
        open: parseFloat(values['1. open']),
        high: parseFloat(values['2. high']),
        low: parseFloat(values['3. low']),
        close: parseFloat(values['4. close']),
        volume: parseInt(values['5. volume'], 10),
      }));

      return stockData;
    } catch (error) {
      console.error(`Error fetching stock data for ${symbol}:`, error);
      throw error;
    }
  },

  // New method: Fetch last closing price (mocked with Alpha Vantage)
  async getLastClose(symbol: string): Promise<LastCloseResponse> {
    try {
      // Alpha Vantage TIME_SERIES_DAILY can give us the last close
      const url = `https://api.zune.money/stock/${symbol}/last-close`;
      const response = await apiClient.get<StockDailyResponse>(url);

      if (!response['Time Series (Daily)']) {
        throw new Error('Invalid response format or no data available');
      }

      const timeSeries = response['Time Series (Daily)'];
      const latestDate = Object.keys(timeSeries)[0];
      return parseFloat(timeSeries[latestDate]['4. close']);
    } catch (error) {
      console.error(`Error fetching last close for ${symbol}:`, error);
      throw error;
    }
  },

  // Legacy Company Endpoint
  async getCompanyQuote(symbol: string): Promise<QuoteResponse | null> {
    try {
      // Financial Modeling Prep profile endpoint (requires API key in practice)
      const url = `https://api.zune.money/stock/${symbol}/quote`;
      const response = await apiClient.get<QuoteResponse>(url);

      if (!response) {
        //throw new Error('Invalid response format or no data available');
        return null
      }
      return response as QuoteResponse;
    } catch (error) {
      console.error(`Error fetching fundamentals for ${symbol}:`, error);
      throw error;
    }
  },

  // Legacy Company Endpoint
  async getCompanyLastClose(symbol: string): Promise<LastCloseResponse> {
    try {
      // Financial Modeling Prep profile endpoint (requires API key in practice)
      const url = `https://api.zune.money/stock/${symbol}/last-close`;
      const response = await apiClient.get<number>(url);

      if (!response) {
        throw new Error('Invalid response format or no data available');
      }
      return response as LastCloseResponse;
    } catch (error) {
      console.error(`Error fetching fundamentals for ${symbol}:`, error);
      throw error;
    }
  },

  // Legacy Company Endpoint
  async getCompanySectors(symbol: string): Promise<SectorStockResponse> {
    try {
      // Financial Modeling Prep profile endpoint (requires API key in practice)
      const url = `https://api.zune.money/stock/sectors-quote`;
      const response = await apiClient.get<SectorStockResponse>(url);

      if (!response) {
        throw new Error('Invalid response format or no data available');
      }
      return response as SectorStockResponse;
    } catch (error) {
      console.error(`Error fetching fundamentals for ${symbol}:`, error);
      throw error;
    }
  },

  // Legacy Company Endpoint
  async getCompany(symbol: string): Promise<CompanyLegacyEntity> {
    try {
      // Financial Modeling Prep profile endpoint (requires API key in practice)
      const url = `https://api.zune.money/stock/${symbol}?period=1m`;
      const response = await apiClient.get<CompanyLegacyEntity>(url);

      if (!response) {
        throw new Error('Invalid response format or no data available');
      }
      return {
        peers: response.peers.map(peer => ({
          ticker: peer.symbol,
          companyName: peer.companyName,
          exchange: peer.exchange,
          ceo: peer.ceo,
          employees: peer.employees,
          city: peer.city,
          country: peer.country,
          logoUrl: ''
        } as SimilarCompany)),
      };
    } catch (error) {
      console.error(`Error fetching fundamentals for ${symbol}:`, error);
      throw error;
    }
  },

  // New method: Fetch company fundamentals (using Financial Modeling Prep as a substitute)
  async getCompanyFundamentals(symbol: string): Promise<CompanyFundamentals> {
    try {
      // Financial Modeling Prep profile endpoint (requires API key in practice)
      const url = `https://api.zune.money/stock/${symbol.toUpperCase()}/fundamentals`;
      const response = await apiClient.get<CompanyFundamentals>(url);

      if (!response) {
        throw new Error('Invalid response format or no data available');
      }
      return {
        general: {
          code: response.general.code,
          name: response.general.name,
          exchange: response.general.exchange,
          currencyCode: response.general.currencyCode,
          ipoDate: response.general.ipoDate,
          sector: response.general.sector,
          industry: response.general.industry,
          fullTimeEmployees: response.general.fullTimeEmployees || null,
          webURL: response.general.webURL,
          description: response.general.description,
          address: response.general.address,
          addressData: response.general.addressData,
          officers: response.general.officers
            ? Object.values(response.general.officers)
            : [],
        },
        highlights: {
          marketCapitalization: response.highlights.marketCapitalization,
          peRatio: response.highlights.peRatio,
          dividendYield: response.highlights.dividendYield,
        },
        technicals: {
          "52WeekHigh": response.technicals["52WeekHigh"],
          "52WeekLow": response.technicals["52WeekLow"],
        },
      };
    } catch (error) {
      console.error(`Error fetching fundamentals for ${symbol}:`, error);
      throw error;
    }
  },

  // New method: Fetch company dividends (using Financial Modeling Prep)
  async getCompanyDividends(symbol: string): Promise<Dividend[]> {
    try {
      const url = `https://api.zune.money/stock/${symbol}/dividends`;
      const response = await apiClient.get<Dividend>(url);

      if (!response || !Array.isArray(response)) {
        throw new Error('Invalid response format or no data available');
      }

      return response.map((div: any) => ({
        declarationDate: div.declarationDate || null,
        recordDate: div.recordDate || null,
        paymentDate: div.paymentDate,
        amount: div.value,
        currency: div.currency, // FMP doesn't provide currency; assuming USD
        period: null,//div.label.includes('Quarterly') ? 'quarterly' : null, // Approximate
        frequency: null
      }));
    } catch (error) {
      console.error(`Error fetching dividends for ${symbol}:`, error);
      throw error;
    }
  },

  //   // New method: Fetch company info (price history, stats, peers)
  //   async getCompanyInfo(symbol: string, period: string): Promise<CompanyInfo> {
  //     try {
  //       // Fetch price history from Alpha Vantage
  //     //   const outputSize = mapPeriodToOutputSize(period);
  //     //   const fundamentalsUrl = `https://api.zune.money/stock/${symbol}/fundamentals`;
  //     //   const fundamentalsResponse = await apiClient.get<CompanyFundamentals>(fundamentalsUrl);

  //     //   if (!priceResponse['Time Series (Daily)']) {
  //     //     throw new Error('Invalid price history response format');
  //     //   }

  //     //   const timeSeries = priceResponse['Time Series (Daily)'];
  //     //   const priceHistory = Object.entries(timeSeries).map(([date, values]) => ({
  //     //     date,
  //     //     close: parseFloat(values['4. close']),
  //     //   }));

  //     //   // Fetch company profile and stats from Financial Modeling Prep
  //     //   const profileUrl = `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=demo`;
  //     //   const profileResponse = await apiClient.get<any[]>(profileUrl);

  //     //   if (!profileResponse || profileResponse.length === 0) {
  //     //     throw new Error('Invalid profile response format');
  //     //   }

  //     //   const profileData = profileResponse[0];

  //     //   // Fetch key metrics for stats
  //     //   const metricsUrl = `https://financialmodelingprep.com/api/v3/key-metrics-ttm/${symbol}?apikey=demo`;
  //     //   const metricsResponse = await apiClient.get<any[]>(metricsUrl);

  //     //   const metricsData = metricsResponse[0] || {};

  //     //   // Fetch peers
  //     //   const peersUrl = `https://financialmodelingprep.com/api/v3/stock_peers/${symbol}?apikey=demo`;
  //     //   const peersResponse = await apiClient.get<any[]>(peersUrl);

  //     //   const peersData = peersResponse[0]?.peersList || [];

  //     //   // Fetch additional peer details (mocked for simplicity, as FMP peers endpoint is limited)
  //     //   const peers: Peer[] = peersData.slice(0, 5).map((peerSymbol: string, index: number) => ({
  //     //     symbol: peerSymbol,
  //     //     companyName: `Peer Company ${index + 1}`, // FMP doesn't provide full details; mock for now
  //     //     exchange: profileData.exchangeShortName,
  //     //     ceo: 'Unknown', // FMP provides CEO in profile, but not for peers
  //     //     employees: 0, // Not available in free tier
  //     //     city: profileData.city || 'Unknown',
  //     //     country: profileData.country || 'Unknown',
  //     //   }));

  //     //   return {
  //     //     // name: profileData.companyName,
  //     //     // currentPrice: profileData.price,
  //     //     // currentPriceCurrency: fundamentalsResponse.general.currencyCode,
  //     //     // stat: {
  //     //     //   peRatio: metricsData.peRatioTTM || null,
  //     //     //   dividendYield: metricsData.dividendYieldTTM || null,
  //     //     //   ttmEPS: metricsData.epsTTM || null,
  //     //     //   exDividendDate: profileData.lastDiv ? 'N/A' : 'N/A', // Not directly available
  //     //     //   nextDividendDate: null, // Not available in free tier
  //     //     // },
  //     //     // extendedStats: {
  //     //     //   payoutRatio: metricsData.payoutRatioTTM || null,
  //     //     // },
  //     //     // priceHistory,
  //     //     // peers,
  //     //   };
  //     } catch (error) {
  //       console.error(`Error fetching company info for ${symbol}:`, error);
  //       throw error;
  //     }
  //   },
};