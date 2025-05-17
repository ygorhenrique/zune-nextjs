"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function DividendEducation() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Understanding Dividends</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Learn about dividends and how they can contribute to your investment strategy.
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold mb-3">What Are Dividends?</h3>
          <p className="text-gray-600 mb-4">
            Dividends are payments made by a corporation to its shareholders, usually as a distribution of profits. When
            a company earns a profit, it can either reinvest it in the business (retained earnings) or pay a portion of
            it as a dividend to shareholders.
          </p>
          <p className="text-gray-600">
            Most dividends are paid on a quarterly basis, but some companies pay monthly, semi-annually, or annually.
            Dividends are typically paid in cash, but they can also be paid in additional shares of stock.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">Why Are Dividends Important?</h3>
          <p className="text-gray-600 mb-4">
            Dividends provide a steady stream of income for investors, which can be particularly valuable during market
            downturns when stock prices may decline. They also serve as a signal of a company's financial health and
            management's confidence in future earnings.
          </p>
          <p className="text-gray-600">
            For long-term investors, dividends can contribute significantly to total returns through dividend
            reinvestment and compound growth. Companies with a history of consistently paying and increasing dividends
            are often seen as stable investments.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">How to Calculate Dividend Income</h3>
          <p className="text-gray-600 mb-4">Calculating your expected dividend income is straightforward:</p>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <p className="font-medium mb-2">Annual Dividend Income = Number of Shares × Annual Dividend per Share</p>
            <p className="text-sm text-gray-600">
              For example, if you own 100 shares of a stock with an annual dividend of $2 per share, your annual
              dividend income would be $200.
            </p>
          </div>
          <p className="text-gray-600 mt-4">
            The dividend yield is another important metric, which represents the annual dividend as a percentage of the
            current stock price:
          </p>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mt-2">
            <p className="font-medium mb-2">
              Dividend Yield = (Annual Dividend per Share ÷ Current Stock Price) × 100%
            </p>
            <p className="text-sm text-gray-600">
              For example, if a stock pays an annual dividend of $2 per share and the current stock price is $50, the
              dividend yield would be 4%.
            </p>
          </div>
        </div>

        <div className="text-center pt-4">
          <Button
            variant="outline"
            className="mx-auto"
            onClick={() => {
              document.querySelector(".hero-bg")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            Try our Dividend Calculator
          </Button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mt-8">
          <h3 className="text-xl font-semibold mb-3">Dividend Reinvestment</h3>
          <p className="text-gray-600 mb-4">
            Many investors choose to reinvest their dividends by purchasing additional shares of the same stock. This
            strategy, known as dividend reinvestment, can significantly accelerate wealth building through the power of
            compounding.
          </p>
          <p className="text-gray-600">
            With ZuneMoney, you can track your dividend reinvestment strategy and see how it impacts your portfolio's
            growth over time.
          </p>
          <div className="mt-4">
            <Link href="/blog/dividend-reinvestment-strategy" className="text-primary hover:underline font-medium">
              Learn more about dividend reinvestment strategies →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
