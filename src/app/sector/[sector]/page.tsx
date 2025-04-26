import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SectorCTA } from "@/components/sector/sector-cta"
import { SectorMetrics } from "@/components/sector/sector-metrics"
import { SectorPerformanceChart } from "@/components/sector/sector-performance-chart"
import { SectorStocksTable } from "@/components/sector/sector-stocks-table"
import { SectorTrends } from "@/components/sector/sector-trends"
import { getSectorData } from "@/lib/mock-sector-data"

interface SectorPageProps {
  params: Promise<{
    sector: string;
  }>;
}

export async function generateMetadata({ params }: SectorPageProps): Promise<Metadata> {
  const { sector } = await params
  const sectorData = getSectorData(sector)

  if (!sectorData) {
    return {
      title: "Sector Not Found - ZuneMoney",
      description: "The requested sector could not be found.",
    }
  }

  const { name, topStocks } = sectorData
  const topTickersList = topStocks
    .slice(0, 3)
    .map((stock) => stock.ticker)
    .join(", ")

  return {
    title: `${name} Stocks to Watch in 2025 - ZuneMoney`,
    description: `Explore top ${name.toLowerCase()} stocks like ${topTickersList}. Track prices, dividends, and performance with ZuneMoney.`,
    keywords: [
      `best ${name.toLowerCase()} stocks`,
      `${name.toLowerCase()} stocks 2025`,
      `invest in ${name.toLowerCase()} stocks`,
    ],
  }
}

export default async function SectorPage({ params }: SectorPageProps) {
  const { sector } = await params
  const sectorData = getSectorData(sector)

  if (!sectorData) {
    notFound()
  }

  const { name, description, performanceData, topStocks, trends } = sectorData

  // Debug the performance data
  console.log(
    `Performance data for ${name} sector:`,
    performanceData
      ? `${performanceData.length} data points, first: ${JSON.stringify(performanceData[0])}, last: ${JSON.stringify(performanceData[performanceData.length - 1])}`
      : "No data",
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Explore {name} Stocks</h1>
      <p className="text-lg text-gray-700 mb-8">{description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <SectorPerformanceChart sectorName={name} performanceData={performanceData} className="h-full" />
        <SectorMetrics
          sectorName={name}
          marketSize={sectorData.metrics.marketSize}
          growthRate={sectorData.metrics.growthRate}
          averagePE={sectorData.metrics.averagePE}
          averageDividendYield={Number.parseFloat(sectorData.metrics.dividendYield)}
          volatility={sectorData.metrics.volatility}
          className="h-full"
        />
      </div>

      <SectorStocksTable sectorName={name} stocks={topStocks} className="mb-8" />

      <SectorTrends sectorName={name} trends={trends} className="mb-8" />

      <SectorCTA sectorName={name} />
    </div>
  )
}
