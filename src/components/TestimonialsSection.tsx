export function TestimonialsSection() {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="italic">
                &quot;ZuneMoney simplified my dividend tracking. I love the clean interface and real-time updates!&quot;
              </p>
              <p className="mt-4 font-semibold">- Sarah T., Investor</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="italic">
                &quot;Comparing my portfolio to the S&P 500 has never been easier. ZuneMoney is a game-changer.&quot;
              </p>
              <p className="mt-4 font-semibold">- Michael R., Trader</p>
            </div>
          </div>
        </div>
      </section>
    );
  }