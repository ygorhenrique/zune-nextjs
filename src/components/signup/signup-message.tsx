import Link from "next/link"
import { Check } from "lucide-react"

export function SignupMessage() {
  return (
    <div className="welcome-message text-white opacity-0 animate-fade-in">
      <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
        Start Tracking Your Investments Today
      </h1>
      <p className="mt-4 text-lg text-white/90">
        Join ZuneMoney for free to monitor global stocks, track dividends, and manage your portfolio with ease.
      </p>

      <ul className="mt-6 space-y-2">
        {["Track dividends effortlessly", "Compare portfolio performance", "Multi-currency support"].map(
          (item, index) => (
            <li key={index} className="flex items-center">
              <Check className="mr-2 h-5 w-5 text-green-300" />
              <span>{item}</span>
            </li>
          ),
        )}
      </ul>

      <div className="mt-8">
        <Link
          href="/demo"
          className="text-white underline decoration-2 underline-offset-4 hover:text-yellow-200 transition-colors"
        >
          Try our demo first
        </Link>
      </div>
    </div>
  )
}
