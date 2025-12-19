"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface AnimatedTextProps {
    text: string
    className?: string
    gradient?: boolean
    delay?: number
}

export function AnimatedText({ text, className, gradient = true, delay = 0 }: AnimatedTextProps) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), delay)
        return () => clearTimeout(timer)
    }, [delay])

    return (
        <span
            className={cn(
                "inline-block transition-all duration-1000",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                gradient && "bg-gradient-to-r from-[#3B82F6] to-[#22D3EE] bg-clip-text text-transparent",
                gradient && "animate-gradient bg-[length:200%_auto]",
                className
            )}
        >
            {text}
        </span>
    )
}
