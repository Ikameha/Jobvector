"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import type { Job, Profile, JobAnalysis, MatchScore, MatchExplanation } from "@/lib/types"
import { fetchJobById } from "@/lib/jobApi"
import { loadProfile, isJobSaved, toggleSavedJob } from "@/lib/storage"
import { calculateMatchScore, generateMatchExplanation } from "@/lib/matchingEngine"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { GlassCard } from "@/components/ui/glass-card"
import { PageTransition } from "@/components/ui/page-transition"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Building2,
  MapPin,
  DollarSign,
  Briefcase,
  Clock,
  Heart,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Info,
  XCircle,
  Sparkles
} from "lucide-react"

interface JobDetailProps {
  jobId: string
}

export default function JobDetail({ jobId }: JobDetailProps) {
  const router = useRouter()
  const [job, setJob] = useState<Job | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [matchScore, setMatchScore] = useState<MatchScore | null>(null)
  const [matchExplanation, setMatchExplanation] = useState<MatchExplanation | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      // Load profile
      const existingProfile = loadProfile()
      if (!existingProfile) {
        router.push("/personal-profile")
        return
      }
      setProfile(existingProfile)

      // Load job
      const fetchedJob = await fetchJobById(jobId)
      if (!fetchedJob) {
        router.push("/jobs")
        return
      }
      setJob(fetchedJob)

      // Calculate match
      const score = calculateMatchScore(existingProfile, fetchedJob)
      const explanation = generateMatchExplanation(existingProfile, fetchedJob, score)
      setMatchScore(score)
      setMatchExplanation(explanation)

      // Check if already saved
      setIsSaved(isJobSaved(jobId))

      setIsLoading(false)
    }

    loadData()
  }, [jobId, router])

  const handleToggleSave = () => {
    if (!job) return
    const newState = toggleSavedJob(job.id)
    setIsSaved(newState)
  }

  const getScoreColor = (score: number) => {
    if (score >= 75) return "text-green-500 shadow-green-500/20"
    if (score >= 60) return "text-blue-500 shadow-blue-500/20"
    if (score >= 40) return "text-yellow-500 shadow-yellow-500/20"
    return "text-red-500 shadow-red-500/20"
  }

  const getScoreIcon = (score: number) => {
    if (score >= 75) return <CheckCircle2 className="w-5 h-5 text-green-500" />
    if (score >= 60) return <Info className="w-5 h-5 text-blue-500" />
    return <AlertCircle className="w-5 h-5 text-yellow-500" />
  }

  if (isLoading) {
    return (
      <div className="container max-w-5xl mx-auto py-12 px-4">
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground animate-pulse">Analyzing match potential...</p>
        </div>
      </div>
    )
  }

  if (!job || !matchScore || !matchExplanation || !profile) {
    return (
      <div className="container max-w-5xl mx-auto py-12 px-4">
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Job not found</p>
        </div>
      </div>
    )
  }

  // Calculate gaps for display
  const matchingSkills = job.requiredSkills.filter(skill =>
    profile.skills.some(ps => ps.toLowerCase() === skill.toLowerCase())
  )
  const missingSkills = job.requiredSkills.filter(skill =>
    !profile.skills.some(ps => ps.toLowerCase() === skill.toLowerCase())
  )

  // ... inside render

  return (
    <PageTransition className="container max-w-5xl mx-auto py-8 px-4">
      {/* Navigation & Header */}
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.push("/jobs")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold tracking-tight">Match Analysis</h1>
          <p className="text-muted-foreground text-sm">AI-driven insights for your compatibility</p>
        </div>
        <Button onClick={handleToggleSave} variant={isSaved ? "outline" : "neon"}>
          <Heart className={`w-4 h-4 mr-2 ${isSaved ? "fill-current" : ""}`} />
          {isSaved ? "Saved" : "Save Job"}
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column: Job Info & Overall Match */}
        <div className="lg:col-span-2 space-y-6">
          {/* Job Header Card */}
          <GlassCard intensity="medium" className="p-6">
            <div className="flex justify-between items-start gap-4">
              <div>
                <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1.5">
                    <Building2 className="w-4 h-4" />
                    {job.company}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    {job.location} ({job.workMode})
                  </div>
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4" />
                    ${(job.salaryMin / 1000).toFixed(0)}k - ${(job.salaryMax / 1000).toFixed(0)}k
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline">{job.employmentType}</Badge>
                  <Badge variant="outline">{job.experienceLevel}</Badge>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className={`relative flex items-center justify-center w-20 h-20 rounded-full border-4 text-2xl font-bold bg-background/50 backdrop-blur-sm ${getScoreColor(matchScore.overall)}`}
                >
                  <AnimatedCounter end={matchScore.overall} suffix="%" />
                </motion.div>
                <span className="text-xs font-semibold mt-1">Match Score</span>
              </div>
            </div>
          </GlassCard>

          {/* Analysis Breakdown */}
          <GlassCard intensity="light" className="p-6">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Detailed Breakdown
            </h3>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } }
              }}
              className="space-y-6"
            >
              {/* Skills Fit */}
              <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium flex items-center gap-2">
                    {getScoreIcon(matchScore.skillsFit)} Skills Compatibility
                  </span>
                  <span className="font-bold">{matchScore.skillsFit}%</span>
                </div>
                <Progress value={matchScore.skillsFit} className="h-2 mb-2" />
                <p className="text-sm text-muted-foreground">{matchExplanation.skillsFit}</p>
              </motion.div>

              {/* Experience Fit */}
              <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium flex items-center gap-2">
                    {getScoreIcon(matchScore.experienceFit)} Experience Level
                  </span>
                  <span className="font-bold">{matchScore.experienceFit}%</span>
                </div>
                <Progress value={matchScore.experienceFit} className="h-2 mb-2" />
                <p className="text-sm text-muted-foreground">{matchExplanation.experienceFit}</p>
              </motion.div>

              {/* Location & Work Mode */}
              <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium flex items-center gap-2">
                    {getScoreIcon(matchScore.locationFit)} Location & Work Mode
                  </span>
                  <span className="font-bold">{matchScore.locationFit}%</span>
                </div>
                <Progress value={matchScore.locationFit} className="h-2 mb-2" />
                <p className="text-sm text-muted-foreground">{matchExplanation.locationFit}</p>
              </motion.div>
            </motion.div>
          </GlassCard>

          {/* Job Description */}
          <GlassCard intensity="light" className="p-6">
            <h3 className="text-lg font-semibold mb-4">Description</h3>
            <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
              {job.description}
            </p>
          </GlassCard>
        </div>

        {/* Right Column: Strengths & Gaps */}
        <div className="space-y-6">
          {/* Strengths */}
          <GlassCard className="p-6 border-l-4 border-l-green-500">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              Why You Match
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs uppercase text-muted-foreground font-semibold mb-2">Matching Skills</p>
                <div className="flex flex-wrap gap-1.5">
                  {matchingSkills.length > 0 ? matchingSkills.map(skill => (
                    <Badge key={skill} className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20">
                      {skill}
                    </Badge>
                  )) : <p className="text-sm text-muted-foreground italic">No direct skill matches found</p>}
                </div>
              </div>
              {matchScore.cultureFit >= 70 && (
                <div className="pt-2">
                  <p className="text-xs uppercase text-muted-foreground font-semibold mb-1">Culture Fit</p>
                  <p className="text-sm text-green-500 font-medium">Strong values alignment</p>
                </div>
              )}
            </div>
          </GlassCard>

          {/* Gaps */}
          <GlassCard className="p-6 border-l-4 border-l-orange-500">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-500" />
              Missing Requirements
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs uppercase text-muted-foreground font-semibold mb-2">Missing Skills</p>
                <div className="flex flex-wrap gap-1.5">
                  {missingSkills.length > 0 ? missingSkills.map(skill => (
                    <Badge key={skill} variant="outline" className="text-muted-foreground border-orange-500/20">
                      {skill}
                    </Badge>
                  )) : <p className="text-sm text-muted-foreground italic">You have all required skills!</p>}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                *Consider adding these to your learning path to improve your match score.
              </p>
            </div>
          </GlassCard>

          {/* Action */}
          <GlassCard intensity="light" className="p-6 text-center">
            <h3 className="font-semibold mb-2">Ready to Apply?</h3>
            <p className="text-sm text-muted-foreground mb-4">You're a great fit for this role!</p>
            <Button className="w-full" size="lg">Apply Now</Button>
          </GlassCard>
        </div>
      </div>
    </PageTransition>
  )
}
