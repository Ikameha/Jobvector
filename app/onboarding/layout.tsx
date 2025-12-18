import Link from "next/link"
import Image from "next/image"
import { LayoutGrid } from "lucide-react"

export default function OnboardingLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            {/* Simple Header */}
            <header className="fixed top-0 w-full p-6 z-50">
                <Link href="/" className="flex items-center gap-2 group w-fit">
                    <div className="relative h-10 w-32 transition-transform group-hover:scale-105">
                        <Image
                            src="/jobento-new.jpg"
                            alt="Jobento"
                            fill
                            className="object-contain object-left mix-blend-multiply dark:mix-blend-screen"
                            priority
                        />
                    </div>
                </Link>
            </header>

            {/* Ambient Background */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute top-0 right-0 w-[50vh] h-[50vh] bg-primary/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-[50vh] h-[50vh] bg-secondary/5 rounded-full blur-[100px]" />
            </div>

            <main className="container max-w-4xl mx-auto px-4 pt-24 pb-12 min-h-screen flex flex-col justify-center">
                {children}
            </main>
        </div>
    )
}
