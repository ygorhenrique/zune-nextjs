'use client';

import { useState } from 'react';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How can I track my dividend income?',
      answer:
        'ZuneMoney automates dividend tracking. Add your investments, and our platform provides real-time insights without manual calculations.',
    },
    {
      question: 'Can I import my DEGIRO portfolio?',
      answer: 'Yes! Export your DEGIRO portfolio as a CSV and import it into ZuneMoney for seamless tracking.',
    },
    {
      question: 'Is ZuneMoney suitable for Trading212 users?',
      answer: 'Absolutely. Import your Trading212 transactions via CSV to manage and analyze your investments.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <details
              key={index}
              open={openIndex === index}
              className="bg-gray-50 p-4 rounded-lg"
              onClick={() => toggleFAQ(index)}
            >
              <summary className="font-semibold cursor-pointer">{faq.question}</summary>
              <p className="mt-2">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}