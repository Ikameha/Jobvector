"use client"

import { cn } from "@/lib/utils"

interface MatchScoreRingProps {
    score: number
    size?: number
    className?: string
    strokeWidth?: number
}

export function MatchScoreRing({
    score,
    size = 48,
    className,
    strokeWidth = 3
}: MatchScoreRingProps) {
    // Ensure score is between 0 and 100
    const normalizedScore = Math.min(Math.max(score, 0), 100)

    // Calculate circle properties
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const offset = circumference - (normalizedScore / 100) * circumference

    // Determine color based on score
    let colorClass = "text-orange-500"
    let bgClass = "bg-orange-500/10"

    if (normalizedScore >= 80) {
        colorClass = "text-green-500"
        bgClass = "bg-green-500/10"
    } else if (normalizedScore >= 60) {
        colorClass = "text-blue-500"
        bgClass = "bg-blue-500/10"
    }

    return (
        <div className={cn("relative inline-flex items-center justify-center", className)}>
            <div className={cn("absolute inset-0 rounded-full", bgClass)} />

            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                className="rotate-[-90deg]"
            >
                {/* Background Circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    className="text-muted/20"
                />

                {/* Foreground Circle (Progress) */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className={cn("transition-all duration-1000 ease-out", colorClass)}
                />
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
                <span className={cn("text-xs font-bold", colorClass)}>
                    {Math.round(normalizedScore)}%
                </span>
            </div>
        </div>
    )
}
