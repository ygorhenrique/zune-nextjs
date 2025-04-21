"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronDown, ChevronUp } from "lucide-react"
import { mockPerformanceData } from "@/lib/mock-performance-data"
import type { AssetClassPerformance } from "@/lib/mock-performance-data"

export function PerformanceBreakdown() {
  const [expandedClass, setExpandedClass] = useState<string | null>(null)

  const { assetClassPerformance } = mockPerformanceData

  const toggleExpand = (assetClass: string) => {
    if (expandedClass === assetClass) {
      setExpandedClass(null)
    } else {
      setExpandedClass(assetClass)
    }
  }

  return (
    <Card className="mt-6">
      <CardHeader className="pb-2">
        <CardTitle>Performance Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset Class</TableHead>
                <TableHead className="text-right">Total Value</TableHead>
                <TableHead className="text-right">Gain/Loss</TableHead>
                <TableHead className="text-right">Contribution</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assetClassPerformance.map((assetClass: AssetClassPerformance) => (
                <>
                  <TableRow
                    key={assetClass.class}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => toggleExpand(assetClass.class)}
                  >
                    <TableCell className="font-medium flex items-center">
                      {assetClass.class}
                      {expandedClass === assetClass.class ? (
                        <ChevronUp className="ml-2 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-2 h-4 w-4" />
                      )}
                    </TableCell>
                    <TableCell className="text-right">€{assetClass.value.toLocaleString()}</TableCell>
                    <TableCell className={`text-right ${assetClass.gain >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {assetClass.gain >= 0 ? "+" : ""}€{assetClass.gain.toLocaleString()} (
                      {assetClass.gain >= 0 ? "+" : ""}
                      {assetClass.gainPercent.toFixed(2)}%)
                    </TableCell>
                    <TableCell className="text-right">
                      {assetClass.contribution.toFixed(1)}%
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div
                          className={`h-1.5 rounded-full ${assetClass.contribution >= 0 ? "bg-green-500" : "bg-red-500"}`}
                          style={{
                            width: `${Math.min(Math.abs(assetClass.contribution), 100)}%`,
                          }}
                        ></div>
                      </div>
                    </TableCell>
                  </TableRow>

                  {/* Expanded view for assets */}
                  {expandedClass === assetClass.class && (
                    <TableRow className="bg-muted/30">
                      <TableCell colSpan={4} className="p-0">
                        <div className="animate-in slide-in-from-top duration-300">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="pl-8">Asset</TableHead>
                                <TableHead className="text-right">Value</TableHead>
                                <TableHead className="text-right">Gain/Loss</TableHead>
                                <TableHead className="text-right">Contribution</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {assetClass.assets.map((asset) => (
                                <TableRow key={asset.name}>
                                  <TableCell className="pl-8 font-medium">{asset.name}</TableCell>
                                  <TableCell className="text-right">€{asset.value.toLocaleString()}</TableCell>
                                  <TableCell
                                    className={`text-right ${asset.gain >= 0 ? "text-green-600" : "text-red-600"}`}
                                  >
                                    {asset.gain >= 0 ? "+" : ""}€{asset.gain.toLocaleString()} (
                                    {asset.gain >= 0 ? "+" : ""}
                                    {asset.gainPercent.toFixed(2)}%)
                                  </TableCell>
                                  <TableCell className="text-right">
                                    {asset.contribution.toFixed(1)}%
                                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                      <div
                                        className={`h-1.5 rounded-full ${asset.contribution >= 0 ? "bg-green-500" : "bg-red-500"}`}
                                        style={{
                                          width: `${Math.min(Math.abs(asset.contribution), 100)}%`,
                                        }}
                                      ></div>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
