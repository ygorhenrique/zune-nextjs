import type { SimilarCompany } from "@/lib/mock-stock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

interface SimilarCompaniesProps {
  companies: SimilarCompany[]
}

export function SimilarCompanies({ companies }: SimilarCompaniesProps) {
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">Similar Companies</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {companies.map((company) => (
            <Link href={`/stock/${company.ticker}`} key={company.ticker} className="block">
              <Card className="h-full hover:shadow-lg transition-shadow duration-200 hover:border-indigo-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 flex-shrink-0">
                      <Image
                        src={company.logoUrl || "/placeholder.svg"}
                        alt={`${company.companyName} logo`}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{company.companyName}</h3>
                      <p className="text-sm text-gray-500">
                        {company.ticker} • {company.exchange}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">CEO:</span>
                      <span>{company.ceo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Employees:</span>
                      <span>{company.employees.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span>
                        {company.city}, {company.country}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
