import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { SectorTrend } from "@/lib/mock-sector-data"

interface SectorTrendsProps {
  sectorName: string
  trends: SectorTrend[]
  className?: string
}

export function SectorTrends({ sectorName, trends, className }: SectorTrendsProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Recent {sectorName} Trends</CardTitle>
        <CardDescription>Key market trends affecting the {sectorName.toLowerCase()} sector</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trends.map((trend, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 dark:bg-gray-800">
              <h3 className="text-xl font-semibold mb-2">{trend.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{trend.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
