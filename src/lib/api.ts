import { PortfolioData, DividendData, PerformanceData } from './types';

// Mock data for portfolio
const mockPortfolioData: PortfolioData = {
  growth: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    values: [100000, 102000, 105000, 108000, 110000, 112000],
  },
  holdings: [
    { ticker: 'AAPL', name: 'Apple Inc.', shares: 50, value: 7500, gainLoss: 10.5 },
    { ticker: 'MSFT', name: 'Microsoft Corp.', shares: 30, value: 9000, gainLoss: -2.3 },
    { ticker: 'GOOGL', name: 'Alphabet Inc.', shares: 20, value: 6000, gainLoss: 5.7 },
  ],
};

// Mock data for dividends
const mockDividendData: DividendData = {
  upcoming: [
    { ticker: 'AAPL', amount: 0.23, date: '2025-05-15' },
    { ticker: 'MSFT', amount: 0.75, date: '2025-06-10' },
  ],
  received: {
    weekly: 50,
    monthly: 200,
    yearly: 2400,
  },
};

// Mock data for performance
const mockPerformanceData: PerformanceData = {
  weekly: { percentage: 1.2, value: 1200 },
  monthly: { percentage: 3.5, value: 3500 },
  yearly: { percentage: 12.7, value: 12700 },
};

export async function getPortfolioData(): Promise<PortfolioData> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockPortfolioData;
}

export async function getDividendData(): Promise<DividendData> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockDividendData;
}

export async function getPerformanceData(): Promise<PerformanceData> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockPerformanceData;
}