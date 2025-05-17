import Link from "next/link"
import { Check } from "lucide-react"

export function WelcomeMessage() {
  return (
    <div className="welcome-message text-white opacity-0 animate-fade-in">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4">Welcome Back to ZuneMoney</h1>
      <p className="text-lg mb-6 max-w-md">
        Log in to track your portfolio, monitor dividends, and manage your investments seamlessly.
      </p>
      <ul className="space-y-3 mb-8">
        {["Real-time portfolio updates", "Dividend tracking insights", "Secure account access"].map((item, index) => (
          <li key={index} className="flex items-center">
            <Check className="h-5 w-5 mr-2 text-green-300" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <Link
        href="/signup"
        className="inline-block text-white hover:text-yellow-200 underline underline-offset-2 transition-colors"
      >
        Don&apos;t have an account? Sign up
      </Link>
    </div>
  )
}
