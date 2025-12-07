import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Job Pulse - AI-Powered Job Matching Platform",
    template: "%s | Job Pulse",
  },
  description:
    "Find your perfect job with intelligent AI-powered matching. Job Pulse analyzes your skills, experience, and preferences to deliver personalized job recommendations with detailed match scores.",
  keywords: [
    "job search",
    "AI job matching",
    "career",
    "job recommendations",
    "intelligent job search",
    "skills matching",
  ],
  authors: [{ name: "Job Pulse Team" }],
  creator: "Job Pulse",
  publisher: "Job Pulse",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Job Pulse - AI-Powered Job Matching Platform",
    description:
      "Find your perfect job with intelligent AI-powered matching. Get detailed match scores based on skills, experience, location, salary, and company culture.",
    siteName: "Job Pulse",
  },
  twitter: {
    card: "summary_large_image",
    title: "Job Pulse - AI-Powered Job Matching",
    description: "Find your perfect job with intelligent AI-powered matching and detailed match scores.",
    creator: "@jobpulse",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
