"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Waypoints, User, Briefcase, LayoutDashboard, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export function AppNav() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/"
    return pathname.startsWith(path)
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/60 backdrop-blur-xl transition-all supports-[backdrop-filter]:bg-background/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
              <Waypoints className="h-5 w-5 text-primary" />
            </div>
            <span className="text-lg font-bold text-foreground tracking-tight">JobVector</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <Link href="/personal-profile/wizard">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-9 gap-2 text-sm font-medium transition-all",
                  isActive("/personal-profile/wizard")
                    ? "bg-primary/10 text-primary shadow-sm ring-1 ring-primary/20 font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/10"
                )}
              >
                <Sparkles className="h-4 w-4" />
                Build Profile
              </Button>
            </Link>
            <Link href="/personal-profile">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-9 gap-2 text-sm font-medium transition-all",
                  isActive("/personal-profile") && !pathname.includes("/wizard")
                    ? "bg-primary/10 text-primary shadow-sm ring-1 ring-primary/20 font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/10"
                )}
              >
                <User className="h-4 w-4" />
                My Profile
              </Button>
            </Link>
            <Link href="/jobs">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-9 gap-2 text-sm font-medium transition-all",
                  isActive("/jobs")
                    ? "bg-primary/10 text-primary shadow-sm ring-1 ring-primary/20 font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/10"
                )}
              >
                <Briefcase className="h-4 w-4" />
                Browse Jobs
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-9 gap-2 text-sm font-medium transition-all",
                  isActive("/dashboard")
                    ? "bg-primary/10 text-primary shadow-sm ring-1 ring-primary/20 font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/10"
                )}
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Button>
            </Link>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <Link href="/personal-profile/wizard">
              <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground">
                <Sparkles className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/personal-profile">
              <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/jobs">
              <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground">
                <Briefcase className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground">
                <LayoutDashboard className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
