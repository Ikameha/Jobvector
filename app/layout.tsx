import type React from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { MobileNav } from "@/components/mobile-nav"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

export const metadata: Metadata = {
  title: {
    default: "Jobento - AI-Powered Job Matching Platform",
    template: "%s | Jobento",
  },
  description:
    "Find your perfect job with intelligent AI-powered matching. Jobento analyzes your skills, experience, and preferences to deliver personalized job recommendations with detailed match scores.",
  keywords: [
    "job search",
    "AI job matching",
    "career",
    "job recommendations",
    "intelligent job search",
    "skills matching",
  ],
  authors: [{ name: "Jobento Team" }],
  creator: "Jobento",
  publisher: "Jobento",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Jobento - AI-Powered Job Matching Platform",
    description:
      "Find your perfect job with intelligent AI-powered matching. Get detailed match scores based on skills, experience, location, salary, and company culture.",
    siteName: "Jobento",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jobento - AI-Powered Job Matching",
    description: "Find your perfect job with intelligent AI-powered matching and detailed match scores.",
    creator: "@jobvector", // Assuming handle might stay or change later, let's update it to likely handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

import { AuthProvider } from "@/lib/authContext"

// ... existing code ...

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} font-sans antialiased relative`}>
        {/* Stable Fixed Background Layer to prevent glitches */}
        <div className="fixed inset-0 -z-50 bg-[linear-gradient(135deg,hsl(225,45%,93%)_0%,hsl(250,40%,93%)_100%)] dark:bg-[linear-gradient(135deg,hsl(225,30%,10%)_0%,hsl(240,30%,8%)_100%)]" />

        <AuthProvider>
          {children}
          <MobileNav />
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
