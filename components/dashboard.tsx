"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import type { JobAnalysis, Profile } from "@/lib/types"
import { loadJobAnalyses, loadProfile, deleteJobAnalysis } from "@/lib/storage"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, DollarSign, Building2, TrendingUp, Trash2, Briefcase, Target, Award } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function Dashboard() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [analyses, setAnalyses] = useState<JobAnalysis[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = () => {
      // Load profile
      const existingProfile = loadProfile()
      if (!existingProfile) {
        router.push("/personal-profile")
        return
      }
      setProfile(existingProfile)

      // Load saved analyses
      const savedAnalyses = loadJobAnalyses()
      // Sort by analyzed date (most recent first)
      savedAnalyses.sort((a, b) => new Date(b.analyzedAt).getTime() - new Date(a.analyzedAt).getTime())
      setAnalyses(savedAnalyses)

      setIsLoading(false)
    }

    loadData()
  }, [router])

  const handleDelete = (analysisId: string) => {
    deleteJobAnalysis(analysisId)
    setAnalyses(analyses.filter((a) => a.id !== analysisId))
  }

  const getScoreColor = (score: number) => {
    if (score >= 75) return "text-emerald-600 dark:text-emerald-400"
    if (score >= 60) return "text-blue-600 dark:text-blue-400"
    if (score >= 40) return "text-amber-600 dark:text-amber-400"
    return "text-muted-foreground"
  }

  const getScoreBg = (score: number) => {
    if (score >= 75) return "bg-emerald-500/10 border-emerald-500/20"
    if (score >= 60) return "bg-blue-500/10 border-blue-500/20"
    if (score >= 40) return "bg-amber-500/10 border-amber-500/20"
    return "bg-muted"
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  if (isLoading) {
    return (
      <div className="container max-w-6xl mx-auto py-12 px-4">
        <div className="flex items-center justify-center h-64">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto" />
            <p className="text-muted-foreground">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-1">
              Dashboard
            </h1>
            <p className="text-muted-foreground">
              {profile && (
                <span className="flex items-center gap-2 mt-1">
                  Track and manage your job search for {profile.name}
                </span>
              )}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.push("/personal-profile")}>
              Edit Profile
            </Button>
            <Button onClick={() => router.push("/jobs")}>Browse Jobs</Button>
          </div>
        </div>
      </div>

      {analyses.length === 0 ? (
        <Card className="border-2">
          <CardContent className="py-16 text-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 mx-auto mb-6 flex items-center justify-center">
              <Briefcase className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">Start Your Job Search</h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Browse jobs and save the ones you're interested in to track your match scores and analyze opportunities.
            </p>
            <Button onClick={() => router.push("/jobs")} size="lg" className="gap-2">
              <TrendingUp className="w-4 h-4" />
              Browse Jobs
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="border-2">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Saved Jobs</CardTitle>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{analyses.length}</p>
                <p className="text-xs text-muted-foreground mt-1">opportunities tracked</p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Best Match</CardTitle>
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <Award className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p
                  className={`text-3xl font-bold ${getScoreColor(Math.max(...analyses.map((a) => a.matchScore.overall)))}`}
                >
                  {Math.max(...analyses.map((a) => a.matchScore.overall))}%
                </p>
                <p className="text-xs text-muted-foreground mt-1">highest compatibility score</p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Average Match</CardTitle>
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p
                  className={`text-3xl font-bold ${getScoreColor(Math.round(analyses.reduce((acc, a) => acc + a.matchScore.overall, 0) / analyses.length))}`}
                >
                  {Math.round(analyses.reduce((acc, a) => acc + a.matchScore.overall, 0) / analyses.length)}%
                </p>
                <p className="text-xs text-muted-foreground mt-1">across all opportunities</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Your Saved Jobs</h2>
              <p className="text-sm text-muted-foreground">
                {analyses.length} {analyses.length === 1 ? "job" : "jobs"}
              </p>
            </div>

            {analyses.map((analysis) => (
              <Card key={analysis.id} className="hover:border-primary/50 hover:shadow-md transition-all group">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className="flex-1 min-w-0 cursor-pointer"
                      onClick={() => router.push(`/jobs/${analysis.jobId}`)}
                    >
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                          {analysis.job.title}
                        </CardTitle>
                        <div
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${getScoreBg(analysis.matchScore.overall)}`}
                        >
                          <TrendingUp className={`w-4 h-4 ${getScoreColor(analysis.matchScore.overall)}`} />
                          <span className={`text-sm font-semibold ${getScoreColor(analysis.matchScore.overall)}`}>
                            {analysis.matchScore.overall}% Match
                          </span>
                        </div>
                      </div>
                      <CardDescription className="flex items-center gap-4 flex-wrap text-sm">
                        <span className="flex items-center gap-1.5 font-medium">
                          <Building2 className="w-4 h-4" />
                          {analysis.job.company}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4" />
                          {analysis.job.location} • {analysis.job.workMode}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <DollarSign className="w-4 h-4" />${analysis.job.salaryMin.toLocaleString()} - $
                          {analysis.job.salaryMax.toLocaleString()}
                        </span>
                      </CardDescription>
                    </div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="shrink-0 hover:bg-destructive/10 hover:text-destructive"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Remove saved job?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will remove "{analysis.job.title}" at {analysis.job.company} from your saved jobs. This
                            action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(analysis.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Remove
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardHeader>
                <CardContent onClick={() => router.push(`/jobs/${analysis.jobId}`)} className="cursor-pointer">
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
                    {analysis.job.description}
                  </p>

                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                        Required Skills
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {analysis.job.requiredSkills.slice(0, 8).map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs font-normal">
                            {skill}
                          </Badge>
                        ))}
                        {analysis.job.requiredSkills.length > 8 && (
                          <Badge variant="outline" className="text-xs">
                            +{analysis.job.requiredSkills.length - 8}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-1.5">
                          <span className="text-muted-foreground font-medium">Skills:</span>
                          <span className={`font-semibold ${getScoreColor(analysis.matchScore.skillsFit)}`}>
                            {analysis.matchScore.skillsFit}%
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-muted-foreground font-medium">Experience:</span>
                          <span className={`font-semibold ${getScoreColor(analysis.matchScore.experienceFit)}`}>
                            {analysis.matchScore.experienceFit}%
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-muted-foreground font-medium">Location:</span>
                          <span className={`font-semibold ${getScoreColor(analysis.matchScore.locationFit)}`}>
                            {analysis.matchScore.locationFit}%
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-muted-foreground font-medium">Culture:</span>
                          <span className={`font-semibold ${getScoreColor(analysis.matchScore.cultureFit)}`}>
                            {analysis.matchScore.cultureFit}%
                          </span>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">Saved {formatDate(analysis.analyzedAt)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
