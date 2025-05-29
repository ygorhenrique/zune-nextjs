import Link from "next/link"
import { Instagram, Twitter } from "lucide-react"
import { getAllSectors, getPopularStocks } from "@/lib/mock-sector-data"

export function Footer() {
  // Get sectors and popular stocks data
  const sectors = getAllSectors()
  const popularStocks = getPopularStocks()

  return (
    <footer className="bg-gray-800 py-8 text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-6">
          {/* ZuneMoney Branding */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-bold">ZuneMoney</h3>
            <p className="text-sm">The easy way to visualize your money.</p>
            <p className="mt-2 text-sm">© {new Date().getFullYear()} ZuneMoney. All rights reserved.</p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-bold">Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="https://blog.zune.money/" className="hover:underline">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="https://zune.money/demo" className="hover:underline">
                  Demo
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

	  {/* Free Tools (Updated) */}
          <div>
            <h3 className="text-lg font-bold">Free Tools</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/dividend-calculator" className="text-gray-400 hover:text-white hover:underline">
                  Dividend Calculator
                </Link>
              </li>
              <li>
                <Link href="/retirement-savings-calculator" className="text-gray-400 hover:text-white hover:underline">
                  Retirement Calculator
                </Link>
              </li>
              <li>
                <Link href="/stock-comparison-tool" className="text-gray-400 hover:text-white hover:underline">
                  Stock Comparison Tool
                </Link>
              </li>
              <li>
                <Link href="/portfolio-growth-simulator" className="text-gray-400 hover:text-white hover:underline">
                  Portfolio Simulator
                </Link>
              </li>
            </ul>
          </div>

          {/* Explore Sectors (New) */}
          <div>
            <h3 className="text-lg font-bold">Explore Sectors</h3>
            <ul className="space-y-2 text-sm">
              {sectors.map((sector) => (
                <li key={sector.id}>
                  <Link href={`/sector/${sector.id}`} className="text-gray-400 hover:text-white hover:underline">
                    {sector.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Stocks (New) */}
          <div>
            <h3 className="text-lg font-bold">Popular Stocks</h3>
            <ul className="space-y-2 text-sm">
              {popularStocks.map((stock) => (
                <li key={stock.ticker}>
                  <Link href={`/stock/${stock.ticker}`} className="text-gray-400 hover:text-white hover:underline">
                    {stock.companyName} ({stock.ticker})
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-lg font-bold text-white">Follow Us</h3>
            <div className="mt-2 flex space-x-4">
              <Link
                href="https://www.instagram.com/zune.money"
                className="text-gray-400 hover:text-white"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.threads.net/zune.money"
                className="text-gray-400 hover:text-white"
                aria-label="Follow us on Threads"
              >
                {/* Custom Threads icon since it's not in Lucide */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M12 2a10 10 0 1 0 10 10 10 10 0 0 0-10-10zm0 17.5a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z" />
                  <path d="M12 7v10M15.5 9.5l-7 5M15.5 14.5l-7-5" />
                </svg>
              </Link>
              <Link
                href="https://x.com/zunemoney"
                className="text-gray-400 hover:text-white"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
