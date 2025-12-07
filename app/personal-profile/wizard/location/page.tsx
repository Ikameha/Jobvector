"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LocationCard } from "@/components/profile/LocationCard"
import { LOCATION_QUIZ_OPTIONS } from "@/data/profile/location"
import { markStepCompleted, addXp } from "@/lib/profileProgress"

interface LocationAnswer {
  id: string
  label: string
  workMode: "remote" | "hybrid" | "onsite"
  score: number
}

export default function LocationQuizPage() {
  const router = useRouter()
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<LocationAnswer[]>([])

  const handleSelect = (score: number) => {
    const option = LOCATION_QUIZ_OPTIONS[index]
    const newAnswer: LocationAnswer = {
      id: option.id,
      label: option.label,
      workMode: option.workMode,
      score,
    }

    const updatedAnswers = [...answers, newAnswer]
    setAnswers(updatedAnswers)

    if (index === LOCATION_QUIZ_OPTIONS.length - 1) {
      // Save to localStorage and proceed to next quiz
      localStorage.setItem("profile_quiz_location", JSON.stringify(updatedAnswers))

      markStepCompleted("location")
      addXp(50)

      router.push("/personal-profile/wizard/values")
    } else {
      setIndex(index + 1)
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Location Explorer</h1>
        <p className="text-muted-foreground">How do you feel about each of these work locations?</p>
      </div>

      <LocationCard
        option={LOCATION_QUIZ_OPTIONS[index]}
        index={index}
        total={LOCATION_QUIZ_OPTIONS.length}
        onSelect={handleSelect}
      />
    </div>
  )
}
