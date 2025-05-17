// lib/api/types.ts

import { SimilarCompany } from "@/lib/mock-stock-data";

// CompanyLegacyEntity
export interface CompanyLegacyEntity {
  peers: SimilarCompany[];
}

// Last Close
export type LastCloseResponse = number;

// Quote
export type QuoteResponse  = {
    close: number;  
    previousClose: number;  
    open: number;
    volume: number;
    change: number;
    change_p: number;
}

export type SectorStock = {
    name: string;
    ticker: string;
    price: number;
    change: number;
}

export type SectorStockResponse = {
    TechnolSectorStockogy: SectorStock[];
    Finance: SectorStock[];
    Healthcare: SectorStock[];
    Energy: SectorStock[];
}

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
    ipoDate: string;
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
    officers: {
      name: string;
      title: string;
      yearBorn: number;
    }[];
  };
  highlights: {
    marketCapitalization?: number;
    dividendYield?: number;
    peRatio?: number;
  };
  technicals: {
    beta?: number;
    "52WeekHigh"?: number;
    "52WeekLow"?: number;
  };
}

// Dividends
export interface Dividend {
  declarationDate: string | null;
  recordDate: string | null;
  paymentDate: string;
  amount: number | null;
  currency: string;
  period: string | null;
  frequency: string | null; // e.g., "Quarterly". This is ununsed I'm keeping it for compatibility
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