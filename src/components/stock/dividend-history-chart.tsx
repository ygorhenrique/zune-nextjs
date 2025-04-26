"use client"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js"
import { Bar } from "react-chartjs-2"
import type { DividendPayment } from "@/lib/mock-stock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface DividendHistoryChartProps {
  dividendHistory: DividendPayment[]
  currency: string
}

export function DividendHistoryChart({ dividendHistory, currency }: DividendHistoryChartProps) {
  // Group dividends by year and quarter
  const groupedDividends: Record<string, number> = {}

  dividendHistory.forEach((dividend) => {
    const date = new Date(dividend.paymentDate)
    const year = date.getFullYear()
    const quarter = Math.floor(date.getMonth() / 3) + 1
    const key = `Q${quarter} ${year}`

    if (!groupedDividends[key]) {
      groupedDividends[key] = 0
    }

    groupedDividends[key] += dividend.amount
  })

  // Sort keys by date
  const sortedKeys = Object.keys(groupedDividends).sort((a, b) => {
    const yearA = Number.parseInt(a.split(" ")[1])
    const yearB = Number.parseInt(b.split(" ")[1])
    if (yearA !== yearB) return yearA - yearB

    const quarterA = Number.parseInt(a.split(" ")[0].replace("Q", ""))
    const quarterB = Number.parseInt(b.split(" ")[0].replace("Q", ""))
    return quarterA - quarterB
  })

  const chartData = {
    labels: sortedKeys,
    datasets: [
      {
        label: `Dividend (${currency})`,
        data: sortedKeys.map((key) => groupedDividends[key]),
        backgroundColor: "#4f46e5",
        borderRadius: 4,
      },
    ],
  }

  const chartOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${currency} ${context.parsed.y.toFixed(2)}`
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          callback: (value) => `${currency} ${value}`,
        },
      },
    },
  }

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">Dividend History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] w-full">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </CardContent>
    </Card>
  )
}
