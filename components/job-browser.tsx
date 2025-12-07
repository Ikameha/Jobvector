"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import type { Job, Profile, MatchScore } from "@/lib/types"
import { fetchJobs } from "@/lib/jobApi"
import { loadProfile } from "@/lib/storage"
import { calculateMatchScore } from "@/lib/matchingEngine"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, DollarSign, Building2, TrendingUp, Sparkles } from "lucide-react"

interface JobWithScore extends Job {
  matchScore?: MatchScore
}

export default function JobBrowser() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [jobs, setJobs] = useState<JobWithScore[]>([])
  const [filteredJobs, setFilteredJobs] = useState<JobWithScore[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      // Load profile
      const existingProfile = loadProfile()
      if (!existingProfile) {
        router.push("/personal-profile")
        return
      }
      setProfile(existingProfile)

      // Load jobs
      const fetchedJobs = await fetchJobs()

      // Calculate match scores for each job
      const jobsWithScores = fetchedJobs.map((job) => ({
        ...job,
        matchScore: calculateMatchScore(existingProfile, job),
      }))

      // Sort by match score (highest first)
      jobsWithScores.sort((a, b) => (b.matchScore?.overall || 0) - (a.matchScore?.overall || 0))

      setJobs(jobsWithScores)
      setFilteredJobs(jobsWithScores)
      setIsLoading(false)
    }

    loadData()
  }, [router])

  const handleSearch = async () => {
    if (!profile) return

    setIsLoading(true)
    const fetchedJobs = await fetchJobs(searchQuery)

    const jobsWithScores = fetchedJobs.map((job) => ({
      ...job,
      matchScore: calculateMatchScore(profile, job),
    }))

    jobsWithScores.sort((a, b) => (b.matchScore?.overall || 0) - (a.matchScore?.overall || 0))

    setFilteredJobs(jobsWithScores)
    setIsLoading(false)
  }

  const handleClearSearch = async () => {
    setSearchQuery("")
    setFilteredJobs(jobs)
  }

  const getScoreColor = (score: number) => {
    if (score >= 75) return "text-emerald-600 dark:text-emerald-400"
    if (score >= 60) return "text-blue-600 dark:text-blue-400"
    if (score >= 40) return "text-amber-600 dark:text-amber-400"
    return "text-muted-foreground"
  }

  const getScoreBadgeVariant = (score: number): "default" | "secondary" | "outline" => {
    if (score >= 75) return "default"
    if (score >= 60) return "secondary"
    return "outline"
  }

  const getScoreBg = (score: number) => {
    if (score >= 75) return "bg-emerald-500/10 border-emerald-500/20"
    if (score >= 60) return "bg-blue-500/10 border-blue-500/20"
    if (score >= 40) return "bg-amber-500/10 border-amber-500/20"
    return "bg-muted"
  }

  if (isLoading) {
    return (
      <div className="container max-w-6xl mx-auto py-12 px-4">
        <div className="flex items-center justify-center h-64">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto" />
            <p className="text-muted-foreground">Finding your perfect matches...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-1">
              Discover Jobs
            </h1>
            <p className="text-muted-foreground">
              {profile && (
                <span className="flex items-center gap-2 mt-1">
                  <Sparkles className="w-4 h-4" />
                  Personalized matches for {profile.name}
                </span>
              )}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.push("/personal-profile")}>
              Edit Profile
            </Button>
            <Button variant="outline" onClick={() => router.push("/dashboard")}>
              Dashboard
            </Button>
          </div>
        </div>

        <Card className="border-2">
          <CardContent className="pt-6">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search by title, company, skills, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="pl-10 h-11"
                />
              </div>
              <Button onClick={handleSearch} size="lg" className="px-6">
                Search
              </Button>
              {searchQuery && (
                <Button variant="outline" onClick={handleClearSearch} size="lg">
                  Clear
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {filteredJobs.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or check back later for new opportunities.
            </p>
            <Button variant="outline" onClick={handleClearSearch}>
              View All Jobs
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              {filteredJobs.length} {filteredJobs.length === 1 ? "job" : "jobs"} found
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
            {filteredJobs[0]?.matchScore && (
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Sorted by best match</span>
              </div>
            )}
          </div>

          {filteredJobs.map((job) => (
            <Card
              key={job.id}
              className="hover:border-primary/50 hover:shadow-md transition-all cursor-pointer group"
              onClick={() => router.push(`/jobs/${job.id}`)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">{job.title}</CardTitle>
                      {job.matchScore && (
                        <div
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${getScoreBg(job.matchScore.overall)}`}
                        >
                          <TrendingUp className={`w-4 h-4 ${getScoreColor(job.matchScore.overall)}`} />
                          <span className={`text-sm font-semibold ${getScoreColor(job.matchScore.overall)}`}>
                            {job.matchScore.overall}% Match
                          </span>
                        </div>
                      )}
                    </div>
                    <CardDescription className="flex items-center gap-4 flex-wrap text-sm">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Building2 className="w-4 h-4" />
                        {job.company}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        {job.location} • {job.workMode}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <DollarSign className="w-4 h-4" />${job.salaryMin.toLocaleString()} - $
                        {job.salaryMax.toLocaleString()}
                      </span>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">{job.description}</p>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                      Required Skills
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {job.requiredSkills.slice(0, 8).map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs font-normal">
                          {skill}
                        </Badge>
                      ))}
                      {job.requiredSkills.length > 8 && (
                        <Badge variant="outline" className="text-xs">
                          +{job.requiredSkills.length - 8}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {job.matchScore && (
                    <div className="flex items-center gap-6 text-sm pt-3 border-t">
                      <div className="flex items-center gap-1.5">
                        <span className="text-muted-foreground font-medium">Skills:</span>
                        <span className={`font-semibold ${getScoreColor(job.matchScore.skillsFit)}`}>
                          {job.matchScore.skillsFit}%
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-muted-foreground font-medium">Experience:</span>
                        <span className={`font-semibold ${getScoreColor(job.matchScore.experienceFit)}`}>
                          {job.matchScore.experienceFit}%
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-muted-foreground font-medium">Location:</span>
                        <span className={`font-semibold ${getScoreColor(job.matchScore.locationFit)}`}>
                          {job.matchScore.locationFit}%
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-muted-foreground font-medium">Salary:</span>
                        <span className={`font-semibold ${getScoreColor(job.matchScore.salaryFit)}`}>
                          {job.matchScore.salaryFit}%
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
