"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Github, ArrowRight, Loader2, Sparkles } from "lucide-react"

export default function SignupPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            // Redirect to onboarding for new users
            router.push("/onboarding")
        }, 1500)
    }

    return (
        <>
            <div className="space-y-2 text-center lg:text-left">
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-2">
                    <Sparkles className="mr-1 h-3 w-3" />
                    Start your career journey
                </div>
                <h1 className="text-3xl font-bold tracking-tight">Create an account</h1>
                <p className="text-muted-foreground">
                    Enter your email below to create your account
                </p>
            </div>

            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" disabled={isLoading}>
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                    </Button>
                    <Button variant="outline" disabled={isLoading}>
                        <div className="mr-2 h-4 w-4 bg-gradient-to-br from-red-500 to-yellow-500 rounded-full text-[10px] flex items-center justify-center text-white font-bold">G</div>
                        Google
                    </Button>
                </div>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                        </span>
                    </div>
                </div>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            placeholder="name@example.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            disabled={isLoading}
                            required
                        />
                    </div>
                    <p className="text-xs text-muted-foreground">
                        By clicking continue, you agree to our{" "}
                        <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
                            Privacy Policy
                        </Link>
                        .
                    </p>
                    <Button className="w-full" type="submit" disabled={isLoading} variant="neon">
                        {isLoading && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Create Account
                        {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                </form>

                <p className="px-8 text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="underline underline-offset-4 hover:text-primary font-medium"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </>
    )
}
