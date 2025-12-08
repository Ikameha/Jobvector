import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "JobVector - AI-Powered Job Matching Platform",
    template: "%s | JobVector",
  },
  description:
    "Find your perfect job with intelligent AI-powered matching. JobVector analyzes your skills, experience, and preferences to deliver personalized job recommendations with detailed match scores.",
  keywords: [
    "job search",
    "AI job matching",
    "career",
    "job recommendations",
    "intelligent job search",
    "skills matching",
  ],
  authors: [{ name: "JobVector Team" }],
  creator: "JobVector",
  publisher: "JobVector",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "JobVector - AI-Powered Job Matching Platform",
    description:
      "Find your perfect job with intelligent AI-powered matching. Get detailed match scores based on skills, experience, location, salary, and company culture.",
    siteName: "JobVector",
  },
  twitter: {
    card: "summary_large_image",
    title: "JobVector - AI-Powered Job Matching",
    description: "Find your perfect job with intelligent AI-powered matching and detailed match scores.",
    creator: "@jobvector",
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
