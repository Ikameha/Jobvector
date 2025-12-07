"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Zap } from "lucide-react"
import { loadProfileProgress, getCompletionPercent, BADGE_LABELS, type ProfileProgress } from "@/lib/profileProgress"

interface ProfileProgressProps {
  variant?: "full" | "compact"
}

export function ProfileProgressComponent({ variant = "full" }: ProfileProgressProps) {
  const [progress, setProgress] = useState<ProfileProgress | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setProgress(loadProfileProgress())
  }, [])

  if (!mounted || !progress) {
    return null
  }

  const completionPercent = getCompletionPercent(progress)

  if (variant === "compact") {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-semibold text-foreground">{completionPercent}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-teal-500 transition-all duration-500"
            style={{ width: `${completionPercent}%` }}
          />
        </div>
      </div>
    )
  }

  return (
    <Card className="p-6 space-y-4 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-teal-500/5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Profile Completion</h3>
          <p className="text-sm text-muted-foreground">Build your profile to unlock better matches</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-primary">{completionPercent}%</div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Zap className="h-3 w-3 text-yellow-500" />
            <span>{progress.xp} XP</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-teal-500 to-purple-500 transition-all duration-500"
            style={{ width: `${completionPercent}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{progress.completedSteps.length} of 4 steps complete</span>
          <span>
            {progress.completedSteps.includes("location") && "✓ Location "}
            {progress.completedSteps.includes("values") && "✓ Values "}
            {progress.completedSteps.includes("skills") && "✓ Skills "}
            {progress.completedSteps.includes("summary") && "✓ Summary"}
          </span>
        </div>
      </div>

      {/* Badges */}
      {progress.badges.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-border">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Trophy className="h-4 w-4 text-yellow-500" />
            <span>Unlocked Badges</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {progress.badges.map((badgeId) => (
              <Badge key={badgeId} variant="secondary" className="gap-1">
                <Trophy className="h-3 w-3" />
                {BADGE_LABELS[badgeId] || badgeId}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}
