"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, RefreshCw } from "lucide-react"
import { useCombobox } from "downshift"
import { cn } from "@/lib/utils"
import { stockSuggestions } from "@/lib/mock-stock-suggestions"

type Currency = "USD" | "EUR" | "GBP"

type CalculationResult = {
  annualDividend: number
  quarterlyDividend: number
  investmentValue: number
  dividendYield: number
  currency: Currency
}

export function DividendCalculator() {
  const [symbol, setSymbol] = useState("")
  const [shares, setShares] = useState("")
  const [currency, setCurrency] = useState<Currency>("USD")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [inputValue, setInputValue] = useState("")

  const { isOpen, getMenuProps, getInputProps, getItemProps, highlightedIndex } = useCombobox({
    items: stockSuggestions.filter(
      (item) =>
        item.symbol.toLowerCase().includes(inputValue.toLowerCase()) ||
        item.name.toLowerCase().includes(inputValue.toLowerCase()),
    ),
    onInputValueChange: ({ inputValue }) => {
      setInputValue(inputValue || "")
    },
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) {
        setSymbol(selectedItem.symbol)
        setInputValue(`${selectedItem.symbol} - ${selectedItem.name}`)
      }
    },
  })

  const filteredItems = stockSuggestions
    .filter(
      (item) =>
        item.symbol.toLowerCase().includes(inputValue.toLowerCase()) ||
        item.name.toLowerCase().includes(inputValue.toLowerCase()),
    )
    .slice(0, 5)

  const handleCalculate = async () => {
    // Validate inputs
    if (!symbol) {
      setError("Please enter a stock symbol")
      return
    }

    if (!shares || Number.parseInt(shares) < 1) {
      setError("Please enter a valid number of shares (minimum 1)")
      return
    }

    setError(null)
    setIsLoading(true)

    try {
      // In a real app, this would be an API call to get stock data
      // For this example, we'll simulate a delay and use mock data
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock data for demonstration
      const stockData = stockSuggestions.find((s) => s.symbol === symbol.toUpperCase())

      if (!stockData) {
        setError("Invalid stock symbol or data unavailable. Please try another symbol.")
        setIsLoading(false)
        return
      }

      const sharesNum = Number.parseInt(shares)
      const annualDividend = stockData.annualDividend * sharesNum
      const quarterlyDividend = annualDividend / 4
      const investmentValue = stockData.price * sharesNum
      const dividendYield = (annualDividend / investmentValue) * 100

      setResult({
        annualDividend,
        quarterlyDividend,
        investmentValue,
        dividendYield,
        currency,
      })
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setSymbol("")
    setShares("")
    setCurrency("USD")
    setError(null)
    setResult(null)
    setInputValue("")
  }

  const formatCurrency = (value: number, currency: Currency) => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    return formatter.format(value)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="pt-6">
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            handleCalculate()
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="stock-symbol">Stock Symbol</Label>
            <div className="relative">
              <Input
                // id="stock-symbol"
                placeholder="Enter stock symbol (e.g., AAPL)"
                {...getInputProps({
                  // onChange: (e) => setInputValue(e.target.value),
                  value: inputValue,
                })}
                className="w-full"
              />
              {isOpen && filteredItems.length > 0 && (
                <ul
                  {...getMenuProps()}
                  className="absolute z-10 w-full bg-white shadow-lg max-h-60 rounded-md mt-1 overflow-auto"
                >
                  {filteredItems.map((item, index) => (
                    <li
                      key={item.symbol}
                      {...getItemProps({ item, index })}
                      className={cn(
                        "px-3 py-2 cursor-pointer",
                        highlightedIndex === index ? "bg-primary text-white" : "bg-white",
                      )}
                    >
                      <span className="font-medium">{item.symbol}</span> - {item.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="shares">Number of Shares</Label>
            <Input
              id="shares"
              type="number"
              min="1"
              placeholder="Enter number of shares"
              value={shares}
              onChange={(e) => setShares(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Select value={currency} onValueChange={(value) => setCurrency(value as Currency)}>
              <SelectTrigger id="currency" className="w-full">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD ($)</SelectItem>
                <SelectItem value="EUR">EUR (€)</SelectItem>
                <SelectItem value="GBP">GBP (£)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {error && <div className="text-sm text-red-500 font-medium">{error}</div>}

          <div className="flex space-x-2">
            <Button type="submit" className="flex-1" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Calculating...
                </>
              ) : (
                "Calculate"
              )}
            </Button>
            <Button type="button" variant="outline" onClick={handleReset} disabled={isLoading}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </form>

        {result && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-medium mb-4">Dividend Calculation Results</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Annual Dividend Income:</span>
                <span className="font-semibold">{formatCurrency(result.annualDividend, result.currency)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Quarterly Dividend Income:</span>
                <span className="font-semibold">{formatCurrency(result.quarterlyDividend, result.currency)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Investment Value:</span>
                <span className="font-semibold">{formatCurrency(result.investmentValue, result.currency)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Dividend Yield:</span>
                <span className="font-semibold">{result.dividendYield.toFixed(2)}%</span>
              </div>
            </div>
            <div className="mt-6">
              <Button variant="default" className="w-full" onClick={() => (window.location.href = "/signup")}>
                Sign Up for Free to Track All Your Dividends
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
