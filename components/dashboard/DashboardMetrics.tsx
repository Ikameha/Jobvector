"use client"

import { GlassCard } from "@/components/ui/glass-card"
import { MatchScoreRing } from "@/components/jobs/match-score-ring"

export function DashboardMetrics() {
    return (
        <div className="flex flex-col items-center justify-center mb-8">
            <MatchScoreRing score={85} size={80} strokeWidth={6} className="bg-background rounded-full shadow-sm mb-2" />
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Avg Match</p>
        </div>
    )
}
