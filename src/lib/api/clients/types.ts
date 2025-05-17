// lib/api/types.ts

// Last Close
export type LastCloseResponse = number;

// Fundamentals
export interface CompanyFundamentals {
  general: {
    // "code": "AAPL",
    // "type": "Common Stock",
    // "name": "Apple Inc",
    // "exchange": "NASDAQ",
    // "currencyCode": "USD",
    // "currencyName": "US Dollar",
    // "currencySymbol": "$",

    code: string;
    name: string;
    exchange: string;
    currencyCode: string;
    sector: string;
    industry: string;
    fullTimeEmployees: number | null;
    webURL: string;
    description: string;
    address: string;
    addressData: {
      street: string;
      city: string;
      state: string;
      country: string;
      zip: string;
    };
  };
  highlights: {
    dividendYield?: number;
  };
}

// Dividends
export interface Dividend {
  declarationDate: string | null;
  recordDate: string | null;
  paymentDate: string;
  value: number;
  currency: string;
  period: string | null;
}

// Company Info (including Price History and Peers)
export interface PriceHistory {
  date: string;
  close: number;
}

export interface Peer {
  symbol: string;
  companyName: string;
  exchange: string;
  ceo: string;
  employees: number;
  city: string;
  country: string;
}

export interface CompanyInfo {
  name: string;
  currentPrice: number;
  currentPriceCurrency: string;
  stat: {
    peRatio: number | null;
    dividendYield: number | null;
    ttmEPS: number | null;
    exDividendDate: string;
    nextDividendDate: string | null;
  };
  extendedStats: {
    payoutRatio: number | null;
  };
  priceHistory: PriceHistory[];
  peers: Peer[];
}

// Existing types from the previous stockClient (for daily stock data)
export interface TimeSeriesData {
  [date: string]: {
    '1. open': string;
    '2. high': string;
    '3. low': string;
    '4. close': string;
    '5. volume': string;
  };
}

export interface StockDailyResponse {
  'Meta Data': {
    '1. Information': string;
    '2. Symbol': string;
    '3. Last Refreshed': string;
    '4. Output Size': string;
    '5. Time Zone': string;
  };
  'Time Series (Daily)': TimeSeriesData;
}

export interface StockData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}