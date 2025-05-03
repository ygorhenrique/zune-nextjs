"use client"

import { useState } from "react"
import { CheckCircle, HelpCircle, Loader2 } from "lucide-react"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import Link from "next/link"

interface SimulationResult {
  finalValue: number
  totalContributions: number
  totalGrowth: number
  yearlyData: { year: number; value: number }[]
}

export function PortfolioGrowthSimulator() {
  const [initialInvestment, setInitialInvestment] = useState<string>("")
  const [annualContributions, setAnnualContributions] = useState<string>("")
  const [returnRate, setReturnRate] = useState<string>("")
  const [timeHorizon, setTimeHorizon] = useState<string>("")
  const [result, setResult] = useState<SimulationResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showYearlyBreakdown, setShowYearlyBreakdown] = useState<boolean>(false)

  const validateInputs = () => {
    const initial = Number.parseFloat(initialInvestment)
    const annual = Number.parseFloat(annualContributions)
    const rate = Number.parseFloat(returnRate)
    const years = Number.parseInt(timeHorizon)

    if (isNaN(initial) || initial < 0) {
      setError("Please enter a positive value for initial investment")
      return false
    }

    if (isNaN(annual) || annual < 0) {
      setError("Please enter a positive value for annual contributions")
      return false
    }

    if (isNaN(rate) || rate < 0 || rate > 20) {
      setError("Please enter a return rate between 0% and 20%")
      return false
    }

    if (isNaN(years) || years < 1 || years > 50) {
      setError("Please enter a time horizon between 1 and 50 years")
      return false
    }

    return true
  }

  const simulateGrowth = () => {
    setError(null)
    if (!validateInputs()) return

    setIsLoading(true)

    // Simulate API call with setTimeout
    setTimeout(() => {
      try {
        const initial = Number.parseFloat(initialInvestment)
        const annual = Number.parseFloat(annualContributions)
        const rate = Number.parseFloat(returnRate) / 100
        const years = Number.parseInt(timeHorizon)

        let currentValue = initial
        let totalContributions = initial
        const yearlyData = [{ year: 0, value: initial }]

        for (let year = 1; year <= years; year++) {
          // Add annual contribution
          currentValue += annual
          totalContributions += annual

          // Apply growth
          currentValue *= 1 + rate

          yearlyData.push({
            year,
            value: Math.round(currentValue * 100) / 100,
          })
        }

        const finalValue = currentValue
        const totalGrowth = finalValue - totalContributions

        setResult({
          finalValue,
          totalContributions,
          totalGrowth,
          yearlyData,
        })

        setIsLoading(false)
      } catch (err) {
        setError("Unable to calculate. Please check your inputs and try again.")
        setIsLoading(false)
      }
    }, 800)
  }

  const resetForm = () => {
    setInitialInvestment("")
    setAnnualContributions("")
    setReturnRate("")
    setTimeHorizon("")
    setResult(null)
    setError(null)
    setShowYearlyBreakdown(false)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  return (
    <div className="mx-auto w-full max-w-3xl animate-fadeIn">
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="initialInvestment">
                  Initial Investment
                  <span
                    className="ml-1 inline-flex cursor-help items-center text-gray-500"
                    title="The amount you start with in your portfolio"
                  >
                    <HelpCircle className="h-4 w-4" />
                  </span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    id="initialInvestment"
                    type="number"
                    placeholder="e.g., 10000"
                    className="pl-7"
                    value={initialInvestment}
                    onChange={(e) => setInitialInvestment(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="annualContributions">
                  Annual Contributions
                  <span
                    className="ml-1 inline-flex cursor-help items-center text-gray-500"
                    title="The amount you add to your portfolio each year"
                  >
                    <HelpCircle className="h-4 w-4" />
                  </span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    id="annualContributions"
                    type="number"
                    placeholder="e.g., 5000"
                    className="pl-7"
                    value={annualContributions}
                    onChange={(e) => setAnnualContributions(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="returnRate">
                  Expected Return Rate
                  <span
                    className="ml-1 inline-flex cursor-help items-center text-gray-500"
                    title="The average annual return you expect from your investments, typically 5-8% for a balanced portfolio"
                  >
                    <HelpCircle className="h-4 w-4" />
                  </span>
                </Label>
                <div className="relative">
                  <Input
                    id="returnRate"
                    type="number"
                    placeholder="e.g., 7"
                    className="pr-7"
                    value={returnRate}
                    onChange={(e) => setReturnRate(e.target.value)}
                    min="0"
                    max="20"
                    step="0.1"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeHorizon">
                  Time Horizon
                  <span
                    className="ml-1 inline-flex cursor-help items-center text-gray-500"
                    title="The number of years you plan to invest"
                  >
                    <HelpCircle className="h-4 w-4" />
                  </span>
                </Label>
                <div className="relative">
                  <Input
                    id="timeHorizon"
                    type="number"
                    placeholder="e.g., 20"
                    className="pr-12"
                    value={timeHorizon}
                    onChange={(e) => setTimeHorizon(e.target.value)}
                    min="1"
                    max="50"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">years</span>
                </div>
              </div>
            </div>

            {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">{error}</div>}

            <div className="flex flex-wrap gap-3">
              <Button onClick={simulateGrowth} className="flex-1 bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Simulating...
                  </>
                ) : (
                  "Simulate Growth"
                )}
              </Button>
              <Button onClick={resetForm} variant="outline" className="flex-1" disabled={isLoading}>
                Reset
              </Button>
            </div>

            <div className="flex items-center justify-center text-sm text-gray-600">
              <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
              <span>Secure Calculations</span>
            </div>
          </div>

          {result && (
            <div className="mt-8 space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 gap-4 rounded-lg bg-gray-50 p-4 sm:grid-cols-3">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-500">Final Portfolio Value</p>
                  <p className="text-2xl font-bold text-blue-600">{formatCurrency(result.finalValue)}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-500">Total Contributions</p>
                  <p className="text-2xl font-bold">{formatCurrency(result.totalContributions)}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-500">Total Growth</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(result.totalGrowth)}</p>
                </div>
              </div>

              <div className="h-[300px] w-full">
                <ChartContainer
                  // config={{
                  //   value: {
                  //     label: "Portfolio Value",
                  //     color: "hsl(var(--chart-1))",
                  //   },
                  // }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={result.yearlyData}>
                      <XAxis
                        dataKey="year"
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `Year ${value}`}
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${Math.round(value / 1000)}k`}
                      />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            // valueFormatter={(value) => formatCurrency(value)}
                            // labelFormatter={(label) => `Year ${label}`}
                          />
                        }
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="var(--color-value)"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>

              <div className="flex items-center justify-between">
                <Button variant="outline" size="sm" onClick={() => setShowYearlyBreakdown(!showYearlyBreakdown)}>
                  {showYearlyBreakdown ? "Hide" : "Show"} Yearly Breakdown
                </Button>
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/signup">Sign Up for Free</Link>
                </Button>
              </div>

              {showYearlyBreakdown && (
                <div className="mt-4 max-h-[300px] overflow-auto rounded-lg border">
                  <table className="w-full text-left text-sm">
                    <thead className="sticky top-0 bg-gray-50 text-xs uppercase text-gray-700">
                      <tr>
                        <th className="px-4 py-3">Year</th>
                        <th className="px-4 py-3">Portfolio Value</th>
                        {timeHorizon && Number.parseInt(timeHorizon) <= 20 && (
                          <>
                            <th className="px-4 py-3">Annual Contribution</th>
                            <th className="px-4 py-3">Growth</th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {result.yearlyData.map((data, index) => {
                        const prevValue = index > 0 ? result.yearlyData[index - 1].value : 0
                        const contribution =
                          index > 0 ? Number.parseFloat(annualContributions) : Number.parseFloat(initialInvestment)
                        const growth = index > 0 ? data.value - prevValue - Number.parseFloat(annualContributions) : 0

                        return (
                          <tr key={data.year} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-3">Year {data.year}</td>
                            <td className="px-4 py-3 font-medium">{formatCurrency(data.value)}</td>
                            {timeHorizon && Number.parseInt(timeHorizon) <= 20 && (
                              <>
                                <td className="px-4 py-3">{formatCurrency(contribution)}</td>
                                <td className="px-4 py-3 text-green-600">{index > 0 ? formatCurrency(growth) : "-"}</td>
                              </>
                            )}
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
