"use client"

import { Job, MatchScore } from "@/lib/types"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building2, MapPin, DollarSign, Clock, ArrowRight, Bookmark } from "lucide-react"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"

interface JobCardProps {
    job: Job
    matchScore?: MatchScore
}

export function JobCard({ job, matchScore }: JobCardProps) {
    const score = matchScore?.overall || 0

    // Minimalistic score coloring - text only or subtle ring, no heavy shadows
    const getScoreColor = (s: number) => {
        if (s >= 80) return "text-green-600 bg-green-500/10 border-green-200 dark:border-green-900"
        if (s >= 60) return "text-blue-600 bg-blue-500/10 border-blue-200 dark:border-blue-900"
        return "text-orange-600 bg-orange-500/10 border-orange-200 dark:border-orange-900"
    }

    return (
        <div className="group relative rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary/20">
            <div className="p-5 flex flex-col h-full">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
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

                    {/* Match Score - Clean & Circular */}
                    {matchScore && (
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full border ${getScoreColor(score)}`}>
                            <span className="text-xs font-bold">{score}%</span>
                        </div>
                    )}
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
                <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
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
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
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
