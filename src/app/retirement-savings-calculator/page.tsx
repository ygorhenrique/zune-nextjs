import type { Metadata } from "next"
import { RetirementCalculator } from "@/components/retirement-calculator/retirement-calculator"
import { RetirementEducation } from "@/components/retirement-calculator/retirement-education"
import { RelatedTools } from "@/components/retirement-calculator/related-tools"

export const metadata: Metadata = {
  title: "Retirement Savings Calculator | ZuneMoney - Plan Your Future",
  description:
    "Calculate your retirement savings with ZuneMoney's free tool. Plan how much you need to save for a secure future.",
  keywords:
    "retirement savings calculator, retirement planning, investment calculator, financial planning tool, ZuneMoney",
  openGraph: {
    title: "Retirement Savings Calculator | ZuneMoney - Plan Your Future",
    description:
      "Calculate your retirement savings with ZuneMoney's free tool. Plan how much you need to save for a secure future.",
    url: "https://app.zune.money/retirement-savings-calculator",
    siteName: "ZuneMoney",
    images: [
      {
        url: "https://app.zune.money/og-retirement-calculator.png",
        width: 1200,
        height: 630,
        alt: "ZuneMoney Retirement Savings Calculator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Retirement Savings Calculator | ZuneMoney - Plan Your Future",
    description:
      "Calculate your retirement savings with ZuneMoney's free tool. Plan how much you need to save for a secure future.",
    images: ["https://app.zune.money/og-retirement-calculator.png"],
  },
}

export default function RetirementCalculatorPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Calculator */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16 animate-gradient-x">
        <div className="container px-4 mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Retirement Savings Calculator</h1>
          <p className="text-lg text-white mb-8 max-w-2xl mx-auto">
            Estimate how much you'll have for retirement with ZuneMoney's free tool.
          </p>
          <div className="max-w-3xl mx-auto">
            <RetirementCalculator />
          </div>
        </div>
      </section>

      {/* Educational Content */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          <RetirementEducation />
        </div>
      </section>

      {/* Related Tools */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <RelatedTools />
        </div>
      </section>
    </div>
  )
}
