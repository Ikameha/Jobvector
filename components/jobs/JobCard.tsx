"use client"

import { useState, useEffect } from "react"
import { Job, MatchScore } from "@/lib/types"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building2, MapPin, DollarSign, Clock, ArrowRight, Bookmark, EyeOff, Info } from "lucide-react"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"
import { isJobSaved, toggleSavedJob } from "@/lib/storage"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"

interface JobCardProps {
    job: Job
    matchScore?: MatchScore
    onSaveToggle?: () => void
}

export function JobCard({ job, matchScore, onSaveToggle }: JobCardProps) {
    const score = matchScore?.overall || 0
    const [saved, setSaved] = useState(false)
    const [isVisible, setIsVisible] = useState(true)

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

    const handleHide = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsVisible(false) // Visual hide only for this session/component instance as requested
    }

    // Mock colors for logos based on company name length to create deterministic but varied colors
    const logoColors = [
        "bg-gradient-to-br from-blue-500 to-blue-600",
        "bg-gradient-to-br from-purple-500 to-purple-600",
        "bg-gradient-to-br from-pink-500 to-pink-600",
        "bg-gradient-to-br from-orange-500 to-orange-600",
        "bg-gradient-to-br from-teal-500 to-teal-600",
        "bg-gradient-to-br from-indigo-500 to-indigo-600"
    ]
    const logoColor = logoColors[job.company.length % logoColors.length]

    if (!isVisible) return null

    return (
        <div className="group relative rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary/20">
            <Link href={`/jobs/${job.id}`} className="absolute inset-0 z-0" aria-label={`View details for ${job.title}`} />
            <div className="p-5 flex flex-col h-full relative z-10 pointer-events-none">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-4 pointer-events-auto">
                    <div className="flex items-start gap-4">
                        {/* Colorful Logo */}
                        <div className={`w-12 h-12 rounded-xl ${logoColor} flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary/10 shrink-0`}>
                            {job.company.substring(0, 2).toUpperCase()}
                        </div>

                        <div>
                            <h3 className="font-semibold text-base leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-1">
                                {job.title}
                            </h3>
                            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1 line-clamp-1">
                                <Building2 className="w-3.5 h-3.5 shrink-0" />
                                {job.company}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                        {/* Hide Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                            onClick={handleHide}
                            title="Hide job"
                        >
                            <EyeOff className="w-4 h-4" />
                        </Button>

                        {/* Save Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className={cn(
                                "h-8 w-8 hover:bg-primary/10 transition-colors",
                                saved ? "text-primary" : "text-muted-foreground"
                            )}
                            onClick={handleSave}
                            title={saved ? "Unsave job" : "Save job"}
                        >
                            <Bookmark className={cn("w-4 h-4", saved && "fill-current")} />
                        </Button>

                        {/* Bento Score Popover */}
                        {matchScore && (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <button
                                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                                        className="flex items-center gap-1.5 pl-1 pr-2.5 py-1 rounded-full bg-primary/5 hover:bg-primary/10 transition-colors border border-primary/20 hover:border-primary/30 group/score ml-2"
                                    >
                                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white shadow-sm ${score >= 80 ? 'bg-green-600' : score >= 60 ? 'bg-blue-600' : 'bg-orange-600'
                                            }`}>
                                            {score}
                                        </div>
                                        <span className="text-xs font-bold text-foreground group-hover/score:text-primary transition-colors">Bento</span>
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 p-0 overflow-hidden" align="end" sideOffset={5}>
                                    <div className="bg-primary/5 p-4 border-b border-border">
                                        <h4 className="font-bold flex items-center gap-2 text-primary">
                                            <Info className="w-4 h-4" />
                                            Bento Match Breakdown
                                        </h4>
                                    </div>
                                    <div className="p-4 space-y-4">
                                        <div className="space-y-1.5">
                                            <div className="flex justify-between text-xs">
                                                <span className="text-muted-foreground">Skills Match</span>
                                                <span className="font-bold">{matchScore.skills}%</span>
                                            </div>
                                            <Progress value={matchScore.skills} className="h-2" indicatorClassName="bg-green-500" />
                                        </div>
                                        {/* Mock Data for visual breakdown as requested */}
                                        <div className="space-y-1.5">
                                            <div className="flex justify-between text-xs">
                                                <span className="text-muted-foreground">Role & Experience</span>
                                                <span className="font-bold">{Math.min(100, Math.max(40, score + 5))}%</span>
                                            </div>
                                            <Progress value={Math.min(100, Math.max(40, score + 5))} className="h-2" indicatorClassName="bg-blue-500" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <div className="flex justify-between text-xs">
                                                <span className="text-muted-foreground">Salary & Culture</span>
                                                <span className="font-bold">{Math.min(100, Math.max(30, score - 8))}%</span>
                                            </div>
                                            <Progress value={Math.min(100, Math.max(30, score - 8))} className="h-2" indicatorClassName="bg-purple-500" />
                                        </div>

                                        <div className="pt-2 text-[10px] text-muted-foreground bg-muted/30 p-2 rounded border border-border mt-2">
                                            Scores are calculated based on your profile skills, preferences, and experience overlap with the job description.
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
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

                {/* Skills - Highlight First Tag */}
                <div className="flex flex-wrap gap-2 mb-5 mt-auto pointer-events-auto">
                    {job.requiredSkills.length > 0 && (
                        <Badge className="px-2.5 py-1 text-xs font-semibold bg-primary text-primary-foreground border-transparent shadow-sm hover:bg-primary/90">
                            {job.requiredSkills[0]}
                        </Badge>
                    )}
                    {job.requiredSkills.slice(1, 4).map((skill) => (
                        <Badge key={skill} variant="secondary" className="px-2 py-1 text-xs font-medium bg-muted text-muted-foreground hover:bg-muted/80 border-transparent">
                            {skill}
                        </Badge>
                    ))}
                    {job.requiredSkills.length > 4 && (
                        <span className="text-[10px] text-muted-foreground self-center px-1 font-medium">
                            +{job.requiredSkills.length - 4}
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
