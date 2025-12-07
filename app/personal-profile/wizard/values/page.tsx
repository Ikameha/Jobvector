"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ValueCard } from "@/components/profile/ValueCard"
import { VALUE_OPTIONS } from "@/data/profile/values"
import { ArrowRight } from "lucide-react"
import { markStepCompleted, addXp } from "@/lib/profileProgress"

export default function ValuesQuizPage() {
  const router = useRouter()
  const [selected, setSelected] = useState<string[]>([])

  const handleToggle = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]))
  }

  const handleContinue = () => {
    localStorage.setItem("profile_quiz_values", JSON.stringify(selected))

    markStepCompleted("values")
    addXp(50)

    router.push("/personal-profile/wizard/skills")
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Values Selector</h1>
        <p className="text-muted-foreground">Select all the values that matter to you in a workplace</p>
      </div>

      <div className="grid gap-4 max-w-2xl mx-auto">
        {VALUE_OPTIONS.map((value) => (
          <ValueCard key={value.id} value={value} selected={selected.includes(value.id)} onToggle={handleToggle} />
        ))}
      </div>

      <div className="flex justify-center pt-4">
        <Button size="lg" onClick={handleContinue} disabled={selected.length === 0} className="gap-2">
          Continue
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
