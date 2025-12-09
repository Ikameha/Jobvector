"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LayoutGrid, User, Briefcase, LayoutDashboard, LogOut, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/authContext"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function AppNav() {
  const pathname = usePathname()
  const { isAuthenticated, signIn, signOut } = useAuth()

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
              <LayoutGrid className="h-5 w-5 text-primary" />
            </div>
            <span className="text-lg font-bold text-foreground tracking-tight">Jobento</span>
          </Link>

          <div className="hidden md:flex items-center gap-4">
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

            {isAuthenticated ? (
              <>
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

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                      <Avatar className="h-9 w-9 border border-border">
                        <AvatarImage src="/placeholder-user.jpg" alt="User" />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">User</p>
                        <p className="text-xs leading-none text-muted-foreground">user@example.com</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/personal-profile" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        My Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={signOut} className="text-red-500 focus:text-red-500 cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button variant="neon" size="sm" onClick={signIn}>
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="flex md:hidden items-center gap-2">
            <Link href="/jobs">
              <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground">
                <Briefcase className="h-5 w-5" />
              </Button>
            </Link>

            {isAuthenticated ? (
              <Link href="/dashboard">
                <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground" onClick={signIn}>
                <User className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
