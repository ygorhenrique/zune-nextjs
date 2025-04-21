import Link from "next/link"
import { Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold">ZuneMoney</h3>
            <p className="text-sm">The easy way to visualize your money.</p>
            <p className="text-sm mt-2">© {new Date().getFullYear()} ZuneMoney. All rights reserved.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold">Links</h3>
            <ul className="text-sm space-y-2">
              <li>
                <Link href="https://blog.zune.money/" className="hover:underline">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="https://app.zune.money/demo" className="hover:underline">
                  Demo
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Follow Us</h3>
            <div className="flex space-x-4 mt-2">
              <Link
                href="https://www.instagram.com/zune.money"
                className="text-gray-400 hover:text-white"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.threads.net/zune.money"
                className="text-gray-400 hover:text-white"
                aria-label="Follow us on Threads"
              >
                {/* Custom Threads icon since it's not in Lucide */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M12 2a10 10 0 1 0 10 10 10 10 0 0 0-10-10zm0 17.5a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z" />
                  <path d="M12 7v10M15.5 9.5l-7 5M15.5 14.5l-7-5" />
                </svg>
              </Link>
              <Link
                href="https://x.com/zunemoney"
                className="text-gray-400 hover:text-white"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
