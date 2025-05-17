import Link from "next/link"
import { Button } from "@/components/ui/button"

export function SignUpCTA() {
  return (
    <div className="text-center text-white">
      <h2 className="text-3xl font-bold mb-4">Ready to Track All Your Dividends?</h2>
      <p className="text-xl mb-8 max-w-2xl mx-auto">
        Sign up for ZuneMoney to track your entire dividend portfolio, set income goals, and receive alerts for dividend
        announcements.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 cta-button" asChild>
          <Link href="/signup">Get Started for Free</Link>
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="bg-transparent border-white text-white hover:bg-white/10"
          asChild
        >
          <Link href="/demo">Try Our Demo</Link>
        </Button>
      </div>
      <p className="mt-6 text-sm text-white/80">
        No credit card required. Free plan includes basic dividend tracking features.
      </p>
    </div>
  )
}
