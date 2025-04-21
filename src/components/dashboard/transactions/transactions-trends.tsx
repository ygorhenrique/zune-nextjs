"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Transaction } from "@/lib/mock-transactions-data"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface TransactionsTrendsProps {
  transactions: Transaction[]
}

export function TransactionsTrends({ transactions }: TransactionsTrendsProps) {
  const [selectedType, setSelectedType] = useState<string>("all")

  // Generate monthly data
  const generateMonthlyData = () => {
    const monthlyData: Record<string, { month: string; amount: number }> = {}
    const now = new Date()

    // Initialize last 12 months
    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const monthKey = date.toLocaleString("default", { month: "short" }) + " " + date.getFullYear()
      monthlyData[monthKey] = { month: monthKey, amount: 0 }
    }

    // Aggregate transaction amounts by month and type
    transactions.forEach((transaction) => {
      if (selectedType !== "all" && transaction.type !== selectedType) return

      const date = new Date(transaction.date)
      const monthKey = date.toLocaleString("default", { month: "short" }) + " " + date.getFullYear()

      if (monthlyData[monthKey]) {
        monthlyData[monthKey].amount += Math.abs(transaction.amount)
      }
    })

    return Object.values(monthlyData)
  }

  const chartData = generateMonthlyData()

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-md shadow-lg border border-gray-200">
          <p className="font-medium">{label}</p>
          <p className="text-sm">
            <span className="font-medium">€{payload[0].value.toLocaleString()}</span> in{" "}
            {selectedType === "all" ? "transactions" : selectedType.toLowerCase() + " transactions"}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="mt-6">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Transaction Trends</CardTitle>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Transactions</SelectItem>
              <SelectItem value="Buy">Buy</SelectItem>
              <SelectItem value="Sell">Sell</SelectItem>
              <SelectItem value="Deposit">Deposit</SelectItem>
              <SelectItem value="Withdrawal">Withdrawal</SelectItem>
              <SelectItem value="Dividend">Dividend</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => value.split(" ")[0]} // Show only month abbreviation
              />
              <YAxis tickFormatter={(value) => `€${value}`} tick={{ fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#4f46e5"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                animationDuration={1500}
                animationEasing="ease-in-out"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
