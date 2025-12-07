"use client"

import { GlassCard } from "@/components/ui/glass-card"
import { cn } from "@/lib/utils"
import type { QuestionOption } from "@/data/questionnaire"

interface QuestionCardProps {
    option: QuestionOption
    isSelected: boolean
    onSelect: () => void
}

export function QuestionCard({ option, isSelected, onSelect }: QuestionCardProps) {
    return (
        <GlassCard
            intensity="medium"
            neonBorder={isSelected}
            className={cn(
                "p-6 cursor-pointer transition-all duration-300",
                "hover:scale-105 hover:bg-white/15",
                isSelected && "bg-primary/10 border-primary/50"
            )}
            onClick={onSelect}
        >
            <div className="flex items-start gap-4">
                <div className="text-4xl shrink-0">{option.icon}</div>
                <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2 text-foreground">{option.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{option.description}</p>
                </div>
                {isSelected && (
                    <div className="shrink-0">
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                            <svg
                                className="w-4 h-4 text-primary-foreground"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                    </div>
                )}
            </div>
        </GlassCard>
    )
}
