"use client"

import { GlassCard } from "@/components/ui/glass-card"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { Fish, UtensilsCrossed, Eye, TrendingUp } from "lucide-react"

export function DashboardMetrics() {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <GlassCard intensity="light" neonBorder className="p-6 flex flex-col items-center justify-center text-center group hover:bg-primary/5 transition-colors">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Fish className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">
                    <AnimatedCounter end={12} />
                </div>
                <p className="text-sm text-muted-foreground">Applications Sent</p>
            </GlassCard>

            <GlassCard intensity="light" neonBorder className="p-6 flex flex-col items-center justify-center text-center group hover:bg-secondary/5 transition-colors">
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <UtensilsCrossed className="w-6 h-6 text-secondary" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">
                    <AnimatedCounter end={3} />
                </div>
                <p className="text-sm text-muted-foreground">Interviews</p>
            </GlassCard>

            <GlassCard intensity="light" neonBorder className="p-6 flex flex-col items-center justify-center text-center group hover:bg-chart-3/5 transition-colors">
                <div className="w-12 h-12 rounded-full bg-chart-3/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Eye className="w-6 h-6 text-chart-3" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">
                    <AnimatedCounter end={45} />
                </div>
                <p className="text-sm text-muted-foreground">Profile Views</p>
            </GlassCard>

            <GlassCard intensity="light" neonBorder className="p-6 flex flex-col items-center justify-center text-center group hover:bg-green-500/5 transition-colors">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-6 h-6 text-green-500" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">
                    <AnimatedCounter end={85} suffix="%" />
                </div>
                <p className="text-sm text-muted-foreground">Avg Match Score</p>
            </GlassCard>
        </div>
    )
}
