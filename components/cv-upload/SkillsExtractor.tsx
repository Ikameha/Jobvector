"use client"

import { useState } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"
import { X, Plus, Sparkles, TrendingUp } from "lucide-react"
import type { ExtractedSkill, CVExtractionResult } from "@/lib/cvParser"

interface SkillsExtractorProps {
    extractionResult: CVExtractionResult | null
    isProcessing: boolean
    onSkillsUpdate: (skills: string[]) => void
    onApply: () => void
}

export function SkillsExtractor({
    extractionResult,
    isProcessing,
    onSkillsUpdate,
    onApply
}: SkillsExtractorProps) {
    const [skills, setSkills] = useState<ExtractedSkill[]>([])
    const [softSkills, setSoftSkills] = useState<string[]>([])
    const [newSkill, setNewSkill] = useState("")

    // Update local state when extraction result changes
    useState(() => {
        if (extractionResult) {
            setSkills(extractionResult.skills)
            setSoftSkills(extractionResult.softSkills)
        }
    })

    const handleRemoveSkill = (skillName: string) => {
        const updatedSkills = skills.filter(s => s.name !== skillName)
        setSkills(updatedSkills)
        onSkillsUpdate([...updatedSkills.map(s => s.name), ...softSkills])
    }

    const handleRemoveSoftSkill = (skillName: string) => {
        const updatedSoftSkills = softSkills.filter(s => s !== skillName)
        setSoftSkills(updatedSoftSkills)
        onSkillsUpdate([...skills.map(s => s.name), ...updatedSoftSkills])
    }

    const handleAddSkill = () => {
        if (newSkill.trim() && !skills.some(s => s.name === newSkill.trim())) {
            const updatedSkills = [...skills, { name: newSkill.trim(), confidence: 100 }]
            setSkills(updatedSkills)
            setNewSkill("")
            onSkillsUpdate([...updatedSkills.map(s => s.name), ...softSkills])
        }
    }

    const getConfidenceColor = (confidence: number) => {
        if (confidence >= 90) return "bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30"
        if (confidence >= 80) return "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/30"
        return "bg-orange-500/20 text-orange-600 dark:text-orange-400 border-orange-500/30"
    }

    if (isProcessing) {
        return (
            <GlassCard intensity="strong" neonBorder className="p-12">
                <div className="text-center">
                    <Spinner size="xl" variant="primary" className="mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Analyzing your CV...</h3>
                    <p className="text-muted-foreground">
                        Our AI is extracting your skills and experience
                    </p>
                </div>
            </GlassCard>
        )
    }

    if (!extractionResult) {
        return null
    }

    return (
        <div className="space-y-6">
            {/* Experience Summary */}
            <GlassCard intensity="medium" neonBorder className="p-6">
                <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold">Detected Experience</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-muted-foreground mb-1">Experience Level</p>
                        <p className="text-lg font-semibold capitalize">{extractionResult.experienceLevel}</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground mb-1">Years of Experience</p>
                        <p className="text-lg font-semibold">{extractionResult.yearsOfExperience} years</p>
                    </div>
                </div>
            </GlassCard>

            {/* Technical Skills */}
            <GlassCard intensity="medium" className="p-6">
                <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold">Technical Skills</h3>
                    <span className="text-sm text-muted-foreground">({skills.length})</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                    {skills.map((skill) => (
                        <div key={skill.name} className="group relative">
                            <Badge
                                variant="secondary"
                                className={`gap-2 pr-1 pl-3 py-1.5 ${getConfidenceColor(skill.confidence)}`}
                            >
                                {skill.name}
                                <span className="text-xs opacity-70">{skill.confidence}%</span>
                                <button
                                    onClick={() => handleRemoveSkill(skill.name)}
                                    className="ml-1 hover:text-destructive rounded-sm p-0.5"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </Badge>
                        </div>
                    ))}
                </div>
                <div className="flex gap-2">
                    <Input
                        placeholder="Add a skill..."
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
                    />
                    <Button onClick={handleAddSkill} size="icon">
                        <Plus className="w-4 h-4" />
                    </Button>
                </div>
            </GlassCard>

            {/* Soft Skills */}
            {softSkills.length > 0 && (
                <GlassCard intensity="medium" className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Soft Skills</h3>
                    <div className="flex flex-wrap gap-2">
                        {softSkills.map((skill) => (
                            <Badge key={skill} variant="outline" className="gap-1 pl-3 pr-1 py-1.5">
                                {skill}
                                <button
                                    onClick={() => handleRemoveSoftSkill(skill)}
                                    className="ml-1 hover:text-destructive rounded-sm p-0.5"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </Badge>
                        ))}
                    </div>
                </GlassCard>
            )}

            {/* Apply Button */}
            <Button onClick={onApply} size="lg" className="w-full gap-2">
                <Sparkles className="w-4 h-4" />
                Apply to Profile
            </Button>
        </div>
    )
}
