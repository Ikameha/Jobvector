"use client"

import { GlassCard } from "@/components/ui/glass-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { EmptyState } from "@/components/ui/empty-state"
import { LayoutList } from "lucide-react"

interface ActivityItem {
    id: string
    type: "application" | "profile" | "match" | "interview"
    title: string
    description: string
    timestamp: Date
    company?: string
    logo?: string
}

const MOCK_ACTIVITY: ActivityItem[] = [
    {
        id: "1",
        type: "application",
        title: "Applied to Senior Frontend Developer",
        description: "Application sent successfully",
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
        company: "TechCorp",
        logo: "TC",
    },
    {
        id: "2",
        type: "match",
        title: "New 95% Match Found",
        description: "Lead React Engineer at StartupX",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        company: "StartupX",
        logo: "SX",
    },
    {
        id: "3",
        type: "profile",
        title: "Profile Updated",
        description: "Added new skills: Next.js, TypeScript",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    },
    {
        id: "4",
        type: "interview",
        title: "Interview Scheduled",
        description: "Technical round with Engineering Manager",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
        company: "InnovateInc",
        logo: "II",
    },
]

export function RecentActivity() {
    // In a real app, this would be a prop or fetched data
    const activities = MOCK_ACTIVITY

    return (
        <GlassCard intensity="medium" className="p-6 h-full">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            {activities.length === 0 ? (
                <EmptyState
                    icon={LayoutList}
                    title="No recent activity"
                    description="Your applications, matches, and interviews will appear here."
                />
            ) : (
                <div className="space-y-6">
                    {activities.map((item, index) => (
                        <div key={item.id} className="relative pl-6 pb-6 last:pb-0 border-l border-border last:border-l-0">
                            <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-background" />
                            <div className="flex items-start gap-3">
                                {item.company && (
                                    <Avatar className="w-8 h-8 border border-border">
                                        <AvatarFallback className="text-xs">{item.logo}</AvatarFallback>
                                    </Avatar>
                                )}
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium leading-none">{item.title}</p>
                                        <span className="text-xs text-muted-foreground">
                                            {formatDistanceToNow(item.timestamp, { addSuffix: true })}
                                        </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground">{item.description}</p>
                                    {item.type === "match" && (
                                        <Badge variant="secondary" className="mt-1 text-[10px] px-1.5 py-0 h-5">
                                            High Match
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </GlassCard>
    )
}
