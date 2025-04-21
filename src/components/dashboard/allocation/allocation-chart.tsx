"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, Sector } from "recharts"

interface AllocationItem {
  name: string
  value: number
}

interface AllocationChartProps {
  allocation: AllocationItem[]
}

export function AllocationChart({ allocation }: AllocationChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [animationComplete, setAnimationComplete] = useState(false)
  const COLORS = ["#4f46e5", "#ec4899", "#f59e0b", "#10b981", "#6366f1", "#8b5cf6"]

  useEffect(() => {
    // Set animation complete after a delay
    const timer = setTimeout(() => {
      setAnimationComplete(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index)
  }

  const onPieLeave = () => {
    setActiveIndex(null)
  }

  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 10}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    )
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-md shadow-lg border border-gray-200">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-sm">
            <span className="font-medium">€{payload[0].value.toLocaleString()}</span> ({payload[0].payload.percentage}%)
          </p>
        </div>
      )
    }
    return null
  }

  // Calculate percentages for each allocation item
  const allocationWithPercentage = allocation.map((item) => {
    const total = allocation.reduce((sum, i) => sum + i.value, 0)
    const percentage = ((item.value / total) * 100).toFixed(1)
    return { ...item, percentage }
  })

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Asset Allocation</CardTitle>
        <CardDescription>Distribution of your investments by asset class</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={allocationWithPercentage}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percentage }) => `${name}: ${percentage}%`}
                activeIndex={activeIndex !== null ? [activeIndex] : undefined}
                activeShape={renderActiveShape}
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
                onClick={(_, index) => setActiveIndex(index === activeIndex ? null : index)}
                animationDuration={1000}
                animationBegin={0}
                isAnimationActive={!animationComplete}
              >
                {allocationWithPercentage.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} style={{ cursor: "pointer" }} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                formatter={(value, entry, index) => (
                  <span style={{ color: COLORS[index % COLORS.length], fontWeight: 500 }}>{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
