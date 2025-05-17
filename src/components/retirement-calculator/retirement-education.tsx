"use client"

import Link from "next/link"

export function RetirementEducation() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">Planning for Retirement</h2>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Why Start Early?</h3>
          <p className="text-gray-700 mb-4">
            Starting early allows your investments to grow exponentially over time. Thanks to compound interest, even
            small contributions can grow significantly when given enough time.
          </p>
          <p className="text-gray-700 mb-4">
            For example, investing $500 monthly for 30 years at a 7% return could grow to over $600,000, but waiting
            just 10 years reduces that to around $250,000.
          </p>
          <Link
            href="#calculator"
            className="text-indigo-600 hover:underline inline-flex items-center"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector("#calculator")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            Try our Retirement Savings Calculator
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4">How Much Do You Need?</h3>
          <p className="text-gray-700 mb-4">
            A common rule is to aim for 25 times your annual expenses in retirement. This is based on the 4% rule, which
            suggests you can withdraw 4% of your portfolio annually with minimal risk of running out of money.
          </p>
          <p className="text-gray-700 mb-4">
            For example, if you need $60,000 per year in retirement, you should aim to save around $1.5 million.
          </p>
          <Link href="https://blog.zune.money/retirement-planning" className="text-indigo-600 hover:underline">
            Learn more about retirement planning
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Tips for Retirement Planning</h3>
          <ul className="text-gray-700 space-y-2 mb-4">
            <li>• Diversify your investments across stocks, bonds, and other assets</li>
            <li>• Contribute regularly to retirement accounts (401(k), IRA)</li>
            <li>• Consider dividend stocks for passive income in retirement</li>
            <li>• Adjust your strategy as you get closer to retirement</li>
            <li>• Account for inflation in your planning</li>
          </ul>
          <Link href="/dividend-calculator" className="text-indigo-600 hover:underline block mb-2">
            Learn more about dividend stocks
          </Link>
          <Link href="https://blog.zune.money/investment-tips" className="text-indigo-600 hover:underline">
            Explore investment tips
          </Link>
        </div>
      </div>
    </div>
  )
}
