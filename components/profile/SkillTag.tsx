"use client"

import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SkillTagProps {
  skill: string
  level: "mastered" | "learning" | "ignore"
  onChange: (skill: string, level: "mastered" | "learning" | "ignore") => void
}

export function SkillTag({ skill, level, onChange }: SkillTagProps) {
  return (
    <Card className="p-4 flex items-center justify-between gap-4 border bg-card">
      <span className="font-medium text-foreground">{skill}</span>
      <Select value={level} onValueChange={(value) => onChange(skill, value as "mastered" | "learning" | "ignore")}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Select level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="mastered">Mastered</SelectItem>
          <SelectItem value="learning">Learning</SelectItem>
          <SelectItem value="ignore">Ignore</SelectItem>
        </SelectContent>
      </Select>
    </Card>
  )
}
