export function FeaturesSection() {
  return (
    <section id="features" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose ZuneMoney?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="feature-card bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Dividend Tracking</h3>
            <p>Effortlessly monitor dividend income with automated tracking and visualizations. No more spreadsheets!</p>
            <a href="http://app.zune.money/stock/AAPL" className="text-indigo-600 hover:underline">
              See AAPL Dividends
            </a>
          </div>
          <div className="feature-card bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Performance Comparison</h3>
            <p>Compare your portfolio against major indices like S&P 500 and NASDAQ for smarter decisions.</p>
            <a href="http://app.zune.money/stock/MSFT" className="text-indigo-600 hover:underline">
              Track MSFT Performance
            </a>
          </div>
          <div className="feature-card bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Multi-Currency Support</h3>
            <p>Manage international investments seamlessly with support for multiple currencies.</p>
            <a href="https://app.zune.money/demo" className="text-indigo-600 hover:underline">
              Explore Demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}