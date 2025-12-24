"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Briefcase, KanbanSquare, User, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
    { href: "/dashboard", icon: Home, label: "Accueil" },
    { href: "/jobs", icon: Briefcase, label: "Jobs" },
    { href: "/personal-profile", icon: User, label: "Profil" },
    { href: "/settings", icon: Settings, label: "Réglages" },
]

export function MobileNav() {
    const pathname = usePathname()

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border md:hidden">
            <div className="flex items-center justify-around px-2 py-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
                    const Icon = item.icon

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors min-w-[60px]",
                                isActive
                                    ? "text-primary"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <Icon className={cn("h-6 w-6", isActive && "fill-primary/10")} />
                            <span className="text-xs font-medium">{item.label}</span>
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}
