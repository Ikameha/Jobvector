"use client"

import { useState, useEffect } from "react"
import { AppNav } from "@/components/app-nav"
import { JobFilters } from "@/components/jobs/JobFilters"
import { JobCard, JobCardSkeleton } from "@/components/jobs/JobCard"
import { fetchJobs } from "@/lib/jobApi"
import { loadProfile } from "@/lib/storage"
import { calculateMatchScore } from "@/lib/matchingEngine"
import { Job, Profile, MatchScore } from "@/lib/types"
import { GlassCard } from "@/components/ui/glass-card"
import { ProfileRadarChart } from "@/components/profile/ProfileRadarChart"
import { EmptyState } from "@/components/ui/empty-state"
import { SearchX, SlidersHorizontal, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageTransition } from "@/components/ui/page-transition"
import { AsymmetricalBackground } from "@/components/ui/asymmetrical-background"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"

interface JobWithScore extends Job {
  matchScore?: MatchScore
}

export default function JobsPage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [jobs, setJobs] = useState<JobWithScore[]>([])
  const [filteredJobs, setFilteredJobs] = useState<JobWithScore[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Filters
  // Filters
  const [searchQuery, setSearchQuery] = useState("")
  const [minSalary, setMinSalary] = useState(0)
  const [selectedWorkModes, setSelectedWorkModes] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<"match" | "date">("match")
  const [showUrgent, setShowUrgent] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      const existingProfile = loadProfile()
      setProfile(existingProfile)

      const allJobs = await fetchJobs()

      let jobsWithScores = allJobs.map(job => ({ ...job })) as JobWithScore[]

      if (existingProfile) {
        jobsWithScores = allJobs.map(job => ({
          ...job,
          matchScore: calculateMatchScore(existingProfile, job)
        }))
        // Initial sort by match
        jobsWithScores.sort((a, b) => (b.matchScore?.overall || 0) - (a.matchScore?.overall || 0))
      }

      setJobs(jobsWithScores)
      setFilteredJobs(jobsWithScores)
      setIsLoading(false)
    }
    loadData()
  }, [])

  // Apply filters
  useEffect(() => {
    let result = jobs

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(j =>
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        j.requiredSkills.some(s => s.toLowerCase().includes(q))
      )
    }

    // Salary
    if (minSalary > 0) {
      result = result.filter(j => j.salaryMin >= minSalary)
    }

    // Work Mode
    if (selectedWorkModes.length > 0) {
      result = result.filter(j => selectedWorkModes.includes(j.workMode.toLowerCase()))
    }

    // Urgent (Mock logic: jobs posted in last 3 days)
    if (showUrgent) {
      const threeDaysAgo = Date.now() - 3 * 24 * 60 * 60 * 1000
      result = result.filter(j => new Date(j.postedAt).getTime() > threeDaysAgo)
    }

    // Sort
    if (sortBy === "match") {
      result.sort((a, b) => (b.matchScore?.overall || 0) - (a.matchScore?.overall || 0))
    } else {
      result.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime())
    }

    setFilteredJobs([...result])
  }, [searchQuery, minSalary, selectedWorkModes, jobs, sortBy, showUrgent])

  const toggleWorkMode = (mode: string) => {
    setSelectedWorkModes(prev =>
      prev.includes(mode) ? prev.filter(m => m !== mode) : [...prev, mode]
    )
  }

  const clearFilters = () => {
    setSearchQuery("")
    setMinSalary(0)
    setSelectedWorkModes([])
    setSortBy("match")
    setShowUrgent(false)
  }

  return (
    <PageTransition className="min-h-screen">
      <AsymmetricalBackground />
      <AppNav />

      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Browse Jobs</h1>

          {/* Mobile Filter Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="default" className="lg:hidden h-11">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[85vw] sm:w-[450px] overflow-y-auto px-4 py-6 sm:px-6">
              <SheetTitle className="text-xl font-bold mb-6">Job Filters</SheetTitle>
              <div className="space-y-6">
                <JobFilters
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  salaryRange={[minSalary, 200000]}
                  onSalaryChange={(val) => setMinSalary(val[0])}
                  selectedWorkModes={selectedWorkModes}
                  onWorkModeChange={toggleWorkMode}
                  onClearFilters={clearFilters}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                  showUrgent={showUrgent}
                  onUrgentChange={setShowUrgent}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Sidebar Filters - Hidden on Mobile */}
          <div className="hidden lg:block lg:col-span-1 space-y-6">
            <h2 className="text-xl font-bold px-1">Job Filters</h2>
            <GlassCard intensity="light" className="p-5">
              <JobFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                salaryRange={[minSalary, 200000]}
                onSalaryChange={(val) => setMinSalary(val[0])}
                selectedWorkModes={selectedWorkModes}
                onWorkModeChange={toggleWorkMode}
                onClearFilters={clearFilters}
                sortBy={sortBy}
                onSortChange={setSortBy}
                showUrgent={showUrgent}
                onUrgentChange={setShowUrgent}
              />
            </GlassCard>

            {/* Teaser Radar - Removed as requested */}
          </div>

          {/* Main Job List */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-xl md:text-2xl font-bold">
                {isLoading ? "Loading..." : `${filteredJobs.length} Recommended Jobs`}
              </h1>
            </div>

            {isLoading ? (
              <div className="grid md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map(i => (
                  <JobCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredJobs.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-4">
                {filteredJobs.map(job => (
                  <JobCard key={job.id} job={job} matchScore={job.matchScore} />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={SearchX}
                title="No jobs found"
                description="Try adjusting your filters or search query to find more opportunities."
                action={
                  <Button variant="outline" onClick={clearFilters} className="mt-4">
                    Clear Filters
                  </Button>
                }
              />
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
