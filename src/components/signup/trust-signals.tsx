import Link from "next/link"
import { BarChart2, UserCheck, Shield } from "lucide-react"

export function TrustSignals() {
  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Why Join ZuneMoney?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Join thousands of investors who trust ZuneMoney to track their investments and dividends.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {/* Real-Time Tracking */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
              <BarChart2 className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-900">Real-Time Tracking</h3>
            <p className="mb-4 text-gray-600">
              Monitor your investments in real-time with automatic updates and comprehensive analytics.
            </p>
            <Link href="/stock/AAPL" className="text-indigo-600 hover:underline">
              Track AAPL now →
            </Link>
          </div>

          {/* User-Friendly Interface */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
              <UserCheck className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-900">User-Friendly Interface</h3>
            <p className="mb-4 text-gray-600">
              Intuitive dashboard designed for both beginners and experienced investors.
            </p>
            <Link href="/demo" className="text-indigo-600 hover:underline">
              Try the demo →
            </Link>
          </div>

          {/* Trusted by Investors */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-900">Trusted by Investors</h3>
            <p className="mb-4 text-gray-600">
              Join thousands of investors who rely on ZuneMoney for their investment tracking needs.
            </p>
            <Link href="/testimonials" className="text-indigo-600 hover:underline">
              Read testimonials →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
