import Link from "next/link"
import { ArrowRight, BarChart3, DollarSign, BookOpen } from "lucide-react"

export function QuickAccess() {
  const quickAccessItems = [
    {
      title: "Track Stocks",
      description: "Monitor real-time performance of stocks like AAPL and MSFT",
      icon: <BarChart3 className="h-8 w-8 text-indigo-600" />,
      links: [
        { label: "Apple", href: "/stock/AAPL" },
        { label: "Microsoft", href: "/stock/MSFT" },
        { label: "All Stocks", href: "/dashboard/stocks" },
      ],
    },
    {
      title: "Dividend Insights",
      description: "Track your dividend income and upcoming payments",
      icon: <DollarSign className="h-8 w-8 text-indigo-600" />,
      links: [
        { label: "Dividend Calendar", href: "/dashboard/dividends" },
        { label: "Income Report", href: "/dashboard/dividends?view=income" },
        { label: "Dividend Stocks", href: "/dashboard/dividends?view=stocks" },
      ],
    },
    {
      title: "Learn More",
      description: "Explore guides and tutorials to maximize your investments",
      icon: <BookOpen className="h-8 w-8 text-indigo-600" />,
      links: [
        { label: "Getting Started", href: "/learn/getting-started" },
        { label: "Dividend Investing", href: "/learn/dividend-investing" },
        { label: "Portfolio Strategy", href: "/learn/portfolio-strategy" },
      ],
    },
  ]

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Quick Access</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {quickAccessItems.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <ul className="space-y-2">
                {item.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-indigo-600 hover:text-indigo-800 hover:underline flex items-center"
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
