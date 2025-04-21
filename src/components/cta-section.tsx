import Link from 'next/link';

export function CTASection() {
  return (
    <section className="py-16 bg-indigo-600 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Take Control of Your Investments?</h2>
        <p className="text-lg mb-6">Join thousands of investors using ZuneMoney to track portfolios and dividends.</p>
        <Link
          href="/signup"
          className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-md font-semibold hover:bg-yellow-500 cta-button"
        >
          Sign Up Now
        </Link>
      </div>
    </section>
  );
}