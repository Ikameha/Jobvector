"use client"

import { useState, useEffect } from "react"
import { JobAnalysis, ApplicationStatus } from "@/lib/types"
import { TrackerCard } from "./TrackerCard"
import { saveJobAnalysis } from "@/lib/storage"
import { GlassCard } from "@/components/ui/glass-card"
import { Bookmark, Send, Users, Trophy, XCircle } from "lucide-react"

interface KanbanBoardProps {
    items: JobAnalysis[]
    onUpdate: () => void
}

const COLUMNS: { id: ApplicationStatus; label: string; icon: any; color: string }[] = [
    { id: "saved", label: "Saved", icon: Bookmark, color: "text-blue-500" },
    { id: "applied", label: "Applied", icon: Send, color: "text-purple-500" },
    { id: "interviewing", label: "Interviewing", icon: Users, color: "text-orange-500" },
    { id: "offer", label: "Offer", icon: Trophy, color: "text-green-500" },
    { id: "rejected", label: "Rejected", icon: XCircle, color: "text-red-500" },
]

export function KanbanBoard({ items, onUpdate }: KanbanBoardProps) {

    const handleStatusChange = (id: string, newStatus: ApplicationStatus) => {
        const item = items.find(i => i.id === id)
        if (item) {
            const updated = { ...item, status: newStatus, updatedAt: new Date().toISOString() }
            saveJobAnalysis(updated)
            onUpdate() // Refresh parent state
        }
    }

    return (
        <div className="flex gap-4 overflow-x-auto pb-4 min-w-full">
            {COLUMNS.map(column => {
                const columnItems = items.filter(item => (item.status || "saved") === column.id)

                return (
                    <div key={column.id} className="min-w-[280px] w-full md:w-[280px] flex flex-col">
                        <GlassCard className="mb-3 p-3 flex items-center justify-between sticky top-0 z-10">
                            <div className="flex items-center gap-2">
                                <column.icon className={`w-4 h-4 ${column.color}`} />
                                <span className="font-semibold text-sm">{column.label}</span>
                            </div>
                            <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full font-medium">
                                {columnItems.length}
                            </span>
                        </GlassCard>

                        <div className="space-y-3 flex-1">
                            {columnItems.length === 0 ? (
                                <div className="h-24 border-2 border-dashed border-white/5 rounded-lg flex items-center justify-center text-xs text-muted-foreground/50">
                                    Empty
                                </div>
                            ) : (
                                columnItems.map(item => (
                                    <TrackerCard
                                        key={item.id}
                                        item={item}
                                        onStatusChange={handleStatusChange}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
