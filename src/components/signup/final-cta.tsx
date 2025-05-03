import Link from "next/link"

export function FinalCTA() {
  return (
    <section className="bg-indigo-600 py-12 md:py-20">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Ready to Take Control of Your Investments?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-indigo-100">
          Join thousands of investors who use ZuneMoney to track their portfolios, monitor dividends, and make informed
          investment decisions.
        </p>
        <div className="mt-8">
          <Link
            href="#signup-form"
            className="inline-flex items-center justify-center rounded-md bg-yellow-500 px-6 py-3 text-base font-medium text-gray-900 shadow-sm hover:bg-yellow-400 hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
          >
            Get Started Now
          </Link>
        </div>
      </div>
    </section>
  )
}
