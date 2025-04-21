"use client"

import { useState } from "react"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { StockSector } from "@/lib/mock-stocks-data"

export function StocksFilters() {
  const [searchQuery, setSearchQuery] = useState("")
  const [performanceFilter, setPerformanceFilter] = useState<"all" | "gainers" | "losers">("all")
  const [sectorFilter, setSectorFilter] = useState<StockSector | "all">("all")

  const handleClearFilters = () => {
    setSearchQuery("")
    setPerformanceFilter("all")
    setSectorFilter("all")
  }

  const hasActiveFilters = searchQuery !== "" || performanceFilter !== "all" || sectorFilter !== "all"

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="relative w-full sm:w-auto flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by ticker or company name..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-3 w-full sm:w-auto">
            <Select value={performanceFilter} onValueChange={(value: any) => setPerformanceFilter(value)}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Performance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stocks</SelectItem>
                <SelectItem value="gainers">Gainers</SelectItem>
                <SelectItem value="losers">Losers</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sectorFilter} onValueChange={(value: any) => setSectorFilter(value)}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Sector" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sectors</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Healthcare">Healthcare</SelectItem>
                <SelectItem value="Consumer Cyclical">Consumer Cyclical</SelectItem>
                <SelectItem value="Financial Services">Financial Services</SelectItem>
                <SelectItem value="Communication Services">Communication Services</SelectItem>
                <SelectItem value="Consumer Defensive">Consumer Defensive</SelectItem>
                <SelectItem value="Energy">Energy</SelectItem>
                <SelectItem value="Industrials">Industrials</SelectItem>
                <SelectItem value="Utilities">Utilities</SelectItem>
                <SelectItem value="Real Estate">Real Estate</SelectItem>
                <SelectItem value="Basic Materials">Basic Materials</SelectItem>
              </SelectContent>
            </Select>

            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={handleClearFilters} className="h-10">
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
