import type { Metadata } from "next"
import { notFound } from "next/navigation"
// import { getStockByTicker, StockPrice } from "@/lib/mock-stock-data"
import { StockDetails, StockPrice } from "@/lib/mock-stock-data"
import { stockClient } from "@/lib/api/clients/stockClient";
import { PriceHistoryChart } from "@/components/stock/price-history-chart"
import { CompanySummary } from "@/components/stock/company-summary"
import { DividendHistoryChart } from "@/components/stock/dividend-history-chart"
import { DividendTable } from "@/components/stock/dividend-table"
import { SimilarCompanies } from "@/components/stock/similar-companies"
import { StocksBySector } from "@/components/stock/stocks-by-sector"
import { StockFAQ } from "@/components/stock/stock-faq"
import { StockCTA } from "@/components/stock/stock-cta"
import { StockMetrics } from "@/components/stock/stock-metrics"

interface StockPageProps {
  params: Promise<{
    ticker: string;
  }>;
}

// Generate mock price history data
const generatePriceHistory = (basePrice: number, days: number, volatility: number): StockPrice[] => {
  const prices: StockPrice[] = []
  let currentPrice = basePrice

  const now = new Date()

  for (let i = days; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    // Random price movement with trend
    const change = (Math.random() - 0.5) * volatility * currentPrice
    currentPrice = Math.max(currentPrice + change, 1) // Ensure price doesn't go below 1

    prices.push({
      date: date.toISOString().split("T")[0],
      close: Number.parseFloat(currentPrice.toFixed(2)),
    })
  }

  return prices
}

async function getStockByTicker(ticker: string) {
  // This function should return the stock data based on the ticker
  // For now, we are using a mock function to simulate fetching stock data

  const companyFundamentals = await stockClient.getCompanyFundamentals(ticker)
  const companyDividends = await stockClient.getCompanyDividends(ticker)
  const companyPeers = await stockClient.getCompanyPeers(ticker)
  const quote = await stockClient.getCompanyQuote(ticker)
  const sectors = await stockClient.getCompanySectors(ticker)


  const ceo = companyFundamentals.general.officers.find((officer: any) =>
      officer.title.toLowerCase().includes("ceo")
    );

  if (companyFundamentals) {
    return {
      ticker: companyFundamentals.general.code,
      companyName: companyFundamentals.general.name,
      exchange: companyFundamentals.general.exchange,
      currentPrice: quote?.close || null,
      previousClose: quote?.previousClose  || null, // lastClose
      change: quote?.change  || null,
      changePercent: quote?.change_p  || null,
      currency: companyFundamentals.general.currencyCode,
      peRatio: companyFundamentals.highlights.peRatio,
      dividendYield: companyFundamentals.highlights.dividendYield ? companyFundamentals.highlights.dividendYield * 100 : undefined,
      marketCap: companyFundamentals.highlights.marketCapitalization,
      volume: quote?.volume  || null,
      avgVolume: 400000,
      high52Week: companyFundamentals.technicals["52WeekHigh"] || null,
      low52Week: companyFundamentals.technicals["52WeekLow"]  || null,
      open: quote?.open || null,
      logoUrl: "/stylized-fruit-logo.png",
      sector: companyFundamentals.general.sector,
      industry: companyFundamentals.general.industry,
      employees: companyFundamentals.general.fullTimeEmployees,
      website: companyFundamentals.general.webURL,
      description: companyFundamentals.general.description,
      headquarters: {
        city:companyFundamentals.general.addressData.city,
        country: companyFundamentals.general.addressData.country == "United States" ? "USA" : companyFundamentals.general.addressData.country,
      },
      ipoYear: companyFundamentals.general.ipoDate? new Date(companyFundamentals.general.ipoDate). getFullYear().toString() : null,
      // founded: 1992,
      ceo: ceo?.name || "",
      priceHistory: {
        week: generatePriceHistory(175.5, 7, 0.01),
        month: generatePriceHistory(170.25, 30, 0.015),
        year: generatePriceHistory(155.75, 365, 0.02),
        fiveYears: generatePriceHistory(120.5, 1825, 0.025),
      },
      dividendHistory: companyDividends,
      similarCompanies: companyPeers,
      stocksBySector: sectors,
    }
  }
}

export async function generateMetadata({ params }: StockPageProps): Promise<Metadata> {

  const { ticker } = await params;
  const stock = await getStockByTicker(ticker)

  if (!stock) {
    return {
      title: "Stock Not Found - ZuneMoney",
      description: "The requested stock could not be found.",
    }
  }

  return {
    title: `${stock.ticker}: ${stock.companyName} Stock Price and Dividends - ZuneMoney`,
    description: `Track ${stock.ticker} stock price and ${stock.companyName} dividends with ZuneMoney. Explore portfolio tools and analytics for smarter investments in the ${stock.sector} sector.`,
    keywords: `${stock.ticker}, ${stock.ticker} chart, ${stock.ticker} price, ${stock.ticker} dividends, ${stock.companyName} dividends, ${stock.companyName} chart, ${stock.sector} stocks`,
  }
}

export default async function StockPage({ params }: StockPageProps) {
  const { ticker } = await params;
  const stock = await getStockByTicker(ticker)

  if (!stock) {
    notFound()
  }

  // // Fetch the quote price using stockClient (SSR happens here since this is a server component)
  // let companyName: string;
  // let exchange: string;
  // let currency: string;
  // let sector: string;
  // let industry: string;
  // let employees: number | null;
  // let website: string;
  // let description: string;
  // let headquarters: {
  //   city: string
  //   country: string
  // } | null;
  // let dividendYield: number | undefined;

  try {
    // // Fetch company info to get the current price and currency
    // const companyInfo = await stockClient.getCompanyFundamentals(ticker);
    // // currentPrice = companyInfo.currentPrice;
    // companyName = companyInfo.general.name;
    // exchange = companyInfo.general.exchange;
    // currency = companyInfo.general.currencyCode;
    // sector = companyInfo.general.sector;
    // industry = companyInfo.general.industry;
    // employees = companyInfo.general.fullTimeEmployees;
    // website = companyInfo.general.webURL;
    // description = companyInfo.general.description;
    // headquarters = { city: '', country: ''}; 
    // if (companyInfo.general.addressData) {
    //   headquarters.city = companyInfo.general.addressData.city;
    //   headquarters.country = companyInfo.general.addressData.country;
    // }

    // dividendYield = companyInfo.highlights.dividendYield;
    

    // {
    //   general: {
    //     code: response.general.code,
    //     name: response.general.name,
    //     exchange: response.general.exchange,
    //     currencyCode: response.general.currencyCode,
    //     sector: response.general.sector,
    //     industry: response.general.code,
    //     fullTimeEmployees: response.general.fullTimeEmployees || null,
    //     webURL: response.general.code,
    //     description: response.general.code,
    //     address: response.general.address,
    //   },
    //   highlights: {
    //     dividendYield: undefined//data.lastDiv ? data.lastDiv / data.price : undefined, // Approximate dividend yield
    //   },
    // }

    // // Fetch daily stock data to calculate change and changePercent
    // const dailyData = await stockClient.getDailyStockData(params.ticker);
    // if (dailyData.length < 2) {
    //   throw new Error("Not enough data to calculate change");
    // }

    // // Assume the first entry is the most recent (today), second entry is yesterday
    // const todayPrice = dailyData[0].close;
    // const yesterdayPrice = dailyData[1].close;

    // // Ensure the current price matches the daily data (for consistency)
    // currentPrice = todayPrice;

    // // Calculate change and changePercent
    // change = todayPrice - yesterdayPrice;
    // changePercent = (change / yesterdayPrice) * 100;
  } catch (error) {
    console.error(`Error fetching quote price for ${ticker}:`, error);
    // Fallback to mock data if API fails
    // companyName = stock.companyName;
    // exchange = stock.exchange;
    // currency = stock.currency;
    // sector = stock.sector;
    // industry = stock.industry;
    // employees = null;
    // website = stock.website;
    // description = stock.description;
    // headquarters = stock.headquarters;
    // dividendYield = stock.dividendYield;
  }

  // // Update the stock object with the fetched quote price data
  // const updatedStock = {
  //   ...stock,
  //   companyName,
  //   exchange,
  //   currency,
  //   sector,
  //   industry,
  //   employees,
  //   website,
  //   description,
  //   headquarters,
  //   dividendYield
  // };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">{stock.ticker}</h1>
              <span className="text-gray-500">|</span>
              <h2 className="text-2xl">{stock.companyName}</h2>
            </div>
            <p className="text-gray-500">{stock.exchange}</p>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-3xl font-bold">
              {stock.currency} {stock.currentPrice && stock.currentPrice.toFixed(2)}
            </div>
            <div className={`flex items-center ${stock.change  && stock.change >= 0 ? "text-green-600" : "text-red-600"}`}>
              <span>
                {stock.change && stock.change >= 0 ? "+" : ""}
                {stock.change && stock.change.toFixed(2)}
              </span>
              <span className="mx-1">|</span>
              <span>
                {stock.change && stock.change >= 0 ? "+" : ""}
                {stock.changePercent && stock.changePercent.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>

        <StockMetrics
          currentPrice={stock.currentPrice}
          previousClose={stock.previousClose}
          change={stock.change}
          changePercent={stock.changePercent}
          currency={stock.currency}
          peRatio={stock.peRatio}
          dividendYield={stock.dividendYield}
          marketCap={stock.marketCap}
          volume={stock.volume}
          avgVolume={stock.avgVolume}
          high52Week={stock.high52Week}
          low52Week={stock.low52Week}
          open={stock.open}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <PriceHistoryChart
          weekData={stock.priceHistory.week}
          monthData={stock.priceHistory.month}
          yearData={stock.priceHistory.year}
          fiveYearData={stock.priceHistory.fiveYears}
          currency={stock.currency}
          enabled={false}
        />
        <CompanySummary
          logoUrl={stock.logoUrl}
          companyName={stock.companyName}
          description={stock.description}
          sector={stock.sector}
          industry={stock.industry}
          employees={stock.employees}
          website={stock.website}
          // founded={stock.founded}
          ceo={stock.ceo}
          headquarters={stock.headquarters}
        />
      </div>

      <div className="mb-8">
        <StockCTA ticker={stock.ticker} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <DividendHistoryChart dividendHistory={stock.dividendHistory} currency={stock.currency} />
        <DividendTable dividendHistory={stock.dividendHistory} />
      </div>

      <div className="mb-8">
        <SimilarCompanies companies={stock.similarCompanies} />
      </div>

      <div className="mb-8">
        <StocksBySector sectors={stock.stocksBySector} />
      </div>

      <div className="mb-8">
        <StockFAQ stock={stock} />
      </div>

      <div className="mb-8">
        <StockCTA ticker={stock.ticker} />
      </div>

      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: stock.companyName,
            tickerSymbol: stock.ticker,
            industry: stock.industry,
            url: stock.website,
            description: stock.description,
            //foundingDate: stock.founded.toString(),
            //foundingDate: stock.founded.toString(),
            numberOfEmployees: stock.employees,
            address: {
              "@type": "PostalAddress",
              addressLocality: stock.headquarters.city,
              addressCountry: stock.headquarters.country,
            },
            subjectOf: {
              "@type": "FinancialProduct",
              name: `${stock.ticker} Stock`,
              tickerSymbol: stock.ticker,
              exchange: stock.exchange,
              price: stock.currentPrice,
              priceCurrency: stock.currency,
              dividendYield: stock.dividendYield,
            },
          }),
        }}
      />
    </div>
  )
}