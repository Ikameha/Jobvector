"use client"

import { cn } from "@/lib/utils"

interface ProgressBarProps {
    currentStep: number
    totalSteps: number
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
    return (
        <div className="w-full max-w-md mx-auto mb-8">
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-muted-foreground">
                    Question {currentStep} of {totalSteps}
                </span>
                <span className="text-sm font-medium text-primary">
                    {Math.round((currentStep / totalSteps) * 100)}%
                </span>
            </div>
            <div className="flex gap-2">
                {Array.from({ length: totalSteps }).map((_, index) => (
                    <div
                        key={index}
                        className={cn(
                            "h-2 flex-1 rounded-full transition-all duration-500",
                            index < currentStep
                                ? "bg-primary shadow-[0_0_10px_rgba(61,124,255,0.5)]"
                                : "bg-muted"
                        )}
                    />
                ))}
            </div>
        </div>
    )
}
