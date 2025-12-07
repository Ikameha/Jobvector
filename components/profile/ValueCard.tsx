"use client"

import { Card } from "@/components/ui/card"
import { Check } from "lucide-react"
import type { ValueOption } from "@/data/profile/values"

interface ValueCardProps {
  value: ValueOption
  selected: boolean
  onToggle: (id: string) => void
}

export function ValueCard({ value, selected, onToggle }: ValueCardProps) {
  return (
    <Card
      className={`p-6 cursor-pointer transition-all hover:shadow-lg ${selected
          ? "border-2 border-primary bg-primary/10 ring-2 ring-primary/20"
          : "border border-muted bg-card hover:border-primary/50"
        }`}
      onClick={() => onToggle(value.id)}
    >
      <div className="flex items-start gap-4">
        <div
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${selected ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/30"
            }`}
        >
          {selected && <Check className="h-4 w-4" />}
        </div>
        <div className="space-y-1 flex-1">
          <h3 className="font-semibold text-foreground">{value.label}</h3>
          <p className="text-sm text-muted-foreground">{value.description}</p>
        </div>
      </div>
    </Card>
  )
}
