"use client"

import { JobAnalysis, ApplicationStatus } from "@/lib/types"
import { GlassCard } from "@/components/ui/glass-card"
import { Badge } from "@/components/ui/badge"
import { Building2, MapPin, DollarSign, Calendar, GripVertical, ExternalLink } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { formatDistanceToNow } from "date-fns"

interface TrackerCardProps {
    item: JobAnalysis
    onStatusChange: (id: string, newStatus: ApplicationStatus) => void
}

export function TrackerCard({ item, onStatusChange }: TrackerCardProps) {
    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-green-500"
        if (score >= 60) return "text-blue-500"
        return "text-orange-500"
    }

    return (
        <GlassCard intensity="light" className="p-4 hover:bg-white/5 transition-all group cursor-grab active:cursor-grabbing">
            <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-sm leading-tight line-clamp-2">{item.job.title}</h4>
                <div className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                    <GripVertical className="w-4 h-4" />
                </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                <Building2 className="w-3 h-3" />
                {item.job.company}
            </div>

            <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/5">
                <div className={`text-xs font-bold ${getScoreColor(item.matchScore.overall)}`}>
                    {item.matchScore.overall}% Match
                </div>
                <Link href={`/jobs/${item.jobId}`} className="text-xs text-primary hover:underline">
                    View
                </Link>
            </div>

            <div className="mt-3 flex gap-1">
                <select
                    className="w-full text-xs bg-black/20 border border-white/10 rounded px-2 py-1 outline-none text-muted-foreground"
                    value={item.status}
                    onChange={(e) => onStatusChange(item.id, e.target.value as ApplicationStatus)}
                    onClick={(e) => e.stopPropagation()}
                >
                    <option value="saved">Saved</option>
                    <option value="applied">Applied</option>
                    <option value="interviewing">Interviewing</option>
                    <option value="offer">Offer</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>
        </GlassCard>
    )
}
