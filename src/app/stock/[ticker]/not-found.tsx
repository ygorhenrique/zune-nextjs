import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function StockNotFound() {
  return (
    <div className="container mx-auto py-16 px-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Stock Not Found</h1>
      <p className="text-xl text-gray-600 mb-8">
        We couldn't find the stock you're looking for. It may not exist or may have been delisted.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link href="/dashboard">
          <Button variant="default" className="bg-indigo-600 hover:bg-indigo-700">
            Go to Dashboard
          </Button>
        </Link>
        <Link href="/">
          <Button variant="outline">Return to Home</Button>
        </Link>
      </div>
    </div>
  )
}
