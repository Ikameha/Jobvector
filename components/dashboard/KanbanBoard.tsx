"use client"

import { useState, useEffect } from "react"
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd"
import { Application, ApplicationStatus, getApplications, updateApplicationStatus } from "@/lib/storage"
import { Job } from "@/lib/types"
import { fetchJobs } from "@/lib/jobApi"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import {
    MapPin, Building2, CalendarClock, GripVertical, AlertCircle,
    Bookmark, Send, MessageSquare, Trophy, MoreHorizontal
} from "lucide-react"

// Enhanced Column Definitions
const COLUMNS: { id: ApplicationStatus; title: string; color: string; icon: any; bgClass: string; borderClass: string }[] = [
    {
        id: 'Saved',
        title: 'Saved',
        color: 'text-blue-500',
        icon: Bookmark,
        bgClass: 'bg-blue-50 dark:bg-blue-950/20',
        borderClass: 'border-blue-200 dark:border-blue-900/50'
    },
    {
        id: 'Applied',
        title: 'Applied',
        color: 'text-purple-500',
        icon: Send,
        bgClass: 'bg-purple-50 dark:bg-purple-950/20',
        borderClass: 'border-purple-200 dark:border-purple-900/50'
    },
    {
        id: 'Interviewing',
        title: 'Interviewing',
        color: 'text-orange-500',
        icon: MessageSquare,
        bgClass: 'bg-orange-50 dark:bg-orange-950/20',
        borderClass: 'border-orange-200 dark:border-orange-900/50'
    },
    {
        id: 'Offer',
        title: 'Offer',
        color: 'text-green-500',
        icon: Trophy,
        bgClass: 'bg-green-50 dark:bg-green-950/20',
        borderClass: 'border-green-200 dark:border-green-900/50'
    },
]

export function KanbanBoard() {
    // State
    const [applications, setApplications] = useState<Application[]>([])
    const [jobs, setJobs] = useState<Record<string, Job>>({})
    const [isLoading, setIsLoading] = useState(true)

    // Load Data
    useEffect(() => {
        async function loadData() {
            const apps = getApplications()
            setApplications(apps)

            try {
                const allJobs = await fetchJobs()
                const jobMap: Record<string, Job> = {}
                allJobs.forEach((job: Job) => {
                    jobMap[job.id] = job
                })
                setJobs(jobMap)
            } catch (error) {
                console.error("Failed to load jobs", error)
            } finally {
                setIsLoading(false)
            }
        }
        loadData()
    }, [])

    // Drag End Handler
    const onDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result
        if (!destination) return
        if (destination.droppableId === source.droppableId && destination.index === source.index) return

        const newStatus = destination.droppableId as ApplicationStatus

        // Update Local State optimistically
        const updatedApps = applications.map(app => {
            if (app.jobId === draggableId) {
                return { ...app, status: newStatus }
            }
            return app
        })
        setApplications(updatedApps)
        updateApplicationStatus(draggableId, newStatus)
    }

    const getAppsByStatus = (status: ApplicationStatus) => applications.filter(app => app.status === status)

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 h-[500px]">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="rounded-2xl bg-muted/20 animate-pulse h-full border border-border/40" />
                ))}
            </div>
        )
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 h-[calc(100vh-200px)] min-h-[500px]">
                {COLUMNS.map((column) => {
                    const columnApps = getAppsByStatus(column.id)
                    const Icon = column.icon // Capitalize for component usage

                    return (
                        <div
                            key={column.id}
                            className={`flex flex-col h-full rounded-3xl border overflow-hidden transition-colors duration-300 ${column.bgClass} ${column.borderClass}`}
                        >
                            {/* Bento Header */}
                            <div className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-xl bg-background/60 shadow-sm border border-border/10 ${column.color}`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <h3 className="font-bold text-foreground/90">{column.title}</h3>
                                </div>
                                <Badge variant="secondary" className="bg-background/50 font-mono">
                                    {columnApps.length}
                                </Badge>
                            </div>

                            {/* Droppable Area */}
                            <Droppable droppableId={column.id}>
                                {(provided, snapshot) => (
                                    <ScrollArea className="flex-1 w-full relative px-2">
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            className={`p-2 space-y-3 min-h-[150px] rounded-2xl transition-colors ${snapshot.isDraggingOver ? 'bg-primary/5' : ''}`}
                                        >
                                            {columnApps.map((app, index) => {
                                                const job = jobs[app.jobId]
                                                if (!job) return null

                                                return (
                                                    <Draggable key={app.jobId} draggableId={app.jobId} index={index}>
                                                        {(provided, snapshot) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                style={provided.draggableProps.style}
                                                                className={`group relative bg-background/80 backdrop-blur-md hover:bg-background border border-border/40 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 ease-out hover:-translate-y-1 ${snapshot.isDragging ? 'shadow-xl rotate-2 scale-105 z-50 ring-2 ring-primary/20' : ''}`}
                                                            >
                                                                {/* Top Row: Company & Menu */}
                                                                <div className="flex items-start justify-between mb-2">
                                                                    <div className="flex items-center gap-2">
                                                                        <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                                                                            <Building2 className="w-4 h-4 text-muted-foreground" />
                                                                        </div>
                                                                        <div>
                                                                            <h4 className="font-semibold text-sm leading-tight group-hover:text-primary transition-colors">{job.title}</h4>
                                                                            <p className="text-xs text-muted-foreground">{job.company}</p>
                                                                        </div>
                                                                    </div>
                                                                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                        <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                                                                    </Button>
                                                                </div>

                                                                {/* Metadata Tags */}
                                                                <div className="flex flex-wrap gap-2 mb-3">
                                                                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-5 bg-secondary/30 font-normal">
                                                                        {job.type}
                                                                    </Badge>
                                                                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-5 bg-secondary/30 font-normal">
                                                                        {job.location}
                                                                    </Badge>
                                                                </div>

                                                                {/* Footer: Date */}
                                                                <div className="flex items-center justify-between text-[11px] text-muted-foreground/60 border-t border-dashed border-border/50 pt-2 mt-2">
                                                                    <div className="flex items-center gap-1">
                                                                        <CalendarClock className="w-3 h-3" />
                                                                        <span>Modified {new Date(app.dateUpdated).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                                                                    </div>
                                                                    <GripVertical className="w-3 h-3 opacity-0 group-hover:opacity-50" />
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                )
                                            })}
                                            {provided.placeholder}

                                            {columnApps.length === 0 && (
                                                <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground/30">
                                                    <div className={`p-3 rounded-full bg-background/40 mb-3 ${column.color} bg-opacity-10`}>
                                                        <Icon className="w-6 h-6 opacity-50" />
                                                    </div>
                                                    <p className="text-xs font-medium">Empty {column.title}</p>
                                                </div>
                                            )}
                                        </div>
                                    </ScrollArea>
                                )}
                            </Droppable>
                        </div>
                    )
                })}
            </div>
        </DragDropContext>
    )
}
