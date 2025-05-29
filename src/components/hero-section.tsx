import Link from "next/link"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="hero-bg bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Track Your Investments with ZuneMoney</h1>
        <p className="text-lg md:text-xl mb-6">
          Monitor global stocks, dividends, and portfolio performance in one intuitive platform. Start for free today!
        </p>

        <form action="https://zune.money/signup" method="get" className="flex flex-col md:flex-row justify-center mb-6">
          <input type="email" name="email" placeholder="Enter your email..." className="w-full md:w-1/2 p-3 rounded-l-md border text-gray-900 border-gray-300 focus:outline-none bg-white" required />
          <button type="submit" className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-r-md font-semibold hover:bg-yellow-500 cta-button">🚀 Get Started</button>
        </form>
        <Link href="https://zune.money/demo" className="text-white underline hover:text-yellow-400">
          Try our demo
        </Link>
        <div className="mt-8">
          <Image
            src="/images/zune1.png"
            alt="ZuneMoney Portfolio Dashboard"
            width={1000}
            height={600}
            className="mx-auto rounded-lg shadow-lg max-w-full"
            priority
          />
        </div>
      </div>
    </section>
  )
}
