import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import Image from "next/image"

interface CompanySummaryProps {
  logoUrl: string
  companyName: string
  description: string
  sector: string
  industry: string
  employees: number
  website: string
  founded: number
  ceo: string
  headquarters: {
    city: string
    country: string
  }
}

export function CompanySummary({
  logoUrl,
  companyName,
  description,
  sector,
  industry,
  employees,
  website,
  founded,
  ceo,
  headquarters,
}: CompanySummaryProps) {
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">About {companyName}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0 flex flex-col items-center">
            <div className="relative w-24 h-24 mb-4">
              <Image src={logoUrl || "/placeholder.svg"} alt={`${companyName} logo`} fill className="object-contain" />
            </div>
          </div>
          <div className="flex-grow">
            <p className="text-gray-700 mb-4">{description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Sector:</span>
                <span>{sector}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Industry:</span>
                <span>{industry}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">CEO:</span>
                <span>{ceo}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Founded:</span>
                <span>{founded}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Employees:</span>
                <span>{employees.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Headquarters:</span>
                <span>
                  {headquarters.city}, {headquarters.country}
                </span>
              </div>
              <div className="flex justify-between col-span-1 md:col-span-2 mt-2">
                <span className="font-medium text-gray-600">Website:</span>
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800 flex items-center"
                >
                  {website.replace(/^https?:\/\//, "")}
                  <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
