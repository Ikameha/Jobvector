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
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Waypoints className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">JobVector</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <Link href="/personal-profile/wizard">
              <Button
                variant={isActive("/personal-profile/wizard") ? "secondary" : "ghost"}
                size="sm"
                className={cn("gap-2", isActive("/personal-profile/wizard") && "bg-secondary text-secondary-foreground")}
              >
                <Sparkles className="h-4 w-4" />
                Build Profile
              </Button>
            </Link>
            <Link href="/personal-profile">
              <Button
                variant={isActive("/personal-profile") && !pathname.includes("/wizard") ? "secondary" : "ghost"}
                size="sm"
                className={cn(
                  "gap-2",
                  isActive("/personal-profile") && !pathname.includes("/wizard") && "bg-secondary text-secondary-foreground",
                )}
              >
                <User className="h-4 w-4" />
                My Profile
              </Button>
            </Link>
            <Link href="/jobs">
              <Button
                variant={isActive("/jobs") ? "secondary" : "ghost"}
                size="sm"
                className={cn("gap-2", isActive("/jobs") && "bg-secondary text-secondary-foreground")}
              >
                <Briefcase className="h-4 w-4" />
                Browse Jobs
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button
                variant={isActive("/dashboard") ? "secondary" : "ghost"}
                size="sm"
                className={cn("gap-2", isActive("/dashboard") && "bg-secondary text-secondary-foreground")}
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Button>
            </Link>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <Link href="/personal-profile/wizard">
              <Button variant={isActive("/personal-profile/wizard") ? "secondary" : "ghost"} size="icon">
                <Sparkles className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/personal-profile">
              <Button
                variant={isActive("/personal-profile") && !pathname.includes("/wizard") ? "secondary" : "ghost"}
                size="icon"
              >
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/jobs">
              <Button variant={isActive("/jobs") ? "secondary" : "ghost"} size="icon">
                <Briefcase className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant={isActive("/dashboard") ? "secondary" : "ghost"} size="icon">
                <LayoutDashboard className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
