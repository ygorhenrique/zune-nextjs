import Link from "next/link"
import { Button } from "@/components/ui/button"

interface StockCTAProps {
  ticker: string
}

export function StockCTA({ ticker }: StockCTAProps) {
  return (
    <div className="bg-indigo-700 text-white rounded-lg p-6 shadow-md">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Track {ticker} and More with ZuneMoney</h2>
        <p className="mb-4">Get real-time updates, portfolio tracking, and dividend forecasts.</p>
        <Link href="/signup">
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-6 py-2">Try Now! 🚀</Button>
        </Link>
      </div>
    </div>
  )
}
