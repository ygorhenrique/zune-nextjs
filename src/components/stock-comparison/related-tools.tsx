import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, TrendingUp, PiggyBank } from "lucide-react"

export function RelatedTools() {
  return (
    <div className="mx-auto max-w-4xl">
      <h2 className="mb-6 text-center text-2xl font-bold">Explore More Free Tools</h2>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <Calculator className="mr-2 h-5 w-5 text-blue-600" />
              Dividend Calculator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              Calculate your potential dividend income from various stocks and see how it compounds over time.
            </CardDescription>
            <Link href="/dividend-calculator" className="text-blue-600 hover:underline">
              Try Dividend Calculator
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <PiggyBank className="mr-2 h-5 w-5 text-blue-600" />
              Retirement Calculator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              Plan for your future by estimating how much you need to save for a comfortable retirement.
            </CardDescription>
            <Link href="/retirement-savings-calculator" className="text-blue-600 hover:underline">
              Plan Your Retirement
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <TrendingUp className="mr-2 h-5 w-5 text-blue-600" />
              Portfolio Simulator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              Simulate the growth of your investment portfolio based on different allocation strategies.
            </CardDescription>
            <Link href="/portfolio-growth-simulator" className="text-blue-600 hover:underline">
              Simulate Your Portfolio
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
