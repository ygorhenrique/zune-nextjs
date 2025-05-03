"use client"

import Link from "next/link"

export function PortfolioEducation() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <div className="mx-auto max-w-4xl">
      <h2 className="mb-8 text-center text-3xl font-bold">Understanding Portfolio Growth</h2>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-xl font-semibold">What Impacts Portfolio Growth?</h3>
          <p className="mb-4 text-gray-700">
            Return rate, contributions, and time horizon are key drivers of growth. Higher returns, larger
            contributions, and longer time horizons all lead to greater portfolio values.
          </p>
          <p className="text-gray-700">
            Even small differences in return rates can have dramatic effects over long periods due to the power of
            compounding.
          </p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-xl font-semibold">The Power of Compounding</h3>
          <p className="mb-4 text-gray-700">
            Earnings on your investments generate their own earnings, leading to exponential growth over time. This is
            why starting early is so important.
          </p>
          <p className="text-gray-700">
            For example, $10,000 invested at 7% for 30 years grows to over $76,000 without any additional contributions.
          </p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-xl font-semibold">How to Maximize Returns</h3>
          <p className="mb-4 text-gray-700">
            Invest early, diversify your portfolio, and consider dividend stocks for additional income. Regular
            contributions, even small ones, can significantly boost your portfolio&apos;s growth.
          </p>
          <p className="text-gray-700">
            Minimizing fees and taxes can also help preserve more of your returns for compounding.
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link href="/dividend-calculator" className="text-blue-600 hover:text-blue-800 hover:underline">
          Learn About Dividend Stocks
        </Link>
        <span className="text-gray-400">|</span>
        <Link
          href="https://blog.zune.money/"
          className="text-blue-600 hover:text-blue-800 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Explore Investment Strategies
        </Link>
        <span className="text-gray-400">|</span>
        <button onClick={scrollToTop} className="text-blue-600 hover:text-blue-800 hover:underline">
          Try our Portfolio Growth Simulator
        </button>
      </div>
    </div>
  )
}
