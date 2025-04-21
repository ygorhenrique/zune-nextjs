"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockPerformanceData } from "@/lib/mock-performance-data"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip, LabelList } from "recharts"
import { InfoIcon as InfoCircle } from "lucide-react"

export function PerformanceMetrics() {
  const { performanceMetrics } = mockPerformanceData

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-3 rounded-md shadow-lg border border-gray-200">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm mt-1">{data.description}</p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="mt-6">
      <CardHeader className="pb-2">
        <CardTitle>Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceMetrics} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="name"
                width={150}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => value}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={30}>
                {performanceMetrics.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
                <LabelList
                  dataKey="value"
                  position="right"
                  formatter={(value: number) => {
                    if (value < 0) return `${value.toFixed(1)}%`
                    return `${value.toFixed(1)}${value === performanceMetrics[2].value ? "" : "%"}`
                  }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <InfoCircle className="h-4 w-4" />
            <span>Hover over each metric for more information</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
