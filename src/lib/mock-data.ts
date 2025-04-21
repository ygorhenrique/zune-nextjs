// Mock data for the dashboard

// Portfolio timeline data (last 12 months)
const generateTimelineData = () => {
    const data = []
    const now = new Date()
    let value = 60000 // Starting value
  
    for (let i = 365; i >= 0; i--) {
      const date = new Date(now)
      date.setDate(date.getDate() - i)
  
      // Add some randomness to the value
      const change = (Math.random() - 0.3) * 500
      value += change
  
      // Add some seasonal patterns
      if (date.getMonth() === 11) {
        // December
        value += 1000 // Year-end rally
      }
  
      if (date.getMonth() === 2) {
        // March
        value -= 800 // Spring correction
      }
  
      data.push({
        date: date.toISOString().split("T")[0],
        value: Math.round(value),
      })
    }
  
    return data
  }
  
  export const mockPortfolioData = {
    summary: {
      totalValue: 70438.82,
      totalGain: 8705.86,
      totalGainPercentage: 14.1,
    },
    dividends: {
      dividendsThisMonth: 342.18,
      dividendsYTD: 2187.65,
      nextDividend: {
        date: "2025-05-15",
        amount: 120.5,
        stock: "MSFT",
      },
    },
    timelineData: generateTimelineData(),
    assetAllocation: [
      { name: "Stocks", value: 42263.29 },
      { name: "ETFs", value: 15496.54 },
      { name: "Real Estate", value: 8452.66 },
      { name: "Crypto", value: 2817.55 },
      { name: "Bonds", value: 1408.78 },
    ],
    holdings: [
      {
        symbol: "AAPL",
        name: "Apple Inc.",
        shares: 25,
        price: 198.45,
        value: 4961.25,
        cost: 4125.0,
        gain: 836.25,
        gainPercentage: 20.27,
        allocation: 7.04,
      },
      {
        symbol: "MSFT",
        name: "Microsoft Corporation",
        shares: 15,
        price: 415.32,
        value: 6229.8,
        cost: 4875.0,
        gain: 1354.8,
        gainPercentage: 27.79,
        allocation: 8.84,
      },
      {
        symbol: "AMZN",
        name: "Amazon.com Inc.",
        shares: 18,
        price: 182.75,
        value: 3289.5,
        cost: 2970.0,
        gain: 319.5,
        gainPercentage: 10.76,
        allocation: 4.67,
      },
      {
        symbol: "GOOGL",
        name: "Alphabet Inc.",
        shares: 20,
        price: 175.98,
        value: 3519.6,
        cost: 3100.0,
        gain: 419.6,
        gainPercentage: 13.54,
        allocation: 5.0,
      },
      {
        symbol: "NVDA",
        name: "NVIDIA Corporation",
        shares: 12,
        price: 924.79,
        value: 11097.48,
        cost: 7800.0,
        gain: 3297.48,
        gainPercentage: 42.28,
        allocation: 15.75,
      },
      {
        symbol: "TSLA",
        name: "Tesla, Inc.",
        shares: 10,
        price: 177.5,
        value: 1775.0,
        cost: 2200.0,
        gain: -425.0,
        gainPercentage: -19.32,
        allocation: 2.52,
      },
      {
        symbol: "VWCE",
        name: "Vanguard FTSE All-World UCITS ETF",
        shares: 45,
        price: 112.34,
        value: 5055.3,
        cost: 4725.0,
        gain: 330.3,
        gainPercentage: 6.99,
        allocation: 7.18,
      },
      {
        symbol: "EUNL",
        name: "iShares Core MSCI World UCITS ETF",
        shares: 60,
        price: 85.42,
        value: 5125.2,
        cost: 4800.0,
        gain: 325.2,
        gainPercentage: 6.78,
        allocation: 7.28,
      },
      {
        symbol: "BTCE",
        name: "Bitcoin ETC",
        shares: 5,
        price: 563.51,
        value: 2817.55,
        cost: 2250.0,
        gain: 567.55,
        gainPercentage: 25.22,
        allocation: 4.0,
      },
      {
        symbol: "O",
        name: "Realty Income Corporation",
        shares: 80,
        price: 52.83,
        value: 4226.4,
        cost: 4640.0,
        gain: -413.6,
        gainPercentage: -8.91,
        allocation: 6.0,
      },
    ],
  }
  