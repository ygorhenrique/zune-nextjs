"use client"

import Link from "next/link"

export function StockEducation() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <div className="mx-auto max-w-4xl">
      <h2 className="mb-8 text-center text-3xl font-bold">Why Compare Stocks?</h2>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h3 className="mb-4 text-xl font-semibold">Key Metrics to Understand</h3>
          <ul className="space-y-3">
            <li>
              <span className="font-medium">P/E Ratio:</span> A lower P/E ratio may indicate an undervalued stock, while
              a higher ratio might suggest overvaluation or high growth expectations.
            </li>
            <li>
              <span className="font-medium">Dividend Yield:</span> Higher yields are attractive for income investors,
              but extremely high yields could signal potential dividend cuts.
            </li>
            <li>
              <span className="font-medium">Market Cap:</span> Larger companies (large-cap) tend to be more stable,
              while smaller companies may offer higher growth potential with increased risk.
            </li>
          </ul>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-md">
          <h3 className="mb-4 text-xl font-semibold">How to Choose Stocks</h3>
          <ul className="space-y-3">
            <li>Look for companies with strong fundamentals and consistent dividend growth.</li>
            <li>Compare similar companies within the same sector to identify potential opportunities.</li>
            <li>Consider both value metrics (P/E ratio) and growth potential when making decisions.</li>
            <li>Diversify across different sectors to reduce overall portfolio risk.</li>
            <li>Monitor key financial ratios over time to track company performance.</li>
          </ul>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-md">
          <h3 className="mb-4 text-xl font-semibold">Using ZuneMoney for Stock Analysis</h3>
          <ul className="space-y-3">
            <li>Track stocks in real-time and compare performance across your portfolio.</li>
            <li>Analyze dividend history and projected income with our dividend calculator.</li>
            <li>Create watchlists of potential investments to monitor before buying.</li>
            <li>Access detailed stock information and historical performance data.</li>
            <li>Set up alerts for price movements and dividend announcements.</li>
          </ul>
        </div>
      </div>

      <div className="mt-8 text-center">
        <div className="mb-4 space-x-4">
          <Link href="/dividend-calculator" className="text-blue-600 hover:underline">
            Explore Dividend Stocks
          </Link>
          <Link href="https://blog.zune.money/" className="text-blue-600 hover:underline">
            Learn More About Investing
          </Link>
        </div>

        <button onClick={scrollToTop} className="text-blue-600 hover:underline">
          Try our Stock Comparison Tool
        </button>
      </div>
    </div>
  )
}
