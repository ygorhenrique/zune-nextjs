"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockPortfolioData } from "@/lib/mock-data"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartArea,
  ChartLine,
  ChartXAxis,
  ChartYAxis,
} from "@/components/ui/chart"

export function PortfolioChart() {
  const { timelineData } = mockPortfolioData

  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>Portfolio Performance</CardTitle>
        <CardDescription>Track your portfolio growth over time</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="1y" className="mb-4">
          <TabsList>
            <TabsTrigger value="1m">1M</TabsTrigger>
            <TabsTrigger value="3m">3M</TabsTrigger>
            <TabsTrigger value="6m">6M</TabsTrigger>
            <TabsTrigger value="1y">1Y</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="h-[300px] w-full">
          <Chart data={timelineData} xField="date" yField="value" categories={["value"]}>
            <ChartContainer className="h-[300px]">
              <ChartYAxis />
              <ChartXAxis />
              <ChartTooltip>
                <ChartTooltipContent />
              </ChartTooltip>
              <ChartArea />
              <ChartLine className="stroke-indigo-500 stroke-2" strokeLinecap="round" strokeLinejoin="round" smooth />
            </ChartContainer>
          </Chart>
        </div>
      </CardContent>
    </Card>
  )
}
