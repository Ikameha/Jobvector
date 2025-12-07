"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { SkillTag } from "@/components/profile/SkillTag"
import { SKILL_OPTIONS } from "@/data/profile/skills"
import { ArrowRight } from "lucide-react"
import { markStepCompleted, addXp } from "@/lib/profileProgress"

export default function SkillsQuizPage() {
  const router = useRouter()
  const [levels, setLevels] = useState<Record<string, "mastered" | "learning" | "ignore">>(() => {
    const initial: Record<string, "mastered" | "learning" | "ignore"> = {}
    SKILL_OPTIONS.forEach((skill) => {
      initial[skill] = "ignore"
    })
    return initial
  })

  const handleChange = (skill: string, level: "mastered" | "learning" | "ignore") => {
    setLevels((prev) => ({ ...prev, [skill]: level }))
  }

  const handleContinue = () => {
    localStorage.setItem("profile_quiz_skills", JSON.stringify(levels))

    markStepCompleted("skills")
    addXp(50)

    router.push("/personal-profile/wizard/summary")
  }

  const hasSelectedSkills = Object.values(levels).some((l) => l !== "ignore")

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Skills Rater</h1>
        <p className="text-muted-foreground">Rate your proficiency level for each skill</p>
      </div>

      <div className="grid gap-3 max-w-2xl mx-auto">
        {SKILL_OPTIONS.map((skill) => (
          <SkillTag key={skill} skill={skill} level={levels[skill]} onChange={handleChange} />
        ))}
      </div>

      <div className="flex justify-center pt-4">
        <Button size="lg" onClick={handleContinue} disabled={!hasSelectedSkills} className="gap-2">
          Continue
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
