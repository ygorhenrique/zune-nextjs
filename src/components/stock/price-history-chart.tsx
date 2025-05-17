"use client"

import { useState } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js"
import { Line } from "react-chartjs-2"
import type { StockPrice } from "@/lib/mock-stock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface PriceHistoryChartProps {
  weekData: StockPrice[]
  monthData: StockPrice[]
  yearData: StockPrice[]
  fiveYearData: StockPrice[]
  currency: string
  enabled: boolean
}

type TimeRange = "week" | "month" | "year" | "fiveYears"

export function PriceHistoryChart({ weekData, monthData, yearData, fiveYearData, currency, enabled }: PriceHistoryChartProps) {
  const [activeRange, setActiveRange] = useState<TimeRange>("month")

  const getDataForRange = (range: TimeRange) => {
    switch (range) {
      case "week":
        return weekData
      case "month":
        return monthData
      case "year":
        return yearData
      case "fiveYears":
        return fiveYearData
      default:
        return monthData
    }
  }

  const getRangeLabel = (range: TimeRange) => {
    switch (range) {
      case "week":
        return "Week"
      case "month":
        return "Month"
      case "year":
        return "12-Months"
      case "fiveYears":
        return "5-Years"
      default:
        return "Month"
    }
  }

  const currentData = getDataForRange(activeRange)

  const chartData = {
    labels: currentData.map((item) => {
      // Format date based on range
      const date = new Date(item.date)
      if (activeRange === "week") {
        return date.toLocaleDateString(undefined, { weekday: "short" })
      } else if (activeRange === "month") {
        return date.toLocaleDateString(undefined, { day: "numeric", month: "short" })
      } else if (activeRange === "year") {
        return date.toLocaleDateString(undefined, { month: "short", year: "2-digit" })
      } else {
        return date.toLocaleDateString(undefined, { month: "short", year: "numeric" })
      }
    }),
    datasets: [
      {
        label: `Price (${currency})`,
        data: currentData.map((item) => item.close),
        borderColor: "#4f46e5",
        backgroundColor: "rgba(79, 70, 229, 0.1)",
        borderWidth: 2,
        pointRadius: activeRange === "week" ? 3 : activeRange === "month" ? 2 : 0,
        pointHoverRadius: 5,
        tension: 0.3,
        fill: true,
      },
    ],
  }

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: (context) => {
            return `${currency} ${context.parsed.y.toFixed(2)}`
          },
          title: (tooltipItems) => {
            const index = tooltipItems[0].dataIndex
            const date = new Date(currentData[index].date)
            return date.toLocaleDateString(undefined, {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: activeRange === "week" ? 7 : activeRange === "month" ? 10 : 12,
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
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
  }

  const timeRanges: TimeRange[] = ["week", "month", "year", "fiveYears"]

  if (!enabled) {
    return (
      <div> </div>
    )
  }

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">Price History</CardTitle>
        <div className="flex flex-wrap gap-2 mt-2">
          {timeRanges.map((range) => (
            <Button
              key={range}
              variant={activeRange === range ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveRange(range)}
              className={activeRange === range ? "bg-indigo-600 hover:bg-indigo-700" : ""}
            >
              {getRangeLabel(range)}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <Line data={chartData} options={chartOptions} />
        </div>
      </CardContent>
    </Card>
  )
}
