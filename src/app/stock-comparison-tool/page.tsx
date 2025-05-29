import type { Metadata } from "next"
import { StockComparisonTool } from "@/components/stock-comparison/stock-comparison-tool"
import { StockEducation } from "@/components/stock-comparison/stock-education"
import { PopularStocks } from "@/components/stock-comparison/popular-stocks"
import { RelatedTools } from "@/components/stock-comparison/related-tools"

export const metadata: Metadata = {
  title: "Stock Comparison Tool | ZuneMoney - Compare Stocks Easily",
  description: "Compare stocks like AAPL and MSFT with ZuneMoney's free tool. Analyze price, dividend yield, and more.",
  keywords: "stock comparison tool, compare stocks, stock analysis, investment comparison, ZuneMoney",
  openGraph: {
    title: "Stock Comparison Tool | ZuneMoney - Compare Stocks Easily",
    description:
      "Compare stocks like AAPL and MSFT with ZuneMoney's free tool. Analyze price, dividend yield, and more.",
    url: "https://zune.money/stock-comparison-tool",
    siteName: "ZuneMoney",
    images: [
      {
        url: "https://zune.money/og-image.png",
        width: 1200,
        height: 630,
        alt: "ZuneMoney Stock Comparison Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stock Comparison Tool | ZuneMoney - Compare Stocks Easily",
    description:
      "Compare stocks like AAPL and MSFT with ZuneMoney's free tool. Analyze price, dividend yield, and more.",
    images: ["https://zune.money/og-image.png"],
    creator: "@zunemoney",
  },
}

export default function StockComparisonToolPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="hero-bg animate-gradient-x py-16 text-white">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="mb-4 text-3xl font-bold md:text-4xl">Stock Comparison Tool</h1>
              <p className="mb-8 text-lg">Compare up to three stocks side by side with ZuneMoney&apos;s free tool.</p>
              <StockComparisonTool />
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <StockEducation />
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <PopularStocks />
          </div>
        </section>

        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <RelatedTools />
          </div>
        </section>
      </main>
    </div>
  )
}
