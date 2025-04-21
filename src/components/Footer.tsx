export function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold">ZuneMoney</h3>
              <p className="text-sm">The easy way to visualize your money.</p>
              <p className="text-sm mt-2">© 2025 ZuneMoney. All rights reserved.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold">Links</h3>
              <ul className="text-sm space-y-2">
                <li>
                  <a href="https://blog.zune.money/" className="hover:underline">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="https://app.zune.money/demo" className="hover:underline">
                    Demo
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/zune.money"
                  className="text-gray-400 hover:text-white"
                  aria-label="Follow us on Instagram"
                >
                  Instagram
                </a>
                <a
                  href="https://www.threads.net/zune.money"
                  className="text-gray-400 hover:text-white"
                  aria-label="Follow us on Threads"
                >
                  Threads
                </a>
                <a
                  href="https://x.com/zunemoney"
                  className="text-gray-400 hover:text-white"
                  aria-label="Follow us on Twitter"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }