"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, Info } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

interface AllocationItem {
  name: string
  value: number
}

interface AllocationInsightsProps {
  allocation: AllocationItem[]
}

export function AllocationInsights({ allocation }: AllocationInsightsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Suggested allocation
  const suggestedAllocation = [
    { name: "Stocks", value: 50 },
    { name: "ETFs", value: 20 },
    { name: "Bonds", value: 15 },
    { name: "Real Estate", value: 10 },
    { name: "Cash", value: 5 },
  ]

  // Calculate current allocation percentages
  const totalValue = allocation.reduce((sum, item) => sum + item.value, 0)
  const currentAllocation = allocation.map((item) => ({
    name: item.name,
    percentage: ((item.value / totalValue) * 100).toFixed(1),
  }))

  // Find significant deviations
  const findDeviation = () => {
    const stocksAllocation = currentAllocation.find((item) => item.name === "Stocks")
    if (stocksAllocation && Number.parseFloat(stocksAllocation.percentage) > 60) {
      return {
        type: "Stocks",
        message: "Your stock allocation is 10% above the suggested range",
        severity: "warning",
      }
    }
    return null
  }

  const deviation = findDeviation()
  const COLORS = ["#4f46e5", "#ec4899", "#f59e0b", "#10b981", "#6366f1"]

  return (
    <>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Suggested Allocation</CardTitle>
          <CardDescription>Recommendations based on your investment profile</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="mb-4">
                Consider a balanced allocation across different asset classes to optimize your portfolio's risk and
                return profile:
              </p>
              <ul className="space-y-2 mb-4">
                {suggestedAllocation.map((item) => (
                  <li key={item.name} className="flex justify-between">
                    <span>{item.name}</span>
                    <span className="font-medium">{item.value}%</span>
                  </li>
                ))}
              </ul>

              {deviation && (
                <div
                  className={`p-3 rounded-md flex items-start gap-3 ${deviation.severity === "warning" ? "bg-yellow-50 text-yellow-800" : "bg-blue-50 text-blue-800"}`}
                >
                  {deviation.severity === "warning" ? (
                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  ) : (
                    <Info className="h-5 w-5 flex-shrink-0" />
                  )}
                  <p className="text-sm">{deviation.message}</p>
                </div>
              )}

              <Button variant="link" className="p-0 h-auto mt-4 text-primary" onClick={() => setIsModalOpen(true)}>
                Learn more about portfolio diversification
              </Button>
            </div>

            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={suggestedAllocation}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {suggestedAllocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Educational Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Understanding Portfolio Diversification</DialogTitle>
            <DialogDescription>Learn how diversification can help manage risk and optimize returns</DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <h4 className="text-lg font-medium mb-2">Why Diversify?</h4>
            <p className="mb-4">
              Diversification is a risk management strategy that mixes a variety of investments within a portfolio. The
              rationale behind this technique is that a portfolio constructed of different kinds of assets will, on
              average, yield higher long-term returns and lower the risk of any individual holding or security.
            </p>

            <h4 className="text-lg font-medium mb-2">Key Benefits:</h4>
            <ul className="list-disc pl-5 mb-4 space-y-1">
              <li>Reduces unsystematic risk without sacrificing potential returns</li>
              <li>Protects against market volatility and economic downturns</li>
              <li>Provides exposure to different growth opportunities</li>
              <li>Creates a more stable path to achieving your financial goals</li>
            </ul>

            <h4 className="text-lg font-medium mb-2">Suggested Allocation Explained:</h4>
            <p>
              Our suggested allocation is based on a moderate risk profile, balancing growth potential with stability.
              Adjust based on your investment timeline, risk tolerance, and financial goals.
            </p>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
