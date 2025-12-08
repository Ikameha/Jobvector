"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"

interface GlassCardProps extends React.ComponentProps<'div'> {
    intensity?: "light" | "medium" | "strong"
    neonBorder?: boolean
}

export function GlassCard({
    className,
    intensity = "medium",
    neonBorder = false,
    children,
    ...props
}: GlassCardProps) {
    const intensityClasses = {
        light: "bg-white/5 backdrop-blur-sm border-white/5",
        medium: "bg-white/[0.08] backdrop-blur-md border-white/10",
        strong: "bg-white/[0.12] backdrop-blur-lg border-white/[0.15]",
    }

    return (
        <Card
            className={cn(
                intensityClasses[intensity],
                "border shadow-sm transition-all duration-300",
                // Subtle shine effect on hover
                "hover:bg-white/[0.12] hover:border-white/20",
                neonBorder && "border-primary/30 shadow-[0_0_15px_rgba(61,124,255,0.1)] hover:shadow-[0_0_20px_rgba(61,124,255,0.2)] hover:border-primary/50",
                className
            )}
            {...props}
        >
            {children}
        </Card>
    )
}
