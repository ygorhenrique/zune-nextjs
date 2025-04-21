import type React from "react"
import { Navbar } from "@/components/navbar"
// import { Footer } from '@/components/footer';
// import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "ZuneMoney - Track Your Portfolio & Dividends Effortlessly",
  description:
    "ZuneMoney: Track global stocks, monitor dividends, visualize earnings, and manage multi-currency portfolios with ease. Sign up for free to optimize your investments.",
  keywords:
    "ZuneMoney, portfolio tracker, dividend tracking, global stocks, investment management, multi-currency portfolio, stock performance, financial tools",
  openGraph: {
    type: "website",
    url: "https://zune.money/",
    title: "ZuneMoney - Track Your Portfolio & Dividends Effortlessly",
    description:
      "Manage your investments with ZuneMoney. Track stocks, dividends, and performance in one intuitive platform. Start for free today!",
    images: [
      {
        url: "https://zune.money/images/zune1.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZuneMoney - Your Investment Tracking Solution",
    description: "Track global stocks, dividends, and portfolio performance with ZuneMoney. Sign up now!",
    images: ["https://zune.money/images/zune1.png"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ZuneMoney',
    url: 'https://zune.money/',
    description: 'ZuneMoney is a portfolio and dividend tracking platform for global stocks, offering multi-currency support and performance analytics.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://app.zune.money/stock/{search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body className="font-sans antialiased">
        {/* <ThemeProvider attribute="class" defaultTheme="light"> */}
          <Navbar />
          {children}
        {/* </ThemeProvider> */}
      </body>
    </html>
  )
}
