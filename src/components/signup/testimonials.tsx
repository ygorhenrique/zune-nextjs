"use client"

import { useEffect, useRef } from "react"
import { Quote } from "lucide-react"

export function Testimonials() {
  const testimonialsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const testimonials = entry.target.querySelectorAll(".testimonial-card")
            testimonials.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add("opacity-100")
                card.classList.remove("translate-y-4")
              }, index * 200)
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    if (testimonialsRef.current) {
      observer.observe(testimonialsRef.current)
    }

    return () => {
      if (testimonialsRef.current) {
        observer.unobserve(testimonialsRef.current)
      }
    }
  }, [])

  return (
    <section className="bg-gray-50 py-12 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">What Our Users Say</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Hear from investors who have transformed their investment tracking with ZuneMoney.
          </p>
        </div>

        <div ref={testimonialsRef} className="mt-12 grid gap-8 md:grid-cols-2">
          {/* Testimonial 1 */}
          <div className="testimonial-card rounded-lg bg-white p-6 shadow-md opacity-0 translate-y-4 transition-all duration-500">
            <Quote className="mb-4 h-8 w-8 text-indigo-400" />
            <p className="mb-4 text-lg italic text-gray-700">
              "ZuneMoney has completely transformed how I track my dividend investments. The dividend calendar and
              insights have helped me optimize my portfolio for consistent income."
            </p>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-indigo-100 text-center leading-10 text-indigo-700">EK</div>
              <div className="ml-3">
                <p className="font-bold text-gray-900">Emily K.</p>
                <p className="text-sm text-gray-600">Dividend Investor</p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="testimonial-card rounded-lg bg-white p-6 shadow-md opacity-0 translate-y-4 transition-all duration-500">
            <Quote className="mb-4 h-8 w-8 text-indigo-400" />
            <p className="mb-4 text-lg italic text-gray-700">
              "As someone who invests in multiple markets, ZuneMoney's multi-currency support has been invaluable. I can
              now see my entire global portfolio in one place."
            </p>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-indigo-100 text-center leading-10 text-indigo-700">MR</div>
              <div className="ml-3">
                <p className="font-bold text-gray-900">Michael R.</p>
                <p className="text-sm text-gray-600">Global Investor</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
