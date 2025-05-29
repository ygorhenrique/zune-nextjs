import type { Metadata } from "next"
import { LoginForm } from "@/components/login/login-form"
import { QuickAccess } from "@/components/login/quick-access"
import { WelcomeMessage } from "@/components/login/welcome-message"

export const metadata: Metadata = {
  title: "Login | ZuneMoney - Track Your Investments",
  description:
    "Log in to ZuneMoney to track your portfolio, monitor dividends, and manage your investments seamlessly.",
  openGraph: {
    title: "Login | ZuneMoney - Track Your Investments",
    description:
      "Log in to ZuneMoney to track your portfolio, monitor dividends, and manage your investments seamlessly.",
    url: "https://zune.money/login",
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
    title: "Login | ZuneMoney - Track Your Investments",
    description:
      "Log in to ZuneMoney to track your portfolio, monitor dividends, and manage your investments seamlessly.",
    images: ["https://zune.money/twitter-image.jpg"],
    creator: "@zunemoney",
  },
}

export default function LoginPage() {
  return (
    <main>
      <section className="hero-section relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 animate-gradient"></div>
        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <WelcomeMessage />
            <LoginForm />
          </div>
        </div>
      </section>
      <QuickAccess />
    </main>
  )
}
