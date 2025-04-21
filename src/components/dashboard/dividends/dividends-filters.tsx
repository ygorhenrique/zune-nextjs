"use client"

import { useState } from "react"
import { Calendar, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import type { DividendStatus } from "@/lib/mock-dividends-data"

export function DividendsFilters() {
  const [dateRange, setDateRange] = useState<"all" | "30days" | "90days" | "year" | "custom">("all")
  const [asset, setAsset] = useState<string>("all")
  const [status, setStatus] = useState<DividendStatus | "all">("all")
  const [customDateRange, setCustomDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const handleClearFilters = () => {
    setDateRange("all")
    setAsset("all")
    setStatus("all")
    setCustomDateRange({ from: undefined, to: undefined })
  }

  const hasActiveFilters = dateRange !== "all" || asset !== "all" || status !== "all"

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex items-center gap-1.5 text-sm font-medium">
            <Filter className="h-4 w-4" />
            Filters:
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
            <Select value={dateRange} onValueChange={(value: any) => setDateRange(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="90days">Last 90 Days</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>

            {dateRange === "custom" && (
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="justify-start text-left font-normal">
                    <Calendar className="mr-2 h-4 w-4" />
                    {customDateRange.from ? (
                      customDateRange.to ? (
                        <>
                          {customDateRange.from.toLocaleDateString()} - {customDateRange.to.toLocaleDateString()}
                        </>
                      ) : (
                        customDateRange.from.toLocaleDateString()
                      )
                    ) : (
                      "Pick a date range"
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    initialFocus
                    mode="range"
                    defaultMonth={customDateRange.from}
                    selected={{
                      from: customDateRange.from,
                      to: customDateRange.to,
                    }}
                    onSelect={(range: any) => {
                      setCustomDateRange(range)
                      if (range.to) {
                        setIsCalendarOpen(false)
                      }
                    }}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            )}

            <Select value={asset} onValueChange={setAsset}>
              <SelectTrigger>
                <SelectValue placeholder="Asset" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Assets</SelectItem>
                <SelectItem value="AAPL">AAPL</SelectItem>
                <SelectItem value="MSFT">MSFT</SelectItem>
                <SelectItem value="JNJ">JNJ</SelectItem>
                <SelectItem value="PG">PG</SelectItem>
                <SelectItem value="KO">KO</SelectItem>
                <SelectItem value="VTI">VTI</SelectItem>
                <SelectItem value="SCHD">SCHD</SelectItem>
                <SelectItem value="O">O</SelectItem>
              </SelectContent>
            </Select>

            <Select value={status} onValueChange={(value: any) => setStatus(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Processing">Processing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={handleClearFilters} className="ml-auto">
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
