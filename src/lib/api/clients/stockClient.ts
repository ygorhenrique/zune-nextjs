// lib/api/clients/stockClient.ts
import { apiClient } from './apiClient';
import {
  LastCloseResponse,
  CompanyFundamentals,
  Dividend,
  CompanyInfo,
  StockDailyResponse,
  StockData,
  Peer
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
      const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=demo`;
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

  // New method: Fetch company fundamentals (using Financial Modeling Prep as a substitute)
  async getCompanyFundamentals(symbol: string): Promise<CompanyFundamentals> {
    try {
      // Financial Modeling Prep profile endpoint (requires API key in practice)
      const url = `https://api.zune.money/stock/${symbol}/fundamentals`;
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
          sector: response.general.sector,
          industry: response.general.industry,
          fullTimeEmployees: response.general.fullTimeEmployees || null,
          webURL: response.general.webURL,
          description: response.general.description,
          address: response.general.address,
          addressData: response.general.addressData,
        },
        highlights: {
          dividendYield: response.highlights.dividendYield,
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
      // Financial Modeling Prep historical dividends endpoint (requires API key in practice)
      const url = `https://financialmodelingprep.com/api/v3/historical-price-full/stock_dividend/${symbol}?apikey=demo`;
      const response = await apiClient.get<any>(url);

      if (!response.historical || !Array.isArray(response.historical)) {
        throw new Error('Invalid response format or no data available');
      }

      return response.historical.map((div: any) => ({
        declarationDate: div.declarationDate || null,
        recordDate: div.recordDate || null,
        paymentDate: div.paymentDate,
        value: div.dividend,
        currency: 'USD', // FMP doesn't provide currency; assuming USD
        period: div.label.includes('Quarterly') ? 'quarterly' : null, // Approximate
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