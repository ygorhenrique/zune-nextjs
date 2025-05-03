import Link from "next/link"
import { getPopularStocks } from "@/lib/mock-sector-data"

export function PopularStocks() {
  const popularStocks = getPopularStocks()

  return (
    <div className="mx-auto max-w-4xl">
      <h2 className="mb-6 text-center text-2xl font-bold">Popular Stocks to Compare</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 p-3 text-left">Stock</th>
              <th className="border border-gray-200 p-3 text-left">Ticker</th>
              <th className="border border-gray-200 p-3 text-left">Dividend Yield</th>
              <th className="border border-gray-200 p-3 text-left">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {popularStocks.map((stock, index) => (
              <tr key={stock.ticker} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="border border-gray-200 p-3">
                  <Link href={`/stock/${stock.ticker}`} className="text-blue-600 hover:underline">
                    {stock.companyName}
                  </Link>
                </td>
                <td className="border border-gray-200 p-3">{stock.ticker}</td>
                {/* <td className="border border-gray-200 p-3">{stock.dividendYield.toFixed(2)}%</td>
                <td className="border border-gray-200 p-3">{stock.marketCap}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
