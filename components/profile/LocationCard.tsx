"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ThumbsDown, Heart, ThumbsUp } from "lucide-react"
import type { LocationOption } from "@/data/profile/location"

interface LocationCardProps {
  option: LocationOption
  index: number
  total: number
  onSelect: (score: number) => void
}

export function LocationCard({ option, index, total, onSelect }: LocationCardProps) {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <p className="text-sm text-muted-foreground font-medium">
          Step {index + 1} of {total}
        </p>
        <div className="flex gap-1 justify-center">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 w-12 rounded-full transition-colors ${i <= index ? "bg-primary" : "bg-muted"}`}
            />
          ))}
        </div>
      </div>

      <Card className="p-8 bg-card border-2">
        <div className="space-y-6 text-center">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-foreground">{option.label}</h2>
            <p className="text-sm text-muted-foreground uppercase tracking-wide">{option.workMode}</p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={() => onSelect(0)} variant="outline" size="lg" className="gap-2 flex-1 sm:flex-initial">
              <ThumbsDown className="h-4 w-4" />
              Nope
            </Button>
            <Button
              onClick={() => onSelect(1)}
              variant="outline"
              size="lg"
              className="gap-2 flex-1 sm:flex-initial border-primary/50 hover:bg-primary/10"
            >
              <ThumbsUp className="h-4 w-4" />
              Like
            </Button>
            <Button
              onClick={() => onSelect(3)}
              variant="default"
              size="lg"
              className="gap-2 flex-1 sm:flex-initial bg-primary hover:bg-primary/90"
            >
              <Heart className="h-4 w-4" />
              Love
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
