"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface AnimatedCounterProps {
    end: number
    duration?: number
    suffix?: string
    prefix?: string
    className?: string
    startOnView?: boolean
}

export function AnimatedCounter({
    end,
    duration = 2000,
    suffix = "",
    prefix = "",
    className,
    startOnView = true,
}: AnimatedCounterProps) {
    const [count, setCount] = useState(0)
    const [hasAnimated, setHasAnimated] = useState(false)
    const ref = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        if (!startOnView || hasAnimated) {
            animateCount()
            return
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated) {
                    animateCount()
                    setHasAnimated(true)
                }
            },
            { threshold: 0.5 }
        )

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => observer.disconnect()
    }, [hasAnimated, startOnView])

    const animateCount = () => {
        const startTime = Date.now()
        const endTime = startTime + duration

        const updateCount = () => {
            const now = Date.now()
            const progress = Math.min((now - startTime) / duration, 1)

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4)
            const currentCount = Math.floor(easeOutQuart * end)

            setCount(currentCount)

            if (now < endTime) {
                requestAnimationFrame(updateCount)
            } else {
                setCount(end)
            }
        }

        requestAnimationFrame(updateCount)
    }

    return (
        <span ref={ref} className={cn("tabular-nums", className)}>
            {prefix}
            {count}
            {suffix}
        </span>
    )
}
