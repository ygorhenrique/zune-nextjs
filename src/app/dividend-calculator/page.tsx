import type { Metadata } from "next"
import { DividendCalculator } from "@/components/dividend-calculator/dividend-calculator"
import { DividendEducation } from "@/components/dividend-calculator/dividend-education"
import { TopDividendStocks } from "@/components/dividend-calculator/top-dividend-stocks"
import { SignUpCTA } from "@/components/dividend-calculator/sign-up-cta"

export const metadata: Metadata = {
  title: "Dividend Calculator | ZuneMoney - Calculate Your Dividend Income",
  description:
    "Use ZuneMoney's free Dividend Calculator to estimate your dividend income from stocks. Calculate annual and quarterly dividends with real-time data.",
  keywords:
    "dividend calculator, stock dividends, calculate dividend income, best dividend stocks, investment calculator, ZuneMoney",
  openGraph: {
    title: "Dividend Calculator | ZuneMoney - Calculate Your Dividend Income",
    description:
      "Use ZuneMoney's free Dividend Calculator to estimate your dividend income from stocks. Calculate annual and quarterly dividends with real-time data.",
    url: "https://app.zune.money/dividend-calculator",
    type: "website",
    images: [
      {
        url: "https://app.zune.money/og-image-dividend-calculator.png",
        width: 1200,
        height: 630,
        alt: "ZuneMoney Dividend Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dividend Calculator | ZuneMoney - Calculate Your Dividend Income",
    description:
      "Use ZuneMoney's free Dividend Calculator to estimate your dividend income from stocks. Calculate annual and quarterly dividends with real-time data.",
    images: ["https://app.zune.money/og-image-dividend-calculator.png"],
  },
}

export default function DividendCalculatorPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Calculator */}
      <section className="hero-bg animate-gradient py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">Dividend Calculator</h1>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Estimate your dividend income from stocks with our free calculator. Enter a stock symbol and the number of
            shares to get started.
          </p>
          <div className="animate-fade-in">
            <DividendCalculator />
          </div>
        </div>
      </section>

      {/* Educational Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <DividendEducation />
        </div>
      </section>

      {/* Top Dividend Stocks */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <TopDividendStocks />
        </div>
      </section>

      {/* Sign Up CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary">
        <div className="max-w-4xl mx-auto">
          <SignUpCTA />
        </div>
      </section>
    </div>
  )
}
