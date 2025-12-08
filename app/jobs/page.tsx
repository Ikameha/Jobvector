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
import { SearchX } from "lucide-react"
import { Button } from "@/components/ui/button"

interface JobWithScore extends Job {
  matchScore?: MatchScore
}

export default function JobsPage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [jobs, setJobs] = useState<JobWithScore[]>([])
  const [filteredJobs, setFilteredJobs] = useState<JobWithScore[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Filters
  const [searchQuery, setSearchQuery] = useState("")
  const [minSalary, setMinSalary] = useState(0)
  const [selectedWorkModes, setSelectedWorkModes] = useState<string[]>([])

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
        })).sort((a, b) => (b.matchScore?.overall || 0) - (a.matchScore?.overall || 0))
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

    setFilteredJobs(result)
  }, [searchQuery, minSalary, selectedWorkModes, jobs])

  const toggleWorkMode = (mode: string) => {
    setSelectedWorkModes(prev =>
      prev.includes(mode) ? prev.filter(m => m !== mode) : [...prev, mode]
    )
  }

  const clearFilters = () => {
    setSearchQuery("")
    setMinSalary(0)
    setSelectedWorkModes([])
  }

  return (
    <div className="min-h-screen bg-background">
      <AppNav />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1 space-y-6">
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
              />
            </GlassCard>

            {/* Teaser Radar */}
            <div className="hidden lg:block pt-4">
              <ProfileRadarChart />
            </div>
          </div>

          {/* Main Job List */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl font-bold">
                {isLoading ? "Loading..." : `${filteredJobs.length} Recommended Jobs`}
              </h1>
              {profile && <span className="text-sm text-green-500 font-medium">Sorted by match score</span>}
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
    </div>
  )
}
