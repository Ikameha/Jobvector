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
        light: "bg-white/5 backdrop-blur-sm",
        medium: "bg-white/10 backdrop-blur-md",
        strong: "bg-white/20 backdrop-blur-lg",
    }

    return (
        <Card
            className={cn(
                intensityClasses[intensity],
                "border border-white/10",
                neonBorder && "border-primary/30 shadow-[0_0_15px_rgba(61,124,255,0.15)]",
                "transition-all duration-300",
                "hover:bg-white/15 hover:border-white/20",
                neonBorder && "hover:border-primary/50 hover:shadow-[0_0_25px_rgba(61,124,255,0.25)]",
                className
            )}
            {...props}
        >
            {children}
        </Card>
    )
}
