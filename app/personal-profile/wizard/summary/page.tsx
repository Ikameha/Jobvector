"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { saveProfile } from "@/lib/storage"
import type { Profile, WorkMode } from "@/lib/types"
import { CheckCircle2, MapPin, Heart, Code, Sparkles } from "lucide-react"
import { markStepCompleted, addXp, unlockBadge, markWizardCompleted } from "@/lib/profileProgress"

export default function SummaryPage() {
  const router = useRouter()
  const [summary, setSummary] = useState<{
    workMode: WorkMode
    locations: string[]
    values: string[]
    masteredSkills: string[]
    learningSkills: string[]
  } | null>(null)

  useEffect(() => {
    // Read quiz data from localStorage
    const locationAnswers = JSON.parse(localStorage.getItem("profile_quiz_location") || "[]")
    const values = JSON.parse(localStorage.getItem("profile_quiz_values") || "[]")
    const skillsLevels = JSON.parse(localStorage.getItem("profile_quiz_skills") || "{}")

    // Build summary
    const masteredSkills = Object.keys(skillsLevels).filter((s) => skillsLevels[s] === "mastered")
    const learningSkills = Object.keys(skillsLevels).filter((s) => skillsLevels[s] === "learning")
    const preferredLocations = locationAnswers.filter((a: any) => a.score > 0).map((a: any) => a.label)

    // Determine work mode based on highest scored location
    const topLocation = locationAnswers.reduce((max: any, a: any) => (a.score > max.score ? a : max), {
      score: 0,
      workMode: "hybrid",
    })

    setSummary({
      workMode: topLocation.workMode || "hybrid",
      locations: preferredLocations,
      values,
      masteredSkills,
      learningSkills,
    })
  }, [])

  const handleFinish = () => {
    if (!summary) return

    const profile: Profile = {
      id: `profile-${Date.now()}`,
      userId: "user-1", // Mock user ID
      name: "My Profile",
      skills: summary.masteredSkills,
      experienceLevel: "mid", // Default, can be enhanced later
      yearsOfExperience: 3, // Default
      locationPreferences: summary.locations,
      workModePreferences: [summary.workMode],
      salaryMin: 50000, // Defaults
      salaryMax: 120000,
      companyTypePreferences: ["startup", "scaleup"],
      culturalValues: summary.values,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    saveProfile(profile)

    markStepCompleted("summary")
    addXp(100)

    const locationAnswers = JSON.parse(localStorage.getItem("profile_quiz_location") || "[]")
    const remoteCount = locationAnswers.filter((a: any) => a.workMode === "remote" && a.score > 0).length

    if (remoteCount >= 2) {
      unlockBadge("location_explorer")
    }

    if (summary.values.length >= 3) {
      unlockBadge("values_driven")
    }

    if (summary.masteredSkills.length >= 3) {
      unlockBadge("skillful")
    }

    // Mark wizard as permanently completed
    markWizardCompleted()

    // Unlock completion badge
    unlockBadge("profile_complete")

    // Clear quiz data
    localStorage.removeItem("profile_quiz_location")
    localStorage.removeItem("profile_quiz_values")
    localStorage.removeItem("profile_quiz_skills")

    router.push("/dashboard")
  }

  if (!summary) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loading summary...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="h-16 w-16 rounded-2xl bg-green-500/10 flex items-center justify-center">
            <CheckCircle2 className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-foreground">Your Profile Summary</h1>
        <p className="text-muted-foreground">Here's what we learned about your ideal job</p>
      </div>

      <div className="grid gap-6 max-w-2xl mx-auto">
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <MapPin className="h-5 w-5 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Work Preferences</h3>
          </div>
          <div className="space-y-3 pl-13">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Work Mode</p>
              <Badge variant="secondary" className="text-sm">
                {summary.workMode.toUpperCase()}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Preferred Locations</p>
              <div className="flex flex-wrap gap-2">
                {summary.locations.map((loc) => (
                  <Badge key={loc} variant="outline">
                    {loc}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Heart className="h-5 w-5 text-purple-500" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Cultural Values</h3>
          </div>
          <div className="flex flex-wrap gap-2 pl-13">
            {summary.values.map((value) => (
              <Badge key={value} variant="secondary">
                {value}
              </Badge>
            ))}
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-teal-500/10 flex items-center justify-center">
              <Code className="h-5 w-5 text-teal-500" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Skills</h3>
          </div>
          <div className="space-y-3 pl-13">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Mastered</p>
              <div className="flex flex-wrap gap-2">
                {summary.masteredSkills.map((skill) => (
                  <Badge key={skill} className="bg-green-500/10 text-green-700 dark:text-green-400">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            {summary.learningSkills.length > 0 && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Learning</p>
                <div className="flex flex-wrap gap-2">
                  {summary.learningSkills.map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>

      <div className="flex justify-center pt-4">
        <Button size="lg" onClick={handleFinish} className="gap-2">
          <Sparkles className="h-4 w-4" />
          Save Profile & See My Matches
        </Button>
      </div>
    </div>
  )
}
