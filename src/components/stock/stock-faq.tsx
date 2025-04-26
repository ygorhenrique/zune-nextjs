"use client"

import { useState } from "react"
import type { StockDetails } from "@/lib/mock-stock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"

interface StockFAQProps {
  stock: StockDetails
}

interface FAQItem {
  question: string
  answer: string
}

export function StockFAQ({ stock }: StockFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const faqs: FAQItem[] = [
    {
      question: `What is ${stock.ticker}'s current stock price?`,
      answer: `As of today, ${stock.currency} ${stock.currentPrice.toFixed(2)}.`,
    },
    {
      question: `What is ${stock.ticker}'s dividend yield?`,
      answer: `As of today, ${stock.dividendYield}%.`,
    },
    {
      question: `Where is ${stock.companyName} headquartered?`,
      answer: `${stock.companyName} is headquartered in ${stock.headquarters.city}, ${stock.headquarters.country}.`,
    },
    {
      question: `What sector does ${stock.companyName} operate in?`,
      answer: `${stock.companyName} operates in the ${stock.sector} sector, specifically in the ${stock.industry} industry.`,
    },
    {
      question: `Who is the CEO of ${stock.companyName}?`,
      answer: `${stock.ceo} is the current CEO of ${stock.companyName}.`,
    },
    {
      question: `When was ${stock.companyName} founded?`,
      answer: `${stock.companyName} was founded in ${stock.founded}.`,
    },
  ]

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">Frequently Asked Questions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div key={index} className="border rounded-md overflow-hidden">
              <button
                className="flex justify-between items-center w-full p-4 text-left font-medium focus:outline-none focus:ring-2 focus:ring-indigo-200"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                {faq.question}
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 flex-shrink-0" />
                )}
              </button>
              <div id={`faq-answer-${index}`} className={`px-4 pb-4 ${openIndex === index ? "block" : "hidden"}`}>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
