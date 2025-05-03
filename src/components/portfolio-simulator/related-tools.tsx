import Link from "next/link"
import { Calculator, LineChart, BarChart3 } from "lucide-react"

export function RelatedTools() {
  return (
    <div className="mx-auto max-w-4xl">
      <h2 className="mb-8 text-center text-2xl font-bold">Explore More Free Tools</h2>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-md">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <Calculator className="h-6 w-6" />
          </div>
          <h3 className="mb-2 text-lg font-semibold">Calculate Your Dividend Income</h3>
          <p className="mb-4 text-sm text-gray-600">
            Estimate your potential dividend income based on your investment portfolio.
          </p>
          <Link href="/dividend-calculator" className="text-blue-600 hover:text-blue-800 hover:underline">
            Try Dividend Calculator
          </Link>
        </div>

        <div className="rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-md">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <LineChart className="h-6 w-6" />
          </div>
          <h3 className="mb-2 text-lg font-semibold">Plan Your Retirement</h3>
          <p className="mb-4 text-sm text-gray-600">
            Calculate how much you need to save for a comfortable retirement.
          </p>
          <Link href="/retirement-savings-calculator" className="text-blue-600 hover:text-blue-800 hover:underline">
            Try Retirement Calculator
          </Link>
        </div>

        <div className="rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-md">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <BarChart3 className="h-6 w-6" />
          </div>
          <h3 className="mb-2 text-lg font-semibold">Compare Stocks Side by Side</h3>
          <p className="mb-4 text-sm text-gray-600">
            Compare key metrics of up to three stocks to make informed investment decisions.
          </p>
          <Link href="/stock-comparison-tool" className="text-blue-600 hover:text-blue-800 hover:underline">
            Try Stock Comparison Tool
          </Link>
        </div>
      </div>
    </div>
  )
}
