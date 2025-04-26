import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SectorNotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-4xl font-bold">Sector Not Found</h1>
      <p className="mb-8 max-w-md text-lg text-gray-600 dark:text-gray-300">
        The sector you're looking for doesn't exist or may have been moved.
      </p>
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <Button asChild variant="default">
          <Link href="/">Return Home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/dashboard">Go to Dashboard</Link>
        </Button>
      </div>
    </div>
  )
}
