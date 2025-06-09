"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Loader2 } from "lucide-react"
import { getPopularStocks } from "@/lib/mock-sector-data"
import { getStockData } from "@/lib/mock-stock-data"

interface StockData {
  ticker: string
  companyName: string
  currentPrice: number
  dividendYield: number
  peRatio: number
  marketCap: string
  fiftyTwoWeekHigh: number
  fiftyTwoWeekLow: number
  error?: string
}

export function StockComparisonTool() {
  const [stock1, setStock1] = useState("")
  const [stock2, setStock2] = useState("")
  const [stock3, setStock3] = useState("")
  const [suggestions1, setSuggestions1] = useState<{ ticker: string; name: string }[]>([])
  const [suggestions2, setSuggestions2] = useState<{ ticker: string; name: string }[]>([])
  const [suggestions3, setSuggestions3] = useState<{ ticker: string; name: string }[]>([])
  const [showSuggestions1, setShowSuggestions1] = useState(false)
  const [showSuggestions2, setShowSuggestions2] = useState(false)
  const [showSuggestions3, setShowSuggestions3] = useState(false)
  const [comparisonResults, setComparisonResults] = useState<StockData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [hasCompared, setHasCompared] = useState(false)

  const popularStocks = getPopularStocks()

  const suggestionRef1 = useRef<HTMLDivElement>(null)
  const suggestionRef2 = useRef<HTMLDivElement>(null)
  const suggestionRef3 = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionRef1.current && !suggestionRef1.current.contains(event.target as Node)) {
        setShowSuggestions1(false)
      }
      if (suggestionRef2.current && !suggestionRef2.current.contains(event.target as Node)) {
        setShowSuggestions2(false)
      }
      if (suggestionRef3.current && !suggestionRef3.current.contains(event.target as Node)) {
        setShowSuggestions3(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSearch = (
    value: string,
    setterFn: React.Dispatch<React.SetStateAction<string>>,
    suggestionSetter: React.Dispatch<React.SetStateAction<{ ticker: string; name: string }[]>>,
    showSuggestionSetter: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    setterFn(value)

    if (value.length > 0) {
      const filteredStocks = popularStocks.filter(
        (stock) =>
          stock.ticker.toLowerCase().includes(value.toLowerCase()) ||
          stock.name.toLowerCase().includes(value.toLowerCase()),
      )
      suggestionSetter(filteredStocks)
      showSuggestionSetter(true)
    } else {
      suggestionSetter([])
      showSuggestionSetter(false)
    }
  }

  const selectStock = (
    stock: { ticker: string; name: string },
    setterFn: React.Dispatch<React.SetStateAction<string>>,
    showSuggestionSetter: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    setterFn(stock.ticker)
    showSuggestionSetter(false)
  }

  const handleCompare = async () => {
    // Validate inputs
    if (!stock1 && !stock2 && !stock3) {
      setError("Please enter at least one valid stock symbol to compare.")
      return
    }

    // Check for duplicates
    const stocks = [stock1, stock2, stock3].filter(Boolean)
    const uniqueStocks = new Set(stocks)
    if (uniqueStocks.size !== stocks.length) {
      setError("Please select different stocks to compare.")
      return
    }

    setError("")
    setIsLoading(true)

    try {
      const results: StockData[] = []

      // Process each stock
      for (const stockSymbol of [stock1, stock2, stock3]) {
        if (!stockSymbol) continue

        try {
          const stockData = await getStockData(stockSymbol)
          results.push({
            ticker: stockSymbol,
            companyName: stockData.companyName,
            currentPrice: stockData.currentPrice,
            dividendYield: stockData.dividendYield,
            peRatio: stockData.peRatio,
            marketCap: stockData.marketCap,
            fiftyTwoWeekHigh: stockData.fiftyTwoWeekHigh,
            fiftyTwoWeekLow: stockData.fiftyTwoWeekLow,
          })
        } catch (error) {
          results.push({
            ticker: stockSymbol,
            companyName: "",
            currentPrice: 0,
            dividendYield: 0,
            peRatio: 0,
            marketCap: "",
            fiftyTwoWeekHigh: 0,
            fiftyTwoWeekLow: 0,
            error: `Data unavailable for ${stockSymbol}. Please try another.`,
          })
        }
      }

      setComparisonResults(results)
      setHasCompared(true)
    } catch (error) {
      setError("An error occurred while comparing stocks. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setStock1("")
    setStock2("")
    setStock3("")
    setComparisonResults([])
    setError("")
    setHasCompared(false)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value)
  }

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`
  }

  return (
    <div className="animate-fade-in opacity-0">
      <Card className="mx-auto max-w-4xl">
        <CardContent className="p-6">
          <div className="mb-6 grid gap-4 md:grid-cols-3">
            <div className="relative">
              <Input
                type="text"
                placeholder="Enter stock symbol (e.g., AAPL)"
                value={stock1}
                onChange={(e) => handleSearch(e.target.value, setStock1, setSuggestions1, setShowSuggestions1)}
                onFocus={() => stock1 && setSuggestions1.length > 0 && setShowSuggestions1(true)}
                className="w-full"
              />
              {showSuggestions1 && suggestions1.length > 0 && (
                <div
                  ref={suggestionRef1}
                  className="absolute z-10 mt-1 max-h-48 w-full overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg"
                >
                  {suggestions1.map((stock) => (
                    <div
                      key={stock.ticker}
                      className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                      onClick={() => selectStock(stock, setStock1, setShowSuggestions1)}
                    >
                      {stock.ticker} - {stock.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <Input
                type="text"
                placeholder="Enter stock symbol (e.g., MSFT)"
                value={stock2}
                onChange={(e) => handleSearch(e.target.value, setStock2, setSuggestions2, setShowSuggestions2)}
                onFocus={() => stock2 && setSuggestions2.length > 0 && setShowSuggestions2(true)}
                className="w-full"
              />
              {showSuggestions2 && suggestions2.length > 0 && (
                <div
                  ref={suggestionRef2}
                  className="absolute z-10 mt-1 max-h-48 w-full overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg"
                >
                  {suggestions2.map((stock) => (
                    <div
                      key={stock.ticker}
                      className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                      onClick={() => selectStock(stock, setStock2, setShowSuggestions2)}
                    >
                      {stock.ticker} - {stock.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <Input
                type="text"
                placeholder="Enter stock symbol (e.g., KO)"
                value={stock3}
                onChange={(e) => handleSearch(e.target.value, setStock3, setSuggestions3, setShowSuggestions3)}
                onFocus={() => stock3 && setSuggestions3.length > 0 && setShowSuggestions3(true)}
                className="w-full"
              />
              {showSuggestions3 && suggestions3.length > 0 && (
                <div
                  ref={suggestionRef3}
                  className="absolute z-10 mt-1 max-h-48 w-full overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg"
                >
                  {suggestions3.map((stock) => (
                    <div
                      key={stock.ticker}
                      className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                      onClick={() => selectStock(stock, setStock3, setShowSuggestions3)}
                    >
                      {stock.ticker} - {stock.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button onClick={handleCompare} disabled={isLoading} className="cta-button">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Comparing...
                </>
              ) : (
                "Compare Stocks"
              )}
            </Button>
            <Button onClick={handleReset} variant="outline" className="cta-button">
              Reset
            </Button>
          </div>

          {error && <div className="mt-4 rounded-md bg-red-50 p-4 text-red-600">{error}</div>}

          {hasCompared && comparisonResults.length > 0 && (
            <div className="mt-8">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-xl font-semibold">Comparison Results</h3>
                <div className="flex items-center text-sm text-green-600">
                  <CheckCircle className="mr-1 h-4 w-4" />
                  Real-Time Data
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-200 p-2 text-left">Metric</th>
                      {comparisonResults.map((result, index) => (
                        <th key={index} className="border border-gray-200 p-2 text-left">
                          {result.error ? (
                            <span className="text-red-500">{result.ticker}</span>
                          ) : (
                            <Link href={`/stock/${result.ticker}`} className="text-blue-600 hover:underline">
                              {result.ticker}
                            </Link>
                          )}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-200 p-2 font-medium">Company Name</td>
                      {comparisonResults.map((result, index) => (
                        <td key={index} className="border border-gray-200 p-2">
                          {result.error ? <span className="text-red-500">{result.error}</span> : result.companyName}
                        </td>
                      ))}
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-200 p-2 font-medium">Current Price</td>
                      {comparisonResults.map((result, index) => (
                        <td key={index} className="border border-gray-200 p-2">
                          {result.error ? "-" : formatCurrency(result.currentPrice)}
                        </td>
                      ))}
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-200 p-2 font-medium">Dividend Yield</td>
                      {comparisonResults.map((result, index) => (
                        <td key={index} className="border border-gray-200 p-2">
                          {result.error ? "-" : formatPercentage(result.dividendYield)}
                        </td>
                      ))}
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-200 p-2 font-medium">P/E Ratio</td>
                      {comparisonResults.map((result, index) => (
                        <td key={index} className="border border-gray-200 p-2">
                          {result.error ? "-" : result.peRatio.toFixed(2)}
                        </td>
                      ))}
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-200 p-2 font-medium">Market Cap</td>
                      {comparisonResults.map((result, index) => (
                        <td key={index} className="border border-gray-200 p-2">
                          {result.error ? "-" : result.marketCap}
                        </td>
                      ))}
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-200 p-2 font-medium">52-Week High/Low</td>
                      {comparisonResults.map((result, index) => (
                        <td key={index} className="border border-gray-200 p-2">
                          {result.error
                            ? "-"
                            : `${formatCurrency(result.fiftyTwoWeekHigh)}/${formatCurrency(result.fiftyTwoWeekLow)}`}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 text-center">
                <Link href="/signup">
                  <Button className="cta-button">Sign Up for Free</Button>
                </Link>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
