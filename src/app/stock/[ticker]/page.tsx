import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getStockByTicker } from "@/lib/mock-stock-data"
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
  params: {
    ticker: string
  }
}

export async function generateMetadata({ params }: StockPageProps): Promise<Metadata> {
  const stock = getStockByTicker(params.ticker)

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

export default function StockPage({ params }: StockPageProps) {
  const stock = getStockByTicker(params.ticker)

  if (!stock) {
    notFound()
  }

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
              {stock.currency} {stock.currentPrice.toFixed(2)}
            </div>
            <div className={`flex items-center ${stock.change >= 0 ? "text-green-600" : "text-red-600"}`}>
              <span>
                {stock.change >= 0 ? "+" : ""}
                {stock.change.toFixed(2)}
              </span>
              <span className="mx-1">|</span>
              <span>
                {stock.change >= 0 ? "+" : ""}
                {stock.changePercent.toFixed(2)}%
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
        />
        <CompanySummary
          logoUrl={stock.logoUrl}
          companyName={stock.companyName}
          description={stock.description}
          sector={stock.sector}
          industry={stock.industry}
          employees={stock.employees}
          website={stock.website}
          founded={stock.founded}
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
            foundingDate: stock.founded.toString(),
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
