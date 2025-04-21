"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronDown, ChevronUp } from "lucide-react"
import { mockPortfolioData } from "@/lib/mock-data"

interface AllocationItem {
  name: string
  value: number
}

interface AllocationTableProps {
  allocation: AllocationItem[]
  totalValue: number
}

export function AllocationTable({ allocation, totalValue }: AllocationTableProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  const toggleCategory = (category: string) => {
    if (expandedCategory === category) {
      setExpandedCategory(null)
    } else {
      setExpandedCategory(category)
    }
  }

  // Get holdings for a specific category
  const getHoldingsForCategory = (category: string) => {
    // This is a simplified example - in a real app, you'd filter your actual holdings data
    return mockPortfolioData.holdings.filter((holding) => {
      if (category === "Stocks") {
        return (
          holding.symbol !== "VWCE" && holding.symbol !== "EUNL" && holding.symbol !== "BTCE" && holding.symbol !== "O"
        )
      } else if (category === "ETFs") {
        return holding.symbol === "VWCE" || holding.symbol === "EUNL"
      } else if (category === "Crypto") {
        return holding.symbol === "BTCE"
      } else if (category === "Real Estate") {
        return holding.symbol === "O"
      }
      return false
    })
  }

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Allocation Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asset Class</TableHead>
              <TableHead className="text-right">Percentage</TableHead>
              <TableHead className="text-right">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allocation.map((item) => {
              const percentage = ((item.value / totalValue) * 100).toFixed(1)
              const holdings = getHoldingsForCategory(item.name)

              return (
                <>
                  <TableRow
                    key={item.name}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => toggleCategory(item.name)}
                  >
                    <TableCell className="font-medium flex items-center">
                      {item.name}
                      {holdings.length > 0 &&
                        (expandedCategory === item.name ? (
                          <ChevronUp className="ml-2 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-2 h-4 w-4" />
                        ))}
                    </TableCell>
                    <TableCell className="text-right">{percentage}%</TableCell>
                    <TableCell className="text-right">€{item.value.toLocaleString()}</TableCell>
                  </TableRow>

                  {/* Expanded view for holdings */}
                  {expandedCategory === item.name && holdings.length > 0 && (
                    <TableRow className="bg-muted/30">
                      <TableCell colSpan={3} className="p-0">
                        <div className="animate-in slide-in-from-top duration-300">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="pl-8">Holding</TableHead>
                                <TableHead className="text-right">Percentage</TableHead>
                                <TableHead className="text-right">Value</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {holdings.map((holding) => (
                                <TableRow key={holding.symbol}>
                                  <TableCell className="pl-8">{holding.name}</TableCell>
                                  <TableCell className="text-right">
                                    {((holding.value / item.value) * 100).toFixed(1)}%
                                  </TableCell>
                                  <TableCell className="text-right">€{holding.value.toLocaleString()}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
