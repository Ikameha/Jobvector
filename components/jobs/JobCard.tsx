"use client"

import { Job, MatchScore } from "@/lib/types"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building2, MapPin, DollarSign, Clock, ArrowRight, Bookmark } from "lucide-react"
import Link from "next/link"

interface JobCardProps {
    job: Job
    matchScore?: MatchScore
}

export function JobCard({ job, matchScore }: JobCardProps) {
    const score = matchScore?.overall || 0

    const getScoreColor = (s: number) => {
        if (s >= 80) return "text-green-500 border-green-500/50 shadow-[0_0_10px_rgba(34,197,94,0.3)]"
        if (s >= 60) return "text-blue-500 border-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.3)]"
        return "text-orange-500 border-orange-500/50 shadow-[0_0_10px_rgba(249,115,22,0.3)]"
    }

    return (
        <GlassCard intensity="light" className="p-5 hover:bg-white/5 transition-all duration-300 group relative">
            <div className="flex flex-col h-full justify-between">
                <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex items-start gap-3">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold border border-primary/20">
                                {job.company.substring(0, 2).toUpperCase()}
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
                                    {job.title}
                                </h3>
                                <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                                    <Building2 className="w-3.5 h-3.5" />
                                    {job.company}
                                </div>
                            </div>
                        </div>

                        {/* Match Score Badge */}
                        {matchScore && (
                            <div className={`
                flex flex-col items-center justify-center w-12 h-12 rounded-full border-2 
                bg-background/50 backdrop-blur-sm ${getScoreColor(score)}
              `}>
                                <span className="text-sm font-bold">{score}%</span>
                            </div>
                        )}
                    </div>

                    {/* Details */}
                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground mb-4">
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

                    {/* Skills (First 3) */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                        {job.requiredSkills.slice(0, 3).map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs font-normal">
                                {skill}
                            </Badge>
                        ))}
                        {job.requiredSkills.length > 3 && (
                            <span className="text-xs text-muted-foreground self-center px-1">
                                +{job.requiredSkills.length - 3}
                            </span>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-auto">
                    <Link href={`/jobs/${job.id}`} className="flex-1">
                        <Button className="w-full gap-2 group-hover:bg-primary/90 transition-colors">
                            View Analysis
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                    <Button variant="outline" size="icon">
                        <Bookmark className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </GlassCard>
    )
}
