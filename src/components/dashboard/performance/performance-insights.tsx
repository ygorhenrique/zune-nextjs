"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"
import { mockPerformanceData } from "@/lib/mock-performance-data"
import { PerformanceAlertsModal } from "@/components/dashboard/performance/performance-alerts-modal"

export function PerformanceInsights() {
  const { historicalInsights } = mockPerformanceData
  const [isAlertsModalOpen, setIsAlertsModalOpen] = useState(false)

  return (
    <Card className="mt-6">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Historical Insights</CardTitle>
          <Button variant="outline" size="sm" onClick={() => setIsAlertsModalOpen(true)}>
            <Bell className="h-4 w-4 mr-2" />
            Set Performance Alerts
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {historicalInsights.map((insight) => (
            <div
              key={insight.type}
              className="flex items-start p-4 rounded-lg border bg-card animate-in fade-in-50 duration-300"
            >
              <div className="flex-1">
                <h4 className="text-sm font-medium text-muted-foreground">{insight.label}</h4>
                <div className="mt-1 flex items-baseline">
                  <p className="text-2xl font-semibold">{insight.value}</p>
                  <p className="ml-2 text-sm text-muted-foreground">{insight.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      <PerformanceAlertsModal open={isAlertsModalOpen} onOpenChange={setIsAlertsModalOpen} />
    </Card>
  )
}
