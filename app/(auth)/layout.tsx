"use client"

import Link from "next/link"
import Image from "next/image"
import { Quote, Sparkles, LayoutGrid } from "lucide-react"

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Left: Branding & Decoration (Hidden on mobile) */}
            <div className="hidden lg:flex flex-col justify-between bg-zinc-900 border-r border-white/10 p-12 relative overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 animate-pulse delay-1000" />
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
                </div>

                {/* Logo */}
                <div className="relative z-10">
                    <Link href="/" className="flex items-center gap-3 w-fit">
                        <div className="relative h-12 w-40">
                            <Image
                                src="/jobento-new.jpg"
                                alt="Jobento"
                                fill
                                className="object-contain object-left mix-blend-multiply dark:mix-blend-screen"
                                priority
                            />
                        </div>
                    </Link>
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-lg">
                    <div className="bg-background/10 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-8">
                        <Quote className="w-10 h-10 text-primary/50 mb-4" />
                        <p className="text-xl leading-relaxed font-light text-white/90 mb-6">
                            "I stopped applying blindly and started matching intelligently. Jobento helped me find a role that actually fits my values."
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500" />
                            <div>
                                <p className="font-semibold text-white">Alex Chen</p>
                                <p className="text-sm text-white/50">Senior Product Designer</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-white/40 font-medium">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-primary" />
                            AI-Powered Matching
                        </div>
                        <div className="w-1 h-1 rounded-full bg-white/20" />
                        <div>Data-Driven Insights</div>
                    </div>
                </div>
            </div>

            {/* Right: Auth Form */}
            <div className="flex flex-col justify-center items-center p-6 lg:p-12 relative">
                {/* Mobile Logo (Visible only on small screens) */}
                <div className="lg:hidden absolute top-6 left-6">
                    <Link href="/" className="flex items-center gap-2">
                        <LayoutGrid className="w-6 h-6 text-primary" />
                        <span className="font-bold text-xl">Jobento</span>
                    </Link>
                </div>

                <div className="w-full max-w-md space-y-8">
                    {children}
                </div>
            </div>
        </div>
    )
}
