export function BlogSection() {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Learn More on Our Blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">How to Track Dividends Effectively</h3>
              <p>Discover tips and tools to optimize your dividend income with ZuneMoney.</p>
              <a
                href="https://blog.zune.money/unveiling-high-dividend-yielders-a-guide-to-stock-investing-in-the-netherlands/"
                className="text-indigo-600 hover:underline"
              >
                Read More
              </a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Top Stocks for 2025</h3>
              <p>Explore our analysis of high-performing stocks to watch this year.</p>
              <a
                href="https://blog.zune.money/unlocking-value-the-top-7-bargain-stocks-in-european-markets-for-zunemoney-users-in-2025/"
                className="text-indigo-600 hover:underline"
              >
                Read More
              </a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Multi-Currency Investing 101</h3>
              <p>Learn how to manage international portfolios with ease.</p>
              <a
                href="https://blog.zune.money/multi-currency-investing-101-a-beginners-guide-for-small-european-stock-market-investors/"
                className="text-indigo-600 hover:underline"
              >
                Read More
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }