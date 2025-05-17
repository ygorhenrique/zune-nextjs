import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, Calculator, TrendingUp } from "lucide-react"

export function RelatedTools() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-8 text-center">Explore More Free Tools</h2>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
              <Calculator className="h-6 w-6 text-indigo-600" />
            </div>
            <CardTitle>Dividend Calculator</CardTitle>
            <CardDescription>Estimate your dividend income from stocks and ETFs</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              Calculate potential dividend income based on your investments and see how it can grow over time.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/dividend-calculator">Try Dividend Calculator</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-indigo-600" />
            </div>
            <CardTitle>Portfolio Simulator</CardTitle>
            <CardDescription>Simulate your portfolio growth over time</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              See how your investment portfolio might perform under different market conditions and strategies.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/portfolio-growth-simulator">Try Portfolio Simulator</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
              <BarChart3 className="h-6 w-6 text-indigo-600" />
            </div>
            <CardTitle>Investment Tracker</CardTitle>
            <CardDescription>Track all your investments in one place</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              Monitor your stocks, ETFs, and other investments with real-time data and performance analytics.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/signup">Sign Up for Free</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
