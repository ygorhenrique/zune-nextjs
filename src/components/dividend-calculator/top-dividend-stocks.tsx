import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const topDividendStocks = [
  { name: "Apple Inc.", ticker: "AAPL", yield: "0.51%", annualDividend: "$0.92" },
  { name: "Microsoft Corporation", ticker: "MSFT", yield: "0.73%", annualDividend: "$2.72" },
  { name: "Johnson & Johnson", ticker: "JNJ", yield: "3.01%", annualDividend: "$4.76" },
  { name: "Procter & Gamble Co.", ticker: "PG", yield: "2.45%", annualDividend: "$3.76" },
  { name: "Coca-Cola Company", ticker: "KO", yield: "3.00%", annualDividend: "$1.84" },
  { name: "Verizon Communications Inc.", ticker: "VZ", yield: "6.70%", annualDividend: "$2.61" },
  { name: "AT&T Inc.", ticker: "T", yield: "6.30%", annualDividend: "$1.11" },
  { name: "Exxon Mobil Corporation", ticker: "XOM", yield: "3.60%", annualDividend: "$3.64" },
  { name: "Chevron Corporation", ticker: "CVX", yield: "4.00%", annualDividend: "$6.04" },
  { name: "JPMorgan Chase & Co.", ticker: "JPM", yield: "2.40%", annualDividend: "$4.00" },
]

export function TopDividendStocks() {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Top Dividend-Paying Stocks</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore some of the most popular dividend-paying stocks that investors track with ZuneMoney.
        </p>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Ticker</TableHead>
              <TableHead>Dividend Yield</TableHead>
              <TableHead>Annual Dividend</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topDividendStocks.map((stock) => (
              <TableRow key={stock.ticker} className="hover:bg-gray-50">
                <TableCell className="font-medium">{stock.name}</TableCell>
                <TableCell>
                  <Link href={`/stock/${stock.ticker}`} className="text-primary hover:underline">
                    {stock.ticker}
                  </Link>
                </TableCell>
                <TableCell>{stock.yield}</TableCell>
                <TableCell>{stock.annualDividend}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          Data as of May 3, 2025. Dividend yields and amounts are subject to change.
        </p>
      </div>
    </div>
  )
}
