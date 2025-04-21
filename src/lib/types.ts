export interface PortfolioData {
    growth: {
      labels: string[];
      values: number[];
    };
    holdings: {
      ticker: string;
      name: string;
      shares: number;
      value: number;
      gainLoss: number;
    }[];
  }
  
  export interface DividendData {
    upcoming: {
      ticker: string;
      amount: number;
      date: string;
    }[];
    received: {
      weekly: number;
      monthly: number;
      yearly: number;
    };
  }
  
  export interface PerformanceData {
    weekly: { percentage: number; value: number };
    monthly: { percentage: number; value: number };
    yearly: { percentage: number; value: number };
  }