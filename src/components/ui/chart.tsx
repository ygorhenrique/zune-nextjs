"use client"

import * as React from "react"
import { Area, Bar, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { cn } from "@/lib/utils"

export interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: any[]
  xField: string
  yField: string
  categories?: string[]
}

export function Chart({ data, xField, yField, categories, className, ...props }: ChartProps) {
  const [chartData, setChartData] = React.useState<any[]>([])

  React.useEffect(() => {
    setChartData(data)
  }, [data])

  return (
    <div className={cn("", className)} {...props}>
      <ChartContext.Provider
        value={{
          data: chartData,
          xField,
          yField,
          categories,
        }}
      >
        {props.children}
      </ChartContext.Provider>
    </div>
  )
}

interface ChartContextProps {
  data: any[]
  xField: string
  yField: string
  categories?: string[]
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

export function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a Chart component")
  }

  return context
}

export interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ChartContainer({ className, children, ...props }: ChartContainerProps) {
  const { data, xField, yField, categories } = useChart()

  return (
    <div className={cn("h-[350px] w-full", className)} {...props}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          {children}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

export interface ChartTooltipProps extends React.ComponentProps<typeof Tooltip> {}

export function ChartTooltip({ ...props }: ChartTooltipProps) {
  return <Tooltip {...props} />
}

export interface ChartTooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ChartTooltipContent({ className, ...props }: ChartTooltipContentProps) {
  return <div className={cn("rounded-lg border bg-background px-3 py-1.5 shadow-md", className)} {...props} />
}

export interface ChartXAxisProps extends React.ComponentProps<typeof XAxis> {}

export function ChartXAxis({ className, ...props }: ChartXAxisProps) {
  const { xField } = useChart()

  return <XAxis dataKey={xField} {...props} />
}

export interface ChartYAxisProps extends React.ComponentProps<typeof YAxis> {}

export function ChartYAxis({ className, ...props }: ChartYAxisProps) {
  const { yField } = useChart()

  return <YAxis dataKey={yField} {...props} />
}

export interface ChartAreaProps extends React.ComponentProps<typeof Area> {}

export function ChartArea({ className, ...props }: ChartAreaProps) {
  const { yField, categories } = useChart()

  return (
    <>
      {categories?.map((category, index) => (
        <Area
          key={index}
          dataKey={category}
          fill={`hsl(var(--chart-${index}))`}
          stroke={`hsl(var(--chart-${index}))`}
          // {...props}
        />
      ))}
      {/* {!categories && <Area dataKey={yField} fill="hsl(var(--chart-0))" stroke="hsl(var(--chart-0))" {...props} />} */}
      {!categories && <Area dataKey={yField} fill="hsl(var(--chart-0))" stroke="hsl(var(--chart-0))" />}
    </>
  )
}

export interface ChartLineProps extends React.ComponentProps<typeof Line> {}

export function ChartLine({ className, ...props }: ChartLineProps) {
  const { yField, categories } = useChart()

  return (
    <>
      {categories?.map((category, index) => (
        // <Line key={index} dataKey={category} stroke={`hsl(var(--chart-${index}))`} {...props} />
        <Line key={index} dataKey={category} stroke={`hsl(var(--chart-${index}))`} />
      ))}
      {/* {!categories && <Line dataKey={yField} stroke="hsl(var(--chart-0))" {...props} />} */}
      {!categories && <Line dataKey={yField} stroke="hsl(var(--chart-0))" />}
    </>
  )
}

export interface ChartBarProps extends React.ComponentProps<typeof Bar> {}

export function ChartBar({ className, ...props }: ChartBarProps) {
  const { yField, categories } = useChart()

  return (
    <>
      {categories?.map((category, index) => (
        // <Bar key={index} dataKey={category} fill={`hsl(var(--chart-${index}))`} {...props} />
        <Bar key={index} dataKey={category} fill={`hsl(var(--chart-${index}))`} />
      ))}
      {/* {!categories && <Bar dataKey={yField} fill="hsl(var(--chart-0))" {...props} />} */}
      {!categories && <Bar dataKey={yField} fill="hsl(var(--chart-0))" />}
    </>
  )
}
