"use client"

import { useState, useEffect } from "react"
import { AppNav } from "@/components/app-nav"
import { KanbanBoard } from "@/components/tracker/KanbanBoard"
import { loadJobAnalyses, loadProfile } from "@/lib/storage"
import { JobAnalysis } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"

export default function TrackerPage() {
    const router = useRouter()
    const [items, setItems] = useState<JobAnalysis[]>([])
    const [loading, setLoading] = useState(true)

    const loadData = () => {
        const profile = loadProfile()
        if (!profile) {
            router.push("/personal-profile")
            return
        }
        const analyses = loadJobAnalyses()
        setItems(analyses)
        setLoading(false)
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <AppNav />

            <main className="flex-1 container max-w-[1600px] mx-auto px-4 py-8 overflow-hidden flex flex-col">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Application Tracker</h1>
                        <p className="text-muted-foreground mt-1">Manage your job search pipeline</p>
                    </div>
                    <Button onClick={() => router.push("/jobs")}>
                        <Plus className="w-4 h-4 mr-2" />
                        Find More Jobs
                    </Button>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
                    </div>
                ) : (
                    <div className="flex-1 overflow-x-auto">
                        <KanbanBoard items={items} onUpdate={loadData} />
                    </div>
                )}
            </main>
        </div>
    )
}
