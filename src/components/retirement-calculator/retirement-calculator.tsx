"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { InfoIcon, RefreshCw, Loader2, CheckCircle2 } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { cn } from "@/lib/utils"

type CalculationResult = {
  totalSavings: number
  totalContributions: number
  totalGrowth: number
}

export function RetirementCalculator() {
  const [currentSavings, setCurrentSavings] = useState("")
  const [monthlyContribution, setMonthlyContribution] = useState("")
  const [returnRate, setReturnRate] = useState("")
  const [years, setYears] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Fade-in animation on load
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate inputs
    if (!currentSavings || !monthlyContribution || !returnRate || !years) {
      setError("Please fill in all fields")
      return
    }

    const currentSavingsNum = Number.parseFloat(currentSavings)
    const monthlyContributionNum = Number.parseFloat(monthlyContribution)
    const returnRateNum = Number.parseFloat(returnRate)
    const yearsNum = Number.parseInt(years)

    if (currentSavingsNum < 0) {
      setError("Current savings must be a positive number")
      return
    }

    if (monthlyContributionNum < 0) {
      setError("Monthly contribution must be a positive number")
      return
    }

    if (returnRateNum < 0 || returnRateNum > 20) {
      setError("Return rate must be between 0 and 20%")
      return
    }

    if (yearsNum < 1 || yearsNum > 50) {
      setError("Years until retirement must be between 1 and 50")
      return
    }

    setError(null)
    setIsLoading(true)

    try {
      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Calculate retirement savings
      const monthlyRate = returnRateNum / 100 / 12
      const totalMonths = yearsNum * 12

      // Calculate future value of current savings
      const futureValueOfCurrentSavings = currentSavingsNum * Math.pow(1 + monthlyRate, totalMonths)

      // Calculate future value of monthly contributions
      let futureValueOfContributions = 0
      if (monthlyRate > 0) {
        futureValueOfContributions =
          monthlyContributionNum * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate)
      } else {
        futureValueOfContributions = monthlyContributionNum * totalMonths
      }

      const totalSavings = futureValueOfCurrentSavings + futureValueOfContributions
      const totalContributions = currentSavingsNum + monthlyContributionNum * totalMonths
      const totalGrowth = totalSavings - totalContributions

      setResult({
        totalSavings,
        totalContributions,
        totalGrowth,
      })
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setCurrentSavings("")
    setMonthlyContribution("")
    setReturnRate("")
    setYears("")
    setError(null)
    setResult(null)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  const chartData = result
    ? [
        {
          name: "Breakdown",
          Contributions: result.totalContributions,
          Growth: result.totalGrowth,
        },
      ]
    : []

  return (
    <Card className={cn("w-full transition-opacity duration-500", isVisible ? "opacity-100" : "opacity-0")}>
      <CardContent className="pt-6">
        <form className="space-y-4" onSubmit={handleCalculate}>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="current-savings">Current Savings</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">The total amount you've already saved for retirement</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <Input
                id="current-savings"
                type="number"
                placeholder="e.g., 50000"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(e.target.value)}
                className="pl-8"
                min="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="monthly-contribution">Monthly Contribution</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">How much you plan to contribute each month</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <Input
                id="monthly-contribution"
                type="number"
                placeholder="e.g., 500"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(e.target.value)}
                className="pl-8"
                min="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="return-rate">Expected Return Rate</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      The average annual return you expect from your investments, typically 5-8% for a balanced
                      portfolio
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="relative">
              <Input
                id="return-rate"
                type="number"
                placeholder="e.g., 6"
                value={returnRate}
                onChange={(e) => setReturnRate(e.target.value)}
                className="pr-8"
                min="0"
                max="20"
                step="0.1"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="years">Years Until Retirement</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">How many years you plan to save before retiring (max 50)</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="relative">
              <Input
                id="years"
                type="number"
                placeholder="e.g., 30"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                className="pr-14"
                min="1"
                max="50"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">years</span>
            </div>
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
                "Calculate Savings"
              )}
            </Button>
            <Button type="button" variant="outline" onClick={handleReset} disabled={isLoading}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </form>

        {result && (
          <div className="mt-6 pt-6 border-t border-gray-200 animate-fade-in">
            <h3 className="text-lg font-medium mb-4">Your Retirement Savings Projection</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Savings at Retirement:</span>
                <span className="font-semibold">{formatCurrency(result.totalSavings)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Contributions:</span>
                <span className="font-semibold">{formatCurrency(result.totalContributions)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Growth from Investments:</span>
                <span className="font-semibold">{formatCurrency(result.totalGrowth)}</span>
              </div>
            </div>

            <div className="mt-6 h-64">
              <ChartContainer
                // config={{
                //   Contributions: {
                //     label: "Contributions",
                //     color: "hsl(var(--chart-1))",
                //   },
                //   Growth: {
                //     label: "Growth",
                //     color: "hsl(var(--chart-2))",
                //   },
                // }}
                className="h-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="Contributions" fill="var(--color-Contributions)" name="Contributions" />
                    <Bar dataKey="Growth" fill="var(--color-Growth)" name="Growth" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>

            <div className="mt-6 flex flex-col items-center">
              <Button className="w-full md:w-auto" onClick={() => (window.location.href = "/signup")}>
                Sign Up for Free
              </Button>
              <div className="flex items-center mt-4 text-sm text-gray-600">
                <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                <span>Secure Calculations</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
