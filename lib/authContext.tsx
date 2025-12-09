"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { loadProfile } from "@/lib/storage"

interface AuthContextType {
    isAuthenticated: boolean
    isLoading: boolean
    signIn: () => void
    signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        // Check initial auth state
        const checkAuth = () => {
            const profile = loadProfile()
            setIsAuthenticated(!!profile)
            setIsLoading(false)
        }

        checkAuth()

        // Listen for storage events to sync across tabs
        window.addEventListener("storage", checkAuth)
        return () => window.removeEventListener("storage", checkAuth)
    }, [])

    const signIn = () => {
        // In our pseudo-auth, signing in means checking if a profile exists
        // If it does, we're "signed in". If not, we redirect to create one.
        const profile = loadProfile()
        if (profile) {
            setIsAuthenticated(true)
            router.push("/dashboard")
        } else {
            router.push("/personal-profile")
        }
    }

    const signOut = () => {
        // For now, we'll just clear the local state.
        // In a real app, we'd clear tokens.
        // Here, we decide if "sign out" clears the profile or just the session.
        // To implement a "true" sign out feeling without deleting data,
        // we might need a session key.
        // For this requirement, let's use a session key.

        setIsAuthenticated(false)
        localStorage.removeItem("job-pulse-session")
        router.push("/")
    }

    // Enhanced check: require a session key for "active" login
    useEffect(() => {
        if (typeof window !== "undefined") {
            const session = localStorage.getItem("job-pulse-session")
            if (session === "active" && loadProfile()) {
                setIsAuthenticated(true)
            }
        }
    }, [])

    const enhancedSignIn = () => {
        const profile = loadProfile()
        if (profile) {
            localStorage.setItem("job-pulse-session", "active")
            setIsAuthenticated(true)
            router.push("/dashboard")
        } else {
            router.push("/personal-profile")
        }
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            isLoading,
            signIn: enhancedSignIn,
            signOut
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
