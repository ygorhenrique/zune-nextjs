"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockPortfolioData } from "@/lib/mock-data"

export function CurrentHoldings() {
  const { holdings } = mockPortfolioData
  const [searchQuery, setSearchQuery] = useState("")

  const filteredHoldings = holdings.filter(
    (holding) =>
      holding.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      holding.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Card className="mt-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Current Holdings</CardTitle>
            <CardDescription>Your investment portfolio holdings</CardDescription>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search holdings..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Shares</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Value</TableHead>
              <TableHead className="text-right">Gain/Loss</TableHead>
              <TableHead className="text-right">Allocation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredHoldings.map((holding) => (
              <TableRow key={holding.symbol}>
                <TableCell className="font-medium">{holding.symbol}</TableCell>
                <TableCell>{holding.name}</TableCell>
                <TableCell>{holding.shares}</TableCell>
                <TableCell className="text-right">€{holding.price.toFixed(2)}</TableCell>
                <TableCell className="text-right">€{holding.value.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end">
                    <span className={holding.gain >= 0 ? "text-green-500" : "text-red-500"}>
                      {holding.gain >= 0 ? (
                        <ArrowUp className="h-4 w-4 inline mr-1" />
                      ) : (
                        <ArrowDown className="h-4 w-4 inline mr-1" />
                      )}
                      {holding.gain >= 0 ? "+" : ""}
                      {holding.gainPercentage.toFixed(2)}%
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">{holding.allocation.toFixed(2)}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
