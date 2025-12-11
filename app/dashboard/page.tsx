"use client"

import { useState, useEffect } from "react"
import { AppNav } from "@/components/app-nav"
import { DashboardMetrics } from "@/components/dashboard/DashboardMetrics"
import { RecentActivity } from "@/components/dashboard/RecentActivity"
import { ProfileRadarChart } from "@/components/profile/ProfileRadarChart"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Sparkles, Bookmark } from "lucide-react"
import Link from "next/link"
import { loadProfile, getSavedJobIds } from "@/lib/storage"
import { fetchJobs } from "@/lib/jobApi"
import { Profile, Job } from "@/lib/types"
import { JobCard } from "@/components/jobs/JobCard"
import { EmptyState } from "@/components/ui/empty-state"
import { PageTransition } from "@/components/ui/page-transition"

export default function DashboardPage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [savedJobs, setSavedJobs] = useState<Job[]>([])
  const [loadingSaved, setLoadingSaved] = useState(true)

  const loadSavedJobs = async () => {
    setLoadingSaved(true)
    const savedIds = getSavedJobIds()
    if (savedIds.length > 0) {
      const allJobs = await fetchJobs() // In real app, we'd have a bulk fetch or by IDs
      const filtered = allJobs.filter(j => savedIds.includes(j.id))
      setSavedJobs(filtered)
    } else {
      setSavedJobs([])
    }
    setLoadingSaved(false)
  }

  useEffect(() => {
    setProfile(loadProfile())
    loadSavedJobs()
  }, [])

  return (
    <PageTransition className="min-h-screen">
      <AppNav />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
            <p className="text-muted-foreground">
              Here's what's happening with your job search today.
            </p>
          </div>
          <Link href="/jobs">
            <Button variant="neon" className="gap-2">
              <Sparkles className="w-4 h-4" />
              Find New Matches
            </Button>
          </Link>
        </div>

        {/* Simplied Tabs - We might even remove tabs if only 'Overview' remains, but keeping for future scalability 'Applications' etc */}
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="bg-secondary/10 border border-secondary/20">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="saved">Saved Jobs ({savedJobs.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Key Metrics */}
            <DashboardMetrics />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content Area */}
              <div className="lg:col-span-2 space-y-8">

                {/* Recommended Jobs Preview */}
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Top Recommendations</h2>
                    <Link href="/jobs" className="text-sm text-primary hover:underline flex items-center gap-1">
                      View All <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="grid gap-4">
                    {/* Placeholder Job Cards */}
                    {[1, 2, 3].map((i) => (
                      <GlassCard key={i} intensity="light" className="p-4 hover:bg-white/5 transition-colors cursor-pointer group">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                              TC
                            </div>
                            <div>
                              <h3 className="font-semibold group-hover:text-primary transition-colors">Senior Frontend Engineer</h3>
                              <p className="text-sm text-muted-foreground">TechCorp • Remote • $120k - $150k</p>
                              <div className="flex gap-2 mt-2">
                                <span className="text-xs bg-secondary/10 text-secondary px-2 py-0.5 rounded-full">React</span>
                                <span className="text-xs bg-secondary/10 text-secondary px-2 py-0.5 rounded-full">TypeScript</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-green-500">9{8 - i}%</div>
                            <div className="text-xs text-muted-foreground">Match</div>
                          </div>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                </section>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Profile Radar Chart */}
                <ProfileRadarChart />

                {/* Recent Activity */}
                <RecentActivity />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="saved">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loadingSaved ? (
                <div className="col-span-full text-center py-10">Loading saved jobs...</div>
              ) : savedJobs.length > 0 ? (
                savedJobs.map(job => (
                  <JobCard key={job.id} job={job} onSaveToggle={loadSavedJobs} />
                ))
              ) : (
                <div className="col-span-full">
                  <EmptyState
                    icon={Bookmark}
                    title="No saved jobs yet"
                    description="Jobs you save will appear here for easy access."
                    action={
                      <Link href="/jobs">
                        <Button variant="neon" className="mt-4">Browse Jobs</Button>
                      </Link>
                    }
                  />
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  )
}
