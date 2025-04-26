import Link from "next/link"

interface SectorCTAProps {
  sectorName: string
}

export function SectorCTA({ sectorName }: SectorCTAProps) {
  return (
    <div className="bg-indigo-600 text-white rounded-lg shadow-md p-8 text-center">
      <h2 className="text-3xl font-bold mb-4">Track {sectorName} Stocks with ZuneMoney</h2>
      <p className="text-xl mb-6">Get real-time updates, dividend tracking, and portfolio analysis</p>
      <Link href="/dashboard">
        <span className="inline-block bg-yellow-400 hover:bg-yellow-500 text-indigo-900 font-bold py-3 px-8 rounded-lg text-lg transition-colors">
          Sign Up Now
        </span>
      </Link>
    </div>
  )
}
