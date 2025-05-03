import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { ForgotPasswordForm } from "@/components/login/forgot-password-form"

export const metadata: Metadata = {
  title: "Forgot Password | ZuneMoney - Track Your Investments",
  description: "Reset your ZuneMoney password to regain access to your account.",
}

export default function ForgotPasswordPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 animate-gradient"></div>
          <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                <div className="rounded-lg bg-white p-6 shadow-lg">
                  <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold text-gray-800">Forgot Your Password?</h1>
                    <p className="mt-2 text-gray-600">
                      Enter your email address and we&apos;ll send you a link to reset your password.
                    </p>
                  </div>

                  <ForgotPasswordForm />

                  <div className="mt-6 text-center">
                    <Link href="/login" className="text-sm text-indigo-600 hover:underline">
                      Back to login
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
