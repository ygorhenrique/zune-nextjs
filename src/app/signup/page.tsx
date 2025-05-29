import type { Metadata } from "next"
import { SignupForm } from "@/components/signup/signup-form"
import { SignupMessage } from "@/components/signup/signup-message"
import { TrustSignals } from "@/components/signup/trust-signals"
import { Testimonials } from "@/components/signup/testimonials"
import { FinalCTA } from "@/components/signup/final-cta"

export const metadata: Metadata = {
  title: "Sign Up | ZuneMoney - Track Your Investments",
  description:
    "Create a ZuneMoney account to start tracking your portfolio, monitoring dividends, and managing your investments.",
  openGraph: {
    title: "Sign Up | ZuneMoney - Track Your Investments",
    description:
      "Create a ZuneMoney account to start tracking your portfolio, monitoring dividends, and managing your investments.",
    url: "https://zune.money/signup",
    siteName: "ZuneMoney",
    images: [
      {
        url: "https://zune.money/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ZuneMoney - Track Your Investments",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sign Up | ZuneMoney - Track Your Investments",
    description:
      "Create a ZuneMoney account to start tracking your portfolio, monitoring dividends, and managing your investments.",
    images: ["https://zune.money/twitter-image.jpg"],
    creator: "@zunemoney",
  },
}

export default function SignupPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 animate-gradient"></div>
        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <SignupMessage />
            <div className="mx-auto w-full max-w-md opacity-0 animate-fade-in-delayed login-form-container">
              <div className="rounded-lg bg-white p-6 shadow-lg">
                <div className="text-center">
                  <h2 className="mb-4 text-2xl font-bold text-gray-800">Create Your Free Account</h2>
                </div>
                <SignupForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals Section */}
      <TrustSignals />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Final CTA Section */}
      <FinalCTA />
    </main>
  )
}
