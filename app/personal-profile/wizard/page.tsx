"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Sparkles, MapPin, Heart, Code } from "lucide-react"

export default function WizardIntroPage() {
  const router = useRouter()

  return (
    <div className="space-y-8 text-center">
      <div className="space-y-4">
        <div className="flex justify-center">
          <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-foreground">Build Your Profile</h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Answer 3 quick questionnaires to help us understand your ideal job and match you with the best opportunities.
        </p>
      </div>

      <div className="grid gap-4 text-left max-w-2xl mx-auto">
        <Card className="p-6 flex gap-4 items-start">
          <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
            <MapPin className="h-5 w-5 text-blue-500" />
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-foreground">1. Location Explorer</h3>
            <p className="text-sm text-muted-foreground">Discover your preferred work locations and modes</p>
          </div>
        </Card>

        <Card className="p-6 flex gap-4 items-start">
          <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
            <Heart className="h-5 w-5 text-purple-500" />
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-foreground">2. Values Selector</h3>
            <p className="text-sm text-muted-foreground">Choose what matters most to you in a workplace</p>
          </div>
        </Card>

        <Card className="p-6 flex gap-4 items-start">
          <div className="h-10 w-10 rounded-lg bg-teal-500/10 flex items-center justify-center shrink-0">
            <Code className="h-5 w-5 text-teal-500" />
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-foreground">3. Skills Rater</h3>
            <p className="text-sm text-muted-foreground">Rate your technical skills and what you're learning</p>
          </div>
        </Card>
      </div>

      <div className="pt-4">
        <Button size="lg" onClick={() => router.push("/personal-profile/wizard/location")} className="gap-2">
          <Sparkles className="h-4 w-4" />
          Start the Quiz
        </Button>
      </div>
    </div>
  )
}
