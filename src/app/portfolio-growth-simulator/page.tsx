import type { Metadata } from "next"
import { PortfolioGrowthSimulator } from "@/components/portfolio-simulator/portfolio-growth-simulator"
import { PortfolioEducation } from "@/components/portfolio-simulator/portfolio-education"
import { RelatedTools } from "@/components/portfolio-simulator/related-tools"

export const metadata: Metadata = {
  title: "Portfolio Growth Simulator | ZuneMoney - Plan Your Investments",
  description:
    "Simulate your portfolio growth with ZuneMoney's free tool. Estimate future value based on contributions and returns.",
  keywords:
    "portfolio growth simulator, investment growth calculator, financial planning tool, portfolio simulator, ZuneMoney",
  openGraph: {
    title: "Portfolio Growth Simulator | ZuneMoney - Plan Your Investments",
    description:
      "Simulate your portfolio growth with ZuneMoney's free tool. Estimate future value based on contributions and returns.",
    url: "https://app.zune.money/portfolio-growth-simulator",
    siteName: "ZuneMoney",
    images: [
      {
        url: "https://app.zune.money/og-portfolio-simulator.png",
        width: 1200,
        height: 630,
        alt: "ZuneMoney Portfolio Growth Simulator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio Growth Simulator | ZuneMoney - Plan Your Investments",
    description:
      "Simulate your portfolio growth with ZuneMoney's free tool. Estimate future value based on contributions and returns.",
    images: ["https://app.zune.money/og-portfolio-simulator.png"],
  },
}

export default function PortfolioGrowthSimulatorPage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section with Gradient Background */}
      <section className="bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-3xl font-bold md:text-4xl">Portfolio Growth Simulator</h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg">
            Estimate your portfolio&apos;s future value with ZuneMoney&apos;s free tool.
          </p>
          <PortfolioGrowthSimulator />
        </div>
      </section>

      {/* Educational Content */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <PortfolioEducation />
        </div>
      </section>

      {/* Related Tools */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <RelatedTools />
        </div>
      </section>
    </main>
  )
}
