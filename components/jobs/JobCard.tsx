"use client"

import { useState, useEffect } from "react"
import { Job, MatchScore } from "@/lib/types"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building2, MapPin, DollarSign, Clock, ArrowRight, Bookmark } from "lucide-react"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"
import { isJobSaved, toggleSavedJob } from "@/lib/storage"
import { cn } from "@/lib/utils"

interface JobCardProps {
    job: Job
    matchScore?: MatchScore
    onSaveToggle?: () => void
}

export function JobCard({ job, matchScore, onSaveToggle }: JobCardProps) {
    const score = matchScore?.overall || 0
    const [saved, setSaved] = useState(false)

    useEffect(() => {
        setSaved(isJobSaved(job.id))
    }, [job.id])

    const handleSave = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        const newState = toggleSavedJob(job.id)
        setSaved(newState)
        if (onSaveToggle) {
            onSaveToggle()
        }
    }

    // Minimalistic score coloring - text only or subtle ring, no heavy shadows
    const getScoreColor = (s: number) => {
        if (s >= 80) return "text-green-600 bg-green-500/10 border-green-200 dark:border-green-900"
        if (s >= 60) return "text-blue-600 bg-blue-500/10 border-blue-200 dark:border-blue-900"
        return "text-orange-600 bg-orange-500/10 border-orange-200 dark:border-orange-900"
    }

    return (
        <div className="group relative rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary/20">
            <Link href={`/jobs/${job.id}`} className="absolute inset-0 z-0" aria-label={`View details for ${job.title}`} />
            <div className="p-5 flex flex-col h-full relative z-10 pointer-events-none">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-4 pointer-events-auto">
                    <div className="flex items-start gap-4">
                        {/* Company Logo - Simplified */}
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground font-semibold text-sm">
                            {job.company.substring(0, 2).toUpperCase()}
                        </div>

                        <div>
                            <h3 className="font-semibold text-base leading-tight text-foreground group-hover:text-primary transition-colors">
                                {job.title}
                            </h3>
                            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                                <Building2 className="w-3.5 h-3.5" />
                                {job.company}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Save Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className={cn(
                                "h-8 w-8 hover:bg-primary/10 transition-colors",
                                saved ? "text-primary" : "text-muted-foreground"
                            )}
                            onClick={handleSave}
                        >
                            <Bookmark className={cn("w-4 h-4", saved && "fill-current")} />
                        </Button>

                        {/* Match Score - Clean & Circular */}
                        {matchScore && (
                            <div className={`flex items-center justify-center w-10 h-10 rounded-full border ${getScoreColor(score)}`}>
                                <span className="text-xs font-bold">{score}%</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Tags / Meta - Cleaned up */}
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        {job.location}
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {job.workMode}
                    </div>
                    <div className="flex items-center gap-1.5">
                        <DollarSign className="w-3.5 h-3.5" />
                        ${(job.salaryMin / 1000).toFixed(0)}k - ${(job.salaryMax / 1000).toFixed(0)}k
                    </div>
                </div>

                {/* Skills - Subtle Badges */}
                <div className="flex flex-wrap gap-1.5 mb-5 mt-auto pointer-events-auto">
                    {job.requiredSkills.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="secondary" className="px-2 py-0.5 text-[10px] font-medium bg-muted text-muted-foreground hover:bg-muted/80 border-transparent">
                            {skill}
                        </Badge>
                    ))}
                    {job.requiredSkills.length > 3 && (
                        <span className="text-[10px] text-muted-foreground self-center px-1">
                            +{job.requiredSkills.length - 3}
                        </span>
                    )}
                </div>

                {/* Action - Minimalistic Link */}
                <div className="flex items-center justify-between pt-4 border-t border-border/50 pointer-events-auto">
                    <span className="text-xs text-muted-foreground">Posted 2 days ago</span>
                    <Link href={`/jobs/${job.id}`} className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1 transition-colors">
                        View Details <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </div>
            </div>
        </div>
    )
}
export function JobCardSkeleton() {
    return (
        <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex flex-col h-full">
                {/* Header Skeleton */}
                <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-start gap-4">
                        <Skeleton className="w-10 h-10 rounded-lg" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-24" />
                        </div>
                    </div>
                    <Skeleton className="w-10 h-10 rounded-full" />
                </div>

                {/* Meta Skeleton */}
                <div className="flex gap-4 mb-4">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-3 w-16" />
                </div>

                {/* Skills Skeleton */}
                <div className="flex gap-2 mb-6 mt-auto">
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="h-5 w-10 rounded-full" />
                </div>

                {/* Footer Skeleton */}
                <div className="flex justify-between items-center pt-4 border-t border-border/50">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-4 w-24" />
                </div>
            </div>
        </div>
    )
}
